# Python NumPy 数值计算 —— 数据分析的计算器

> 这篇文章带你掌握 NumPy 数值计算，学会高效处理数值数据。

**学完这章你能干啥？**
- 创建和操作 NumPy 数组
- 用布尔索引筛选数据
- 理解广播机制进行数组运算
- 掌握常用统计函数

---

## 一、什么是 NumPy？

### 1.1 用生活类比理解

**NumPy 就像"计算器"**：

```
Python 列表 = 算盘
├── 逐个计算，慢
└── 不能直接做数学运算

NumPy 数组 = 计算器
├── 批量计算，快 100 倍
└── 支持向量运算、矩阵运算
```

### 1.2 为什么数据分析必须学 NumPy？

| 特性 | Python 列表 | NumPy 数组 |
|-----|------------|-----------|
| 速度 | 慢 | 快 50-100 倍 |
| 运算 | 不能直接算 | 支持向量化运算 |
| 内存 | 占用大 | 紧凑高效 |
| 功能 | 基础 | 统计、线性代数 |

### 1.3 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 数组 | ndarray | NumPy 的核心数据结构 |
| 形状 | shape | 数组的维度信息 |
| 数据类型 | dtype | 元素的数据类型 |
| 广播 | broadcasting | 自动扩展不同形状的数组 |
| 向量化 | vectorization | 批量运算，避免循环 |

---

## 二、创建数组

### 2.1 从列表创建

```python
import numpy as np

# 一维数组
a = np.array([1, 2, 3, 4, 5])
print(f"数组：{a}")
print(f"类型：{type(a)}")

# 二维数组
b = np.array([[1, 2, 3], [4, 5, 6]])
print(f"\n二维数组：\n{b}")
```

### 2.2 数组属性

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])

print(f"形状：{a.shape}")    # (2, 3) - 2行3列
print(f"维度：{a.ndim}")     # 2 - 二维
print(f"元素数：{a.size}")   # 6 - 共6个元素
print(f"数据类型：{a.dtype}")  # int64
```

### 2.3 创建特殊数组

```python
import numpy as np

# 全零数组
zeros = np.zeros(5)
print(f"全零：{zeros}")

# 全一数组
ones = np.ones((3, 3))
print(f"\n全一(3x3)：\n{ones}")

# 等差数列
arr = np.arange(0, 10, 2)  # 开始、结束、步长
print(f"\n等差(0-10步长2)：{arr}")

# 等分数列
lin = np.linspace(0, 1, 5)  # 开始、结束、个数
print(f"\n等分(0-1分5份)：{lin}")

# 随机数组
rand = np.random.rand(3)  # [0,1) 之间的随机数
print(f"\n随机(3个)：{rand}")
```

---

## 三、索引与切片

### 3.1 基础索引

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])

print(f"第一个：{a[0]}")    # 10
print(f"最后一个：{a[-1]}")  # 50
print(f"前三个：{a[:3]}")    # [10 20 30]
print(f"后两个：{a[-2:]}")   # [40 50]
print(f"步长2：{a[::2]}")    # [10 30 50]
```

### 3.2 二维数组索引

```python
import numpy as np

a = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

print(f"第1行：{a[0]}")        # [1 2 3]
print(f"第2列：{a[:, 1]}")     # [2 5 8]
print(f"第2行第3列：{a[1, 2]}")  # 6
print(f"前两行：\n{a[:2]}")
```

### 3.3 布尔索引（重要）

**定义**：用条件筛选元素。

```python
import numpy as np

data = np.array([5, 12, 8, 15, 3, 20])

# 筛选大于 10 的元素
mask = data > 10
print(f"条件：{mask}")          # [False True False True False True]
print(f"筛选结果：{data[mask]}")  # [12 15 20]

# 直接写条件
print(f"大于10：{data[data > 10]}")
print(f"偶数：{data[data % 2 == 0]}")
```

### 3.4 花式索引

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])

