# Python Pandas 数据处理 —— 数据分析的核心工具

> 这篇文章带你掌握 Pandas 数据处理，学会像 Excel 一样操作数据但更快更强大。

**学完这章你能干啥？**
- 会用 DataFrame 创建和读取数据
- 会用筛选、排序、分组统计数据
- 会处理缺失值和重复值
- 会用 groupby 和 pivot_table 分析数据

---

## 一、什么是 Pandas？

### 1.1 用生活类比理解

**Pandas 就像"超级 Excel"**：

```
Excel：
├── 手动点击操作
├── 10万行会卡顿
└── 不能自动化

Pandas：
├── 一行代码完成操作
├── 百万行秒级处理
└── 写脚本自动运行
```

### 1.2 Pandas vs Excel 对比

| 操作 | Excel | Pandas |
|-----|-------|--------|
| 筛选数据 | 手动点筛选按钮 | `df[df['列名'] > 100]` |
| 分组汇总 | 手动做透视表 | `df.groupby('列名').sum()` |
| 数据清洗 | 手动一个个改 | `df.fillna(0)` 一行搞定 |
| 处理10万行 | 卡顿甚至崩溃 | 秒级完成 |

### 1.3 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| Series | Series | 一维数据（一列） |
| DataFrame | DataFrame | 二维数据（一张表） |
| 索引 | Index | 行的标识 |
| 列 | Column | 数据的字段 |

---

## 二、Series 与 DataFrame

### 2.1 Series（一维数据）

```python
import pandas as pd

# 创建 Series
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s)
```

**输出**：

```
a    10
b    20
c    30
dtype: int64
```

### 2.2 DataFrame（二维数据）

```python
import pandas as pd

# 从字典创建 DataFrame
df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

print(df)
```

**输出**：

```
   姓名  年龄  成绩
0  小明  18  85
1  小红  19  92
2  小刚  20  78
```

### 2.3 DataFrame 属性

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

print(f"形状：{df.shape}")      # (3, 3) - 3行3列
print(f"列名：{df.columns}")    # ['姓名', '年龄', '成绩']
print(f"索引：{df.index}")      # 0, 1, 2
print(f"数据类型：{df.dtypes}")
```

### 2.4 从字典列表创建

```python
import pandas as pd

# 从字典列表创建
sales_data = [
    {"月份": "1月", "销售额": 12000, "利润": 3000},
    {"月份": "2月", "销售额": 15000, "利润": 4000},
    {"月份": "3月", "销售额": 18000, "利润": 5000},
]

df = pd.DataFrame(sales_data)
print(df)

print(f"\n总销售额：{df['销售额'].sum()}")
print(f"平均利润：{df['利润'].mean()}")
```

---

## 三、数据读取

### 3.1 读取 CSV

```python
import pandas as pd
import io

# 模拟 CSV 数据
csv_data = """姓名,年龄,成绩
小明,18,85
小红,19,92
小刚,20,78"""

df = pd.read_csv(io.StringIO(csv_data))
print(df)
```

### 3.2 read_csv 常用参数

| 参数 | 说明 | 示例 |
|-----|------|------|
| `encoding` | 文件编码 | `"utf-8"`、`"gbk"` |
| `sep` | 分隔符 | `","`、`"\t"` |
| `header` | 表头行 | `0`（默认）、`None` |
| `usecols` | 只读部分列 | `["姓名", "成绩"]` |
| `nrows` | 只读前N行 | `1000` |

```python
import pandas as pd

# 常用参数示例（注释形式展示）
# df = pd.read_csv("data.csv", encoding="gbk")
# df = pd.read_csv("data.tsv", sep="\t")
# df = pd.read_csv("data.csv", usecols=["姓名", "成绩"])
# df = pd.read_csv("big.csv", nrows=1000)
```

---

## 四、数据查看

### 4.1 head() 和 tail()

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚", "小李", "小张"],
    "年龄": [18, 19, 20, 21, 22],
    "成绩": [85, 92, 78, 88, 95]
})

# 查看前3行
print(df.head(3))

# 查看后2行
print(df.tail(2))
```

### 4.2 info() 和 describe()

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

# 数据概览
print(df.info())

# 统计摘要（数值列）
print(df.describe())
```

### 4.3 快速诊断

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

print(f"数据形状：{df.shape}")
print(f"列名：{list(df.columns)}")
print(f"缺失值：\n{df.isnull().sum()}")
print(f"数据类型：\n{df.dtypes}")
```

---

## 五、数据选择

### 5.1 选择列

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

# 选择单列
print(df["姓名"])

# 选择多列
print(df[["姓名", "成绩"]])
```

### 5.2 loc 和 iloc

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
}, index=["a", "b", "c"])

# loc：按标签选择
print(df.loc["a", "姓名"])      # 小明
print(df.loc[["a", "c"]])       # 选两行

# iloc：按位置选择
print(df.iloc[0, 1])            # 18
print(df.iloc[0:2])             # 前两行
```

