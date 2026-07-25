# Python 正则表达式 —— 文本处理利器

> 这篇文章带你掌握正则表达式实战技能,学会高效处理文本匹配、提取、替换问题。

**学完这章你能干啥？**
- 验证手机号、邮箱等格式
- 从文本中提取关键信息
- 批量替换文本内容
- 处理 Pandas 文本数据

---

## 一、正则表达式是什么？

### 1.1 用生活类比理解

**正则表达式就像"文字侦探"**:

```
正则表达式用途:
├── 验证 = 检查身份证号是否正确
├── 提取 = 从文章中找出所有手机号
├── 替换 = 把所有邮箱统一格式
└── 分割 = 按复杂规则拆分文本
```

**为什么需要正则？**

| 问题 | 传统方法 | 正则方法 |
|-----|---------|---------|
| 验证手机号 | 多个 if 判断 | 一行代码 |
| 提取所有邮箱 | 循环+切片 | 一个函数 |
| 替换敏感词 | 循环+replace | 一行代码 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 元字符 | Metacharacter | 特殊含义的字符,如 `\d`, `.` |
| 字符集 | Character Set | 匹配一组字符,如 `[abc]` |
| 量词 | Quantifier | 指定重复次数,如 `+`, `*` |
| 分组 | Grouping | 用 `()` 提取匹配内容 |

### 1.3 最简单的正则

```python
import re

# 最简单的匹配：精确匹配
text = "Hello World"

# 检查是否包含"World"
result = re.search("World", text)
print(result)  # <re.Match object> 表示匹配成功

# 检查是否包含"Python"
result = re.search("Python", text)
print(result)  # None 表示没有匹配
```

---

## 二、元字符详解

### 2.1 用生活类比理解

**元字符就像"侦探工具"**:

```
常用元字符:
├── . = 任意一个字符（万能钥匙）
├── \d = 任意数字（找数字）
├── \w = 字母数字下划线（找文字）
├── \s = 空格制表符（找空白）
└── [] = 字符集合（特定范围）
```

### 2.2 通用字符

| 元字符 | 含义 | 示例 |
|-------|------|------|
| `.` | 任意单个字符（除换行） | `a.c` 匹配 abc, aac |
| `\d` | 数字 0-9 | `\d+` 匹配 123 |
| `\D` | 非数字 | `\D+` 匹配 abc |
| `\w` | 字母、数字、下划线 | `\w+` 匹配 hello_123 |
| `\W` | 非字母数字下划线 | `\W+` 匹配 !@# |
| `\s` | 空白字符（空格、Tab） | `\s+` 匹配空格 |
| `\S` | 非空白字符 | `\S+` 匹配文字 |

```python
import re

# . 匹配任意单个字符（除换行符）
print("=== . 匹配任意字符 ===")
print(re.findall("a.c", "abc aac aac adc"))  # ['abc', 'aac', 'aac', 'adc']

# \d 匹配数字（0-9）
print("\n=== \\d 匹配数字 ===")
print(re.findall(r"\d", "a1b2c3"))  # ['1', '2', '3']
print(re.findall(r"\d+", "abc123def456"))  # ['123', '456']

# \D 匹配非数字
print("\n=== \\D 匹配非数字 ===")
print(re.findall(r"\D+", "abc123def456"))  # ['abc', 'def']

# \w 匹配字母、数字、下划线
print("\n=== \\w 匹配字母数字下划线 ===")
print(re.findall(r"\w+", "hello_world 123!"))  # ['hello_world', '123']

# \W 匹配非字母数字下划线
print("\n=== \\W 匹配特殊字符 ===")
print(re.findall(r"\W+", "hello world!@#"))  # [' ', '!@#']

# \s 匹配空白字符（空格、Tab、换行）
print("\n=== \\s 匹配空白 ===")
print(re.findall(r"\s+", "hello\tworld\nnew"))  # ['\t', '\n']

# \S 匹配非空白字符
print("\n=== \\S 匹配非空白 ===")
print(re.findall(r"\S+", "hello world"))  # ['hello', 'world']
```

