# Python SQL 与 Python 联动 —— 数据库交互实战

> 这篇文章带你掌握 SQL 与 Python 联动技能,学会高效地从数据库获取和处理数据。

**学完这章你能干啥？**
- 用 Python 连接 MySQL 数据库
- 用 Pandas 读写 SQL 数据
- 掌握 SQL 与 Pandas 操作对比
- 完成复杂数据库查询

---

> ⚠️ **环境说明**：本章代码使用 `mysql.connector` 模块连接 MySQL 数据库。你需要：
> 1. 安装 MySQL 数据库服务
> 2. 安装 Python 包：`pip install mysql-connector-python`
> 3. 在本地 Python 环境或 Jupyter Notebook 中运行

---

## 一、为什么要 SQL + Python 联动？

### 1.1 用生活类比理解

**SQL + Python 联动就像"餐厅点餐与厨房加工"**:

```
SQL = 服务员点餐
├── 从仓库(数据库)取出食材
├── 按要求筛选和组合
└── 快速高效

Python/Pandas = 厨师加工
├── 灵活处理食材
├── 多种烹饪方式
└── 创意摆盘
```

**最佳实践**：用 SQL 提取数据，用 Python 分析数据

### 1.2 各自的优势

| 工具 | 优势 | 典型场景 |
|-----|------|---------|
| SQL | 数据提取效率高、JOIN性能好、聚合优化成熟 | 数据提取、复杂查询 |
| Python/Pandas | 灵活处理、丰富分析库、可视化能力 | 数据分析、机器学习 |

---

## 二、数据库连接基础

### 2.1 用生活类比理解

**数据库连接就像"打开保险箱"**:

```
连接步骤:
├── 找到保险箱 = 确定数据库地址
├── 输入密码 = 提供认证信息
├── 打开门 = 建立连接
└── 取放物品 = 执行SQL操作
```

### 2.2 MySQL 连接

**MySQL 特点**：最流行的开源关系数据库，生产环境首选。

**安装依赖**：
```bash
pip install mysql-connector-python
```

**mysql.connector.connect() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `host` | str | 数据库主机地址 | `"localhost"` |
| `port` | int | 端口号 | `3306` |
| `user` | str | 用户名 | `"root"` |
| `password` | str | 密码 | `"your_password"` |
| `database` | str | 数据库名 | `"mydb"` |
| `charset` | str | 字符编码 | `"utf8mb4"` |

```python
import mysql.connector
import pandas as pd

# 连接 MySQL 数据库
conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='root',
    password='your_password',  # 替换为你的密码
    database='test_db'  # 确保数据库已创建
)

# 创建游标
cursor = conn.cursor()

# 创建示例表
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    age INT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    product VARCHAR(50),
    amount DECIMAL(10, 2),
    order_date DATE
)
''')

# 插入测试数据
users_data = [
    (1, 'Alice', 'Beijing', 25),
    (2, 'Bob', 'Shanghai', 30),
    (3, 'Charlie', 'Guangzhou', 28)
]
cursor.executemany('INSERT INTO users VALUES (%s, %s, %s, %s)', users_data)

orders_data = [
    (1, 1, 'iPhone', 7999, '2024-01-15'),
    (2, 1, 'iPad', 5999, '2024-01-20'),
    (3, 2, 'MacBook', 12999, '2024-02-01'),
    (4, 3, 'iPhone', 7999, '2024-02-10'),
    (5, 2, 'AirPods', 1999, '2024-02-15')
]
cursor.executemany('INSERT INTO orders VALUES (%s, %s, %s, %s, %s)', orders_data)
conn.commit()

print("数据库创建成功！")
cursor.close()
```

### 2.3 查看数据库结构

```python
import mysql.connector
import pandas as pd

# 连接数据库
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# 查看所有表
tables = pd.read_sql("SHOW TABLES", conn)
print("数据库中的表：")
print(tables)

# 查看表结构
print("\nusers表结构：")
schema = pd.read_sql("DESCRIBE users", conn)
print(schema)

print("\norders表结构：")
schema = pd.read_sql("DESCRIBE orders", conn)
print(schema)

conn.close()
```

---

## 三、Pandas 读取 SQL 数据

### 3.1 用生活类比理解

**读取 SQL 就像"从仓库取货"**:

