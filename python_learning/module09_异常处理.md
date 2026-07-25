# Python 异常处理 —— 让程序更健壮

> 这篇文章带你掌握 Python 异常处理，学会优雅地处理程序中的错误。

**学完这章你能干啥？**
- 会用 try/except 捕获异常
- 理解异常处理的完整结构
- 会自定义异常类
- 掌握异常处理的最佳实践

---

<details>
<summary>📁 本章预置虚拟文件（点击展开查看）</summary>

练习代码运行时，系统已自动创建以下虚拟文件：

| 文件名 | 说明 |
|-----|------|
| `data.txt` | 测试文本文件 |
| `output.txt` | 输出文件（可写入） |
| `report.txt` | 销售报告文本文件 |

**data.txt 内容**：
```
这是一些测试数据
用于文件读取练习
```

</details>

---

## 一、什么是异常？

### 1.1 用生活类比理解

**异常就像"开车系安全带"**：

```
正常行驶（try）：
├── 一切顺利 → 到达目的地
└── 出了事故（except）：
    ├── 追尾 → 保险理赔
    ├── 爆胎 → 换备胎
    └── 其他 → 报警处理
```

**没有异常处理**：程序遇到错误直接崩溃，用户体验极差。

**有了异常处理**：程序遇到错误优雅处理，继续运行或友好提示。

### 1.2 异常 vs 错误

| 概念 | 说明 | 示例 |
|-----|------|------|
| 语法错误 | 代码写错了，运行前就能发现 | `if True` 忘写冒号 |
| 异常 | 运行时出错，可以捕获处理 | `1 / 0` 除零错误 |

### 1.3 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 异常 | Exception | 运行时错误 |
| 捕获 | Catch | 用 except 处理异常 |
| 抛出 | Raise | 用 raise 触发异常 |
| 异常链 | Exception Chain | 保留原始异常信息 |

---

## 二、基本异常处理

### 2.1 为什么需要异常处理？

**没有异常处理**：

```python
# 程序直接崩溃
result = 1 / 0
# ZeroDivisionError: division by zero
# 程序停止运行
```

**有异常处理**：

```python
try:
    result = 1 / 0
except ZeroDivisionError:
    print("除数不能为零")
    result = None
# 程序继续运行
```

### 2.2 基本语法

```python
try:
    可能出错的代码
except 异常类型:
    处理异常的代码
```

### 2.3 捕获特定异常

```python
# ========================================
# 案例：安全除法
# ========================================

def safe_divide(a, b):
    """安全除法函数"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("错误：除数不能为零")
        return None
    except TypeError:
        print("错误：请输入数字")
        return None

# 测试
print(safe_divide(10, 2))    # 5.0
print(safe_divide(10, 0))    # 错误：除数不能为零 → None
print(safe_divide("a", 2))   # 错误：请输入数字 → None
```

### 2.4 捕获多个异常

```python
# 方式1：多个 except
try:
    result = int("abc")
except ValueError:
    print("值错误")
except TypeError:
    print("类型错误")

# 方式2：一个 except 捕获多种异常
try:
    result = int("abc")
except (ValueError, TypeError) as e:
    print(f"错误：{e}")
```

### 2.5 获取异常信息

```python
try:
    result = 1 / 0
except ZeroDivisionError as e:
    print(f"异常类型：{type(e).__name__}")
    print(f"异常信息：{e}")
```

**运行结果**：

```
异常类型：ZeroDivisionError
异常信息：division by zero
```

---

## 三、完整异常结构

### 3.1 try-except-else-finally

```python
try:
    # 尝试执行的代码
except 异常类型:
    # 处理异常
else:
    # 没有异常时执行
finally:
    # 不管有没有异常都执行
```

### 3.2 各部分作用

| 部分 | 作用 | 执行时机 |
|-----|------|---------|
| try | 尝试执行的代码 | 总是执行 |
| except | 处理异常 | 有异常时执行 |
| else | 无异常时的逻辑 | 无异常时执行 |
| finally | 清理资源 | 总是执行 |

### 3.3 完整示例

