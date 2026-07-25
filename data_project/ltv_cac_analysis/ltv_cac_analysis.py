"""
LTV/CAC 分析 - 用户生命周期价值与获客成本分析
评估商业模式健康度：LTV/CAC比值、同期群留存、回报周期
"""

import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, Any


# ---------------------------------------------------------------------------
# 数据生成
# ---------------------------------------------------------------------------

def generate_ltv_cac_data(n_users: int = 3000, seed: int = 42) -> Dict[str, pd.DataFrame]:
    """生成 LTV/CAC 分析所需的模拟数据。

    Args:
        n_users: 用户数量，默认 3000
        seed: 随机种子，保证可复现

    Returns:
        dict: {users_df, transactions_df, channel_costs_df}
    """
    np.random.seed(seed)

    # ---- 用户基础表 ----
    user_ids = [f"U{i:05d}" for i in range(1, n_users + 1)]

    # 注册日期：2023-01-01 ~ 2024-12-31，每月注册量线性增长+随机波动
    base_date = datetime(2023, 1, 1)
    register_dates = []
    for uid in user_ids:
        month_offset = np.random.randint(0, 24)  # 24个月
        day_in_month = np.random.randint(1, 29)
        reg = base_date + timedelta(days=month_offset * 30 + day_in_month)
        register_dates.append(reg)

    # 渠道：自然搜索25% / 付费广告30% / 社交媒体20% / 口碑推荐10% / 内容营销15%
    channels = np.random.choice(
        ["自然搜索", "付费广告", "社交媒体", "口碑推荐", "内容营销"],
        size=n_users,
        p=[0.25, 0.30, 0.20, 0.10, 0.15],
    )

    # 城市等级：一线30% / 二线30% / 三线25% / 四线及以下15%
    city_tiers = np.random.choice(
        ["一线", "二线", "三线", "四线及以下"],
        size=n_users,
        p=[0.30, 0.30, 0.25, 0.15],
    )

    # 用户类型：新客85% / 老客带新15%
    user_types = np.random.choice(
        ["新客", "老客带新"],
        size=n_users,
        p=[0.85, 0.15],
    )

    users_df = pd.DataFrame({
        "user_id": user_ids,
        "register_date": register_dates,
        "channel": channels,
        "city_tier": city_tiers,
        "user_type": user_types,
    })

    # ---- 交易明细表 ----
    # 用户价值分层
    # 鲸鱼5%, 海豚15%, 小鱼30%, 虾米50%
    value_labels = np.random.choice(
        ["鲸鱼", "海豚", "小鱼", "虾米"],
        size=n_users,
        p=[0.05, 0.15, 0.30, 0.50],
    )

    records = []
    for i, uid in enumerate(user_ids):
        label = value_labels[i]

        if label == "鲸鱼":
            n_orders = np.random.randint(15, 51)
            avg_price = np.random.uniform(300, 1500)
            interval_range = (7, 30)
        elif label == "海豚":
            n_orders = np.random.randint(8, 21)
            avg_price = np.random.uniform(150, 600)
            interval_range = (15, 45)
        elif label == "小鱼":
            n_orders = np.random.randint(3, 11)
            avg_price = np.random.uniform(80, 300)
            interval_range = (20, 60)
        else:  # 虾米
            n_orders = np.random.randint(1, 5)
            avg_price = np.random.uniform(30, 120)
            interval_range = (30, 90)

        categories = np.random.choice(
            ["数码", "服饰", "食品", "家居", "美妆"],
            size=n_orders,
        )

        reg_date = register_dates[i]
        for j in range(n_orders):
            # 订单日期 = 注册日期 + 间隔
            gap_days = np.random.randint(interval_range[0], interval_range[1] + 1)
            order_date = reg_date + timedelta(days=gap_days * (j + 1) // max(j + 1, 1))
            # 简化：每笔订单间隔随机
            offset = np.random.randint(0, interval_range[1])
            order_date = reg_date + timedelta(days=offset + j * np.random.randint(interval_range[0], interval_range[1] + 1))

            amount = round(avg_price * np.random.uniform(0.5, 2.0), 2)
            cat = categories[j] if j < len(categories) else np.random.choice(["数码", "服饰", "食品", "家居", "美妆"])

            records.append({
                "user_id": uid,
                "order_id": f"ORD_{uid}_{j:03d}",
                "order_date": order_date,
                "order_amount": amount,
                "category": cat,
            })

    transactions_df = pd.DataFrame(records)
    transactions_df = transactions_df.sort_values(["user_id", "order_date"]).reset_index(drop=True)

    # ---- 渠道成本表 ----
    channel_costs_df = pd.DataFrame({
        "channel": ["自然搜索", "付费广告", "社交媒体", "口碑推荐", "内容营销"],
        "monthly_budget": [10000, 50000, 25000, 5000, 15000],
        "cost_per_user": [8, 55, 35, 12, 20],
        "备注": ["SEO/SEM优化", "信息流/搜索广告", "KOL/社交投放", "推荐奖励", "内容创作/分发"],
    })

    return {
        "users_df": users_df,
        "transactions_df": transactions_df,
        "channel_costs_df": channel_costs_df,
    }


# ---------------------------------------------------------------------------
# 核心计算函数
# ---------------------------------------------------------------------------

def compute_ltv(
    transactions_df: pd.DataFrame,
    users_df: pd.DataFrame,
) -> Dict[str, Any]:
    """计算 LTV（用户生命周期价值）。

    - 按月计算每个用户的 ARPU
    - 用同期群法推算平均生命周期
    - LTV = ARPU × 平均生命周期月数

    Args:
        transactions_df: 交易明细表
        users_df: 用户基础表

    Returns:
        dict: {overall: {ltv, arpu, avg_lifetime_months}, by_channel, by_city, by_type}
    """
    # 按用户汇总收入
    user_rev = transactions_df.groupby("user_id")["order_amount"].sum().reset_index()
    user_rev.columns = ["user_id", "total_revenue"]

    # 按用户计算订单月数（活跃月数）
    user_months = transactions_df.groupby("user_id")["order_date"].apply(
        lambda x: len(x.dt.to_period("M").unique())
    ).reset_index()
    user_months.columns = ["user_id", "active_months"]

    user_stats = user_rev.merge(user_months, on="user_id")

    # ARPU = 总收入 / 活跃月数
    user_stats["arpu"] = user_stats["total_revenue"] / user_stats["active_months"]

    # 平均生命周期：用同期群留存推算，这里简化为活跃月数的调和
    # 更精确的做法：用留存曲线积分，这里取平均活跃月数作为代理
    avg_lifetime = user_stats["active_months"].mean()
    overall_arpu = user_stats["arpu"].mean()
    overall_ltv = overall_arpu * avg_lifetime

    result: Dict[str, Any] = {
        "overall": {
            "ltv": round(overall_ltv, 2),
            "arpu": round(overall_arpu, 2),
            "avg_lifetime_months": round(avg_lifetime, 2),
        },
    }

    # 按渠道
    merged = user_stats.merge(users_df[["user_id", "channel", "city_tier", "user_type"]], on="user_id")
    by_channel = merged.groupby("channel").agg(
        ltv=("total_revenue", lambda x: (x / merged.loc[x.index, "active_months"] * merged.loc[x.index, "active_months"]).sum() / merged.loc[x.index, "active_months"].sum() * merged.loc[x.index, "active_months"].mean()),
    )
    # 简化：按渠道计算
    ch_stats = merged.groupby("channel").apply(
        lambda g: {
            "ltv": round((g["total_revenue"] / g["active_months"]).mean() * g["active_months"].mean(), 2),
            "arpu": round((g["total_revenue"] / g["active_months"]).mean(), 2),
            "avg_lifetime_months": round(g["active_months"].mean(), 2),
        }
    )
    result["by_channel"] = ch_stats.to_dict()

    # 按城市等级
    city_stats = merged.groupby("city_tier").apply(
        lambda g: {
            "ltv": round((g["total_revenue"] / g["active_months"]).mean() * g["active_months"].mean(), 2),
            "arpu": round((g["total_revenue"] / g["active_months"]).mean(), 2),
            "avg_lifetime_months": round(g["active_months"].mean(), 2),
        }
    )
    result["by_city"] = city_stats.to_dict()

    # 按用户类型
    type_stats = merged.groupby("user_type").apply(
        lambda g: {
            "ltv": round((g["total_revenue"] / g["active_months"]).mean() * g["active_months"].mean(), 2),
            "arpu": round((g["total_revenue"] / g["active_months"]).mean(), 2),
            "avg_lifetime_months": round(g["active_months"].mean(), 2),
        }
    )
    result["by_type"] = type_stats.to_dict()

    return result


def compute_cac(
    users_df: pd.DataFrame,
    channel_costs_df: pd.DataFrame,
) -> Dict[str, Any]:
    """计算 CAC（获客成本）。

    - 分渠道 CAC = 渠道 cost_per_user
    - 整体 CAC = 总月度预算 / 总用户数（更合理的方式）

    Args:
        users_df: 用户基础表
        channel_costs_df: 渠道成本表

    Returns:
        dict: {overall_cac, by_channel: {channel: cac}}
    """
    # 分渠道 CAC = cost_per_user
    by_channel: Dict[str, float] = {}
    for _, row in channel_costs_df.iterrows():
        ch = row["channel"]
        by_channel[ch] = round(row["cost_per_user"], 2)

    # 整体 CAC = 总月度预算 / 总用户数（按月均摊更合理）
    total_monthly = channel_costs_df["monthly_budget"].sum()
    n_total = len(users_df)
    overall_cac = round(total_monthly / n_total, 2) if n_total > 0 else 0.0

    return {
        "overall_cac": overall_cac,
        "by_channel": by_channel,
    }


def compute_ltv_cac_ratio(
    ltv_data: Dict[str, Any],
    cac_data: Dict[str, Any],
) -> Dict[str, Any]:
    """计算 LTV/CAC 比值与回报周期。

    - LTV/CAC 比值
    - 健康度判断：< 1 危险, 1-3 需优化, > 3 健康, > 5 优秀
    - 回报周期 = CAC / (月ARPU × 毛利率)，毛利率假设 60%

    Args:
        ltv_data: compute_ltv 的返回值
        cac_data: compute_cac 的返回值

    Returns:
        dict: {overall_ratio, health, by_channel_ratio, payback_months}
    """
    gross_margin = 0.60

    overall_ltv = ltv_data["overall"]["ltv"]
    overall_arpu = ltv_data["overall"]["arpu"]
    overall_cac = cac_data["overall_cac"]

    ratio = overall_ltv / overall_cac if overall_cac > 0 else 0
    payback = overall_cac / (overall_arpu * gross_margin) if overall_arpu > 0 else float("inf")

    def health_label(r: float) -> str:
        if r < 1:
            return "危险"
        elif r < 3:
            return "需优化"
        elif r > 5:
            return "优秀"
        else:
            return "健康"

    by_channel_ratio: Dict[str, Dict[str, float]] = {}
    for ch, ch_ltv_info in ltv_data.get("by_channel", {}).items():
        ch_cac = cac_data["by_channel"].get(ch, 0)
        if ch_cac > 0:
            ch_ratio = ch_ltv_info["ltv"] / ch_cac
        else:
            ch_ratio = 0
        ch_arpu = ch_ltv_info["arpu"]
        ch_payback = ch_cac / (ch_arpu * gross_margin) if ch_arpu > 0 else float("inf")
        by_channel_ratio[ch] = {
            "ratio": round(ch_ratio, 2),
            "payback_months": round(ch_payback, 1),
            "health": health_label(ch_ratio),
        }

    return {
        "overall_ratio": round(ratio, 2),
        "health": health_label(ratio),
        "payback_months": round(payback, 1),
        "by_channel_ratio": by_channel_ratio,
    }


def compute_cohort_retention(
    transactions_df: pd.DataFrame,
    users_df: pd.DataFrame,
) -> pd.DataFrame:
    """同期群留存分析。

    - 按注册月份分组
    - 计算每个同期群在 M0~M11 的留存率

    Args:
        transactions_df: 交易明细表
        users_df: 用户基础表

    Returns:
        DataFrame: columns=[cohort_month, M0, M1, ..., M11]
    """
    tx = transactions_df.copy()
    tx["order_month"] = tx["order_date"].dt.to_period("M")

    users = users_df.copy()
    users["cohort_month"] = users["register_date"].dt.to_period("M")

    # 交易关联用户注册月
    tx = tx.merge(users[["user_id", "cohort_month"]], on="user_id")

    # 计算每个用户的订单所在月份偏移
    tx["months_since_reg"] = (tx["order_month"] - tx["cohort_month"]).apply(lambda x: x.n)

    # 最多看 12 个月 (M0~M11)
    tx = tx[tx["months_since_reg"].between(0, 11)]

    # 每个同期群、每个偏移月份的留存用户数
    cohort_size = users.groupby("cohort_month")["user_id"].count()

    retained = tx.groupby(["cohort_month", "months_since_reg"])["user_id"].nunique().reset_index()
    retained.columns = ["cohort_month", "months_since_reg", "retained_users"]

    rows = []
    for cohort in retained["cohort_month"].unique():
        cohort_total = cohort_size.get(cohort, 1)
        cohort_data = retained[retained["cohort_month"] == cohort]
        row: Dict[str, Any] = {"cohort_month": str(cohort)}
        for _, r in cohort_data.iterrows():
            m = int(r["months_since_reg"])
            rate = r["retained_users"] / cohort_total
            row[f"M{m}"] = round(rate, 4)
        # 填充缺失的月份
        for m in range(12):
            key = f"M{m}"
            if key not in row:
                row[key] = 0.0
        rows.append(row)

    result_df = pd.DataFrame(rows)
    return result_df


def compute_revenue_by_cohort(
    transactions_df: pd.DataFrame,
    users_df: pd.DataFrame,
) -> pd.DataFrame:
    """同期群收入分析。

    - 按注册月份分组
    - 计算每个同期群在每月的累计收入

    Args:
        transactions_df: 交易明细表
        users_df: 用户基础表

    Returns:
        DataFrame: cohort_month, cumulative_revenue
    """
    tx = transactions_df.copy()
    tx["order_month"] = tx["order_date"].dt.to_period("M")

    users = users_df.copy()
    users["cohort_month"] = users["register_date"].dt.to_period("M")

    tx = tx.merge(users[["user_id", "cohort_month"]], on="user_id")

    # 每个同期群的月度收入
    cohort_rev = tx.groupby(["cohort_month", "order_month"])["order_amount"].sum().reset_index()
    cohort_rev.columns = ["cohort_month", "order_month", "revenue"]

    # 累计
    rows = []
    for cohort in cohort_rev["cohort_month"].unique():
        data = cohort_rev[cohort_rev["cohort_month"] == cohort].sort_values("order_month")
        cum = 0
        for _, r in data.iterrows():
            cum += r["revenue"]
            rows.append({
                "cohort_month": str(cohort),
                "month": str(r["order_month"]),
                "revenue": round(r["revenue"], 2),
                "cumulative_revenue": round(cum, 2),
            })

    return pd.DataFrame(rows)


def compute_monthly_metrics(
    transactions_df: pd.DataFrame,
    users_df: pd.DataFrame,
) -> pd.DataFrame:
    """月度经营指标。

    - month, new_users, active_users, revenue, arpu, arppu, pay_rate, cumulative_revenue

    Args:
        transactions_df: 交易明细表
        users_df: 用户基础表

    Returns:
        DataFrame: 月度指标汇总
    """
    tx = transactions_df.copy()
    tx["month"] = tx["order_date"].dt.to_period("M")

    # 每月活跃用户 & 收入
    monthly = tx.groupby("month").agg(
        active_users=("user_id", "nunique"),
        revenue=("order_amount", "sum"),
    ).reset_index()

    # 每月新用户
    users = users_df.copy()
    users["reg_month"] = users["register_date"].dt.to_period("M")
    new_by_month = users.groupby("reg_month")["user_id"].count().reset_index()
    new_by_month.columns = ["month", "new_users"]

    # 合并
    result = monthly.merge(new_by_month, on="month", how="left")
    result["new_users"] = result["new_users"].fillna(0).astype(int)

    # ARPU / ARPPU / 付费率
    # 使用总用户数（当月活跃+新增非活跃）作为基数
    # 简化：用活跃用户数计算
    result["arpu"] = (result["revenue"] / result["active_users"]).round(2)
    result["arppu"] = result["arpu"]  # 简化
    result["pay_rate"] = 1.0  # 有交易的都算付费

    # 累计收入
    result["cumulative_revenue"] = result["revenue"].cumsum().round(2)

    result["month"] = result["month"].astype(str)
    return result


def compute_payback_period(
    transactions_df: pd.DataFrame,
    users_df: pd.DataFrame,
    cac_data: Dict[str, Any],
) -> pd.DataFrame:
    """回报周期分析。

    - 按月累计每个同期群的收入
    - 找到收入覆盖 CAC 的月份

    Args:
        transactions_df: 交易明细表
        users_df: 用户基础表
        cac_data: compute_cac 的返回值

    Returns:
        DataFrame: cohort_month, payback_month
    """
    tx = transactions_df.copy()
    tx["order_month"] = tx["order_date"].dt.to_period("M")

    users = users_df.copy()
    users["cohort_month"] = users["register_date"].dt.to_period("M")

    tx = tx.merge(users[["user_id", "cohort_month"]], on="user_id")

    # 每个同期群的月度收入
    cohort_rev = tx.groupby(["cohort_month", "order_month"])["order_amount"].sum().reset_index()

    rows = []
    for cohort in cohort_rev["cohort_month"].unique():
        data = cohort_rev[cohort_rev["cohort_month"] == cohort].sort_values("order_month")
        cum = 0
        found = False
        for _, r in data.iterrows():
            cum += r["order_amount"]
            if cum >= cac_data["overall_cac"] and not found:
                rows.append({
                    "cohort_month": str(cohort),
                    "payback_month": str(r["order_month"]),
                    "cumulative_revenue_at_payback": round(cum, 2),
                })
                found = True
        if not found:
            rows.append({
                "cohort_month": str(cohort),
                "payback_month": "未回本",
                "cumulative_revenue_at_payback": round(cum, 2),
            })

    return pd.DataFrame(rows)


# ---------------------------------------------------------------------------
# 主函数
# ---------------------------------------------------------------------------

def main() -> None:
    """主函数：生成数据、计算指标、保存结果、打印汇总。"""
    # 创建目录
    data_dir = "ltv_cac_analysis/data"
    charts_dir = "ltv_cac_analysis/charts"
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(charts_dir, exist_ok=True)

    # 生成数据
    print("正在生成模拟数据...")
    data = generate_ltv_cac_data(n_users=3000, seed=42)
    users_df = data["users_df"]
    transactions_df = data["transactions_df"]
    channel_costs_df = data["channel_costs_df"]

    # 保存原始数据
    users_df.to_csv(f"{data_dir}/users.csv", index=False)
    transactions_df.to_csv(f"{data_dir}/transactions.csv", index=False)
    channel_costs_df.to_csv(f"{data_dir}/channel_costs.csv", index=False)
    print(f"用户数: {len(users_df)}, 交易记录数: {len(transactions_df)}")

    # 计算 LTV
    print("\n=== LTV 计算 ===")
    ltv_data = compute_ltv(transactions_df, users_df)
    print(f"整体 LTV: {ltv_data['overall']['ltv']}元, ARPU: {ltv_data['overall']['arpu']}元, 平均生命周期: {ltv_data['overall']['avg_lifetime_months']}月")

    # 计算 CAC
    print("\n=== CAC 计算 ===")
    cac_data = compute_cac(users_df, channel_costs_df)
    print(f"整体 CAC: {cac_data['overall_cac']}元")
    for ch, cac in cac_data["by_channel"].items():
        print(f"  {ch}: CAC={cac}元")

    # 计算 LTV/CAC 比值
    print("\n=== LTV/CAC 比值 ===")
    ratio_data = compute_ltv_cac_ratio(ltv_data, cac_data)
    print(f"整体 LTV/CAC: {ratio_data['overall_ratio']}, 健康度: {ratio_data['health']}, 回报周期: {ratio_data['payback_months']}月")

    # 同期群留存
    print("\n=== 同期群留存 ===")
    cohort_retention = compute_cohort_retention(transactions_df, users_df)
    print(cohort_retention.to_string(index=False))

    # 同期群收入
    revenue_cohort = compute_revenue_by_cohort(transactions_df, users_df)

    # 月度指标
    print("\n=== 月度指标 ===")
    monthly_metrics = compute_monthly_metrics(transactions_df, users_df)
    print(monthly_metrics.to_string(index=False))

    # 回报周期
    payback = compute_payback_period(transactions_df, users_df, cac_data)
    print("\n=== 回报周期 ===")
    print(payback.to_string(index=False))

    # 保存中间结果
    # ltv_summary.csv：整体+分渠道 LTV/CAC
    ltv_summary_rows = []
    ltv_summary_rows.append({
        "维度": "整体",
        "LTV": ltv_data["overall"]["ltv"],
        "ARPU": ltv_data["overall"]["arpu"],
        "CAC": cac_data["overall_cac"],
        "LTV_CAC比值": ratio_data["overall_ratio"],
        "健康度": ratio_data["health"],
        "回报周期(月)": ratio_data["payback_months"],
    })
    for ch, info in ltv_data.get("by_channel", {}).items():
        ch_ratio = ratio_data["by_channel_ratio"].get(ch, {})
        ltv_summary_rows.append({
            "维度": f"渠道-{ch}",
            "LTV": info["ltv"],
            "ARPU": info["arpu"],
            "CAC": cac_data["by_channel"].get(ch, 0),
            "LTV_CAC比值": ch_ratio.get("ratio", 0),
            "健康度": ch_ratio.get("health", ""),
            "回报周期(月)": ch_ratio.get("payback_months", 0),
        })
    ltv_summary_df = pd.DataFrame(ltv_summary_rows)
    ltv_summary_df.to_csv(f"{data_dir}/ltv_summary.csv", index=False)

    # cohort_retention.csv
    cohort_retention.to_csv(f"{data_dir}/cohort_retention.csv", index=False)

    # monthly_metrics.csv
    monthly_metrics.to_csv(f"{data_dir}/monthly_metrics.csv", index=False)

    print("\n数据已保存到 ltv_cac_analysis/data/ 目录")
    print(f"  - users.csv ({len(users_df)} 行)")
    print(f"  - transactions.csv ({len(transactions_df)} 行)")
    print(f"  - channel_costs.csv")
    print(f"  - ltv_summary.csv")
    print(f"  - cohort_retention.csv")
    print(f"  - monthly_metrics.csv")


if __name__ == "__main__":
    main()
