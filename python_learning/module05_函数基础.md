# Python 函数基础 —— 打包复用代码

> 这篇文章带你掌握 Python 函数的定义和使用，学会把重复代码打包复用。

**学完这章你能干啥？**
- 会定义和调用函数
- 理解不同类型的参数
- 会用 Lambda 匿名函数
- 理解变量作用域

---

## 一、什么是函数？

### 1.1 用生活类比理解

**函数就像"菜谱"**：

```
菜谱（函数）：
├── 名称：红烧肉
├── 材料（参数）：五花肉、酱油、糖
├── 步骤（代码）：切块 → 焯水 → 炒糖色 → 炖煮
└── 成品（返回值）：红烧肉
```

**写一次，用无数次**：

```python
# 定义"菜谱"
def make_tea(temperature="热"):
    return f"一杯{temperature}茶"

# 反复使用
print(make_tea())        # 一杯热茶
print(make_tea("冰"))    # 一杯冰茶
print(make_tea("温"))    # 一杯温茶
```

### 1.2 为什么需要函数？

| 没有函数 | 有函数 |
|---------|--------|
| 重复写相同代码 | 写一次，调用多次 |
| 改一处，漏改多处 | 改函数，处处生效 |
| 代码冗长难读 | 主程序简洁清晰 |
| 难以测试 | 独立测试，容易排查 |

### 1.3 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 函数定义 | Function Definition | 创建函数 |
| 函数调用 | Function Call | 使用函数 |
| 参数 | Parameter | 函数接收的输入 |
| 返回值 | Return Value | 函数的输出 |
| 文档字符串 | Docstring | 说明函数功能的注释 |

---

## 二、函数定义和调用

### 2.1 基本语法

```python
def 函数名(参数):
    """文档字符串（说明函数功能）"""
    函数体
    return 返回值
```

**语法要点**：

| 要点 | 说明 |
|-----|------|
| def | 定义函数的关键字 |
| 函数名 | 用下划线命名法，如 calculate_salary |
| 参数 | 可以有零个或多个 |
| 冒号 | 必须有 |
| 缩进 | 函数体必须缩进 4 个空格 |
| return | 返回结果，可省略 |

### 2.2 第一个函数

```python
# ========================================
# 案例：计算日薪
# ========================================

def calculate_daily_salary(monthly, days=22):
    """
    计算日薪
    
    参数：
        monthly: 月薪（元）
        days: 每月工作天数，默认22天
    
    返回：
        日薪（元）
    """
    return monthly / days

# 调用函数
result = calculate_daily_salary(15000)
print(f"日薪：{result:.2f}元")

# 使用自定义工作天数
result = calculate_daily_salary(15000, 20)
print(f"日薪（20天）：{result:.2f}元")

# 使用关键字参数
result = calculate_daily_salary(monthly=18000, days=21)
print(f"日薪（18000元，21天）：{result:.2f}元")
```

**运行结果**：

```
日薪：681.82元
日薪（20天）：750.00元
日薪（18000元，21天）：857.14元
```

### 2.3 文档字符串（Docstring）

**为什么要有文档字符串？**

- 说明函数功能、参数、返回值
- 方便别人（和未来的自己）理解
- IDE 会显示提示信息

```python
def calculate_tax(salary, rate=0.1):
    """
    计算个人所得税
    
    参数：
        salary: 税前月薪（元）
        rate: 税率，默认10%
    
    返回：
        个税金额（元）
    
    示例：
        >>> calculate_tax(10000)
        1000.0
    """
    return salary * rate

# 查看 docstring
print(calculate_tax.__doc__)
```

### 2.4 return 语句

**return 的作用**：

- 返回结果给调用者
- 结束函数执行

```python
# 有返回值
def add(a, b):
    return a + b

result = add(3, 5)  # result = 8

# 无返回值（隐式返回 None）
def greet(name):
    print(f"你好，{name}！")

result = greet("张三")  # result = None

# 多个返回值（实际是元组）
def get_min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = get_min_max([1, 5, 3, 9, 2])
print(f"最小值：{minimum}，最大值：{maximum}")
```

---

## 三、参数详解

### 3.1 参数类型一览

| 类型 | 语法 | 说明 |
|-----|------|------|
| 位置参数 | `def func(a, b)` | 按顺序传递，必填 |
| 默认参数 | `def func(a=1)` | 有默认值，可省略 |
| 可变位置参数 | `def func(*args)` | 接收任意多个位置参数 |
| 可变关键字参数 | `def func(**kwargs)` | 接收任意多个关键字参数 |

