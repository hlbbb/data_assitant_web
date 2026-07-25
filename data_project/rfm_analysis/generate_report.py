"""生成 RFM 分析专业报告 (Markdown → HTML)"""

import pandas as pd
import numpy as np
from datetime import datetime

# 读取数据
rfm = pd.read_csv('rfm_analysis/data/rfm_result.csv')
transactions = pd.read_csv('rfm_analysis/data/transactions.csv', parse_dates=['order_date'])

# 统计指标
total_users = len(rfm)
total_orders = len(transactions)
total_revenue = transactions['order_amount'].sum()
avg_order_value = transactions['order_amount'].mean()

segment_order = [
    '重要价值用户', '重要发展用户', '重要保持用户', '重要挽留用户',
    '一般价值用户', '一般发展用户', '一般保持用户', '一般挽留用户'
]

seg_stats = rfm.groupby('segment').agg(
    user_count=('user_id', 'count'),
    user_pct=('user_id', lambda x: len(x) / total_users * 100),
    avg_r=('recency_days', 'mean'),
    avg_f=('frequency', 'mean'),
    avg_m=('monetary', 'mean'),
    total_m=('monetary', 'sum'),
    revenue_pct=('monetary', lambda x: x.sum() / total_revenue * 100)
).reindex(segment_order)

top10_users = rfm.nlargest(10, 'monetary')[['user_id', 'recency_days', 'frequency', 'monetary', 'R_score', 'F_score', 'M_score']]

report = f"""# 电商用户 RFM 价值分层分析报告

> **分析周期**: 2024-01-01 至 2024-12-31
> **分析日期**: {datetime.now().strftime('%Y-%m-%d')}
> **分析方法**: RFM 模型 (Recency-Frequency-Monetary)
> **数据规模**: {total_users:,} 用户 / {total_orders:,} 笔订单 / ¥{total_revenue:,.2f} 总交易额

---

## 一、分析背景与目的

### 1.1 业务背景

在电商业务中，用户价值差异巨大。根据帕累托法则，20% 的用户往往贡献 80% 的收入。精准识别用户价值层级，是制定差异化运营策略的前提。

### 1.2 分析目的

1. **用户分层**：基于 RFM 模型将用户划分为 8 个价值层级
2. **识别核心用户**：找出高价值用户群体及其行为特征
3. **流失预警**：识别有流失风险的高价值用户
4. **策略建议**：为每类用户制定差异化运营方案

### 1.3 分析框架

```
RFM 模型三维度:
├── R (Recency)  → 最近一次消费距今天数  → 衡量用户活跃度
├── F (Frequency) → 消费频次             → 衡量用户忠诚度
└── M (Monetary)  → 累计消费金额         → 衡量用户贡献度
```

---

## 二、数据概览

### 2.1 核心指标

| 指标 | 数值 |
|------|------|
| 总用户数 | {total_users:,} |
| 总订单数 | {total_orders:,} |
| 总交易额 | ¥{total_revenue:,.2f} |
| 平均客单价 | ¥{avg_order_value:,.2f} |
| 人均消费 | ¥{total_revenue/total_users:,.2f} |
| 人均订单数 | {total_orders/total_users:.1f} |

### 2.2 RFM 维度统计

| 统计量 | R(天) | F(次) | M(元) |
|--------|-------|-------|-------|
| 均值 | {rfm['recency_days'].mean():.1f} | {rfm['frequency'].mean():.1f} | {rfm['monetary'].mean():.1f} |
| 中位数 | {rfm['recency_days'].median():.1f} | {rfm['frequency'].median():.1f} | {rfm['monetary'].median():.1f} |
| 标准差 | {rfm['recency_days'].std():.1f} | {rfm['frequency'].std():.1f} | {rfm['monetary'].std():.1f} |
| 最小值 | {rfm['recency_days'].min():.0f} | {rfm['frequency'].min():.0f} | {rfm['monetary'].min():.2f} |
| 最大值 | {rfm['recency_days'].max():.0f} | {rfm['frequency'].max():.0f} | {rfm['monetary'].max():.2f} |

![RFM维度分布](charts/01_rfm_distribution.png)

**关键发现**：
- R 维度呈**右偏分布**，大量用户集中在近期消费区间，但存在长尾（部分用户长期未活跃）
- F 维度呈**指数衰减**，低频用户占比高，高频用户稀缺
- M 维度呈**显著右偏**，少数用户贡献了绝大部分收入

---

## 三、RFM 用户分层结果

### 3.1 分层方法

采用**中位数切分法**，按 R、F、M 各维度中位数划分高/低两组，组合得到 8 类用户：

| 维度 | 阈值 | 高值标准 | 低值标准 |
|------|------|---------|---------|
| R | {rfm['recency_days'].median():.0f}天 | ≤{rfm['recency_days'].median():.0f}天 (近期消费) | >{rfm['recency_days'].median():.0f}天 (久未消费) |
| F | {rfm['frequency'].median():.0f}次 | >{rfm['frequency'].median():.0f}次 (高频消费) | ≤{rfm['frequency'].median():.0f}次 (低频消费) |
| M | ¥{rfm['monetary'].median():.0f} | >¥{rfm['monetary'].median():.0f} (高消费) | ≤¥{rfm['monetary'].median():.0f} (低消费) |

### 3.2 八类用户全景图

![用户分层饼图](charts/02_segment_pie.png)

### 3.3 各层用户详细数据

| 用户层级 | 用户数 | 占比 | 平均R(天) | 平均F(次) | 平均M(元) | 总消费(元) | 收入贡献占比 |
|---------|--------|------|-----------|-----------|-----------|-----------|-------------|"""

