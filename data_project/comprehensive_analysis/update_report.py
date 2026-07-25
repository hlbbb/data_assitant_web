#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
update_report.py - 更新综合分析报告
基于最新的查询结果数据更新报告中的表格和结论
"""

import os
import pandas as pd

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

def load_query(name):
    path = os.path.join(DATA_DIR, f'query_{name}.csv')
    if os.path.exists(path):
        return pd.read_csv(path)
    return pd.DataFrame()

def format_number(n, decimal=0):
    """格式化数字，添加千分位"""
    if pd.isna(n):
        return '—'
    if decimal == 0:
        return f'{int(n):,}'
    return f'{n:,.{decimal}f}'

def main():
    # 加载数据
    kpi = load_query('overall_kpi')
    funnel = load_query('aarrr_funnel')
    country = load_query('country_comparison')
    ltv_cac = load_query('ltv_cac')
    rfm = load_query('rfm_analysis')
    churn = load_query('churn')
    feedback = load_query('feedback')

    print("=== 数据汇总 ===\n")

    # 1. 全局KPI
    if not kpi.empty:
        row = kpi.iloc[0]
        print("【全局KPI】")
        print(f"  总注册用户: {format_number(row['total_users'])}")
        print(f"  总订单数: {format_number(row['total_orders'])}")
        print(f"  总收入: {format_number(row['total_revenue'], 2)}元")
        print(f"  平均客单价: {format_number(row['avg_order_value'], 2)}元")
        print(f"  付费转化率: {row['pay_rate']:.2f}%")
        print(f"  ARPU: {format_number(row['arpu'], 2)}元")
        print()

    # 2. AARRR漏斗 - 整体转化率
    if not funnel.empty:
        print("【AARRR漏斗 - 整体】")
        total_registered = funnel['registered'].sum()
        total_opened = funnel['opened'].sum()
        total_browsed = funnel['browsed'].sum()
        total_cart = funnel['added_to_cart'].sum()
        total_purchased = funnel['purchased'].sum()

        print(f"  注册: {format_number(total_registered)}")
        print(f"  激活(app_open): {format_number(total_opened)} ({total_opened/total_registered*100:.1f}%)")
        print(f"  浏览: {format_number(total_browsed)} ({total_browsed/total_registered*100:.1f}%)")
        print(f"  加购: {format_number(total_cart)} ({total_cart/total_registered*100:.1f}%)")
        print(f"  购买: {format_number(total_purchased)} ({total_purchased/total_registered*100:.1f}%)")
        print()

    # 3. 分国家KPI
    if not country.empty:
        print("【分国家KPI】")
        print(country[['country', 'total_users', 'paying_users', 'total_revenue', 'arpu', 'pay_rate']].to_string(index=False))
        print()

    # 4. 渠道LTV/CAC - 汇总
    if not ltv_cac.empty:
        print("【渠道LTV/CAC汇总】")
        channel_summary = ltv_cac.groupby('channel').agg({
            'ltv': 'mean',
            'cac': 'mean',
            'user_count': 'sum'
        }).reset_index()
        channel_summary['ltv_cac_ratio'] = channel_summary['ltv'] / channel_summary['cac']
        channel_summary = channel_summary.sort_values('ltv_cac_ratio', ascending=False)
        print(channel_summary.to_string(index=False))
        print()

    # 5. RFM分层统计
    if not rfm.empty:
        print("【RFM分层统计】")
        seg_stats = rfm.groupby('segment').agg({
            'user_id': 'count',
            'recency': 'mean',
            'frequency': 'mean',
            'monetary': ['mean', 'sum']
        }).round(2)
        seg_stats.columns = ['用户数', '平均R(天)', '平均F(次)', '平均M(元)', '总收入(元)']
        seg_stats['收入占比'] = (seg_stats['总收入(元)'] / seg_stats['总收入(元)'].sum() * 100).round(2)
        seg_stats = seg_stats.sort_values('总收入(元)', ascending=False)
        print(seg_stats.to_string())
        print()

    # 6. 流失分析
    if not churn.empty:
        print("【流失分析】")
        print(churn.to_string(index=False))
        print()

    # 7. NPS计算
    if not feedback.empty:
        print("【满意度分析】")
        total_fb = feedback['total_feedback'].sum()
        total_promoters = feedback['promoters'].sum()
        total_detractors = feedback['detractors'].sum()
        nps = (total_promoters - total_detractors) / total_fb * 100 if total_fb > 0 else 0
        print(f"  总反馈数: {format_number(total_fb)}")
        print(f"  推荐者: {format_number(total_promoters)} ({total_promoters/total_fb*100:.1f}%)")
        print(f"  贬损者: {format_number(total_detractors)} ({total_detractors/total_fb*100:.1f}%)")
        print(f"  NPS: {nps:.1f}")
        print()

if __name__ == '__main__':
    main()
