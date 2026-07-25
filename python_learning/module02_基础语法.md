# Python 基础语法 —— 写代码的第一步

> 这篇文章带你掌握 Python 最基础的语法，学会写简单的程序。

**学完这章你能干啥？**
- 会用变量存储数据
- 搞懂 Python 有哪些数据类型
- 会用 f-string 格式化输出
- 会做基本的数学运算和逻辑判断

---

## 一、变量：给数据起个名字

### 1.1 什么是变量？

**用生活例子理解**：

```
变量就像"盒子"
├── 盒子有名字（变量名）
├── 盒子里装东西（数据）
└── 可以随时换东西（重新赋值）
```

**代码示例**：

```python
# 创建一个变量，名字叫 age，里面装着数字 25
age = 25

# 创建一个变量，名字叫 name，里面装着文字
name = "数据分析师"

# 变量可以重新赋值（换掉盒子里的东西）
age = 26  # 现在 age 变成 26 了
```

**为什么需要变量？**

| 没有变量 | 有变量 |
|---------|--------|
| `print(25 + 1)` | `age = 25` |
| `print(25 + 2)` | `print(age + 1)` |
| `print(25 + 3)` | `print(age + 2)` |
| 数字写死，改起来麻烦 | 改 age 一个地方，全部生效 |

### 1.2 Python 的变量不需要声明类型

**和 Java/C++ 对比**：

```java
// Java：必须先声明类型
int age = 25;        // 声明是整数
String name = "张三"; // 声明是字符串
```

```python
# Python：直接赋值，自动推断类型
age = 25             # 自动知道是整数
name = "张三"         # 自动知道是字符串
```

**Python 的优势**：

- 代码简洁，不用写类型
- 自动推断，新手友好
- 可以随时改变类型（虽然不推荐）

```python
x = 100        # x 是整数
x = 3.14       # x 变成浮点数
x = "hello"    # x 变成字符串
# Python 允许这样，但实际工作中不建议
```

### 1.3 变量命名规则

**必须遵守的规则**：

| 规则 | 正确示例 | 错误示例 |
|-----|---------|---------|
| 只能用字母、数字、下划线 | `user_name` | `user-name`（有横线） |
| 不能以数字开头 | `name1` | `1name` |
| 区分大小写 | `Age` 和 `age` 是两个变量 | - |
| 不能用 Python 关键字 | `my_if` | `if`、`for`、`while` |

**Python 关键字（保留字）**：

```
if, else, for, while, def, class, import, from,
True, False, None, and, or, not, in, is,
return, break, continue, pass, lambda, with...
```

**命名风格建议**：

```python
# ✅ 好的命名（见名知意）
user_name = "张三"        # 用下划线连接
total_price = 99.9       # 一眼就知道是什么
is_valid = True          # 布尔值用 is_ 开头
max_count = 100          # 最大值用 max_ 开头

# ❌ 不好的命名
a = "张三"               # 单字母，看不懂
x = 99.9                 # 无意义
flag = True              # flag 是什么意思？
userName = "张三"        # 驼峰命名，Python 不推荐
```

**命名风格专业术语**：

| 命名风格 | 英文名 | 示例 | Python推荐 |
|---------|--------|------|-----------|
| 下划线命名法 | snake_case | `user_name`、`total_price` | ✅ 推荐 |
| 驼峰命名法 | camelCase | `userName`、`totalPrice` | ❌ 不推荐 |
| 帕斯卡命名法 | PascalCase | `UserName`、`TotalPrice` | 类名使用 |
| 全大写下划线 | SCREAMING_SNAKE_CASE | `MAX_VALUE`、`PI` | 常量使用 |

```python
# ✅ Python 推荐风格（snake_case）
user_name = "张三"
total_price = 99.9
max_count = 100

# 布尔值用 is_、has_ 开头
is_valid = True
has_permission = False

# 常量用全大写
MAX_CONNECTIONS = 100
PI = 3.14159
DEFAULT_TIMEOUT = 30

# 类名用 PascalCase
class DataAnalyzer:
    pass

# ❌ 不推荐风格（camelCase，那是 JavaScript/Java 的习惯）
userName = "张三"        # 不符合 Python 规范
totalPrice = 99.9       # 不符合 Python 规范
```

---

## 二、数据类型：Python 能处理哪些数据？

### 2.1 五种基本数据类型

