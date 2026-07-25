# Python Pandas 进阶 —— 时间序列与多表合并

> 这篇文章带你深入 Pandas 进阶技巧,掌握时间序列处理、透视表和多表合并。

**学完这章你能干啥？**
- 会处理日期时间数据,做时间序列分析
- 会用透视表做多维数据分析
- 会把多张表按需合并,进行关联分析

---

## 一、时间序列处理

### 1.1 用生活类比理解

**时间序列就像"日记本"**:

```
日记本：
├── 每页一个日期
├── 记录当天发生的事
└── 可以按月、按年汇总

时间序列处理：
├── 把字符串转成日期
├── 提取年、月、日、星期
└── 按周、月、季度汇总统计
```

**为什么时间序列重要？**

| 场景 | 说明 |
|-----|------|
| 销售分析 | 按月汇总销售额,看增长趋势 |
| 用户行为 | 按周统计活跃用户数 |
| 财务报表 | 按季度计算收入利润 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 时间序列 | Time Series | 按时间顺序排列的数据 |
| 重采样 | Resample | 改变时间频率(如日→月) |
| 滚动窗口 | Rolling Window | 移动计算(如7日均值) |
| 日期索引 | DatetimeIndex | 用日期作为索引 |

### 1.3 创建和转换日期

```python
import pandas as pd
import numpy as np

# ========================================
# 案例：创建日期数据
# ========================================

# 方法1：字符串转日期
date_strings = ['2024-01-15', '2024-02-20', '2024-03-25']
dates = pd.to_datetime(date_strings)
print(f"转换后的日期：{dates}")

# 方法2：生成日期范围
date_range = pd.date_range(start='2024-01-01', end='2024-01-10', freq='D')
print(f"\n连续10天：{date_range}")

# 方法3：生成工作日(跳过周末)
workdays = pd.date_range(start='2024-01-01', periods=10, freq='B')
print(f"\n10个工作日：{workdays}")
```

**频率参数说明**：

| 参数 | 说明 |
|-----|------|
| `'D'` | 每天 |
| `'W'` | 每周 |
| `'M'` | 每月末 |
| `'MS'` | 每月初 |
| `'Q'` | 每季度末 |
| `'Y'` | 每年末 |
| `'H'` | 每小时 |
| `'B'` | 工作日(跳过周末) |

### 1.4 提取日期信息

```python
import pandas as pd

# 创建销售数据
df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=5, freq='D'),
    'sales': [100, 150, 200, 180, 220]
})

print("原始数据：")
print(df)

# 提取日期的各个部分
df['year'] = df['date'].dt.year          # 年
df['month'] = df['date'].dt.month        # 月
df['day'] = df['date'].dt.day            # 日
df['dayofweek'] = df['date'].dt.dayofweek  # 星期几(0=周一,6=周日)
df['quarter'] = df['date'].dt.quarter    # 第几季度

print("\n提取日期信息后：")
print(df[['date', 'sales', 'year', 'month', 'day', 'dayofweek', 'quarter']])
```

### 1.5 时间重采样(Resample)

**定义**：把高频数据汇总成低频数据,如日数据→月数据。

```python
import pandas as pd
import numpy as np

# 创建一年的日销售数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
daily_sales = pd.DataFrame({
    'date': dates,
    'sales': np.random.randint(50, 200, len(dates))
})
daily_sales.set_index('date', inplace=True)

print(f"前5天数据：\n{daily_sales.head()}")
print(f"\n总共有 {len(daily_sales)} 天的数据")

# 重采样：日 → 月
monthly_sales = daily_sales.resample('M').agg({
    'sales': ['sum', 'mean', 'count']
})
monthly_sales.columns = ['月销售额', '日均销售额', '天数']
print(f"\n月度汇总（前6个月）：\n{monthly_sales.head(6)}")

# 重采样：日 → 季度
quarterly_sales = daily_sales.resample('Q').sum()
quarterly_sales.columns = ['季度销售额']
print(f"\n季度汇总：\n{quarterly_sales}")
```

### 1.6 滚动窗口计算(Rolling)

**定义**：在固定窗口内计算统计量,如7日移动平均。

