# Python 数据分析案例 —— 电商用户价值分层

> 这篇文章带你完成一个完整的数据分析案例,掌握从数据到洞察的全流程。

**学完这章你能干啥？**
- 完成真实业务场景的数据分析
- 掌握 RFM 用户价值分层方法
- 形成系统化的分析思维
- 输出可落地的业务建议

---

> ⚠️ **环境说明**：本章代码在浏览器在线环境可运行，但建议在本地 Python 环境或 Jupyter Notebook 中运行以获得更好的体验。

---

## 一、业务场景理解

### 1.1 用生活类比理解

**数据分析就像"医生诊断病情"**:

```
数据分析流程:
├── 了解症状 = 理解业务问题
├── 检查化验 = 收集和处理数据
├── 诊断分析 = 发现规律和问题
└── 开药治疗 = 提出解决方案
```

### 1.2 项目背景

| 项目 | 内容 |
|-----|------|
| 行业 | 电商平台 |
| 用户规模 | 5000 名注册用户 |
| 时间范围 | 2023年1月 - 2024年3月 |
| 数据来源 | 订单系统 |

**业务问题**：

```
运营团队面临的困境:
├── 用户太多，无法逐一分析
├── 营销预算有限，不知道优先投给谁
├── 高价值用户流失了才发现
└── 运营活动效果难以评估
```

**分析目标**：

```
目标1：识别高价值用户 → 提供VIP服务
目标2：发现流失风险用户 → 及时召回
目标3：合理分配资源 → 提升ROI
```

---

## 二、分析方法选择

### 2.1 RFM 模型介绍

**RFM 模型说明**：

```
R (Recency)  = 最近一次购买距今天数
             ↓
        数值越小，用户越活跃

F (Frequency) = 购买次数
             ↓
        数值越大，用户越忠诚

M (Monetary)  = 消费金额
             ↓
        数值越大，用户价值越高
```

**为什么选择 RFM 模型？**

| 模型 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| RFM | 简单直观、数据易获取、直接指导运营 | 仅考虑交易维度 | 用户价值分层 |
| 用户画像 | 全面细致 | 需要多维度数据 | 精准营销 |
| 同期群分析 | 看清趋势 | 不直接给出用户标签 | 产品迭代评估 |

### 2.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| RFM | Recency, Frequency, Monetary | 用户价值分析模型 |
| 分层 | Segmentation | 将用户按价值分类 |
| 流失率 | Churn Rate | 用户不再活跃的比例 |
| 客单价 | Average Order Value | 平均每单消费金额 |

### 2.3 分析流程

```
数据准备 → 计算RFM指标 → 打分分层 → 特征分析 → 输出建议
   ↓           ↓           ↓          ↓          ↓
 清洗数据    R/F/M值     1-5分     各层级统计   运营策略
```

---

## 三、数据准备

### 3.1 模拟数据生成

```python
import pandas as pd
import numpy as np

# 模拟电商订单数据
np.random.seed(2024)

n_users = 5000
n_orders = 20000

# 生成用户表
users = pd.DataFrame({
    'user_id': range(1, n_users + 1),
    'register_date': np.random.choice(
        pd.date_range('2022-01-01', '2023-12-31'), 
        n_users
    )
})

# 生成订单表（模拟真实分布：20%用户贡献80%订单）
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(
        pd.date_range('2023-01-01', '2024-03-31'),
        n_orders
    ),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

print("=== 数据概览 ===")
print(f"用户总数: {len(users)}")
print(f"订单总数: {len(orders)}")
print(f"\n订单数据样例：")
print(orders.head(10))
```

### 3.2 数据质量检查

```python
import pandas as pd
import numpy as np

# 重新生成数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

# 数据质量检查
print("=== 数据质量报告 ===")
print(f"订单总数: {len(orders)}")
print(f"用户数: {orders['user_id'].nunique()}")
print(f"时间范围: {orders['order_date'].min()} ~ {orders['order_date'].max()}")
print(f"总销售额: ¥{orders['amount'].sum():,.0f}")
print(f"客单价: ¥{orders['amount'].mean():.0f}")

# 缺失值检查
print(f"\n缺失值统计：")
print(orders.isnull().sum())
```

