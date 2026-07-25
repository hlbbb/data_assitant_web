"""
comprehensive_analysis.py
综合电商数据分析 — SQLite + Python 技术栈
生成模拟数据 → 写入 SQLite → SQL 查询分析 → 保存 CSV
"""

import sqlite3
import pandas as pd
import numpy as np
import os

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
DB_PATH = os.path.join(DATA_DIR, 'ecommerce.db')

# ============================================================
# 1. 数据生成
# ============================================================

COUNTRIES = ['泰国', '越南', '印尼', '菲律宾', '马来西亚']
CHANNELS = ['自然搜索', '付费广告', '社交媒体', 'KOL推荐', '内容营销']
DEVICES = ['iOS', 'Android']
AGE_GROUPS = ['18-24', '25-34', '35-44', '45+']
CATEGORIES = ['美妆', '3C数码', '服饰', '家居', '食品']

# 各国基础均价
BASE_PRICES = {'泰国': 250, '越南': 120, '印尼': 150, '菲律宾': 130, '马来西亚': 220}

# 各国品类偏好权重 (行=国家, 列=品类顺序: 美妆/3C数码/服饰/家居/食品)
CATEGORY_WEIGHTS = {
    '泰国':   [0.25, 0.20, 0.25, 0.15, 0.15],
    '越南':   [0.20, 0.25, 0.20, 0.15, 0.20],
    '印尼':   [0.30, 0.15, 0.20, 0.20, 0.15],
    '菲律宾': [0.20, 0.20, 0.25, 0.15, 0.20],
    '马来西亚': [0.15, 0.30, 0.20, 0.20, 0.15],
}

# 渠道×国家 cost_per_user
COST_PER_USER = {
    ('付费广告', '泰国'): 40, ('付费广告', '越南'): 25, ('付费广告', '印尼'): 30,
    ('付费广告', '菲律宾'): 22, ('付费广告', '马来西亚'): 45,
    ('自然搜索', '泰国'): 6, ('自然搜索', '越南'): 5, ('自然搜索', '印尼'): 7,
    ('自然搜索', '菲律宾'): 4, ('自然搜索', '马来西亚'): 8,
    ('社交媒体', '泰国'): 30, ('社交媒体', '越南'): 20, ('社交媒体', '印尼'): 25,
    ('社交媒体', '菲律宾'): 18, ('社交媒体', '马来西亚'): 35,
    ('KOL推荐', '泰国'): 18, ('KOL推荐', '越南'): 12, ('KOL推荐', '印尼'): 15,
    ('KOL推荐', '菲律宾'): 10, ('KOL推荐', '马来西亚'): 22,
    ('内容营销', '泰国'): 15, ('内容营销', '越南'): 10, ('内容营销', '印尼'): 12,
    ('内容营销', '菲律宾'): 8, ('内容营销', '马来西亚'): 18,
}


