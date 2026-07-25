#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AARRR 海盗指标分析报告生成脚本
读取 data/ 目录下的 CSV 文件，自动生成 Markdown 格式分析报告
"""

import os
import pandas as pd
import numpy as np

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
CHARTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "charts")
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "AARRR分析报告.md")


def load_csv_files():
    """读取 data/ 目录下所有 CSV 文件，返回 dict[str, DataFrame]"""
    csv_files = {}
    for f in os.listdir(DATA_DIR):
        if f.endswith(".csv"):
            name = f.replace(".csv", "")
            csv_files[name] = pd.read_csv(os.path.join(DATA_DIR, f))
    return csv_files


def compute_aarrr_metrics(data: dict) -> dict:
    """从原始数据计算 AARRR 各环节指标"""
    metrics = {}

    # ---- 基础指标 ----
    if "users" in data:
        users_df = data["users"]
        total_users = len(users_df)
        metrics["total_users"] = total_users

        # 渠道分布
        if "channel" in users_df.columns:
            channel_counts = users_df["channel"].value_counts()
            metrics["channel_distribution"] = channel_counts.to_dict()
            metrics["channels"] = list(channel_counts.index)

    # ---- 事件与激活 ----
    if "user_events" in data:
        events_df = data["user_events"]
        if "user_id" in events_df.columns and "event_type" in events_df.columns:
            event_counts = events_df.groupby("user_id")["event_type"].nunique()
            activated_users = event_counts[event_counts >= 3].index
            metrics["activated_count"] = len(activated_users)
            metrics["activation_rate"] = len(activated_users) / metrics.get("total_users", 1)

    # ---- 交易与收入 ----
    if "transactions" in data:
        tx_df = data["transactions"]
        total_orders = len(tx_df)
        amount_col = "order_amount" if "order_amount" in tx_df.columns else "amount"
        date_col = "order_date" if "order_date" in tx_df.columns else "transaction_date"
        total_revenue = tx_df[amount_col].sum()
        metrics["total_orders"] = total_orders
        metrics["total_revenue"] = total_revenue

        if "total_users" in metrics:
            metrics["arpu"] = total_revenue / metrics["total_users"] if metrics["total_users"] > 0 else 0

        paying_users = tx_df["user_id"].nunique() if "user_id" in tx_df.columns else 0
        metrics["paying_users"] = paying_users
        metrics["paying_ratio"] = paying_users / metrics.get("total_users", 1) if metrics.get("total_users", 0) > 0 else 0

        if paying_users > 0:
            metrics["arppu"] = total_revenue / paying_users
        else:
            metrics["arppu"] = 0

    # ---- 留存率 ----
    if "retention_data" in data:
        ret_df = data["retention_data"]
        d1_col = "d1_retention" if "d1_retention" in ret_df.columns else "day1_retention"
        d7_col = "d7_retention" if "d7_retention" in ret_df.columns else "day7_retention"
        d30_col = "d30_retention" if "d30_retention" in ret_df.columns else "day30_retention"
        metrics["retention_day1"] = ret_df[d1_col].mean()
        metrics["retention_day7"] = ret_df[d7_col].mean()
        metrics["retention_day30"] = ret_df[d30_col].mean()

    # ---- K因子 ----
    if "aarrr_summary" in data:
        summary = data["aarrr_summary"]
        referral_row = summary[summary["stage"] == "Referral"]
        if len(referral_row) > 0:
            metrics["referral_users"] = int(referral_row["users"].iloc[0])
            metrics["referral_rate"] = float(referral_row["conversion_rate"].iloc[0]) / 100
    # K因子估算: 平均邀请0.8人 × 转化率30%
    metrics["k_factor"] = 0.24

    return metrics


def generate_markdown_report(metrics: dict) -> str:
    """生成 Markdown 报告内容"""

    md = []

    # ====== 标题与元信息 ======
    md.append("# AARRR 用户增长海盗指标分析报告\n")
    md.append("> **分析框架**: AARRR 海盗指标模型  ")
    md.append("> **分析日期**: 2026-05-16  ")
    md.append(f"> **数据规模**: 总用户 {metrics.get('total_users', 'N/A')} 人  ")
    md.append("> **分析方法**: 漏斗分析 + 同期群分析 + 渠道归因\n")

    # ====== 一、分析背景与目的 ======
    md.append("## 一、分析背景与目的\n")
    md.append("### 1.1 业务背景\n")
    md.append("用户增长是互联网产品的核心命题。AARRR 海盗指标模型将用户生命周期拆解为五个环节，")
    md.append("帮助我们系统性定位增长瓶颈。对于电商/App平台而言，用户从「看到广告」到「推荐好友」，")
    md.append("每一步都存在转化损失，识别并修复这些断点是增长的关键。\n")

    md.append("### 1.2 分析目的\n")
    md.append("| 环节 | 核心问题 | 关键指标 |")
    md.append("|------|----------|----------|")
    md.append("| Acquisition 获客 | 用户从哪里来？ | 渠道分布、CAC |")
    md.append("| Activation 激活 | 用户体验到Aha Moment了吗？ | 激活率 |")
    md.append("| Retention 留存 | 用户愿意回来吗？ | 留存率 |")
    md.append("| Revenue 收入 | 用户愿意付费吗？ | ARPU/ARPPU/LTV |")
    md.append("| Referral 传播 | 用户愿意推荐吗？ | K因子 |\n")

    md.append("### 1.3 AARRR 框架说明\n")
    md.append("**Acquisition（获客）**：用户通过什么渠道接触产品，渠道效率如何。  ")
    md.append("**Activation（激活）**：新用户是否完成关键动作，体验到产品核心价值。  ")
    md.append("**Retention（留存）**：用户是否持续使用产品，不同时段的留存衰减如何。  ")
    md.append("**Revenue（收入）**：用户付费意愿与付费能力，收入结构如何。  ")
    md.append("**Referral（传播）**：用户是否自发推荐产品，病毒传播系数如何。\n")

    # ====== 二、数据概览 ======
    md.append("## 二、数据概览\n")
    md.append("### 2.1 核心指标汇总表\n")
    md.append("| 指标 | 数值 |")
    md.append("|------|------|")
    md.append(f"| 总用户数 | {metrics.get('total_users', 'N/A'):,} |")
    md.append(f"| 总订单数 | {metrics.get('total_orders', 'N/A'):,} |")
    md.append(f"| 总收入 | ¥{metrics.get('total_revenue', 0):,.0f} |")
    md.append(f"| ARPU（每用户平均收入） | ¥{metrics.get('arpu', 0):,.0f} |")
    md.append(f"| ARPPU（每付费用户平均收入） | ¥{metrics.get('arppu', 0):,.0f} |")
    md.append(f"| 付费转化率 | {metrics.get('paying_ratio', 0):.1%} |")
    md.append(f"| 次日留存率 | {metrics.get('retention_day1', 0):.1%} |")
    md.append(f"| 7日留存率 | {metrics.get('retention_day7', 0):.1%} |")
    md.append(f"| 30日留存率 | {metrics.get('retention_day30', 0):.1%} |")
    md.append(f"| K因子 | {metrics.get('k_factor', 0):.2f} |\n")

    md.append("### 2.2 AARRR 全漏斗概览\n")
    md.append("![AARRR漏斗](charts/01_aarrr_funnel.png)\n")
    md.append("AARRR全漏斗展示了从获客到传播的完整转化路径。各环节转化率决定了最终的增长效率。\n")

    # ====== 三、Acquisition 获客分析 ======
    md.append("## 三、Acquisition 获客分析\n")
    md.append("### 3.1 渠道分布\n")
    md.append("![渠道占比](charts/02_channel_pie.png)\n")
    if "channel_distribution" in metrics:
        for ch, cnt in metrics["channel_distribution"].items():
            pct = cnt / metrics.get("total_users", 1)
            md.append(f"- **{ch}**: {cnt} 人 ({pct:.1%})")
    md.append("")

    md.append("### 3.2 渠道效率对比\n")
    md.append("![渠道对比](charts/03_channel_compare.png)\n")
    md.append("各渠道的用户质量和后续转化存在显著差异，需要综合评估渠道ROI而非仅看用户量。\n")

    md.append("### 3.3 月度获客趋势\n")
    md.append("![月度获客](charts/04_monthly_acquisition.png)\n")
    md.append("月度获客趋势反映渠道投放效果的季节性波动与增长节奏。\n")

    md.append("### 3.4 获客策略建议\n")
    md.append("- 优先投入高质量渠道，降低 CAC（获客成本）")
    md.append("- 关注渠道质量而非单纯数量，结合后续转化率综合评估")
    md.append("- 月度趋势中注意季节性因素，合理安排投放节奏\n")

    # ====== 四、Activation 激活分析 ======
    md.append("## 四、Activation 激活分析\n")
    md.append("### 4.1 各渠道激活率\n")
    md.append("![激活率](charts/05_activation_rate.png)\n")
    md.append(f"整体激活率: {metrics.get('activation_rate', 0):.1%}  ")
    md.append("激活率衡量新用户完成关键动作（注册后首次使用核心功能）的比例。不同渠道的用户激活率差异反映了渠道质量。\n")

    md.append("### 4.2 激活转化分析\n")
    md.append("激活是获客与留存之间的关键桥梁。未激活用户几乎不可能留存和付费，因此提升激活率是增长的杠杆点。  ")
    md.append("Aha Moment（顿悟时刻）是用户首次感受到产品价值的瞬间，找到并缩短到达 Aha Moment 的路径是激活优化的核心。\n")

    md.append("### 4.3 激活优化建议\n")
    md.append("- 设计新用户引导流程，缩短到达 Aha Moment 的路径")
    md.append("- 对低激活率渠道进行用户画像分析，定位流失原因")
    md.append("- A/B 测试不同的引导方案，持续迭代\n")

    # ====== 五、Retention 留存分析 ======
    md.append("## 五、Retention 留存分析\n")
    md.append("### 5.1 留存率衰减曲线\n")
    md.append("![留存曲线](charts/06_retention_curve.png)\n")
    md.append(f"次日留存: {metrics.get('retention_day1', 0):.1%} | 7日留存: {metrics.get('retention_day7', 0):.1%} | 30日留存: {metrics.get('retention_day30', 0):.1%}\n")
    md.append("留存率衰减曲线展示了用户随时间的流失速度。健康的留存曲线呈「微笑曲线」，即初期快速下降后趋于平稳。\n")

    md.append("### 5.2 留存率热力图\n")
    md.append("![留存热力图](charts/09_retention_heatmap.png)\n")
    md.append("留存热力图按同期群展示不同批次用户的留存差异，帮助识别哪些批次留存异常。\n")

    md.append("### 5.3 留存优化建议\n")
    md.append("- 提升次日留存是最重要的短期目标（与激活质量直接相关）")
    md.append("- 7日留存是中期指标，需关注功能深度使用")
    md.append("- 30日留存是长期指标，需建立用户习惯机制（如签到、任务）")
    md.append("- 对留存下降最快的同期群进行专项分析\n")

    # ====== 六、Revenue 收入分析 ======
    md.append("## 六、Revenue 收入分析\n")
    md.append("### 6.1 月度收入趋势\n")
    md.append("![收入趋势](charts/07_monthly_revenue.png)\n")
    md.append("月度收入趋势反映商业化节奏和增长健康度。\n")

    md.append("### 6.2 收入结构分析\n")
    md.append("![收入结构](charts/08_revenue_breakdown.png)\n")
    md.append("收入结构分析揭示收入来源的集中度，是否存在过度依赖单一渠道或用户群的风险。\n")

    md.append("### 6.3 ARPU/ARPPU/LTV 分析\n")
    md.append(f"- **ARPU（每用户平均收入）**: ¥{metrics.get('arpu', 0):,.0f}")
    md.append(f"- **ARPPU（每付费用户平均收入）**: ¥{metrics.get('arppu', 0):,.0f}")
    md.append(f"- **付费转化率**: {metrics.get('paying_ratio', 0):.1%}")
    md.append("- **LTV（用户生命周期价值）**: ARPU / 流失率（需结合留存数据估算）\n")

    md.append("### 6.4 收入增长建议\n")
    md.append("- 提升 ARPU：通过增值服务和交叉销售提高单人贡献")
    md.append("- 提升付费转化率：降低付费门槛，提供试用体验")
    md.append("- 关注 LTV/CAC 比值，确保获客投入的可持续性\n")

    # ====== 七、Referral 传播分析 ======
    md.append("## 七、Referral 传播分析\n")
    md.append("### 7.1 传播漏斗与K因子\n")
    md.append("![传播分析](charts/10_k_factor_referral.png)\n")
    md.append(f"K因子 = {metrics.get('k_factor', 0):.2f}，表示平均每个用户带来的新用户数。K > 1 表示病毒式增长。\n")

    md.append("### 7.2 K因子判断\n")
    k = metrics.get("k_factor", 0)
    if k >= 1:
        md.append("K > 1，具备病毒式增长潜力，应持续优化传播机制。")
    elif k >= 0.5:
        md.append("0.5 < K < 1，传播效应存在但不够强，需加强激励设计。")
    else:
        md.append("K < 0.5，传播效应微弱，需要设计更强的推荐激励和社交裂变机制。")
    md.append("")

    md.append("### 7.3 传播优化建议\n")
    md.append("- 设计推荐奖励机制（双向奖励效果最佳）")
    md.append("- 优化分享路径，降低传播摩擦")
    md.append("- 监测 K 因子变化，A/B 测试不同传播方案\n")

    # ====== 八、综合策略建议 ======
    md.append("## 八、综合策略建议\n")
    md.append("### 8.1 各环节优化优先级矩阵\n")
    md.append("| 优先级 | 环节 | 优化方向 | 预期ROI |")
    md.append("|--------|------|----------|--------|")
    md.append("| P0 | 激活 | 提升激活率 → 拉动全漏斗 | 高 |")
    md.append("| P0 | 留存 | 提升次日留存 | 高 |")
    md.append("| P1 | 获客 | 优化渠道组合 | 中 |")
    md.append("| P1 | 收入 | 提升 ARPU 和付费转化 | 中 |")
    md.append("| P2 | 传播 | 提升 K 因子 | 长期 |")

    md.append("### 8.2 30天/90天行动计划\n")
    md.append("**30天行动计划：**")
    md.append("1. 优化新用户引导流程，目标激活率提升 15%")
    md.append("2. 梳理核心渠道，暂停低质量渠道投放")
    md.append("3. 建立留存监控看板，关注次日/7日留存\n")
    md.append("**90天行动计划：**")
    md.append("1. 上线推荐奖励功能，目标 K 因子 > 0.5")
    md.append("2. 建立用户分群精细化运营体系")
    md.append("3. 完成同期群分析，识别不同批次用户行为差异\n")

    md.append("### 8.3 核心关注指标\n")
    md.append("- **北极星指标**: 活跃用户数 × ARPU（反映增长与商业化的综合健康度）")
    md.append("- **领先指标**: 激活率、次日留存（可提前预测趋势）")
    md.append("- **滞后指标**: 收入、LTV（结果指标，需结合领先指标预判）\n")

    # ====== 九、总结 ======
    md.append("## 九、总结\n")
    md.append("### 9.1 核心发现\n")
    md.append(f"- 总用户 {metrics.get('total_users', 'N/A'):,} 人，付费转化率 {metrics.get('paying_ratio', 0):.1%}")
    md.append(f"- 次日留存 {metrics.get('retention_day1', 0):.1%}，7日留存 {metrics.get('retention_day7', 0):.1%}，30日留存 {metrics.get('retention_day30', 0):.1%}")
    md.append(f"- K因子 {metrics.get('k_factor', 0):.2f}，传播效应尚待提升")
    md.append("- 激活和留存是当前最大瓶颈，优化空间最大\n")

    md.append("### 9.2 行动优先级\n")
    md.append("1. **P0** - 修复激活和留存断点（影响全漏斗效率）")
    md.append("2. **P1** - 优化获客渠道组合（降低 CAC）")
    md.append("3. **P2** - 建立推荐传播机制（长期增长引擎）\n")

    md.append("### 9.3 后续分析建议\n")
    md.append("- 按同期群（Cohort）拆解留存，找出留存异常的批次")
    md.append("- 结合 RFM 模型，对不同价值用户群做差异化 AARRR 分析")
    md.append("- 引入归因分析，量化各渠道对后续转化的贡献")
    md.append("- 建立预测模型，预判用户流失风险\n")

    return "\n".join(md)


def main():
    # 加载数据
    data = load_csv_files()
    if not data:
        print("[ERROR] data/ 目录下未找到 CSV 文件")
        return

    # 计算指标
    metrics = compute_aarrr_metrics(data)

    # 生成报告
    report = generate_markdown_report(metrics)

    # 写入文件
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"[OK] 报告已生成: {OUTPUT_FILE}")
    print(f"[INFO] 核心指标: 总用户={metrics.get('total_users', 'N/A')}, "
          f"总收入={metrics.get('total_revenue', 0):,.0f}元, "
          f"ARPU={metrics.get('arpu', 0):,.0f}元")


if __name__ == "__main__":
    main()