| 类型 | 英文名 | 例子 | 说明 |
|-----|--------|------|------|
| 整数 | int | `42`, `-10`, `0` | 没有小数点的数 |
| 浮点数 | float | `3.14`, `-0.5`, `1.0` | 有小数点的数 |
| 字符串 | str | `"hello"`, `'世界'` | 用引号包裹的文字 |
| 布尔值 | bool | `True`, `False` | 只有真或假 |
| 空值 | NoneType | `None` | 表示"什么都没有" |

**代码示例**：

```python
# 整数 int
age = 25
count = -10
zero = 0

# 浮点数 float
salary = 15000.50
pi = 3.14159
rate = 0.85

# 字符串 str（可以用单引号或双引号）
name = "数据分析师"
city = '北京'
message = """这是多行字符串，
可以写很多行，
适合写长文本"""

# 布尔值 bool（注意大写）
is_student = True
is_adult = False

# 空值 None（表示"没有值"或"缺失"）
result = None  # 常用于初始化或表示缺失数据
```

### 2.2 用 type() 查看数据类型

```python
print(type(42))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type("hello"))     # <class 'str'>
print(type(True))        # <class 'bool'>
print(type(None))        # <class 'NoneType'>

# 查看变量的类型
age = 25
print(type(age))         # <class 'int'>

name = "张三"
print(type(name))        # <class 'str'>
```

### 2.3 数据类型转换

**为什么需要转换？**

```python
# 从文件读取的数字是字符串
age_str = "25"
# age_str + 1  # 报错！字符串不能和数字相加

# 需要先转换成整数
age = int(age_str)
print(age + 1)  # 26
```

**常用转换函数**：

| 函数 | 作用 | 示例 |
|-----|------|------|
| `int()` | 转整数 | `int("42")` → `42` |
| `float()` | 转浮点数 | `float("3.14")` → `3.14` |
| `str()` | 转字符串 | `str(42)` → `"42"` |
| `bool()` | 转布尔值 | `bool(1)` → `True` |

**转换示例**：

```python
# 字符串 → 数字
int("42")        # 42
int("42.5")      # 报错！不能直接转
float("42.5")    # 42.5

# 数字 → 字符串
str(42)          # "42"
str(3.14)        # "3.14"

# 浮点数 → 整数（会截断小数部分）
int(3.99)        # 3（不是四舍五入！）
int(-3.9)        # -3

# 布尔值转换
bool(1)          # True
bool(0)          # False
bool("")         # False（空字符串）
bool("hello")    # True（非空字符串）
```

### 2.4 数据分析中的特殊值：None

**None 是什么？**

- 表示"什么都没有"
- 不是 0，不是空字符串，不是 False
- 常用于表示缺失数据

```python
# 数据分析场景：缺失值
sales = None  # 某天没有销售数据

# 检查是否为 None
if sales is None:
    print("数据缺失")

# ❌ 错误的检查方式
if sales == None:  # 不推荐
    print("数据缺失")

# ✅ 正确的检查方式
if sales is None:  # 推荐
    print("数据缺失")
```

---

## 三、字符串详解：文字处理基础

### 3.1 字符串的创建

```python
# 单引号
name = '张三'

# 双引号（推荐，更常见）
name = "张三"

# 三引号（多行字符串）
long_text = """
这是第一行
这是第二行
这是第三行
"""

# 三引号还可以写文档注释
def add(a, b):
    """
    这个函数用来计算两个数的和
    参数：a, b
    返回：a + b
    """
    return a + b
```

### 3.2 字符串的基本操作

```python
# 拼接
first = "数据"
last = "分析"
full = first + last          # "数据分析"
full = first + " " + last    # "数据 分析"

# 重复
line = "-" * 10              # "----------"

# 获取长度
name = "数据分析"
print(len(name))             # 4（4个字符）

# 通过索引获取字符（从 0 开始）
name = "Python"
print(name[0])               # "P"
print(name[1])               # "y"
print(name[-1])              # "n"（最后一个字符）
print(name[-2])              # "o"（倒数第二个）

# 切片（获取部分字符串）
name = "数据分析学习"
print(name[0:2])             # "数据"（第0到第1个）
print(name[2:])              # "分析学习"（从第2个到最后）
print(name[:2])              # "数据"（从开头到第1个）
```

### 3.3 字符串常用方法

