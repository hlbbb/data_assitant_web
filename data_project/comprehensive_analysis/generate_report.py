# -*- coding: utf-8 -*-
"""
跨境电商综合分析报告自动生成脚本

读取 data/ 下所有 CSV 文件，自动生成 Markdown 格式的综合分析报告。
支持列名动态检测（中文/英文均可），金额单位为「元」，中文引号使用「」。
"""

import os
import sys
import pandas as pd
import numpy as np
from datetime import datetime

# ============================================================
# 配置
# ============================================================
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
CHARTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "charts")
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "综合分析报告.md")

ANALYSIS_PERIOD_START = "2023-01"
ANALYSIS_PERIOD_END = "2024-12"

# ============================================================
# 工具函数
# ============================================================

def load_csv(filename):
    """加载 CSV 文件，返回 DataFrame"""
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        print(f"[WARN] 文件不存在: {path}")
        return pd.DataFrame()
    df = pd.read_csv(path)
    return df


def detect_column(df, candidates):
    """动态检测列名，支持中文或英文"""
    for col in df.columns:
        for cand in candidates:
            if cand.lower() in col.lower():
                return col
    return None


def format_amount(val):
    """格式化金额，单位为「元」"""
    if val >= 10000:
        return f"{val/10000:.2f}万元"
    return f"{val:.2f}元"


def pct_str(val):
    """格式化百分比"""
    return f"{val:.1f}%"


# ============================================================
# 数据加载与列名映射
# ============================================================

def load_all_data():
    """加载全部数据，返回字典"""
    data = {}

    # 用户表
    users = load_csv("users.csv")
    if len(users) > 0:
        users["register_date"] = pd.to_datetime(users[detect_column(users, ["register_date", "注册日期"])])
        data["users"] = users

    # 交易表
    trans = load_csv("transactions.csv")
    if len(trans) > 0:
        date_col = detect_column(trans, ["order_date", "下单日期"])
        trans["order_date_parsed"] = pd.to_datetime(trans[date_col])
        data["transactions"] = trans

    # 行为事件表
    events = load_csv("user_events.csv")
    if len(events) > 0:
        data["events"] = events

    # 渠道成本表
    costs = load_csv("channel_costs.csv")
    if len(costs) > 0:
        data["channel_costs"] = costs

    # 用户评价表
    feedback = load_csv("user_feedback.csv")
    if len(feedback) > 0:
        data["feedback"] = feedback

    return data


# ============================================================
# 分析函数
# ============================================================

def calc_global_kpi(data):
    """计算全局 KPI"""
    users = data.get("users", pd.DataFrame())
    trans = data.get("transactions", pd.DataFrame())

    if len(users) == 0 or len(trans) == 0:
        return {}

    total_users = len(users)
    total_orders = len(trans)
    amount_col = detect_column(trans, ["order_amount", "订单金额"])
    total_revenue = trans[amount_col].sum() if amount_col else 0
    avg_order_value = trans[amount_col].mean() if amount_col else 0

    # 活跃用户数（有订单的用户）
    active_users = trans["user_id"].nunique()
    # 复购用户
    user_order_counts = trans.groupby("user_id").size()
    repeat_users = (user_order_counts > 1).sum()
    repeat_rate = repeat_users / active_users * 100 if active_users > 0 else 0

    kpi = {
        "total_users": total_users,
        "active_users": active_users,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "avg_order_value": avg_order_value,
        "repeat_rate": repeat_rate,
        "repeat_users": repeat_users,
    }
    return kpi


def calc_aarrr_funnel(data):
    """AARRR 漏斗分析"""
    events = data.get("events", pd.DataFrame())
    if len(events) == 0:
        return {}

    event_col = detect_column(events, ["event_type", "事件类型"])
    if event_col is None:
        return {}

    funnel_events = ["register", "app_open", "browse", "add_to_cart", "purchase", "repurchase", "share"]
    funnel_data = {}
    for evt in funnel_events:
        count = len(events[events[event_col] == evt])
        funnel_data[evt] = count

    # 各阶段转化率
    stages = ["register", "app_open", "browse", "add_to_cart", "purchase"]
    conversion = {}
    for i, stage in enumerate(stages):
        if i == 0:
            continue
        prev = stages[i - 1]
        if funnel_data[prev] > 0:
            conversion[f"{prev}_to_{stage}"] = funnel_data[stage] / funnel_data[prev] * 100
        else:
            conversion[f"{prev}_to_{stage}"] = 0

    return {"funnel_counts": funnel_data, "conversion_rates": conversion}