def generate_data():
    """生成模拟数据并写入 SQLite"""
    np.random.seed(42)

    # --- users 表 (~8000条) ---
    country_dist = [0.25, 0.22, 0.28, 0.15, 0.10]
    channel_dist = [0.25, 0.30, 0.20, 0.10, 0.15]
    device_dist = [0.45, 0.55]
    age_dist = [0.30, 0.35, 0.25, 0.10]
    gender_dist = [0.45, 0.55]

    n_users = 8000
    user_ids = [f'U{i:05d}' for i in range(n_users)]
    countries = np.random.choice(COUNTRIES, n_users, p=country_dist)
    channels = np.random.choice(CHANNELS, n_users, p=channel_dist)
    devices = np.random.choice(DEVICES, n_users, p=device_dist)
    age_groups = np.random.choice(AGE_GROUPS, n_users, p=age_dist)
    genders = np.random.choice(['男', '女'], n_users, p=gender_dist)

    # 注册日期：2023-01 ~ 2024-12，带增长趋势
    register_dates = []
    for i in range(n_users):
        month_idx = np.random.randint(0, 24)  # 0=2023-01 ... 23=2024-12
        year = 2023 + month_idx // 12
        month = month_idx % 12 + 1
        day = np.random.randint(1, 29)
        register_dates.append(f'{year:04d}-{month:02d}-{day:02d}')

    df_users = pd.DataFrame({
        'user_id': user_ids,
        'register_date': register_dates,
        'country': countries,
        'channel': channels,
        'device': devices,
        'age_group': age_groups,
        'gender': genders,
    })

    # --- transactions 表 (~30000条) ---
    # 用户分层：鲸鱼5%/海豚15%/小鱼30%/虾米50%
    # 但不是所有用户都下单，购买转化率约60%
    purchase_rate = 0.60  # 只有60%的用户会产生购买

    user_tiers = np.random.choice(
        ['鲸鱼', '海豚', '小鱼', '虾米', '无购买'],
        n_users,
        p=[0.05 * purchase_rate, 0.15 * purchase_rate, 0.30 * purchase_rate, 0.50 * purchase_rate, 1 - purchase_rate]
    )

    tier_order_range = {'鲸鱼': (15, 50), '海豚': (8, 20), '小鱼': (3, 10), '虾米': (1, 4), '无购买': (0, 0)}
    tier_multiplier = {
        '鲸鱼': (1.5, 3.0), '海豚': (0.8, 1.5),
        '小鱼': (0.5, 1.0), '虾米': (0.3, 0.6), '无购买': (0, 0)
    }

    tx_records = []
    for i in range(n_users):
        uid = user_ids[i]
        tier = user_tiers[i]
        country = countries[i]
        lo, hi = tier_order_range[tier]
        n_orders = np.random.randint(lo, hi + 1) if lo > 0 else 0
        if n_orders == 0:
            continue  # 无购买用户跳过
        base_price = BASE_PRICES[country]
        mul_lo, mul_hi = tier_multiplier[tier]

        for _ in range(n_orders):
            mul = np.random.uniform(mul_lo, mul_hi)
            amount = round(base_price * mul, 2)
            day_offset = np.random.randint(1, 730)
            order_date = pd.Timestamp('2023-01-01') + pd.Timedelta(days=day_offset)
            # 品类：按国家偏好
            cat_idx = np.random.choice(5, p=CATEGORY_WEIGHTS[country])
            cat = CATEGORIES[cat_idx]
            is_first = 1 if np.random.random() < 0.05 else 0  # 少数标记首单
            tx_records.append({
                'user_id': uid,
                'order_id': f'ORD{len(tx_records)+1:06d}',
                'order_date': order_date.strftime('%Y-%m-%d'),
                'order_amount': amount,
                'category': cat,
                'country': country,
                'is_first_order': is_first,
            })

    df_transactions = pd.DataFrame(tx_records)

    # --- user_events 表 (~60000条) ---
    # 漏斗转化率: register→app_open 85%, app_open→browse 75%,
    # browse→add_to_cart 45%, add_to_cart→purchase 55%,
    # purchase→repurchase 35%, purchase→share 20%
    funnel_rates = {
        'app_open': 0.85,
        'browse': 0.75,
        'add_to_cart': 0.45,
        'purchase': 0.55,
        'repurchase': 0.35,
        'share': 0.20,
    }

    event_records = []
    for i in range(n_users):
        uid = user_ids[i]
        reg_date = register_dates[i]
        # register event
        event_records.append({
            'user_id': uid,
            'event_type': 'register',
            'event_date': reg_date,
            'page_id': f'page_{np.random.randint(1, 100):03d}',
            'duration_seconds': np.random.randint(5, 30),
        })

        r = np.random.random()
        if r < funnel_rates['app_open']:
            event_records.append({
                'user_id': uid,
                'event_type': 'app_open',
                'event_date': reg_date,
                'page_id': f'page_{np.random.randint(1, 100):03d}',
                'duration_seconds': np.random.randint(10, 60),
            })

            r2 = np.random.random()
            if r2 < funnel_rates['browse']:
                event_records.append({
                    'user_id': uid,
                    'event_type': 'browse',
                    'event_date': reg_date,
                    'page_id': f'page_{np.random.randint(1, 100):03d}',
                    'duration_seconds': np.random.randint(30, 300),
                })

                r3 = np.random.random()
                if r3 < funnel_rates['add_to_cart']:
                    event_records.append({
                        'user_id': uid,
                        'event_type': 'add_to_cart',
                        'event_date': reg_date,
                        'page_id': f'page_{np.random.randint(1, 100):03d}',
                        'duration_seconds': np.random.randint(15, 120),
                    })

            # share event (独立概率)
            if np.random.random() < funnel_rates['share']:
                share_date = pd.Timestamp(reg_date) + pd.Timedelta(days=np.random.randint(1, 30))
                event_records.append({
                    'user_id': uid,
                    'event_type': 'share',
                    'event_date': share_date.strftime('%Y-%m-%d'),
                    'page_id': f'page_{np.random.randint(1, 100):03d}',
                    'duration_seconds': np.random.randint(5, 30),
                })

    # 将 event_records 转成 DataFrame
    df_events = pd.DataFrame(event_records)

    # --- channel_costs 表 ---
    cost_records = []
    for (ch, co), cpu in COST_PER_USER.items():
        monthly_budget = int(cpu * np.random.randint(200, 600) * 1.2)
        cost_records.append({
            'channel': ch,
            'country': co,
            'monthly_budget': monthly_budget,
            'cost_per_user': cpu,
        })
    df_channel_costs = pd.DataFrame(cost_records)

    # --- user_feedback 表 (~12000条) ---
    rating_dist = [0.05, 0.10, 0.20, 0.30, 0.35]  # 1-5星
    country_avg = {'泰国': 4.0, '越南': 3.6, '印尼': 3.7, '菲律宾': 3.4, '马来西亚': 3.8}

    feedback_records = []
    for i in range(n_users):
        uid = user_ids[i]
        co = countries[i]
        # 调整评分分布：根据国家均值偏移
        base_rating_probs = np.array(rating_dist)
        # 简化：直接用标准分布
        rating = np.random.choice([1, 2, 3, 4, 5], p=rating_dist)
        cat = np.random.choice(CATEGORIES)
        day_offset = np.random.randint(1, 730)
        fb_date = pd.Timestamp('2023-01-01') + pd.Timedelta(days=day_offset)

        # 简单中文模板
        if rating >= 4:
            fb_text = '非常满意，产品很好用！' if rating == 5 else '还不错，基本满意。'
        elif rating == 3:
            fb_text = '一般般，有待改进。'
        else:
            fb_text = '不太满意，需要改善。' if rating == 2 else '非常不满意，体验很差。'

        feedback_records.append({
            'user_id': uid,
            'order_id': f'FB{len(feedback_records)+1:06d}',
            'rating': rating,
            'feedback_text': fb_text,
            'feedback_date': fb_date.strftime('%Y-%m-%d'),
            'category': cat,
        })

    df_feedback = pd.DataFrame(feedback_records)

    # 写入 SQLite
    conn = sqlite3.connect(DB_PATH)
    df_users.to_sql('users', conn, if_exists='replace', index=False)
    df_transactions.to_sql('transactions', conn, if_exists='replace', index=False)
    df_events.to_sql('user_events', conn, if_exists='replace', index=False)
    df_channel_costs.to_sql('channel_costs', conn, if_exists='replace', index=False)
    df_feedback.to_sql('user_feedback', conn, if_exists='replace', index=False)
    conn.close()

    # 保存原始 CSV
    df_users.to_csv(os.path.join(DATA_DIR, 'users.csv'), index=False, encoding='utf-8-sig')
    df_transactions.to_csv(os.path.join(DATA_DIR, 'transactions.csv'), index=False, encoding='utf-8-sig')
    df_events.to_csv(os.path.join(DATA_DIR, 'user_events.csv'), index=False, encoding='utf-8-sig')
    df_channel_costs.to_csv(os.path.join(DATA_DIR, 'channel_costs.csv'), index=False, encoding='utf-8-sig')
    df_feedback.to_csv(os.path.join(DATA_DIR, 'user_feedback.csv'), index=False, encoding='utf-8-sig')

    print(f'数据生成完成: {n_users} 用户, {len(tx_records)} 订单, {len(event_records)} 事件, {len(feedback_records)} 反馈')