### 3.2 位置参数

**定义**：按顺序传递，必须提供。

```python
def greet(name, greeting):
    return f"{greeting}，{name}！"

# 按位置传递
print(greet("张三", "你好"))  # 你好，张三！

# 按关键字传递（推荐）
print(greet(name="张三", greeting="你好"))  # 你好，张三！

# 混合传递（位置在前，关键字在后）
print(greet("张三", greeting="早上好"))  # 早上好，张三！
```

### 3.3 默认参数

**定义**：有默认值，调用时可省略。

```python
def calculate_tax(salary, rate=0.1):
    """计算个税，默认税率10%"""
    return salary * rate

# 使用默认税率
print(f"默认税率：{calculate_tax(10000):.0f}元")  # 1000元

# 自定义税率
print(f"自定义税率：{calculate_tax(10000, 0.15):.0f}元")  # 1500元

# 关键字参数
print(f"关键字：{calculate_tax(rate=0.2, salary=10000):.0f}元")  # 2000元
```

### 3.4 可变位置参数（*args）

**定义**：接收任意多个位置参数，打包成元组。

```python
def total(*numbers):
    """计算任意多个数的和"""
    print(f"接收到的参数：{numbers}")  # 元组
    return sum(numbers)

print(f"total(1,2,3) = {total(1, 2, 3)}")        # 6
print(f"total(1,2,3,4,5) = {total(1, 2, 3, 4, 5)}")  # 15
print(f"total() = {total()}")                    # 0
```

**实际应用**：

```python
# 场景：计算平均分，支持任意多个分数
def average(*scores):
    if not scores:
        return 0
    return sum(scores) / len(scores)

print(f"平均分：{average(80, 90, 85, 95):.1f}")  # 87.5
```

### 3.5 可变关键字参数（**kwargs）

**定义**：接收任意多个关键字参数，打包成字典。

```python
def show_info(**info):
    """显示任意信息"""
    print(f"接收到的参数：{info}")  # 字典
    for key, value in info.items():
        print(f"  {key}: {value}")

show_info(name="小明", age=25, city="北京")
```

**运行结果**：

```
接收到的参数：{'name': '小明', 'age': 25, 'city': '北京'}
  name: 小明
  age: 25
  city: 北京
```

### 3.6 参数顺序规则

**必须按此顺序定义参数**：

```
位置参数 → 默认参数 → *args → **kwargs
```

```python
def complex_func(a, b, c=10, *args, **kwargs):
    """混合参数示例"""
    print(f"a={a}, b={b}, c={c}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

complex_func(1, 2, 3, 4, 5, 6, x=7, y=8)
```

**运行结果**：

```
a=1, b=2, c=3
args=(4, 5, 6)
kwargs={'x': 7, 'y': 8}
```

### 3.7 新手常见错误

```python
# ❌ 错误1：默认参数用可变对象
def add_item(item, items=[]):  # 危险！
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b']  意外！列表被共享了

# ✅ 正确：用 None 作为默认值
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b']  正确

# ❌ 错误2：位置参数在默认参数后面
# def func(a=1, b):  # SyntaxError
#     return a + b

# ✅ 正确：位置参数在前
def func(a, b=1):
    return a + b
```

---

## 四、Lambda 匿名函数

### 4.1 什么是 Lambda？

**定义**：一行代码定义的匿名函数，没有名字，用完即弃。

**专业术语**：**Lambda 表达式（Lambda Expression）**，源自数学中的 λ 演算。

### 4.2 基本语法

```python
lambda 参数: 表达式
```

### 4.3 对比传统函数

```python
# 传统函数（4行）
def double(x):
    return x * 2

# Lambda（1行）
double = lambda x: x * 2

print(double(5))  # 10
```

### 4.4 各种用法

```python
# 单参数
square = lambda x: x ** 2
print(square(5))  # 25

# 多参数
add = lambda x, y: x + y
print(add(3, 5))  # 8

# 带条件
get_level = lambda s: "高薪" if s >= 15000 else "普通"
print(get_level(18000))  # 高薪
print(get_level(10000))  # 普通
```

### 4.5 实际应用场景

**场景1：排序列表**

