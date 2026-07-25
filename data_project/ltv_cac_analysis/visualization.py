"""
LTV/CAC 分析可视化模块
生成10张图表，评估商业模式健康度。
"""

import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
from matplotlib.patches import FancyBboxPatch
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 中文字体配置
# ============================================================
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'PingFang SC']
plt.rcParams['axes.unicode_minus'] = False

# ============================================================
# 配色
# ============================================================
CHANNEL_COLORS = {
    '自然搜索': '#3498DB',
    '付费广告': '#E74C3C',
    '社交媒体': '#2ECC71',
    '口碑推荐': '#F39C12',
    '内容营销': '#9B59B6',
}

VALUE_COLORS = {
    '鲸鱼用户': '#FF4B4B',
    '海豚用户': '#FF8C42',
    '小鱼用户': '#45B7D1',
    '虾米用户': '#95A5A6',
}

DPI = 150
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
CHARTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'charts')


# ============================================================
# 数据加载
# ============================================================
def load_data():
    """加载所有CSV数据文件，返回字典。"""
    files = {
        'users': os.path.join(DATA_DIR, 'users.csv'),
        'transactions': os.path.join(DATA_DIR, 'transactions.csv'),
        'channel_costs': os.path.join(DATA_DIR, 'channel_costs.csv'),
        'ltv_summary': os.path.join(DATA_DIR, 'ltv_summary.csv'),
        'cohort_retention': os.path.join(DATA_DIR, 'cohort_retention.csv'),
        'monthly_metrics': os.path.join(DATA_DIR, 'monthly_metrics.csv'),
    }
    data = {}
    for key, path in files.items():
        if os.path.exists(path):
            data[key] = pd.read_csv(path)
        else:
            data[key] = pd.DataFrame()

    # 统一 ltv_summary 的列名（中文→英文）
    if 'ltv_summary' in data and not data['ltv_summary'].empty:
        col_map = {
            '维度': 'dimension', 'LTV': 'ltv', 'ARPU': 'arpu', 'CAC': 'cac',
            'LTV_CAC比值': 'ltv_cac_ratio', '健康度': 'health', '回报周期(月)': 'payback_months',
        }
        data['ltv_summary'] = data['ltv_summary'].rename(columns=col_map)
        # 从维度列提取 segment 名（如 "渠道-付费广告" → "付费广告"）
        if 'dimension' in data['ltv_summary'].columns:
            df = data['ltv_summary']
            df['segment'] = df['dimension'].apply(
                lambda x: x.split('-', 1)[1] if isinstance(x, str) and '-' in x else x
            )
            # 标记维度类型
            df['dim_type'] = df['dimension'].apply(
                lambda x: 'channel' if isinstance(x, str) and x.startswith('渠道') else
                         ('city' if isinstance(x, str) and x.startswith('城市') else
                          ('type' if isinstance(x, str) and x.startswith('用户') else 'overall'))
            )

    return data


# ============================================================
# 图1: LTV/CAC 比值仪表盘
# ============================================================
def plot_ltv_cac_ratio(ltv_summary_df):
    """
    横向柱状图，分渠道展示 LTV/CAC 比值。
    加一条竖线标注 x=3（健康阈值）。
    颜色：<1 红色, 1-3 橙色, 3-5 绿色, >5 深绿。
    标注具体比值数字。
    """
    fig, ax = plt.subplots(figsize=(10, 6))

    df = ltv_summary_df.copy()
    # 按渠道维度筛选
    if 'dim_type' in df.columns:
        channel_rows = df[df['dim_type'] == 'channel'].copy()
    else:
        channel_rows = df.copy()

    # 排序
    channel_rows = channel_rows.sort_values('ltv_cac_ratio', ascending=True)

    # 颜色映射
    def ratio_color(r):
        if r < 1:
            return '#E74C3C'
        elif r < 3:
            return '#F39C12'
        elif r < 5:
            return '#2ECC71'
        else:
            return '#1A8C4E'

    colors = [ratio_color(r) for r in channel_rows['ltv_cac_ratio']]
    segments = channel_rows['segment'].tolist()
    ratios = channel_rows['ltv_cac_ratio'].tolist()

    bars = ax.barh(range(len(segments)), ratios, color=colors, height=0.6, edgecolor='white')

    # 标注比值数字
    for i, (seg, ratio) in enumerate(zip(segments, ratios)):
        ax.text(ratio + 0.05, i, f'{ratio:.2f}', va='center', fontsize=10, fontweight='bold')

    # 健康阈值线
    ax.axvline(x=3, color='#E74C3C', linestyle='--', linewidth=1.5, alpha=0.7)
    ax.text(3.05, len(segments) - 0.5, '健康阈值=3', fontsize=9, color='#E74C3C', va='bottom')

    ax.set_yticks(range(len(segments)))
    ax.set_yticklabels(segments, fontsize=11)
    ax.set_xlabel('LTV/CAC 比值', fontsize=12)
    ax.set_title('LTV/CAC 比值仪表盘', fontsize=14, fontweight='bold')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '01_ltv_cac_ratio.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图1: LTV/CAC比值仪表盘')