```
读取方式:
├── 全部取走 = SELECT * FROM table
├── 按需取货 = SELECT col1, col2 FROM table
├── 筛选取货 = SELECT * FROM table WHERE condition
└── 分批取货 = 分块读取大数据
```

### 3.2 read_sql() 函数详解

**基本语法**：
```python
pd.read_sql(sql, con, params=None, chunksize=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `sql` | str | SQL查询语句 | `"SELECT * FROM users"` |
| `con` | connection | 数据库连接 | `conn` |
| `params` | tuple/list | 参数化查询参数 | `(min_amount,)` |
| `chunksize` | int | 分块读取大小 | `1000` |
| `index_col` | str | 索引列 | `"user_id"` |
| `columns` | list | 选择列 | `["name", "age"]` |

### 3.3 基本读取

```python
import mysql.connector
import pandas as pd

# 连接数据库
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# 读取整张表
df_users = pd.read_sql("SELECT * FROM users", conn)
print("=== users 表 ===")
print(df_users)

# 读取特定列
df_name_city = pd.read_sql("SELECT name, city FROM users", conn)
print("\n=== 特定列 ===")
print(df_name_city)

# 带条件查询
df_young = pd.read_sql("SELECT * FROM users WHERE age < 30", conn)
print("\n=== 年龄<30的用户 ===")
print(df_young)

conn.close()
```

### 3.4 参数化查询

**参数化查询优点**：
- 防止 SQL 注入攻击
- 代码更清晰
- 性能更好

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# 方法1：字符串格式化（不推荐，有SQL注入风险）
min_amount = 5000
# df = pd.read_sql(f"SELECT * FROM orders WHERE amount > {min_amount}", conn)

# 方法2：参数化查询（推荐）
df_high_value = pd.read_sql(
    "SELECT * FROM orders WHERE amount > %s",
    conn,
    params=(min_amount,)
)
print("金额>5000的订单：")
print(df_high_value)

# 多个参数
df_filtered = pd.read_sql(
    "SELECT * FROM orders WHERE amount BETWEEN %s AND %s",
    conn,
    params=(5000, 10000)
)
print("\n金额在5000-10000之间的订单：")
print(df_filtered)

conn.close()
```

### 3.5 分块读取大数据

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# 分块读取（模拟大数据场景）
chunk_size = 1000
chunks = pd.read_sql("SELECT * FROM large_table", conn, chunksize=chunk_size)

total_rows = 0
for i, chunk in enumerate(chunks):
    print(f"第{i+1}块: {len(chunk)} 行")
    total_rows += len(chunk)
    # 在这里处理每个chunk
    # processed = chunk['value'].mean()
    