```python
employees = [
    {"name": "小明", "salary": 15000},
    {"name": "小红", "salary": 22000},
    {"name": "小刚", "salary": 8000},
]

# 按薪资排序（升序）
employees.sort(key=lambda e: e["salary"])
print("升序：", [e["name"] for e in employees])

# 按薪资排序（降序）
employees.sort(key=lambda e: e["salary"], reverse=True)
print("降序：", [e["name"] for e in employees])
```

**场景2：筛选数据**

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"偶数：{evens}")
```

**场景3：批量转换**

```python
salaries = [8000, 12000, 15000, 20000]
after_tax = list(map(lambda s: s * 0.9, salaries))
print(f"税后薪资：{after_tax}")
```

### 4.6 什么时候用 Lambda？

| 场景 | 推荐 |
|-----|------|
| 逻辑简单（一行能写完） | ✅ 用 Lambda |
| 只用一次，不需要复用 | ✅ 用 Lambda |
| 作为 sort、map、filter 的参数 | ✅ 用 Lambda |
| 逻辑复杂（超过一行） | ❌ 用普通函数 |
| 需要复用 | ❌ 用普通函数 |
| 需要文档说明 | ❌ 用普通函数 |

---

## 五、map / filter / reduce

### 5.1 map：批量转换

**作用**：对每个元素应用函数，返回新序列。

```python
# map(函数, 可迭代对象)
salaries = [8000, 12000, 15000, 20000]

# 计算税后薪资
after_tax = list(map(lambda s: s * 0.9, salaries))
print(f"税后：{after_tax}")

# 等价的列表推导式（推荐）
after_tax = [s * 0.9 for s in salaries]
print(f"税后：{after_tax}")
```

### 5.2 filter：筛选

**作用**：保留函数返回 True 的元素。

```python
# filter(函数, 可迭代对象)
salaries = [8000, 12000, 15000, 20000]

# 筛选高薪
high_salary = list(filter(lambda s: s > 10000, salaries))
print(f"高薪：{high_salary}")

# 等价的列表推导式（推荐）
high_salary = [s for s in salaries if s > 10000]
print(f"高薪：{high_salary}")
```

### 5.3 reduce：累积计算

**作用**：将序列缩减为一个值。

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 计算乘积
product = reduce(lambda x, y: x * y, numbers)
print(f"乘积：{product}")  # 120

# 等价的循环
product = 1
for n in numbers:
    product *= n
print(f"乘积：{product}")
```

### 5.4 对比列表推导式

| 特性 | map/filter | 列表推导式 |
|-----|-----------|-----------|
| 可读性 | 较差 | 更好 |
| 灵活性 | 单一功能 | 可转换+筛选 |
| 性能 | 略快 | 略慢 |
| 推荐度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**最佳实践**：优先用列表推导式，更 Pythonic。

---

## 六、变量作用域

### 6.1 什么是作用域？

**定义**：变量的有效范围，即在哪里能访问到这个变量。

**专业术语**：**作用域（Scope）**，变量的可见范围。

### 6.2 LEGB 规则

Python 查找变量的顺序：

| 优先级 | 名称 | 英文 | 说明 |
|-------|------|------|------|
| 1 | 局部 | Local | 函数内部 |
| 2 | 嵌套 | Enclosing | 外层函数 |
| 3 | 全局 | Global | 模块级别 |
| 4 | 内置 | Built-in | Python 内置 |

```python
# 演示 LEGB 规则
x = "全局变量"  # Global

def outer():
    x = "外层变量"  # Enclosing
    
    def inner():
        x = "局部变量"  # Local
        print(f"inner: {x}")
    
    inner()
    print(f"outer: {x}")

outer()
print(f"global: {x}")
```

**运行结果**：

```
inner: 局部变量
outer: 外层变量
global: 全局变量
```

### 6.3 局部变量 vs 全局变量

```python
x = "全局变量"

def test():
    x = "局部变量"  # 这是另一个 x，不影响外面的
    print(f"函数内：{x}")

test()              # 局部变量
print(f"函数外：{x}")  # 全局变量
```

### 6.4 global 关键字

**作用**：在函数内修改全局变量。

```python
count = 0

def increment():
    global count  # 声明使用全局变量
    count += 1

increment()
increment()
print(f"count = {count}")  # 2
```

### 6.5 nonlocal 关键字

**作用**：在嵌套函数中修改外层函数的变量。