# ============================================================
# 图2: LTV vs CAC 散点图
# ============================================================
def plot_ltv_cac_scatter(ltv_summary_df):
    """
    X轴 CAC，Y轴 LTV，每个渠道一个点，点大小代表用户数。
    画 LTV=CAC 线和 LTV=3*CAC 线。
    标注渠道名称。
    """
    fig, ax = plt.subplots(figsize=(10, 7))

    df = ltv_summary_df.copy()
    if 'dim_type' in df.columns:
        channel_rows = df[df['dim_type'] == 'channel'].copy()
    else:
        channel_rows = df.copy()

    x = channel_rows['cac'].values
    y = channel_rows['ltv'].values
    segments = channel_rows['segment'].tolist()

    # 点大小：假设用户数或使用固定比例
    sizes = channel_rows.get('arpu', pd.Series([200] * len(channel_rows)))
    base_size = 300
    if 'arpu' in channel_rows.columns:
        sizes = (sizes / sizes.max()) * 600 + 100
    else:
        sizes = pd.Series([base_size] * len(channel_rows))

    color_list = [CHANNEL_COLORS.get(s, '#95A5A6') for s in segments]

    ax.scatter(x, y, s=sizes, c=color_list, alpha=0.8, edgecolors='white', linewidths=1.5, zorder=3)

    # 标注渠道名称
    for seg, xi, yi in zip(segments, x, y):
        ax.annotate(seg, (xi, yi), fontsize=9, ha='center', va='bottom',
                    xytext=(0, 10), textcoords='offset points')

    # LTV=CAC 线
    max_val = max(x.max(), y.max()) * 1.1
    ax.plot([0, max_val], [0, max_val], 'k--', alpha=0.3, linewidth=1, label='LTV=CAC (盈亏平衡)')
    ax.plot([0, max_val], [0, max_val * 3 / max_val * max_val], 'r--', alpha=0.3, linewidth=1)
    # LTV=3*CAC 线
    ax.plot([0, max_val], [0, 3 * max_val], color='#E74C3C', linestyle='--', alpha=0.5,
            linewidth=1.2, label='LTV=3*CAC (健康线)')

    ax.set_xlabel('CAC (获客成本)', fontsize=12)
    ax.set_ylabel('LTV (用户终身价值)', fontsize=12)
    ax.set_title('LTV vs CAC 散点图', fontsize=14, fontweight='bold')
    ax.legend(fontsize=9, loc='upper left')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '02_ltv_cac_scatter.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图2: LTV vs CAC散点图')


