# Python 数据清洗实战 —— 让数据"干净可用"

> 这篇文章带你掌握数据清洗实战技巧,学会让数据变得干净可靠。

**学完这章你能干啥？**
- 处理缺失值、重复值、异常值
- 掌握数据类型转换技巧
- 清洗文本数据
- 完成完整的数据清洗流程

---

## 一、数据清洗基础

### 1.1 用生活类比理解

**数据清洗就像"打扫房间"**:

```
原始数据 = 乱糟糟的房间
├── 缺失值 = 空着的格子
├── 重复值 = 多放的东西
├── 异常值 = 放错位置的东西
└── 格式问题 = 摆放不整齐

干净数据 = 整洁的房间
├── 数据完整
├── 数据正确
├── 格式统一
└── 可直接分析
```

**为什么数据清洗重要？**

| 问题 | 影响 | 解决方法 |
|-----|------|---------|
| 缺失值 | 统计结果不准 | 填充或删除 |
| 重复值 | 数据虚高 | 去重 |
| 异常值 | 分析偏差 | 检测处理 |
| 格式混乱 | 无法计算 | 类型转换 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 缺失值 | Missing Value | 数据为空或不存在 |
| 重复值 | Duplicate | 相同数据出现多次 |
| 异常值 | Outlier | 偏离正常范围的数据 |
| 数据类型 | Data Type | 数据的存储格式(数值、字符串、日期) |

### 1.3 数据质量诊断

```python
import pandas as pd
import numpy as np

# 创建示例数据
df = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5],
    'name': ['Alice', None, 'Charlie', 'David', 'Eve'],
    'age': [25, np.nan, 30, 35, None],
    'city': ['Beijing', 'Shanghai', None, 'Guangzhou', 'Shenzhen'],
    'score': [85, 90, np.nan, 78, 88]
})

# 数据质量诊断
print("=== 数据概览 ===")
print(f"数据形状: {df.shape}")
print(f"\n数据类型:\n{df.dtypes}")
print(f"\n前5行:\n{df.head()}")

# 缺失值统计
print("\n=== 缺失值统计 ===")
print(df.isnull().sum())
print("\n缺失值比例:")
print(df.isnull().sum() / len(df) * 100)
```

---

## 二、缺失值处理

### 2.1 用生活类比理解

**缺失值就像"空座位"**:

```
缺失值原因:
├── 用户没填 = 自愿留空
├── 系统故障 = 数据丢失
├── 数据合并 = 表格不匹配
└── 格式转换 = 解析失败

处理策略:
├── 删除 = 把空座位去掉
├── 填充 = 找人坐上去
└── 插值 = 估算谁该坐那里
```

### 2.2 识别缺失值

**常用方法**：

| 方法 | 说明 | 示例 |
|-----|------|------|
| `isnull()` | 检测缺失值 | `df.isnull()` |
| `isna()` | 同 isnull | `df.isna()` |
| `notnull()` | 检测非缺失 | `df.notnull()` |
| `any()` | 是否有缺失 | `df.isnull().any()` |
| `sum()` | 统计缺失数量 | `df.isnull().sum()` |

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5],
    'name': ['Alice', None, 'Charlie', 'David', 'Eve'],
    'age': [25, np.nan, 30, 35, None],
    'city': ['Beijing', 'Shanghai', None, 'Guangzhou', 'Shenzhen'],
    'score': [85, 90, np.nan, 78, 88]
})

# 识别缺失值
print("=== 缺失值统计 ===")
print(df.isnull().sum())

print("\n=== 缺失值比例 ===")
print(df.isnull().sum() / len(df) * 100)

print("\n=== 含缺失值的行 ===")
print(df[df.isnull().any(axis=1)])
```

### 2.3 删除缺失值

**dropna() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `axis` | 删除行(0)或列(1) | `dropna(axis=1)` |
| `how` | 删除条件 | `"any"`(任意缺失), `"all"`(全缺失) |
| `thresh` | 保留最少非缺失数 | `thresh=3` |
| `subset` | 只检查指定列 | `subset=['age']` |

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5],
    'name': ['Alice', None, 'Charlie', 'David', 'Eve'],
    'age': [25, np.nan, 30, 35, None],
    'score': [85, 90, np.nan, 78, 88]
})

# 删除有缺失值的行
df_drop_rows = df.dropna()
print("删除缺失行后的数据：")
print(df_drop_rows)

# 删除有缺失值的列
df_drop_cols = df.dropna(axis=1)
print("\n删除缺失列后的数据：")
print(df_drop_cols)

# 只删除全部为缺失的行
df_drop_all = df.dropna(how='all')
print("\n删除全缺失行后的数据：")
print(df_drop_all)

# 至少保留 n 个非缺失值
df_thresh = df.dropna(thresh=3)
print("\n至少保留3个非缺失值：")
print(df_thresh)
```

