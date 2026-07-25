# AARRR 海盗指标分析项目深度剖析（上）

## 一、课题思路：为什么选 AARRR？

### AARRR 与 RFM 的区别

RFM 模型关注"用户值多少钱"——通过最近购买时间(Recency)、购买频率(Frequency)、消费金额(Monetary)对用户进行价值分层，是一种**横截面**分析方法。

AARRR 模型关注"用户怎么增长"——通过获客、激活、留存、收入、传播五个环节构建**纵向漏斗**，定位增长瓶颈。

| 维度 | RFM | AARRR |
|------|-----|-------|
| 核心问题 | 谁是有价值用户？ | 增长瓶颈在哪？ |
| 分析视角 | 横截面（某一时刻） | 纵向（全生命周期） |
| 输出 | 用户分群标签 | 转化率+优化建议 |
| 适用场景 | 精细化运营 | 增长黑客 |

### 什么业务场景适合 AARRR

- 有明确用户生命周期的产品（电商、SaaS、社交、内容平台）
- 需要系统化梳理增长路径的团队
- 有多渠道获客需求的产品
- 需要量化传播效应的业务

### 本项目的业务假设

本项目模拟一个电商/App平台，假设：
- 用户通过5个渠道获客（自然搜索、社交媒体、付费广告、内容营销、KOL推荐）
- 用户行为事件链：register -> app_open -> browse -> add_to_cart -> purchase -> repurchase -> share
- 留存呈指数衰减
- K因子约0.24（传播效应较弱）

---

## 二、准备工作

### 2.1 数据设计思路

#### 为什么需要三张表

| 表名 | 用途 | 关键字段 |
|------|------|----------|
| users | 用户基础信息 | user_id, channel, register_date |
| user_events | 用户行为事件 | user_id, event_type, event_date |
| transactions | 交易记录 | user_id, amount, transaction_date |

三张表的设计逻辑：
1. **users** — 获客分析的数据源，channel 字段用于渠道归因
2. **user_events** — 激活和留存分析的数据源，event_type 标识行为类型
3. **transactions** — 收入分析的数据源，amount 用于计算 ARPU/ARPPU

#### 事件类型设计

```
register    → 注册（获客）
app_open    → 打开App（激活入口）
browse      → 浏览商品（活跃指标）
add_to_cart → 加购（转化中间态）
purchase    → 首次购买（激活完成）
repurchase  → 复购（留存+收入）
share       → 分享（传播）
```

关键设计决策：**purchase 既标志激活完成，又贡献收入**。这意味着激活率 = 有购买行为的用户比例，而传播则通过 share 事件来衡量。

#### 漏斗转化率如何设定才有分析意义

- 获客 → 激活：~40%（行业基准30-50%）
- 激活 → 留存：次日留存 ~42%，7日留存 ~28%
- 留存 → 付费：付费转化率 ~24%
- 付费 → 传播：K因子 ~0.24

每个转化率都需要**对标行业基准**来判断是否健康，而非单纯看绝对值。

### 2.2 技术选型

#### Pandas groupby + agg vs SQL 对比

| 维度 | Pandas | SQL |
|------|--------|-----|
| 数据量 | 中小规模 | 大规模 |
| 灵活性 | 高（Python生态） | 中 |
| 留存计算 | 需自定义逻辑 | 窗口函数 |
| 可视化 | 直接对接Matplotlib | 需导出 |

本项目选择 Pandas，因为：
1. 数据量在 Pandas 舒适区（万级用户）
2. 留存率计算需要同期群逻辑，Pandas 更灵活
3. 可视化一体化

#### 留存率的计算方法（同期群分析 Cohort Analysis）

留存率 = 仍活跃用户数 / 该批次总用户数

关键点：
- **分母**是该批次注册的**总用户数**，不是当日活跃用户数
- **分子**是该批次在目标日期仍活跃的用户数
- 同期群（Cohort）= 同一时间段注册的用户群

### 2.3 避坑指南

#### 留存率计算的时间陷阱

**陷阱**：混淆注册日期与观察截止日期。

正确做法：
```python
# 对每个同期群，计算从注册日到观察日之间的天数
# day0 = 注册当日，day1 = 注册次日
# 留存率 = 第N天仍活跃的用户 / 同期群总用户
```

**观察截止日期的影响**：如果观察期不够长，30日留存无法计算（最新注册的用户还没到30天）。解决方案：只计算已满30天的同期群。

#### 转化率的分母选择

漏斗转化的分母选择：
- **用上一步的用户数**：衡量环节间转化效率
- **用总用户数**：衡量整体转化率

AARRR 漏斗通常用**总用户数**作为分母，因为我们要看的是各环节对总量的贡献比例。

#### 小样本偏差

当某渠道用户量 < 30 时，转化率波动极大，不宜作为决策依据。建议：
- 小样本渠道标记为"数据不足"
- 合并同类小渠道
- 用置信区间替代点估计

