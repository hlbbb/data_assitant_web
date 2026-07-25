# Python Seaborn 统计可视化 —— 数据分析师的美颜工具

> 这篇文章带你掌握 Seaborn 统计可视化,学会用更少的代码画出更美的图。

**学完这章你能干啥？**
- 会画分布图查看数据分布
- 会画关系图分析变量关系
- 会画分类图对比不同组别
- 会画热力图展示矩阵数据

---

## 一、Seaborn 基础

### 1.1 用生活类比理解

**Seaborn 就像"美颜滤镜"**:

```
Matplotlib = 原相机
├── 需要手动调参数
├── 默认样式朴素
└── 灵活但繁琐

Seaborn = 美颜相机
├── 一行代码出图
├── 默认配色好看
└── 统计图专业
```

**为什么选择 Seaborn？**

| 特性 | Matplotlib | Seaborn |
|-----|------------|---------|
| 代码量 | 多 | 少 |
| 默认样式 | 朴素 | 美观 |
| 统计图 | 需手动计算 | 自动计算 |
| 配色 | 需自己选 | 内置配色方案 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 分布图 | Distribution Plot | 展示数据分布 |
| 关系图 | Relational Plot | 展示变量关系 |
| 分类图 | Categorical Plot | 按类别对比 |
| 热力图 | Heatmap | 用颜色表示数值 |

### 1.3 第一个图表

```python
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

# 设置主题
sns.set_theme(style="whitegrid")

# 准备数据
np.random.seed(42)
data = np.random.randn(200)

# 绑制直方图
sns.histplot(data, kde=True)
plt.title("Data Distribution")
plt.show()
```

![histplot](/python_learning/seaborn/01_histplot.png)

---

## 二、分布图 —— 数据长什么样

### 2.1 用生活类比理解

**分布图就像"给数据拍X光"**:

```
分布图特点:
├── 看数据"身材"（胖瘦、高矮）
├── 看数据集中在哪些区域
└── 看是否有异常值
```

### 2.2 histplot() 直方图

**定义**：直方图+核密度估计线,展示数据分布。

**基本语法**：
```python
sns.histplot(data, x=None, y=None, hue=None, kde=False, bins='auto')
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame/数组 | 输入数据 | `df` 或 `[1,2,3]` |
| `x` | str | x轴对应的列名 | `"age"` |
| `y` | str | y轴对应的列名 | `"score"` |
| `hue` | str | 按类别分色的列名 | `"gender"` |
| `kde` | bool | 是否显示核密度曲线 | `True` |
| `bins` | int/str | 柱子数量 | `20` 或 `"auto"` |
| `stat` | str | 统计方式 | `"count"`, `"density"`, `"probability"` |
| `element` | str | 绑制样式 | `"bars"`, `"step"`, `"poly"` |
| `multiple` | str | 多组数据叠加方式 | `"layer"`, `"dodge"`, `"stack"` |

**代码示例**：
```python
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
data = np.random.randn(200)

plt.figure(figsize=(6, 3))
sns.histplot(data, kde=True, color="steelblue", bins=20)
plt.title("Data Distribution")
plt.xlabel("Value")
plt.ylabel("Count")
plt.show()
```

![histplot](/python_learning/seaborn/01_histplot.png)

### 2.3 kdeplot() 核密度图

**定义**：用平滑曲线展示数据密度分布。

**基本语法**：
```python
sns.kdeplot(data, x=None, y=None, hue=None, fill=False, multiple='layer')
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame/数组 | 输入数据 | `df` |
| `x` | str | x轴对应的列名 | `"value"` |
| `y` | str | y轴对应的列名 | `"height"` |
| `hue` | str | 按类别分色的列名 | `"category"` |
| `fill` | bool | 是否填充曲线下方 | `True` |
| `multiple` | str | 多组数据叠加方式 | `"layer"`, `"stack"`, `"fill"` |
| `alpha` | float | 透明度(0-1) | `0.5` |
| `linewidth` | float | 曲线宽度 | `2` |
| `bw_adjust` | float | 曲线平滑度 | `1` (越大越平滑) |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
df = pd.DataFrame({
    "Category": ["A"] * 100 + ["B"] * 100,
    "Value": np.concatenate([
        np.random.normal(50, 10, 100),
        np.random.normal(60, 12, 100)
    ])
})