### 2.4 填充缺失值

**fillna() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `value` | 填充值 | `fillna(0)` |
| `method` | 填充方法 | `"ffill"`(前填), `"bfill"`(后填) |
| `axis` | 填充方向 | `axis=0` |
| `inplace` | 是否原地修改 | `inplace=True` |

**常用填充策略**：

| 策略 | 适用场景 | 方法 |
|-----|---------|------|
| 固定值填充 | 分类变量 | `fillna("Unknown")` |
| 均值填充 | 数值变量,分布均匀 | `fillna(df.mean())` |
| 中位数填充 | 数值变量,有异常值 | `fillna(df.median())` |
| 众数填充 | 分类变量 | `fillna(df.mode()[0])` |
| 前向填充 | 时间序列 | `fillna(method='ffill')` |

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5, 6],
    'age': [25, np.nan, 30, 35, None, 28],
    'score': [85, 90, np.nan, 78, 88, None],
    'city': ['Beijing', None, 'Shanghai', None, 'Shenzhen', 'Beijing']
})

# 用固定值填充
df_fill_const = df.fillna({'city': 'Unknown'})
print("用固定值填充city：")
print(df_fill_const)

# 用均值填充数值列
df_fill_mean = df.copy()
df_fill_mean['age'] = df_fill_mean['age'].fillna(df_fill_mean['age'].mean())
df_fill_mean['score'] = df_fill_mean['score'].fillna(df_fill_mean['score'].mean())
print("\n用均值填充：")
print(df_fill_mean)

# 用中位数填充
df_fill_median = df.copy()
df_fill_median['age'] = df_fill_median['age'].fillna(df_fill_median['age'].median())
print("\n用中位数填充：")
print(df_fill_median)

# 用众数填充分类变量
mode_city = df['city'].mode()[0]
df_fill_mode = df.copy()
df_fill_mode['city'] = df_fill_mode['city'].fillna(mode_city)
print("\n用众数填充：")
print(df_fill_mode)
```

### 2.5 插值法填充

**interpolate() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `method` | 插值方法 | `"linear"`, `"time"`, `"quadratic"` |
| `limit` | 最大填充数 | `limit=2` |
| `limit_direction` | 填充方向 | `"forward"`, `"backward"` |

```python
import pandas as pd
import numpy as np

# 时间序列数据
df_time = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=10),
    'sales': [100, np.nan, 120, np.nan, np.nan, 150, 160, np.nan, 180, 190]
})

# 线性插值
df_time['sales_linear'] = df_time['sales'].interpolate(method='linear')
print("线性插值：")
print(df_time)

# 前向填充
df_time['sales_ffill'] = df_time['sales'].ffill()
print("\n前向填充：")
print(df_time[['date', 'sales', 'sales_ffill']])

# 后向填充
df_time['sales_bfill'] = df_time['sales'].bfill()
print("\n后向填充：")
print(df_time[['date', 'sales', 'sales_bfill']])
```

---

## 三、重复值处理

### 3.1 用生活类比理解

**重复值就像"买重了的东西"**:

```
重复值原因:
├── 系统重复提交 = 点击多次
├── 数据合并冲突 = 两个表有相同数据
└── 手动录入失误 = 填了两次

处理策略:
├── 检测重复 = 找出重复的东西
├── 删除重复 = 只保留一份
└── 标记重复 = 记录哪些是重复的
```

### 3.2 检测重复值

**duplicated() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `subset` | 检测指定列 | `subset=['order_id']` |
| `keep` | 保留策略 | `"first"`(首个), `"last"`(末个), `False`(全部) |

```python
import pandas as pd

df = pd.DataFrame({
    'order_id': ['A001', 'A002', 'A001', 'A003', 'A002'],
    'user_id': [1, 2, 1, 3, 2],
    'amount': [100, 200, 100, 150, 200],
    'product': ['Apple', 'Banana', 'Apple', 'Cherry', 'Banana']
})

print("原始数据：")
print(df)

# 检测完全重复的行
print("\n=== 完全重复检测 ===")
print(df.duplicated())

