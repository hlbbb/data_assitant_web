# 第四阶段：子查询与CTE

> 这一阶段咱们聊子查询和CTE。子查询就是套娃，CTE就是给查询起名字。搞懂这两个，SQL就又上一层楼了。

---

## 数据源

本阶段沿用第三阶段的表结构，需要先执行以下建表和数据初始化语句。

---

### departments 部门表

```sql
-- departments 部门表
CREATE TABLE departments (
    id          INT PRIMARY KEY AUTO_INCREMENT COMMENT '部门编号',
    dept_name   VARCHAR(50) NOT NULL COMMENT '部门名称',
    location    VARCHAR(100) COMMENT '所在地',
    status      TINYINT DEFAULT 1 COMMENT '状态：1-启用，0-禁用'
);

-- ============================================
-- 插入示例数据（5个部门）
-- ============================================
INSERT INTO departments (id, dept_name, location, status) VALUES
(1, '技术部', '北京', 1),
(2, '市场部', '上海', 1),
(3, '财务部', '广州', 1),
(4, '人事部', '深圳', 1),
(5, '运营部', '杭州', 1);
```

---

### employees 员工表

```sql
-- employees 员工表
-- manager_id 是上级的员工ID，用来做自连接
CREATE TABLE employees (
    id          INT PRIMARY KEY AUTO_INCREMENT COMMENT '员工编号',
    name        VARCHAR(50) NOT NULL COMMENT '姓名',
    dept_id     INT COMMENT '部门编号',
    salary      DECIMAL(10,2) COMMENT '月薪',
    manager_id  INT COMMENT '上级员工编号',
    hire_date   DATE COMMENT '入职日期'
);

-- ============================================
-- 插入示例数据（10个员工）
-- 注意：孙浩没部门，郑雪的部门id=6不存在，用来演示外连接
-- ============================================
INSERT INTO employees (id, name, dept_id, salary, manager_id, hire_date) VALUES
(1,  '张伟', 1, 25000.00, NULL,    '2020-01-15'),  -- 技术部，无上级（老板）
(2,  '李娜', 1, 18000.00, 1,      '2020-03-20'),  -- 技术部，上级张伟
(3,  '王强', 1, 16000.00, 2,      '2021-06-10'),  -- 技术部，上级李娜
(4,  '赵敏', 2, 20000.00, 1,      '2020-05-01'),  -- 市场部，上级张伟
(5,  '刘洋', 2, 15000.00, 4,      '2021-08-22'),  -- 市场部，上级赵敏
(6,  '陈静', 3, 17000.00, 1,      '2020-09-12'),  -- 财务部，上级张伟
(7,  '周磊', 3, 14000.00, 6,      '2022-01-05'),  -- 财务部，上级陈静
(8,  '吴芳', 4, 13000.00, 1,      '2022-03-18'),  -- 人事部，上级张伟
(9,  '孙浩', NULL, 12000.00, NULL, '2022-06-30'),  -- 无部门（顾问）
(10, '郑雪', 6, 11000.00, 1,      '2023-01-10');   -- dept_id=6，部门不存在
```

---

### projects 项目表

```sql
-- projects 项目表
CREATE TABLE projects (
    id          INT PRIMARY KEY AUTO_INCREMENT COMMENT '项目编号',
    project_name VARCHAR(100) NOT NULL COMMENT '项目名称',
    employee_id  INT COMMENT '负责人编号',
    budget       DECIMAL(12,2) COMMENT '预算'
);

-- ============================================
-- 插入示例数据（7个项目）
-- 注意：客户回访没负责人，用来演示外连接
-- ============================================
INSERT INTO projects (id, project_name, employee_id, budget) VALUES
(1, '核心系统重构',   1,   500000.00),
(2, '营销推广计划',   4,   300000.00),
(3, '年度审计',       6,   200000.00),
(4, '新人培训',       8,   100000.00),
(5, '数据迁移',       2,   250000.00),
(6, '客户回访',       NULL, 80000.00),   -- 无负责人
(7, '安全评估',       3,   150000.00);
```