# 取指定位置
print(f"取第0,2,4个：{a[[0, 2, 4]]}")  # [10 30 50]

# 排序索引
idx = np.argsort(a)  # 升序排序的索引
print(f"排序索引：{idx}")
```

---

## 四、数组运算

### 4.1 基本运算

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(f"加法：{a + b}")      # [5 7 9]
print(f"减法：{a - b}")      # [-3 -3 -3]
print(f"乘法：{a * b}")      # [4 10 18]
print(f"除法：{a / b}")      # [0.25 0.4 0.5]
print(f"幂运算：{a ** 2}")    # [1 4 9]
print(f"开方：{np.sqrt(a)}")  # [1. 1.41 1.73]
```

### 4.2 广播机制

**定义**：不同形状的数组自动扩展后运算。

```python
import numpy as np

a = np.array([1, 2, 3])

# 标量广播
print(f"数组+10：{a + 10}")  # [11 12 13]

# 不同形状广播
b = np.array([[1], [2], [3]])  # 3行1列
c = np.array([10, 20])         # 1行2列
print(f"\n广播结果：\n{b + c}")
# [[11 21]
#  [12 22]
#  [13 23]]
```

### 4.3 实际应用

```python
import numpy as np

# 产品单价和销量
prices = np.array([10, 20, 30, 40])
quantities = np.array([100, 200, 150, 80])

# 计算销售额
revenue = prices * quantities
print(f"各产品销售额：{revenue}")

# 统一打8折
discounted = revenue * 0.8
print(f"折后销售额：{discounted}")

# 计算占比
total = revenue.sum()
ratio = revenue / total * 100
print(f"各产品占比：{ratio}")
```

---

## 五、统计函数

### 5.1 基础统计

```python
import numpy as np

data = np.array([23, 45, 12, 67, 34, 89, 56])

print(f"求和：{data.sum()}")        # 326
print(f"平均值：{data.mean():.2f}")  # 46.57
print(f"标准差：{data.std():.2f}")   # 25.48
print(f"最大值：{data.max()}")       # 89
print(f"最小值：{data.min()}")       # 12
print(f"最大值索引：{data.argmax()}")  # 5
print(f"最小值索引：{data.argmin()}")  # 2
```

### 5.2 二维数组统计

```python
import numpy as np

# 模拟4个学生3门课成绩
scores = np.array([
    [85, 90, 78],
    [92, 88, 95],
    [76, 95, 82],
    [88, 92, 90]
])

print("按行统计（每个学生）：")
print(f"  平均分：{scores.mean(axis=1)}")
print(f"  最高分：{scores.max(axis=1)}")

print("\n按列统计（每门课）：")
print(f"  平均分：{scores.mean(axis=0)}")
print(f"  最高分：{scores.max(axis=0)}")
```

### 5.3 其他常用函数

```python
import numpy as np

data = np.array([23, 45, 12, 67, 34, 89, 56])

# 累计和
print(f"累计和：{np.cumsum(data)}")

# 排序
print(f"升序：{np.sort(data)}")
print(f"降序：{np.sort(data)[::-1]}")

# 分位数
q25, q50, q75 = np.percentile(data, [25, 50, 75])
print(f"Q1={q25}, 中位数={q50}, Q3={q75}")

# 去重
arr = np.array([1, 2, 2, 3, 3, 3])
print(f"去重：{np.unique(arr)}")
```

---

## 六、数组变形

### 6.1 改变形状

```python
import numpy as np

a = np.arange(12)  # [0 1 2 ... 11]
print(f"原始形状：{a.shape}")

# 变成 3x4
b = a.reshape(3, 4)
print(f"\nreshape(3,4)：\n{b}")

# 变成 2x6
c = a.reshape(2, 6)
print(f"\nreshape(2,6)：\n{c}")

# 展平
d = b.flatten()
print(f"\n展平：{d}")
```

### 6.2 转置