# ============================================================
# 图3: 同期群留存热力图
# ============================================================
def plot_cohort_retention(cohort_retention_df):
    """
    同期群留存热力图。
    X轴：月份偏移(M0~M11)，Y轴：注册月份。
    颜色深浅代表留存率，每个格子标注百分比。
    """
    fig, ax = plt.subplots(figsize=(12, 7))

    df = cohort_retention_df.copy()
    # 获取月份偏移列
    month_cols = [c for c in df.columns if c.startswith('M') and c[1:].isdigit()]
    month_cols_sorted = sorted(month_cols, key=lambda c: int(c[1:]))

    data_matrix = df[month_cols_sorted].values
    cohorts = df['cohort_month'].values

    im = ax.imshow(data_matrix, cmap='YlOrRd', aspect='auto', vmin=0, vmax=100)

    # 标注百分比
    for i in range(len(cohorts)):
        for j, col in enumerate(month_cols_sorted):
            val = data_matrix[i, j]
            if not np.isnan(val):
                color = 'white' if val > 50 else 'black'
                ax.text(j, i, f'{val:.1f}%', ha='center', va='center', fontsize=7, color=color)

    ax.set_xticks(range(len(month_cols_sorted)))
    ax.set_xticklabels(month_cols_sorted, fontsize=9)
    ax.set_yticks(range(len(cohorts)))
    ax.set_yticklabels(cohorts, fontsize=9)
    ax.set_title('同期群留存热力图', fontsize=14, fontweight='bold')
    ax.set_xlabel('月份偏移', fontsize=11)
    ax.set_ylabel('注册月份（同期群）', fontsize=11)

    cbar = fig.colorbar(im, ax=ax, shrink=0.8)
    cbar.set_label('留存率 (%)', fontsize=10)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '03_cohort_retention.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图3: 同期群留存热力图')


# ============================================================
# 图4: 同期群收入增长曲线
# ============================================================
def plot_cohort_revenue(users_df, transactions_df):
    """
    同期群收入增长曲线。
    X轴：月份偏移，Y轴：累计人均收入。
    每个同期群一条线，用渐变色区分新旧同期群。
    标注关键同期群。
    """
    fig, ax = plt.subplots(figsize=(11, 7))

    if users_df.empty or transactions_df.empty:
        print('[跳过] 图4: 无用户或交易数据')
        return

    users = users_df.copy()
    trans = transactions_df.copy()

    # 计算每个用户的注册月份
    users['register_month'] = pd.to_datetime(users['register_date']).dt.to_period('M')
    user_cohort = users.set_index('user_id')['register_month']

    # 计算交易的月份偏移
    trans['order_date_dt'] = pd.to_datetime(trans['order_date'])
    trans['order_month'] = trans['order_date_dt'].dt.to_period('M')

    # 合并
    trans_with_cohort = trans.copy()
    trans_with_cohort['cohort'] = trans_with_cohort['user_id'].map(user_cohort)

    # 计算月份偏移
    def month_offset(row):
        try:
            return (row['order_month'] - row['cohort']).n
        except Exception:
            return 0

    # 按同期群分组
    cohort_list = sorted(user_cohort.unique())
    n_cohorts = len(cohort_list)
    cmap = plt.cm.viridis

    for i, cohort in enumerate(cohort_list):
        cohort_users = users[users['register_month'] == cohort]
        n_users = len(cohort_users)
        if n_users == 0:
            continue
        cohort_trans = trans_with_cohort[trans_with_cohort['cohort'] == cohort]
        # 按月份偏移聚合
        offsets = []
        for _, row in cohort_trans.iterrows():
            try:
                offset = (row['order_month'] - cohort)
                if hasattr(offset, 'n'):
                    offsets.append((offset.n, row['order_amount']))
                else:
                    offsets.append((0, row['order_amount']))
            except Exception:
                offsets.append((0, row['order_amount']))

        offset_df = pd.DataFrame(offsets, columns=['offset', 'amount'])
        offset_agg = offset_df.groupby('offset')['amount'].sum().sort_index()

        # 累计
        cumulative = offset_agg.cumsum()
        per_user = cumulative / n_users

        color = cmap(i / max(n_cohorts - 1, 1))
        ax.plot(per_user.index, per_user.values, color=color, linewidth=2,
                label=str(cohort), marker='o', markersize=3)

    ax.set_xlabel('月份偏移', fontsize=12)
    ax.set_ylabel('累计人均收入 (元)', fontsize=12)
    ax.set_title('同期群收入增长曲线', fontsize=14, fontweight='bold')
    ax.legend(fontsize=8, ncol=3, loc='upper left')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '04_cohort_revenue.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图4: 同期群收入增长曲线')