### 2.3 字符集 [ ]

**字符集语法**：

| 语法 | 含义 | 示例 |
|-----|------|------|
| `[abc]` | 匹配 a、b、c | `['a', 'b', 'c']` |
| `[a-z]` | 匹配小写字母 | `'hello'` |
| `[A-Z]` | 匹配大写字母 | `'HELLO'` |
| `[0-9]` | 匹配数字 | `'123'` |
| `[a-zA-Z]` | 匹配所有字母 | `'Hello'` |
| `[\u4e00-\u9fa5]` | 匹配中文 | `'世界'` |
| `[^abc]` | 不匹配 a、b、c | 取反 |

```python
import re

# [abc] 匹配a、b、c中的任意一个
print("=== 字符集匹配 ===")
print(re.findall("[abc]", "abcdef"))  # ['a', 'b', 'c']

# [a-z] 匹配小写字母范围
print(re.findall("[a-z]+", "Hello World 123"))  # ['ello', 'orld']

# [A-Z] 匹配大写字母范围
print(re.findall("[A-Z]+", "Hello World 123"))  # ['H', 'W']

# [0-9] 匹配数字范围（等同于\d）
print(re.findall("[0-9]+", "abc123def"))  # ['123']

# [a-zA-Z] 匹配所有字母
print(re.findall("[a-zA-Z]+", "Hello World 123"))  # ['Hello', 'World']

# [\u4e00-\u9fa5] 匹配中文
print(re.findall(r"[\u4e00-\u9fa5]+", "Hello世界123"))  # ['世界']

# [^abc] 匹配除了abc的字符（^在[]内表示取反）
print("\n=== 取反匹配 ===")
print(re.findall("[^abc]", "abcdef"))  # ['d', 'e', 'f']
```

### 2.4 量词

**量词语法**：

| 量词 | 含义 | 示例 |
|-----|------|------|
| `*` | 0次或多次 | `ab*` 匹配 a, ab, abb |
| `+` | 1次或多次 | `ab+` 匹配 ab, abb |
| `?` | 0次或1次 | `ab?` 匹配 a, ab |
| `{n}` | 恰好n次 | `a{3}` 匹配 aaa |
| `{n,}` | 至少n次 | `a{2,}` 匹配 aa, aaa |
| `{n,m}` | n到m次 | `a{1,2}` 匹配 a, aa |

```python
import re

text = "abbbabab ab aab"

# * 匹配0次或多次
print("=== * 匹配0次或多次 ===")
print(re.findall("ab*", text))  # ['abbb', 'a', 'ab', 'ab', 'a', 'ab']

# + 匹配1次或多次
print("\n=== + 匹配1次或多次 ===")
print(re.findall("ab+", text))  # ['abbb', 'ab', 'ab', 'ab']

# ? 匹配0次或1次
print("\n=== ? 匹配0次或1次 ===")
print(re.findall("ab?", text))  # ['ab', 'a', 'ab', 'ab', 'a', 'ab']

# {n} 匹配恰好n次
print("\n=== {n} 匹配n次 ===")
print(re.findall("ab{2}", text))  # ['abb']

# {n,} 匹配至少n次
print(re.findall("ab{2,}", text))  # ['abbb']

# {n,m} 匹配n到m次
print(re.findall("ab{1,2}", text))  # ['abb', 'ab', 'ab', 'ab']

# 贪婪 vs 非贪婪（加?）
print("\n=== 贪婪 vs 非贪婪 ===")
html = "<div>content1</div><div>content2</div>"
print("贪婪:", re.findall("<div>.*</div>", html))  # 匹配整个字符串
print("非贪婪:", re.findall("<div>.*?</div>", html))  # ['<div>content1</div>', '<div>content2</div>']
```

### 2.5 边界匹配

**边界语法**：

| 语法 | 含义 | 示例 |
|-----|------|------|
| `^` | 字符串开头 | `^hello` |
| `$` | 字符串结尾 | `world$` |
| `\b` | 单词边界 | `\bhello\b` |
| `\B` | 非单词边界 | `\Bhello\B` |

