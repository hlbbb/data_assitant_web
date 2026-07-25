# Python 基础 —— 从零开始的数据分析第一课

> 这篇文章带你从零认识 Python，搭建好数据分析的开发环境。

**学完这章你能干啥？**
- 了解 Python 是什么，为什么数据分析要学它
- 安装好 Anaconda 环境
- 会用 Jupyter Notebook 写代码、跑代码

---

## 一、Python 是什么？

### 1.1 编程语言简介

Python 是一种**编程语言**，就像人类用中文、英文交流一样，编程语言是人类和计算机交流的工具。

```
人类语言：人 → 中文/英文 → 人
编程语言：人 → Python → 计算机
```

**编程语言的作用**：
- 告诉计算机要做什么
- 让计算机自动执行重复工作
- 处理大量数据（人算一天，计算机算一秒）

### 1.2 为什么数据分析要学 Python？

| 对比项 | Python | Excel | SQL | R |
|-------|--------|-------|-----|---|
| 学习难度 | 简单 | 简单 | 中等 | 较难 |
| 处理数据量 | 百万级以上 | 十万级 | 百万级 | 百万级 |
| 自动化能力 | 强 | 弱 | 中 | 强 |
| 可视化 | 强 | 强 | 弱 | 强 |
| 机器学习 | 强 | 弱 | 弱 | 强 |
| 就业需求 | 最高 | 高 | 高 | 中 |

**Python 的优势**：

- 语法简单，接近自然语言，新手友好
- 生态丰富，Pandas、NumPy、Matplotlib 等库成熟
- 处理大数据，百万行数据轻松搞定
- 自动化强，写一次脚本，永久复用
- 可扩展，从数据分析到机器学习、深度学习
- 就业热门，数据分析师必备技能

### 1.3 Python 能做什么？

**数据分析场景**：

| 场景 | Python 能做什么 | 举例 |
|-----|----------------|------|
| 数据清洗 | 处理缺失值、重复值、异常值 | 清洗10万条销售记录 |
| 数据统计 | 求和、平均、分组统计 | 统计各区域销售情况 |
| 数据可视化 | 绘制图表 | 画销售趋势折线图 |
| 自动化报表 | 自动生成日报周报 | 每天自动发送销售日报 |
| 数据预测 | 简单预测模型 | 预测下月销售额 |

**一个简单的例子**：

假设老板让你统计一份销售数据：
- Excel：手动筛选、求和、复制粘贴，耗时30分钟
- Python：写好脚本后，一键运行，耗时3秒

```python
# Python 读取并统计销售数据（预览，后面会详细学）
import pandas as pd

# 读取数据
data = pd.read_excel('销售数据.xlsx')

# 统计各区域销售额
result = data.groupby('区域')['销售额'].sum()

# 输出结果
print(result)
```

---

## 二、环境搭建

### 2.1 为什么需要环境？

写代码需要"环境"，就像做饭需要厨房：

```
做饭：需要厨房 → 锅碗瓢盆 → 食材
写代码：需要环境 → Python解释器 → 代码文件
```

**新手常见问题**：

| 问题 | 原因 | 解决方案 |
|-----|------|---------|
| 装了Python但命令行找不到 | 忘了勾选 PATH | 重新安装，勾选 Add to PATH |
| 装了一堆包版本冲突 | 没用虚拟环境 | 使用 Anaconda 管理环境 |
| 代码在别人电脑跑不了 | 环境不一致 | 统一使用 Anaconda |

### 2.2 安装 Anaconda（强烈推荐）

**什么是 Anaconda？**

**Anaconda 包含哪些内容？**

- Python 解释器（Python 3.10+）
- 300+ 数据科学库（Pandas、NumPy、Matplotlib等）
- Conda 环境管理器
- Jupyter Notebook 编辑器

**为什么推荐 Anaconda？**

| 优势 | 说明 |
|-----|------|
| 开箱即用 | 自带常用库，不用一个个安装 |
| 环境隔离 | 不同项目用不同环境，避免冲突 |
| 管理方便 | conda 命令统一管理包和环境 |
| 社区活跃 | 遇到问题容易找到解决方案 |

**安装步骤**：