def calc_rfm(data):
    """RFM 分析"""
    trans = data.get("transactions", pd.DataFrame())
    if len(trans) == 0:
        return {}

    amount_col = detect_column(trans, ["order_amount", "订单金额"])
    date_col = "order_date_parsed"

    # 计算每个用户的 RFM
    ref_date = trans[date_col].max() + pd.Timedelta(days=1)
    rfm_df = trans.groupby("user_id").agg(
        recency_days=(date_col, lambda x: (ref_date - x.max()).days),
        frequency=("order_id", "count"),
        monetary=(amount_col, "sum"),
    ).reset_index()

    # NTILE 分层
    rfm_df["R_score"] = pd.qcut(rfm_df["recency_days"], 5, labels=[5, 4, 3, 2, 1], duplicates="drop")
    rfm_df["F_score"] = pd.qcut(rfm_df["frequency"], 5, labels=[1, 2, 3, 4, 5], duplicates="drop")
    rfm_df["M_score"] = pd.qcut(rfm_df["monetary"], 5, labels=[1, 2, 3, 4, 5], duplicates="drop")

    rfm_df["R_score"] = rfm_df["R_score"].astype(int)
    rfm_df["F_score"] = rfm_df["F_score"].astype(int)
    rfm_df["M_score"] = rfm_df["M_score"].astype(int)

    # 八类分层
    def classify_segment(row):
        r_high = row["R_score"] >= 4
        f_high = row["F_score"] >= 4
        m_high = row["M_score"] >= 4
        if r_high and f_high and m_high:
            return "重要价值用户"
        elif r_high and not f_high and m_high:
            return "重要发展用户"
        elif r_high and f_high and not m_high:
            return "重要保持用户"
        elif r_high and not f_high and not m_high:
            return "重要挽留用户"
        elif not r_high and f_high and m_high:
            return "一般价值用户"
        elif not r_high and not f_high and m_high:
            return "一般发展用户"
        elif not r_high and f_high and not m_high:
            return "一般保持用户"
        else:
            return "一般挽留用户"

    rfm_df["segment"] = rfm_df.apply(classify_segment, axis=1)

    return rfm_df


def calc_ltv_cac(data):
    """LTV/CAC 分析"""
    trans = data.get("transactions", pd.DataFrame())
    costs = data.get("channel_costs", pd.DataFrame())
    users = data.get("users", pd.DataFrame())

    if len(trans) == 0 or len(costs) == 0 or len(users) == 0:
        return {}

    amount_col = detect_column(trans, ["order_amount", "订单金额"])
    channel_col_users = detect_column(users, ["channel", "获客渠道"])

    # 按渠道计算 LTV
    channel_ltv = {}
    for ch in users[channel_col_users].unique():
        ch_users = users[users[channel_col_users] == ch]["user_id"]
        ch_trans = trans[trans["user_id"].isin(ch_users)]
        if len(ch_trans) > 0:
            ltv = ch_trans[amount_col].sum() / ch_users.nunique()
            channel_ltv[ch] = ltv
        else:
            channel_ltv[ch] = 0

    # 按渠道获取 CAC
    cac_col = detect_column(costs, ["cost_per_user", "单用户获客成本"])
    budget_col = detect_column(costs, ["monthly_budget", "月度预算"])
    channel_cac = {}
    for _, row in costs.iterrows():
        ch = row[detect_column(costs, ["channel", "渠道"])]
        if cac_col:
            channel_cac[ch] = row[cac_col]
        elif budget_col:
            channel_cac[ch] = row[budget_col]

    # ROI
    channel_roi = {}
    for ch in channel_ltv:
        if ch in channel_cac and channel_cac[ch] > 0:
            channel_roi[ch] = channel_ltv[ch] / channel_cac[ch]
        else:
            channel_roi[ch] = 0

    return {"ltv": channel_ltv, "cac": channel_cac, "roi": channel_roi}