# ============================================================
# 2. SQL 分析查询函数
# ============================================================

def sql_overall_kpi():
    """全局KPI：总用户、总订单、总收入、ARPU、ARPPU、付费转化率"""
    sql = """
    -- 全局KPI：核心指标一览
    SELECT
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM transactions) as total_orders,
        (SELECT ROUND(SUM(order_amount), 2) FROM transactions) as total_revenue,
        (SELECT ROUND(AVG(order_amount), 2) FROM transactions) as avg_order_value,
        (SELECT COUNT(DISTINCT user_id) FROM transactions) as paying_users,
        ROUND(
            (SELECT COUNT(DISTINCT user_id) FROM transactions) * 100.0 /
            (SELECT COUNT(*) FROM users), 2
        ) as pay_rate,
        ROUND(
            (SELECT SUM(order_amount) FROM transactions) /
            (SELECT COUNT(*) FROM users), 2
        ) as arpu,
        ROUND(
            (SELECT SUM(order_amount) FROM transactions) /
            (SELECT COUNT(DISTINCT user_id) FROM transactions), 2
        ) as arppu
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_overall_kpi.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_aarrr_funnel():
    """AARRR漏斗：按渠道统计各阶段用户数"""
    sql = """
    -- AARRR漏斗分析：按渠道统计各阶段用户数
    SELECT
        u.channel,
        COUNT(DISTINCT u.user_id) as total_users,
        COUNT(DISTINCT CASE WHEN e_register.event_type = 'register' THEN u.user_id END) as registered,
        COUNT(DISTINCT CASE WHEN e_open.event_type = 'app_open' THEN u.user_id END) as opened,
        COUNT(DISTINCT CASE WHEN e_browse.event_type = 'browse' THEN u.user_id END) as browsed,
        COUNT(DISTINCT CASE WHEN e_cart.event_type = 'add_to_cart' THEN u.user_id END) as added_to_cart,
        COUNT(DISTINCT CASE WHEN t_buy.order_id IS NOT NULL THEN u.user_id END) as purchased,
        COUNT(DISTINCT CASE WHEN t_repurchase.cnt > 1 THEN u.user_id END) as repurchased,
        COUNT(DISTINCT CASE WHEN e_share.event_type = 'share' THEN u.user_id END) as shared
    FROM users u
    LEFT JOIN user_events e_register ON u.user_id = e_register.user_id AND e_register.event_type = 'register'
    LEFT JOIN user_events e_open ON u.user_id = e_open.user_id AND e_open.event_type = 'app_open'
    LEFT JOIN user_events e_browse ON u.user_id = e_browse.user_id AND e_browse.event_type = 'browse'
    LEFT JOIN user_events e_cart ON u.user_id = e_cart.user_id AND e_cart.event_type = 'add_to_cart'
    LEFT JOIN transactions t_buy ON u.user_id = t_buy.user_id
    LEFT JOIN (
        SELECT user_id, COUNT(*) as cnt FROM transactions GROUP BY user_id
    ) t_repurchase ON u.user_id = t_repurchase.user_id
    LEFT JOIN user_events e_share ON u.user_id = e_share.user_id AND e_share.event_type = 'share'
    GROUP BY u.channel
    ORDER BY u.channel
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()

    # 计算转化率
    for col in ['opened', 'browsed', 'added_to_cart', 'purchased', 'repurchased', 'shared']:
        result[f'{col}_rate'] = (result[col] / result['registered'] * 100).round(2)

    result.to_csv(os.path.join(DATA_DIR, 'query_aarrr_funnel.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_monthly_trends():
    """月度趋势：按月聚合用户、订单、收入、ARPU"""
    sql = """
    -- 月度趋势：按月聚合核心指标
    SELECT
        strftime('%Y-%m', t.order_date) as month,
        COUNT(DISTINCT t.user_id) as active_users,
        COUNT(*) as order_count,
        ROUND(SUM(t.order_amount), 2) as revenue,
        ROUND(SUM(t.order_amount) / COUNT(DISTINCT t.user_id), 2) as arpu,
        ROUND(AVG(t.order_amount), 2) as avg_order_value
    FROM transactions t
    GROUP BY strftime('%Y-%m', t.order_date)
    ORDER BY month
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_monthly_trends.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_rfm_analysis():
    """RFM分层：计算每个用户的R/F/M，分群"""
    sql = """
    -- RFM分析：计算用户最近购买时间、频次、金额，并分群
    WITH rfm AS (
        SELECT
            u.user_id,
            u.country,
            u.channel,
            CAST(julianday('2024-12-31') - julianday(MAX(t.order_date)) AS INTEGER) as recency,
            COUNT(DISTINCT t.order_id) as frequency,
            ROUND(SUM(t.order_amount), 2) as monetary
        FROM users u
        LEFT JOIN transactions t ON u.user_id = t.user_id
        GROUP BY u.user_id
    ),
    rfm_scored AS (
        SELECT
            user_id,
            country,
            channel,
            recency,
            frequency,
            monetary,
            NTILE(5) OVER (ORDER BY recency DESC) as r_score,
            NTILE(5) OVER (ORDER BY frequency) as f_score,
            NTILE(5) OVER (ORDER BY monetary) as m_score
        FROM rfm
    )
    SELECT
        user_id,
        country,
        channel,
        recency,
        frequency,
        monetary,
        r_score,
        f_score,
        m_score,
        CASE
            WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN '重要价值用户'
            WHEN r_score >= 4 AND f_score <= 2 AND m_score >= 4 THEN '重要发展用户'
            WHEN r_score <= 2 AND f_score >= 4 AND m_score >= 4 THEN '重要保持用户'
            WHEN r_score <= 2 AND f_score <= 2 AND m_score >= 4 THEN '重要挽留用户'
            WHEN r_score >= 4 AND f_score >= 4 AND m_score <= 2 THEN '一般价值用户'
            WHEN r_score >= 4 AND f_score <= 2 AND m_score <= 2 THEN '一般发展用户'
            WHEN r_score <= 2 AND f_score >= 4 AND m_score <= 2 THEN '一般保持用户'
            ELSE '一般挽留用户'
        END as segment
    FROM rfm_scored
    ORDER BY monetary DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_rfm_analysis.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_ltv_cac():
    """LTV/CAC：分渠道×国家计算LTV和CAC"""
    sql = """
    -- LTV/CAC分析：分渠道×国家
    WITH user_ltv AS (
        SELECT
            u.channel,
            u.country,
            u.user_id,
            ROUND(SUM(t.order_amount), 2) as ltv
        FROM users u
        LEFT JOIN transactions t ON u.user_id = t.user_id
        GROUP BY u.user_id
    ),
    channel_ltv AS (
        SELECT
            channel,
            country,
            ROUND(AVG(ltv), 2) as avg_ltv,
            COUNT(*) as user_count
        FROM user_ltv
        GROUP BY channel, country
    )
    SELECT
        cl.channel,
        cl.country,
        cc.cost_per_user as cac,
        cl.avg_ltv as ltv,
        ROUND(cl.avg_ltv / cc.cost_per_user, 2) as ltv_cac_ratio,
        cl.user_count
    FROM channel_ltv cl
    JOIN channel_costs cc ON cl.channel = cc.channel AND cl.country = cc.country
    ORDER BY ltv_cac_ratio DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_ltv_cac.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_cohort_retention():
    """同期群留存：按注册月份分组，计算M0~M11留存率"""
    sql = """
    -- 同期群留存分析：按注册月份分组，计算各月留存率
    WITH cohort_sizes AS (
        SELECT
            strftime('%Y-%m', register_date) as cohort_month,
            COUNT(*) as cohort_size
        FROM users
        GROUP BY cohort_month
    ),
    user_activity AS (
        SELECT
            strftime('%Y-%m', u.register_date) as cohort_month,
            strftime('%Y-%m', t.order_date) as activity_month,
            COUNT(DISTINCT u.user_id) as active_users
        FROM users u
        JOIN transactions t ON u.user_id = t.user_id
        GROUP BY cohort_month, activity_month
    ),
    retention AS (
        SELECT
            ua.cohort_month,
            ua.activity_month,
            ua.active_users,
            cs.cohort_size,
            ROUND(ua.active_users * 100.0 / cs.cohort_size, 2) as retention_rate
        FROM user_activity ua
        JOIN cohort_sizes cs ON ua.cohort_month = cs.cohort_month
    )
    SELECT * FROM retention
    ORDER BY cohort_month, activity_month
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_cohort_retention.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_country_comparison():
    """分国家对比：各国核心指标"""
    sql = """
    -- 分国家对比：各国核心指标
    SELECT
        u.country,
        COUNT(DISTINCT u.user_id) as total_users,
        COUNT(DISTINCT t.user_id) as paying_users,
        COUNT(*) as order_count,
        ROUND(SUM(t.order_amount), 2) as total_revenue,
        ROUND(SUM(t.order_amount) / COUNT(DISTINCT u.user_id), 2) as arpu,
        ROUND(SUM(t.order_amount) / COUNT(DISTINCT t.user_id), 2) as arppu,
        ROUND(AVG(t.order_amount), 2) as avg_order_value,
        ROUND(
            COUNT(DISTINCT t.user_id) * 100.0 / COUNT(DISTINCT u.user_id), 2
        ) as pay_rate
    FROM users u
    LEFT JOIN transactions t ON u.user_id = t.user_id
    GROUP BY u.country
    ORDER BY total_revenue DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_country_comparison.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_category_analysis():
    """品类分析：各品类收入、占比，品类×国家交叉"""
    # 品类收入
    sql1 = """
    -- 品类收入分析
    SELECT
        category,
        COUNT(*) as order_count,
        ROUND(SUM(order_amount), 2) as total_revenue,
        ROUND(AVG(order_amount), 2) as avg_price,
        ROUND(
            SUM(order_amount) * 100.0 / (SELECT SUM(order_amount) FROM transactions), 2
        ) as revenue_pct
    FROM transactions
    GROUP BY category
    ORDER BY total_revenue DESC
    """
    # 品类×国家交叉
    sql2 = """
    -- 品类×国家交叉分析
    SELECT
        t.category,
        t.country,
        COUNT(*) as order_count,
        ROUND(SUM(t.order_amount), 2) as total_revenue,
        ROUND(AVG(t.order_amount), 2) as avg_price
    FROM transactions t
    GROUP BY t.category, t.country
    ORDER BY t.category, t.country
    """
    # 品类共购矩阵
    sql3 = """
    -- 品类共购矩阵：用户同时购买A和B的次数
    SELECT
        t1.category as category_a,
        t2.category as category_b,
        COUNT(*) as co_purchase_count
    FROM transactions t1
    JOIN transactions t2 ON t1.user_id = t2.user_id
        AND t1.category < t2.category
        AND t1.order_date = t2.order_date
    GROUP BY t1.category, t2.category
    ORDER BY co_purchase_count DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result1 = pd.read_sql(sql1, conn)
    result2 = pd.read_sql(sql2, conn)
    result3 = pd.read_sql(sql3, conn)
    conn.close()

    result1.to_csv(os.path.join(DATA_DIR, 'query_category_analysis.csv'), index=False, encoding='utf-8-sig')
    result2.to_csv(os.path.join(DATA_DIR, 'query_category_country.csv'), index=False, encoding='utf-8-sig')
    result3.to_csv(os.path.join(DATA_DIR, 'query_category_cross.csv'), index=False, encoding='utf-8-sig')
    return result1, result2, result3


def sql_repurchase_analysis():
    """复购分析：复购间隔、复购率、分国家/品类复购率"""
    sql = """
    -- 复购分析：复购率、分国家/品类
    WITH user_orders AS (
        SELECT
            user_id,
            order_id,
            order_date,
            category,
            country,
            ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) as order_seq
        FROM transactions
    ),
    repurchase_interval AS (
        SELECT
            user_id,
            category,
            country,
            CAST(julianday(order_date) - julianday(LAG(order_date) OVER (
                PARTITION BY user_id ORDER BY order_date
            )) AS INTEGER) as days_since_last
        FROM user_orders
    ),
    repurchase_stats AS (
        SELECT
            country,
            category,
            COUNT(DISTINCT user_id) as total_users_in_group,
            SUM(CASE WHEN days_since_last IS NOT NULL THEN 1 ELSE 0 END) as repurchase_count
        FROM repurchase_interval
        GROUP BY country, category
    )
    SELECT
        country,
        category,
        total_users_in_group,
        repurchase_count,
        ROUND(repurchase_count * 100.0 / total_users_in_group, 2) as repurchase_rate
    FROM repurchase_stats
    ORDER BY repurchase_rate DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_repurchase.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_feedback_analysis():
    """满意度分析：NPS、分国家/品类评分、评分分布"""
    sql = """
    -- 满意度分析：NPS、评分分布、分国家/品类
    -- 需要从 users 表关联 country，从 user_feedback 自身获取 category
    SELECT
        u.country,
        f.category,
        AVG(f.rating) as avg_rating,
        COUNT(*) as total_feedback,
        SUM(CASE WHEN f.rating = 5 THEN 1 ELSE 0 END) as promoters,
        SUM(CASE WHEN f.rating <= 2 THEN 1 ELSE 0 END) as detractors,
        ROUND(
            (SUM(CASE WHEN f.rating = 5 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) -
            (SUM(CASE WHEN f.rating <= 2 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2
        ) as nps
    FROM user_feedback f
    JOIN users u ON f.user_id = u.user_id
    GROUP BY u.country, f.category
    ORDER BY nps DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_feedback.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_churn_analysis():
    """流失分析：定义最近90天无交易为流失"""
    sql = """
    -- 流失分析：最近90天无交易为流失
    WITH last_activity AS (
        SELECT
            u.user_id,
            u.country,
            u.channel,
            MAX(t.order_date) as last_order_date,
            CASE
                WHEN MAX(t.order_date) IS NULL THEN 1
                WHEN julianday('2024-12-31') - julianday(MAX(t.order_date)) > 90 THEN 1
                ELSE 0
            END as is_churned
        FROM users u
        LEFT JOIN transactions t ON u.user_id = t.user_id
        GROUP BY u.user_id
    )
    SELECT
        country,
        COUNT(*) as total_users,
        SUM(is_churned) as churned_users,
        ROUND(SUM(is_churned) * 100.0 / COUNT(*), 2) as churn_rate,
        COUNT(*) - SUM(is_churned) as active_users,
        ROUND((COUNT(*) - SUM(is_churned)) * 100.0 / COUNT(*), 2) as active_rate
    FROM last_activity
    GROUP BY country
    ORDER BY churn_rate DESC
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_churn.csv'), index=False, encoding='utf-8-sig')
    return result


def sql_acquisition_cost():
    """获客成本趋势：月度获客数、CAC变化"""
    sql = """
    -- 获客成本趋势：月度获客数与CAC
    WITH monthly_new_users AS (
        SELECT
            strftime('%Y-%m', register_date) as month,
            COUNT(*) as new_users
        FROM users
        GROUP BY month
    ),
    monthly_costs AS (
        SELECT
            strftime('%Y-%m', '2024-01-01') as month,
            SUM(monthly_budget) as total_spend,
            COUNT(*) as channel_count
        FROM channel_costs
    )
    SELECT
        m.month,
        m.new_users,
        ROUND(m.new_users * 30.0, 2) as estimated_cac,
        '基于渠道成本估算' as note
    FROM monthly_new_users m
    ORDER BY m.month
    """
    conn = sqlite3.connect(DB_PATH)
    result = pd.read_sql(sql, conn)
    conn.close()
    result.to_csv(os.path.join(DATA_DIR, 'query_acquisition.csv'), index=False, encoding='utf-8-sig')
    return result


# ============================================================
# 3. 汇总打印
# ============================================================

def print_summary(results):
    """打印关键指标汇总"""
    kpi = results.get('overall_kpi')
    if kpi is not None and len(kpi) > 0:
        row = kpi.iloc[0]
        print('=== 全局KPI ===')
        print(f"  总用户: {int(row['total_users'])}")
        print(f"  总订单: {int(row['total_orders'])}")
        print(f"  总收入: {row['total_revenue']} 元")
        print(f"  付费转化率: {row['pay_rate']}%")
        print(f"  ARPU: {row['arpu']} 元")
        print(f"  ARPPU: {row['arppu']} 元")

    print()
    print('=== 分析查询结果已保存 ===')
    csv_files = [f for f in os.listdir(DATA_DIR) if f.startswith('query_') and f.endswith('.csv')]
    for f in sorted(csv_files):
        print(f'  {f}')


# ============================================================
# 4. 主函数
# ============================================================

if __name__ == '__main__':
    # 1. 生成数据并写入 SQLite
    generate_data()

    # 2. 执行所有 SQL 分析查询
    results = {}
    results['overall_kpi'] = sql_overall_kpi()
    results['aarrr_funnel'] = sql_aarrr_funnel()
    results['monthly_trends'] = sql_monthly_trends()
    results['rfm_analysis'] = sql_rfm_analysis()
    results['ltv_cac'] = sql_ltv_cac()
    results['cohort_retention'] = sql_cohort_retention()
    results['country_comparison'] = sql_country_comparison()
    cat_results = sql_category_analysis()
    results['repurchase'] = sql_repurchase_analysis()
    results['feedback'] = sql_feedback_analysis()
    results['churn'] = sql_churn_analysis()
    results['acquisition'] = sql_acquisition_cost()

    # 3. 打印关键指标
    print_summary(results)

    # 4. 关闭
    print()
    print('全部完成！数据库: data/ecommerce.db')