```python
def outer():
    x = "外层变量"
    
    def inner():
        nonlocal x  # 声明使用外层变量
        x = "内层修改"
    
    inner()
    print(f"outer中x：{x}")  # 内层修改

outer()
```

### 6.6 新手常见错误

```python
# ❌ 错误：在函数内直接修改全局变量
count = 0

def increment():
    count += 1  # UnboundLocalError

# ✅ 正确：用 global 声明
def increment():
    global count
    count += 1
```

---

## 七、实战案例：薪资分析工具

### 7.1 场景背景

HR 需要分析公司薪资数据，要求：

1. 能统计全公司薪资情况
2. 能按部门筛选分析
3. 返回人数、平均、最高、最低

**为什么这个案例重要？**

| 知识点 | 应用 |
|-------|------|
| 函数定义 | 封装分析逻辑 |
| 默认参数 | dept=None 灵活筛选 |
| 列表推导式 | 提取薪资数据 |
| 字典返回值 | 信息完整 |

### 7.2 完整代码

```python
# ========================================
# 案例：薪资分析工具
# ========================================

# 原始数据
employees = [
    {"name": "张伟", "salary": 12000, "department": "市场"},
    {"name": "李娜", "salary": 18000, "department": "技术"},
    {"name": "王磊", "salary": 15000, "department": "市场"},
    {"name": "刘洋", "salary": 22000, "department": "技术"},
    {"name": "陈静", "salary": 9000, "department": "行政"},
    {"name": "赵敏", "salary": 16000, "department": "技术"},
    {"name": "孙强", "salary": 11000, "department": "行政"},
]

def analyze_salary(data, dept=None):
    """
    分析薪资数据
    
    参数：
        data: 员工数据列表
        dept: 部门名称，None 表示全公司
    
    返回：
        字典，包含 count、average、max、min
    """
    # 筛选数据
    if dept:
        filtered = [e for e in data if e["department"] == dept]
    else:
        filtered = data
    
    # 检查是否有数据
    if not filtered:
        return {"count": 0, "average": 0, "max": 0, "min": 0}
    
    # 提取薪资
    salaries = [e["salary"] for e in filtered]
    
    # 统计
    return {
        "count": len(salaries),
        "average": sum(salaries) / len(salaries),
        "max": max(salaries),
        "min": min(salaries),
    }

# 使用函数
print("=" * 50)
print("薪资分析报告")
print("=" * 50)

# 全公司分析
result = analyze_salary(employees)
print(f"\n【全公司】")
print(f"人数：{result['count']}人")
print(f"平均薪资：{result['average']:.0f}元")
print(f"最高薪资：{result['max']}元")
print(f"最低薪资：{result['min']}元")

# 技术部分析
result = analyze_salary(employees, "技术")
print(f"\n【技术部】")
print(f"人数：{result['count']}人")
print(f"平均薪资：{result['average']:.0f}元")

# 不存在的部门
result = analyze_salary(employees, "财务")
print(f"\n【财务部】")
print(f"人数：{result['count']}人（部门不存在）")
```

### 7.3 运行结果

```
==================================================
薪资分析报告
==================================================

【全公司】
人数：7人
平均薪资：14714元
最高薪资：22000元
最低薪资：9000元

【技术部】
人数：3人
平均薪资：18667元

【财务部】
人数：0人（部门不存在）
```

### 7.4 函数设计要点

| 要点 | 说明 |
|-----|------|
| 参数设计 | dept 默认 None，灵活筛选 |
| 边界处理 | 数据为空时返回合理值 |
| 返回值 | 字典格式，信息完整 |
| 文档字符串 | 说明参数和返回值 |

---

## 八、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 函数定义 | def + 参数 + return |
| 参数类型 | 位置、默认、*args、**kwargs |
| Lambda | 一行匿名函数，用于简单场景 |
| map/filter | 批量转换和筛选 |
| 作用域 | LEGB 规则，global/nonlocal |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| 默认参数用 `[]` | 默认参数用 `None` |
| 位置参数在默认参数后 | 位置参数在前 |
| 函数内直接修改全局变量 | 用 `global` 声明 |
| Lambda 写复杂逻辑 | 用普通函数 |

---

> 恭喜你掌握了 Python 函数基础！现在你已经能把重复代码打包复用了，下一章学习面向对象，用类来组织更复杂的代码结构。