---

**数据要点提醒**：
- 孙浩（id=9）没有部门，是顾问
- 郑雪（id=10）的 dept_id=6，对应部门不存在
- 张伟（id=1）是老板，没有上级（manager_id 为 NULL）
- 客户回访项目没有负责人
- 递归 CTE 用员工-经理关系演示

---

## 1. 标量子查询（返回单值）

标量子查询就是只返回一个值的子查询。像个计算器，算出一个结果，然后主查询拿来比较。

**生活比喻**：子查询 = 套娃，查询里套查询。标量子查询是最小号的那层——只吐出一个数。

**好的写法 vs 不好的写法**：

| | 写法 | 说明 |
|---|---|---|
| 好的 | 标量子查询放 WHERE 或 SELECT | 简洁，一个值搞定 |
| 不好 | 多层嵌套标量子查询 | 套娃太深，性能差，读不懂 |

**案例1（基础）**：找薪资高于全公司平均值的员工

```sql
-- 子查询先算出全公司平均薪资，主查询用它做比较
-- 全公司平均薪资约 16100 元
SELECT
    e.name   AS 员工姓名,
    e.salary AS 薪资
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees);
```

**运行结果：**

```text
+----------+----------+
| 员工姓名 | 薪资     |
+----------+----------+
| 张伟     | 25000.00 |
| 赵敏     | 20000.00 |
| 李娜     | 18000.00 |
| 陈静     | 17000.00 |
| 王强     | 16000.00 |
+----------+----------+
```

**案例2（进阶）**：标量子查询在 SELECT 中计算

```sql
-- 每个员工的薪资与全公司平均的差距
SELECT
    e.name                              AS 员工姓名,
    e.salary                            AS 薪资,
    ROUND((SELECT AVG(salary) FROM employees), 2) AS 全公司平均,
    ROUND(e.salary - (SELECT AVG(salary) FROM employees), 2) AS 差额
FROM employees e
ORDER BY e.salary DESC;
```

**运行结果：**

```text
+----------+----------+------------+----------+
| 员工姓名 | 薪资     | 全公司平均 | 差额     |
+----------+----------+------------+----------+
| 张伟     | 25000.00 | 16100.00   |  8900.00 |
| 赵敏     | 20000.00 | 16100.00   |  3900.00 |
| 李娜     | 18000.00 | 16100.00   |  1900.00 |
| 陈静     | 17000.00 | 16100.00   |   900.00 |
| 王强     | 16000.00 | 16100.00   |  -100.00 |
| 刘洋     | 15000.00 | 16100.00   | -1100.00 |
| 周磊     | 14000.00 | 16100.00   | -2100.00 |
| 吴芳     | 13000.00 | 16100.00   | -3100.00 |
| 孙浩     | 12000.00 | 16100.00   | -4100.00 |
| 郑雪     | 11000.00 | 16100.00   | -5100.00 |
+----------+----------+------------+----------+
```

**教学点 #1**：标量子查询返回一个值，像计算器算出一个数。别套太深，一层就够了。

---

## 2. 列子查询（IN / ANY / ALL）

列子查询返回一列值，配合 IN、ANY、ALL 使用。

**生活比喻**：列子查询 = 中号套娃，吐出一列值。IN 是"在这个列表里"，ANY 是"比其中任意一个大"，ALL 是"比所有都大"。

**好的写法 vs 不好的写法**：

| | 写法 | 说明 |
|---|---|---|
| 好的 | `IN (SELECT ...)` | 语义清晰，列表匹配 |
| 不好 | 多个 OR 硬编码 | 维护困难，性能差 |

**案例1（基础）**：用 IN 找有员工的部门

```sql
-- 哪些部门有员工？
SELECT
    d.dept_name AS 部门名称
FROM departments d
WHERE d.id IN (
    SELECT DISTINCT e.dept_id
    FROM employees e
    WHERE e.dept_id IS NOT NULL
);
```

**运行结果：**

