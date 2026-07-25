"""
RFM 用户分层分析 - 电商用户行为与价值分析
生成模拟数据 → RFM建模 → 八类分层 → 可视化 → 报告输出
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_rfm_data(n_users=2000, seed=42):
    """生成模拟电商用户交易数据"""
    np.random.seed(seed)

    # 用户基础信息
    user_ids = [f"U{i:05d}" for i in range(1, n_users + 1)]

    # 注册日期（模拟6个月内注册）
    base_date = datetime(2024, 1, 1)
    reg_dates = [base_date + timedelta(days=np.random.randint(0, 180)) for _ in range(n_users)]

    # 生成交易记录
    records = []
    current_date = datetime(2024, 12, 31)

    for i, uid in enumerate(user_ids):
        # 用户消费特征：高频用户 vs 低频用户
        if np.random.random() < 0.2:  # 20% 高价值用户
            n_orders = np.random.randint(8, 30)
            avg_amount = np.random.uniform(200, 800)
        elif np.random.random() < 0.5:  # 中间用户
            n_orders = np.random.randint(3, 10)
            avg_amount = np.random.uniform(100, 400)
        else:  # 低价值用户
            n_orders = np.random.randint(1, 4)
            avg_amount = np.random.uniform(30, 150)

        # 生成每笔订单
        for j in range(n_orders):
            order_date = base_date + timedelta(days=np.random.randint(0, 365))
            amount = round(avg_amount * np.random.uniform(0.5, 2.0), 2)
            records.append({
                'user_id': uid,
                'order_date': order_date,
                'order_amount': amount,
                'order_id': f"ORD{i:05d}_{j}"
            })

    df = pd.DataFrame(records)
    df = df.sort_values(['user_id', 'order_date']).reset_index(drop=True)
    return df


def compute_rfm(df, reference_date=None):
    """计算 RFM 指标"""
    if reference_date is None:
        reference_date = df['order_date'].max() + timedelta(days=1)

    rfm = df.groupby('user_id').agg(
        recency_days=('order_date', lambda x: (reference_date - x.max()).days),
        frequency=('order_date', 'nunique'),
        monetary=('order_amount', 'sum')
    ).reset_index()

    return rfm


def rfm_segment(rfm_df):
    """RFM 八类用户分层"""
    # 按中位数划分高/低
    r_med = rfm_df['recency_days'].median()
    f_med = rfm_df['frequency'].median()
    m_med = rfm_df['monetary'].median()

    def classify(row):
        r_high = row['recency_days'] <= r_med
        f_high = row['frequency'] > f_med
        m_high = row['monetary'] > m_med

        if r_high and f_high and m_high:
            return '重要价值用户'
        elif r_high and not f_high and m_high:
            return '重要发展用户'
        elif not r_high and f_high and m_high:
            return '重要保持用户'
        elif not r_high and not f_high and m_high:
            return '重要挽留用户'
        elif r_high and f_high and not m_high:
            return '一般价值用户'
        elif r_high and not f_high and not m_high:
            return '一般发展用户'
        elif not r_high and f_high and not m_high:
            return '一般保持用户'
        else:
            return '一般挽留用户'

    rfm_df['segment'] = rfm_df.apply(classify, axis=1)

    # RFM 评分 (1-5分)
    rfm_df['R_score'] = pd.qcut(rfm_df['recency_days'], 5, labels=[5, 4, 3, 2, 1]).astype(int)
    rfm_df['F_score'] = pd.qcut(rfm_df['frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    rfm_df['M_score'] = pd.qcut(rfm_df['monetary'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5]).astype(int)

    return rfm_df


if __name__ == '__main__':
    # 生成数据
    df = generate_rfm_data()
    df.to_csv('rfm_analysis/data/transactions.csv', index=False)
    print(f"生成交易记录: {len(df)} 条")

    # 计算 RFM
    rfm = compute_rfm(df)
    rfm = rfm_segment(rfm)
    rfm.to_csv('rfm_analysis/data/rfm_result.csv', index=False)
    print(f"RFM 用户数: {len(rfm)}")

    # 分层统计
    seg_summary = rfm.groupby('segment').agg(
        user_count=('user_id', 'count'),
        avg_recency=('recency_days', 'mean'),
        avg_frequency=('frequency', 'mean'),
        avg_monetary=('monetary', 'mean')
    ).round(2)
    print("\n=== RFM 分层统计 ===")
    print(seg_summary.to_string())