plt.figure(figsize=(6, 3))
sns.kdeplot(data=df, x="Value", hue="Category", fill=True, alpha=0.5)
plt.title("A/B Category Distribution")
plt.xlabel("Value")
plt.ylabel("Density")
plt.show()
```

![kdeplot](/python_learning/seaborn/02_kdeplot.png)

### 2.4 分布图选择指南

| 需求 | 推荐函数 | 说明 |
|-----|---------|------|
| 看数据分布形状 | `histplot()` | 直方图更直观 |
| 看密度曲线 | `kdeplot()` | 曲线更平滑 |
| 多组数据对比 | `kdeplot(hue=)` | 用不同颜色区分 |

---

## 三、关系图 —— 两个变量的关系

### 3.1 用生活类比理解

**关系图就像"看两个变量怎么一起走"**:

```
关系图特点:
├── 散点图看相关性
├── 折线图看趋势
└── 自动添加图例
```

### 3.2 scatterplot() 散点图

**基本语法**：
```python
sns.scatterplot(data, x, y, hue=None, style=None, size=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `x` | str | x轴列名 | `"total_bill"` |
| `y` | str | y轴列名 | `"tip"` |
| `hue` | str | 按颜色区分的列 | `"time"` |
| `style` | str | 按标记样式区分的列 | `"gender"` |
| `size` | str | 按点大小区分的列 | `"amount"` |
| `sizes` | tuple | 点大小范围 | `(20, 200)` |
| `alpha` | float | 透明度 | `0.7` |
| `palette` | str/list | 颜色方案 | `"deep"` 或 `["red", "blue"]` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
tips = pd.DataFrame({
    "total_bill": np.random.uniform(10, 50, 100),
    "tip": np.random.uniform(1, 10, 100),
    "time": np.random.choice(["Lunch", "Dinner"], 100)
})

plt.figure(figsize=(6, 4))
sns.scatterplot(data=tips, x="total_bill", y="tip", hue="time", alpha=0.7)
plt.title("Total Bill vs Tip")
plt.xlabel("Total Bill ($)")
plt.ylabel("Tip ($)")
plt.show()
```

![scatterplot](/python_learning/seaborn/03_scatterplot.png)

### 3.3 lineplot() 折线图

**特点**：自动添加置信区间。

**基本语法**：
```python
sns.lineplot(data, x, y, hue=None, style=None, errorbar='ci')
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `x` | str | x轴列名 | `"month"` |
| `y` | str | y轴列名 | `"sales"` |
| `hue` | str | 按颜色区分的列 | `"region"` |
| `style` | str | 按线型区分的列 | `"type"` |
| `markers` | bool | 是否显示数据点标记 | `True` |
| `marker` | str | 标记样式 | `"o"`, `"s"`, `"^"` |
| `errorbar` | str | 误差线类型 | `"ci"`, `"sd"`, `None` |
| `ci` | int | 置信区间 | `95` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

line_data = pd.DataFrame({
    "size": [1, 2, 3, 4, 5, 6] * 4,
    "total_bill": [15, 25, 35, 40, 50, 55,
                   12, 22, 32, 38, 48, 52,
                   18, 28, 38, 45, 55, 58,
                   14, 24, 34, 42, 52, 56],
    "time": ["Lunch"] * 6 + ["Dinner"] * 6 + ["Lunch"] * 6 + ["Dinner"] * 6
})

plt.figure(figsize=(6, 3.5))
sns.lineplot(data=line_data, x="size", y="total_bill", hue="time", marker="o")
plt.title("Bill by Party Size")
plt.xlabel("Party Size")
plt.ylabel("Total Bill ($)")
plt.show()
```

![lineplot](/python_learning/seaborn/04_lineplot.png)

### 3.4 关系图选择指南

| 需求 | 推荐函数 | 说明 |
|-----|---------|------|
| 看两个变量的相关性 | `scatterplot()` | 散点图 |
| 看趋势变化 | `lineplot()` | 折线图 |
| 三维关系(大小+颜色) | `scatterplot(size=, hue=)` | 用点大小区分 |

---

## 四、分类图 —— 按类别比较

### 4.1 用生活类比理解

**分类图就像"让不同队伍站成一排比高低"**:

```
分类图特点:
├── 箱线图看分布和异常值
├── 小提琴图看密度
├── 柱状图看均值
└── 自动计算统计量
```

### 4.2 boxplot() 箱线图

**基本语法**：
```python
sns.boxplot(data, x=None, y=None, hue=None, orient=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `x` | str | x轴列名(分类) | `"day"` |
| `y` | str | y轴列名(数值) | `"total_bill"` |
| `hue` | str | 按颜色区分的列 | `"time"` |
| `orient` | str | 方向 | `"v"`(垂直), `"h"`(水平) |
| `width` | float | 箱子宽度 | `0.5` |
| `flierprops` | dict | 异常值点样式 | `{"marker": "o"}` |
| `palette` | str/list | 颜色方案 | `"Set2"` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
box_data = pd.DataFrame({
    "day": ["Thur"] * 30 + ["Fri"] * 30 + ["Sat"] * 30 + ["Sun"] * 30,
    "total_bill": np.concatenate([
        np.random.normal(18, 5, 30),
        np.random.normal(17, 6, 30),
        np.random.normal(20, 7, 30),
        np.random.normal(22, 6, 30)
    ])
})

plt.figure(figsize=(6, 3.5))
sns.boxplot(data=box_data, x="day", y="total_bill")
plt.title("Bill Distribution by Day")
plt.xlabel("Day")
plt.ylabel("Total Bill ($)")
plt.show()
```

![boxplot](/python_learning/seaborn/05_boxplot.png)

### 4.3 violinplot() 小提琴图

**特点**：结合箱线图和核密度图。

**基本语法**：
```python
sns.violinplot(data, x=None, y=None, hue=None, split=False)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `x` | str | x轴列名(分类) | `"day"` |
| `y` | str | y轴列名(数值) | `"score"` |
| `hue` | str | 按颜色区分的列 | `"gender"` |
| `split` | bool | 是否分割显示 | `True` |
| `inner` | str | 内部显示方式 | `"box"`, `"quartile"`, `None` |
| `scale` | str | 缩放方式 | `"area"`, `"count"`, `"width"` |
| `bw` | str/float | 带宽 | `"scott"`, `0.2` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
violin_data = pd.DataFrame({
    "day": ["Thur"] * 40 + ["Fri"] * 40 + ["Sat"] * 40 + ["Sun"] * 40,
    "total_bill": np.concatenate([
        np.random.normal(18, 5, 40),
        np.random.normal(17, 6, 40),
        np.random.normal(20, 7, 40),
        np.random.normal(22, 6, 40)
    ]),
    "time": ["Lunch"] * 20 + ["Dinner"] * 20 + ["Lunch"] * 20 + ["Dinner"] * 20 +
            ["Lunch"] * 20 + ["Dinner"] * 20 + ["Lunch"] * 20 + ["Dinner"] * 20
})

plt.figure(figsize=(6, 3.5))
sns.violinplot(data=violin_data, x="day", y="total_bill", hue="time", split=True)
plt.title("Bill Distribution by Day and Time")
plt.xlabel("Day")
plt.ylabel("Total Bill ($)")
plt.show()
```

![violinplot](/python_learning/seaborn/06_violinplot.png)

### 4.4 barplot() 柱状图

**特点**：自动计算均值并显示误差棒。

**基本语法**：
```python
sns.barplot(data, x=None, y=None, hue=None, estimator='mean', errorbar='ci')
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `x` | str | x轴列名(分类) | `"category"` |
| `y` | str | y轴列名(数值) | `"value"` |
| `hue` | str | 按颜色区分的列 | `"group"` |
| `estimator` | function | 聚合函数 | `np.mean`, `np.sum` |
| `errorbar` | str | 误差线类型 | `"ci"`, `"sd"`, `None` |
| `ci` | int | 置信区间 | `95` |
| `palette` | str/list | 颜色方案 | `"pastel"` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
bar_data = pd.DataFrame({
    "day": ["Thur"] * 30 + ["Fri"] * 30 + ["Sat"] * 30 + ["Sun"] * 30,
    "total_bill": np.concatenate([
        np.random.normal(18, 5, 30),
        np.random.normal(17, 6, 30),
        np.random.normal(20, 7, 30),
        np.random.normal(22, 6, 30)
    ])
})

plt.figure(figsize=(6, 3.5))
sns.barplot(data=bar_data, x="day", y="total_bill")
plt.title("Average Bill by Day")
plt.xlabel("Day")
plt.ylabel("Avg Total Bill ($)")
plt.show()
```

![barplot](/python_learning/seaborn/07_barplot.png)

### 4.5 分类图选择指南

| 需求 | 推荐函数 | 说明 |
|-----|---------|------|
| 看分布和异常值 | `boxplot()` | 箱线图 |
| 看密度分布 | `violinplot()` | 小提琴图 |
| 看均值对比 | `barplot()` | 柱状图+误差棒 |
| 看各数据点 | `stripplot()` | 散点图(配合箱线图) |

---

## 五、热力图 —— 矩阵可视化

### 5.1 用生活类比理解

**热力图就像"天气预报的温度图"**:

```
热力图特点:
├── 用颜色深浅表示数值大小
├── 适合展示相关系数矩阵
└── 适合展示时间×地区的交叉数据
```

### 5.2 heatmap() 热力图

**基本语法**：
```python
sns.heatmap(data, annot=False, fmt='.2f', cmap='viridis', center=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame/矩阵 | 输入数据 | `corr_matrix` |
| `annot` | bool/data | 是否显示数值 | `True` 或 `data` |
| `fmt` | str | 数值格式 | `".2f"`, `"d"` |
| `cmap` | str | 颜色方案 | `"coolwarm"`, `"YlOrRd"` |
| `center` | float | 颜色中心值 | `0` |
| `linewidths` | float | 格子边框宽度 | `0.5` |
| `linecolor` | str | 边框颜色 | `"white"` |
| `cbar` | bool | 是否显示颜色条 | `True` |
| `square` | bool | 是否正方形格子 | `True` |
| `vmin/vmax` | float | 颜色范围 | `vmin=0, vmax=1` |

**代码示例1：相关性热力图**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
corr_data = pd.DataFrame({
    "A": np.random.randn(100),
    "B": np.random.randn(100),
    "C": np.random.randn(100),
    "D": np.random.randn(100)
})
# 添加一些相关性
corr_data["B"] = corr_data["A"] * 0.5 + corr_data["B"] * 0.5
corr_data["D"] = corr_data["C"] * 0.3 + corr_data["D"] * 0.7

corr = corr_data.corr()

plt.figure(figsize=(5, 4))
sns.heatmap(corr, annot=True, cmap="coolwarm", center=0, fmt=".2f")
plt.title("Correlation Heatmap")
plt.show()
```

![heatmap](/python_learning/seaborn/08_heatmap.png)

**代码示例2：月度销售热力图**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
months = [f"M{i}" for i in range(1, 13)]
regions = ["East", "South", "North", "West"]
data = np.random.randint(50, 200, size=(4, 12))

df_sales = pd.DataFrame(data, index=regions, columns=months)

plt.figure(figsize=(7, 3.5))
sns.heatmap(df_sales, annot=True, fmt="d", cmap="YlOrRd")
plt.title("Monthly Sales by Region")
plt.xlabel("Month")
plt.ylabel("Region")
plt.show()
```

![heatmap_sales](/python_learning/seaborn/09_heatmap_sales.png)

### 5.3 热力图配色方案

| 配色 | 说明 | 适用场景 |
|-----|------|---------|
| `"coolwarm"` | 蓝白红 | 正负相关 |
| `"YlOrRd"` | 黄橙红 | 正值数据 |
| `"Blues"` | 蓝色系 | 正值数据 |
| `"RdBu"` | 红蓝 | 正负值 |
| `"viridis"` | 紫黄绿 | 连续数据 |

---

## 六、成对关系图

### 6.1 pairplot() 成对关系图

**定义**：一次性展示所有变量两两之间的关系。

**基本语法**：
```python
sns.pairplot(data, hue=None, vars=None, kind='scatter', diag_kind='auto')
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `data` | DataFrame | 输入数据 | `df` |
| `hue` | str | 按颜色区分的列 | `"category"` |
| `vars` | list | 要展示的列 | `["A", "B", "C"]` |
| `kind` | str | 非对角图类型 | `"scatter"`, `"kde"`, `"hist"` |
| `diag_kind` | str | 对角图类型 | `"auto"`, `"hist"`, `"kde"` |
| `height` | float | 每个子图高度 | `2` |
| `aspect` | float | 宽高比 | `1` |
| `palette` | str | 颜色方案 | `"husl"` |
| `markers` | list | 点标记样式 | `["o", "s"]` |

**代码示例**：
```python
import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")

np.random.seed(42)
pair_data = pd.DataFrame({
    "A": np.random.randn(100),
    "B": np.random.randn(100) * 0.5 + np.random.randn(100) * 0.5,
    "C": np.random.randn(100),
    "Category": np.random.choice(["X", "Y"], 100)
})

g = sns.pairplot(pair_data, hue="Category", height=2)
g.fig.suptitle("Pairwise Relationships", y=1.02)
plt.show()
```

![pairplot](/python_learning/seaborn/10_pairplot.png)

---

## 七、主题与配色

### 7.1 set_theme() 设置主题

**基本语法**：
```python
sns.set_theme(style='darkgrid', palette='deep', font_scale=1)
```

**参数详解**：

| 参数 | 说明 | 可选值 |
|-----|------|-------|
| `style` | 背景样式 | `"darkgrid"`, `"whitegrid"`, `"dark"`, `"white"`, `"ticks"` |
| `palette` | 配色方案 | `"deep"`, `"muted"`, `"pastel"`, `"bright"`, `"dark"`, `"colorblind"` |
| `font_scale` | 字体大小 | `1` (默认), `1.2` |
| `rc` | 自定义参数 | `{"figure.figsize": (8, 4)}` |

### 7.2 常用配色方案

| 配色 | 说明 | 适用场景 |
|-----|------|---------|
| `"deep"` | 深色系 | 通用 |
| `"muted"` | 柔和色 | 报告展示 |
| `"pastel"` | 粉色系 | 轻松风格 |
| `"bright"` | 明亮色 | 演示文稿 |
| `"dark"` | 暗色系 | 深色背景 |
| `"colorblind"` | 色盲友好 | 无障碍设计 |

---

## 八、总结

### 本章学到了什么？

| 图表类型 | 用途 | 关键函数 |
|---------|------|---------|
| 分布图 | 查看数据分布 | `histplot()`, `kdeplot()` |
| 关系图 | 分析变量关系 | `scatterplot()`, `lineplot()` |
| 分类图 | 对比不同组别 | `boxplot()`, `violinplot()`, `barplot()` |
| 热力图 | 展示矩阵数据 | `heatmap()` |
| 成对图 | 展示所有变量关系 | `pairplot()` |

### Seaborn vs Matplotlib 对比

| 特性 | Matplotlib | Seaborn |
|-----|------------|---------|
| 学习难度 | 较高 | 较低 |
| 代码量 | 多 | 少 |
| 统计功能 | 需手动 | 自动 |
| 默认样式 | 朴素 | 美观 |

---

> 恭喜你掌握了 Seaborn 统计可视化！现在你已经能用更少的代码画出更专业的统计图表了。
