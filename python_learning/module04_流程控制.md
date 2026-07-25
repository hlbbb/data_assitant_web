# Python 流程控制 —— 让代码会思考

> 这篇文章带你掌握 Python 的条件判断和循环，让程序能够根据条件做出决策。

**学完这章你能干啥？**
- 会用 if/elif/else 做条件判断
- 会用 for 循环批量处理数据
- 会用 while 循环处理条件循环
- 会用 break/continue 控制循环流程

---

## 一、什么是流程控制？

### 1.1 用生活类比理解

**没有流程控制**：代码像流水线，从头执行到尾，不会变通。

**有了流程控制**：代码像有脑子的人，能判断、能重复、能跳过。

```
生活中的流程控制：

条件判断（if）：
├── 如果下雨 → 带伞
├── 如果晴天 → 戴墨镜
└── 否则 → 正常出门

循环（for/while）：
├── 批量处理 → 每封邮件都回复
└── 条件循环 → 直到找到钥匙才停止
```

### 1.2 流程控制的三种结构

| 结构 | 作用 | 生活类比 |
|-----|------|---------|
| 顺序结构 | 从上到下依次执行 | 按菜谱一步步做菜 |
| 分支结构 | 根据条件选择执行 | 看天气决定穿什么 |
| 循环结构 | 重复执行某段代码 | 每天重复闹钟 |

---

## 二、条件判断（if/elif/else）

### 2.1 什么是条件判断？

**定义**：根据条件真假，决定执行哪段代码。

**专业术语**：
- **条件表达式**：结果为 True 或 False 的表达式
- **代码块**：缩进相同的一组语句
- **分支**：不同条件对应的执行路径

### 2.2 基本语法

```python
if 条件1:
    代码块1      # 条件1为True时执行
elif 条件2:
    代码块2      # 条件2为True时执行
else:
    代码块3      # 以上条件都为False时执行
```

**语法要点**：

| 要点 | 说明 |
|-----|------|
| 冒号 | if/elif/else 后必须有冒号 |
| 缩进 | 代码块必须缩进（4个空格） |
| elif | else if 的缩写，可以有多个 |
| else | 可选，放在最后 |

### 2.3 单分支（if）

```python
# 场景：判断是否成年
age = 20

if age >= 18:
    print("已成年，可以进入网吧")
```

### 2.4 双分支（if-else）

```python
# 场景：判断及格与否
score = 75

if score >= 60:
    print("及格了！")
else:
    print("不及格，要补考")
```

### 2.5 多分支（if-elif-else）

```python
# ========================================
# 案例：薪资等级判断
# ========================================

salary = 18000

if salary >= 20000:
    level = "高薪"
    bonus_rate = 0.2
elif salary >= 15000:
    level = "中等"
    bonus_rate = 0.15
elif salary >= 10000:
    level = "入门"
    bonus_rate = 0.1
else:
    level = "偏低"
    bonus_rate = 0.05

bonus = salary * bonus_rate
print(f"薪资：{salary}元")
print(f"等级：{level}")
print(f"奖金比例：{bonus_rate:.0%}")
print(f"预计奖金：{bonus:.0f}元")
```

**运行结果**：

```
薪资：18000元
等级：中等
奖金比例：15%
预计奖金：2700元
```

### 2.6 条件判断的执行顺序

**重要原则**：从上到下，满足一个就停止，后面的不再判断。

```python
# ❌ 错误：条件顺序错误
salary = 18000
if salary >= 10000:      # 这个条件先满足
    level = "入门"        # 结果是"入门"，不是"中等"
elif salary >= 15000:    # 永远不会执行
    level = "中等"

# ✅ 正确：从大到小判断
if salary >= 20000:
    level = "高薪"
elif salary >= 15000:    # 先判断大的
    level = "中等"
elif salary >= 10000:    # 再判断小的
    level = "入门"
```

### 2.7 逻辑运算符组合条件

```python
# and：两个条件都满足
age = 25
salary = 18000
if age >= 20 and salary >= 15000:
    print("符合条件")

# or：满足一个条件即可
has_experience = False
has_certificate = True
if has_experience or has_certificate:
    print("可以应聘")

# not：取反
is_student = False
if not is_student:
    print("不是学生")

# 组合使用
age = 25
salary = 18000
city = "北京"
if age >= 20 and age <= 30 and salary >= 15000:
    print("目标用户")

# 更清晰的写法
if 20 <= age <= 30 and salary >= 15000:
    print("目标用户")
```