### 5.3 布尔索引

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": [18, 19, 20],
    "成绩": [85, 92, 78]
})

# 条件筛选
print(df[df["成绩"] > 80])

# 多条件筛选
print(df[(df["年龄"] >= 19) & (df["成绩"] > 80)])

# query() 方法
print(df.query("成绩 > 80"))
```

---

## 六、数据清洗

### 6.1 处理缺失值

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "姓名": ["小明", "小红", np.nan, "小刚"],
    "年龄": [18, np.nan, 20, 21],
    "成绩": [85, 92, 78, np.nan]
})

# 检查缺失值
print("缺失值统计：")
print(df.isnull().sum())

# 删除缺失行
print("\n删除缺失行：")
print(df.dropna())

# 填充缺失值
print("\n填充为0：")
print(df.fillna(0))

# 填充为均值
print("\n填充为均值：")
print(df.fillna(df.mean()))
```

### 6.2 dropna 参数

| 参数 | 说明 |
|-----|------|
| `how="any"` | 有任意缺失就删除（默认） |
| `how="all"` | 全部缺失才删除 |
| `subset=["列名"]` | 只检查指定列 |

### 6.3 处理重复值

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小明", "小刚"],
    "年龄": [18, 19, 18, 21],
    "成绩": [85, 92, 85, 78]
})

# 检查重复
print(df.duplicated())

# 删除重复（保留第一个）
print(df.drop_duplicates())

# 删除重复（基于姓名列）
print(df.drop_duplicates(subset=["姓名"]))
```

### 6.4 类型转换

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚"],
    "年龄": ["18", "19", "20"],    # 字符串
    "费用": ["1,200", "3,500", "2,800"]  # 带逗号
})

# 转换年龄为整数
df["年龄"] = df["年龄"].astype(int)

# 去掉逗号，转为数字
df["费用"] = df["费用"].str.replace(",", "").astype(float)

print(df.dtypes)
```

---

## 七、分组统计

### 7.1 groupby 基本用法

```python
import pandas as pd

df = pd.DataFrame({
    "部门": ["销售", "技术", "销售", "技术", "市场"],
    "姓名": ["小明", "小红", "小刚", "小丽", "小张"],
    "业绩": [100, 200, 150, 250, 180]
})

# 按部门统计
print(df.groupby("部门")["业绩"].sum())

# 多种统计
print(df.groupby("部门")["业绩"].agg(["sum", "mean", "count"]))
```

### 7.2 agg 自定义统计

```python
import pandas as pd

df = pd.DataFrame({
    "部门": ["销售", "技术", "销售", "技术", "市场"],
    "业绩": [100, 200, 150, 250, 180]
})

# 自定义列名
result = df.groupby("部门", as_index=False).agg(
    总业绩=("业绩", "sum"),
    平均业绩=("业绩", "mean"),
    人数=("业绩", "count")
)
print(result)
```

### 7.3 多列分组

```python
import pandas as pd

df = pd.DataFrame({
    "地区": ["华东", "华南", "华东", "华南", "华东"],
    "产品": ["手机", "电脑", "手机", "电脑", "平板"],
    "销售额": [5800, 8900, 6100, 9200, 3200]
})

# 按地区和产品分组
result = df.groupby(["地区", "产品"])["销售额"].sum()
print(result)
```

---

## 八、透视表

### 8.1 pivot_table 基本用法

```python
import pandas as pd

df = pd.DataFrame({
    "地区": ["华东", "华南", "华东", "华南", "华东"],
    "产品": ["手机", "电脑", "手机", "电脑", "平板"],
    "销售额": [5800, 8900, 6100, 9200, 3200]
})

# 透视表
pivot = df.pivot_table(
    values="销售额",      # 值
    index="地区",         # 行索引
    columns="产品",       # 列索引
    aggfunc="sum",        # 聚合函数
    fill_value=0          # 填充空值
)
print(pivot)
```

### 8.2 多值透视表

```python
import pandas as pd

df = pd.DataFrame({
    "地区": ["华东", "华南", "华东", "华南", "华东"],
    "产品": ["手机", "电脑", "手机", "电脑", "平板"],
    "销售额": [5800, 8900, 6100, 9200, 3200],
    "数量": [12, 8, 14, 9, 20]
})

# 多值聚合
pivot = df.pivot_table(
    values=["销售额", "数量"],
    index="地区",
    columns="产品",
    aggfunc="sum",
    fill_value=0
)
print(pivot)
```

---

## 九、排序与排名

### 9.1 排序

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚", "小李"],
    "成绩": [85, 92, 78, 88]
})

# 按成绩排序（升序）
print(df.sort_values("成绩"))