# ============================================================
# 图5: 月度收入趋势
# ============================================================
def plot_monthly_revenue(monthly_metrics_df):
    """
    面积图：月度收入，右轴折线：累计收入，标注ARPU。
    """
    fig, ax1 = plt.subplots(figsize=(11, 6))

    df = monthly_metrics_df.copy()
    months = df['month'].tolist()

    # 面积图
    ax1.fill_between(range(len(months)), df['revenue'], alpha=0.3, color='#3498DB')
    ax1.plot(range(len(months)), df['revenue'], color='#3498DB', linewidth=2, label='月度收入')

    ax1.set_ylabel('月度收入 (元)', fontsize=12, color='#3498DB')
    ax1.tick_params(axis='y', labelcolor='#3498DB')

    # 右轴累计收入
    ax2 = ax1.twinx()
    cumulative = df['revenue'].cumsum()
    ax2.plot(range(len(months)), cumulative, color='#E74C3C', linewidth=2, linestyle='--', label='累计收入')
    ax2.set_ylabel('累计收入 (元)', fontsize=12, color='#E74C3C')
    ax2.tick_params(axis='y', labelcolor='#E74C3C')

    # 标注ARPU
    for i, row in df.iterrows():
        if not np.isnan(row.get('arpu', np.nan)):
            ax1.annotate(f"{row['arpu']:.0f}", (i, row['revenue']),
                         textcoords='offset points', xytext=(0, 10),
                         fontsize=7, ha='center', color='#2C3E50')

    ax1.set_xticks(range(len(months)))
    ax1.set_xticklabels(months, rotation=45, fontsize=8)
    ax1.set_title('月度收入趋势', fontsize=14, fontweight='bold')
    ax1.spines['top'].set_visible(False)

    # 图例
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left', fontsize=9)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '05_monthly_revenue.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图5: 月度收入趋势')


# ============================================================
# 图6: LTV 分布直方图
# ============================================================
def plot_ltv_distribution(users_df, transactions_df):
    """
    LTV分布直方图。
    从transactions和users计算每个用户的LTV（累计消费额）。
    加中位数线和均值线，标注P25/P50/P75/P90。
    """
    fig, ax = plt.subplots(figsize=(10, 6))

    if users_df.empty or transactions_df.empty:
        print('[跳过] 图6: 无用户或交易数据')
        return

    trans = transactions_df.copy()
    # 按用户汇总
    user_ltv = trans.groupby('user_id')['order_amount'].sum().reset_index()
    user_ltv.columns = ['user_id', 'ltv']

    ltv_values = user_ltv['ltv'].values

    ax.hist(ltv_values, bins=30, color='#3498DB', alpha=0.7, edgecolor='white')

    # 统计线
    median_val = np.median(ltv_values)
    mean_val = np.mean(ltv_values)
    p25 = np.percentile(ltv_values, 25)
    p75 = np.percentile(ltv_values, 75)
    p90 = np.percentile(ltv_values, 90)

    ax.axvline(median_val, color='#E74C3C', linestyle='--', linewidth=1.5, label=f'中位数: {median_val:.0f}元')
    ax.axvline(mean_val, color='#F39C12', linestyle='--', linewidth=1.5, label=f'均值: {mean_val:.0f}元')

    # 分位数标注
    ax.axvline(p25, color='#95A5A6', linestyle=':', linewidth=1, alpha=0.7)
    ax.axvline(p75, color='#95A5A6', linestyle=':', linewidth=1, alpha=0.7)
    ax.axvline(p90, color='#95A5A6', linestyle=':', linewidth=1, alpha=0.7)

    ax.text(p25, ax.get_ylim()[1] * 0.9, f'P25\n{p25:.0f}元', fontsize=8, ha='center', color='#7F8C8D')
    ax.text(p75, ax.get_ylim()[1] * 0.9, f'P75\n{p75:.0f}元', fontsize=8, ha='center', color='#7F8C8D')
    ax.text(p90, ax.get_ylim()[1] * 0.9, f'P90\n{p90:.0f}元', fontsize=8, ha='center', color='#7F8C8D')

    ax.set_xlabel('LTV (元)', fontsize=12)
    ax.set_ylabel('用户数', fontsize=12)
    ax.set_title('LTV 分布直方图', fontsize=14, fontweight='bold')
    ax.legend(fontsize=9)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '06_ltv_distribution.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图6: LTV分布直方图')