### 2.8 新手常见错误

```python
# ❌ 错误1：忘记冒号
if salary > 10000  # SyntaxError
    print("高薪")

# ❌ 错误2：缩进错误
if salary > 10000:
print("高薪")  # IndentationError

# ✅ 正确：4个空格缩进
if salary > 10000:
    print("高薪")

# ❌ 错误3：用 = 做比较
if salary = 18000:  # 这是赋值！
    print("匹配")

# ✅ 正确：用 == 做比较
if salary == 18000:
    print("匹配")

# ❌ 错误4：条件顺序错误
# 应该从大到小判断，而不是从小到大
```

---

## 三、for 循环

### 3.1 什么是 for 循环？

**定义**：遍历可迭代对象，对每个元素执行相同操作。

**专业术语**：
- **可迭代对象（Iterable）**：可以遍历的对象（列表、字典、字符串等）
- **遍历（Iterate）**：逐个访问每个元素
- **循环体**：每次循环执行的代码块

### 3.2 基本语法

```python
for 变量 in 可迭代对象:
    循环体
```

### 3.3 遍历不同类型

**遍历列表**：

```python
fruits = ["苹果", "香蕉", "橘子"]

for fruit in fruits:
    print(f"我喜欢吃{fruit}")
```

**遍历字典**：

```python
employee = {"name": "小明", "age": 25, "salary": 15000}

# 遍历键值对（推荐）
for key, value in employee.items():
    print(f"{key}：{value}")

# 遍历键
for key in employee.keys():
    print(key)

# 遍历值
for value in employee.values():
    print(value)
```

**遍历字符串**：

```python
for char in "Python":
    print(char)
```

**遍历数字范围（range）**：

```python
# range(stop)：从0到stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop)：从start到stop-1
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# range(start, stop, step)：步长
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
```

### 3.4 常用技巧

**enumerate：带索引遍历**

```python
fruits = ["苹果", "香蕉", "橘子"]

for index, fruit in enumerate(fruits):
    print(f"第{index + 1}个：{fruit}")

# 输出：
# 第1个：苹果
# 第2个：香蕉
# 第3个：橘子
```

**zip：同时遍历多个列表**

```python
names = ["张三", "李四", "王五"]
ages = [25, 30, 28]

for name, age in zip(names, ages):
    print(f"{name}：{age}岁")

# 输出：
# 张三：25岁
# 李四：30岁
# 王五：28岁
```

### 3.5 for + if 组合

```python
# ========================================
# 案例：筛选员工数据
# ========================================

employees = [
    {"name": "小明", "salary": 15000, "dept": "技术"},
    {"name": "小红", "salary": 22000, "dept": "技术"},
    {"name": "小刚", "salary": 8000, "dept": "市场"},
    {"name": "小丽", "salary": 18000, "dept": "市场"},
]

# 筛选薪资大于10000的员工
print("薪资达标员工：")
for emp in employees:
    if emp["salary"] > 10000:
        print(f"  {emp['name']}：{emp['salary']}元")

# 统计各部门人数
dept_count = {}
for emp in employees:
    dept = emp["dept"]
    if dept not in dept_count:
        dept_count[dept] = 0
    dept_count[dept] += 1

print("\n部门人数：")
for dept, count in dept_count.items():
    print(f"  {dept}：{count}人")
```

---

## 四、while 循环

### 4.1 什么是 while 循环？

**定义**：只要条件为 True，就一直循环。

**for vs while 对比**：

| 特性 | for 循环 | while 循环 |
|-----|---------|-----------|
| 循环次数 | 已知次数 | 未知次数 |
| 适用场景 | 遍历序列 | 条件循环 |
| 结束条件 | 遍历完 | 条件为 False |

### 4.2 基本语法

```python
while 条件:
    循环体
    更新条件  # 别忘了！否则会死循环
```

### 4.3 基本示例

```python
# 计数器
count = 0
while count < 5:
    print(f"第{count + 1}次循环")
    count += 1  # 更新条件
```

### 4.4 实际应用场景

**场景1：模拟存款消耗**

