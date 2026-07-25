# Python Matplotlib 可视化 —— 数据分析师的画笔

> 这篇文章带你掌握 Matplotlib 数据可视化,学会用图表讲故事。

**学完这章你能干啥？**
- 会画折线图展示趋势变化
- 会画柱状图对比各类数据
- 会画散点图分析变量关系
- 会画直方图和饼图展示分布

---

## 一、Matplotlib 基础

### 1.1 用生活类比理解

**Matplotlib 就像"画板"**:

```
画板:
├── 准备画布 → plt.figure()
├── 画图 → plt.plot()、plt.bar()
└── 展示/保存 → plt.show()、plt.savefig()

画图步骤:
├── 1. 准备数据
├── 2. 创建画布
├── 3. 绑定图形
├── 4. 设置标题、标签
└── 5. 显示或保存
```

**为什么需要可视化？**

| 文字描述 | 图表展示 |
|---------|---------|
| "销售额上涨" | 折线图一目了然 |
| "各产品对比" | 柱状图清晰直观 |
| "用户年龄分布" | 直方图一看就懂 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 图形 | Figure | 整个画布 |
| 坐标轴 | Axes | 一个子图 |
| 绑定 | Plot | 绑制数据 |
| 标签 | Label | 坐标轴说明 |
| 图例 | Legend | 区分不同数据 |

### 1.3 第一个图表

```python
import matplotlib.pyplot as plt

# 准备数据
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [120, 150, 180, 200, 230, 250]

# 创建画布并绑定
plt.figure(figsize=(8, 4))
plt.plot(months, sales, marker="o", linewidth=2)

# 设置标题和标签
plt.title("Monthly Sales Trend")
plt.ylabel("Sales (10k yuan)")
plt.grid(True, alpha=0.3)

# 显示图表
plt.show()
```

![折线图](/python_learning/matplotlib/01_line_chart.png)

---

## 二、折线图 —— 趋势之王

### 2.1 用生活类比理解

**折线图就像"心电图"**:

```
折线图特点:
├── 横轴: 时间(月份、日期)
├── 纵轴: 数值(销售额、用户数)
└── 用途: 展示趋势变化
```

### 2.2 基础折线图

```python
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [120, 150, 180, 200, 230, 250]

plt.figure(figsize=(8, 4))
plt.plot(months, sales, marker="o", linewidth=2, color="steelblue")
plt.title("Monthly Sales Trend")
plt.ylabel("Sales (10k yuan)")
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

![折线图](/python_learning/matplotlib/01_line_chart.png)

### 2.3 双线对比图

```python
import matplotlib.pyplot as plt
import numpy as np

months = np.arange(1, 13)
online = [120, 150, 180, 200, 220, 250, 240, 260, 280, 300, 310, 350]
offline = [100, 90, 110, 130, 140, 120, 150, 160, 170, 180, 190, 200]

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(months, online, "b-o", label="Online", linewidth=2)
ax.plot(months, offline, "r--s", label="Offline", linewidth=2)
ax.set_title("Online vs Offline Sales Trend")
ax.set_xlabel("Month")
ax.set_ylabel("Sales (10k yuan)")
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

![双线对比](/python_learning/matplotlib/02_compare_line.png)

### 2.4 折线图样式设置

| 参数 | 说明 | 示例 |
|-----|------|------|
| `marker` | 数据点标记 | `"o"`圆圈、`"s"`方块 |
| `linewidth` | 线条宽度 | `2` |
| `color` | 线条颜色 | `"steelblue"` |
| `linestyle` | 线条样式 | `"-"`实线、`"--"`虚线 |

---

## 三、柱状图 —— 对比之王

### 3.1 用生活类比理解

**柱状图就像"比高低"**:

```
柱状图特点:
├── 横轴: 类别(产品、地区)
├── 纵轴: 数值(销售额、数量)
└── 用途: 对比不同类别
```

### 3.2 基础柱状图

```python
import matplotlib.pyplot as plt

categories = ["Phone", "PC", "Tablet", "Earphone"]
sales = [5800, 8900, 3200, 2100]

plt.figure(figsize=(8, 4))
bars = plt.bar(categories, sales, color=["#4C72B0", "#55A868", "#C44E52", "#8172B2"])
plt.title("Sales by Category")
plt.ylabel("Sales (yuan)")

# 添加数值标签
for bar, val in zip(bars, sales):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 100,
             f"{val}", ha="center", fontsize=10)

plt.tight_layout()
plt.show()
```