```python
# ========================================
# 案例：完整的异常处理结构
# ========================================

def safe_divide(a, b):
    """安全除法 —— 完整结构示例"""
    try:
        result = a / b
    except ZeroDivisionError:
        print("错误：除数不能为零")
        return None
    except TypeError:
        print("错误：请输入数字")
        return None
    else:
        # 没有异常时执行
        print("计算成功")
        return result
    finally:
        # 不管有没有异常都执行
        print("计算结束")

# 测试
print("--- 测试1 ---")
print(safe_divide(10, 2))

print("\n--- 测试2 ---")
print(safe_divide(10, 0))
```

**运行结果**：

```
--- 测试1 ---
计算成功
计算结束
5.0

--- 测试2 ---
错误：除数不能为零
计算结束
None
```

### 3.4 finally 的典型用途

```python
# 场景：文件操作，确保关闭文件
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    # 处理文件内容
except FileNotFoundError:
    print("文件不存在")
finally:
    if file:
        file.close()
        print("文件已关闭")

# 更好的写法：用 with 语句（推荐）
try:
    with open("data.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("文件不存在")
# with 会自动关闭文件
```

---

## 四、常见异常类型

### 4.1 内置异常速查表

| 异常 | 说明 | 触发示例 |
|-----|------|---------|
| `ZeroDivisionError` | 除以零 | `1 / 0` |
| `TypeError` | 类型错误 | `"2" + 2` |
| `ValueError` | 值不合法 | `int("abc")` |
| `KeyError` | 键不存在 | `{}["no_key"]` |
| `IndexError` | 索引越界 | `[][10]` |
| `FileNotFoundError` | 文件不存在 | `open("not_exist.txt")` |
| `PermissionError` | 权限不足 | 写入只读文件 |
| `AttributeError` | 属性不存在 | `"hello".no_method()` |
| `ImportError` | 导入失败 | `import not_exist` |

### 4.2 异常继承关系

```
BaseException
├── Exception（大多数异常的基类）
│   ├── ValueError
│   ├── TypeError
│   ├── KeyError
│   ├── IndexError
│   ├── FileNotFoundError
│   └── ...
├── KeyboardInterrupt（Ctrl+C）
└── SystemExit（sys.exit()）
```

### 4.3 实际应用示例

```python
# ========================================
# 案例：安全读取 CSV 文件
# ========================================

import csv

def read_csv_safely(filepath):
    """安全读取 CSV，处理各种异常"""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            data = list(reader)
            
            if not data:
                print("警告：文件为空")
                return []
            
            return data
            
    except FileNotFoundError:
        print(f"错误：文件 {filepath} 不存在")
        return []
    except PermissionError:
        print(f"错误：没有权限读取文件")
        return []
    except UnicodeDecodeError:
        print("错误：文件编码问题，尝试 GBK 编码...")
        try:
            with open(filepath, "r", encoding="gbk") as f:
                reader = csv.DictReader(f)
                return list(reader)
        except Exception as e:
            print(f"GBK 编码也失败：{e}")
            return []
    except Exception as e:
        print(f"未知错误：{type(e).__name__}: {e}")
        return []

# 测试
data = read_csv_safely("not_exist.csv")
```

---

## 五、抛出异常（raise）

### 5.1 主动抛出异常

**语法**：`raise 异常类型("错误信息")`

```python
def withdraw(balance, amount):
    """取款函数"""
    if amount <= 0:
        raise ValueError("取款金额必须大于0")
    if amount > balance:
        raise ValueError(f"余额不足：当前余额{balance}元")
    
    return balance - amount

# 使用
try:
    new_balance = withdraw(1000, 2000)
except ValueError as e:
    print(f"取款失败：{e}")
```

### 5.2 重新抛出异常

```python
def divide_and_log(a, b):
    """除法并记录日志"""
    try:
        result = a / b
        return result
    except ZeroDivisionError as e:
        print(f"记录日志：除零错误 - {e}")
        raise  # 重新抛出，让上层处理

# 外层捕获重新抛出的异常
try:
    divide_and_log(10, 0)
except ZeroDivisionError:
    print("外层处理：除数不能为零")
```