# 查看重复行
print("\n重复的行：")
print(df[df.duplicated()])

# 检测基于特定列的重复
print("\n=== 基于order_id的重复 ===")
print(df.duplicated(subset=['order_id']))

# 保留最后一个重复项
print("\n=== 保留最后一个重复 ===")
print(df.duplicated(subset=['order_id'], keep='last'))
```

### 3.3 删除重复值

**drop_duplicates() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `subset` | 基于指定列去重 | `subset=['order_id']` |
| `keep` | 保留策略 | `"first"`, `"last"`, `False` |
| `inplace` | 是否原地修改 | `inplace=True` |
| `ignore_index` | 重置索引 | `ignore_index=True` |

```python
import pandas as pd

df = pd.DataFrame({
    'order_id': ['A001', 'A002', 'A001', 'A003', 'A002'],
    'user_id': [1, 2, 1, 3, 2],
    'amount': [100, 200, 100, 150, 200]
})

print("原始数据：")
print(df)

# 删除完全重复的行
df_drop_all = df.drop_duplicates()
print("\n删除完全重复：")
print(df_drop_all)

# 基于特定列删除重复
df_drop_order = df.drop_duplicates(subset=['order_id'])
print("\n基于order_id删除重复：")
print(df_drop_order)

# 保留最后一个重复项
df_drop_last = df.drop_duplicates(subset=['order_id'], keep='last')
print("\n保留最后一个重复项：")
print(df_drop_last)

# 不保留任何重复项
df_drop_none = df.drop_duplicates(subset=['order_id'], keep=False)
print("\n不保留任何重复项：")
print(df_drop_none)
```

---

## 四、异常值处理

### 4.1 用生活类比理解

**异常值就像"特别高或特别矮的人"**:

```
异常值原因:
├── 输入错误 = 手误填错
├── 极端情况 = 真实但罕见
├── 数据造假 = 故意填错
└── 系统故障 = 程序bug

处理策略:
├── 删除异常 = 去掉不正常的数据
├── 替换异常 = 用正常值替换
└── 标记异常 = 记录但不处理
```

### 4.2 统计方法识别异常值

**常用检测方法**：

| 方法 | 说明 | 适用场景 |
|-----|------|---------|
| 描述性统计 | 看 max/min | 快速诊断 |
| IQR方法 | 四分位距 | 常用方法 |
| Z-Score | 标准化分数 | 正态分布数据 |
| 业务规则 | 自定义规则 | 特定业务场景 |

```python
import pandas as pd
import numpy as np

# 创建含异常值的数据
df = pd.DataFrame({
    'user_id': range(1, 11),
    'age': [25, 28, 30, 22, 35, 200, 27, 29, 26, 28],
    'income': [5000, 6000, 5500, 4800, 7000, 5200, 5800, 50000, 5300, 5500]
})

print("原始数据：")
print(df)

# 方法1：描述性统计
print("\n=== 描述性统计 ===")
print(df[['age', 'income']].describe())

# 方法2：IQR（四分位距）方法
def detect_outliers_iqr(data, column):
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = data[(data[column] < lower) | (data[column] > upper)]
    return outliers, lower, upper

outliers_age, lower_age, upper_age = detect_outliers_iqr(df, 'age')
print(f"\nage异常值（IQR方法）：")
print(f"正常范围: [{lower_age:.1f}, {upper_age:.1f}]")
print(outliers_age)

outliers_income, lower_income, upper_income = detect_outliers_iqr(df, 'income')
print(f"\nincome异常值（IQR方法）：")
print(f"正常范围: [{lower_income:.1f}, {upper_income:.1f}]")
print(outliers_income)
```

### 4.3 Z-Score 方法

**定义**：Z-Score 表示数据偏离均值的标准差倍数,通常 |Z| > 3 视为异常。

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'user_id': range(1, 11),
    'age': [25, 28, 30, 22, 35, 200, 27, 29, 26, 28],
    'income': [5000, 6000, 5500, 4800, 7000, 5200, 5800, 50000, 5300, 5500]
})

# Z-Score 方法
def detect_outliers_zscore(data, column, threshold=3):
    z_scores = np.abs((data[column] - data[column].mean()) / data[column].std())
    outliers = data[z_scores > threshold]
    return outliers

print("=== Z-Score方法检测异常 ===")
outliers_age_z = detect_outliers_zscore(df, 'age')
print("\nage异常值（Z > 3）：")
print(outliers_age_z)

outliers_income_z = detect_outliers_zscore(df, 'income')
print("\nincome异常值（Z > 3）：")
print(outliers_income_z)
```