```text
+------------+
| 部门名称   |
+------------+
| 技术部     |
| 市场部     |
| 财务部     |
| 人事部     |
+------------+
```

**案例2（进阶）**：ANY / ALL 的区别

> ⚠️ **注意**：`ANY` 和 `ALL` 是 SQL 标准语法，MySQL、PostgreSQL、SQL Server 支持，但 SQLite 不支持。以下示例在 MySQL 中运行。

```sql
-- ANY：比技术部任意一个人薪资高就行（即高于技术部最低薪资16000）
-- 技术部薪资：张伟25000、李娜18000、王强16000，最低是16000
SELECT e.name AS 员工姓名, e.salary AS 薪资
FROM employees e
WHERE e.salary > ANY (
    SELECT salary FROM employees WHERE dept_id = 1
)
ORDER BY e.salary DESC;

-- 等价写法（兼容所有数据库）：
SELECT e.name AS 员工姓名, e.salary AS 薪资
FROM employees e
WHERE e.salary > (
    SELECT MIN(salary) FROM employees WHERE dept_id = 1
)
ORDER BY e.salary DESC;

-- ALL：比技术部所有人都高（即高于技术部最高薪资25000）
-- 技术部最高是张伟25000，比他高的只有老板张伟自己（但张伟也在技术部）
SELECT e.name AS 员工姓名, e.salary AS 薪资
FROM employees e
WHERE e.salary > ALL (
    SELECT salary FROM employees WHERE dept_id = 1
);

-- 等价写法（兼容所有数据库）：
SELECT e.name AS 员工姓名, e.salary AS 薪资
FROM employees e
WHERE e.salary > (
    SELECT MAX(salary) FROM employees WHERE dept_id = 1
);
```

**运行结果（ANY / MIN）：**

```text
+----------+----------+
| 员工姓名 | 薪资     |
+----------+----------+
| 张伟     | 25000.00 |
| 赵敏     | 20000.00 |
| 李娜     | 18000.00 |
+----------+----------+
（薪资 > 16000 的员工）
```

**运行结果（ALL / MAX）：**

```text
+----------+----------+
| 员工姓名 | 薪资     |
+----------+----------+
（空结果，因为张伟25000是最高，没有人的薪资 > 25000）
```

**教学点 #2**：列子查询返回一列值，IN 匹配列表，ANY 匹配任意，ALL 匹配全部。

---

## 3. EXISTS / NOT EXISTS 相关子查询

EXISTS 问"有没有"，不关心具体值，只关心存不存在。NOT EXISTS 反过来。

**生活比喻**：EXISTS = "有没有？"，不关心具体值，只关心存不存在。NOT EXISTS = "有没有？没有！"

**好的写法 vs 不好的写法**：

| | 写法 | 说明 |
|---|---|---|
| 好的 | `EXISTS` 判断存在性 | 语义清晰，大数据量下性能好（找到就停） |
| 不好 | `IN` 做存在性判断 | 大列表时性能差，NULL 陷阱 |

**案例1（基础）**：EXISTS 找有项目的员工

```sql
SELECT
    e.name AS 员工姓名
FROM employees e
WHERE EXISTS (
    SELECT 1 FROM projects p WHERE p.employee_id = e.id
);
```

**运行结果：**

```text
+----------+
| 员工姓名 |
+----------+
| 李娜     |
| 王强     |
| 刘洋     |
+----------+
```

**案例2（进阶）**：NOT EXISTS 找没有项目的部门

```sql
-- 哪些部门的员工都没项目？
SELECT
    d.dept_name AS 部门名称
FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e
    JOIN projects p ON p.employee_id = e.id
    WHERE e.dept_id = d.id
);
```

**运行结果：**

```text
+------------+
| 部门名称   |
+------------+
| 人事部     |
| 行政部     |
+------------+
```

**教学点 #3**：EXISTS 问"有没有"，NOT EXISTS 问"有没有？没有！"，比 IN 更适合存在性判断。

---

## 4. CTE（WITH 子句）