---

## 三、建模详解

### 3.1 获客分析

#### CAC 计算公式

```
CAC = 获客总成本 / 新增用户数
```

不同渠道的 CAC 差异很大：
- 自然搜索 CAC ≈ 0（有机流量）
- 付费广告 CAC = 广告花费 / 新增用户
- KOL 推荐 CAC = KOL费用 / 新增用户

#### 渠道归因方法

本项目采用**末次点击归因**（Last Click Attribution），即用户的渠道归属以最后一次接触的渠道为准。

更精细的归因方法：
- 首次点击归因（First Click）
- 线性归因（各渠道等权）
- 时间衰减归因（越近的接触权重越高）

#### 代码逻辑解析

```python
# 渠道分布
channel_counts = users_df.groupby('channel').size()
# 渠道占比
channel_pct = channel_counts / len(users_df)
# 月度获客趋势
users_df['register_month'] = pd.to_datetime(users_df['register_date']).dt.to_period('M')
monthly_acq = users_df.groupby('register_month').size()
```

### 3.2 激活分析

#### 激活定义的重要性

激活 = 用户完成关键动作，体验到产品核心价值。激活定义不同，激活率天差地别：
- 宽定义：注册即激活（激活率 100%）
- 严定义：完成首购（激活率 30-50%）

本项目的激活定义：**完成至少3种不同事件类型**（含 purchase），即用户不仅注册，还完成了深度使用。

#### "Aha Moment" 概念

Aha Moment 是用户首次感受到产品价值的瞬间。不同产品的 Aha Moment 不同：
- 电商：首次完成购买
- 社交：首次收到互动
- 工具：首次完成任务

找到 Aha Moment 后，优化目标是**缩短用户到达 Aha Moment 的路径**。

#### 代码逻辑解析

```python
# 计算每个用户的事件种类数
event_diversity = events_df.groupby('user_id')['event_type'].nunique()
# 至少3种事件类型视为激活
activated = event_diversity[event_diversity >= 3].index
# 激活率
activation_rate = len(activated) / total_users
```

### 3.3 留存分析

#### 留存率三种计算方法

1. **经典留存率**：N日后仍活跃的比例
   ```
   Day N 留存率 = N日后仍活跃用户 / 同期群总用户
   ```

2. **滚动留存率**（Rolling Retention）：
   ```
   N日后仍活跃用户 / (同期群总用户 - 已流失用户)
   ```
   分母只算"有可能留存"的用户，更科学。

3. **同期群留存**（Cohort Retention）：
   按注册批次分组，每批独立计算留存率。这是最精细的方法，能看出不同批次的留存差异。

本项目使用**同期群留存**方法。

#### 本项目使用的方法

```python
# 留存率衰减曲线
# 假设留存率呈指数衰减：retention(t) = a * exp(-b*t) + c
# 次日留存 ~42%，7日留存 ~28%，30日留存 ~18%
```

### 3.4 收入分析

#### ARPU vs ARPPU vs LTV

| 指标 | 公式 | 含义 |
|------|------|------|
| ARPU | 总收入/总用户 | 每用户平均收入 |
| ARPPU | 总收入/付费用户 | 每付费用户平均收入 |
| LTV | ARPU/流失率 | 用户生命周期价值 |

注意：ARPU 和 ARPPU 的分母不同，ARPPU 通常远大于 ARPU。

#### LTV 估算方法

```
LTV = ARPU / 流失率
```

其中流失率 = 1 - 留存率。更精确的估算需考虑留存曲线的积分：

```
LTV = ∫ retention(t) * ARPU dt
```

#### 代码逻辑解析

```python
# ARPU
arpu = total_revenue / total_users
# ARPPU
arppu = total_revenue / paying_users
# 付费转化率
paying_ratio = paying_users / total_users
```

### 3.5 传播分析

#### K 因子公式与判断标准

```
K = 平均每个用户邀请的新用户数
```

判断标准：
- K > 1：病毒式增长，每个用户带来超过1个新用户
- 0.5 < K < 1：有传播效应但不够强
- K < 0.5：传播效应微弱

#### 病毒循环周期

病毒循环周期 = 用户从接触到邀请下一个用户所需时间。周期越短，增长越快。

K因子和病毒循环周期共同决定增长速度：
- K = 1 且周期 = 1天 → 每天翻倍
- K = 0.5 且周期 = 7天 → 每两周增长50%

#### 代码逻辑解析

```python
# K因子 = 有邀请行为的用户比例 * 平均邀请数
# 本项目 K ≈ 0.24
# share事件数 / 总用户数
k_factor = share_users_count / total_users
```

---

## 四、图表深度剖析（图1~图5）

### 图1: AARRR 全漏斗图

![AARRR全漏斗图](01_aarrr_funnel.png)

**1. 是什么图**：漏斗图（Funnel Chart），从上到下五个层级，对应 AARRR 五个环节。

