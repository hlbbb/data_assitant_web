# Python 模块与包 —— 代码复用的艺术

> 这篇文章带你掌握 Python 的模块和包，学会组织和管理代码。

**学完这章你能干啥？**
- 会用 import 导入模块
- 理解 `__name__ == '__main__'` 的作用
- 会创建自己的模块和包
- 掌握常用标准库

---

## 一、什么是模块？

### 1.1 用生活类比理解

**模块就像"工具箱"**：

```
工具箱（模块）：
├── 名称：toolbox.py
├── 工具（函数）：hammer()、screwdriver()、saw()
└── 使用方式：import toolbox，然后 toolbox.hammer()
```

**为什么需要模块？**

| 没有模块 | 有模块 |
|---------|--------|
| 代码都写在一个文件 | 功能分类，每个模块负责一类功能 |
| 代码冗长难维护 | 模块独立，易于维护 |
| 无法复用 | import 导入，到处可用 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 模块 | Module | 一个 .py 文件 |
| 包 | Package | 包含多个模块的目录 |
| 导入 | Import | 使用 import 关键字加载模块 |
| 标准库 | Standard Library | Python 自带的模块集合 |

---

## 二、import 语句

### 2.1 基本语法

```python
# 导入整个模块
import 模块名

# 导入模块中的特定函数
from 模块名 import 函数名

# 导入模块中的多个函数
from 模块名 import 函数1, 函数2

# 给模块起别名
import 模块名 as 别名

# 给函数起别名
from 模块名 import 函数名 as 别名
```

### 2.2 导入方式对比

```python
# ========================================
# 案例：不同的导入方式
# ========================================

# 方式1：导入整个模块（推荐用于常用模块）
import datetime
now = datetime.datetime.now()
print(f"当前时间：{now}")

# 方式2：导入特定函数（推荐用于只用到几个函数）
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f"明天：{tomorrow.strftime('%Y-%m-%d')}")

# 方式3：起别名（推荐用于名字长的模块）
import numpy as np  # 数据分析常用
import pandas as pd  # 数据分析常用
```

### 2.3 新手常见错误

```python
# ❌ 错误1：用 import * 导入所有
from os import *
from sys import *
path = "hello"  # path 被覆盖了！不知道是 os.path 还是你的变量

# ✅ 正确：明确导入
from os import path
from sys import argv

# ❌ 错误2：自己造轮子
def get_current_time():
    import time
    return time.strftime("%Y-%m-%d %H:%M:%S")

# ✅ 正确：用标准库
from datetime import datetime
now = datetime.now()
print(now.strftime("%Y年%m月%d日 %H时%M分"))

# ❌ 错误3：模块名冲突
# 如果你有个文件叫 datetime.py，import datetime 就会导入你的文件！

# ✅ 正确：模块名别和标准库重名
```

### 2.4 导入顺序规范

```python
# 标准库（Python自带）
import os
import sys
from datetime import datetime
from pathlib import Path

# 第三方库（pip安装）- 注释形式展示
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt

# 本地模块（自己写的）- 注释形式展示
# from my_utils import helper
# from config import settings

print("导入顺序：标准库 → 第三方库 → 本地模块")
print("用空行分隔不同类型的导入")
```

---

## 三、常用标准库

### 3.1 数据分析必备标准库

| 模块 | 说明 | 常用功能 |
|-----|------|---------|
| `os` | 系统操作 | 目录、文件操作 |
| `pathlib` | 路径操作（推荐） | Path 类，跨平台路径 |
| `datetime` | 日期时间 | datetime、timedelta |
| `json` | JSON 处理 | dumps、loads |
| `csv` | CSV 处理 | DictReader、DictWriter |
| `collections` | 高级数据结构 | Counter、defaultdict |
| `random` | 随机数 | randint、choice、sample |

### 3.2 os 模块

```python
import os

# 当前工作目录
print(f"当前目录：{os.getcwd()}")

# 列出目录内容
files = os.listdir(".")
print(f"当前目录文件：{files}")

# 创建目录
os.makedirs("output/data", exist_ok=True)
print("已创建目录 output/data")

# 检查文件是否存在
if os.path.exists("data.txt"):
    print("data.txt 文件存在")

# 检查是文件还是目录
if os.path.isfile("data.txt"):
    print("data.txt 是文件")
if os.path.isdir("output"):
    print("output 是目录")
```

### 3.3 pathlib 模块（推荐）

```python
from pathlib import Path

# 创建 Path 对象
p = Path(".")

# 当前目录
print(f"当前目录：{Path.cwd()}")

# 列出目录内容
for f in p.iterdir():
    print(f"  {f.name}")

# 检查是否存在
if Path("data.txt").exists():
    print("文件存在")

# 创建目录
Path("output/data").mkdir(parents=True, exist_ok=True)

# 路径拼接（推荐）
data_path = Path("data") / "sales" / "2024.csv"
print(f"拼接路径：{data_path}")

# 文件名操作
file = Path("data/sales_2024.csv")
print(f"文件名：{file.name}")     # sales_2024.csv
print(f"文件名（无扩展名）：{file.stem}")  # sales_2024
print(f"扩展名：{file.suffix}")   # .csv
print(f"父目录：{file.parent}")   # data
```

### 3.4 datetime 模块

```python
from datetime import datetime, timedelta

# 当前时间
now = datetime.now()
print(f"当前时间：{now}")

# 格式化输出
print(f"格式化：{now.strftime('%Y年%m月%d日 %H时%M分')}")

# 字符串转 datetime
dt = datetime.strptime("2024-01-15", "%Y-%m-%d")
print(f"解析结果：{dt}")

# 时间计算
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(days=7)
print(f"明天：{tomorrow.strftime('%Y-%m-%d')}")
print(f"上周：{last_week.strftime('%Y-%m-%d')}")

# 时间差
diff = tomorrow - now
print(f"相差秒数：{diff.total_seconds()}")
```