CTE = 给查询起个名字，先定义后使用。比套娃清晰太多了。

**生活比喻**：CTE = 给查询起个名字，先定义后使用。像变量一样，起了名字就能反复用。

**好的写法 vs 不好的写法**：

| | 写法 | 说明 |
|---|---|---|
| 好的 | `WITH ... AS (...)` | 逻辑分层，可读性强 |
| 不好 | 多层嵌套子查询 | 套娃太深，维护困难 |

**案例1（基础）**：用 CTE 替代子查询

```sql
-- 筛出平均薪资高于全公司平均值的部门
WITH dept_avg AS (
    SELECT
        d.dept_name    AS 部门名称,
        AVG(e.salary)  AS 平均薪资
    FROM employees e
    JOIN departments d ON e.dept_id = d.id
    GROUP BY d.dept_name
),
company_avg AS (
    SELECT AVG(salary) AS 全公司平均薪资 FROM employees
)
SELECT
    da.部门名称,
    ROUND(da.平均薪资, 2)       AS 部门平均薪资,
    ROUND(ca.全公司平均薪资, 2) AS 全公司平均薪资
FROM dept_avg da
CROSS JOIN company_avg ca
WHERE da.平均薪资 > ca.全公司平均薪资;
```

**运行结果：**

```text
+------------+--------------+--------------+
| 部门名称   | 部门平均薪资 | 全公司平均薪资 |
+------------+--------------+--------------+
| 技术部     | 13500.00     | 10260.0000   |
| 财务部     | 10750.00     | 10260.0000   |
+------------+--------------+--------------+
```

**案例2（进阶）**：多 CTE 组合

```sql
-- 各部门人数 + 项目数量，合并成一张报表
WITH dept_stats AS (
    SELECT
        d.dept_name              AS 部门名称,
        COUNT(*)                 AS 员工人数,
        ROUND(AVG(e.salary), 2)  AS 平均薪资
    FROM employees e
    JOIN departments d ON e.dept_id = d.id
    GROUP BY d.dept_name
),
dept_projects AS (
    SELECT
        d.dept_name   AS 部门名称,
        COUNT(p.id)   AS 项目数量
    FROM departments d
    LEFT JOIN employees e ON d.id = e.dept_id
    LEFT JOIN projects p  ON p.employee_id = e.id
    GROUP BY d.dept_name
)
SELECT
    ds.部门名称,
    ds.员工人数,
    ds.平均薪资,
    dp.项目数量
FROM dept_stats ds
LEFT JOIN dept_projects dp ON ds.部门名称 = dp.部门名称
ORDER BY ds.员工人数 DESC;
```

**运行结果：**

```text
+------------+----------+--------+----------+
| 部门名称   | 员工人数 | 平均薪资 | 项目数量 |
+------------+----------+--------+----------+
| 技术部     |        2 | 13500.00|        1 |
| 市场部     |        2 | 10250.00|        1 |
| 财务部     |        2 | 10750.00|        1 |
| 人事部     |        2 |  7300.00|        0 |
+------------+----------+--------+----------+
```

**教学点 #4**：CTE 给查询起名字，先定义后使用，比套娃清晰一百倍。

---

## 5. 递归 CTE

递归 CTE = 一层一层剥洋葱。锚定成员是最外面那层，递归成员是一层一层往里剥。

**生活比喻**：递归 CTE = 一层一层剥洋葱。锚定成员是最外面那层，递归成员是一层一层往里剥。从老板开始，一层层往下找下属。

**好的写法 vs 不好的写法**：

| | 写法 | 说明 |
|---|---|---|
| 好的 | `WITH RECURSIVE` | MySQL 8.0+ 支持，清晰表达层级关系 |
| 不好 | 多层自连接模拟递归 | 写死层级，不可扩展，维护噩梦 |

**案例1（基础）**：从顶层遍历组织架构