| 方法 | 作用 | 示例 |
|-----|------|------|
| `.strip()` | 去除首尾空格 | `"  hi  ".strip()` → `"hi"` |
| `.lower()` | 转小写 | `"HELLO".lower()` → `"hello"` |
| `.upper()` | 转大写 | `"hello".upper()` → `"HELLO"` |
| `.replace()` | 替换 | `"hello".replace("l", "L")` → `"heLLo"` |
| `.split()` | 分割 | `"a,b,c".split(",")` → `["a","b","c"]` |
| `.join()` | 连接 | `",".join(["a","b"])` → `"a,b"` |
| `.startswith()` | 是否以...开头 | `"hello".startswith("he")` → `True` |
| `.endswith()` | 是否以...结尾 | `"hello".endswith("lo")` → `True` |
| `.find()` | 查找位置 | `"hello".find("l")` → `2` |

**代码示例**：

```python
# 去除空格（数据清洗常用）
text = "  数据分析  "
print(text.strip())          # "数据分析"

# 大小写转换
name = "Python"
print(name.lower())          # "python"
print(name.upper())          # "PYTHON"

# 替换
text = "我喜欢Java"
print(text.replace("Java", "Python"))  # "我喜欢Python"

# 分割（解析 CSV 数据常用）
line = "张三,25,北京"
parts = line.split(",")
print(parts)                 # ["张三", "25", "北京"]

# 连接
words = ["数据", "分析", "学习"]
print("-".join(words))       # "数据-分析-学习"

# 检查开头结尾
filename = "data.csv"
if filename.endswith(".csv"):
    print("这是 CSV 文件")
```

### 3.4 f-string：最优雅的字符串格式化

**为什么用 f-string？**

| 方法 | 代码 | 评价 |
|-----|------|------|
| 字符串拼接 | `"薪资：" + str(salary) + "元"` | ❌ 麻烦，要类型转换 |
| % 格式化 | `"薪资：%d元" % salary` | ❌ 老语法，不推荐 |
| .format() | `"薪资：{}元".format(salary)` | ⚠️ 可以，但不够简洁 |
| f-string | `f"薪资：{salary}元"` | ✅ 推荐！简洁直观 |

**基本用法**：

```python
name = "小明"
age = 25

# 直接嵌入变量
print(f"我叫{name}，今年{age}岁")
# 输出：我叫小明，今年25岁

# 可以写表达式
print(f"明年{age + 1}岁")
# 输出：明年26岁

# 可以调用方法
print(f"你好，{name.upper()}")
# 输出：你好，小明
```

**格式化数字**：

```python
salary = 15000.50

# 保留小数位
print(f"薪资：{salary:.2f}元")
# 输出：薪资：15000.50元

# 千分位分隔符
print(f"薪资：{salary:,.2f}元")
# 输出：薪资：15,000.50元

# 百分比格式
rate = 0.85
print(f"完成率：{rate:.1%}")
# 输出：完成率：85.0%

# 科学计数法
big_num = 123456789
print(f"科学计数：{big_num:e}")
# 输出：科学计数：1.234568e+08
```

**对齐和宽度**：

```python
# 右对齐，宽度10
print(f"{42:>10}")    # "        42"

# 左对齐，宽度10
print(f"{42:<10}")    # "42        "

# 居中对齐
print(f"{42:^10}")    # "    42    "

# 用0填充
print(f"{42:0>5}")    # "00042"
```

**常见格式化符号总结**：

| 符号 | 作用 | 示例 |
|-----|------|------|
| `:.2f` | 保留2位小数 | `{3.14159:.2f}` → `3.14` |
| `:,.2f` | 千分位+小数 | `{15000.5:,.2f}` → `15,000.50` |
| `:.1%` | 百分比 | `{0.85:.1%}` → `85.0%` |
| `:>10` | 右对齐 | `{42:>10}` |
| `:<10` | 左对齐 | `{42:<10}` |
| `:^10` | 居中 | `{42:^10}` |

---

## 四、运算符：让数据"动"起来

### 4.1 算术运算符

**基础运算**：

| 运算符 | 作用 | 示例 | 结果 |
|-------|------|------|------|
| `+` | 加法 | `10 + 3` | `13` |
| `-` | 减法 | `10 - 3` | `7` |
| `*` | 乘法 | `10 * 3` | `30` |
| `/` | 除法 | `10 / 3` | `3.333...` |
| `//` | 整除 | `10 // 3` | `3` |
| `%` | 取余 | `10 % 3` | `1` |
| `**` | 幂运算 | `10 ** 3` | `1000` |

**代码示例**：

```python
# 基础运算
print(10 + 3)    # 13
print(10 - 3)    # 7
print(10 * 3)    # 30
print(10 / 3)    # 3.3333333333333335（除法总是浮点数）

# 整除（向下取整）
print(10 // 3)   # 3
print(7 // 2)    # 3
print(-7 // 2)   # -4（向下取整，不是-3）

# 取余（求模）
print(10 % 3)    # 1（10除以3，余1）
print(7 % 2)     # 1（7除以2，余1）

# 幂运算
print(2 ** 10)   # 1024（2的10次方）
print(9 ** 0.5)  # 3.0（开平方）
```

