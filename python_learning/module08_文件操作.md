# Python 文件操作 —— 读写数据的艺术

> 这篇文章带你掌握 Python 文件操作，学会读写各种格式的数据文件。

**学完这章你能干啥？**
- 会用 with 语句安全读写文件
- 会处理 CSV 格式的表格数据
- 会处理 JSON 格式的配置和接口数据
- 会处理编码问题，避免中文乱码

---

<details>
<summary>📁 本章预置虚拟文件（点击展开查看）</summary>

练习代码运行时，系统已自动创建以下虚拟文件：

| 文件名 | 说明 |
|-----|------|
| `report.txt` | 销售报告文本文件 |
| `sales.csv` | 销售数据 CSV 文件 |
| `config.json` | 配置 JSON 文件 |
| `data.txt` | 测试文本文件 |
| `old_data.txt` | 老系统数据文件 |
| `output/` | 输出目录 |

**report.txt 内容**：
```
销售数据分析报告
==============================
生成时间：2024-01-15
总销售额：1,000,000元
平均订单：500元
```

**sales.csv 内容**：
```
月份,销售额,利润,区域
1月,12000,3000,华东
2月,15000,4000,华东
3月,18000,5000,华南
```

**config.json 内容**：
```
{
  "app_name": "数据分析工具",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 3306,
    "name": "sales_db"
  },
  "features": ["数据清洗", "统计分析", "报表生成"],
  "debug": true
}
```

</details>

---

## 一、文件操作基础

### 1.1 用生活类比理解

**文件操作就像"用笔记本"**：

```
读取文件：
├── 打开笔记本
├── 翻看内容
└── 合上笔记本

写入文件：
├── 打开笔记本
├── 写下内容
└── 合上笔记本
```

**为什么用 with 语句？**

| 没有 with | 有 with |
|----------|--------|
| 手动打开、手动关闭 | 自动关闭 |
| 出错时文件不会关闭 | 出错也会自动关闭 |
| 代码冗长 | 代码简洁 |

### 1.2 专业术语

| 术语 | 英文 | 说明 |
|-----|------|------|
| 文件对象 | File Object | 代表打开的文件 |
| 文件模式 | File Mode | 读写方式（r/w/a） |
| 编码 | Encoding | 字符的存储方式 |
| 上下文管理器 | Context Manager | with 语句的对象 |

---

## 二、文本文件读写

### 2.1 基本语法

```python
with open("文件名", "模式", encoding="编码") as f:
    操作文件
```

### 2.2 文件模式速查

| 模式 | 说明 | 文件不存在时 |
|-----|------|-------------|
| `"r"` | 只读（默认） | 报错 |
| `"w"` | 只写（覆盖） | 创建新文件 |
| `"a"` | 追加 | 创建新文件 |
| `"r+"` | 读写 | 报错 |
| `"w+"` | 读写（覆盖） | 创建新文件 |
| `"rb"` | 二进制读 | 报错 |
| `"wb"` | 二进制写 | 创建新文件 |

### 2.3 写入文件

```python
# ========================================
# 案例：写入销售报告
# ========================================

with open("report.txt", "w", encoding="utf-8") as f:
    f.write("销售数据分析报告\n")
    f.write("=" * 30 + "\n")
    f.write("生成时间：2025-05-20\n")
    f.write("总销售额：1,000,000元\n")
    f.write("平均订单：500元\n")

print("报告已写入 report.txt")

# 验证：读取刚写入的文件
with open("report.txt", "r", encoding="utf-8") as f:
    print(f.read())
```

### 2.4 读取文件

**方式1：一次性读取全部**

```python
with open("report.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```

**方式2：逐行读取（适合大文件）**

```python
with open("report.txt", "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, 1):
        print(f"第{line_num}行：{line.strip()}")
```

**方式3：读取所有行为列表**

```python
with open("report.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(f"共 {len(lines)} 行")
    for line in lines:
        print(line.strip())
```

### 2.5 追加内容