```python
import re

text = "hello world hello"

# ^ 匹配字符串开头
print("=== ^ 匹配开头 ===")
print(re.findall("^hello", text))  # ['hello']
print(re.findall("^world", text))  # []

# $ 匹配字符串结尾
print("\n=== $ 匹配结尾 ===")
print(re.findall("hello$", text))  # ['hello']
print(re.findall("world$", text))  # []

# \b 匹配单词边界
print("\n=== \\b 匹配单词边界 ===")
print(re.findall(r"\bhello\b", "hello world hello123"))  # ['hello']

# \B 匹配非单词边界
print(re.findall(r"\Bhello\B", "hello world hello123"))  # []
```

---

## 三、Python re 模块详解

### 3.1 用生活类比理解

**re 模块就像"侦探局"**:

```
re 模块方法:
├── match = 从头开始查（只查开头）
├── search = 全文搜索（找到第一个）
├── findall = 找出全部（列表返回）
├── sub = 替换（批量修改）
└── split = 分割（拆分文本）
```

### 3.2 re.match() —— 从头匹配

**re.match() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pattern` | str | 正则表达式 | `"Hello"` |
| `string` | str | 要匹配的字符串 | `text` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

**特点**：从字符串开头匹配,开头不匹配则返回 None。

```python
import re

# match 从字符串开头匹配，开头不匹配则返回None
text = "Hello World"

result = re.match("Hello", text)
if result:
    print(f"匹配成功: {result.group()}")  # Hello
    print(f"匹配位置: {result.span()}")   # (0, 5)

result = re.match("World", text)
print(result)  # None，因为不是从开头匹配
```

### 3.3 re.search() —— 搜索匹配

**re.search() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pattern` | str | 正则表达式 | `"World"` |
| `string` | str | 要匹配的字符串 | `text` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

**特点**：搜索整个字符串,返回第一个匹配。

```python
import re

# search 搜索整个字符串，返回第一个匹配
text = "Hello World"

result = re.search("World", text)
if result:
    print(f"匹配成功: {result.group()}")  # World
    print(f"匹配位置: {result.span()}")   # (6, 11)

result = re.search("Python", text)
print(result)  # None
```

### 3.4 re.findall() —— 查找所有

**re.findall() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pattern` | str | 正则表达式 | `r"A\d{3}"` |
| `string` | str | 要匹配的字符串 | `text` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

**特点**：返回所有匹配的列表。

```python
import re

# findall 返回所有匹配的列表
text = "订单号：A001, A002, A003"

# 找出所有订单号
orders = re.findall(r"A\d{3}", text)
print(orders)  # ['A001', 'A002', 'A003']

# 找出所有数字
numbers = re.findall(r"\d+", text)
print(numbers)  # ['001', '002', '003']
```

### 3.5 re.sub() —— 替换

**re.sub() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pattern` | str | 正则表达式 | `r"-"` |
| `repl` | str/function | 替换内容 | `""` |
| `string` | str | 要替换的字符串 | `text` |
| `count` | int | 替换次数 | `1` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

```python
import re

text = "手机号：138-1234-5678"

# 替换分隔符
result = re.sub(r"-", "", text)
print(result)  # 手机号：13812345678

# 使用回调函数替换
def mask_phone(match):
    return match.group()[:3] + "****" + match.group()[7:]

result = re.sub(r"1\d{10}", mask_phone, "联系我：13812345678")
print(result)  # 联系我：138****5678

# 替换敏感词
text = "这是一条垃圾信息，内容很垃圾"
result = re.sub(r"垃圾", "**", text)
print(result)  # 这是一条**信息，内容很**
```

### 3.6 re.split() —— 分割

**re.split() 参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pattern` | str | 正则表达式 | `r"[,;|]"` |
| `string` | str | 要分割的字符串 | `text` |
| `maxsplit` | int | 最大分割次数 | `2` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

```python
import re