```python
import pandas as pd

# 创建示例数据
df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=10, freq='D'),
    'sales': [100, 120, 90, 150, 180, 140, 200, 170, 190, 210]
})

print("原始数据：")
print(df)

# 7日移动平均
df['7日移动平均'] = df['sales'].rolling(window=7).mean()
print("\n7日移动平均：")
print(df[['date', 'sales', '7日移动平均']])

# 3日移动求和
df['3日累计'] = df['sales'].rolling(window=3).sum()
print("\n3日移动累计：")
print(df[['date', 'sales', '3日累计']])

# 扩展窗口(累计)
df['累计销售额'] = df['sales'].expanding().sum()
df['累计均值'] = df['sales'].expanding().mean()
print("\n扩展窗口计算：")
print(df[['date', 'sales', '累计销售额', '累计均值']])
```

---

## 二、数据透视表(Pivot Table)

### 2.1 用生活类比理解

**透视表就像"魔方"**：

```
原始数据（长表格）：
├── 每行一条记录
├── 有地区、产品、销售额等列
└── 不直观,难以比较

透视表（多维汇总）：
├── 行：地区
├── 列：产品
├── 值：销售额汇总
└── 一目了然,便于对比
```

**为什么用透视表？**

| 没有 | 有 |
|-----|------|
| 长列表,难以对比 | 二维表格,一目了然 |
| 需要写复杂代码 | 一个函数搞定 |
| 不适合汇报展示 | 适合汇报和决策 |

### 2.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 透视表 | Pivot Table | 多维数据汇总表 |
| 行索引 | Index | 表格的行 |
| 列索引 | Columns | 表格的列 |
| 聚合函数 | Aggfunc | 汇总方式(求和、平均等) |

### 2.3 透视表基础

```python
import pandas as pd

# 创建销售数据
df = pd.DataFrame({
    '日期': ['2024-01-01', '2024-01-01', '2024-01-02', '2024-01-02', 
             '2024-01-01', '2024-01-02', '2024-01-01', '2024-01-02'],
    '产品': ['A', 'B', 'A', 'B', 'A', 'B', 'B', 'A'],
    '地区': ['北京', '北京', '北京', '北京', '上海', '上海', '上海', '上海'],
    '销售额': [100, 150, 120, 180, 90, 160, 130, 110]
})

print("原始数据：")
print(df)

# 简单透视表：按地区汇总销售额
pivot1 = pd.pivot_table(df, 
                        values='销售额',      # 要汇总的数值列
                        index='地区',         # 行索引
                        aggfunc='sum')        # 聚合函数
print("\n按地区汇总：")
print(pivot1)

# 多维透视表：地区 × 产品
pivot2 = pd.pivot_table(df,
                        values='销售额',
                        index='地区',          # 行
                        columns='产品',        # 列
                        aggfunc='sum',
                        fill_value=0)         # 空值填充为0
print("\n地区 × 产品：")
print(pivot2)

# 多种聚合函数
pivot3 = pd.pivot_table(df,
                        values='销售额',
                        index='地区',
                        columns='产品',
                        aggfunc=['sum', 'mean', 'count'],
                        fill_value=0)
print("\n多种聚合结果：")
print(pivot3)
```

### 2.4 透视表实战案例

```python
import pandas as pd
import numpy as np

# 创建销售数据
np.random.seed(42)
data = []
regions = ['北京', '上海', '广州', '深圳']
products = ['手机', '电脑', '平板']
months = ['1月', '2月', '3月']

for region in regions:
    for product in products:
        for month in months:
            data.append({
                '地区': region,
                '产品': product,
                '月份': month,
                '销售额': np.random.randint(100, 500),
                '数量': np.random.randint(10, 50)
            })

df = pd.DataFrame(data)
print("原始数据（前10行）：")
print(df.head(10))

# 透视表1：各地区各产品的销售额
pivot_sales = pd.pivot_table(df,
                              values='销售额',
                              index='地区',
                              columns='产品',
                              aggfunc='sum',
                              margins=True,      # 添加汇总行/列
                              margins_name='合计')
print("\n各地区各产品销售额：")
print(pivot_sales)

# 透视表2：各地区各月份的销售数量
pivot_qty = pd.pivot_table(df,
                            values='数量',
                            index='地区',
                            columns='月份',
                            aggfunc='sum')
print("\n各地区各月销售数量：")
print(pivot_qty)

# 透视表3：多层索引
pivot_multi = pd.pivot_table(df,
                              values='销售额',
                              index=['地区', '月份'],  # 多层行索引
                              columns='产品',
                              aggfunc='sum')
print("\n多层索引透视表：")
print(pivot_multi)
```