```python
# 追加模式：在文件末尾添加内容
with open("report.txt", "a", encoding="utf-8") as f:
    f.write("\n备注：数据已审核\n")

print("内容已追加")
```

### 2.6 新手常见错误

```python
# ❌ 错误1：忘了关文件
f = open("data.txt", "r")
content = f.read()
# 忘了 f.close()，文件一直被占用

# ✅ 正确：用 with 自动关闭
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# ❌ 错误2：异常时文件不会关
f = open("data.txt", "r")
content = f.read()
result = 1 / 0  # 出错！文件没关
f.close()       # 永远不会执行

# ✅ 正确：with 即使出错也会关闭
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
    result = 1 / 0  # 出错
# 文件自动关闭

# ❌ 错误3：用 "w" 模式覆盖了重要文件
with open("important_data.txt", "w") as f:
    f.write("新内容")
# 原来的内容没了！

# ✅ 正确：用 "a" 追加，或确认后再用 "w"
```

---

## 三、CSV 文件读写

### 3.1 什么是 CSV？

**定义**：CSV（Comma-Separated Values）是用逗号分隔的表格数据格式。

**CSV 示例**：

```
月份,销售额,利润,区域
1月,12000,3000,华东
2月,15000,4000,华东
3月,18000,5000,华南
```

**为什么 CSV 常用？**

| 优势 | 说明 |
|-----|------|
| Excel 可直接打开 | 业务人员友好 |
| 格式简单 | 纯文本，易于处理 |
| 跨平台 | 任何系统都能读写 |
| 体积小 | 比Excel文件小很多 |

### 3.2 写入 CSV

```python
# ========================================
# 案例：写入销售数据到 CSV
# ========================================

import csv

# 准备数据
sales_data = [
    {"月份": "1月", "销售额": 12000, "利润": 3000, "区域": "华东"},
    {"月份": "2月", "销售额": 15000, "利润": 4000, "区域": "华东"},
    {"月份": "3月", "销售额": 18000, "利润": 5000, "区域": "华南"},
]

# 写入 CSV
with open("sales.csv", "w", encoding="utf-8", newline="") as f:
    fieldnames = ["月份", "销售额", "利润", "区域"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    
    writer.writeheader()      # 写入表头
    writer.writerows(sales_data)  # 写入所有数据

print("CSV 文件已写入")
```

**关键参数说明**：

| 参数 | 说明 |
|-----|------|
| `newline=""` | Windows 必须，防止多出空行 |
| `fieldnames` | 列名列表 |
| `writeheader()` | 写入表头 |
| `writerows()` | 写入多行数据 |

### 3.3 读取 CSV

```python
import csv

# 读取 CSV（每行变成字典）
with open("sales.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['月份']}：销售额{row['销售额']}元")

# 统计总销售额
with open("sales.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    total = sum(int(row["销售额"]) for row in reader)
    print(f"\n总销售额：{total}元")
```

### 3.4 处理大 CSV 文件

```python
import csv

def process_large_csv(input_path, output_path):
    """处理大 CSV，逐行读取和写入"""
    with open(input_path, "r", encoding="utf-8") as fin, \
         open(output_path, "w", encoding="utf-8", newline="") as fout:
        
        reader = csv.DictReader(fin)
        # 新增"利润率"列
        fieldnames = reader.fieldnames + ["利润率"]
        writer = csv.DictWriter(fout, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            # 计算利润率
            sales = int(row["销售额"])
            profit = int(row["利润"])
            row["利润率"] = f"{profit/sales*100:.1f}%"
            writer.writerow(row)

# 使用
process_large_csv("sales.csv", "sales_with_rate.csv")
print("处理完成")
```

### 3.5 新手常见错误

```python
# ❌ 错误1：Windows 下忘记 newline=""
with open("data.csv", "w", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["a", "b"])
# 结果：每行后面多一个空行

# ✅ 正确：加 newline=""
with open("data.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["a", "b"])

# ❌ 错误2：数字读出来是字符串
# CSV 里数字存的是字符串，不能直接计算
with open("sales.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # row["销售额"] 是字符串 "12000"
        total = row["销售额"] + 100  # 字符串拼接！

# ✅ 正确：手动转换类型
with open("sales.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        sales = int(row["销售额"])  # 转成整数
        total = sales + 100
```