### 5.3 异常链（raise from）

**作用**：保留原始异常信息。

```python
def load_user_data(user_id):
    """加载用户数据"""
    try:
        with open(f"data/{user_id}.json", "r") as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        # raise from 保留原始异常
        raise ValueError(f"用户 {user_id} 的数据不存在") from e

try:
    data = load_user_data("user123")
except ValueError as e:
    print(f"错误：{e}")
    print(f"原始错误：{e.__cause__}")
```

---

## 六、自定义异常

### 6.1 为什么需要自定义异常？

| 场景 | 内置异常 | 自定义异常 |
|-----|---------|-----------|
| 错误类型 | 不够精准 | 精准描述业务错误 |
| 错误信息 | 通用提示 | 自定义详细信息 |
| 错误处理 | 难以区分 | 可以针对性处理 |

### 6.2 定义自定义异常

```python
# ========================================
# 案例：数据处理系统的自定义异常
# ========================================

# 定义异常基类
class DataError(Exception):
    """数据错误基类"""
    pass

# 定义具体异常
class EmptyDataError(DataError):
    """数据为空异常"""
    def __init__(self, message="数据为空，请检查数据源"):
        self.message = message
        super().__init__(self.message)

class InvalidFormatError(DataError):
    """数据格式错误异常"""
    def __init__(self, field, expected, actual):
        self.field = field
        self.expected = expected
        self.actual = actual
        self.message = f"字段'{field}'格式错误，期望{expected}，实际{actual}"
        super().__init__(self.message)

class OutOfRangeError(DataError):
    """数据超出范围异常"""
    def __init__(self, field, value, min_val, max_val):
        self.field = field
        self.value = value
        self.message = f"字段'{field}'的值{value}超出范围[{min_val}, {max_val}]"
        super().__init__(self.message)
```

### 6.3 使用自定义异常

```python
def validate_sales_data(data):
    """验证销售数据"""
    if not data:
        raise EmptyDataError()
    
    for i, row in enumerate(data):
        # 检查必需字段
        if "amount" not in row:
            raise InvalidFormatError("amount", "数字", "缺失")
        
        # 检查数据类型
        try:
            amount = float(row["amount"])
        except ValueError:
            raise InvalidFormatError("amount", "数字", row["amount"])
        
        # 检查数据范围
        if amount < 0:
            raise OutOfRangeError("amount", amount, 0, "无上限")
        
        if amount > 1000000:
            raise OutOfRangeError("amount", amount, 0, 1000000)
    
    return True

# 测试
test_cases = [
    [],                      # 空数据
    [{"amount": "abc"}],     # 格式错误
    [{"amount": -100}],      # 负数
    [{"amount": 1000}],      # 正常
]

for i, data in enumerate(test_cases):
    print(f"\n测试{i + 1}：{data}")
    try:
        validate_sales_data(data)
        print("验证通过")
    except EmptyDataError as e:
        print(f"空数据错误：{e}")
    except InvalidFormatError as e:
        print(f"格式错误：{e}")
    except OutOfRangeError as e:
        print(f"范围错误：{e}")
```

**运行结果**：

```
测试1：[]
空数据错误：数据为空，请检查数据源

测试2：[{'amount': 'abc'}]
格式错误：字段'amount'格式错误，期望数字，实际abc

测试3：[{'amount': -100}]
范围错误：字段'amount'的值-100.0超出范围[0, 无上限]

测试4：[{'amount': 1000}]
验证通过
```

---

## 七、异常处理最佳实践

### 7.1 不要用裸 except

```python
# ❌ 错误：裸 except，捕获所有异常（包括系统异常）
try:
    result = 1 / 0
except:
    pass  # 静默吞掉错误，难以调试

# ✅ 正确：指定异常类型
try:
    result = 1 / 0
except ZeroDivisionError as e:
    print(f"错误：{e}")

# ✅ 至少写 Exception
try:
    result = 1 / 0
except Exception as e:
    print(f"错误：{e}")
```

### 7.2 异常范围要小