text = "apple,banana;orange|grape"

# 按多种分隔符分割
result = re.split(r"[,;|]", text)
print(result)  # ['apple', 'banana', 'orange', 'grape']

# 按数字分割
text = "abc123def456ghi"
result = re.split(r"\d+", text)
print(result)  # ['abc', 'def', 'ghi']
```

### 3.7 分组提取

**分组语法**：用 `()` 提取匹配内容。

**分组方法**：

| 方法 | 说明 | 示例 |
|-----|------|------|
| `group(0)` | 整个匹配 | `result.group(0)` |
| `group(1)` | 第一个分组 | `result.group(1)` |
| `group(2)` | 第二个分组 | `result.group(2)` |
| `groups()` | 所有分组 | `result.groups()` |

```python
import re

# 使用()进行分组，提取特定部分
text = "张三的电话是13812345678，李四的是13987654321"

# 提取姓名和电话
pattern = r"(\w+)的电话是(\d{11})"
matches = re.findall(pattern, text)
print(matches)  # [('张三', '13812345678'), ('李四', '13987654321')]

# 使用search提取
result = re.search(pattern, text)
if result:
    print(f"完整匹配: {result.group(0)}")   # 张三的电话是13812345678
    print(f"第一组: {result.group(1)}")      # 张三
    print(f"第二组: {result.group(2)}")      # 13812345678

# 命名分组
text = "2024-01-15"
pattern = r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})"
result = re.search(pattern, text)
if result:
    print(f"年: {result.group('year')}")   # 2024
    print(f"月: {result.group('month')}")  # 01
    print(f"日: {result.group('day')}")    # 15
```

---

## 四、常用正则模式

### 4.1 数字匹配

```python
import re

# 整数
print("=== 整数 ===")
print(re.findall(r"-?\d+", "123 -456 abc"))  # ['123', '-456']

# 正整数
print(re.findall(r"\d+", "123 -456 abc"))  # ['123', '456']

# 小数
print("\n=== 小数 ===")
print(re.findall(r"-?\d+\.\d+", "3.14 -2.5 123"))  # ['3.14', '-2.5']

# 科学计数法
print(re.findall(r"-?\d+\.?\d*[eE][+-]?\d+", "1.23e10 2.5E-3"))  # ['1.23e10', '2.5E-3']

# 货币格式
text = "价格：¥99.00，$128.50"
print(re.findall(r"[¥$]\d+\.?\d*", text))  # ['¥99.00', '$128.50']
```

### 4.2 手机号匹配

**手机号规则**：11位,以1开头,第二位是3-9。

```python
import re

# 中国手机号（11位，以1开头）
phones = ["13812345678", "19912345678", "12345678901", "2812345678"]

for phone in phones:
    if re.match(r"^1[3-9]\d{9}$", phone):
        print(f"{phone} - 有效")
    else:
        print(f"{phone} - 无效")

# 提取文本中的手机号
text = "联系方式：13812345678，客服：400-123-4567，手机：19987654321"
mobiles = re.findall(r"1[3-9]\d{9}", text)
print(f"手机号: {mobiles}")  # ['13812345678', '19987654321']

# 固定电话（带区号）
text = "电话：010-12345678，021-87654321"
landlines = re.findall(r"0\d{2,3}-\d{7,8}", text)
print(f"固话: {landlines}")
```

### 4.3 邮箱匹配

**邮箱格式**：用户名@域名.后缀。

```python
import re

emails = [
    "test@example.com",
    "user.name@example.co.uk",
    "invalid",
    "user@domain",
    "hello_world@test.cn"
]

# 基本邮箱验证
pattern = r"^[\w.-]+@[\w.-]+\.\w+$"

for email in emails:
    if re.match(pattern, email):
        print(f"✓ {email}")
    else:
        print(f"✗ {email}")

# 从文本提取邮箱
text = "联系我：test@example.com 或 support@company.org"
emails = re.findall(r"[\w.-]+@[\w.-]+\.\w+", text)
print(f"邮箱: {emails}")
```

### 4.4 URL 匹配

```python
import re