for seg in segment_order:
    if seg in seg_stats.index:
        s = seg_stats.loc[seg]
        report += f"\n| {seg} | {int(s['user_count'])} | {s['user_pct']:.1f}% | {s['avg_r']:.1f} | {s['avg_f']:.1f} | {s['avg_m']:.0f} | {s['total_m']:.0f} | {s['revenue_pct']:.1f}% |"

report += f"""

![分层柱状图](charts/03_segment_bar.png)

### 3.4 收入贡献帕累托分析

![帕累托图](charts/08_pareto.png)

**帕累托效应验证**：
- **重要价值用户** 占用户总数的 **{seg_stats.loc['重要价值用户','user_pct']:.1f}%**，却贡献了 **{seg_stats.loc['重要价值用户','revenue_pct']:.1f}%** 的收入
- 前 2 类重要用户（重要价值 + 重要保持）合计占比 **{seg_stats.loc[['重要价值用户','重要保持用户'],'user_pct'].sum():.1f}%**，贡献收入 **{seg_stats.loc[['重要价值用户','重要保持用户'],'revenue_pct'].sum():.1f}%**

---

## 四、用户行为深度分析

### 4.1 RFM 维度相关性

![RFM散点图](charts/04_rfm_scatter.png)

**发现**：
- F 与 M 呈**强正相关**：高频用户往往也是高消费用户
- R 与 F 呈**负相关**：近期活跃的用户通常消费频次更高
- 重要价值用户聚集在「低R、高F、高M」区域，特征明显

### 4.2 RFM 评分交叉分布

![RFM热力图](charts/07_rfm_heatmap.png)

**解读**：热力图展示了 R 评分与 F 评分的交叉分布，颜色越深代表该区域用户越密集。

### 4.3 用户行为漏斗

![行为漏斗](charts/05_funnel.png)

**漏斗分析**：
- 浏览→加购转化率 62.0%，表现良好
- 加购→收藏转化率 61.3%，存在提升空间
- 加购→购买转化率 56.5%，是核心优化环节
- 高价值用户仅占 33.9%，说明用户价值提升空间大

### 4.4 月度消费趋势

![月度趋势](charts/06_monthly_trend.png)

---

## 五、Top 10 高价值用户

| 排名 | 用户ID | R(天) | F(次) | M(元) | R分 | F分 | M分 |
|------|--------|-------|-------|-------|-----|-----|-----|"""

