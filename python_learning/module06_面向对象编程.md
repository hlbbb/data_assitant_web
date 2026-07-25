# Python 面向对象编程 —— 代码组织的艺术

> 这篇文章带你掌握 Python 面向对象编程，学会用类和对象组织代码。

**学完这章你能干啥？**
- 会定义类和创建对象
- 理解 `__init__` 构造函数
- 会用继承复用代码
- 会用 `@property` 封装属性

---

## 一、什么是面向对象？

### 1.1 用生活类比理解

**类与对象就像"图纸与房子"**：

```
类（Class）= 图纸
├── 定义：房子的结构、尺寸、材料
├── 属性：面积、房间数、地址
└── 方法：开门、关窗、装修

对象（Object）= 按图纸造的房子
├── 是类的实例
├── 每个对象有独立的数据
└── 可以有多个对象（多套房子）
```

### 1.2 为什么需要面向对象？

| 没有类 | 有类 |
|-------|------|
| 散装变量，难管理 | 数据打包，结构清晰 |
| 代码重复，难维护 | 继承复用，一处修改 |
| 全局函数，易冲突 | 方法封装，职责明确 |

### 1.3 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 类 | Class | 对象的模板/蓝图 |
| 对象 | Object | 类的实例 |
| 属性 | Attribute | 对象的数据（变量） |
| 方法 | Method | 对象的行为（函数） |
| 构造函数 | Constructor | 创建对象时调用的方法 |
| 继承 | Inheritance | 子类继承父类的属性和方法 |

---

## 二、定义类和创建对象

### 2.1 基本语法

```python
class 类名:
    def __init__(self, 参数):
        self.属性 = 参数
    
    def 方法名(self):
        # 方法体
        pass
```

### 2.2 第一个类

```python
# ========================================
# 案例：销售员类
# ========================================

class Salesperson:
    """销售员类 —— 管理销售员信息"""
    
    def __init__(self, name, emp_id, sales):
        """构造函数：初始化属性"""
        self.name = name       # 姓名
        self.emp_id = emp_id   # 工号
        self.sales = sales     # 销售额
    
    def calculate_commission(self, rate=0.05):
        """计算提成"""
        return self.sales * rate
    
    def get_info(self):
        """获取信息"""
        commission = self.calculate_commission()
        return f"{self.name}({self.emp_id}): 销售额{self.sales}元, 提成{commission:.0f}元"

# 创建对象
sp1 = Salesperson("张三", "S001", 50000)
sp2 = Salesperson("李四", "S002", 60000)

# 调用方法
print(sp1.get_info())
print(sp2.get_info())

# 访问属性
print(f"\n{sp1.name}的销售额：{sp1.sales}元")
```

**运行结果**：

```
张三(S001): 销售额50000元, 提成2500元
李四(S002): 销售额60000元, 提成3000元

张三的销售额：50000元
```

### 2.3 self 参数详解

**self 是什么？**

- `self` 指向当前对象本身
- 调用方法时，Python 自动传入 `self`
- 通过 `self` 访问对象的属性和方法

```python
class Demo:
    def __init__(self, value):
        self.value = value  # self.value 是对象的属性
    
    def show(self):
        print(self.value)   # 通过 self 访问属性

d = Demo(100)
d.show()  # 输出: 100

# 底层原理：
# d.show() 实际执行的是 Demo.show(d)
# Python 自动把 d 传给 self
```

### 2.4 类命名规范

| 类型 | 命名风格 | 示例 |
|-----|---------|------|
| 类名 | 大驼峰（PascalCase） | `Salesperson`、`DataAnalyzer` |
| 对象名 | 小写下划线 | `salesperson`、`analyzer` |
| 属性名 | 小写下划线 | `emp_id`、`sales_data` |
| 方法名 | 小写下划线 | `calculate_commission`、`get_info` |

---

## 三、构造函数 `__init__`

### 3.1 什么是构造函数？

**定义**：创建对象时自动调用的方法，用于初始化属性。

**专业术语**：`__init__` 是 Python 的**魔术方法（Magic Method）**，也叫**特殊方法**。

### 3.2 基本用法

```python
class Report:
    """报表类"""
    
    def __init__(self, name, data_source):
        # 必需参数
        self.name = name
        self.data_source = data_source
        # 自动生成的属性
        self.created_at = "2024-01-15"
        self.status = "待生成"

# 创建对象时必须传参数
r = Report("月度销售报表", "sales.csv")
print(f"报表名：{r.name}")
print(f"数据源：{r.data_source}")
print(f"状态：{r.status}")
```

### 3.3 带默认值的构造函数