# ============================================================
# 图7: 渠道效率四象限图
# ============================================================
def plot_channel_efficiency(users_df, transactions_df, channel_costs_df):
    """
    渠道效率四象限图。
    X轴：CAC，Y轴：LTV，气泡大小=渠道用户数。
    四象限用虚线划分。
    """
    fig, ax = plt.subplots(figsize=(10, 8))

    if users_df.empty or channel_costs_df.empty:
        print('[跳过] 图7: 无用户或渠道成本数据')
        return

    users = users_df.copy()
    trans = transactions_df.copy()
    costs = channel_costs_df.copy()

    # 获取渠道列表
    channels = costs['channel'].unique()
    channel_data = []

    for ch in channels:
        ch_users = users[users['channel'] == ch]
        n_users = len(ch_users)
        ch_user_ids = set(ch_users['user_id'])
        ch_trans = trans[trans['user_id'].isin(ch_user_ids)]
        ltv = ch_trans['order_amount'].sum() / max(n_users, 1)
        cac = costs.loc[costs['channel'] == ch, 'cost_per_user'].values
        cac_val = cac[0] if len(cac) > 0 else 0
        channel_data.append({
            'channel': ch,
            'ltv': ltv,
            'cac': cac_val,
            'n_users': n_users,
        })

    ch_df = pd.DataFrame(channel_data)

    # 绘制气泡
    for _, row in ch_df.iterrows():
        color = CHANNEL_COLORS.get(row['channel'], '#95A5A6')
        size = max(row['n_users'], 100)
        ax.scatter(row['cac'], row['ltv'], s=size * 3, c=color, alpha=0.7,
                   edgecolors='white', linewidths=1.5, zorder=3)
        ax.annotate(row['channel'], (row['cac'], row['ltv']),
                    fontsize=9, ha='center', va='bottom',
                    xytext=(0, 10), textcoords='offset points')

    # 象限分界线（中位数）
    cac_mid = ch_df['cac'].median()
    ltv_mid = ch_df['ltv'].median()

    ax.axhline(y=ltv_mid, color='gray', linestyle='--', alpha=0.5)
    ax.axvline(x=cac_mid, color='gray', linestyle='--', alpha=0.5)

    # 象限标注
    ax.text(cac_mid * 0.7, ltv_mid * 1.3, '低LTV低CAC', fontsize=9, color='gray', ha='center')
    ax.text(cac_mid * 1.3, ltv_mid * 1.3, '高LTV低CAC\n(最优)', fontsize=9, color='#2ECC71', ha='center', fontweight='bold')
    ax.text(cac_mid * 0.7, ltv_mid * 0.7, '低LTV高CAC\n(最差)', fontsize=9, color='#E74C3C', ha='center', fontweight='bold')
    ax.text(cac_mid * 1.3, ltv_mid * 0.7, '高LTV高CAC', fontsize=9, color='gray', ha='center')

    ax.set_xlabel('CAC (获客成本)', fontsize=12)
    ax.set_ylabel('LTV (用户终身价值)', fontsize=12)
    ax.set_title('渠道效率四象限图', fontsize=14, fontweight='bold')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '07_channel_efficiency.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图7: 渠道效率四象限图')


# ============================================================
# 图8: 回报周期瀑布图
# ============================================================
def plot_payback_period(users_df, transactions_df, channel_costs_df):
    """
    回报周期图：按渠道展示回报周期月数。
    简化为水平柱状图，按渠道排回报周期月数。
    """
    fig, ax = plt.subplots(figsize=(10, 6))

    if users_df.empty or channel_costs_df.empty:
        print('[跳过] 图8: 无用户或渠道成本数据')
        return

    users = users_df.copy()
    trans = transactions_df.copy()
    costs = channel_costs_df.copy()

    channels = costs['channel'].unique()
    payback_data = []

    for ch in channels:
        ch_users = users[users['channel'] == ch]
        n_users = len(ch_users)
        ch_user_ids = set(ch_users['user_id'])
        ch_trans = trans[trans['user_id'].isin(ch_user_ids)]

        # 按月汇总
        if 'order_date' in ch_trans.columns:
            ch_trans_dt = ch_trans.copy()
            ch_trans_dt['order_month_dt'] = pd.to_datetime(ch_trans_dt['order_date'])
            ch_trans_dt['month_offset'] = (ch_trans_dt['order_month_dt'] - ch_trans_dt['order_month_dt'].min()).dt.days // 30

            monthly_rev = ch_trans_dt.groupby('month_offset')['order_amount'].sum().reset_index()
            monthly_rev = monthly_rev.sort_values('month_offset')
            cumulative_rev = monthly_rev['order_amount'].cumsum()

            cac_val = costs.loc[costs['channel'] == ch, 'cost_per_user'].values[0] * n_users

            # 找到回报月份
            payback_month = None
            for i, cum in enumerate(cumulative_rev):
                if cum >= cac_val:
                    payback_month = monthly_rev.iloc[i]['month_offset']
                    break
            if payback_month is None:
                payback_month = 12  # 超过12个月

        else:
            payback_month = 12

        payback_data.append({
            'channel': ch,
            'payback_months': payback_month,
        })

    pb_df = pd.DataFrame(payback_data).sort_values('payback_months', ascending=True)

    colors = [CHANNEL_COLORS.get(ch, '#95A5A6') for ch in pb_df['channel']]
    bars = ax.barh(range(len(pb_df)), pb_df['payback_months'], color=colors, height=0.6, edgecolor='white')

    for i, (ch, pm) in enumerate(zip(pb_df['channel'], pb_df['payback_months'])):
        ax.text(pm + 0.1, i, f'{int(pm)}个月', va='center', fontsize=10, fontweight='bold')

    ax.set_yticks(range(len(pb_df)))
    ax.set_yticklabels(pb_df['channel'], fontsize=11)
    ax.set_xlabel('回报周期 (月)', fontsize=12)
    ax.set_title('渠道回报周期', fontsize=14, fontweight='bold')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '08_payback_period.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图8: 回报周期瀑布图')