### 4.4 处理异常值

**处理策略**：

| 策略 | 方法 | 适用场景 |
|-----|------|---------|
| 删除 | 直接删除 | 数据量大,异常少 |
| 边界替换 | 用上下限替换 | 保留数据量 |
| 中位数替换 | 用中位数替换 | 减少异常影响 |
| 标记保留 | 仅标记不做处理 | 需要审计追踪 |

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'user_id': range(1, 11),
    'age': [25, 28, 30, 22, 35, 200, 27, 29, 26, 28],
    'income': [5000, 6000, 5500, 4800, 7000, 5200, 5800, 50000, 5300, 5500]
})

# 方法1：删除异常值
def remove_outliers_iqr(data, column):
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    return data[(data[column] >= lower) & (data[column] <= upper)]

df_clean = remove_outliers_iqr(df, 'age')
df_clean = remove_outliers_iqr(df_clean, 'income')
print("删除异常值后：")
print(df_clean)

# 方法2：用边界值替换
def cap_outliers(data, column):
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    data[column] = data[column].clip(lower, upper)
    return data

df_cap = df.copy()
df_cap = cap_outliers(df_cap, 'age')
df_cap = cap_outliers(df_cap, 'income')
print("\n用边界值替换异常：")
print(df_cap)

# 方法3：用中位数替换
def replace_with_median(data, column):
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    median_val = data[column].median()
    data.loc[(data[column] < lower) | (data[column] > upper), column] = median_val
    return data

df_median = df.copy()
df_median = replace_with_median(df_median, 'age')
df_median = replace_with_median(df_median, 'income')
print("\n用中位数替换异常：")
print(df_median)
```

---

## 五、数据类型转换

### 5.1 用生活类比理解

**数据类型就像"收纳盒分类"**:

```
数据类型问题:
├── 数字存成字符串 = 不能计算
├── 日期存成字符串 = 不能筛选时间
├── 价格带逗号 = 解析失败
└── 中文编码错误 = 显示乱码

解决方法:
├── 数值转换 = to_numeric()
├── 日期转换 = to_datetime()
└── 字符清洗 = str方法
```

### 5.2 数值类型转换

**to_numeric() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `errors` | 错误处理 | `"raise"`(报错), `"coerce"`(转NaN), `"ignore"`(保持) |
| `downcast` | 类型降级 | `"integer"`, `"float"` |

```python
import pandas as pd

# 数值存储为字符串
df = pd.DataFrame({
    'price_str': ['100', '200.5', '300', 'abc', '150'],
    'quantity_str': ['10', '20', '30', '40', 'abc']
})

print("原始数据：")
print(df)
print(df.dtypes)

# 安全转换（错误转为NaN）
df['price'] = pd.to_numeric(df['price_str'], errors='coerce')
print("\n转换后：")
print(df)
print(df.dtypes)

# 整数转换（支持缺失值的整数类型）
df['quantity'] = pd.to_numeric(df['quantity_str'], errors='coerce')
df['quantity'] = df['quantity'].astype('Int64')
print("\n整数类型转换：")
print(df)
```

### 5.3 日期类型转换

**to_datetime() 参数详解**：

| 参数 | 说明 | 示例 |
|-----|------|------|
| `format` | 指定格式 | `"%Y-%m-%d"` |
| `errors` | 错误处理 | `"coerce"` |
| `yearfirst` | 年份在前 | `True` |
| `dayfirst` | 日在前 | `True` |

```python
import pandas as pd

# 日期字符串（每列长度一致）
df = pd.DataFrame({
    'date_str': ['2024-01-15', '2024/02/20', '15-03-2024', '2024年4月1日']
})

print("原始数据：")
print(df)

# 基本转换
df['date'] = pd.to_datetime(df['date_str'], errors='coerce')
print("\n自动解析：")
print(df[['date_str', 'date']])

# 指定格式
df['date_fmt'] = pd.to_datetime('15-03-2024', format='%d-%m-%Y')
print("\n指定格式转换：")
print(df['date_fmt'])

# 提取日期组件
df_date = pd.DataFrame({
    'datetime': pd.to_datetime(['2024-01-15 10:30:00', '2024-02-20 14:45:30'])
})
df_date['year'] = df_date['datetime'].dt.year
df_date['month'] = df_date['datetime'].dt.month
df_date['day'] = df_date['datetime'].dt.day
df_date['hour'] = df_date['datetime'].dt.hour
df_date['weekday'] = df_date['datetime'].dt.day_name()

