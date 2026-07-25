"""AARRR 可视化分析 - 生成 10 张分析图表

AARRR = Acquisition(获客) → Activation(激活) → Retention(留存) → Revenue(收入) → Referral(传播)

读取 aarrr_analysis/data/ 下的 CSV 数据文件，生成图表保存到 aarrr_analysis/charts/ 目录。
"""

import pandas as pd
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec
import warnings

warnings.filterwarnings('ignore')

# 中文字体设置
matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'PingFang SC']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['figure.dpi'] = 150

# ── 配色方案 ──────────────────────────────────────────────────────────────
AARRR_COLORS = {
    'Acquisition': '#3498DB',
    'Activation': '#2ECC71',
    'Retention': '#F39C12',
    'Revenue': '#E74C3C',
    'Referral': '#9B59B6',
}

CHANNEL_COLORS = {
    '自然搜索': '#3498DB',
    '付费广告': '#E74C3C',
    '社交媒体': '#2ECC71',
    '口碑推荐': '#F39C12',
    '应用商店': '#9B59B6',
}

DATA_DIR = 'data'
CHARTS_DIR = 'charts'


# ── 图 1: AARRR 全漏斗图 ──────────────────────────────────────────────────
def plot_aarrr_funnel():
    """图1: AARRR 全漏斗图 — 横向漏斗，从上到下：获客→激活→留存→收入→传播

    展示各环节的用户数量递减，以及环节间的转化率
    """

    df = pd.read_csv(f'{DATA_DIR}/aarrr_summary.csv')

    stages = df['stage'].tolist()
    users = df['users'].tolist()
    conv_rates = df['conversion_rate'].tolist()

    fig, ax = plt.subplots(figsize=(12, 10))

    max_val = max(users)
    bar_height = 0.6

    # 漏斗从上到下：第一层(注册)在顶部，最后一层(传播)在底部
    # Y坐标：i=0 时在最上面(y=len(stages)-1)，i越大越往下
    for i, (stage, val) in enumerate(zip(stages, users)):
        width = val / max_val * 0.8
        left = (1 - width) / 2

        stage_key = stage if stage in AARRR_COLORS else stage.split('(')[0].strip()
        color = AARRR_COLORS.get(stage_key, '#888888')

        # Y坐标：i=0(注册) → y=len(stages)-1(最上), i=len-1(传播) → y=0(最下)
        y_pos = len(stages) - i - 1
        ax.barh(y_pos, width, left=left, height=bar_height,
                color=color, edgecolor='white', linewidth=2, alpha=0.92)

        # 层内标注：阶段名称 + 用户数 + 占比
        ax.text(0.5, y_pos,
                f'{stage}\n{val:,} 人 ({val/max_val*100:.1f}%)',
                ha='center', va='center', fontsize=12, fontweight='bold',
                color='white')

    # 相邻层之间标注转化率（箭头指向下一层）
    for i in range(len(stages) - 1):
        current_users = users[i]
        next_users = users[i + 1]
        drop_rate = (current_users - next_users) / current_users * 100 if current_users > 0 else 0

        # 转化率标注在两层之间：当前层y_pos和下一层y_pos之间
        current_y = len(stages) - i - 1
        next_y = len(stages) - i - 2
        mid_y = (current_y + next_y) / 2 - 0.15  # 略偏下

        ax.annotate(
            f'↓ 流失 {drop_rate:.1f}%',
            xy=(0.5, mid_y),
            ha='center', va='center', fontsize=10, color='#666666',
            fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#f0f0f0', edgecolor='none', alpha=0.8)
        )

    ax.set_xlim(0, 1)
    ax.set_ylim(-0.5, len(stages) + 0.3)
    ax.axis('off')
    ax.set_title('AARRR 用户转化漏斗\n获客 → 激活 → 留存 → 收入 → 传播',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/01_aarrr_funnel.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图1: AARRR全漏斗图')


# ── 图 2: 获客渠道占比饼图 ────────────────────────────────────────────────
def plot_channel_pie():
    """图2: 获客渠道占比环形饼图，中心显示总用户数"""

    df = pd.read_csv(f'{DATA_DIR}/channel_analysis.csv')
    channels = df['channel'].tolist()
    counts = df['user_count'].tolist()
    total = sum(counts)

    fig, ax = plt.subplots(figsize=(10, 8))

    colors = [CHANNEL_COLORS.get(ch, '#888888') for ch in channels]

    wedges, texts, autotexts = ax.pie(
        counts,
        labels=channels,
        colors=colors,
        autopct='%1.1f%%',
        startangle=90,
        pctdistance=0.78,
        wedgeprops=dict(width=0.45, edgecolor='white', linewidth=2),
    )

    for t in texts:
        t.set_fontsize(11)
    for at in autotexts:
        at.set_fontsize(9)
        at.set_fontweight('bold')

    # 中心文字
    ax.text(0, 0, f'总计\n{total:,} 人', ha='center', va='center',
            fontsize=15, fontweight='bold')

    ax.set_title('获客渠道占比分布', fontsize=18, fontweight='bold', pad=20)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/02_channel_pie.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图2: 渠道占比饼图')


# ── 图 3: 渠道对比双轴柱线图 ──────────────────────────────────────────────
def plot_channel_compare():
    """图3: 渠道对比双轴柱线图 — 柱状图(用户数) + 折线图(CAC)"""

    df = pd.read_csv(f'{DATA_DIR}/channel_analysis.csv')

    fig, ax1 = plt.subplots(figsize=(12, 6))

    x = range(len(df))
    colors = [CHANNEL_COLORS.get(ch, '#888888') for ch in df['channel']]

    bars = ax1.bar(x, df['user_count'], color=colors, edgecolor='white',
                   linewidth=1.5, alpha=0.88)
    ax1.set_ylabel('用户数量', fontsize=12)

    for bar, val in zip(bars, df['user_count']):
        ax1.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 20,
                 f'{val:,}', ha='center', va='bottom', fontsize=10, fontweight='bold')

    ax2 = ax1.twinx()
    ax2.plot(x, df['cost_per_user'], 'o-', color='#E74C3C', linewidth=2.5, markersize=8, zorder=5)
    ax2.set_ylabel('CAC (获客成本, 元)', fontsize=12, color='#E74C3C')
    ax2.tick_params(axis='y', labelcolor='#E74C3C')

    for i, val in enumerate(df['cost_per_user']):
        ax2.annotate(f'{val:.0f}元', (i, val), textcoords='offset points',
                     xytext=(0, 10), ha='center', fontsize=9, color='#E74C3C',
                     fontweight='bold')

    ax1.set_xticks(x)
    ax1.set_xticklabels(df['channel'], fontsize=11)
    ax1.set_title('各渠道用户数 & 获客成本对比', fontsize=16, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/03_channel_compare.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图3: 渠道对比双轴图')


# ── 图 4: 月度获客趋势面积图 ──────────────────────────────────────────────
def plot_monthly_acquisition():
    """图4: 月度获客趋势面积图 — 面积图(新增) + 折线(累计)"""

    df = pd.read_csv(f'{DATA_DIR}/monthly_metrics.csv')

    # 计算累计用户数（近似值）
    df_sorted = df.sort_values('month').reset_index(drop=True)
    df_sorted['cum_users'] = df_sorted['new_users'].cumsum()

    fig, ax1 = plt.subplots(figsize=(14, 6))

    x = range(len(df_sorted))

    # 面积图 + 折线
    ax1.fill_between(x, df_sorted['new_users'], alpha=0.25, color='#3498DB')
    ax1.plot(x, df_sorted['new_users'], 'o-', color='#3498DB', linewidth=2.5,
             markersize=7, label='月度新增用户')
    ax1.set_ylabel('月度新增用户数', fontsize=12, color='#3498DB')

    # 标注峰值月份（假设 10-11 月大促）
    for i, row in df_sorted.iterrows():
        month_label = row['month']
        if '10' in str(month_label) or '11' in str(month_label):
            if row['new_users'] > df_sorted['new_users'].median():
                ax1.annotate('大促', (i, row['new_users']),
                             textcoords='offset points', xytext=(0, 12),
                             ha='center', fontsize=9, color='#E74C3C', fontweight='bold')

    # 右轴：累计用户
    ax2 = ax1.twinx()
    ax2.plot(x, df_sorted['cum_users'], 's--', color='#E74C3C', linewidth=2,
             markersize=6, alpha=0.8, label='累计用户')
    ax2.set_ylabel('累计用户数', fontsize=12, color='#E74C3C')
    ax2.tick_params(axis='y', labelcolor='#E74C3C')

    ax1.set_xticks(x)
    ax1.set_xticklabels(df_sorted['month'], rotation=45, ha='right', fontsize=10)
    ax1.set_title('月度获客趋势', fontsize=16, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/04_monthly_acquisition.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图4: 月度获客趋势')


# ── 图 5: 各渠道激活率对比 ────────────────────────────────────────────────
def plot_activation_rate():
    """图5: 各渠道激活率水平柱状图，按激活率从高到低排列"""

    df = pd.read_csv(f'{DATA_DIR}/channel_analysis.csv')
    df = df.sort_values('activation_rate', ascending=True).reset_index(drop=True)

    fig, ax = plt.subplots(figsize=(10, 6))

    colors = [CHANNEL_COLORS.get(ch, '#888888') for ch in df['channel']]
    bars = ax.barh(df['channel'], df['activation_rate_pct'], color=colors,
                   edgecolor='white', linewidth=1.5, alpha=0.88, height=0.55)

    for bar, rate in zip(bars, df['activation_rate_pct']):
        ax.text(bar.get_width() + 1, bar.get_y() + bar.get_height() / 2,
                f'{rate:.1f}%', ha='left', va='center',
                fontsize=11, fontweight='bold')

    ax.set_xlabel('激活率 (%)', fontsize=12)
    ax.set_title('各渠道激活率对比', fontsize=16, fontweight='bold', pad=15)
    ax.set_xlim(0, max(df['activation_rate_pct']) * 1.15)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/05_activation_rate.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图5: 激活率对比')


# ── 图 6: 留存率衰减曲线 ──────────────────────────────────────────────────
def plot_retention_curve():
    """图6: 留存率衰减曲线 — 折线图 + 标记点"""

    df = pd.read_csv(f'{DATA_DIR}/retention_data.csv')

    # 读取渠道分析数据，按渠道画多线
    channel_df = pd.read_csv(f'{DATA_DIR}/channel_analysis.csv')

    fig, ax = plt.subplots(figsize=(12, 6))

    # 整体留存率线：使用 retention_data 的均值
    days = [1, 7, 30]
    overall = [
        df['d1_retention'].mean() * 100,
        df['d7_retention'].mean() * 100,
        df['d30_retention'].mean() * 100,
    ]

    ax.plot(days, overall, 'o-', color='#2C3E50',
            linewidth=3, markersize=10, label='整体留存率', zorder=5)

    for d, r in zip(days, overall):
        ax.annotate(f'{r:.1f}%', (d, r),
                    textcoords='offset points', xytext=(8, 5),
                    fontsize=9, fontweight='bold', color='#2C3E50')

    # 按渠道画线（使用 channel_analysis 的 retention_d7）
    for ch in channel_df['channel']:
        ch_data = channel_df[channel_df['channel'] == ch].iloc[0]
        d7_val = ch_data['retention_d7'] * 100
        color = CHANNEL_COLORS.get(ch, '#888888')
        ax.axhline(y=d7_val, color=color, linestyle='--', alpha=0.5, linewidth=1)
        ax.plot(7, d7_val, 'o', color=color, markersize=8)
        ax.annotate(f'{ch} D7={d7_val:.1f}%', (7, d7_val),
                    textcoords='offset points', xytext=(15, -5),
                    fontsize=8, color=color)

    ax.set_xlabel('留存天数', fontsize=12)
    ax.set_ylabel('留存率 (%)', fontsize=12)
    ax.set_title('留存率衰减曲线', fontsize=16, fontweight='bold', pad=15)
    ax.legend(loc='lower left', fontsize=10)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/06_retention_curve.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图6: 留存率衰减曲线')


# ── 图 7: 月度收入趋势 ────────────────────────────────────────────────────
def plot_monthly_revenue():
    """图7: 月度收入趋势 — 面积图(收入) + 折线(付费用户) + ARPU标注"""

    df = pd.read_csv(f'{DATA_DIR}/monthly_metrics.csv')
    df_sorted = df.sort_values('month').reset_index(drop=True)

    fig, ax1 = plt.subplots(figsize=(14, 6))

    x = range(len(df_sorted))

    # 面积图 + 折线
    ax1.fill_between(x, df_sorted['revenue'], alpha=0.25, color='#E74C3C')
    ax1.plot(x, df_sorted['revenue'], 'o-', color='#E74C3C', linewidth=2.5,
             markersize=7, label='月度收入')
    ax1.set_ylabel('月度收入 (元)', fontsize=12, color='#E74C3C')

    # ARPU 标注
    for i, row in df_sorted.iterrows():
        arpu = row['revenue'] / max(row['paid_users'], 1)
        ax1.annotate(f'ARPU {arpu:.0f}', (i, row['revenue']),
                     textcoords='offset points', xytext=(0, 12),
                     ha='center', fontsize=8, color='#C0392B', fontweight='bold')

    # 高亮最佳月份
    best_idx = df_sorted['revenue'].idxmax()
    ax1.annotate('最佳月份', (best_idx, df_sorted.loc[best_idx, 'revenue']),
                 textcoords='offset points', xytext=(20, 20),
                 fontsize=10, fontweight='bold', color='#C0392B',
                 arrowprops=dict(arrowstyle='->', color='#C0392B', lw=1.5))

    # 右轴：付费用户数
    ax2 = ax1.twinx()
    ax2.plot(x, df_sorted['paid_users'], 's--', color='#3498DB', linewidth=2,
             markersize=6, alpha=0.8, label='付费用户数')
    ax2.set_ylabel('付费用户数', fontsize=12, color='#3498DB')
    ax2.tick_params(axis='y', labelcolor='#3498DB')

    ax1.set_xticks(x)
    ax1.set_xticklabels(df_sorted['month'], rotation=45, ha='right', fontsize=10)
    ax1.set_title('月度收入趋势', fontsize=16, fontweight='bold', pad=15)
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/07_monthly_revenue.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图7: 月度收入趋势')


# ── 图 8: 收入结构分析 ────────────────────────────────────────────────────
def plot_revenue_breakdown():
    """图8: 收入结构分析 — 左侧品类饼图 + 右侧帕累托图"""

    df = pd.read_csv(f'{DATA_DIR}/transactions.csv')

    # 品类收入
    cat_rev = df.groupby('category')['order_amount'].sum().sort_values(ascending=False)

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

    # ── 左：饼图 ──
    category_colors = ['#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6']
    wedges, texts, autotexts = ax1.pie(
        cat_rev.values,
        labels=cat_rev.index,
        colors=category_colors[:len(cat_rev)],
        autopct='%1.1f%%',
        startangle=90,
        pctdistance=0.75,
        wedgeprops=dict(width=0.5, edgecolor='white', linewidth=2),
    )
    for t in texts:
        t.set_fontsize(11)
    for at in autotexts:
        at.set_fontsize(9)
        at.set_fontweight('bold')

    ax1.set_title('品类收入占比', fontsize=14, fontweight='bold')

    # ── 右：帕累托图 ──
    cum_pct = cat_rev.cumsum() / cat_rev.sum() * 100

    bars = ax2.bar(range(len(cat_rev)), cat_rev.values,
                   color=category_colors[:len(cat_rev)],
                   edgecolor='white', linewidth=1.5, alpha=0.88)
    for bar, val in zip(bars, cat_rev.values):
        ax2.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                 f'{val / 10000:.1f}万', ha='center', va='bottom',
                 fontsize=9, fontweight='bold')

    ax2_twin = ax2.twinx()
    ax2_twin.plot(range(len(cum_pct)), cum_pct.values, 'D-', color='#E74C3C',
                  linewidth=2.5, markersize=8)
    ax2_twin.axhline(80, color='gray', linestyle='--', alpha=0.5)
    ax2_twin.set_ylabel('累计占比 (%)', fontsize=12, color='#E74C3C')
    ax2_twin.set_ylim(0, 105)

    for i, val in enumerate(cum_pct.values):
        ax2_twin.annotate(f'{val:.1f}%', (i, val), textcoords='offset points',
                          xytext=(0, 8), ha='center', fontsize=9, color='#E74C3C')

    ax2.set_xticks(range(len(cat_rev)))
    ax2.set_xticklabels(cat_rev.index, fontsize=10)
    ax2.set_ylabel('品类收入 (元)', fontsize=12)
    ax2.set_title('品类收入帕累托图', fontsize=14, fontweight='bold')

    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/08_revenue_breakdown.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图8: 收入结构分析')


# ── 图 9: 留存率热力图 ────────────────────────────────────────────────────
def plot_retention_heatmap():
    """图9: 留存率热力图 — X轴留存天数, Y轴注册月份"""

    df = pd.read_csv(f'{DATA_DIR}/retention_data.csv')

    fig, ax = plt.subplots(figsize=(8, 8))

    # 构建热力图矩阵
    retention_cols = ['d1_retention', 'd7_retention', 'd30_retention']
    col_labels = ['D1', 'D7', 'D30']
    data_matrix = df[retention_cols].values * 100

    im = ax.imshow(data_matrix, cmap='YlOrRd', aspect='auto')

    # 标注百分比
    for i in range(data_matrix.shape[0]):
        for j in range(data_matrix.shape[1]):
            val = data_matrix[i, j]
            text_color = 'white' if val > data_matrix.max() * 0.6 else 'black'
            ax.text(j, i, f'{val:.1f}%', ha='center', va='center',
                    fontsize=11, fontweight='bold', color=text_color)

    ax.set_xticks(range(len(col_labels)))
    ax.set_xticklabels(col_labels, fontsize=12)
    ax.set_yticks(range(len(df)))
    ax.set_yticklabels(df['register_month'], fontsize=10)
    ax.set_xlabel('留存天数', fontsize=13)
    ax.set_ylabel('注册月份', fontsize=13)
    ax.set_title('留存率热力图', fontsize=16, fontweight='bold', pad=15)

    plt.colorbar(im, ax=ax, shrink=0.8, label='留存率 (%)')
    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/09_retention_heatmap.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图9: 留存率热力图')


# ── 图 10: 传播与 K 因子分析 ──────────────────────────────────────────────
def plot_k_factor_referral():
    """图10: 传播与K因子分析 — 左侧分享漏斗 + 右侧K因子柱状图"""

    df_users = pd.read_csv(f'{DATA_DIR}/users.csv')
    df_events = pd.read_csv(f'{DATA_DIR}/user_events.csv')
    df_trans = pd.read_csv(f'{DATA_DIR}/transactions.csv')

    # ── 模拟分享漏斗数据 ──
    total_buyers = df_trans['user_id'].nunique()
    # 假设分享用户占购买用户 40%
    sharers = int(total_buyers * 0.4)
    # 假设被邀请注册占分享用户 60%
    invited_reg = int(sharers * 0.6)
    # 假设被邀请购买占被邀请注册 50%
    invited_buy = int(invited_reg * 0.5)

    # ── 模拟K因子 ──
    avg_invites = 3.2  # 平均邀请人数
    invite_conv = 0.35  # 邀请转化率
    k_factor = avg_invites * invite_conv

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

    # ── 左：分享漏斗 ──
    funnel_data = [
        ('购买用户', total_buyers),
        ('分享用户', sharers),
        ('被邀请注册', invited_reg),
        ('被邀请购买', invited_buy),
    ]

    max_val = funnel_data[0][1]
    funnel_colors = ['#3498DB', '#2ECC71', '#F39C12', '#E74C3C']

    for i, (label, val) in enumerate(funnel_data):
        width = val / max_val * 0.85
        left = (1 - width) / 2
        ax1.barh(len(funnel_data) - i - 1, width, left=left, height=0.55,
                 color=funnel_colors[i], edgecolor='white', linewidth=2, alpha=0.92)
        ax1.text(0.5, len(funnel_data) - i - 1,
                 f'{label}\n{val:,}',
                 ha='center', va='center', fontsize=11, fontweight='bold',
                 color='white')

    ax1.set_xlim(0, 1)
    ax1.set_ylim(-0.3, len(funnel_data) + 0.2)
    ax1.axis('off')
    ax1.set_title('分享转化漏斗', fontsize=14, fontweight='bold', pad=15)

    # ── 右：K因子柱状图 ──
    categories = ['平均邀请人数', '邀请转化率(×10)', 'K因子']
    values = [avg_invites, invite_conv * 10, k_factor]
    bar_colors = ['#3498DB', '#2ECC71', '#E74C3C']

    bars = ax2.bar(categories, values, color=bar_colors, edgecolor='white',
                   linewidth=1.5, alpha=0.88, width=0.5)

    for bar, val in zip(bars, values):
        ax2.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.05,
                 f'{val:.2f}', ha='center', va='bottom', fontsize=12, fontweight='bold')

    ax2.set_ylabel('数值', fontsize=12)
    ax2.set_title(f'K因子分析 (K = {k_factor:.2f})', fontsize=14, fontweight='bold', pad=15)

    plt.tight_layout()
    plt.savefig(f'{CHARTS_DIR}/10_k_factor_referral.png', bbox_inches='tight', facecolor='white')
    plt.close()
    print('[OK] 图10: 传播与K因子分析')


# ── 主函数 ────────────────────────────────────────────────────────────────
def main():
    """依次生成所有图表"""
    print('开始生成 AARRR 可视化图表...\n')

    plot_aarrr_funnel()
    plot_channel_pie()
    plot_channel_compare()
    plot_monthly_acquisition()
    plot_activation_rate()
    plot_retention_curve()
    plot_monthly_revenue()
    plot_revenue_breakdown()
    plot_retention_heatmap()
    plot_k_factor_referral()

    print('\n全部 10 张图表生成完毕!')


if __name__ == '__main__':
    main()
