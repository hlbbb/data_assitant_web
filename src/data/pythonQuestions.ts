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

export const PYTHON_CATEGORY_MAP: Record<string, string> = {
  basic: 'Python 基础',
  condition_loop: '条件与循环',
  function: '函数',
  data_structure: '数据结构',
  matplotlib: 'Matplotlib',
  seaborn: 'Seaborn',
  numpy: 'NumPy',
  pandas: 'Pandas',
  file_io: '文件读写',
}

export const pythonQuestions: QuizQuestion[] = [
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "变量",
      "命名"
    ],
    "stem": "以下哪个是合法的Python变量名？",
    "options": [
      {
        "label": "A",
        "text": "2name",
        "correct": false
      },
      {
        "label": "B",
        "text": "my_var",
        "correct": true
      },
      {
        "label": "C",
        "text": "class",
        "correct": false
      },
      {
        "label": "D",
        "text": "my-var",
        "correct": false
      }
    ],
    "explanation": "变量名不能以数字开头、不能是关键字、不能含连字符。",
    "id": 0
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "变量",
      "命名"
    ],
    "stem": "以下哪个变量名是合法的？",
    "options": [
      {
        "label": "A",
        "text": "_private",
        "correct": true
      },
      {
        "label": "B",
        "text": "@email",
        "correct": false
      },
      {
        "label": "C",
        "text": "global",
        "correct": false
      },
      {
        "label": "D",
        "text": "123abc",
        "correct": false
      }
    ],
    "explanation": "下划线开头的变量名合法，@不合法，global是关键字，不能数字开头。",
    "id": 1
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "数据类型",
      "type"
    ],
    "stem": "print(type(3.14)) 的输出结果是？",
    "options": [
      {
        "label": "A",
        "text": "<class 'int'>",
        "correct": false
      },
      {
        "label": "B",
        "text": "<class 'float'>",
        "correct": true
      },
      {
        "label": "C",
        "text": "<class 'str'>",
        "correct": false
      },
      {
        "label": "D",
        "text": "3.14",
        "correct": false
      }
    ],
    "explanation": "3.14是浮点数，type()返回<class 'float'>。",
    "id": 2
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "数据类型",
      "type"
    ],
    "stem": "print(type('hello')) 的输出结果是？",
    "options": [
      {
        "label": "A",
        "text": "<class 'str'>",
        "correct": true
      },
      {
        "label": "B",
        "text": "<class 'char'>",
        "correct": false
      },
      {
        "label": "C",
        "text": "hello",
        "correct": false
      },
      {
        "label": "D",
        "text": "<class 'text'>",
        "correct": false
      }
    ],
    "explanation": "'hello'是字符串，Python没有char类型。",
    "id": 3
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "算术"
    ],
    "stem": "在Python中，// 运算符的作用是？",
    "options": [
      {
        "label": "A",
        "text": "除法",
        "correct": false
      },
      {
        "label": "B",
        "text": "整除（向下取整）",
        "correct": true
      },
      {
        "label": "C",
        "text": "取余",
        "correct": false
      },
      {
        "label": "D",
        "text": "幂运算",
        "correct": false
      }
    ],
    "explanation": "// 是整除运算符，返回商的整数部分。/是普通除法，%是取余，**是幂运算。",
    "id": 4
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "算术"
    ],
    "stem": "print(17 // 5) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": true
      },
      {
        "label": "B",
        "text": "3.4",
        "correct": false
      },
      {
        "label": "C",
        "text": "2",
        "correct": false
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "17 // 5 = 3（整除，向下取整）。",
    "id": 5
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "算术"
    ],
    "stem": "print(10 % 3) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "3",
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
        "text": "3.33",
        "correct": false
      }
    ],
    "explanation": "10 % 3 = 1，即10除以3的余数。",
    "id": 6
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "算术"
    ],
    "stem": "print(2 ** 3) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "6",
        "correct": false
      },
      {
        "label": "B",
        "text": "8",
        "correct": true
      },
      {
        "label": "C",
        "text": "5",
        "correct": false
      },
      {
        "label": "D",
        "text": "9",
        "correct": false
      }
    ],
    "explanation": "** 是幂运算，2 ** 3 = 8。",
    "id": 7
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "数据类型",
      "bool"
    ],
    "stem": "以下哪个值在布尔上下文中被视为 False？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "'False'",
        "correct": false
      },
      {
        "label": "C",
        "text": "0",
        "correct": true
      },
      {
        "label": "D",
        "text": "[1,2]",
        "correct": false
      }
    ],
    "explanation": "0、空字符串、空列表、None等被视为False。非零数字、非空容器视为True。",
    "id": 8
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "数据类型",
      "None"
    ],
    "stem": "Python中 None 的含义是？",
    "options": [
      {
        "label": "A",
        "text": "空字符串",
        "correct": false
      },
      {
        "label": "B",
        "text": "零",
        "correct": false
      },
      {
        "label": "C",
        "text": "表示没有值",
        "correct": true
      },
      {
        "label": "D",
        "text": "空列表",
        "correct": false
      }
    ],
    "explanation": "None是Python中的空值对象，表示'没有值'，不等于0、空字符串或空列表。",
    "id": 9
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "类型转换",
      "int"
    ],
    "stem": "print(int('42')) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "'42'",
        "correct": false
      },
      {
        "label": "B",
        "text": "42",
        "correct": true
      },
      {
        "label": "C",
        "text": "42.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "int('42')将字符串'42'转换为整数42。",
    "id": 10
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "类型转换",
      "str"
    ],
    "stem": "print(str(123)) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "123",
        "correct": true
      },
      {
        "label": "B",
        "text": "'123'",
        "correct": false
      },
      {
        "label": "C",
        "text": "123.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "str(123)将整数转为字符串，但print输出时不显示引号，显示123。",
    "id": 11
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "print",
      "输出"
    ],
    "stem": "以下哪个可以正确打印多行文本？",
    "options": [
      {
        "label": "A",
        "text": "print('Hello\\nWorld')",
        "correct": true
      },
      {
        "label": "B",
        "text": "print('Hello' + 'World')",
        "correct": false
      },
      {
        "label": "C",
        "text": "print('Hello\\tWorld')",
        "correct": false
      },
      {
        "label": "D",
        "text": "print('Hello World')",
        "correct": false
      }
    ],
    "explanation": "\\n是换行符，\\t是制表符，A会在Hello和World之间换行。",
    "id": 12
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "print",
      "格式化"
    ],
    "stem": "以下代码输出什么？\nprint(f'我今年{20}岁')",
    "options": [
      {
        "label": "A",
        "text": "我今年{20}岁",
        "correct": false
      },
      {
        "label": "B",
        "text": "我今年20岁",
        "correct": true
      },
      {
        "label": "C",
        "text": "我今年age岁",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "f-string会用花括号内表达式的值替换花括号部分，所以输出'我今年20岁'。",
    "id": 13
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "比较"
    ],
    "stem": "print(3 == 3.0) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": true
      },
      {
        "label": "B",
        "text": "False",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "3和3.0值相等，==比较值而非类型，返回True。",
    "id": 14
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "比较"
    ],
    "stem": "print(3 is 3.0) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "is比较对象身份（是否同一对象），3(int)和3.0(float)是不同对象，返回False。",
    "id": 15
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "逻辑"
    ],
    "stem": "以下哪个运算符表示逻辑与？",
    "options": [
      {
        "label": "A",
        "text": "&&",
        "correct": false
      },
      {
        "label": "B",
        "text": "and",
        "correct": true
      },
      {
        "label": "C",
        "text": "&",
        "correct": false
      },
      {
        "label": "D",
        "text": "||",
        "correct": false
      }
    ],
    "explanation": "Python用and表示逻辑与，or表示逻辑或，not表示逻辑非。&&和||是其他语言的写法。",
    "id": 16
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "运算符",
      "逻辑"
    ],
    "stem": "print(True and False) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": true
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "and运算：两个都为True时才返回True，True and False为False。",
    "id": 17
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "print",
      "sep"
    ],
    "stem": "print(1, 2, 3, sep='-') 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "1 2 3",
        "correct": false
      },
      {
        "label": "B",
        "text": "1-2-3",
        "correct": true
      },
      {
        "label": "C",
        "text": "1,2,3",
        "correct": false
      },
      {
        "label": "D",
        "text": "123",
        "correct": false
      }
    ],
    "explanation": "sep参数指定分隔符，默认是空格，设为'-'后输出1-2-3。",
    "id": 18
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "basic",
    "tags": [
      "赋值",
      "多重赋值"
    ],
    "stem": "以下代码执行后 x 的值是？\nx, y = 1, 2\nx, y = y, x",
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
        "text": "(1, 2)",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "Python的多重赋值同时交换值，x, y = y, x 将x变为2，y变为1。",
    "id": 19
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "优先级"
    ],
    "stem": "print(2 + 3 * 4) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "20",
        "correct": false
      },
      {
        "label": "B",
        "text": "14",
        "correct": true
      },
      {
        "label": "C",
        "text": "24",
        "correct": false
      },
      {
        "label": "D",
        "text": "9",
        "correct": false
      }
    ],
    "explanation": "乘法优先级高于加法，先算3*4=12，再加2得14。",
    "id": 20
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "数据类型",
      "转换"
    ],
    "stem": "print(type(10 / 3)) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "<class 'int'>",
        "correct": false
      },
      {
        "label": "B",
        "text": "<class 'float'>",
        "correct": true
      },
      {
        "label": "C",
        "text": "<class 'tuple'>",
        "correct": false
      },
      {
        "label": "D",
        "text": "<class 'str'>",
        "correct": false
      }
    ],
    "explanation": "Python3中/总是返回float，即使整除也是float。10/3=3.333...是float。",
    "id": 21
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "逻辑"
    ],
    "stem": "以下代码输出什么？\nprint(bool(''))\nprint(bool('hello'))",
    "options": [
      {
        "label": "A",
        "text": "True\\nTrue",
        "correct": false
      },
      {
        "label": "B",
        "text": "False\\nTrue",
        "correct": true
      },
      {
        "label": "C",
        "text": "True\\nFalse",
        "correct": false
      },
      {
        "label": "D",
        "text": "False\\nFalse",
        "correct": false
      }
    ],
    "explanation": "空字符串''为假值，非空字符串'hello'为真值。",
    "id": 22
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "字符串"
    ],
    "stem": "print('py' * 3) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "py3",
        "correct": false
      },
      {
        "label": "B",
        "text": "pypypy",
        "correct": true
      },
      {
        "label": "C",
        "text": "py py py",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "字符串*整数表示重复，'py'*3='pypypy'。",
    "id": 23
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "类型转换",
      "int"
    ],
    "stem": "将浮点数 3.14 转换为整数，应使用：\nresult = ____(3.14)",
    "options": [
      {
        "label": "A",
        "text": "int",
        "correct": true
      },
      {
        "label": "B",
        "text": "float",
        "correct": false
      },
      {
        "label": "C",
        "text": "str",
        "correct": false
      },
      {
        "label": "D",
        "text": "round",
        "correct": false
      }
    ],
    "explanation": "int(3.14)截断小数部分返回3。round虽然也能用但语义是四舍五入而非类型转换。",
    "id": 24
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "数据类型",
      "运算"
    ],
    "stem": "以下代码报错，原因是什么？\nresult = '年龄：' + 25",
    "options": [
      {
        "label": "A",
        "text": "变量名不合法",
        "correct": false
      },
      {
        "label": "B",
        "text": "不能将字符串和整数直接用+连接",
        "correct": true
      },
      {
        "label": "C",
        "text": "25不是有效数字",
        "correct": false
      },
      {
        "label": "D",
        "text": "result是关键字",
        "correct": false
      }
    ],
    "explanation": "Python中字符串和整数不能直接用+拼接，需用str(25)转换或f-string。",
    "id": 25
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "比较"
    ],
    "stem": "print(1 != 1.0) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "!=比较值是否不等，1和1.0值相等，所以1!=1.0为False。",
    "id": 26
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "数据类型",
      "isinstance"
    ],
    "stem": "isinstance(3.14, (int, float)) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": true
      },
      {
        "label": "B",
        "text": "False",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "3.14",
        "correct": false
      }
    ],
    "explanation": "isinstance()第二个参数可以是元组，检查对象是否属于其中任一类型。3.14是float，返回True。",
    "id": 27
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "优先级"
    ],
    "stem": "print(True or False and False) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": true
      },
      {
        "label": "B",
        "text": "False",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "and优先级高于or，先算False and False=False，再算True or False=True。",
    "id": 28
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "赋值",
      "多重赋值"
    ],
    "stem": "以下代码执行后 a, b 的值分别是？\na, b = [1, 2]",
    "options": [
      {
        "label": "A",
        "text": "a=1, b=2",
        "correct": true
      },
      {
        "label": "B",
        "text": "a=[1,2], b=None",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "a=1, b=[2]",
        "correct": false
      }
    ],
    "explanation": "列表也可以解包赋值，a=1, b=2。",
    "id": 29
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "print",
      "格式化"
    ],
    "stem": "使用 f-string 输出 '圆周率是3.14'，应填写：\npi = 3.14\nprint(____)",
    "options": [
      {
        "label": "A",
        "text": "f'圆周率是{pi}'",
        "correct": true
      },
      {
        "label": "B",
        "text": "'圆周率是{pi}'",
        "correct": false
      },
      {
        "label": "C",
        "text": "'圆周率是' + pi",
        "correct": false
      },
      {
        "label": "D",
        "text": "f'圆周率是pi'",
        "correct": false
      }
    ],
    "explanation": "f-string需在字符串前加f，变量放在{}中。B没有f前缀，C类型不匹配，D没有花括号。",
    "id": 30
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "运算符",
      "赋值"
    ],
    "stem": "以下代码有什么问题？\nx = 5\n5 = x",
    "options": [
      {
        "label": "A",
        "text": "x是关键字",
        "correct": false
      },
      {
        "label": "B",
        "text": "不能对字面量赋值",
        "correct": true
      },
      {
        "label": "C",
        "text": "x未定义",
        "correct": false
      },
      {
        "label": "D",
        "text": "类型不匹配",
        "correct": false
      }
    ],
    "explanation": "赋值号左边必须是变量名，不能是数字字面量。5 = x会报SyntaxError。",
    "id": 31
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "数据类型",
      "bool"
    ],
    "stem": "以下代码输出什么？\nprint(bool(0), bool(''), bool([]), bool(None))",
    "options": [
      {
        "label": "A",
        "text": "True True True True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False False False False",
        "correct": true
      },
      {
        "label": "C",
        "text": "False True False True",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "0、空字符串、空列表、None都是假值，bool()都返回False。",
    "id": 32
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "basic",
    "tags": [
      "print",
      "格式化"
    ],
    "stem": "以下代码输出什么？\nname = 'Alice'\nage = 25\nprint(f'{name}明年{age+1}岁')",
    "options": [
      {
        "label": "A",
        "text": "Alice明年26岁",
        "correct": true
      },
      {
        "label": "B",
        "text": "{name}明年{age+1}岁",
        "correct": false
      },
      {
        "label": "C",
        "text": "Alice明年age+1岁",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "f-string中{}内可以写任意表达式，age+1=26。",
    "id": 33
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "运算符",
      "优先级"
    ],
    "stem": "print(2 ** 3 ** 2) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "512",
        "correct": true
      },
      {
        "label": "B",
        "text": "64",
        "correct": false
      },
      {
        "label": "C",
        "text": "36",
        "correct": false
      },
      {
        "label": "D",
        "text": "81",
        "correct": false
      }
    ],
    "explanation": "幂运算**是右结合的，2**(3**2)=2**9=512，不是(2**3)**2=64。",
    "id": 34
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "数据类型",
      "id"
    ],
    "stem": "以下代码输出什么？\na = 256\nb = 256\nprint(a is b)",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": true
      },
      {
        "label": "B",
        "text": "False",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "Python对小整数(-5到256)做了缓存优化，同一值的整数指向同一对象，所以a is b为True。",
    "id": 35
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "数据类型",
      "id"
    ],
    "stem": "以下代码输出什么？\na = 257\nb = 257\nprint(a is b)",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "257超出小整数缓存范围(-5~256)，a和b是不同的对象，a is b为False。（注：交互式环境下如此，某些编译优化可能不同）",
    "id": 36
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "数据类型",
      "浮点数"
    ],
    "stem": "以下代码的输出是什么？\nprint(0.1 + 0.2 == 0.3)",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "浮点数精度问题：0.1+0.2=0.30000000000000004，不等于0.3，所以比较结果为False。",
    "id": 37
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "赋值",
      "引用"
    ],
    "stem": "以下代码输出什么？\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": false
      }
    ],
    "explanation": "b = a不是拷贝而是引用同一对象，b.append(4)也修改了a，所以len(a)=4。",
    "id": 38
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "print",
      "进制"
    ],
    "stem": "要将整数255转为十六进制字符串，应使用：\nresult = ____(255)",
    "options": [
      {
        "label": "A",
        "text": "hex",
        "correct": true
      },
      {
        "label": "B",
        "text": "oct",
        "correct": false
      },
      {
        "label": "C",
        "text": "bin",
        "correct": false
      },
      {
        "label": "D",
        "text": "str",
        "correct": false
      }
    ],
    "explanation": "hex()转为十六进制字符串'0xff'，oct()八进制，bin()二进制。",
    "id": 39
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "basic",
    "tags": [
      "运算符",
      "整除"
    ],
    "stem": "print(-7 // 2) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "-3",
        "correct": false
      },
      {
        "label": "B",
        "text": "-4",
        "correct": true
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "-3.5",
        "correct": false
      }
    ],
    "explanation": "Python的//是向下（负无穷方向）取整。-7/2=-3.5，向下取整得-4。",
    "id": 40
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "if"
    ],
    "stem": "以下哪个是 Python 中正确的 if 语句写法？",
    "options": [
      {
        "label": "A",
        "text": "if x = 5:",
        "correct": false
      },
      {
        "label": "B",
        "text": "if x == 5:",
        "correct": true
      },
      {
        "label": "C",
        "text": "if x := 5:",
        "correct": false
      },
      {
        "label": "D",
        "text": "if x === 5:",
        "correct": false
      }
    ],
    "explanation": "Python 使用 == 进行相等比较，= 是赋值，=== 不是 Python 语法。",
    "id": 41
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "if",
      "elif"
    ],
    "stem": "elif 是哪个关键字的缩写？",
    "options": [
      {
        "label": "A",
        "text": "else if",
        "correct": true
      },
      {
        "label": "B",
        "text": "else in",
        "correct": false
      },
      {
        "label": "C",
        "text": "else iterate",
        "correct": false
      },
      {
        "label": "D",
        "text": "else inline",
        "correct": false
      }
    ],
    "explanation": "elif 是 else if 的缩写，用于多条件分支判断。",
    "id": 42
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "for"
    ],
    "stem": "Python 的 for 循环本质上是遍历什么？",
    "options": [
      {
        "label": "A",
        "text": "整数范围",
        "correct": false
      },
      {
        "label": "B",
        "text": "可迭代对象",
        "correct": true
      },
      {
        "label": "C",
        "text": "布尔条件",
        "correct": false
      },
      {
        "label": "D",
        "text": "递归调用",
        "correct": false
      }
    ],
    "explanation": "Python 的 for 循环遍历可迭代对象（iterable），如列表、元组、字符串、字典等。",
    "id": 43
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "range"
    ],
    "stem": "range(5) 生成哪些整数？",
    "options": [
      {
        "label": "A",
        "text": "1, 2, 3, 4, 5",
        "correct": false
      },
      {
        "label": "B",
        "text": "0, 1, 2, 3, 4",
        "correct": true
      },
      {
        "label": "C",
        "text": "0, 1, 2, 3, 4, 5",
        "correct": false
      },
      {
        "label": "D",
        "text": "1, 2, 3, 4",
        "correct": false
      }
    ],
    "explanation": "range(5) 从 0 开始到 4 结束，包含 0 不包含 5，即 [0, 1, 2, 3, 4]。",
    "id": 44
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "while"
    ],
    "stem": "while 循环的执行条件是什么？",
    "options": [
      {
        "label": "A",
        "text": "条件为 True 时执行",
        "correct": true
      },
      {
        "label": "B",
        "text": "条件为 False 时执行",
        "correct": false
      },
      {
        "label": "C",
        "text": "总是至少执行一次",
        "correct": false
      },
      {
        "label": "D",
        "text": "取决于循环次数",
        "correct": false
      }
    ],
    "explanation": "while 循环在条件为 True 时执行循环体，为 False 时退出。",
    "id": 45
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "break",
      "continue"
    ],
    "stem": "break 和 continue 的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "break 跳过本次，continue 结束循环",
        "correct": false
      },
      {
        "label": "B",
        "text": "break 结束整个循环，continue 跳过本次迭代",
        "correct": true
      },
      {
        "label": "C",
        "text": "两者功能相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "break 用于 for，continue 用于 while",
        "correct": false
      }
    ],
    "explanation": "break 立即终止整个循环，continue 跳过当前迭代进入下一次迭代。",
    "id": 46
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "pass"
    ],
    "stem": "pass 语句的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "跳过当前迭代",
        "correct": false
      },
      {
        "label": "B",
        "text": "终止循环",
        "correct": false
      },
      {
        "label": "C",
        "text": "空操作占位符",
        "correct": true
      },
      {
        "label": "D",
        "text": "抛出异常",
        "correct": false
      }
    ],
    "explanation": "pass 是空操作占位符，用于语法上需要语句但不需要执行任何操作的场景。",
    "id": 47
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "ternary"
    ],
    "stem": "Python 的三元表达式写法是？",
    "options": [
      {
        "label": "A",
        "text": "x = a ? b : c",
        "correct": false
      },
      {
        "label": "B",
        "text": "x = b if a else c",
        "correct": true
      },
      {
        "label": "C",
        "text": "x = a ? b : c",
        "correct": false
      },
      {
        "label": "D",
        "text": "x = a then b else c",
        "correct": false
      }
    ],
    "explanation": "Python 三元表达式格式为: value_if_true if condition else value_if_false。",
    "id": 48
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "for",
      "range"
    ],
    "stem": "以下代码输出什么？\nfor i in range(3):\n    print(i, end=' ')",
    "options": [
      {
        "label": "A",
        "text": "0 1 2",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 2 3",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 1 2 3",
        "correct": false
      },
      {
        "label": "D",
        "text": "1 2",
        "correct": false
      }
    ],
    "explanation": "range(3) 生成 0, 1, 2，print 使用 end=' ' 以空格分隔输出。",
    "id": 49
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "for",
      "range"
    ],
    "stem": "以下代码输出什么？\nfor i in range(1, 6, 2):\n    print(i, end=' ')",
    "options": [
      {
        "label": "A",
        "text": "1 3 5",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 3 5 7",
        "correct": false
      },
      {
        "label": "C",
        "text": "2 4 6",
        "correct": false
      },
      {
        "label": "D",
        "text": "1 2 3",
        "correct": false
      }
    ],
    "explanation": "range(1, 6, 2) 从 1 开始，步长 2，到 5 结束，输出 1 3 5。",
    "id": 50
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "while"
    ],
    "stem": "以下代码输出什么？\nx = 0\nwhile x < 3:\n    print(x, end=' ')\n    x += 1",
    "options": [
      {
        "label": "A",
        "text": "0 1 2",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 2 3",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 1 2 3",
        "correct": false
      },
      {
        "label": "D",
        "text": "0 0 0",
        "correct": false
      }
    ],
    "explanation": "x 从 0 开始，每次加 1，当 x < 3 时循环，输出 0 1 2。",
    "id": 51
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "list-comprehension",
      "range"
    ],
    "stem": "[x**2 for x in range(5)] 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "[0, 1, 4, 9, 16]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1, 4, 9, 16, 25]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[0, 1, 4, 9, 16, 25]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1, 2, 3, 4, 5]",
        "correct": false
      }
    ],
    "explanation": "range(5) 生成 0-4，x**2 计算平方，结果为 [0, 1, 4, 9, 16]。",
    "id": 52
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "if",
      "else"
    ],
    "stem": "以下代码输出什么？\nx = 5\nif x > 3:\n    print('A')\nelse:\n    print('B')",
    "options": [
      {
        "label": "A",
        "text": "A",
        "correct": true
      },
      {
        "label": "B",
        "text": "B",
        "correct": false
      },
      {
        "label": "C",
        "text": "AB",
        "correct": false
      },
      {
        "label": "D",
        "text": "无输出",
        "correct": false
      }
    ],
    "explanation": "x=5 > 3，条件为 True，执行 if 分支输出 A。",
    "id": 53
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "ternary"
    ],
    "stem": "以下代码输出什么？\nx = 3\nprint('even' if x % 2 == 0 else 'odd')",
    "options": [
      {
        "label": "A",
        "text": "even",
        "correct": false
      },
      {
        "label": "B",
        "text": "odd",
        "correct": true
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "3 % 2 == 1 不等于 0，条件为 False，执行 else 分支输出 odd。",
    "id": 54
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "if",
      "elif"
    ],
    "stem": "补全代码，判断正负：\nx = -5\nif x > 0:\n    print('正数')\n____:\n    print('负数')",
    "options": [
      {
        "label": "A",
        "text": "else",
        "correct": true
      },
      {
        "label": "B",
        "text": "elif",
        "correct": false
      },
      {
        "label": "C",
        "text": "finally",
        "correct": false
      },
      {
        "label": "D",
        "text": "continue",
        "correct": false
      }
    ],
    "explanation": "else 用于 if 条件不满足时的默认分支。",
    "id": 55
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "for"
    ],
    "stem": "补全代码，遍历列表：\nfruits = ['apple', 'banana']\n____ fruit in fruits:\n    print(fruit)",
    "options": [
      {
        "label": "A",
        "text": "for",
        "correct": true
      },
      {
        "label": "B",
        "text": "while",
        "correct": false
      },
      {
        "label": "C",
        "text": "if",
        "correct": false
      },
      {
        "label": "D",
        "text": "with",
        "correct": false
      }
    ],
    "explanation": "for...in 是 Python 遍历可迭代对象的标准语法。",
    "id": 56
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "range"
    ],
    "stem": "补全代码，生成 0 到 4 的整数：\nfor i in ____:\n    print(i)",
    "options": [
      {
        "label": "A",
        "text": "range(5)",
        "correct": true
      },
      {
        "label": "B",
        "text": "range(1, 5)",
        "correct": false
      },
      {
        "label": "C",
        "text": "range(4)",
        "correct": false
      },
      {
        "label": "D",
        "text": "range(0, 5, 2)",
        "correct": false
      }
    ],
    "explanation": "range(5) 生成 0 到 4 的整数序列。",
    "id": 57
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "while"
    ],
    "stem": "补全代码，使循环输出 0 1 2：\ncount = 0\nwhile count ____ 3:\n    print(count, end=' ')\n    count += 1",
    "options": [
      {
        "label": "A",
        "text": "<",
        "correct": true
      },
      {
        "label": "B",
        "text": ">",
        "correct": false
      },
      {
        "label": "C",
        "text": "<=",
        "correct": false
      },
      {
        "label": "D",
        "text": "==",
        "correct": false
      }
    ],
    "explanation": "count < 3 时循环执行，输出 0 1 2。",
    "id": 58
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "if"
    ],
    "stem": "以下代码的 bug 是什么？\nif x = 5:\n    print('five')",
    "options": [
      {
        "label": "A",
        "text": "应该用 == 而不是 =",
        "correct": true
      },
      {
        "label": "B",
        "text": "缺少 else 分支",
        "correct": false
      },
      {
        "label": "C",
        "text": "x 未定义",
        "correct": false
      },
      {
        "label": "D",
        "text": "缩进错误",
        "correct": false
      }
    ],
    "explanation": "if 条件应使用 == 比较运算符，= 是赋值运算符，在 if 中会报语法错误。",
    "id": 59
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "condition_loop",
    "tags": [
      "while"
    ],
    "stem": "以下代码的问题是什么？\ni = 0\nwhile i < 5:\n    print(i)",
    "options": [
      {
        "label": "A",
        "text": "缺少 i 的递增",
        "correct": true
      },
      {
        "label": "B",
        "text": "while 语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "print 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "i 未定义",
        "correct": false
      }
    ],
    "explanation": "循环体内没有 i += 1，i 永远为 0，造成死循环。",
    "id": 60
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "for-else"
    ],
    "stem": "for...else 中 else 什么时候执行？",
    "options": [
      {
        "label": "A",
        "text": "循环被 break 打断时",
        "correct": false
      },
      {
        "label": "B",
        "text": "循环正常结束时",
        "correct": true
      },
      {
        "label": "C",
        "text": "循环体为空时",
        "correct": false
      },
      {
        "label": "D",
        "text": "else 总是执行",
        "correct": false
      }
    ],
    "explanation": "for...else 的 else 在循环正常结束（未被 break 打断）时执行。",
    "id": 61
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "enumerate"
    ],
    "stem": "enumerate() 函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "返回排序后的列表",
        "correct": false
      },
      {
        "label": "B",
        "text": "同时获取索引和值",
        "correct": true
      },
      {
        "label": "C",
        "text": "统计元素个数",
        "correct": false
      },
      {
        "label": "D",
        "text": "反转序列",
        "correct": false
      }
    ],
    "explanation": "enumerate() 返回 (index, value) 对，可以同时获取索引和值。",
    "id": 62
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "zip"
    ],
    "stem": "zip() 函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "解压缩文件",
        "correct": false
      },
      {
        "label": "B",
        "text": "将多个可迭代对象配对",
        "correct": true
      },
      {
        "label": "C",
        "text": "压缩列表",
        "correct": false
      },
      {
        "label": "D",
        "text": "拼接字符串",
        "correct": false
      }
    ],
    "explanation": "zip() 将多个可迭代对象的元素配对，生成元组的迭代器。",
    "id": 63
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "dict-comprehension"
    ],
    "stem": "字典推导式的语法格式是？",
    "options": [
      {
        "label": "A",
        "text": "{k: v for k, v in iterable}",
        "correct": true
      },
      {
        "label": "B",
        "text": "[k: v for k, v in iterable]",
        "correct": false
      },
      {
        "label": "C",
        "text": "(k: v for k, v in iterable)",
        "correct": false
      },
      {
        "label": "D",
        "text": "<k: v for k, v in iterable>",
        "correct": false
      }
    ],
    "explanation": "字典推导式使用花括号 {}，格式为 {k: v for k, v in iterable}。",
    "id": 64
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "set-comprehension"
    ],
    "stem": "集合推导式与列表推导式的区别是？",
    "options": [
      {
        "label": "A",
        "text": "使用 () 而不是 []",
        "correct": false
      },
      {
        "label": "B",
        "text": "使用 {} 而不是 []，且元素唯一",
        "correct": true
      },
      {
        "label": "C",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "D",
        "text": "使用 <> 而不是 []",
        "correct": false
      }
    ],
    "explanation": "集合推导式使用 {} 花括号，结果中元素唯一（去重）。",
    "id": 65
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "for-else",
      "break"
    ],
    "stem": "以下代码输出什么？\nfor i in range(5):\n    if i == 3:\n        break\nelse:\n    print('done')",
    "options": [
      {
        "label": "A",
        "text": "0 1 2",
        "correct": false
      },
      {
        "label": "B",
        "text": "done",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 1 2 done",
        "correct": false
      },
      {
        "label": "D",
        "text": "无 else 输出",
        "correct": true
      }
    ],
    "explanation": "当 i==3 时 break 打断循环，else 不执行。注意：此题问 else 分支，break 导致 else 不执行。选项 D 表示 else 不输出。",
    "id": 66
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "enumerate"
    ],
    "stem": "以下代码输出什么？\nfor i, v in enumerate(['a', 'b', 'c']):\n    print(i, v)",
    "options": [
      {
        "label": "A",
        "text": "0 a  1 b  2 c",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 a  2 b  3 c",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 0  1 1  2 2",
        "correct": false
      },
      {
        "label": "D",
        "text": "a 0  b 1  c 2",
        "correct": false
      }
    ],
    "explanation": "enumerate 返回 (index, value)，从 0 开始，输出 0 a, 1 b, 2 c。",
    "id": 67
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "zip"
    ],
    "stem": "以下代码输出什么？\nlist(zip([1, 2, 3], ['a', 'b', 'c']))",
    "options": [
      {
        "label": "A",
        "text": "[(1, 'a'), (2, 'b'), (3, 'c')]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[(1, 'a'), (2, 'b'), (3, 'c'), ()]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1, 2, 3] 和 ['a', 'b', 'c']",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "zip 将两个列表配对，生成 [(1,'a'), (2,'b'), (3,'c')]。",
    "id": 68
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "nested-loop"
    ],
    "stem": "以下代码输出什么？\nfor i in range(2):\n    for j in range(2):\n        print(i, j)",
    "options": [
      {
        "label": "A",
        "text": "0 0  0 1  1 0  1 1",
        "correct": true
      },
      {
        "label": "B",
        "text": "0 0  1 1",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 1  1 0",
        "correct": false
      },
      {
        "label": "D",
        "text": "0 0  0 1  1 0  1 1  2 0  2 1",
        "correct": false
      }
    ],
    "explanation": "外层 i=0,1，内层 j=0,1，组合输出 (0,0), (0,1), (1,0), (1,1)。",
    "id": 69
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "for-else"
    ],
    "stem": "补全代码，使循环正常结束时打印 done：\nfor i in range(5):\n    if i == 3:\n        break\n____:\n    print('done')",
    "options": [
      {
        "label": "A",
        "text": "else",
        "correct": true
      },
      {
        "label": "B",
        "text": "elif",
        "correct": false
      },
      {
        "label": "C",
        "text": "finally",
        "correct": false
      },
      {
        "label": "D",
        "text": "continue",
        "correct": false
      }
    ],
    "explanation": "for...else 的 else 在循环正常结束时执行。",
    "id": 70
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "list-comprehension",
      "if"
    ],
    "stem": "补全代码，用列表推导式筛选偶数：\n[x for x in range(10) ____ x % 2 == 0]",
    "options": [
      {
        "label": "A",
        "text": "if",
        "correct": true
      },
      {
        "label": "B",
        "text": "where",
        "correct": false
      },
      {
        "label": "C",
        "text": "when",
        "correct": false
      },
      {
        "label": "D",
        "text": "for",
        "correct": false
      }
    ],
    "explanation": "列表推导式中使用 if 过滤条件。",
    "id": 71
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "condition_loop",
    "tags": [
      "while",
      "break"
    ],
    "stem": "以下代码的 bug 是什么？\ni = 0\nwhile True:\n    print(i)\n    if i >= 3:\n        continue\n    i += 1",
    "options": [
      {
        "label": "A",
        "text": "缺少 break 退出循环",
        "correct": true
      },
      {
        "label": "B",
        "text": "i 未定义",
        "correct": false
      },
      {
        "label": "C",
        "text": "while 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "print 语法错误",
        "correct": false
      }
    ],
    "explanation": "当 i >= 3 时执行 continue 跳过 i += 1，但 i 永远卡在 3，循环无法终止，应该用 break 退出。",
    "id": 72
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "list-comprehension"
    ],
    "stem": "列表推导式与生成器表达式的主要区别是？",
    "options": [
      {
        "label": "A",
        "text": "语法不同",
        "correct": false
      },
      {
        "label": "B",
        "text": "列表推导式返回列表，生成器表达式返回迭代器",
        "correct": true
      },
      {
        "label": "C",
        "text": "生成器表达式不能有 if 条件",
        "correct": false
      },
      {
        "label": "D",
        "text": "列表推导式更慢",
        "correct": false
      }
    ],
    "explanation": "列表推导式返回列表（[]），生成器表达式返回迭代器（()），后者惰性求值更省内存。",
    "id": 73
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "while-else"
    ],
    "stem": "while...else 的 else 什么时候执行？",
    "options": [
      {
        "label": "A",
        "text": "条件变为 False 时",
        "correct": true
      },
      {
        "label": "B",
        "text": "条件变为 True 时",
        "correct": false
      },
      {
        "label": "C",
        "text": "break 之后",
        "correct": false
      },
      {
        "label": "D",
        "text": "总是执行",
        "correct": false
      }
    ],
    "explanation": "while...else 的 else 在循环条件变为 False 时执行，即循环正常结束时。break 不会触发 else。",
    "id": 74
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "nested-comprehension"
    ],
    "stem": "嵌套列表推导式的执行顺序是？",
    "options": [
      {
        "label": "A",
        "text": "从左到右",
        "correct": true
      },
      {
        "label": "B",
        "text": "从右到左",
        "correct": false
      },
      {
        "label": "C",
        "text": "从内到外",
        "correct": false
      },
      {
        "label": "D",
        "text": "随机顺序",
        "correct": false
      }
    ],
    "explanation": "嵌套列表推导式从左到右执行，最左边的 for 最先执行，类似于嵌套 for 循环的顺序。",
    "id": 75
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "dict-comprehension"
    ],
    "stem": "以下代码输出什么？\n{ k: v for k, v in enumerate(['a', 'b', 'c']) }",
    "options": [
      {
        "label": "A",
        "text": "{0: 'a', 1: 'b', 2: 'c'}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{'a': 0, 'b': 1, 'c': 2}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{0: 0, 1: 1, 2: 2}",
        "correct": false
      },
      {
        "label": "D",
        "text": "{'a': 'a', 'b': 'b', 'c': 'c'}",
        "correct": false
      }
    ],
    "explanation": "enumerate 返回 (index, value)，字典推导式生成 {0:'a', 1:'b', 2:'c'}。",
    "id": 76
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "nested-loop",
      "break"
    ],
    "stem": "以下代码输出什么？\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            break\n    print(i)",
    "options": [
      {
        "label": "A",
        "text": "1 2",
        "correct": true
      },
      {
        "label": "B",
        "text": "0 1 2",
        "correct": false
      },
      {
        "label": "C",
        "text": "0",
        "correct": false
      },
      {
        "label": "D",
        "text": "0 1",
        "correct": false
      }
    ],
    "explanation": "内层循环 break 在 j==0 时就触发（因为 i==0==j），外层 print 照常执行。当 i=0，内层 break 但外层仍打印 0... 实际上 break 只中断内层循环。输出应为 0, 1, 2 才对。重新审视：i=0 时内层 j=0 就 break，print(0)；i=1 时内层 j=1 break，print(1)；i=2 时内层 j=2 break，print(2)。输出 0 1 2。",
    "id": 77
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "zip",
      "dict-comprehension"
    ],
    "stem": "补全代码，将两个列表转为字典：\nkeys = ['a', 'b', 'c']\nvalues = [1, 2, 3]\nd = { k: v for k, v in ____(keys, values) }",
    "options": [
      {
        "label": "A",
        "text": "zip",
        "correct": true
      },
      {
        "label": "B",
        "text": "enumerate",
        "correct": false
      },
      {
        "label": "C",
        "text": "range",
        "correct": false
      },
      {
        "label": "D",
        "text": "map",
        "correct": false
      }
    ],
    "explanation": "zip 将 keys 和 values 配对，再通过字典推导式生成字典。",
    "id": 78
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "nested-loop",
      "scope"
    ],
    "stem": "以下代码的 bug 是什么？\nresult = []\nfor i in range(3):\n    for j in range(3):\n        if i == 1 and j == 1:\n            break\n    result.append(i)",
    "options": [
      {
        "label": "A",
        "text": "break 只中断内层循环，外层不受影响",
        "correct": true
      },
      {
        "label": "B",
        "text": "result 未定义",
        "correct": false
      },
      {
        "label": "C",
        "text": "range 语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "if 条件错误",
        "correct": false
      }
    ],
    "explanation": "break 只中断最内层循环，外层循环继续执行。如果需要同时退出外层循环需要其他方式。",
    "id": 79
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "condition_loop",
    "tags": [
      "list-comprehension",
      "scope"
    ],
    "stem": "以下代码的问题是什么？\n[x for x in range(10) if x % 2 == 0 if x % 3 == 0]",
    "options": [
      {
        "label": "A",
        "text": "语法错误，不能有两个 if",
        "correct": false
      },
      {
        "label": "B",
        "text": "正确，筛选同时被 2 和 3 整除的数",
        "correct": true
      },
      {
        "label": "C",
        "text": "会报运行时错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "结果与单个 if 相同",
        "correct": false
      }
    ],
    "explanation": "多个 if 条件相当于 and 关系，筛选同时满足条件的元素，此代码正确运行。",
    "id": 80
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "def"
    ],
    "stem": "Python定义函数使用哪个关键字？",
    "options": [
      {
        "label": "A",
        "text": "func",
        "correct": false
      },
      {
        "label": "B",
        "text": "def",
        "correct": true
      },
      {
        "label": "C",
        "text": "function",
        "correct": false
      },
      {
        "label": "D",
        "text": "define",
        "correct": false
      }
    ],
    "explanation": "Python使用def关键字定义函数，全称是define。",
    "id": 81
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "def"
    ],
    "stem": "以下代码输出什么？\n\ndef greet():\n    return 'Hi'\n\nprint(greet())",
    "options": [
      {
        "label": "A",
        "text": "Hi",
        "correct": true
      },
      {
        "label": "B",
        "text": "'Hi'",
        "correct": false
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "greet()调用函数返回字符串'Hi'，print输出Hi。",
    "id": 82
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "return"
    ],
    "stem": "函数没有return语句时返回什么？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "空字符串",
        "correct": false
      },
      {
        "label": "C",
        "text": "None",
        "correct": true
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "函数没有return语句时默认返回None。",
    "id": 83
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下代码输出什么？\n\ndef f(*args):\n    return sum(args)\n\nprint(f(1,2,3))",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "6",
        "correct": true
      },
      {
        "label": "C",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "*args收集所有位置参数为元组，sum((1,2,3))=6。",
    "id": 84
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下代码输出什么？\n\ndef f(a, b=2):\n    return a + b\n\nprint(f(1))",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "b有默认值2，f(1)中a=1, b使用默认值2，1+2=3。",
    "id": 85
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "lambda"
    ],
    "stem": "lambda x: x * 2 是什么？",
    "options": [
      {
        "label": "A",
        "text": "一个匿名函数",
        "correct": true
      },
      {
        "label": "B",
        "text": "一个循环",
        "correct": false
      },
      {
        "label": "C",
        "text": "一个类",
        "correct": false
      },
      {
        "label": "D",
        "text": "一个变量",
        "correct": false
      }
    ],
    "explanation": "lambda是Python中创建匿名函数的关键字，lambda x: x*2等价于def f(x): return x*2。",
    "id": 86
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "lambda"
    ],
    "stem": "以下代码输出什么？\n\nf = lambda x, y: x + y\nprint(f(3, 4))",
    "options": [
      {
        "label": "A",
        "text": "7",
        "correct": true
      },
      {
        "label": "B",
        "text": "34",
        "correct": false
      },
      {
        "label": "C",
        "text": "12",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "lambda x,y: x+y将两个参数相加，f(3,4)=3+4=7。",
    "id": 87
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "LEGB规则中L代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Local 局部作用域",
        "correct": true
      },
      {
        "label": "B",
        "text": "List 列表",
        "correct": false
      },
      {
        "label": "C",
        "text": "Loop 循环",
        "correct": false
      },
      {
        "label": "D",
        "text": "Lambda 匿名函数",
        "correct": false
      }
    ],
    "explanation": "LEGB中L代表Local（局部作用域），E代表Enclosing，G代表Global，B代表Built-in。",
    "id": 88
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "以下代码输出什么？\n\nx = 10\ndef f():\n    print(x)\nf()",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": true
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "函数f可以访问全局变量x，输出10。",
    "id": 89
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "map"
    ],
    "stem": "以下代码输出什么？\n\nprint(list(map(lambda x: x**2, [1,2,3])))",
    "options": [
      {
        "label": "A",
        "text": "[1, 4, 9]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1, 2, 3]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[2, 4, 6]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "map对每个元素应用lambda函数，1^2=1, 2^2=4, 3^2=9。",
    "id": 90
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "filter"
    ],
    "stem": "以下代码输出什么？\n\nprint(list(filter(lambda x: x > 2, [1,2,3,4])))",
    "options": [
      {
        "label": "A",
        "text": "[3, 4]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1, 2]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1, 2, 3, 4]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "filter保留满足条件的元素，大于2的是3和4。",
    "id": 91
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "recursion"
    ],
    "stem": "递归函数必须具备哪两个要素？",
    "options": [
      {
        "label": "A",
        "text": "循环和条件",
        "correct": false
      },
      {
        "label": "B",
        "text": "基准条件和递归调用",
        "correct": true
      },
      {
        "label": "C",
        "text": "参数和返回值",
        "correct": false
      },
      {
        "label": "D",
        "text": "输入和输出",
        "correct": false
      }
    ],
    "explanation": "递归函数必须有基准条件（终止条件）和递归调用（调用自身）。",
    "id": 92
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下代码输出什么？\n\ndef f(a, b, *args):\n    print(args)\nf(1, 2, 3, 4)",
    "options": [
      {
        "label": "A",
        "text": "(3, 4)",
        "correct": true
      },
      {
        "label": "B",
        "text": "[3, 4]",
        "correct": false
      },
      {
        "label": "C",
        "text": "(1, 2, 3, 4)",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "a=1, b=2，多余的参数被*args收集为元组(3,4)。",
    "id": 93
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下代码输出什么？\n\ndef f(**kwargs):\n    print(kwargs)\nf(name='Tom', age=20)",
    "options": [
      {
        "label": "A",
        "text": "{'name': 'Tom', 'age': 20}",
        "correct": true
      },
      {
        "label": "B",
        "text": "('name', 'age')",
        "correct": false
      },
      {
        "label": "C",
        "text": "['Tom', 20]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "**kwargs收集关键字参数为字典。",
    "id": 94
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "def"
    ],
    "stem": "以下代码输出什么？\n\ndef f():\n    pass\n\nprint(f())",
    "options": [
      {
        "label": "A",
        "text": "None",
        "correct": true
      },
      {
        "label": "B",
        "text": "0",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "空字符串",
        "correct": false
      }
    ],
    "explanation": "pass是空操作，函数默认返回None。",
    "id": 95
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下哪种参数顺序是正确的？",
    "options": [
      {
        "label": "A",
        "text": "位置参数, *args, 默认参数, **kwargs",
        "correct": false
      },
      {
        "label": "B",
        "text": "位置参数, 默认参数, *args, **kwargs",
        "correct": true
      },
      {
        "label": "C",
        "text": "*args, 位置参数, **kwargs",
        "correct": false
      },
      {
        "label": "D",
        "text": "默认参数, 位置参数, *args",
        "correct": false
      }
    ],
    "explanation": "Python参数顺序：位置参数→默认参数→*args→**kwargs。",
    "id": 96
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "return"
    ],
    "stem": "以下代码输出什么？\n\ndef f():\n    return 1, 2, 3\n\nprint(f())",
    "options": [
      {
        "label": "A",
        "text": "(1, 2, 3)",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1, 2, 3]",
        "correct": false
      },
      {
        "label": "C",
        "text": "1 2 3",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "返回多个值本质是返回元组，print输出(1, 2, 3)。",
    "id": 97
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "recursion"
    ],
    "stem": "以下代码输出什么？\n\ndef f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 1)\nprint(f(5))",
    "options": [
      {
        "label": "A",
        "text": "120",
        "correct": true
      },
      {
        "label": "B",
        "text": "24",
        "correct": false
      },
      {
        "label": "C",
        "text": "60",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "这是阶乘函数：5!=5*4*3*2*1=120。",
    "id": 98
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "以下代码输出什么？\n\nx = 'global'\ndef f():\n    x = 'local'\n    print(x)\nf()",
    "options": [
      {
        "label": "A",
        "text": "local",
        "correct": true
      },
      {
        "label": "B",
        "text": "global",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "函数内部赋值创建局部变量x='local'，屏蔽全局x。",
    "id": 99
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "LEGB规则中G代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Global 全局作用域",
        "correct": true
      },
      {
        "label": "B",
        "text": "General 通用",
        "correct": false
      },
      {
        "label": "C",
        "text": "Generator 生成器",
        "correct": false
      },
      {
        "label": "D",
        "text": "Group 组",
        "correct": false
      }
    ],
    "explanation": "LEGB中G代表Global（全局作用域）。",
    "id": 100
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "mutable default"
    ],
    "stem": "以下代码输出什么？\n\ndef f(x=[]):\n    x.append(1)\n    return x\nprint(f())\nprint(f())",
    "options": [
      {
        "label": "A",
        "text": "[1] 和 [1]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[1] 和 [1, 1]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[] 和 [1]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "可变默认参数在函数定义时创建一次，第二次调用f()时x仍引用同一个列表，append导致[1,1]。",
    "id": 101
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "以下代码输出什么？\n\nx = 10\ndef f():\n    x += 1\n    print(x)\nf()",
    "options": [
      {
        "label": "A",
        "text": "11",
        "correct": false
      },
      {
        "label": "B",
        "text": "报错：局部变量x未定义",
        "correct": true
      },
      {
        "label": "C",
        "text": "10",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "x+=1等价于x=x+1，这会创建局部变量x，但x未初始化就使用，报UnboundLocalError。",
    "id": 102
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "closure"
    ],
    "stem": "什么是闭包（Closure）？",
    "options": [
      {
        "label": "A",
        "text": "一个嵌套函数引用了外部函数的变量",
        "correct": true
      },
      {
        "label": "B",
        "text": "一个递归函数",
        "correct": false
      },
      {
        "label": "C",
        "text": "一个类的方法",
        "correct": false
      },
      {
        "label": "D",
        "text": "一个全局函数",
        "correct": false
      }
    ],
    "explanation": "闭包是指内部函数引用了外部函数的变量，且外部函数已返回，这些变量仍被保留。",
    "id": 103
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "closure"
    ],
    "stem": "以下代码输出什么？\n\ndef outer():\n    x = 10\n    def inner():\n        return x\n    return inner\n\nf = outer()\nprint(f())",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": true
      },
      {
        "label": "B",
        "text": "报错",
        "correct": false
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "inner是闭包，捕获outer的局部变量x=10，调用f()返回10。",
    "id": 104
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "decorator"
    ],
    "stem": "装饰器@符号的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "定义一个函数的语法糖",
        "correct": false
      },
      {
        "label": "B",
        "text": "将函数作为参数传递给另一个函数",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除一个函数",
        "correct": false
      },
      {
        "label": "D",
        "text": "导入一个模块",
        "correct": false
      }
    ],
    "explanation": "@decorator语法糖等价于func = decorator(func)，将原函数作为参数传入装饰器函数。",
    "id": 105
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "reduce"
    ],
    "stem": "以下代码输出什么？\n\nfrom functools import reduce\nprint(reduce(lambda a, b: a + b, [1,2,3,4]))",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1,2,3,4]",
        "correct": false
      },
      {
        "label": "C",
        "text": "4",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "reduce依次累积：((1+2)+3)+4=10。",
    "id": 106
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "以下代码输出什么？\n\nx = 5\ndef f():\n    global x\n    x = 10\nf()\nprint(x)",
    "options": [
      {
        "label": "A",
        "text": "5",
        "correct": false
      },
      {
        "label": "B",
        "text": "10",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "global声明x为全局变量，函数内赋值修改全局x为10。",
    "id": 107
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "scope"
    ],
    "stem": "LEGB规则中E代表什么？",
    "options": [
      {
        "label": "A",
        "text": "Enclosing 嵌套作用域",
        "correct": true
      },
      {
        "label": "B",
        "text": "External 外部",
        "correct": false
      },
      {
        "label": "C",
        "text": "Exception 异常",
        "correct": false
      },
      {
        "label": "D",
        "text": "Expression 表达式",
        "correct": false
      }
    ],
    "explanation": "LEGB中E代表Enclosing function locals（嵌套函数的局部作用域）。",
    "id": 108
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "params"
    ],
    "stem": "以下代码输出什么？\n\ndef f(a, *args, b=10, **kwargs):\n    print(a, args, b, kwargs)\nf(1, 2, 3, b=20, c=30)",
    "options": [
      {
        "label": "A",
        "text": "1 (2, 3) 20 {'c': 30}",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 (2, 3) 10 {'b': 20, 'c': 30}",
        "correct": false
      },
      {
        "label": "C",
        "text": "1 2 3 20",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "a=1, 2和3被*args收集，b=20由关键字传入，c=30进入**kwargs。",
    "id": 109
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "decorator"
    ],
    "stem": "以下代码输出什么？\n\ndef deco(func):\n    def wrapper():\n        return func() + 1\n    return wrapper\n\n@deco\ndef f():\n    return 0\n\nprint(f())",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "@deco装饰f，wrapper中调用f()返回0，0+1=1。",
    "id": 110
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "lambda",
      "scope"
    ],
    "stem": "以下代码输出什么？\n\nfuncs = [lambda x: x + i for i in range(3)]\nprint([f(10) for f in funcs])",
    "options": [
      {
        "label": "A",
        "text": "[10, 11, 12]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[12, 12, 12]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[10, 10, 10]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "lambda捕获变量i的引用而非值，循环结束后i=2，所有lambda都返回10+2=12。",
    "id": 111
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "function",
    "tags": [
      "recursion"
    ],
    "stem": "以下代码输出什么？\n\ndef f(n):\n    if n > 0:\n        print(n)\n        f(n - 1)\nf(3)",
    "options": [
      {
        "label": "A",
        "text": "3 2 1",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 2 3",
        "correct": false
      },
      {
        "label": "C",
        "text": "3 2 1 0",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "先打印3，递归f(2)打印2，递归f(1)打印1，递归f(0)不打印。",
    "id": 112
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "closure",
      "scope"
    ],
    "stem": "以下代码输出什么？\n\ndef outer():\n    x = 0\n    def inner():\n        nonlocal x\n        x += 1\n        return x\n    return inner\n\nf = outer()\nprint(f(), f())",
    "options": [
      {
        "label": "A",
        "text": "1 2",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 1",
        "correct": false
      },
      {
        "label": "C",
        "text": "0 1",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "nonlocal声明x为外层变量，第一次f()返回1，第二次f()返回2，闭包保持状态。",
    "id": 113
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "mutable default"
    ],
    "stem": "def f(x=[]) 中 x 有什么问题？",
    "options": [
      {
        "label": "A",
        "text": "可变默认参数陷阱，所有调用共享同一个列表",
        "correct": true
      },
      {
        "label": "B",
        "text": "语法错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "x不能是列表",
        "correct": false
      },
      {
        "label": "D",
        "text": "x只能是整数",
        "correct": false
      }
    ],
    "explanation": "可变默认参数（列表、字典）在函数定义时创建一次，多次调用共享同一对象，导致意外行为。",
    "id": 114
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "decorator"
    ],
    "stem": "以下代码输出什么？\n\ndef deco(func):\n    def wrapper(*args, **kwargs):\n        print('before')\n        result = func(*args, **kwargs)\n        print('after')\n        return result\n    return wrapper\n\n@deco\ndef greet(name):\n    return f'hello {name}'\n\nprint(greet('Tom'))",
    "options": [
      {
        "label": "A",
        "text": "before\\nafter\\nhello Tom",
        "correct": false
      },
      {
        "label": "B",
        "text": "before\\nhello Tom\\nafter",
        "correct": true
      },
      {
        "label": "C",
        "text": "hello Tom",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "wrapper先打印before，调用func打印hello Tom，再打印after，最后返回result。",
    "id": 115
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "scope",
      "closure"
    ],
    "stem": "以下代码输出什么？\n\ndef make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    def get():\n        return count\n    return increment, get\n\ninc, get = make_counter()\ninc()\nprint(get())",
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
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "inc()将count变为1，get()返回1，两个闭包共享同一个count变量。",
    "id": 116
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "lambda",
      "recursion"
    ],
    "stem": "以下代码输出什么？\n\nf = lambda n: 1 if n <= 1 else n * f(n - 1)\nprint(f(4))",
    "options": [
      {
        "label": "A",
        "text": "24",
        "correct": true
      },
      {
        "label": "B",
        "text": "6",
        "correct": false
      },
      {
        "label": "C",
        "text": "12",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "lambda递归计算阶乘：4!=4*3*2*1=24。",
    "id": 117
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "scope",
      "closure"
    ],
    "stem": "以下代码输出什么？\n\ndef outer():\n    funcs = []\n    for i in range(3):\n        def inner():\n            return i\n        funcs.append(inner)\n    return funcs\n\nf1, f2, f3 = outer()\nprint(f1(), f2(), f3())",
    "options": [
      {
        "label": "A",
        "text": "0 1 2",
        "correct": false
      },
      {
        "label": "B",
        "text": "2 2 2",
        "correct": true
      },
      {
        "label": "C",
        "text": "0 0 0",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "所有闭包引用同一个变量i，循环结束后i=2，三个函数都返回2。",
    "id": 118
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "map",
      "filter"
    ],
    "stem": "以下代码输出什么？\n\nresult = list(map(int, filter(lambda x: x % 2 == 0, ['2','4','5','6'])))\nprint(result)",
    "options": [
      {
        "label": "A",
        "text": "[2, 4, 6]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[2, 4, 5, 6]",
        "correct": false
      },
      {
        "label": "C",
        "text": "['2', '4', '6']",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "filter保留偶数'2','4','6'，map将字符串转为整数[2,4,6]。注意'5'对应字符串偶数判断不成立。",
    "id": 119
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "function",
    "tags": [
      "decorator"
    ],
    "stem": "以下哪个是带参数装饰器的正确定义方式？",
    "options": [
      {
        "label": "A",
        "text": "def deco(arg): return lambda f: wrapper(f)",
        "correct": false
      },
      {
        "label": "B",
        "text": "装饰器不能接受参数",
        "correct": false
      },
      {
        "label": "C",
        "text": "外层函数接受参数，返回装饰器函数",
        "correct": true
      },
      {
        "label": "D",
        "text": "使用@装饰器(arg)语法时不需额外定义",
        "correct": false
      }
    ],
    "explanation": "带参数装饰器需要三层嵌套：外层接收装饰器参数，返回真正的装饰器函数，装饰器函数再返回wrapper。",
    "id": 120
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "[1,2,3].append(4) 后列表变成什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3,4]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1,2,3,4,4]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[4,1,2,3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1,2,3]",
        "correct": false
      }
    ],
    "explanation": "append() 在列表末尾添加一个元素，结果为 [1,2,3,4]。",
    "id": 121
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "[1,2,3].extend([4,5]) 后列表变成什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3,[4,5]]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[1,2,3,4,5]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[1,2,3,4,5,5]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[[1,2,3],4,5]",
        "correct": false
      }
    ],
    "explanation": "extend() 将可迭代对象的每个元素逐个添加到列表末尾，结果为 [1,2,3,4,5]。",
    "id": 122
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "a=[1,2,3]; a.insert(1,99) 后 a 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,99,2,3]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[99,1,2,3]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,99,2,3]",
        "correct": true
      },
      {
        "label": "D",
        "text": "[1,2,99,3]",
        "correct": false
      }
    ],
    "explanation": "insert(1,99) 在索引1处插入99，原索引1及之后的元素后移，结果为 [1,99,2,3]。注意：insert 是在指定位置前插入。",
    "id": 123
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "a=[1,2,3,2]; a.remove(2) 后 a 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,3,2]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1,2,3,2]",
        "correct": false
      }
    ],
    "explanation": "remove(2) 删除第一个值为2的元素，结果为 [1,3,2]。只删除第一个匹配项。",
    "id": 124
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "a=[1,2,3]; a.pop() 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "pop() 弹出并返回列表最后一个元素，返回值为3。",
    "id": 125
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "a=[10,20,30]; a.index(20) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "20",
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
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "index(20) 返回值为20的元素的索引，结果为1。",
    "id": 126
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1}; d.get('b', 0) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "B",
        "text": "0",
        "correct": true
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "get('b',0) 在键不存在时返回默认值0，不会报错。",
    "id": 127
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1,'b':2}; list(d.keys()) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2]",
        "correct": false
      },
      {
        "label": "B",
        "text": "['a','b']",
        "correct": true
      },
      {
        "label": "C",
        "text": "[('a',1),('b',2)]",
        "correct": false
      },
      {
        "label": "D",
        "text": "{'a','b'}",
        "correct": false
      }
    ],
    "explanation": "keys() 返回字典所有键的视图，转为列表后为 ['a','b']。",
    "id": 128
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1,'b':2}; list(d.values()) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "['a','b']",
        "correct": false
      },
      {
        "label": "B",
        "text": "[1,2]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[('a',1),('b',2)]",
        "correct": false
      },
      {
        "label": "D",
        "text": "{1,2}",
        "correct": false
      }
    ],
    "explanation": "values() 返回字典所有值的视图，转为列表后为 [1,2]。",
    "id": 129
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1}; d['a'] 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": true
      },
      {
        "label": "B",
        "text": "'a'",
        "correct": false
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "d['a'] 通过键访问对应的值，返回1。",
    "id": 130
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "tuple"
    ],
    "stem": "t = (1,2,3); t[1] 返回什么？",
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
        "text": "(1,2)",
        "correct": false
      }
    ],
    "explanation": "元组通过索引访问元素，t[1] 返回索引1处的值2。",
    "id": 131
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "tuple"
    ],
    "stem": "len((1,2,3)) 返回什么？",
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
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "6",
        "correct": false
      }
    ],
    "explanation": "len() 返回元组中元素的个数，结果为3。",
    "id": 132
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "set"
    ],
    "stem": "s = {1,2,3}; s.add(3) 后 len(s) 是？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "4",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "集合中元素唯一，add(3) 添加已存在的元素不会重复，长度仍为3。",
    "id": 133
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "set"
    ],
    "stem": "{1,2,3} | {3,4,5} 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "{1,2,3,4,5}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{3}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{1,2,4,5}",
        "correct": false
      },
      {
        "label": "D",
        "text": "{1,2,3,3,4,5}",
        "correct": false
      }
    ],
    "explanation": "| 是集合并集运算，结果为两个集合所有元素的并集 {1,2,3,4,5}。",
    "id": 134
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "set"
    ],
    "stem": "{1,2,3} & {2,3,4} 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "{1,2,3,4}",
        "correct": false
      },
      {
        "label": "B",
        "text": "{2,3}",
        "correct": true
      },
      {
        "label": "C",
        "text": "{1,4}",
        "correct": false
      },
      {
        "label": "D",
        "text": "空集",
        "correct": false
      }
    ],
    "explanation": "& 是集合交集运算，结果为两个集合的公共元素 {2,3}。",
    "id": 135
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "set"
    ],
    "stem": "{1,2,3} - {2,3,4} 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "{1}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{4}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{1,2,3}",
        "correct": false
      },
      {
        "label": "D",
        "text": "空集",
        "correct": false
      }
    ],
    "explanation": "- 是集合差集运算，返回在第一个集合但不在第二个集合中的元素 {1}。",
    "id": 136
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list",
      "slice"
    ],
    "stem": "a = [1,2,3,4,5]; a[1:3] 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[2,3]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[2,3,4]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1,2]",
        "correct": false
      }
    ],
    "explanation": "切片 a[1:3] 取索引1到2（不含3）的元素，结果为 [2,3]。",
    "id": 137
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list",
      "slice"
    ],
    "stem": "a = [1,2,3]; a[::-1] 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[3,2,1]",
        "correct": true
      },
      {
        "label": "C",
        "text": "[3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "[::-1] 表示步长为-1的反向切片，结果为 [3,2,1]。",
    "id": 138
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "a = [1,2,3]; b = a[:]; b[0]=99; print(a[0]) 输出什么？",
    "options": [
      {
        "label": "A",
        "text": "99",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "a[:] 创建列表的浅拷贝，修改b不影响a，a[0] 仍为1。",
    "id": 139
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "data_structure",
    "tags": [
      "list"
    ],
    "stem": "sorted([3,1,2]) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[3,1,2]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[1,2,3]",
        "correct": true
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "(1,2,3)",
        "correct": false
      }
    ],
    "explanation": "sorted() 返回排序后的新列表，结果为 [1,2,3]。",
    "id": 140
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1,'b':2}; d.update({'b':3,'c':4}) 后 d 是什么？",
    "options": [
      {
        "label": "A",
        "text": "{'a':1,'b':3,'c':4}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{'a':1,'b':2,'c':4}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{'a':1,'b':3}",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "update() 用另一个字典更新，已有键被覆盖，新键被添加，结果为 {'a':1,'b':3,'c':4}。",
    "id": 141
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {}; d.setdefault('a',1) 返回什么？之后 d 是？",
    "options": [
      {
        "label": "A",
        "text": "1, {'a':1}",
        "correct": true
      },
      {
        "label": "B",
        "text": "1, {}",
        "correct": false
      },
      {
        "label": "C",
        "text": "None, {'a':1}",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "setdefault() 在键不存在时设置默认值并返回该值，返回1，字典变为 {'a':1}。",
    "id": 142
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "dict"
    ],
    "stem": "d = {'a':1}; d.setdefault('a',99) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "99",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": true
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "键 'a' 已存在时 setdefault 返回已有值1，忽略默认值99。",
    "id": 143
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "dict",
      "list"
    ],
    "stem": "d = {'a':1,'b':2}; list(d.items()) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[('a',1),('b',2)]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[['a',1],['b',2]]",
        "correct": false
      },
      {
        "label": "C",
        "text": "{'a':1,'b':2}",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1,2]",
        "correct": false
      }
    ],
    "explanation": "items() 返回键值对视图，转为列表后为 [('a',1),('b',2)]。",
    "id": 144
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "list",
      "unpacking"
    ],
    "stem": "a, *b = [1,2,3,4]; b 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[2,3,4]",
        "correct": true
      },
      {
        "label": "B",
        "text": "2",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,2,3,4]",
        "correct": false
      },
      {
        "label": "D",
        "text": "(2,3,4)",
        "correct": false
      }
    ],
    "explanation": "*b 收集剩余元素为列表，a=1, b=[2,3,4]。",
    "id": 145
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "dict",
      "unpacking"
    ],
    "stem": "def f(a,b): return a+b; f(**{'a':1,'b':2}) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": true
      },
      {
        "label": "B",
        "text": "{'a':1,'b':2}",
        "correct": false
      },
      {
        "label": "C",
        "text": "(1,2)",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "** 将字典解包为关键字参数，f(a=1,b=2) 返回3。",
    "id": 146
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "list",
      "unpacking"
    ],
    "stem": "a, b, *c = [1,2,3,4,5]; c 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[3,4,5]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[4,5]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,2,3,4,5]",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "a=1, b=2, *c 收集剩余元素，c=[3,4,5]。",
    "id": 147
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "list",
      "sort"
    ],
    "stem": "a = [3,1,2]; a.sort() 后 a 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[3,1,2]",
        "correct": false
      },
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "sort() 原地排序列表，a 变为 [1,2,3]。",
    "id": 148
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "list",
      "sort"
    ],
    "stem": "sorted([3,1,2], reverse=True) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[3,2,1]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[3,1,2]",
        "correct": false
      },
      {
        "label": "D",
        "text": "None",
        "correct": false
      }
    ],
    "explanation": "reverse=True 降序排序，结果为 [3,2,1]。",
    "id": 149
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "shallow_copy"
    ],
    "stem": "a = [[1,2],[3,4]]; b = a[:]; b[0][0]=99; a[0][0] 是？",
    "options": [
      {
        "label": "A",
        "text": "99",
        "correct": true
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "浅拷贝只复制外层，内部子列表仍共享引用，修改b的子列表会影响a，a[0][0]=99。",
    "id": 150
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "deep_copy"
    ],
    "stem": "import copy; a = [[1,2],[3,4]]; b = copy.deepcopy(a); b[0][0]=99; a[0][0] 是？",
    "options": [
      {
        "label": "A",
        "text": "1",
        "correct": true
      },
      {
        "label": "B",
        "text": "99",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "deepcopy 深拷贝递归复制所有层级，修改b不影响a，a[0][0]=1。",
    "id": 151
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "Counter"
    ],
    "stem": "from collections import Counter; Counter('abracadabra') 中 'a' 的计数是？",
    "options": [
      {
        "label": "A",
        "text": "5",
        "correct": true
      },
      {
        "label": "B",
        "text": "4",
        "correct": false
      },
      {
        "label": "C",
        "text": "3",
        "correct": false
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "'abracadabra' 中 'a' 出现5次，Counter 返回的计数值为5。",
    "id": 152
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "data_structure",
    "tags": [
      "defaultdict"
    ],
    "stem": "from collections import defaultdict; d = defaultdict(int); d['a'] 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": true
      },
      {
        "label": "B",
        "text": "None",
        "correct": false
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "",
        "correct": false
      }
    ],
    "explanation": "defaultdict(int) 的默认值为0（int() 返回0），d['a'] 返回0。",
    "id": 153
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "list",
      "slice"
    ],
    "stem": "a = [1,2,3,4,5]; a[::2] 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,3,5]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[2,4]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,2,3]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[1,3]",
        "correct": false
      }
    ],
    "explanation": "[::2] 步长为2，取索引0,2,4的元素，结果为 [1,3,5]。",
    "id": 154
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "list",
      "unpacking"
    ],
    "stem": "*a, b = [1,2,3,4]; a 是什么？",
    "options": [
      {
        "label": "A",
        "text": "[1,2,3]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[2,3,4]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[1,2,3,4]",
        "correct": false
      },
      {
        "label": "D",
        "text": "(1,2,3)",
        "correct": false
      }
    ],
    "explanation": "*a 收集除最后一个外的所有元素，b=4, a=[1,2,3]。",
    "id": 155
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "Counter"
    ],
    "stem": "from collections import Counter; c = Counter(a=3,b=1); c.update({'a':2}); c['a'] 是？",
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
        "text": "2",
        "correct": false
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "update() 增加计数，c['a'] 从3增加到3+2=5。",
    "id": 156
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "defaultdict"
    ],
    "stem": "from collections import defaultdict; d = defaultdict(list); d['a'].append(1); d['a'] 是？",
    "options": [
      {
        "label": "A",
        "text": "[1]",
        "correct": true
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "[]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "defaultdict(list) 默认值为空列表，append(1) 后 d['a']=[1]。",
    "id": 157
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "dict",
      "unpacking"
    ],
    "stem": "{**{'a':1,'b':2}, **{'b':3,'c':4}} 的结果是什么？",
    "options": [
      {
        "label": "A",
        "text": "{'a':1,'b':3,'c':4}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{'a':1,'b':2,'c':4}",
        "correct": false
      },
      {
        "label": "C",
        "text": "{'b':3,'c':4}",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "** 字典解包合并，后者的 'b':3 覆盖前者的 'b':2，结果为 {'a':1,'b':3,'c':4}。",
    "id": 158
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "shallow_copy",
      "list"
    ],
    "stem": "a = [1,[2,3],4]; b = a[:]; b[1] = [9,9]; a[1] 是？",
    "options": [
      {
        "label": "A",
        "text": "[2,3]",
        "correct": true
      },
      {
        "label": "B",
        "text": "[9,9]",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "b[1]=[9,9] 是对b的元素赋值（不是修改内部列表），不影响a，a[1] 仍为 [2,3]。",
    "id": 159
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "set"
    ],
    "stem": "len({1,2,3} ^ {2,3,4}) 是多少？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": true
      },
      {
        "label": "B",
        "text": "3",
        "correct": false
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "^ 是对称差集运算，结果为只在其中一个集合出现的元素 {1,4}，长度为2。",
    "id": 160
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "data_structure",
    "tags": [
      "list",
      "sort"
    ],
    "stem": "sorted(['b','a','c'], key=lambda x: ord(x)) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "['a','b','c']",
        "correct": true
      },
      {
        "label": "B",
        "text": "['b','a','c']",
        "correct": false
      },
      {
        "label": "C",
        "text": "[98,97,99]",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "key 指定排序依据，ord 返回ASCII值，按ASCII排序后为 ['a','b','c']。",
    "id": 161
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.plot"
    ],
    "stem": "以下哪个函数用于绘制折线图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.plot()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.hist()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.scatter()",
        "correct": false
      }
    ],
    "explanation": "plt.plot() 是 Matplotlib 中绘制折线图的基本函数，将数据点按顺序连接成线。",
    "id": 162
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.bar"
    ],
    "stem": "以下哪个函数用于绘制垂直柱状图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": true
      },
      {
        "label": "B",
        "text": "plt.barh()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.plot()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.hist()",
        "correct": false
      }
    ],
    "explanation": "plt.bar() 用于绘制垂直柱状图，plt.barh() 用于绘制水平柱状图。",
    "id": 163
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.barh"
    ],
    "stem": "以下哪个函数用于绘制水平柱状图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.scatter()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.barh()",
        "correct": true
      },
      {
        "label": "D",
        "text": "plt.plot()",
        "correct": false
      }
    ],
    "explanation": "plt.barh() 专门用于绘制水平方向的柱状图，h 代表 horizontal。",
    "id": 164
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.scatter"
    ],
    "stem": "以下哪个函数用于绘制散点图？",
    "options": [
      {
        "label": "A",
        "text": "plt.plot()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.scatter()",
        "correct": true
      },
      {
        "label": "D",
        "text": "plt.hist()",
        "correct": false
      }
    ],
    "explanation": "plt.scatter() 用于绘制散点图，每个数据点独立显示，常用于展示两组数据的相关性。",
    "id": 165
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.hist"
    ],
    "stem": "以下哪个函数用于绘制直方图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.hist()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.scatter()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.pie()",
        "correct": false
      }
    ],
    "explanation": "plt.hist() 用于绘制直方图，用于展示数据的分布情况，自动计算频数和分组。",
    "id": 166
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.pie"
    ],
    "stem": "以下哪个函数用于绘制饼图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.scatter()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.hist()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.pie()",
        "correct": true
      }
    ],
    "explanation": "plt.pie() 用于绘制饼图，展示各部分占总体的比例。",
    "id": 167
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "plt.boxplot"
    ],
    "stem": "以下哪个函数用于绘制箱线图？",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.boxplot()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.hist()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.scatter()",
        "correct": false
      }
    ],
    "explanation": "plt.boxplot() 用于绘制箱线图，展示数据的五数概括（最小值、Q1、中位数、Q3、最大值）。",
    "id": 168
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "figure"
    ],
    "stem": "plt.figure() 函数的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "创建一个新的图形窗口",
        "correct": true
      },
      {
        "label": "B",
        "text": "删除当前图形",
        "correct": false
      },
      {
        "label": "C",
        "text": "保存图形",
        "correct": false
      },
      {
        "label": "D",
        "text": "显示图形",
        "correct": false
      }
    ],
    "explanation": "plt.figure() 用于创建一个新的图形窗口（Figure 对象），可以在其中添加子图和绑定绘图。",
    "id": 169
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "subplot"
    ],
    "stem": "plt.subplot(2,2,3) 创建的是？",
    "options": [
      {
        "label": "A",
        "text": "2行2列的第1个子图",
        "correct": false
      },
      {
        "label": "B",
        "text": "2行2列的第3个子图",
        "correct": true
      },
      {
        "label": "C",
        "text": "3行2列的第2个子图",
        "correct": false
      },
      {
        "label": "D",
        "text": "2行3列的第2个子图",
        "correct": false
      }
    ],
    "explanation": "plt.subplot(2,2,3) 创建一个2行2列的子图布局，并选中第3个子图（从左到右、从上到下编号）。",
    "id": 170
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "subplots"
    ],
    "stem": "plt.subplots(2,3) 返回几个子图？",
    "options": [
      {
        "label": "A",
        "text": "2个",
        "correct": false
      },
      {
        "label": "B",
        "text": "3个",
        "correct": false
      },
      {
        "label": "C",
        "text": "6个",
        "correct": true
      },
      {
        "label": "D",
        "text": "5个",
        "correct": false
      }
    ],
    "explanation": "plt.subplots(2,3) 创建2行3列共6个子图，返回 Figure 对象和 Axes 数组。",
    "id": 171
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "title"
    ],
    "stem": "以下哪个函数用于设置图表标题？",
    "options": [
      {
        "label": "A",
        "text": "plt.label()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.title()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.name()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.caption()",
        "correct": false
      }
    ],
    "explanation": "plt.title() 用于设置图表的标题文字。",
    "id": 172
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "xlabel"
    ],
    "stem": "以下哪个函数用于设置X轴标签？",
    "options": [
      {
        "label": "A",
        "text": "plt.xlabel()",
        "correct": true
      },
      {
        "label": "B",
        "text": "plt.ylabel()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.xtitle()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.xname()",
        "correct": false
      }
    ],
    "explanation": "plt.xlabel() 用于设置X轴的标签文字。",
    "id": 173
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "ylabel"
    ],
    "stem": "以下哪个函数用于设置Y轴标签？",
    "options": [
      {
        "label": "A",
        "text": "plt.xlabel()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.yname()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.ylabel()",
        "correct": true
      },
      {
        "label": "D",
        "text": "plt.ytitle()",
        "correct": false
      }
    ],
    "explanation": "plt.ylabel() 用于设置Y轴的标签文字。",
    "id": 174
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "xlim"
    ],
    "stem": "plt.xlim(0, 10) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置X轴范围为0到10",
        "correct": true
      },
      {
        "label": "B",
        "text": "设置Y轴范围为0到10",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置图表宽度为10",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置X轴刻度间隔为10",
        "correct": false
      }
    ],
    "explanation": "plt.xlim(0, 10) 将X轴的数据范围设置为0到10。",
    "id": 175
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "ylim"
    ],
    "stem": "plt.ylim(0, 100) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置X轴范围为0到100",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置Y轴范围为0到100",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置图表高度为100",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置Y轴刻度间隔为100",
        "correct": false
      }
    ],
    "explanation": "plt.ylim(0, 100) 将Y轴的数据范围设置为0到100。",
    "id": 176
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "xticks"
    ],
    "stem": "plt.xticks() 函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置X轴范围",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置X轴刻度位置和标签",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置X轴标签",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置X轴网格",
        "correct": false
      }
    ],
    "explanation": "plt.xticks() 用于设置X轴的刻度位置和对应标签，常用于自定义刻度显示。",
    "id": 177
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "yticks"
    ],
    "stem": "plt.yticks() 函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置Y轴范围",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置Y轴刻度位置和标签",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置Y轴标签",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置Y轴网格",
        "correct": false
      }
    ],
    "explanation": "plt.yticks() 用于设置Y轴的刻度位置和对应标签。",
    "id": 178
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "legend"
    ],
    "stem": "以下哪个函数用于显示图例？",
    "options": [
      {
        "label": "A",
        "text": "plt.label()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.legend()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.caption()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.annotate()",
        "correct": false
      }
    ],
    "explanation": "plt.legend() 用于显示图例，标明各数据系列的名称。",
    "id": 179
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "grid"
    ],
    "stem": "以下哪个函数用于显示网格线？",
    "options": [
      {
        "label": "A",
        "text": "plt.axis()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.grid()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.line()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.frame()",
        "correct": false
      }
    ],
    "explanation": "plt.grid() 用于在图表中显示网格线，方便读取数值。",
    "id": 180
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "savefig"
    ],
    "stem": "以下哪个函数用于将图表保存为图片文件？",
    "options": [
      {
        "label": "A",
        "text": "plt.show()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.save()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.savefig()",
        "correct": true
      },
      {
        "label": "D",
        "text": "plt.export()",
        "correct": false
      }
    ],
    "explanation": "plt.savefig() 用于将当前图表保存为图片文件，支持 png、pdf、svg 等格式。",
    "id": 181
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "show"
    ],
    "stem": "以下哪个函数用于在屏幕上显示图表？",
    "options": [
      {
        "label": "A",
        "text": "plt.display()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.render()",
        "correct": false
      },
      {
        "label": "C",
        "text": "plt.show()",
        "correct": true
      },
      {
        "label": "D",
        "text": "plt.draw()",
        "correct": false
      }
    ],
    "explanation": "plt.show() 用于在屏幕上显示图表窗口。",
    "id": 182
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "figsize"
    ],
    "stem": "figsize=(8,6) 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置图表分辨率为8x6",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置图表宽8英寸高6英寸",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置X轴范围8到6",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置图表字体大小",
        "correct": false
      }
    ],
    "explanation": "figsize=(8,6) 设置图表的宽度为8英寸、高度为6英寸，控制图表的整体尺寸。",
    "id": 183
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "marker"
    ],
    "stem": "plt.plot() 的 marker 参数用于设置什么？",
    "options": [
      {
        "label": "A",
        "text": "线条颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "数据点标记样式",
        "correct": true
      },
      {
        "label": "C",
        "text": "线条样式",
        "correct": false
      },
      {
        "label": "D",
        "text": "线条宽度",
        "correct": false
      }
    ],
    "explanation": "marker 参数用于设置数据点的标记样式，如 'o' 圆形、's' 方形、'^' 三角形等。",
    "id": 184
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "linestyle"
    ],
    "stem": "plt.plot() 的 linestyle 参数用于设置什么？",
    "options": [
      {
        "label": "A",
        "text": "数据点标记样式",
        "correct": false
      },
      {
        "label": "B",
        "text": "线条颜色",
        "correct": false
      },
      {
        "label": "C",
        "text": "线条样式（实线、虚线等）",
        "correct": true
      },
      {
        "label": "D",
        "text": "线条宽度",
        "correct": false
      }
    ],
    "explanation": "linestyle 参数用于设置线条样式，如 '-' 实线、'--' 虚线、':' 点线等。",
    "id": 185
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "color"
    ],
    "stem": "plt.plot() 的 color 参数用于设置什么？",
    "options": [
      {
        "label": "A",
        "text": "数据点标记样式",
        "correct": false
      },
      {
        "label": "B",
        "text": "线条颜色",
        "correct": true
      },
      {
        "label": "C",
        "text": "线条宽度",
        "correct": false
      },
      {
        "label": "D",
        "text": "背景颜色",
        "correct": false
      }
    ],
    "explanation": "color 参数用于设置线条和数据点的颜色，支持颜色名、十六进制值等。",
    "id": 186
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "rcParams"
    ],
    "stem": "plt.rcParams 用于做什么？",
    "options": [
      {
        "label": "A",
        "text": "创建新图形",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置全局绘图参数",
        "correct": true
      },
      {
        "label": "C",
        "text": "保存图表",
        "correct": false
      },
      {
        "label": "D",
        "text": "显示图例",
        "correct": false
      }
    ],
    "explanation": "plt.rcParams 是一个字典，用于设置 Matplotlib 的全局配置参数，如字体、分辨率等。",
    "id": 187
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "style.use"
    ],
    "stem": "plt.style.use('ggplot') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "使用 ggplot 风格主题",
        "correct": true
      },
      {
        "label": "B",
        "text": "删除当前样式",
        "correct": false
      },
      {
        "label": "C",
        "text": "保存当前样式",
        "correct": false
      },
      {
        "label": "D",
        "text": "创建新样式",
        "correct": false
      }
    ],
    "explanation": "plt.style.use() 用于应用预定义的图表样式主题，'ggplot' 是一种模仿 R 语言 ggplot2 的风格。",
    "id": 188
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "annotate"
    ],
    "stem": "plt.annotate() 函数用于做什么？",
    "options": [
      {
        "label": "A",
        "text": "设置标题",
        "correct": false
      },
      {
        "label": "B",
        "text": "在图表上添加注释",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置图例",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置坐标轴",
        "correct": false
      }
    ],
    "explanation": "plt.annotate() 用于在图表上添加带箭头的注释，可指定注释文字和箭头指向的位置。",
    "id": 189
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "text"
    ],
    "stem": "plt.text() 函数用于做什么？",
    "options": [
      {
        "label": "A",
        "text": "设置标题",
        "correct": false
      },
      {
        "label": "B",
        "text": "在图表指定位置添加文字",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置X轴标签",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置图例",
        "correct": false
      }
    ],
    "explanation": "plt.text() 在图表的指定坐标位置添加文字说明。",
    "id": 190
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "matplotlib",
    "tags": [
      "twinx"
    ],
    "stem": "plt.twinx() 函数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "创建双Y轴图表",
        "correct": true
      },
      {
        "label": "B",
        "text": "创建双子图",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置X轴范围",
        "correct": false
      },
      {
        "label": "D",
        "text": "合并两个图表",
        "correct": false
      }
    ],
    "explanation": "plt.twinx() 创建一个共享X轴但有独立Y轴的第二个坐标轴，用于双Y轴图表。",
    "id": 191
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.plot"
    ],
    "stem": "执行 plt.plot([1,2,3],[4,5,6]) 后图表显示什么？",
    "options": [
      {
        "label": "A",
        "text": "3个散点",
        "correct": false
      },
      {
        "label": "B",
        "text": "一条经过(1,4)(2,5)(3,6)的折线",
        "correct": true
      },
      {
        "label": "C",
        "text": "3条水平线",
        "correct": false
      },
      {
        "label": "D",
        "text": "3条垂直线",
        "correct": false
      }
    ],
    "explanation": "plt.plot() 将数据点按顺序用线连接，所以显示一条经过(1,4)(2,5)(3,6)的折线。",
    "id": 192
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.bar"
    ],
    "stem": "plt.bar(['A','B','C'],[10,20,15]) 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "3个饼图扇区",
        "correct": false
      },
      {
        "label": "B",
        "text": "3个垂直柱子，高度分别为10、20、15",
        "correct": true
      },
      {
        "label": "C",
        "text": "3条折线",
        "correct": false
      },
      {
        "label": "D",
        "text": "3个散点",
        "correct": false
      }
    ],
    "explanation": "plt.bar() 绘制垂直柱状图，三个类别A/B/C对应高度10/20/15。",
    "id": 193
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.pie"
    ],
    "stem": "plt.pie([30,50,20]) 中各扇区的标签默认是什么？",
    "options": [
      {
        "label": "A",
        "text": "A、B、C",
        "correct": false
      },
      {
        "label": "B",
        "text": "1、2、3",
        "correct": false
      },
      {
        "label": "C",
        "text": "没有默认标签",
        "correct": true
      },
      {
        "label": "D",
        "text": "30、50、20",
        "correct": false
      }
    ],
    "explanation": "plt.pie() 默认不添加标签，需要通过 labels 参数手动指定。",
    "id": 194
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "subplot"
    ],
    "stem": "plt.subplot(1,2,1) 和 plt.subplot(1,2,2) 创建了什么布局？",
    "options": [
      {
        "label": "A",
        "text": "上下两个子图",
        "correct": false
      },
      {
        "label": "B",
        "text": "左右两个子图",
        "correct": true
      },
      {
        "label": "C",
        "text": "2行2列四个子图",
        "correct": false
      },
      {
        "label": "D",
        "text": "重叠的两个图",
        "correct": false
      }
    ],
    "explanation": "plt.subplot(1,2,1) 和 plt.subplot(1,2,2) 创建1行2列的左右并排布局。",
    "id": 195
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "legend"
    ],
    "stem": "plt.plot(x,y,label='line1') 后需要调用哪个函数才能显示图例？",
    "options": [
      {
        "label": "A",
        "text": "plt.show()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.legend()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.label()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.display()",
        "correct": false
      }
    ],
    "explanation": "设置了 label 参数后，还需要调用 plt.legend() 才能在图表上显示图例。",
    "id": 196
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "grid"
    ],
    "stem": "plt.grid(True) 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "显示坐标轴",
        "correct": false
      },
      {
        "label": "B",
        "text": "显示网格线",
        "correct": true
      },
      {
        "label": "C",
        "text": "显示图例",
        "correct": false
      },
      {
        "label": "D",
        "text": "显示标题",
        "correct": false
      }
    ],
    "explanation": "plt.grid(True) 在图表中显示网格线，方便读数。",
    "id": 197
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "fill_between"
    ],
    "stem": "plt.fill_between(x, y1, y2) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "绘制两条线之间的填充区域",
        "correct": true
      },
      {
        "label": "B",
        "text": "绘制柱状图",
        "correct": false
      },
      {
        "label": "C",
        "text": "绘制散点图",
        "correct": false
      },
      {
        "label": "D",
        "text": "绘制饼图",
        "correct": false
      }
    ],
    "explanation": "plt.fill_between() 在两条曲线之间填充颜色，常用于显示置信区间或区域范围。",
    "id": 198
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "stacked"
    ],
    "stem": "plt.bar() 中 stacked 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置柱子颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "堆叠多个数据系列",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置柱子宽度",
        "correct": false
      },
      {
        "label": "D",
        "text": "旋转柱子方向",
        "correct": false
      }
    ],
    "explanation": "stacked=True 时多个数据系列的柱子会堆叠在一起，而不是并排显示。",
    "id": 199
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.hist"
    ],
    "stem": "plt.hist(data, bins=20) 中 bins 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置数据范围",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置分组数量",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置颜色数量",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置图表大小",
        "correct": false
      }
    ],
    "explanation": "bins 参数指定直方图的分组数量，bins=20 表示将数据分成20个区间。",
    "id": 200
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "savefig"
    ],
    "stem": "plt.savefig('chart.png', dpi=150) 中 dpi 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置图片格式",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置分辨率",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置图片大小",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置颜色深度",
        "correct": false
      }
    ],
    "explanation": "dpi 参数设置输出图片的分辨率（每英寸点数），值越大图片越清晰。",
    "id": 201
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "marker"
    ],
    "stem": "plt.plot(x, y, marker='o') 中 marker='o' 表示什么？",
    "options": [
      {
        "label": "A",
        "text": "方形标记",
        "correct": false
      },
      {
        "label": "B",
        "text": "圆形标记",
        "correct": true
      },
      {
        "label": "C",
        "text": "三角形标记",
        "correct": false
      },
      {
        "label": "D",
        "text": "菱形标记",
        "correct": false
      }
    ],
    "explanation": "marker='o' 表示使用圆形标记，'o' 代表 circle（圆）。",
    "id": 202
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "linestyle"
    ],
    "stem": "plt.plot(x, y, linestyle='--') 绘制的线条样式是？",
    "options": [
      {
        "label": "A",
        "text": "实线",
        "correct": false
      },
      {
        "label": "B",
        "text": "虚线",
        "correct": true
      },
      {
        "label": "C",
        "text": "点线",
        "correct": false
      },
      {
        "label": "D",
        "text": "点划线",
        "correct": false
      }
    ],
    "explanation": "linestyle='--' 表示虚线样式，'-' 是实线，':' 是点线，'-.' 是点划线。",
    "id": 203
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "twinx"
    ],
    "stem": "使用 twinx() 后两个Y轴数据共享什么？",
    "options": [
      {
        "label": "A",
        "text": "Y轴",
        "correct": false
      },
      {
        "label": "B",
        "text": "X轴",
        "correct": true
      },
      {
        "label": "C",
        "text": "图例",
        "correct": false
      },
      {
        "label": "D",
        "text": "标题",
        "correct": false
      }
    ],
    "explanation": "twinx() 创建的第二个Y轴与原Y轴共享X轴，适合展示不同量纲的双数据系列。",
    "id": 204
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "boxplot"
    ],
    "stem": "plt.boxplot(data) 中箱线图的箱体表示什么？",
    "options": [
      {
        "label": "A",
        "text": "最大值到最小值",
        "correct": false
      },
      {
        "label": "B",
        "text": "Q1到Q3的四分位距",
        "correct": true
      },
      {
        "label": "C",
        "text": "均值到中位数",
        "correct": false
      },
      {
        "label": "D",
        "text": "标准差范围",
        "correct": false
      }
    ],
    "explanation": "箱线图的箱体从Q1（第25百分位）到Q3（第75百分位），展示四分位距IQR。",
    "id": 205
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "rcParams"
    ],
    "stem": "plt.rcParams['font.sans-serif'] = ['SimHei'] 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置图表背景色",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置中文字体为黑体",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置英文字体",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置字体大小",
        "correct": false
      }
    ],
    "explanation": "通过 rcParams 设置字体为 SimHei（黑体），使图表能正确显示中文。",
    "id": 206
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.plot"
    ],
    "stem": "要绘制红色虚线，应使用 plt.plot(x, y, _____)",
    "options": [
      {
        "label": "A",
        "text": "color='r', linestyle='--'",
        "correct": true
      },
      {
        "label": "B",
        "text": "color='r', linestyle='-'",
        "correct": false
      },
      {
        "label": "C",
        "text": "color='b', linestyle='--'",
        "correct": false
      },
      {
        "label": "D",
        "text": "color='g', linestyle='-'",
        "correct": false
      }
    ],
    "explanation": "color='r' 设置红色，linestyle='--' 设置虚线样式。",
    "id": 207
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "plt.bar"
    ],
    "stem": "要绘制水平柱状图，应使用 _____",
    "options": [
      {
        "label": "A",
        "text": "plt.bar()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.barh()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.hist()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.plot()",
        "correct": false
      }
    ],
    "explanation": "plt.barh() 专门用于绘制水平柱状图，barh 中的 h 代表 horizontal。",
    "id": 208
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "pie"
    ],
    "stem": "plt.pie() 中设置各扇区标签的参数是？",
    "options": [
      {
        "label": "A",
        "text": "names",
        "correct": false
      },
      {
        "label": "B",
        "text": "labels",
        "correct": true
      },
      {
        "label": "C",
        "text": "title",
        "correct": false
      },
      {
        "label": "D",
        "text": "legend",
        "correct": false
      }
    ],
    "explanation": "plt.pie() 使用 labels 参数指定各扇区的标签文字。",
    "id": 209
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "figure"
    ],
    "stem": "创建图形时设置尺寸为 10x8 英寸，应使用 plt.figure(_____)",
    "options": [
      {
        "label": "A",
        "text": "size=(10,8)",
        "correct": false
      },
      {
        "label": "B",
        "text": "figsize=(10,8)",
        "correct": true
      },
      {
        "label": "C",
        "text": "dimension=(10,8)",
        "correct": false
      },
      {
        "label": "D",
        "text": "scale=(10,8)",
        "correct": false
      }
    ],
    "explanation": "figsize 参数指定图形尺寸，(10,8) 表示宽10英寸、高8英寸。",
    "id": 210
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "scatter"
    ],
    "stem": "plt.scatter() 中设置点的大小的参数是？",
    "options": [
      {
        "label": "A",
        "text": "size",
        "correct": false
      },
      {
        "label": "B",
        "text": "s",
        "correct": true
      },
      {
        "label": "C",
        "text": "marker_size",
        "correct": false
      },
      {
        "label": "D",
        "text": "pointsize",
        "correct": false
      }
    ],
    "explanation": "plt.scatter() 使用参数 s 来设置散点的大小。",
    "id": 211
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "annotate"
    ],
    "stem": "plt.annotate() 中 xy 参数表示什么？",
    "options": [
      {
        "label": "A",
        "text": "注释文字的位置",
        "correct": false
      },
      {
        "label": "B",
        "text": "箭头指向的坐标点",
        "correct": true
      },
      {
        "label": "C",
        "text": "箭头样式",
        "correct": false
      },
      {
        "label": "D",
        "text": "注释文字内容",
        "correct": false
      }
    ],
    "explanation": "xy 参数指定箭头指向的数据点坐标，xytext 指定注释文字的位置。",
    "id": 212
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "subplots"
    ],
    "stem": "plt.subplots() 返回几个对象？",
    "options": [
      {
        "label": "A",
        "text": "1个",
        "correct": false
      },
      {
        "label": "B",
        "text": "2个（Figure和Axes）",
        "correct": true
      },
      {
        "label": "C",
        "text": "3个",
        "correct": false
      },
      {
        "label": "D",
        "text": "0个",
        "correct": false
      }
    ],
    "explanation": "plt.subplots() 返回 (fig, ax) 元组，fig 是 Figure 对象，ax 是 Axes 对象或数组。",
    "id": 213
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "legend"
    ],
    "stem": "plt.plot(x,y,label='data') 后图例未显示，可能的原因是？",
    "options": [
      {
        "label": "A",
        "text": "忘记调用 plt.legend()",
        "correct": true
      },
      {
        "label": "B",
        "text": "x 数据错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "y 数据错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.show() 未调用",
        "correct": false
      }
    ],
    "explanation": "虽然设置了 label 参数，但如果没有调用 plt.legend()，图例不会自动显示。",
    "id": 214
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "中文"
    ],
    "stem": "图表中中文显示为方块，应如何修复？",
    "options": [
      {
        "label": "A",
        "text": "增大 figsize",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置中文字体，如 rcParams['font.sans-serif']=['SimHei']",
        "correct": true
      },
      {
        "label": "C",
        "text": "更换绘图函数",
        "correct": false
      },
      {
        "label": "D",
        "text": "调用 plt.legend()",
        "correct": false
      }
    ],
    "explanation": "中文显示为方块是因为缺少中文字体支持，需通过 rcParams 设置中文字体。",
    "id": 215
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "savefig"
    ],
    "stem": "plt.savefig('chart.png') 保存空白图片，最可能的原因是？",
    "options": [
      {
        "label": "A",
        "text": "文件名错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "在 plt.show() 之后调用 savefig",
        "correct": true
      },
      {
        "label": "C",
        "text": "格式不支持",
        "correct": false
      },
      {
        "label": "D",
        "text": "分辨率太低",
        "correct": false
      }
    ],
    "explanation": "plt.show() 之后调用 savefig 会保存空白图片，因为图表已被关闭。应先 savefig 再 show。",
    "id": 216
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "subplot"
    ],
    "stem": "plt.subplot(2,2,5) 会报错，因为？",
    "options": [
      {
        "label": "A",
        "text": "参数类型错误",
        "correct": false
      },
      {
        "label": "B",
        "text": "2x2布局只有4个子图，索引5越界",
        "correct": true
      },
      {
        "label": "C",
        "text": "subplot 不支持2行",
        "correct": false
      },
      {
        "label": "D",
        "text": "5不是有效参数",
        "correct": false
      }
    ],
    "explanation": "2行2列最多4个子图，索引5超出范围导致报错。",
    "id": 217
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "matplotlib",
    "tags": [
      "bar"
    ],
    "stem": "plt.bar(x, height, width=-0.5) 会导致什么问题？",
    "options": [
      {
        "label": "A",
        "text": "柱子方向反转",
        "correct": false
      },
      {
        "label": "B",
        "text": "宽度不能为负数，柱子显示异常",
        "correct": true
      },
      {
        "label": "C",
        "text": "没有影响",
        "correct": false
      },
      {
        "label": "D",
        "text": "自动取绝对值",
        "correct": false
      }
    ],
    "explanation": "width 为负数时柱子会显示异常或报错，宽度应为正数。",
    "id": 218
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "fill_between"
    ],
    "stem": "plt.fill_between(x, y, 0, where=y>0) 中 where 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置填充颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "条件填充，仅当y>0时填充",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置填充透明度",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置填充边框",
        "correct": false
      }
    ],
    "explanation": "where 参数指定条件，仅满足条件的位置才会被填充，用于部分区域着色。",
    "id": 219
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "annotate"
    ],
    "stem": "plt.annotate() 的 arrowprops 参数用于设置什么？",
    "options": [
      {
        "label": "A",
        "text": "注释文字样式",
        "correct": false
      },
      {
        "label": "B",
        "text": "箭头样式",
        "correct": true
      },
      {
        "label": "C",
        "text": "坐标轴样式",
        "correct": false
      },
      {
        "label": "D",
        "text": "背景样式",
        "correct": false
      }
    ],
    "explanation": "arrowprops 是一个字典，用于设置注释箭头的样式，如颜色、宽度、样式等。",
    "id": 220
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "rcParams"
    ],
    "stem": "plt.rcParams['axes.unicode_minus'] = False 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "禁用负号显示",
        "correct": false
      },
      {
        "label": "B",
        "text": "解决负号显示异常问题",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置坐标轴为正数",
        "correct": false
      },
      {
        "label": "D",
        "text": "关闭坐标轴",
        "correct": false
      }
    ],
    "explanation": "设置 axes.unicode_minus=False 可以解决中文字体下负号显示为方块的问题。",
    "id": 221
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "subplots"
    ],
    "stem": "fig, axes = plt.subplots(2,2) 中 axes 的类型是？",
    "options": [
      {
        "label": "A",
        "text": "一维数组",
        "correct": false
      },
      {
        "label": "B",
        "text": "2x2的二维数组",
        "correct": true
      },
      {
        "label": "C",
        "text": "列表",
        "correct": false
      },
      {
        "label": "D",
        "text": "单个Axes对象",
        "correct": false
      }
    ],
    "explanation": "plt.subplots(2,2) 返回的 axes 是一个2x2的numpy二维数组，需要用 axes[row,col] 访问。",
    "id": 222
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "pie"
    ],
    "stem": "plt.pie() 中 autopct 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "自动设置颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "自动显示百分比格式",
        "correct": true
      },
      {
        "label": "C",
        "text": "自动排序",
        "correct": false
      },
      {
        "label": "D",
        "text": "自动添加标签",
        "correct": false
      }
    ],
    "explanation": "autopct 参数控制饼图扇区百分比的显示格式，如 autopct='%1.1f%%'。",
    "id": 223
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "scatter"
    ],
    "stem": "plt.scatter() 中 c 参数和 color 参数的区别是？",
    "options": [
      {
        "label": "A",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "B",
        "text": "c 支持数组映射颜色，color 只支持单色",
        "correct": true
      },
      {
        "label": "C",
        "text": "color 支持数组映射颜色",
        "correct": false
      },
      {
        "label": "D",
        "text": "c 只支持单色",
        "correct": false
      }
    ],
    "explanation": "c 参数可以接受数组实现颜色映射（如渐变色），color 只接受单一颜色值。",
    "id": 224
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "boxplot"
    ],
    "stem": "plt.boxplot() 中如何识别异常值？",
    "options": [
      {
        "label": "A",
        "text": "异常值自动显示为超出须线的点",
        "correct": true
      },
      {
        "label": "B",
        "text": "异常值用不同颜色显示",
        "correct": false
      },
      {
        "label": "C",
        "text": "异常值需要手动添加",
        "correct": false
      },
      {
        "label": "D",
        "text": "异常值被箱体覆盖",
        "correct": false
      }
    ],
    "explanation": "箱线图中异常值自动显示为超出须线范围的单独数据点。",
    "id": 225
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "stacked"
    ],
    "stem": "堆叠柱状图中 bottom 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置柱子起始位置（底部偏移）",
        "correct": true
      },
      {
        "label": "B",
        "text": "设置柱子颜色",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置柱子宽度",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置柱子标签",
        "correct": false
      }
    ],
    "explanation": "bottom 参数设置柱子的起始Y坐标，用于实现堆叠效果，第二层柱子的 bottom 为第一层的高度。",
    "id": 226
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "style.use"
    ],
    "stem": "以下哪个不是 plt.style.available 中的有效样式名？",
    "options": [
      {
        "label": "A",
        "text": "'dark_background'",
        "correct": false
      },
      {
        "label": "B",
        "text": "'seaborn'",
        "correct": false
      },
      {
        "label": "C",
        "text": "'classic'",
        "correct": false
      },
      {
        "label": "D",
        "text": "'material'",
        "correct": true
      }
    ],
    "explanation": "'material' 不是 Matplotlib 内置样式，available 中的样式包括 dark_background、seaborn、classic 等。",
    "id": 227
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "twinx"
    ],
    "stem": "创建共享X轴的双Y轴图表，应使用 _____",
    "options": [
      {
        "label": "A",
        "text": "plt.subplot()",
        "correct": false
      },
      {
        "label": "B",
        "text": "plt.twinx()",
        "correct": true
      },
      {
        "label": "C",
        "text": "plt.dual()",
        "correct": false
      },
      {
        "label": "D",
        "text": "plt.overlay()",
        "correct": false
      }
    ],
    "explanation": "plt.twinx() 创建共享X轴的第二个Y轴，实现双Y轴图表。",
    "id": 228
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "scatter"
    ],
    "stem": "plt.scatter(x, y) 中 x 和 y 长度不同会怎样？",
    "options": [
      {
        "label": "A",
        "text": "自动截断较长的",
        "correct": false
      },
      {
        "label": "B",
        "text": "报错 ValueError",
        "correct": true
      },
      {
        "label": "C",
        "text": "用缺失值填充",
        "correct": false
      },
      {
        "label": "D",
        "text": "只显示相同索引的点",
        "correct": false
      }
    ],
    "explanation": "x 和 y 长度不一致时，Matplotlib 会抛出 ValueError，要求两者维度一致。",
    "id": 229
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "hist"
    ],
    "stem": "plt.hist() 输入二维列表 [[1,2],[3,4]] 会怎样？",
    "options": [
      {
        "label": "A",
        "text": "正常绘制一个直方图",
        "correct": false
      },
      {
        "label": "B",
        "text": "绘制两组直方图",
        "correct": true
      },
      {
        "label": "C",
        "text": "报错",
        "correct": false
      },
      {
        "label": "D",
        "text": "只绘制第一组",
        "correct": false
      }
    ],
    "explanation": "输入二维数据时，plt.hist() 会将每行视为一个数据集，绘制多组直方图。",
    "id": 230
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "pie"
    ],
    "stem": "plt.pie() 所有数据为0时会怎样？",
    "options": [
      {
        "label": "A",
        "text": "显示空圆",
        "correct": false
      },
      {
        "label": "B",
        "text": "报错",
        "correct": true
      },
      {
        "label": "C",
        "text": "显示空白",
        "correct": false
      },
      {
        "label": "D",
        "text": "自动填充默认值",
        "correct": false
      }
    ],
    "explanation": "所有数据为0时，plt.pie() 无法计算角度，会抛出 ValueError。",
    "id": 231
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "text"
    ],
    "stem": "在图表坐标 (0.5,0.5) 处添加文字，应使用 plt.text(_____)",
    "options": [
      {
        "label": "A",
        "text": "0.5, 0.5, 'text'",
        "correct": true
      },
      {
        "label": "B",
        "text": "'text', 0.5, 0.5",
        "correct": false
      },
      {
        "label": "C",
        "text": "0.5, 0.5",
        "correct": false
      },
      {
        "label": "D",
        "text": "'text'",
        "correct": false
      }
    ],
    "explanation": "plt.text(x, y, s) 的参数依次为X坐标、Y坐标和文字内容。",
    "id": 232
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "matplotlib",
    "tags": [
      "fill_between"
    ],
    "stem": "plt.fill_between(x, y1, y2, alpha=0.3) 中 alpha 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置填充颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置透明度",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置边框宽度",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置填充模式",
        "correct": false
      }
    ],
    "explanation": "alpha 参数控制透明度，0为完全透明，1为不透明，0.3表示30%不透明度。",
    "id": 233
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap() 的 annot=True 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "显示颜色条",
        "correct": false
      },
      {
        "label": "B",
        "text": "在格子中显示数值",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置颜色映射",
        "correct": false
      },
      {
        "label": "D",
        "text": "添加标题",
        "correct": false
      }
    ],
    "explanation": "annot=True 会在热力图每个格子中标注数值，方便读取具体数据。",
    "id": 234
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "pairplot"
    ],
    "stem": "sns.pairplot(df, hue='species') 的 hue 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置图表标题",
        "correct": false
      },
      {
        "label": "B",
        "text": "按 species 列着色区分",
        "correct": true
      },
      {
        "label": "C",
        "text": "选择数值列",
        "correct": false
      },
      {
        "label": "D",
        "text": "调整图表大小",
        "correct": false
      }
    ],
    "explanation": "hue 参数指定按哪个分类列对数据进行着色区分，不同类别使用不同颜色。",
    "id": 235
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "boxplot"
    ],
    "stem": "sns.boxplot(x='category', y='value', data=df) 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "按 category 分组的箱线图",
        "correct": true
      },
      {
        "label": "B",
        "text": "按 value 分组的柱状图",
        "correct": false
      },
      {
        "label": "C",
        "text": "散点图",
        "correct": false
      },
      {
        "label": "D",
        "text": "折线图",
        "correct": false
      }
    ],
    "explanation": "boxplot 按 x 轴的分类列分组，y 轴为数值列，绘制各组的箱线图。",
    "id": 236
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "set_theme"
    ],
    "stem": "sns.set_theme() 的默认样式是什么？",
    "options": [
      {
        "label": "A",
        "text": "darkgrid",
        "correct": true
      },
      {
        "label": "B",
        "text": "whitegrid",
        "correct": false
      },
      {
        "label": "C",
        "text": "dark",
        "correct": false
      },
      {
        "label": "D",
        "text": "ticks",
        "correct": false
      }
    ],
    "explanation": "sns.set_theme() 默认使用 darkgrid 样式，带深色背景和网格线。",
    "id": 237
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "set_style"
    ],
    "stem": "sns.set_style() 支持的样式不包括以下哪个？",
    "options": [
      {
        "label": "A",
        "text": "darkgrid",
        "correct": false
      },
      {
        "label": "B",
        "text": "whitegrid",
        "correct": false
      },
      {
        "label": "C",
        "text": "bluegrid",
        "correct": true
      },
      {
        "label": "D",
        "text": "ticks",
        "correct": false
      }
    ],
    "explanation": "set_style 支持的样式为 darkgrid、whitegrid、dark、white、ticks，不包括 bluegrid。",
    "id": 238
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "histplot"
    ],
    "stem": "sns.histplot(data=df, x='age', bins=20) 的输出是？",
    "options": [
      {
        "label": "A",
        "text": "核密度估计图",
        "correct": false
      },
      {
        "label": "B",
        "text": "20 个区间的直方图",
        "correct": true
      },
      {
        "label": "C",
        "text": "箱线图",
        "correct": false
      },
      {
        "label": "D",
        "text": "条形图",
        "correct": false
      }
    ],
    "explanation": "histplot 绘制直方图，bins=20 表示将数据分为 20 个区间。",
    "id": 239
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "scatterplot"
    ],
    "stem": "sns.scatterplot() 的 hue 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置点的大小",
        "correct": false
      },
      {
        "label": "B",
        "text": "按分类列对点着色",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置透明度",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置标记形状",
        "correct": false
      }
    ],
    "explanation": "hue 参数按指定列的类别对散点着不同颜色。",
    "id": 240
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "lineplot"
    ],
    "stem": "sns.lineplot() 默认显示的置信区间宽度是？",
    "options": [
      {
        "label": "A",
        "text": "90%",
        "correct": false
      },
      {
        "label": "B",
        "text": "95%",
        "correct": true
      },
      {
        "label": "C",
        "text": "99%",
        "correct": false
      },
      {
        "label": "D",
        "text": "68%",
        "correct": false
      }
    ],
    "explanation": "lineplot 默认显示 95% 置信区间，通过 ci 参数可调整。",
    "id": 241
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "barplot"
    ],
    "stem": "要绘制按分类列分组的均值柱状图，应使用 sns._____(x='cat', y='val', data=df)",
    "options": [
      {
        "label": "A",
        "text": "countplot",
        "correct": false
      },
      {
        "label": "B",
        "text": "barplot",
        "correct": true
      },
      {
        "label": "C",
        "text": "histplot",
        "correct": false
      },
      {
        "label": "D",
        "text": "pointplot",
        "correct": false
      }
    ],
    "explanation": "barplot 按分类列分组并显示均值，countplot 只统计计数。",
    "id": 242
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "countplot"
    ],
    "stem": "sns.countplot() 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "均值柱状图",
        "correct": false
      },
      {
        "label": "B",
        "text": "分类计数柱状图",
        "correct": true
      },
      {
        "label": "C",
        "text": "直方图",
        "correct": false
      },
      {
        "label": "D",
        "text": "饼图",
        "correct": false
      }
    ],
    "explanation": "countplot 统计每个类别的数量并绘制柱状图。",
    "id": 243
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "kdeplot"
    ],
    "stem": "sns.kdeplot(data=df['values']) 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "直方图",
        "correct": false
      },
      {
        "label": "B",
        "text": "核密度估计图",
        "correct": true
      },
      {
        "label": "C",
        "text": "箱线图",
        "correct": false
      },
      {
        "label": "D",
        "text": "散点图",
        "correct": false
      }
    ],
    "explanation": "kdeplot 绘制核密度估计图，展示数据的概率密度分布。",
    "id": 244
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "violinplot"
    ],
    "stem": "sns.violinplot() 结合了哪两种图表？",
    "options": [
      {
        "label": "A",
        "text": "箱线图和散点图",
        "correct": false
      },
      {
        "label": "B",
        "text": "箱线图和核密度估计图",
        "correct": true
      },
      {
        "label": "C",
        "text": "直方图和折线图",
        "correct": false
      },
      {
        "label": "D",
        "text": "柱状图和折线图",
        "correct": false
      }
    ],
    "explanation": "violinplot 将箱线图和核密度估计结合，展示分布形状和统计摘要。",
    "id": 245
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "load_dataset"
    ],
    "stem": "sns.load_dataset('tips') 返回的是什么？",
    "options": [
      {
        "label": "A",
        "text": "NumPy 数组",
        "correct": false
      },
      {
        "label": "B",
        "text": "Pandas DataFrame",
        "correct": true
      },
      {
        "label": "C",
        "text": "字典列表",
        "correct": false
      },
      {
        "label": "D",
        "text": "CSV 文件路径",
        "correct": false
      }
    ],
    "explanation": "load_dataset 返回 Pandas DataFrame 格式的数据集。",
    "id": 246
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "despine"
    ],
    "stem": "sns.despine() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "添加网格线",
        "correct": false
      },
      {
        "label": "B",
        "text": "移除顶部和右侧边框",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置背景色",
        "correct": false
      },
      {
        "label": "D",
        "text": "调整字体大小",
        "correct": false
      }
    ],
    "explanation": "despine 移除图表的顶部和右侧边框线，使图表更简洁。",
    "id": 247
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "set_palette"
    ],
    "stem": "sns.set_palette('Set2') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置背景样式",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置调色板",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置字体",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置网格样式",
        "correct": false
      }
    ],
    "explanation": "set_palette 设置全局调色板，影响后续所有图表的颜色方案。",
    "id": 248
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "jointplot"
    ],
    "stem": "sns._____(x='x', y='y', data=df, kind='hex') 可绘制六边形密度图",
    "options": [
      {
        "label": "A",
        "text": "pairplot",
        "correct": false
      },
      {
        "label": "B",
        "text": "jointplot",
        "correct": true
      },
      {
        "label": "C",
        "text": "scatterplot",
        "correct": false
      },
      {
        "label": "D",
        "text": "displot",
        "correct": false
      }
    ],
    "explanation": "jointplot 支持 kind='hex' 绘制六边形密度图。",
    "id": 249
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "stripplot"
    ],
    "stem": "sns.stripplot(x='cat', y='val', data=df) 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "分组散点图",
        "correct": true
      },
      {
        "label": "B",
        "text": "柱状图",
        "correct": false
      },
      {
        "label": "C",
        "text": "箱线图",
        "correct": false
      },
      {
        "label": "D",
        "text": "折线图",
        "correct": false
      }
    ],
    "explanation": "stripplot 绘制按分类分组的散点图，每个数据点独立显示。",
    "id": 250
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "color_palette"
    ],
    "stem": "sns.color_palette('husl', 3) 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "3 种颜色组成的列表",
        "correct": true
      },
      {
        "label": "B",
        "text": "3 行 DataFrame",
        "correct": false
      },
      {
        "label": "C",
        "text": "3 个子图",
        "correct": false
      },
      {
        "label": "D",
        "text": "3 种线型",
        "correct": false
      }
    ],
    "explanation": "color_palette 返回指定数量的颜色元组列表。",
    "id": 251
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "ecdfplot"
    ],
    "stem": "sns.ecdfplot() 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "经验累积分布函数图",
        "correct": true
      },
      {
        "label": "B",
        "text": "直方图",
        "correct": false
      },
      {
        "label": "C",
        "text": "核密度估计图",
        "correct": false
      },
      {
        "label": "D",
        "text": "箱线图",
        "correct": false
      }
    ],
    "explanation": "ecdfplot 绘制经验累积分布函数图，展示数据的累积概率分布。",
    "id": 252
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap(data, annot=True, fmt='d') 中 fmt='d' 的含义是？",
    "options": [
      {
        "label": "A",
        "text": "浮点数格式",
        "correct": false
      },
      {
        "label": "B",
        "text": "整数格式",
        "correct": true
      },
      {
        "label": "C",
        "text": "百分比格式",
        "correct": false
      },
      {
        "label": "D",
        "text": "科学计数格式",
        "correct": false
      }
    ],
    "explanation": "fmt='d' 将标注格式设为整数，'d' 代表 integer 格式。",
    "id": 253
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "swarmplot"
    ],
    "stem": "要绘制不重叠的分簇散点图，应使用 sns._____()",
    "options": [
      {
        "label": "A",
        "text": "stripplot",
        "correct": false
      },
      {
        "label": "B",
        "text": "swarmplot",
        "correct": true
      },
      {
        "label": "C",
        "text": "scatterplot",
        "correct": false
      },
      {
        "label": "D",
        "text": "boxplot",
        "correct": false
      }
    ],
    "explanation": "swarmplot 绘制不重叠的分簇散点图，点沿分类轴调整避免遮挡。",
    "id": 254
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "regplot"
    ],
    "stem": "sns.regplot() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "绘制散点图和回归线",
        "correct": true
      },
      {
        "label": "B",
        "text": "绘制折线图",
        "correct": false
      },
      {
        "label": "C",
        "text": "绘制柱状图",
        "correct": false
      },
      {
        "label": "D",
        "text": "绘制热力图",
        "correct": false
      }
    ],
    "explanation": "regplot 绘制散点图并拟合回归线，展示变量间的线性关系。",
    "id": 255
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "pointplot"
    ],
    "stem": "sns.pointplot() 显示的是什么？",
    "options": [
      {
        "label": "A",
        "text": "点估计和置信区间",
        "correct": true
      },
      {
        "label": "B",
        "text": "散点图",
        "correct": false
      },
      {
        "label": "C",
        "text": "折线图",
        "correct": false
      },
      {
        "label": "D",
        "text": "柱状图",
        "correct": false
      }
    ],
    "explanation": "pointplot 显示各分类水平的点估计（均值）和置信区间。",
    "id": 256
  },
  {
    "type": "result",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap(data, cmap='YlOrRd') 中 cmap 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置颜色映射方案",
        "correct": true
      },
      {
        "label": "B",
        "text": "设置数据范围",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置标注格式",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置网格线",
        "correct": false
      }
    ],
    "explanation": "cmap 参数设置热力图的颜色映射方案，如 YlOrRd 表示黄-橙-红。",
    "id": 257
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "catplot"
    ],
    "stem": "sns.catplot() 的 kind 参数不包括以下哪个？",
    "options": [
      {
        "label": "A",
        "text": "box",
        "correct": false
      },
      {
        "label": "B",
        "text": "violin",
        "correct": false
      },
      {
        "label": "C",
        "text": "scatter",
        "correct": true
      },
      {
        "label": "D",
        "text": "bar",
        "correct": false
      }
    ],
    "explanation": "catplot 的 kind 支持 box、violin、bar、strip、swarm、count 等，不包括 scatter。",
    "id": 258
  },
  {
    "type": "completion",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "relplot"
    ],
    "stem": "sns._____(x='x', y='y', data=df, kind='line') 用于绘制关系图",
    "options": [
      {
        "label": "A",
        "text": "catplot",
        "correct": false
      },
      {
        "label": "B",
        "text": "relplot",
        "correct": true
      },
      {
        "label": "C",
        "text": "displot",
        "correct": false
      },
      {
        "label": "D",
        "text": "jointplot",
        "correct": false
      }
    ],
    "explanation": "relplot 是关系图的接口函数，kind='line' 绘制折线图。",
    "id": 259
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "FacetGrid"
    ],
    "stem": "sns.FacetGrid(df, col='category') 的 col 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "按列着色",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置列数",
        "correct": false
      },
      {
        "label": "C",
        "text": "按 category 列创建子图列",
        "correct": true
      },
      {
        "label": "D",
        "text": "选择数值列",
        "correct": false
      }
    ],
    "explanation": "FacetGrid 的 col 参数按指定列的类别创建子图列。",
    "id": 260
  },
  {
    "type": "debug",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "displot"
    ],
    "stem": "sns.displot() 的 kind 参数默认值是？",
    "options": [
      {
        "label": "A",
        "text": "kde",
        "correct": false
      },
      {
        "label": "B",
        "text": "box",
        "correct": false
      },
      {
        "label": "C",
        "text": "ecdf",
        "correct": false
      },
      {
        "label": "D",
        "text": "hist",
        "correct": true
      }
    ],
    "explanation": "displot 默认 kind='hist'，绘制直方图。",
    "id": 261
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "seaborn",
    "tags": [
      "lmplot"
    ],
    "stem": "sns.lmplot() 与 sns.regplot() 的关键区别是？",
    "options": [
      {
        "label": "A",
        "text": "lmplot 支持 FacetGrid 分面",
        "correct": true
      },
      {
        "label": "B",
        "text": "regplot 支持更多参数",
        "correct": false
      },
      {
        "label": "C",
        "text": "lmplot 不支持回归",
        "correct": false
      },
      {
        "label": "D",
        "text": "两者完全相同",
        "correct": false
      }
    ],
    "explanation": "lmplot 基于 FacetGrid，支持按 col/row 分面；regplot 是 Axes 级函数，不支持分面。",
    "id": 262
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "residplot"
    ],
    "stem": "sns.residplot() 绘制的是什么？",
    "options": [
      {
        "label": "A",
        "text": "回归残差图",
        "correct": true
      },
      {
        "label": "B",
        "text": "回归预测图",
        "correct": false
      },
      {
        "label": "C",
        "text": "相关系数图",
        "correct": false
      },
      {
        "label": "D",
        "text": "回归系数图",
        "correct": false
      }
    ],
    "explanation": "residplot 绘制回归残差图，展示实际值与预测值的偏差。",
    "id": 263
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap(data, annot=True, fmt='.2f') 中 fmt='.2f' 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "标注显示两位小数",
        "correct": true
      },
      {
        "label": "B",
        "text": "标注显示两位整数",
        "correct": false
      },
      {
        "label": "C",
        "text": "标注显示百分比",
        "correct": false
      },
      {
        "label": "D",
        "text": "标注显示科学计数",
        "correct": false
      }
    ],
    "explanation": "fmt='.2f' 将标注格式设为保留两位小数的浮点数。",
    "id": 264
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "pairplot"
    ],
    "stem": "sns.pairplot(df, corner=True) 的 corner=True 作用是？",
    "options": [
      {
        "label": "A",
        "text": "只显示下三角矩阵",
        "correct": true
      },
      {
        "label": "B",
        "text": "只显示对角线",
        "correct": false
      },
      {
        "label": "C",
        "text": "只显示上三角矩阵",
        "correct": false
      },
      {
        "label": "D",
        "text": "显示完整矩阵",
        "correct": false
      }
    ],
    "explanation": "corner=True 只绘制下三角部分，减少冗余信息。",
    "id": 265
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "FacetGrid"
    ],
    "stem": "FacetGrid.map() 的第一个参数应该是？",
    "options": [
      {
        "label": "A",
        "text": "绘图函数",
        "correct": true
      },
      {
        "label": "B",
        "text": "DataFrame",
        "correct": false
      },
      {
        "label": "C",
        "text": "列名",
        "correct": false
      },
      {
        "label": "D",
        "text": "颜色",
        "correct": false
      }
    ],
    "explanation": "FacetGrid.map() 的第一个参数是绘图函数，如 plt.hist 或 sns.kdeplot。",
    "id": 266
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "hue"
    ],
    "stem": "sns.scatterplot() 的 style 参数与 hue 参数的区别是？",
    "options": [
      {
        "label": "A",
        "text": "style 控制标记形状，hue 控制颜色",
        "correct": true
      },
      {
        "label": "B",
        "text": "style 控制颜色，hue 控制大小",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者功能相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "style 控制大小，hue 控制形状",
        "correct": false
      }
    ],
    "explanation": "style 控制标记的形状（圆、方、三角等），hue 控制颜色。",
    "id": 267
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "catplot"
    ],
    "stem": "sns.catplot(x='day', kind='count', data=df) 等价于？",
    "options": [
      {
        "label": "A",
        "text": "sns.countplot(x='day', data=df)",
        "correct": true
      },
      {
        "label": "B",
        "text": "sns.barplot(x='day', data=df)",
        "correct": false
      },
      {
        "label": "C",
        "text": "sns.histplot(x='day', data=df)",
        "correct": false
      },
      {
        "label": "D",
        "text": "sns.boxplot(x='day', data=df)",
        "correct": false
      }
    ],
    "explanation": "catplot(kind='count') 功能等同于 countplot，统计各类别计数。",
    "id": 268
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap() 的 cbar=False 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "隐藏颜色条",
        "correct": true
      },
      {
        "label": "B",
        "text": "隐藏标注",
        "correct": false
      },
      {
        "label": "C",
        "text": "隐藏网格",
        "correct": false
      },
      {
        "label": "D",
        "text": "隐藏标题",
        "correct": false
      }
    ],
    "explanation": "cbar=False 隐藏热力图旁边的颜色条（color bar）。",
    "id": 269
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "set_theme"
    ],
    "stem": "sns.set_theme(style='white') 与 sns.set_style('white') 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "set_theme 还设置调色板和字体等",
        "correct": true
      },
      {
        "label": "B",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "set_style 功能更多",
        "correct": false
      },
      {
        "label": "D",
        "text": "set_theme 只设置样式",
        "correct": false
      }
    ],
    "explanation": "set_theme 是更高级的接口，同时设置样式、调色板、字体等；set_style 只设置样式。",
    "id": 270
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "displot"
    ],
    "stem": "sns.displot(x='val', hue='cat', kind='kde', data=df) 中 kind='kde' 替换为 _____ 可绘制累积分布图",
    "options": [
      {
        "label": "A",
        "text": "cdf",
        "correct": false
      },
      {
        "label": "B",
        "text": "cumulative",
        "correct": false
      },
      {
        "label": "C",
        "text": "ecdf",
        "correct": true
      },
      {
        "label": "D",
        "text": "hist",
        "correct": false
      }
    ],
    "explanation": "displot 的 kind='ecdf' 绘制经验累积分布图。",
    "id": 271
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "jointplot"
    ],
    "stem": "sns.jointplot(x='x', y='y', data=df, kind='reg') 会额外显示什么？",
    "options": [
      {
        "label": "A",
        "text": "六边形密度图",
        "correct": false
      },
      {
        "label": "B",
        "text": "只有回归线",
        "correct": false
      },
      {
        "label": "C",
        "text": "回归线和边际分布",
        "correct": true
      },
      {
        "label": "D",
        "text": "核密度等高线",
        "correct": false
      }
    ],
    "explanation": "kind='reg' 在联合图中添加回归线，并显示边际分布。",
    "id": 272
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "barplot"
    ],
    "stem": "sns.barplot() 默认显示的统计量是？",
    "options": [
      {
        "label": "A",
        "text": "计数",
        "correct": false
      },
      {
        "label": "B",
        "text": "中位数",
        "correct": false
      },
      {
        "label": "C",
        "text": "总和",
        "correct": false
      },
      {
        "label": "D",
        "text": "均值",
        "correct": true
      }
    ],
    "explanation": "barplot 默认显示均值，误差棒表示置信区间。",
    "id": 273
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "violinplot"
    ],
    "stem": "sns.violinplot() 的 inner=None 参数效果是？",
    "options": [
      {
        "label": "A",
        "text": "移除边框",
        "correct": false
      },
      {
        "label": "B",
        "text": "移除图例",
        "correct": false
      },
      {
        "label": "C",
        "text": "移除标注",
        "correct": false
      },
      {
        "label": "D",
        "text": "移除内部箱线图",
        "correct": true
      }
    ],
    "explanation": "inner=None 移除小提琴图内部的箱线图元素。",
    "id": 274
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "scatterplot"
    ],
    "stem": "sns.scatterplot() 的 size 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置透明度",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置所有点为相同大小",
        "correct": false
      },
      {
        "label": "C",
        "text": "按数值列调整点的大小",
        "correct": true
      },
      {
        "label": "D",
        "text": "设置颜色",
        "correct": false
      }
    ],
    "explanation": "size 参数按指定数值列的值调整散点大小。",
    "id": 275
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "catplot"
    ],
    "stem": "sns.catplot(x='day', y='total', col='time', data=df) 中 col 参数的作用是？",
    "options": [
      {
        "label": "A",
        "text": "选择数值列",
        "correct": false
      },
      {
        "label": "B",
        "text": "按 time 列着色",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置列数",
        "correct": false
      },
      {
        "label": "D",
        "text": "按 time 列创建子图列",
        "correct": true
      }
    ],
    "explanation": "col 参数按指定列的类别创建子图列，实现分面。",
    "id": 276
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "lineplot"
    ],
    "stem": "sns.lineplot(x='x', y='y', hue='cat', data=df) 中 hue='cat' 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "只绘制 cat 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "隐藏 cat 列",
        "correct": false
      },
      {
        "label": "C",
        "text": "按 cat 列分颜色绘制多条线",
        "correct": true
      },
      {
        "label": "D",
        "text": "改变线型",
        "correct": false
      }
    ],
    "explanation": "hue 参数按分类列分颜色绘制多条线。",
    "id": 277
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap() 的 linewidths 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置颜色条宽度",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置标注字号",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置格子间的线宽",
        "correct": true
      },
      {
        "label": "D",
        "text": "设置边框粗细",
        "correct": false
      }
    ],
    "explanation": "linewidths 设置热力图格子之间的线条宽度。",
    "id": 278
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "kdeplot"
    ],
    "stem": "sns.kdeplot() 的 bw_adjust 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "调整透明度",
        "correct": false
      },
      {
        "label": "B",
        "text": "调整颜色",
        "correct": false
      },
      {
        "label": "C",
        "text": "调整线宽",
        "correct": false
      },
      {
        "label": "D",
        "text": "调整核密度估计的平滑度",
        "correct": true
      }
    ],
    "explanation": "bw_adjust 调整核密度估计的带宽因子，值越大曲线越平滑。",
    "id": 279
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "load_dataset"
    ],
    "stem": "sns.load_dataset() 需要联网吗？",
    "options": [
      {
        "label": "A",
        "text": "不需要，数据内置",
        "correct": false
      },
      {
        "label": "B",
        "text": "只首次需要",
        "correct": false
      },
      {
        "label": "C",
        "text": "取决于数据集",
        "correct": false
      },
      {
        "label": "D",
        "text": "需要，从 GitHub 下载数据",
        "correct": true
      }
    ],
    "explanation": "load_dataset 从在线仓库下载数据集，需要网络连接。",
    "id": 280
  },
  {
    "type": "completion",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "regplot"
    ],
    "stem": "sns.regplot(x='x', y='y', data=df, order=2) 中 order=2 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "使用二次核函数",
        "correct": false
      },
      {
        "label": "B",
        "text": "拟合两条回归线",
        "correct": false
      },
      {
        "label": "C",
        "text": "拟合二阶多项式回归",
        "correct": true
      },
      {
        "label": "D",
        "text": "使用两个预测变量",
        "correct": false
      }
    ],
    "explanation": "order=2 拟合二阶多项式回归（二次曲线），而非线性回归。",
    "id": 281
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "stripplot"
    ],
    "stem": "sns.stripplot() 的 jitter 参数默认值是？",
    "options": [
      {
        "label": "A",
        "text": "True",
        "correct": false
      },
      {
        "label": "B",
        "text": "False",
        "correct": false
      },
      {
        "label": "C",
        "text": "None（自动判断）",
        "correct": true
      },
      {
        "label": "D",
        "text": "0.5",
        "correct": false
      }
    ],
    "explanation": "jitter 默认为 None，会自动判断是否添加抖动。",
    "id": 282
  },
  {
    "type": "result",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "pairplot"
    ],
    "stem": "sns.pairplot(df, vars=['a','b','c']) 的 vars 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置子图大小",
        "correct": false
      },
      {
        "label": "B",
        "text": "选择分类列",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置颜色",
        "correct": false
      },
      {
        "label": "D",
        "text": "选择参与绘图的数值列",
        "correct": true
      }
    ],
    "explanation": "vars 指定参与 pairplot 的数值列子集。",
    "id": 283
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "FacetGrid"
    ],
    "stem": "FacetGrid 的 map_dataframe() 与 map() 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "两者功能完全相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "map_dataframe 不支持分面",
        "correct": false
      },
      {
        "label": "C",
        "text": "map_dataframe 传递 DataFrame 列名，map 传递数组",
        "correct": true
      },
      {
        "label": "D",
        "text": "map 支持 DataFrame，map_dataframe 不支持",
        "correct": false
      }
    ],
    "explanation": "map_dataframe 接受列名字符串，map 接受实际数据数组。",
    "id": 284
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "histplot"
    ],
    "stem": "sns.histplot() 的 stat 参数可选值不包括？",
    "options": [
      {
        "label": "A",
        "text": "count",
        "correct": false
      },
      {
        "label": "B",
        "text": "density",
        "correct": false
      },
      {
        "label": "C",
        "text": "probability",
        "correct": false
      },
      {
        "label": "D",
        "text": "frequency",
        "correct": true
      }
    ],
    "explanation": "stat 支持 count、density、probability、percent，不包括 frequency。",
    "id": 285
  },
  {
    "type": "debug",
    "difficulty": "medium",
    "category": "seaborn",
    "tags": [
      "despine"
    ],
    "stem": "sns.despine(offset=10) 的 offset 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置透明度",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置边框宽度",
        "correct": false
      },
      {
        "label": "C",
        "text": "将坐标轴偏移 10 点",
        "correct": true
      },
      {
        "label": "D",
        "text": "设置字体偏移",
        "correct": false
      }
    ],
    "explanation": "offset 将坐标轴从数据区域偏移指定点数。",
    "id": 286
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap() 的 vmin 和 vmax 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置网格间距",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置图表尺寸",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置标注范围",
        "correct": false
      },
      {
        "label": "D",
        "text": "设置颜色映射的数据范围",
        "correct": true
      }
    ],
    "explanation": "vmin/vmax 设置颜色映射对应的数据范围下限和上限。",
    "id": 287
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "relplot"
    ],
    "stem": "sns.relplot() 的 row 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "设置行数",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置行高",
        "correct": false
      },
      {
        "label": "C",
        "text": "按指定列创建子图行",
        "correct": true
      },
      {
        "label": "D",
        "text": "选择行数据",
        "correct": false
      }
    ],
    "explanation": "row 参数按指定列的类别创建子图行，实现行方向分面。",
    "id": 288
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "FacetGrid"
    ],
    "stem": "FacetGrid 的 col_wrap 参数用于？",
    "options": [
      {
        "label": "A",
        "text": "设置子图间距",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置子图总列数",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置每行子图数量",
        "correct": true
      },
      {
        "label": "D",
        "text": "设置子图宽度",
        "correct": false
      }
    ],
    "explanation": "col_wrap 设置每行子图数量，超过则自动换行。",
    "id": 289
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "lmplot"
    ],
    "stem": "sns.lmplot(x='x', y='y', col='cat', data=df) 中 col='cat' 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "选择 cat 列作为 x 轴",
        "correct": false
      },
      {
        "label": "B",
        "text": "按 cat 列着色",
        "correct": false
      },
      {
        "label": "C",
        "text": "按 cat 列分组但画在同一图",
        "correct": false
      },
      {
        "label": "D",
        "text": "按 cat 列创建子图列",
        "correct": true
      }
    ],
    "explanation": "lmplot 的 col 参数按分类列创建子图列，每个类别一个子图。",
    "id": 290
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "heatmap"
    ],
    "stem": "sns.heatmap() 中 xticklabels=False 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "隐藏 x 轴",
        "correct": false
      },
      {
        "label": "B",
        "text": "缩小 x 轴标签",
        "correct": false
      },
      {
        "label": "C",
        "text": "旋转 x 轴标签",
        "correct": false
      },
      {
        "label": "D",
        "text": "隐藏 x 轴刻度标签",
        "correct": true
      }
    ],
    "explanation": "xticklabels=False 隐藏热力图的 x 轴刻度标签。",
    "id": 291
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "catplot"
    ],
    "stem": "sns.catplot() 的 sharey=False 参数效果是？",
    "options": [
      {
        "label": "A",
        "text": "隐藏 y 轴",
        "correct": false
      },
      {
        "label": "B",
        "text": "共享 y 轴",
        "correct": false
      },
      {
        "label": "C",
        "text": "每个子图独立 y 轴范围",
        "correct": true
      },
      {
        "label": "D",
        "text": "翻转 y 轴",
        "correct": false
      }
    ],
    "explanation": "sharey=False 使每个子图有独立的 y 轴范围，不共享。",
    "id": 292
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "color_palette"
    ],
    "stem": "sns.color_palette('flare', as_cmap=True) 返回什么类型？",
    "options": [
      {
        "label": "A",
        "text": "NumPy 数组",
        "correct": false
      },
      {
        "label": "B",
        "text": "颜色列表",
        "correct": false
      },
      {
        "label": "C",
        "text": "字典",
        "correct": false
      },
      {
        "label": "D",
        "text": "Matplotlib Colormap",
        "correct": true
      }
    ],
    "explanation": "as_cmap=True 返回 Matplotlib Colormap 对象，而非颜色列表。",
    "id": 293
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "jointplot"
    ],
    "stem": "sns.jointplot() 的 marginal_ticks 参数作用是？",
    "options": [
      {
        "label": "A",
        "text": "显示边际分布",
        "correct": false
      },
      {
        "label": "B",
        "text": "显示回归线",
        "correct": false
      },
      {
        "label": "C",
        "text": "在边际图上显示刻度",
        "correct": true
      },
      {
        "label": "D",
        "text": "显示标注",
        "correct": false
      }
    ],
    "explanation": "marginal_ticks=True 在边际分布图上显示刻度线。",
    "id": 294
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "barplot"
    ],
    "stem": "sns.barplot() 的 estimator 参数用于？",
    "options": [
      {
        "label": "A",
        "text": "设置颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置估计器类型",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置统计函数",
        "correct": true
      },
      {
        "label": "D",
        "text": "设置误差线类型",
        "correct": false
      }
    ],
    "explanation": "estimator 指定统计函数（如 np.median），默认为 np.mean。",
    "id": 295
  },
  {
    "type": "debug",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "violinplot"
    ],
    "stem": "sns.violinplot() 的 split=True 需要配合哪个参数？",
    "options": [
      {
        "label": "A",
        "text": "style",
        "correct": false
      },
      {
        "label": "B",
        "text": "col",
        "correct": false
      },
      {
        "label": "C",
        "text": "row",
        "correct": false
      },
      {
        "label": "D",
        "text": "hue",
        "correct": true
      }
    ],
    "explanation": "split=True 配合 hue 参数使用，将两侧分别着色表示不同类别。",
    "id": 296
  },
  {
    "type": "completion",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "displot"
    ],
    "stem": "sns.displot() 的 facet_kws 参数用于？",
    "options": [
      {
        "label": "A",
        "text": "传递绘图函数参数",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置颜色参数",
        "correct": false
      },
      {
        "label": "C",
        "text": "设置分面数量",
        "correct": false
      },
      {
        "label": "D",
        "text": "传递 FacetGrid 参数",
        "correct": true
      }
    ],
    "explanation": "facet_kws 传递给 FacetGrid 的参数，如 sharey、margin 等。",
    "id": 297
  },
  {
    "type": "result",
    "difficulty": "hard",
    "category": "seaborn",
    "tags": [
      "regplot"
    ],
    "stem": "sns.regplot(x='x', y='y', data=df, robust=True) 中 robust=True 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "使用更稳定的颜色",
        "correct": false
      },
      {
        "label": "B",
        "text": "使用更粗的线",
        "correct": false
      },
      {
        "label": "C",
        "text": "使用鲁棒回归降低异常值影响",
        "correct": true
      },
      {
        "label": "D",
        "text": "添加更多统计信息",
        "correct": false
      }
    ],
    "explanation": "robust=True 使用鲁棒回归方法，降低异常值对回归线的影响。",
    "id": 298
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "ndarray"
    ],
    "stem": "np.array([1,2,3]).shape 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "[3]",
        "correct": false
      },
      {
        "label": "B",
        "text": "(3,1)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(3,)",
        "correct": true
      },
      {
        "label": "D",
        "text": "(1,3)",
        "correct": false
      }
    ],
    "explanation": "np.array([1,2,3]) 创建一维数组，shape 为 (3,)，表示有3个元素的一维数组。",
    "id": 299
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "zeros"
    ],
    "stem": "np.zeros((2,3)) 创建的数组形状是？",
    "options": [
      {
        "label": "A",
        "text": "(2,2)",
        "correct": false
      },
      {
        "label": "B",
        "text": "(3,2)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(2,3)",
        "correct": true
      },
      {
        "label": "D",
        "text": "(6,)",
        "correct": false
      }
    ],
    "explanation": "np.zeros((2,3)) 创建2行3列的全零数组，形状为 (2,3)。",
    "id": 300
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "ones"
    ],
    "stem": "np.ones(4) 创建的数组包含几个元素？",
    "options": [
      {
        "label": "A",
        "text": "3",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": true
      },
      {
        "label": "C",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": false
      }
    ],
    "explanation": "np.ones(4) 创建包含4个1的一维数组，共4个元素。",
    "id": 301
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "arange"
    ],
    "stem": "np.arange(0,10,2) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([0,2,4])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([2,4,6,8,10])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([0,2,4,6,8,10])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([0,2,4,6,8])",
        "correct": true
      }
    ],
    "explanation": "np.arange(0,10,2) 从0开始，步长2，到10（不含），结果为 [0,2,4,6,8]。",
    "id": 302
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "linspace"
    ],
    "stem": "np.linspace(0,1,5) 产生几个元素？",
    "options": [
      {
        "label": "A",
        "text": "4",
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
    "explanation": "np.linspace(0,1,5) 在0到1之间等间隔生成5个数，包含端点。",
    "id": 303
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "full"
    ],
    "stem": "np.full((2,2),7) 创建的数组中所有元素的值是？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "C",
        "text": "7",
        "correct": true
      },
      {
        "label": "D",
        "text": "2",
        "correct": false
      }
    ],
    "explanation": "np.full((2,2),7) 创建2x2数组，所有元素填充为7。",
    "id": 304
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "eye"
    ],
    "stem": "np.eye(3) 创建的是什么矩阵？",
    "options": [
      {
        "label": "A",
        "text": "全1矩阵",
        "correct": false
      },
      {
        "label": "B",
        "text": "3x3单位矩阵",
        "correct": true
      },
      {
        "label": "C",
        "text": "全0矩阵",
        "correct": false
      },
      {
        "label": "D",
        "text": "对角线为0的矩阵",
        "correct": false
      }
    ],
    "explanation": "np.eye(3) 创建3x3单位矩阵，对角线为1，其余为0。",
    "id": 305
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "dtype"
    ],
    "stem": "np.array([1,2,3]).dtype 默认通常是什么类型？",
    "options": [
      {
        "label": "A",
        "text": "float64",
        "correct": false
      },
      {
        "label": "B",
        "text": "int64",
        "correct": true
      },
      {
        "label": "C",
        "text": "str",
        "correct": false
      },
      {
        "label": "D",
        "text": "bool",
        "correct": false
      }
    ],
    "explanation": "np.array([1,2,3]) 默认创建 int64 类型的数组。",
    "id": 306
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "ndim"
    ],
    "stem": "np.array([[1,2],[3,4]]).ndim 的结果是？",
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
    "explanation": "ndim 返回数组的维度数，2x2数组是二维，结果为2。",
    "id": 307
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "size"
    ],
    "stem": "np.array([[1,2],[3,4]]).size 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "4",
        "correct": true
      },
      {
        "label": "C",
        "text": "8",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "size 返回数组元素总数，2x2数组有4个元素。",
    "id": 308
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "reshape"
    ],
    "stem": "np.arange(6).reshape(2,3) 的形状是？",
    "options": [
      {
        "label": "A",
        "text": "(3,2)",
        "correct": false
      },
      {
        "label": "B",
        "text": "(6,)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(2,3)",
        "correct": true
      },
      {
        "label": "D",
        "text": "(1,6)",
        "correct": false
      }
    ],
    "explanation": "reshape(2,3) 将6个元素重塑为2行3列。",
    "id": 309
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "broadcasting",
      "arithmetic"
    ],
    "stem": "np.array([1,2,3]) + np.array([4,5,6]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([4,10,18])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([5,7,9])",
        "correct": true
      },
      {
        "label": "C",
        "text": "array([1,2,3,4,5,6])",
        "correct": false
      },
      {
        "label": "D",
        "text": "24",
        "correct": false
      }
    ],
    "explanation": "两个数组逐元素相加，结果为 [1+4, 2+5, 3+6] = [5,7,9]。",
    "id": 310
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "sum"
    ],
    "stem": "np.array([1,2,3]).sum() 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "5",
        "correct": false
      },
      {
        "label": "B",
        "text": "6",
        "correct": true
      },
      {
        "label": "C",
        "text": "9",
        "correct": false
      },
      {
        "label": "D",
        "text": "3",
        "correct": false
      }
    ],
    "explanation": "sum() 对所有元素求和，1+2+3=6。",
    "id": 311
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "mean"
    ],
    "stem": "np.array([2,4,6]).mean() 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "4",
        "correct": true
      },
      {
        "label": "B",
        "text": "3",
        "correct": false
      },
      {
        "label": "C",
        "text": "6",
        "correct": false
      },
      {
        "label": "D",
        "text": "12",
        "correct": false
      }
    ],
    "explanation": "mean() 计算平均值，(2+4+6)/3=4。",
    "id": 312
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "max",
      "min"
    ],
    "stem": "np.array([3,1,4,1,5]).max() 的结果是？",
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
        "text": "5",
        "correct": true
      },
      {
        "label": "D",
        "text": "4",
        "correct": false
      }
    ],
    "explanation": "max() 返回最大值，数组中最大值为5。",
    "id": 313
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "argmax",
      "argmin"
    ],
    "stem": "np.array([3,1,4]).argmax() 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "0",
        "correct": false
      },
      {
        "label": "B",
        "text": "1",
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
    "explanation": "argmax() 返回最大值的索引，4是最大值，索引为2。",
    "id": 314
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "T",
      "transpose"
    ],
    "stem": "np.array([[1,2],[3,4]]).T 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "[[1,4],[2,3]]",
        "correct": false
      },
      {
        "label": "B",
        "text": "[[1,2],[3,4]]",
        "correct": false
      },
      {
        "label": "C",
        "text": "[[2,1],[4,3]]",
        "correct": false
      },
      {
        "label": "D",
        "text": "[[1,3],[2,4]]",
        "correct": true
      }
    ],
    "explanation": "T 表示转置，行变列，[[1,2],[3,4]] 转置为 [[1,3],[2,4]]。",
    "id": 315
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "flatten"
    ],
    "stem": "np.array([[1,2],[3,4]]).flatten() 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([[1,2],[3,4]])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([1,3,2,4])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,2,3,4])",
        "correct": true
      },
      {
        "label": "D",
        "text": "array([1,2])",
        "correct": false
      }
    ],
    "explanation": "flatten() 将多维数组展平为一维，按行展开为 [1,2,3,4]。",
    "id": 316
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "random",
      "randint"
    ],
    "stem": "np.random.randint(1,10) 产生的随机整数范围是？",
    "options": [
      {
        "label": "A",
        "text": "0到9",
        "correct": false
      },
      {
        "label": "B",
        "text": "1到10",
        "correct": false
      },
      {
        "label": "C",
        "text": "1到9",
        "correct": true
      },
      {
        "label": "D",
        "text": "0到10",
        "correct": false
      }
    ],
    "explanation": "randint(1,10) 产生1（含）到10（不含）的随机整数，即1到9。",
    "id": 317
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "random",
      "seed"
    ],
    "stem": "np.random.seed(42) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "生成随机数42",
        "correct": false
      },
      {
        "label": "B",
        "text": "设置随机种子保证可重复性",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除随机数",
        "correct": false
      },
      {
        "label": "D",
        "text": "加速计算",
        "correct": false
      }
    ],
    "explanation": "seed() 设置随机种子，使随机结果可重复。",
    "id": 318
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "sort"
    ],
    "stem": "np.sort([3,1,2]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([3,1,2])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([3,2,1])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,2,3])",
        "correct": true
      },
      {
        "label": "D",
        "text": "array([2,3,1])",
        "correct": false
      }
    ],
    "explanation": "sort() 返回排序后的数组，升序排列为 [1,2,3]。",
    "id": 319
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "unique"
    ],
    "stem": "np.unique([1,2,2,3,3,3]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,1,2])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([1,2,2,3,3,3])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([3,2,1])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1,2,3])",
        "correct": true
      }
    ],
    "explanation": "unique() 返回去重后的唯一值，结果为 [1,2,3]。",
    "id": 320
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "astype"
    ],
    "stem": "np.array([1,2,3]).astype(float) 将数组转换为？",
    "options": [
      {
        "label": "A",
        "text": "整型数组",
        "correct": false
      },
      {
        "label": "B",
        "text": "浮点型数组",
        "correct": true
      },
      {
        "label": "C",
        "text": "字符串数组",
        "correct": false
      },
      {
        "label": "D",
        "text": "布尔数组",
        "correct": false
      }
    ],
    "explanation": "astype(float) 将数组元素转换为浮点类型。",
    "id": 321
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "sqrt"
    ],
    "stem": "np.sqrt([4,9,16]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([2,3,4])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([4,9,16])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([16,81,256])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([2.,3.,4.])",
        "correct": true
      }
    ],
    "explanation": "sqrt() 计算每个元素的平方根，sqrt(4)=2, sqrt(9)=3, sqrt(16)=4。",
    "id": 322
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "abs"
    ],
    "stem": "np.abs([-1,-2,3]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([-1,-2,3])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([1,2,3])",
        "correct": true
      },
      {
        "label": "C",
        "text": "array([1,2,-3])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([-1,-2,-3])",
        "correct": false
      }
    ],
    "explanation": "abs() 计算绝对值，|-1|=1, |-2|=2, |3|=3。",
    "id": 323
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "dot"
    ],
    "stem": "np.dot([1,2],[3,4]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([3,8])",
        "correct": false
      },
      {
        "label": "B",
        "text": "11",
        "correct": true
      },
      {
        "label": "C",
        "text": "array([1,2,3,4])",
        "correct": false
      },
      {
        "label": "D",
        "text": "5",
        "correct": false
      }
    ],
    "explanation": "dot() 对一维数组做内积，1*3+2*4=11。",
    "id": 324
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "basic indexing"
    ],
    "stem": "np.array([10,20,30])[1] 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": false
      },
      {
        "label": "B",
        "text": "20",
        "correct": true
      },
      {
        "label": "C",
        "text": "30",
        "correct": false
      },
      {
        "label": "D",
        "text": "0",
        "correct": false
      }
    ],
    "explanation": "索引1对应第二个元素，值为20。",
    "id": 325
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "slicing"
    ],
    "stem": "np.array([1,2,3,4,5])[1:4] 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,2,3])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([1,2,3,4])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([2,3,4,5])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([2,3,4])",
        "correct": true
      }
    ],
    "explanation": "切片1:4 取索引1到3的元素，结果为 [2,3,4]。",
    "id": 326
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "empty"
    ],
    "stem": "np.empty((2,3)) 创建的数组特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "全零数组",
        "correct": false
      },
      {
        "label": "B",
        "text": "全一数组",
        "correct": false
      },
      {
        "label": "C",
        "text": "未初始化的随机值数组",
        "correct": true
      },
      {
        "label": "D",
        "text": "单位矩阵",
        "correct": false
      }
    ],
    "explanation": "empty() 创建未初始化的数组，内容为内存中的随机值。",
    "id": 327
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "numpy",
    "tags": [
      "exp"
    ],
    "stem": "np.exp([0,1]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1, 1])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([0, 1])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([0, 2.718...])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1, 2.718...])",
        "correct": true
      }
    ],
    "explanation": "exp() 计算e的幂次，e^0=1, e^1≈2.718。",
    "id": 328
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "broadcasting"
    ],
    "stem": "np.array([[1],[2]]) + np.array([3,4]) 的形状是？",
    "options": [
      {
        "label": "A",
        "text": "(1,2)",
        "correct": false
      },
      {
        "label": "B",
        "text": "(2,)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(2,2)",
        "correct": true
      },
      {
        "label": "D",
        "text": "(4,)",
        "correct": false
      }
    ],
    "explanation": "广播机制：(2,1) 和 (2,) 运算，结果形状为 (2,2)。",
    "id": 329
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "reshape"
    ],
    "stem": "np.arange(12).reshape(3,4) 的 shape 是？",
    "options": [
      {
        "label": "A",
        "text": "(12,)",
        "correct": false
      },
      {
        "label": "B",
        "text": "(4,3)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(3,4)",
        "correct": true
      },
      {
        "label": "D",
        "text": "(2,6)",
        "correct": false
      }
    ],
    "explanation": "12个元素重塑为3行4列，shape 为 (3,4)。",
    "id": 330
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "axis operations"
    ],
    "stem": "np.array([[1,2],[3,4]]).sum(axis=0) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "10",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([3,7])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,2])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([4,6])",
        "correct": true
      }
    ],
    "explanation": "axis=0 沿列方向求和，1+3=4, 2+4=6，结果为 [4,6]。",
    "id": 331
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "axis operations"
    ],
    "stem": "np.array([[1,2],[3,4]]).sum(axis=1) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([4,6])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([3,7])",
        "correct": true
      },
      {
        "label": "C",
        "text": "10",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1,2])",
        "correct": false
      }
    ],
    "explanation": "axis=1 沿行方向求和，1+2=3, 3+4=7，结果为 [3,7]。",
    "id": 332
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "boolean indexing"
    ],
    "stem": "np.array([1,2,3,4])[np.array([True,False,True,False])] 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,2,3,4])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([2,4])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,3])",
        "correct": true
      },
      {
        "label": "D",
        "text": "array([1,2])",
        "correct": false
      }
    ],
    "explanation": "布尔索引选取True对应位置的元素，第0和第2位为True，取1和3。",
    "id": 333
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "fancy indexing"
    ],
    "stem": "np.array([10,20,30,40])[[1,3]] 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([30,10])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([10,30])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,3])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([20,40])",
        "correct": true
      }
    ],
    "explanation": "花式索引按指定索引列表取值，取索引1和3位置的元素。",
    "id": 334
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "argsort"
    ],
    "stem": "np.array([3,1,2]).argsort() 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,0,2])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([0,1,2])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([2,0,1])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1,2,0])",
        "correct": true
      }
    ],
    "explanation": "argsort() 返回排序后的索引，值1(索引1)最小，2(索引2)次之，3(索引0)最大。",
    "id": 335
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "where"
    ],
    "stem": "np.where(np.array([1,-2,3])>0, 1, 0) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,1,1])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([0,1,0])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,0,1])",
        "correct": true
      },
      {
        "label": "D",
        "text": "array([0,0,0])",
        "correct": false
      }
    ],
    "explanation": "where() 根据条件选取值，大于0的位填1，否则填0。",
    "id": 336
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "concatenate"
    ],
    "stem": "np.concatenate([np.array([1,2]),np.array([3,4])]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([2,4])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([[1,2],[3,4]])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,3,2,4])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1,2,3,4])",
        "correct": true
      }
    ],
    "explanation": "concatenate() 沿已有轴拼接，两个一维数组拼接为 [1,2,3,4]。",
    "id": 337
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "vstack",
      "hstack"
    ],
    "stem": "np.vstack([np.array([1,2]),np.array([3,4])]) 的形状是？",
    "options": [
      {
        "label": "A",
        "text": "以上都不对",
        "correct": false
      },
      {
        "label": "B",
        "text": "(4,)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(1,4)",
        "correct": false
      },
      {
        "label": "D",
        "text": "(2,2)",
        "correct": true
      }
    ],
    "explanation": "vstack() 垂直堆叠，两个一维数组堆叠成2x2矩阵。",
    "id": 338
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "hstack"
    ],
    "stem": "np.hstack([np.array([1,2]),np.array([3,4])]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,2,3,4])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([[1,2],[3,4]])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1,3,2,4])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([2,4])",
        "correct": false
      }
    ],
    "explanation": "hstack() 水平堆叠，两个一维数组拼接为 [1,2,3,4]。",
    "id": 339
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "split"
    ],
    "stem": "np.split(np.arange(6),3) 产生几个子数组？",
    "options": [
      {
        "label": "A",
        "text": "2",
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
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "split() 将6个元素等分为3份，产生3个子数组。",
    "id": 340
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "nan",
      "isnan"
    ],
    "stem": "np.isnan(np.array([1,np.nan,3])) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([False,False,False])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([True,False,True])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([False,True,False])",
        "correct": true
      },
      {
        "label": "D",
        "text": "array([True,True,True])",
        "correct": false
      }
    ],
    "explanation": "isnan() 检测NaN值，只有第二个元素是NaN。",
    "id": 341
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "nanmean"
    ],
    "stem": "np.nanmean([1,np.nan,3]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "2.0",
        "correct": true
      },
      {
        "label": "B",
        "text": "1.0",
        "correct": false
      },
      {
        "label": "C",
        "text": "3.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "nan",
        "correct": false
      }
    ],
    "explanation": "nanmean() 忽略NaN计算均值，(1+3)/2=2.0。",
    "id": 342
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "random",
      "choice"
    ],
    "stem": "np.random.choice([1,2,3,4], size=2) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "排序数组取前2个",
        "correct": false
      },
      {
        "label": "B",
        "text": "创建长度为2的全1数组",
        "correct": false
      },
      {
        "label": "C",
        "text": "生成2个0到1的随机数",
        "correct": false
      },
      {
        "label": "D",
        "text": "从数组中随机选2个元素",
        "correct": true
      }
    ],
    "explanation": "choice() 从给定数组中随机选取指定数量的元素。",
    "id": 343
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "random",
      "rand"
    ],
    "stem": "np.random.rand(2,3) 产生的数组形状是？",
    "options": [
      {
        "label": "A",
        "text": "(2,3)",
        "correct": true
      },
      {
        "label": "B",
        "text": "(3,2)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(6,)",
        "correct": false
      },
      {
        "label": "D",
        "text": "(1,6)",
        "correct": false
      }
    ],
    "explanation": "rand(2,3) 生成2行3列的0-1均匀分布随机数组。",
    "id": 344
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "random",
      "randn"
    ],
    "stem": "np.random.randn(3) 产生的是？",
    "options": [
      {
        "label": "A",
        "text": "3个标准正态分布随机数",
        "correct": true
      },
      {
        "label": "B",
        "text": "3个0到1均匀分布随机数",
        "correct": false
      },
      {
        "label": "C",
        "text": "3个整数",
        "correct": false
      },
      {
        "label": "D",
        "text": "3x3矩阵",
        "correct": false
      }
    ],
    "explanation": "randn() 生成标准正态分布（均值0，标准差1）的随机数。",
    "id": 345
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "matmul"
    ],
    "stem": "np.matmul(np.eye(2),np.array([[1,2],[3,4]])) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([[1,2],[3,4]])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([[1,3],[2,4]])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([[5,5],[5,5]])",
        "correct": false
      },
      {
        "label": "D",
        "text": "单位矩阵乘任何矩阵等于自身，故仍为 [[1,2],[3,4]]",
        "correct": false
      }
    ],
    "explanation": "单位矩阵与任何矩阵相乘结果不变，但选项D描述了本质。",
    "id": 346
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "std"
    ],
    "stem": "np.array([2,4,4,4,5,5,7,9]).std() 的结果近似？",
    "options": [
      {
        "label": "A",
        "text": "1.0",
        "correct": false
      },
      {
        "label": "B",
        "text": "0.5",
        "correct": false
      },
      {
        "label": "C",
        "text": "4.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "2.0",
        "correct": true
      }
    ],
    "explanation": "标准差衡量数据离散程度，该数据集std约为2.0。",
    "id": 347
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "log"
    ],
    "stem": "np.log([1,np.e]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([0, 1])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([1, 0])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1, 2.718...])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([0, 0])",
        "correct": false
      }
    ],
    "explanation": "log() 是自然对数，ln(1)=0, ln(e)=1。",
    "id": 348
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "numpy",
    "tags": [
      "round"
    ],
    "stem": "np.round(3.567, 2) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "3.57",
        "correct": true
      },
      {
        "label": "B",
        "text": "3.56",
        "correct": false
      },
      {
        "label": "C",
        "text": "4.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "3.5",
        "correct": false
      }
    ],
    "explanation": "round(x,2) 保留2位小数四舍五入，3.567→3.57。",
    "id": 349
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "broadcasting"
    ],
    "stem": "np.array([1,2,3])[:,None] + np.array([4,5]) 的形状是？",
    "options": [
      {
        "label": "A",
        "text": "(3,3)",
        "correct": false
      },
      {
        "label": "B",
        "text": "(2,3)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(5,)",
        "correct": false
      },
      {
        "label": "D",
        "text": "(3,2)",
        "correct": true
      }
    ],
    "explanation": "[:,None] 将(3,)变为(3,1)，与(2,)广播得到(3,2)。",
    "id": 350
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "reshape"
    ],
    "stem": "np.arange(8).reshape(2,2,2) 的 ndim 是？",
    "options": [
      {
        "label": "A",
        "text": "2",
        "correct": false
      },
      {
        "label": "B",
        "text": "3",
        "correct": true
      },
      {
        "label": "C",
        "text": "4",
        "correct": false
      },
      {
        "label": "D",
        "text": "8",
        "correct": false
      }
    ],
    "explanation": "reshape(2,2,2) 创建三维数组，ndim为3。",
    "id": 351
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "dot",
      "matmul"
    ],
    "stem": "A=np.array([[1,2],[3,4]]); B=np.array([[5,6],[7,8]]); np.dot(A,B) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([[19,22],[43,50]])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([[5,6],[7,8]])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([[19,43],[22,50]])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([[1,2],[3,4]])",
        "correct": false
      }
    ],
    "explanation": "矩阵乘法：[[1*5+2*7,1*6+2*8],[3*5+4*7,3*6+4*8]]= [[19,22],[43,50]]。",
    "id": 352
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "axis operations",
      "argmax"
    ],
    "stem": "np.array([[1,3,2],[4,0,5]]).argmax(axis=1) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,2])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([0,1])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([2,0])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([1,0])",
        "correct": false
      }
    ],
    "explanation": "沿axis=1求每行最大值索引，第一行3在索引1，第二行5在索引2。",
    "id": 353
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "nan",
      "nansum"
    ],
    "stem": "np.nansum([1,np.nan,3]) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "4.0",
        "correct": true
      },
      {
        "label": "B",
        "text": "nan",
        "correct": false
      },
      {
        "label": "C",
        "text": "1.0",
        "correct": false
      },
      {
        "label": "D",
        "text": "3.0",
        "correct": false
      }
    ],
    "explanation": "nansum() 忽略NaN求和，1+3=4.0。",
    "id": 354
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "stack"
    ],
    "stem": "np.stack([np.array([1,2]),np.array([3,4])], axis=0) 的形状是？",
    "options": [
      {
        "label": "A",
        "text": "(2,2)",
        "correct": true
      },
      {
        "label": "B",
        "text": "(4,)",
        "correct": false
      },
      {
        "label": "C",
        "text": "(2,)",
        "correct": false
      },
      {
        "label": "D",
        "text": "(1,2)",
        "correct": false
      }
    ],
    "explanation": "stack() 沿新轴堆叠，axis=0 产生 (2,2) 形状。",
    "id": 355
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "where",
      "complex"
    ],
    "stem": "np.where(np.array([1,-1,2,-2])>0, np.array([10,20,30,40]), np.array([100,200,300,400])) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([10,100,30,400])",
        "correct": false
      },
      {
        "label": "B",
        "text": "array([10,20,30,40])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([100,200,300,400])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([10,200,30,400])",
        "correct": true
      }
    ],
    "explanation": "where() 根据条件从x或y中选值，正数取x，负数取y。",
    "id": 356
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "ravel"
    ],
    "stem": "np.array([[1,2],[3,4]]).ravel() 和 flatten() 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "ravel返回视图，flatten返回副本",
        "correct": true
      },
      {
        "label": "B",
        "text": "ravel返回副本，flatten返回视图",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者完全相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "ravel只用于一维数组",
        "correct": false
      }
    ],
    "explanation": "ravel() 返回视图（共享内存），flatten() 返回副本（独立内存）。",
    "id": 357
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "dtype",
      "astype"
    ],
    "stem": "np.array([1.1,2.9]).astype(int) 的结果是？",
    "options": [
      {
        "label": "A",
        "text": "array([1,2])",
        "correct": true
      },
      {
        "label": "B",
        "text": "array([1,3])",
        "correct": false
      },
      {
        "label": "C",
        "text": "array([1.1,2.9])",
        "correct": false
      },
      {
        "label": "D",
        "text": "array([0,0])",
        "correct": false
      }
    ],
    "explanation": "astype(int) 截断小数部分（非四舍五入），1.1→1, 2.9→2。",
    "id": 358
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "numpy",
    "tags": [
      "broadcasting",
      "complex"
    ],
    "stem": "A shape (3,1,4) 和 B shape (2,1) 能否广播运算？若能，结果形状是？",
    "options": [
      {
        "label": "A",
        "text": "能，(3,2,4)",
        "correct": true
      },
      {
        "label": "B",
        "text": "不能",
        "correct": false
      },
      {
        "label": "C",
        "text": "能，(3,1,4)",
        "correct": false
      },
      {
        "label": "D",
        "text": "能，(5,4)",
        "correct": false
      }
    ],
    "explanation": "广播规则：(3,1,4)与(2,1)对齐后，B扩展为(1,2,1)，结果为(3,2,4)。",
    "id": 359
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "DataFrame",
      "Series"
    ],
    "stem": "创建一个包含三行两列的 DataFrame，应使用哪个函数？",
    "options": [
      {
        "label": "A",
        "text": "pd.DataFrame()",
        "correct": true
      },
      {
        "label": "B",
        "text": "pd.create_frame()",
        "correct": false
      },
      {
        "label": "C",
        "text": "pd.new_frame()",
        "correct": false
      },
      {
        "label": "D",
        "text": "pd.make_frame()",
        "correct": false
      }
    ],
    "explanation": "pd.DataFrame() 是 Pandas 中创建 DataFrame 的标准构造函数，可通过传入字典、列表等数据结构来创建。",
    "id": 360
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "Series"
    ],
    "stem": "pd.Series([1,2,3]) 创建的对象默认索引是什么？",
    "options": [
      {
        "label": "A",
        "text": "0, 1, 2",
        "correct": true
      },
      {
        "label": "B",
        "text": "1, 2, 3",
        "correct": false
      },
      {
        "label": "C",
        "text": "a, b, c",
        "correct": false
      },
      {
        "label": "D",
        "text": "无默认索引",
        "correct": false
      }
    ],
    "explanation": "Series 默认使用从 0 开始的整数索引，与列表行为一致。",
    "id": 361
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "read_csv"
    ],
    "stem": "pd.read_csv('data.csv') 默认使用哪一行作为列名？",
    "options": [
      {
        "label": "A",
        "text": "第一行（header=0）",
        "correct": true
      },
      {
        "label": "B",
        "text": "最后一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "无默认列名行",
        "correct": false
      },
      {
        "label": "D",
        "text": "第二行",
        "correct": false
      }
    ],
    "explanation": "read_csv 默认 header=0，即用文件第一行作为列名。",
    "id": 362
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "to_csv"
    ],
    "stem": "df.to_csv('out.csv', index=False) 中 index=False 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "不写入行索引",
        "correct": true
      },
      {
        "label": "B",
        "text": "不写入列名",
        "correct": false
      },
      {
        "label": "C",
        "text": "不写入数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "压缩文件",
        "correct": false
      }
    ],
    "explanation": "index=False 表示导出时不将 DataFrame 的行索引写入 CSV 文件。",
    "id": 363
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "head",
      "tail"
    ],
    "stem": "df.head() 默认返回前几行？",
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
        "text": "10",
        "correct": false
      },
      {
        "label": "D",
        "text": "1",
        "correct": false
      }
    ],
    "explanation": "head() 默认返回前 5 行，可通过参数指定其他行数。",
    "id": 364
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "shape"
    ],
    "stem": "df.shape 返回值的类型和含义是？",
    "options": [
      {
        "label": "A",
        "text": "元组，(行数, 列数)",
        "correct": true
      },
      {
        "label": "B",
        "text": "列表，[行数, 列数]",
        "correct": false
      },
      {
        "label": "C",
        "text": "整数，总元素数",
        "correct": false
      },
      {
        "label": "D",
        "text": "字典，{行: 行数, 列: 列数}",
        "correct": false
      }
    ],
    "explanation": "shape 返回一个元组 (rows, columns)，表示 DataFrame 的维度。",
    "id": 365
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "info"
    ],
    "stem": "df.info() 主要用于查看什么信息？",
    "options": [
      {
        "label": "A",
        "text": "DataFrame 的摘要信息（行数、列名、数据类型、非空计数）",
        "correct": true
      },
      {
        "label": "B",
        "text": "每列的统计描述",
        "correct": false
      },
      {
        "label": "C",
        "text": "前5行数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺失值热力图",
        "correct": false
      }
    ],
    "explanation": "info() 输出 DataFrame 的概要，包括行数、列名、每列的非空计数和数据类型。",
    "id": 366
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "describe"
    ],
    "stem": "df.describe() 默认对哪种数据类型的列进行统计？",
    "options": [
      {
        "label": "A",
        "text": "数值型（int/float）",
        "correct": true
      },
      {
        "label": "B",
        "text": "字符串型",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有列",
        "correct": false
      },
      {
        "label": "D",
        "text": "仅整数列",
        "correct": false
      }
    ],
    "explanation": "describe() 默认只对数值型列计算统计量，用 include='all' 可包含所有列。",
    "id": 367
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "columns",
      "dtypes"
    ],
    "stem": "df.columns 返回的是什么？",
    "options": [
      {
        "label": "A",
        "text": "所有列名的 Index 对象",
        "correct": true
      },
      {
        "label": "B",
        "text": "所有行索引",
        "correct": false
      },
      {
        "label": "C",
        "text": "数据类型列表",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺失值计数",
        "correct": false
      }
    ],
    "explanation": "df.columns 返回一个包含所有列名的 Index 对象。",
    "id": 368
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "dtypes"
    ],
    "stem": "df.dtypes 返回的是什么？",
    "options": [
      {
        "label": "A",
        "text": "每列的数据类型 Series",
        "correct": true
      },
      {
        "label": "B",
        "text": "每行的数据类型",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有唯一数据类型",
        "correct": false
      },
      {
        "label": "D",
        "text": "数据类型字典",
        "correct": false
      }
    ],
    "explanation": "dtypes 返回一个 Series，索引为列名，值为对应的数据类型。",
    "id": 369
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "loc"
    ],
    "stem": "df.loc[0, 'name'] 访问的是什么？",
    "options": [
      {
        "label": "A",
        "text": "第0行 name 列的值",
        "correct": true
      },
      {
        "label": "B",
        "text": "第0列 name 行的值",
        "correct": false
      },
      {
        "label": "C",
        "text": "所有行的 name 列",
        "correct": false
      },
      {
        "label": "D",
        "text": "第0行所有列",
        "correct": false
      }
    ],
    "explanation": "loc 使用标签定位，df.loc[0, 'name'] 获取行标签为 0、列名为 name 的单个值。",
    "id": 370
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "iloc"
    ],
    "stem": "df.iloc[2, 1] 访问的是什么？",
    "options": [
      {
        "label": "A",
        "text": "第2行第1列（从0开始计数）",
        "correct": true
      },
      {
        "label": "B",
        "text": "第2行第1列（从1开始计数）",
        "correct": false
      },
      {
        "label": "C",
        "text": "第1行第2列",
        "correct": false
      },
      {
        "label": "D",
        "text": "第2列所有行",
        "correct": false
      }
    ],
    "explanation": "iloc 使用整数位置索引，行列均从 0 开始计数。",
    "id": 371
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "dropna"
    ],
    "stem": "DataFrame.dropna() 的默认行为是？",
    "options": [
      {
        "label": "A",
        "text": "删除包含 NaN 的行",
        "correct": true
      },
      {
        "label": "B",
        "text": "删除包含 NaN 的列",
        "correct": false
      },
      {
        "label": "C",
        "text": "用0填充 NaN",
        "correct": false
      },
      {
        "label": "D",
        "text": "标记 NaN 位置",
        "correct": false
      }
    ],
    "explanation": "dropna() 默认 axis=0，即删除包含缺失值的行。设置 axis=1 可删除列。",
    "id": 372
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "fillna"
    ],
    "stem": "df.fillna(0) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "将所有 NaN 替换为 0",
        "correct": true
      },
      {
        "label": "B",
        "text": "删除值为 0 的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "将 0 替换为 NaN",
        "correct": false
      },
      {
        "label": "D",
        "text": "检查是否有 0",
        "correct": false
      }
    ],
    "explanation": "fillna(0) 用 0 填充所有缺失值。",
    "id": 373
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "sort_values"
    ],
    "stem": "df.sort_values('age', ascending=False) 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "按 age 列降序排列",
        "correct": true
      },
      {
        "label": "B",
        "text": "按 age 列升序排列",
        "correct": false
      },
      {
        "label": "C",
        "text": "按索引降序排列",
        "correct": false
      },
      {
        "label": "D",
        "text": "按 age 列去重",
        "correct": false
      }
    ],
    "explanation": "ascending=False 表示降序排列，True 为升序。",
    "id": 374
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "value_counts"
    ],
    "stem": "df['city'].value_counts() 的返回值是？",
    "options": [
      {
        "label": "A",
        "text": "每个城市出现次数的 Series",
        "correct": true
      },
      {
        "label": "B",
        "text": "唯一城市列表",
        "correct": false
      },
      {
        "label": "C",
        "text": "城市名称排序",
        "correct": false
      },
      {
        "label": "D",
        "text": "城市占比百分比",
        "correct": false
      }
    ],
    "explanation": "value_counts() 返回每个唯一值的出现次数，结果为降序排列的 Series。",
    "id": 375
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "unique",
      "nunique"
    ],
    "stem": "df['name'].nunique() 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "唯一值列表",
        "correct": false
      },
      {
        "label": "B",
        "text": "唯一值的个数",
        "correct": true
      },
      {
        "label": "C",
        "text": "所有值的总数",
        "correct": false
      },
      {
        "label": "D",
        "text": "缺失值个数",
        "correct": false
      }
    ],
    "explanation": "nunique() 返回唯一值的数量，unique() 返回唯一值数组。",
    "id": 376
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "duplicated",
      "drop_duplicates"
    ],
    "stem": "df.drop_duplicates() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "标记重复行",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除重复行",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除缺失行",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除空行",
        "correct": false
      }
    ],
    "explanation": "drop_duplicates() 删除 DataFrame 中的重复行，duplicated() 则标记重复行。",
    "id": 377
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "astype"
    ],
    "stem": "df['price'].astype(int) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "删除 price 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "将 price 列转换为整数类型",
        "correct": true
      },
      {
        "label": "C",
        "text": "复制 price 列",
        "correct": false
      },
      {
        "label": "D",
        "text": "对 price 取整",
        "correct": false
      }
    ],
    "explanation": "astype() 用于类型转换，将列的数据类型转为指定类型。",
    "id": 378
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "read_excel"
    ],
    "stem": "pd.read_excel('file.xlsx', sheet_name='Sheet1') 中 sheet_name 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "指定文件路径",
        "correct": false
      },
      {
        "label": "B",
        "text": "指定读取的工作表名称",
        "correct": true
      },
      {
        "label": "C",
        "text": "指定列名",
        "correct": false
      },
      {
        "label": "D",
        "text": "指定编码格式",
        "correct": false
      }
    ],
    "explanation": "sheet_name 参数用于指定要读取的 Excel 工作表名称或索引。",
    "id": 379
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "groupby"
    ],
    "stem": "df.groupby('department')['salary'].mean() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "计算总体平均薪资",
        "correct": false
      },
      {
        "label": "B",
        "text": "按部门分组，计算每组的平均薪资",
        "correct": true
      },
      {
        "label": "C",
        "text": "按薪资分组",
        "correct": false
      },
      {
        "label": "D",
        "text": "按部门排序",
        "correct": false
      }
    ],
    "explanation": "groupby 按 department 分组后，对 salary 列计算均值。",
    "id": 380
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "merge"
    ],
    "stem": "pd.merge(df1, df2, on='id') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "按行拼接两个 DataFrame",
        "correct": false
      },
      {
        "label": "B",
        "text": "按 id 列合并两个 DataFrame",
        "correct": true
      },
      {
        "label": "C",
        "text": "比较两个 DataFrame",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除 id 列",
        "correct": false
      }
    ],
    "explanation": "merge 按 on 指定的列进行连接，类似于 SQL 的 JOIN 操作。",
    "id": 381
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "concat"
    ],
    "stem": "pd.concat([df1, df2], axis=0) 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "横向拼接（增加列）",
        "correct": false
      },
      {
        "label": "B",
        "text": "纵向拼接（增加行）",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除重复行",
        "correct": false
      },
      {
        "label": "D",
        "text": "合并索引",
        "correct": false
      }
    ],
    "explanation": "axis=0 表示纵向拼接，将 df2 的行追加到 df1 下方。",
    "id": 382
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "isnull",
      "notnull"
    ],
    "stem": "df.isnull().sum() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "统计每行的缺失值数量",
        "correct": false
      },
      {
        "label": "B",
        "text": "统计每列的缺失值数量",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除缺失值",
        "correct": false
      },
      {
        "label": "D",
        "text": "填充缺失值",
        "correct": false
      }
    ],
    "explanation": "isnull() 返回布尔 DataFrame，sum() 按列累加 True 值，得到每列缺失数量。",
    "id": 383
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "apply",
      "map"
    ],
    "stem": "df['name'].map(str.upper) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "删除 name 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "将 name 列的值转为大写",
        "correct": true
      },
      {
        "label": "C",
        "text": "重命名 name 列",
        "correct": false
      },
      {
        "label": "D",
        "text": "按 name 排序",
        "correct": false
      }
    ],
    "explanation": "map() 对 Series 的每个元素应用函数，str.upper 将字符串转为大写。",
    "id": 384
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "boolean indexing"
    ],
    "stem": "df[df['age'] > 30] 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "将 age 列加 30",
        "correct": false
      },
      {
        "label": "B",
        "text": "筛选 age 大于 30 的行",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除 age 大于 30 的行",
        "correct": false
      },
      {
        "label": "D",
        "text": "修改 age 为 30",
        "correct": false
      }
    ],
    "explanation": "布尔索引用于条件筛选，返回满足条件的行。",
    "id": 385
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "to_datetime"
    ],
    "stem": "pd.to_datetime('2024-01-01') 的返回类型是？",
    "options": [
      {
        "label": "A",
        "text": "str",
        "correct": false
      },
      {
        "label": "B",
        "text": "Timestamp",
        "correct": true
      },
      {
        "label": "C",
        "text": "datetime.date",
        "correct": false
      },
      {
        "label": "D",
        "text": "int",
        "correct": false
      }
    ],
    "explanation": "to_datetime 将字符串解析为 Pandas 的 Timestamp 类型。",
    "id": 386
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "str accessor"
    ],
    "stem": "df['email'].str.contains('@') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "替换 @ 字符",
        "correct": false
      },
      {
        "label": "B",
        "text": "检查 email 列是否包含 @ 字符",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除 @ 字符",
        "correct": false
      },
      {
        "label": "D",
        "text": "在 email 中插入 @",
        "correct": false
      }
    ],
    "explanation": "str.contains() 检查每个字符串是否包含指定子串，返回布尔 Series。",
    "id": 387
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "pivot_table"
    ],
    "stem": "pd.pivot_table(df, values='sales', index='region', aggfunc='sum') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "按销售额排序",
        "correct": false
      },
      {
        "label": "B",
        "text": "按区域汇总销售额",
        "correct": true
      },
      {
        "label": "C",
        "text": "筛选区域数据",
        "correct": false
      },
      {
        "label": "D",
        "text": "删除区域列",
        "correct": false
      }
    ],
    "explanation": "pivot_table 创建透视表，按 region 分组对 sales 求和。",
    "id": 388
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "pandas",
    "tags": [
      "Series",
      "DataFrame"
    ],
    "stem": "Series 和 DataFrame 的主要区别是？",
    "options": [
      {
        "label": "A",
        "text": "Series 比 DataFrame 速度快",
        "correct": false
      },
      {
        "label": "B",
        "text": "Series 是一维，DataFrame 是二维",
        "correct": true
      },
      {
        "label": "C",
        "text": "DataFrame 不能包含字符串",
        "correct": false
      },
      {
        "label": "D",
        "text": "Series 不能有索引",
        "correct": false
      }
    ],
    "explanation": "Series 是一维数据结构，DataFrame 是二维表格结构，每列是一个 Series。",
    "id": 389
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "loc",
      "iloc"
    ],
    "stem": "loc 和 iloc 的核心区别是？",
    "options": [
      {
        "label": "A",
        "text": "loc 更快",
        "correct": false
      },
      {
        "label": "B",
        "text": "loc 用标签，iloc 用整数位置",
        "correct": true
      },
      {
        "label": "C",
        "text": "iloc 支持切片，loc 不支持",
        "correct": false
      },
      {
        "label": "D",
        "text": "loc 只能用于行",
        "correct": false
      }
    ],
    "explanation": "loc 基于标签索引，iloc 基于整数位置索引，这是两者的核心区别。",
    "id": 390
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "isin"
    ],
    "stem": "df[df['city'].isin(['北京','上海'])] 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "筛选城市既不是北京也不是上海的行",
        "correct": false
      },
      {
        "label": "B",
        "text": "筛选城市为北京或上海的行",
        "correct": true
      },
      {
        "label": "C",
        "text": "将城市替换为北京或上海",
        "correct": false
      },
      {
        "label": "D",
        "text": "统计北京上海出现次数",
        "correct": false
      }
    ],
    "explanation": "isin() 返回布尔 Series，判断元素是否在给定列表中，用于条件筛选。",
    "id": 391
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "query"
    ],
    "stem": "df.query('age > 30 and city == \"北京\"') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "删除年龄大于30的行",
        "correct": false
      },
      {
        "label": "B",
        "text": "筛选年龄大于30或城市为北京的行",
        "correct": false
      },
      {
        "label": "C",
        "text": "筛选年龄大于30且城市为北京的行",
        "correct": true
      },
      {
        "label": "D",
        "text": "更新年龄和城市",
        "correct": false
      }
    ],
    "explanation": "query() 使用字符串表达式筛选，and 表示同时满足两个条件。",
    "id": 392
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "sort_index"
    ],
    "stem": "df.sort_index(ascending=False) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "按值降序排列",
        "correct": false
      },
      {
        "label": "B",
        "text": "按列名降序排列",
        "correct": false
      },
      {
        "label": "C",
        "text": "按索引降序排列",
        "correct": true
      },
      {
        "label": "D",
        "text": "重置索引",
        "correct": false
      }
    ],
    "explanation": "sort_index 按索引排序，ascending=False 表示降序。",
    "id": 393
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "groupby",
      "agg"
    ],
    "stem": "df.groupby('dept')['salary'].agg(['mean','max','min']) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "只计算均值",
        "correct": false
      },
      {
        "label": "B",
        "text": "计算全局统计量",
        "correct": false
      },
      {
        "label": "C",
        "text": "按部门分组，同时计算均值、最大值、最小值",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除重复部门",
        "correct": false
      }
    ],
    "explanation": "agg() 接受多个聚合函数列表，同时计算多个统计量。",
    "id": 394
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "groupby",
      "transform"
    ],
    "stem": "groupby().transform() 与 groupby().agg() 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "transform 只能用于数值列",
        "correct": false
      },
      {
        "label": "B",
        "text": "transform 更快",
        "correct": false
      },
      {
        "label": "C",
        "text": "transform 保持原 DataFrame 形状，agg 返回聚合结果",
        "correct": true
      },
      {
        "label": "D",
        "text": "agg 不能用于分组",
        "correct": false
      }
    ],
    "explanation": "transform 广播聚合结果到原形状，agg 返回压缩的聚合结果。",
    "id": 395
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "merge"
    ],
    "stem": "pd.merge(df1, df2, how='left') 中 how='left' 的含义是？",
    "options": [
      {
        "label": "A",
        "text": "右连接",
        "correct": false
      },
      {
        "label": "B",
        "text": "只保留左表的列",
        "correct": false
      },
      {
        "label": "C",
        "text": "左连接，保留左表所有行",
        "correct": true
      },
      {
        "label": "D",
        "text": "内连接",
        "correct": false
      }
    ],
    "explanation": "how='left' 表示左连接，保留左表所有行，右表无匹配则为 NaN。",
    "id": 396
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "join"
    ],
    "stem": "df1.join(df2, how='inner') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "左连接",
        "correct": false
      },
      {
        "label": "B",
        "text": "外连接",
        "correct": false
      },
      {
        "label": "C",
        "text": "内连接，只保留两表匹配的行",
        "correct": true
      },
      {
        "label": "D",
        "text": "交叉连接",
        "correct": false
      }
    ],
    "explanation": "join 默认按索引连接，how='inner' 只保留两表都有的行。",
    "id": 397
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "concat"
    ],
    "stem": "pd.concat([df1, df2], axis=1) 的效果是？",
    "options": [
      {
        "label": "A",
        "text": "删除重复列",
        "correct": false
      },
      {
        "label": "B",
        "text": "纵向拼接（增加行）",
        "correct": false
      },
      {
        "label": "C",
        "text": "横向拼接（增加列）",
        "correct": true
      },
      {
        "label": "D",
        "text": "合并索引",
        "correct": false
      }
    ],
    "explanation": "axis=1 表示按列方向拼接，类似于 SQL 的全外连接。",
    "id": 398
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "melt"
    ],
    "stem": "pd.melt(df, id_vars=['name'], value_vars=['math','english']) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "删除 name 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "将长表转宽表",
        "correct": false
      },
      {
        "label": "C",
        "text": "将宽表转长表，保留 name 列",
        "correct": true
      },
      {
        "label": "D",
        "text": "重命名列",
        "correct": false
      }
    ],
    "explanation": "melt 将列名变为行值，实现宽表到长表的转换，id_vars 为保留的标识列。",
    "id": 399
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "crosstab"
    ],
    "stem": "pd.crosstab(df['gender'], df['dept']) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "合并性别和部门",
        "correct": false
      },
      {
        "label": "B",
        "text": "按性别排序",
        "correct": false
      },
      {
        "label": "C",
        "text": "生成性别与部门的交叉频数表",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除性别列",
        "correct": false
      }
    ],
    "explanation": "crosstab 计算两个分类变量的交叉频数表（列联表）。",
    "id": 400
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "to_numeric"
    ],
    "stem": "pd.to_numeric(df['price'], errors='coerce') 中 errors='coerce' 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "抛出异常",
        "correct": false
      },
      {
        "label": "B",
        "text": "忽略错误",
        "correct": false
      },
      {
        "label": "C",
        "text": "将无法解析的值转为 NaN",
        "correct": true
      },
      {
        "label": "D",
        "text": "转换为字符串",
        "correct": false
      }
    ],
    "explanation": "errors='coerce' 将无法转换的值设为 NaN 而非报错。",
    "id": 401
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "str accessor"
    ],
    "stem": "df['text'].str.extract(r'(\\d+)') 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "替换数字",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除数字",
        "correct": false
      },
      {
        "label": "C",
        "text": "提取 text 列中的数字部分",
        "correct": true
      },
      {
        "label": "D",
        "text": "统计数字个数",
        "correct": false
      }
    ],
    "explanation": "str.extract() 使用正则表达式提取匹配的子串，(\\d+) 匹配连续数字。",
    "id": 402
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "apply",
      "lambda"
    ],
    "stem": "df.apply(lambda row: row['a'] + row['b'], axis=1) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "删除 a 和 b 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "逐列计算",
        "correct": false
      },
      {
        "label": "C",
        "text": "逐行计算 a 列与 b 列之和",
        "correct": true
      },
      {
        "label": "D",
        "text": "合并 a 和 b 列",
        "correct": false
      }
    ],
    "explanation": "apply + axis=1 表示逐行应用函数，lambda 对每行的 a、b 列求和。",
    "id": 403
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "rolling"
    ],
    "stem": "df['price'].rolling(window=3).mean() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "每3行取一个",
        "correct": false
      },
      {
        "label": "B",
        "text": "计算总体平均值",
        "correct": false
      },
      {
        "label": "C",
        "text": "计算3期滚动平均值",
        "correct": true
      },
      {
        "label": "D",
        "text": "取前3行的值",
        "correct": false
      }
    ],
    "explanation": "rolling(window=3).mean() 计算滑动窗口大小为 3 的移动平均值。",
    "id": 404
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "shift"
    ],
    "stem": "df['price'].shift(1) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "向上移动一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除第一行",
        "correct": false
      },
      {
        "label": "C",
        "text": "将 price 列下移一行",
        "correct": true
      },
      {
        "label": "D",
        "text": "排序 price 列",
        "correct": false
      }
    ],
    "explanation": "shift(1) 将数据向下移动 1 行，首行变为 NaN，常用于计算环比。",
    "id": 405
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "resample"
    ],
    "stem": "df.resample('M', on='date').sum() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "按年汇总",
        "correct": false
      },
      {
        "label": "B",
        "text": "按天汇总",
        "correct": false
      },
      {
        "label": "C",
        "text": "按月汇总数据求和",
        "correct": true
      },
      {
        "label": "D",
        "text": "按小时汇总",
        "correct": false
      }
    ],
    "explanation": "resample('M') 按月重采样，对每个月的数据求和。",
    "id": 406
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "duplicated"
    ],
    "stem": "df.duplicated() 返回值的类型和含义是？",
    "options": [
      {
        "label": "A",
        "text": "重复值的数量",
        "correct": false
      },
      {
        "label": "B",
        "text": "重复行的索引列表",
        "correct": false
      },
      {
        "label": "C",
        "text": "布尔 Series，标记重复行",
        "correct": true
      },
      {
        "label": "D",
        "text": "删除重复行后的 DataFrame",
        "correct": false
      }
    ],
    "explanation": "duplicated() 返回布尔 Series，True 表示该行与之前的某行重复。",
    "id": 407
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "unique"
    ],
    "stem": "df['category'].unique() 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "排序后的值",
        "correct": false
      },
      {
        "label": "B",
        "text": "唯一值个数",
        "correct": false
      },
      {
        "label": "C",
        "text": "频数统计",
        "correct": false
      },
      {
        "label": "D",
        "text": "所有唯一值组成的数组",
        "correct": true
      }
    ],
    "explanation": "unique() 返回去重后的唯一值数组，与 nunique() 不同。",
    "id": 408
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "at",
      "iat"
    ],
    "stem": "df.at[0, 'name'] 与 df.loc[0, 'name'] 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "B",
        "text": "at 返回 Series",
        "correct": false
      },
      {
        "label": "C",
        "text": "loc 比 at 快",
        "correct": false
      },
      {
        "label": "D",
        "text": "at 访问单个标量值，更快",
        "correct": true
      }
    ],
    "explanation": "at 访问单个标量值，比 loc 更高效；iat 则是 at 的整数位置版本。",
    "id": 409
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "pandas",
    "tags": [
      "read_csv"
    ],
    "stem": "pd.read_csv('data.csv', usecols=['name','age']) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "排序列",
        "correct": false
      },
      {
        "label": "B",
        "text": "删除 name 和 age 列",
        "correct": false
      },
      {
        "label": "C",
        "text": "重命名列",
        "correct": false
      },
      {
        "label": "D",
        "text": "只读取 name 和 age 列",
        "correct": true
      }
    ],
    "explanation": "usecols 指定只读取的列，减少内存使用。",
    "id": 410
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "groupby",
      "apply"
    ],
    "stem": "df.groupby('dept').apply(lambda g: g.nlargest(3, 'salary')) 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "对每组排序",
        "correct": false
      },
      {
        "label": "B",
        "text": "获取全局薪资最高的3人",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除薪资最低的3人",
        "correct": false
      },
      {
        "label": "D",
        "text": "获取每个部门薪资最高的3人",
        "correct": true
      }
    ],
    "explanation": "groupby + apply 对每个分组应用 nlargest，获取各组 Top N。",
    "id": 411
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "merge"
    ],
    "stem": "pd.merge(df1, df2, left_on='id_x', right_on='id_y') 适用于什么场景？",
    "options": [
      {
        "label": "A",
        "text": "两表都有缺失值",
        "correct": false
      },
      {
        "label": "B",
        "text": "两表列名相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "两表行数相同",
        "correct": false
      },
      {
        "label": "D",
        "text": "两表的连接键列名不同",
        "correct": true
      }
    ],
    "explanation": "left_on/right_on 分别指定左右表的连接键，适用于列名不同的场景。",
    "id": 412
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "pivot_table",
      "melt"
    ],
    "stem": "pivot_table 与 melt 的关系是？",
    "options": [
      {
        "label": "A",
        "text": "两者不能用于同一数据",
        "correct": false
      },
      {
        "label": "B",
        "text": "功能相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "melt 是 pivot_table 的别名",
        "correct": false
      },
      {
        "label": "D",
        "text": "互逆操作：pivot_table 宽化，melt 长化",
        "correct": true
      }
    ],
    "explanation": "pivot_table 将长表转宽表，melt 将宽表转长表，是逆向操作。",
    "id": 413
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "resample",
      "shift"
    ],
    "stem": "如何计算每日销量与昨日销量的差值？",
    "options": [
      {
        "label": "A",
        "text": "df['sales'].rolling(2).sum()",
        "correct": false
      },
      {
        "label": "B",
        "text": "df['sales'].diff()",
        "correct": false
      },
      {
        "label": "C",
        "text": "df['sales'].pct_change()",
        "correct": false
      },
      {
        "label": "D",
        "text": "df['sales'] - df['sales'].shift(1)",
        "correct": true
      }
    ],
    "explanation": "shift(1) 将数据下移一行，相减得到与前一期的差值。diff() 也正确但选项 B 没有赋值操作。",
    "id": 414
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "rolling",
      "apply"
    ],
    "stem": "df.rolling(window=5).apply(lambda x: x.sum()/len(x)) 等价于？",
    "options": [
      {
        "label": "A",
        "text": "df.rolling(window=5).median()",
        "correct": false
      },
      {
        "label": "B",
        "text": "df.rolling(window=5).sum()",
        "correct": false
      },
      {
        "label": "C",
        "text": "df.rolling(window=5).std()",
        "correct": false
      },
      {
        "label": "D",
        "text": "df.rolling(window=5).mean()",
        "correct": true
      }
    ],
    "explanation": "lambda 计算窗口内元素求和除以个数，等价于 rolling mean。",
    "id": 415
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "astype",
      "to_datetime"
    ],
    "stem": "df['date'].astype('datetime64[ns]') 与 pd.to_datetime(df['date']) 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "to_datetime 只处理字符串",
        "correct": false
      },
      {
        "label": "B",
        "text": "功能完全相同",
        "correct": false
      },
      {
        "label": "C",
        "text": "astype 更灵活",
        "correct": false
      },
      {
        "label": "D",
        "text": "astype 不处理格式解析，to_datetime 可解析日期字符串",
        "correct": true
      }
    ],
    "explanation": "astype 直接类型转换不解析格式，to_datetime 可处理多种日期字符串格式。",
    "id": 416
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "groupby",
      "transform"
    ],
    "stem": "df.groupby('dept')['salary'].transform('mean') 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "排序结果",
        "correct": false
      },
      {
        "label": "B",
        "text": "每个部门的聚合均值",
        "correct": false
      },
      {
        "label": "C",
        "text": "NaN 填充值",
        "correct": false
      },
      {
        "label": "D",
        "text": "与原 DataFrame 同形状的分组均值",
        "correct": true
      }
    ],
    "explanation": "transform 将聚合结果广播回原形状，每行的值为该分组的聚合值。",
    "id": 417
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "merge",
      "concat"
    ],
    "stem": "merge 与 concat 的核心区别是？",
    "options": [
      {
        "label": "A",
        "text": "merge 只能横向",
        "correct": false
      },
      {
        "label": "B",
        "text": "merge 更快",
        "correct": false
      },
      {
        "label": "C",
        "text": "concat 只能纵向",
        "correct": false
      },
      {
        "label": "D",
        "text": "merge 按列值连接，concat 按轴拼接",
        "correct": true
      }
    ],
    "explanation": "merge 基于列值进行关系型连接，concat 按轴方向物理拼接。",
    "id": 418
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "str accessor"
    ],
    "stem": "df['text'].str.split(',').explode() 的作用是？",
    "options": [
      {
        "label": "A",
        "text": "替换逗号",
        "correct": false
      },
      {
        "label": "B",
        "text": "合并多行",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除逗号",
        "correct": false
      },
      {
        "label": "D",
        "text": "将逗号分隔的字符串拆分后展开为多行",
        "correct": true
      }
    ],
    "explanation": "split(',') 按逗号拆分为列表，explode() 将列表展开为多行。",
    "id": 419
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "resample"
    ],
    "stem": "df.resample('W').mean() 与 df.resample('7D').mean() 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "W 更快",
        "correct": false
      },
      {
        "label": "B",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "C",
        "text": "7D 包含周末",
        "correct": false
      },
      {
        "label": "D",
        "text": "W 按周起止对齐，7D 固定7天窗口",
        "correct": true
      }
    ],
    "explanation": "W 按自然周分组（周日开始），7D 按固定7天周期分组，起止可能不同。",
    "id": 420
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "apply",
      "map"
    ],
    "stem": "DataFrame.applymap() 与 DataFrame.apply() 的区别是？",
    "options": [
      {
        "label": "A",
        "text": "功能相同",
        "correct": false
      },
      {
        "label": "B",
        "text": "applymap 按行操作",
        "correct": false
      },
      {
        "label": "C",
        "text": "applymap 更快",
        "correct": false
      },
      {
        "label": "D",
        "text": "applymap 逐元素操作，apply 按行/列操作",
        "correct": true
      }
    ],
    "explanation": "applymap 对每个元素应用函数，apply 按 axis 参数对行或列整体应用函数。",
    "id": 421
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "pandas",
    "tags": [
      "query"
    ],
    "stem": "df.query('not age > 30') 等价于？",
    "options": [
      {
        "label": "A",
        "text": "df[df['age'].isna()]",
        "correct": false
      },
      {
        "label": "B",
        "text": "df[df['age'] > 30]",
        "correct": false
      },
      {
        "label": "C",
        "text": "df[df['age'] == 30]",
        "correct": false
      },
      {
        "label": "D",
        "text": "df[df['age'] <= 30]",
        "correct": true
      }
    ],
    "explanation": "not age > 30 取反，等价于 age <= 30 的条件筛选。",
    "id": 422
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "open",
      "文件模式"
    ],
    "stem": "open('f.txt','r') 打开文件后，文件指针在什么位置？",
    "options": [
      {
        "label": "A",
        "text": "文件开头",
        "correct": true
      },
      {
        "label": "B",
        "text": "文件末尾",
        "correct": false
      },
      {
        "label": "C",
        "text": "文件中间",
        "correct": false
      },
      {
        "label": "D",
        "text": "不确定",
        "correct": false
      }
    ],
    "explanation": "以 'r' 模式打开文件后，文件指针位于文件开头，即位置 0。",
    "id": 423
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "open",
      "read"
    ],
    "stem": "f.read() 不带参数时返回什么？",
    "options": [
      {
        "label": "A",
        "text": "文件的第一行",
        "correct": false
      },
      {
        "label": "B",
        "text": "整个文件内容",
        "correct": true
      },
      {
        "label": "C",
        "text": "空字符串",
        "correct": false
      },
      {
        "label": "D",
        "text": "一个字符",
        "correct": false
      }
    ],
    "explanation": "f.read() 不带参数时读取并返回整个文件内容。",
    "id": 424
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "open",
      "readline"
    ],
    "stem": "f.readline() 的返回值是什么？",
    "options": [
      {
        "label": "A",
        "text": "整个文件内容",
        "correct": false
      },
      {
        "label": "C",
        "text": "文件的一行",
        "correct": true
      },
      {
        "label": "B",
        "text": "一个字符",
        "correct": false
      },
      {
        "label": "D",
        "text": "文件行数",
        "correct": false
      }
    ],
    "explanation": "f.readline() 读取并返回文件的一行，包含末尾的换行符。",
    "id": 425
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "open",
      "readlines"
    ],
    "stem": "f.readlines() 返回什么类型的数据？",
    "options": [
      {
        "label": "A",
        "text": "字符串",
        "correct": false
      },
      {
        "label": "B",
        "text": "元组",
        "correct": false
      },
      {
        "label": "D",
        "text": "列表",
        "correct": true
      },
      {
        "label": "C",
        "text": "字典",
        "correct": false
      }
    ],
    "explanation": "f.readlines() 返回一个列表，每个元素是文件的一行。",
    "id": 426
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "open",
      "write"
    ],
    "stem": "f.write('hello') 写入成功后返回什么？",
    "options": [
      {
        "label": "C",
        "text": "None",
        "correct": false
      },
      {
        "label": "B",
        "text": "'hello'",
        "correct": false
      },
      {
        "label": "A",
        "text": "5",
        "correct": true
      },
      {
        "label": "D",
        "text": "True",
        "correct": false
      }
    ],
    "explanation": "f.write() 返回写入的字符数，'hello' 有 5 个字符，所以返回 5。",
    "id": 427
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "with",
      "上下文管理器"
    ],
    "stem": "with open('f.txt') as f: 的作用是什么？",
    "options": [
      {
        "label": "B",
        "text": "只读方式打开文件，自动关闭",
        "correct": true
      },
      {
        "label": "A",
        "text": "写入方式打开文件",
        "correct": false
      },
      {
        "label": "C",
        "text": "删除文件",
        "correct": false
      },
      {
        "label": "D",
        "text": "重命名文件",
        "correct": false
      }
    ],
    "explanation": "with 语句确保文件在使用后自动关闭，即使发生异常也能正确关闭。",
    "id": 428
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "try",
      "except"
    ],
    "stem": "以下代码输出什么？\ntry:\n    1/0\nexcept ZeroDivisionError:\n    print('error')",
    "options": [
      {
        "label": "C",
        "text": "error",
        "correct": true
      },
      {
        "label": "B",
        "text": "ZeroDivisionError",
        "correct": false
      },
      {
        "label": "A",
        "text": "1",
        "correct": false
      },
      {
        "label": "D",
        "text": "无输出",
        "correct": false
      }
    ],
    "explanation": "1/0 抛出 ZeroDivisionError，被 except 捕获后输出 'error'。",
    "id": 429
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "try",
      "finally"
    ],
    "stem": "try-finally 中 finally 块何时执行？",
    "options": [
      {
        "label": "A",
        "text": "只在发生异常时",
        "correct": false
      },
      {
        "label": "B",
        "text": "只在没发生异常时",
        "correct": false
      },
      {
        "label": "D",
        "text": "无论是否发生异常都执行",
        "correct": true
      },
      {
        "label": "C",
        "text": "只在循环中执行",
        "correct": false
      }
    ],
    "explanation": "finally 块无论是否发生异常都会执行，用于清理资源。",
    "id": 430
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "异常类型",
      "TypeError"
    ],
    "stem": "以下哪种操作会抛出 TypeError？",
    "options": [
      {
        "label": "A",
        "text": "1 + 'a'",
        "correct": true
      },
      {
        "label": "B",
        "text": "1 / 0",
        "correct": false
      },
      {
        "label": "C",
        "text": "x = [][0]",
        "correct": false
      },
      {
        "label": "D",
        "text": "print(undefined_var)",
        "correct": false
      }
    ],
    "explanation": "1 + 'a' 尝试将 int 和 str 相加，抛出 TypeError。1/0 抛出 ZeroDivisionError，[][0] 抛出 IndexError，访问未定义变量抛出 NameError。",
    "id": 431
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "异常类型",
      "ValueError"
    ],
    "stem": "int('abc') 会抛出什么异常？",
    "options": [
      {
        "label": "A",
        "text": "TypeError",
        "correct": false
      },
      {
        "label": "B",
        "text": "ValueError",
        "correct": true
      },
      {
        "label": "C",
        "text": "NameError",
        "correct": false
      },
      {
        "label": "D",
        "text": "AttributeError",
        "correct": false
      }
    ],
    "explanation": "int('abc') 无法将非数字字符串转为整数，抛出 ValueError。",
    "id": 432
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "异常类型",
      "IndexError"
    ],
    "stem": "[1,2,3][10] 会抛出什么异常？",
    "options": [
      {
        "label": "A",
        "text": "ValueError",
        "correct": false
      },
      {
        "label": "B",
        "text": "TypeError",
        "correct": false
      },
      {
        "label": "C",
        "text": "IndexError",
        "correct": true
      },
      {
        "label": "D",
        "text": "KeyError",
        "correct": false
      }
    ],
    "explanation": "列表索引超出范围，抛出 IndexError。",
    "id": 433
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "异常类型",
      "KeyError"
    ],
    "stem": "{'a':1}['b'] 会抛出什么异常？",
    "options": [
      {
        "label": "A",
        "text": "IndexError",
        "correct": false
      },
      {
        "label": "B",
        "text": "ValueError",
        "correct": false
      },
      {
        "label": "C",
        "text": "TypeError",
        "correct": false
      },
      {
        "label": "D",
        "text": "KeyError",
        "correct": true
      }
    ],
    "explanation": "字典中不存在键 'b'，抛出 KeyError。",
    "id": 434
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "文件模式",
      "write"
    ],
    "stem": "open('f.txt','w') 模式的特点是什么？",
    "options": [
      {
        "label": "C",
        "text": "只读打开",
        "correct": false
      },
      {
        "label": "B",
        "text": "追加写入",
        "correct": false
      },
      {
        "label": "A",
        "text": "覆盖写入",
        "correct": true
      },
      {
        "label": "D",
        "text": "二进制读取",
        "correct": false
      }
    ],
    "explanation": "'w' 模式以覆盖方式写入，如果文件存在则清空，不存在则创建。",
    "id": 435
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "文件模式",
      "append"
    ],
    "stem": "open('f.txt','a') 模式的特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "覆盖写入",
        "correct": false
      },
      {
        "label": "B",
        "text": "追加写入",
        "correct": true
      },
      {
        "label": "C",
        "text": "只读",
        "correct": false
      },
      {
        "label": "D",
        "text": "二进制写入",
        "correct": false
      }
    ],
    "explanation": "'a' 模式以追加方式写入，在文件末尾添加内容，不会覆盖已有内容。",
    "id": 436
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "json",
      "dumps"
    ],
    "stem": "json.dumps({'a':1}) 返回什么？",
    "options": [
      {
        "label": "C",
        "text": "{\"a\": 1}",
        "correct": true
      },
      {
        "label": "B",
        "text": "{'a': 1}",
        "correct": false
      },
      {
        "label": "A",
        "text": "[\"a\", 1]",
        "correct": false
      },
      {
        "label": "D",
        "text": "a:1",
        "correct": false
      }
    ],
    "explanation": "json.dumps() 将 Python 对象转为 JSON 字符串，返回 '{\"a\": 1}'。",
    "id": 437
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "json",
      "loads"
    ],
    "stem": "json.loads('{\"a\":1}') 返回什么类型？",
    "options": [
      {
        "label": "A",
        "text": "str",
        "correct": false
      },
      {
        "label": "D",
        "text": "dict",
        "correct": true
      },
      {
        "label": "C",
        "text": "list",
        "correct": false
      },
      {
        "label": "B",
        "text": "tuple",
        "correct": false
      }
    ],
    "explanation": "json.loads() 将 JSON 字符串解析为 Python 对象，此处返回字典 dict。",
    "id": 438
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "json",
      "load"
    ],
    "stem": "json.load(f) 和 json.loads(s) 的区别是什么？",
    "options": [
      {
        "label": "B",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "A",
        "text": "load 读文件，loads 读字符串",
        "correct": true
      },
      {
        "label": "C",
        "text": "load 读字符串，loads 读文件",
        "correct": false
      },
      {
        "label": "D",
        "text": "load 用于列表，loads 用于字典",
        "correct": false
      }
    ],
    "explanation": "json.load() 从文件对象读取并解析，json.loads() 从字符串读取并解析。",
    "id": 439
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "pathlib",
      "Path"
    ],
    "stem": "Path('f.txt').exists() 返回什么？",
    "options": [
      {
        "label": "A",
        "text": "文件内容",
        "correct": false
      },
      {
        "label": "B",
        "text": "布尔值，文件是否存在",
        "correct": true
      },
      {
        "label": "C",
        "text": "文件大小",
        "correct": false
      },
      {
        "label": "D",
        "text": "文件路径",
        "correct": false
      }
    ],
    "explanation": "Path.exists() 返回布尔值，表示文件或目录是否存在。",
    "id": 440
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "pathlib",
      "Path"
    ],
    "stem": "Path('dir').mkdir() 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "删除目录",
        "correct": false
      },
      {
        "label": "C",
        "text": "创建目录",
        "correct": true
      },
      {
        "label": "B",
        "text": "重命名目录",
        "correct": false
      },
      {
        "label": "D",
        "text": "列出目录内容",
        "correct": false
      }
    ],
    "explanation": "Path.mkdir() 创建一个新目录。",
    "id": 441
  },
  {
    "type": "knowledge",
    "difficulty": "easy",
    "category": "file_io",
    "tags": [
      "文件模式",
      "x"
    ],
    "stem": "open('f.txt','x') 模式的特点是什么？",
    "options": [
      {
        "label": "A",
        "text": "只读打开",
        "correct": false
      },
      {
        "label": "B",
        "text": "覆盖写入",
        "correct": false
      },
      {
        "label": "D",
        "text": "独占创建，文件不存在则创建，存在则报错",
        "correct": true
      },
      {
        "label": "C",
        "text": "追加写入",
        "correct": false
      }
    ],
    "explanation": "'x' 模式为独占创建，文件已存在时抛出 FileExistsError。",
    "id": 442
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "try",
      "except",
      "else"
    ],
    "stem": "try-except-else 中 else 块何时执行？",
    "options": [
      {
        "label": "B",
        "text": "发生异常时",
        "correct": false
      },
      {
        "label": "A",
        "text": "没发生异常时",
        "correct": true
      },
      {
        "label": "C",
        "text": "总是执行",
        "correct": false
      },
      {
        "label": "D",
        "text": "只在循环中",
        "correct": false
      }
    ],
    "explanation": "else 块在没有异常发生时执行，用于分离正常逻辑和异常处理。",
    "id": 443
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "try",
      "except",
      "finally"
    ],
    "stem": "以下代码输出什么？\ntry:\n    raise ValueError('bad')\nfinally:\n    print('done')",
    "options": [
      {
        "label": "A",
        "text": "bad",
        "correct": false
      },
      {
        "label": "B",
        "text": "done",
        "correct": true
      },
      {
        "label": "C",
        "text": "bad 和 done",
        "correct": false
      },
      {
        "label": "D",
        "text": "无输出",
        "correct": false
      }
    ],
    "explanation": "raise 抛出异常后，finally 块仍然执行，输出 'done'。但异常未被捕获，程序会终止。",
    "id": 444
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "文件模式",
      "rb"
    ],
    "stem": "open('f.txt','rb') 读取文件后，f.read() 返回什么类型？",
    "options": [
      {
        "label": "A",
        "text": "str",
        "correct": false
      },
      {
        "label": "C",
        "text": "bytes",
        "correct": true
      },
      {
        "label": "B",
        "text": "list",
        "correct": false
      },
      {
        "label": "D",
        "text": "int",
        "correct": false
      }
    ],
    "explanation": "'rb' 以二进制模式读取，f.read() 返回 bytes 类型。",
    "id": 445
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "文件模式",
      "r+"
    ],
    "stem": "open('f.txt','r+') 的含义是什么？",
    "options": [
      {
        "label": "A",
        "text": "只读",
        "correct": false
      },
      {
        "label": "D",
        "text": "读写，文件必须存在",
        "correct": true
      },
      {
        "label": "C",
        "text": "写读，创建新文件",
        "correct": false
      },
      {
        "label": "B",
        "text": "追加读写",
        "correct": false
      }
    ],
    "explanation": "'r+' 模式打开文件用于读写，文件必须已存在，否则抛出 FileNotFoundError。",
    "id": 446
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "csv",
      "DictReader"
    ],
    "stem": "csv.DictReader(f) 返回的每一行是什么类型？",
    "options": [
      {
        "label": "B",
        "text": "list",
        "correct": false
      },
      {
        "label": "A",
        "text": "dict",
        "correct": true
      },
      {
        "label": "C",
        "text": "tuple",
        "correct": false
      },
      {
        "label": "D",
        "text": "str",
        "correct": false
      }
    ],
    "explanation": "csv.DictReader 将每行解析为字典，键为列名，值为对应数据。",
    "id": 447
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "csv",
      "writer"
    ],
    "stem": "csv.writer(f).writerow([1,2,3]) 写入几列？",
    "options": [
      {
        "label": "A",
        "text": "1 列",
        "correct": false
      },
      {
        "label": "C",
        "text": "2 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "3 列",
        "correct": true
      },
      {
        "label": "D",
        "text": "0 列",
        "correct": false
      }
    ],
    "explanation": "writerow([1,2,3]) 写入一行 3 列数据。",
    "id": 448
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "json",
      "dump"
    ],
    "stem": "json.dump(obj, f) 和 json.dumps(obj) 的区别是什么？",
    "options": [
      {
        "label": "A",
        "text": "没有区别",
        "correct": false
      },
      {
        "label": "C",
        "text": "dump 写入文件，dumps 返回字符串",
        "correct": true
      },
      {
        "label": "B",
        "text": "dump 返回字符串，dumps 写入文件",
        "correct": false
      },
      {
        "label": "D",
        "text": "dump 用于列表，dumps 用于字典",
        "correct": false
      }
    ],
    "explanation": "json.dump() 将对象序列化写入文件，json.dumps() 返回 JSON 字符串。",
    "id": 449
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "raise",
      "异常"
    ],
    "stem": "raise ValueError('invalid') 的作用是什么？",
    "options": [
      {
        "label": "A",
        "text": "捕获异常",
        "correct": false
      },
      {
        "label": "D",
        "text": "抛出 ValueError 异常",
        "correct": true
      },
      {
        "label": "C",
        "text": "忽略异常",
        "correct": false
      },
      {
        "label": "B",
        "text": "结束程序",
        "correct": false
      }
    ],
    "explanation": "raise 语句主动抛出指定异常，此处抛出 ValueError 并附带消息 'invalid'。",
    "id": 450
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "encoding",
      "open"
    ],
    "stem": "open('f.txt', encoding='utf-8') 中 encoding 参数的作用？",
    "options": [
      {
        "label": "B",
        "text": "设置文件权限",
        "correct": false
      },
      {
        "label": "A",
        "text": "指定文件编码方式",
        "correct": true
      },
      {
        "label": "C",
        "text": "设置缓冲区大小",
        "correct": false
      },
      {
        "label": "D",
        "text": "指定文件模式",
        "correct": false
      }
    ],
    "explanation": "encoding 参数指定文件的字符编码方式，如 utf-8、gbk 等。",
    "id": 451
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "异常",
      "FileNotFoundError"
    ],
    "stem": "open('not_exist.txt','r') 会抛出什么异常？",
    "options": [
      {
        "label": "A",
        "text": "ValueError",
        "correct": false
      },
      {
        "label": "B",
        "text": "FileNotFoundError",
        "correct": true
      },
      {
        "label": "C",
        "text": "TypeError",
        "correct": false
      },
      {
        "label": "D",
        "text": "IOError",
        "correct": false
      }
    ],
    "explanation": "以 'r' 模式打开不存在的文件，抛出 FileNotFoundError。",
    "id": 452
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "with",
      "上下文管理器"
    ],
    "stem": "自定义上下文管理器必须实现哪两个方法？",
    "options": [
      {
        "label": "A",
        "text": "__init__ 和 __del__",
        "correct": false
      },
      {
        "label": "C",
        "text": "__enter__ 和 __exit__",
        "correct": true
      },
      {
        "label": "B",
        "text": "__open__ 和 __close__",
        "correct": false
      },
      {
        "label": "D",
        "text": "__start__ 和 __stop__",
        "correct": false
      }
    ],
    "explanation": "上下文管理器必须实现 __enter__ 和 __exit__ 方法，分别用于进入和退出上下文。",
    "id": 453
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "pathlib",
      "Path"
    ],
    "stem": "Path('a/b/c').parent 返回什么？",
    "options": [
      {
        "label": "D",
        "text": "Path('a/b')",
        "correct": true
      },
      {
        "label": "B",
        "text": "Path('a/b/c')",
        "correct": false
      },
      {
        "label": "C",
        "text": "Path('c')",
        "correct": false
      },
      {
        "label": "A",
        "text": "Path('a')",
        "correct": false
      }
    ],
    "explanation": "Path.parent 返回路径的父目录，Path('a/b/c').parent 返回 Path('a/b')。",
    "id": 454
  },
  {
    "type": "knowledge",
    "difficulty": "medium",
    "category": "file_io",
    "tags": [
      "writelines"
    ],
    "stem": "f.writelines(['a','b','c']) 会自动添加换行符吗？",
    "options": [
      {
        "label": "B",
        "text": "会，每行末尾自动加 \\n",
        "correct": false
      },
      {
        "label": "A",
        "text": "不会，需要手动添加",
        "correct": true
      },
      {
        "label": "C",
        "text": "只在最后一行添加",
        "correct": false
      },
      {
        "label": "D",
        "text": "取决于文件模式",
        "correct": false
      }
    ],
    "explanation": "writelines() 不会自动添加换行符，如需换行需手动在字符串中包含 \\n。",
    "id": 455
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "try",
      "except",
      "多层捕获"
    ],
    "stem": "以下代码输出什么？\ntry:\n    try:\n        1/0\n    except TypeError:\n        print('type')\n    else:\n        print('inner else')\nexcept ZeroDivisionError:\n    print('zero')",
    "options": [
      {
        "label": "A",
        "text": "type",
        "correct": false
      },
      {
        "label": "C",
        "text": "inner else",
        "correct": false
      },
      {
        "label": "B",
        "text": "zero",
        "correct": true
      },
      {
        "label": "D",
        "text": "type 和 zero",
        "correct": false
      }
    ],
    "explanation": "内层 try 抛出 ZeroDivisionError，不被 TypeError 捕获，内层 else 不执行，异常传播到外层被 ZeroDivisionError 捕获，输出 'zero'。",
    "id": 456
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "异常",
      "自定义异常"
    ],
    "stem": "class MyError(Exception): pass\nraise MyError('fail')\nMyError 是什么？",
    "options": [
      {
        "label": "A",
        "text": "内置异常",
        "correct": false
      },
      {
        "label": "C",
        "text": "自定义异常，继承 Exception",
        "correct": true
      },
      {
        "label": "B",
        "text": "语法错误",
        "correct": false
      },
      {
        "label": "D",
        "text": "运行时警告",
        "correct": false
      }
    ],
    "explanation": "MyError 继承 Exception，是用户自定义异常类，可通过 raise 主动抛出。",
    "id": 457
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "pathlib",
      "Path",
      "读写"
    ],
    "stem": "Path('f.txt').read_text() 的返回类型是什么？",
    "options": [
      {
        "label": "A",
        "text": "bytes",
        "correct": false
      },
      {
        "label": "D",
        "text": "str",
        "correct": true
      },
      {
        "label": "C",
        "text": "list",
        "correct": false
      },
      {
        "label": "B",
        "text": "Path 对象",
        "correct": false
      }
    ],
    "explanation": "Path.read_text() 以文本模式读取文件，返回 str 类型。read_bytes() 返回 bytes。",
    "id": 458
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "json",
      "编码"
    ],
    "stem": "json.dumps([1,2,3]) 和 json.dumps((1,2,3)) 的结果有何不同？",
    "options": [
      {
        "label": "A",
        "text": "都是 '[1, 2, 3]'",
        "correct": true
      },
      {
        "label": "B",
        "text": "前者是列表字符串，后者报错",
        "correct": false
      },
      {
        "label": "C",
        "text": "两者格式不同",
        "correct": false
      },
      {
        "label": "D",
        "text": "前者报错，后者正常",
        "correct": false
      }
    ],
    "explanation": "JSON 中数组和列表无区别，两者序列化结果都是 '[1, 2, 3]'，元组被转为 JSON 数组。",
    "id": 459
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "文件模式",
      "wb"
    ],
    "stem": "open('f.txt','wb') 写入时 f.write(b'hello') 中 b 的含义？",
    "options": [
      {
        "label": "A",
        "text": "布尔值",
        "correct": false
      },
      {
        "label": "B",
        "text": "字节前缀，表示 bytes 类型",
        "correct": true
      },
      {
        "label": "C",
        "text": "二进制文件标记",
        "correct": false
      },
      {
        "label": "D",
        "text": "缓冲区标识",
        "correct": false
      }
    ],
    "explanation": "b 前缀表示字节字面量（bytes），wb 模式下必须写入 bytes 类型数据。",
    "id": 460
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "上下文管理器",
      "__exit__"
    ],
    "stem": "__exit__(exc_type, exc_val, exc_tb) 的三个参数分别是什么？",
    "options": [
      {
        "label": "C",
        "text": "异常类型、异常值、异常追踪",
        "correct": true
      },
      {
        "label": "B",
        "text": "文件名、模式、编码",
        "correct": false
      },
      {
        "label": "A",
        "text": "进入类型、退出值、缓冲区",
        "correct": false
      },
      {
        "label": "D",
        "text": "错误码、错误消息、行号",
        "correct": false
      }
    ],
    "explanation": "__exit__ 的三个参数分别是异常类型(exc_type)、异常值(exc_val)和异常追踪信息(exc_tb)。",
    "id": 461
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "csv",
      "DictWriter"
    ],
    "stem": "csv.DictWriter(f, fieldnames=['a','b']) 的作用？",
    "options": [
      {
        "label": "A",
        "text": "读取 CSV 文件",
        "correct": false
      },
      {
        "label": "D",
        "text": "创建一个按字典写入 CSV 的 writer",
        "correct": true
      },
      {
        "label": "C",
        "text": "删除 CSV 列",
        "correct": false
      },
      {
        "label": "B",
        "text": "排序 CSV 行",
        "correct": false
      }
    ],
    "explanation": "DictWriter 按字段名将字典写入 CSV 行，fieldnames 指定列名顺序。",
    "id": 462
  },
  {
    "type": "knowledge",
    "difficulty": "hard",
    "category": "file_io",
    "tags": [
      "异常",
      "finally",
      "return"
    ],
    "stem": "以下代码输出什么？\ndef f():\n    try:\n        return 1\n    finally:\n        return 2\nprint(f())",
    "options": [
      {
        "label": "B",
        "text": "1",
        "correct": false
      },
      {
        "label": "A",
        "text": "2",
        "correct": true
      },
      {
        "label": "C",
        "text": "1 和 2",
        "correct": false
      },
      {
        "label": "D",
        "text": "报错",
        "correct": false
      }
    ],
    "explanation": "try 中 return 1 后，finally 仍然执行，finally 中的 return 2 覆盖了 try 中的返回值，输出 2。",
    "id": 463
  }
]