print("\n提取日期组件：")
print(df_date)
```

---

## 六、文本清洗

### 6.1 用生活类比理解

**文本清洗就像"整理文件名"**:

```
文本问题:
├── 首尾有空格 = "  Alice  "
├── 大小写混乱 = "BOB", "bob", "Bob"
├── 格式不统一 = "138-1234-5678", "139 1234 5678"
└── 特殊字符 = "iPhone\n15"

解决方法:
├── strip() = 去空格
├── lower()/upper() = 统一大小写
├── replace() = 替换字符
└── extract() = 提取内容
```

### 6.2 常用文本清洗方法

| 方法 | 说明 | 示例 |
|-----|------|------|
| `strip()` | 去除首尾空格 | `df['col'].str.strip()` |
| `lower()` | 转小写 | `df['col'].str.lower()` |
| `upper()` | 转大写 | `df['col'].str.upper()` |
| `title()` | 首字母大写 | `df['col'].str.title()` |
| `replace()` | 替换字符 | `df['col'].str.replace('-', '')` |
| `contains()` | 是否包含 | `df['col'].str.contains('iPhone')` |
| `extract()` | 提取内容 | `df['col'].str.extract(r'(\d+)')` |

```python
import pandas as pd

df = pd.DataFrame({
    'name': ['  Alice  ', 'BOB', 'Charlie ', '  david', 'EVE'],
    'email': ['alice@example.com', 'BOB@EXAMPLE.COM', 'Charlie@Example.Com', 'david@test.com', 'eve@test.com'],
    'phone': ['138-1234-5678', '139 1234 5678', '13712345678', '136-1234-5678', '135 1234 5678']
})

print("原始数据：")
print(df)

# 去除首尾空格
df['name_clean'] = df['name'].str.strip()
print("\n去除空格后：")
print(df[['name', 'name_clean']])

# 统一大小写
df['name_lower'] = df['name'].str.strip().str.lower()
df['name_title'] = df['name'].str.strip().str.title()
print("\n大小写处理：")
print(df[['name', 'name_lower', 'name_title']])

# 统一邮箱小写
df['email_clean'] = df['email'].str.lower()
print("\n邮箱统一小写：")
print(df[['email', 'email_clean']])
```

### 6.3 字符串替换与提取

```python
import pandas as pd

df = pd.DataFrame({
    'phone': ['138-1234-5678', '139 1234 5678', '13712345678', '136-1234-5678', '135 1234 5678'],
    'product': ['iPhone 15 Pro', 'iPhone 14', 'Samsung S24', 'iPhone 15', 'iPad Pro']
})

# 替换字符
df['phone_clean'] = df['phone'].str.replace('-', '').str.replace(' ', '')
print("手机号清洗：")
print(df[['phone', 'phone_clean']])

# 提取数字
df['phone_extract'] = df['phone'].str.replace(r'[^\d]', '', regex=True)
print("\n提取手机号：")
print(df[['phone', 'phone_extract']])

# 判断是否包含某字符串
df['is_iphone'] = df['product'].str.contains('iPhone', case=False)
print("\n是否包含iPhone：")
print(df[['product', 'is_iphone']])

# 提取产品系列
df['series'] = df['product'].str.extract(r'(iPhone|Samsung|iPad)')
print("\n提取产品系列：")
print(df[['product', 'series']])
```

---

## 七、综合实战案例

### 7.1 电商订单数据清洗

```python
import pandas as pd
import numpy as np