### 3.5 collections 模块

```python
from collections import Counter, defaultdict

# Counter：计数神器
sales = ["华东", "华南", "华东", "华北", "华东", "华南"]
cnt = Counter(sales)
print(f"计数结果：{cnt}")
print(f"最多的2个：{cnt.most_common(2)}")

# defaultdict：带默认值的字典
dd = defaultdict(list)
dd["华东"].append("上海")
dd["华东"].append("杭州")
dd["华南"].append("广州")  # 不需要先创建空列表
print(f"结果：{dd}")
```

### 3.6 random 模块

```python
import random

# 随机整数
num = random.randint(1, 100)
print(f"随机整数(1-100)：{num}")

# 随机选择
choice = random.choice(["A", "B", "C"])
print(f"随机选择：{choice}")

# 随机抽样（不重复）
sample = random.sample(range(1, 100), 5)
print(f"随机抽样：{sample}")
```

---

## 四、`__name__ == '__main__'`

### 4.1 什么是 `__name__`？

**定义**：每个 Python 文件都有一个内置变量 `__name__`。

| 运行方式 | `__name__` 值 |
|---------|--------------|
| 直接运行 | `"__main__"` |
| 被 import 导入 | 模块名（文件名） |

### 4.2 用生活类比理解

**直接运行 vs 被 import**：

```
直接运行（python my_module.py）：
├── __name__ = "__main__"
├── 像"在家"：可以穿睡衣，执行测试代码
└── 执行 if __name__ == '__main__': 里的代码

被 import（from my_module import func）：
├── __name__ = "my_module"
├── 像"出门"：要穿正装，只提供函数
└── 不执行 if __name__ == '__main__': 里的代码
```

### 4.3 为什么需要？

**问题**：没有 `if __name__ == '__main__'`，测试代码每次都被执行。

```python
# ❌ 错误：没有保护测试代码
# my_module.py
def clean_data(data):
    return [x for x in data if x is not None]

# 测试代码（每次 import 都会执行！）
test_data = [1, None, 2, None, 3]
print(clean_data(test_data))  # [1, 2, 3]

# 其他文件 import 时
# from my_module import clean_data
# 输出: [1, 2, 3]  ← 不想要这个输出
```

### 4.4 正确用法

```python
# ========================================
# 案例：data_utils.py 模块
# ========================================

def clean_data(data):
    """清洗数据，移除 None 值"""
    return [x for x in data if x is not None]

def validate_data(data, required_fields):
    """验证数据是否包含必需字段"""
    for field in required_fields:
        if field not in data:
            return False
    return True

# 测试代码只在直接运行时执行
if __name__ == '__main__':
    print("=== 测试 clean_data ===")
    test_data = [1, None, 2, None, 3]
    print(clean_data(test_data))
    
    print("\n=== 测试 validate_data ===")
    print(validate_data({"name": "张三"}, ["name"]))
    print(validate_data({"name": "张三"}, ["age"]))
```

### 4.5 命令行参数

```python
# ========================================
# 案例：支持命令行参数的脚本
# ========================================

import sys

def process_file(input_path, output_path):
    """处理文件"""
    print(f"处理文件：{input_path}")
    print(f"输出到：{output_path}")

# 模拟命令行参数（在网页练习环境中）
# 实际使用时：python script.py input.csv output.csv
if __name__ == '__main__':
    # sys.argv[0] 是脚本名本身
    # sys.argv[1] 是第一个参数
    
    # 模拟有参数的情况
    print("模拟命令行参数：python script.py data.csv result.csv")
    test_args = ["script.py", "data.csv", "result.csv"]
    
    if len(test_args) < 2:
        print("用法：python script.py <输入文件> [输出文件]")
    else:
        input_file = test_args[1]
        output_file = test_args[2] if len(test_args) > 2 else "output.txt"
        process_file(input_file, output_file)
```

---

## 五、创建自己的模块

### 5.1 创建模块

**步骤**：创建一个 `.py` 文件，里面写函数和变量。

```
my_utils/
├── string_utils.py    # 字符串工具模块
├── math_utils.py      # 数学工具模块
└── file_utils.py      # 文件工具模块
```

### 5.2 使用自己的模块

```python
# ========================================
# 案例：模拟模块导入
# ========================================

# 假设有一个 my_helper.py 模块包含以下函数：
# def greet(name):
#     return f"你好，{name}！"
# 
# def add(a, b):
#     return a + b

# 在网页练习环境中，我们直接定义函数来模拟
# 实际使用时：from my_helper import greet, add

def greet(name):
    """问候函数"""
    return f"你好，{name}！"

def add(a, b):
    """加法函数"""
    return a + b

# 使用这些函数
print(greet("张三"))
print(f"3 + 5 = {add(3, 5)}")

# 实际项目中，函数放在单独的 .py 文件
# 其他文件通过 import 导入使用
```

---

## 六、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| import | 导入模块，明确导入，不用 `import *` |
| 标准库 | datetime、pathlib、json、collections、random |
| `__name__` | 直接运行是 `"__main__"`，被 import 是模块名 |
| 模块创建 | 一个 `.py` 文件就是一个模块 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| `from xxx import *` | 明确导入 `from xxx import func` |
| 模块名和标准库重名 | 用不同的名字 |
| 测试代码散落文件各处 | 放在 `if __name__ == '__main__'` 里 |
| 不用 pathlib 用 os.path | 推荐 pathlib，更简洁 |

---

> 恭喜你掌握了 Python 模块与包！现在你已经学会组织代码和使用标准库了。