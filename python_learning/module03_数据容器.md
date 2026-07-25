# Python 数据容器 —— 存数据的各种方式

> 这篇文章带你掌握 Python 的四种数据容器，学会根据场景选择合适的容器类型。

**学完这章你能干啥？**
- 掌握列表、元组、字典、集合的用法
- 会用切片批量提取数据
- 会用推导式一行代码搞定变换
- 能综合运用容器处理真实数据

---

## 一、为什么需要"容器"？

### 1.1 什么是数据容器？

**用生活类比理解**：

| 容器类型 | 生活类比 | 特点 |
|---------|---------|------|
| 列表（list） | 抽屉 | 可以随时放、拿、换位置 |
| 元组（tuple） | 保险箱 | 放进去就锁死，不能改 |
| 字典（dict） | 通讯录 | 用名字找人 |
| 集合（set） | 筛子 | 只留唯一的 |

### 1.2 四种容器对比

| 特性 | 列表 | 元组 | 字典 | 集合 |
|-----|------|------|------|------|
| 可变性 | ✅ 可变 | ❌ 不可变 | ✅ 可变 | ✅ 可变 |
| 有序性 | ✅ 有序 | ✅ 有序 | ❌ 无序 | ❌ 无序 |
| 重复性 | ✅ 可重复 | ✅ 可重复 | 键不可重复 | ❌ 不可重复 |
| 索引访问 | ✅ 数字索引 | ✅ 数字索引 | ✅ 键索引 | ❌ 不支持 |
| 性能 | 较慢 | 较快 | 查找最快 | 去重最快 |

### 1.3 选择指南

**什么时候用什么？**

| 场景 | 推荐容器 | 原因 |
|-----|---------|------|
| 需要增删改数据 | 列表 | 最灵活，最常用 |
| 数据固定不变 | 元组 | 安全，性能好 |
| 需要键值对映射 | 字典 | 查找速度快 |
| 需要去重 | 集合 | 一行代码去重 |

---

## 二、列表（list）

### 2.1 什么是列表？

**定义**：列表是**有序、可变**的数据容器，可以存储多个元素。

**专业术语**：
- **有序（Ordered）**：元素有固定位置，第一个永远是第一个
- **可变（Mutable）**：可以随时增加、删除、修改元素
- **索引（Index）**：每个元素的位置编号，从 0 开始

### 2.2 创建列表

```python
# 创建空列表
empty_list = []
empty_list = list()

# 创建有元素的列表
fruits = ["苹果", "香蕉", "橘子"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]  # 可以混合不同类型
```

### 2.3 增删改查操作

**增（添加元素）**：

| 方法 | 作用 | 示例 |
|-----|------|------|
| `.append(x)` | 末尾添加 | `fruits.append("西瓜")` |
| `.insert(i, x)` | 指定位置插入 | `fruits.insert(0, "草莓")` |
| `.extend(list)` | 合并另一个列表 | `fruits.extend(["芒果", "榴莲"])` |

```python
fruits = ["苹果", "香蕉"]

# append：末尾添加（最常用）
fruits.append("橘子")
print(fruits)  # ["苹果", "香蕉", "橘子"]

# insert：指定位置插入
fruits.insert(0, "草莓")  # 插到索引0的位置
print(fruits)  # ["草莓", "苹果", "香蕉", "橘子"]

# extend：合并列表
fruits.extend(["芒果", "榴莲"])
print(fruits)  # ["草莓", "苹果", "香蕉", "橘子", "芒果", "榴莲"]
```

**删（删除元素）**：

| 方法 | 作用 | 示例 |
|-----|------|------|
| `.remove(x)` | 删除指定值 | `fruits.remove("香蕉")` |
| `.pop(i)` | 删除指定索引并返回 | `fruits.pop(0)` |
| `.pop()` | 删除末尾并返回 | `fruits.pop()` |
| `.clear()` | 清空列表 | `fruits.clear()` |

```python
fruits = ["苹果", "香蕉", "橘子", "葡萄"]

# remove：按值删除（删除第一个匹配的）
fruits.remove("香蕉")
print(fruits)  # ["苹果", "橘子", "葡萄"]

# pop()：删除末尾并返回被删除的元素
last = fruits.pop()
print(fruits)    # ["苹果", "橘子"]
print(f"删除了：{last}")  # 删除了：葡萄

# pop(索引)：按索引删除
first = fruits.pop(0)
print(fruits)    # ["橘子"]
print(f"删除了：{first}")  # 删除了：苹果
```