---

## 四、RFM 计算

### 4.1 用生活类比理解

**RFM 计算就像"给学生打分"**:

```
R (最近购买) = 出勤天数
├── 最近来上课 = 高分
└── 很久没来 = 低分

F (购买频次) = 作业完成次数
├── 经常完成 = 高分
└── 很少完成 = 低分

M (消费金额) = 考试成绩
├── 成绩高 = 高分
└── 成绩低 = 低分
```

### 4.2 计算 RFM 原始值

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

# 设定分析日期
analysis_date = pd.Timestamp('2024-04-01')

# 计算 RFM
rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

print("=== RFM 计算完成 ===")
print(f"用户数: {len(rfm)}")
print(f"\nRFM 数据样例：")
print(rfm.head(10))

# RFM 统计描述
print("\n=== RFM 统计描述 ===")
print(rfm[['recency', 'frequency', 'monetary']].describe())
```

### 4.3 RFM 打分

**打分规则说明**：

| 得分 | R (最近购买) | F (购买频次) | M (消费金额) |
|-----|-------------|-------------|-------------|
| 5分 | 1-30天 | 前20% | 前20% |
| 4分 | 31-90天 | 20-40% | 20-40% |
| 3分 | 91-180天 | 40-60% | 40-60% |
| 2分 | 181-300天 | 60-80% | 60-80% |
| 1分 | 300天以上 | 后20% | 后20% |

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

analysis_date = pd.Timestamp('2024-04-01')

rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

# 使用分位数打分（R越小越好，所以要反向）
rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

# 综合得分
rfm['RFM_score'] = rfm['R_score'] + rfm['F_score'] + rfm['M_score']

print("=== RFM 打分完成 ===")
print(rfm[['recency', 'frequency', 'monetary', 'R_score', 'F_score', 'M_score']].head(15))

# 得分分布
print("\n=== 综合得分分布 ===")
print(rfm['RFM_score'].value_counts().sort_index())
```

---

## 五、用户分层

### 5.1 用生活类比理解

**用户分层就像"学校分班"**:

```
用户分层逻辑:
├── 重点班 = 重要价值客户（高分学生）
├── 提高班 = 重要发展客户（有潜力）
├── 普通班 = 一般客户（正常水平）
└── 基础班 = 低价值客户（需要关注）
```

### 5.2 分层规则定义

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

analysis_date = pd.Timestamp('2024-04-01')

rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

# 定义分层规则
def segment_user(row):
    r, f, m = row['R_score'], row['F_score'], row['M_score']
    
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值客户'    # 高R 高F 高M
    elif r <= 2 and (f >= 4 or m >= 4):
        return '重要保持客户'    # 低R 但高F或高M
    elif r >= 4 and m >= 4 and f <= 2:
        return '重要发展客户'    # 高R 高M 低F
    elif m >= 4 and r <= 2 and f <= 2:
        return '重要挽留客户'    # 高M 低R 低F
    elif 2 <= r <= 3 and 2 <= f <= 3 and 2 <= m <= 3:
        return '一般客户'        # 中等水平
    elif r <= 2 and f <= 2 and m <= 2:
        return '低价值客户'      # 低R 低F 低M
    else:
        return '潜力客户'        # 其他情况

rfm['segment'] = rfm.apply(segment_user, axis=1)