text = """
网站：https://www.example.com
链接：http://test.org/path?query=1
无效：www.no-protocol.com
"""

# 提取URL
urls = re.findall(r"https?://[\w./?=&%-]+", text)
print(f"URL: {urls}")

# 提取域名
domains = re.findall(r"https?://([\w.-]+)", text)
print(f"域名: {domains}")
```

### 4.5 身份证号匹配

**身份证规则**：18位,最后一位可以是数字或X。

```python
import re

# 18位身份证号
id_cards = ["11010519900307234X", "123456789012345678"]

for id_card in id_cards:
    # 简单验证：18位，最后一位可以是数字或X
    if re.match(r"^\d{17}[\dXx]$", id_card):
        print(f"✓ {id_card} - 格式正确")
    else:
        print(f"✗ {id_card} - 格式错误")

# 提取出生日期
id_card = "11010519900307234X"
match = re.search(r"(\d{6})(\d{8})(\d{4})", id_card)
if match:
    birth = match.group(2)
    print(f"出生日期: {birth[:4]}-{birth[4:6]}-{birth[6:8]}")
```

---

## 五、Pandas 文本处理

### 5.1 用生活类比理解

**Pandas 文本处理就像"批量加工"**:

```
Pandas str 方法:
├── contains = 是否包含（筛选）
├── extract = 提取内容（取值）
├── findall = 查找全部（列表）
├── replace = 替换内容（修改）
└── split = 分割文本（拆分）
```

### 5.2 str.contains() —— 判断是否包含

**基本语法**：
```python
df['col'].str.contains(pat, case=True, flags=0, na=None)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pat` | str | 正则表达式 | `'iPhone'` |
| `case` | bool | 是否区分大小写 | `False` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |
| `na` | value | 缺失值填充 | `False` |
| `regex` | bool | 是否使用正则 | `True` |

```python
import pandas as pd

df = pd.DataFrame({
    'text': ['Apple iPhone', 'Samsung Galaxy', 'iPhone 15', 'iPad Pro', 'MacBook']
})

# 判断是否包含"iPhone"
df['is_iphone'] = df['text'].str.contains('iPhone', case=False)
print(df)

# 使用正则
df['has_number'] = df['text'].str.contains(r'\d')
print("\n包含数字:")
print(df)
```

### 5.3 str.extract() —— 提取匹配内容

**基本语法**：
```python
df['col'].str.extract(pat, flags=0, expand=True)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pat` | str | 正则表达式(含分组) | `r'(\d{11})'` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |
| `expand` | bool | 是否返回DataFrame | `True` |

```python
import pandas as pd

df = pd.DataFrame({
    'phone': ['138-1234-5678', '139 1234 5678', '13712345678']
})

# 提取手机号
df['phone_clean'] = df['phone'].str.extract(r'(\d{11})')
print("提取11位手机号:")
print(df)

# 提取多个分组
df = pd.DataFrame({
    'info': ['姓名：张三，年龄：25', '姓名：李四，年龄：30']
})
df[['name', 'age']] = df['info'].str.extract(r'姓名：(\w+)，年龄：(\d+)')
print("\n提取姓名和年龄:")
print(df)
```

### 5.4 str.findall() —— 查找所有匹配

**基本语法**：
```python
df['col'].str.findall(pat, flags=0)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pat` | str | 正则表达式 | `r'[A-Z]\d{3}'` |
| `flags` | int | 匹配模式 | `re.IGNORECASE` |

```python
import pandas as pd

df = pd.DataFrame({
    'text': ['订单A001 A002', '产品B123', '编号X999 Y888 Z777']
})

# 查找所有编号
df['codes'] = df['text'].str.findall(r'[A-Z]\d{3}')
print(df)
```

### 5.5 str.replace() —— 替换

**基本语法**：
```python
df['col'].str.replace(pat, repl, n=-1, case=None, flags=0, regex=True)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pat` | str | 正则表达式 | `r'\d+'` |
| `repl` | str | 替换内容 | `'***'` |
| `n` | int | 替换次数 | `-1`(全部) |
| `case` | bool | 是否区分大小写 | `False` |
| `regex` | bool | 是否使用正则 | `True` |

```python
import pandas as pd