**改（修改元素）**：

```python
fruits = ["苹果", "香蕉", "橘子"]

# 通过索引修改
fruits[0] = "芒果"
print(fruits)  # ["芒果", "香蕉", "橘子"]

# 批量修改（切片）
fruits[1:3] = ["西瓜", "榴莲"]
print(fruits)  # ["芒果", "西瓜", "榴莲"]
```

**查（查询元素）**：

```python
fruits = ["苹果", "香蕉", "橘子", "葡萄"]

# 索引访问（从0开始）
print(fruits[0])   # "苹果"（第一个）
print(fruits[1])   # "香蕉"（第二个）
print(fruits[-1])  # "葡萄"（最后一个）
print(fruits[-2])  # "橘子"（倒数第二个）

# 获取长度
print(len(fruits))  # 4

# 判断元素是否存在
print("苹果" in fruits)   # True
print("西瓜" in fruits)   # False

# 查找元素位置
print(fruits.index("橘子"))  # 2（索引位置）

# 统计元素出现次数
fruits = ["苹果", "香蕉", "苹果", "苹果"]
print(fruits.count("苹果"))  # 3
```

### 2.4 切片：批量取数据

**什么是切片？**

切片是 Python 最强大的功能之一，一行代码提取数据片段。

**语法**：`list[start:end:step]`

| 参数 | 说明 | 默认值 |
|-----|------|--------|
| start | 起始索引（包含） | 0 |
| end | 结束索引（不包含） | 列表末尾 |
| step | 步长 | 1 |

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基础切片
print(numbers[2:5])   # [2, 3, 4]  从索引2到4
print(numbers[:5])    # [0,1,2,3,4] 前5个
print(numbers[5:])    # [5,6,7,8,9] 从第5个到最后
print(numbers[:])     # 整个列表（复制）

# 步长切片
print(numbers[::2])   # [0,2,4,6,8] 每隔1个取1个
print(numbers[1::2])  # [1,3,5,7,9] 从索引1开始，隔1取1
print(numbers[::3])   # [0,3,6,9]   每隔2个取1个

# 负数索引
print(numbers[-3:])   # [7,8,9]     最后3个
print(numbers[:-3])   # [0,1,2,3,4,5,6] 除了最后3个

# 倒序（常用技巧）
print(numbers[::-1])  # [9,8,7,6,5,4,3,2,1,0]
```

**实际应用场景**：

```python
# 场景1：取销售数据前10名
sales = [120, 150, 98, 200, 180, 95, 110, 160, 140, 130]
top5 = sales[:5]  # 前5条

# 场景2：取最近7天数据
daily_revenue = [1000, 1200, 980, 1100, 1050, 1300, 1150]
last_7 = daily_revenue[-7:]  # 最后7条

# 场景3：数据倒序（从新到旧）
records = ["记录1", "记录2", "记录3"]
newest_first = records[::-1]
```

### 2.5 列表推导式

**什么是推导式？**

用一行代码创建新列表，比 for 循环简洁 10 倍。

**语法**：`[表达式 for 变量 in 可迭代对象 if 条件]`

```python
# 传统写法（5行）
squares = []
for i in range(1, 11):
    squares.append(i ** 2)

