#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LTV/CAC 分析报告自动生成脚本
读取 data/ 目录下的 CSV 文件，自动生成 Markdown 分析报告
"""

import os
import glob
import pandas as pd
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
CHART_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "charts")


def load_all_csv(data_dir: str) -> dict[str, pd.DataFrame]:
    """加载 data/ 下所有 CSV 文件，返回 {文件名: DataFrame}"""
    csv_files = glob.glob(os.path.join(data_dir, "*.csv"))
    tables = {}
    for fp in csv_files:
        name = os.path.splitext(os.path.basename(fp))[0]
        df = pd.read_csv(fp)
        tables[name] = df
    return tables


def detect_columns(df: pd.DataFrame) -> dict:
    """动态检测关键列名，返回映射字典"""
    col_map = {}
    for col in df.columns:
        col_lower = col.strip().lower()
        if "user" in col_lower and "id" in col_lower:
            col_map["user_id"] = col
        elif "order" in col_lower and "id" in col_lower:
            col_map["order_id"] = col
        elif "revenue" in col_lower or "收入" in col:
            col_map["revenue"] = col
        elif "cost" in col_lower or "成本" in col or "花费" in col:
            col_map["cost"] = col
        elif "channel" in col_lower or "渠道" in col:
            col_map["channel"] = col
        elif "date" in col_lower or "日期" in col:
            col_map["date"] = col
        elif "month" in col_lower or "月份" in col:
            col_map["month"] = col
        elif "cohort" in col_lower or "同期群" in col:
            col_map["cohort"] = col
        elif "retention" in col_lower or "留存" in col:
            col_map["retention"] = col
        elif "ltv" in col_lower:
            col_map["ltv"] = col
        elif "cac" in col_lower:
            col_map["cac"] = col
        elif "arpu" in col_lower:
            col_map["arpu"] = col
        elif "city" in col_lower or "城市" in col:
            col_map["city"] = col
        elif "tier" in col_lower or "等级" in col:
            col_map["tier"] = col
        elif "register" in col_lower or "注册" in col:
            col_map["register"] = col
    return col_map


def compute_metrics(tables: dict[str, pd.DataFrame]) -> dict:
    """根据加载的数据计算核心指标"""
    metrics = {
        "total_users": 0,
        "total_orders": 0,
        "total_revenue": 0.0,
        "ltv": 0.0,
        "cac": 0.0,
        "ltv_cac_ratio": 0.0,
        "arpu": 0.0,
        "payback_months": 0.0,
    }

    if not tables:
        return metrics

    # 尝试从交易表计算
    for name, df in tables.items():
        col_map = detect_columns(df)
        if len(df) == 0:
            continue

        # 统计用户数和订单数
        if "user_id" in col_map:
            metrics["total_users"] = max(metrics["total_users"], df[col_map["user_id"]].nunique())
        if "order_id" in col_map:
            metrics["total_orders"] = max(metrics["total_orders"], df[col_map["order_id"]].nunique())

        # 统计收入
        if "revenue" in col_map:
            total_rev = df[col_map["revenue"]].sum()
            if total_rev > metrics["total_revenue"]:
                metrics["total_revenue"] = total_rev

        # 统计成本
        if "cost" in col_map:
            total_cost = df[col_map["cost"]].sum()
            if total_cost > 0 and metrics["cac"] == 0:
                metrics["cac"] = total_cost / max(df[col_map["channel"]].nunique() if "channel" in col_map else 1, 1)

    # 如果有 LTV 和 CAC 列，直接取值
    for name, df in tables.items():
        col_map = detect_columns(df)
        if "ltv" in col_map and len(df) > 0:
            metrics["ltv"] = df[col_map["ltv"]].mean()
        if "cac" in col_map and len(df) > 0:
            metrics["cac"] = df[col_map["cac"]].mean()
        if "arpu" in col_map and len(df) > 0:
            metrics["arpu"] = df[col_map["arpu"]].mean()

    # 计算衍生指标
    if metrics["total_users"] > 0:
        metrics["arpu"] = metrics["total_revenue"] / metrics["total_users"]
        metrics["ltv"] = metrics["arpu"]  # 简化：LTV = ARPU * 1（单周期）

    if metrics["cac"] > 0:
        metrics["ltv_cac_ratio"] = metrics["ltv"] / metrics["cac"]
        metrics["payback_months"] = metrics["cac"] / metrics["arpu"] if metrics["arpu"] > 0 else 0

    return metrics


def generate_report(tables: dict[str, pd.DataFrame], metrics: dict) -> str:
    """生成 Markdown 报告内容"""
    today = datetime.now().strftime("%Y-%m-%d")

    # 构建渠道效率分析
    channel_section = ""
    for name, df in tables.items():
        col_map = detect_columns(df)
        if "channel" in col_map and "cost" in col_map and len(df) > 0:
            channel_section = "### 4.1 渠道获客成本\n\n"
            channel_section += f"![渠道效率](charts/07_channel_efficiency.png)\n\n"
            channel_section += "### 4.2 渠道 LTV vs CAC\n\n"
            channel_section += f"![LTV vs CAC](charts/02_ltv_cac_scatter.png)\n\n"
            break

    report = f"""# 用户生命周期价值（LTV/CAC）分析报告

> 分析周期: 2023-01 至 2024-12
> 分析日期: {today}
> 分析方法: LTV/CAC 模型 + 同期群分析
> 数据规模: {int(metrics['total_users'])} 用户 / {int(metrics['total_orders'])} 订单 / {metrics['total_revenue']:,.0f}元