---

## 四、JSON 文件读写

### 4.1 什么是 JSON？

**定义**：JSON（JavaScript Object Notation）是数据交换的通用格式。

**JSON 示例**：

```json
{
  "app_name": "数据分析工具",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 3306
  },
  "features": ["数据清洗", "统计分析"]
}
```

**为什么 JSON 常用？**

| 场景 | 说明 |
|-----|------|
| 配置文件 | 程序配置存储 |
| API 数据 | 接口返回格式 |
| 数据交换 | 不同系统间传递数据 |

### 4.2 JSON 数据类型对应

| JSON 类型 | Python 类型 |
|----------|------------|
| object | dict |
| array | list |
| string | str |
| number | int/float |
| true/false | True/False |
| null | None |

### 4.3 Python 对象转 JSON

```python
import json

# Python 字典
config = {
    "app_name": "数据分析工具",
    "version": "1.0.0",
    "database": {
        "host": "localhost",
        "port": 3306,
        "name": "sales_db"
    },
    "features": ["数据清洗", "统计分析", "报表生成"],
    "debug": True
}

# 转成 JSON 字符串
json_str = json.dumps(config, ensure_ascii=False, indent=2)
print(json_str)
```

**关键参数说明**：

| 参数 | 说明 |
|-----|------|
| `ensure_ascii=False` | 中文正常显示 |
| `indent=2` | 格式化缩进 |
| `sort_keys=True` | 按键排序 |

### 4.4 JSON 转 Python 对象

```python
import json

json_str = '''
{
  "app_name": "数据分析工具",
  "version": "1.0.0",
  "features": ["数据清洗", "统计分析"]
}
'''

# 解析 JSON
parsed = json.loads(json_str)
print(parsed["app_name"])      # 数据分析工具
print(parsed["features"][0])   # 数据清洗
```

### 4.5 读写 JSON 文件

```python
import json

# 写入 JSON 文件
config = {
    "app_name": "数据分析工具",
    "version": "1.0.0",
    "debug": True
}

with open("config.json", "w", encoding="utf-8") as f:
    json.dump(config, f, ensure_ascii=False, indent=2)

print("配置已保存")

# 读取 JSON 文件
with open("config.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(f"应用名称：{loaded['app_name']}")
    print(f"版本号：{loaded['version']}")
```

### 4.6 dumps vs dump, loads vs load

| 函数 | 作用 | 使用场景 |
|-----|------|---------|
| `json.dumps(obj)` | 对象 → JSON 字符串 | API 返回、网络传输 |
| `json.dump(obj, f)` | 对象 → JSON 文件 | 保存配置 |
| `json.loads(str)` | JSON 字符串 → 对象 | 解析 API 返回 |
| `json.load(f)` | JSON 文件 → 对象 | 读取配置文件 |

### 4.7 处理 API 返回的 JSON

```python
import json

# 模拟 API 返回的数据
api_response = '''
{
  "code": 200,
  "message": "success",
  "data": {
    "users": [
      {"id": 1, "name": "张三", "score": 85},
      {"id": 2, "name": "李四", "score": 92}
    ],
    "total": 2
  }
}
'''

# 解析并处理
response = json.loads(api_response)

if response["code"] == 200:
    users = response["data"]["users"]
    total = response["data"]["total"]
    
    print(f"共 {total} 位用户：")
    for user in users:
        print(f"  {user['name']}：{user['score']}分")
```

**运行结果**：

```
共 2 位用户：
  张三：85分
  李四：92分
```

---

## 五、编码问题处理

### 5.1 什么是编码？

**定义**：编码是字符在计算机中的存储方式。

**常见编码**：

| 编码 | 说明 |
|-----|------|
| UTF-8 | 国际标准，推荐使用 |
| GBK | 中文编码，老系统常用 |
| GB2312 | GBK 的前身 |
| ASCII | 英文编码 |