print(f"\n总共读取: {total_rows} 行")
conn.close()
```

---

## 四、Pandas 写入 SQL 数据

### 4.1 用生活类比理解

**写入 SQL 就像"把货物存入仓库"**:

```
写入模式:
├── 新建货架 = if_exists='fail'（表存在则报错）
├── 替换货架 = if_exists='replace'（删除重建）
├── 追加货物 = if_exists='append'（添加数据）
└── 指定规格 = dtype 参数
```

### 4.2 to_sql() 函数详解

**基本语法**：
```python
df.to_sql(name, con, if_exists='fail', index=True, dtype=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `name` | str | 表名 | `"users"` |
| `con` | connection/engine | 数据库连接 | `engine` |
| `if_exists` | str | 表存在时的行为 | `"fail"`, `"replace"`, `"append"` |
| `index` | bool | 是否写入索引 | `True`, `False` |
| `dtype` | dict | 列类型映射 | `{"id": "INTEGER"}` |
| `chunksize` | int | 分批写入大小 | `1000` |

> **注意**：使用 SQLAlchemy engine 连接 MySQL 以支持 to_sql()

### 4.3 基本写入

```python
import pandas as pd
from sqlalchemy import create_engine

# 使用 SQLAlchemy 创建连接（推荐）
engine = create_engine('mysql+mysqlconnector://root:your_password@localhost:3306/test_db')

# 创建DataFrame
df = pd.DataFrame({
    'user_id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie'],
    'score': [85, 90, 78]
})

print("要写入的数据：")
print(df)

# 写入数据库
df.to_sql('scores', engine, if_exists='replace', index=False)

# 验证写入结果
df_read = pd.read_sql("SELECT * FROM scores", engine)
print("\n从数据库读取：")
print(df_read)
```

### 4.4 写入模式对比

| 模式 | 说明 | 适用场景 |
|-----|------|---------|
| `"fail"` | 表存在则报错 | 防止误覆盖 |
| `"replace"` | 删除旧表重建 | 完全更新数据 |
| `"append"` | 追加数据 | 增量更新 |

```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('mysql+mysqlconnector://root:your_password@localhost:3306/test_db')

# 第一次写入：创建表
df1 = pd.DataFrame({'id': [1, 2], 'value': [100, 200]})
df1.to_sql('my_table', engine, if_exists='fail', index=False)
print("第一次写入成功")

# 查看数据
print(pd.read_sql("SELECT * FROM my_table", engine))

# 追加数据
df2 = pd.DataFrame({'id': [3, 4], 'value': [300, 400]})
df2.to_sql('my_table', engine, if_exists='append', index=False)
print("\n追加后：")
print(pd.read_sql("SELECT * FROM my_table", engine))

# 替换表
df3 = pd.DataFrame({'id': [5], 'value': [500]})
df3.to_sql('my_table', engine, if_exists='replace', index=False)
print("\n替换后：")
print(pd.read_sql("SELECT * FROM my_table", engine))
```

### 4.5 指定数据类型

```python
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.types import Integer, String, Float, DateTime

engine = create_engine('mysql+mysqlconnector://root:your_password@localhost:3306/test_db')

df = pd.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie'],
    'score': [85.5, 90.0, 78.5],
    'created_at': pd.to_datetime(['2024-01-01', '2024-01-02', '2024-01-03'])
})

# 指定列的数据类型
df.to_sql(
    'students',
    engine,
    if_exists='replace',
    index=False,
    dtype={
        'id': Integer(),
        'name': String(50),
        'score': Float(),
        'created_at': DateTime()
    }
)

print("写入成功，表结构：")
schema = pd.read_sql("DESCRIBE students", engine)
print(schema)
```

---

## 五、SQL 与 Pandas 操作对比

### 5.1 用生活类比理解

**SQL 和 Pandas 就像"两种语言表达同一个意思"**:

```
相同目标，不同语法：
├── SQL: SELECT name FROM users WHERE age > 25
└── Pandas: df[df['age'] > 25]['name']
```

### 5.2 SELECT 操作对比

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL方式
df_sql = pd.read_sql("SELECT name, city FROM users", conn)
print("SQL: SELECT name, city FROM users")
print(df_sql)

# Pandas方式
df = pd.read_sql("SELECT * FROM users", conn)
df_pandas = df[['name', 'city']]
print("\nPandas: df[['name', 'city']]")
print(df_pandas)

conn.close()
```

### 5.3 WHERE 条件对比

| SQL | Pandas |
|-----|--------|
| `WHERE age > 25` | `df[df['age'] > 25]` |
| `WHERE age > 25 AND city = 'Beijing'` | `df[(df['age'] > 25) & (df['city'] == 'Beijing')]` |
| `WHERE city IN ('Beijing', 'Shanghai')` | `df[df['city'].isin(['Beijing', 'Shanghai'])]` |

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL方式
df_sql = pd.read_sql("SELECT * FROM users WHERE age > 26", conn)
print("SQL: WHERE age > 26")
print(df_sql)

# Pandas方式
df = pd.read_sql("SELECT * FROM users", conn)
df_pandas = df[df['age'] > 26]
print("\nPandas: df[df['age'] > 26]")
print(df_pandas)

# 多条件
df_sql2 = pd.read_sql("SELECT * FROM users WHERE age > 25 AND city = 'Beijing'", conn)
print("\nSQL: WHERE age > 25 AND city = 'Beijing'")
print(df_sql2)

df_pandas2 = df[(df['age'] > 25) & (df['city'] == 'Beijing')]
print("\nPandas: df[(df['age'] > 25) & (df['city'] == 'Beijing')]")
print(df_pandas2)

conn.close()
```

### 5.4 GROUP BY 聚合对比

| SQL | Pandas |
|-----|--------|
| `GROUP BY col` | `df.groupby('col')` |
| `COUNT(*)` | `.count()` 或 `.size()` |
| `SUM(col)` | `.sum()` |
| `AVG(col)` | `.mean()` |

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL方式
df_sql = pd.read_sql('''
    SELECT user_id, COUNT(*) as order_count, SUM(amount) as total_amount
    FROM orders
    GROUP BY user_id
''', conn)
print("SQL: GROUP BY user_id")
print(df_sql)

# Pandas方式
df = pd.read_sql("SELECT * FROM orders", conn)
df_pandas = df.groupby('user_id').agg({
    'order_id': 'count',
    'amount': 'sum'
}).rename(columns={'order_id': 'order_count', 'amount': 'total_amount'})
print("\nPandas: groupby + agg")
print(df_pandas)

conn.close()
```

### 5.5 JOIN 对比

| SQL JOIN | Pandas | 说明 |
|----------|--------|------|
| `INNER JOIN` | `pd.merge(how='inner')` | 内连接 |
| `LEFT JOIN` | `pd.merge(how='left')` | 左连接 |
| `RIGHT JOIN` | `pd.merge(how='right')` | 右连接 |
| `FULL OUTER JOIN` | `pd.merge(how='outer')` | 全连接 |

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL方式：INNER JOIN
df_sql = pd.read_sql('''
    SELECT u.name, o.product, o.amount
    FROM users u
    INNER JOIN orders o ON u.user_id = o.user_id
''', conn)
print("SQL: INNER JOIN")
print(df_sql)

# Pandas方式：merge
df_users = pd.read_sql("SELECT * FROM users", conn)
df_orders = pd.read_sql("SELECT * FROM orders", conn)

df_pandas = pd.merge(df_users, df_orders, on='user_id', how='inner')
df_pandas = df_pandas[['name', 'product', 'amount']]
print("\nPandas: pd.merge(how='inner')")
print(df_pandas)

# SQL方式：LEFT JOIN
df_sql_left = pd.read_sql('''
    SELECT u.name, o.product, o.amount
    FROM users u
    LEFT JOIN orders o ON u.user_id = o.user_id
''', conn)
print("\nSQL: LEFT JOIN")
print(df_sql_left)

# Pandas方式：LEFT JOIN
df_pandas_left = pd.merge(df_users, df_orders, on='user_id', how='left')
df_pandas_left = df_pandas_left[['name', 'product', 'amount']]
print("\nPandas: pd.merge(how='left')")
print(df_pandas_left)

conn.close()
```

---

## 六、复杂查询实战

### 6.1 子查询

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL子查询：找出消费金额高于平均值的订单
df_sql = pd.read_sql('''
    SELECT * FROM orders
    WHERE amount > (SELECT AVG(amount) FROM orders)
''', conn)
print("消费高于平均值的订单：")
print(df_sql)

# Pandas方式
df = pd.read_sql("SELECT * FROM orders", conn)
avg_amount = df['amount'].mean()
df_pandas = df[df['amount'] > avg_amount]
print("\nPandas实现：")
print(df_pandas)

conn.close()
```

### 6.2 窗口函数

```python
import mysql.connector
import pandas as pd

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

# SQL窗口函数：计算每个产品的累计销售额
df_sql = pd.read_sql('''
    SELECT 
        date,
        product,
        amount,
        SUM(amount) OVER (PARTITION BY product ORDER BY date) as cumulative
    FROM sales
    ORDER BY product, date
''', conn)
print("累计销售额：")
print(df_sql)

# Pandas方式
df = pd.read_sql("SELECT * FROM sales ORDER BY product, date", conn)
df['cumulative'] = df.groupby('product')['amount'].cumsum()
print("\nPandas实现：")
print(df)

conn.close()
```

---

## 七、实战案例：电商数据分析

```python
import mysql.connector
import pandas as pd

# 连接数据库
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='test_db'
)