# 推导式写法（1行）
squares = [i ** 2 for i in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 带条件筛选
evens = [i for i in range(20) if i % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 处理字符串
names = ["alice", "bob", "charlie"]
capitalized = [name.title() for name in names]
print(capitalized)  # ["Alice", "Bob", "Charlie"]

# 提取字典列表中的字段
employees = [
    {"name": "张三", "salary": 12000},
    {"name": "李四", "salary": 18000},
]
names = [emp["name"] for emp in employees]
print(names)  # ["张三", "李四"]

# 带条件筛选 + 提取
high_salary = [emp["name"] for emp in employees if emp["salary"] > 15000]
print(high_salary)  # ["李四"]
```

### 2.6 新手常见错误

```python
fruits = ["苹果", "香蕉", "橘子"]

# ❌ 错误1：索引越界
print(fruits[3])  # IndexError
# 正确：索引从0开始，长度3最大索引是2

# ❌ 错误2：删除不存在的元素
fruits.remove("西瓜")  # ValueError
# 正确：先检查 if "西瓜" in fruits

# ❌ 错误3：遍历时删除元素
for fruit in fruits:
    if fruit == "香蕉":
        fruits.remove(fruit)  # 可能漏掉元素
# 正确：用推导式 fruits = [f for f in fruits if f != "香蕉"]
```

---

## 三、元组（tuple）

### 3.1 什么是元组？

**定义**：元组是**有序、不可变**的数据容器。

**专业术语**：
- **不可变（Immutable）**：创建后不能修改、添加、删除元素
- **可哈希（Hashable）**：可以作为字典的键（列表不行）

**为什么需要元组？**

| 优势 | 说明 |
|-----|------|
| 安全 | 防止数据被意外修改 |
| 性能 | 比列表更快 |
| 可哈希 | 能做字典的键 |

### 3.2 创建和使用元组

```python
# 创建元组（用小括号）
coordinates = (39.9, 116.4)  # 北京经纬度
rgb = (255, 128, 0)          # 橙色RGB值
config = ("localhost", 8080) # 服务器配置

# 单元素元组（必须加逗号）
single = (42,)   # 是元组
not_tuple = (42) # 不是元组，就是数字42

# 访问元素（和列表一样）
print(coordinates[0])  # 39.9
print(coordinates[-1]) # 116.4

# ❌ 不能修改！
# coordinates[0] = 40.0  # TypeError

# 可以重新赋值（创建新元组）
coordinates = (40.0, 117.0)
```

### 3.3 元组解包

**什么是解包？** 把元组的元素拆成多个变量。

```python
# 基本解包
coordinates = (39.9, 116.4)
lat, lon = coordinates
print(f"纬度：{lat}，经度：{lon}")

# 函数返回多个值
def get_user_info():
    return "张三", 25  # 返回元组

name, age = get_user_info()
print(f"姓名：{name}，年龄：{age}")

# 交换变量（面试常考）
a, b = 1, 2
a, b = b, a  # 一行交换
print(a, b)  # 2, 1
```

### 3.4 元组 vs 列表对比

| 特性 | 列表 | 元组 |
|-----|------|------|
| 可变性 | ✅ 可变 | ❌ 不可变 |
| 性能 | 较慢 | 较快 |
| 可哈希 | ❌ 不能做键 | ✅ 可以做键 |
| 适用场景 | 需要增删改 | 固定数据 |

**什么时候用元组？**

```python
# 固定不变的数据
DAYS = ("周一", "周二", "周三", "周四", "周五", "周六", "周日")

# 坐标、颜色值等固定数据
RGB_RED = (255, 0, 0)
RGB_GREEN = (0, 255, 0)

# 作为字典的键
locations = {
    (39.9, 116.4): "北京",
    (31.2, 121.5): "上海",
}
```

---

## 四、字典（dict）

### 4.1 什么是字典？

**定义**：字典是**键值对映射**的容器，用"键"找"值"。

**专业术语**：
- **键（Key）**：唯一标识，相当于"名字"
- **值（Value）**：对应的数据，相当于"号码"
- **键值对（Key-Value Pair）**：一个键和一个值的组合

**为什么字典重要？**

| 优势 | 说明 |
|-----|------|
| 查找快 | O(1) 时间复杂度，瞬间找到 |
| 最常用 | JSON 数据就是字典格式 |
| 灵活 | 键可以是字符串、数字、元组 |

### 4.2 创建字典

```python
# 创建字典
employee = {
    "name": "小明",
    "age": 25,
    "salary": 15000,
    "department": "数据分析"
}

# 空字典
empty = {}
empty = dict()

# 从列表创建
keys = ["name", "age"]
values = ["张三", 25]
d = dict(zip(keys, values))
```

### 4.3 增删改查操作

**查（获取值）**：

```python
employee = {"name": "小明", "salary": 15000}

# 方式1：用[]访问
print(employee["name"])  # "小明"

# 方式2：用get方法（推荐）
print(employee.get("salary"))  # 15000

# get的优势：键不存在时返回None，不报错
print(employee.get("bonus"))     # None
print(employee.get("bonus", 0))  # 0（设置默认值）

# ❌ 键不存在会报错
# print(employee["bonus"])  # KeyError
```

**改（修改值）**：

```python
employee = {"name": "小明", "salary": 15000}

# 修改现有键
employee["salary"] = 18000
print(employee["salary"])  # 18000

# 批量更新
employee.update({"age": 25, "level": "P6"})
print(employee)
```

**增（添加新键值对）**：

```python
employee = {"name": "小明"}

# 添加新键
employee["age"] = 25
employee["email"] = "xiaoming@company.com"
print(employee)
```

**删（删除键值对）**：

```python
employee = {"name": "小明", "age": 25, "salary": 15000}

# 删除指定键
del employee["age"]

# 删除并返回值
removed = employee.pop("salary")
print(f"删除了：{removed}")

# 清空字典
employee.clear()
```

### 4.4 遍历字典

```python
employee = {
    "name": "小明",
    "salary": 18000,
    "department": "数据分析"
}

# 方式1：遍历键值对（推荐）
for key, value in employee.items():
    print(f"{key}：{value}")

# 方式2：遍历键
for key in employee.keys():
    print(key)

# 方式3：遍历值
for value in employee.values():
    print(value)
```

### 4.5 字典推导式

```python
# 薪资单位转换
salaries = {"小明": 15000, "小红": 20000, "小刚": 18000}

# 转换为千元单位
salaries_k = {name: sal // 1000 for name, sal in salaries.items()}
print(salaries_k)  # {"小明": 15, "小红": 20, "小刚": 18}

# 篮选高薪
high_salary = {name: sal for name, sal in salaries.items() if sal > 15000}
print(high_salary)  # {"小红": 20000, "小刚": 18000}
```

### 4.6 新手常见错误

```python
employee = {"name": "小明"}

# ❌ 错误1：直接访问不存在的键
# print(employee["bonus"])  # KeyError

# ✅ 正确：用get方法
bonus = employee.get("bonus", 0)

# ❌ 错误2：遍历时修改字典
for key in employee:
    del employee[key]  # RuntimeError

# ✅ 正确：先收集要删除的键
keys_to_delete = list(employee.keys())
for key in keys_to_delete:
    del employee[key]
```

---

## 五、集合（set）

### 5.1 什么是集合？

**定义**：集合是**无序、不重复**元素的容器。

**专业术语**：
- **无序（Unordered）**：元素没有固定位置
- **不重复（Unique）**：自动去除重复元素
- **不可索引**：不能用 `[0]` 访问

**为什么需要集合？**

| 优势 | 说明 |
|-----|------|
| 去重快 | 一行代码去重 |
| 集合运算 | 交集、并集、差集 |
| 成员测试 | 判断元素存在比列表快 |

### 5.2 创建和基本操作

```python
# 创建集合（用大括号，但不是字典）
skills = {"Python", "SQL", "Excel"}
print(skills)

# 从列表去重
raw = ["Python", "Python", "SQL", "Excel", "SQL"]
unique = set(raw)
print(unique)  # {"Python", "SQL", "Excel"}

# 转回列表
unique_list = list(set(raw))

# ❌ 空集合不能用 {}（那是空字典）
empty_dict = {}     # 这是字典
empty_set = set()   # 这是集合
```

### 5.3 集合运算

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# 交集：两个都有的
print(a & b)          # {3, 4}
print(a.intersection(b))  # 同上

# 并集：两个所有的
print(a | b)          # {1, 2, 3, 4, 5, 6}
print(a.union(b))     # 同上

# 差集：a有但b没有的
print(a - b)          # {1, 2}
print(a.difference(b))    # 同上

# 对称差集：只在其中一个的
print(a ^ b)          # {1, 2, 5, 6}
```

### 5.4 实际应用场景

```python
# 场景1：找出重复用户
batch1 = ["user1", "user2", "user3"]
batch2 = ["user3", "user4", "user5"]
duplicates = set(batch1) & set(batch2)
print(duplicates)  # {"user3"}

# 场景2：合并去重
all_users = set(batch1) | set(batch2)
print(all_users)  # {"user1", "user2", "user3", "user4", "user5"}

# 场景3：统计唯一值数量
sales = [
    {"product": "iPhone"},
    {"product": "iPad"},
    {"product": "iPhone"},
]
products = {s["product"] for s in sales}
print(f"共{len(products)}种产品")  # 共2种产品
```

---

## 六、实战案例：门店销售统计

### 6.1 场景背景

你是某连锁店的数据分析师，老板需要一份销售报表。

**需求**：
1. 统计有几个门店
2. 计算每个门店总营收
3. 找出最佳门店和最佳日期

**为什么这个案例重要？**
- 综合运用列表、字典、集合
- 模拟真实数据分析流程
- 为学 Pandas 打基础

### 6.2 完整代码

```python
# ========================================
# 案例：门店销售数据统计
# ========================================

# 原始数据
store_sales = [
    {"store": "朝阳店", "day": "周一", "revenue": 12000},
    {"store": "朝阳店", "day": "周二", "revenue": 11500},
    {"store": "朝阳店", "day": "周三", "revenue": 13000},
    {"store": "海淀店", "day": "周一", "revenue": 9800},
    {"store": "海淀店", "day": "周二", "revenue": 10200},
    {"store": "海淀店", "day": "周三", "revenue": 11000},
    {"store": "西城店", "day": "周一", "revenue": 8500},
    {"store": "西城店", "day": "周二", "revenue": 8900},
    {"store": "西城店", "day": "周三", "revenue": 9200},
]

# 任务1：提取门店名（去重）
stores = list({s["store"] for s in store_sales})
print(f"门店列表：{stores}")

# 任务2：计算每店总营收
print("\n门店营收统计：")
for store in stores:
    revenues = [s["revenue"] for s in store_sales 
                if s["store"] == store]
    total = sum(revenues)
    avg = total / len(revenues)
    print(f"  {store}：总计{total}元，日均{avg:.0f}元")

# 任务3：按天汇总
daily_totals = {}
for s in store_sales:
    day = s["day"]
    daily_totals[day] = daily_totals.get(day, 0) + s["revenue"]

print("\n每日营收：")
for day, total in sorted(daily_totals.items(), 
                          key=lambda x: x[1], 
                          reverse=True):
    print(f"  {day}：{total}元")

# 任务4：最佳表现
store_totals = {}
for s in store_sales:
    store = s["store"]
    store_totals[store] = store_totals.get(store, 0) + s["revenue"]

best_store = max(store_totals.items(), key=lambda x: x[1])
best_day = max(daily_totals.items(), key=lambda x: x[1])

print("\n最佳表现：")
print(f"  最佳门店：{best_store[0]}（{best_store[1]}元）")
print(f"  最佳日期：{best_day[0]}（{best_day[1]}元）")
```

### 6.3 运行结果

```
门店列表：['朝阳店', '海淀店', '西城店']

门店营收统计：
  朝阳店：总计36500元，日均12167元
  海淀店：总计31000元，日均10333元
  西城店：总计26600元，日均8867元

每日营收：
  周三：33200元
  周一：30300元
  周二：30600元

最佳表现：
  最佳门店：朝阳店（36500元）
  最佳日期：周三（33200元）
```

### 6.4 知识点总结

| 操作 | 用到的知识点 |
|-----|-------------|
| 去重门店名 | 集合推导式 |
| 篩选门店数据 | 列表推导式 + 条件 |
| 按天汇总 | 字典累加 |
| 排序 | sorted + lambda |
| 找最大值 | max + lambda |

---

## 七、总结

### 本章学到了什么？

| 容器 | 特点 | 适用场景 |
|-----|------|---------|
| 列表 | 有序可变 | 需要增删改的数据 |
| 元组 | 有序不可变 | 固定数据 |
| 字典 | 键值对映射 | 快速查找 |
| 集合 | 无序不重复 | 去重、集合运算 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| `fruits[3]` 越界 | 最大索引是 `len-1` |
| `employee["bonus"]` 报错 | 用 `employee.get("bonus", 0)` |
| `my_set[0]` 不支持索引 | 集合无序，转列表后再索引 |
| `for x in list: list.remove(x)` | 用推导式或先收集再删除 |

### 下一步学习

```
数据容器掌握 ✅
      ↓
下一章：流程控制
├── 条件判断（if/elif/else）
├── 循环（for/while）
└── 循环控制（break/continue）
```

---

> 恭喜你掌握了 Python 四种数据容器！现在你已经能处理各种数据结构了，下一章学习流程控制，让程序有逻辑地执行。