# 模拟脏数据
df = pd.DataFrame({
    'order_id': ['A001', 'A002', 'A001', 'A003', 'A004', 'A005', 'A006', 'A007'],
    'user_id': [1, 2, 1, 3, 4, 5, None, 6],
    'user_name': ['Alice', 'Bob', 'Alice', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'],
    'product': ['iPhone', 'iPad', 'iPhone', 'MacBook', 'iPhone', 'AirPods', 'iPad', 'MacBook'],
    'quantity': [1, 2, 1, 1, -1, 3, 2, 1],
    'price': [7999, 5999, 7999, 12999, 7999, 1999, 5999, None],
    'order_date': ['2024-01-15', '2024-01-16', '2024-01-15', '2024/01/17', 
                   '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21'],
    'city': ['Beijing', ' Shanghai ', 'Beijing', 'Guangzhou', 'Shanghai', 'shenzhen', 'Hangzhou', 'BEIJING']
})

print("=== 原始数据 ===")
print(df)
print(f"\n原始数据行数: {len(df)}")

# 第一步：处理完全重复的行
print("\n=== 步骤1：删除重复订单 ===")
df_step1 = df.drop_duplicates(subset=['order_id'], keep='first')
print(f"删除重复后行数: {len(df_step1)}")

# 第二步：处理缺失值
print("\n=== 步骤2：处理缺失值 ===")
print("缺失值统计：")
print(df_step1.isnull().sum())

# 删除user_id缺失的行
df_step2 = df_step1.dropna(subset=['user_id'])
# 用中位数填充price
df_step2['price'] = df_step2['price'].fillna(df_step2['price'].median())
print(f"处理后行数: {len(df_step2)}")

# 第三步：处理异常值
print("\n=== 步骤3：处理异常值 ===")
# 数量不能为负数
df_step3 = df_step2[df_step2['quantity'] > 0].copy()
print(f"删除负数数量后行数: {len(df_step3)}")

# 第四步：数据类型转换
print("\n=== 步骤4：数据类型转换 ===")
df_step4 = df_step3.copy()
df_step4['order_date'] = pd.to_datetime(df_step4['order_date'])
df_step4['user_id'] = df_step4['user_id'].astype(int)
print(df_step4.dtypes)

# 第五步：文本清洗
print("\n=== 步骤5：文本清洗 ===")
df_step5 = df_step4.copy()
df_step5['city'] = df_step5['city'].str.strip().str.title()
print("城市名称清洗：")
print(df_step5['city'].unique())

# 最终清洗结果
print("\n=== 最终清洗结果 ===")
print(df_step5)
print(f"\n最终数据行数: {len(df_step5)}")

# 数据质量报告
print("\n=== 数据质量报告 ===")
print(f"原始行数: {len(df)}")
print(f"最终行数: {len(df_step5)}")
print(f"删除行数: {len(df) - len(df_step5)}")
print(f"数据保留率: {len(df_step5) / len(df) * 100:.1f}%")
```

---

## 八、数据清洗最佳实践

### 8.1 清洗流程清单

| 步骤 | 操作 | 关键方法 |
|-----|------|---------|
| 1. 数据概览 | 查看数据基本情况 | `shape`, `dtypes`, `describe()` |
| 2. 缺失值处理 | 检测并处理缺失 | `isnull()`, `fillna()`, `dropna()` |
| 3. 重复值处理 | 检测并删除重复 | `duplicated()`, `drop_duplicates()` |
| 4. 异常值处理 | 检测并处理异常 | IQR方法, Z-Score |
| 5. 类型转换 | 统一数据类型 | `to_numeric()`, `to_datetime()` |
| 6. 文本清洗 | 统一文本格式 | `strip()`, `lower()`, `replace()` |
| 7. 最终验证 | 检查清洗结果 | `info()`, `describe()` |

### 8.2 数据清洗原则

| 原则 | 说明 |
|-----|------|
| 保留原始数据 | 处理前备份原始数据 |
| 记录处理步骤 | 每一步都要记录 |
| 验证处理结果 | 检查清洗是否正确 |
| 结合业务判断 | 异常值需要业务判断 |

---

## 九、总结

### 本章学到了什么？

| 问题类型 | 检测方法 | 处理策略 |
|---------|---------|---------|
| 缺失值 | `isnull()` | 删除、填充、插值 |
| 重复值 | `duplicated()` | `drop_duplicates()` |
| 异常值 | IQR、Z-Score | 删除、替换、截断 |
| 类型错误 | `dtypes` | `to_numeric()`, `to_datetime()` |
| 文本问题 | `str`方法 | `strip()`, `lower()`, `replace()` |

### 常用函数速查表

| 函数 | 用途 |
|-----|------|
| `df.isnull().sum()` | 统计缺失值 |
| `df.fillna(value)` | 填充缺失值 |
| `df.dropna()` | 删除缺失值 |
| `df.duplicated()` | 检测重复 |
| `df.drop_duplicates()` | 删除重复 |
| `pd.to_numeric()` | 转数值 |
| `pd.to_datetime()` | 转日期 |
| `df.str.strip()` | 去空格 |
| `df.str.lower()` | 转小写 |

---

> 恭喜你掌握了数据清洗实战技巧！现在你已经能让数据变得干净可用了。