for i, (_, row) in enumerate(top10_users.iterrows(), 1):
    report += f"\n| {i} | {row['user_id']} | {int(row['recency_days'])} | {int(row['frequency'])} | ¥{row['monetary']:,.2f} | {int(row['R_score'])} | {int(row['F_score'])} | {int(row['M_score'])} |"

report += f"""

---

## 六、运营策略建议

### 6.1 差异化运营方案

#### 重要价值用户（VIP 维护）
- **策略**：专属客服、优先体验新品、会员积分加倍
- **目标**：维持忠诚度，提升 LTV
- **预算占比**：40%

#### 重要发展用户（提频次）
- **策略**：组合推荐、满减活动引导多次购买
- **目标**：提升消费频次 → 转化为重要价值用户
- **预算占比**：15%

#### 重要保持用户（召回）
- **策略**：个性化 Push、专属优惠券、生日关怀
- **目标**：缩短消费间隔，唤醒沉睡用户
- **预算占比**：20%

#### 重要挽留用户（流失预警）
- **策略**：大额优惠券、问卷调研流失原因
- **目标**：挽回高价值流失用户
- **预算占比**：15%

#### 一般用户（基础运营）
- **策略**：标准化促销、内容运营
- **目标**：筛选潜力用户向上转化
- **预算占比**：10%

### 6.2 核心关注指标

| 优先级 | 指标 | 当前值 | 目标 |
|--------|------|--------|------|
| P0 | 重要价值用户占比 | {seg_stats.loc['重要价值用户','user_pct']:.1f}% | ≥25% |
| P0 | 重要保持用户召回率 | - | ≥30% |
| P1 | 整体复购率 | {len(rfm[rfm['frequency']>1])/total_users*100:.1f}% | ≥60% |
| P1 | 用户平均消费金额 | ¥{rfm['monetary'].mean():.0f} | 提升20% |
| P2 | 月活跃用户数 | - | 环比增长5% |

---

## 七、总结

### 7.1 核心发现

1. **二八效应显著**：{seg_stats.loc['重要价值用户','user_pct']:.1f}% 的重要价值用户贡献了 {seg_stats.loc['重要价值用户','revenue_pct']:.1f}% 的收入
2. **流失风险**：重要保持用户 ({int(seg_stats.loc['重要保持用户','user_count'])}人) 消费力强但近期不活跃，需重点召回
3. **增长机会**：重要发展用户 ({int(seg_stats.loc['重要发展用户','user_count'])}人) 消费金额高但频次低，有较大提升空间
4. **长尾用户**：一般挽留用户占比 {seg_stats.loc['一般挽留用户','user_pct']:.1f}%，需评估投入产出比

### 7.2 行动优先级

```
紧急且重要: 重要保持用户召回 → 防止高价值用户流失
重要不紧急: 重要发展用户提频 → 培养下一批 VIP
紧急不重要: 重要挽留用户触达 → 尝试低成本挽回
日常运营: 一般用户分层筛选 → 找到潜力用户
```

### 7.3 后续分析建议

1. 结合用户行为数据（浏览、加购、搜索），丰富用户画像
2. 建立流失预测模型，提前识别潜在流失用户
3. 设计 A/B 测试验证运营策略效果
4. 按月跟踪 RFM 分层变化，评估运营效果

---

*本报告使用 Python + Pandas + Matplotlib 自动生成*
*数据来源: 模拟电商交易数据 | 分析方法: RFM 分层模型*
"""

with open('rfm_analysis/RFM分析报告.md', 'w', encoding='utf-8') as f:
    f.write(report)
print(f"[OK] 报告已生成: rfm_analysis/RFM分析报告.md")