# 按成绩排序（降序）
print(df.sort_values("成绩", ascending=False))

# 多列排序
print(df.sort_values(["成绩", "姓名"], ascending=[False, True]))
```

### 9.2 排名

```python
import pandas as pd

df = pd.DataFrame({
    "姓名": ["小明", "小红", "小刚", "小李"],
    "成绩": [85, 92, 78, 85]
})

# 排名（相同成绩共享名次）
df["排名"] = df["成绩"].rank(ascending=False, method="min")
print(df)
```

---

## 十、合并数据

### 10.1 merge（按列合并）

```python
import pandas as pd

students = pd.DataFrame({
    "学号": [1, 2, 3],
    "姓名": ["小明", "小红", "小刚"]
})

scores = pd.DataFrame({
    "学号": [1, 2, 4],
    "成绩": [85, 92, 78]
})

# 内连接（只保留匹配的）
print(pd.merge(students, scores, on="学号"))

# 左连接（保留左边所有）
print(pd.merge(students, scores, on="学号", how="left"))

# 外连接（保留所有）
print(pd.merge(students, scores, on="学号", how="outer"))
```

### 10.2 concat（按方向拼接）

```python
import pandas as pd

jan = pd.DataFrame({
    "月份": ["1月"] * 2,
    "商品": ["手机", "电脑"],
    "销售额": [5800, 8900]
})

feb = pd.DataFrame({
    "月份": ["2月"] * 2,
    "商品": ["手机", "电脑"],
    "销售额": [6100, 9200]
})

# 上下拼接
combined = pd.concat([jan, feb], ignore_index=True)
print(combined)
```

---

## 十一、时间序列

### 11.1 创建时间序列

```python
import pandas as pd

# 创建日期范围
dates = pd.date_range("2024-01-01", periods=5, freq="D")
print(f"日期范围：{dates}")

# 创建时间序列 DataFrame
df = pd.DataFrame({
    "日期": dates,
    "销量": [100, 120, 90, 150, 110]
})
df = df.set_index("日期")
print(df)

# 取年月日
print(f"年份：{df.index.year}")
print(f"月份：{df.index.month}")
```

### 11.2 resample（时间聚合）

```python
import pandas as pd
import numpy as np

# 模拟日销售数据
np.random.seed(42)
dates = pd.date_range("2024-01-01", periods=30, freq="D")
sales = np.random.randint(80, 200, size=30)
df = pd.DataFrame({"销售额": sales}, index=dates)

# 按周汇总
weekly = df.resample("W").sum()
print("周度统计：")
print(weekly)

# 按月汇总
monthly = df.resample("M").agg({
    "销售额": ["sum", "mean", "max"]
})
print("\n月度统计：")
print(monthly)
```

### 11.3 rolling（移动窗口）

```python
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(42)
dates = pd.date_range("2024-01-01", periods=10, freq="D")
sales = np.random.randint(80, 200, size=10)
df = pd.DataFrame({"销售额": sales}, index=dates)

# 7日移动平均
df["MA7"] = df["销售额"].rolling(window=7).mean()
print(df)
```

---

## 十二、apply 与 map

### 12.1 map（简单映射）

```python
import pandas as pd

df = pd.DataFrame({
    "成绩": [85, 92, 78]
})

# 映射等级
score_map = {85: "B+", 92: "A", 78: "C"}
df["等级"] = df["成绩"].map(score_map)
print(df)
```

### 12.2 apply（应用函数）

```python
import pandas as pd

df = pd.DataFrame({
    "成绩": [85, 92, 78]
})

# 自定义函数
def classify(score):
    if score >= 90:
        return "优秀"
    elif score >= 80:
        return "良好"
    else:
        return "及格"

df["评级"] = df["成绩"].apply(classify)
print(df)
```

### 12.3 apply（多列计算）

```python
import pandas as pd

df = pd.DataFrame({
    "销售额": [5800, 8900, 3200],
    "数量": [12, 8, 20]
})

# 计算单价
df["单价"] = df.apply(lambda row: row["销售额"] / row["数量"], axis=1)
print(df)
```

---

## 十三、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| DataFrame | 创建、读取、属性查看 |
| 数据选择 | 列选择、loc、iloc、布尔索引 |
| 数据清洗 | 缺失值、重复值、类型转换 |
| 分组统计 | groupby、agg、透视表 |
| 合并数据 | merge、concat |
| 时间序列 | resample、rolling |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| `df["age"][0]` 链式取值 | `df.loc[0, "age"]` |
| 忽略缺失值直接计算 | 先 `dropna()` 或 `fillna()` |
| 分组后忘记选列 | `df.groupby("列")["值"].sum()` |
| 编码错误 | 尝试 `encoding="gbk"` |

---

> 恭喜你掌握了 Pandas 数据处理！现在你已经学会像 Excel 一样操作数据了。