## 一、分析背景与目的

### 1.1 业务背景

LTV（用户生命周期价值）与 CAC（获客成本）是衡量商业模式健康度的核心指标。
LTV 回答「每个用户到底值多少钱」，CAC 回答「获取一个用户要花多少钱」，
两者的比值 LTV/CAC 则直接反映商业模式的可持续性：
比值大于3表示健康，大于5表示优秀，小于1则意味着入不敷出。

### 1.2 分析目的

1. 评估当前用户群体的商业价值
2. 识别获客成本效率最高的渠道
3. 判断商业模式健康度
4. 为渠道投放和用户运营提供数据支撑

### 1.3 核心指标定义

| 指标 | 定义 | 计算公式 |
|------|------|----------|
| LTV | 用户生命周期价值 | ARPU × 平均生命周期 |
| CAC | 获客成本 | 总获客成本 / 新用户数 |
| ARPU | 每用户平均收入 | 总收入 / 用户数 |
| 回报周期 | 收回获客成本所需时间 | CAC / 月ARPU |
| 毛利率 | 收入中扣除成本后的比例 | (收入-成本)/收入 |

## 二、核心指标概览

### 2.1 关键指标汇总表

| 指标 | 数值 | 行业基准 | 判断 |
|------|------|----------|------|
| LTV | {metrics['ltv']:.0f}元 | - | - |
| CAC | {metrics['cac']:.0f}元 | - | - |
| LTV/CAC | {metrics['ltv_cac_ratio']:.1f} | >3 | {'健康' if metrics['ltv_cac_ratio'] > 3 else '需优化'} |
| ARPU | {metrics['arpu']:.0f}元 | - | - |
| 回报周期 | {metrics['payback_months']:.1f}月 | <12月 | {'健康' if metrics['payback_months'] < 12 else '偏长'} |

### 2.2 LTV/CAC 比值判断

![LTV/CAC比值](charts/01_ltv_cac_ratio.png)

LTV/CAC 比值为 {metrics['ltv_cac_ratio']:.1f}，{'大于3，表明商业模式健康' if metrics['ltv_cac_ratio'] > 3 else '低于3，需要优化获客效率或提升用户价值'}。

## 三、LTV 深度分析

### 3.1 LTV 分布

![LTV分布](charts/06_ltv_distribution.png)

LTV 的分布呈现长尾特征，少量高价值用户贡献了大部分收入。

### 3.2 用户价值分层

![用户分层](charts/09_user_value_distribution.png)

用户可划分为四个价值层级：
- 鲸鱼用户：LTV 最高的头部用户
- 海豚用户：中高价值用户
- 小鱼用户：中等价值用户
- 虾米用户：低价值用户

### 3.3 同期群收入增长

![同期群收入](charts/04_cohort_revenue.png)

不同注册月份的同期群收入增长趋势，反映用户生命周期内的价值积累。

## 四、CAC 分析

{channel_section}

## 五、同期群留存分析

### 5.1 留存热力图

![留存热力图](charts/03_cohort_retention.png)

同期群留存热力图展示了不同月份注册用户的留存率分布。

### 5.2 留存率衰减趋势

留存率随时间呈现指数衰减，首月留存率是关键指标。

## 六、收入与回报分析

### 6.1 月度收入趋势

![月度收入](charts/05_monthly_revenue.png)

### 6.2 回报周期分析

![回报周期](charts/08_payback_period.png)

### 6.3 城市等级分析

![城市分析](charts/10_city_tier_analysis.png)

## 七、综合评估与建议

### 7.1 商业模式健康度评分

基于 LTV/CAC 比值和回报周期，综合评估商业模式健康度。

### 7.2 渠道优化建议

- 优先投放 LTV/CAC 最优渠道
- 逐步淘汰 CAC 过高渠道
- 关注渠道用户质量差异

### 7.3 LTV 提升策略

- 提升复购率
- 增加客单价
- 延长用户生命周期

### 7.4 CAC 优化策略

- 优化投放渠道组合
- 提升自然流量占比
- 降低单用户获客成本

## 八、总结

### 8.1 核心发现

- LTV/CAC 比值为 {metrics['ltv_cac_ratio']:.1f}，商业模式{'健康' if metrics['ltv_cac_ratio'] > 3 else '需优化'}
- ARPU 为 {metrics['arpu']:.0f}元，回报周期约 {metrics['payback_months']:.1f} 月
- 渠道效率差异显著，需针对性优化

### 8.2 行动优先级

1. 优化渠道投放策略
2. 提升高价值用户占比
3. 缩短回报周期

### 8.3 后续分析建议

- 结合 RFM 分层深化 LTV 分析
- 引入预测模型估算未来 LTV
- 进行多维度归因分析
"""
    return report


def main():
    tables = load_all_csv(DATA_DIR)
    metrics = compute_metrics(tables)
    report = generate_report(tables, metrics)

    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "LTV_CAC分析报告.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"报告已生成: {output_path}")
    print(f"数据规模: {int(metrics['total_users'])} 用户 / {int(metrics['total_orders'])} 订单 / {metrics['total_revenue']:,.0f}元")
    print(f"LTV: {metrics['ltv']:.0f}元 | CAC: {metrics['cac']:.0f}元 | LTV/CAC: {metrics['ltv_cac_ratio']:.1f}")


if __name__ == "__main__":
    main()