cursor = conn.cursor()

# 创建表
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    register_date DATE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    category VARCHAR(50),
    price DECIMAL(10, 2)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    order_date DATE
)
''')

# 插入数据
users_data = [
    (1, 'Alice', 'Beijing', '2023-01-15'),
    (2, 'Bob', 'Shanghai', '2023-02-20'),
    (3, 'Charlie', 'Guangzhou', '2023-03-10'),
    (4, 'David', 'Shenzhen', '2023-04-05'),
    (5, 'Eve', 'Beijing', '2023-05-12')
]
cursor.executemany('INSERT IGNORE INTO users VALUES (%s, %s, %s, %s)', users_data)

products_data = [
    (1, 'iPhone 15', 'Phone', 7999),
    (2, 'iPad Pro', 'Tablet', 8999),
    (3, 'MacBook Air', 'Laptop', 9999),
    (4, 'AirPods Pro', 'Audio', 1999),
    (5, 'Apple Watch', 'Watch', 2999)
]
cursor.executemany('INSERT IGNORE INTO products VALUES (%s, %s, %s, %s)', products_data)

orders_data = [
    (1, 1, 1, 1, '2024-01-10'),
    (2, 1, 4, 2, '2024-01-15'),
    (3, 2, 2, 1, '2024-01-20'),
    (4, 2, 3, 1, '2024-02-01'),
    (5, 3, 1, 1, '2024-02-10'),
    (6, 3, 5, 1, '2024-02-15'),
    (7, 4, 2, 1, '2024-02-20'),
    (8, 5, 1, 1, '2024-03-01'),
    (9, 5, 4, 1, '2024-03-05'),
    (10, 1, 3, 1, '2024-03-10')
]
cursor.executemany('INSERT IGNORE INTO orders VALUES (%s, %s, %s, %s, %s)', orders_data)
conn.commit()

print("=== 数据概览 ===")
print("\n用户表：")
print(pd.read_sql("SELECT * FROM users", conn))
print("\n产品表：")
print(pd.read_sql("SELECT * FROM products", conn))
print("\n订单表：")
print(pd.read_sql("SELECT * FROM orders", conn))

# 分析1：每个用户的消费金额排名
print("\n=== 分析1：用户消费金额排名 ===")
df_spending = pd.read_sql('''
    SELECT 
        u.name,
        u.city,
        SUM(o.quantity * p.price) as total_amount
    FROM orders o
    JOIN users u ON o.user_id = u.user_id
    JOIN products p ON o.product_id = p.product_id
    GROUP BY u.user_id
    ORDER BY total_amount DESC