# 统计各层级
print("=== 用户分层统计 ===")
print(rfm['segment'].value_counts())
```

### 5.3 各层级特征分析

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

analysis_date = pd.Timestamp('2024-04-01')

rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

def segment_user(row):
    r, f, m = row['R_score'], row['F_score'], row['M_score']
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值客户'
    elif r <= 2 and (f >= 4 or m >= 4):
        return '重要保持客户'
    elif r >= 4 and m >= 4 and f <= 2:
        return '重要发展客户'
    elif m >= 4 and r <= 2 and f <= 2:
        return '重要挽留客户'
    elif 2 <= r <= 3 and 2 <= f <= 3 and 2 <= m <= 3:
        return '一般客户'
    elif r <= 2 and f <= 2 and m <= 2:
        return '低价值客户'
    else:
        return '潜力客户'

rfm['segment'] = rfm.apply(segment_user, axis=1)

# 各层级特征统计
segment_stats = rfm.groupby('segment').agg({
    'user_id': 'count',
    'recency': 'mean',
    'frequency': 'mean',
    'monetary': ['mean', 'sum']
}).round(2)

segment_stats.columns = ['人数', '平均R(天)', '平均F(次)', '平均M(元)', '总销售额(元)']
segment_stats['人数占比'] = (segment_stats['人数'] / len(rfm) * 100).round(1)
segment_stats['销售占比'] = (segment_stats['总销售额(元)'] / rfm['monetary'].sum() * 100).round(1)

print("=== 各层级特征统计 ===")
print(segment_stats.sort_values('总销售额(元)', ascending=False))
```

---

## 六、分析结论

### 6.1 核心发现

```python
import pandas as pd
import numpy as np

# 模拟数据并计算分层
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

analysis_date = pd.Timestamp('2024-04-01')

rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

def segment_user(row):
    r, f, m = row['R_score'], row['F_score'], row['M_score']
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值客户'
    elif r <= 2 and (f >= 4 or m >= 4):
        return '重要保持客户'
    elif r >= 4 and m >= 4 and f <= 2:
        return '重要发展客户'
    elif m >= 4 and r <= 2 and f <= 2:
        return '重要挽留客户'
    elif 2 <= r <= 3 and 2 <= f <= 3 and 2 <= m <= 3:
        return '一般客户'
    elif r <= 2 and f <= 2 and m <= 2:
        return '低价值客户'
    else:
        return '潜力客户'

rfm['segment'] = rfm.apply(segment_user, axis=1)

# 核心发现
print("=== 核心发现 ===\n")

# 1. 高价值用户贡献
high_value = rfm[rfm['segment'].isin(['重要价值客户', '重要保持客户', '重要发展客户', '重要挽留客户'])]
print(f"1. 高价值用户（前4类）:")
print(f"   - 人数: {len(high_value)} ({len(high_value)/len(rfm)*100:.1f}%)")
print(f"   - 销售贡献: ¥{high_value['monetary'].sum():,.0f} ({high_value['monetary'].sum()/rfm['monetary'].sum()*100:.1f}%)")

# 2. 流失风险
at_risk = rfm[rfm['segment'].isin(['重要保持客户', '重要挽留客户'])]
print(f"\n2. 流失风险用户:")
print(f"   - 人数: {len(at_risk)} ({len(at_risk)/len(rfm)*100:.1f}%)")
print(f"   - 这些用户曾经高消费，但近期未活跃")

# 3. 低价值用户
low_value = rfm[rfm['segment'] == '低价值客户']
print(f"\n3. 低价值用户:")
print(f"   - 人数: {len(low_value)} ({len(low_value)/len(rfm)*100:.1f}%)")
print(f"   - 销售贡献: ¥{low_value['monetary'].sum():,.0f} ({low_value['monetary'].sum()/rfm['monetary'].sum()*100:.1f}%)")
```

### 6.2 用户画像总结

| 用户分层 | 特征 | 运营策略 | 预期效果 |
|---------|------|---------|---------|
| 重要价值客户 | 最近购买、高频消费、高金额 | VIP服务、专属客服、新品优先 | 维持高满意度 |
| 重要保持客户 | 曾经高频/高消费，近期未购买 | 召回短信、限时优惠、问卷回访 | 激活20%以上 |
| 重要发展客户 | 最近购买、高消费，但频次低 | 组合推荐、会员活动、积分加倍 | 提升复购频次 |
| 重要挽留客户 | 曾经高消费，长期未购买 | 电话回访、高价值礼包 | 挽回核心用户 |
| 潜力客户 | 中等水平，有提升空间 | 精准推荐、活动邀请 | 逐步培育 |
| 一般客户 | 消费稳定，无特别表现 | 常规运营、节日问候 | 维持现状 |
| 低价值客户 | 长期未购买、低频低消费 | 大促触达、低成本维护 | 避免过度投入 |