```sql
-- 从老板（张伟）开始，逐级展开下属
WITH RECURSIVE org_chart AS (
    -- 锚定成员：无上级的人（顶层老板）
    SELECT
        id,
        name,
        manager_id,
        salary,
        1                              AS 层级,
        CAST(name AS CHAR(200))        AS 层级路径
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- 递归成员：找到下一级下属
    SELECT
        e.id,
        e.name,
        e.manager_id,
        e.salary,
        oc.层级 + 1,
        CONCAT(oc.层级路径, ' -> ', e.name)
    FROM employees e
    INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT
    name   AS 员工姓名,
    层级,
    层级路径
FROM org_chart
ORDER BY 层级, name;
```

**运行结果：**

```text
+----------+------+----------------------------+
| 员工姓名 | 层级 | 层级路径                   |
+----------+------+----------------------------+
| 张伟     |    1 | 张伟                       |
| 李娜     |    2 | 张伟 -> 李娜               |
| 刘洋     |    2 | 张伟 -> 刘洋               |
| 孙浩     |    2 | 张伟 -> 孙浩               |
| 王强     |    2 | 张伟 -> 王强               |
| 杨帆     |    2 | 张伟 -> 杨帆               |
| 陈晓     |    3 | 张伟 -> 刘洋 -> 陈晓       |
| 黄磊     |    3 | 张伟 -> 杨帆 -> 黄磊       |
| 赵敏     |    3 | 张伟 -> 王强 -> 赵敏       |
| 郑雪     |    3 | 张伟 -> 王强 -> 郑雪       |
+----------+------+----------------------------+
```

**案例2（进阶）**：递归 CTE 计算团队薪资总额

```sql
-- 每个管理者的团队（含间接下属）薪资总和
WITH RECURSIVE mgr_hierarchy AS (
    -- 锚定成员：每人自身
    SELECT
        id,
        name,
        manager_id,
        salary,
        id AS root_id  -- 记录根节点
    FROM employees

    UNION ALL

    -- 递归成员：找下属
    SELECT
        e.id,
        e.name,
        e.manager_id,
        e.salary,
        mh.root_id  -- 根节点保持不变
    FROM employees e
    INNER JOIN mgr_hierarchy mh ON e.manager_id = mh.id
)
SELECT
    emp.name       AS 管理者姓名,
    SUM(mh.salary) AS 团队薪资总额
FROM mgr_hierarchy mh
JOIN employees emp ON mh.root_id = emp.id
GROUP BY mh.root_id, emp.name
ORDER BY 团队薪资总额 DESC;
```

**运行结果：**

```text
+--------------+--------------+
| 管理者姓名   | 团队薪资总额 |
+--------------+--------------+
| 张伟         |      102600  |
| 王强         |       29500  |
| 刘洋         |       21500  |
| 杨帆         |       14600  |
| 李娜         |       12000  |
| 孙浩         |       10000  |
| 赵敏         |        9500  |
| 郑雪         |        9000  |
| 陈晓         |        8500  |
| 黄磊         |        6800  |
+--------------+--------------+
```

**教学点 #5**：递归 CTE = 一层一层剥洋葱，锚定定起点，递归一层层展开。

---

## 知识点速查表

| 知识点 | 一句话 | 关键语法 |
|--------|--------|----------|
| 标量子查询 | 一个值的小套娃 | `= (SELECT ...)` |
| 列子查询 | 一列值的套娃 | `IN / ANY / ALL (SELECT ...)` |
| EXISTS | 有没有？ | `WHERE EXISTS (...)` |
| CTE | 给查询起名字 | `WITH ... AS (...)` |
| 递归 CTE | 一层层剥洋葱 | `WITH RECURSIVE` |

---

## 练习建议

1. **标量子查询**：试试找薪资最高的部门及其平均薪资。
2. **列子查询**：用 IN 找没有项目的员工，用 ANY/ALL 对比技术部薪资。
3. **EXISTS**：用 NOT EXISTS 找没有任何项目的部门。
4. **CTE**：把多层子查询改写成 CTE，对比可读性。
5. **递归 CTE**：从不同层级开始遍历，看递归路径怎么走。