```python
class Employee:
    """员工类"""
    
    def __init__(self, name, salary, dept="技术部"):
        self.name = name
        self.salary = salary
        self.dept = dept  # 有默认值

# 使用默认值
e1 = Employee("张三", 15000)
print(f"{e1.name} - {e1.dept}")  # 张三 - 技术部

# 自定义部门
e2 = Employee("李四", 18000, "市场部")
print(f"{e2.name} - {e2.dept}")  # 李四 - 市场部
```

### 3.4 魔术方法速查

| 方法 | 触发时机 | 用途 |
|-----|---------|------|
| `__init__` | 创建对象时 | 初始化属性 |
| `__str__` | `print(对象)` | 返回可读字符串 |
| `__repr__` | 交互环境显示 | 返回正式字符串 |
| `__len__` | `len(对象)` | 返回长度 |
| `__eq__` | `对象1 == 对象2` | 判断相等 |

### 3.5 `__str__` 方法示例

```python
class Product:
    """商品类"""
    
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __str__(self):
        """print(对象) 时自动调用"""
        return f"商品：{self.name}，价格：{self.price}元"
    
    def __len__(self):
        """len(对象) 时调用"""
        return len(self.name)

p = Product("iPhone", 6999)
print(p)        # 商品：iPhone，价格：6999元
print(len(p))   # 6
```

---

## 四、继承

### 4.1 什么是继承？

**定义**：子类继承父类的属性和方法，可以扩展或覆盖。

**用生活类比理解**：

```
继承 = 儿子继承老爸的财产
├── 老爸有的，儿子都有
├── 儿子可以有自己新的东西
└── 儿子可以改变老爸的做法
```

### 4.2 基本语法

```python
class 父类:
    # 父类的属性和方法
    pass

class 子类(父类):
    # 继承父类，可以扩展或覆盖
    pass
```

### 4.3 继承示例

```python
# ========================================
# 案例：员工与经理
# ========================================

class Employee:
    """员工基类"""
    
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    
    def get_info(self):
        return f"{self.name}，薪资：{self.salary}元"
    
    def calculate_bonus(self):
        """奖金：基本薪资的10%"""
        return self.salary * 0.1

class Manager(Employee):
    """经理类 —— 继承员工类"""
    
    def __init__(self, name, salary, team_size):
        # 调用父类的构造函数
        super().__init__(name, salary)
        self.team_size = team_size  # 子类特有属性
    
    def get_info(self):
        # 调用父类方法并扩展
        base_info = super().get_info()
        return f"{base_info}，团队人数：{self.team_size}"
    
    def calculate_bonus(self):
        """覆盖父类方法：经理奖金更高"""
        return self.salary * 0.2  # 20%

# 创建对象
e = Employee("张三", 15000)
m = Manager("李经理", 30000, 8)

print(e.get_info())
print(f"员工奖金：{e.calculate_bonus():.0f}元")

print(m.get_info())
print(f"经理奖金：{m.calculate_bonus():.0f}元")
```

**运行结果**：

```
张三，薪资：15000元
员工奖金：1500元
李经理，薪资：30000元，团队人数：8
经理奖金：6000元
```

### 4.4 super() 函数

**作用**：调用父类的方法。

```python
class Child(Parent):
    def __init__(self, 参数):
        super().__init__(父类参数)  # 调用父类构造函数
        # 子类特有的初始化
```

### 4.5 继承的好处

| 好处 | 说明 |
|-----|------|
| 代码复用 | 父类方法子类直接用 |
| 统一接口 | 子类有相同的方法名 |
| 易于扩展 | 新功能在子类中添加 |

---

## 五、封装与 @property

### 5.1 什么是封装？

**定义**：隐藏内部实现细节，只暴露必要的接口。

**用生活类比理解**：

```
封装 = 汽车的内部结构
├── 驾驶员只需知道：油门、刹车、方向盘
├── 不需要知道：发动机怎么工作、变速箱原理
└── 好处：简单安全，不会误操作
```

### 5.2 私有属性

**约定**：以 `_` 开头的属性是"私有"的，外部不应该直接访问。

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # _开头，约定私有

account = BankAccount(1000)
print(account._balance)  # 技术上可以访问，但约定不这样做
```

### 5.3 @property 装饰器

**作用**：让方法像属性一样访问，可以添加校验逻辑。

```python
# ========================================
# 案例：银行账户
# ========================================

class BankAccount:
    """银行账户类"""
    
    def __init__(self, balance):
        self._balance = balance
    
    @property
    def balance(self):
        """查询余额（只读）"""
        return self._balance
    
    @balance.setter
    def balance(self, value):
        """设置余额（带校验）"""
        if value < 0:
            raise ValueError("余额不能为负数")
        self._balance = value
    
    def deposit(self, amount):
        """存款"""
        if amount <= 0:
            raise ValueError("存款金额必须大于0")
        self._balance += amount
        return self._balance
    
    def withdraw(self, amount):
        """取款"""
        if amount <= 0:
            raise ValueError("取款金额必须大于0")
        if amount > self._balance:
            raise ValueError("余额不足")
        self._balance -= amount
        return self._balance