```python
# ❌ 错误：范围太大，不知道哪一步出错
# try:
#     data = load_data()
#     result = process(data)
#     save_result(result)
# except Exception:
#     print("出错了")

# ✅ 正确：分别处理（示例）
# 步骤1：读取数据
try:
    with open("data.txt", "r", encoding="utf-8") as f:
        data = f.read()
except FileNotFoundError:
    print("数据文件不存在")
    data = ""

# 步骤2：处理数据
try:
    result = int(data) if data else 0
except ValueError as e:
    print(f"数据处理错误：{e}")
    result = 0

# 步骤3：保存结果
try:
    with open("output.txt", "w", encoding="utf-8") as f:
        f.write(str(result))
except PermissionError:
    print("没有写入权限")

print(f"处理完成，结果：{result}")
```

### 7.3 异常 vs 返回值

**什么时候用异常？什么时候用返回值？**

| 场景 | 推荐方式 | 原因 |
|-----|---------|------|
| 预期情况 | 返回值 | 如除数为零，是正常输入 |
| 意外情况 | 异常 | 如文件不存在，是意外错误 |
| 业务规则违反 | 异常 | 如余额不足，需要中断流程 |

```python
# 预期情况：用返回值
def divide(a, b):
    """除法 —— 除数为零是预期情况"""
    if b == 0:
        return None, "除数不能为零"
    return a / b, None

result, error = divide(10, 0)
if error:
    print(error)
else:
    print(result)

# 意外情况：用异常
def read_config(filepath):
    """读取配置 —— 文件不存在是意外"""
    try:
        with open(filepath, "r") as f:
            import json
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"配置文件{filepath}不存在")
```

### 7.4 finally 里不要 return

```python
# ❌ 错误：finally 的 return 会覆盖前面的返回值
def bad_example():
    try:
        return "正常返回"
    finally:
        return "finally返回"  # 会覆盖上面的返回值

print(bad_example())  # "finally返回"

# ✅ 正确：finally 只做清理
def good_example():
    try:
        return "正常返回"
    finally:
        print("清理资源")  # 只做清理，不返回

print(good_example())  # "正常返回"
```

---

## 八、上下文管理器

### 8.1 什么是上下文管理器？

**定义**：自动管理资源的进入和退出。

**专业术语**：**上下文管理器（Context Manager）**，实现 `__enter__` 和 `__exit__` 方法的对象。

### 8.2 with 语句

```python
# 传统写法
file = open("data.txt", "r")
try:
    content = file.read()
finally:
    file.close()

# with 写法（推荐）
with open("data.txt", "r") as file:
    content = file.read()
# 自动关闭文件
```

### 8.3 自定义上下文管理器

```python
# 方式1：定义类
class Timer:
    """计时器 —— 自动计算执行时间"""
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end = time.time()
        print(f"耗时：{self.end - self.start:.4f}秒")
        return False  # 让异常继续传播

# 使用
with Timer():
    total = sum(range(1000000))
# 自动打印：耗时：0.0xxx秒

# 方式2：用 contextlib（推荐）
from contextlib import contextmanager

@contextmanager
def timer(name="代码块"):
    """简化的计时器"""
    import time
    start = time.time()
    try:
        yield  # 执行 with 块内的代码
    finally:
        end = time.time()
        print(f"{name}耗时：{end - start:.4f}秒")

# 使用
with timer("数据处理"):
    data = [i ** 2 for i in range(100000)]
# 数据处理耗时：0.0xxx秒
```

---

## 九、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| try/except | 捕获和处理异常 |
| else/finally | 无异常逻辑和资源清理 |
| raise | 主动抛出异常 |
| 自定义异常 | 精准描述业务错误 |
| 上下文管理器 | 自动资源管理 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| 裸 `except:` | `except Exception:` |
| 异常范围太大 | 分别处理各步骤 |
| finally 里 return | finally 只做清理 |
| 自定义异常继承 BaseException | 继承 Exception |

---

> 恭喜你掌握了 Python 异常处理！现在你已经能让程序优雅地处理各种错误了，下一章学习文件操作，处理外部数据。