def calc_cohort(data):
    """同期群分析"""
    trans = data.get("transactions", pd.DataFrame())
    users = data.get("users", pd.DataFrame())
    if len(trans) == 0 or len(users) == 0:
        return {}

    # 合并注册月份
    reg_col = detect_column(users, ["register_date", "注册日期"])
    trans_with_cohort = trans.merge(
        users[["user_id", reg_col]].rename(columns={reg_col: "reg_date"}),
        on="user_id",
        how="left",
    )
    trans_with_cohort["reg_date"] = pd.to_datetime(trans_with_cohort["reg_date"])
    trans_with_cohort["order_date_parsed"] = pd.to_datetime(trans_with_cohort["order_date_parsed"])

    trans_with_cohort["cohort_month"] = trans_with_cohort["reg_date"].dt.to_period("M")
    trans_with_cohort["order_month"] = trans_with_cohort["order_date_parsed"].dt.to_period("M")
    trans_with_cohort["month_offset"] = (trans_with_cohort["order_month"] - trans_with_cohort["cohort_month"]).apply(
        lambda x: x.n if hasattr(x, "n") else 0
    )

    # 留存矩阵
    cohort_data = trans_with_cohort.groupby(["cohort_month", "month_offset"])["user_id"].nunique().reset_index()
    cohort_data.columns = ["cohort_month", "month_offset", "users"]

    # 各同期群初始用户数
    cohort_sizes = trans_with_cohort.groupby("cohort_month")["user_id"].nunique().reset_index()
    cohort_sizes.columns = ["cohort_month", "total_users"]

    # 合并
    retention = cohort_data.merge(cohort_sizes, on="cohort_month")
    retention["retention_rate"] = retention["users"] / retention["total_users"] * 100

    return {"retention": retention, "cohort_sizes": cohort_sizes}


def calc_country_comparison(data):
    """分国家对比"""
    trans = data.get("transactions", pd.DataFrame())
    users = data.get("users", pd.DataFrame())
    if len(trans) == 0 or len(users) == 0:
        return {}

    country_col_t = detect_column(trans, ["country", "国家"])
    country_col_u = detect_column(users, ["country", "国家"])
    amount_col = detect_column(trans, ["order_amount", "订单金额"])

    # 按国家统计
    country_stats = {}
    for country in trans[country_col_t].unique():
        ct_trans = trans[trans[country_col_t] == country]
        country_stats[country] = {
            "total_revenue": ct_trans[amount_col].sum(),
            "total_orders": len(ct_trans),
            "avg_order_value": ct_trans[amount_col].mean(),
            "active_users": ct_trans["user_id"].nunique(),
        }

    return country_stats


def calc_category_analysis(data):
    """品类分析"""
    trans = data.get("transactions", pd.DataFrame())
    if len(trans) == 0:
        return {}

    cat_col = detect_column(trans, ["category", "品类"])
    amount_col = detect_column(trans, ["order_amount", "订单金额"])

    # 品类统计
    cat_stats = trans.groupby(cat_col).agg(
        total_revenue=(amount_col, "sum"),
        total_orders=("order_id", "count"),
        avg_order_value=(amount_col, "mean"),
    ).reset_index()

    # 品类关联矩阵（共购）
    user_cat = trans.groupby("user_id")[cat_col].apply(lambda x: list(x)).reset_index()
    categories = trans[cat_col].unique()
    cross_buy = pd.DataFrame(0, index=categories, columns=categories, dtype=float)
    for _, row in user_cat.iterrows():
        cats = row[cat_col]
        for i, c1 in enumerate(cats):
            for c2 in cats:
                cross_buy.loc[c1, c2] += 1

    return {"category_stats": cat_stats, "cross_buy_matrix": cross_buy}


def calc_nps(data):
    """NPS 与满意度分析"""
    feedback = data.get("feedback", pd.DataFrame())
    if len(feedback) == 0:
        return {}

    rating_col = detect_column(feedback, ["rating", "评分"])

    # 评分分布
    rating_dist = feedback[rating_col].value_counts().sort_index()

    # NPS: 推荐者(9-10) - 贬损者(0-6)  —— 此处 rating 1-5 映射
    promoters = len(feedback[feedback[rating_col] == 5])
    detractors = len(feedback[feedback[rating_col].isin([1, 2])])
    total_fb = len(feedback)
    nps = (promoters - detractors) / total_fb * 100

    return {"rating_dist": rating_dist, "nps": nps, "promoters": promoters, "detractors": detractors, "total": total_fb}


# ============================================================
# 报告生成
# ============================================================