```
步骤1：下载 Anaconda
├── 访问官网：https://www.anaconda.com/download
├── 选择对应系统：Windows / macOS / Linux
├── 下载安装包（约500MB）
└── 推荐下载 Python 3.12 版本

步骤2：安装 Anaconda
├── Windows：双击 .exe 文件，按提示安装
├── macOS：双击 .pkg 文件，按提示安装
├── 安装路径建议：默认路径即可
└── ⚠️ 重要：勾选 "Add Anaconda to PATH"

步骤3：验证安装
├── 打开命令行（Windows: Win+R 输入 cmd）
├── 输入：python --version
├── 输入：conda --version
└── 显示版本号则安装成功
```

**验证安装成功**：

打开命令行，依次输入：

```bash
# 检查 Python 版本
python --version
# 应该显示：Python 3.12.x

# 检查 Conda 版本
conda --version
# 应该显示：conda 24.x.x

# 检查已安装的包
conda list
# 会显示一长串已安装的包列表
```

如果以上命令都能正常显示，说明安装成功！

---

## 三、Jupyter Notebook 使用

### 3.1 什么是 Jupyter Notebook？

Jupyter Notebook 是数据分析最常用的**交互式编程环境**。

**类比理解**：

```
传统编程：写完整代码 → 运行 → 看结果（像写作文）
Jupyter：写一段 → 运行一段 → 看结果 → 再写下一段（像写草稿）
```

**Jupyter 的优势**：

| 优势 | 说明 |
|-----|------|
| 分块执行 | 代码分成小块，一块一块运行 |
| 即时反馈 | 运行结果直接显示在代码下方 |
| 图表嵌入 | 图片、表格直接显示在笔记里 |
| 笔记功能 | 可以写文字说明，代码+文档一体 |
| 导出方便 | 可导出 HTML、PDF、Markdown |

### 3.2 启动 Jupyter Notebook

**方法一：通过 Anaconda Navigator**

```
1. 打开 Anaconda Navigator
2. 点击 Jupyter Notebook 的 "Launch"
3. 浏览器会自动打开 Jupyter
```

**方法二：通过命令行**

```bash
# 在命令行输入
jupyter notebook

# 会看到类似输出：
# [I 10:30:45.123 NotebookApp] Jupyter Notebook is running at:
# http://localhost:8888/?token=xxxxx

# 浏览器会自动打开 Jupyter 主页
```

**启动后的界面**：

- 文件列表：显示当前目录的文件和文件夹
- 右上角 New 按钮：创建新笔记本
- 右上角 Upload 按钮：上传文件
- 点击文件夹可以进入
- 点击 .ipynb 文件可以打开已有笔记本

### 3.3 创建第一个笔记本

**步骤**：

```
1. 点击右上角 "New"
2. 选择 "Python 3"（或 "Python 3 (ipykernel)"）
3. 新标签页会打开一个空白笔记本
```

**笔记本界面介绍**：

- 标题区：点击可修改笔记本名称
- 工具栏：添加单元格、剪切、复制、运行、停止、重启内核
- 单元格：输入代码的地方，显示 `In [ ]:` 表示等待输入

### 3.4 运行第一个代码

在单元格中输入以下代码：

```python
print("Hello, Python!")
```

**运行方式**：

| 快捷键 | 效果 |
|-------|------|
| Shift + Enter | 运行当前单元格，跳到下一个单元格 |
| Ctrl + Enter | 运行当前单元格，不跳转 |
| Alt + Enter | 运行当前单元格，在下方插入新单元格 |

运行后会看到：

```
In [1]: print("Hello, Python!")
Out[1]: Hello, Python!
```

### 3.5 Jupyter 常用操作

**单元格操作**：

| 操作 | 快捷键 | 说明 |
|-----|-------|------|
| 运行单元格 | Shift + Enter | 最常用 |
| 上方插入单元格 | Esc + A | A = Above |
| 下方插入单元格 | Esc + B | B = Below |
| 删除单元格 | Esc + DD | 按两次 D |
| 切换为代码模式 | Esc + Y | 默认模式 |
| 切换为文本模式 | Esc + M | Markdown 模式 |

**文本模式（Markdown）**：

在文本模式下，可以写说明文字：

```markdown
# 这是标题

这是普通文字

- 这是列表项1
- 这是列表项2

**这是加粗文字**
```

### 3.6 完整示例：第一个数据分析

让我们在 Jupyter 中完成一个简单的数据分析：

**步骤1：创建新笔记本**

```
1. 打开 Jupyter Notebook
2. New → Python 3
3. 重命名为 "first_analysis.ipynb"
```

**步骤2：输入以下代码（每个代码块一个单元格）**

```python
# 第一个单元格：导入库
import pandas as pd
import numpy as np

print("库导入成功！")
```