df = pd.DataFrame({
    'text': ['Hello 123', 'World 456', 'Python 789']
})

# 替换数字
df['masked'] = df['text'].str.replace(r'\d+', '***', regex=True)
print("替换数字:")
print(df)

# 清洗手机号
df = pd.DataFrame({
    'phone': ['138-1234-5678', '139 1234 5678', '13712345678']
})
df['phone_clean'] = df['phone'].str.replace(r'[-\s]', '', regex=True)
print("\n清洗手机号:")
print(df)
```

### 5.6 str.split() —— 分割

**基本语法**：
```python
df['col'].str.split(pat, n=-1, expand=False)
```

**参数详解**：

| 参数 | 类型 | 说明 | 示例 |
|-----|------|------|------|
| `pat` | str | 分隔符 | `'/'` |
| `n` | int | 分割次数 | `-1`(全部) |
| `expand` | bool | 是否返回DataFrame | `True` |

```python
import pandas as pd

df = pd.DataFrame({
    'path': ['/home/user/docs', '/var/log/app', '/usr/local/bin']
})

# 按路径分隔符分割
df['parts'] = df['path'].str.split('/')
print(df)

# 分割后取特定部分
df['first'] = df['path'].str.split('/').str[1]
print("\n第一级目录:")
print(df[['path', 'first']])
```

---

## 六、实战案例

### 6.1 日志解析

```python
import pandas as pd
import re

# 模拟Nginx访问日志
logs = """
192.168.1.1 - - [15/Jan/2024:10:30:45 +0800] "GET /api/users HTTP/1.1" 200 1234
192.168.1.2 - - [15/Jan/2024:10:31:20 +0800] "POST /api/login HTTP/1.1" 401 56
192.168.1.3 - - [15/Jan/2024:10:32:00 +0800] "GET /api/products HTTP/1.1" 200 5678
"""

# 解析日志
log_pattern = r'''
    (\d+\.\d+\.\d+\.\d+)       # IP
    \s+-\s+-\s+
    \[([^\]]+)\]                # 时间
    \s+"(\w+)\s+([^\s]+)\s+HTTP/[\d.]+"  # 方法和路径
    \s+(\d+)                    # 状态码
    \s+(\d+)                    # 响应大小
'''

parsed = []
for line in logs.strip().split('\n'):
    match = re.search(log_pattern, line, re.VERBOSE)
    if match:
        parsed.append({
            'ip': match.group(1),
            'time': match.group(2),
            'method': match.group(3),
            'path': match.group(4),
            'status': int(match.group(5)),
            'size': int(match.group(6))
        })

df_logs = pd.DataFrame(parsed)
print("=== 解析后的日志 ===")
print(df_logs)

# 日志分析
print("\n=== 状态码统计 ===")
print(df_logs['status'].value_counts())

print("\n=== 访问路径统计 ===")
print(df_logs['path'].value_counts())
```

### 6.2 数据清洗

```python
import pandas as pd
import re

# 模拟脏数据
df = pd.DataFrame({
    'name': ['  张三  ', '李四', '王 五', '赵六  '],
    'phone': ['138-1234-5678', '139 1234 5678', '13712345678', '1381234567'],
    'email': ['TEST@Example.COM', 'invalid', 'user@test.cn', 'hello@domain'],
    'id_card': ['11010519900307234X', '1234567890123456', '310101198801012345', 'invalid']
})

print("=== 原始数据 ===")
print(df)

# 1. 清洗姓名
df['name_clean'] = df['name'].str.strip().str.replace(r'\s+', '', regex=True)

# 2. 清洗手机号
df['phone_clean'] = df['phone'].str.replace(r'[-\s]', '', regex=True)
df['phone_valid'] = df['phone_clean'].str.match(r'^1[3-9]\d{9}$')