```python
# ========================================
# 案例：每月花掉存款的10%，多久花完？
# ========================================

savings = 100000  # 初始存款10万
months = 0        # 计数器
rate = 0.1        # 每月消耗10%

while savings > 1:  # 剩余超过1元就继续
    months += 1
    spent = savings * rate
    savings = savings * (1 - rate)
    
    if months % 10 == 0:
        print(f"第{months}个月：剩余{savings:.0f}元")

print(f"大约{months}个月后花完")
```

**场景2：用户输入验证**

```python
# 场景：要求用户输入有效数字
while True:
    user_input = input("请输入一个正数：")
    if user_input.isdigit() and int(user_input) > 0:
        number = int(user_input)
        break
    print("输入无效，请重试")

print(f"你输入的是：{number}")
```

### 4.5 新手常见错误

```python
# ❌ 错误1：死循环（忘记更新条件）
i = 0
while i < 5:
    print(i)  # i永远是0，死循环！

# ✅ 正确：更新条件
i = 0
while i < 5:
    print(i)
    i += 1  # 别忘了这个！

# ❌ 错误2：条件永远为True
while True:
    print("死循环")  # 永远不会停止

# ✅ 正确：加break退出
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break  # 退出循环
```

---

## 五、循环控制（break/continue）

### 5.1 break：直接退出循环

**作用**：遇到 break，立即退出整个循环。

```python
# 场景：找到第一个符合条件的就停止
numbers = [3, 7, 2, 9, 5, 1, 8]
target = 2

for num in numbers:
    print(f"检查：{num}")
    if num == target:
        print(f"找到了！{target}")
        break  # 找到就退出

print("循环结束")
```

**运行结果**：

```
检查：3
检查：7
检查：2
找到了！2
循环结束
```

### 5.2 continue：跳过本轮

**作用**：跳过本次循环，继续下一次。

```python
# 场景：只处理奇数，跳过偶数
print("1-10中的奇数：")
for num in range(1, 11):
    if num % 2 == 0:  # 偶数
        continue  # 跳过
    print(num)
```

**运行结果**：

```
1-10中的奇数：
1
3
5
7
9
```

### 5.3 break vs continue 对比

| 命令 | 作用 | 类比 |
|-----|------|------|
| break | 退出整个循环 | 跳出游戏 |
| continue | 跳过本轮，继续下一轮 | 跳过这一关 |

### 5.4 实际应用场景

```python
# 场景1：数据验证，遇到错误就停止
data = [
    {"id": 1, "value": 100},
    {"id": 2, "value": None},  # 错误数据
    {"id": 3, "value": 200},
]

for item in data:
    if item["value"] is None:
        print(f"错误：ID {item['id']} 的值为空")
        break  # 遇到错误就停止
    print(f"处理ID {item['id']}：{item['value']}")

# 场景2：跳过无效数据
data = [10, -5, 20, 0, 15, -3]
valid_sum = 0
for num in data:
    if num <= 0:  # 跳过非正数
        continue
    valid_sum += num
print(f"正数之和：{valid_sum}")  # 45
```

---

## 六、三元表达式

### 6.1 什么是三元表达式？

**定义**：一行代码完成简单的 if-else 判断。

**专业术语**：**三元运算符（Ternary Operator）**，也叫条件表达式。

### 6.2 语法

```python
值1 if 条件 else 值2
```

**执行逻辑**：条件为 True 返回值1，否则返回值2。

### 6.3 对比传统写法

```python
# 传统写法（4行）
age = 20
if age >= 18:
    status = "成年"
else:
    status = "未成年"

# 三元表达式（1行）
status = "成年" if age >= 18 else "未成年"
```

### 6.4 实际应用

```python
# 根据薪资判断等级
salary = 18000
level = "高薪" if salary >= 20000 else "普通"
print(level)  # 普通

# 处理缺失值
value = None
result = value if value is not None else 0
print(result)  # 0

# 在列表推导式中使用
salaries = [8000, 15000, 22000, 10000]
labels = ["高薪" if s >= 15000 else "普通" for s in salaries]
print(labels)  # ['普通', '高薪', '高薪', '普通']

# 根据条件选择不同操作
score = 75
result = "及格" if score >= 60 else "不及格"
```

### 6.5 新手常见错误

```python
# ❌ 错误：嵌套三元表达式，难以阅读
level = "高" if s >= 20000 else "中" if s >= 15000 else "低"
# 能运行但很难看懂

# ✅ 正确：复杂判断用 if-elif-else
if s >= 20000:
    level = "高"
elif s >= 15000:
    level = "中"
else:
    level = "低"
```