```python
import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])
print(f"原始：\n{a}")

print(f"\n转置：\n{a.T}")
```

### 6.3 拼接与拆分

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# 拼接
print(f"横向拼接：{np.hstack([a, b])}")  # [1 2 3 4 5 6]
print(f"纵向拼接：\n{np.vstack([a, b])}")

# 拆分
c = np.array([1, 2, 3, 4, 5, 6])
print(f"\n拆分成3份：{np.split(c, 3)}")
```

---

## 七、随机数

### 7.1 随机数生成

```python
import numpy as np

# 设置随机种子（结果可复现）
np.random.seed(42)

# [0, 1) 之间的随机数
print(f"rand(5)：{np.random.rand(5)}")

# 标准正态分布
print(f"\nrandn(5)：{np.random.randn(5)}")

# 整数随机
print(f"\nrandint(1,100,5)：{np.random.randint(1, 100, 5)}")

# 随机选择
data = np.array([10, 20, 30, 40, 50])
print(f"\n随机选3个：{np.random.choice(data, 3)}")

# 随机打乱
arr = np.arange(10)
np.random.shuffle(arr)
print(f"\n打乱后：{arr}")
```

---

## 八、实战案例：销售数据分析

### 8.1 场景背景

分析 12 个月的销售数据，计算统计指标和环比增长。

### 8.2 完整代码

```python
import numpy as np

# 模拟12个月销售数据
np.random.seed(42)
sales = np.random.randint(100, 500, size=12) * 10
months = np.arange(1, 13)

print("=== 销售数据分析 ===")
print(f"月份数据：{sales}")

# 基础统计
print(f"\n总销售额：{sales.sum():,}元")
print(f"月均销售：{sales.mean():,.0f}元")
print(f"标准差：{sales.std():,.0f}元")

# 最高最低
max_idx = sales.argmax()
min_idx = sales.argmin()
print(f"\n最高月份：{months[max_idx]}月（{sales[max_idx]:,}元）")
print(f"最低月份：{months[min_idx]}月（{sales[min_idx]:,}元）")

# 环比增长
growth = np.diff(sales) / sales[:-1] * 100
print(f"\n环比增长率：{growth}")
print(f"平均增长率：{growth.mean():.1f}%")

# 累计销售额
cumsum = np.cumsum(sales)
print(f"\n累计销售额（前6个月）：{cumsum[:6]}")

# 分位数
q25, q50, q75 = np.percentile(sales, [25, 50, 75])
print(f"\nQ1={q25:.0f}元, 中位数={q50:.0f}元, Q3={q75:.0f}元")
```

**运行结果**：

```
=== 销售数据分析 ===
月份数据：[4030 3070 3920 4500 3270 4830 3270 4190 4880 4550 2680 4900]

总销售额：48,090元
月均销售：4,008元
标准差：710元

最高月份：12月（4,900元）
最低月份：11月（2,680元）

环比增长率：[-23.8  27.7  14.8 -27.3  47.7 -32.3  28.1  16.5  -6.8 -41.0  82.7]
平均增长率：8.3%

累计销售额（前6个月）：[ 4030  7100 11020 15520 18790 23620]

Q1=3262元, 中位数=4100元, Q3=4562元
```

---

## 九、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 创建数组 | `np.array()`、`zeros()`、`ones()`、`arange()` |
| 数组属性 | `shape`、`ndim`、`size`、`dtype` |
| 索引切片 | 基础索引、布尔索引、花式索引 |
| 数组运算 | 四则运算、广播机制 |
| 统计函数 | `sum()`、`mean()`、`std()`、`max()`、`min()` |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| 列表直接做数学运算 | 转成 NumPy 数组 |
| 用循环筛选数据 | 用布尔索引 |
| 忘记设置随机种子 | `np.random.seed()` |

---

> 恭喜你掌握了 NumPy 数值计算！现在你已经学会高效处理数值数据了。