**2. 为什么选这种图**：漏斗图天然适合展示转化漏斗，每层的宽度代表该环节的用户量，层间收窄代表转化损失。

**3. 代码怎么写**：
```python
from matplotlib import pyplot as plt

stages = ['Acquisition', 'Activation', 'Retention', 'Revenue', 'Referral']
values = [5000, 2000, 1200, 960, 240]  # 各环节用户量

fig, ax = plt.subplots()
for i, (stage, val) in enumerate(zip(stages, values)):
    ax.barh(len(stages)-i, val, height=0.6)
    ax.text(val/2, len(stages)-i, f'{stage}\n{val}', ha='center', va='center')
```

**4. 长什么样**：上宽下窄的阶梯状，每层标注环节名和用户量。

**5. 怎么读图**：
- 层间差距 = 转化损失
- 最大断点 = 转化率下降最大的环节（通常是激活→留存）
- 整体形状判断健康度

**6. 结论怎么来**：最大断点在激活环节，说明大量用户注册后未深度使用。

---

### 图2: 获客渠道占比饼图

![获客渠道占比饼图](02_channel_pie.png)

**1. 是什么图**：饼图（Pie Chart），展示各渠道用户占比。

**2. 为什么选这种图**：饼图直观展示"份额"，适合5-7个分类的占比展示。

**3. 代码怎么写**：
```python
channels = ['自然搜索', '社交媒体', '付费广告', '内容营销', 'KOL推荐']
sizes = [1500, 1200, 1000, 800, 500]

fig, ax = plt.subplots()
ax.pie(sizes, labels=channels, autopct='%1.1f%%', startangle=90)
```

**4. 长什么样**：五色饼图，自然搜索占比最大（30%），KOL推荐最小（10%）。

**5. 怎么读图**：
- 最大扇区 = 主力渠道
- 过于集中 = 渠道依赖风险
- 过于分散 = 无明显主力渠道

**6. 结论怎么来**：自然搜索占30%是最大渠道，但需结合后续转化率判断质量。

---

### 图3: 渠道对比双轴柱线图

![渠道对比双轴柱线图](03_channel_compare.png)

**1. 是什么图**：双轴图——柱状图展示用户量，折线展示转化率。

**2. 为什么选这种图**：单一指标无法评估渠道质量，需要同时看量和质。

**3. 代码怎么写**：
```python
fig, ax1 = plt.subplots()
ax2 = ax1.twinx()  # 第二Y轴

# 柱状图：用户量
ax1.bar(channels, user_counts, color='steelblue')
# 折线：转化率
ax2.plot(channels, conv_rates, color='orangered', marker='o')
```

**4. 长什么样**：蓝色柱状+红色折线，两套Y轴刻度。

**5. 怎么读图**：
- 柱高 = 渠道用户量
- 线高 = 渠道转化率
- 最佳渠道 = 柱高+线高（量大且质优）
- 量质背离 = 有优化空间

**6. 结论怎么来**：付费广告用户量大但转化率低，社交媒体量小但转化率高——优化方向是把预算从广告转向社交。

---

### 图4: 月度获客趋势面积图

![月度获客趋势面积图](04_monthly_acquisition.png)

**1. 是什么图**：面积图（Area Chart），X轴月份，Y轴新增用户数。

**2. 为什么选这种图**：面积图比折线图更强调"量"的累积感，适合趋势展示。

**3. 代码怎么写**：
```python
fig, ax = plt.subplots()
ax.fill_between(months, new_users, alpha=0.3, color='steelblue')
ax.plot(months, new_users, color='steelblue')
```

**4. 长什么样**：波浪形面积图，Q4通常有峰值。

**5. 怎么读图**：
- 上升趋势 = 增长健康
- 季节性波动 = 正常
- 突然下降 = 渠道异常

**6. 结论怎么来**：月度波动与投放节奏和季节性相关，Q4旺季增长明显。

---

### 图5: 各渠道激活率对比

![各渠道激活率对比](05_activation_rate.png)

**1. 是什么图**：水平柱状图（Horizontal Bar），每行一个渠道，柱长代表激活率。

**2. 为什么选这种图**：渠道名称较长时，水平柱状图比垂直柱状图更易读。

**3. 代码怎么写**：
```python
fig, ax = plt.subplots()
ax.barh(channels, activation_rates, color='coral')
# 添加数值标注
for i, rate in enumerate(activation_rates):
    ax.text(rate + 0.01, i, f'{rate:.1%}', va='center')
```

**4. 长什么样**：5行水平柱，长短不一，每行标注激活率百分比。

**5. 怎么读图**：
- 最长柱 = 最高激活率渠道
- 差距大 = 渠道质量分化严重
- 全部偏低 = 激活定义可能过严

**6. 结论怎么来**：社交媒体渠道激活率最高，付费广告最低——不同渠道用户质量差异显著。