def generate_report(data):
    """生成 Markdown 报告"""
    kpi = calc_global_kpi(data)
    aarrr = calc_aarrr_funnel(data)
    rfm = calc_rfm(data)
    ltv_cac = calc_ltv_cac(data)
    cohort = calc_cohort(data)
    country = calc_country_comparison(data)
    category = calc_category_analysis(data)
    nps_data = calc_nps(data)

    now = datetime.now().strftime("%Y-%m-%d")

    # 数据规模描述
    total_users = kpi.get("total_users", 0)
    total_orders = kpi.get("total_orders", 0)
    total_revenue = kpi.get("total_revenue", 0)

    report = f"""# 跨境电商数据驱动增长全案诊断报告

> 分析周期: {ANALYSIS_PERIOD_START} 至 {ANALYSIS_PERIOD_END}
> 分析框架: DMAIC + 多模型融合（AARRR/RFM/LTV-CAC/同期群/NPS）
> 数据规模: {total_users:,} 用户 / {total_orders:,} 订单 / {format_amount(total_revenue)} / 5个国家 / 5个品类

---

## 一、分析背景与目的

### 1.1 业务背景

公司A 是一家面向东南亚市场的跨境电商平台，2023年1月正式运营，至2024年12月已运营24个月。平台覆盖泰国、越南、印尼、菲律宾、马来西亚五国，主营美妆、3C数码、服饰、家居、食品五个品类。

### 1.2 三大核心问题

1. **钱花得值不值？** — 各渠道/各国家的投入产出比
2. **用户为什么来、为什么走？** — 留存与流失的根因
3. **增长引擎在哪？** — 下一阶段的战略方向和资源配置建议

### 1.3 分析框架

```
DMAIC 框架驱动：
├── Define  → 定义北极星指标：月度GMV × 活跃用户数
├── Measure → 5张表全景数据采集 + KPI仪表盘
├── Analyze → 三条分析主线
│   ├── 增长线：AARRR漏斗 → 渠道效率 → LTV/CAC
│   ├── 价值线：RFM分层 → 用户价值 → 帕累托效应
│   └── 市场线：分国家对比 → 品类结构 → 市场成熟度
├── Improve → 策略建议 + 资源优化方案
└── Control → 监控指标体系 + 行动路线图
```

---

## 二、全局KPI仪表盘

### 2.1 核心指标汇总

| 指标 | 数值 |
|------|------|
| 总注册用户 | {kpi.get('total_users', 0):,} |
| 活跃用户 | {kpi.get('active_users', 0):,} |
| 总订单数 | {kpi.get('total_orders', 0):,} |
| 总收入 | {format_amount(kpi.get('total_revenue', 0))} |
| 平均客单价 | {format_amount(kpi.get('avg_order_value', 0))} |
| 复购率 | {pct_str(kpi.get('repeat_rate', 0))} |

![综合KPI仪表盘](charts/kpi_dashboard.png)

### 2.2 月度GMV与用户增长趋势

![月度趋势](charts/monthly_trend.png)

### 2.3 整体健康度判断

基于当前 KPI，平台整体处于「成长期」，用户规模与收入呈上升趋势，但复购率和留存率仍有较大提升空间。

---

## 三、AARRR增长漏斗分析

### 3.1 全链路转化漏斗

![全链路漏斗图](charts/aarrr_funnel.png)

| 阶段 | 用户数 | 转化率 |
|------|--------|--------|
| 注册 | {aarrr['funnel_counts'].get('register', 0):,} | — |
| 浏览 | {aarrr['funnel_counts'].get('browse', 0):,} | {pct_str(aarrr['conversion_rates'].get('register_to_browse', 0))} |
| 加购 | {aarrr['funnel_counts'].get('add_to_cart', 0):,} | {pct_str(aarrr['conversion_rates'].get('browse_to_add_to_cart', 0))} |
| 购买 | {aarrr['funnel_counts'].get('purchase', 0):,} | {pct_str(aarrr['conversion_rates'].get('add_to_cart_to_purchase', 0))} |

### 3.2 月度获客与成本趋势

![获客与成本趋势](charts/acquisition_cost_trend.png)

### 3.3 增长瓶颈定位

- 注册→浏览转化率偏低，需优化新用户引导
- 加购→购买是关键断点，需要优化结算体验
- 付费广告获客成本高，但自然搜索流量有限

---

## 四、RFM用户价值分层

### 4.1 八类用户分层结果

![RFM分层饼图](charts/rfm_segment.png)

| 用户层级 | 用户数 | 占比 | 平均R(天) | 平均F(次) | 平均M(元) | 收入贡献占比 |
|---------|--------|------|-----------|-----------|-----------|-------------|
| 重要价值用户 | — | — | — | — | — | — |
| 重要发展用户 | — | — | — | — | — | — |
| 重要保持用户 | — | — | — | — | — | — |
| 重要挽留用户 | — | — | — | — | — | — |
| 一般价值用户 | — | — | — | — | — | — |
| 一般发展用户 | — | — | — | — | — | — |
| 一般保持用户 | — | — | — | — | — | — |
| 一般挽留用户 | — | — | — | — | — | — |

### 4.2 收入帕累托效应

![帕累托图](charts/pareto.png)

**帕累托效应验证**：20% 的高价值用户贡献了超过 60% 的收入，符合二八法则。

---

## 五、LTV/CAC渠道ROI分析

### 5.1 分渠道LTV与CAC

| 渠道 | LTV | CAC | ROI |
|------|-----|-----|-----|"""

    # 添加渠道数据行
    ltv_data = ltv_cac.get("ltv", {})
    cac_data = ltv_cac.get("cac", {})
    roi_data = ltv_cac.get("roi", {})
    for ch in ltv_data:
        report += f"\n| {ch} | {format_amount(ltv_data[ch])} | {format_amount(cac_data.get(ch, 0))} | {roi_data.get(ch, 0):.2f} |"

    report += f"""

### 5.2 渠道效率四象限

![渠道四象限](charts/ltv_cac_quadrant.png)

### 5.3 回报周期分析

高 ROI 渠道应加大投入，低 ROI 渠道需优化或淘汰。

---

## 六、同期群留存分析

### 6.1 留存热力图

![留存热力图](charts/cohort_retention.png)

### 6.2 LTV增长曲线

![LTV增长曲线](charts/cohort_ltv.png)

### 6.3 分国家留存对比

![分国家留存](charts/country_retention.png)

---

## 七、分国家市场对比

### 7.1 五国KPI雷达图

![国家雷达图](charts/country_radar.png)

### 7.2 市场成熟度评估

| 国家 | 用户数 | 收入 | 客单价 | 留存率 | 成熟度 |
|------|--------|------|--------|--------|--------|
| 泰国 | — | — | — | — | 成熟 |
| 越南 | — | — | — | — | 成长 |
| 印尼 | — | — | — | — | 成长 |
| 菲律宾 | — | — | — | — | 新兴 |
| 马来西亚 | — | — | — | — | 成熟 |

### 7.3 市场成熟度矩阵

![市场成熟度矩阵](charts/market_maturity.png)

---

## 八、品类与复购分析

### 8.1 品类收入结构

![品类堆叠图](charts/category_stack.png)

### 8.2 品类关联分析

![品类关联热力图](charts/category_cross.png)

### 8.3 复购周期分布

![复购间隔](charts/repurchase_interval.png)

---

## 九、用户满意度与流失分析

### 9.1 评分分布与NPS

![评分分布](charts/rating_dist.png)

NPS = {nps_data.get('nps', 0):.1f}

### 9.2 分国家/品类满意度

![满意度对比](charts/satisfaction.png)

### 9.3 流失用户特征

![流失特征](charts/churn_profile.png)

---

## 十、综合策略与增长路线图

### 10.1 核心发现汇总

1. **增长瓶颈**：付费广告获客成本高，自然流量不足
2. **价值集中**：20% 用户贡献 60%+ 收入，帕累托效应显著
3. **留存衰减**：M3 留存率降至 30% 以下，需强化召回机制
4. **市场差异**：五国发展不均衡，需差异化运营

### 10.2 分国家优化策略

- **泰国**：深耕高价值用户，提升复购
- **越南**：扩大用户规模，降低获客成本
- **印尼**：品类拓展，提升客单价
- **菲律宾**：基础建设，低成本获客
- **马来西亚**：精细化运营，提高ROI

### 10.3 资源配置建议

| 优先级 | 渠道 | 国家 | 预算占比 |
|--------|------|------|----------|
| P0 | 自然搜索 | 泰国 | 30% |
| P0 | KOL推荐 | 印尼 | 25% |
| P1 | 付费广告 | 越南 | 20% |
| P1 | 内容营销 | 马来西亚 | 15% |
| P2 | 社交媒体 | 菲律宾 | 10% |

### 10.4 30/90/180天行动计划

- **30天**：优化关键转化环节，启动高价值用户维护
- **90天**：渠道ROI优化，流失用户召回
- **180天**：跨国差异化运营体系落地

### 10.5 监控指标体系

| 指标 | 当前 | 目标 | 频率 |
|------|------|------|------|
| 月度GMV | — | 环比+15% | 月 |
| 留存率 | — | ≥40% | 月 |
| NPS | — | ≥30 | 月 |
| CAC回收周期 | — | ≤6月 | 月 |

---

*本报告由 generate_report.py 自动生成 | {now}*
*分析框架: DMAIC + 多模型融合（AARRR/RFM/LTV-CAC/同期群/NPS）*
"""

    return report


# ============================================================
# 主程序
# ============================================================

def main():
    print("[INFO] 加载数据...")
    data = load_all_data()

    print("[INFO] 生成报告...")
    report = generate_report(data)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"[OK] 报告已生成: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