![柱状图](/python_learning/matplotlib/03_bar_chart.png)

### 3.3 分组柱状图

```python
import matplotlib.pyplot as plt
import numpy as np

regions = ["East", "South", "North"]
q1 = [120, 100, 90]
q2 = [150, 130, 110]

x = np.arange(len(regions))
width = 0.35

fig, ax = plt.subplots(figsize=(8, 5))
ax.bar(x - width/2, q1, width, label="Q1", color="#4C72B0")
ax.bar(x + width/2, q2, width, label="Q2", color="#55A868")
ax.set_xticks(x)
ax.set_xticklabels(regions)
ax.set_title("Quarterly Sales by Region")
ax.set_ylabel("Sales (10k yuan)")
ax.legend()
plt.tight_layout()
plt.show()
```

![分组柱状图](/python_learning/matplotlib/04_grouped_bar.png)

---

## 四、散点图 —— 关系之王

### 4.1 用生活类比理解

**散点图就像"星空"**:

```
散点图特点:
├── 横轴: 变量X(广告投入)
├── 纵轴: 变量Y(销售额)
└── 用途: 分析两个变量的关系
```

### 4.2 基础散点图

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.randn(50)
y = 2 * x + np.random.randn(50) * 0.5

plt.figure(figsize=(6, 6))
plt.scatter(x, y, alpha=0.6, s=50, c="steelblue")
plt.title("Scatter Plot Example")
plt.xlabel("X")
plt.ylabel("Y")
plt.tight_layout()
plt.show()
```

![散点图](/python_learning/matplotlib/05_scatter.png)

### 4.3 相关性分析

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
ad_spend = np.random.uniform(10, 100, 30)
sales = ad_spend * 1.5 + np.random.normal(0, 15, 30)

plt.figure(figsize=(8, 6))
plt.scatter(ad_spend, sales, alpha=0.7, c="steelblue", s=60)
plt.xlabel("Ad Spend (10k yuan)")
plt.ylabel("Sales (10k yuan)")
plt.title("Ad Spend vs Sales Correlation")
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

![相关性分析](/python_learning/matplotlib/06_scatter_analysis.png)

### 4.4 散点图参数说明

| 参数 | 说明 |
|-----|------|
| `alpha` | 透明度(0-1),避免重叠 |
| `s` | 点的大小 |
| `c` | 点的颜色 |

---

## 五、直方图 —— 分布之王

### 5.1 用生活类比理解

**直方图就像"人口普查"**:

```
直方图特点:
├── 横轴: 数值区间
├── 纵轴: 频次(人数)
└── 用途: 展示数据分布
```

### 5.2 基础直方图

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
data = np.random.randn(1000)

plt.figure(figsize=(8, 4))
plt.hist(data, bins=30, edgecolor="black", alpha=0.7, color="steelblue")
plt.title("Normal Distribution Histogram")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()
```

![直方图](/python_learning/matplotlib/07_histogram.png)

### 5.3 年龄分布示例

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
ages = np.concatenate([
    np.random.normal(25, 3, 200),   # 年轻客户
    np.random.normal(40, 5, 150),   # 中年客户
    np.random.normal(55, 4, 100),   # 老年客户
])

plt.figure(figsize=(8, 4))
plt.hist(ages, bins=30, edgecolor="black", alpha=0.7, color="steelblue")
plt.title("Customer Age Distribution")
plt.xlabel("Age")
plt.ylabel("Count")
plt.tight_layout()
plt.show()
```

![年龄分布](/python_learning/matplotlib/08_age_dist.png)

---

## 六、饼图 —— 占比之王

### 6.1 用生活类比理解

**饼图就像"切蛋糕"**:

```
饼图特点:
├── 展示各部分占整体的比例
├── 适合类别少于7个的数据
└── 一眼看出谁多谁少
```

### 6.2 饼图示例

```python
import matplotlib.pyplot as plt

labels = ["Phone", "PC", "Tablet", "Earphone"]
sizes = [35, 30, 20, 15]
colors = ["#4C72B0", "#55A868", "#C44E52", "#8172B2"]
explode = (0.05, 0, 0, 0)   # 突出第一块