# ============================================================
# 图9: 用户价值分层
# ============================================================
def plot_user_value_distribution(users_df, transactions_df):
    """
    用户价值分层饼图。
    用qcut分4档（鲸鱼/海豚/小鱼/虾米）。
    饼图：各档用户占比，右侧：各档贡献收入占比。
    标注帕累托效应。
    """
    if users_df.empty or transactions_df.empty:
        print('[跳过] 图9: 无用户或交易数据')
        return

    trans = transactions_df.copy()
    user_ltv = trans.groupby('user_id')['order_amount'].sum().reset_index()
    user_ltv.columns = ['user_id', 'ltv']

    # qcut 分4档
    try:
        user_ltv['tier'] = pd.qcut(user_ltv['ltv'], 4, labels=['虾米用户', '小鱼用户', '海豚用户', '鲸鱼用户'])
    except ValueError:
        user_ltv['tier'] = pd.cut(user_ltv['ltv'], 4, labels=['虾米用户', '小鱼用户', '海豚用户', '鲸鱼用户'])

    tier_counts = user_ltv.groupby('tier').size()
    tier_revenue = user_ltv.groupby('tier')['ltv'].sum()

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 6))

    # 左：用户占比饼图
    colors_pie = [VALUE_COLORS.get(t, '#95A5A6') for t in tier_counts.index]
    wedges1, texts1, autotexts1 = ax1.pie(tier_counts, labels=tier_counts.index,
                                           autopct='%1.1f%%', colors=colors_pie,
                                           startangle=90, pctdistance=0.85)
    for t in autotexts1:
        t.set_fontsize(10)
    ax1.set_title('用户占比', fontsize=13, fontweight='bold')

    # 右：收入占比饼图
    wedges2, texts2, autotexts2 = ax2.pie(tier_revenue, labels=tier_revenue.index,
                                           autopct='%1.1f%%', colors=colors_pie,
                                           startangle=90, pctdistance=0.85)
    for t in autotexts2:
        t.set_fontsize(10)
    ax2.set_title('收入贡献占比', fontsize=13, fontweight='bold')

    # 帕累托效应标注
    whale_share = tier_revenue.get('鲸鱼用户', 0) / tier_revenue.sum() * 100
    fig.text(0.5, 0.02, f'帕累托效应：鲸鱼用户贡献 {whale_share:.1f}% 收入',
             ha='center', fontsize=10, color='#E74C3C', fontweight='bold')

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '09_user_value_distribution.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图9: 用户价值分层')


