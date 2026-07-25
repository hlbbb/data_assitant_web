"""
AARRR 海盗指标分析 - App/电商全漏斗分析
Acquisition(获客) → Activation(激活) → Retention(留存) → Revenue(收入) → Referral(传播)
生成模拟数据 → 五环节计算 → 汇总输出
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta


# ---------------------------------------------------------------------------
# 1. 数据生成
# ---------------------------------------------------------------------------

def generate_aarrr_data(n_users: int = 5000, seed: int = 42) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """生成 AARRR 模拟数据，返回 (users_df, events_df, transactions_df)

    Parameters
    ----------
    n_users : int
        模拟用户总数
    seed : int
        随机种子，保证可复现
    """
    np.random.seed(seed)

    # ---- 用户基础表 ----
    user_ids = [f"U{i:05d}" for i in range(1, n_users + 1)]

    # 注册日期：越接近年底注册越多（线性增长权重）
    base_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 12, 31)
    total_days = (end_date - base_date).days  # 365

    # 每个用户的注册日偏移量，用三角分布模拟增长趋势
    day_offsets = np.random.triangular(0, total_days, total_days, size=n_users).astype(int)
    day_offsets = np.clip(day_offsets, 0, total_days)
    reg_dates = [base_date + timedelta(days=int(d)) for d in day_offsets]

    # 渠道分配：自然搜索30% 付费广告25% 社交媒体20% 口碑推荐15% 应用商店10%
    channel_probs = [0.30, 0.25, 0.20, 0.15, 0.10]
    channels_pool = ["自然搜索", "付费广告", "社交媒体", "口碑推荐", "应用商店"]
    user_channels = np.random.choice(channels_pool, size=n_users, p=channel_probs)

    # 设备类型：iOS 55% / Android 45%
    device_probs = [0.55, 0.45]
    devices = np.random.choice(["iOS", "Android"], size=n_users, p=device_probs)

    # 城市等级
    tier_probs = [0.25, 0.30, 0.25, 0.20]
    tiers = np.random.choice(["一线", "二线", "三线", "四线及以下"], size=n_users, p=tier_probs)

    users_df = pd.DataFrame({
        "user_id": user_ids,
        "register_date": reg_dates,
        "channel": user_channels,
        "device": devices,
        "city_tier": tiers,
    })

    # ---- 用户行为事件表 ----
    # 漏斗转化率
    funnel_rates = {
        "register": 1.00,
        "app_open": 0.85,
        "browse": 0.75,
        "add_to_cart": 0.45,
        "purchase": 0.55,
        "repurchase": 0.35,
        "share": 0.20,
    }

    event_rows = []
    for idx, row in users_df.iterrows():
        uid = row["user_id"]
        reg = row["register_date"]

        # 注册事件
        event_rows.append({"user_id": uid, "event_type": "register", "event_date": reg})

        # 逐步漏斗
        prev_date = reg
        active = True

        # app_open
        if active and np.random.random() < funnel_rates["app_open"]:
            prev_date = prev_date + timedelta(days=np.random.randint(0, 1))
            event_rows.append({"user_id": uid, "event_type": "app_open", "event_date": prev_date})

        # browse
        if np.random.random() < funnel_rates["browse"]:
            browse_date = prev_date + timedelta(days=np.random.randint(0, 2))
            event_rows.append({"user_id": uid, "event_type": "browse", "event_date": browse_date})
            prev_date = browse_date
        else:
            active = False

        # add_to_cart
        if active and np.random.random() < funnel_rates["add_to_cart"]:
            cart_date = prev_date + timedelta(days=np.random.randint(0, 3))
            event_rows.append({"user_id": uid, "event_type": "add_to_cart", "event_date": cart_date})
            prev_date = cart_date
        else:
            active = False

        # purchase
        if active and np.random.random() < funnel_rates["purchase"]:
            purchase_date = prev_date + timedelta(days=np.random.randint(0, 3))
            event_rows.append({"user_id": uid, "event_type": "purchase", "event_date": purchase_date})
            prev_date = purchase_date
        else:
            active = False

        # repurchase（30天内复购）
        if active and np.random.random() < funnel_rates["repurchase"]:
            repurchase_date = prev_date + timedelta(days=np.random.randint(7, 31))
            event_rows.append({"user_id": uid, "event_type": "repurchase", "event_date": repurchase_date})
            prev_date = repurchase_date

        # share（分享/推荐）
        if active and np.random.random() < funnel_rates["share"]:
            share_date = prev_date + timedelta(days=np.random.randint(0, 5))
            event_rows.append({"user_id": uid, "event_type": "share", "event_date": share_date})

    events_df = pd.DataFrame(event_rows)

    # ---- 交易明细表 ----
    # 仅对已购买用户生成
    purchase_events = events_df[events_df["event_type"].isin(["purchase", "repurchase"])]
    categories = ["数码", "服饰", "食品", "家居", "美妆"]
    cat_probs = [0.20, 0.25, 0.25, 0.15, 0.15]

    tx_rows = []
    order_counter = 0
    for _, evt in purchase_events.iterrows():
        uid = evt["user_id"]
        evt_date = evt["event_date"]
        evt_type = evt["event_type"]

        # 首单金额较高，复购金额偏低
        if evt_type == "purchase":
            amount = round(np.random.uniform(50, 500), 2)
        else:
            amount = round(np.random.uniform(30, 300), 2)

        cat = np.random.choice(categories, p=cat_probs)
        order_id = f"ORD{order_counter:06d}"
        order_counter += 1

        tx_rows.append({
            "user_id": uid,
            "order_id": order_id,
            "order_date": evt_date,
            "order_amount": amount,
            "category": cat,
        })

    transactions_df = pd.DataFrame(tx_rows)

    return users_df, events_df, transactions_df


# ---------------------------------------------------------------------------
# 2. AARRR 核心计算
# ---------------------------------------------------------------------------

def compute_acquisition(users_df: pd.DataFrame) -> dict:
    """获客分析

    Returns
    -------
    dict with keys: channel_summary, monthly_trend, cac_summary
    """
    # 各渠道用户数与占比
    channel_counts = users_df.groupby("channel")["user_id"].count().reset_index()
    channel_counts.columns = ["channel", "user_count"]
    channel_counts["pct"] = (channel_counts["user_count"] / len(users_df) * 100).round(2)

    # 月度新增趋势
    users_df_copy = users_df.copy()
    users_df_copy["month"] = users_df_copy["register_date"].dt.to_period("M")
    monthly = users_df_copy.groupby("month")["user_id"].count().reset_index()
    monthly.columns = ["month", "new_users"]
    monthly["month"] = monthly["month"].astype(str)

    # 各渠道获客成本
    cost_map = {
        "付费广告": 50,
        "社交媒体": 30,
        "口碑推荐": 10,
        "自然搜索": 5,
        "应用商店": 15,
    }
    channel_counts["cost_per_user"] = channel_counts["channel"].map(cost_map)
    channel_counts["total_cost"] = channel_counts["user_count"] * channel_counts["cost_per_user"]

    # 总体 CAC
    total_cost = channel_counts["total_cost"].sum()
    total_users = len(users_df)
    cac_overall = round(total_cost / total_users, 2)

    return {
        "channel_summary": channel_counts,
        "monthly_trend": monthly,
        "cac_overall": cac_overall,
    }


def compute_activation(events_df: pd.DataFrame) -> dict:
    """激活分析 — 激活定义：完成首次浏览

    Returns
    -------
    dict with keys: activation_rate, channel_activation, time_to_activate
    """
    register_users = set(events_df[events_df["event_type"] == "register"]["user_id"])
    browse_users = set(events_df[events_df["event_type"] == "browse"]["user_id"])

    total_registered = len(register_users)
    total_activated = len(browse_users)
    activation_rate = round(total_activated / total_registered * 100, 2) if total_registered else 0

    # 各渠道激活率
    channel_activation_list = []
    for ch in ["自然搜索", "付费广告", "社交媒体", "口碑推荐", "应用商店"]:
        ch_events = events_df[events_df["user_id"].isin(
            events_df[events_df["channel"] == ch]["user_id"]
        )] if "channel" in events_df.columns else pd.DataFrame()
        # 需要从 users_df 拿渠道信息，这里简化：直接在 events_df 中标记
        # 实际使用时由外部调用时通过 merge 处理

    # 简化：返回整体指标
    return {
        "activation_rate": activation_rate,
        "total_registered": total_registered,
        "total_activated": total_activated,
    }


def compute_activation_by_channel(events_df: pd.DataFrame, users_df: pd.DataFrame) -> pd.DataFrame:
    """分渠道激活率计算"""
    merged = events_df.merge(users_df[["user_id", "channel"]], on="user_id", how="left")
    register_events = merged[merged["event_type"] == "register"]
    browse_events = merged[merged["event_type"] == "browse"]

    reg_counts = register_events.groupby("channel")["user_id"].count()
    browse_counts = browse_events.groupby("channel")["user_id"].count()

    result = pd.DataFrame({
        "channel": reg_counts.index,
        "registered": reg_counts.values,
        "activated": browse_counts.reindex(reg_counts.index, fill_value=0).values,
    })
    result["activation_rate"] = (result["activated"] / result["registered"] * 100).round(2)
    return result


def compute_retention(events_df: pd.DataFrame, users_df: pd.DataFrame) -> dict:
    """留存分析

    计算 次日/7日/30日 留存率，月度留存趋势，分渠道留存

    Returns
    -------
    dict with keys: retention_summary, monthly_retention, channel_retention, decay_curve
    """
    # 只看注册和浏览/使用事件
    active_users = events_df[events_df["event_type"].isin(["browse", "app_open"])].copy()
    active_users = active_users.merge(users_df[["user_id", "register_date", "channel"]], on="user_id", how="left")

    # 留存计算：对每个用户计算活跃日期与注册日期的差
    active_users["days_since_register"] = (active_users["event_date"] - active_users["register_date"]).dt.days

    # 次日/7日/30日留存
    retention_data = {}
    for period_name, period_days in [("next_day", 1), ("day7", 7), ("day30", 30)]:
        retained = active_users[active_users["days_since_register"] >= 0].copy()
        # 计算每个用户在注册后 period_days 天是否活跃
        # 简化：看注册后 period_days 天范围内是否有活跃
        retained_users = retained[retained["days_since_register"] <= period_days]
        # 需要确保用户在注册日之后有活动
        retained_users = retained_users[retained_users["days_since_register"] > 0]

        # 按注册日期分组计算
        cohort = retained_users.groupby("register_date")["user_id"].nunique().reset_index()
        cohort.columns = ["register_date", "retained_users"]

        # 对应注册用户数
        cohort_users = users_df.groupby("register_date")["user_id"].count().reset_index()
        cohort_users.columns = ["register_date", "total_users"]

        merged = cohort.merge(cohort_users, on="register_date", how="right")
        merged["retention_rate"] = (merged["retained_users"] / merged["total_users"] * 100).fillna(0).round(2)
        retention_data[period_name] = merged

    # 月度留存趋势：按注册月份分组
    monthly = users_df.copy()
    monthly["reg_month"] = monthly["register_date"].dt.to_period("M")

    # 分渠道留存
    channel_ret = {}
    for ch in ["自然搜索", "付费广告", "社交媒体", "口碑推荐", "应用商店"]:
        ch_users = users_df[users_df["channel"] == ch]["user_id"]
        ch_events = active_users[active_users["user_id"].isin(ch_users)]
        ch_retained = ch_events[ch_events["days_since_register"] > 0]
        channel_ret[ch] = {
            "total": len(ch_users),
            "retained": ch_retained["user_id"].nunique(),
            "rate": round(ch_retained["user_id"].nunique() / len(ch_users) * 100, 2) if len(ch_users) else 0,
        }

    # 留存衰减曲线数据
    decay = active_users[active_users["days_since_register"] > 0].copy()
    decay_summary = decay.groupby("days_since_register")["user_id"].nunique().reset_index()
    decay_summary.columns = ["days_since_register", "active_users"]
    total_reg = len(users_df)
    decay_summary["retention_rate"] = (decay_summary["active_users"] / total_reg * 100).round(2)

    return {
        "retention_summary": retention_data,
        "channel_retention": channel_ret,
        "decay_curve": decay_summary,
    }


def compute_revenue(transactions_df: pd.DataFrame, users_df: pd.DataFrame) -> dict:
    """收入分析

    Returns
    -------
    dict with keys: overall, monthly_trend, category_mix, ltv
    """
    total_revenue = transactions_df["order_amount"].sum()
    total_users = len(users_df)
    paying_users = transactions_df["user_id"].nunique()

    arpu = round(total_revenue / total_users, 2)
    arppu = round(total_revenue / paying_users, 2) if paying_users else 0
    pay_rate = round(paying_users / total_users * 100, 2)

    # 月度收入趋势
    tx_copy = transactions_df.copy()
    tx_copy["month"] = tx_copy["order_date"].dt.to_period("M")
    monthly = tx_copy.groupby("month")["order_amount"].sum().reset_index()
    monthly.columns = ["month", "revenue"]
    monthly["month"] = monthly["month"].astype(str)

    # 分品类收入占比
    cat_mix = transactions_df.groupby("category")["order_amount"].sum().reset_index()
    cat_mix.columns = ["category", "revenue"]
    cat_mix["pct"] = (cat_mix["revenue"] / total_revenue * 100).round(2)

    # LTV 估算 = ARPU × 平均留存月数（简化用6个月）
    avg_retention_months = 6
    ltv = round(arpu * avg_retention_months, 2)

    return {
        "overall": {
            "total_revenue": round(total_revenue, 2),
            "arpu": arpu,
            "arppu": arppu,
            "pay_rate": pay_rate,
            "paying_users": paying_users,
        },
        "monthly_trend": monthly,
        "category_mix": cat_mix,
        "ltv": ltv,
    }


def compute_referral(events_df: pd.DataFrame, users_df: pd.DataFrame) -> dict:
    """传播分析

    Returns
    -------
    dict with keys: share_rate, channel_share, k_factor
    """
    purchase_users = set(events_df[events_df["event_type"].isin(["purchase", "repurchase"])]["user_id"])
    share_users = set(events_df[events_df["event_type"] == "share"]["user_id"])

    total_purchase = len(purchase_users)
    total_share = len(share_users)
    share_rate = round(total_share / total_purchase * 100, 2) if total_purchase else 0

    # 各渠道口碑推荐占比
    referral_channel = users_df[users_df["channel"] == "口碑推荐"]["user_id"].count()

    # K因子 = 平均每人邀请人数 × 邀请转化率
    # 模拟参数：平均邀请0.8人，转化率30%
    avg_invites = 0.8
    invite_conversion = 0.30
    k_factor = round(avg_invites * invite_conversion, 2)

    return {
        "share_rate": share_rate,
        "total_share": total_share,
        "total_purchase": total_purchase,
        "referral_channel_pct": round(referral_channel / len(users_df) * 100, 2),
        "k_factor": k_factor,
        "viral": k_factor > 1,
    }


def compute_aarrr_summary(
    users_df: pd.DataFrame,
    events_df: pd.DataFrame,
    transactions_df: pd.DataFrame,
) -> pd.DataFrame:
    """AARRR 全漏斗汇总

    修正逻辑：
    - 激活用户：完成 browse 事件的用户
    - 留存用户：激活用户中，注册7天后仍有 browse/app_open 活动的用户
    - 转化率：相邻环节的转化率，而非相对于总用户

    Returns
    -------
    DataFrame with columns: stage, metric, users, conversion_rate
    """
    total_users = len(users_df)

    # Acquisition: 注册用户
    acquisition_users = total_users

    # Activation: 激活用户（完成 browse）
    activated_users = events_df[events_df["event_type"] == "browse"]["user_id"].nunique()

    # Retention: 留存用户（激活用户中，注册后仍有持续活动的）
    # 合并用户注册日期
    events_with_reg = events_df.merge(users_df[["user_id", "register_date"]], on="user_id", how="left")
    events_with_reg["days_since_reg"] = (
        pd.to_datetime(events_with_reg["event_date"]) - pd.to_datetime(events_with_reg["register_date"])
    ).dt.days

    # 只看激活用户
    activated_user_ids = set(events_df[events_df["event_type"] == "browse"]["user_id"].unique())

    # 留存用户：激活用户中，在注册1天后仍有 browse/app_open 活动的
    retained_events = events_with_reg[
        (events_with_reg["user_id"].isin(activated_user_ids)) &
        (events_with_reg["event_type"].isin(["browse", "app_open"])) &
        (events_with_reg["days_since_reg"] >= 1)
    ]
    retained_users = retained_events["user_id"].nunique()

    # Revenue: 付费用户
    paying_users = transactions_df["user_id"].nunique()

    # Referral: 分享用户
    shared_users = events_df[events_df["event_type"] == "share"]["user_id"].nunique()

    # 计算环节转化率（相邻环节）
    acq_to_act_rate = round(activated_users / acquisition_users * 100, 2) if acquisition_users > 0 else 0
    act_to_ret_rate = round(retained_users / activated_users * 100, 2) if activated_users > 0 else 0
    ret_to_rev_rate = round(paying_users / retained_users * 100, 2) if retained_users > 0 else 0
    rev_to_ref_rate = round(shared_users / paying_users * 100, 2) if paying_users > 0 else 0

    stages = [
        ("Acquisition", "注册用户", acquisition_users, 100.0),
        ("Activation", "激活用户", activated_users, acq_to_act_rate),
        ("Retention", "留存用户", retained_users, act_to_ret_rate),
        ("Revenue", "付费用户", paying_users, ret_to_rev_rate),
        ("Referral", "分享用户", shared_users, rev_to_ref_rate),
    ]

    df = pd.DataFrame(stages, columns=["stage", "metric", "users", "conversion_rate"])
    return df


# ---------------------------------------------------------------------------
# 3. 主函数
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    # 生成数据
    users_df, events_df, transactions_df = generate_aarrr_data(n_users=5000, seed=42)

    # 保存原始数据
    users_df.to_csv("data/users.csv", index=False)
    events_df.to_csv("data/user_events.csv", index=False)
    transactions_df.to_csv("data/transactions.csv", index=False)
    print(f"用户数: {len(users_df)}, 事件数: {len(events_df)}, 交易数: {len(transactions_df)}")

    # ---- 获客分析 ----
    acq = compute_acquisition(users_df)
    print("\n=== Acquisition 获客分析 ===")
    print(f"总体 CAC: {acq['cac_overall']}元/人")
    print(acq["channel_summary"].to_string(index=False))

    # ---- 激活分析 ----
    act = compute_activation(events_df)
    act_by_ch = compute_activation_by_channel(events_df, users_df)
    print("\n=== Activation 激活分析 ===")
    print(f"整体激活率: {act['activation_rate']}%")
    print(act_by_ch.to_string(index=False))

    # ---- 留存分析 ----
    ret = compute_retention(events_df, users_df)
    print("\n=== Retention 留存分析 ===")
    for ch, info in ret["channel_retention"].items():
        print(f"  {ch}: 留存率 {info['rate']}%")

    # ---- 收入分析 ----
    rev = compute_revenue(transactions_df, users_df)
    print("\n=== Revenue 收入分析 ===")
    print(f"总收入: {rev['overall']['total_revenue']:,.2f}元")
    print(f"ARPU: {rev['overall']['arpu']}元, ARPPU: {rev['overall']['arppu']}元")
    print(f"付费转化率: {rev['overall']['pay_rate']}%")
    print(f"LTV: {rev['ltv']}元")

    # ---- 传播分析 ----
    ref = compute_referral(events_df, users_df)
    print("\n=== Referral 传播分析 ===")
    print(f"分享率: {ref['share_rate']}%")
    print(f"K因子: {ref['k_factor']}, 病毒式增长: {ref['viral']}")

    # ---- 全漏斗汇总 ----
    summary = compute_aarrr_summary(users_df, events_df, transactions_df)
    summary.to_csv("data/aarrr_summary.csv", index=False)
    print("\n=== AARRR 全漏斗 ===")
    print(summary.to_string(index=False))

    # ---- 保存中间结果 ----
    # 渠道分析（合并获客、激活、留存、收入数据）
    channel_analysis = acq["channel_summary"].copy()
    # 合并激活率
    channel_analysis = channel_analysis.merge(act_by_ch, on="channel", how="left")
    channel_analysis.rename(columns={"activation_rate": "activation_rate_pct"}, inplace=True)
    channel_analysis["activation_rate"] = channel_analysis["activation_rate_pct"] / 100
    # 合并留存率
    ch_ret_list = []
    for ch, info in ret["channel_retention"].items():
        ch_ret_list.append({"channel": ch, "retention_d7": info["rate"] / 100})
    ch_ret_df = pd.DataFrame(ch_ret_list)
    channel_analysis = channel_analysis.merge(ch_ret_df, on="channel", how="left")
    # 合并收入数据
    channel_analysis["paid_rate"] = channel_analysis["channel"].map(
        lambda ch: rev["overall"]["pay_rate"] / 100
    )
    channel_analysis["avg_revenue"] = channel_analysis["channel"].map(
        lambda ch: rev["overall"]["arpu"]
    )
    channel_analysis.to_csv("data/channel_analysis.csv", index=False)

    # 留存数据：按注册月份 + d1/d7/d30 格式
    users_tmp = users_df.copy()
    users_tmp["register_month"] = pd.to_datetime(users_tmp["register_date"]).dt.to_period("M").astype(str)
    events_tmp = events_df.copy()
    events_tmp["event_date"] = pd.to_datetime(events_tmp["event_date"])
    users_tmp["register_date"] = pd.to_datetime(users_tmp["register_date"])

    retention_rows = []
    for month, group in users_tmp.groupby("register_month"):
        month_users = set(group["user_id"])
        month_events = events_tmp[events_tmp["user_id"].isin(month_users)]
        reg_dates = dict(zip(group["user_id"], group["register_date"]))
        month_events = month_events.copy()
        month_events["days_since"] = (month_events["event_date"] - month_events["user_id"].map(reg_dates)).dt.days
        d1 = month_events[month_events["days_since"] == 1]["user_id"].nunique() / len(month_users)
        d7 = month_events[(month_events["days_since"] >= 1) & (month_events["days_since"] <= 7)]["user_id"].nunique() / len(month_users)
        d30 = month_events[(month_events["days_since"] >= 1) & (month_events["days_since"] <= 30)]["user_id"].nunique() / len(month_users)
        retention_rows.append({
            "register_month": month,
            "d1_retention": round(d1, 4),
            "d7_retention": round(d7, 4),
            "d30_retention": round(d30, 4),
        })
    retention_df = pd.DataFrame(retention_rows)
    retention_df.to_csv("data/retention_data.csv", index=False)

    # 月度指标（增加 revenue, paid_users, active_users）
    monthly_metrics = acq["monthly_trend"].copy()
    transactions_tmp = transactions_df.copy()
    transactions_tmp["order_date"] = pd.to_datetime(transactions_tmp["order_date"])
    transactions_tmp["month"] = transactions_tmp["order_date"].dt.to_period("M").astype(str)
    monthly_rev = transactions_tmp.groupby("month").agg(
        revenue=("order_amount", "sum"),
        paid_users=("user_id", "nunique"),
    ).reset_index()
    monthly_metrics["month_str"] = monthly_metrics["month"].astype(str) if hasattr(monthly_metrics["month"], "astype") else monthly_metrics["month"]
    # 确保 month 列是字符串
    monthly_metrics["month"] = monthly_metrics["month"].astype(str)
    monthly_metrics = monthly_metrics.merge(monthly_rev, on="month", how="left")
    monthly_metrics["active_users"] = (monthly_metrics["new_users"] * np.random.uniform(0.3, 0.6, len(monthly_metrics))).astype(int)
    monthly_metrics["revenue"] = monthly_metrics["revenue"].fillna(0)
    monthly_metrics["paid_users"] = monthly_metrics["paid_users"].fillna(0).astype(int)
    monthly_metrics.to_csv("data/monthly_metrics.csv", index=False)

    print("\n所有数据已保存至 data/ 目录")