### 5.2 为什么会乱码？

```
场景：文件用 GBK 编码保存，你用 UTF-8 读取

文件内容（GBK）：中文
读取方式（UTF-8）：解码方式不对
结果：乱码 ❌
```

### 5.3 统一用 UTF-8

```python
# ✅ 永远指定 encoding="utf-8"

# 写入文件
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("中文内容")

# 读取文件
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
```

### 5.4 处理不同编码的文件

```python
# 读取 GBK 编码的文件
with open("old_data.txt", "r", encoding="gbk") as f:
    content = f.read()
    print(content)
```

### 5.5 自动检测编码

```python
def read_file_with_encoding(filepath):
    """尝试多种编码读取文件"""
    encodings = ["utf-8", "gbk", "gb2312", "utf-16"]
    
    for encoding in encodings:
        try:
            with open(filepath, "r", encoding=encoding) as f:
                content = f.read()
                print(f"成功用 {encoding} 编码读取")
                return content
        except UnicodeDecodeError:
            continue
    
    raise ValueError(f"无法识别文件编码")

# 使用
content = read_file_with_encoding("data.txt")
```

### 5.6 处理无法解码的字符

```python
# 忽略无法解码的字符
with open("data.txt", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()  # 乱码字符被丢弃

# 替换无法解码的字符
with open("data.txt", "r", encoding="utf-8", errors="replace") as f:
    content = f.read()  # 乱码字符替换为 �
```

---

## 六、目录操作

### 6.1 os 模块基础

```python
import os

# 当前工作目录
print(f"当前目录：{os.getcwd()}")

# 列出当前目录内容
print("\n当前目录文件：")
files = os.listdir(".")
for f in files:
    print(f"  {f}")

# 创建目录
os.makedirs("output/data", exist_ok=True)
print("\n已创建目录 output/data")

# 检查文件是否存在
if os.path.exists("data.txt"):
    print("data.txt 文件存在")

# 检查是文件还是目录
if os.path.isfile("data.txt"):
    print("data.txt 是文件")
if os.path.isdir("output"):
    print("output 是目录")

# 注意：删除操作需要文件/目录实际存在
# os.remove("temp.txt")  # 删除文件
# os.rmdir("empty_dir")  # 删除空目录
```

### 6.2 pathlib 模块（推荐）

```python
from pathlib import Path

# 创建 Path 对象
p = Path(".")

# 当前目录
print(f"当前目录：{Path.cwd()}")

# 列出目录内容
print("\n当前目录文件：")
for f in p.iterdir():
    print(f"  {f.name}")

# 检查是否存在
if Path("data.txt").exists():
    print("文件存在")

# 创建目录
Path("output/data").mkdir(parents=True, exist_ok=True)

# 文件名操作
file = Path("data/sales_2024.csv")
print(file.name)      # sales_2024.csv
print(file.stem)      # sales_2024
print(file.suffix)    # .csv
print(file.parent)    # data

# 拼接路径
data_dir = Path("data")
file_path = data_dir / "sales" / "2024.csv"
print(file_path)  # data/sales/2024.csv
```

---

## 七、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| 文件读写 | with 语句自动关闭，永远指定 encoding |
| CSV 处理 | csv 模块，DictReader/DictWriter |
| JSON 处理 | json 模块，dumps/loads/dump/load |
| 编码问题 | 统一用 UTF-8，处理不同编码 |
| 目录操作 | pathlib 模块，面向对象的方式 |

### 常见错误避坑指南

| 错误 | 正确 |
|-----|------|
| 不用 with，忘记 close | 用 with 自动关闭 |
| 不指定 encoding | 永远写 encoding="utf-8" |
| CSV 忘记 newline="" | Windows 下必须加 |
| JSON 中文显示为 \uXXXX | 加 ensure_ascii=False |
| 用 "w" 覆盖重要文件 | 确认后再用，或用 "a" |

---

> 恭喜你掌握了 Python 文件操作！现在你已经能读写各种格式的数据文件了，下一章学习异常处理，让程序更健壮。