```python
# 第二个单元格：创建模拟数据
# 创建一个简单的销售数据
data = pd.DataFrame({
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
    '产品': ['iPhone', 'iPad', 'iPhone', 'MacBook', 'iPad'],
    '销量': [10, 5, 8, 3, 7],
    '单价': [7999, 5999, 7999, 12999, 5999]
})

# 显示数据
print("销售数据：")
print(data)
```

```python
# 第三个单元格：计算销售额
data['销售额'] = data['销量'] * data['单价']

print("添加销售额列：")
print(data)
```

```python
# 第四个单元格：统计各产品销售情况
summary = data.groupby('产品').agg({
    '销量': 'sum',
    '销售额': 'sum'
})

print("各产品销售统计：")
print(summary)
```

```python
# 第五个单元格：计算总销售额
total = data['销售额'].sum()
print(f"总销售额：¥{total:,}")
```

**步骤3：保存笔记本**

```
• 点击左上角 "File" → "Save"
• 或按 Ctrl + S
• 笔记本会保存为 .ipynb 文件
```

### 3.7 Jupyter 使用技巧

**技巧1：查看变量**

```python
# 在任意单元格输入变量名，会显示其内容
data        # 显示 data 数据框
summary     # 显示 summary 数据
```

**技巧2：查看帮助**

```python
# 在函数后加问号，查看帮助文档
pd.DataFrame?
print?
```

**技巧3：魔法命令**

```python
# 查看当前目录
%pwd

# 列出当前目录文件
%ls

# 查看运行时间
%timeit sum(range(10000))

# 安装包（在 Jupyter 里安装）
!pip install 包名
```

**技巧4：重启内核**

如果代码出问题，可以重启内核：

```
菜单栏 → Kernel → Restart
```

重启后，所有变量会清空，需要从头运行。

---

## 四、虚拟环境管理

### 4.1 什么是虚拟环境？

虚拟环境是**独立的 Python 环境**，每个项目可以有自己的一套库和版本。

**为什么需要虚拟环境？**

```
场景：两个项目需要不同版本的 Pandas

项目A：需要 pandas 1.5（老代码）
项目B：需要 pandas 2.0（新功能）

如果装在同一个环境：
├── pandas 只能有一个版本
├── 项目A 或 项目B 必有一个报错
└── 这就是"依赖冲突"

解决方案：虚拟环境
├── 环境A：pandas 1.5
├── 环境B：pandas 2.0
└── 各用各的，互不干扰
```

### 4.2 Conda 环境管理

**创建环境**：

```bash
# 创建名为 data_analysis 的环境，Python 版本 3.12
conda create -n data_analysis python=3.12

# 创建时会询问是否继续，输入 y 确认
```

**激活环境**：

```bash
# 激活环境（进入这个环境）
conda activate data_analysis

# 激活后，命令行前面会显示环境名：
# (data_analysis) C:\Users\xxx>
```

**安装包**：

```bash
# 在激活的环境中安装包
conda install pandas
conda install numpy
conda install matplotlib

# 或者一次性安装多个
conda install pandas numpy matplotlib
```

**退出环境**：

```bash
# 退出当前环境
conda deactivate
```

**查看所有环境**：

```bash
# 列出所有环境
conda env list

# 输出示例：
# base                  *  C:\Users\xxx\anaconda3
# data_analysis            C:\Users\xxx\anaconda3\envs\data_analysis
```

**删除环境**：

```bash
# 删除指定环境
conda env remove -n data_analysis
```

### 4.3 环境管理最佳实践

- 每个项目一个环境
- 环境名要有意义（如：sales_analysis、ml_project）
- 用 conda 安装包，不用 pip（除非 conda 没有）
- 定期清理不用的环境
- 不要往 base 环境装太多包

---

## 五、总结

### 本章学到了什么？

| 内容 | 要点 |
|-----|------|
| Python 是什么 | 编程语言，数据分析首选 |
| 为什么学 Python | 简单、生态丰富、就业热门 |
| Anaconda 安装 | 开箱即用的 Python 发行版 |
| Jupyter 使用 | 交互式编程，数据分析首选编辑器 |
| 虚拟环境 | 项目隔离，避免依赖冲突 |

### 下一步学习

```
环境搭建完成 ✅
      ↓
下一章：Python 基础语法
├── 变量和数据类型
├── 运算符
├── 输入输出
└── 字符串操作
```

---

> 恭喜你完成了 Python 环境搭建！现在你已经有了数据分析的"厨房"，下一章开始学习 Python 的基础语法。