**实际应用场景**：

```python
# 场景1：分糖果
total = 100
children = 7
each = total // children    # 每人分几个
leftover = total % children # 剩余几个
print(f"每人{each}个，剩余{leftover}个")
# 输出：每人14个，剩余2个

# 场景2：计算小时、分钟
total_minutes = 150
hours = total_minutes // 60
minutes = total_minutes % 60
print(f"{hours}小时{minutes}分钟")
# 输出：2小时30分钟

# 场景3：判断奇偶
num = 7
if num % 2 == 0:
    print("偶数")
else:
    print("奇数")
```

### 4.2 比较运算符

| 运算符 | 作用 | 示例 | 结果 |
|-------|------|------|------|
| `==` | 等于 | `5 == 5` | `True` |
| `!=` | 不等于 | `5 != 3` | `True` |
| `>` | 大于 | `5 > 3` | `True` |
| `<` | 小于 | `5 < 3` | `False` |
| `>=` | 大于等于 | `5 >= 5` | `True` |
| `<=` | 小于等于 | `5 <= 3` | `False` |

**代码示例**：

```python
# 基本比较
print(5 == 5)    # True
print(5 != 3)    # True
print(5 > 3)     # True
print(5 < 3)     # False

# 字符串也可以比较
print("abc" == "abc")  # True
print("abc" != "xyz")  # True

# 实际应用：筛选数据
salary = 15000
if salary > 10000:
    print("薪资达标")
```

**新手常见错误**：

```python
# ❌ 错误：用 = 做比较（这是赋值！）
age = 25
if age = 25:  # 报错！SyntaxError
    print("25岁")

# ✅ 正确：用 == 做比较
if age == 25:
    print("25岁")
```

### 4.3 逻辑运算符

| 运算符 | 作用 | 说明 |
|-------|------|------|
| `and` | 与 | 两个都为 True 才是 True |
| `or` | 或 | 有一个为 True 就是 True |
| `not` | 非 | 取反，True 变 False |

**真值表**：

| A | B | A and B | A or B | not A |
|---|---|---------|--------|-------|
| True | True | True | True | False |
| True | False | False | True | False |
| False | True | False | True | True |
| False | False | False | False | True |

**代码示例**：

```python
# and：两个条件都满足
age = 25
salary = 15000
if age > 20 and salary > 10000:
    print("符合条件")
# 输出：符合条件

# or：满足一个条件即可
has_experience = False
has_certificate = True
if has_experience or has_certificate:
    print("可以应聘")
# 输出：可以应聘

# not：取反
is_student = False
if not is_student:
    print("不是学生")
# 输出：不是学生
```

**实际应用场景**：

```python
# 场景：筛选符合条件的用户
age = 25
salary = 15000
city = "北京"

# 多条件组合
if age >= 20 and age <= 30 and salary > 10000:
    print("目标用户")

# 更清晰的写法
if 20 <= age <= 30 and salary > 10000:
    print("目标用户")

# 排除某些城市
if city != "上海" and city != "广州":
    print("非沪广用户")

# 使用 not in 更简洁
if city not in ["上海", "广州"]:
    print("非沪广用户")
```

### 4.4 赋值运算符

| 运算符 | 等价写法 | 示例 |
|-------|---------|------|
| `=` | 赋值 | `x = 5` |
| `+=` | `x = x + y` | `x += 3` |
| `-=` | `x = x - y` | `x -= 3` |
| `*=` | `x = x * y` | `x *= 3` |
| `/=` | `x = x / y` | `x /= 3` |

**代码示例**：

```python
# 累加（循环中常用）
total = 0
total += 100  # total = 100
total += 200  # total = 300
total += 300  # total = 600

# 累乘
product = 1
product *= 2  # product = 2
product *= 3  # product = 6
product *= 4  # product = 24
```

---

## 五、输入输出：和用户交互

### 5.1 print() 输出

```python
# 基本输出
print("Hello, Python!")

# 输出多个值
name = "张三"
age = 25
print("姓名：", name, "年龄：", age)
# 输出：姓名： 张三 年龄： 25

# 指定分隔符
print("2024", "01", "15", sep="-")
# 输出：2024-01-15

# 不换行
print("第一行", end=" ")
print("第二行")
# 输出：第一行 第二行
```

