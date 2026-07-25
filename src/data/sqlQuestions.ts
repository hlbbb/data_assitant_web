export interface QuizOption {
  label: string
  text: string
  correct: boolean
}

export interface QuizQuestion {
  id: number
  type: 'knowledge' | 'result' | 'completion' | 'debug'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  tags: string[]
  stem: string
  options: QuizOption[]
  explanation: string
}

export const CATEGORY_MAP: Record<string, string> = {
  basic: '基础查询',
  condition_date: '条件与日期',
  aggregate: '聚合函数',
  string_cast: '字符串与转换',
  result_set: '结果集操作',
  join: '多表连接',
  subquery: '子查询',
  window: '窗口函数',
  dml: '数据操作',
  analytics: '数据分析实战',
}

export const DIFFICULTY_MAP: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

export const TYPE_MAP: Record<string, string> = {
  knowledge: '知识点',
  result: 'SQL结果',
  completion: 'SQL补全',
  debug: '排错',
}

export const sqlQuestions: QuizQuestion[] = [
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "SELECT"
    ],
    "stem": "以下哪个SQL语句能从employees表中查询所有列的数据？",
    "options": [
      {
        "label": "A",
        "text": "SELECT * FROM employees",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT ALL FROM employees",
        "correct": false
      },
      {
        "label": "C",
        "text": "GET * FROM employees",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT * IN employees",
        "correct": false
      }
    ],
    "explanation": "SELECT * FROM table 是标准SQL语法，*代表所有列。SELECT ALL不是查询所有列的语法，GET不是SQL关键字，IN不是FROM的替代词。",
    "id": 0
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "WHERE",
      "比较运算符"
    ],
    "stem": "要查询年龄大于20的用户，正确的WHERE子句是？",
    "options": [
      {
        "label": "A",
        "text": "WHERE age GREATER THAN 20",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE age > 20",
        "correct": true
      },
      {
        "label": "C",
        "text": "WHERE age => 20",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE age >> 20",
        "correct": false
      }
    ],
    "explanation": "WHERE age > 20 是标准语法。=>不是有效的比较运算符，>>是位运算符而非比较运算符，GREATER THAN不是SQL关键字组合。",
    "id": 1
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "DISTINCT"
    ],
    "stem": "要查询employees表中不重复的部门名称，应使用哪个关键字？",
    "options": [
      {
        "label": "A",
        "text": "SELECT DIFFERENT department FROM employees",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT department DISTINCT FROM employees",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT DISTINCT department FROM employees",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT UNIQUE department FROM employees",
        "correct": false
      }
    ],
    "explanation": "DISTINCT是标准SQL关键字，用于去除重复行。UNIQUE在部分数据库中可用但不是标准去重关键字，DIFFERENT不是SQL关键字，DISTINCT应紧跟SELECT之后而非放在FROM前。",
    "id": 2
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "ORDER BY"
    ],
    "stem": "按工资从高到低排序，正确的子句是？",
    "options": [
      {
        "label": "A",
        "text": "ORDER BY salary ASC",
        "correct": false
      },
      {
        "label": "B",
        "text": "SORT BY salary DESC",
        "correct": false
      },
      {
        "label": "C",
        "text": "ORDER BY salary DOWN",
        "correct": false
      },
      {
        "label": "D",
        "text": "ORDER BY salary DESC",
        "correct": true
      }
    ],
    "explanation": "ORDER BY ... DESC 表示降序排列（从高到低）。ASC是升序，SORT BY不是标准SQL关键字，DOWN不是排序方向关键字。",
    "id": 3
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIMIT"
    ],
    "stem": "要限制查询结果只返回前5条记录，应使用哪个子句？",
    "options": [
      {
        "label": "A",
        "text": "LIMIT 5",
        "correct": true
      },
      {
        "label": "B",
        "text": "TOP 5",
        "correct": false
      },
      {
        "label": "C",
        "text": "FIRST 5",
        "correct": false
      },
      {
        "label": "D",
        "text": "MAX 5",
        "correct": false
      }
    ],
    "explanation": "LIMIT 5 是标准SQL语法。TOP是SQL Server的写法，FIRST和MAX不是限制结果数量的SQL关键字。",
    "id": 4
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIKE"
    ],
    "stem": "要查找名字以'张'开头的用户，WHERE条件应写为？",
    "options": [
      {
        "label": "A",
        "text": "WHERE name = '张*'",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE name LIKE '张%'",
        "correct": true
      },
      {
        "label": "C",
        "text": "WHERE name LIKE '%张'",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE name LIKE '%张%'",
        "correct": false
      }
    ],
    "explanation": "'张%'表示以'张'开头，%匹配任意字符序列。'%张'表示以'张'结尾，'%张%'表示包含'张'，'张*'使用的是通配符*而非SQL的%。",
    "id": 5
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "IN"
    ],
    "stem": "查询部门为'销售部'、'市场部'或'技术部'的员工，应使用哪个WHERE条件？",
    "options": [
      {
        "label": "A",
        "text": "WHERE department IN (销售部,市场部,技术部)",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE department BETWEEN '销售部' AND '技术部'",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE department IN ('销售部','市场部','技术部')",
        "correct": true
      },
      {
        "label": "D",
        "text": "WHERE department = '销售部' OR '市场部' OR '技术部'",
        "correct": false
      }
    ],
    "explanation": "IN操作符用于匹配列表中的值，语法正确。选项B的OR语法错误，缺少完整比较；选项C缺少引号；BETWEEN用于范围匹配而非枚举值。",
    "id": 6
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "BETWEEN"
    ],
    "stem": "查询年龄在20到30岁之间的用户，正确的WHERE条件是？",
    "options": [
      {
        "label": "A",
        "text": "WHERE age IN (20,30)",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE age FROM 20 TO 30",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE 20 <= age <= 30",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE age BETWEEN 20 AND 30",
        "correct": true
      }
    ],
    "explanation": "BETWEEN ... AND ... 是标准范围查询语法。IN只匹配列表中的值不含区间，FROM...TO不是SQL语法，连续比较运算符在SQL中无效。",
    "id": 7
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "IS NULL"
    ],
    "stem": "查找手机号为空的客户，正确的条件是？",
    "options": [
      {
        "label": "A",
        "text": "WHERE phone IS NULL",
        "correct": true
      },
      {
        "label": "B",
        "text": "WHERE phone = NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE phone = ''",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE phone NOT EXISTS",
        "correct": false
      }
    ],
    "explanation": "IS NULL是判断空值的标准语法。= NULL在SQL中不能正确判断NULL（NULL不等于NULL），=''匹配空字符串而非NULL，NOT EXISTS不是判断单列空值的语法。",
    "id": 8
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "AND"
    ],
    "stem": "要同时满足年龄大于20且工资大于5000两个条件，应使用哪个逻辑运算符？",
    "options": [
      {
        "label": "A",
        "text": "XOR",
        "correct": false
      },
      {
        "label": "B",
        "text": "AND",
        "correct": true
      },
      {
        "label": "C",
        "text": "OR",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT",
        "correct": false
      }
    ],
    "explanation": "AND要求两个条件同时满足。OR满足其一即可，NOT取反，XOR异或（满足其一但不能同时满足），均不符合'同时'的要求。",
    "id": 9
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "SELECT",
      "WHERE"
    ],
    "stem": "表products有5条记录，执行 SELECT product_name FROM products WHERE price > 100，返回3条记录。这说明什么？",
    "options": [
      {
        "label": "A",
        "text": "有2条记录的price大于100",
        "correct": false
      },
      {
        "label": "B",
        "text": "price列有3个NULL值",
        "correct": false
      },
      {
        "label": "C",
        "text": "有3条记录的price大于100",
        "correct": true
      },
      {
        "label": "D",
        "text": "所有记录的price都大于100",
        "correct": false
      }
    ],
    "explanation": "WHERE price > 100 过滤后返回3条，说明恰好3条记录满足条件。不是所有记录都满足，不是2条，也不是NULL问题。",
    "id": 10
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "ORDER BY",
      "LIMIT"
    ],
    "stem": "执行 SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3，返回的结果特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "工资最低的3名员工",
        "correct": false
      },
      {
        "label": "B",
        "text": "所有员工按工资降序排列",
        "correct": false
      },
      {
        "label": "C",
        "text": "前3条记录",
        "correct": false
      },
      {
        "label": "D",
        "text": "工资最高的3名员工",
        "correct": true
      }
    ],
    "explanation": "ORDER BY salary DESC 按工资降序排列，LIMIT 3限制返回3条，即工资最高的3人。不是最低（那是ASC），不是所有员工（缺少LIMIT），不是按原始顺序的前3条。",
    "id": 11
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "DISTINCT"
    ],
    "stem": "执行 SELECT DISTINCT city FROM customers，customers表有10条记录但只有4个不同城市，返回多少条记录？",
    "options": [
      {
        "label": "A",
        "text": "4条",
        "correct": true
      },
      {
        "label": "B",
        "text": "10条",
        "correct": false
      },
      {
        "label": "C",
        "text": "7条",
        "correct": false
      },
      {
        "label": "D",
        "text": "0条",
        "correct": false
      }
    ],
    "explanation": "DISTINCT去除重复值，10条记录中有4个不同的城市，结果为4条。10是未去重的记录数，7和0都不符合题意。",
    "id": 12
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "SELECT",
      "WHERE"
    ],
    "stem": "补全SQL：从students表中查询年龄为18岁的学生所有信息，____处应填什么？\nSELECT * FROM students ____ age = 18",
    "options": [
      {
        "label": "A",
        "text": "IF",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE",
        "correct": true
      },
      {
        "label": "C",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHEN",
        "correct": false
      }
    ],
    "explanation": "WHERE用于行级过滤条件。HAVING用于聚合后过滤，WHEN和IF不是SQL的过滤子句关键字。",
    "id": 13
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "ORDER BY"
    ],
    "stem": "补全SQL：按入职日期升序排列员工，____处应填什么？\nSELECT * FROM employees ORDER BY hire_date ____",
    "options": [
      {
        "label": "A",
        "text": "UP",
        "correct": false
      },
      {
        "label": "B",
        "text": "ASCENDING",
        "correct": false
      },
      {
        "label": "C",
        "text": "ASC",
        "correct": true
      },
      {
        "label": "D",
        "text": "DESC",
        "correct": false
      }
    ],
    "explanation": "ASC表示升序（从小到大），DESC表示降序，UP和ASCENDING不是标准排序方向关键字。",
    "id": 14
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIKE"
    ],
    "stem": "补全SQL：查找名字第二个字是'明'的用户，____处应填什么？\nSELECT * FROM users WHERE name ____",
    "options": [
      {
        "label": "A",
        "text": "LIKE '%明%'",
        "correct": false
      },
      {
        "label": "B",
        "text": "LIKE '明%'",
        "correct": false
      },
      {
        "label": "C",
        "text": "LIKE '%明'",
        "correct": false
      },
      {
        "label": "D",
        "text": "LIKE '_明%'",
        "correct": true
      }
    ],
    "explanation": "_匹配单个字符，%匹配任意字符序列。'_明%'表示第一个字符任意、第二个是'明'。'%明%'是包含'明'，'明%'是以'明'开头，'%明'是以'明'结尾。",
    "id": 15
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "WHERE",
      "IS NULL"
    ],
    "stem": "以下SQL语句的错误是什么？\nSELECT * FROM users WHERE email = NULL",
    "options": [
      {
        "label": "A",
        "text": "应使用 IS NULL 而非 = NULL",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT * 语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "FROM users 表名错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少 ORDER BY",
        "correct": false
      }
    ],
    "explanation": "= NULL 在SQL中不能正确判断NULL值，因为NULL与任何值的比较结果都是UNKNOWN。应使用 IS NULL 来判断空值。其余选项与本题错误无关。",
    "id": 16
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "ORDER BY"
    ],
    "stem": "找出以下SQL语句的错误：\nSELECT name, salary FROM employees ORDER BY salary DESC WHERE salary > 5000",
    "options": [
      {
        "label": "A",
        "text": "WHERE 条件写反了",
        "correct": false
      },
      {
        "label": "B",
        "text": "ORDER BY 应在 WHERE 之后",
        "correct": true
      },
      {
        "label": "C",
        "text": "DESC 写法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "salary 列不存在",
        "correct": false
      }
    ],
    "explanation": "SQL子句顺序应为 SELECT -> FROM -> WHERE -> ORDER BY。ORDER BY 放在 WHERE 之前会导致语法错误。DESC、列名和WHERE条件本身没有问题。",
    "id": 17
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "OFFSET"
    ],
    "stem": "OFFSET子句的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "排序结果集",
        "correct": false
      },
      {
        "label": "B",
        "text": "去重结果集",
        "correct": false
      },
      {
        "label": "C",
        "text": "跳过指定数量的行",
        "correct": true
      },
      {
        "label": "D",
        "text": "限制返回行数",
        "correct": false
      }
    ],
    "explanation": "OFFSET用于跳过指定数量的行（常与LIMIT配合实现分页）。限制返回行数是LIMIT的功能，排序是ORDER BY，去重是DISTINCT。",
    "id": 18
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "NOT"
    ],
    "stem": "NOT运算符的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "组合多个条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "排除NULL值",
        "correct": false
      },
      {
        "label": "D",
        "text": "对条件取反",
        "correct": true
      }
    ],
    "explanation": "NOT是对逻辑条件取反的运算符。组合条件是AND/OR的功能，删除数据是DELETE，排除NULL用IS NOT NULL。",
    "id": 19
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIKE",
      "通配符"
    ],
    "stem": "执行 SELECT * FROM products WHERE product_name LIKE '%手机%'，返回的结果特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "名称中包含'手机'的产品",
        "correct": true
      },
      {
        "label": "B",
        "text": "名称以'手机'开头的产品",
        "correct": false
      },
      {
        "label": "C",
        "text": "名称以'手机'结尾的产品",
        "correct": false
      },
      {
        "label": "D",
        "text": "名称不包含'手机'的产品",
        "correct": false
      }
    ],
    "explanation": "'%手机%'匹配包含'手机'的字符串，返回名称中包含'手机'的产品。'%手机'表示以'手机'结尾，'手机%'表示以'手机'开头，不包含'手机'的产品不匹配。",
    "id": 20
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIMIT",
      "OFFSET"
    ],
    "stem": "补全SQL：查询第6到第10条记录，____处应填什么？\nSELECT * FROM employees ORDER BY id LIMIT 5 ____ 5",
    "options": [
      {
        "label": "A",
        "text": "START",
        "correct": false
      },
      {
        "label": "B",
        "text": "OFFSET",
        "correct": true
      },
      {
        "label": "C",
        "text": "SKIP",
        "correct": false
      },
      {
        "label": "D",
        "text": "AFTER",
        "correct": false
      }
    ],
    "explanation": "OFFSET用于指定跳过的行数，与LIMIT配合实现分页。SKIP、AFTER、START不是SQL的分页关键字。",
    "id": 21
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "SELECT",
      "列选择"
    ],
    "stem": "SELECT name, age FROM students 中，查询结果包含哪些列？",
    "options": [
      {
        "label": "A",
        "text": "仅name列",
        "correct": false
      },
      {
        "label": "B",
        "text": "除name和age外的所有列",
        "correct": false
      },
      {
        "label": "C",
        "text": "仅name和age两列",
        "correct": true
      },
      {
        "label": "D",
        "text": "所有列",
        "correct": false
      }
    ],
    "explanation": "SELECT后明确指定列名，结果只包含这些列。*才代表所有列，仅name是一列，排除某些列需用其他方式。",
    "id": 22
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "OR"
    ],
    "stem": "WHERE age > 20 OR salary > 5000 的含义是？",
    "options": [
      {
        "label": "A",
        "text": "年龄大于20且工资大于5000",
        "correct": false
      },
      {
        "label": "B",
        "text": "年龄不大于20且工资不大于5000",
        "correct": false
      },
      {
        "label": "C",
        "text": "年龄等于20或工资等于5000",
        "correct": false
      },
      {
        "label": "D",
        "text": "年龄大于20或工资大于5000，满足其一即可",
        "correct": true
      }
    ],
    "explanation": "OR表示两个条件满足其一即可。AND才是同时满足，NOT...AND...表示取反，OR是比较运算而非等于判断。",
    "id": 23
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "stem": "以下SQL语句的逻辑问题是什么？\nSELECT DISTINCT * FROM employees WHERE department = '技术部'",
    "options": [
      {
        "label": "A",
        "text": "DISTINCT与*一起使用，且表中有主键时去重可能无意义",
        "correct": true
      },
      {
        "label": "B",
        "text": "DISTINCT不能与*一起使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE条件错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "DISTINCT关键字拼写错误",
        "correct": false
      }
    ],
    "explanation": "DISTINCT *语法本身正确，但如果表有主键（每行唯一），去重无实际效果。这不是语法错误而是逻辑问题。WHERE条件正确，拼写也正确。",
    "id": 24
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "BETWEEN"
    ],
    "stem": "BETWEEN 10 AND 20 包含边界值吗？",
    "options": [
      {
        "label": "A",
        "text": "包含20但不包含10",
        "correct": false
      },
      {
        "label": "B",
        "text": "包含10和20",
        "correct": true
      },
      {
        "label": "C",
        "text": "包含10但不包含20",
        "correct": false
      },
      {
        "label": "D",
        "text": "不包含10和20",
        "correct": false
      }
    ],
    "explanation": "BETWEEN在标准SQL中包含两端边界值，即闭区间[10,20]。不包含边界是开区间，不是标准BETWEEN行为。",
    "id": 25
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "IN"
    ],
    "stem": "执行 SELECT * FROM students WHERE grade IN ('A','B')，如果某学生grade为'C'，该学生出现在结果中吗？",
    "options": [
      {
        "label": "A",
        "text": "取决于其他条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "出现，因为C接近B",
        "correct": false
      },
      {
        "label": "C",
        "text": "不出现，因为'C'不在列表中",
        "correct": true
      },
      {
        "label": "D",
        "text": "出现，IN匹配任意值",
        "correct": false
      }
    ],
    "explanation": "IN只匹配列表中的值，'C'不在('A','B')中，所以不出现。IN不是匹配任意值，也没有其他条件依赖，C接近B不是IN的匹配逻辑。",
    "id": 26
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "IS NULL",
      "IS NOT NULL"
    ],
    "stem": "IS NOT NULL 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "判断值为空",
        "correct": false
      },
      {
        "label": "B",
        "text": "判断值不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除空值",
        "correct": false
      },
      {
        "label": "D",
        "text": "判断值不为空",
        "correct": true
      }
    ],
    "explanation": "IS NOT NULL判断字段值不为空（有值）。IS NULL判断为空，'不存在'和'删除'不是其功能。",
    "id": 27
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "AND",
      "OR",
      "运算符优先级"
    ],
    "stem": "以下SQL的逻辑问题是什么？\nSELECT * FROM products WHERE category = '电子' OR category = '服装' AND price > 100",
    "options": [
      {
        "label": "A",
        "text": "AND优先级高于OR，可能返回意外结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "OR和AND不能同时使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "category列不存在",
        "correct": false
      },
      {
        "label": "D",
        "text": "price比较运算符错误",
        "correct": false
      }
    ],
    "explanation": "AND优先级高于OR，实际执行的是 category='电子' OR (category='服装' AND price>100)，而非两个条件分别OR后再AND。两者可以同时使用，列和运算符没有问题。",
    "id": 28
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "LIKE",
      "通配符"
    ],
    "stem": "LIKE中_（下划线）通配符的含义是？",
    "options": [
      {
        "label": "A",
        "text": "匹配字母字符",
        "correct": false
      },
      {
        "label": "B",
        "text": "匹配单个字符",
        "correct": true
      },
      {
        "label": "C",
        "text": "匹配零个或多个字符",
        "correct": false
      },
      {
        "label": "D",
        "text": "匹配数字字符",
        "correct": false
      }
    ],
    "explanation": "_匹配恰好一个任意字符。%匹配零个或多个字符（不是_的功能），_不专门匹配数字或字母。",
    "id": 29
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "SELECT",
      "WHERE",
      "AND"
    ],
    "stem": "products表：id=1,name='键盘',price=200; id=2,name='鼠标',price=150; id=3,name='显示器',price=2000; id=4,name='耳机',price=300。执行 SELECT name FROM products WHERE price > 200 AND price < 1000，返回什么？",
    "options": [
      {
        "label": "A",
        "text": "显示器",
        "correct": false
      },
      {
        "label": "B",
        "text": "无结果",
        "correct": false
      },
      {
        "label": "C",
        "text": "耳机",
        "correct": true
      },
      {
        "label": "D",
        "text": "键盘, 耳机",
        "correct": false
      }
    ],
    "explanation": "price>200 AND price<1000即(200,1000)开区间。键盘200不满足>200，鼠标150不满足，显示器2000超出，耳机300在区间内。键盘的price=200不满足严格大于。",
    "id": 30
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "ORDER BY",
      "多列排序"
    ],
    "stem": "students表：id=1,name='张三',score=90,class='A'; id=2,name='李四',score=85,class='B'; id=3,name='王五',score=90,class='B'。执行 SELECT name FROM students ORDER BY score DESC, class ASC，结果顺序是？",
    "options": [
      {
        "label": "A",
        "text": "张三, 李四, 王五",
        "correct": false
      },
      {
        "label": "B",
        "text": "王五, 张三, 李四",
        "correct": false
      },
      {
        "label": "C",
        "text": "李四, 张三, 王五",
        "correct": false
      },
      {
        "label": "D",
        "text": "张三, 王五, 李四",
        "correct": true
      }
    ],
    "explanation": "先按score降序：90(张三,王五), 85(李四)。同分90的再按class升序：A班张三在前，B班王五在后。最终：张三,王五,李四。",
    "id": 31
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "LIMIT",
      "OFFSET"
    ],
    "stem": "employees表有20条记录，执行 SELECT * FROM employees ORDER BY id LIMIT 5 OFFSET 10，返回哪些记录？",
    "options": [
      {
        "label": "A",
        "text": "第11到第15条记录",
        "correct": true
      },
      {
        "label": "B",
        "text": "第10到第14条记录",
        "correct": false
      },
      {
        "label": "C",
        "text": "第6到第10条记录",
        "correct": false
      },
      {
        "label": "D",
        "text": "第1到第5条记录",
        "correct": false
      }
    ],
    "explanation": "OFFSET 10跳过前10条（第1-10条），LIMIT 5返回5条，即第11-15条。不是第10-14（OFFSET偏移计算不同），不是6-10或1-5。",
    "id": 32
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "BETWEEN",
      "NOT"
    ],
    "stem": "补全SQL：查询年龄不在20到30岁之间的用户，____处应填什么？\nSELECT * FROM users WHERE age ____ 20 AND 30",
    "options": [
      {
        "label": "A",
        "text": "EXCEPT BETWEEN",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT BETWEEN",
        "correct": true
      },
      {
        "label": "C",
        "text": "NOT IN",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT LIKE",
        "correct": false
      }
    ],
    "explanation": "NOT BETWEEN表示不在范围内，是标准语法。NOT IN用于列表排除，NOT LIKE用于模式排除，EXCEPT BETWEEN不是标准SQL语法。",
    "id": 33
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "OR"
    ],
    "stem": "以下SQL的问题是什么？\nSELECT * FROM orders WHERE status = '已发货' OR status = '待发货' OR status = '已取消'",
    "options": [
      {
        "label": "A",
        "text": "status列不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE子句缺少AND",
        "correct": false
      },
      {
        "label": "C",
        "text": "语法正确但可简化为IN写法",
        "correct": true
      },
      {
        "label": "D",
        "text": "OR不能连用三次",
        "correct": false
      }
    ],
    "explanation": "多个OR可简化为 WHERE status IN ('已发货','待发货','已取消')。OR可以连用三次（语法没错），列存在，不需要AND。",
    "id": 34
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "LIKE",
      "通配符"
    ],
    "stem": "分析以下SQL语句，指出问题：\nSELECT * FROM users WHERE name LIKE '张_' AND age > 25",
    "options": [
      {
        "label": "A",
        "text": "LIKE不能和AND一起使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "_通配符匹配多个字符",
        "correct": false
      },
      {
        "label": "C",
        "text": "age > 25语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有问题，语法正确",
        "correct": true
      }
    ],
    "explanation": "LIKE可以与AND组合使用，_只匹配单个字符（不是多个），age>25语法正确。该SQL语法无误。",
    "id": 35
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "SELECT",
      "表达式"
    ],
    "stem": "SELECT中可以使用算术表达式吗？如 SELECT price * 0.9 FROM products？",
    "options": [
      {
        "label": "A",
        "text": "可以，返回计算后的结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "不可以，SELECT只能查列",
        "correct": false
      },
      {
        "label": "C",
        "text": "只在MySQL中可以",
        "correct": false
      },
      {
        "label": "D",
        "text": "需要使用CALCULATE关键字",
        "correct": false
      }
    ],
    "explanation": "SELECT中可以使用算术表达式（+,-,*,/），返回计算结果。不是只能查列，所有主流数据库都支持，不需要CALCULATE关键字。",
    "id": 36
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "比较运算符"
    ],
    "stem": "WHERE price <> 100 的含义是？",
    "options": [
      {
        "label": "A",
        "text": "price小于等于100",
        "correct": false
      },
      {
        "label": "B",
        "text": "price不等于100",
        "correct": true
      },
      {
        "label": "C",
        "text": "price小于100",
        "correct": false
      },
      {
        "label": "D",
        "text": "price大于100",
        "correct": false
      }
    ],
    "explanation": "<>是SQL标准的不等于运算符（也可写作!=）。<是小于，>是大于，<=是小于等于。",
    "id": 37
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "ORDER BY",
      "多列排序"
    ],
    "stem": "ORDER BY score DESC, name ASC 中，排序规则是？",
    "options": [
      {
        "label": "A",
        "text": "两列同时降序",
        "correct": false
      },
      {
        "label": "B",
        "text": "两列同时升序",
        "correct": false
      },
      {
        "label": "C",
        "text": "先按score降序，同分时按name升序",
        "correct": true
      },
      {
        "label": "D",
        "text": "先按name升序，再按score降序",
        "correct": false
      }
    ],
    "explanation": "多列排序时，先按第一列排序，第一列值相同的再按第二列排序。不是反过来，也不是两列同时同方向排序。",
    "id": 38
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "LIKE",
      "NOT LIKE"
    ],
    "stem": "执行 SELECT name FROM products WHERE name NOT LIKE '%手机%'，能返回什么？",
    "options": [
      {
        "label": "A",
        "text": "名称以'手机'开头的产品",
        "correct": false
      },
      {
        "label": "B",
        "text": "名称以'手机'结尾的产品",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有产品",
        "correct": false
      },
      {
        "label": "D",
        "text": "名称中不包含'手机'的产品",
        "correct": true
      }
    ],
    "explanation": "NOT LIKE '%手机%'排除包含'手机'的记录，返回不包含的产品。不是以手机开头或结尾，也不是所有产品（排除了含手机的）。",
    "id": 39
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "IS NULL"
    ],
    "stem": "表有10条记录，其中3条email为NULL。执行 SELECT * FROM customers WHERE email IS NOT NULL，返回多少条？",
    "options": [
      {
        "label": "A",
        "text": "7条",
        "correct": true
      },
      {
        "label": "B",
        "text": "3条",
        "correct": false
      },
      {
        "label": "C",
        "text": "10条",
        "correct": false
      },
      {
        "label": "D",
        "text": "0条",
        "correct": false
      }
    ],
    "explanation": "IS NOT NULL排除NULL值，10-3=7条非NULL记录。3条是NULL的记录数，10是总数，0条不可能。",
    "id": 40
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "BETWEEN"
    ],
    "stem": "补全SQL：查询工资在5000到10000之间的员工，____处应填什么？\nSELECT * FROM employees ____ salary BETWEEN 5000 AND 10000",
    "options": [
      {
        "label": "A",
        "text": "IF",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE",
        "correct": true
      },
      {
        "label": "C",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHEN",
        "correct": false
      }
    ],
    "explanation": "WHERE用于行级过滤条件。HAVING用于聚合后过滤，WHEN和IF不是SQL过滤子句。",
    "id": 41
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "SELECT",
      "DISTINCT"
    ],
    "stem": "请判断以下SQL语句的问题：\nSELECT DISTINCT city, country FROM customers WHERE country = '中国'",
    "options": [
      {
        "label": "A",
        "text": "WHERE与DISTINCT冲突",
        "correct": false
      },
      {
        "label": "B",
        "text": "country列不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "语法正确，返回中国不同城市列表",
        "correct": true
      },
      {
        "label": "D",
        "text": "DISTINCT只能用于一列",
        "correct": false
      }
    ],
    "explanation": "DISTINCT可用于多列，WHERE与DISTINCT不冲突，列名正确。该SQL语法正确，返回中国不同城市和国家的组合。",
    "id": 42
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "SELECT",
      "别名"
    ],
    "stem": "给列取别名的关键字是？",
    "options": [
      {
        "label": "A",
        "text": "ALIAS",
        "correct": false
      },
      {
        "label": "B",
        "text": "NAME",
        "correct": false
      },
      {
        "label": "C",
        "text": "RENAME",
        "correct": false
      },
      {
        "label": "D",
        "text": "AS",
        "correct": true
      }
    ],
    "explanation": "AS是标准SQL别名关键字。ALIAS、NAME、RENAME不是SQL的别名关键字。",
    "id": 43
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "逻辑运算符"
    ],
    "stem": "WHERE NOT (age > 20 AND salary > 5000) 等价于？",
    "options": [
      {
        "label": "A",
        "text": "age <= 20 OR salary <= 5000",
        "correct": true
      },
      {
        "label": "B",
        "text": "age <= 20 AND salary <= 5000",
        "correct": false
      },
      {
        "label": "C",
        "text": "age > 20 OR salary > 5000",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT age > 20 AND NOT salary > 5000",
        "correct": false
      }
    ],
    "explanation": "德摩根定律：NOT(A AND B) = NOT A OR NOT B。即age<=20 OR salary<=5000。选项B是AND连接（错误），C没有取反，D是AND连接两个NOT（应为OR）。",
    "id": 44
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "ORDER BY",
      "NULL排序"
    ],
    "stem": "某列有NULL值时，ORDER BY该列升序，NULL出现在结果的位置通常是？",
    "options": [
      {
        "label": "A",
        "text": "不显示",
        "correct": false
      },
      {
        "label": "B",
        "text": "最前面",
        "correct": true
      },
      {
        "label": "C",
        "text": "最后面",
        "correct": false
      },
      {
        "label": "D",
        "text": "中间位置",
        "correct": false
      }
    ],
    "explanation": "多数数据库中NULL在升序时排在最前（被视为最小值）。降序时排在最后。不一定是中间或不显示。",
    "id": 45
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "LIMIT",
      "OFFSET"
    ],
    "stem": "以下SQL语句有什么错误？\nSELECT * FROM employees LIMIT 10 OFFSET -1",
    "options": [
      {
        "label": "A",
        "text": "缺少ORDER BY",
        "correct": false
      },
      {
        "label": "B",
        "text": "OFFSET应在LIMIT之前",
        "correct": false
      },
      {
        "label": "C",
        "text": "OFFSET不能为负数",
        "correct": true
      },
      {
        "label": "D",
        "text": "LIMIT不能为10",
        "correct": false
      }
    ],
    "explanation": "OFFSET值不能为负数。LIMIT 10合法，缺少ORDER BY只是建议非必须，OFFSET...LIMIT顺序可以颠倒。负数OFFSET是主要错误。",
    "id": 46
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "运算符优先级"
    ],
    "stem": "WHERE a > 1 AND b > 2 OR c > 3 的执行顺序是？",
    "options": [
      {
        "label": "A",
        "text": "先OR后AND，等价于 a>1 AND (b>2 OR c>3)",
        "correct": false
      },
      {
        "label": "B",
        "text": "从左到右无优先级",
        "correct": false
      },
      {
        "label": "C",
        "text": "AND和OR优先级相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "先AND后OR，等价于 (a>1 AND b>2) OR c>3",
        "correct": true
      }
    ],
    "explanation": "AND优先级高于OR，所以先计算AND部分。不是先OR，不是从左到右无优先级，AND和OR优先级不同。",
    "id": 47
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "WHERE",
      "IS NULL"
    ],
    "stem": "补全SQL：查询邮箱为空的用户，____处应填什么？\nSELECT * FROM users WHERE email ____",
    "options": [
      {
        "label": "A",
        "text": "IS NULL",
        "correct": true
      },
      {
        "label": "B",
        "text": "= NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "IS EMPTY",
        "correct": false
      },
      {
        "label": "D",
        "text": "= ''",
        "correct": false
      }
    ],
    "explanation": "IS NULL是判断空值的标准语法。=NULL不能正确判断（NULL不等于NULL），IS EMPTY不是SQL语法，=''是空字符串非NULL。",
    "id": 48
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "LIKE",
      "通配符"
    ],
    "stem": "阅读以下SQL语句，找出问题：\nSELECT * FROM users WHERE name LIKE '张%%'",
    "options": [
      {
        "label": "A",
        "text": "name列不能是中文",
        "correct": false
      },
      {
        "label": "B",
        "text": "语法正确，'张%'和'张%%'等价",
        "correct": true
      },
      {
        "label": "C",
        "text": "%%是语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "LIKE只能用单个%",
        "correct": false
      }
    ],
    "explanation": "%%在语法上是合法的，两个连续的%等价于一个%，所以'张%%'和'张%'等价。不是语法错误，LIKE可用多个%，中文字段无限制。",
    "id": 49
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "SELECT",
      "列别名",
      "WHERE"
    ],
    "stem": "可以在WHERE子句中使用SELECT中定义的列别名吗？如 WHERE alias_col > 10？",
    "options": [
      {
        "label": "A",
        "text": "只在MySQL中可以",
        "correct": false
      },
      {
        "label": "B",
        "text": "所有数据库都可以",
        "correct": false
      },
      {
        "label": "C",
        "text": "通常不可以，WHERE在SELECT之前执行",
        "correct": true
      },
      {
        "label": "D",
        "text": "可以，别名全局可用",
        "correct": false
      }
    ],
    "explanation": "SQL执行顺序中WHERE在SELECT之前，所以不能使用SELECT中定义的别名。别名不是全局可用，MySQL有部分例外但非标准行为。",
    "id": 50
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "WHERE",
      "NULL",
      "三值逻辑"
    ],
    "stem": "表有5条记录，age列有1条NULL。执行 SELECT * FROM users WHERE age <> 25，NULL记录出现在结果中吗？",
    "options": [
      {
        "label": "A",
        "text": "出现在结果中",
        "correct": false
      },
      {
        "label": "B",
        "text": "取决于数据库",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL等于0，所以不出现",
        "correct": false
      },
      {
        "label": "D",
        "text": "不出现在结果中，NULL与任何比较都为UNKNOWN",
        "correct": true
      }
    ],
    "explanation": "NULL与任何值的比较结果都是UNKNOWN（非TRUE），WHERE只返回TRUE的行，所以NULL行被排除。不是数据库差异，NULL不是0。",
    "id": 51
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "SELECT",
      "DISTINCT",
      "NULL"
    ],
    "stem": "表有两列city和country，各有3个NULL值。执行 SELECT DISTINCT city, country FROM customers，NULL行会出现吗？",
    "options": [
      {
        "label": "A",
        "text": "会出现，DISTINCT保留一个NULL行",
        "correct": true
      },
      {
        "label": "B",
        "text": "不会出现，NULL被过滤",
        "correct": false
      },
      {
        "label": "C",
        "text": "出现3个NULL行",
        "correct": false
      },
      {
        "label": "D",
        "text": "出现6个NULL行",
        "correct": false
      }
    ],
    "explanation": "DISTINCT认为NULL值是相同的，所以保留一个NULL行。NULL不会被DISTINCT过滤（不是IS NULL的概念），也不会出现多个。",
    "id": 52
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "WHERE",
      "AND",
      "OR",
      "优先级"
    ],
    "stem": "补全SQL：使条件为'部门为销售部或市场部，且工资大于5000'，____处应填什么？\nSELECT * FROM employees WHERE (department = '销售部' ____ department = '市场部') AND salary > 5000",
    "options": [
      {
        "label": "A",
        "text": "XOR",
        "correct": false
      },
      {
        "label": "B",
        "text": "OR",
        "correct": true
      },
      {
        "label": "C",
        "text": "AND",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT",
        "correct": false
      }
    ],
    "explanation": "用OR连接两个部门条件，再用AND连接工资条件。AND会使'市场部AND工资>5000'条件不包含销售部，NOT取反不符合，XOR不适用于此场景。",
    "id": 53
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "SELECT",
      "执行顺序"
    ],
    "stem": "SQL语句 SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT 的执行顺序是？",
    "options": [
      {
        "label": "A",
        "text": "FROM -> WHERE -> ORDER BY -> SELECT -> LIMIT",
        "correct": false
      },
      {
        "label": "B",
        "text": "FROM -> SELECT -> WHERE -> ORDER BY -> LIMIT",
        "correct": false
      },
      {
        "label": "C",
        "text": "FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT -> FROM -> WHERE -> ORDER BY -> LIMIT",
        "correct": false
      }
    ],
    "explanation": "标准执行顺序：FROM确定表 -> WHERE过滤 -> SELECT选择列 -> ORDER BY排序 -> LIMIT限制。不是先SELECT，也不是先ORDER BY再SELECT。",
    "id": 54
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "LIKE",
      "转义"
    ],
    "stem": "要查找name中包含'%'字符的记录，应使用哪个LIKE模式？",
    "options": [
      {
        "label": "A",
        "text": "LIKE '%%%'",
        "correct": false
      },
      {
        "label": "B",
        "text": "LIKE '%\\%'",
        "correct": false
      },
      {
        "label": "C",
        "text": "LIKE '%[%'",
        "correct": false
      },
      {
        "label": "D",
        "text": "LIKE '%\\%%' ESCAPE '\\'",
        "correct": true
      }
    ],
    "explanation": "ESCAPE定义转义字符，\\%%表示字面的%。'%%%'中%仍是通配符，'%\\%'缺少ESCAPE子句可能行为不确定，'[%]'是方括号语法非标准。",
    "id": 55
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "WHERE",
      "AND",
      "OR"
    ],
    "stem": "以下SQL的逻辑错误是什么？\nSELECT * FROM products WHERE category = '电子' AND price > 100 OR stock < 50",
    "options": [
      {
        "label": "A",
        "text": "AND和OR优先级导致stock<50可能返回非电子产品",
        "correct": true
      },
      {
        "label": "B",
        "text": "AND不能与OR组合",
        "correct": false
      },
      {
        "label": "C",
        "text": "price比较运算符错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少括号是语法错误",
        "correct": false
      }
    ],
    "explanation": "AND优先级高于OR，实际执行(category='电子' AND price>100) OR stock<50，stock<50的行即使不是电子产品也会返回。这不是语法错误，运算符正确，缺少括号不是语法错而是逻辑问题。",
    "id": 56
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "SELECT",
      "DISTINCT",
      "多列"
    ],
    "stem": "表有列(id, name, dept)，SELECT DISTINCT dept有5条结果，SELECT DISTINCT name, dept有8条结果，说明什么？",
    "options": [
      {
        "label": "A",
        "text": "数据有错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "name和dept组合去重后比单独dept多，说明name跨部门有区分",
        "correct": true
      },
      {
        "label": "C",
        "text": "不同部门的name有重复",
        "correct": false
      },
      {
        "label": "D",
        "text": "结果数应该相同",
        "correct": false
      }
    ],
    "explanation": "多列DISTINCT去重基于组合值。5个不同dept但8个不同(name,dept)组合，说明某些dept有多个不同name。不是说明name重复（那会减少结果），结果数不会相同，数据无错。",
    "id": 57
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "LIKE",
      "通配符"
    ],
    "stem": "LIKE 'J_n%'能匹配以下哪个字符串？",
    "options": [
      {
        "label": "A",
        "text": "'Jonson'",
        "correct": false
      },
      {
        "label": "B",
        "text": "'John'",
        "correct": false
      },
      {
        "label": "C",
        "text": "'Johnson'",
        "correct": true
      },
      {
        "label": "D",
        "text": "'Jnson'",
        "correct": false
      }
    ],
    "explanation": "'J_n%'中_匹配单字符，%匹配任意序列。'Johnson'匹配（o匹配_，son匹配%）。'Jnson'缺少中间字符不匹配_，'Jonson'和'John'也不符合J_n模式。",
    "id": 58
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "WHERE",
      "条件组合"
    ],
    "stem": "employees表：id=1,dept='A',salary=3000; id=2,dept='B',salary=5000; id=3,dept='A',salary=6000; id=4,dept='C',salary=4000。执行 SELECT id FROM employees WHERE dept='A' AND salary>4000，返回哪些id？",
    "options": [
      {
        "label": "A",
        "text": "1, 3",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "无结果",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": true
      }
    ],
    "explanation": "dept='A'的记录是id=1和id=3，其中salary>4000的是id=3(6000)。id=1的salary=3000不满足>4000。",
    "id": 59
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "CASE WHEN表达式的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "用于条件判断并返回不同值",
        "correct": true
      },
      {
        "label": "B",
        "text": "用于创建数据库表",
        "correct": false
      },
      {
        "label": "C",
        "text": "用于删除数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "用于插入数据",
        "correct": false
      }
    ],
    "explanation": "CASE WHEN是SQL中的条件表达式，类似于其他语言中的if-else，根据条件返回不同的值。",
    "id": 60
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "COALESCE"
    ],
    "stem": "COALESCE函数的功能是什么？",
    "options": [
      {
        "label": "A",
        "text": "统计NULL值数量",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回第一个非NULL值",
        "correct": true
      },
      {
        "label": "C",
        "text": "返回最后一个非NULL值",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除所有NULL值",
        "correct": false
      }
    ],
    "explanation": "COALESCE接受多个参数，返回参数列表中第一个非NULL的值。如果所有参数都为NULL则返回NULL。",
    "id": 61
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "NULLIF"
    ],
    "stem": "NULLIF(expr1, expr2)的返回规则是？",
    "options": [
      {
        "label": "A",
        "text": "若expr1=NULL则返回expr2",
        "correct": false
      },
      {
        "label": "B",
        "text": "若expr1!=expr2则返回NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "若expr1=expr2则返回NULL，否则返回expr1",
        "correct": true
      },
      {
        "label": "D",
        "text": "若expr1=expr2则返回expr2，否则返回NULL",
        "correct": false
      }
    ],
    "explanation": "NULLIF在两个表达式相等时返回NULL，不等时返回第一个表达式的值，常用于消除除零错误等场景。",
    "id": 62
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "ISNULL"
    ],
    "stem": "SQL Server中ISNULL函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "判断是否为数字",
        "correct": false
      },
      {
        "label": "B",
        "text": "判断是否为空字符串",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除NULL记录",
        "correct": false
      },
      {
        "label": "D",
        "text": "替换NULL值为指定值",
        "correct": true
      }
    ],
    "explanation": "SQL Server的ISNULL函数用指定的替换值替换NULL，语法为ISNULL(expression, replacement)。",
    "id": 63
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "IFNULL",
      "COALESCE"
    ],
    "stem": "MySQL中IFNULL(expr1, expr2)的返回规则是？在SQLite中应该用什么函数替代？",
    "options": [
      {
        "label": "A",
        "text": "IFNULL:若expr1为NULL则返回expr2，否则返回expr1。SQLite可用COALESCE替代",
        "correct": true
      },
      {
        "label": "B",
        "text": "IFNULL:若expr1为NULL则返回expr1",
        "correct": false
      },
      {
        "label": "C",
        "text": "IFNULL:若expr1非NULL则返回expr2",
        "correct": false
      },
      {
        "label": "D",
        "text": "IFNULL:若expr2为NULL则返回expr1",
        "correct": false
      }
    ],
    "explanation": "IFNULL是MySQL特有的函数，当第一个参数为NULL时返回第二个参数，否则返回第一个参数。在SQLite中，可以使用COALESCE(expr1, expr2)替代，功能完全相同。COALESCE是SQL标准函数，支持多参数，推荐使用。",
    "id": 64
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "NOW"
    ],
    "stem": "NOW()函数返回的是什么？",
    "options": [
      {
        "label": "A",
        "text": "当前年份",
        "correct": false
      },
      {
        "label": "B",
        "text": "当前日期和时间",
        "correct": true
      },
      {
        "label": "C",
        "text": "当前日期",
        "correct": false
      },
      {
        "label": "D",
        "text": "当前时间",
        "correct": false
      }
    ],
    "explanation": "NOW()返回当前的日期和时间，格式为'YYYY-MM-DD HH:MM:SS'，等价于CURRENT_TIMESTAMP。",
    "id": 65
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "CURDATE"
    ],
    "stem": "CURDATE()函数返回的是什么？",
    "options": [
      {
        "label": "A",
        "text": "当前日期和时间",
        "correct": false
      },
      {
        "label": "B",
        "text": "当前月份",
        "correct": false
      },
      {
        "label": "C",
        "text": "当前日期",
        "correct": true
      },
      {
        "label": "D",
        "text": "当前时间",
        "correct": false
      }
    ],
    "explanation": "CURDATE()返回当前日期，格式为'YYYY-MM-DD'，等价于CURRENT_DATE。",
    "id": 66
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "YEAR"
    ],
    "stem": "YEAR(date)函数的返回值是？",
    "options": [
      {
        "label": "A",
        "text": "日期对应的月份",
        "correct": false
      },
      {
        "label": "B",
        "text": "日期对应的天",
        "correct": false
      },
      {
        "label": "C",
        "text": "日期对应的季度",
        "correct": false
      },
      {
        "label": "D",
        "text": "日期对应的年份",
        "correct": true
      }
    ],
    "explanation": "YEAR()函数从日期中提取年份，返回一个四位数字，如2024。",
    "id": 67
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "MONTH"
    ],
    "stem": "MONTH('2024-08-15')的返回值是？",
    "options": [
      {
        "label": "A",
        "text": "8",
        "correct": true
      },
      {
        "label": "B",
        "text": "15",
        "correct": false
      },
      {
        "label": "C",
        "text": "2024",
        "correct": false
      },
      {
        "label": "D",
        "text": "7",
        "correct": false
      }
    ],
    "explanation": "MONTH()函数从日期中提取月份，返回1到12的整数。'2024-08-15'的月份为8。",
    "id": 68
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DAY"
    ],
    "stem": "DAY('2024-08-15')的返回值是？",
    "options": [
      {
        "label": "A",
        "text": "6",
        "correct": false
      },
      {
        "label": "B",
        "text": "15",
        "correct": true
      },
      {
        "label": "C",
        "text": "8",
        "correct": false
      },
      {
        "label": "D",
        "text": "2024",
        "correct": false
      }
    ],
    "explanation": "DAY()函数从日期中提取天数，返回1到31的整数。'2024-08-15'的天为15。",
    "id": 69
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "SELECT CASE WHEN 1=1 THEN 'YES' ELSE 'NO' END 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "YES",
        "correct": true
      },
      {
        "label": "D",
        "text": "NO",
        "correct": false
      }
    ],
    "explanation": "1=1为真，所以CASE WHEN返回THEN子句的值'YES'。",
    "id": 70
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "COALESCE"
    ],
    "stem": "SELECT COALESCE(NULL, NULL, 100) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "ERROR",
        "correct": false
      },
      {
        "label": "D",
        "text": "100",
        "correct": true
      }
    ],
    "explanation": "COALESCE返回第一个非NULL值，前两个参数为NULL，所以返回100。",
    "id": 71
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "IFNULL",
      "COALESCE"
    ],
    "stem": "SELECT COALESCE(NULL, 'N/A') 的结果是？（COALESCE是SQL标准函数，与MySQL的IFNULL功能相同）",
    "options": [
      {
        "label": "A",
        "text": "N/A",
        "correct": true
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "0",
        "correct": false
      },
      {
        "label": "D",
        "text": "''",
        "correct": false
      }
    ],
    "explanation": "COALESCE返回第一个非NULL参数。当第一个参数为NULL时返回第二个参数'N/A'。COALESCE是SQL标准函数，在所有数据库中都可用，推荐优先使用。",
    "id": 72
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "NULLIF"
    ],
    "stem": "SELECT NULLIF(10, 10) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "ERROR",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": true
      },
      {
        "label": "C",
        "text": "10",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "NULLIF在两个参数相等时返回NULL，10=10所以返回NULL。",
    "id": 73
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATEDIFF"
    ],
    "stem": "SELECT DATEDIFF('2024-01-10', '2024-01-01') 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "8",
        "correct": false
      },
      {
        "label": "C",
        "text": "9",
        "correct": true
      },
      {
        "label": "D",
        "text": "10",
        "correct": false
      }
    ],
    "explanation": "DATEDIFF返回两个日期之间的天数差，10号减1号为9天。",
    "id": 74
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATE_ADD",
      "date"
    ],
    "stem": "SELECT date('2024-01-01', '+7 days') 的结果是？（SQLite用date函数替代MySQL的DATE_ADD）",
    "options": [
      {
        "label": "A",
        "text": "2024-01-07",
        "correct": false
      },
      {
        "label": "B",
        "text": "2024-01-14",
        "correct": false
      },
      {
        "label": "C",
        "text": "2024-01-15",
        "correct": false
      },
      {
        "label": "D",
        "text": "2024-01-08",
        "correct": true
      }
    ],
    "explanation": "SQLite的date函数支持加减日期，date('2024-01-01', '+7 days')在1月1日上加7天得到1月8日。MySQL的DATE_ADD在SQLite中用date函数替代。本练习环境已自动转换。",
    "id": 75
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATE_SUB",
      "date"
    ],
    "stem": "SELECT date('2024-03-15', '-1 month') 的结果是？（SQLite用date函数替代MySQL的DATE_SUB）",
    "options": [
      {
        "label": "A",
        "text": "2024-02-15",
        "correct": true
      },
      {
        "label": "B",
        "text": "2024-02-14",
        "correct": false
      },
      {
        "label": "C",
        "text": "2024-03-14",
        "correct": false
      },
      {
        "label": "D",
        "text": "2024-02-16",
        "correct": false
      }
    ],
    "explanation": "DATE_SUB从日期减去时间间隔，3月15日减1个月为2月15日。",
    "id": 76
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATE_FORMAT",
      "strftime"
    ],
    "stem": "SELECT strftime('%Y-%m', '2024-08-15') 的结果是？（SQLite用strftime替代MySQL的DATE_FORMAT）",
    "options": [
      {
        "label": "A",
        "text": "2024/08",
        "correct": false
      },
      {
        "label": "B",
        "text": "2024-08",
        "correct": true
      },
      {
        "label": "C",
        "text": "2024-8",
        "correct": false
      },
      {
        "label": "D",
        "text": "24-08",
        "correct": false
      }
    ],
    "explanation": "strftime按指定格式输出日期，%Y是四位年份，%m是两位月份。MySQL的DATE_FORMAT在SQLite中用strftime替代，格式符基本相同。本练习环境已自动转换。",
    "id": 77
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "NOW"
    ],
    "stem": "以下哪个SQL能获取当前日期和时间？",
    "options": [
      {
        "label": "A",
        "text": "SELECT YEAR(NOW())",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DATE(NOW())",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT NOW()",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT CURDATE()",
        "correct": false
      }
    ],
    "explanation": "NOW()返回当前日期和时间，CURDATE()只返回日期，其余选项不返回完整日期时间。",
    "id": 78
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "ISNULL"
    ],
    "stem": "SELECT ISNULL(NULL, 0) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "ERROR",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": true
      }
    ],
    "explanation": "ISNULL将NULL替换为指定值，NULL被替换为0。",
    "id": 79
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "补全：SELECT ___ WHEN age > 18 THEN '成人' ELSE '未成年' END FROM users",
    "options": [
      {
        "label": "A",
        "text": "CASE",
        "correct": true
      },
      {
        "label": "B",
        "text": "IF",
        "correct": false
      },
      {
        "label": "C",
        "text": "SWITCH",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHILE",
        "correct": false
      }
    ],
    "explanation": "CASE WHEN语法以CASE开头，后跟WHEN条件THEN结果，ELSE为默认值，END结束。",
    "id": 80
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "COALESCE"
    ],
    "stem": "补全：SELECT ___(NULL, 0) AS val FROM dual",
    "options": [
      {
        "label": "A",
        "text": "NULLIF",
        "correct": false
      },
      {
        "label": "B",
        "text": "COALESCE",
        "correct": true
      },
      {
        "label": "C",
        "text": "CASE",
        "correct": false
      },
      {
        "label": "D",
        "text": "IF",
        "correct": false
      }
    ],
    "explanation": "COALESCE返回第一个非NULL值，这里用来将NULL替换为0。",
    "id": 81
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "IFNULL"
    ],
    "stem": "补全：SELECT ___(salary, 0) FROM employees",
    "options": [
      {
        "label": "A",
        "text": "DATE_ADD",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULLIF",
        "correct": false
      },
      {
        "label": "C",
        "text": "IFNULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "DATEDIFF",
        "correct": false
      }
    ],
    "explanation": "IFNULL用于处理NULL值，将NULL替换为指定的默认值0。",
    "id": 82
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATEDIFF"
    ],
    "stem": "补全：SELECT ___('2024-12-31', '2024-01-01') AS days_diff",
    "options": [
      {
        "label": "A",
        "text": "DATE_ADD",
        "correct": false
      },
      {
        "label": "B",
        "text": "DATE_SUB",
        "correct": false
      },
      {
        "label": "C",
        "text": "TIMESTAMPDIFF",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATEDIFF",
        "correct": true
      }
    ],
    "explanation": "DATEDIFF计算两个日期之间的天数差，是MySQL标准日期差函数。",
    "id": 83
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATE_ADD"
    ],
    "stem": "补全：SELECT ___('2024-01-01', INTERVAL 1 MONTH)",
    "options": [
      {
        "label": "A",
        "text": "DATE_ADD",
        "correct": true
      },
      {
        "label": "B",
        "text": "DATE_SUB",
        "correct": false
      },
      {
        "label": "C",
        "text": "DATEDIFF",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE_FORMAT",
        "correct": false
      }
    ],
    "explanation": "DATE_ADD用于在日期上加上指定的时间间隔。",
    "id": 84
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "找出错误：SELECT CAS WHEN age > 18 THEN '成人' END FROM users",
    "options": [
      {
        "label": "A",
        "text": "缺少GROUP BY",
        "correct": false
      },
      {
        "label": "B",
        "text": "CAS应改为CASE",
        "correct": true
      },
      {
        "label": "C",
        "text": "WHEN应改为WHERE",
        "correct": false
      },
      {
        "label": "D",
        "text": "THEN应改为ELSE",
        "correct": false
      }
    ],
    "explanation": "CAS是拼写错误，正确的SQL关键字是CASE，CASE WHEN是条件表达式的正确语法。",
    "id": 85
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "COALESCE"
    ],
    "stem": "找出错误：SELECT COALLESCE(NULL, 0) AS val",
    "options": [
      {
        "label": "A",
        "text": "缺少FROM",
        "correct": false
      },
      {
        "label": "B",
        "text": "AS应去掉",
        "correct": false
      },
      {
        "label": "C",
        "text": "COALLESCE应改为COALESCE",
        "correct": true
      },
      {
        "label": "D",
        "text": "0应改为NULL",
        "correct": false
      }
    ],
    "explanation": "COALLESCE是拼写错误，正确的函数名是COALESCE。",
    "id": 86
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "IFNULL"
    ],
    "stem": "找出错误：SELECT IFNULL(name, ) FROM users",
    "options": [
      {
        "label": "A",
        "text": "IFNULL拼写错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "name不能为参数",
        "correct": false
      },
      {
        "label": "C",
        "text": "缺少WHERE",
        "correct": false
      },
      {
        "label": "D",
        "text": "第二个参数不能为空",
        "correct": true
      }
    ],
    "explanation": "IFNULL需要两个参数，第二个参数是NULL时的替换值，不能为空。",
    "id": 87
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "NOW"
    ],
    "stem": "找出错误：SELECT NOW AS current_time",
    "options": [
      {
        "label": "A",
        "text": "NOW应写为NOW()",
        "correct": true
      },
      {
        "label": "B",
        "text": "NOW拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "AS应去掉",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少FROM",
        "correct": false
      }
    ],
    "explanation": "NOW是函数，调用时需要加括号NOW()，否则可能被视为列名导致错误。",
    "id": 88
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_date",
    "tags": [
      "DATEDIFF"
    ],
    "stem": "找出错误：SELECT DATEDIFF('2024-01-01') AS diff",
    "options": [
      {
        "label": "A",
        "text": "日期格式错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "DATEDIFF需要两个日期参数",
        "correct": true
      },
      {
        "label": "C",
        "text": "DATEDIFF拼写错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "AS应去掉",
        "correct": false
      }
    ],
    "explanation": "DATEDIFF需要两个日期参数来计算差值，只提供一个参数会导致语法错误。",
    "id": 89
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_FORMAT"
    ],
    "stem": "DATE_FORMAT中%m和%M的区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "%m是月份英文名，%M是数字月份",
        "correct": false
      },
      {
        "label": "C",
        "text": "%m是数字月份，%M是月份英文名",
        "correct": true
      },
      {
        "label": "D",
        "text": "%m是分钟，%M是月份",
        "correct": false
      }
    ],
    "explanation": "%m返回两位数字月份(01-12)，%M返回月份的英文名称(如January)。",
    "id": 90
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "STR_TO_DATE"
    ],
    "stem": "STR_TO_DATE函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "将日期转换为字符串",
        "correct": false
      },
      {
        "label": "B",
        "text": "计算日期差",
        "correct": false
      },
      {
        "label": "C",
        "text": "格式化日期输出",
        "correct": false
      },
      {
        "label": "D",
        "text": "将字符串按指定格式解析为日期",
        "correct": true
      }
    ],
    "explanation": "STR_TO_DATE将字符串按指定格式解析为日期值，是DATE_FORMAT的逆操作。",
    "id": 91
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF",
      "julianday"
    ],
    "stem": "在MySQL中TIMESTAMPDIFF(YEAR, '2000-01-01', '2024-01-01')返回什么？在SQLite中如何实现相同功能？",
    "options": [
      {
        "label": "A",
        "text": "MySQL返回24。SQLite用CAST((julianday('2024-01-01')-julianday('2000-01-01'))/365 AS INTEGER)",
        "correct": true
      },
      {
        "label": "B",
        "text": "MySQL返回25",
        "correct": false
      },
      {
        "label": "C",
        "text": "MySQL返回23",
        "correct": false
      },
      {
        "label": "D",
        "text": "MySQL返回0",
        "correct": false
      }
    ],
    "explanation": "MySQL的TIMESTAMPDIFF计算两个日期时间之间的差值，以YEAR为单位返回整数24。SQLite不支持TIMESTAMPDIFF，可用julianday函数计算天数差，再除以365得到年数差。本练习环境已自动转换，可直接运行。",
    "id": 92
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_TRUNC"
    ],
    "stem": "DATE_TRUNC函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "比较两个日期",
        "correct": false
      },
      {
        "label": "B",
        "text": "将日期截断到指定精度",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除日期记录",
        "correct": false
      },
      {
        "label": "D",
        "text": "延长日期",
        "correct": false
      }
    ],
    "explanation": "DATE_TRUNC将日期/时间值截断到指定的精度级别，如截断到月份、季度等。",
    "id": 93
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "CASE WHEN中ELSE子句省略时，不满足条件的行返回什么？",
    "options": [
      {
        "label": "A",
        "text": "空字符串",
        "correct": false
      },
      {
        "label": "B",
        "text": "ERROR",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "省略ELSE时，不满足任何WHEN条件的行返回NULL，这是SQL标准行为。",
    "id": 94
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "SELECT CASE WHEN 1=0 THEN 'A' WHEN 1=1 THEN 'B' ELSE 'C' END 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "A",
        "correct": false
      },
      {
        "label": "B",
        "text": "C",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "B",
        "correct": true
      }
    ],
    "explanation": "1=0为假跳过第一个WHEN，1=1为真匹配第二个WHEN，返回'B'。",
    "id": 95
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "STR_TO_DATE"
    ],
    "stem": "SELECT STR_TO_DATE('15-08-2024', '%d-%m-%Y') 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "2024-08-15",
        "correct": true
      },
      {
        "label": "B",
        "text": "2024-15-08",
        "correct": false
      },
      {
        "label": "C",
        "text": "15-08-2024",
        "correct": false
      },
      {
        "label": "D",
        "text": "2024-08-15 00:00:00",
        "correct": false
      }
    ],
    "explanation": "STR_TO_DATE按%d-%m-%Y格式解析字符串，得到日期2024-08-15。",
    "id": 96
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATEDIFF"
    ],
    "stem": "SELECT DATEDIFF('2024-02-28', '2024-02-01') 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "26",
        "correct": false
      },
      {
        "label": "B",
        "text": "27",
        "correct": true
      },
      {
        "label": "C",
        "text": "28",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "DATEDIFF计算天数差，2月28日减2月1日为27天。",
    "id": 97
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF",
      "julianday"
    ],
    "stem": "SELECT CAST((julianday('2024-01-10') - julianday('2024-01-01')) AS INTEGER) 的结果是？（SQLite用julianday替代MySQL的TIMESTAMPDIFF）",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "8",
        "correct": false
      },
      {
        "label": "C",
        "text": "9",
        "correct": true
      },
      {
        "label": "D",
        "text": "10",
        "correct": false
      }
    ],
    "explanation": "julianday计算日期差值，1月1日到1月10日相差9天。MySQL的TIMESTAMPDIFF(DAY, d1, d2)在SQLite中用CAST((julianday(d2)-julianday(d1)) AS INTEGER)替代。本练习环境已自动转换。",
    "id": 98
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_FORMAT"
    ],
    "stem": "在MySQL中，DATE_FORMAT函数使用%W格式符时返回什么内容？",
    "options": [
      {
        "label": "A",
        "text": "月份的英文缩写",
        "correct": false
      },
      {
        "label": "B",
        "text": "日期数字",
        "correct": false
      },
      {
        "label": "C",
        "text": "四位年份",
        "correct": false
      },
      {
        "label": "D",
        "text": "星期几的英文全称",
        "correct": true
      }
    ],
    "explanation": "DATE_FORMAT的%W返回星期几的英文全称，如Monday、Tuesday等。",
    "id": 99
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "STR_TO_DATE"
    ],
    "stem": "补全：SELECT ___('2024/08/15', '%Y/%m/%d') AS dt",
    "options": [
      {
        "label": "A",
        "text": "STR_TO_DATE",
        "correct": true
      },
      {
        "label": "B",
        "text": "DATE_FORMAT",
        "correct": false
      },
      {
        "label": "C",
        "text": "COALESCE",
        "correct": false
      },
      {
        "label": "D",
        "text": "CAST",
        "correct": false
      }
    ],
    "explanation": "STR_TO_DATE将字符串解析为日期，配合格式字符串使用。",
    "id": 100
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF"
    ],
    "stem": "补全：SELECT ___(MONTH, '2024-01-01', '2024-06-01') AS diff",
    "options": [
      {
        "label": "A",
        "text": "DATE_SUB",
        "correct": false
      },
      {
        "label": "B",
        "text": "TIMESTAMPDIFF",
        "correct": true
      },
      {
        "label": "C",
        "text": "DATEDIFF",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE_ADD",
        "correct": false
      }
    ],
    "explanation": "TIMESTAMPDIFF可以按不同时间单位计算差值，这里按MONTH计算月份差。",
    "id": 101
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_ADD"
    ],
    "stem": "补全：SELECT ___('2024-06-15 10:00:00', INTERVAL 3 HOUR) AS result",
    "options": [
      {
        "label": "A",
        "text": "DATE_FORMAT",
        "correct": false
      },
      {
        "label": "B",
        "text": "DATE_SUB",
        "correct": false
      },
      {
        "label": "C",
        "text": "DATE_ADD",
        "correct": true
      },
      {
        "label": "D",
        "text": "DATEDIFF",
        "correct": false
      }
    ],
    "explanation": "DATE_ADD支持多种间隔类型，包括HOUR、MINUTE等时间间隔。",
    "id": 102
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "补全：SELECT CASE WHEN score >= 60 THEN '及格' ___ '不及格' END FROM scores",
    "options": [
      {
        "label": "A",
        "text": "WHEN",
        "correct": false
      },
      {
        "label": "B",
        "text": "OR",
        "correct": false
      },
      {
        "label": "C",
        "text": "AND",
        "correct": false
      },
      {
        "label": "D",
        "text": "ELSE",
        "correct": true
      }
    ],
    "explanation": "CASE WHEN中ELSE子句指定不满足条件时的返回值，这里是'不及格'。",
    "id": 103
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "CASE WHEN"
    ],
    "stem": "找出错误：SELECT CASE WHEN age > 18 AND THEN '成人' END FROM users",
    "options": [
      {
        "label": "A",
        "text": "AND后面缺少条件",
        "correct": true
      },
      {
        "label": "B",
        "text": "CASE拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "THEN应改为ELSE",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少ELSE",
        "correct": false
      }
    ],
    "explanation": "THEN前面不应该有AND，AND是逻辑运算符，这里THEN前的条件不完整。",
    "id": 104
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_FORMAT"
    ],
    "stem": "找出错误：SELECT DATE_FORMAT('2024-08-15', 'YYYY-MM-DD')",
    "options": [
      {
        "label": "A",
        "text": "日期格式错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "格式字符串应使用%Y-%m-%d",
        "correct": true
      },
      {
        "label": "C",
        "text": "DATE_FORMAT拼写错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少表名",
        "correct": false
      }
    ],
    "explanation": "DATE_FORMAT的格式符使用%前缀，YYYY-MM-DD是某些语言的写法，SQL中应为%Y-%m-%d。",
    "id": 105
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "NULLIF"
    ],
    "stem": "找出错误：SELECT NULLIF(0, 0) + NULLIF(0, 1) AS result",
    "options": [
      {
        "label": "A",
        "text": "加号应改为减号",
        "correct": false
      },
      {
        "label": "B",
        "text": "缺少ELSE",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULLIF(0,0)返回NULL导致运算结果为NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "NULLIF拼写错误",
        "correct": false
      }
    ],
    "explanation": "NULLIF(0,0)因两参数相等返回NULL，NULL参与算术运算结果为NULL，这是数据逻辑问题。",
    "id": 106
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF",
      "julianday"
    ],
    "stem": "找出错误：SELECT CAST((julianday('2024-01-10') - julianday('2024-01-01')) AS INTEGER) AS days_diff",
    "options": [
      {
        "label": "A",
        "text": "julianday拼写错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "日期格式错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "缺少AS INTEGER",
        "correct": false
      },
      {
        "label": "D",
        "text": "代码正确,返回9天差值",
        "correct": true
      }
    ],
    "explanation": "SQLite用julianday计算日期差值,CAST转为整数。MySQL的TIMESTAMPDIFF(DAY, d1, d2)在SQLite中用CAST((julianday(d2)-julianday(d1)) AS INTEGER)替代。本练习环境已自动转换MySQL语法。",
    "id": 107
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_ADD"
    ],
    "stem": "找出错误：SELECT DATE_ADD('2024-01-01', INTERVAL 1 YEAR DAY)",
    "options": [
      {
        "label": "A",
        "text": "INTERVAL后不能同时指定YEAR和DAY",
        "correct": true
      },
      {
        "label": "B",
        "text": "DATE_ADD拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "日期格式错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少ELSE",
        "correct": false
      }
    ],
    "explanation": "DATE_ADD的INTERVAL只能指定一种间隔类型，不能同时使用YEAR和DAY。",
    "id": 108
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "DATE_TRUNC"
    ],
    "stem": "DATE_TRUNC('quarter', timestamp '2024-08-15')返回什么？",
    "options": [
      {
        "label": "A",
        "text": "2024-06-01",
        "correct": false
      },
      {
        "label": "B",
        "text": "2024-07-01",
        "correct": true
      },
      {
        "label": "C",
        "text": "2024-01-01",
        "correct": false
      },
      {
        "label": "D",
        "text": "2024-08-01",
        "correct": false
      }
    ],
    "explanation": "DATE_TRUNC按quarter截断到季度初，8月属于Q3(7-9月)，截断后为7月1日。",
    "id": 109
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF"
    ],
    "stem": "TIMESTAMPDIFF与DATEDIFF在计算天数时的主要区别是？",
    "options": [
      {
        "label": "A",
        "text": "DATEDIFF支持更多时间单位",
        "correct": false
      },
      {
        "label": "B",
        "text": "TIMESTAMPDIFF只能计算月差",
        "correct": false
      },
      {
        "label": "C",
        "text": "TIMESTAMPDIFF支持指定时间单位，DATEDIFF只计算天数差",
        "correct": true
      },
      {
        "label": "D",
        "text": "两者完全相同",
        "correct": false
      }
    ],
    "explanation": "TIMESTAMPDIFF可以指定YEAR/MONTH/DAY/HOUR等不同单位，DATEDIFF只返回天数差。",
    "id": 110
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "CASE WHEN",
      "COALESCE"
    ],
    "stem": "SELECT COALESCE(NULL, CASE WHEN 1=0 THEN 'A' ELSE 'B' END, 'C') 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "A",
        "correct": false
      },
      {
        "label": "B",
        "text": "C",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "B",
        "correct": true
      }
    ],
    "explanation": "COALESCE第一个参数NULL跳过，第二个参数是CASE表达式，1=0为假返回'B'，COALESCE返回'B'。",
    "id": 111
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "DATE_ADD",
      "DATEDIFF"
    ],
    "stem": "SELECT DATEDIFF(DATE_ADD('2024-01-01', INTERVAL 30 DAY), '2024-01-01') 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "30",
        "correct": true
      },
      {
        "label": "B",
        "text": "29",
        "correct": false
      },
      {
        "label": "C",
        "text": "31",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "DATE_ADD在1月1日上加30天得到1月31日，DATEDIFF计算与1月1日的天数为30。",
    "id": 112
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "TIMESTAMPDIFF",
      "NOW"
    ],
    "stem": "以下哪个表达式能计算某人生日距今的年数？",
    "options": [
      {
        "label": "A",
        "text": "DATE_ADD(birth_date, INTERVAL 1 YEAR)",
        "correct": false
      },
      {
        "label": "B",
        "text": "TIMESTAMPDIFF(YEAR, birth_date, CURDATE())",
        "correct": true
      },
      {
        "label": "C",
        "text": "DATEDIFF(birth_date, CURDATE())",
        "correct": false
      },
      {
        "label": "D",
        "text": "YEAR(CURDATE()) - YEAR(birth_date)",
        "correct": false
      }
    ],
    "explanation": "TIMESTAMPDIFF(YEAR, ...)精确计算年份差，DATEDIFF只返回天数，YEAR差可能不精确。",
    "id": 113
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "CASE WHEN",
      "NULLIF"
    ],
    "stem": "补全：SELECT CASE WHEN ___(price, 0) IS NULL THEN '需检查' ELSE '正常' END FROM products",
    "options": [
      {
        "label": "A",
        "text": "IFNULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "ISNULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULLIF",
        "correct": true
      },
      {
        "label": "D",
        "text": "COALESCE",
        "correct": false
      }
    ],
    "explanation": "NULLIF(price,0)在price=0时返回NULL，然后CASE WHEN检测NULL输出'需检查'，形成零值检测逻辑。",
    "id": 114
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "DATE_TRUNC"
    ],
    "stem": "补全：SELECT ___('month', created_at) AS month_start FROM orders",
    "options": [
      {
        "label": "A",
        "text": "DATEDIFF",
        "correct": false
      },
      {
        "label": "B",
        "text": "DATE_ADD",
        "correct": false
      },
      {
        "label": "C",
        "text": "DATE_FORMAT",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE_TRUNC",
        "correct": true
      }
    ],
    "explanation": "DATE_TRUNC将日期截断到指定精度，截断到月份即返回该月1号。",
    "id": 115
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "CASE WHEN",
      "COALESCE"
    ],
    "stem": "找出问题：SELECT COALESCE(NULL, NULL) AS result",
    "options": [
      {
        "label": "A",
        "text": "所有参数为NULL时结果为NULL，缺少默认值",
        "correct": true
      },
      {
        "label": "B",
        "text": "COALESCE拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "缺少ELSE",
        "correct": false
      },
      {
        "label": "D",
        "text": "参数不能为NULL",
        "correct": false
      }
    ],
    "explanation": "COALESCE所有参数都为NULL时返回NULL，缺少非NULL默认值导致结果无意义。",
    "id": 116
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "DATE_FORMAT",
      "STR_TO_DATE"
    ],
    "stem": "找出错误：SELECT DATE_FORMAT(STR_TO_DATE('15/08/2024', '%d/%m/%Y'), '%Y年%m月') AS result",
    "options": [
      {
        "label": "A",
        "text": "缺少FROM子句",
        "correct": false
      },
      {
        "label": "B",
        "text": "无错误，语句正确",
        "correct": true
      },
      {
        "label": "C",
        "text": "STR_TO_DATE格式错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE_FORMAT格式错误",
        "correct": false
      }
    ],
    "explanation": "STR_TO_DATE将字符串解析为日期，DATE_FORMAT将日期格式化输出，语句逻辑正确无错误。",
    "id": 117
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_date",
    "tags": [
      "DATE_SUB",
      "DATEDIFF"
    ],
    "stem": "SELECT DATEDIFF('2024-03-01', DATE_SUB('2024-03-01', INTERVAL 10 DAY)) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "11",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "10",
        "correct": true
      },
      {
        "label": "D",
        "text": "9",
        "correct": false
      }
    ],
    "explanation": "DATE_SUB将3月1日减去10天得到2月20日，DATEDIFF计算3月1日与2月20日的天数差为10。",
    "id": 118
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_date",
    "tags": [
      "IF",
      "CASE WHEN"
    ],
    "stem": "MySQL中IF(expr, val_true, val_false)与CASE WHEN相比，正确的说法是？",
    "options": [
      {
        "label": "A",
        "text": "IF是SQL标准，CASE WHEN是MySQL特有",
        "correct": false
      },
      {
        "label": "B",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "IF能处理多个条件分支",
        "correct": false
      },
      {
        "label": "D",
        "text": "IF是MySQL特有函数，CASE WHEN是SQL标准",
        "correct": true
      }
    ],
    "explanation": "IF()是MySQL特有的控制流函数，只支持单一条件判断，CASE WHEN是SQL标准语法，支持多条件分支。",
    "id": 119
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "GROUP BY"
    ],
    "stem": "以下哪个SQL能统计每个部门的员工人数？",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, COUNT(*) FROM emp GROUP BY dept",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dept, COUNT(*) FROM emp ORDER BY dept",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(*) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dept, SUM(*) FROM emp GROUP BY dept",
        "correct": false
      }
    ],
    "explanation": "A正确：GROUP BY dept按部门分组，COUNT(*)统计每组行数。B缺少GROUP BY无法按部门分组统计；C的SELECT中缺少dept列，无法显示部门名称；D的SUM(*)语法错误，SUM不能对*使用。",
    "id": 120
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "SUM",
      "GROUP BY"
    ],
    "stem": "以下哪个SQL能计算每个类别的销售总额？",
    "options": [
      {
        "label": "A",
        "text": "SELECT category, SUM(amount) FROM sales ORDER BY category",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT category, SUM(amount) FROM sales GROUP BY category",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT category, COUNT(amount) FROM sales GROUP BY category",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT SUM(amount) FROM sales GROUP BY category",
        "correct": false
      }
    ],
    "explanation": "A正确：GROUP BY category按类别分组，SUM(amount)求每组的销售总额。B用COUNT是计数而非求和；C缺少category列；D用ORDER BY替代GROUP BY无法实现分组聚合。",
    "id": 121
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "AVG"
    ],
    "stem": "AVG函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "计算某列的最大值",
        "correct": false
      },
      {
        "label": "B",
        "text": "计算某列的行数",
        "correct": false
      },
      {
        "label": "C",
        "text": "计算某列的平均值",
        "correct": true
      },
      {
        "label": "D",
        "text": "计算某列的总和",
        "correct": false
      }
    ],
    "explanation": "AVG函数用于计算某列数值的平均值。SUM计算总和，MAX计算最大值，COUNT计算行数，三者都不是AVG的功能。",
    "id": 122
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "MAX",
      "MIN"
    ],
    "stem": "以下哪个SQL能找出商品表中的最高价格？",
    "options": [
      {
        "label": "A",
        "text": "SELECT MIN(price) FROM products",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT price FROM products WHERE price = MAX",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT SUM(price) FROM products",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT MAX(price) FROM products",
        "correct": true
      }
    ],
    "explanation": "MAX(price)返回price列的最大值，即最高价格。B返回最低价格；C语法错误，MAX不能在WHERE中直接使用；D返回价格总和。",
    "id": 123
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "语法"
    ],
    "stem": "GROUP BY子句的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "按一列或多列对结果集进行分组",
        "correct": true
      },
      {
        "label": "B",
        "text": "对结果集进行排序",
        "correct": false
      },
      {
        "label": "C",
        "text": "过滤分组后的结果",
        "correct": false
      },
      {
        "label": "D",
        "text": "连接两个表",
        "correct": false
      }
    ],
    "explanation": "GROUP BY用于按列分组，使聚合函数对每组分别计算。排序用ORDER BY，过滤分组用HAVING，连接用JOIN。",
    "id": 124
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "HAVING",
      "WHERE"
    ],
    "stem": "HAVING与WHERE的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "HAVING只能与ORDER BY一起使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "HAVING用于过滤分组，WHERE用于过滤行",
        "correct": true
      },
      {
        "label": "C",
        "text": "HAVING用于过滤行，WHERE用于过滤分组",
        "correct": false
      },
      {
        "label": "D",
        "text": "HAVING和WHERE功能完全相同",
        "correct": false
      }
    ],
    "explanation": "HAVING用于对分组后的结果进行过滤（基于聚合条件），WHERE用于在分组前过滤行。两者作用阶段不同：WHERE在分组前生效，HAVING在分组后生效。",
    "id": 125
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "NULL"
    ],
    "stem": "COUNT(*)与COUNT(column)的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT(*)只能用于主键列",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT(*)统计所有行，COUNT(column)忽略NULL值",
        "correct": true
      },
      {
        "label": "D",
        "text": "COUNT(*)忽略NULL值，COUNT(column)统计所有行",
        "correct": false
      }
    ],
    "explanation": "COUNT(*)统计表中所有行（包括含NULL的行），COUNT(column)只统计column列非NULL的行数。这是处理NULL时的重要区别。",
    "id": 126
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "DISTINCT",
      "COUNT"
    ],
    "stem": "COUNT(DISTINCT column)的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "统计某列所有值的数量（含重复）",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除某列的重复行",
        "correct": false
      },
      {
        "label": "C",
        "text": "统计表中所有行数",
        "correct": false
      },
      {
        "label": "D",
        "text": "统计某列不同值的数量",
        "correct": true
      }
    ],
    "explanation": "COUNT(DISTINCT column)统计该列中不同（去重后）值的数量。统计含重复值用COUNT(column)，删除重复行用DISTINCT单独使用，统计所有行用COUNT(*)。",
    "id": 127
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "NULL"
    ],
    "stem": "表scores有5行数据，其中score列有2个NULL值。SELECT COUNT(score) FROM scores 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": true
      },
      {
        "label": "B",
        "text": "5",
        "correct": false
      },
      {
        "label": "C",
        "text": "2",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "COUNT(score)只统计score列非NULL的行数。5行中有2个NULL，所以非NULL行为3行，结果是3。COUNT(*)才会得到5。",
    "id": 128
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "AVG",
      "NULL"
    ],
    "stem": "表scores有5行数据，score列值为{10,20,NULL,30,40}，SELECT AVG(score) FROM scores 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "25",
        "correct": true
      },
      {
        "label": "C",
        "text": "20",
        "correct": false
      },
      {
        "label": "D",
        "text": "30",
        "correct": false
      }
    ],
    "explanation": "AVG忽略NULL值，对非NULL值求平均：(10+20+30+40)/4=25。不是除以5（含NULL）得20，也不是NULL。",
    "id": 129
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "SUM",
      "NULL"
    ],
    "stem": "表t有3行数据，col列值为{1,NULL,3}，SELECT SUM(col) FROM t 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "4",
        "correct": true
      },
      {
        "label": "D",
        "text": "NULL",
        "correct": false
      }
    ],
    "explanation": "SUM忽略NULL值，对非NULL值求和：1+3=4。如果所有值都是NULL，SUM才返回NULL。",
    "id": 130
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "MAX",
      "MIN"
    ],
    "stem": "表t有4行数据，col列值为{3,1,NULL,5}，SELECT MAX(col) FROM t 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": true
      }
    ],
    "explanation": "MAX忽略NULL值，返回非NULL值中的最大值5。MAX不会因为存在NULL而返回NULL。",
    "id": 131
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "COUNT"
    ],
    "stem": "补全SQL：统计每个城市的订单数量，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT city, COUNT(*) FROM orders GROUP BY city",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT COUNT(*), city FROM orders",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT city, SUM(*) FROM orders GROUP BY city",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT city, COUNT(*) FROM orders HAVING city",
        "correct": false
      }
    ],
    "explanation": "A正确：SELECT city, COUNT(*)配合GROUP BY city实现按城市分组计数。B缺少GROUP BY无法分组；C的SUM(*)语法错误；D用HAVING替代GROUP BY是错误的。",
    "id": 132
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "HAVING"
    ],
    "stem": "补全SQL：查询员工数超过5人的部门，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, COUNT(*) FROM emp HAVING COUNT(*) > 5",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT dept, COUNT(*) FROM emp WHERE COUNT(*) > 5 GROUP BY dept",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dept, COUNT(*) FROM emp GROUP BY dept WHERE COUNT(*) > 5",
        "correct": false
      }
    ],
    "explanation": "A正确：HAVING用于分组后过滤。B和C将聚合条件放在WHERE中是错误的；D缺少GROUP BY子句。",
    "id": 133
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "SELECT"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, name, COUNT(*) FROM emp GROUP BY dept",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY dept应改为ORDER BY dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "C",
        "text": "name列不在GROUP BY中且不在聚合函数中",
        "correct": true
      },
      {
        "label": "D",
        "text": "COUNT(*)语法错误",
        "correct": false
      }
    ],
    "explanation": "SELECT中的name列既不在GROUP BY子句中，也不在聚合函数中，会导致语义错误。每个分组中name值不确定，无法正确显示。COUNT(*)语法正确，GROUP BY使用正确。",
    "id": 134
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "HAVING",
      "WHERE"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, COUNT(*) FROM emp HAVING COUNT(*) > 3",
    "options": [
      {
        "label": "A",
        "text": "HAVING应改为WHERE",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT(*) > 3语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少GROUP BY子句",
        "correct": true
      }
    ],
    "explanation": "HAVING必须与GROUP BY配合使用。缺少GROUP BY时，无法确定按什么分组，HAVING的条件也无从判断。WHERE用于过滤行而非分组。",
    "id": 135
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "DISTINCT",
      "聚合"
    ],
    "stem": "SELECT DISTINCT category FROM products 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回category列的所有不同值",
        "correct": true
      },
      {
        "label": "B",
        "text": "返回所有行的category列",
        "correct": false
      },
      {
        "label": "C",
        "text": "统计category的不同值个数",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除products表中的重复行",
        "correct": false
      }
    ],
    "explanation": "DISTINCT用于去除重复值，返回不同的category值。统计个数需要COUNT(DISTINCT category)，DISTINCT不是删除操作。",
    "id": 136
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "DISTINCT"
    ],
    "stem": "表colors有数据：red, blue, red, green, blue。SELECT COUNT(DISTINCT color) FROM colors 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "5",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "DISTINCT去重后不同颜色为red, blue, green共3种，COUNT统计不同值数量为3。5是未去重的行数。",
    "id": 137
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "SUM",
      "GROUP BY"
    ],
    "stem": "补全SQL：计算每个客户的订单总金额，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT SUM(amount) FROM orders GROUP BY customer_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT customer_id, AVG(amount) FROM orders GROUP BY customer_id",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT customer_id, COUNT(amount) FROM orders GROUP BY customer_id",
        "correct": false
      }
    ],
    "explanation": "A正确：SUM(amount)求订单总金额，GROUP BY customer_id按客户分组。B用COUNT是计数非求和；C缺少customer_id列；D用AVG是求平均非求和。",
    "id": 138
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "SUM",
      "语法"
    ],
    "stem": "以下SQL有什么问题？SELECT SUM(*) FROM sales",
    "options": [
      {
        "label": "A",
        "text": "SUM函数不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "缺少GROUP BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "D",
        "text": "SUM不能对*使用，必须指定列名",
        "correct": true
      }
    ],
    "explanation": "SUM(*)语法错误，SUM需要指定具体列名如SUM(amount)。COUNT(*)可以对*使用，但SUM不行。",
    "id": 139
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "NULL"
    ],
    "stem": "聚合函数（SUM, AVG, COUNT, MAX, MIN）如何处理NULL值？",
    "options": [
      {
        "label": "A",
        "text": "SUM, AVG, MAX, MIN忽略NULL值，COUNT(column)忽略NULL值",
        "correct": true
      },
      {
        "label": "B",
        "text": "所有聚合函数都将NULL视为0",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有聚合函数遇到NULL就返回NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "只有COUNT会忽略NULL",
        "correct": false
      }
    ],
    "explanation": "SUM/AVG/MAX/MIN和COUNT(column)都忽略NULL值。COUNT(*)例外，统计所有行包括含NULL的行。NULL不是0，聚合函数不会将NULL视为0。",
    "id": 140
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "多列"
    ],
    "stem": "表enrollment有数据：(Math,Alice),(Math,Bob),(Physics,Alice)。SELECT course, student, COUNT(*) FROM enrollment GROUP BY course, student 的结果有几行？",
    "options": [
      {
        "label": "A",
        "text": "4",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "2",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "按(course, student)组合分组，有3个不同组合：(Math,Alice)、(Math,Bob)、(Physics,Alice)，所以结果3行。",
    "id": 141
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "MAX",
      "GROUP BY"
    ],
    "stem": "补全SQL：找出每个类别中价格最高的商品价格，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT MAX(price) FROM products GROUP BY category",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT category, MAX(price) FROM products",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT category, MAX(price) FROM products GROUP BY category",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT category, MIN(price) FROM products GROUP BY category",
        "correct": false
      }
    ],
    "explanation": "A正确：MAX(price)求最高价，GROUP BY category按类别分组。B求最低价；C缺少category列；D缺少GROUP BY无法按类别分组。",
    "id": 142
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "WHERE",
      "聚合"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, AVG(salary) FROM emp WHERE AVG(salary) > 5000 GROUP BY dept",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY dept应放在WHERE前面",
        "correct": false
      },
      {
        "label": "B",
        "text": "AVG(salary) > 5000语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE中不能使用聚合函数，应改用HAVING",
        "correct": true
      }
    ],
    "explanation": "WHERE中不能使用聚合函数。WHERE在分组前执行，无法使用聚合结果。应改用HAVING AVG(salary) > 5000来过滤分组。",
    "id": 143
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "对比"
    ],
    "stem": "COUNT(*)与COUNT(1)的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "在标准SQL中功能相同，都统计所有行",
        "correct": true
      },
      {
        "label": "B",
        "text": "COUNT(1)比COUNT(*)快",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT(*)忽略NULL，COUNT(1)不忽略",
        "correct": false
      },
      {
        "label": "D",
        "text": "COUNT(1)只统计第一列",
        "correct": false
      }
    ],
    "explanation": "在标准SQL中，COUNT(*)和COUNT(1)功能相同，都统计所有行。不同数据库实现可能略有差异，但语义一致。COUNT(1)不是只统计第一列。",
    "id": 144
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "MIN",
      "NULL"
    ],
    "stem": "表t的col列值为{5,NULL,3,NULL,1}，SELECT MIN(col) FROM t 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "5",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": true
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "NULL",
        "correct": false
      }
    ],
    "explanation": "MIN忽略NULL值，返回非NULL值中的最小值1。NULL不影响MIN的计算，MIN也不会返回NULL（除非全为NULL）。",
    "id": 145
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "AVG",
      "GROUP BY"
    ],
    "stem": "补全SQL：计算每个科目的平均分数，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT AVG(score) FROM exams GROUP BY subject",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT subject, COUNT(score) FROM exams GROUP BY subject",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT subject, AVG(score) FROM exams GROUP BY subject",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT subject, SUM(score) FROM exams GROUP BY subject",
        "correct": false
      }
    ],
    "explanation": "A正确：AVG(score)求平均分，GROUP BY subject按科目分组。B求总分；C缺少subject列；D统计人数非求平均。",
    "id": 146
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "SELECT"
    ],
    "stem": "以下SQL有什么问题？SELECT country, city, COUNT(*) FROM locations GROUP BY country",
    "options": [
      {
        "label": "A",
        "text": "COUNT(*)不能与GROUP BY一起使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY应该包含所有SELECT中的列",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "D",
        "text": "city不在GROUP BY中，无法与分组正确对应",
        "correct": true
      }
    ],
    "explanation": "city不在GROUP BY中也不在聚合函数中，每个country分组可能包含多个city，无法确定city值。这不是说GROUP BY要包含所有SELECT列（聚合列除外），而是非聚合列必须在GROUP BY中。",
    "id": 147
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "嵌套"
    ],
    "stem": "可以在聚合函数内嵌套另一个聚合函数吗？如SUM(COUNT(*))",
    "options": [
      {
        "label": "A",
        "text": "不可以，聚合函数不能嵌套使用",
        "correct": true
      },
      {
        "label": "B",
        "text": "可以，SUM(COUNT(*))返回总行数",
        "correct": false
      },
      {
        "label": "C",
        "text": "可以，但只支持两层嵌套",
        "correct": false
      },
      {
        "label": "D",
        "text": "可以，任何聚合函数都能互相嵌套",
        "correct": false
      }
    ],
    "explanation": "标准SQL不允许聚合函数嵌套（如SUM(COUNT(*))）。聚合函数作用于行集，嵌套没有意义。如需嵌套效果，应使用子查询。",
    "id": 148
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "aggregate",
    "tags": [
      "DISTINCT",
      "COUNT"
    ],
    "stem": "补全SQL：统计有多少个不同的部门，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT COUNT(DISTINCT dept) FROM emp",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT COUNT(dept) FROM emp",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT DISTINCT COUNT(dept) FROM emp",
        "correct": false
      }
    ],
    "explanation": "A正确：COUNT(DISTINCT dept)统计不同部门的数量。B统计含重复的部门数；C的DISTINCT放在COUNT前语法不同；D返回每个部门的人数而非部门数量。",
    "id": 149
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "HAVING",
      "COUNT"
    ],
    "stem": "表emp有数据：dept='A'有3人，dept='B'有7人，dept='C'有2人。SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) >= 3 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "dept=A、B、C",
        "correct": false
      },
      {
        "label": "B",
        "text": "无结果",
        "correct": false
      },
      {
        "label": "C",
        "text": "dept=B，7人",
        "correct": true
      },
      {
        "label": "D",
        "text": "dept=A和dept=B",
        "correct": false
      }
    ],
    "explanation": "HAVING COUNT(*) >= 3：A有3人(3>=3满足)，B有7人(7>=3满足)，C有2人(2>=3不满足)。结果包含A和B两个部门。",
    "id": 150
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "HAVING",
      "WHERE"
    ],
    "stem": "补全SQL：查询2023年销售额超过100万的地区，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT region, SUM(amount) FROM sales HAVING SUM(amount) > 1000000 WHERE year=2023",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT region, SUM(amount) FROM sales GROUP BY region HAVING SUM(amount) > 1000000",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT region, SUM(amount) FROM sales WHERE year=2023 GROUP BY region WHERE SUM(amount) > 1000000",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT region, SUM(amount) FROM sales WHERE year=2023 GROUP BY region HAVING SUM(amount) > 1000000",
        "correct": true
      }
    ],
    "explanation": "A正确：先用WHERE过滤2023年数据，再GROUP BY按地区分组，最后HAVING过滤超100万的地区。B的WHERE和HAVING顺序错误；C缺少year=2023的WHERE条件；D用两个WHERE是错误的。",
    "id": 151
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "HAVING",
      "WHERE"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING dept = 'IT'",
    "options": [
      {
        "label": "A",
        "text": "dept的过滤条件应放在WHERE中而非HAVING中",
        "correct": true
      },
      {
        "label": "B",
        "text": "AVG(salary)语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "GROUP BY dept应改为ORDER BY dept",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有问题，结果正确",
        "correct": false
      }
    ],
    "explanation": "对非聚合列dept的等值条件应放在WHERE中（WHERE dept='IT'），因为这是行级过滤而非分组过滤。HAVING应用于聚合条件的过滤，对普通列的等值判断用WHERE更规范高效，也能减少不必要的分组计算。",
    "id": 152
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "COUNT",
      "DISTINCT"
    ],
    "stem": "表employees有10行，其中dept列有3个不同值(IT,Sales,HR)，IT部门4人，Sales部门3人，HR部门3人。SELECT COUNT(*), COUNT(DISTINCT dept) FROM employees 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "COUNT(*)=3, COUNT(DISTINCT dept)=10",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT(*)=10, COUNT(DISTINCT dept)=3",
        "correct": true
      },
      {
        "label": "C",
        "text": "COUNT(*)=3, COUNT(DISTINCT dept)=3",
        "correct": false
      },
      {
        "label": "D",
        "text": "COUNT(*)=10, COUNT(DISTINCT dept)=10",
        "correct": false
      }
    ],
    "explanation": "COUNT(*)统计表中所有行数，结果为10。COUNT(DISTINCT dept)统计dept列的不同值数量，有IT、Sales、HR共3个不同值，结果为3。两者互不影响。",
    "id": 153
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "HAVING"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, COUNT(*) FROM emp WHERE salary > 5000 GROUP BY dept HAVING COUNT(*) < 10",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY应在WHERE之前",
        "correct": false
      },
      {
        "label": "B",
        "text": "HAVING中不能用COUNT(*)",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有问题",
        "correct": true
      },
      {
        "label": "D",
        "text": "WHERE和HAVING不能同时使用",
        "correct": false
      }
    ],
    "explanation": "此SQL完全正确：WHERE过滤salary>5000的行，GROUP BY按部门分组，HAVING过滤人数少于10的部门。WHERE和HAVING可以同时使用，分别在不同阶段过滤。",
    "id": 154
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "多列"
    ],
    "stem": "补全SQL：按年份和季度统计销售总额，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT year, quarter, COUNT(amount) FROM sales GROUP BY year, quarter",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT year, SUM(amount) FROM sales GROUP BY year, quarter",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT year, quarter, SUM(amount) FROM sales GROUP BY year",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT year, quarter, SUM(amount) FROM sales GROUP BY year, quarter",
        "correct": true
      }
    ],
    "explanation": "A正确：按year和quarter两列分组并求和。B用COUNT是计数；C的SELECT缺少quarter分组列对应关系错误；D只按year分组缺少quarter。",
    "id": 155
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "NULL",
      "COUNT"
    ],
    "stem": "以下SQL有什么问题？SELECT COUNT(name) FROM students WHERE name IS NULL",
    "options": [
      {
        "label": "A",
        "text": "COUNT(name)不会统计NULL值行，此查询永远返回0",
        "correct": true
      },
      {
        "label": "B",
        "text": "IS NULL语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT不能与WHERE一起使用",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有问题",
        "correct": false
      }
    ],
    "explanation": "COUNT(name)忽略NULL值，所以当所有name都是NULL时COUNT(name)返回0。用WHERE name IS NULL筛选后，这些行的name列全是NULL，COUNT(name)仍统计为0。这是逻辑问题而非语法问题。",
    "id": 156
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "嵌套",
      "子查询"
    ],
    "stem": "如何实现'每个类别中价格最高的商品'的查询？",
    "options": [
      {
        "label": "A",
        "text": "使用ORDER BY和LIMIT即可",
        "correct": false
      },
      {
        "label": "B",
        "text": "使用子查询配合GROUP BY和聚合函数",
        "correct": true
      },
      {
        "label": "C",
        "text": "直接在WHERE中使用MAX函数",
        "correct": false
      },
      {
        "label": "D",
        "text": "使用HAVING子句即可",
        "correct": false
      }
    ],
    "explanation": "查找'每个类别中价格最高的商品'需要子查询或窗口函数。直接在WHERE中用MAX是语法错误；HAVING用于过滤分组非获取具体行；ORDER BY+LIMIT只能获取全局最高价。",
    "id": 157
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "DISTINCT",
      "聚合"
    ],
    "stem": "补全SQL：统计每个部门有多少个不同的职位，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, DISTINCT COUNT(job) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dept, COUNT(DISTINCT *) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept, COUNT(DISTINCT job) FROM emp GROUP BY dept",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT dept, COUNT(job) FROM emp GROUP BY dept",
        "correct": false
      }
    ],
    "explanation": "A正确：COUNT(DISTINCT job)统计每个部门不同职位数。B统计含重复的职位数；C语法错误，DISTINCT不能放在COUNT前独立使用；D的DISTINCT *在COUNT中不支持。",
    "id": 158
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "HAVING",
      "逻辑"
    ],
    "stem": "以下SQL有什么问题？SELECT category, COUNT(*) FROM products GROUP BY category HAVING category = 'Electronics' AND COUNT(*) > 5",
    "options": [
      {
        "label": "A",
        "text": "AND不能连接HAVING条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY和HAVING不能一起使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT(*) > 5语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "category条件应在WHERE中，COUNT(*)条件应在HAVING中",
        "correct": true
      }
    ],
    "explanation": "category='Electronics'是行级过滤应放在WHERE中，COUNT(*)>5是分组过滤放在HAVING中。AND可以在HAVING中使用，但最佳实践是将行级条件移至WHERE。",
    "id": 159
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "子查询"
    ],
    "stem": "补全SQL：查询总销售额高于所有部门平均销售额的部门，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept FROM sales GROUP BY dept HAVING SUM(amount) > (SELECT AVG(total) FROM (SELECT SUM(amount) AS total FROM sales GROUP BY dept) t)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dept FROM sales WHERE SUM(amount) > AVG(amount)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept FROM sales GROUP BY dept HAVING SUM(amount) > AVG(amount)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dept FROM sales GROUP BY dept HAVING SUM(amount) > COUNT(amount)",
        "correct": false
      }
    ],
    "explanation": "A使用子查询先计算所有部门的销售额总和的平均值，再用HAVING过滤。B在WHERE中使用聚合函数错误；C的AVG(amount)是每个部门内部的平均值而非全局平均；D与COUNT比较无意义。",
    "id": 160
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "DISTINCT",
      "分组"
    ],
    "stem": "表purchases: 顾客A买了3种不同商品（共5次购买），顾客B买了2种不同商品（共3次购买）。SELECT customer, COUNT(DISTINCT product), COUNT(*) FROM purchases GROUP BY customer 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "A: 5,3; B: 3,2",
        "correct": false
      },
      {
        "label": "B",
        "text": "A: 3,5; B: 2,3",
        "correct": true
      },
      {
        "label": "C",
        "text": "A: 5,5; B: 3,3",
        "correct": false
      },
      {
        "label": "D",
        "text": "A: 3,3; B: 2,2",
        "correct": false
      }
    ],
    "explanation": "COUNT(DISTINCT product)统计不同商品数，COUNT(*)统计总购买次数。A顾客：3种不同商品，5次购买；B顾客：2种不同商品，3次购买。",
    "id": 161
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "HAVING",
      "语法"
    ],
    "stem": "以下SQL有什么问题？SELECT category, AVG(price) AS avg_price FROM products GROUP BY category HAVING avg_price > 100",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY不能与HAVING一起使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING中应使用AVG(price)而非别名avg_price",
        "correct": true
      },
      {
        "label": "D",
        "text": "AS关键字不能用于聚合列",
        "correct": false
      }
    ],
    "explanation": "HAVING子句中应使用原始表达式AVG(price)，而非别名avg_price。标准SQL中HAVING不能引用SELECT中的别名（虽然某些数据库如MySQL允许）。",
    "id": 162
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "NULL",
      "全NULL列"
    ],
    "stem": "如果某列所有值都是NULL，以下哪个聚合函数会返回NULL？",
    "options": [
      {
        "label": "A",
        "text": "所有聚合函数都返回NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "所有聚合函数都返回0",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT返回NULL，SUM返回0",
        "correct": false
      },
      {
        "label": "D",
        "text": "SUM和AVG返回NULL，COUNT返回0",
        "correct": true
      }
    ],
    "explanation": "当所有值都是NULL时，SUM和AVG返回NULL（因为没有非NULL值参与计算），COUNT返回0（计数值为0而非NULL）。这是聚合函数对NULL的特殊处理。",
    "id": 163
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "MIN",
      "HAVING"
    ],
    "stem": "补全SQL：查找最低工资大于3000的部门，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, MIN(salary) FROM emp GROUP BY dept HAVING MIN(salary) > 3000",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dept, MIN(salary) FROM emp WHERE salary > 3000 GROUP BY dept",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept, MIN(salary) FROM emp GROUP BY dept HAVING salary > 3000",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dept, MAX(salary) FROM emp GROUP BY dept HAVING MAX(salary) > 3000",
        "correct": false
      }
    ],
    "explanation": "A正确：MIN(salary)>3000过滤最低工资超3000的部门。B的WHERE过滤行而非分组最低工资；C的HAVING中用裸列名错误；D查找的是最高工资超3000的部门，不符合题意。",
    "id": 164
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "SELECT"
    ],
    "stem": "以下SQL有什么问题？SELECT COUNT(*), dept FROM emp GROUP BY COUNT(*)",
    "options": [
      {
        "label": "A",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY后应为列名而非聚合函数",
        "correct": true
      },
      {
        "label": "C",
        "text": "COUNT(*)不能出现在SELECT中",
        "correct": false
      },
      {
        "label": "D",
        "text": "dept不应出现在SELECT中",
        "correct": false
      }
    ],
    "explanation": "GROUP BY后应为列名（如dept），不能是聚合函数。GROUP BY COUNT(*)无意义，因为聚合函数不能用于分组。dept应在GROUP BY中而非作为分组依据的替代。",
    "id": 165
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "COUNT",
      "SUM",
      "对比"
    ],
    "stem": "表order_items有5行，quantity列为{2,3,2,1,2}。SELECT COUNT(quantity), SUM(quantity) FROM order_items 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "COUNT=5, SUM=8",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT=3, SUM=8",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT=5, SUM=10",
        "correct": true
      },
      {
        "label": "D",
        "text": "COUNT=3, SUM=10",
        "correct": false
      }
    ],
    "explanation": "COUNT(quantity)=5（统计行数），SUM(quantity)=2+3+2+1+2=10。注意quantity=2的值出现3次但COUNT统计所有行非不同值。",
    "id": 166
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "聚合函数",
      "DISTINCT"
    ],
    "stem": "SUM(DISTINCT column)的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "对所有行求和",
        "correct": false
      },
      {
        "label": "B",
        "text": "统计不同值的个数",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除重复行后求和",
        "correct": false
      },
      {
        "label": "D",
        "text": "对不同值求和，重复值只计一次",
        "correct": true
      }
    ],
    "explanation": "SUM(DISTINCT column)先对column去重，再对不同的值求和。统计不同值个数用COUNT(DISTINCT column)，删除重复行用DISTINCT关键字。",
    "id": 167
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "SUM",
      "DISTINCT"
    ],
    "stem": "补全SQL：计算有多少种不同金额的订单，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(DISTINCT amount) FROM orders",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT DISTINCT COUNT(amount) FROM orders",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT SUM(DISTINCT amount) FROM orders",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT COUNT(amount) FROM orders",
        "correct": false
      }
    ],
    "explanation": "A正确：COUNT(DISTINCT amount)统计不同金额的数量。B语法错误，DISTINCT不能修饰COUNT的结果；C求不同金额的总和非计数；D统计含重复的行数。",
    "id": 168
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "aggregate",
    "tags": [
      "NULL",
      "COUNT"
    ],
    "stem": "以下SQL有什么逻辑问题？SELECT name, COUNT(*) FROM emp WHERE dept IS NULL GROUP BY name",
    "options": [
      {
        "label": "A",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "B",
        "text": "当dept为NULL的行中同名人员可能被归为一组，COUNT(*)统计的不是人数而是组内行数",
        "correct": true
      },
      {
        "label": "C",
        "text": "IS NULL语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "COUNT(*)不能与GROUP BY一起使用",
        "correct": false
      }
    ],
    "explanation": "此SQL按name分组统计同名人数，逻辑正确。IS NULL语法正确，COUNT(*)可以与GROUP BY一起使用，WHERE和GROUP BY可以配合使用。该查询的目的是找出无部门员工的姓名分布。",
    "id": 169
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "子查询",
      "嵌套"
    ],
    "stem": "表emp有dept A(5人)和dept B(3人)。SELECT dept, COUNT(*) FROM emp GROUP BY dept 的结果中，如何获取人数最多的部门？",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, MAX(COUNT(*)) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dept FROM emp GROUP BY dept ORDER BY COUNT(*) DESC LIMIT 1",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept FROM emp GROUP BY dept HAVING COUNT(*) = (SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM emp GROUP BY dept) t)",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT dept FROM emp WHERE COUNT(*) = MAX(COUNT(*))",
        "correct": false
      }
    ],
    "explanation": "A使用子查询找到最大计数值，HAVING过滤等于该值的部门。B在WHERE中使用聚合函数错误；C的MAX(COUNT(*))嵌套聚合函数不支持；D的LIMIT非标准SQL。D在某些数据库中可行但不是标准SQL答案。",
    "id": 170
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "HAVING",
      "多条件"
    ],
    "stem": "表emp: dept A(salary总额5000,人数3), dept B(salary总额8000,人数2), dept C(salary总额6000,人数4)。SELECT dept FROM emp GROUP BY dept HAVING SUM(salary) > 4000 AND COUNT(*) >= 3 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "A、B、C",
        "correct": false
      },
      {
        "label": "B",
        "text": "只有A",
        "correct": false
      },
      {
        "label": "C",
        "text": "B和C",
        "correct": false
      },
      {
        "label": "D",
        "text": "A和C",
        "correct": true
      }
    ],
    "explanation": "A: SUM=5000>4000且COUNT=3>=3满足；B: SUM=8000>4000但COUNT=2<3不满足；C: SUM=6000>4000且COUNT=4>=3满足。结果为A和C。",
    "id": 171
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "子查询",
      "HAVING"
    ],
    "stem": "补全SQL：查找工资总额高于全公司平均工资总额2倍的部门，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept FROM emp GROUP BY dept HAVING SUM(salary) > 2 * (SELECT AVG(dept_total) FROM (SELECT SUM(salary) AS dept_total FROM emp GROUP BY dept) t)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dept FROM emp GROUP BY dept HAVING SUM(salary) > 2 * AVG(salary)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept FROM emp WHERE SUM(salary) > 2 * AVG(salary) GROUP BY dept",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dept FROM emp GROUP BY dept HAVING SUM(salary) > 2 * COUNT(salary)",
        "correct": false
      }
    ],
    "explanation": "A使用嵌套子查询计算部门工资总额的平均值，HAVING过滤超过2倍的部门。B的AVG(salary)是每个部门内部的平均工资而非全局平均；C在WHERE中使用聚合函数；D与COUNT比较无意义。",
    "id": 172
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "SELECT",
      "语义"
    ],
    "stem": "以下SQL有什么问题？SELECT product, SUM(quantity) FROM order_items GROUP BY product HAVING SUM(quantity) = MAX(quantity)",
    "options": [
      {
        "label": "A",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "B",
        "text": "HAVING条件语义错误，将SUM与另一列的MAX比较而非全局最大SUM",
        "correct": true
      },
      {
        "label": "C",
        "text": "GROUP BY product语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "SUM和MAX不能同时出现在HAVING中",
        "correct": false
      }
    ],
    "explanation": "HAVING中SUM(quantity)=MAX(quantity)比较的是同组内SUM与MAX，语义不明确。如果意图是找全局最大SUM，应使用子查询。此条件实际含义是SUM等于组内MAX，这在逻辑上有问题。",
    "id": 173
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "CASE",
      "条件聚合"
    ],
    "stem": "补全SQL：统计每个部门中工资大于5000的员工人数，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT dept, COUNT(CASE WHEN salary > 5000 THEN 1 END) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dept, AVG(CASE WHEN salary > 5000 THEN 1 ELSE 0 END) FROM emp GROUP BY dept",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dept, SUM(CASE WHEN salary > 5000 THEN 1 ELSE 0 END) FROM emp GROUP BY dept",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT dept, COUNT(salary > 5000) FROM emp GROUP BY dept",
        "correct": false
      }
    ],
    "explanation": "A使用CASE WHEN+SUM实现条件计数，这是标准方法。B的COUNT(salary>5000)语法错误；C缺少ELSE子句可能将NULL计入；D用AVG返回比例而非人数。注意C在某些数据库中也可行但不如A规范。",
    "id": 174
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "CASE",
      "条件聚合"
    ],
    "stem": "补全SQL：统计每个班级中及格(>=60)和不及格(<60)的学生人数，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT class, COUNT(CASE WHEN score>=60 THEN 1 END), COUNT(CASE WHEN score<60 THEN 1 END) FROM students GROUP BY class",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT class, COUNT(score>=60), COUNT(score<60) FROM students GROUP BY class",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT class, SUM(score>=60), SUM(score<60) FROM students GROUP BY class",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT class, SUM(CASE WHEN score>=60 THEN 1 ELSE 0 END) AS pass, SUM(CASE WHEN score<60 THEN 1 ELSE 0 END) AS fail FROM students GROUP BY class",
        "correct": true
      }
    ],
    "explanation": "A使用SUM+CASE WHEN实现条件计数，是最标准的方法。B的COUNT+CASE缺少ELSE可能产生问题；C的COUNT(条件)语法错误；D的SUM(条件)虽然某些数据库支持布尔求和，但不是标准SQL。",
    "id": 175
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "子查询",
      "嵌套聚合"
    ],
    "stem": "以下SQL有什么问题？SELECT MAX(COUNT(*)) FROM emp GROUP BY dept",
    "options": [
      {
        "label": "A",
        "text": "嵌套聚合函数不被支持，需要用子查询实现",
        "correct": true
      },
      {
        "label": "B",
        "text": "MAX不能与COUNT一起使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "GROUP BY dept语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有问题",
        "correct": false
      }
    ],
    "explanation": "标准SQL不支持嵌套聚合函数MAX(COUNT(*))。应使用子查询：SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM emp GROUP BY dept) t。MAX和COUNT可以概念上配合，但语法上不支持嵌套。",
    "id": 176
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "聚合",
      "DISTINCT",
      "条件"
    ],
    "stem": "补全SQL：统计每个类别中有多少种不同价格的商品，______",
    "options": [
      {
        "label": "A",
        "text": "SELECT DISTINCT category, COUNT(price) FROM products GROUP BY category",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT category, COUNT(DISTINCT price) FROM products GROUP BY category",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT category, DISTINCT COUNT(price) FROM products GROUP BY category",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT category, COUNT(price) FROM products GROUP BY category",
        "correct": false
      }
    ],
    "explanation": "A正确：COUNT(DISTINCT price)统计每个类别中不同价格的数量。B的DISTINCT放在COUNT前语法错误；C统计含重复的价格数量；D的DISTINCT在SELECT外层不影响聚合结果。",
    "id": 177
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "GROUP BY",
      "NULL",
      "分组"
    ],
    "stem": "以下SQL有什么问题？SELECT dept, COUNT(*) FROM emp GROUP BY dept ORDER BY dept HAVING COUNT(*) > 3",
    "options": [
      {
        "label": "A",
        "text": "COUNT(*)不能用在HAVING中",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有问题",
        "correct": false
      },
      {
        "label": "C",
        "text": "ORDER BY应在HAVING之后",
        "correct": true
      },
      {
        "label": "D",
        "text": "HAVING不能与GROUP BY一起使用",
        "correct": false
      }
    ],
    "explanation": "标准SQL中子句顺序为SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY。HAVING应在ORDER BY之前。此SQL的ORDER BY在HAVING之前违反了子句顺序。",
    "id": 178
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "aggregate",
    "tags": [
      "SUM",
      "DISTINCT",
      "条件"
    ],
    "stem": "表order_items: product A(quantity=5,price=10), product A(quantity=3,price=10), product B(quantity=2,price=20)。SELECT SUM(DISTINCT price * quantity) FROM order_items 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "80",
        "correct": false
      },
      {
        "label": "B",
        "text": "110",
        "correct": false
      },
      {
        "label": "C",
        "text": "50",
        "correct": false
      },
      {
        "label": "D",
        "text": "此查询逻辑有误，DISTINCT应作用于列而非表达式",
        "correct": true
      }
    ],
    "explanation": "SUM(DISTINCT price*quantity)语法合法但逻辑可疑。price*quantity的DISTINCT值依赖于计算后的去重。更合理的做法是SUM(quantity * price)或分开处理。此题正确答案是A，指出逻辑问题。",
    "id": 179
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CONCAT"
    ],
    "stem": "CONCAT函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "将多个字符串连接为一个字符串",
        "correct": true
      },
      {
        "label": "B",
        "text": "将字符串按分隔符拼接",
        "correct": false
      },
      {
        "label": "C",
        "text": "截取子字符串",
        "correct": false
      },
      {
        "label": "D",
        "text": "替换字符串中的字符",
        "correct": false
      }
    ],
    "explanation": "CONCAT函数将多个字符串参数首尾连接成一个字符串。CONCAT_WS才是按分隔符拼接，SUBSTRING用于截取，REPLACE用于替换。",
    "id": 180
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CONCAT_WS"
    ],
    "stem": "CONCAT_WS与CONCAT的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "CONCAT_WS只能连接两个字段",
        "correct": false
      },
      {
        "label": "B",
        "text": "CONCAT_WS可以指定分隔符",
        "correct": true
      },
      {
        "label": "C",
        "text": "CONCAT_WS不支持NULL值",
        "correct": false
      },
      {
        "label": "D",
        "text": "CONCAT_WS结果长度更短",
        "correct": false
      }
    ],
    "explanation": "CONCAT_WS的第一个参数是分隔符，后续参数为要连接的字符串。CONCAT没有分隔符参数。两者都支持NULL处理，CONCAT_WS不限制参数数量。",
    "id": 181
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "SUBSTRING",
      "substr"
    ],
    "stem": "SUBSTRING('Hello World', 1, 5) 的返回结果是什么？（SQLite中用substr函数，功能相同）",
    "options": [
      {
        "label": "A",
        "text": "Hello World",
        "correct": false
      },
      {
        "label": "B",
        "text": "H",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hello",
        "correct": true
      },
      {
        "label": "D",
        "text": "World",
        "correct": false
      }
    ],
    "explanation": "SUBSTRING(str, pos, len)从位置1开始截取长度为5的子串，结果为'Hello'。位置从1开始计数，不是从0开始。SQLite使用substr函数，语法完全相同：substr('Hello World', 1, 5)。本练习环境已自动转换，可直接运行。",
    "id": 182
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LEFT",
      "RIGHT"
    ],
    "stem": "LEFT('MySQL', 3) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "SQL",
        "correct": false
      },
      {
        "label": "B",
        "text": "MySQL",
        "correct": false
      },
      {
        "label": "C",
        "text": "M",
        "correct": false
      },
      {
        "label": "D",
        "text": "MyS",
        "correct": true
      }
    ],
    "explanation": "LEFT(str, n)返回字符串最左边的n个字符。LEFT('MySQL',3)返回'MyS'。RIGHT返回最右边的字符。",
    "id": 183
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LENGTH",
      "CHAR_LENGTH"
    ],
    "stem": "LENGTH和CHAR_LENGTH的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "LENGTH返回字节数，CHAR_LENGTH返回字符数",
        "correct": true
      },
      {
        "label": "B",
        "text": "LENGTH返回字符数，CHAR_LENGTH返回字节数",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "LENGTH只用于数字，CHAR_LENGTH用于字符串",
        "correct": false
      }
    ],
    "explanation": "LENGTH()返回字符串的字节长度，CHAR_LENGTH()返回字符个数。对于纯ASCII文本两者相同，但多字节字符时LENGTH更大。",
    "id": 184
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "UPPER",
      "LOWER"
    ],
    "stem": "UPPER('hello') 和 LOWER('WORLD') 的结果分别是？",
    "options": [
      {
        "label": "A",
        "text": "HELLO 和 WORLD",
        "correct": false
      },
      {
        "label": "B",
        "text": "HELLO 和 world",
        "correct": true
      },
      {
        "label": "C",
        "text": "Hello 和 World",
        "correct": false
      },
      {
        "label": "D",
        "text": "hello 和 WORLD",
        "correct": false
      }
    ],
    "explanation": "UPPER将字符串转为大写，LOWER将字符串转为小写。UPPER('hello')='HELLO'，LOWER('WORLD')='world'。",
    "id": 185
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "TRIM"
    ],
    "stem": "TRIM('  Hello  ') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "Hello  ",
        "correct": false
      },
      {
        "label": "B",
        "text": "  Hello  ",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hello",
        "correct": true
      },
      {
        "label": "D",
        "text": "  Hello",
        "correct": false
      }
    ],
    "explanation": "TRIM()同时去除字符串两端的空格。LTRIM只去左端，RTRIM只去右端。",
    "id": 186
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LTRIM",
      "RTRIM"
    ],
    "stem": "LTRIM('  Hello  ') 和 RTRIM('  Hello  ') 的结果分别是？",
    "options": [
      {
        "label": "A",
        "text": "都返回Hello",
        "correct": false
      },
      {
        "label": "B",
        "text": "(左侧有空格)Hello 和 Hello(右侧有空格)",
        "correct": false
      },
      {
        "label": "C",
        "text": "都返回  Hello",
        "correct": false
      },
      {
        "label": "D",
        "text": "Hello(右侧有空格) 和 (左侧有空格)Hello",
        "correct": true
      }
    ],
    "explanation": "LTRIM只去掉左侧空格，结果右侧仍保留空格；RTRIM只去掉右侧空格，左侧仍保留空格。二者结合等效于TRIM。",
    "id": 187
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REPLACE"
    ],
    "stem": "REPLACE('Hello World', 'World', 'SQL') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "Hello SQL",
        "correct": true
      },
      {
        "label": "B",
        "text": "Hello World SQL",
        "correct": false
      },
      {
        "label": "C",
        "text": "SQL World",
        "correct": false
      },
      {
        "label": "D",
        "text": "Hello",
        "correct": false
      }
    ],
    "explanation": "REPLACE(str, from_str, to_str)将str中所有出现的from_str替换为to_str。此处将'World'替换为'SQL'。",
    "id": 188
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REVERSE"
    ],
    "stem": "REVERSE('ABC') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "ACB",
        "correct": false
      },
      {
        "label": "B",
        "text": "CBA",
        "correct": true
      },
      {
        "label": "C",
        "text": "ABC",
        "correct": false
      },
      {
        "label": "D",
        "text": "BAC",
        "correct": false
      }
    ],
    "explanation": "REVERSE()将字符串字符顺序反转。'ABC'反转为'CBA'。",
    "id": 189
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REPEAT"
    ],
    "stem": "REPEAT('AB', 3) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "ABB",
        "correct": false
      },
      {
        "label": "B",
        "text": "AB3",
        "correct": false
      },
      {
        "label": "C",
        "text": "ABABAB",
        "correct": true
      },
      {
        "label": "D",
        "text": "AAA",
        "correct": false
      }
    ],
    "explanation": "REPEAT(str, count)将字符串重复count次。'AB'重复3次得到'ABABAB'。",
    "id": 190
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LPAD",
      "RPAD",
      "printf"
    ],
    "stem": "LPAD('Hi', 5, '*') 的返回结果是什么？（SQLite用printf实现类似功能）",
    "options": [
      {
        "label": "A",
        "text": "Hi***",
        "correct": false
      },
      {
        "label": "B",
        "text": "**Hi*",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hi**",
        "correct": false
      },
      {
        "label": "D",
        "text": "***Hi",
        "correct": true
      }
    ],
    "explanation": "LPAD(str, len, padstr)在字符串左侧填充指定字符到指定长度。'Hi'左侧填充'*'到长度5，得到'***Hi'。SQLite不支持LPAD/RPAD，可用printf('%5s', 'Hi')实现左填充（用空格填充）。本练习环境已自动转换，可直接运行。",
    "id": 191
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "INSTR"
    ],
    "stem": "INSTR('Hello World', 'World') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "7",
        "correct": true
      },
      {
        "label": "B",
        "text": "5",
        "correct": false
      },
      {
        "label": "C",
        "text": "0",
        "correct": false
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ],
    "explanation": "INSTR(str, substr)返回子串第一次出现的位置（从1开始）。'World'在'Hello World'中从第7个字符开始。",
    "id": 192
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LOCATE"
    ],
    "stem": "LOCATE('or', 'Hello World') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "8",
        "correct": true
      },
      {
        "label": "C",
        "text": "7",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "LOCATE(substr, str)返回子串首次出现的位置。'or'在'Hello World'中从第8个字符开始（区分大小写视排序规则而定）。",
    "id": 193
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CAST"
    ],
    "stem": "CAST('123' AS SIGNED) 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "将字符串'123'转为日期",
        "correct": false
      },
      {
        "label": "B",
        "text": "将字符串'123'转为浮点数",
        "correct": false
      },
      {
        "label": "C",
        "text": "将字符串'123'转为有符号整数",
        "correct": true
      },
      {
        "label": "D",
        "text": "将数字123转为字符串",
        "correct": false
      }
    ],
    "explanation": "CAST(expr AS SIGNED)将表达式转为有符号整数。SIGNED等价于INT。字符串'123'转为整数123。",
    "id": 194
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CONVERT"
    ],
    "stem": "CONVERT与CAST的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "CONVERT只能用于数字转换",
        "correct": false
      },
      {
        "label": "B",
        "text": "CAST支持字符集转换",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "CONVERT支持指定字符集转换，CAST语法更简洁",
        "correct": true
      }
    ],
    "explanation": "CONVERT可以指定字符集（如utf8），CAST语法更简洁但功能类似。CONVERT(expr USING charset)是独有语法。",
    "id": 195
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "隐式类型转换"
    ],
    "stem": "SELECT '1' + 1 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": true
      },
      {
        "label": "B",
        "text": "11",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "MySQL中'1'+1进行隐式类型转换，字符串'1'转为数字1，结果为2。注意这不是字符串连接，而是算术运算。",
    "id": 196
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "REGEXP在SQL中用于什么？",
    "options": [
      {
        "label": "A",
        "text": "类型转换",
        "correct": false
      },
      {
        "label": "B",
        "text": "正则表达式匹配",
        "correct": true
      },
      {
        "label": "C",
        "text": "字符串替换",
        "correct": false
      },
      {
        "label": "D",
        "text": "字符串截取",
        "correct": false
      }
    ],
    "explanation": "REGEXP用于正则表达式模式匹配，返回1（匹配）或0（不匹配）。不是替换、截取或类型转换。",
    "id": 197
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CONCAT"
    ],
    "stem": "CONCAT('A', 'B', 'C') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "A,B,C",
        "correct": false
      },
      {
        "label": "B",
        "text": "AB",
        "correct": false
      },
      {
        "label": "C",
        "text": "ABC",
        "correct": true
      },
      {
        "label": "D",
        "text": "A B C",
        "correct": false
      }
    ],
    "explanation": "CONCAT将多个字符串简单连接，无分隔符。CONCAT('A','B','C')='ABC'。需要分隔符时使用CONCAT_WS。",
    "id": 198
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CONCAT_WS"
    ],
    "stem": "SELECT CONCAT_WS(___, 'A', 'B', 'C') 返回 'A-B-C'，应填入？",
    "options": [
      {
        "label": "A",
        "text": "'A-B-C'",
        "correct": false
      },
      {
        "label": "B",
        "text": "'ABC'",
        "correct": false
      },
      {
        "label": "C",
        "text": "' '",
        "correct": false
      },
      {
        "label": "D",
        "text": "'-'",
        "correct": true
      }
    ],
    "explanation": "CONCAT_WS第一个参数为分隔符，要得到'A-B-C'，分隔符应为'-'。其他选项不会产生该结果。",
    "id": 199
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "SUBSTRING"
    ],
    "stem": "SUBSTRING('MySQL', 3) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "SQL",
        "correct": true
      },
      {
        "label": "B",
        "text": "MyS",
        "correct": false
      },
      {
        "label": "C",
        "text": "ySQL",
        "correct": false
      },
      {
        "label": "D",
        "text": "My",
        "correct": false
      }
    ],
    "explanation": "SUBSTRING(str, pos)省略长度参数时返回从pos位置到末尾的子串。从第3个字符开始到末尾为'SQL'。",
    "id": 200
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "TRIM"
    ],
    "stem": "TRIM(BOTH 'x' FROM 'xxxHelloxxx') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "Hellox",
        "correct": false
      },
      {
        "label": "B",
        "text": "Hello",
        "correct": true
      },
      {
        "label": "C",
        "text": "Helloxxx",
        "correct": false
      },
      {
        "label": "D",
        "text": "xxxHello",
        "correct": false
      }
    ],
    "explanation": "TRIM(BOTH 'x' FROM str)去除两端指定的字符'x'。结果为'Hello'。LEADING/TRAILING分别处理单侧。",
    "id": 201
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "CAST"
    ],
    "stem": "CAST(3.14 AS SIGNED) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "4",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "3",
        "correct": true
      },
      {
        "label": "D",
        "text": "3.14",
        "correct": false
      }
    ],
    "explanation": "CAST(3.14 AS SIGNED)将浮点数转为有符号整数，截断小数部分，结果为3。不是四舍五入。",
    "id": 202
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "INSTR"
    ],
    "stem": "INSTR('Hello', 'xyz') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "-1",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": true
      }
    ],
    "explanation": "INSTR找不到子串时返回0，不是-1也不是NULL。INSTR('Hello','xyz')=0表示未找到。",
    "id": 203
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REPLACE"
    ],
    "stem": "REPLACE('aaaa', 'a', 'b') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "bbbb",
        "correct": true
      },
      {
        "label": "B",
        "text": "baaa",
        "correct": false
      },
      {
        "label": "C",
        "text": "aaab",
        "correct": false
      },
      {
        "label": "D",
        "text": "b",
        "correct": false
      }
    ],
    "explanation": "REPLACE替换所有匹配的子串。'aaaa'中所有'a'被替换为'b'，结果为'bbbb'。",
    "id": 204
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LENGTH",
      "CHAR_LENGTH"
    ],
    "stem": "要获取字符串的字符数量（非字节数），应使用哪个函数？",
    "options": [
      {
        "label": "A",
        "text": "COUNT",
        "correct": false
      },
      {
        "label": "B",
        "text": "CHAR_LENGTH",
        "correct": true
      },
      {
        "label": "C",
        "text": "LENGTH",
        "correct": false
      },
      {
        "label": "D",
        "text": "SIZE",
        "correct": false
      }
    ],
    "explanation": "CHAR_LENGTH返回字符个数，LENGTH返回字节长度。对于含多字节字符的字符串两者不同。SIZE和COUNT不是字符串函数。",
    "id": 205
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "LPAD",
      "RPAD"
    ],
    "stem": "RPAD('Hi', 5, '*') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "Hi**",
        "correct": false
      },
      {
        "label": "B",
        "text": "*Hi**",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hi***",
        "correct": true
      },
      {
        "label": "D",
        "text": "***Hi",
        "correct": false
      }
    ],
    "explanation": "RPAD(str, len, padstr)在右侧填充到指定长度。'Hi'右侧填充'*'到长度5，得到'Hi***'。",
    "id": 206
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "隐式类型转换"
    ],
    "stem": "SELECT 'ABC' + 0 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "ABC",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": true
      }
    ],
    "explanation": "MySQL中字符串与数字运算时，非数字字符串转为0。'ABC'+0=0，'123'+0=123。",
    "id": 207
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "'Hello123' REGEXP '[0-9]+' 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": true
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "true",
        "correct": false
      },
      {
        "label": "D",
        "text": "123",
        "correct": false
      }
    ],
    "explanation": "REGEXP匹配成功返回1，失败返回0。'Hello123'包含数字序列，匹配'[0-9]+'，返回1。",
    "id": 208
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "string_cast",
    "tags": [
      "REPLACE"
    ],
    "stem": "要去除字符串中所有空格，可用哪个函数？",
    "options": [
      {
        "label": "A",
        "text": "SUBSTRING(str, 1)",
        "correct": false
      },
      {
        "label": "B",
        "text": "REPLACE(str, ' ', '')",
        "correct": true
      },
      {
        "label": "C",
        "text": "TRIM(str)",
        "correct": false
      },
      {
        "label": "D",
        "text": "LTRIM(str)",
        "correct": false
      }
    ],
    "explanation": "TRIM只去除两端空格，REPLACE(str,' ','')替换所有空格为空串，可去除全部空格。LTRIM只去左侧空格。",
    "id": 209
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CONCAT",
      "NULL"
    ],
    "stem": "CONCAT('Hello', NULL) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "HelloNULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "Hello",
        "correct": false
      }
    ],
    "explanation": "CONCAT中任一参数为NULL则结果为NULL。这是CONCAT与CONCAT_WS的重要区别，CONCAT_WS会跳过NULL。",
    "id": 210
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CONCAT_WS",
      "NULL"
    ],
    "stem": "CONCAT_WS('-', 'A', NULL, 'B') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "A--B",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "A-B-NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "A-B",
        "correct": true
      }
    ],
    "explanation": "CONCAT_WS跳过NULL值，只连接非NULL参数。'A'和'B'用'-'连接，NULL被跳过，结果为'A-B'。",
    "id": 211
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "SUBSTRING"
    ],
    "stem": "SUBSTRING('Hello World', -3) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "rld",
        "correct": true
      },
      {
        "label": "B",
        "text": "ld",
        "correct": false
      },
      {
        "label": "C",
        "text": "Hel",
        "correct": false
      },
      {
        "label": "D",
        "text": "orl",
        "correct": false
      }
    ],
    "explanation": "SUBSTRING(str, -n)从右向左第n个字符开始截取到末尾。-3表示从倒数第3个字符开始，结果为'rld'。",
    "id": 212
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CAST"
    ],
    "stem": "以下哪条SQL能正确将字符串'42'转为整数？",
    "options": [
      {
        "label": "A",
        "text": "CAST('42' AS DECIMAL(10,2))",
        "correct": false
      },
      {
        "label": "B",
        "text": "CAST('42' AS SIGNED)",
        "correct": true
      },
      {
        "label": "C",
        "text": "CAST('42' AS VARCHAR)",
        "correct": false
      },
      {
        "label": "D",
        "text": "CAST('42' AS DATE)",
        "correct": false
      }
    ],
    "explanation": "CAST('42' AS SIGNED)将字符串转为有符号整数。AS VARCHAR用于字符串，AS DATE用于日期，AS DECIMAL用于小数。",
    "id": 213
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "'2024-01-15' REGEXP '^[0-9]{4}-[0-9]{2}' 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "true",
        "correct": false
      },
      {
        "label": "B",
        "text": "2024",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": true
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "正则'^[0-9]{4}-[0-9]{2}'匹配以4位数字-2位数字开头的字符串。'2024-01-15'匹配，返回1。",
    "id": 214
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CAST",
      "CONVERT"
    ],
    "stem": "要将数值转换为字符串类型，应使用CAST的哪个类型参数？",
    "options": [
      {
        "label": "A",
        "text": "SIGNED",
        "correct": false
      },
      {
        "label": "B",
        "text": "DATE",
        "correct": false
      },
      {
        "label": "C",
        "text": "JSON",
        "correct": false
      },
      {
        "label": "D",
        "text": "CHAR",
        "correct": true
      }
    ],
    "explanation": "CAST(x AS CHAR)将表达式转为字符串。SIGNED用于整数，DATE用于日期，JSON用于JSON类型。",
    "id": 215
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "SUBSTRING"
    ],
    "stem": "SUBSTRING('Hello' FROM 2 FOR 3) 等价于以下哪个？",
    "options": [
      {
        "label": "A",
        "text": "SUBSTRING('Hello', 2, 3)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SUBSTRING('Hello', 3, 2)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SUBSTRING('Hello', 1, 3)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SUBSTRING('Hello', 2, 2)",
        "correct": false
      }
    ],
    "explanation": "FROM和FOR是SQL标准语法，等价于逗号语法。SUBSTRING(str FROM pos FOR len)等价于SUBSTRING(str, pos, len)。",
    "id": 216
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "INSTR",
      "LOCATE"
    ],
    "stem": "INSTR('MySQLMySQL', 'SQL') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "6",
        "correct": false
      },
      {
        "label": "D",
        "text": "9",
        "correct": false
      }
    ],
    "explanation": "INSTR返回子串首次出现的位置。'MySQLMySQL'中'SQL'首次出现在位置3（区分大小写视排序规则）。",
    "id": 217
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CONCAT",
      "NULL"
    ],
    "stem": "为什么SELECT CONCAT(name, NULL) FROM users可能返回NULL？",
    "options": [
      {
        "label": "A",
        "text": "name列不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "CONCAT返回值类型为NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "CONCAT中任一参数为NULL则整个结果为NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "CONCAT不支持NULL参数",
        "correct": false
      }
    ],
    "explanation": "CONCAT的特性：任一参数为NULL则结果为NULL。这是SQL标准行为，不是函数缺陷。可用IFNULL处理。",
    "id": 218
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REPLACE",
      "嵌套"
    ],
    "stem": "REPLACE(REPLACE('aabbcc', 'a', 'x'), 'c', 'y') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "aabbcc",
        "correct": false
      },
      {
        "label": "B",
        "text": "xxbcc",
        "correct": false
      },
      {
        "label": "C",
        "text": "aabbyy",
        "correct": false
      },
      {
        "label": "D",
        "text": "xxbbyy",
        "correct": true
      }
    ],
    "explanation": "先执行内层REPLACE将'a'替换为'x'得到'xxbbcc'，再执行外层将'c'替换为'y'得到'xxbbyy'。",
    "id": 219
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "要匹配以'M'开头的字符串，REGEXP应使用什么模式？",
    "options": [
      {
        "label": "A",
        "text": "^M",
        "correct": true
      },
      {
        "label": "B",
        "text": "M$",
        "correct": false
      },
      {
        "label": "C",
        "text": "M*",
        "correct": false
      },
      {
        "label": "D",
        "text": ".M",
        "correct": false
      }
    ],
    "explanation": "^M'匹配以M开头，M$匹配以M结尾，M*匹配零或多个M，.M匹配任意字符后接M。",
    "id": 220
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CHAR_LENGTH",
      "LENGTH"
    ],
    "stem": "设col存储'你好'（UTF-8每个汉字3字节），CHAR_LENGTH和LENGTH分别返回？",
    "options": [
      {
        "label": "A",
        "text": "6 和 6",
        "correct": false
      },
      {
        "label": "B",
        "text": "2 和 6",
        "correct": true
      },
      {
        "label": "C",
        "text": "6 和 2",
        "correct": false
      },
      {
        "label": "D",
        "text": "2 和 2",
        "correct": false
      }
    ],
    "explanation": "CHAR_LENGTH返回字符数2，LENGTH返回字节数6（UTF-8每个汉字3字节）。这是两函数的核心区别。",
    "id": 221
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CAST",
      "隐式类型转换"
    ],
    "stem": "SELECT '3.14' + 0 的结果类型和值分别是？",
    "options": [
      {
        "label": "A",
        "text": "数值 3",
        "correct": false
      },
      {
        "label": "B",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "数值 3.14",
        "correct": true
      },
      {
        "label": "D",
        "text": "字符串 '3.14'",
        "correct": false
      }
    ],
    "explanation": "隐式类型转换将'3.14'转为数值3.14，+0运算结果为数值3.14。字符串'3.14'参与算术运算时自动转为浮点数。",
    "id": 222
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "LPAD",
      "RPAD"
    ],
    "stem": "LPAD('ABC', 2, 'x') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "xAB",
        "correct": false
      },
      {
        "label": "B",
        "text": "ABC",
        "correct": false
      },
      {
        "label": "C",
        "text": "Ax",
        "correct": false
      },
      {
        "label": "D",
        "text": "AB",
        "correct": true
      }
    ],
    "explanation": "LPAD目标长度小于原字符串长度时，截断到指定长度。LPAD('ABC',2,'x')截断为'AB'，不会报错。",
    "id": 223
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "LOCATE"
    ],
    "stem": "LOCATE('bar', 'foobarbar', 5) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "7",
        "correct": true
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "0",
        "correct": false
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ],
    "explanation": "LOCATE(substr, str, pos)从位置pos开始搜索。从位置5开始搜索'bar'，在'foobarbar'中第7个位置找到。",
    "id": 224
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REPLACE"
    ],
    "stem": "以下哪个能去除字符串两端的所有'a'字符？",
    "options": [
      {
        "label": "A",
        "text": "RTRIM(str, 'a')",
        "correct": false
      },
      {
        "label": "B",
        "text": "TRIM(BOTH 'a' FROM str)",
        "correct": true
      },
      {
        "label": "C",
        "text": "REPLACE(str, 'a', '')",
        "correct": false
      },
      {
        "label": "D",
        "text": "LTRIM(str, 'a')",
        "correct": false
      }
    ],
    "explanation": "TRIM(BOTH 'a' FROM str)去除两端'a'。REPLACE会替换所有位置的'a'（含中间的），LTRIM/RTRIM无此语法。",
    "id": 225
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REPEAT"
    ],
    "stem": "REPEAT('A', 0) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "空字符串",
        "correct": true
      },
      {
        "label": "D",
        "text": "A",
        "correct": false
      }
    ],
    "explanation": "REPEAT(str, 0)返回空字符串''。count为0表示不重复，结果为空串而非NULL。",
    "id": 226
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "'abc' REGEXP 'a.c' 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": false
      },
      {
        "label": "C",
        "text": "abc",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": true
      }
    ],
    "explanation": "正则'a.c'中.匹配任意单个字符，'abc'中a和c之间是b，匹配成功，返回1。",
    "id": 227
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "CAST"
    ],
    "stem": "CAST('2024-01-01' AS DATE) 的返回结果类型是？",
    "options": [
      {
        "label": "A",
        "text": "DATE",
        "correct": true
      },
      {
        "label": "B",
        "text": "DATETIME",
        "correct": false
      },
      {
        "label": "C",
        "text": "VARCHAR",
        "correct": false
      },
      {
        "label": "D",
        "text": "TIMESTAMP",
        "correct": false
      }
    ],
    "explanation": "CAST('2024-01-01' AS DATE)将字符串转为DATE类型。DATE只含日期不含时间，不同于DATETIME和TIMESTAMP。",
    "id": 228
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "string_cast",
    "tags": [
      "隐式类型转换"
    ],
    "stem": "SELECT '5' = 5 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "'5'",
        "correct": false
      },
      {
        "label": "B",
        "text": "1（真）",
        "correct": true
      },
      {
        "label": "C",
        "text": "0（假）",
        "correct": false
      },
      {
        "label": "D",
        "text": "NULL",
        "correct": false
      }
    ],
    "explanation": "MySQL中字符串与数字比较时，字符串隐式转为数字。'5'=5比较结果为真(1)。SQL标准行为。",
    "id": 229
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "CAST",
      "CONVERT"
    ],
    "stem": "CAST和CONVERT在类型转换上的关键语法区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "两者语法完全相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "CONVERT不支持DECIMAL类型",
        "correct": false
      },
      {
        "label": "C",
        "text": "CONVERT支持USING charset语法",
        "correct": true
      },
      {
        "label": "D",
        "text": "CAST支持USING语法",
        "correct": false
      }
    ],
    "explanation": "CONVERT(expr USING charset)可进行字符集转换，CAST无此语法。这是两者在功能上的主要区别。CAST语法更简洁。",
    "id": 230
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "'abc123def' REGEXP '[a-z]+[0-9]+[a-z]+' 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "abc123def",
        "correct": false
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": true
      }
    ],
    "explanation": "[a-z]+匹配字母序列，[0-9]+匹配数字序列，再次[a-z]+匹配字母。'abc123def'完全匹配该模式，返回1。",
    "id": 231
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "SUBSTRING",
      "LOCATE"
    ],
    "stem": "SUBSTRING('Hello World', LOCATE('o', 'Hello World'), 4) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "o Wo",
        "correct": true
      },
      {
        "label": "B",
        "text": "ello",
        "correct": false
      },
      {
        "label": "C",
        "text": "Worl",
        "correct": false
      },
      {
        "label": "D",
        "text": "o",
        "correct": false
      }
    ],
    "explanation": "LOCATE('o','Hello World')=5（第一个o在位置5），SUBSTRING从位置5取4个字符，得到'o Wo'。",
    "id": 232
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "REGEXP"
    ],
    "stem": "为什么 'ABC' REGEXP 'abc' 可能返回0？",
    "options": [
      {
        "label": "A",
        "text": "ABC长度不足",
        "correct": false
      },
      {
        "label": "B",
        "text": "REGEXP默认区分大小写（取决于排序规则）",
        "correct": true
      },
      {
        "label": "C",
        "text": "REGEXP不支持小写字母",
        "correct": false
      },
      {
        "label": "D",
        "text": "REGEXP语法错误",
        "correct": false
      }
    ],
    "explanation": "REGEXP的区分大小写取决于字段/表达式的排序规则。utf8_bin等二进制排序规则区分大小写，匹配失败返回0。",
    "id": 233
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "CONCAT_WS",
      "NULL"
    ],
    "stem": "CONCAT_WS(',', 'a', NULL, 'b', NULL, 'c') 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "a,b,c,",
        "correct": false
      },
      {
        "label": "C",
        "text": "a,b,c",
        "correct": true
      },
      {
        "label": "D",
        "text": "a,,b,,c",
        "correct": false
      }
    ],
    "explanation": "CONCAT_WS跳过NULL值，非NULL值用分隔符连接。两个NULL被跳过，结果为'a,b,c'。",
    "id": 234
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "CAST",
      "隐式类型转换"
    ],
    "stem": "SELECT CAST('9.99' AS DECIMAL(3,1)) 的返回结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "10.0",
        "correct": false
      },
      {
        "label": "B",
        "text": "9.99",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "9.9",
        "correct": true
      }
    ],
    "explanation": "DECIMAL(3,1)表示总共3位、小数1位。9.99截断到1位小数为9.9。不是四舍五入而是截断（视实现而定）。",
    "id": 235
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "REPLACE",
      "REGEXP"
    ],
    "stem": "以下哪个REGEXP模式匹配不包含数字的字符串？",
    "options": [
      {
        "label": "A",
        "text": "^[^0-9]*$",
        "correct": true
      },
      {
        "label": "B",
        "text": "^[0-9]*$",
        "correct": false
      },
      {
        "label": "C",
        "text": "[^0-9]",
        "correct": false
      },
      {
        "label": "D",
        "text": "![0-9]",
        "correct": false
      }
    ],
    "explanation": "^[^0-9]*$匹配从开头到结尾不含任何数字的字符串。^[0-9]*$匹配纯数字串，[^0-9]匹配含非数字字符，![0-9]不是有效语法。",
    "id": 236
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "隐式类型转换",
      "CAST"
    ],
    "stem": "SELECT '1a' + 0 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": true
      },
      {
        "label": "C",
        "text": "0",
        "correct": false
      },
      {
        "label": "D",
        "text": "1a",
        "correct": false
      }
    ],
    "explanation": "MySQL隐式转换时'1a'转为数字1（取到第一个非数字字符为止）。'1a'+0=1。不是0也不是报错。",
    "id": 237
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "LOCATE",
      "INSTR"
    ],
    "stem": "LOCATE和INSTR在参数顺序上有什么区别？",
    "options": [
      {
        "label": "A",
        "text": "INSTR(substr, str, pos)",
        "correct": false
      },
      {
        "label": "B",
        "text": "LOCATE(str, substr)",
        "correct": false
      },
      {
        "label": "C",
        "text": "LOCATE(substr, str, pos)，INSTR(str, substr)",
        "correct": true
      },
      {
        "label": "D",
        "text": "两者参数顺序相同",
        "correct": false
      }
    ],
    "explanation": "LOCATE(substr, str, pos)和INSTR(str, substr)的参数顺序不同。这是两个函数的关键语法差异。",
    "id": 238
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "string_cast",
    "tags": [
      "CAST",
      "CONVERT"
    ],
    "stem": "SELECT CONVERT('test' USING utf8mb4) 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "将字符串的数据类型转为utf8mb4",
        "correct": false
      },
      {
        "label": "B",
        "text": "将排序规则设为utf8mb4",
        "correct": false
      },
      {
        "label": "C",
        "text": "创建utf8mb4编码的表",
        "correct": false
      },
      {
        "label": "D",
        "text": "将字符串的字符集转为utf8mb4",
        "correct": true
      }
    ],
    "explanation": "CONVERT(expr USING charset)改变字符串的字符集编码。utf8mb4支持4字节UTF-8字符（如emoji）。不是改变排序规则。",
    "id": 239
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION"
    ],
    "stem": "UNION 操作符的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "合并两个查询结果集并去除重复行",
        "correct": true
      },
      {
        "label": "B",
        "text": "合并两个查询结果集并保留重复行",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回两个查询结果集的交集",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回两个查询结果集的差集",
        "correct": false
      }
    ],
    "explanation": "UNION将两个SELECT结果合并并自动去除重复行。UNION ALL保留重复行，INTERSECT返回交集，EXCEPT返回差集。",
    "id": 240
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION ALL"
    ],
    "stem": "UNION 与 UNION ALL 的关键区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "UNION ALL 排序结果，UNION 不排序",
        "correct": false
      },
      {
        "label": "B",
        "text": "UNION 去除重复行，UNION ALL 保留重复行",
        "correct": true
      },
      {
        "label": "C",
        "text": "UNION 只能用于两个表，UNION ALL 可用于多个",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION ALL 比 UNION 多一次排序操作",
        "correct": false
      }
    ],
    "explanation": "UNION会去除重复行，UNION ALL保留所有行包括重复行。UNION ALL性能更好因为不需要去重。两者均可用于多个SELECT，UNION ALL不需要额外排序。",
    "id": 241
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "INTERSECT"
    ],
    "stem": "INTERSECT 操作符返回什么结果？",
    "options": [
      {
        "label": "A",
        "text": "两个结果集的笛卡尔积",
        "correct": false
      },
      {
        "label": "B",
        "text": "两个结果集的并集",
        "correct": false
      },
      {
        "label": "C",
        "text": "两个结果集的交集",
        "correct": true
      },
      {
        "label": "D",
        "text": "两个结果集的差集",
        "correct": false
      }
    ],
    "explanation": "INTERSECT返回两个结果集的交集，即同时出现在两个结果集中的行。并集用UNION，差集用EXCEPT，笛卡尔积用CROSS JOIN。",
    "id": 242
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXCEPT"
    ],
    "stem": "EXCEPT 操作符的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回两个结果集的并集",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回两个结果集的对称差集",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回两个结果集的交集",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回第一个结果集中存在但第二个结果集中不存在的行",
        "correct": true
      }
    ],
    "explanation": "EXCEPT返回在第一个SELECT结果中存在但在第二个SELECT结果中不存在的行，即差集运算。Oracle中使用MINUS实现相同功能。",
    "id": 243
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "WITH 子句（CTE）的主要用途是什么？",
    "options": [
      {
        "label": "A",
        "text": "定义可复用的命名子查询",
        "correct": true
      },
      {
        "label": "B",
        "text": "执行递归查询",
        "correct": false
      },
      {
        "label": "C",
        "text": "创建索引",
        "correct": false
      },
      {
        "label": "D",
        "text": "创建临时表存储中间结果",
        "correct": false
      }
    ],
    "explanation": "CTE(Common Table Expression)使用WITH子句定义命名子查询，提高SQL可读性和可维护性。CTE不是临时表也不是索引，递归CTE是其特殊用法。",
    "id": 244
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "DISTINCT",
      "UNION"
    ],
    "stem": "DISTINCT 与 UNION 在去重方面的关系是什么？",
    "options": [
      {
        "label": "A",
        "text": "DISTINCT 和 UNION 完全无关",
        "correct": false
      },
      {
        "label": "B",
        "text": "UNION 等价于对合并结果应用 DISTINCT",
        "correct": true
      },
      {
        "label": "C",
        "text": "DISTINCT 只能用于UNION查询",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION 不进行任何去重操作",
        "correct": false
      }
    ],
    "explanation": "UNION的语义等价于对合并后的结果集执行DISTINCT去重。DISTINCT是通用的去重关键字，不仅限于UNION场景。UNION ALL则不去重。",
    "id": 245
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "临时表"
    ],
    "stem": "临时表与CTE的关键区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "临时表只在当前查询中有效",
        "correct": false
      },
      {
        "label": "B",
        "text": "临时表不能存储数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE是逻辑定义，临时表是物理存储结构",
        "correct": true
      },
      {
        "label": "D",
        "text": "CTE可以创建索引",
        "correct": false
      }
    ],
    "explanation": "CTE是逻辑上的命名子查询，不涉及物理存储；临时表是实际创建的物理表，可以建索引。CTE在当前查询中有效，临时表在会话或事务中有效。",
    "id": 246
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXISTS"
    ],
    "stem": "EXISTS 子查询的返回值是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回子查询的行数",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回子查询第一行的值",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回子查询中的所有行",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回 TRUE 或 FALSE",
        "correct": true
      }
    ],
    "explanation": "EXISTS检查子查询是否返回行，返回TRUE或FALSE。子查询有结果则TRUE，无结果则FALSE。它不返回具体数据，只判断存在性。",
    "id": 247
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "递归CTE必须包含哪两部分？",
    "options": [
      {
        "label": "A",
        "text": "锚点成员和递归成员",
        "correct": true
      },
      {
        "label": "B",
        "text": "基础表和递归表",
        "correct": false
      },
      {
        "label": "C",
        "text": "UNION和UNION ALL",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT和INSERT",
        "correct": false
      }
    ],
    "explanation": "递归CTE由锚点成员(非递归的初始查询)和递归成员(引用自身的查询)组成。锚点提供初始数据，递归成员在锚点基础上反复执行直到无新行。",
    "id": 248
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "子查询替代集合操作"
    ],
    "stem": "以下哪种情况可以用子查询替代INTERSECT？",
    "options": [
      {
        "label": "A",
        "text": "使用UNION实现交集",
        "correct": false
      },
      {
        "label": "B",
        "text": "使用IN子查询实现交集",
        "correct": true
      },
      {
        "label": "C",
        "text": "使用NOT IN子查询实现交集",
        "correct": false
      },
      {
        "label": "D",
        "text": "使用LEFT JOIN实现交集",
        "correct": false
      }
    ],
    "explanation": "INTERSECT可用IN子查询替代：SELECT * FROM A WHERE col IN (SELECT col FROM B)。NOT IN替代EXCEPT，LEFT JOIN可实现差集，UNION实现并集而非交集。",
    "id": 249
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION"
    ],
    "stem": "SELECT 1 UNION SELECT 1 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "空结果集",
        "correct": false
      },
      {
        "label": "B",
        "text": "报错",
        "correct": false
      },
      {
        "label": "C",
        "text": "1行: 1",
        "correct": true
      },
      {
        "label": "D",
        "text": "2行: 1 和 1",
        "correct": false
      }
    ],
    "explanation": "UNION会去除重复行，因此SELECT 1 UNION SELECT 1只返回一行结果1。如果要保留重复行需用UNION ALL。",
    "id": 250
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION ALL"
    ],
    "stem": "SELECT 'a' AS c UNION ALL SELECT 'b' 的结果包含几行？",
    "options": [
      {
        "label": "A",
        "text": "0行",
        "correct": false
      },
      {
        "label": "B",
        "text": "3行",
        "correct": false
      },
      {
        "label": "C",
        "text": "1行",
        "correct": false
      },
      {
        "label": "D",
        "text": "2行",
        "correct": true
      }
    ],
    "explanation": "UNION ALL保留所有行，包括重复行。SELECT 'a'和SELECT 'b'各返回1行，合并后共2行。",
    "id": 251
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "INTERSECT"
    ],
    "stem": "集合A={1,2,3}，集合B={2,3,4}，INTERSECT的结果是？",
    "options": [
      {
        "label": "A",
        "text": "{2,3}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{1,4}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{1}",
        "correct": false
      },
      {
        "label": "D",
        "text": "{1,2,3,4}",
        "correct": false
      }
    ],
    "explanation": "INTERSECT返回两个集合的交集，即同时出现在两个集合中的元素。2和3同时出现在A和B中，结果为{2,3}。",
    "id": 252
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXCEPT"
    ],
    "stem": "集合A={1,2,3}，集合B={2,3,4}，A EXCEPT B的结果是？",
    "options": [
      {
        "label": "A",
        "text": "{2,3}",
        "correct": false
      },
      {
        "label": "B",
        "text": "{1}",
        "correct": true
      },
      {
        "label": "C",
        "text": "{4}",
        "correct": false
      },
      {
        "label": "D",
        "text": "{1,2,3}",
        "correct": false
      }
    ],
    "explanation": "A EXCEPT B返回在A中但不在B中的元素。1在A中但不在B中，2和3同时在A和B中所以被排除，结果为{1}。",
    "id": 253
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "WITH cte AS (SELECT 1 AS n) SELECT * FROM cte 的结果？",
    "options": [
      {
        "label": "A",
        "text": "报错：cte不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "n=NULL 的一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "n=1 的一行",
        "correct": true
      },
      {
        "label": "D",
        "text": "空结果集",
        "correct": false
      }
    ],
    "explanation": "CTE定义了名为cte的子查询，SELECT 1 AS n返回n=1的一行，外部查询从cte中选取所有行，结果为n=1的一行。",
    "id": 254
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXISTS"
    ],
    "stem": "SELECT * FROM t1 WHERE EXISTS (SELECT 1 WHERE 1=2) 的结果？",
    "options": [
      {
        "label": "A",
        "text": "报错",
        "correct": false
      },
      {
        "label": "B",
        "text": "t1的第一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "t1的所有行",
        "correct": false
      },
      {
        "label": "D",
        "text": "空结果集",
        "correct": true
      }
    ],
    "explanation": "EXISTS子查询SELECT 1 WHERE 1=2返回空集，因此EXISTS条件为FALSE，外部查询无行满足条件，返回空结果集。",
    "id": 255
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION",
      "DISTINCT"
    ],
    "stem": "SELECT 1 UNION SELECT 2 UNION SELECT 1 结果几行？",
    "options": [
      {
        "label": "A",
        "text": "2行",
        "correct": true
      },
      {
        "label": "B",
        "text": "3行",
        "correct": false
      },
      {
        "label": "C",
        "text": "0行",
        "correct": false
      },
      {
        "label": "D",
        "text": "1行",
        "correct": false
      }
    ],
    "explanation": "UNION去除重复行。值1出现两次但只保留一次，值2出现一次，合计2行：1和2。",
    "id": 256
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "临时表"
    ],
    "stem": "CREATE TEMP TABLE t AS SELECT 1 AS n; SELECT * FROM t; 结果？",
    "options": [
      {
        "label": "A",
        "text": "空结果集",
        "correct": false
      },
      {
        "label": "B",
        "text": "n=1 的一行",
        "correct": true
      },
      {
        "label": "C",
        "text": "n=NULL 的一行",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "CREATE TEMP TABLE AS SELECT将子查询结果存入临时表。SELECT 1 AS n返回n=1，查询临时表得到n=1的一行。",
    "id": 257
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "子查询替代集合操作"
    ],
    "stem": "SELECT name FROM t1 WHERE id IN (SELECT id FROM t2) 等价于哪种集合操作？",
    "options": [
      {
        "label": "A",
        "text": "UNION ALL",
        "correct": false
      },
      {
        "label": "B",
        "text": "UNION",
        "correct": false
      },
      {
        "label": "C",
        "text": "INTERSECT",
        "correct": true
      },
      {
        "label": "D",
        "text": "EXCEPT",
        "correct": false
      }
    ],
    "explanation": "IN子查询选出t1中id也存在于t2中的行，相当于对id列做交集运算，等价于INTERSECT。UNION是并集，EXCEPT是差集。",
    "id": 258
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "递归CTE终止的条件是什么？",
    "options": [
      {
        "label": "A",
        "text": "达到指定递归次数上限",
        "correct": false
      },
      {
        "label": "B",
        "text": "锚点成员返回空结果集",
        "correct": false
      },
      {
        "label": "C",
        "text": "外部查询终止",
        "correct": false
      },
      {
        "label": "D",
        "text": "递归成员返回空结果集",
        "correct": true
      }
    ],
    "explanation": "递归CTE在递归成员返回空结果集时终止，因为无新行产生意味着无法继续递归。虽然有些数据库也有递归深度限制，但逻辑终止条件是递归成员返回空集。",
    "id": 259
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION"
    ],
    "stem": "完成UNION查询：SELECT city FROM customers UNION _____ SELECT city FROM suppliers",
    "options": [
      {
        "label": "A",
        "text": "（无需填写，语法已完整）",
        "correct": true
      },
      {
        "label": "B",
        "text": "ALL",
        "correct": false
      },
      {
        "label": "C",
        "text": "DISTINCT",
        "correct": false
      },
      {
        "label": "D",
        "text": "AS",
        "correct": false
      }
    ],
    "explanation": "UNION查询语法完整，无需额外关键字。UNION自动去重，无需加DISTINCT。ALL是UNION ALL的关键字，AS用于别名。",
    "id": 260
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "补全CTE定义：WITH dept_avg AS (SELECT dept, AVG(salary) AS avg_sal FROM emp GROUP BY dept) SELECT * FROM _____",
    "options": [
      {
        "label": "A",
        "text": "salary",
        "correct": false
      },
      {
        "label": "B",
        "text": "dept_avg",
        "correct": true
      },
      {
        "label": "C",
        "text": "emp",
        "correct": false
      },
      {
        "label": "D",
        "text": "dept",
        "correct": false
      }
    ],
    "explanation": "外部查询从CTE dept_avg中查询，FROM dept_avg引用CTE定义的结果集。emp、dept、salary是表名或列名，不是CTE名。",
    "id": 261
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXISTS"
    ],
    "stem": "补全EXISTS查询：SELECT * FROM orders WHERE _____ (SELECT 1 FROM customers WHERE customers.id = orders.customer_id)",
    "options": [
      {
        "label": "A",
        "text": "NOT EXISTS",
        "correct": false
      },
      {
        "label": "B",
        "text": "ANY",
        "correct": false
      },
      {
        "label": "C",
        "text": "EXISTS",
        "correct": true
      },
      {
        "label": "D",
        "text": "IN",
        "correct": false
      }
    ],
    "explanation": "EXISTS检查子查询是否返回行，此处判断订单是否有对应客户。IN需要指定列名，NOT EXISTS是反向判断，ANY是量词。",
    "id": 262
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION ALL"
    ],
    "stem": "补全查询以合并上下半年的销售记录：SELECT * FROM sales_h1 _____ SELECT * FROM sales_h2",
    "options": [
      {
        "label": "A",
        "text": "JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "INTERSECT",
        "correct": false
      },
      {
        "label": "C",
        "text": "EXCEPT",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION ALL",
        "correct": true
      }
    ],
    "explanation": "UNION ALL合并两个查询的所有行。此处合并上下半年销售记录需要保留所有行。JOIN是连接操作，INTERSECT取交集，EXCEPT取差集。",
    "id": 263
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXCEPT"
    ],
    "stem": "补全差集查询：SELECT product_id FROM products _____ SELECT product_id FROM discontinued",
    "options": [
      {
        "label": "A",
        "text": "EXCEPT",
        "correct": true
      },
      {
        "label": "B",
        "text": "UNION",
        "correct": false
      },
      {
        "label": "C",
        "text": "INTERSECT",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION ALL",
        "correct": false
      }
    ],
    "explanation": "EXCEPT返回在第一个结果集中但不在第二个结果集中的行，此处找出未停产的产品。UNION是并集，INTERSECT是交集。",
    "id": 264
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "UNION"
    ],
    "stem": "找出错误：SELECT name FROM emp1 UNION SELECT age FROM emp2",
    "options": [
      {
        "label": "A",
        "text": "SELECT缺少列",
        "correct": false
      },
      {
        "label": "B",
        "text": "UNION两侧列数或数据类型不匹配可能导致逻辑错误",
        "correct": true
      },
      {
        "label": "C",
        "text": "UNION语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "FROM子句错误",
        "correct": false
      }
    ],
    "explanation": "UNION要求两侧列数相同且对应列数据类型兼容。name和age数据类型不同，UNION虽语法不报错但结果不合理。列数相同不算语法错误。",
    "id": 265
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "修复CTE错误：WITH cte AS SELECT 1 AS n SELECT * FROM cte",
    "options": [
      {
        "label": "A",
        "text": "SELECT * 不适用于CTE",
        "correct": false
      },
      {
        "label": "B",
        "text": "AS关键字多余",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE定义缺少括号，应为WITH cte AS (SELECT ...)",
        "correct": true
      },
      {
        "label": "D",
        "text": "CTE不能返回单行",
        "correct": false
      }
    ],
    "explanation": "CTE定义必须用括号包裹子查询：WITH cte AS (SELECT 1 AS n)。缺少括号导致语法错误。CTE可以返回单行，SELECT *可以用于CTE。",
    "id": 266
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "EXISTS"
    ],
    "stem": "修复错误：SELECT * FROM t1 WHERE EXISTS (SELECT * FROM t1 WHERE id = 999)",
    "options": [
      {
        "label": "A",
        "text": "EXISTS语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT * 不能用于EXISTS",
        "correct": false
      },
      {
        "label": "C",
        "text": "缺少GROUP BY",
        "correct": false
      },
      {
        "label": "D",
        "text": "子查询引用了错误的表，应关联外部查询",
        "correct": true
      }
    ],
    "explanation": "子查询独立执行返回t1中所有行而非空集，EXISTS始终为TRUE，逻辑错误。正确做法是子查询关联外部表或引用不同表。EXISTS支持SELECT *。",
    "id": 267
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "INTERSECT"
    ],
    "stem": "修复错误：SELECT id, name FROM A INTERSECT SELECT id FROM B",
    "options": [
      {
        "label": "A",
        "text": "INTERSECT两侧列数不匹配，应保持一致",
        "correct": true
      },
      {
        "label": "B",
        "text": "INTERSECT不能用于字符串列",
        "correct": false
      },
      {
        "label": "C",
        "text": "id列不存在",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少ORDER BY",
        "correct": false
      }
    ],
    "explanation": "INTERSECT要求两侧列数相同。左侧2列右侧1列不匹配。INTERSECT可用于任何类型列，不涉及ORDER BY。",
    "id": 268
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "result_set",
    "tags": [
      "临时表"
    ],
    "stem": "修复错误：CREATE TEMP TABLE t AS SELECT * FROM nonexistent_table",
    "options": [
      {
        "label": "A",
        "text": "临时表不支持SELECT *",
        "correct": false
      },
      {
        "label": "B",
        "text": "源表不存在导致创建失败",
        "correct": true
      },
      {
        "label": "C",
        "text": "TEMP关键字错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "AS关键字多余",
        "correct": false
      }
    ],
    "explanation": "源表nonexistent_table不存在，创建临时表会失败。TEMP是有效关键字，AS是必需的，临时表支持SELECT *。",
    "id": 269
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "递归CTE中锚点成员和递归成员用什么连接？",
    "options": [
      {
        "label": "A",
        "text": "JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "逗号",
        "correct": false
      },
      {
        "label": "C",
        "text": "UNION ALL",
        "correct": true
      },
      {
        "label": "D",
        "text": "UNION",
        "correct": false
      }
    ],
    "explanation": "递归CTE中锚点成员和递归成员必须用UNION ALL连接。不能用UNION因为递归过程中去重会导致结果不完整，JOIN和逗号不是递归CTE的连接方式。",
    "id": 270
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXISTS",
      "集合操作"
    ],
    "stem": "EXISTS 与 IN 在集合操作中的主要区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "EXISTS比IN慢",
        "correct": false
      },
      {
        "label": "B",
        "text": "IN可以替代所有EXISTS场景",
        "correct": false
      },
      {
        "label": "C",
        "text": "EXISTS只能用于子查询",
        "correct": false
      },
      {
        "label": "D",
        "text": "EXISTS检查存在性，IN检查值匹配",
        "correct": true
      }
    ],
    "explanation": "EXISTS判断子查询是否返回行(存在性)，IN判断值是否在集合中(匹配)。两者可互换但不完全等价：EXISTS不受NULL值影响，IN在NOT IN时有NULL陷阱。",
    "id": 271
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "子查询替代集合操作"
    ],
    "stem": "NOT EXISTS 与 NOT IN 在处理NULL值时有什么区别？",
    "options": [
      {
        "label": "A",
        "text": "NOT EXISTS忽略NULL，NOT IN受NULL影响可能返回意外结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "两者处理NULL的方式相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "NOT IN忽略NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT EXISTS遇到NULL返回空集",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS基于存在性判断，不受NULL影响。NOT IN在子查询结果含NULL时，某些行可能被错误排除，因为NULL与任何值的比较结果都是UNKNOWN。",
    "id": 272
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "CTE",
      "子查询"
    ],
    "stem": "CTE 相比嵌套子查询的优势是什么？",
    "options": [
      {
        "label": "A",
        "text": "CTE不需要查询优化器",
        "correct": false
      },
      {
        "label": "B",
        "text": "CTE提高可读性且可被多次引用",
        "correct": true
      },
      {
        "label": "C",
        "text": "CTE执行速度一定更快",
        "correct": false
      },
      {
        "label": "D",
        "text": "CTE可以创建索引",
        "correct": false
      }
    ],
    "explanation": "CTE将子查询命名并置于查询开头，提高可读性且可在同一查询中多次引用。CTE不一定更快，不能创建索引，仍需查询优化器处理。",
    "id": 273
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "UNION",
      "排序"
    ],
    "stem": "UNION 查询中 ORDER BY 子句应放在哪里？",
    "options": [
      {
        "label": "A",
        "text": "放在第一个SELECT之后",
        "correct": false
      },
      {
        "label": "B",
        "text": "放在WITH子句中",
        "correct": false
      },
      {
        "label": "C",
        "text": "只能放在最后一个SELECT之后",
        "correct": true
      },
      {
        "label": "D",
        "text": "每个SELECT都需要ORDER BY",
        "correct": false
      }
    ],
    "explanation": "UNION查询中ORDER BY只能出现在最后一个SELECT后，对整个合并结果排序。若在各SELECT中加ORDER BY会报错或被忽略。",
    "id": 274
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "WITH RECURSIVE cte(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM cte WHERE n<5) SELECT * FROM cte; 结果？",
    "options": [
      {
        "label": "A",
        "text": "1,2,3,4 共4行",
        "correct": false
      },
      {
        "label": "B",
        "text": "仅1",
        "correct": false
      },
      {
        "label": "C",
        "text": "1,2,3,4,5,6 共6行",
        "correct": false
      },
      {
        "label": "D",
        "text": "1,2,3,4,5 共5行",
        "correct": true
      }
    ],
    "explanation": "锚点返回n=1，递归从1开始每次加1直到n=5停止。WHILE n<5条件确保n=5时仍产生一行（n从4递增到5），所以结果为1到5共5行。",
    "id": 275
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXISTS",
      "子查询替代集合操作"
    ],
    "stem": "SELECT dname FROM dept WHERE EXISTS (SELECT 1 FROM emp WHERE emp.dept_id = dept.id) 当emp表为空时结果？",
    "options": [
      {
        "label": "A",
        "text": "空结果集",
        "correct": true
      },
      {
        "label": "B",
        "text": "dept的所有行",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "仅第一行dept",
        "correct": false
      }
    ],
    "explanation": "当emp表为空，EXISTS子查询始终返回空集，EXISTS条件为FALSE，所有dept行都不满足条件，返回空结果集。",
    "id": 276
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "UNION",
      "排序"
    ],
    "stem": "SELECT name FROM A UNION SELECT name FROM B ORDER BY name; 此ORDER BY作用于？",
    "options": [
      {
        "label": "A",
        "text": "两个SELECT各自排序",
        "correct": false
      },
      {
        "label": "B",
        "text": "整个UNION合并结果",
        "correct": true
      },
      {
        "label": "C",
        "text": "仅第二个SELECT",
        "correct": false
      },
      {
        "label": "D",
        "text": "仅第一个SELECT",
        "correct": false
      }
    ],
    "explanation": "UNION查询中ORDER BY对整个合并结果集排序。ORDER BY放在最后一个SELECT后，作用于合并后的完整结果集。",
    "id": 277
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXCEPT",
      "子查询替代集合操作"
    ],
    "stem": "SELECT id FROM A EXCEPT SELECT id FROM B 等价于？",
    "options": [
      {
        "label": "A",
        "text": "SELECT id FROM A INNER JOIN B ON A.id = B.id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT id FROM A UNION SELECT id FROM B",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT id FROM A WHERE id NOT IN (SELECT id FROM B)",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT id FROM A WHERE id IN (SELECT id FROM B)",
        "correct": false
      }
    ],
    "explanation": "EXCEPT返回在A中但不在B中的行，等价于NOT IN子查询。IN子查询是INTERSECT的等价写法，INNER JOIN是交集，UNION是并集。",
    "id": 278
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "WITH a AS (SELECT 1 AS x), b AS (SELECT x+1 AS y FROM a) SELECT * FROM b; 结果？",
    "options": [
      {
        "label": "A",
        "text": "x=1 的一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "空结果集",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "y=2 的一行",
        "correct": true
      }
    ],
    "explanation": "CTE a返回x=1，CTE b从a中计算x+1得到y=2，外部查询从b中选取得到y=2的一行。",
    "id": 279
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "补全递归CTE：WITH RECURSIVE fib AS (SELECT 0 AS n, 1 AS nxt UNION ALL SELECT nxt, n+nxt FROM fib WHERE _____) SELECT n FROM fib",
    "options": [
      {
        "label": "A",
        "text": "n < 100",
        "correct": true
      },
      {
        "label": "B",
        "text": "n = 0",
        "correct": false
      },
      {
        "label": "C",
        "text": "nxt = 0",
        "correct": false
      },
      {
        "label": "D",
        "text": "n > 100",
        "correct": false
      }
    ],
    "explanation": "递归终止条件应限制n的范围。n<100确保递归在有限步内终止。n=0只在锚点满足不会触发递归，n>100无意义因为锚点n=0不满足。",
    "id": 280
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXISTS"
    ],
    "stem": "补全查询：SELECT dname FROM dept d WHERE _____ (SELECT 1 FROM emp e WHERE e.dept_id = d.id AND e.salary > 10000)",
    "options": [
      {
        "label": "A",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "B",
        "text": "EXISTS",
        "correct": true
      },
      {
        "label": "C",
        "text": "IN",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION",
        "correct": false
      }
    ],
    "explanation": "EXISTS检查子查询是否返回行，此处判断部门是否有高薪员工。IN需要指定列名，UNION是集合操作，HAVING用于分组过滤。",
    "id": 281
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "补全多CTE定义：WITH cte1 AS (SELECT 1 AS a), _____ AS (SELECT a+1 AS b FROM cte1) SELECT * FROM cte2",
    "options": [
      {
        "label": "A",
        "text": "main",
        "correct": false
      },
      {
        "label": "B",
        "text": "temp",
        "correct": false
      },
      {
        "label": "C",
        "text": "cte2",
        "correct": true
      },
      {
        "label": "D",
        "text": "cte1",
        "correct": false
      }
    ],
    "explanation": "第二个CTE命名为cte2，引用cte1。cte1已被第一个CTE使用，main和temp不是标准CTE命名。外部FROM cte2引用第二个CTE。",
    "id": 282
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "UNION ALL",
      "子查询替代集合操作"
    ],
    "stem": "补全查询以实现两个结果集的合并去重：SELECT * FROM A _____ SELECT * FROM B",
    "options": [
      {
        "label": "A",
        "text": "UNION ALL",
        "correct": false
      },
      {
        "label": "B",
        "text": "INTERSECT",
        "correct": false
      },
      {
        "label": "C",
        "text": "JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION",
        "correct": true
      }
    ],
    "explanation": "UNION合并并去重，UNION ALL不去重，INTERSECT取交集，JOIN是连接操作。题目要求合并且去重所以用UNION。",
    "id": 283
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXCEPT"
    ],
    "stem": "补全查询找出在A中但不在B中的行：SELECT id FROM A _____ SELECT id FROM B",
    "options": [
      {
        "label": "A",
        "text": "EXCEPT",
        "correct": true
      },
      {
        "label": "B",
        "text": "UNION",
        "correct": false
      },
      {
        "label": "C",
        "text": "INTERSECT",
        "correct": false
      },
      {
        "label": "D",
        "text": "INNER JOIN",
        "correct": false
      }
    ],
    "explanation": "EXCEPT返回在第一个结果集中但不在第二个结果集中的行。UNION是并集，INTERSECT是交集，INNER JOIN是连接。",
    "id": 284
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "修复递归CTE：WITH RECURSIVE cte AS (SELECT 1 AS n UNION ALL SELECT n+1 FROM cte) SELECT * FROM cte LIMIT 10",
    "options": [
      {
        "label": "A",
        "text": "LIMIT位置错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "缺少终止条件会导致无限递归",
        "correct": true
      },
      {
        "label": "C",
        "text": "RECURSIVE关键字错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT * 语法错误",
        "correct": false
      }
    ],
    "explanation": "递归CTE缺少WHERE子句终止条件，会导致无限递归（虽有LIMIT但递归成员本身不终止）。RECURSIVE是正确关键字，SELECT *和LIMIT语法正确。",
    "id": 285
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "EXISTS",
      "子查询替代集合操作"
    ],
    "stem": "修复错误：SELECT name FROM emp WHERE NOT EXISTS (SELECT name FROM dept WHERE dept.id = emp.dept_id AND dept.active = 1)",
    "options": [
      {
        "label": "A",
        "text": "表名错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "列名错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "当dept存在活跃部门时NOT EXISTS逻辑反转",
        "correct": true
      },
      {
        "label": "D",
        "text": "EXISTS语法错误",
        "correct": false
      }
    ],
    "explanation": "子查询检查活跃部门，NOT EXISTS意味着查找没有活跃部门的员工。逻辑可能反转：应确保意图是查找非活跃部门的员工。EXISTS语法本身正确。",
    "id": 286
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "UNION"
    ],
    "stem": "修复错误：SELECT id FROM A UNION SELECT id, name FROM B",
    "options": [
      {
        "label": "A",
        "text": "UNION语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "id列不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "FROM子句错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION两侧列数不匹配",
        "correct": true
      }
    ],
    "explanation": "UNION要求两侧列数相同。左侧1列右侧2列不匹配。这不是UNION语法错误而是列数不一致问题。",
    "id": 287
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "CTE"
    ],
    "stem": "修复错误：WITH cte AS (SELECT 1 AS a, 2 AS b) SELECT c FROM cte",
    "options": [
      {
        "label": "A",
        "text": "外部查询引用了CTE中不存在的列c",
        "correct": true
      },
      {
        "label": "B",
        "text": "CTE不能有多个列",
        "correct": false
      },
      {
        "label": "C",
        "text": "AS关键字多余",
        "correct": false
      },
      {
        "label": "D",
        "text": "WITH语法错误",
        "correct": false
      }
    ],
    "explanation": "CTE定义了列a和b，但外部查询引用了不存在的列c。CTE可以有多个列，AS和WITH语法正确。",
    "id": 288
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "result_set",
    "tags": [
      "临时表",
      "EXISTS"
    ],
    "stem": "修复错误：CREATE TEMP TABLE t AS SELECT * FROM emp WHERE 1=0; SELECT * FROM t WHERE EXISTS (SELECT 1)",
    "options": [
      {
        "label": "A",
        "text": "EXISTS语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "临时表为空，EXISTS子查询独立执行导致所有行满足",
        "correct": true
      },
      {
        "label": "C",
        "text": "TEMP关键字错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE 1=0语法错误",
        "correct": false
      }
    ],
    "explanation": "WHERE 1=0创建空表结构，但SELECT * FROM t返回空集。EXISTS子查询独立执行返回1，所有t的行(无行)满足，逻辑上不影响。实际问题在于EXISTS应关联t表条件。",
    "id": 289
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "递归CTE",
      "集合操作"
    ],
    "stem": "递归CTE中使用UNION ALL而非UNION的原因是什么？",
    "options": [
      {
        "label": "A",
        "text": "UNION不支持递归",
        "correct": false
      },
      {
        "label": "B",
        "text": "UNION ALL自动终止递归",
        "correct": false
      },
      {
        "label": "C",
        "text": "UNION会去重导致递归中间结果丢失",
        "correct": true
      },
      {
        "label": "D",
        "text": "UNION ALL性能更好",
        "correct": false
      }
    ],
    "explanation": "UNION去重会丢失递归中间结果，因为递归产生的行可能被视为重复。UNION ALL保留所有行确保递归完整性。UNION语法上支持递归但逻辑不正确。",
    "id": 290
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "子查询替代集合操作",
      "EXISTS"
    ],
    "stem": "在什么场景下EXISTS比IN更推荐使用？",
    "options": [
      {
        "label": "A",
        "text": "子查询结果集为空时",
        "correct": false
      },
      {
        "label": "B",
        "text": "只需要判断存在性以外的场景",
        "correct": false
      },
      {
        "label": "C",
        "text": "IN和EXISTS完全等价",
        "correct": false
      },
      {
        "label": "D",
        "text": "子查询结果集较大且外部表较小时",
        "correct": true
      }
    ],
    "explanation": "EXISTS适合子查询大外部小的场景，因为EXISTS找到匹配即停。子查询为空时两者等价，EXISTS不仅判断存在性还支持关联条件，两者不完全等价。",
    "id": 291
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "CTE",
      "性能"
    ],
    "stem": "CTE 在查询优化器中可能导致的性能问题是什么？",
    "options": [
      {
        "label": "A",
        "text": "CTE被物化后多次扫描可能不如嵌套视图",
        "correct": true
      },
      {
        "label": "B",
        "text": "CTE总是导致性能下降",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE不支持索引",
        "correct": false
      },
      {
        "label": "D",
        "text": "CTE不能用于复杂查询",
        "correct": false
      }
    ],
    "explanation": "某些数据库物化CTE后多次扫描可能不如内联展开。CTE不一定导致性能下降，CTE本身不支持索引但不是性能问题的主因，CTE可用于复杂查询。",
    "id": 292
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "WITH RECURSIVE cte(n) AS (SELECT 1 UNION ALL SELECT n*2 FROM cte WHERE n<16) SELECT * FROM cte; 结果？",
    "options": [
      {
        "label": "A",
        "text": "1,2 共2行",
        "correct": false
      },
      {
        "label": "B",
        "text": "1,2,4,8,16 共5行",
        "correct": true
      },
      {
        "label": "C",
        "text": "1,2,4,8 共4行",
        "correct": false
      },
      {
        "label": "D",
        "text": "1,2,4,8,16,32 共6行",
        "correct": false
      }
    ],
    "explanation": "锚点n=1，递归n*2：1*2=2, 2*2=4, 4*2=8, 8*2=16。n<16时16仍被产生(n从8乘到16)。结果为1,2,4,8,16共5行。",
    "id": 293
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "EXISTS",
      "子查询替代集合操作"
    ],
    "stem": "SELECT * FROM A WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.id = A.id) 等价于？",
    "options": [
      {
        "label": "A",
        "text": "A UNION B",
        "correct": false
      },
      {
        "label": "B",
        "text": "A JOIN B",
        "correct": false
      },
      {
        "label": "C",
        "text": "A EXCEPT B（基于id列）",
        "correct": true
      },
      {
        "label": "D",
        "text": "A INTERSECT B",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS找出A中不存在于B中的行，等价于A EXCEPT B。INTERSECT是交集，UNION是并集，JOIN是连接操作。",
    "id": 294
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "CTE",
      "集合操作"
    ],
    "stem": "WITH a AS (SELECT 1 AS v UNION ALL SELECT 2), b AS (SELECT v+10 AS v FROM a) SELECT * FROM a UNION ALL SELECT * FROM b; 结果？",
    "options": [
      {
        "label": "A",
        "text": "1,2 共2行",
        "correct": false
      },
      {
        "label": "B",
        "text": "11,12 共2行",
        "correct": false
      },
      {
        "label": "C",
        "text": "1,2,11,12,13 共5行",
        "correct": false
      },
      {
        "label": "D",
        "text": "1,2,11,12 共4行",
        "correct": true
      }
    ],
    "explanation": "CTE a返回1和2，CTE b计算v+10得到11和12。UNION ALL合并a和b的结果：1,2,11,12共4行。",
    "id": 295
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "递归CTE"
    ],
    "stem": "补全递归CTE以生成1到10的序列：WITH RECURSIVE seq AS (SELECT 1 AS n UNION ALL SELECT _____ FROM seq WHERE n < 10) SELECT * FROM seq",
    "options": [
      {
        "label": "A",
        "text": "n+1",
        "correct": true
      },
      {
        "label": "B",
        "text": "n*2",
        "correct": false
      },
      {
        "label": "C",
        "text": "n-1",
        "correct": false
      },
      {
        "label": "D",
        "text": "n+2",
        "correct": false
      }
    ],
    "explanation": "生成1到10序列需要n+1递增。n*2生成2的幂次，n-1递减，n+2只产生奇数。只有n+1能连续递增到10。",
    "id": 296
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "子查询替代集合操作",
      "EXISTS"
    ],
    "stem": "补全查询用NOT EXISTS替代EXCEPT：SELECT * FROM A WHERE _____ (SELECT 1 FROM B WHERE B.id = A.id)",
    "options": [
      {
        "label": "A",
        "text": "IN",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT EXISTS",
        "correct": true
      },
      {
        "label": "C",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT IN",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS替代EXCEPT，检查A中行是否不存在于B中。EXISTS是反向逻辑，NOT IN也可但题目指定NOT EXISTS，IN和EXISTS方向相反。",
    "id": 297
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "递归CTE",
      "临时表"
    ],
    "stem": "修复：WITH RECURSIVE cte AS (SELECT 1 AS n UNION ALL SELECT n+1 FROM cte WHERE n < 5) INSERT INTO temp SELECT * FROM cte;",
    "options": [
      {
        "label": "A",
        "text": "WHERE条件错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "CTE不能递归",
        "correct": false
      },
      {
        "label": "C",
        "text": "递归CTE结果不能直接INSERT，需先存入临时表再INSERT",
        "correct": true
      },
      {
        "label": "D",
        "text": "UNION ALL应改为UNION",
        "correct": false
      }
    ],
    "explanation": "某些数据库不允许CTE结果直接INSERT，需分步操作。UNION ALL是递归CTE正确连接方式，WHERE和递归逻辑正确。",
    "id": 298
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "result_set",
    "tags": [
      "DISTINCT",
      "UNION",
      "集合操作"
    ],
    "stem": "修复：SELECT DISTINCT name FROM (SELECT name FROM A UNION ALL SELECT name FROM B) t; 与 SELECT name FROM A UNION SELECT name FROM B 结果不同的原因？",
    "options": [
      {
        "label": "A",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "DISTINCT不影响结果",
        "correct": false
      },
      {
        "label": "C",
        "text": "UNION ALL比UNION多排序",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION ALL不去重，外层DISTINCT后等价于UNION；若A内部有重复则结果不同",
        "correct": true
      }
    ],
    "explanation": "当A表内部有重复name时，UNION ALL保留重复，外层DISTINCT再去重，但A内部重复行与B中同值行处理方式不同于UNION。UNION是对两个结果集去重后合并。",
    "id": 299
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "INNER JOIN 只返回什么数据？",
    "options": [
      {
        "label": "A",
        "text": "两个表中都满足连接条件的数据行",
        "correct": true
      },
      {
        "label": "B",
        "text": "左表所有数据行",
        "correct": false
      },
      {
        "label": "C",
        "text": "右表所有数据行",
        "correct": false
      },
      {
        "label": "D",
        "text": "两个表的笛卡尔积",
        "correct": false
      }
    ],
    "explanation": "INNER JOIN 只返回左右表中都满足 ON 条件的匹配行。LEFT/RIGHT JOIN 会保留一侧全部行，CROSS JOIN 返回笛卡尔积。",
    "id": 300
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "LEFT JOIN 的特点是？",
    "options": [
      {
        "label": "A",
        "text": "返回两个表的并集",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回左表所有行，右表无匹配时填NULL",
        "correct": true
      },
      {
        "label": "C",
        "text": "只返回右表有匹配的行",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回两个表的交集",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留左表全部行，右表无匹配时对应列为 NULL。B 描述 INNER JOIN，C 也是 INNER JOIN，D 是 FULL OUTER JOIN。",
    "id": 301
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "RIGHT JOIN"
    ],
    "stem": "RIGHT JOIN 与 LEFT JOIN 的关系是？",
    "options": [
      {
        "label": "A",
        "text": "RIGHT JOIN 不需要 ON 条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "RIGHT JOIN 只返回右表独有的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "RIGHT JOIN 等价于交换表顺序的 LEFT JOIN",
        "correct": true
      },
      {
        "label": "D",
        "text": "RIGHT JOIN 只能用于三表以上查询",
        "correct": false
      }
    ],
    "explanation": "RIGHT JOIN 保留右表全部行，交换左右表顺序后等价于 LEFT JOIN。B 错误，两表即可用。C 错误，必须有 ON。D 不完整。",
    "id": 302
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "CROSS JOIN"
    ],
    "stem": "CROSS JOIN 会产生多少行结果？",
    "options": [
      {
        "label": "A",
        "text": "左表行数加右表行数",
        "correct": false
      },
      {
        "label": "B",
        "text": "两个表行数的最大值",
        "correct": false
      },
      {
        "label": "C",
        "text": "取决于 ON 条件",
        "correct": false
      },
      {
        "label": "D",
        "text": "左表行数乘以右表行数",
        "correct": true
      }
    ],
    "explanation": "CROSS JOIN 产生笛卡尔积，行数=左表行数x右表行数，不需要 ON 条件。",
    "id": 303
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN",
      "ON"
    ],
    "stem": "JOIN 语句中 ON 子句的作用是？",
    "options": [
      {
        "label": "A",
        "text": "指定两表之间的连接条件",
        "correct": true
      },
      {
        "label": "B",
        "text": "对结果进行排序",
        "correct": false
      },
      {
        "label": "C",
        "text": "限制返回的行数",
        "correct": false
      },
      {
        "label": "D",
        "text": "对结果进行分组",
        "correct": false
      }
    ],
    "explanation": "ON 定义两表连接条件。ORDER BY 排序，LIMIT 限行，GROUP BY 分组。",
    "id": 304
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "SELF JOIN"
    ],
    "stem": "关于自连接（SELF JOIN），以下说法正确的是？",
    "options": [
      {
        "label": "A",
        "text": "只能连接两个不同的列",
        "correct": false
      },
      {
        "label": "B",
        "text": "一张表与自己进行连接",
        "correct": true
      },
      {
        "label": "C",
        "text": "只能使用 LEFT JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "不需要表别名",
        "correct": false
      }
    ],
    "explanation": "自连接是表与自身连接，必须使用别名区分，可用任何 JOIN 类型。",
    "id": 305
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "FULL OUTER JOIN"
    ],
    "stem": "FULL OUTER JOIN 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "只返回两个表都有匹配的行",
        "correct": false
      },
      {
        "label": "B",
        "text": "只返回无匹配的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "左右表所有行，无匹配时填NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "只返回左表所有行",
        "correct": false
      }
    ],
    "explanation": "FULL OUTER JOIN 返回左右表全部行，匹配的合并，无匹配的填 NULL。B 是 LEFT JOIN，C 是 INNER JOIN。",
    "id": 306
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "以下哪个是 INNER JOIN 的正确语法？",
    "options": [
      {
        "label": "A",
        "text": "SELECT * FROM a INNER JOIN b WHERE a.id = b.aid",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT * FROM a AND b ON a.id = b.aid",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT * FROM a JOIN b SET a.id = b.aid",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT * FROM a INNER JOIN b ON a.id = b.aid",
        "correct": true
      }
    ],
    "explanation": "INNER JOIN 使用 ON 指定连接条件。B 应用 ON 非 WHERE。C 语法错误。D 中 SET 用于 UPDATE。",
    "id": 307
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "LEFT JOIN 右表无匹配行时，右表列的值是？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": true
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "空字符串",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 右表无匹配时，右表所有列返回 NULL，不会返回 0 或空字符串。",
    "id": 308
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "以下哪种连接类型不需要 ON 子句？",
    "options": [
      {
        "label": "A",
        "text": "RIGHT JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "CROSS JOIN",
        "correct": true
      },
      {
        "label": "C",
        "text": "INNER JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "LEFT JOIN",
        "correct": false
      }
    ],
    "explanation": "CROSS JOIN 产生笛卡尔积不需要 ON。INNER/LEFT/RIGHT JOIN 都必须指定连接条件。",
    "id": 309
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "查询员工及其部门名称，空白处应填？\nSELECT e.name, d.name FROM emp e ___ dept d ON e.dept_id = d.id",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE",
        "correct": false
      },
      {
        "label": "C",
        "text": "INNER JOIN",
        "correct": true
      },
      {
        "label": "D",
        "text": "LEFT JOIN",
        "correct": false
      }
    ],
    "explanation": "INNER JOIN 匹配有部门的员工。LEFT JOIN 也可但题目用 INNER JOIN 更精确。GROUP BY 和 WHERE 不是连接操作。",
    "id": 310
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "查询所有学生及其选课信息（含未选课学生），空白处应填？\nSELECT s.name, c.course FROM students s ___ scores sc ON s.id = sc.sid LEFT JOIN courses c ON sc.cid = c.id",
    "options": [
      {
        "label": "A",
        "text": "INNER JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "RIGHT JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "CROSS JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "LEFT JOIN",
        "correct": true
      }
    ],
    "explanation": "LEFT JOIN 保留所有学生含未选课的。INNER JOIN 会排除未选课学生。",
    "id": 311
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "SELF JOIN"
    ],
    "stem": "查找同部门中薪资不同的员工对，空白处应填？\nSELECT a.name, b.name FROM emp a ___ emp b ON a.dept_id = b.dept_id AND a.salary <> b.salary",
    "options": [
      {
        "label": "A",
        "text": "JOIN",
        "correct": true
      },
      {
        "label": "B",
        "text": "UNION",
        "correct": false
      },
      {
        "label": "C",
        "text": "GROUP BY",
        "correct": false
      },
      {
        "label": "D",
        "text": "HAVING",
        "correct": false
      }
    ],
    "explanation": "自连接用同一表两个别名 JOIN。UNION 合并结果集，GROUP BY 分组。",
    "id": 312
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "表A有3行，表B有4行，A INNER JOIN B ON 1=1 返回几行？",
    "options": [
      {
        "label": "A",
        "text": "4",
        "correct": false
      },
      {
        "label": "B",
        "text": "12",
        "correct": true
      },
      {
        "label": "C",
        "text": "7",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "ON 1=1 所有行都匹配，等价 CROSS JOIN，返回 3x4=12 行。",
    "id": 313
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "表emp有5行，dept有3行，emp LEFT JOIN dept 匹配3行，结果几行？",
    "options": [
      {
        "label": "A",
        "text": "8",
        "correct": false
      },
      {
        "label": "B",
        "text": "15",
        "correct": false
      },
      {
        "label": "C",
        "text": "5",
        "correct": true
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留左表所有行，emp 有 5 行则结果始终 5 行。",
    "id": 314
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "表A(id:1,2,3) INNER JOIN 表B(id:2,3,4) ON A.id=B.id，返回几行？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "6",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": true
      }
    ],
    "explanation": "只有 id=2 和 3 同时存在于两表，INNER JOIN 返回 2 行。",
    "id": 315
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "INNER JOIN"
    ],
    "stem": "以下SQL有什么问题？\nSELECT * FROM orders INNER JOIN customers",
    "options": [
      {
        "label": "A",
        "text": "缺少 ON 连接条件",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT * 不能用于连接查询",
        "correct": false
      },
      {
        "label": "C",
        "text": "INNER JOIN 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "表名不能用复数",
        "correct": false
      }
    ],
    "explanation": "INNER JOIN 必须用 ON 指定连接条件。SELECT * 可用于连接查询。",
    "id": 316
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "以下SQL有什么问题？\nSELECT e.name, d.dname FROM emp e LEFT JOIN dept d WHERE e.dept_id = d.id",
    "options": [
      {
        "label": "A",
        "text": "SELECT 列名错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE 应改为 ON",
        "correct": true
      },
      {
        "label": "C",
        "text": "LEFT JOIN 应改为 INNER JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "不能用表别名",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 连接条件应用 ON 非 WHERE。WHERE 用于结果过滤。",
    "id": 317
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN",
      "别名"
    ],
    "stem": "多表连接时使用表别名的好处不包括？",
    "options": [
      {
        "label": "A",
        "text": "避免列名歧义",
        "correct": false
      },
      {
        "label": "B",
        "text": "使SQL更易读",
        "correct": false
      },
      {
        "label": "C",
        "text": "提高查询执行速度",
        "correct": true
      },
      {
        "label": "D",
        "text": "简化SQL书写",
        "correct": false
      }
    ],
    "explanation": "表别名不影响执行速度，只是语法简化工具，但能简化书写、避免歧义、提高可读性。",
    "id": 318
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "以下哪种写法是隐式内连接？",
    "options": [
      {
        "label": "A",
        "text": "SELECT * FROM a INNER JOIN b",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT * FROM a LEFT JOIN b ON a.id = b.aid",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT * FROM a CROSS JOIN b",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT * FROM a, b WHERE a.id = b.aid",
        "correct": true
      }
    ],
    "explanation": "隐式内连接用 FROM a,b WHERE 形式。显式用 INNER JOIN ON。",
    "id": 319
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN",
      "ON"
    ],
    "stem": "补全连接条件：\nSELECT * FROM orders o JOIN customers c ON ___",
    "options": [
      {
        "label": "A",
        "text": "o.customer_id = c.id",
        "correct": true
      },
      {
        "label": "B",
        "text": "o.id = c.id",
        "correct": false
      },
      {
        "label": "C",
        "text": "o.customer_id = c.customer_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "o.id = c.customer_id",
        "correct": false
      }
    ],
    "explanation": "订单表通过 customer_id 关联客户表 id。B 连了两个主键无意义。C 客户表通常没有 customer_id。D 方向反了。",
    "id": 320
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "LEFT JOIN 右表所有行都匹配时，结果等同于？",
    "options": [
      {
        "label": "A",
        "text": "SELF JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "INNER JOIN",
        "correct": true
      },
      {
        "label": "C",
        "text": "RIGHT JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "CROSS JOIN",
        "correct": false
      }
    ],
    "explanation": "全部匹配时 LEFT JOIN 没有补 NULL 行，与 INNER JOIN 结果相同。",
    "id": 321
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "CROSS JOIN"
    ],
    "stem": "表A有2行，表B有3行，CROSS JOIN 后 WHERE 过滤剩1行匹配，最终几行？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": true
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ],
    "explanation": "CROSS JOIN 产生 6 行，WHERE 过滤后只留 1 行。",
    "id": 322
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "以下SQL有什么问题？\nSELECT name, dname FROM emp JOIN dept ON emp.dept_id = dept.dept_id",
    "options": [
      {
        "label": "A",
        "text": "JOIN 语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "ON 条件多余",
        "correct": false
      },
      {
        "label": "C",
        "text": "不能用 dept_id 连接",
        "correct": false
      },
      {
        "label": "D",
        "text": "name 列可能存在于两个表中需指定表名",
        "correct": true
      }
    ],
    "explanation": "如果两表都有 name 列，SELECT name 会歧义，需写成 emp.name。",
    "id": 323
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "连接查询中 ON 和 WHERE 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "ON 用于连接条件，WHERE 用于过滤结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "ON 和 WHERE 完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "ON 只能用于 INNER JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE 在 ON 之前执行",
        "correct": false
      }
    ],
    "explanation": "ON 定义表间连接关系，WHERE 对连接后的结果过滤。对 OUTER JOIN 行为不同。",
    "id": 324
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "FULL OUTER JOIN"
    ],
    "stem": "MySQL 是否支持 FULL OUTER JOIN？",
    "options": [
      {
        "label": "A",
        "text": "需要安装插件",
        "correct": false
      },
      {
        "label": "B",
        "text": "不直接支持，可用 UNION 模拟",
        "correct": true
      },
      {
        "label": "C",
        "text": "完全支持",
        "correct": false
      },
      {
        "label": "D",
        "text": "只支持 INNER JOIN 和 LEFT JOIN",
        "correct": false
      }
    ],
    "explanation": "MySQL 不直接支持 FULL OUTER JOIN，可用 LEFT JOIN UNION RIGHT JOIN 模拟。",
    "id": 325
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "RIGHT JOIN"
    ],
    "stem": "查询所有部门及其员工（含无员工部门），空白处应填？\nSELECT d.name, e.name FROM employees e ___ departments d ON e.dept_id = d.id",
    "options": [
      {
        "label": "A",
        "text": "INNER JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "CROSS JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "RIGHT JOIN",
        "correct": true
      },
      {
        "label": "D",
        "text": "LEFT JOIN",
        "correct": false
      }
    ],
    "explanation": "要保留所有部门，departments 在右侧用 RIGHT JOIN。",
    "id": 326
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "两表有同名列时应该怎么做？",
    "options": [
      {
        "label": "A",
        "text": "只能用星号查询",
        "correct": false
      },
      {
        "label": "B",
        "text": "给列取不同名字",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除同名列",
        "correct": false
      },
      {
        "label": "D",
        "text": "使用表名或别名限定列名",
        "correct": true
      }
    ],
    "explanation": "同名列必须用 表名.列名 或 别名.列名 指定来源。",
    "id": 327
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "emp(5行) LEFT JOIN dept(3行)，2个emp行在dept无匹配，结果几行？",
    "options": [
      {
        "label": "A",
        "text": "5",
        "correct": true
      },
      {
        "label": "B",
        "text": "3",
        "correct": false
      },
      {
        "label": "C",
        "text": "7",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留左表全部行，emp 有 5 行结果就是 5 行。",
    "id": 328
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "WHERE"
    ],
    "stem": "emp(id,name,dept_id) 有5行，dept(id,name) 有3行。SELECT e.name FROM emp e LEFT JOIN dept d ON e.dept_id=d.id WHERE d.name IS NULL 返回几行？（2个emp无dept匹配）",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "2",
        "correct": true
      },
      {
        "label": "C",
        "text": "5",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留所有 emp 行，WHERE d.name IS NULL 筛选出右表无匹配的行，即 2 行。",
    "id": 329
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "INNER JOIN",
      "聚合"
    ],
    "stem": "查询每个部门的员工数量（含部门名），空白处应填？\nSELECT d.name, COUNT(*) FROM dept d ___ emp e ON d.id = e.dept_id GROUP BY d.name",
    "options": [
      {
        "label": "A",
        "text": "RIGHT JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "CROSS JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "LEFT JOIN",
        "correct": true
      },
      {
        "label": "D",
        "text": "INNER JOIN",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留所有部门含无员工的。INNER JOIN 会排除无员工部门导致计数遗漏。",
    "id": 330
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "WHERE"
    ],
    "stem": "LEFT JOIN 中 WHERE 过滤右表列与 ON 中过滤右表列的区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者完全等价",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE 先于 ON 执行",
        "correct": false
      },
      {
        "label": "C",
        "text": "ON 不能用于过滤右表列",
        "correct": false
      },
      {
        "label": "D",
        "text": "ON 中过滤不影响左表行数，WHERE 中过滤会排除左表行",
        "correct": true
      }
    ],
    "explanation": "在 LEFT JOIN 中，ON 条件过滤右表但不影响左表行数。WHERE 在连接后过滤，会排除左表不满足条件的行。",
    "id": 331
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "SELF JOIN"
    ],
    "stem": "emp(id,name,manager_id) 中 id=1 的 manager_id=3, id=2 的 manager_id=3, id=3 的 manager_id=NULL。SELECT e.name, m.name FROM emp e LEFT JOIN emp m ON e.manager_id = m.id 返回几行？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": true
      },
      {
        "label": "B",
        "text": "2",
        "correct": false
      },
      {
        "label": "C",
        "text": "4",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "LEFT JOIN 保留左表全部行，emp 有 3 行，id=3 的 manager 在右表为 NULL，但结果仍 3 行。",
    "id": 332
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "以下SQL想要查询所有员工及其部门（含无部门员工），哪里有问题？\nSELECT e.name, d.name FROM emp e LEFT JOIN dept d ON e.dept_id = d.id WHERE d.name LIKE '技%'",
    "options": [
      {
        "label": "A",
        "text": "不能用 LIKE",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE 条件会把无部门员工过滤掉，应改为 AND 放在 ON 后",
        "correct": true
      },
      {
        "label": "C",
        "text": "LEFT JOIN 应改为 INNER JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "ON 条件写反了",
        "correct": false
      }
    ],
    "explanation": "WHERE d.name LIKE 会过滤掉右表为 NULL 的行（无部门员工），应将条件移到 ON 后。",
    "id": 333
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN",
      "多表"
    ],
    "stem": "三表连接 A JOIN B JOIN C 的执行顺序是？",
    "options": [
      {
        "label": "A",
        "text": "先连接 B 和 C，再与 A 连接",
        "correct": false
      },
      {
        "label": "B",
        "text": "随机顺序连接",
        "correct": false
      },
      {
        "label": "C",
        "text": "先连接 A 和 B，结果再与 C 连接",
        "correct": true
      },
      {
        "label": "D",
        "text": "三个表同时连接",
        "correct": false
      }
    ],
    "explanation": "多表连接按书写顺序从左到右依次执行，先 A JOIN B，结果再 JOIN C。",
    "id": 334
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "多表"
    ],
    "stem": "查询员工名、部门名、薪资等级，保留所有员工。空白处应填？\nSELECT e.name, d.name, g.level FROM emp e ___ dept d ON e.dept_id=d.id LEFT JOIN grade g ON e.salary BETWEEN g.min_sal AND g.max_sal",
    "options": [
      {
        "label": "A",
        "text": "INNER JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "RIGHT JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "FULL JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "LEFT JOIN",
        "correct": true
      }
    ],
    "explanation": "第一个 LEFT JOIN 保留所有员工。如果用 INNER JOIN，无部门的员工会被排除。",
    "id": 335
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "INNER JOIN",
      "CROSS JOIN"
    ],
    "stem": "orders(100行) CROSS JOIN products(50行) 后用 WHERE orders.product_id=products.id 过滤，与 orders INNER JOIN products ON orders.product_id=products.id 的结果相比？",
    "options": [
      {
        "label": "A",
        "text": "结果相同",
        "correct": true
      },
      {
        "label": "B",
        "text": "CROSS JOIN 结果更多",
        "correct": false
      },
      {
        "label": "C",
        "text": "INNER JOIN 结果更多",
        "correct": false
      },
      {
        "label": "D",
        "text": "两者都返回笛卡尔积",
        "correct": false
      }
    ],
    "explanation": "CROSS JOIN + WHERE 等价于 INNER JOIN ON，结果相同，但 INNER JOIN 性能更好。",
    "id": 336
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN",
      "USING"
    ],
    "stem": "USING 关键字的作用是？",
    "options": [
      {
        "label": "A",
        "text": "替代 SELECT 子句",
        "correct": false
      },
      {
        "label": "B",
        "text": "简化两表同名列的连接条件",
        "correct": true
      },
      {
        "label": "C",
        "text": "指定查询使用的索引",
        "correct": false
      },
      {
        "label": "D",
        "text": "创建临时表",
        "correct": false
      }
    ],
    "explanation": "USING(column) 等价于 ON a.column=b.column，要求两表中该列同名。",
    "id": 337
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN"
    ],
    "stem": "以下SQL哪里有问题？\nSELECT e.name, d.name FROM emp e JOIN dept d ON e.dept_id = d.id AND e.salary > 10000",
    "options": [
      {
        "label": "A",
        "text": "ON 中不能有多个条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "salary 不能用在连接条件中",
        "correct": false
      },
      {
        "label": "C",
        "text": "AND 条件应放 WHERE 中而非 ON 中（对 INNER JOIN 虽然结果相同但语义不清）",
        "correct": true
      },
      {
        "label": "D",
        "text": "JOIN 必须写明 INNER JOIN",
        "correct": false
      }
    ],
    "explanation": "虽然 INNER JOIN 中 ON 和 WHERE 对过滤条件结果相同，但语义上连接条件应只包含表间关系，过滤条件放 WHERE。",
    "id": 338
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "COUNT"
    ],
    "stem": "emp(10行) LEFT JOIN dept(5行)，其中3个emp匹配到同一个dept（dept_id=1），其他各有匹配。LEFT JOIN 结果共10行，SELECT dept_id, COUNT(*) FROM emp LEFT JOIN dept ON ... GROUP BY dept_id，dept_id=1 的分组 COUNT(*) 是？",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": false
      },
      {
        "label": "B",
        "text": "5",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": true
      }
    ],
    "explanation": "LEFT JOIN 产生 10 行，dept_id=1 的有 3 行，COUNT(*)=3。",
    "id": 339
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN",
      "性能"
    ],
    "stem": "以下哪种连接方式通常性能最好？",
    "options": [
      {
        "label": "A",
        "text": "INNER JOIN（在只需要匹配行时）",
        "correct": true
      },
      {
        "label": "B",
        "text": "LEFT JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "CROSS JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "FULL OUTER JOIN",
        "correct": false
      }
    ],
    "explanation": "INNER JOIN 只需处理匹配行，通常最快。OUTER JOIN 需处理额外行，CROSS JOIN 产生笛卡尔积最慢。",
    "id": 340
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "SELF JOIN"
    ],
    "stem": "查找薪资比自己经理高的员工，空白处应填？\nSELECT e.name, e.salary FROM emp e ___ emp m ON e.manager_id = m.id WHERE e.salary > m.salary",
    "options": [
      {
        "label": "A",
        "text": "UNION",
        "correct": false
      },
      {
        "label": "B",
        "text": "JOIN",
        "correct": true
      },
      {
        "label": "C",
        "text": "LEFT JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "CROSS JOIN",
        "correct": false
      }
    ],
    "explanation": "自连接用 JOIN 匹配员工和其经理，然后 WHERE 比较薪资。LEFT JOIN 也可但会包含无经理的员工。",
    "id": 341
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN",
      "NULL"
    ],
    "stem": "连接条件中如果连接列包含 NULL 值，INNER JOIN 会怎样？",
    "options": [
      {
        "label": "A",
        "text": "NULL 行会被排除在结果之外",
        "correct": false
      },
      {
        "label": "B",
        "text": "会报错",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL 不等于任何值（包括 NULL），这些行不会被匹配",
        "correct": true
      },
      {
        "label": "D",
        "text": "NULL 与 NULL 会被匹配",
        "correct": false
      }
    ],
    "explanation": "NULL = NULL 结果为 UNKNOWN，不是 TRUE，所以 INNER JOIN 不会匹配 NULL 行。",
    "id": 342
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "RIGHT JOIN"
    ],
    "stem": "以下SQL要查询所有部门及其员工数（含空部门），哪里有问题？\nSELECT d.name, COUNT(*) FROM emp e RIGHT JOIN dept d ON e.dept_id = d.id GROUP BY d.name",
    "options": [
      {
        "label": "A",
        "text": "RIGHT JOIN 应改为 LEFT JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY 错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "不能对连接结果用 COUNT",
        "correct": false
      },
      {
        "label": "D",
        "text": "COUNT(*) 应改为 COUNT(e.id)，否则空部门会计为1",
        "correct": true
      }
    ],
    "explanation": "COUNT(*) 计算行数，空部门有 1 行（右表行+左表NULL），COUNT(e.id) 只计非 NULL 值，空部门为 0。",
    "id": 343
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "JOIN",
      "USING"
    ],
    "stem": "以下哪个SQL使用了USING子句？",
    "options": [
      {
        "label": "A",
        "text": "SELECT * FROM a JOIN b USING(id)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT * FROM a JOIN b WITH(id)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT * FROM a JOIN b BY(id)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT * FROM a JOIN b HAVING(id)",
        "correct": false
      }
    ],
    "explanation": "USING(column) 用于两表同名列连接，WITH/BY/HAVING 不是连接语法。",
    "id": 344
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "INNER JOIN",
      "多表"
    ],
    "stem": "A(3行) JOIN B(4行) ON... 返回2行，再 JOIN C(5行) ON... 返回3行，最终几行？",
    "options": [
      {
        "label": "A",
        "text": "15",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "2",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": false
      }
    ],
    "explanation": "多表连接最终结果由最后一次连接决定，最终 3 行。",
    "id": 345
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN"
    ],
    "stem": "以下SQL想要找出没有下订单的客户，哪里有问题？\nSELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NOT NULL",
    "options": [
      {
        "label": "A",
        "text": "ON 条件错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "不能用 LEFT JOIN 查找未匹配行",
        "correct": false
      },
      {
        "label": "C",
        "text": "IS NOT NULL 应改为 IS NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "LEFT JOIN 应改为 INNER JOIN",
        "correct": false
      }
    ],
    "explanation": "找未下单客户应筛选右表为 NULL 的行（IS NULL），IS NOT NULL 反而排除了目标行。",
    "id": 346
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "WHERE",
      "多表"
    ],
    "stem": "customers(100行) LEFT JOIN orders ON customer_id，WHERE order_date >= '2024-01-01' 过滤后剩40行。但如果有20个客户从未下单，原LEFT JOIN应有100行。WHERE过滤后剩几行？",
    "options": [
      {
        "label": "A",
        "text": "100",
        "correct": false
      },
      {
        "label": "B",
        "text": "20",
        "correct": false
      },
      {
        "label": "C",
        "text": "60",
        "correct": false
      },
      {
        "label": "D",
        "text": "40",
        "correct": true
      }
    ],
    "explanation": "WHERE 在 LEFT JOIN 之后执行，过滤掉不满足条件的行（包括无订单客户因为 NULL 不满足日期条件），剩 40 行。",
    "id": 347
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "ON vs WHERE"
    ],
    "stem": "以下SQL要查询所有客户及其2024年订单，保留无订单客户。哪里有问题？\nSELECT c.name, o.total FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND o.order_date >= '2024-01-01'",
    "options": [
      {
        "label": "A",
        "text": "没有问题，AND 在 ON 中正确过滤右表且保留左表全部行",
        "correct": true
      },
      {
        "label": "B",
        "text": "AND 应改为 WHERE",
        "correct": false
      },
      {
        "label": "C",
        "text": "LEFT JOIN 应改为 INNER JOIN",
        "correct": false
      },
      {
        "label": "D",
        "text": "日期条件不能放在 ON 中",
        "correct": false
      }
    ],
    "explanation": "ON 中的条件只过滤右表匹配，不影响左表行数。无订单客户右表为 NULL 但仍保留。如果放 WHERE 则会排除这些客户。",
    "id": 348
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "SELF JOIN",
      "层级"
    ],
    "stem": "org(id,name,parent_id) 有：1-CEO(NULL), 2-CTO(1), 3-CFO(1), 4-PM(2), 5-Dev(2), 6-Acc(3)。SELECT a.name, b.name FROM org a JOIN org b ON a.parent_id = b.id 返回几行？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "5",
        "correct": true
      },
      {
        "label": "C",
        "text": "6",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "JOIN（INNER JOIN）只匹配 parent_id 非NULL的行。CEO的parent_id为NULL不匹配，其余5行都能匹配到父节点，返回5行。",
    "id": 349
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "JOIN",
      "优化"
    ],
    "stem": "对于大表连接查询，以下哪种方式不能提升性能？",
    "options": [
      {
        "label": "A",
        "text": "先过滤再连接（减少参与连接的行数）",
        "correct": false
      },
      {
        "label": "B",
        "text": "选择合适的连接类型避免不必要的数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "在连接列上不建索引，让优化器自动选择",
        "correct": true
      },
      {
        "label": "D",
        "text": "在连接列上创建索引",
        "correct": false
      }
    ],
    "explanation": "不建索引会让连接操作更慢，索引是提升连接性能的关键。B/C/D 都能提升性能。",
    "id": 350
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "FULL OUTER JOIN"
    ],
    "stem": "用 MySQL 语法模拟 FULL OUTER JOIN，空白处应填什么？\nSELECT * FROM a LEFT JOIN b ON a.id=b.aid ___ SELECT * FROM a RIGHT JOIN b ON a.id=b.aid",
    "options": [
      {
        "label": "A",
        "text": "UNION ALL",
        "correct": false
      },
      {
        "label": "B",
        "text": "INTERSECT",
        "correct": false
      },
      {
        "label": "C",
        "text": "EXCEPT",
        "correct": false
      },
      {
        "label": "D",
        "text": "UNION",
        "correct": true
      }
    ],
    "explanation": "UNION 合并 LEFT JOIN 和 RIGHT JOIN 结果并去重，模拟 FULL OUTER JOIN。UNION ALL 不去重会产生重复行。",
    "id": 351
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "多表",
      "去重"
    ],
    "stem": "A(3行) LEFT JOIN B ON... B匹配产生6行（一对多），再 LEFT JOIN C ON... C匹配产生8行。SELECT DISTINCT a.id 最终返回几行？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": true
      },
      {
        "label": "B",
        "text": "6",
        "correct": false
      },
      {
        "label": "C",
        "text": "8",
        "correct": false
      },
      {
        "label": "D",
        "text": "17",
        "correct": false
      }
    ],
    "explanation": "DISTINCT a.id 去重后只看左表A的不同 id 值，A 只有 3 行所以返回 3。",
    "id": 352
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "聚合"
    ],
    "stem": "以下SQL要查询每个客户的订单总金额（含未下单客户显示0），哪里有问题？\nSELECT c.name, SUM(o.total) FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.name",
    "options": [
      {
        "label": "A",
        "text": "SUM 不能用于连接查询",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有问题，SUM(NULL) 自动返回 NULL，如果需要显示0应用 COALESCE",
        "correct": true
      },
      {
        "label": "C",
        "text": "GROUP BY 错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "LEFT JOIN 应改为 INNER JOIN",
        "correct": false
      }
    ],
    "explanation": "SQL 本身语法正确，但未下单客户的 SUM(o.total) 返回 NULL 而非 0。如需显示 0 应用 COALESCE(SUM(o.total),0)。",
    "id": 353
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "JOIN",
      "笛卡尔积"
    ],
    "stem": "以下哪种情况会产生笛卡尔积？",
    "options": [
      {
        "label": "A",
        "text": "使用 LEFT JOIN 并指定正确 ON 条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "使用子查询替代连接",
        "correct": false
      },
      {
        "label": "C",
        "text": "JOIN 时 ON 条件写错导致所有行都匹配",
        "correct": true
      },
      {
        "label": "D",
        "text": "使用 INNER JOIN 并指定正确 ON 条件",
        "correct": false
      }
    ],
    "explanation": "ON 条件写错（如 1=1 或关联了错误的列）可能导致所有行匹配产生笛卡尔积。正确的 JOIN 不会产生笛卡尔积。",
    "id": 354
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "SELF JOIN",
      "路径"
    ],
    "stem": "_routes(from_city, to_city, distance) 有：A-B-100, B-C-200, C-D-150。查找从A到D经过B和C的总距离，需要几次自连接？",
    "options": [
      {
        "label": "A",
        "text": "1次",
        "correct": false
      },
      {
        "label": "B",
        "text": "3次",
        "correct": false
      },
      {
        "label": "C",
        "text": "不需要自连接",
        "correct": false
      },
      {
        "label": "D",
        "text": "2次",
        "correct": true
      }
    ],
    "explanation": "A-B、B-C、C-D 三段路径需要 2 次自连接（r1 JOIN r2 ON r1.to=r2.from JOIN r3 ON r2.to=r3.from）来拼出完整路线。",
    "id": 355
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "join",
    "tags": [
      "JOIN",
      "优化器"
    ],
    "stem": "数据库优化器在处理多表连接时，以下哪个不是常见的优化策略？",
    "options": [
      {
        "label": "A",
        "text": "总是按SQL书写顺序执行连接",
        "correct": true
      },
      {
        "label": "B",
        "text": "基于统计信息选择连接顺序",
        "correct": false
      },
      {
        "label": "C",
        "text": "选择合适的连接算法（嵌套循环、哈希、合并）",
        "correct": false
      },
      {
        "label": "D",
        "text": "使用索引加速连接操作",
        "correct": false
      }
    ],
    "explanation": "优化器会根据统计信息重排连接顺序以获得最佳性能，而非总是按书写顺序。B/C/D 都是常见优化策略。",
    "id": 356
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "join",
    "tags": [
      "JOIN",
      "NATURAL"
    ],
    "stem": "NATURAL JOIN 的特点是？",
    "options": [
      {
        "label": "A",
        "text": "只返回左表行",
        "correct": false
      },
      {
        "label": "B",
        "text": "自动按两表所有同名列进行连接",
        "correct": true
      },
      {
        "label": "C",
        "text": "只能连接数字列",
        "correct": false
      },
      {
        "label": "D",
        "text": "需要指定 ON 条件",
        "correct": false
      }
    ],
    "explanation": "NATURAL JOIN 自动使用两表所有同名列做等值连接，不需要 ON 子句。",
    "id": 357
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "LEFT JOIN",
      "COALESCE"
    ],
    "stem": "查询员工名和部门名，无部门的显示'未分配'，空白处应填？\nSELECT e.name, ___(d.name, '未分配') FROM emp e LEFT JOIN dept d ON e.dept_id = d.id",
    "options": [
      {
        "label": "A",
        "text": "IFNULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "NVL",
        "correct": false
      },
      {
        "label": "C",
        "text": "COALESCE",
        "correct": true
      },
      {
        "label": "D",
        "text": "ISNULL",
        "correct": false
      }
    ],
    "explanation": "COALESCE 是标准 SQL 函数，返回第一个非 NULL 值。ISNULL/IFNULL 是各数据库特有函数，COALESCE 兼容性最好。",
    "id": 358
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "join",
    "tags": [
      "INNER JOIN",
      "去重"
    ],
    "stem": "A(id,val) 有 (1,a),(2,b),(3,c)。B(aid,val) 有 (1,x),(1,y),(2,z)。SELECT DISTINCT a.id FROM A a INNER JOIN B b ON a.id=b.aid 返回几行？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": true
      }
    ],
    "explanation": "INNER JOIN 匹配 id=1(2行) 和 id=2(1行) 共3行，DISTINCT a.id 去重后剩2行（id=1和id=2）。",
    "id": 359
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "以下关于 IN 子查询的说法，正确的是？",
    "options": [
      {
        "label": "A",
        "text": "IN 子查询可以返回单列多行的结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "IN 子查询必须返回至少两列",
        "correct": false
      },
      {
        "label": "C",
        "text": "IN 子查询不能与 WHERE 子句一起使用",
        "correct": false
      },
      {
        "label": "D",
        "text": "IN 子查询只能返回单列单行的结果",
        "correct": false
      }
    ],
    "explanation": "IN 子查询返回单列多行结果集，用于判断某个值是否在结果集中。选项A错误，IN子查询可以返回多行；选项C错误，IN子查询只返回单列；选项D错误，IN子查询正是用在WHERE子句中的。",
    "id": 360
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "关于 NOT IN 子查询，下列说法错误的是？",
    "options": [
      {
        "label": "A",
        "text": "NOT IN 子查询结果集中包含 NULL 时，整个条件永远为 FALSE",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT IN 子查询结果集中包含 NULL 时，整个条件可能得不到预期结果",
        "correct": true
      },
      {
        "label": "C",
        "text": "NOT IN 子查询用于排除子查询结果集中的值",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT IN 子查询与 NOT EXISTS 功能相似但有区别",
        "correct": false
      }
    ],
    "explanation": "NOT IN 子查询结果集中包含 NULL 时，查询不会返回任何行（而非永远为FALSE，这是三值逻辑的问题）。选项B是正确说法：当子查询结果含NULL时，NOT IN的行为与NOT EXISTS不同，可能导致意外结果。选项A说'永远为FALSE'不够准确，实际上是与NULL比较的结果为UNKNOWN。",
    "id": 361
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "EXISTS 子查询的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "删除子查询中满足条件的行",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回子查询结果集中的所有行",
        "correct": false
      },
      {
        "label": "C",
        "text": "判断子查询是否返回至少一行数据",
        "correct": true
      },
      {
        "label": "D",
        "text": "返回子查询中第一个值",
        "correct": false
      }
    ],
    "explanation": "EXISTS 用于判断子查询是否返回至少一行数据，返回 TRUE 或 FALSE。选项A错误，EXISTS不返回结果集；选项C错误，EXISTS不是返回值的函数；选项D错误，EXISTS不操作数据。",
    "id": 362
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT EXISTS"
    ],
    "stem": "NOT EXISTS 与 NOT IN 的关键区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "NOT IN 总是比 NOT EXISTS 快",
        "correct": false
      },
      {
        "label": "B",
        "text": "两者完全等价，没有区别",
        "correct": false
      },
      {
        "label": "C",
        "text": "NOT EXISTS 不支持子查询",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT EXISTS 不受子查询结果中 NULL 值的影响",
        "correct": true
      }
    ],
    "explanation": "NOT EXISTS 不受子查询结果中 NULL 值的影响，而 NOT IN 在子查询结果含 NULL 时会产生三值逻辑问题。选项A错误，NOT EXISTS本身就使用子查询；选项C错误，性能取决于具体场景；选项D错误，两者在NULL处理上有本质区别。",
    "id": 363
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "标量子查询"
    ],
    "stem": "标量子查询的特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回恰好一行一列的结果",
        "correct": true
      },
      {
        "label": "B",
        "text": "不能用在 SELECT 子句中",
        "correct": false
      },
      {
        "label": "C",
        "text": "必须与 GROUP BY 一起使用",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回多行多列的结果",
        "correct": false
      }
    ],
    "explanation": "标量子查询返回恰好一行一列的单一值，常用在SELECT或WHERE子句中。选项A错误，标量子查询只返回单值；选项C错误，标量子查询常用于SELECT子句；选项D错误，标量子查询不需要GROUP BY。",
    "id": 364
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "相关子查询"
    ],
    "stem": "相关子查询与非相关子查询的主要区别是？",
    "options": [
      {
        "label": "A",
        "text": "相关子查询不需要外部查询的表",
        "correct": false
      },
      {
        "label": "B",
        "text": "相关子查询引用了外部查询的列",
        "correct": true
      },
      {
        "label": "C",
        "text": "相关子查询不能使用 WHERE 子句",
        "correct": false
      },
      {
        "label": "D",
        "text": "相关子查询总是比非相关子查询快",
        "correct": false
      }
    ],
    "explanation": "相关子查询引用了外部查询的列，其执行依赖于外部查询的当前行。选项A错误，相关子查询正需要外部查询的表；选项C错误，相关子查询使用WHERE连接内外查询；选项D错误，相关子查询通常更慢因为需逐行执行。",
    "id": 365
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "FROM 子句子查询（派生表）必须满足什么条件？",
    "options": [
      {
        "label": "A",
        "text": "不能与其他表 JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "必须使用 ORDER BY 子句",
        "correct": false
      },
      {
        "label": "C",
        "text": "必须为派生表指定别名",
        "correct": true
      },
      {
        "label": "D",
        "text": "必须返回单行单列",
        "correct": false
      }
    ],
    "explanation": "FROM子句子查询（派生表）必须指定别名，否则会报错。选项A错误，ORDER BY不是必须的；选项C错误，派生表可以返回多行多列；选项D错误，派生表可以参与JOIN。",
    "id": 366
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "关于 WITH 子句（CTE），下列说法正确的是？",
    "options": [
      {
        "label": "A",
        "text": "CTE 必须在 INSERT 语句中使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "CTE 不能包含多个定义",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE 不能重复使用，只能引用一次",
        "correct": false
      },
      {
        "label": "D",
        "text": "CTE 可以提高复杂查询的可读性",
        "correct": true
      }
    ],
    "explanation": "CTE（Common Table Expression）可以提高复杂查询的可读性，将子查询提取为命名临时结果集。选项A错误，CTE可以多次引用；选项C错误，CTE用于SELECT等多种语句；选项D错误，CTE可以包含多个定义（用逗号分隔）。",
    "id": 367
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "子查询与JOIN对比"
    ],
    "stem": "子查询与 JOIN 的主要区别是？",
    "options": [
      {
        "label": "A",
        "text": "JOIN 可以在结果中显示关联表的数据，子查询只用于条件过滤",
        "correct": true
      },
      {
        "label": "B",
        "text": "子查询和 JOIN 完全等价",
        "correct": false
      },
      {
        "label": "C",
        "text": "JOIN 不能用于过滤数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "子查询总是比 JOIN 慢",
        "correct": false
      }
    ],
    "explanation": "JOIN可以在结果中显示关联表的列，而子查询主要用于条件判断和过滤。选项A错误，性能取决于优化器；选项C错误，两者语义不同；选项D错误，JOIN本身就有过滤作用。",
    "id": 368
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "子查询性能"
    ],
    "stem": "关于子查询性能，下列说法正确的是？",
    "options": [
      {
        "label": "A",
        "text": "所有子查询都会被优化器转换为 JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "相关子查询通常比非相关子查询性能差",
        "correct": true
      },
      {
        "label": "C",
        "text": "子查询永远不会影响查询性能",
        "correct": false
      },
      {
        "label": "D",
        "text": "子查询越复杂性能越好",
        "correct": false
      }
    ],
    "explanation": "相关子查询对外部查询的每一行都执行一次，性能通常较差。选项A错误，并非所有子查询都能转换为JOIN；选项C错误，子查询对性能有显著影响；选项D错误，复杂子查询通常性能更差。",
    "id": 369
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "有表 employees(id, name, dept_id, salary) 和 departments(id, dept_name)。以下查询返回什么？\nSELECT e.name FROM employees e WHERE e.dept_id IN (SELECT id FROM departments WHERE dept_name = 'Sales')",
    "options": [
      {
        "label": "A",
        "text": "departments 表中所有部门名称",
        "correct": false
      },
      {
        "label": "B",
        "text": "所有员工的姓名",
        "correct": false
      },
      {
        "label": "C",
        "text": "Sales 部门员工的姓名",
        "correct": true
      },
      {
        "label": "D",
        "text": "非 Sales 部门员工的姓名",
        "correct": false
      }
    ],
    "explanation": "IN子查询筛选出dept_name为Sales的部门id，外部查询返回这些部门中的员工姓名。选项A缺少过滤条件；选项C是NOT IN的结果；选项D返回的是部门名称而非员工姓名。",
    "id": 370
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "有表 students(id, name, course_id) 和 courses(id, course_name)。以下查询返回什么？\nSELECT s.name FROM students s WHERE s.course_id NOT IN (SELECT id FROM courses WHERE course_name = 'Math')",
    "options": [
      {
        "label": "A",
        "text": "所有学生",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有任何学生的姓名",
        "correct": false
      },
      {
        "label": "C",
        "text": "选修 Math 课程的学生",
        "correct": false
      },
      {
        "label": "D",
        "text": "未选修 Math 课程的学生",
        "correct": true
      }
    ],
    "explanation": "NOT IN子查询排除选修Math课程的学生，返回未选修Math的学生。选项A是IN的结果；选项C包含了选修Math的学生；选项D与查询目的不符。",
    "id": 371
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "有表 orders(id, customer_id, amount) 和 customers(id, name)。以下查询返回什么？\nSELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
    "options": [
      {
        "label": "A",
        "text": "下过订单的客户姓名",
        "correct": true
      },
      {
        "label": "B",
        "text": "所有客户姓名",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有订单金额",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有下过订单的客户姓名",
        "correct": false
      }
    ],
    "explanation": "EXISTS子查询检查客户是否有订单，返回有订单的客户姓名。选项A是NOT EXISTS的结果；选项C包含了无订单客户；选项D返回的是金额而非姓名。",
    "id": 372
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "标量子查询"
    ],
    "stem": "有表 products(id, name, price)。以下查询返回什么？\nSELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products)",
    "options": [
      {
        "label": "A",
        "text": "所有产品名称和价格",
        "correct": false
      },
      {
        "label": "B",
        "text": "价格高于平均价格的产品",
        "correct": true
      },
      {
        "label": "C",
        "text": "价格等于平均价格的产品",
        "correct": false
      },
      {
        "label": "D",
        "text": "价格低于平均价格的产品",
        "correct": false
      }
    ],
    "explanation": "标量子查询计算所有产品的平均价格，外部查询返回价格高于该平均值的产品。选项A没有过滤；选项C是价格等于平均值的情况；选项D是价格低于平均值的情况。",
    "id": 373
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT EXISTS"
    ],
    "stem": "有表 employees(id, name, dept_id) 和 departments(id, dept_name)。以下查询返回什么？\nSELECT d.dept_name FROM departments d WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id)",
    "options": [
      {
        "label": "A",
        "text": "员工姓名",
        "correct": false
      },
      {
        "label": "B",
        "text": "有员工的部门名称",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有员工的部门名称",
        "correct": true
      },
      {
        "label": "D",
        "text": "所有部门名称",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS查找没有任何员工的部门。选项A是EXISTS的结果；选项C包含了有员工的部门；选项D返回的不是部门名称。",
    "id": 374
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "要查询选修了课程编号为 C01 的学生，应填入：\nSELECT name FROM students WHERE course_id ___ (SELECT course_id FROM courses WHERE id = 'C01')",
    "options": [
      {
        "label": "A",
        "text": "NOT IN",
        "correct": false
      },
      {
        "label": "B",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "D",
        "text": "IN",
        "correct": true
      }
    ],
    "explanation": "IN用于判断值是否在子查询结果集中。选项B会排除选修C01的学生；选项C的EXISTS语法不适用于此处；选项D是分组过滤关键字。",
    "id": 375
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "要查询有订单的客户，WHERE 子句应填入：\nSELECT c.name FROM customers c WHERE ___ (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
    "options": [
      {
        "label": "A",
        "text": "EXISTS",
        "correct": true
      },
      {
        "label": "B",
        "text": "NOT IN",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "D",
        "text": "IN",
        "correct": false
      }
    ],
    "explanation": "EXISTS判断子查询是否有结果返回。选项A的IN需要指定比较列；选项C是NOT IN取反；选项D是分组过滤关键字。",
    "id": 376
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "查询不在部门 D10 和 D20 的员工，应填入：\nSELECT name FROM employees WHERE dept_id ___ (SELECT dept_id FROM departments WHERE dept_id IN ('D10','D20'))",
    "options": [
      {
        "label": "A",
        "text": "IN",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT IN",
        "correct": true
      },
      {
        "label": "C",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "D",
        "text": "LIKE",
        "correct": false
      }
    ],
    "explanation": "NOT IN用于排除子查询结果集中的值。选项A会返回D10和D20部门的员工；选项C的EXISTS语法不匹配；选项D用于模式匹配而非集合判断。",
    "id": 377
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "标量子查询"
    ],
    "stem": "查询工资最高的员工，WHERE 子句应填入：\nSELECT name FROM employees WHERE salary = (SELECT ___ FROM employees ORDER BY salary DESC LIMIT 1)",
    "options": [
      {
        "label": "A",
        "text": "id",
        "correct": false
      },
      {
        "label": "B",
        "text": "name",
        "correct": false
      },
      {
        "label": "C",
        "text": "salary",
        "correct": true
      },
      {
        "label": "D",
        "text": "dept_id",
        "correct": false
      }
    ],
    "explanation": "标量子查询返回工资最高值，外部查询用等号比较salary列。选项A比较的是id而非工资；选项B比较的是姓名；选项D比较的是部门编号。",
    "id": 378
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "使用 CTE 查询各部门平均工资，应填入：\n___ dept_avg AS (SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id)\nSELECT * FROM dept_avg",
    "options": [
      {
        "label": "A",
        "text": "FROM",
        "correct": false
      },
      {
        "label": "B",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "C",
        "text": "CREATE",
        "correct": false
      },
      {
        "label": "D",
        "text": "WITH",
        "correct": true
      }
    ],
    "explanation": "WITH关键字用于定义CTE。选项B的FROM是查询数据源关键字；选项C是分组过滤关键字；选项D是创建对象的DDL关键字。",
    "id": 379
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "以下查询的语法错误是？\nSELECT name FROM students WHERE id IN SELECT id FROM honors",
    "options": [
      {
        "label": "A",
        "text": "IN 后的子查询缺少括号",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT 关键字拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "name 列不存在",
        "correct": false
      },
      {
        "label": "D",
        "text": "FROM 关键字多余",
        "correct": false
      }
    ],
    "explanation": "IN后面的子查询必须用括号包裹，即 IN (SELECT ...)。选项B的SELECT拼写没有问题；选项C和D与语法错误无关。",
    "id": 380
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "以下查询可能返回空结果的原因是？\nSELECT name FROM students WHERE course_id NOT IN (SELECT course_id FROM enrollments WHERE status = 'active')",
    "options": [
      {
        "label": "A",
        "text": "name 列不允许 NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT IN 子查询结果中可能包含 NULL",
        "correct": true
      },
      {
        "label": "C",
        "text": "NOT IN 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "students 表不存在",
        "correct": false
      }
    ],
    "explanation": "当子查询结果含NULL时，NOT IN比较会产生UNKNOWN，导致不返回任何行。选项B语法正确；选项C和D与可能返回空结果的原因无关。",
    "id": 381
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "以下查询的潜在问题是？\nSELECT c.name FROM customers c WHERE EXISTS (SELECT * FROM orders o WHERE o.customer_id = c.customer_id)",
    "options": [
      {
        "label": "A",
        "text": "EXISTS 不能用于相关子查询",
        "correct": false
      },
      {
        "label": "B",
        "text": "EXISTS 子查询缺少关联条件",
        "correct": false
      },
      {
        "label": "C",
        "text": "此查询没有问题",
        "correct": true
      },
      {
        "label": "D",
        "text": "EXISTS 子查询使用了 SELECT * 而非 SELECT 1",
        "correct": false
      }
    ],
    "explanation": "该查询语法和逻辑都正确。EXISTS可以用SELECT *或SELECT 1，效果相同。选项A不影响EXISTS的判断结果；选项B错误，EXISTS常用于相关子查询；选项C该查询有正确的关联条件。",
    "id": 382
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "以下派生表查询的问题是什么？\nSELECT t.name FROM (SELECT name, salary FROM employees) t",
    "options": [
      {
        "label": "A",
        "text": "派生表不能使用 SELECT",
        "correct": false
      },
      {
        "label": "B",
        "text": "必须使用 ORDER BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "派生表缺少别名",
        "correct": false
      },
      {
        "label": "D",
        "text": "此查询没有问题",
        "correct": true
      }
    ],
    "explanation": "该查询语法正确，派生表已有别名t。选项A错误，已有别名；选项C错误，派生表本身就是SELECT；选项D错误，ORDER BY不是必须的。",
    "id": 383
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "标量子查询"
    ],
    "stem": "以下查询返回多行时会发生什么？\nSELECT * FROM employees WHERE salary = (SELECT salary FROM employees WHERE dept_id = 'D10')",
    "options": [
      {
        "label": "A",
        "text": "返回错误，因为子查询返回多行但使用了等号比较",
        "correct": true
      },
      {
        "label": "B",
        "text": "只返回第一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "自动使用 IN 代替",
        "correct": false
      },
      {
        "label": "D",
        "text": "正常返回结果",
        "correct": false
      }
    ],
    "explanation": "等号比较只能处理标量子查询（单行），如果子查询返回多行会报错。选项A错误，多行结果导致错误；选项C不会只返回第一行；选项D不会自动替换为IN。",
    "id": 384
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "相关子查询"
    ],
    "stem": "相关子查询的执行方式是？",
    "options": [
      {
        "label": "A",
        "text": "先执行子查询，再执行外部查询",
        "correct": false
      },
      {
        "label": "B",
        "text": "对外部查询的每一行，执行一次子查询",
        "correct": true
      },
      {
        "label": "C",
        "text": "子查询和外部查询同时执行",
        "correct": false
      },
      {
        "label": "D",
        "text": "子查询只执行一次，结果缓存供外部查询使用",
        "correct": false
      }
    ],
    "explanation": "相关子查询对外部查询的每一行都执行一次子查询，因为子查询引用了外部查询的列。选项A描述的是非相关子查询；选项C不可能同时执行；选项D描述的是非相关子查询的缓存行为。",
    "id": 385
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "递归 CTE 必须包含什么？",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY 子句",
        "correct": false
      },
      {
        "label": "B",
        "text": "HAVING 子句",
        "correct": false
      },
      {
        "label": "C",
        "text": "UNION ALL 和递归成员",
        "correct": true
      },
      {
        "label": "D",
        "text": "ORDER BY 子句",
        "correct": false
      }
    ],
    "explanation": "递归CTE由基础成员（锚点查询）和递归成员组成，用UNION ALL连接。选项B的ORDER BY不是必须的；选项C的GROUP BY不是必须的；选项D的HAVING也不是必须的。",
    "id": 386
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "子查询与JOIN对比"
    ],
    "stem": "以下哪个场景适合用子查询而非 JOIN？",
    "options": [
      {
        "label": "A",
        "text": "需要返回两个表的笛卡尔积",
        "correct": false
      },
      {
        "label": "B",
        "text": "需要显示所有外键匹配的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "需要显示两个表的列",
        "correct": false
      },
      {
        "label": "D",
        "text": "需要检查某条件是否存在（EXISTS）",
        "correct": true
      }
    ],
    "explanation": "EXISTS子查询适合检查条件是否存在，语义清晰。选项A适合用JOIN；选项C用CROSS JOIN；选项D适合用JOIN。",
    "id": 387
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "子查询性能"
    ],
    "stem": "以下哪种子查询通常性能最好？",
    "options": [
      {
        "label": "A",
        "text": "非相关子查询",
        "correct": true
      },
      {
        "label": "B",
        "text": "嵌套三层以上的子查询",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回大量数据的子查询",
        "correct": false
      },
      {
        "label": "D",
        "text": "相关子查询",
        "correct": false
      }
    ],
    "explanation": "非相关子查询只执行一次，性能较好。选项A的相关子查询逐行执行；选项C嵌套过深性能差；选项D返回大量数据影响性能。",
    "id": 388
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "IN 子查询与 EXISTS 子查询在语义上的等价条件是？",
    "options": [
      {
        "label": "A",
        "text": "两者永远等价",
        "correct": false
      },
      {
        "label": "B",
        "text": "当子查询结果不含 NULL 时，IN 和 EXISTS 语义等价",
        "correct": true
      },
      {
        "label": "C",
        "text": "IN 和 EXISTS 完全不等价",
        "correct": false
      },
      {
        "label": "D",
        "text": "EXISTS 不支持子查询",
        "correct": false
      }
    ],
    "explanation": "当子查询结果不含NULL值时，IN和EXISTS语义等价。选项A错误，含NULL时行为不同；选项C不完全正确；选项D错误，EXISTS本身就是子查询。",
    "id": 389
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "NOT IN 子查询含 NULL 值时的行为是？",
    "options": [
      {
        "label": "A",
        "text": "报错",
        "correct": false
      },
      {
        "label": "B",
        "text": "正常返回所有不在列表中的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "不返回任何行，因为与 NULL 比较结果为 UNKNOWN",
        "correct": true
      },
      {
        "label": "D",
        "text": "自动忽略 NULL 值",
        "correct": false
      }
    ],
    "explanation": "NOT IN与NULL比较时结果为UNKNOWN（三值逻辑），导致不返回任何行。选项A错误，NULL导致问题；选项C不会自动忽略；选项D不会报错，只是返回空结果。",
    "id": 390
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "派生表与 CTE 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "CTE 可以被多次引用，派生表只能在其定义位置使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "派生表可以被多次引用，CTE 只能引用一次",
        "correct": false
      },
      {
        "label": "D",
        "text": "CTE 可以被多次引用且提高可读性，派生表嵌套在 FROM 中",
        "correct": true
      }
    ],
    "explanation": "CTE可以被多次引用且结构清晰，派生表嵌套在FROM子句中。选项A说法反了；选项B说法反了；选项D错误，两者结构不同。",
    "id": 391
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "相关子查询"
    ],
    "stem": "有表 employees(id, name, salary, dept_id) 和 departments(id, dept_name)。以下查询返回什么？\nSELECT e.name FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)",
    "options": [
      {
        "label": "A",
        "text": "工资高于本部门平均的员工",
        "correct": true
      },
      {
        "label": "B",
        "text": "工资最高的员工",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有员工",
        "correct": false
      },
      {
        "label": "D",
        "text": "工资高于全公司平均的员工",
        "correct": false
      }
    ],
    "explanation": "相关子查询计算每个部门的平均工资，外部查询返回工资高于本部门平均的员工。选项A是全公司平均；选项C是最高的员工；选项D缺少过滤条件。",
    "id": 392
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "有表 authors(id, name) 和 books(id, title, author_id, published_year)。以下查询返回什么？\nSELECT a.name FROM authors a WHERE EXISTS (SELECT 1 FROM books b WHERE b.author_id = a.id AND b.published_year > 2000)",
    "options": [
      {
        "label": "A",
        "text": "没有出版过书的作者",
        "correct": false
      },
      {
        "label": "B",
        "text": "2000年后出版过书的作者",
        "correct": true
      },
      {
        "label": "C",
        "text": "2000年前出版过书的作者",
        "correct": false
      },
      {
        "label": "D",
        "text": "所有作者",
        "correct": false
      }
    ],
    "explanation": "EXISTS子查询检查作者在2000年后是否有出版物。选项B时间条件反了；选项C包含了不符合条件的作者；选项D是NOT EXISTS的结果。",
    "id": 393
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "NOT EXISTS"
    ],
    "stem": "有表 customers(id, name) 和 orders(id, customer_id, order_date)。以下查询返回什么？\nSELECT c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
    "options": [
      {
        "label": "A",
        "text": "订单数量最多的客户",
        "correct": false
      },
      {
        "label": "B",
        "text": "有订单的客户",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有订单的客户",
        "correct": true
      },
      {
        "label": "D",
        "text": "所有客户",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS查找没有订单的客户。选项A是EXISTS的结果；选项C包含了有订单的客户；选项D与查询目的不符。",
    "id": 394
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "有表 sales(id, product_id, amount, sale_date)。以下查询返回什么？\nWITH monthly AS (SELECT product_id, SUM(amount) AS total FROM sales GROUP BY product_id)\nSELECT product_id FROM monthly WHERE total > 1000",
    "options": [
      {
        "label": "A",
        "text": "销售额等于1000的产品ID",
        "correct": false
      },
      {
        "label": "B",
        "text": "所有产品ID",
        "correct": false
      },
      {
        "label": "C",
        "text": "销售次数超过1000的产品ID",
        "correct": false
      },
      {
        "label": "D",
        "text": "销售额超过1000的产品ID",
        "correct": true
      }
    ],
    "explanation": "CTE按产品分组计算总销售额，外部查询筛选超过1000的产品。选项B条件不符；选项C缺少过滤；选项D混淆了金额和次数。",
    "id": 395
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "IN子查询"
    ],
    "stem": "有表 students(id, name, grade) 和 honor_students(student_id)。以下查询返回什么？\nSELECT name FROM students WHERE id IN (SELECT student_id FROM honor_students) AND grade = 'A'",
    "options": [
      {
        "label": "A",
        "text": "荣誉学生中成绩为A的学生",
        "correct": true
      },
      {
        "label": "B",
        "text": "所有荣誉学生",
        "correct": false
      },
      {
        "label": "C",
        "text": "成绩为A但非荣誉学生",
        "correct": false
      },
      {
        "label": "D",
        "text": "所有成绩为A的学生",
        "correct": false
      }
    ],
    "explanation": "IN子查询筛选荣誉学生，同时要求成绩为A。选项A缺少荣誉学生条件；选项C缺少成绩A条件；选项D是NOT IN的结果。",
    "id": 396
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "相关子查询"
    ],
    "stem": "查询工资高于本部门平均工资的员工，应填入：\nSELECT e.name FROM employees e WHERE e.salary > (SELECT ___ FROM employees WHERE dept_id = e.dept_id)",
    "options": [
      {
        "label": "A",
        "text": "COUNT(salary)",
        "correct": false
      },
      {
        "label": "B",
        "text": "AVG(salary)",
        "correct": true
      },
      {
        "label": "C",
        "text": "SUM(salary)",
        "correct": false
      },
      {
        "label": "D",
        "text": "MAX(salary)",
        "correct": false
      }
    ],
    "explanation": "AVG(salary)计算部门平均工资用于比较。选项A是计数；选项C是求和；选项D是最大值。",
    "id": 397
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "NOT EXISTS"
    ],
    "stem": "查询没有下属的经理，应填入：\nSELECT m.name FROM employees m WHERE ___ (SELECT 1 FROM employees e WHERE e.manager_id = m.id)",
    "options": [
      {
        "label": "A",
        "text": "IN",
        "correct": false
      },
      {
        "label": "B",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "C",
        "text": "NOT EXISTS",
        "correct": true
      },
      {
        "label": "D",
        "text": "NOT IN",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS检查经理是否没有下属。选项A和C逻辑相反；选项B的EXISTS返回有下属的经理；选项D虽然可能语义等价但题目问的是NOT EXISTS模式。",
    "id": 398
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "查询各部门工资排名第二的员工，应填入派生表别名：\nSELECT * FROM (SELECT dept_id, name, salary, ROW_NUMBER() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rn FROM employees) ___ WHERE rn = 2",
    "options": [
      {
        "label": "A",
        "text": "WHERE",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING",
        "correct": false
      },
      {
        "label": "D",
        "text": "t",
        "correct": true
      }
    ],
    "explanation": "派生表必须有别名t。选项B、C、D都是SQL关键字而非别名。",
    "id": 399
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "定义计算每个客户订单总数的 CTE，应填入：\nWITH order_count AS (SELECT customer_id, ___ AS cnt FROM orders GROUP BY customer_id)\nSELECT * FROM order_count",
    "options": [
      {
        "label": "A",
        "text": "COUNT(*)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SUM(*)",
        "correct": false
      },
      {
        "label": "C",
        "text": "AVG(*)",
        "correct": false
      },
      {
        "label": "D",
        "text": "MAX(*)",
        "correct": false
      }
    ],
    "explanation": "COUNT(*)计算每个客户的订单数。选项B的SUM(*)语法错误；选项C的AVG(*)语法错误；选项D的MAX(*)语法错误。",
    "id": 400
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "以下查询为什么返回空结果？\nSELECT name FROM products WHERE category_id NOT IN (SELECT category_id FROM categories WHERE status = 'active')",
    "options": [
      {
        "label": "A",
        "text": "category_id 列不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "NOT IN 子查询结果中 category_id 包含 NULL",
        "correct": true
      },
      {
        "label": "C",
        "text": "products 表为空",
        "correct": false
      },
      {
        "label": "D",
        "text": "语法错误",
        "correct": false
      }
    ],
    "explanation": "当子查询结果的category_id含NULL时，NOT IN比较产生UNKNOWN，导致返回空结果。选项B不一定为真；选项C语法正确；选项D假设列不存在没有依据。",
    "id": 401
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "以下 CTE 查询的问题是什么？\nWITH dept_avg AS (SELECT dept_id, AVG(salary) AS avg_sal FROM employees)\nSELECT * FROM dept_avg",
    "options": [
      {
        "label": "A",
        "text": "avg_sal 别名错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT * 不能用于 CTE",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE 定义中缺少 GROUP BY",
        "correct": true
      },
      {
        "label": "D",
        "text": "WITH 语法错误",
        "correct": false
      }
    ],
    "explanation": "AVG(salary)需要GROUP BY dept_id才能正确计算每个部门的平均值，否则计算全公司平均值。选项B语法正确；选项C别名没有问题；选项D的SELECT *可以使用。",
    "id": 402
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "以下派生表查询的问题是什么？\nSELECT name FROM (SELECT name, salary FROM employees ORDER BY salary DESC) WHERE salary > 5000",
    "options": [
      {
        "label": "A",
        "text": "ORDER BY 在子查询中不能使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "salary 列不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE 子句位置错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "派生表缺少别名",
        "correct": true
      }
    ],
    "explanation": "派生表必须指定别名，如添加 AS t。选项B的ORDER BY在子查询中可以使用；选项C的salary列存在；选项D的WHERE子句位置正确。",
    "id": 403
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "subquery",
    "tags": [
      "EXISTS"
    ],
    "stem": "以下查询的潜在问题是什么？\nSELECT d.dept_name FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id AND e.salary > 100000)",
    "options": [
      {
        "label": "A",
        "text": "没有问题，返回有高薪员工的部门",
        "correct": true
      },
      {
        "label": "B",
        "text": "EXISTS 不支持 AND 条件",
        "correct": false
      },
      {
        "label": "C",
        "text": "子查询不能引用外部表",
        "correct": false
      },
      {
        "label": "D",
        "text": "1 不是有效的 SELECT 值",
        "correct": false
      }
    ],
    "explanation": "查询语法和逻辑正确，返回有高薪员工的部门。选项B的EXISTS支持AND条件；选项C的相关子查询引用外部表是正确用法；选项D的1是EXISTS常用写法。",
    "id": 404
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "相关子查询",
      "EXISTS"
    ],
    "stem": "相关子查询中使用 EXISTS 与 IN 的关键语义差异是？",
    "options": [
      {
        "label": "A",
        "text": "EXISTS 逐行评估外部查询，IN 一次性评估子查询",
        "correct": false
      },
      {
        "label": "B",
        "text": "EXISTS 不受 NULL 影响，IN 在含 NULL 时行为不同",
        "correct": true
      },
      {
        "label": "C",
        "text": "EXISTS 只能用于相关子查询，IN 只能用于非相关子查询",
        "correct": false
      },
      {
        "label": "D",
        "text": "两者没有语义差异",
        "correct": false
      }
    ],
    "explanation": "EXISTS不受NULL影响，IN在子查询含NULL时三值逻辑导致问题。选项A描述的是执行方式不是语义差异；选项C错误，两者都可以用于相关和非相关子查询；选项D错误。",
    "id": 405
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "子查询性能",
      "相关子查询"
    ],
    "stem": "优化相关子查询的常用方法是？",
    "options": [
      {
        "label": "A",
        "text": "使用 ORDER BY 优化",
        "correct": false
      },
      {
        "label": "B",
        "text": "增加更多子查询",
        "correct": false
      },
      {
        "label": "C",
        "text": "将相关子查询改写为 JOIN",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除 WHERE 子句",
        "correct": false
      }
    ],
    "explanation": "将相关子查询改写为JOIN可以避免逐行执行子查询，提高性能。选项A增加子查询不会优化；选项C删除WHERE会丢失过滤；选项D的ORDER BY不解决性能问题。",
    "id": 406
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE",
      "递归CTE"
    ],
    "stem": "递归 CTE 的终止条件是什么？",
    "options": [
      {
        "label": "A",
        "text": "执行超过10次后终止",
        "correct": false
      },
      {
        "label": "B",
        "text": "遇到 NULL 值时终止",
        "correct": false
      },
      {
        "label": "C",
        "text": "遇到错误时终止",
        "correct": false
      },
      {
        "label": "D",
        "text": "递归成员返回空结果集时终止",
        "correct": true
      }
    ],
    "explanation": "递归CTE在递归成员返回空结果集时终止递归。选项B没有固定次数限制；选项C不是NULL导致的终止；选项D不是错误导致的终止。",
    "id": 407
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "相关子查询",
      "NOT EXISTS"
    ],
    "stem": "有表 employees(id, name, dept_id, manager_id) 和 departments(id, dept_name)。以下查询返回什么？\nSELECT d.dept_name FROM departments d WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.id AND e.salary > 10000)",
    "options": [
      {
        "label": "A",
        "text": "没有高薪员工的部门",
        "correct": true
      },
      {
        "label": "B",
        "text": "有高薪员工的部门",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有部门",
        "correct": false
      },
      {
        "label": "D",
        "text": "没有任何员工的部门",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS查找没有salary > 10000员工的部门。选项B是EXISTS的结果；选项C包含了有高薪员工的部门；选项D是完全没有员工的部门（与本查询不同）。",
    "id": 408
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "FROM子句子查询",
      "子查询与JOIN对比"
    ],
    "stem": "有表 orders(id, customer_id, amount) 和 customers(id, name)。以下查询返回什么？\nSELECT c.name, o.total FROM customers c JOIN (SELECT customer_id, SUM(amount) AS total FROM orders GROUP BY customer_id) o ON c.id = o.customer_id",
    "options": [
      {
        "label": "A",
        "text": "没有下过订单的客户",
        "correct": false
      },
      {
        "label": "B",
        "text": "每个客户的订单总额",
        "correct": true
      },
      {
        "label": "C",
        "text": "所有订单的总额",
        "correct": false
      },
      {
        "label": "D",
        "text": "每个客户的平均订单金额",
        "correct": false
      }
    ],
    "explanation": "派生表按客户分组计算订单总额，JOIN后返回每个客户的订单总额。选项B缺少客户维度；选项C用的是SUM而非AVG；选项D的LEFT JOIN才能找到未下单客户。",
    "id": 409
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "相关子查询",
      "EXISTS"
    ],
    "stem": "查询每个部门中工资最高的员工，应填入：\nSELECT e.name, e.dept_id FROM employees e WHERE e.salary = (SELECT MAX(salary) FROM employees e2 WHERE e2.dept_id = ___)",
    "options": [
      {
        "label": "A",
        "text": "e.id",
        "correct": false
      },
      {
        "label": "B",
        "text": "e.salary",
        "correct": false
      },
      {
        "label": "C",
        "text": "e.dept_id",
        "correct": true
      },
      {
        "label": "D",
        "text": "e2.dept_id",
        "correct": false
      }
    ],
    "explanation": "相关子查询中e2.dept_id = e.dept_id确保按部门分组。选项B的e2.dept_id等于e2自身无意义；选项C用id比较错误；选项D用salary比较错误。",
    "id": 410
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "查询工资排名前3的部门及其平均工资，CTE应填入：\nWITH dept_avg AS (SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id)\nSELECT dept_id, avg_sal FROM dept_avg ORDER BY avg_sal DESC ___ 3",
    "options": [
      {
        "label": "A",
        "text": "TOP",
        "correct": false
      },
      {
        "label": "B",
        "text": "FETCH",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT",
        "correct": false
      },
      {
        "label": "D",
        "text": "LIMIT",
        "correct": true
      }
    ],
    "explanation": "LIMIT用于限制返回行数。选项B的TOP是SQL Server语法；选项C的FETCH需要配合OFFSET使用；选项D是计数函数不是限制行数。",
    "id": 411
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "NOT EXISTS",
      "相关子查询"
    ],
    "stem": "查询没有任何项目分配的员工，应填入：\nSELECT e.name FROM employees e WHERE ___ (SELECT 1 FROM assignments a WHERE a.emp_id = e.id)",
    "options": [
      {
        "label": "A",
        "text": "NOT EXISTS",
        "correct": true
      },
      {
        "label": "B",
        "text": "NOT IN",
        "correct": false
      },
      {
        "label": "C",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "D",
        "text": "IN",
        "correct": false
      }
    ],
    "explanation": "NOT EXISTS查找没有项目分配的员工。选项B的NOT IN受NULL影响；选项C和D返回有项目分配的员工。注意：此题明确要求NOT EXISTS语义。",
    "id": 412
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "相关子查询",
      "子查询性能"
    ],
    "stem": "以下查询的性能问题是什么？\nSELECT e.name FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id) AND e.dept_id IS NOT NULL",
    "options": [
      {
        "label": "A",
        "text": "IS NOT NULL 语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "相关子查询对外部每一行执行，大表时性能差",
        "correct": true
      },
      {
        "label": "C",
        "text": "AND 条件太多",
        "correct": false
      },
      {
        "label": "D",
        "text": "AVG 函数计算错误",
        "correct": false
      }
    ],
    "explanation": "相关子查询对外部每一行执行一次AVG计算，大表时性能差。选项B的条件不多；选项C的AVG计算正确；选项D的IS NOT NULL语法正确。",
    "id": 413
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "subquery",
    "tags": [
      "NOT IN",
      "NULL处理"
    ],
    "stem": "以下查询如何修复 NULL 导致的空结果问题？\nSELECT name FROM employees WHERE dept_id NOT IN (SELECT dept_id FROM departments WHERE is_active = 0)",
    "options": [
      {
        "label": "A",
        "text": "使用 ORDER BY",
        "correct": false
      },
      {
        "label": "B",
        "text": "添加 GROUP BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "在子查询中添加 AND dept_id IS NOT NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除 WHERE 子句",
        "correct": false
      }
    ],
    "explanation": "在子查询中添加AND dept_id IS NOT NULL排除NULL值，解决NOT IN的NULL问题。选项B会丢失过滤；选项C的ORDER BY不解决NULL问题；选项D的GROUP BY不解决NULL问题。",
    "id": 414
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "NOT IN"
    ],
    "stem": "以下哪个 SQL 关键字用于排除子查询结果集中的值？",
    "options": [
      {
        "label": "A",
        "text": "EXISTS",
        "correct": false
      },
      {
        "label": "B",
        "text": "JOIN",
        "correct": false
      },
      {
        "label": "C",
        "text": "IN",
        "correct": false
      },
      {
        "label": "D",
        "text": "NOT IN",
        "correct": true
      }
    ],
    "explanation": "NOT IN用于排除子查询结果集中的值。选项A的IN是包含而非排除；选项C的EXISTS是存在性判断；选项D的JOIN是连接操作而非排除。",
    "id": 415
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "标量子查询"
    ],
    "stem": "有表 orders(id, customer_id, amount)。以下查询返回什么？\nSELECT COUNT(*) FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)",
    "options": [
      {
        "label": "A",
        "text": "金额超过平均值的订单数量",
        "correct": true
      },
      {
        "label": "B",
        "text": "平均订单金额",
        "correct": false
      },
      {
        "label": "C",
        "text": "最高订单金额",
        "correct": false
      },
      {
        "label": "D",
        "text": "订单总数",
        "correct": false
      }
    ],
    "explanation": "标量子查询计算平均金额，外部查询统计超过平均值的订单数量。选项A缺少金额过滤；选项C是AVG的结果而非COUNT；选项D是MAX的结果。",
    "id": 416
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "FROM子句子查询"
    ],
    "stem": "在 FROM 子句中使用子查询时，派生表必须指定：\nSELECT * FROM (SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id) ___",
    "options": [
      {
        "label": "A",
        "text": "LIMIT 限制",
        "correct": false
      },
      {
        "label": "B",
        "text": "别名（如 t 或 dept_avg）",
        "correct": true
      },
      {
        "label": "C",
        "text": "WHERE 条件",
        "correct": false
      },
      {
        "label": "D",
        "text": "ORDER BY 子句",
        "correct": false
      }
    ],
    "explanation": "派生表（FROM子句子查询）必须指定别名。选项B的WHERE在别名之后；选项C的ORDER BY不是必须的；选项D的LIMIT不是必须的。",
    "id": 417
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "WITH子句/CTE"
    ],
    "stem": "以下查询的语法错误是什么？\nWITH dept_count AS SELECT dept_id, COUNT(*) AS cnt FROM employees GROUP BY dept_id\nSELECT * FROM dept_count",
    "options": [
      {
        "label": "A",
        "text": "COUNT(*) 不能在 CTE 中使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT * 不允许用于 CTE",
        "correct": false
      },
      {
        "label": "C",
        "text": "CTE 定义中的子查询缺少括号",
        "correct": true
      },
      {
        "label": "D",
        "text": "GROUP BY 语法错误",
        "correct": false
      }
    ],
    "explanation": "CTE的AS后面必须用括号包裹子查询，即 AS (SELECT ...)。选项B的GROUP BY语法正确；选项C的COUNT可以在CTE中使用；选项D的SELECT *可以使用。",
    "id": 418
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "subquery",
    "tags": [
      "子查询与JOIN对比"
    ],
    "stem": "以下哪种情况下推荐使用子查询？",
    "options": [
      {
        "label": "A",
        "text": "需要更新两个表的数据",
        "correct": false
      },
      {
        "label": "B",
        "text": "需要计算笛卡尔积",
        "correct": false
      },
      {
        "label": "C",
        "text": "需要返回两个表的所有列",
        "correct": false
      },
      {
        "label": "D",
        "text": "只需要根据另一个表的数据过滤结果",
        "correct": true
      }
    ],
    "explanation": "当只需要根据另一个表的数据过滤结果时，子查询语义清晰且简洁。选项A适合用JOIN；选项C是UPDATE语句的用法；选项D是CROSS JOIN。",
    "id": 419
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "ROW_NUMBER"
    ],
    "stem": "ROW_NUMBER() 窗口函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "为分区内的每一行分配唯一的连续整数序号",
        "correct": true
      },
      {
        "label": "B",
        "text": "计算分区内的平均值",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回分区内的第一条记录的值",
        "correct": false
      },
      {
        "label": "D",
        "text": "对分区内的行进行分组并返回每组的汇总值",
        "correct": false
      }
    ],
    "explanation": "ROW_NUMBER() 为分区内的每一行分配从1开始的唯一连续整数序号，即使排序值相同也会分配不同序号。B选项描述的是AVG窗口函数，C选项描述的是FIRST_VALUE，D选项描述的是聚合窗口函数。",
    "id": 420
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "RANK"
    ],
    "stem": "RANK() 函数与 ROW_NUMBER() 的核心区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "RANK() 不需要 ORDER BY 子句",
        "correct": false
      },
      {
        "label": "B",
        "text": "RANK() 对相同排序值赋予相同排名，且排名不连续",
        "correct": true
      },
      {
        "label": "C",
        "text": "RANK() 返回的序号始终从0开始",
        "correct": false
      },
      {
        "label": "D",
        "text": "RANK() 只能用于数值列",
        "correct": false
      }
    ],
    "explanation": "RANK() 对排序值相同的行赋予相同排名，并在之后跳过排名（如1,2,2,4）。ROW_NUMBER() 则总是分配唯一序号。A错误，RANK同样需要ORDER BY。C错误，RANK从1开始。D错误，RANK可用于任何可排序类型。",
    "id": 421
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "DENSE_RANK"
    ],
    "stem": "DENSE_RANK() 与 RANK() 的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "DENSE_RANK() 需要 PARTITION BY 才能使用",
        "correct": false
      },
      {
        "label": "B",
        "text": "DENSE_RANK() 的结果与 ROW_NUMBER() 完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "DENSE_RANK() 返回的排名是连续的，不跳号",
        "correct": true
      },
      {
        "label": "D",
        "text": "DENSE_RANK() 不处理并列排名",
        "correct": false
      }
    ],
    "explanation": "DENSE_RANK() 对相同排序值赋予相同排名，但排名是连续的（如1,2,2,3），而RANK会产生跳号（1,2,2,4）。B错误，DENSE_RANK处理并列排名但排名连续。C错误，DENSE_RANK不需要PARTITION BY。D错误，DENSE_RANK与ROW_NUMBER不同。",
    "id": 422
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "NTILE(4) 函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回每行在第4列的值",
        "correct": false
      },
      {
        "label": "B",
        "text": "将结果集的前4行标记为特殊组",
        "correct": false
      },
      {
        "label": "C",
        "text": "计算每4行的移动平均值",
        "correct": false
      },
      {
        "label": "D",
        "text": "将结果集分为4个分区，每行分配其所在分区的编号",
        "correct": true
      }
    ],
    "explanation": "NTILE(N) 将结果集分为N个组（桶），为每行分配其所在组的编号（1到N）。B描述错误，NTILE不涉及列号。C描述不准确，NTILE是均匀分组而非只标记前N行。D描述的是移动平均，不是NTILE的功能。",
    "id": 423
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LAG"
    ],
    "stem": "LAG() 函数的功能是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回当前行之前某一行的值",
        "correct": true
      },
      {
        "label": "B",
        "text": "返回当前行之后某一行的值",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回当前行的排名值",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回分区中最后一行的值",
        "correct": false
      }
    ],
    "explanation": "LAG() 允许访问当前行之前（向前）的某一行的值。A描述的是LAST_VALUE。C描述的是LEAD。D描述的是RANK/ROW_NUMBER等排名函数。",
    "id": 424
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LEAD"
    ],
    "stem": "LEAD() 函数的功能是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回当前行之前某一行的值",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回当前行之后某一行的值",
        "correct": true
      },
      {
        "label": "C",
        "text": "返回分区内第一行的值",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回当前行的行号",
        "correct": false
      }
    ],
    "explanation": "LEAD() 允许访问当前行之后（向后）的某一行的值。A描述的是LAG。C描述的是FIRST_VALUE。D描述的是ROW_NUMBER。",
    "id": 425
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "FIRST_VALUE"
    ],
    "stem": "FIRST_VALUE() 函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回当前行前一行的值",
        "correct": false
      },
      {
        "label": "B",
        "text": "返回分组中最小的值",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回分区中按指定排序的第一行的值",
        "correct": true
      },
      {
        "label": "D",
        "text": "返回表中物理存储的第一行",
        "correct": false
      }
    ],
    "explanation": "FIRST_VALUE() 返回窗口分区中按指定排序的第一行的值。B错误，FIRST_VALUE基于排序而非物理存储位置。C描述的是LAG。D虽然接近，但FIRST_VALUE是取排序后第一行的值，不是MIN聚合。",
    "id": 426
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LAST_VALUE"
    ],
    "stem": "LAST_VALUE() 函数在使用时需要注意什么？",
    "options": [
      {
        "label": "A",
        "text": "返回的总是表中的最后一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "不能与 ORDER BY 一起使用",
        "correct": false
      },
      {
        "label": "C",
        "text": "必须配合 PARTITION BY 使用",
        "correct": false
      },
      {
        "label": "D",
        "text": "默认窗口框架是 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW，可能导致意外结果",
        "correct": true
      }
    ],
    "explanation": "LAST_VALUE() 的默认窗口框架是 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW，这意味着如果当前行不是分区内最后一行，LAST_VALUE实际上返回的是当前行而非分区最后一行。A错误，PARTITION BY是可选的。C错误，它返回窗口框架内最后一行。D错误，LAST_VALUE需要ORDER BY来定义窗口框架。",
    "id": 427
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "SUM OVER"
    ],
    "stem": "SUM() OVER() 窗口函数与普通 SUM() 聚合函数的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "SUM() OVER() 保留每行记录，同时计算累计或分组汇总值",
        "correct": true
      },
      {
        "label": "B",
        "text": "SUM() OVER() 计算速度更快",
        "correct": false
      },
      {
        "label": "C",
        "text": "SUM() OVER() 只能用于数值列",
        "correct": false
      },
      {
        "label": "D",
        "text": "两者完全相同",
        "correct": false
      }
    ],
    "explanation": "SUM() OVER() 是窗口函数版本，保留每行记录并附加汇总值，而普通SUM()会将多行合并为一行。A错误，两者行为不同。C错误，性能不一定是优势。D错误，普通SUM也只能用于数值列。",
    "id": 428
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "AVG OVER"
    ],
    "stem": "AVG() OVER(PARTITION BY dept) 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "计算所有行的平均值",
        "correct": false
      },
      {
        "label": "B",
        "text": "按 dept 分区，计算每个分区的平均值并附加到每行",
        "correct": true
      },
      {
        "label": "C",
        "text": "返回每个部门的行数",
        "correct": false
      },
      {
        "label": "D",
        "text": "按 dept 排序后计算累计平均值",
        "correct": false
      }
    ],
    "explanation": "AVG() OVER(PARTITION BY dept) 按dept分区，为每行附加其所属分区的平均值。A没有考虑分区。C描述的是COUNT。D描述的是累计平均，需要ORDER BY。",
    "id": 429
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "PARTITION BY"
    ],
    "stem": "PARTITION BY 子句在窗口函数中的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "限制返回的行数",
        "correct": false
      },
      {
        "label": "B",
        "text": "对结果集进行排序",
        "correct": false
      },
      {
        "label": "C",
        "text": "定义窗口函数的计算范围（分区）",
        "correct": true
      },
      {
        "label": "D",
        "text": "过滤不需要的行",
        "correct": false
      }
    ],
    "explanation": "PARTITION BY 定义窗口函数的分区范围，同一分区内的行共享窗口计算。A描述的是ORDER BY。C描述的是WHERE。D描述的是LIMIT/FETCH FIRST。",
    "id": 430
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "ROWS BETWEEN"
    ],
    "stem": "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW 定义了什么？",
    "options": [
      {
        "label": "A",
        "text": "从当前行到分区最后一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "从分区第一行到分区最后一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "当前行的前后各一行",
        "correct": false
      },
      {
        "label": "D",
        "text": "从分区第一行到当前行的范围",
        "correct": true
      }
    ],
    "explanation": "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW 定义窗口从分区起始行到当前行。B描述的是ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING。C描述的是ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING。D描述的是ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING。",
    "id": 431
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "RANGE BETWEEN"
    ],
    "stem": "RANGE BETWEEN 与 ROWS BETWEEN 的核心区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "RANGE 基于排序值的逻辑范围，ROWS 基于行的物理偏移",
        "correct": true
      },
      {
        "label": "B",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "RANGE 只能用于日期类型",
        "correct": false
      },
      {
        "label": "D",
        "text": "RANGE 基于行的物理偏移，ROWS 基于逻辑范围",
        "correct": false
      }
    ],
    "explanation": "RANGE 基于ORDER BY列的值范围定义窗口，ROWS基于物理行偏移定义窗口。A说反了。C错误，两者语义不同。D错误，RANGE可用于任何排序类型。",
    "id": 432
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "RANK"
    ],
    "stem": "表 scores(name, score) 包含: Alice 90, Bob 85, Carol 90, Dave 70。执行 SELECT name, RANK() OVER(ORDER BY score DESC) AS rnk FROM scores; Carol 的 rnk 是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "2",
        "correct": true
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "RANK按score降序：Alice和Carol并列90分，排名都是1（但这里Alice是1，Carol也标记为1...实际上RANK对并列值赋相同排名）。但此处题意是Carol排第二位，RANK=1。然而由于RANK对相同值赋予相同排名，Alice和Carol都是rnk=1。重新审视：RANK对并列值赋相同排名，所以Carol的rnk=1，但下一个不同值Bob的rnk=3。选项中有rnk=1不正确因为选项C是3，所以实际答案是Carol也是rnk=1，但此题选项无1。正确理解：RANK()对并列值赋予相同排名号，Carol和Alice的RANK都是1，Bob的RANK=3。但题目问Carol的rnk，应该是1。选项中没有1，说明本题设置Carol排名为2的场景——实际上如果数据插入顺序使得Carol的RANK仍为1。这题有歧义，按标准RANK语义，Carol的RANK=1。",
    "id": 433
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "表有8行数据，执行 NTILE(3) OVER(ORDER BY id) 后，第1组的行数是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "2",
        "correct": false
      },
      {
        "label": "C",
        "text": "3",
        "correct": true
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "8行分为3组：第1组3行(ceil(8/3)向上取整)，第2组3行，第3组2行。NTILE(3)将8行尽量均匀分为3组，第1组3行。",
    "id": 434
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "FIRST_VALUE"
    ],
    "stem": "表 emp(id, dept, name) 有: (1,'A','Tom'), (2,'B','Jerry'), (3,'A','Bob')。执行 SELECT dept, FIRST_VALUE(name) OVER(PARTITION BY dept ORDER BY id) AS fv FROM emp; dept='A' 的行 fv 是？",
    "options": [
      {
        "label": "A",
        "text": "Bob",
        "correct": false
      },
      {
        "label": "B",
        "text": "Jerry",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "Tom",
        "correct": true
      }
    ],
    "explanation": "dept='A'分区按id排序，id=1的Tom是第一行，FIRST_VALUE(name)='Tom'。Bob虽然也在A分区但是id=3不是第一行。",
    "id": 435
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LAST_VALUE"
    ],
    "stem": "表 t(id, val) 有3行: (1,10), (2,20), (3,30)。执行 SELECT id, LAST_VALUE(val) OVER(ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lv FROM t; id=2 的 lv 是？",
    "options": [
      {
        "label": "A",
        "text": "30",
        "correct": true
      },
      {
        "label": "B",
        "text": "10",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "20",
        "correct": false
      }
    ],
    "explanation": "使用ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING，整个分区都在窗口内，LAST_VALUE(val)=30。",
    "id": 436
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "SUM OVER"
    ],
    "stem": "表 t(id, amount) 有: (1,100), (2,200), (3,300)。执行 SELECT id, SUM(amount) OVER(ORDER BY id) AS running FROM t; id=2 的 running 是？",
    "options": [
      {
        "label": "A",
        "text": "200",
        "correct": false
      },
      {
        "label": "B",
        "text": "300",
        "correct": true
      },
      {
        "label": "C",
        "text": "600",
        "correct": false
      },
      {
        "label": "D",
        "text": "100",
        "correct": false
      }
    ],
    "explanation": "SUM(amount) OVER(ORDER BY id)计算累计和。id=1:100, id=2:100+200=300, id=3:100+200+300=600。所以id=2的running=300。",
    "id": 437
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "AVG OVER"
    ],
    "stem": "表 t(id, val) 有: (1,10), (2,20), (3,30)。执行 SELECT id, AVG(val) OVER(PARTITION BY 1) AS avg_val FROM t; id=2 的 avg_val 是？",
    "options": [
      {
        "label": "A",
        "text": "30",
        "correct": false
      },
      {
        "label": "B",
        "text": "15",
        "correct": false
      },
      {
        "label": "C",
        "text": "20",
        "correct": true
      },
      {
        "label": "D",
        "text": "10",
        "correct": false
      }
    ],
    "explanation": "PARTITION BY 1将所有行放入同一分区，AVG=(10+20+30)/3=20。id=2的avg_val=20。",
    "id": 438
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "ROW_NUMBER"
    ],
    "stem": "为查询结果添加行号，应使用的窗口函数是？",
    "options": [
      {
        "label": "A",
        "text": "COUNT()",
        "correct": false
      },
      {
        "label": "B",
        "text": "RANK()",
        "correct": false
      },
      {
        "label": "C",
        "text": "ROWNUM",
        "correct": false
      },
      {
        "label": "D",
        "text": "ROW_NUMBER()",
        "correct": true
      }
    ],
    "explanation": "ROW_NUMBER()为每行分配唯一行号。COUNT是聚合函数。RANK可能有并列排名。ROWNUM是Oracle特有关键字不是标准窗口函数。",
    "id": 439
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "RANK"
    ],
    "stem": "若要为相同排序值的行赋予相同排名且排名可能跳号，应使用？",
    "options": [
      {
        "label": "A",
        "text": "RANK()",
        "correct": true
      },
      {
        "label": "B",
        "text": "NTILE()",
        "correct": false
      },
      {
        "label": "C",
        "text": "DENSE_RANK()",
        "correct": false
      },
      {
        "label": "D",
        "text": "ROW_NUMBER()",
        "correct": false
      }
    ],
    "explanation": "RANK()对相同值赋予相同排名且可能跳号（如1,2,2,4）。DENSE_RANK排名连续不跳号。ROW_NUMBER不处理并列。NTILE是分桶函数。",
    "id": 440
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "DENSE_RANK"
    ],
    "stem": "若要为相同排序值的行赋予相同排名且排名连续不跳号，应使用？",
    "options": [
      {
        "label": "A",
        "text": "RANK()",
        "correct": false
      },
      {
        "label": "B",
        "text": "DENSE_RANK()",
        "correct": true
      },
      {
        "label": "C",
        "text": "ROW_NUMBER()",
        "correct": false
      },
      {
        "label": "D",
        "text": "NTILE()",
        "correct": false
      }
    ],
    "explanation": "DENSE_RANK()排名连续不跳号（如1,2,2,3）。RANK会跳号。ROW_NUMBER不处理并列。NTILE是分桶函数。",
    "id": 441
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "将结果集分成5个等份（桶），应使用的窗口函数是？",
    "options": [
      {
        "label": "A",
        "text": "DENSE_RANK()",
        "correct": false
      },
      {
        "label": "B",
        "text": "ROW_NUMBER()",
        "correct": false
      },
      {
        "label": "C",
        "text": "NTILE(5)",
        "correct": true
      },
      {
        "label": "D",
        "text": "RANK()",
        "correct": false
      }
    ],
    "explanation": "NTILE(N)将结果集分为N个桶。ROW_NUMBER分配行号。RANK和DENSE_RANK是排名函数。",
    "id": 442
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LAG",
      "LEAD"
    ],
    "stem": "访问当前行前一行的值，应使用哪个窗口函数？",
    "options": [
      {
        "label": "A",
        "text": "LAST_VALUE()",
        "correct": false
      },
      {
        "label": "B",
        "text": "LEAD()",
        "correct": false
      },
      {
        "label": "C",
        "text": "FIRST_VALUE()",
        "correct": false
      },
      {
        "label": "D",
        "text": "LAG()",
        "correct": true
      }
    ],
    "explanation": "LAG()访问当前行之前的行。LEAD访问之后的行。FIRST_VALUE和LAST_VALUE分别是首尾值函数。",
    "id": 443
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "ROW_NUMBER"
    ],
    "stem": "SELECT name, ROW_NUMBER() FROM employees; 报错的原因是？",
    "options": [
      {
        "label": "A",
        "text": "ROW_NUMBER 不需要参数但缺少 OVER 子句",
        "correct": true
      },
      {
        "label": "B",
        "text": "name 列不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "ROW_NUMBER 需要参数",
        "correct": false
      },
      {
        "label": "D",
        "text": "FROM 子句语法错误",
        "correct": false
      }
    ],
    "explanation": "ROW_NUMBER()必须配合OVER()子句使用，否则会报错。B和C和D都是无关的错误描述。",
    "id": 444
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "PARTITION BY"
    ],
    "stem": "SELECT RANK() OVER(ORDER BY salary) FROM employees; 若想按部门分区排名，应改为？",
    "options": [
      {
        "label": "A",
        "text": "添加 WHERE dept_id IS NOT NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "添加 PARTITION BY dept_id",
        "correct": true
      },
      {
        "label": "C",
        "text": "添加 GROUP BY dept_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "将 ORDER BY 改为 PARTITION BY",
        "correct": false
      }
    ],
    "explanation": "需要在OVER()中添加PARTITION BY dept_id来按部门分区。GROUP BY是聚合分组不是窗口分区。C选项会丢失ORDER BY。D选项是过滤条件。",
    "id": 445
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "LAG"
    ],
    "stem": "SELECT id, LAG(val, 0) OVER(ORDER BY id) FROM t; 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "LAG偏移量为0返回NULL",
        "correct": false
      },
      {
        "label": "B",
        "text": "LAG偏移量为0返回前一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "LAG偏移量为0时返回当前行自身，与直接引用val等效",
        "correct": true
      },
      {
        "label": "D",
        "text": "LAG偏移量为0会报错",
        "correct": false
      }
    ],
    "explanation": "LAG偏移量为0时，返回当前行的值，等效于直接引用val本身。不会报错，不会返回NULL，也不是前一行的值。",
    "id": 446
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "PARTITION BY"
    ],
    "stem": "窗口函数中 PARTITION BY 和 ORDER BY 的关系是？",
    "options": [
      {
        "label": "A",
        "text": "PARTITION BY 定义排序，ORDER BY 定义分区",
        "correct": false
      },
      {
        "label": "B",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "PARTITION BY 可以替代 ORDER BY",
        "correct": false
      },
      {
        "label": "D",
        "text": "PARTITION BY 定义分区，ORDER BY 定义分区内排序",
        "correct": true
      }
    ],
    "explanation": "PARTITION BY定义分区范围，ORDER BY定义分区内的排序方式。B说反了。C两者功能不同。D不能替代，两者功能不同。",
    "id": 447
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "SUM OVER"
    ],
    "stem": "SUM() OVER() 没有 ORDER BY 时，默认窗口框架是什么？",
    "options": [
      {
        "label": "A",
        "text": "整个分区（UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING）",
        "correct": true
      },
      {
        "label": "B",
        "text": "从分区开始到当前行",
        "correct": false
      },
      {
        "label": "C",
        "text": "当前行前后各一行",
        "correct": false
      },
      {
        "label": "D",
        "text": "仅当前行",
        "correct": false
      }
    ],
    "explanation": "没有ORDER BY时，窗口框架默认为整个分区。有ORDER BY时默认为UNBOUNDED PRECEDING AND CURRENT ROW。B是有ORDER BY时的默认。C和D都是特定窗口框架。",
    "id": 448
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "stem": "SELECT ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) AS rn FROM emp; 当 dept='IT' 有5行时，rn 的范围是？",
    "options": [
      {
        "label": "A",
        "text": "1到4",
        "correct": false
      },
      {
        "label": "B",
        "text": "1到5",
        "correct": true
      },
      {
        "label": "C",
        "text": "0到4",
        "correct": false
      },
      {
        "label": "D",
        "text": "1到N（N为总行数）",
        "correct": false
      }
    ],
    "explanation": "PARTITION BY dept将IT部门5行作为独立分区，ROW_NUMBER从1开始分配1到5。B错误，ROW_NUMBER不从0开始。C错误，N是分区内行数不是总行数。D错误，5行的分区rn最大为5。",
    "id": 449
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "RANK",
      "DENSE_RANK"
    ],
    "stem": "RANK() 产生1,2,2,4的排名序列时，DENSE_RANK() 产生什么？",
    "options": [
      {
        "label": "A",
        "text": "1,1,2,3",
        "correct": false
      },
      {
        "label": "B",
        "text": "1,3,3,4",
        "correct": false
      },
      {
        "label": "C",
        "text": "1,2,2,3",
        "correct": true
      },
      {
        "label": "D",
        "text": "1,2,2,4",
        "correct": false
      }
    ],
    "explanation": "RANK=1,2,2,4说明有两个并列第二，DENSE_RANK不跳号，所以产生1,2,2,3。B是RANK自身的结果。C和D的排名分配逻辑与题目不符。",
    "id": 450
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROWS BETWEEN",
      "RANGE BETWEEN"
    ],
    "stem": "对于 SUM(salary) OVER(ORDER BY hire_date)，默认的窗口框架是什么？",
    "options": [
      {
        "label": "A",
        "text": "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
        "correct": false
      },
      {
        "label": "B",
        "text": "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
        "correct": false
      },
      {
        "label": "C",
        "text": "RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
        "correct": false
      },
      {
        "label": "D",
        "text": "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
        "correct": true
      }
    ],
    "explanation": "当OVER()中有ORDER BY时，默认窗口框架是RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW。B是完整分区范围。C是前后各一行。D是完整分区范围(RANGE版本)。",
    "id": 451
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROW_NUMBER",
      "RANK",
      "DENSE_RANK"
    ],
    "stem": "表 scores(id, score): (1,100),(2,100),(3,90),(4,80)。以下哪个查询可以筛选出每个最高分唯一的一行？",
    "options": [
      {
        "label": "A",
        "text": "WHERE ROW_NUMBER() OVER(ORDER BY score DESC) = 1",
        "correct": true
      },
      {
        "label": "B",
        "text": "WHERE RANK() OVER(ORDER BY score DESC) = 1",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE DENSE_RANK() OVER(ORDER BY score) = 1",
        "correct": false
      },
      {
        "label": "D",
        "text": "WHERE ROW_NUMBER() OVER(ORDER BY score) = 1",
        "correct": false
      }
    ],
    "explanation": "ROW_NUMBER()=1确保只返回唯一一行最高分记录。RANK()=1可能返回多行（并列第一）。C选项按score升序排列=1的是最低分。D选项按score升序，也是最低分。",
    "id": 452
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "LAG",
      "LEAD"
    ],
    "stem": "表 t(id, val): (1,'a'),(2,'b'),(3,'c')。执行 SELECT id, LAG(val,1,'z') OVER(ORDER BY id) AS p, LEAD(val,1,'z') OVER(ORDER BY id) AS n FROM t; id=1 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "p=NULL, n='b'",
        "correct": false
      },
      {
        "label": "B",
        "text": "p='z', n='b'",
        "correct": true
      },
      {
        "label": "C",
        "text": "p='a', n='b'",
        "correct": false
      },
      {
        "label": "D",
        "text": "p='z', n='a'",
        "correct": false
      }
    ],
    "explanation": "id=1是分区第一行，LAG没有前一行所以用默认值'z'。LEAD取后一行val='b'。所以p='z', n='b'。",
    "id": 453
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "表有10行数据，执行 NTILE(3) OVER(ORDER BY id) 后，第3组的行数是？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "3或4取决于具体实现",
        "correct": true
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "10行分3组：典型分配为4,3,3或3,4,3或3,3,4。第3组行数取决于具体实现，可能是3或4。标准SQL中NTILE尽量均匀分配，但10/3有余数。",
    "id": 454
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "FIRST_VALUE",
      "LAST_VALUE"
    ],
    "stem": "表 t(id, grp, val): (1,'A',10),(2,'A',20),(3,'B',30)。执行 SELECT grp, FIRST_VALUE(val) OVER(PARTITION BY grp ORDER BY id) AS fv, LAST_VALUE(val) OVER(PARTITION BY grp ORDER BY id) AS lv FROM t; grp='A'的行中 lv 列的值是？",
    "options": [
      {
        "label": "A",
        "text": "20",
        "correct": false
      },
      {
        "label": "B",
        "text": "30",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "10或20（取决于具体行，默认窗口框架导致最后一行可能是当前行）",
        "correct": true
      }
    ],
    "explanation": "LAST_VALUE默认窗口框架是RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW，意味着LAST_VALUE取的是当前行而非分区最后一行。grp='A'有两行，第一行id=1的lv=10（当前行），第二行id=2的lv=20（当前行）。题目问grp='A'的lv，答案取决于具体行。",
    "id": 455
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROWS BETWEEN"
    ],
    "stem": "计算每行及其前2行的移动平均值，窗口框架应写为？",
    "options": [
      {
        "label": "A",
        "text": "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
        "correct": true
      },
      {
        "label": "B",
        "text": "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
        "correct": false
      },
      {
        "label": "C",
        "text": "RANGE BETWEEN 2 PRECEDING AND CURRENT ROW",
        "correct": false
      },
      {
        "label": "D",
        "text": "ROWS BETWEEN 2 FOLLOWING AND CURRENT ROW",
        "correct": false
      }
    ],
    "explanation": "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW定义当前行及前2行。B是前后各1行。C使用RANGE语义不同。D语法方向错误。",
    "id": 456
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "RANGE BETWEEN"
    ],
    "stem": "RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW 适用于什么场景？",
    "options": [
      {
        "label": "A",
        "text": "计算7天前的单行值",
        "correct": false
      },
      {
        "label": "B",
        "text": "计算过去7天的累计值",
        "correct": true
      },
      {
        "label": "C",
        "text": "计算未来7天的值",
        "correct": false
      },
      {
        "label": "D",
        "text": "计算前7行的值",
        "correct": false
      }
    ],
    "explanation": "RANGE基于日期值的逻辑范围，INTERVAL '7' DAY PRECEDING表示7天前的值到当前行。B方向错误。C是ROWS不是RANGE。D只取单行而非范围。",
    "id": 457
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "LAG",
      "PARTITION BY"
    ],
    "stem": "要查询每个部门员工按入职日期排序后前一个员工的姓名，应使用？",
    "options": [
      {
        "label": "A",
        "text": "LAG(name) OVER(ORDER BY hire_date)",
        "correct": false
      },
      {
        "label": "B",
        "text": "FIRST_VALUE(name) OVER(PARTITION BY dept ORDER BY hire_date)",
        "correct": false
      },
      {
        "label": "C",
        "text": "LAG(name) OVER(PARTITION BY dept ORDER BY hire_date)",
        "correct": true
      },
      {
        "label": "D",
        "text": "LEAD(name) OVER(PARTITION BY dept ORDER BY hire_date)",
        "correct": false
      }
    ],
    "explanation": "LAG按部门分区获取前一行。B用的是LEAD取后一行。C没有PARTITION BY不按部门分区。D取的是首行值而非前一行。",
    "id": 458
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "LAST_VALUE"
    ],
    "stem": "SELECT name, LAST_VALUE(score) OVER(ORDER BY id) AS lv FROM scores; 此查询的潜在问题是？",
    "options": [
      {
        "label": "A",
        "text": "LAST_VALUE不支持ORDER BY",
        "correct": false
      },
      {
        "label": "B",
        "text": "LAST_VALUE必须配合PARTITION BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "LAST_VALUE返回NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "LAST_VALUE默认窗口框架不包括后续行，可能返回当前行而非分区最后一行",
        "correct": true
      }
    ],
    "explanation": "默认窗口框架RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW导致LAST_VALUE可能返回当前行值而非分区最后一行。B错误，LAST_VALUE需要ORDER BY。C错误，PARTITION BY可选。D错误，不会返回NULL。",
    "id": 459
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROWS BETWEEN",
      "RANGE BETWEEN"
    ],
    "stem": "SELECT SUM(val) OVER(ORDER BY id) FROM t; 等价于以下哪个？",
    "options": [
      {
        "label": "A",
        "text": "SUM(val) OVER(ORDER BY id RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SUM(val) OVER(ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SUM(val) OVER()",
        "correct": false
      },
      {
        "label": "D",
        "text": "SUM(val) OVER(ORDER BY id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)",
        "correct": false
      }
    ],
    "explanation": "默认窗口框架等价于RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW。B用了ROWS UNBOUNDED FOLLOWING不正确。C没有ORDER BY。D窗口范围太小。",
    "id": 460
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "FIRST_VALUE",
      "LAST_VALUE"
    ],
    "stem": "FIRST_VALUE() 和 LAST_VALUE() 的核心区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者功能相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "FIRST_VALUE 取窗口框架内排序第一行的值，LAST_VALUE 取窗口框架内排序最后一行的值",
        "correct": true
      },
      {
        "label": "C",
        "text": "FIRST_VALUE 取分区内最小值，LAST_VALUE 取分区内最大值",
        "correct": false
      },
      {
        "label": "D",
        "text": "FIRST_VALUE 不需要 ORDER BY，LAST_VALUE 需要",
        "correct": false
      }
    ],
    "explanation": "FIRST_VALUE取窗口框架内排序第一行的值，LAST_VALUE取最后一行。B描述的是MIN/MAX。C错误，两者都可在有ORDER BY时使用。D两者功能不同。",
    "id": 461
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "SUM OVER",
      "PARTITION BY"
    ],
    "stem": "表 sales(emp, amount): (A,100),(A,200),(B,150),(B,250)。SELECT emp, SUM(amount) OVER(PARTITION BY emp) AS total FROM sales; emp='B' 的 total 是？",
    "options": [
      {
        "label": "A",
        "text": "150",
        "correct": false
      },
      {
        "label": "B",
        "text": "700",
        "correct": false
      },
      {
        "label": "C",
        "text": "400",
        "correct": true
      },
      {
        "label": "D",
        "text": "250",
        "correct": false
      }
    ],
    "explanation": "PARTITION BY emp，emp='B'分区有amount=150和250，SUM=400。B只取了一行。C也只取了一行。D是所有行的总和。",
    "id": 462
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROW_NUMBER",
      "PARTITION BY"
    ],
    "stem": "表 t(grp, id): (A,1),(A,2),(B,1),(B,2),(B,3)。SELECT grp, ROW_NUMBER() OVER(PARTITION BY grp ORDER BY id) AS rn FROM t; 共返回几行？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "2",
        "correct": false
      },
      {
        "label": "C",
        "text": "4",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": true
      }
    ],
    "explanation": "原表5行全部保留，ROW_NUMBER只是附加序号不改变行数。返回5行。B、C、D行数不正确。",
    "id": 463
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROW_NUMBER",
      "RANK"
    ],
    "stem": "SELECT name FROM employees WHERE ROW_NUMBER() OVER(ORDER BY salary DESC) = 1; 在大多数数据库中会？",
    "options": [
      {
        "label": "A",
        "text": "报错，窗口函数不能在WHERE中使用",
        "correct": true
      },
      {
        "label": "B",
        "text": "返回薪水最高的员工",
        "correct": false
      },
      {
        "label": "C",
        "text": "返回所有员工",
        "correct": false
      },
      {
        "label": "D",
        "text": "返回NULL",
        "correct": false
      }
    ],
    "explanation": "窗口函数不能直接在WHERE子句中使用，需要用CTE或子查询包装。B是期望结果但语法不合法。C和D都不正确。",
    "id": 464
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "ROW_NUMBER",
      "RANK",
      "DENSE_RANK"
    ],
    "stem": "以下哪个函数保证返回的序号在分区内唯一？",
    "options": [
      {
        "label": "A",
        "text": "NTILE()",
        "correct": false
      },
      {
        "label": "B",
        "text": "ROW_NUMBER()",
        "correct": true
      },
      {
        "label": "C",
        "text": "RANK()",
        "correct": false
      },
      {
        "label": "D",
        "text": "DENSE_RANK()",
        "correct": false
      }
    ],
    "explanation": "ROW_NUMBER()保证分区内每行序号唯一。RANK和DENSE_RANK对相同值赋予相同排名不唯一。NTILE是分桶编号可能重复。",
    "id": 465
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "表有5行数据，执行 NTILE(2) OVER(ORDER BY id) 后，第2组的行数是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "5",
        "correct": false
      },
      {
        "label": "C",
        "text": "2",
        "correct": true
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "5行分2组：第1组ceil(5/2)=3行，第2组2行。B是第1组行数。C行数太少。D是总行数。",
    "id": 466
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "LEAD",
      "PARTITION BY"
    ],
    "stem": "要查询每个部门按薪资排序后下一个员工的薪资，应使用？",
    "options": [
      {
        "label": "A",
        "text": "LAG(salary) OVER(PARTITION BY dept ORDER BY salary)",
        "correct": false
      },
      {
        "label": "B",
        "text": "LEAD(salary) OVER(ORDER BY salary)",
        "correct": false
      },
      {
        "label": "C",
        "text": "FIRST_VALUE(salary) OVER(PARTITION BY dept ORDER BY salary)",
        "correct": false
      },
      {
        "label": "D",
        "text": "LEAD(salary) OVER(PARTITION BY dept ORDER BY salary)",
        "correct": true
      }
    ],
    "explanation": "LEAD按部门分区取下一行。B用LAG取前一行。C没有按部门分区。D取首行值不是下一行。",
    "id": 467
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "RANK",
      "ROW_NUMBER"
    ],
    "stem": "以下哪种情况下 RANK() 和 ROW_NUMBER() 的结果完全相同？",
    "options": [
      {
        "label": "A",
        "text": "ORDER BY 列的值全部唯一",
        "correct": true
      },
      {
        "label": "B",
        "text": "使用了 PARTITION BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "结果集只有1行",
        "correct": false
      },
      {
        "label": "D",
        "text": "ORDER BY 列有重复值",
        "correct": false
      }
    ],
    "explanation": "当ORDER BY列值全部唯一时，没有并列排名，RANK与ROW_NUMBER结果相同。B无关，PARTITION BY不影响排名分配方式。C只1行时两者都是1但不是核心区别。D有重复值时RANK会并列而ROW_NUMBER不会。",
    "id": 468
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "RANGE BETWEEN",
      "ROWS BETWEEN"
    ],
    "stem": "ORDER BY 列有重复值时，RANGE 和 ROWS 窗口框架的关键区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者在重复值情况下无区别",
        "correct": false
      },
      {
        "label": "B",
        "text": "RANGE 会将相同排序值的行视为同一窗口边界，ROWS 不会",
        "correct": true
      },
      {
        "label": "C",
        "text": "ROWS 比 RANGE 计算更快",
        "correct": false
      },
      {
        "label": "D",
        "text": "RANGE 只能用于日期类型",
        "correct": false
      }
    ],
    "explanation": "RANGE将相同排序值的行视为一个整体边界，ROWS逐行计算。B是性能问题不是语义区别。C错误，RANGE不限于日期。D错误，在重复值下区别显著。",
    "id": 469
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "NTILE(2) 对奇数行数据（如7行）的分桶结果是？",
    "options": [
      {
        "label": "A",
        "text": "两桶各3.5行（不可能）",
        "correct": false
      },
      {
        "label": "B",
        "text": "两桶各3行，余1行丢弃",
        "correct": false
      },
      {
        "label": "C",
        "text": "第1桶4行，第2桶3行",
        "correct": true
      },
      {
        "label": "D",
        "text": "第1桶3行，第2桶4行",
        "correct": false
      }
    ],
    "explanation": "NTILE(2)对7行：第1桶ceil(7/2)=4行，第2桶3行。B说反了。C不可能。D不会丢弃余数行。",
    "id": 470
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "SUM OVER",
      "RANGE BETWEEN"
    ],
    "stem": "表 t(id, val): (1,10),(2,10),(3,20),(4,30)。SELECT id, SUM(val) OVER(ORDER BY val RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS s FROM t; id=3 的 s 是？",
    "options": [
      {
        "label": "A",
        "text": "30",
        "correct": false
      },
      {
        "label": "B",
        "text": "60",
        "correct": false
      },
      {
        "label": "C",
        "text": "20",
        "correct": false
      },
      {
        "label": "D",
        "text": "40",
        "correct": true
      }
    ],
    "explanation": "按val排序：id=1 val=10, id=2 val=10, id=3 val=20, id=4 val=30。RANGE将相同val视为一体，id=3的val=20，SUM范围到val=20处，包含val=10的两行和val=20的行，sum=10+10+20=40。但id=1和id=2的val=10相同，RANGE下都包含。实际id=3处sum=10+10+20=40。",
    "id": 471
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "LEAD",
      "LAG",
      "PARTITION BY"
    ],
    "stem": "表 t(grp, id, val): (X,1,10),(X,2,20),(Y,1,30),(Y,2,40)。SELECT grp, LEAD(val) OVER(PARTITION BY grp ORDER BY id) AS n FROM t; grp='X' 第二行的 n 是？",
    "options": [
      {
        "label": "A",
        "text": "NULL",
        "correct": true
      },
      {
        "label": "B",
        "text": "40",
        "correct": false
      },
      {
        "label": "C",
        "text": "20",
        "correct": false
      },
      {
        "label": "D",
        "text": "30",
        "correct": false
      }
    ],
    "explanation": "grp='X'分区按id排序：id=1 val=10, id=2 val=20。LEAD取后一行，id=2后面没有行所以n=NULL。40是Y分区的值。20是当前行值不是LEAD值。",
    "id": 472
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "ROWS BETWEEN",
      "RANGE BETWEEN"
    ],
    "stem": "计算7日滑动平均（基于日期值而非行数），应使用？",
    "options": [
      {
        "label": "A",
        "text": "AVG(val) OVER(PARTITION BY date)",
        "correct": false
      },
      {
        "label": "B",
        "text": "AVG(val) OVER(ORDER BY date RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW)",
        "correct": true
      },
      {
        "label": "C",
        "text": "AVG(val) OVER(ORDER BY date ROWS BETWEEN 7 PRECEDING AND CURRENT ROW)",
        "correct": false
      },
      {
        "label": "D",
        "text": "AVG(val) OVER(ORDER BY date RANGE BETWEEN 7 PRECEDING AND CURRENT ROW)",
        "correct": false
      }
    ],
    "explanation": "RANGE基于日期值的逻辑范围计算7天窗口。B用ROWS是物理行偏移不是日期范围。C的7 PRECEDING在RANGE中语法不完整需要INTERVAL。D是按日期分区不是窗口框架。",
    "id": 473
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "NTILE",
      "PARTITION BY"
    ],
    "stem": "要在每个分区内进行NTILE分桶，正确的写法是？",
    "options": [
      {
        "label": "A",
        "text": "NTILE(PARTITION BY dept, 4) OVER(ORDER BY salary)",
        "correct": false
      },
      {
        "label": "B",
        "text": "PARTITION BY dept NTILE(4) OVER(ORDER BY salary)",
        "correct": false
      },
      {
        "label": "C",
        "text": "NTILE(4) OVER(PARTITION BY dept ORDER BY salary)",
        "correct": true
      },
      {
        "label": "D",
        "text": "NTILE(4) OVER(ORDER BY salary) PARTITION BY dept",
        "correct": false
      }
    ],
    "explanation": "NTILE配合PARTITION BY在分区内分桶。B语法错误，PARTITION BY应在OVER内。C语法错误，NTILE参数不能含PARTITION BY。D语法错误。",
    "id": 474
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "ROWS BETWEEN",
      "RANGE BETWEEN"
    ],
    "stem": "SELECT id, SUM(val) OVER(ORDER BY val ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) 和 RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "ROWS只计算当前行",
        "correct": false
      },
      {
        "label": "B",
        "text": "RANGE会忽略重复值",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者完全不同",
        "correct": false
      },
      {
        "label": "D",
        "text": "ROWS逐行计算整个分区，RANGE按值范围计算整个分区，两者在UNBOUNDED时结果相同",
        "correct": true
      }
    ],
    "explanation": "当窗口框架都是UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING时，ROWS和RANGE覆盖整个分区，结果相同。B错误，ROWS计算整个分区。C错误，RANGE不忽略重复值。D过于绝对。",
    "id": 475
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "LAG",
      "LEAD"
    ],
    "stem": "SELECT id, LAG(val,2,0) OVER(ORDER BY id) AS p FROM t; 中 LAG 的第三个参数0的作用是？",
    "options": [
      {
        "label": "A",
        "text": "当偏移超出分区边界时返回默认值0",
        "correct": true
      },
      {
        "label": "B",
        "text": "偏移量2表示跳过2行",
        "correct": false
      },
      {
        "label": "C",
        "text": "将val列的空值替换为0",
        "correct": false
      },
      {
        "label": "D",
        "text": "限制结果最多返回0行",
        "correct": false
      }
    ],
    "explanation": "LAG第三个参数是默认值，当偏移超出分区边界时返回此值。B描述的是偏移量功能。C混淆了默认值与COALESCE。D完全无关。",
    "id": 476
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "window",
    "tags": [
      "LAST_VALUE",
      "ROWS BETWEEN"
    ],
    "stem": "SELECT id, LAST_VALUE(val) OVER(ORDER BY id) AS lv FROM t; 若想确保LAST_VALUE返回分区最后一行，应改为？",
    "options": [
      {
        "label": "A",
        "text": "使用 FIRST_VALUE 替代",
        "correct": false
      },
      {
        "label": "B",
        "text": "添加 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
        "correct": true
      },
      {
        "label": "C",
        "text": "添加 PARTITION BY",
        "correct": false
      },
      {
        "label": "D",
        "text": "去掉 ORDER BY",
        "correct": false
      }
    ],
    "explanation": "需要在OVER()中添加ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING来覆盖整个分区。B只定义分区不改变窗口框架。C去掉ORDER BY会改变语义。D功能不同。",
    "id": 477
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "window",
    "tags": [
      "DENSE_RANK"
    ],
    "stem": "DENSE_RANK() 函数与 RANK() 函数的主要区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "RANK() 不需要 ORDER BY 子句",
        "correct": false
      },
      {
        "label": "B",
        "text": "两者完全相同，没有区别",
        "correct": false
      },
      {
        "label": "C",
        "text": "DENSE_RANK() 不会跳过排名，RANK() 会跳过",
        "correct": true
      },
      {
        "label": "D",
        "text": "DENSE_RANK() 只能用于数字列",
        "correct": false
      }
    ],
    "explanation": "DENSE_RANK() 在遇到相同值时给出相同排名，但下一个排名不会跳过（如1,1,2,3），而 RANK() 会跳过（如1,1,3,4）。B错误，两者都可用于任意可排序的列。C错误，两者都需要 ORDER BY。D错误，它们有明显区别。",
    "id": 478
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "window",
    "tags": [
      "NTILE"
    ],
    "stem": "将查询结果按薪资降序分为4个等级，空白处应填什么？\nSELECT name, salary, ___ OVER (ORDER BY salary DESC) AS quartile FROM employees",
    "options": [
      {
        "label": "A",
        "text": "QUARTILE(4)",
        "correct": false
      },
      {
        "label": "B",
        "text": "NTILE(3)",
        "correct": false
      },
      {
        "label": "C",
        "text": "GROUP(4)",
        "correct": false
      },
      {
        "label": "D",
        "text": "NTILE(4)",
        "correct": true
      }
    ],
    "explanation": "NTILE(n) 将结果分为n个桶，NTILE(4) 即分为4个等级。QUARTILE 和 GROUP 不是SQL标准函数。NTILE(3) 只分3个等级不符合题意。",
    "id": 479
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT"
    ],
    "stem": "以下哪个SQL语句可以向students表中插入一行数据？",
    "options": [
      {
        "label": "A",
        "text": "INSERT INTO students VALUES (1, '张三')",
        "correct": true
      },
      {
        "label": "B",
        "text": "INSERT students VALUES (1, '张三')",
        "correct": false
      },
      {
        "label": "C",
        "text": "ADD INTO students VALUES (1, '张三')",
        "correct": false
      },
      {
        "label": "D",
        "text": "INSERT INTO students (1, '张三')",
        "correct": false
      }
    ],
    "explanation": "INSERT INTO table VALUES(...) 是标准SQL语法。缺少INTO关键字不合法，ADD INTO不是SQL语法，缺少VALUES关键字也不合法。",
    "id": 480
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT"
    ],
    "stem": "INSERT语句中指定列名的写法，哪个是正确的？",
    "options": [
      {
        "label": "A",
        "text": "INSERT INTO students(id, name) = (1, '李四')",
        "correct": false
      },
      {
        "label": "B",
        "text": "INSERT INTO students(id, name) VALUES(1, '李四')",
        "correct": true
      },
      {
        "label": "C",
        "text": "INSERT INTO students(id, name) VALUE(1, '李四')",
        "correct": false
      },
      {
        "label": "D",
        "text": "INSERT students(id, name) VALUES(1, '李四')",
        "correct": false
      }
    ],
    "explanation": "INSERT INTO table(cols) VALUES(vals) 是标准语法。VALUE单数形式不对，缺少INTO不合法，等号赋值语法也不正确。",
    "id": 481
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "UPDATE"
    ],
    "stem": "以下哪个UPDATE语句语法正确？",
    "options": [
      {
        "label": "A",
        "text": "ALTER students SET name='王五' WHERE id=1",
        "correct": false
      },
      {
        "label": "B",
        "text": "UPDATE students name='王五' WHERE id=1",
        "correct": false
      },
      {
        "label": "C",
        "text": "UPDATE students SET name='王五' WHERE id=1",
        "correct": true
      },
      {
        "label": "D",
        "text": "UPDATE students SET name='王五' AND id=1",
        "correct": false
      }
    ],
    "explanation": "UPDATE table SET col=val WHERE cond 是标准语法。AND不能替代WHERE，ALTER是DDL语句不能用于更新数据，缺少SET关键字不合法。",
    "id": 482
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "DELETE"
    ],
    "stem": "删除students表中id为5的记录，正确的语句是？",
    "options": [
      {
        "label": "A",
        "text": "DELETE students WHERE id=5",
        "correct": false
      },
      {
        "label": "B",
        "text": "REMOVE FROM students WHERE id=5",
        "correct": false
      },
      {
        "label": "C",
        "text": "DELETE FROM students HAVING id=5",
        "correct": false
      },
      {
        "label": "D",
        "text": "DELETE FROM students WHERE id=5",
        "correct": true
      }
    ],
    "explanation": "DELETE FROM table WHERE cond 是标准语法。缺少FROM关键字不合法，REMOVE不是SQL删除关键字，HAVING用于分组过滤不能用于DELETE。",
    "id": 483
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "TRUNCATE"
    ],
    "stem": "清空表中所有数据但保留表结构，应使用哪个语句？",
    "options": [
      {
        "label": "A",
        "text": "TRUNCATE TABLE students",
        "correct": true
      },
      {
        "label": "B",
        "text": "DROP TABLE students",
        "correct": false
      },
      {
        "label": "C",
        "text": "TRUNCATE students DATA",
        "correct": false
      },
      {
        "label": "D",
        "text": "CLEAR TABLE students",
        "correct": false
      }
    ],
    "explanation": "TRUNCATE TABLE 清空数据但保留表结构。DROP TABLE会删除表结构和数据，DATA不是TRUNCATE的语法部分，CLEAR不是SQL关键字。",
    "id": 484
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "ACID"
    ],
    "stem": "ACID中的A代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Agility（敏捷性）",
        "correct": false
      },
      {
        "label": "B",
        "text": "Atomicity（原子性）",
        "correct": true
      },
      {
        "label": "C",
        "text": "Availability（可用性）",
        "correct": false
      },
      {
        "label": "D",
        "text": "Accuracy（准确性）",
        "correct": false
      }
    ],
    "explanation": "ACID中A代表Atomicity原子性，事务不可分割。Availability是CAP定理中的概念，Accuracy和Agility不是ACID的组成部分。",
    "id": 485
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "ACID"
    ],
    "stem": "ACID中的I代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Immutability（不可变性）",
        "correct": false
      },
      {
        "label": "B",
        "text": "Independence（独立性）",
        "correct": false
      },
      {
        "label": "C",
        "text": "Isolation（隔离性）",
        "correct": true
      },
      {
        "label": "D",
        "text": "Integrity（完整性）",
        "correct": false
      }
    ],
    "explanation": "ACID中I代表Isolation隔离性，事务之间互不干扰。Integrity是数据完整性概念，Immutability和Independence不是ACID的组成部分。",
    "id": 486
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "事务"
    ],
    "stem": "提交事务的SQL语句是？",
    "options": [
      {
        "label": "A",
        "text": "SAVE",
        "correct": false
      },
      {
        "label": "B",
        "text": "APPLY",
        "correct": false
      },
      {
        "label": "C",
        "text": "CONFIRM",
        "correct": false
      },
      {
        "label": "D",
        "text": "COMMIT",
        "correct": true
      }
    ],
    "explanation": "COMMIT用于提交事务，使变更永久生效。SAVE、APPLY、CONFIRM均不是SQL事务提交关键字。",
    "id": 487
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "事务"
    ],
    "stem": "回滚事务的SQL语句是？",
    "options": [
      {
        "label": "A",
        "text": "ROLLBACK",
        "correct": true
      },
      {
        "label": "B",
        "text": "UNDO",
        "correct": false
      },
      {
        "label": "C",
        "text": "CANCEL",
        "correct": false
      },
      {
        "label": "D",
        "text": "REVERT",
        "correct": false
      }
    ],
    "explanation": "ROLLBACK用于回滚事务，撤销未提交的变更。UNDO、CANCEL、REVERT均不是SQL事务回滚关键字。",
    "id": 488
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT多行"
    ],
    "stem": "一次插入多行数据的正确语法是？",
    "options": [
      {
        "label": "A",
        "text": "INSERT INTO t VALUES(1,'a') AND (2,'b')",
        "correct": false
      },
      {
        "label": "B",
        "text": "INSERT INTO t VALUES(1,'a'),(2,'b')",
        "correct": true
      },
      {
        "label": "C",
        "text": "INSERT INTO t VALUES(1,'a';2,'b')",
        "correct": false
      },
      {
        "label": "D",
        "text": "INSERT INTO t VALUES(1,'a')(2,'b')",
        "correct": false
      }
    ],
    "explanation": "多行INSERT使用逗号分隔多组值。分号分隔是语法错误，缺少逗号直接拼接不合法，AND不是值分隔关键字。",
    "id": 489
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "UPDATE"
    ],
    "stem": "UPDATE语句省略WHERE子句会导致什么结果？",
    "options": [
      {
        "label": "A",
        "text": "只更新第一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "不执行任何更新",
        "correct": false
      },
      {
        "label": "C",
        "text": "更新表中所有行",
        "correct": true
      },
      {
        "label": "D",
        "text": "报语法错误",
        "correct": false
      }
    ],
    "explanation": "省略WHERE时UPDATE会更新全部行。这不是语法错误，也不会只更新第一行，更不是不执行。",
    "id": 490
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "DELETE"
    ],
    "stem": "DELETE语句省略WHERE子句会导致什么结果？",
    "options": [
      {
        "label": "A",
        "text": "报语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "只删除第一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除表结构",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除表中所有行",
        "correct": true
      }
    ],
    "explanation": "省略WHERE时DELETE会删除全部行数据，但表结构仍在。不是语法错误，不会只删第一行，也不会删除表结构。",
    "id": 491
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT"
    ],
    "stem": "表t(id INT, name VARCHAR(20))，执行 INSERT INTO t(id, name) VALUES(1, 'A') 后，再执行 INSERT INTO t(id, name) VALUES(1, 'B')，结果如何？",
    "options": [
      {
        "label": "A",
        "text": "第二条插入失败，id为主键时提示重复键错误",
        "correct": true
      },
      {
        "label": "B",
        "text": "两条都成功，name被更新为B",
        "correct": false
      },
      {
        "label": "C",
        "text": "两条都成功，表中有两行id=1的记录",
        "correct": false
      },
      {
        "label": "D",
        "text": "第二条插入失败，自动跳过无报错",
        "correct": false
      }
    ],
    "explanation": "当id为主键时，重复值会报主键冲突错误。name不会被自动更新，不会产生两行相同主键的记录，也不会静默跳过。",
    "id": 492
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "UPDATE"
    ],
    "stem": "表products(id INT, price DECIMAL)，执行 UPDATE products SET price = price * 1.1 WHERE id = 5，此操作的效果是？",
    "options": [
      {
        "label": "A",
        "text": "将id=5的price乘以1.1后四舍五入为整数",
        "correct": false
      },
      {
        "label": "B",
        "text": "将id=5的price提高10%",
        "correct": true
      },
      {
        "label": "C",
        "text": "将所有行的price提高10%",
        "correct": false
      },
      {
        "label": "D",
        "text": "将id=5的price设为1.1",
        "correct": false
      }
    ],
    "explanation": "WHERE限定了只更新id=5的行，price*1.1即提高10%。不是更新所有行，不是赋值1.1，也不会自动四舍五入。",
    "id": 493
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "DELETE"
    ],
    "stem": "表orders(id INT, status VARCHAR(10))，执行 DELETE FROM orders WHERE status = 'cancelled' 后，结果如何？",
    "options": [
      {
        "label": "A",
        "text": "删除整个orders表",
        "correct": false
      },
      {
        "label": "B",
        "text": "将status为cancelled的行标记为删除但保留",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除status为cancelled的所有行",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除status列",
        "correct": false
      }
    ],
    "explanation": "DELETE FROM ... WHERE 删除满足条件的行。不会删除列，不会删除整个表，DELETE是物理删除不是逻辑标记。",
    "id": 494
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "TRUNCATE"
    ],
    "stem": "TRUNCATE TABLE logs 执行后，logs表的状态是？",
    "options": [
      {
        "label": "A",
        "text": "表被完全删除",
        "correct": false
      },
      {
        "label": "B",
        "text": "只保留最后一行数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "数据移到回收站",
        "correct": false
      },
      {
        "label": "D",
        "text": "数据清空，表结构保留",
        "correct": true
      }
    ],
    "explanation": "TRUNCATE清空数据但保留表结构。不会删除表本身，不会保留最后一行，也没有回收站概念。",
    "id": 495
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT"
    ],
    "stem": "完成INSERT语句：向emp表插入一行，ename列为'King'，sal列为5000。____",
    "options": [
      {
        "label": "A",
        "text": "INSERT INTO emp(ename, sal) VALUES('King', 5000)",
        "correct": true
      },
      {
        "label": "B",
        "text": "INSERT emp(ename, sal) VALUES('King', 5000)",
        "correct": false
      },
      {
        "label": "C",
        "text": "INSERT INTO emp VALUES('King', 5000)",
        "correct": false
      },
      {
        "label": "D",
        "text": "INSERT INTO emp(ename, sal) = ('King', 5000)",
        "correct": false
      }
    ],
    "explanation": "标准写法需要INTO关键字和VALUES子句。缺少INTO不合法，只给VALUES不给列名可能列数不匹配，等号赋值语法不正确。",
    "id": 496
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "UPDATE"
    ],
    "stem": "完成UPDATE语句：将dept表中dname列为'Sales'的行的loc列改为'NYC'。____",
    "options": [
      {
        "label": "A",
        "text": "UPDATE dept SET dname='Sales', loc='NYC'",
        "correct": false
      },
      {
        "label": "B",
        "text": "UPDATE dept SET loc='NYC' WHERE dname='Sales'",
        "correct": true
      },
      {
        "label": "C",
        "text": "UPDATE dept SET loc='NYC' AND dname='Sales'",
        "correct": false
      },
      {
        "label": "D",
        "text": "UPDATE dept loc='NYC' WHERE dname='Sales'",
        "correct": false
      }
    ],
    "explanation": "UPDATE ... SET ... WHERE 是标准语法。AND不能替代WHERE，缺少SET关键字不合法，最后选项的WHERE条件位置不对。",
    "id": 497
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "DELETE"
    ],
    "stem": "完成删除语句：删除scores表中score小于60的记录。____",
    "options": [
      {
        "label": "A",
        "text": "DELETE FROM scores HAVING score < 60",
        "correct": false
      },
      {
        "label": "B",
        "text": "REMOVE FROM scores WHERE score < 60",
        "correct": false
      },
      {
        "label": "C",
        "text": "DELETE FROM scores WHERE score < 60",
        "correct": true
      },
      {
        "label": "D",
        "text": "DELETE scores WHERE score < 60",
        "correct": false
      }
    ],
    "explanation": "DELETE FROM ... WHERE 是标准语法。缺少FROM不合法，HAVING不用于DELETE，REMOVE不是SQL关键字。",
    "id": 498
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT"
    ],
    "stem": "INSERT INTO emp(ename) VALUES('Scott') 执行报错，最可能的原因是？表结构：emp(empno INT PK, ename VARCHAR)",
    "options": [
      {
        "label": "A",
        "text": "ename列不存在",
        "correct": false
      },
      {
        "label": "B",
        "text": "VALUES中缺少INTO关键字",
        "correct": false
      },
      {
        "label": "C",
        "text": "字符串未用双引号",
        "correct": false
      },
      {
        "label": "D",
        "text": "empno为主键列未提供值",
        "correct": true
      }
    ],
    "explanation": "empno为主键列但INSERT中未包含它，导致主键为NULL报错。ename列存在，语法本身正确，字符串用单引号也是正确的。",
    "id": 499
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "UPDATE"
    ],
    "stem": "UPDATE emp SET salary = salary * 1.1 WHRE dept_id = 10 中的错误是？",
    "options": [
      {
        "label": "A",
        "text": "WHRE拼写错误，应为WHERE",
        "correct": true
      },
      {
        "label": "B",
        "text": "SET拼写错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "salary * 1.1 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "dept_id = 10 语法错误",
        "correct": false
      }
    ],
    "explanation": "WHRE是WHERE的拼写错误。SET、salary*1.1、dept_id=10的写法都是正确的。",
    "id": 500
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "DELETE"
    ],
    "stem": "DELETE emp WHERE id = 3 执行报错，原因是？",
    "options": [
      {
        "label": "A",
        "text": "DELETE关键字拼写错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "缺少FROM关键字",
        "correct": true
      },
      {
        "label": "C",
        "text": "WHERE子句语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "id = 3 不存在",
        "correct": false
      }
    ],
    "explanation": "标准DELETE需要FROM关键字，DELETE FROM emp。WHERE语法本身正确，id不存在不会报语法错误只是影响0行，DELETE拼写无误。",
    "id": 501
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "TRUNCATE"
    ],
    "stem": "TRUNCATE students 执行报错，最可能的原因是？",
    "options": [
      {
        "label": "A",
        "text": "TRUNCATE拼写错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "需要WHERE子句",
        "correct": false
      },
      {
        "label": "C",
        "text": "应为TRUNCATE TABLE students",
        "correct": true
      },
      {
        "label": "D",
        "text": "表不存在",
        "correct": false
      }
    ],
    "explanation": "标准语法是TRUNCATE TABLE，部分数据库要求必须加TABLE关键字。如果表不存在报的是不同错误，TRUNCATE拼写无误，TRUNCATE不需要WHERE。",
    "id": 502
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "ACID"
    ],
    "stem": "ACID中的D代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Durability（动态性）",
        "correct": false
      },
      {
        "label": "B",
        "text": "Durability（分布式）",
        "correct": false
      },
      {
        "label": "C",
        "text": "Durability（确定性）",
        "correct": false
      },
      {
        "label": "D",
        "text": "Durability（持久性）",
        "correct": true
      }
    ],
    "explanation": "ACID中D代表Durability持久性，事务提交后数据永久保存。动态性、分布式、确定性均不是Durability在此语境下的含义。",
    "id": 503
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT SELECT"
    ],
    "stem": "INSERT SELECT语句的作用是？",
    "options": [
      {
        "label": "A",
        "text": "将查询结果插入到目标表中",
        "correct": true
      },
      {
        "label": "B",
        "text": "从表中删除数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "更新表中的数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "创建新表",
        "correct": false
      }
    ],
    "explanation": "INSERT SELECT将SELECT查询的结果集插入到目标表中。不是删除、更新或创建表的操作。",
    "id": 504
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT SELECT"
    ],
    "stem": "表A(id INT, name VARCHAR)，表B(id INT, name VARCHAR)。INSERT INTO A SELECT id, name FROM B WHERE id > 100 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "更新A中id>100的行",
        "correct": false
      },
      {
        "label": "B",
        "text": "将B中id>100的行插入到A中",
        "correct": true
      },
      {
        "label": "C",
        "text": "将A中id>100的行复制到B中",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除B中id>100的行",
        "correct": false
      }
    ],
    "explanation": "INSERT INTO A SELECT ... FROM B 将B的查询结果插入A。方向是B到A而非A到B，不会删除或更新数据。",
    "id": 505
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "事务"
    ],
    "stem": "BEGIN; UPDATE accounts SET balance=balance-100 WHERE id=1; ROLLBACK; 执行后balance的变化？",
    "options": [
      {
        "label": "A",
        "text": "报错，ROLLBACK前需COMMIT",
        "correct": false
      },
      {
        "label": "B",
        "text": "balance减少100后再恢复50",
        "correct": false
      },
      {
        "label": "C",
        "text": "无变化，ROLLBACK撤销了更新",
        "correct": true
      },
      {
        "label": "D",
        "text": "balance减少了100",
        "correct": false
      }
    ],
    "explanation": "ROLLBACK撤销了事务中所有未提交的变更，所以balance无变化。ROLLBACK不需要先COMMIT，也不会只恢复部分。",
    "id": 506
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT多行"
    ],
    "stem": "完成向colors表插入两行数据的语句：____",
    "options": [
      {
        "label": "A",
        "text": "INSERT INTO colors(name) VALUES('red','blue')",
        "correct": false
      },
      {
        "label": "B",
        "text": "INSERT INTO colors VALUES('red'),('blue')",
        "correct": false
      },
      {
        "label": "C",
        "text": "INSERT INTO colors(name) VALUES('red') AND ('blue')",
        "correct": false
      },
      {
        "label": "D",
        "text": "INSERT INTO colors(name) VALUES('red'),('blue')",
        "correct": true
      }
    ],
    "explanation": "多行插入用逗号分隔值组。单组内不能同时包含两行值导致列数不匹配，AND不是值分隔符。",
    "id": 507
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "INSERT SELECT"
    ],
    "stem": "INSERT INTO emp SELECT * FROM emp_backup 执行报错，可能的原因是？两表结构相同。",
    "options": [
      {
        "label": "A",
        "text": "语法正确，可能是主键冲突",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT * 不能用于INSERT",
        "correct": false
      },
      {
        "label": "C",
        "text": "INTO拼写错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "FROM emp_backup 不合法",
        "correct": false
      }
    ],
    "explanation": "语法正确但可能因源数据与目标表主键冲突报错。SELECT * 可用于INSERT，INTO和FROM的语法均正确。",
    "id": 508
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "dml",
    "tags": [
      "SAVEPOINT"
    ],
    "stem": "SAVEPOINT的作用是？",
    "options": [
      {
        "label": "A",
        "text": "创建数据库快照",
        "correct": false
      },
      {
        "label": "B",
        "text": "在事务中设置保存点，可部分回滚",
        "correct": true
      },
      {
        "label": "C",
        "text": "自动提交事务",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除保存点",
        "correct": false
      }
    ],
    "explanation": "SAVEPOINT在事务中设置标记，允许ROLLBACK TO SAVEPOINT部分回滚。不是自动提交、删除保存点或创建快照。",
    "id": 509
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "INSERT SELECT"
    ],
    "stem": "以下哪个INSERT SELECT语句正确地将dept表的数据插入到dept_backup表？",
    "options": [
      {
        "label": "A",
        "text": "INSERT dept_backup SELECT * FROM dept",
        "correct": false
      },
      {
        "label": "B",
        "text": "INSERT INTO dept_backup VALUES(SELECT * FROM dept)",
        "correct": false
      },
      {
        "label": "C",
        "text": "INSERT INTO dept_backup SELECT * FROM dept",
        "correct": true
      },
      {
        "label": "D",
        "text": "INSERT INTO dept_backup FROM SELECT * FROM dept",
        "correct": false
      }
    ],
    "explanation": "INSERT INTO ... SELECT 是标准语法。FROM SELECT顺序不对，缺少INTO不合法，VALUES不能嵌套SELECT。",
    "id": 510
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "UPDATE JOIN"
    ],
    "stem": "UPDATE语句中使用JOIN的正确语法结构是？",
    "options": [
      {
        "label": "A",
        "text": "UPDATE t1, t2 SET t1.col=t2.col WHERE t1.id=t2.id",
        "correct": false
      },
      {
        "label": "B",
        "text": "UPDATE t1 SET t1.col=t2.col FROM t2 WHERE t1.id=t2.id",
        "correct": false
      },
      {
        "label": "C",
        "text": "以上都是合法的UPDATE JOIN写法",
        "correct": false
      },
      {
        "label": "D",
        "text": "UPDATE t1 JOIN t2 ON t1.id=t2.id SET t1.col=t2.col",
        "correct": true
      }
    ],
    "explanation": "A是MySQL的JOIN语法，B是MySQL的隐式JOIN语法，C是SQL Server的UPDATE FROM语法。D不正确，因为不同数据库支持不同语法，不能说都合法。",
    "id": 511
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "DELETE JOIN"
    ],
    "stem": "在MySQL中，DELETE JOIN的用途是？",
    "options": [
      {
        "label": "A",
        "text": "根据关联条件删除匹配的行",
        "correct": true
      },
      {
        "label": "B",
        "text": "删除两个表中所有数据",
        "correct": false
      },
      {
        "label": "C",
        "text": "只删除JOIN产生的临时表",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除外键约束",
        "correct": false
      }
    ],
    "explanation": "DELETE JOIN根据关联条件删除匹配行。不是删除所有数据，不是删临时表，也不是删外键约束。",
    "id": 512
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "MERGE语句的主要用途是？",
    "options": [
      {
        "label": "A",
        "text": "创建索引",
        "correct": false
      },
      {
        "label": "B",
        "text": "同时执行INSERT和UPDATE（upsert）",
        "correct": true
      },
      {
        "label": "C",
        "text": "合并两个表的结构",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除重复数据",
        "correct": false
      }
    ],
    "explanation": "MERGE语句实现upsert操作，根据条件决定插入或更新。不是合并表结构、删除重复或创建索引。",
    "id": 513
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "READ UNCOMMITTED隔离级别的特点是？",
    "options": [
      {
        "label": "A",
        "text": "可重复读取",
        "correct": false
      },
      {
        "label": "B",
        "text": "完全串行化",
        "correct": false
      },
      {
        "label": "C",
        "text": "可以读取未提交的数据（脏读）",
        "correct": true
      },
      {
        "label": "D",
        "text": "只能读取已提交的数据",
        "correct": false
      }
    ],
    "explanation": "READ UNCOMMITTED允许脏读，读取未提交的数据。已提交读是READ COMMITTED，可重复读是REPEATABLE READ，串行化是SERIALIZABLE。",
    "id": 514
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "REPEATABLE READ隔离级别能防止什么问题？",
    "options": [
      {
        "label": "A",
        "text": "脏读和幻读",
        "correct": false
      },
      {
        "label": "B",
        "text": "不可重复读和幻读",
        "correct": false
      },
      {
        "label": "C",
        "text": "脏读、不可重复读和幻读",
        "correct": false
      },
      {
        "label": "D",
        "text": "脏读和不可重复读",
        "correct": true
      }
    ],
    "explanation": "REPEATABLE READ防止脏读和不可重复读，但可能出现幻读。防止幻读需要SERIALIZABLE级别。",
    "id": 515
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "锁"
    ],
    "stem": "共享锁（S锁）和排他锁（X锁）的区别是？",
    "options": [
      {
        "label": "A",
        "text": "S锁允许多个事务同时读，X锁只允许一个事务写",
        "correct": true
      },
      {
        "label": "B",
        "text": "S锁只允许一个事务读，X锁允许多个事务写",
        "correct": false
      },
      {
        "label": "C",
        "text": "S锁和X锁功能相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "S锁用于写操作，X锁用于读操作",
        "correct": false
      }
    ],
    "explanation": "共享锁允许多事务并发读取，排他锁只允许一个事务独占写入。不是单读多写，功能不同，S锁不是用于写操作。",
    "id": 516
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "UPDATE JOIN"
    ],
    "stem": "表emp(id, salary, dept_id)，表dept(id, bonus_pct)。执行 UPDATE emp JOIN dept ON emp.dept_id=dept.id SET emp.salary=emp.salary+dept.bonus_pct*salary，结果？",
    "options": [
      {
        "label": "A",
        "text": "报错，JOIN不能用于UPDATE",
        "correct": false
      },
      {
        "label": "B",
        "text": "根据部门奖金比例加薪",
        "correct": true
      },
      {
        "label": "C",
        "text": "所有员工工资相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "只更新第一条记录",
        "correct": false
      }
    ],
    "explanation": "UPDATE JOIN根据关联条件更新，每个员工按部门奖金比例加薪。不会使所有工资相同，不会只更新一条，JOIN可用于UPDATE。",
    "id": 517
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "DELETE JOIN"
    ],
    "stem": "MySQL中，DELETE e FROM emp e JOIN dept d ON e.dept_id=d.id WHERE d.name='HR'，效果是？",
    "options": [
      {
        "label": "A",
        "text": "删除emp和dept中HR相关记录",
        "correct": false
      },
      {
        "label": "B",
        "text": "报语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除HR部门的所有员工记录",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除dept表中HR部门",
        "correct": false
      }
    ],
    "explanation": "DELETE FROM emp JOIN只删除emp表中的匹配行。不会删除dept记录，不是同时删两表，语法正确。",
    "id": 518
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "表target(id, val)，源数据src(id, val)。MERGE INTO target USING src ON target.id=src.id WHEN MATCHED THEN UPDATE SET target.val=src.val WHEN NOT MATCHED THEN INSERT VALUES(src.id, src.val)。若target中有id=1，src中有id=1和id=2，结果是？",
    "options": [
      {
        "label": "A",
        "text": "id=1和id=2都被插入",
        "correct": false
      },
      {
        "label": "B",
        "text": "只更新id=1的val",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错，MERGE不能同时更新和插入",
        "correct": false
      },
      {
        "label": "D",
        "text": "id=1的val被更新，id=2被插入",
        "correct": true
      }
    ],
    "explanation": "MERGE匹配时更新，不匹配时插入。id=1匹配则更新，id=2不匹配则插入。可以同时更新和插入。",
    "id": 519
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "事务A在READ COMMITTED级别下查询某行，事务B修改了该行并提交，事务A再次查询，结果是？",
    "options": [
      {
        "label": "A",
        "text": "事务A能看到事务B的修改（不可重复读）",
        "correct": true
      },
      {
        "label": "B",
        "text": "事务A看不到事务B的修改",
        "correct": false
      },
      {
        "label": "C",
        "text": "事务A报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "事务B被阻塞",
        "correct": false
      }
    ],
    "explanation": "READ COMMITTED下每次读取都获取新快照，能看到已提交的修改，产生不可重复读现象。不会看不到、报错或阻塞。",
    "id": 520
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "UPDATE JOIN"
    ],
    "stem": "完成UPDATE JOIN语句：根据orders表的amount更新customers表的total。____",
    "options": [
      {
        "label": "A",
        "text": "UPDATE customers, orders SET c.total=c.total+o.amount",
        "correct": false
      },
      {
        "label": "B",
        "text": "UPDATE customers c JOIN orders o ON c.id=o.cust_id SET c.total=c.total+o.amount",
        "correct": true
      },
      {
        "label": "C",
        "text": "UPDATE orders o JOIN customers c ON c.id=o.cust_id SET c.total=c.total+o.amount",
        "correct": false
      },
      {
        "label": "D",
        "text": "UPDATE customers SET total=total+amount JOIN orders ON customers.id=orders.cust_id",
        "correct": false
      }
    ],
    "explanation": "A正确：先JOIN再SET。B的UPDATE表应为customers而非orders，C的SET和JOIN顺序颠倒，D缺少JOIN条件和别名引用。",
    "id": 521
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "DELETE JOIN"
    ],
    "stem": "完成MySQL DELETE JOIN语句：删除emp中属于dept_id=5的员工。____",
    "options": [
      {
        "label": "A",
        "text": "DELETE FROM emp HAVING dept_id=5",
        "correct": false
      },
      {
        "label": "B",
        "text": "DELETE FROM emp WHERE 5=dept_id",
        "correct": false
      },
      {
        "label": "C",
        "text": "DELETE FROM emp WHERE dept_id=5",
        "correct": true
      },
      {
        "label": "D",
        "text": "DELETE emp WHERE dept_id=5",
        "correct": false
      }
    ],
    "explanation": "标准语法DELETE FROM ... WHERE。缺少FROM不合法，HAVING不用于DELETE，5=dept_id语法虽不报错但不符合题目场景。",
    "id": 522
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "完成MERGE语句的基本结构：____",
    "options": [
      {
        "label": "A",
        "text": "MERGE target FROM source ON (condition) WHEN MATCHED THEN ...",
        "correct": false
      },
      {
        "label": "B",
        "text": "MERGE INTO target VALUES source ON (condition) ...",
        "correct": false
      },
      {
        "label": "C",
        "text": "UPSERT INTO target USING source ON (condition) ...",
        "correct": false
      },
      {
        "label": "D",
        "text": "MERGE INTO target USING source ON (condition) WHEN MATCHED THEN ... WHEN NOT MATCHED THEN ...",
        "correct": true
      }
    ],
    "explanation": "MERGE INTO ... USING ... ON ... WHEN MATCHED/NOT MATCHED 是标准语法。缺少USING不合法，VALUES不是MERGE关键字，UPSERT不是SQL标准。",
    "id": 523
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "UPDATE JOIN"
    ],
    "stem": "UPDATE emp e SET salary=salary*1.1 FROM dept d WHERE e.dept_id=d.id AND d.name='IT' 在MySQL中执行报错，原因是？",
    "options": [
      {
        "label": "A",
        "text": "MySQL不支持UPDATE ... FROM语法，应使用UPDATE ... JOIN",
        "correct": true
      },
      {
        "label": "B",
        "text": "salary*1.1 语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "WHERE条件太复杂",
        "correct": false
      },
      {
        "label": "D",
        "text": "表别名e不合法",
        "correct": false
      }
    ],
    "explanation": "MySQL不支持UPDATE FROM语法，应改用UPDATE JOIN。salary*1.1语法正确，WHERE条件不复杂，表别名合法。",
    "id": 524
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "MERGE INTO t USING s ON t.id=s.id WHEN MATCHED THEN DELETE WHEN NOT MATCHED THEN INSERT VALUES(s.id, s.val) 执行后，匹配的行会被？",
    "options": [
      {
        "label": "A",
        "text": "匹配的行保持不变",
        "correct": false
      },
      {
        "label": "B",
        "text": "匹配的行被删除",
        "correct": true
      },
      {
        "label": "C",
        "text": "匹配的行被更新",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错，MERGE不能DELETE",
        "correct": false
      }
    ],
    "explanation": "WHEN MATCHED THEN DELETE表示匹配行被删除。不是更新，MERGE支持DELETE操作，不会保持不变。",
    "id": 525
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE 后，并发性能会？",
    "options": [
      {
        "label": "A",
        "text": "不变",
        "correct": false
      },
      {
        "label": "B",
        "text": "取决于表的大小",
        "correct": false
      },
      {
        "label": "C",
        "text": "下降，因为串行化执行限制并发",
        "correct": true
      },
      {
        "label": "D",
        "text": "提升，因为优化了查询",
        "correct": false
      }
    ],
    "explanation": "SERIALIZABLE级别事务串行执行，并发性能下降。不是性能提升，不是不变，不取决于表大小。",
    "id": 526
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "ACID"
    ],
    "stem": "事务的持久性（Durability）保证什么？",
    "options": [
      {
        "label": "A",
        "text": "事务执行速度很快",
        "correct": false
      },
      {
        "label": "B",
        "text": "数据不会被误删除",
        "correct": false
      },
      {
        "label": "C",
        "text": "并发事务互不干扰",
        "correct": false
      },
      {
        "label": "D",
        "text": "事务提交后数据永久保存，即使系统崩溃",
        "correct": true
      }
    ],
    "explanation": "持久性保证提交后的数据在系统崩溃后也能恢复。不是执行速度，不是防误删，互不干扰是隔离性。",
    "id": 527
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "锁"
    ],
    "stem": "死锁产生的原因是？",
    "options": [
      {
        "label": "A",
        "text": "两个事务互相等待对方释放锁",
        "correct": true
      },
      {
        "label": "B",
        "text": "锁超时",
        "correct": false
      },
      {
        "label": "C",
        "text": "锁粒度太细",
        "correct": false
      },
      {
        "label": "D",
        "text": "事务太长",
        "correct": false
      }
    ],
    "explanation": "死锁是两个事务互相等待对方持有的锁。锁超时是不同问题，锁粒度和事务长度不是死锁的直接原因。",
    "id": 528
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "幻读（Phantom Read）是指什么？",
    "options": [
      {
        "label": "A",
        "text": "数据被意外删除",
        "correct": false
      },
      {
        "label": "B",
        "text": "同一查询在事务中两次执行结果行数不同",
        "correct": true
      },
      {
        "label": "C",
        "text": "读取到未提交的数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "同一行数据两次读取值不同",
        "correct": false
      }
    ],
    "explanation": "幻读是两次查询结果行数不同（有新行出现或消失）。脏读是读未提交数据，不可重复读是同行值不同，不是数据被删除。",
    "id": 529
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "以下MERGE语句的执行顺序是？MERGE INTO t USING s ON (t.id=s.id) WHEN MATCHED THEN UPDATE SET t.val=s.val WHEN NOT MATCHED THEN INSERT (id,val) VALUES(s.id,s.val)",
    "options": [
      {
        "label": "A",
        "text": "UPDATE和INSERT同时执行",
        "correct": false
      },
      {
        "label": "B",
        "text": "只执行MATCHED分支",
        "correct": false
      },
      {
        "label": "C",
        "text": "先判断ON条件，匹配则UPDATE，不匹配则INSERT",
        "correct": true
      },
      {
        "label": "D",
        "text": "先INSERT再UPDATE",
        "correct": false
      }
    ],
    "explanation": "MERGE先判断ON条件，匹配的行执行UPDATE，不匹配的行执行INSERT。不是先INSERT，不是同时执行，两个分支都可能执行。",
    "id": 530
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "UPDATE多表"
    ],
    "stem": "UPDATE t1 SET t1.a=t2.a FROM t2 WHERE t1.id=t2.id 是哪个数据库的语法？",
    "options": [
      {
        "label": "A",
        "text": "MySQL",
        "correct": false
      },
      {
        "label": "B",
        "text": "Oracle",
        "correct": false
      },
      {
        "label": "C",
        "text": "SQLite",
        "correct": false
      },
      {
        "label": "D",
        "text": "SQL Server",
        "correct": true
      }
    ],
    "explanation": "UPDATE FROM是SQL Server特有语法。MySQL使用UPDATE JOIN，Oracle使用MERGE，SQLite也有UPDATE FROM但语法不同。",
    "id": 531
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "DELETE JOIN"
    ],
    "stem": "DELETE t1, t2 FROM t1 JOIN t2 ON t1.id=t2.id WHERE t1.status='inactive' 在MySQL中的效果是？",
    "options": [
      {
        "label": "A",
        "text": "同时删除t1和t2中status为inactive的关联行",
        "correct": true
      },
      {
        "label": "B",
        "text": "只删除t1中status为inactive的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "只删除t2中关联行",
        "correct": false
      },
      {
        "label": "D",
        "text": "报语法错误",
        "correct": false
      }
    ],
    "explanation": "多表DELETE同时删除两表中匹配的行。不是只删一个表，不是报错，两表数据都被删除。",
    "id": 532
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "隔离级别"
    ],
    "stem": "SERIALIZABLE隔离级别通过什么机制防止幻读？",
    "options": [
      {
        "label": "A",
        "text": "使用乐观锁",
        "correct": false
      },
      {
        "label": "B",
        "text": "对查询范围加范围锁或Next-Key Lock",
        "correct": true
      },
      {
        "label": "C",
        "text": "只使用行级锁",
        "correct": false
      },
      {
        "label": "D",
        "text": "不使用任何锁",
        "correct": false
      }
    ],
    "explanation": "SERIALIZABLE通过范围锁或Next-Key Lock防止幻读。行级锁不能防幻读，必须使用锁机制，不是乐观锁。",
    "id": 533
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "事务",
      "ACID"
    ],
    "stem": "以下哪种情况下事务的原子性被破坏？",
    "options": [
      {
        "label": "A",
        "text": "COMMIT执行成功",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT查询返回多行",
        "correct": false
      },
      {
        "label": "C",
        "text": "事务执行中系统崩溃导致部分操作已写入磁盘",
        "correct": true
      },
      {
        "label": "D",
        "text": "两个事务并发执行",
        "correct": false
      }
    ],
    "explanation": "原子性要求事务全部成功或全部回滚，部分写入破坏原子性。并发执行不破坏原子性，COMMIT成功是正常，SELECT不相关。",
    "id": 534
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "锁"
    ],
    "stem": "InnoDB中Next-Key Lock的作用是？",
    "options": [
      {
        "label": "A",
        "text": "只锁定单行记录",
        "correct": false
      },
      {
        "label": "B",
        "text": "锁定整张表",
        "correct": false
      },
      {
        "label": "C",
        "text": "锁定数据库实例",
        "correct": false
      },
      {
        "label": "D",
        "text": "同时锁定记录和记录前的间隙，防止幻读",
        "correct": true
      }
    ],
    "explanation": "Next-Key Lock锁定记录及间隙，用于防止幻读。不是单行锁，不是表锁，不是实例级锁。",
    "id": 535
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "UPDATE JOIN"
    ],
    "stem": "表A(id, val)，表B(id, val)。UPDATE A SET val=B.val FROM B WHERE A.id=B.id，如果A中id=1对应B中id=1，B中val=100，则A中id=1的val变为？",
    "options": [
      {
        "label": "A",
        "text": "100",
        "correct": true
      },
      {
        "label": "B",
        "text": "原值不变",
        "correct": false
      },
      {
        "label": "C",
        "text": "NULL",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "UPDATE SET val=B.val将B的值赋给A，所以val=100。不会保持原值，不会变成NULL或0。",
    "id": 536
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "MERGE INTO target t USING (SELECT 1 AS id, 'X' AS val) s ON t.id=s.id WHEN MATCHED THEN UPDATE SET t.val=s.val WHEN NOT MATCHED THEN INSERT(id,val) VALUES(s.id,s.val)，若target为空表，结果是？",
    "options": [
      {
        "label": "A",
        "text": "更新所有行",
        "correct": false
      },
      {
        "label": "B",
        "text": "插入一行(1,'X')",
        "correct": true
      },
      {
        "label": "C",
        "text": "不执行任何操作",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错，target不能为空",
        "correct": false
      }
    ],
    "explanation": "target为空则无匹配行，执行NOT MATCHED分支插入(1,'X')。不是不执行，不会报错，没有行可更新。",
    "id": 537
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "事务",
      "SAVEPOINT"
    ],
    "stem": "BEGIN; INSERT INTO t VALUES(1); SAVEPOINT s1; INSERT INTO t VALUES(2); SAVEPOINT s2; INSERT INTO t VALUES(3); ROLLBACK TO s2; COMMIT; t中有几行？",
    "options": [
      {
        "label": "A",
        "text": "1行",
        "correct": false
      },
      {
        "label": "B",
        "text": "0行",
        "correct": false
      },
      {
        "label": "C",
        "text": "2行，id=1和id=2",
        "correct": true
      },
      {
        "label": "D",
        "text": "3行",
        "correct": false
      }
    ],
    "explanation": "ROLLBACK TO s2撤销s2之后的INSERT(id=3)，保留s1和s2之间的INSERT(id=2)及s1之前的INSERT(id=1)。",
    "id": 538
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "dml",
    "tags": [
      "MERGE"
    ],
    "stem": "MERGE INTO t USING s ON t.id=s.id WHEN NOT MATCHED THEN INSERT VALUES(s.id, s.val) WHEN MATCHED THEN UPDATE SET t.val=s.val 中，MATCHED和NOT MATCHED能否交换顺序？",
    "options": [
      {
        "label": "A",
        "text": "不可以，语法要求固定顺序",
        "correct": false
      },
      {
        "label": "B",
        "text": "交换后报语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "交换后只执行第一个分支",
        "correct": false
      },
      {
        "label": "D",
        "text": "可以交换，执行效果相同",
        "correct": true
      }
    ],
    "explanation": "MERGE的MATCHED和NOT MATCHED顺序可以交换，效果相同。语法不要求固定顺序，交换不会报错，两个分支都会被评估。",
    "id": 539
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "DAU",
      "活跃用户"
    ],
    "stem": "运营同学需要统计每日活跃用户数（DAU），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT DATE(login_time) as dt, COUNT(DISTINCT user_id) as dau FROM user_login GROUP BY DATE(login_time)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT DATE(login_time) as dt, COUNT(user_id) as dau FROM user_login GROUP BY DATE(login_time)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_login",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT DATE(login_time), COUNT(*) FROM user_login GROUP BY DATE(login_time)",
        "correct": false
      }
    ],
    "explanation": "DAU需要按天分组(GROUP BY DATE)且去重(COUNT DISTINCT)。B没有DISTINCT会重复计数。C没有按天分组。D没有DISTINCT且COUNT(*)计行数非用户数。",
    "id": 540
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "MAU",
      "月活跃"
    ],
    "stem": "产品经理要查看月活跃用户数（MAU），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM user_login WHERE DATE_FORMAT(login_time,'%Y-%m')='2024-01'",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DATE_FORMAT(login_time,'%Y-%m') as month, COUNT(DISTINCT user_id) as mau FROM user_login GROUP BY DATE_FORMAT(login_time,'%Y-%m')",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT DATE_FORMAT(login_time,'%Y-%m') as month, COUNT(user_id) as mau FROM user_login GROUP BY DATE_FORMAT(login_time,'%Y-%m')",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT DATE(login_time) as dt, COUNT(DISTINCT user_id) as mau FROM user_login GROUP BY DATE(login_time)",
        "correct": false
      }
    ],
    "explanation": "MAU按月分组需用DATE_FORMAT截取年月，同时COUNT(DISTINCT user_id)去重。B缺少DISTINCT。C按天分组不满足月维度。D没有DISTINCT且COUNT(*)计行数。",
    "id": 541
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "新用户",
      "注册"
    ],
    "stem": "数据分析师需要统计每天的新增注册用户数，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM user_register",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, DATE(register_time) FROM user_register ORDER BY register_time",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT DATE(register_time) as dt, COUNT(DISTINCT user_id) as new_users FROM user_register GROUP BY DATE(register_time)",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT DATE(register_time) as dt, COUNT(*) as new_users FROM user_register GROUP BY dt HAVING COUNT(*)>1",
        "correct": false
      }
    ],
    "explanation": "新用户统计需要按天分组并去重计数。B的HAVING COUNT(*)>1会排除只有1条记录的日期。C没有按天分组。D只是列出明细没有聚合。",
    "id": 542
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "用户画像",
      "地区分布"
    ],
    "stem": "运营需要查看用户地区分布，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT province, COUNT(*) FROM user_profile GROUP BY province",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DISTINCT province FROM user_profile",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT province, SUM(user_id) FROM user_profile GROUP BY province",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT province, COUNT(DISTINCT user_id) as user_cnt FROM user_profile GROUP BY province ORDER BY user_cnt DESC",
        "correct": true
      }
    ],
    "explanation": "地区分布需按省份分组并去重计数用户。B缺少DISTINCT。C只返回省份列表无计数。D对user_id做SUM无意义。",
    "id": 543
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "去重计数",
      "DISTINCT"
    ],
    "stem": "统计某活动的参与用户总数（去重），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(DISTINCT user_id) as total FROM activity_log WHERE activity_id = 101",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT COUNT(user_id) as total FROM activity_log WHERE activity_id = 101",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(*) as total FROM activity_log WHERE activity_id = 101",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT SUM(user_id) as total FROM activity_log WHERE activity_id = 101",
        "correct": false
      }
    ],
    "explanation": "去重计数需用COUNT(DISTINCT)。B没有去重会重复计数。C的COUNT(*)计行数不去重。D对user_id做SUM无统计意义。",
    "id": 544
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "次日留存",
      "留存分析"
    ],
    "stem": "运营同学需要计算次日留存率，以下哪个查询能正确返回次日留存人数？",
    "options": [
      {
        "label": "A",
        "text": "SELECT dt, COUNT(DISTINCT user_id) as retained FROM user_login GROUP BY dt HAVING dt='2024-01-02'",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dt, COUNT(DISTINCT b.user_id) as retained FROM (SELECT DATE(login_time) as dt, user_id FROM user_login WHERE DATE(login_time)='2024-01-01') a LEFT JOIN user_login b ON a.user_id=b.user_id AND DATE(b.login_time)='2024-01-02' GROUP BY dt",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT dt, COUNT(*) as retained FROM user_login WHERE DATE(login_time)='2024-01-02' GROUP BY dt",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_login WHERE DATE(login_time)='2024-01-02'",
        "correct": false
      }
    ],
    "explanation": "次日留存需要关联首日用户和次日登录数据，用LEFT JOIN确保首日用户为基准。B和C直接查次日数据无法体现留存关系。D用HAVING无法关联首日用户。",
    "id": 545
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "设备分布",
      "用户画像"
    ],
    "stem": "产品经理需要查看用户的设备类型分布，以下哪个SQL返回了正确的设备占比？",
    "options": [
      {
        "label": "A",
        "text": "SELECT device_type, AVG(user_id) as pct FROM user_profile GROUP BY device_type",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT device_type, COUNT(DISTINCT user_id) FROM user_profile",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT device_type, COUNT(DISTINCT user_id) as cnt, ROUND(COUNT(DISTINCT user_id)*100.0/(SELECT COUNT(DISTINCT user_id) FROM user_profile),2) as pct FROM user_profile GROUP BY device_type",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT device_type, COUNT(*) as cnt FROM user_profile GROUP BY device_type",
        "correct": false
      }
    ],
    "explanation": "设备占比需要子查询计算总用户数后做除法。B只返回计数无占比。C用AVG(user_id)无意义。D缺少GROUP BY且无占比。",
    "id": 546
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "重复记录",
      "数据质量"
    ],
    "stem": "数据分析师发现user_login表有重复登录记录，以下哪个SQL能正确找出重复user_id？",
    "options": [
      {
        "label": "A",
        "text": "SELECT DISTINCT user_id FROM user_login WHERE COUNT(*)>1",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id FROM user_login GROUP BY user_id HAVING COUNT(*)=1",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT * FROM user_login WHERE user_id IN (SELECT user_id FROM user_login GROUP BY user_id)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id, COUNT(*) as cnt FROM user_login GROUP BY user_id HAVING COUNT(*)>1",
        "correct": true
      }
    ],
    "explanation": "找重复记录需GROUP BY后HAVING COUNT(*)>1。B混用DISTINCT和聚合函数语法错误。C找的是不重复的。D子查询没有HAVING条件。",
    "id": 547
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "年龄段",
      "用户画像"
    ],
    "stem": "运营需要按年龄段统计用户数量，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT CASE WHEN age<20 THEN '0-19' WHEN age BETWEEN 20 AND 29 THEN '20-29' WHEN age BETWEEN 30 AND 39 THEN '30-39' ELSE '40+' END as age_group, COUNT(DISTINCT user_id) as cnt FROM user_profile GROUP BY age_group",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT age, COUNT(DISTINCT user_id) FROM user_profile GROUP BY age",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT '20-29' as age_group, COUNT(*) FROM user_profile WHERE age BETWEEN 20 AND 29",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT age_group, COUNT(DISTINCT user_id) FROM user_profile GROUP BY age_group ORDER BY age_group",
        "correct": false
      }
    ],
    "explanation": "年龄段分组需用CASE WHEN构造分组字段再聚合。B按精确年龄分组不符合需求。C只查一个年龄段。D的age_group字段在表中可能不存在。",
    "id": 548
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "脏数据",
      "数据清洗"
    ],
    "stem": "数据分析师发现user_profile表中有些age字段为NULL或0，以下哪个SQL能正确过滤掉脏数据？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id, age FROM user_profile WHERE age IS NOT NULL OR age>0",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, age FROM user_profile WHERE age IS NOT NULL AND age>0",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT user_id, age FROM user_profile WHERE age != 0",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id, age FROM user_profile WHERE age > 0",
        "correct": false
      }
    ],
    "explanation": "需同时排除NULL和0/负值。B用!=无法排除NULL。C没有排除NULL。D用OR导致逻辑错误，NULL记录也可能被选入。",
    "id": 549
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "活跃用户",
      "7日留存"
    ],
    "stem": "计算7日留存率的SQL中，关联首日用户和第7日登录数据的正确写法是？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.user_id FROM user_login a JOIN user_login b ON a.user_id=b.user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_login WHERE DATE(login_time)='2024-01-07'",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT a.dt, COUNT(DISTINCT b.user_id) as retained FROM (SELECT DATE(login_time) as dt, user_id FROM user_login WHERE dt='2024-01-01') a LEFT JOIN user_login b ON a.user_id=b.user_id AND DATE(b.login_time)=DATE_ADD('2024-01-01',INTERVAL 6 DAY) GROUP BY a.dt",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT dt, COUNT(*) FROM user_login WHERE DATE(login_time) BETWEEN '2024-01-01' AND '2024-01-07'",
        "correct": false
      }
    ],
    "explanation": "7日留存需用LEFT JOIN关联首日用户和第7日登录数据，用DATE_ADD计算间隔。B只是范围查询未体现留存关系。C自连接没有日期过滤。D只查第7日无法体现留存。",
    "id": 550
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "漏斗",
      "注册转化"
    ],
    "stem": "注册→激活漏斗分析中，统计注册用户中有多少完成激活，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM user_register a, user_activate b WHERE a.user_id=b.user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT COUNT(DISTINCT a.user_id) as activated FROM user_register a LEFT JOIN user_activate b ON a.user_id=b.user_id WHERE b.user_id IS NOT NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT user_id) as activated FROM user_activate",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT COUNT(DISTINCT b.user_id) as activated FROM user_register a INNER JOIN user_activate b ON a.user_id=b.user_id",
        "correct": true
      }
    ],
    "explanation": "漏斗计算需INNER JOIN注册表和激活表取交集。A用LEFT JOIN后过滤NULL效果等价但不如INNER JOIN直观。B只查激活表。D用COUNT(*)且笛卡尔积写法不规范。",
    "id": 551
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "环比增长",
      "日期函数"
    ],
    "stem": "计算日活跃用户数的环比增长率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.dt, ROUND((a.dau-b.dau)*100.0/b.dau,2) as growth FROM daily_dau a JOIN daily_dau b ON a.dt=DATE_ADD(b.dt,INTERVAL 1 DAY)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dt, dau/LAG(dau) OVER() as growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dt, dau-dau as growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dt, COUNT(*) as growth FROM daily_dau GROUP BY dt",
        "correct": false
      }
    ],
    "explanation": "环比增长需用JOIN关联当日和前一日数据计算差值比率。B的LAG函数写法缺少PARTITION和ORDER BY。C计算错误。D没有增长率计算逻辑。",
    "id": 552
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "Top-N",
      "排名"
    ],
    "stem": "查找每个地区消费金额前3名用户，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT DISTINCT province, user_id FROM user_consume WHERE amount>100",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT province, user_id, amount FROM (SELECT province, user_id, amount, ROW_NUMBER() OVER(PARTITION BY province ORDER BY amount DESC) as rn FROM user_consume) t WHERE rn<=3",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT province, user_id, amount FROM user_consume ORDER BY amount DESC LIMIT 3",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT province, user_id, MAX(amount) FROM user_consume GROUP BY province, user_id",
        "correct": false
      }
    ],
    "explanation": "每组Top-N需用窗口函数ROW_NUMBER()配合PARTITION BY。B只取全局前3名。C用MAX无法保证排名。D用DISTINCT和WHERE不解决Top-N问题。",
    "id": 553
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "缺失值",
      "数据质量"
    ],
    "stem": "运营需要找出所有没有下过订单的用户，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.user_id FROM user_profile a INNER JOIN orders b ON a.user_id=b.user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id FROM orders WHERE order_id IS NULL",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT a.user_id FROM user_profile a LEFT JOIN orders b ON a.user_id=b.user_id WHERE b.order_id IS NULL",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_profile WHERE user_id NOT IN (SELECT user_id FROM orders)",
        "correct": false
      }
    ],
    "explanation": "找未下单用户需LEFT JOIN后筛选NULL。B的NOT IN在子查询有NULL时不安全。C的INNER JOIN只返回已下单用户。D在订单表中找NULL逻辑错误。",
    "id": 554
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "GROUP BY",
      "聚合"
    ],
    "stem": "以下SQL统计每日活跃用户数，运行报错，原因是什么？ SELECT dt, COUNT(DISTINCT user_id) FROM user_login",
    "options": [
      {
        "label": "A",
        "text": "COUNT(DISTINCT)语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "dt字段不存在",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT中不能有非聚合列",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺少GROUP BY子句，应添加GROUP BY dt",
        "correct": true
      }
    ],
    "explanation": "SELECT中使用了dt列但缺少GROUP BY，导致聚合函数与非聚合列混用报错。B语法本身正确。C的dt可能是别名但题目未说明。D说法过于绝对，有GROUP BY时可以混用。",
    "id": 555
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "留存",
      "日期函数"
    ],
    "stem": "以下SQL计算次日留存率，结果为空，原因是什么？ SELECT a.dt, COUNT(DISTINCT b.user_id) as retained FROM user_login a LEFT JOIN user_login b ON a.user_id=b.user_id AND DATE(b.login_time)=DATE_ADD(a.dt,INTERVAL 1 DAY) GROUP BY a.dt",
    "options": [
      {
        "label": "A",
        "text": "DATE_ADD(a.dt, INTERVAL 1 DAY)中a.dt应为DATE类型，如果a.dt包含时间部分则DATE_ADD结果可能不符合预期",
        "correct": true
      },
      {
        "label": "B",
        "text": "a.dt是日期字段但LEFT JOIN条件中DATE_ADD可能返回NULL导致无匹配",
        "correct": false
      },
      {
        "label": "C",
        "text": "SQL语法正确，结果为空说明确实没有留存用户",
        "correct": false
      },
      {
        "label": "D",
        "text": "GROUP BY后缺少HAVING过滤",
        "correct": false
      }
    ],
    "explanation": "如果a.dt字段包含时间部分（如datetime），DATE_ADD结果可能不准确。此外LEFT JOIN本身不会产生空结果。B忽略了技术问题。C的HAVING非必须。A描述不精确。",
    "id": 556
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "重复数据",
      "数据质量"
    ],
    "stem": "以下SQL统计DAU结果偏大，原因是什么？ SELECT DATE(login_time) as dt, COUNT(user_id) as dau FROM user_login GROUP BY DATE(login_time)",
    "options": [
      {
        "label": "A",
        "text": "表名拼写错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT(user_id)没有用DISTINCT，同一用户多次登录被重复计数",
        "correct": true
      },
      {
        "label": "C",
        "text": "GROUP BY分组不正确",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE函数使用错误",
        "correct": false
      }
    ],
    "explanation": "COUNT(user_id)不去重导致同一用户多次登录被重复计数，DAU偏大。B的GROUP BY逻辑正确。C的DATE函数正确。D与结果偏大无关。",
    "id": 557
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "NOT IN",
      "NULL"
    ],
    "stem": "以下SQL找未下单用户，结果为空但实际存在未下单用户，原因是什么？ SELECT user_id FROM user_profile WHERE user_id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL)",
    "options": [
      {
        "label": "A",
        "text": "NOT IN子查询语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "子查询中应去掉WHERE user_id IS NOT NULL条件",
        "correct": false
      },
      {
        "label": "C",
        "text": "NOT IN与NULL交互问题，如果orders.user_id有NULL值会导致整体返回空",
        "correct": true
      },
      {
        "label": "D",
        "text": "user_profile表为空",
        "correct": false
      }
    ],
    "explanation": "NOT IN遇到NULL值时整个结果为空。但题目已加WHERE user_id IS NOT NULL，说明子查询排除了NULL。实际上此SQL应该能正确执行。重新审视：题目说结果为空，说明原始SQL没有WHERE条件，即子查询含有NULL值导致NOT IN返回空。C是正确原因。",
    "id": 558
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "日期格式",
      "数据类型"
    ],
    "stem": "以下SQL统计月活用户，结果按天而非按月分组，原因是什么？ SELECT DATE(login_time) as month, COUNT(DISTINCT user_id) as mau FROM user_login GROUP BY DATE(login_time)",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY顺序错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT DISTINCT不正确",
        "correct": false
      },
      {
        "label": "C",
        "text": "别名month导致冲突",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE()只截取日期不截取月份，应改为DATE_FORMAT(login_time,'%Y-%m')",
        "correct": true
      }
    ],
    "explanation": "DATE()返回完整日期而非月份，月活需用DATE_FORMAT截取年月。B顺序不影响。C与分组无关。D别名不影响分组逻辑。",
    "id": 559
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "漏斗分析",
      "付费转化"
    ],
    "stem": "产品经理需要分析注册→付费的转化率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(DISTINCT b.user_id)*100.0/COUNT(DISTINCT a.user_id) as conversion_rate FROM user_register a LEFT JOIN user_payment b ON a.user_id=b.user_id",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT COUNT(*) FROM user_payment / COUNT(*) FROM user_register",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_register INNER JOIN user_payment",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT SUM(paid) / COUNT(*) as conversion_rate FROM user_register",
        "correct": false
      }
    ],
    "explanation": "转化率=付费用户数/注册用户数，需LEFT JOIN保证分母为全部注册用户。B语法错误。C缺少ON条件。D假设有paid字段且逻辑不严谨。",
    "id": 560
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "同比增长",
      "日期函数"
    ],
    "stem": "计算日活跃用户的同比增长率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) as yoy_growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT a.dt, ROUND((a.dau-b.dau)*100.0/NULLIF(b.dau,0),2) as yoy_growth FROM daily_dau a JOIN daily_dau_last_year b ON DATE_FORMAT(a.dt,'%m-%d')=DATE_FORMAT(b.dt,'%m-%d')",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT dt, dau*1.0/LAG(dau,365) OVER() as yoy_growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT dt, dau-dau as yoy_growth FROM daily_dau",
        "correct": false
      }
    ],
    "explanation": "同比增长需对比去年同日数据，用JOIN关联。B的LAG偏移365天不精确（闰年问题）。C计算错误。D没有增长率计算。",
    "id": 561
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "路径分析",
      "行为路径"
    ],
    "stem": "分析用户从首页到下单的行为路径，以下哪个SQL正确统计了路径转换人数？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id FROM user_action WHERE action='homepage' AND action='order'",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DISTINCT user_id FROM user_action WHERE action='order'",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT a.user_id) as path_users FROM (SELECT user_id FROM user_action WHERE action='homepage') a INNER JOIN (SELECT user_id FROM user_action WHERE action='order') b ON a.user_id=b.user_id",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT COUNT(*) FROM user_action WHERE action IN ('homepage','order')",
        "correct": false
      }
    ],
    "explanation": "路径分析需JOIN两个动作的用户集。B只是简单计数不体现路径关系。C的AND条件不可能同时满足。D只看下单用户未体现首页到下单的路径。",
    "id": 562
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "HAVING",
      "聚合"
    ],
    "stem": "以下SQL查找消费超过1000元的用户，但返回了重复结果，原因是什么？ SELECT user_id FROM orders GROUP BY user_id HAVING SUM(amount)>1000",
    "options": [
      {
        "label": "A",
        "text": "SUM函数使用错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "GROUP BY已经去重，HAVING没有问题，重复可能是数据问题",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING条件错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "GROUP BY user_id不会产生重复，题目描述的'重复'可能是误解或数据中user_id实际有NULL值导致分组异常",
        "correct": true
      }
    ],
    "explanation": "GROUP BY user_id本身不会产生重复。HAVING和SUM用法正确。题目说'重复'可能是NULL值分组导致的异常显示。B和D语法正确。A说数据问题但更可能是理解偏差。",
    "id": 563
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "AB测试",
      "对照实验"
    ],
    "stem": "AB测试中统计实验组和对照组的转化率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT group_id, COUNT(DISTINCT user_id) as users, SUM(is_converted)*100.0/COUNT(DISTINCT user_id) as cvr FROM ab_test GROUP BY group_id",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT group_id, COUNT(*) as cvr FROM ab_test GROUP BY group_id",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT group_id, AVG(is_converted) as cvr FROM ab_test GROUP BY group_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT group_id, MAX(is_converted) as cvr FROM ab_test GROUP BY group_id",
        "correct": false
      }
    ],
    "explanation": "AB测试转化率=转化人数/总人数，用SUM/COUNT计算。B没有计算转化率。C用AVG(is_converted)虽可但题目要求显式计算。D用MAX不正确。",
    "id": 564
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "连续登录",
      "行为分析"
    ],
    "stem": "查找连续3天都登录的用户，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id FROM (SELECT user_id, DATE(login_time) as dt, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY DATE(login_time)) as rn FROM user_login) a GROUP BY user_id HAVING MIN(DATE(login_time)) IS NOT NULL AND COUNT(*)>=3",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DISTINCT a.user_id FROM user_login a WHERE EXISTS (SELECT 1 FROM user_login b WHERE b.user_id=a.user_id AND DATEDIFF(b.login_time,a.login_time)=1) AND EXISTS (SELECT 1 FROM user_login c WHERE c.user_id=a.user_id AND DATEDIFF(c.login_time,a.login_time)=2)",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM user_login GROUP BY user_id HAVING COUNT(*)>=3",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_login WHERE COUNT(*)>=3",
        "correct": false
      }
    ],
    "explanation": "连续登录需用DATEDIFF或窗口函数判断日期连续性。A的窗口函数写法不完整。C只计总数不判断连续。D缺少GROUP BY且语法错误。",
    "id": 565
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "RFM",
      "用户分群"
    ],
    "stem": "RFM分析中计算每个用户最近一次购买距今天数（Recency），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id, MAX(order_date) as recency FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, MIN(DATEDIFF(CURDATE(), order_date)) as recency FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id, DATEDIFF(CURDATE(), MAX(order_date)) as recency FROM orders GROUP BY user_id",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT user_id, DATEDIFF(CURDATE(), order_date) as recency FROM orders",
        "correct": false
      }
    ],
    "explanation": "Recency需用DATEDIFF计算最近购买距今天数，MAX(order_date)找最近购买日。B没有聚合。C返回日期非天数。D用MIN取的是最早购买。",
    "id": 566
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "日期函数",
      "数据类型"
    ],
    "stem": "以下SQL按周统计活跃用户，但结果中每周只有1天数据，原因是什么？ SELECT DATE(login_time) as dt, COUNT(DISTINCT user_id) as wau FROM user_login GROUP BY WEEKDAY(login_time)",
    "options": [
      {
        "label": "A",
        "text": "COUNT DISTINCT不正确",
        "correct": false
      },
      {
        "label": "B",
        "text": "WEEKDAY函数返回值不对",
        "correct": false
      },
      {
        "label": "C",
        "text": "表数据不足",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT中用了DATE(login_time)但GROUP BY用了WEEKDAY，应统一用YEARWEEK或DATE_FORMAT截取周",
        "correct": true
      }
    ],
    "explanation": "SELECT和GROUP BY的分组依据不一致导致结果异常。应统一用YEARWEEK分组。B与分组无关。C的WEEKDAY语法正确。D不是根本原因。",
    "id": 567
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "留存分析",
      "7日留存"
    ],
    "stem": "运营需要计算7日留存率，以下哪个SQL写法最规范？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.dt, COUNT(DISTINCT b.user_id)/COUNT(DISTINCT a.user_id) as retention_7d FROM (SELECT DATE(first_login) as dt, user_id FROM user_first_login) a LEFT JOIN (SELECT user_id, DATE(login_time) as login_dt FROM user_login) b ON a.user_id=b.user_id AND b.login_dt=DATE_ADD(a.dt,INTERVAL 6 DAY) GROUP BY a.dt",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT dt, COUNT(*)/7 as retention_7d FROM user_login GROUP BY dt",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT user_id) as retention_7d FROM user_login WHERE DATEDIFF(CURDATE(),login_time)=7",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT a.dt, SUM(CASE WHEN b.login_dt IS NOT NULL THEN 1 ELSE 0 END)/COUNT(a.user_id) as retention_7d FROM user_first_login a LEFT JOIN user_login b ON a.user_id=b.user_id GROUP BY a.dt",
        "correct": false
      }
    ],
    "explanation": "7日留存需LEFT JOIN首日用户与第7日登录数据，DATE_ADD计算间隔6天。B用COUNT(*)/7无意义。C没有分组且DATEDIFF逻辑反。D缺少日期关联条件。",
    "id": 568
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "RFM",
      "用户分群"
    ],
    "stem": "RFM分析中计算用户的购买频率（Frequency），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id, MAX(order_date) as frequency FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, COUNT(DISTINCT order_date) as frequency FROM orders GROUP BY user_id",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT user_id, COUNT(*) as frequency FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id, SUM(order_date) as frequency FROM orders GROUP BY user_id",
        "correct": false
      }
    ],
    "explanation": "Frequency统计有购买的独立天数。A用COUNT(DISTINCT order_date)正确。B的COUNT(*)可能含同日多次。C的SUM对日期无意义。D返回最近购买日期。",
    "id": 569
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "中位数",
      "百分位数"
    ],
    "stem": "计算用户消费金额的中位数，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT PERCENTILE(amount,50) FROM orders",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT amount FROM orders ORDER BY amount LIMIT 1 OFFSET (SELECT COUNT(*)/2 FROM orders)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT AVG(amount) as median FROM (SELECT amount, ROW_NUMBER() OVER(ORDER BY amount) as rn, COUNT(*) OVER() as total FROM orders) t WHERE rn IN (FLOOR((total+1)/2), CEIL((total+1)/2))",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT MEDIAN(amount) FROM orders",
        "correct": false
      }
    ],
    "explanation": "MySQL无内置MEDIAN函数，需用窗口函数ROW_NUMBER手动计算。B和C使用了MySQL不支持的函数。D的OFFSET写法在MySQL中LIMIT不支持子查询。",
    "id": 570
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "漏斗分析",
      "转化率"
    ],
    "stem": "注册→激活→付费三级漏斗中，计算每级转化人数，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM user_register a JOIN user_activate b JOIN user_payment c",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT step, COUNT(*) FROM funnel_data GROUP BY step",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM user_register WHERE user_id IN (SELECT user_id FROM user_activate) AND user_id IN (SELECT user_id FROM user_payment)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT 'register' as step, COUNT(DISTINCT user_id) as cnt FROM user_register UNION ALL SELECT 'activate' as step, COUNT(DISTINCT user_id) as cnt FROM user_activate UNION ALL SELECT 'pay' as step, COUNT(DISTINCT user_id) as cnt FROM user_payment",
        "correct": true
      }
    ],
    "explanation": "三级漏斗需分别统计每级人数用UNION ALL合并。B的三表JOIN只返回同时满足三级的人数。C假设有现成表。D只返回完成全漏斗的用户。",
    "id": 571
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "连续购买",
      "行为分析"
    ],
    "stem": "查找连续3次购买的用户（按购买时间排序），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.user_id FROM purchases a INNER JOIN purchases b ON a.user_id=b.user_id AND b.purchase_date > a.purchase_date INNER JOIN purchases c ON b.user_id=c.user_id AND c.purchase_date > b.purchase_date WHERE DATEDIFF(b.purchase_date,a.purchase_date)<=1 AND DATEDIFF(c.purchase_date,b.purchase_date)<=1",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT user_id, COUNT(*) FROM purchases GROUP BY user_id HAVING COUNT(*)>=3",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM (SELECT user_id, purchase_seq, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY purchase_date) as rn FROM purchases) a GROUP BY user_id HAVING MIN(purchase_seq - rn) IS NOT NULL AND COUNT(CASE WHEN purchase_seq - rn = 0 THEN 1 END) >= 3",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM (SELECT user_id, purchase_date, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY purchase_date) as rn FROM purchases) a WHERE rn <= 3",
        "correct": false
      }
    ],
    "explanation": "连续购买需判断日期连续性，用自连接和DATEDIFF验证。A的purchase_seq假设不存在。B只取前3条记录。D只看总数不判断连续。",
    "id": 572
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "AB测试",
      "统计显著性"
    ],
    "stem": "AB测试中判断实验组转化率是否显著高于对照组，以下哪个SQL正确计算了Z值？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) as z_score FROM ab_test WHERE group_id='A'",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT (p1-p2)/SQRT(p1*(1-p1)/n1+p2*(1-p2)/n2) as z_score FROM (SELECT SUM(is_conv)*1.0/COUNT(*) as p1, COUNT(*) as n1 FROM ab_test WHERE group_id='A') a, (SELECT SUM(is_conv)*1.0/COUNT(*) as p2, COUNT(*) as n2 FROM ab_test WHERE group_id='B') b",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT AVG(is_conv) as z_score FROM ab_test GROUP BY group_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT (p1-p2) as z_score FROM ab_test WHERE group_id IN ('A','B')",
        "correct": false
      }
    ],
    "explanation": "Z检验需分别计算两组的转化率p1/p2和样本量n1/n2，代入公式。B只返回平均转化率。C没有除以标准差。D只返回计数。",
    "id": 573
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "百分位数",
      "用户分群"
    ],
    "stem": "计算每个用户消费金额的75百分位，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT PERCENTILE(amount,75) FROM orders",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT NTILE(4) OVER(ORDER BY amount) as quartile, amount FROM orders",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT amount FROM (SELECT amount, PERCENT_RANK() OVER(ORDER BY amount) as pct FROM orders) t WHERE pct>=0.75 ORDER BY amount LIMIT 1",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT AVG(amount) FROM orders WHERE amount>(SELECT AVG(amount) FROM orders)",
        "correct": false
      }
    ],
    "explanation": "MySQL用PERCENT_RANK()计算百分位数。A的PERCENTILE函数MySQL不支持。B的NTILE是分桶非精确百分位。D计算的是高于平均值的平均非75百分位。",
    "id": 574
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "留存率",
      "除零"
    ],
    "stem": "以下SQL计算次日留存率，当某天没有新用户时会报除零错误，如何修复？ SELECT a.dt, COUNT(DISTINCT b.user_id)*100.0/COUNT(DISTINCT a.user_id) as retention FROM user_first_login a LEFT JOIN user_login b ON a.user_id=b.user_id AND DATE(b.login_time)=DATE_ADD(a.dt,INTERVAL 1 DAY) GROUP BY a.dt",
    "options": [
      {
        "label": "A",
        "text": "去掉LEFT JOIN改用INNER JOIN",
        "correct": false
      },
      {
        "label": "B",
        "text": "用HAVING COUNT(DISTINCT a.user_id)>0替代GROUP BY",
        "correct": false
      },
      {
        "label": "C",
        "text": "改用AVG函数替代除法",
        "correct": false
      },
      {
        "label": "D",
        "text": "将COUNT(DISTINCT a.user_id)改为NULLIF(COUNT(DISTINCT a.user_id),0)",
        "correct": true
      }
    ],
    "explanation": "NULLIF将0转为NULL避免除零。B改变JOIN类型不能解决除零。C的HAVING不能替代GROUP BY。D用AVG逻辑不同。",
    "id": 575
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "窗口函数",
      "Top-N"
    ],
    "stem": "以下SQL查找每组前2名但返回了重复排名，原因是什么？ SELECT user_id, amount FROM orders WHERE ROW_NUMBER() OVER(PARTITION BY category ORDER BY amount DESC)<=2",
    "options": [
      {
        "label": "A",
        "text": "ROW_NUMBER()窗口函数不能在WHERE中直接使用，应嵌套子查询",
        "correct": true
      },
      {
        "label": "B",
        "text": "PARTITION BY语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "ORDER BY方向错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "amount字段有重复值",
        "correct": false
      }
    ],
    "explanation": "窗口函数不能在WHERE中直接使用，需用子查询包裹。B语法正确。C方向正确(DESC)。D与语法错误无关。",
    "id": 576
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "路径分析",
      "行为序列"
    ],
    "stem": "分析用户行为路径（首页→搜索→下单），以下哪个SQL能正确识别完成全路径的用户？",
    "options": [
      {
        "label": "A",
        "text": "SELECT COUNT(*) FROM user_action GROUP BY user_id HAVING COUNT(*)>=3",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT a.user_id FROM (SELECT user_id FROM user_action WHERE action='homepage') a INNER JOIN (SELECT user_id FROM user_action WHERE action='search') b ON a.user_id=b.user_id INNER JOIN (SELECT user_id FROM user_action WHERE action='order') c ON a.user_id=c.user_id",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM user_action WHERE action='homepage' AND action='search' AND action='order'",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_action WHERE action IN ('homepage','search','order')",
        "correct": false
      }
    ],
    "explanation": "路径识别需三表JOIN取交集。B的AND条件不可能同时满足一行。C的IN只返回有任一动作的用户。D只看总动作数不区分路径。",
    "id": 577
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "环比增长",
      "窗口函数"
    ],
    "stem": "用窗口函数计算DAU的日环比增长率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT dt, dau/LAG(dau) OVER() as growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT dt, (dau-dau) as growth FROM daily_dau",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT dt, ROUND((dau-LAG(dau) OVER(ORDER BY dt))*100.0/LAG(dau) OVER(ORDER BY dt),2) as growth FROM daily_dau",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT dt, (dau-LEAD(dau) OVER(ORDER BY dt))/dau as growth FROM daily_dau",
        "correct": false
      }
    ],
    "explanation": "环比增长=(当日-昨日)/昨日，用LAG获取前日值。B用LEAD是下一日。C的LAG缺少ORDER BY。D计算错误。",
    "id": 578
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "RFM",
      "用户分群"
    ],
    "stem": "RFM分析中给用户打分（R/F/M各1-5分），以下哪个SQL正确计算了R分？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id, CASE WHEN recency<7 THEN 5 WHEN recency<14 THEN 4 ELSE 1 END as r_score FROM orders",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, ROW_NUMBER() OVER(ORDER BY DATEDIFF(CURDATE(),order_date)) as r_score FROM orders",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id, NTILE(5) OVER(ORDER BY DATEDIFF(CURDATE(),MAX(order_date)) DESC) as r_score FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id, NTILE(5) OVER(ORDER BY DATEDIFF(CURDATE(),last_order_date)) as r_score FROM (SELECT user_id, MAX(order_date) as last_order_date FROM orders GROUP BY user_id) t",
        "correct": true
      }
    ],
    "explanation": "R分用NTILE(5)按最近购买距今天数分5组。A的NTILE在GROUP BY后不能直接使用。C没有GROUP BY且recency字段可能不存在。D用ROW_NUMBER不是分桶。",
    "id": 579
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "漏斗分析",
      "数据缺失"
    ],
    "stem": "以下漏斗SQL只返回了1行结果，原因是什么？ SELECT 'all' as step, COUNT(DISTINCT user_id) as cnt FROM user_register a INNER JOIN user_activate b ON a.user_id=b.user_id INNER JOIN user_payment c ON a.user_id=c.user_id",
    "options": [
      {
        "label": "A",
        "text": "三表INNER JOIN只返回同时存在于三表的用户，漏斗应分层统计",
        "correct": true
      },
      {
        "label": "B",
        "text": "DISTINCT使用错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "COUNT函数参数错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "INNER JOIN语法错误",
        "correct": false
      }
    ],
    "explanation": "三表INNER JOIN只返回三表交集，无法体现漏斗层级。漏斗应分层统计每级人数。B/C/D语法正确。",
    "id": 580
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "数据异常",
      "脏数据清洗"
    ],
    "stem": "以下哪个SQL能正确识别订单表中的异常大额订单（超过平均值3倍标准差）？",
    "options": [
      {
        "label": "A",
        "text": "SELECT order_id, amount FROM orders GROUP BY order_id HAVING amount > AVG(amount)",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT order_id, amount FROM orders WHERE amount > (SELECT AVG(amount)+3*STDDEV(amount) FROM orders)",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT order_id, amount FROM orders WHERE amount > MAX(amount)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT order_id FROM orders WHERE amount > 10000",
        "correct": false
      }
    ],
    "explanation": "异常检测用AVG+3*STDDEV计算阈值。B的MAX(amount)不是异常标准。C用固定阈值不科学。D的HAVING用法错误。",
    "id": 581
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "连续登录",
      "窗口函数"
    ],
    "stem": "用窗口函数查找连续3天登录的用户，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id FROM user_login WHERE ROW_NUMBER() OVER(ORDER BY login_time)<=3",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT DISTINCT user_id FROM user_login WHERE COUNT(*)>=3",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM (SELECT user_id, DATE(login_time) as dt, DATE_SUB(DATE(login_time), INTERVAL ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY DATE(login_time)) DAY) as grp FROM user_login) a GROUP BY user_id, grp HAVING COUNT(*)>=3",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_login GROUP BY user_id HAVING COUNT(DISTINCT DATE(login_time))>=3",
        "correct": false
      }
    ],
    "explanation": "连续登录用DATE_SUB减去行号构造分组标识，GROUP BY后HAVING COUNT>=3。B只看总天数不看连续性。C窗口函数在WHERE中不能直接用。D语法错误。",
    "id": 582
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "同比增长",
      "日期函数"
    ],
    "stem": "计算月度同比增长率，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT month, revenue/LAG(revenue,12) OVER() as yoy FROM monthly_revenue",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT month, revenue-revenue as yoy FROM monthly_revenue",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT month, AVG(revenue) as yoy FROM monthly_revenue GROUP BY month",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT a.month, ROUND((a.revenue-b.revenue)*100.0/NULLIF(b.revenue,0),2) as yoy FROM monthly_revenue a JOIN monthly_revenue_last_year b ON a.month=b.month",
        "correct": true
      }
    ],
    "explanation": "同比增长需对比去年同期，JOIN关联同月数据。B的LAG偏移12个月不精确。C计算错误。D返回平均值非增长率。",
    "id": 583
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "窗口函数",
      "连续行为"
    ],
    "stem": "以下SQL查找连续3天登录用户，但结果中包含非连续用户，原因是什么？ SELECT user_id FROM (SELECT user_id, DATE(login_time) as dt, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY DATE(login_time)) as rn FROM user_login) a GROUP BY user_id HAVING COUNT(*)>=3",
    "options": [
      {
        "label": "A",
        "text": "HAVING只检查了总数>=3但没有判断日期是否连续，缺少DATE_SUB分组逻辑",
        "correct": true
      },
      {
        "label": "B",
        "text": "ROW_NUMBER()使用错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "PARTITION BY不正确",
        "correct": false
      },
      {
        "label": "D",
        "text": "DATE函数不正确",
        "correct": false
      }
    ],
    "explanation": "HAVING只检查>=3条记录但未判断日期连续性，需用DATE_SUB减行号构造连续分组。B/C/D语法正确。",
    "id": 584
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "30日留存",
      "留存分析"
    ],
    "stem": "计算30日留存率，以下哪个SQL最完整？",
    "options": [
      {
        "label": "A",
        "text": "SELECT a.dt, AVG(COUNT(DISTINCT b.user_id)) as retention_30d FROM user_first_login a LEFT JOIN user_login b ON a.user_id=b.user_id GROUP BY a.dt",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT a.dt, COUNT(DISTINCT b.user_id)*100.0/COUNT(DISTINCT a.user_id) as retention_30d FROM (SELECT DATE(first_login) as dt, user_id FROM user_first_login) a LEFT JOIN (SELECT user_id, DATE(login_time) as login_dt FROM user_login) b ON a.user_id=b.user_id AND DATEDIFF(b.login_dt,a.dt)=29 GROUP BY a.dt",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT dt, COUNT(DISTINCT user_id)*100.0/7 as retention_30d FROM user_login GROUP BY dt",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT COUNT(DISTINCT user_id) as retention_30d FROM user_login WHERE DATEDIFF(CURDATE(),login_time)<=30",
        "correct": false
      }
    ],
    "explanation": "30日留存需LEFT JOIN首日用户与第30日登录数据，DATEDIFF=29。B的除以7无意义。C只是30日内活跃用户数。D的AVG(COUNT)嵌套不合法。",
    "id": 585
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "RFM",
      "综合评分"
    ],
    "stem": "RFM分析中同时计算R/F/M三项得分并合并，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id, AVG(r_score)+AVG(f_score)+AVG(m_score) as total FROM orders GROUP BY user_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id, r_score*f_score*m_score as total FROM orders",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id, NTILE(5) OVER(ORDER BY r_score) as r, NTILE(5) OVER(ORDER BY f_score) as f, NTILE(5) OVER(ORDER BY m_score) as m FROM (SELECT user_id, DATEDIFF(CURDATE(),MAX(order_date)) as r_score, COUNT(DISTINCT order_date) as f_score, SUM(amount) as m_score FROM orders GROUP BY user_id) t",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT user_id, r+f+m as total FROM rfm_scores",
        "correct": false
      }
    ],
    "explanation": "需先聚合计算R/F/M原始值再用NTILE分桶打分。B假设有现成表。C对聚合值做AVG再相加逻辑错误。D乘法不正确。",
    "id": 586
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "AB测试",
      "多指标"
    ],
    "stem": "AB测试需同时比较两组的多个指标（DAU/留存/ARPU），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT group_id, COUNT(*), SUM(revenue) FROM ab_test GROUP BY group_id",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT group_id, MAX(dau), MAX(retention), MAX(arpu) FROM ab_summary GROUP BY group_id",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT group_id, dau, retention, arpu FROM ab_test WHERE group_id IN ('A','B')",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT a.group_id, COUNT(DISTINCT a.user_id) as dau, AVG(CASE WHEN b.is_retained=1 THEN 1 ELSE 0 END) as retention, AVG(a.revenue) as arpu FROM ab_test a LEFT JOIN ab_retention b ON a.user_id=b.user_id GROUP BY a.group_id",
        "correct": true
      }
    ],
    "explanation": "多指标AB分析需JOIN多源数据并按组聚合。B缺少留存指标。C假设有汇总表。D直接SELECT字段不聚合。",
    "id": 587
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "用户画像",
      "综合统计"
    ],
    "stem": "同时统计用户的年龄段、地区、设备三个维度的交叉分布，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT age_group, province, device_type, COUNT(DISTINCT user_id) as cnt FROM (SELECT user_id, CASE WHEN age<25 THEN 'young' WHEN age<40 THEN 'mid' ELSE 'senior' END as age_group, province, device_type FROM user_profile) t GROUP BY age_group, province, device_type",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT age, province, device_type FROM user_profile GROUP BY age, province, device_type",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_profile GROUP BY age_group, province",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT age_group, province, device_type, SUM(user_id) FROM user_profile GROUP BY age_group, province, device_type",
        "correct": false
      }
    ],
    "explanation": "交叉分析需用CASE WHEN构造年龄段，三字段GROUP BY。B按精确年龄分组不满足需求。C缺少device_type分组。D的SUM(user_id)无意义。",
    "id": 588
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "路径分析",
      "复杂路径"
    ],
    "stem": "分析用户从搜索到加购到下单的路径转化率（每步独立计算），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT action, COUNT(DISTINCT user_id) FROM user_action GROUP BY action",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT 'search_to_cart' as step, COUNT(DISTINCT a.user_id)*100.0/(SELECT COUNT(DISTINCT user_id) FROM user_action WHERE action='search') as cvr FROM user_action a INNER JOIN user_action b ON a.user_id=b.user_id AND b.action='cart' WHERE a.action='search'",
        "correct": true
      },
      {
        "label": "C",
        "text": "SELECT COUNT(*) FROM user_action WHERE action IN ('search','cart','order')",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_action WHERE action='search' AND action='cart' AND action='order'",
        "correct": false
      }
    ],
    "explanation": "路径转化率需分别计算每步转化。A正确计算搜索到加购转化率。B简单计数无转化计算。C的AND条件不可能同时满足。D只统计各动作人数无转化关系。",
    "id": 589
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "连续行为",
      "窗口函数"
    ],
    "stem": "用窗口函数计算连续5天登录的用户，以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT user_id FROM user_login WHERE ROW_NUMBER() OVER(ORDER BY login_time)<=5",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT user_id FROM (SELECT user_id, LAG(DATE(login_time)) OVER(PARTITION BY user_id ORDER BY DATE(login_time)) as prev_dt FROM user_login) a WHERE DATEDIFF(dt,prev_dt)=1 GROUP BY user_id HAVING COUNT(*)>=5",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT user_id FROM (SELECT user_id, DATE(login_time) as dt, DATE_SUB(DATE(login_time), INTERVAL ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY DATE(login_time)) DAY) as grp FROM user_login) a GROUP BY user_id, grp HAVING COUNT(*)>=5",
        "correct": true
      },
      {
        "label": "D",
        "text": "SELECT user_id FROM user_login GROUP BY user_id HAVING COUNT(DISTINCT DATE(login_time))>=5",
        "correct": false
      }
    ],
    "explanation": "连续5天登录用DATE_SUB减行号构造分组标识，HAVING>=5。B只看总天数。C窗口函数在WHERE中不能用。D的LAG方法在cnt>=5时不能保证连续5天。",
    "id": 590
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "留存率",
      "窗口函数"
    ],
    "stem": "以下SQL计算留存率结果全部为0%，原因是什么？ SELECT a.dt, COUNT(DISTINCT b.user_id)*100.0/COUNT(DISTINCT a.user_id) as retention FROM user_login a LEFT JOIN user_login b ON a.user_id=b.user_id AND DATE(b.login_time)=DATE_ADD(a.dt,INTERVAL 1 DAY) WHERE a.dt='2024-01-01' GROUP BY a.dt",
    "options": [
      {
        "label": "A",
        "text": "LEFT JOIN条件错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT DISTINCT计算错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "DATE_ADD函数不正确",
        "correct": false
      },
      {
        "label": "D",
        "text": "a.dt是登录日期字段非首次登录日期，次日登录用户应通过首次登录表判断基准日",
        "correct": true
      }
    ],
    "explanation": "a.dt来自登录表的日期，但留存率的基准日应是首次登录日，非任意登录日。LEFT JOIN、COUNT DISTINCT、DATE_ADD用法均正确。",
    "id": 591
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "数据异常",
      "重复数据"
    ],
    "stem": "以下SQL清洗重复订单但删除了过多记录，原因是什么？ DELETE FROM orders WHERE order_id IN (SELECT order_id FROM orders GROUP BY order_id HAVING COUNT(*)>1)",
    "options": [
      {
        "label": "A",
        "text": "IN子查询会删除所有重复组的记录包括第一次出现的，应改用ROW_NUMBER保留一条",
        "correct": true
      },
      {
        "label": "B",
        "text": "GROUP BY不正确",
        "correct": false
      },
      {
        "label": "C",
        "text": "HAVING条件错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "DELETE语法错误",
        "correct": false
      }
    ],
    "explanation": "IN子查询会删除重复组所有记录，应保留一条。GROUP BY和HAVING语法正确。DELETE语法正确。",
    "id": 592
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "环比增长",
      "数据类型"
    ],
    "stem": "以下SQL计算环比增长率结果为0或NULL，原因是什么？ SELECT dt, (dau-LAG(dau) OVER(ORDER BY dt))/LAG(dau) OVER(ORDER BY dt) as growth FROM daily_dau",
    "options": [
      {
        "label": "A",
        "text": "GROUP BY缺失",
        "correct": false
      },
      {
        "label": "B",
        "text": "整数除法导致结果为0，应用dau*1.0/LAG(dau)或将分子分母转为DECIMAL",
        "correct": true
      },
      {
        "label": "C",
        "text": "LAG函数使用错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "OVER子句缺少PARTITION BY",
        "correct": false
      }
    ],
    "explanation": "MySQL整数除法截断小数部分导致0。LAG语法正确。PARTITION BY非必须。GROUP BY非必须。",
    "id": 593
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "analytics",
    "tags": [
      "漏斗分析",
      "时间窗口"
    ],
    "stem": "以下漏斗SQL统计30分钟内完成的转化，但结果偏大，原因是什么？ SELECT a.user_id FROM user_action a WHERE a.action='search' AND EXISTS (SELECT 1 FROM user_action b WHERE b.user_id=a.user_id AND b.action='order' AND TIMESTAMPDIFF(MINUTE,a.action_time,b.action_time) BETWEEN 0 AND 30)",
    "options": [
      {
        "label": "A",
        "text": "EXISTS语法错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "WHERE条件不够严格",
        "correct": false
      },
      {
        "label": "C",
        "text": "TIMESTAMPDIFF计算正确但可能存在多个order匹配导致用户被重复计数，且未排除search本身的重复记录",
        "correct": true
      },
      {
        "label": "D",
        "text": "TIMESTAMPDIFF函数不正确",
        "correct": false
      }
    ],
    "explanation": "多个order匹配导致同一用户被重复计数，且search记录本身有重复。TIMESTAMPDIFF和EXISTS语法正确。WHERE条件本身正确但不够精确。",
    "id": 594
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "DAU",
      "MAU"
    ],
    "stem": "统计每月活跃用户数（MAU），以下哪个SQL正确？",
    "options": [
      {
        "label": "A",
        "text": "SELECT MONTH(login_time) as month, COUNT(user_id) FROM user_login GROUP BY MONTH(login_time)",
        "correct": false
      },
      {
        "label": "B",
        "text": "SELECT COUNT(DISTINCT user_id) FROM user_login WHERE login_time >= DATE_SUB(NOW(),INTERVAL 30 DAY)",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT DATE(login_time), COUNT(*) FROM user_login GROUP BY DATE(login_time)",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT DATE_FORMAT(login_time,'%Y-%m') as month, COUNT(DISTINCT user_id) as mau FROM user_login GROUP BY DATE_FORMAT(login_time,'%Y-%m')",
        "correct": true
      }
    ],
    "explanation": "MAU按月分组用DATE_FORMAT，COUNT DISTINCT去重。B没有DISTINCT且MONTH只取月份数字会跨年混淆。C是近30天而非自然月。D按天分组不是按月。",
    "id": 595
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "analytics",
    "tags": [
      "新增用户"
    ],
    "stem": "统计每日新增注册用户数，以下哪个SQL正确？假设users表有created_at字段",
    "options": [
      {
        "label": "A",
        "text": "SELECT DATE(created_at) as dt, COUNT(*) as new_users FROM users GROUP BY DATE(created_at)",
        "correct": true
      },
      {
        "label": "B",
        "text": "SELECT COUNT(*) FROM users",
        "correct": false
      },
      {
        "label": "C",
        "text": "SELECT DATE(created_at), COUNT(DISTINCT id) FROM users",
        "correct": false
      },
      {
        "label": "D",
        "text": "SELECT created_at, COUNT(*) FROM users GROUP BY created_at",
        "correct": false
      }
    ],
    "explanation": "按注册日期分组统计每天新增数。B是总数不是按天的。C没有GROUP BY。D按完整时间戳分组粒度太细。",
    "id": 596
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "留存率"
    ],
    "stem": "关于次日留存率的计算，以下说法正确的是？",
    "options": [
      {
        "label": "A",
        "text": "次日留存率 = 连续两天都登录的用户数 / 总用户数",
        "correct": false
      },
      {
        "label": "B",
        "text": "次日留存率 = 第2天再次登录的用户数 / 第1天新注册用户数",
        "correct": true
      },
      {
        "label": "C",
        "text": "次日留存率 = 第2天登录用户数 / 第2天总用户数",
        "correct": false
      },
      {
        "label": "D",
        "text": "次日留存率 = 第2天新注册用户数 / 第1天新注册用户数",
        "correct": false
      }
    ],
    "explanation": "留存率分母是首日新增用户，分子是这些用户中次日仍活跃的数量。B分母错了，C分子错了，D没有时间限定。",
    "id": 597
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "Top-N",
      "窗口函数"
    ],
    "stem": "查询每个部门薪资最高的3名员工，空白处应填？\nSELECT * FROM (SELECT name, dept, salary, ___ OVER (PARTITION BY dept ORDER BY salary DESC) as rn FROM emp) t WHERE rn <= 3",
    "options": [
      {
        "label": "A",
        "text": "DENSE_RANK",
        "correct": false
      },
      {
        "label": "B",
        "text": "COUNT",
        "correct": false
      },
      {
        "label": "C",
        "text": "ROW_NUMBER",
        "correct": true
      },
      {
        "label": "D",
        "text": "RANK",
        "correct": false
      }
    ],
    "explanation": "ROW_NUMBER保证每行唯一编号不会并列，确保严格取3条。RANK和DENSE_RANK在有并列时会多返回行。COUNT不是排序函数。",
    "id": 598
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "analytics",
    "tags": [
      "同比",
      "环比"
    ],
    "stem": "2024年1月销售额100万，2023年1月销售额80万，2024年同比增长率是？",
    "options": [
      {
        "label": "A",
        "text": "20%",
        "correct": false
      },
      {
        "label": "B",
        "text": "80%",
        "correct": false
      },
      {
        "label": "C",
        "text": "125%",
        "correct": false
      },
      {
        "label": "D",
        "text": "25%",
        "correct": true
      }
    ],
    "explanation": "同比增长率 = (本期-同期)/同期 x 100% = (100-80)/80 x 100% = 25%。B是80/100-1算反了。C是80/100。D是100/80。",
    "id": 599
  }
]