# 3. 清洗邮箱
df['email_clean'] = df['email'].str.lower()
df['email_valid'] = df['email_clean'].str.match(r'^[\w.-]+@[\w.-]+\.\w+$')

# 4. 验证身份证
df['id_card_valid'] = df['id_card'].str.match(r'^\d{17}[\dXx]$')

print("\n=== 清洗后数据 ===")
print(df[['name_clean', 'phone_clean', 'phone_valid', 'email_clean', 'email_valid', 'id_card_valid']])

# 数据质量报告
print("\n=== 数据质量报告 ===")
print(f"姓名清洗成功: {len(df)}/{len(df)}")
print(f"手机号有效: {df['phone_valid'].sum()}/{len(df)}")
print(f"邮箱有效: {df['email_valid'].sum()}/{len(df)}")
print(f"身份证有效: {df['id_card_valid'].sum()}/{len(df)}")
```

### 6.3 文本信息提取

```python
import pandas as pd
import re

# 模拟用户留言
messages = pd.DataFrame({
    'user_id': [1, 2, 3, 4],
    'message': [
        '我的订单A001一直没有收到，手机号是13812345678',
        '邮箱test@example.com，请发优惠券',
        '收货地址：北京市朝阳区xxx街道，电话13987654321',
        '请问发票抬头写公司名字吗？订单号B002'
    ]
})

print("=== 用户留言 ===")
print(messages)

# 提取订单号
messages['order_id'] = messages['message'].str.extract(r'([A-Z]\d{3})')

# 提取手机号
messages['phone'] = messages['message'].str.extract(r'(1[3-9]\d{9})')

# 提取邮箱
messages['email'] = messages['message'].str.extract(r'([\w.-]+@[\w.-]+\.\w+)')

# 提取城市
messages['city'] = messages['message'].str.extract(r'([\u4e00-\u9fa5]+市)')

print("\n=== 提取的信息 ===")
print(messages[['user_id', 'order_id', 'phone', 'email', 'city']])

# 标记需要关注的留言
messages['need_attention'] = (
    messages['order_id'].notna() | 
    messages['phone'].notna() | 
    messages['email'].notna()
)

print("\n=== 需要关注的留言 ===")
print(messages[messages['need_attention']][['user_id', 'message']])
```

---

## 七、总结

### 本章学到了什么？

| 类别 | 内容 | 关键语法 |
|-----|------|---------|
| 元字符 | 通用字符 | `\d`, `\w`, `\s`, `.` |
| 字符集 | 字符范围 | `[abc]`, `[a-z]`, `[^abc]` |
| 量词 | 重复次数 | `*`, `+`, `?`, `{n}` |
| 边界 | 位置匹配 | `^`, `$`, `\b` |
| 分组 | 提取内容 | `()`, `(?P<name>)` |

### 常用函数速查表

| 函数 | 用途 |
|-----|------|
| `re.match()` | 从头匹配 |
| `re.search()` | 搜索匹配 |
| `re.findall()` | 查找所有 |
| `re.sub()` | 替换内容 |
| `re.split()` | 分割文本 |
| `df.str.contains()` | 判断包含 |
| `df.str.extract()` | 提取内容 |
| `df.str.findall()` | 查找全部 |
| `df.str.replace()` | 替换内容 |
| `df.str.split()` | 分割文本 |

### 常用正则模式速查表

| 模式 | 正则表达式 |
|-----|-----------|
| 手机号 | `1[3-9]\d{9}` |
| 邮箱 | `[\w.-]+@[\w.-]+\.\w+` |
| 整数 | `-?\d+` |
| 小数 | `-?\d+\.\d+` |
| 中文 | `[\u4e00-\u9fa5]+` |
| 身份证 | `\d{17}[\dXx]` |
| URL | `https?://[\w./?=&%-]+` |

---

> 恭喜你掌握了正则表达式实战技能！现在你已经能高效处理各种文本匹配、提取、替换问题了。