---

## 三、多表合并(Merge & Join)

### 3.1 用生活类比理解

**多表合并就像"拼图"**：

```
订单表 + 用户表 = 完整信息
├── 订单表：订单ID、用户ID、金额
├── 用户表：用户ID、姓名、城市
└── 合并后：订单ID、用户ID、金额、姓名、城市
```

**为什么需要合并？**

| 没有合并 | 有合并 |
|---------|-------|
| 数据分散在多张表 | 一张表包含所有信息 |
| 无法分析关联关系 | 可以分析用户购买行为 |
| 重复存储用户信息 | 信息规范化存储 |

### 3.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 内连接 | Inner Join | 只保留两表都有的记录 |
| 左连接 | Left Join | 保留左表所有记录 |
| 右连接 | Right Join | 保留右表所有记录 |
| 外连接 | Outer Join | 保留两表所有记录 |
| 主键 | Primary Key | 唯一标识记录的列 |
| 外键 | Foreign Key | 关联其他表的列 |

### 3.3 merge 基本用法

```python
import pandas as pd

# 创建两张表
# 表1：订单表
orders = pd.DataFrame({
    '订单ID': [1, 2, 3, 4, 5],
    '用户ID': [101, 102, 101, 103, 102],
    '金额': [299, 599, 199, 899, 399]
})

# 表2：用户表
users = pd.DataFrame({
    '用户ID': [101, 102, 103, 104],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '城市': ['北京', '上海', '广州', '深圳']
})

print("订单表：")
print(orders)
print("\n用户表：")
print(users)

# 内连接(INNER JOIN) - 只保留两表都有的记录
inner_join = pd.merge(orders, users, on='用户ID', how='inner')
print("\n内连接结果：")
print(inner_join)

# 左连接(LEFT JOIN) - 保留左表所有记录
left_join = pd.merge(orders, users, on='用户ID', how='left')
print("\n左连接结果：")
print(left_join)

# 右连接(RIGHT JOIN) - 保留右表所有记录
right_join = pd.merge(orders, users, on='用户ID', how='right')
print("\n右连接结果：")
print(right_join)

# 外连接(OUTER JOIN) - 保留两表所有记录
outer_join = pd.merge(orders, users, on='用户ID', how='outer')
print("\n外连接结果：")
print(outer_join)
```

**连接类型对比**：

| 连接类型 | 说明 | 使用场景 |
|---------|------|---------|
| `how='inner'` | 只保留匹配记录 | 需要完整信息 |
| `how='left'` | 保留左表全部 | 主表是订单,补充用户信息 |
| `how='right'` | 保留右表全部 | 主表是用户,补充订单信息 |
| `how='outer'` | 保留所有记录 | 不能丢失任何数据 |

### 3.4 concat 纵向合并

```python
import pandas as pd

# 创建两个结构相同的表
df1 = pd.DataFrame({
    '姓名': ['张三', '李四'],
    '成绩': [85, 92]
})

df2 = pd.DataFrame({
    '姓名': ['王五', '赵六'],
    '成绩': [78, 88]
})

print("表1：")
print(df1)
print("\n表2：")
print(df2)

# 纵向合并(追加行)
result = pd.concat([df1, df2], ignore_index=True)
print("\n纵向合并结果：")
print(result)

# 横向合并(追加列)
df3 = pd.DataFrame({
    '班级': ['A班', 'B班', 'C班', 'D班']
})
result2 = pd.concat([result, df3], axis=1)
print("\n横向合并结果：")
print(result2)
```

### 3.5 实战案例：电商数据分析