# ============================================================
# 图10: 城市等级分析
# ============================================================
def plot_city_tier_analysis(users_df, transactions_df, channel_costs_df):
    """
    城市等级分析分组柱状图。
    X轴城市等级，3根柱子(LTV/CAC/ARPU)，标注LTV/CAC比值。
    """
    if users_df.empty:
        print('[跳过] 图10: 无用户数据')
        return

    users = users_df.copy()
    trans = transactions_df.copy()
    costs = channel_costs_df.copy()

    city_tiers = users['city_tier'].unique()
    tier_metrics = []

    for ct in city_tiers:
        ct_users = users[users['city_tier'] == ct]
        ct_user_ids = set(ct_users['user_id'])
        n_users = len(ct_users)

        # LTV
        ct_trans = trans[trans['user_id'].isin(ct_user_ids)]
        total_rev = ct_trans['order_amount'].sum()
        ltv = total_rev / max(n_users, 1)

        # ARPU
        arpu = ltv  # 简化

        # CAC (从channel_costs推算，或者从用户数据推算)
        # 用用户数据中的渠道来估算
        ct_channels = ct_users['channel'].unique()
        cac_values = []
        for ch in ct_channels:
            cost_val = costs.loc[costs['channel'] == ch, 'cost_per_user']
            if not cost_val.empty:
                cac_values.append(cost_val.values[0])
        cac = np.mean(cac_values) if cac_values else 0

        tier_metrics.append({
            'city_tier': ct,
            'ltv': ltv,
            'cac': cac,
            'arpu': arpu,
            'ltv_cac_ratio': ltv / max(cac, 1),
        })

    tm_df = pd.DataFrame(tier_metrics)

    fig, ax = plt.subplots(figsize=(10, 6))

    x = np.arange(len(tm_df))
    width = 0.25

    bars1 = ax.bar(x - width, tm_df['ltv'], width, label='LTV', color='#3498DB', edgecolor='white')
    bars2 = ax.bar(x, tm_df['cac'], width, label='CAC', color='#E74C3C', edgecolor='white')
    bars3 = ax.bar(x + width, tm_df['arpu'], width, label='ARPU', color='#2ECC71', edgecolor='white')

    # 标注LTV/CAC比值
    for i, row in tm_df.iterrows():
        ax.text(i + width * 1.5, row['arpu'] * 0.9,
                f"LTV/CAC={row['ltv_cac_ratio']:.1f}",
                fontsize=8, color='#7F8C8D', ha='left')

    ax.set_xticks(x)
    ax.set_xticklabels(tm_df['city_tier'], fontsize=11)
    ax.set_ylabel('金额 (元)', fontsize=12)
    ax.set_title('城市等级分析', fontsize=14, fontweight='bold')
    ax.legend(fontsize=10)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

    plt.tight_layout()
    fig.savefig(os.path.join(CHARTS_DIR, '10_city_tier_analysis.png'), dpi=DPI, bbox_inches='tight')
    plt.close(fig)
    print('[完成] 图10: 城市等级分析')


# ============================================================
# 主函数
# ============================================================
def main():
    """依次调用所有绘图函数。"""
    print('=' * 50)
    print('LTV/CAC 分析可视化')
    print('=' * 50)

    # 确保输出目录存在
    os.makedirs(CHARTS_DIR, exist_ok=True)

    # 加载数据
    data = load_data()

    # 图1: LTV/CAC比值仪表盘
    plot_ltv_cac_ratio(data['ltv_summary'])

    # 图2: LTV vs CAC散点图
    plot_ltv_cac_scatter(data['ltv_summary'])

    # 图3: 同期群留存热力图
    plot_cohort_retention(data['cohort_retention'])

    # 图4: 同期群收入增长曲线
    plot_cohort_revenue(data['users'], data['transactions'])

    # 图5: 月度收入趋势
    plot_monthly_revenue(data['monthly_metrics'])

    # 图6: LTV分布直方图
    plot_ltv_distribution(data['users'], data['transactions'])

    # 图7: 渠道效率四象限图
    plot_channel_efficiency(data['users'], data['transactions'], data['channel_costs'])

    # 图8: 回报周期瀑布图
    plot_payback_period(data['users'], data['transactions'], data['channel_costs'])

    # 图9: 用户价值分层
    plot_user_value_distribution(data['users'], data['transactions'])

    # 图10: 城市等级分析
    plot_city_tier_analysis(data['users'], data['transactions'], data['channel_costs'])

    print('=' * 50)
    print(f'所有图表已保存至: {CHARTS_DIR}')
    print('=' * 50)


if __name__ == '__main__':
    main()