**最佳实践**：三元表达式只用于简单判断，复杂逻辑用 if-elif-else。

---

## 七、实战案例：员工考核评级系统

### 7.1 场景背景

HR 部门需要根据员工的业绩分和考勤分，计算综合分并评级。

**计算规则**：
- 综合分 = 业绩分 × 70% + 考勤分 × 30%
- 评级标准：A(≥90)、B(≥80)、C(≥70)、D(<70)

**为什么这个案例重要？**

| 知识点 | 应用 |
|-------|------|
| if-elif-else | 评级判断 |
| for 循环 | 批量处理员工 |
| 字典操作 | 数据存储和统计 |
| 三元表达式 | 格式化输出 |

### 7.2 完整代码

```python
# ========================================
# 案例：员工考核评级系统
# ========================================

# 原始数据
employees = [
    {"name": "张三", "score": 92, "attendance": 98},
    {"name": "李四", "score": 78, "attendance": 85},
    {"name": "王五", "score": 95, "attendance": 100},
    {"name": "赵六", "score": 60, "attendance": 70},
    {"name": "钱七", "score": 88, "attendance": 92},
]

print("=" * 50)
print("员工考核评级报告")
print("=" * 50)
print(f"{'姓名':<8}{'业绩分':<8}{'考勤分':<8}{'综合分':<8}{'等级'}")
print("-" * 50)

# 统计各等级人数
grade_count = {"A": 0, "B": 0, "C": 0, "D": 0}

for emp in employees:
    # 计算综合分
    total = emp["score"] * 0.7 + emp["attendance"] * 0.3
    
    # 评级（if-elif-else）
    if total >= 90:
        grade = "A"
    elif total >= 80:
        grade = "B"
    elif total >= 70:
        grade = "C"
    else:
        grade = "D"
    
    # 统计
    grade_count[grade] += 1
    
    # 输出
    print(f"{emp['name']:<8}{emp['score']:<8}{emp['attendance']:<8}{total:.1f}    {grade}")

print("-" * 50)

# 等级分布
print("\n【等级分布】")
for grade, count in grade_count.items():
    percentage = count / len(employees) * 100
    bar = "█" * count
    print(f"{grade}级：{count}人 ({percentage:.0f}%) {bar}")

# 最佳员工
best = max(employees, 
           key=lambda e: e["score"] * 0.7 + e["attendance"] * 0.3)
best_score = best["score"] * 0.7 + best["attendance"] * 0.3
print(f"\n【最佳员工】{best['name']}，综合分{best_score:.1f}")
```

### 7.3 运行结果

```
==================================================
员工考核评级报告
==================================================
姓名    业绩分  考勤分  综合分  等级
--------------------------------------------------
张三    92      98      93.8    A
李四    78      85      80.1    B
王五    95      100     96.5    A
赵六    60      70      63.0    D
钱七    88      92      89.2    B
--------------------------------------------------

【等级分布】
A级：2人 (40%) ██
B级：2人 (40%) ██
C级：0人 (0%) 
D级：1人 (20%) █

【最佳员工】王五，综合分96.5
```

### 7.4 知识点总结

| 知识点 | 应用场景 |
|-------|---------|
| for 循环 | 遍历所有员工 |
| if-elif-else | 评级判断 |
| 字典操作 | 统计等级人数 |
| max + lambda | 找最佳员工 |
| f-string | 格式化输出 |

---

## 八、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| if/elif/else | 条件判断，注意顺序和缩进 |
| for 循环 | 遍历序列，常用 range、enumerate、zip |
| while 循环 | 条件循环，注意更新条件避免死循环 |
| break/continue | break 退出循环，continue 跳过本轮 |
| 三元表达式 | 简单判断一行搞定 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| `if x = 5:` | `if x == 5:` |
| 忘记缩进 | 必须缩进 4 个空格 |
| 条件顺序错误 | 从大到小判断 |
| while 忘记更新条件 | 循环体内更新条件 |
| 嵌套三元表达式 | 复杂判断用 if-elif-else |

---

> 恭喜你掌握了 Python 流程控制！现在你已经能让代码根据条件做出判断和循环了，下一章学习函数，把重复代码封装起来复用。