# 使用
account = BankAccount(1000)
print(f"余额：{account.balance}")  # 调用 @property

account.deposit(500)
print(f"存款后：{account.balance}")

account.withdraw(300)
print(f"取款后：{account.balance}")

# 尝试设置负数
try:
    account.balance = -100
except ValueError as e:
    print(f"错误：{e}")
```

**运行结果**：

```
余额：1000
存款后：1500
取款后：1200
错误：余额不能为负数
```

### 5.4 只读属性

```python
class Circle:
    """圆形类"""
    
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """半径（只读）"""
        return self._radius
    
    @property
    def area(self):
        """面积（计算属性）"""
        import math
        return math.pi * self._radius ** 2
    
    @property
    def perimeter(self):
        """周长（计算属性）"""
        import math
        return 2 * math.pi * self._radius

c = Circle(5)
print(f"半径：{c.radius}")
print(f"面积：{c.area:.2f}")
print(f"周长：{c.perimeter:.2f}")

# 只读，不能设置
# c.radius = 10  # 报错：AttributeError
```

---

## 六、实战案例：数据分析器

### 6.1 场景背景

创建一个数据分析器类，能够加载销售数据并进行统计分析。

### 6.2 完整代码

```python
# ========================================
# 案例：销售数据分析器
# ========================================

class SalesAnalyzer:
    """销售数据分析器"""
    
    def __init__(self, data):
        """
        初始化分析器
        
        参数：
            data: 销售数据列表，每项包含 name、amount、region
        """
        self._data = data
        self._total = None  # 缓存
    
    @property
    def data(self):
        """数据（只读）"""
        return self._data
    
    @property
    def total(self):
        """总销售额（懒加载）"""
        if self._total is None:
            self._total = sum(item["amount"] for item in self._data)
        return self._total
    
    @property
    def count(self):
        """记录数"""
        return len(self._data)
    
    @property
    def average(self):
        """平均销售额"""
        return self.total / self.count if self.count > 0 else 0
    
    def get_by_region(self):
        """按区域统计"""
        result = {}
        for item in self._data:
            region = item["region"]
            result[region] = result.get(region, 0) + item["amount"]
        return result
    
    def get_top_sales(self, n=3):
        """获取销售额前N名"""
        sorted_data = sorted(self._data, key=lambda x: x["amount"], reverse=True)
        return sorted_data[:n]
    
    def __str__(self):
        return f"SalesAnalyzer(记录数: {self.count}, 总额: {self.total:.0f}元)"

# 测试数据
sales_data = [
    {"name": "张三", "amount": 50000, "region": "华东"},
    {"name": "李四", "amount": 60000, "region": "华东"},
    {"name": "王五", "amount": 45000, "region": "华南"},
    {"name": "赵六", "amount": 70000, "region": "华南"},
    {"name": "钱七", "amount": 55000, "region": "华北"},
]

# 创建分析器
analyzer = SalesAnalyzer(sales_data)

# 使用
print(analyzer)
print(f"\n总销售额：{analyzer.total:.0f}元")
print(f"平均销售额：{analyzer.average:.0f}元")

print("\n按区域统计：")
for region, amount in analyzer.get_by_region().items():
    print(f"  {region}：{amount:.0f}元")

print("\n销售额前3名：")
for i, item in enumerate(analyzer.get_top_sales(3), 1):
    print(f"  {i}. {item['name']}：{item['amount']:.0f}元")
```

**运行结果**：

```
SalesAnalyzer(记录数: 5, 总额: 280000元)

总销售额：280000元
平均销售额：56000元

按区域统计：
  华东：110000元
  华南：115000元
  华北：55000元

销售额前3名：
  1. 赵六：70000元
  2. 李四：60000元
  3. 钱七：55000元
```

---

## 七、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 类与对象 | 类是模板，对象是实例 |
| `__init__` | 构造函数，初始化属性 |
| self | 指向当前对象，访问属性和方法 |
| 继承 | 子类继承父类，用 `super()` 调用父类方法 |
| 封装 | 隐藏细节，用 `@property` 控制访问 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| 忘了写 `self.` | 属性访问用 `self.属性名` |
| 类名用小写 | 类名用大驼峰 `ClassName` |
| 子类不调用 `super().__init__()` | 子类构造函数要调用父类 |
| 滥用 `@property` | 需要校验或计算时才用 |

---

> 恭喜你掌握了 Python 面向对象编程！现在你已经学会用类组织代码了。