```python
import pandas as pd

# 订单表
orders = pd.DataFrame({
    'order_id': [1, 2, 3, 4, 5, 6],
    'user_id': [1, 2, 1, 3, 2, 4],
    'product_id': ['P1', 'P2', 'P1', 'P3', 'P2', 'P1'],
    'quantity': [2, 1, 3, 2, 1, 1],
    'order_date': pd.to_datetime(['2024-01-01', '2024-01-02', '2024-01-03', 
                                   '2024-01-03', '2024-01-04', '2024-01-05'])
})

# 用户表
users = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5],
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'city': ['北京', '上海', '广州', '深圳', '杭州'],
    'level': ['VIP', '普通', 'VIP', '普通', '普通']
})

# 商品表
products = pd.DataFrame({
    'product_id': ['P1', 'P2', 'P3', 'P4'],
    'product_name': ['手机', '电脑', '平板', '耳机'],
    'price': [2999, 5999, 1999, 299]
})

print("订单表：")
print(orders)
print("\n用户表：")
print(users)
print("\n商品表：")
print(products)

# 步骤1：订单表合并商品表
order_product = pd.merge(orders, products, on='product_id', how='left')
print("\n订单+商品：")
print(order_product)

# 计算订单金额
order_product['金额'] = order_product['quantity'] * order_product['price']

# 步骤2：合并用户信息
full_data = pd.merge(order_product, users, on='user_id', how='left')
print("\n完整数据：")
print(full_data)

# 步骤3：分析各城市销售额
city_sales = full_data.groupby('city')['金额'].sum().sort_values(ascending=False)
print("\n各城市销售额：")
print(city_sales)

# 步骤4：分析各用户等级消费情况
level_analysis = full_data.groupby('level').agg({
    '金额': ['sum', 'mean', 'count'],
    'user_id': 'nunique'
})
level_analysis.columns = ['总消费', '平均订单金额', '订单数', '用户数']
print("\n用户等级分析：")
print(level_analysis)

# 步骤5：时间趋势分析
full_data['order_date'] = pd.to_datetime(full_data['order_date'])
daily_sales = full_data.groupby('order_date')['金额'].sum()
print("\n每日销售额：")
print(daily_sales)
```

---

## 四、常见错误避坑指南

### 4.1 时间处理常见错误

| 错误 | 正确 |
|-----|------|
| 字符串日期直接比较 | 先用 `pd.to_datetime()` 转换 |
| 忘记设置日期索引 | `df.set_index('date')` |
| 重采样忘记聚合函数 | `.resample('M').sum()` |

```python
import pandas as pd

# ❌ 错误：字符串日期直接比较
dates = pd.DataFrame({
    'date': ['2024-01-15', '2024-02-10', '2024-01-20']
})
# 字符串比较是按字典序,不是按日期

# ✅ 正确：先转换为 datetime
dates['date'] = pd.to_datetime(dates['date'])
print(f"正确排序：\n{dates['date'].sort_values()}")
```

### 4.2 merge 常见问题

| 问题 | 解决方法 |
|-----|---------|
| 列名不一致 | 用 `left_on` 和 `right_on` 指定 |
| 重复列名 | 设置 `suffixes` 参数 |
| 数据量暴增 | 检查是否有多对多关系 |

```python
import pandas as pd

# 列名不一致的情况
df1 = pd.DataFrame({'用户ID': [1, 2], '金额': [100, 200]})
df2 = pd.DataFrame({'user_id': [1, 2], '姓名': ['张三', '李四']})

# ✅ 解决方法：指定 left_on 和 right_on
result = pd.merge(df1, df2, left_on='用户ID', right_on='user_id')
print("列名不一致的合并：")
print(result)
```

---

## 五、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 时间序列 | `to_datetime()`、`date_range()`、`resample()`、`rolling()` |
| 透视表 | `pivot_table()` 多维汇总 |
| 多表合并 | `merge()` 横向连接、`concat()` 纵向拼接 |
| 连接类型 | inner、left、right、outer |

### 核心方法速查表

| 需求 | 方法 |
|-----|------|
| 字符串转日期 | `pd.to_datetime()` |
| 生成日期范围 | `pd.date_range()` |
| 提取日期部分 | `.dt.year/.month/.day` |
| 日→月汇总 | `.resample('M').sum()` |
| 7日移动平均 | `.rolling(7).mean()` |
| 多维汇总 | `pd.pivot_table()` |
| 表连接 | `pd.merge(df1, df2, on, how)` |
| 纵向拼接 | `pd.concat([df1, df2])` |

---

> 恭喜你掌握了 Pandas 进阶技巧！现在你已经能处理复杂的时间序列和多表关联分析了。