''', conn)
print(df_spending)

# 分析2：各品类销售情况
print("\n=== 分析2：品类销售情况 ===")
df_category = pd.read_sql('''
    SELECT 
        p.category,
        COUNT(DISTINCT o.user_id) as buyers,
        SUM(o.quantity) as quantity,
        SUM(o.quantity * p.price) as revenue
    FROM orders o
    JOIN products p ON o.product_id = p.product_id
    GROUP BY p.category
    ORDER BY revenue DESC
''', conn)
print(df_category)

# 分析3：月度销售趋势
print("\n=== 分析3：月度销售趋势 ===")
df_monthly = pd.read_sql('''
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') as month,
        COUNT(*) as order_count,
        SUM(o.quantity * p.price) as revenue
    FROM orders o
    JOIN products p ON o.product_id = p.product_id
    GROUP BY month
    ORDER BY month
''', conn)
print(df_monthly)

cursor.close()
conn.close()
```

---

## 八、总结

### 本章学到了什么？

| 功能 | SQL | Pandas |
|------|-----|--------|
| 选择列 | `SELECT col` | `df[['col']]` |
| 过滤行 | `WHERE` | `df[df['col'] > value]` |
| 分组聚合 | `GROUP BY` | `df.groupby().agg()` |
| 排序 | `ORDER BY` | `df.sort_values()` |
| 连接表 | `JOIN` | `pd.merge()` |
| 去重 | `DISTINCT` | `df.drop_duplicates()` |

### 常用函数速查表

| 函数 | 用途 |
|-----|------|
| `mysql.connector.connect()` | 创建MySQL连接 |
| `pd.read_sql()` | 读取SQL到DataFrame |
| `df.to_sql()` | 写入DataFrame到SQL |
| `cursor.execute()` | 执行SQL语句 |
| `conn.commit()` | 提交事务 |

### 最佳实践

| 场景 | 推荐方式 |
|-----|---------|
| 复杂数据提取 | 使用SQL |
| 灵活数据处理 | 使用Pandas |
| 大数据操作 | 使用索引和分块 |
| 批量写入 | 使用executemany() |

### 连接字符串格式

```python
# mysql-connector-python
import mysql.connector
conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='root',
    password='password',
    database='mydb'
)

# SQLAlchemy（推荐用于to_sql）
from sqlalchemy import create_engine
engine = create_engine('mysql+mysqlconnector://root:password@localhost:3306/mydb')
```

---

> 恭喜你掌握了 SQL 与 Python 联动技能！现在你已经能高效地从 MySQL 数据库获取和处理数据了。本章代码请在本地 Python 环境或 Jupyter Notebook 中运行实践。