### 5.2 input() 输入

```python
# 基本输入
name = input("请输入你的名字：")
print(f"你好，{name}！")

# 注意：input() 返回的是字符串！
age = input("请输入年龄：")
print(type(age))  # <class 'str'>

# 如果需要数字，要转换
age = int(input("请输入年龄："))
print(f"明年{age + 1}岁")
```

---

## 六、实战案例：员工薪资计算器

### 6.1 场景背景

HR 让你算一下公司员工的日薪，方便做成本核算。你拿到的是月薪数据，需要转换成日薪和税后薪资。

**为什么这个案例重要？**

- 这是真实工作中最常见的计算场景
- 涉及除法、乘法、百分比运算
- 需要格式化输出，让结果清晰易读
- 为后面学 Pandas 处理批量数据打基础

### 6.2 完整代码

```python
# ========================================
# 案例：员工薪资计算器
# 场景：HR需要计算日薪和税后薪资
# ========================================

# 原始数据：某员工月薪
monthly_salary = 15000  # 月薪15000元
work_days = 22          # 每月工作22天（标准工作日）
tax_rate = 0.1          # 税率10%

# 第一步：计算日薪
# 日薪 = 月薪 ÷ 工作天数
daily_salary = monthly_salary / work_days

# 第二步：计算税后薪资
# 税后 = 月薪 × (1 - 税率)
after_tax = monthly_salary * (1 - tax_rate)

# 第三步：计算个税
tax = monthly_salary * tax_rate

# 第四步：格式化输出
print("=" * 30)
print("员工薪资计算结果")
print("=" * 30)
print(f"月薪：{monthly_salary:,}元")
print(f"日薪：{daily_salary:.2f}元")
print(f"税率：{tax_rate:.0%}")
print(f"个税：{tax:,.2f}元")
print(f"税后月薪：{after_tax:,.2f}元")
print("=" * 30)
```

**运行结果**：

```
==============================
员工薪资计算结果
==============================
月薪：15,000元
日薪：681.82元
税率：10%
个税：1,500.00元
税后月薪：13,500.00元
==============================
```

### 6.3 新手常见错误

```python
# ❌ 错误1：忘记格式化，小数位太多
print(f"日薪：{daily_salary}元")
# 输出：日薪：681.8181818181819元（太长了）

# ❌ 错误2：整数除法丢失精度
daily_salary = monthly_salary // work_days
print(daily_salary)  # 681（少了0.82元）

# ❌ 错误3：税率计算搞反了
after_tax = monthly_salary - 0.1  # 这是减0.1元，不是减10%！

# ❌ 错误4：忘记千分位分隔符
print(f"月薪：{monthly_salary}元")  # 15000元（不够专业）

# ✅ 正确写法
print(f"月薪：{monthly_salary:,}元")  # 15,000元
print(f"日薪：{daily_salary:.2f}元")  # 681.82元
after_tax = monthly_salary * (1 - tax_rate)  # 正确的税率计算
```

### 6.4 扩展：批量计算

```python
# 场景：批量计算多个员工的日薪
employees = [
    {"name": "张三", "salary": 12000},
    {"name": "李四", "salary": 18000},
    {"name": "王五", "salary": 15000},
]

print("员工日薪统计")
print("-" * 30)

for emp in employees:
    daily = emp["salary"] / 22
    print(f"{emp['name']}：月薪{emp['salary']:,}元，日薪{daily:.2f}元")
```

**运行结果**：

```
员工日薪统计
------------------------------
张三：月薪12,000元，日薪545.45元
李四：月薪18,000元，日薪818.18元
王五：月薪15,000元，日薪681.82元
```

---

## 七、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 变量 | 给数据起名字，直接赋值，不用声明类型 |
| 数据类型 | int、float、str、bool、None |
| 字符串 | 创建、拼接、切片、常用方法 |
| f-string | 最优雅的格式化，`f"文本{变量}"` |
| 运算符 | 算术、比较、逻辑、赋值 |
| 输入输出 | `print()` 输出，`input()` 输入 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| `if age = 25:` | `if age == 25:` |
| `int(3.99)` 期望4 | `int(3.99)` 得到3（截断） |
| `input()` 直接当数字用 | `int(input())` 转换后使用 |
| `salary - 0.1` 减10% | `salary * 0.9` 或 `salary * (1 - 0.1)` |

---

> 恭喜你掌握了 Python 基础语法！现在你已经能写简单的计算程序了，下一章学习数据容器，可以处理更复杂的数据结构。