### 6.3 运营建议

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(2024)
n_orders = 20000
active_users = np.random.choice(range(1, 1001), int(n_orders * 0.8))
normal_users = np.random.choice(range(1001, 5001), int(n_orders * 0.2))
user_ids = np.concatenate([active_users, normal_users])

orders = pd.DataFrame({
    'order_id': range(1, n_orders + 1),
    'user_id': user_ids,
    'order_date': np.random.choice(pd.date_range('2023-01-01', '2024-03-31'), n_orders),
    'amount': np.round(np.random.exponential(scale=200, size=n_orders) + 50, 2)
})

analysis_date = pd.Timestamp('2024-04-01')

rfm = orders.groupby('user_id').agg(
    recency=('order_date', lambda x: (analysis_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()

rfm['R_score'] = pd.qcut(rfm['recency'], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
rfm['M_score'] = pd.qcut(rfm['monetary'], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

def segment_user(row):
    r, f, m = row['R_score'], row['F_score'], row['M_score']
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值客户'
    elif r <= 2 and (f >= 4 or m >= 4):
        return '重要保持客户'
    elif r >= 4 and m >= 4 and f <= 2:
        return '重要发展客户'
    elif m >= 4 and r <= 2 and f <= 2:
        return '重要挽留客户'
    elif 2 <= r <= 3 and 2 <= f <= 3 and 2 <= m <= 3:
        return '一般客户'
    elif r <= 2 and f <= 2 and m <= 2:
        return '低价值客户'
    else:
        return '潜力客户'

rfm['segment'] = rfm.apply(segment_user, axis=1)

# 输出各层级用户ID列表（示例）
print("=== 运营建议 ===\n")

# 重要价值客户列表
vip_users = rfm[rfm['segment'] == '重要价值客户']['user_id'].head(10).tolist()
print(f"重要价值客户ID示例（前10个）: {vip_users}")

# 需要召回的用户
recall_users = rfm[rfm['segment'].isin(['重要保持客户', '重要挽留客户'])]['user_id'].head(10).tolist()
print(f"\n需要召回的用户ID示例（前10个）: {recall_users}")

# 统计各层级人数
print("\n=== 各层级人数统计 ===")
segment_counts = rfm['segment'].value_counts()
for segment, count in segment_counts.items():
    print(f"{segment}: {count}人")
```

---

## 七、总结

### 本章学到了什么？

| 步骤 | 内容 | 关键方法 |
|-----|------|---------|
| 业务理解 | 明确分析目标 | 问题拆解 |
| 数据准备 | 收集和清洗数据 | pandas 数据处理 |
| RFM计算 | 计算三个指标 | groupby + agg |
| 用户分层 | 按规则分类 | 自定义函数 |
| 结论输出 | 业务建议 | 数据驱动决策 |

### RFM 分层速查表

| 分层 | R | F | M | 特点 |
|-----|---|---|---|------|
| 重要价值客户 | 高 | 高 | 高 | 活跃且高消费 |
| 重要保持客户 | 低 | 高 | 高 | 曾活跃，现沉睡 |
| 重要发展客户 | 高 | 低 | 高 | 新高价值用户 |
| 重要挽留客户 | 低 | 低 | 高 | 曾高消费，已流失 |
| 潜力客户 | 中 | 中 | 中 | 有提升空间 |
| 一般客户 | 中 | 中 | 中 | 普通用户 |
| 低价值客户 | 低 | 低 | 低 | 低活跃低消费 |

### 分析流程清单

| 步骤 | 操作 | 关键产出 |
|-----|------|---------|
| 1. 业务理解 | 明确问题和目标 | 分析目标文档 |
| 2. 数据准备 | 收集、清洗、探索 | 干净的数据集 |
| 3. 指标计算 | 定义和计算指标 | RFM 数值表 |
| 4. 用户分层 | 按规则分类 | 用户标签 |
| 5. 特征分析 | 统计各层级特征 | 分层报告 |
| 6. 结论输出 | 发现和建议 | 分析报告 |

---

> 恭喜你完成了一个完整的数据分析案例！你已经掌握了从业务理解到结论输出的完整分析流程。在实际工作中，记得根据具体业务场景调整 RFM 分层规则和分析重点。
