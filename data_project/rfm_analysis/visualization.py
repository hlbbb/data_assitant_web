"""RFM 可视化分析 - 生成所有图表"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from matplotlib.gridspec import GridSpec
import warnings
warnings.filterwarnings('ignore')

# 中文字体设置
matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'PingFang SC']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['figure.dpi'] = 150

# 读取数据
transactions = pd.read_csv('data/transactions.csv', parse_dates=['order_date'])
rfm = pd.read_csv('data/rfm_result.csv')

segment_order = [
    '重要价值用户', '重要发展用户', '重要保持用户', '重要挽留用户',
    '一般价值用户', '一般发展用户', '一般保持用户', '一般挽留用户'
]
segment_colors = {
    '重要价值用户': '#FF4B4B', '重要发展用户': '#FF8C42', '重要保持用户': '#FFB347', '重要挽留用户': '#FFD700',
    '一般价值用户': '#87CEEB', '一般发展用户': '#98D8C8', '一般保持用户': '#B0C4DE', '一般挽留用户': '#D3D3D3'
}


def plot_rfm_distribution():
    """图1: RFM 三个维度分布"""
    fig, axes = plt.subplots(1, 3, figsize=(16, 5))

    axes[0].hist(rfm['recency_days'], bins=30, color='#4ECDC4', edgecolor='white', alpha=0.85)
    axes[0].axvline(rfm['recency_days'].median(), color='red', linestyle='--', label=f"中位数={rfm['recency_days'].median():.0f}天")
    axes[0].set_title('R - 最近消费天数分布', fontsize=14, fontweight='bold')
    axes[0].set_xlabel('天数')
    axes[0].set_ylabel('用户数')
    axes[0].legend()

    axes[1].hist(rfm['frequency'], bins=20, color='#FF6B6B', edgecolor='white', alpha=0.85)
    axes[1].axvline(rfm['frequency'].median(), color='blue', linestyle='--', label=f"中位数={rfm['frequency'].median():.0f}次")
    axes[1].set_title('F - 消费频次分布', fontsize=14, fontweight='bold')
    axes[1].set_xlabel('消费次数')
    axes[1].legend()

    axes[2].hist(rfm['monetary'], bins=30, color='#45B7D1', edgecolor='white', alpha=0.85)
    axes[2].axvline(rfm['monetary'].median(), color='green', linestyle='--', label=f"中位数=¥{rfm['monetary'].median():.0f}")
    axes[2].set_title('M - 消费金额分布', fontsize=14, fontweight='bold')
    axes[2].set_xlabel('金额(元)')
    axes[2].legend()

    plt.suptitle('RFM 三个核心维度分布', fontsize=16, fontweight='bold', y=1.02)
    plt.tight_layout()
    plt.savefig('charts/01_rfm_distribution.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图1: RFM维度分布")


def plot_segment_pie():
    """图2: 用户分层饼图"""
    seg_counts = rfm['segment'].value_counts().reindex(segment_order).dropna()

    fig, ax = plt.subplots(figsize=(5, 4))
    colors = [segment_colors.get(s, '#999') for s in seg_counts.index]

    wedges, texts, autotexts = ax.pie(
        seg_counts.values, labels=seg_counts.index, colors=colors,
        autopct='%1.1f%%', startangle=90, pctdistance=0.8,
        wedgeprops=dict(width=0.5, edgecolor='white', linewidth=2)
    )

    for text in texts:
        text.set_fontsize(8)
    for autotext in autotexts:
        autotext.set_fontsize(7)
        autotext.set_fontweight('bold')

    ax.set_title('RFM 八类用户分层占比', fontsize=12, fontweight='bold', pad=10)

    # 中心文字
    ax.text(0, 0, f'总计\n{len(rfm)}用户', ha='center', va='center', fontsize=10, fontweight='bold')

    plt.savefig('charts/02_segment_pie.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图2: 用户分层饼图")


def plot_segment_bar():
    """图3: 各分层用户数量与平均消费金额"""
    seg_stats = rfm.groupby('segment').agg(
        count=('user_id', 'count'),
        avg_m=('monetary', 'mean'),
        total_m=('monetary', 'sum')
    ).reindex(segment_order).dropna()

    fig, ax1 = plt.subplots(figsize=(14, 6))

    x = range(len(seg_stats))
    colors = [segment_colors.get(s, '#999') for s in seg_stats.index]

    bars = ax1.bar(x, seg_stats['count'], color=colors, edgecolor='white', linewidth=1.5, alpha=0.9)
    ax1.set_ylabel('用户数量', fontsize=12)
    ax1.set_xticks(x)
    ax1.set_xticklabels(seg_stats.index, rotation=30, ha='right', fontsize=11)

    # 数值标注
    for bar, val in zip(bars, seg_stats['count']):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5,
                f'{val}', ha='center', va='bottom', fontsize=10, fontweight='bold')

    ax2 = ax1.twinx()
    ax2.plot(x, seg_stats['avg_m'], 'o-', color='#E74C3C', linewidth=2.5, markersize=8, zorder=5)
    ax2.set_ylabel('平均消费金额(元)', fontsize=12, color='#E74C3C')
    ax2.tick_params(axis='y', labelcolor='#E74C3C')

    for i, val in enumerate(seg_stats['avg_m']):
        ax2.annotate(f'¥{val:.0f}', (i, val), textcoords="offset points",
                    xytext=(0, 12), ha='center', fontsize=9, color='#E74C3C', fontweight='bold')

    ax1.set_title('各分层用户数量 & 平均消费金额', fontsize=16, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig('charts/03_segment_bar.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图3: 分层柱状图")


def plot_rfm_scatter():
    """图4: R-F-M 三维散点图"""
    fig, axes = plt.subplots(1, 2, figsize=(16, 7))

    # R vs F
    for seg in segment_order:
        subset = rfm[rfm['segment'] == seg]
        if len(subset) > 0:
            axes[0].scatter(subset['recency_days'], subset['frequency'],
                          c=segment_colors.get(seg, '#999'), label=seg, alpha=0.6, s=20)

    axes[0].set_xlabel('最近消费天数(R)', fontsize=12)
    axes[0].set_ylabel('消费频次(F)', fontsize=12)
    axes[0].set_title('R vs F 散点分布', fontsize=14, fontweight='bold')
    axes[0].legend(fontsize=7, loc='upper right')

    # F vs M
    for seg in segment_order:
        subset = rfm[rfm['segment'] == seg]
        if len(subset) > 0:
            axes[1].scatter(subset['frequency'], subset['monetary'],
                          c=segment_colors.get(seg, '#999'), label=seg, alpha=0.6, s=20)

    axes[1].set_xlabel('消费频次(F)', fontsize=12)
    axes[1].set_ylabel('消费金额(M)', fontsize=12)
    axes[1].set_title('F vs M 散点分布', fontsize=14, fontweight='bold')
    axes[1].legend(fontsize=7, loc='upper right')

    plt.suptitle('RFM 维度关系散点图', fontsize=16, fontweight='bold', y=1.02)
    plt.tight_layout()
    plt.savefig('charts/04_rfm_scatter.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图4: RFM散点图")


def plot_funnel():
    """图5: 用户行为漏斗"""
    total_users = transactions['user_id'].nunique()

    # 模拟漏斗数据：浏览 → 加购 → 收藏 → 购买
    funnel_stages = {
        '浏览用户': total_users,
        '加购用户': int(total_users * 0.62),
        '收藏用户': int(total_users * 0.38),
        '复购用户': int(total_users * 0.35),
        '高频用户': int(total_users * 0.15),
        '高价值用户': len(rfm[rfm['segment'].isin(['重要价值用户'])])
    }

    stages = list(funnel_stages.keys())
    values = list(funnel_stages.values())

    fig, ax = plt.subplots(figsize=(10, 7))

    max_val = values[0]
    for i, (stage, val) in enumerate(zip(stages, values)):
        width = val / max_val * 0.8
        left = (1 - width) / 2
        color = plt.cm.RdYlGn_r(i / len(stages))

        ax.barh(len(stages) - i - 1, width, left=left, height=0.6,
               color=color, edgecolor='white', linewidth=2)

        # 转化率
        if i > 0:
            conv_rate = val / values[i-1] * 100
            ax.text(0.5, len(stages) - i - 0.5, f'↓ {conv_rate:.1f}%',
                   ha='center', va='center', fontsize=10, color='#666', fontweight='bold')

        ax.text(0.5, len(stages) - i - 1, f'{stage}\n{val} ({val/max_val*100:.1f}%)',
               ha='center', va='center', fontsize=11, fontweight='bold')

    ax.set_xlim(0, 1)
    ax.set_ylim(-0.5, len(stages) - 0.3)
    ax.axis('off')
    ax.set_title('用户行为转化漏斗', fontsize=16, fontweight='bold', pad=15)

    plt.tight_layout()
    plt.savefig('charts/05_funnel.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图5: 用户行为漏斗")


def plot_monthly_trend():
    """图6: 月度消费趋势"""
    transactions['month'] = transactions['order_date'].dt.to_period('M')
    monthly = transactions.groupby('month').agg(
        order_count=('order_id', 'count'),
        total_amount=('order_amount', 'sum'),
        active_users=('user_id', 'nunique')
    ).reset_index()
    monthly['month_str'] = monthly['month'].astype(str)

    fig, ax1 = plt.subplots(figsize=(14, 6))

    ax1.fill_between(range(len(monthly)), monthly['total_amount'], alpha=0.3, color='#3498DB')
    line1 = ax1.plot(range(len(monthly)), monthly['total_amount'], 'o-',
                    color='#3498DB', linewidth=2.5, markersize=8, label='消费总额')
    ax1.set_ylabel('消费总额(元)', fontsize=12, color='#3498DB')

    ax2 = ax1.twinx()
    line2 = ax2.plot(range(len(monthly)), monthly['active_users'], 's-',
                    color='#E74C3C', linewidth=2.5, markersize=8, label='活跃用户数')
    ax2.set_ylabel('活跃用户数', fontsize=12, color='#E74C3C')

    ax1.set_xticks(range(len(monthly)))
    ax1.set_xticklabels(monthly['month_str'], rotation=45, ha='right')

    lines = line1 + line2
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper left', fontsize=11)

    ax1.set_title('月度消费趋势分析', fontsize=16, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig('charts/06_monthly_trend.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图6: 月度趋势图")


def plot_rfm_heatmap():
    """图7: RFM评分交叉热力图"""
    cross = pd.crosstab(rfm['R_score'], rfm['F_score'])
    cross = cross.reindex(index=[5,4,3,2,1], columns=[1,2,3,4,5]).fillna(0)

    fig, ax = plt.subplots(figsize=(8, 7))
    im = ax.imshow(cross.values, cmap='YlOrRd', aspect='auto')

    for i in range(cross.shape[0]):
        for j in range(cross.shape[1]):
            val = int(cross.values[i, j])
            ax.text(j, i, str(val), ha='center', va='center',
                   fontsize=12, fontweight='bold',
                   color='white' if val > cross.values.max()*0.6 else 'black')

    ax.set_xticks(range(5))
    ax.set_xticklabels([1, 2, 3, 4, 5])
    ax.set_yticks(range(5))
    ax.set_yticklabels([5, 4, 3, 2, 1])
    ax.set_xlabel('F 评分', fontsize=13)
    ax.set_ylabel('R 评分', fontsize=13)
    ax.set_title('R × F 评分交叉分布热力图', fontsize=16, fontweight='bold', pad=15)

    plt.colorbar(im, ax=ax, shrink=0.8, label='用户数')
    plt.tight_layout()
    plt.savefig('charts/07_rfm_heatmap.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图7: RFM热力图")


def plot_segment_revenue_contribution():
    """图8: 各层用户收入贡献帕累托图"""
    seg_rev = rfm.groupby('segment')['monetary'].sum().reindex(segment_order).dropna().sort_values(ascending=False)
    cum_pct = seg_rev.cumsum() / seg_rev.sum() * 100

    fig, ax1 = plt.subplots(figsize=(14, 6))

    colors = [segment_colors.get(s, '#999') for s in seg_rev.index]
    bars = ax1.bar(range(len(seg_rev)), seg_rev.values, color=colors, edgecolor='white', linewidth=1.5)

    for bar, val in zip(bars, seg_rev.values):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height(),
                f'¥{val/10000:.1f}万', ha='center', va='bottom', fontsize=10, fontweight='bold')

    ax2 = ax1.twinx()
    ax2.plot(range(len(cum_pct)), cum_pct.values, 'D-', color='#E74C3C',
            linewidth=2.5, markersize=8)
    ax2.axhline(80, color='gray', linestyle='--', alpha=0.5)
    ax2.set_ylabel('累计占比(%)', fontsize=12, color='#E74C3C')
    ax2.set_ylim(0, 105)

    for i, val in enumerate(cum_pct.values):
        ax2.annotate(f'{val:.1f}%', (i, val), textcoords="offset points",
                    xytext=(0, 10), ha='center', fontsize=9, color='#E74C3C')

    ax1.set_xticks(range(len(seg_rev)))
    ax1.set_xticklabels(seg_rev.index, rotation=30, ha='right', fontsize=11)
    ax1.set_ylabel('消费总额(元)', fontsize=12)
    ax1.set_title('用户分层收入贡献帕累托图', fontsize=16, fontweight='bold', pad=15)

    plt.tight_layout()
    plt.savefig('charts/08_pareto.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print("[OK] 图8: 帕累托图")


if __name__ == '__main__':
    print("开始生成可视化图表...")
    plot_rfm_distribution()
    plot_segment_pie()
    plot_segment_bar()
    plot_rfm_scatter()
    plot_funnel()
    plot_monthly_trend()
    plot_rfm_heatmap()
    plot_segment_revenue_contribution()
    print("\n全部图表生成完毕!")