plt.figure(figsize=(6, 6))
plt.pie(sizes, labels=labels, colors=colors, explode=explode,
        autopct="%1.1f%%", startangle=90)
plt.title("Sales Distribution")
plt.tight_layout()
plt.show()
```

![饼图](/python_learning/matplotlib/09_pie_chart.png)

### 6.3 饼图参数说明

| 参数 | 说明 |
|-----|------|
| `labels` | 各部分名称 |
| `colors` | 各部分颜色 |
| `explode` | 突出显示(如(0.05, 0, 0, 0)) |
| `autopct` | 显示百分比格式 |
| `startangle` | 起始角度 |

---

## 七、子图布局

### 7.1 什么是子图？

**定义**：在一个画布上绘制多个图表。

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 100)

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0, 0].plot(x, np.sin(x), color="steelblue")
axes[0, 0].set_title("Sin")

axes[0, 1].plot(x, np.cos(x), color="#C44E52")
axes[0, 1].set_title("Cos")

axes[1, 0].plot(x, np.tan(x), color="#55A868")
axes[1, 0].set_title("Tan")
axes[1, 0].set_ylim(-5, 5)

axes[1, 1].plot(x, np.sin(x) + np.cos(x), color="#8172B2")
axes[1, 1].set_title("Sin + Cos")

plt.tight_layout()
plt.show()
```

![子图](/python_learning/matplotlib/10_subplots.png)

### 7.2 subplots 参数

| 参数 | 说明 |
|-----|------|
| `2, 2` | 2行2列的子图布局 |
| `figsize` | 整个画布大小 |
| `tight_layout()` | 自动调整间距 |

---

## 八、样式美化

### 8.1 添加数值标签

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.arange(12)
y = np.random.randint(50, 200, 12)

fig, ax = plt.subplots(figsize=(10, 5))
bars = ax.bar(x, y, color="steelblue")
ax.set_title("2024 Monthly Sales", fontsize=16, fontweight="bold")
ax.set_xlabel("Month", fontsize=12)
ax.set_ylabel("Sales (10k yuan)", fontsize=12)
ax.set_xticks(x)
ax.set_xticklabels([f"{i+1}" for i in range(12)])

# 添加数值标签
for i, v in enumerate(y):
    ax.text(i, v + 3, str(v), ha="center", fontsize=9)

plt.tight_layout()
plt.show()
```

![美化样式](/python_learning/matplotlib/11_styled_chart.png)

### 8.2 常用样式设置

| 设置 | 方法 |
|-----|------|
| 标题字体大小 | `fontsize=16` |
| 标题加粗 | `fontweight="bold"` |
| 添加网格 | `plt.grid(True, alpha=0.3)` |
| 自动调整间距 | `plt.tight_layout()` |

---

## 九、箱线图

### 9.1 什么是箱线图？

**定义**：展示数据分布的统计图,显示最大值、最小值、中位数、四分位数。

```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
data = [np.random.normal(50, 10, 100),
        np.random.normal(60, 15, 100),
        np.random.normal(40, 8, 100)]

plt.figure(figsize=(8, 5))
plt.boxplot(data, labels=["Group A", "Group B", "Group C"])
plt.title("Box Plot Comparison")
plt.ylabel("Value")
plt.tight_layout()
plt.show()
```

![箱线图](/python_learning/matplotlib/12_boxplot.png)

---

## 十、总结

### 本章学到了什么？

| 图表类型 | 用途 | 关键方法 |
|---------|------|---------|
| 折线图 | 展示趋势 | `plt.plot()` |
| 柱状图 | 对比数据 | `plt.bar()` |
| 散点图 | 分析关系 | `plt.scatter()` |
| 直方图 | 展示分布 | `plt.hist()` |
| 饼图 | 展示占比 | `plt.pie()` |
| 子图 | 多图展示 | `plt.subplots()` |

### 图表选择指南

| 需求 | 推荐图表 |
|-----|---------|
| 看趋势变化 | 折线图 |
| 对比不同类别 | 柱状图 |
| 分析两个变量关系 | 散点图 |
| 展示数据分布 | 直方图 |
| 展示占比 | 饼图 |

---

> 恭喜你掌握了 Matplotlib 可视化！现在你已经学会用图表讲数据故事了。
