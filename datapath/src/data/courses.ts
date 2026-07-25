/**
 * 教程数据索引
 */

export interface Stage {
  id: string
  title: string
  emoji: string
  description: string
  topicCount: number
  mdFile: string
}

export interface Course {
  id: 'sql' | 'python' | 'thinking'
  title: string
  color: string
  stages: Stage[]
}

export const courses: Course[] = [
  {
    id: 'sql',
    title: 'SQL 数据查询',
    color: '#a78bfa',
    stages: [
      { id: '1', title: '基础入门', emoji: '🔍', description: 'SELECT / WHERE / ORDER BY / LIMIT', topicCount: 8, mdFile: '../../sql_learning/01_第一阶段_基础入门.md' },
      { id: '2', title: '聚合与分组', emoji: '📊', description: 'COUNT / SUM / AVG / GROUP BY / HAVING', topicCount: 6, mdFile: '../../sql_learning/02_第二阶段_聚合与分组.md' },
      { id: '3', title: '多表连接', emoji: '🔗', description: 'INNER JOIN / LEFT JOIN / 自连接', topicCount: 7, mdFile: '../../sql_learning/03_第三阶段_多表连接.md' },
      { id: '4', title: '子查询与CTE', emoji: '🎯', description: '子查询、WITH 语法', topicCount: 6, mdFile: '../../sql_learning/04_第四阶段_子查询与CTE.md' },
      { id: '5', title: '窗口函数', emoji: '⭐', description: 'ROW_NUMBER / RANK / LAG / LEAD', topicCount: 5, mdFile: '../../sql_learning/05_第五阶段_窗口函数.md' },
      { id: '6', title: '数据操作与建表', emoji: '🗄️', description: 'INSERT / UPDATE / DELETE / CREATE TABLE', topicCount: 7, mdFile: '../../sql_learning/06_第六阶段_数据操作与建表.md' },
      { id: '7', title: '高级分析技巧', emoji: '🧠', description: 'CASE WHEN / NULL 处理 / 日期函数', topicCount: 5, mdFile: '../../sql_learning/07_第七阶段_高级分析技巧.md' },
      { id: '8', title: '实战项目', emoji: '🏆', description: '综合项目：电商数据分析', topicCount: 4, mdFile: '../../sql_learning/08_第八阶段_实战项目.md' },
    ],
  },
  {
    id: 'python',
    title: 'Python 数据分析',
    color: '#4ecdc4',
    stages: [
      // 第一部分:Python 基础 (module01-05)
      { id: '1', title: '环境搭建', emoji: '🛠️', description: 'Python安装、虚拟环境、Jupyter配置', topicCount: 4, mdFile: '../../python_learning/module01_环境搭建与基础语法.md' },
      { id: '2', title: '基础语法', emoji: '📝', description: '变量、数据类型、运算符、输入输出', topicCount: 5, mdFile: '../../python_learning/module02_基础语法.md' },
      { id: '3', title: '数据容器', emoji: '📦', description: '列表、字典、元组、集合', topicCount: 8, mdFile: '../../python_learning/module03_数据容器.md' },
      { id: '4', title: '流程控制', emoji: '🔄', description: 'if判断、for/while循环、break/continue', topicCount: 6, mdFile: '../../python_learning/module04_流程控制.md' },
      { id: '5', title: '函数基础', emoji: '⚡', description: '函数定义、参数传递、返回值、作用域', topicCount: 7, mdFile: '../../python_learning/module05_函数基础.md' },
      // 第二部分:Python 进阶 (module06-09)
      { id: '6', title: '异常处理', emoji: '🛡️', description: 'try/except、自定义异常、日志记录', topicCount: 5, mdFile: '../../python_learning/module09_异常处理.md' },
      { id: '7', title: '文件操作', emoji: '📄', description: '文件读写、CSV/JSON处理、路径管理', topicCount: 6, mdFile: '../../python_learning/module08_文件操作.md' },
      { id: '8', title: '模块与包', emoji: '📚', description: 'import机制、自定义模块、第三方库', topicCount: 5, mdFile: '../../python_learning/module07_模块与包.md' },
      { id: '9', title: '面向对象编程', emoji: '🧩', description: '类与对象、继承、方法', topicCount: 6, mdFile: '../../python_learning/module06_面向对象编程.md' },
      // 第三部分:数据分析核心库 (module10-14)
      { id: '10', title: 'NumPy 数值计算', emoji: '🔢', description: 'ndarray数组、向量化运算、广播机制', topicCount: 6, mdFile: '../../python_learning/module10_NumPy数值计算.md' },
      { id: '11', title: 'Pandas 数据处理', emoji: '📊', description: 'Series/DataFrame、数据读取、选择过滤、分组聚合', topicCount: 10, mdFile: '../../python_learning/module11_Pandas数据处理.md' },
      { id: '12', title: 'Pandas 进阶', emoji: '🔬', description: '时间序列、透视表、多表合并', topicCount: 6, mdFile: '../../python_learning/module14_Pandas进阶.md' },
      { id: '13', title: 'Matplotlib 可视化', emoji: '📈', description: '折线图、柱状图、散点图、子图布局', topicCount: 6, mdFile: '../../python_learning/module12_Matplotlib可视化.md' },
      { id: '14', title: 'Seaborn 统计图', emoji: '🎨', description: '分布图、热力图、分类图表', topicCount: 5, mdFile: '../../python_learning/module13_Seaborn统计可视化.md' },
      // 第四部分:数据分析实战 (module15-18)
      { id: '15', title: '数据清洗实战', emoji: '🧹', description: '缺失值、重复值、异常值处理', topicCount: 8, mdFile: '../../python_learning/module15_数据清洗实战.md' },
      { id: '16', title: '正则表达式', emoji: '🔍', description: '文本匹配、提取、替换', topicCount: 6, mdFile: '../../python_learning/module18_正则表达式.md' },
      { id: '17', title: 'SQL与Python联动', emoji: '🔗', description: '数据库连接、Pandas读写SQL', topicCount: 6, mdFile: '../../python_learning/module16_SQL与Python联动.md' },
      { id: '18', title: '数据分析案例', emoji: '📊', description: 'RFM分析、留存分析实战', topicCount: 6, mdFile: '../../python_learning/module17_数据分析案例.md' },
    ],
  },
  {
    id: 'thinking',
    title: '数据分析思维模型',
    color: '#f59e0b',
    stages: [
      // 第一章：思维基础
      { id: '1.1', title: '结构化思维',     emoji: '🧩', description: 'MECE / 逻辑树 / 金字塔原理',        topicCount: 4, mdFile: '../../data_tk_learning/1.1 结构化思维.md' },
      { id: '1.2', title: '漏斗思维',       emoji: '🔻', description: '转化漏斗 / 流失分析 / 优化策略',     topicCount: 4, mdFile: '../../data_tk_learning/1.2 漏斗思维.md' },
      { id: '1.3', title: '对比思维',       emoji: '⚖️', description: '同比环比 / 定基对比 / 标准化',       topicCount: 4, mdFile: '../../data_tk_learning/1.3 对比思维.md' },
      { id: '1.4', title: '分类思维',       emoji: '📂', description: '维度拆解 / 交叉分析 / 分群策略',     topicCount: 4, mdFile: '../../data_tk_learning/1.4 分类思维.md' },
      // 第二章：分析模型
      { id: '2.1', title: '描述性分析',     emoji: '📊', description: '现状描述 / 指标计算 / 数据呈现',     topicCount: 4, mdFile: '../../data_tk_learning/2.1 描述性分析模型.md' },
      { id: '2.2', title: '诊断性分析',     emoji: '🔍', description: '原因挖掘 / 5Why / 根因定位',         topicCount: 4, mdFile: '../../data_tk_learning/2.2 诊断性分析模型.md' },
      { id: '2.3', title: '预测性分析',     emoji: '📈', description: '趋势预判 / 回归分析 / 时间序列',       topicCount: 4, mdFile: '../../data_tk_learning/2.3 预测性分析模型.md' },
      { id: '2.4', title: '处方性分析',     emoji: '💊', description: '行动建议 / 决策矩阵 / 优先级',       topicCount: 4, mdFile: '../../data_tk_learning/2.4 处方性分析模型.md' },
      // 第三章：商业分析模型
      { id: '3.1', title: 'RFM模型',       emoji: '👥', description: '用户分层 / 价值分类 / 精准营销',       topicCount: 4, mdFile: '../../data_tk_learning/3.1 RFM模型.md' },
      { id: '3.2', title: 'AARRR模型',     emoji: '📈', description: '增长漏斗 / 获客激活 / 留存变现',      topicCount: 4, mdFile: '../../data_tk_learning/3.2 AARRR模型.md' },
      { id: '3.3', title: '用户生命周期',   emoji: '🔄', description: 'LTV / CAC / 用户阶段运营',           topicCount: 4, mdFile: '../../data_tk_learning/3.3 用户生命周期模型.md' },
      { id: '3.4', title: '留存分析',       emoji: '📌', description: '留存曲线 / 同期群留存 / 流失预警',    topicCount: 4, mdFile: '../../data_tk_learning/3.4 留存分析模型.md' },
      { id: '3.5', title: 'KANO模型',      emoji: '🎯', description: '需求分类 / 用户满意度 / 功能优先级',  topicCount: 4, mdFile: '../../data_tk_learning/3.5 KANO需求分析模型.md' },
      { id: '3.6', title: '波士顿矩阵',     emoji: '📊', description: '业务组合 / 明星金牛 / 资源配置',      topicCount: 4, mdFile: '../../data_tk_learning/3.6 波士顿矩阵.md' },
      { id: '3.7', title: '安索夫矩阵',     emoji: '🧭', description: '增长战略 / 市场渗透 / 多元化',      topicCount: 4, mdFile: '../../data_tk_learning/3.7 安索夫矩阵.md' },
      // 第四章：归因分析
      { id: '4.1', title: '归因类型',       emoji: '🔗', description: '末次归因 / 首次归因 / 多触点',      topicCount: 4, mdFile: '../../data_tk_learning/4.1 归因类型.md' },
      { id: '4.2', title: '归因分析流程',   emoji: '📋', description: '归因步骤 / 数据准备 / 结果应用',     topicCount: 4, mdFile: '../../data_tk_learning/4.2 归因分析流程.md' },
      // 第五章：细分分析
      { id: '5.1', title: '用户画像',       emoji: '👤', description: '标签体系 / 特征刻画 / 画像应用',      topicCount: 4, mdFile: '../../data_tk_learning/5.1 用户画像分析.md' },
      { id: '5.2', title: '同期群分析',     emoji: '📅', description: '同期群追踪 / 留存热力图 / 行为演变',  topicCount: 4, mdFile: '../../data_tk_learning/5.2 同期群分析.md' },
      { id: '5.3', title: '分群对比分析',   emoji: '📊', description: '用户分群 / 对比维度 / 差异洞察',     topicCount: 4, mdFile: '../../data_tk_learning/5.3 分群对比分析.md' },
      // 第六章：数据指标体系
      { id: '6.1', title: '北极星指标',     emoji: '⭐', description: '核心指标 / 指标选择 / 对齐聚焦',      topicCount: 4, mdFile: '../../data_tk_learning/6.1 北极星指标.md' },
      { id: '6.2', title: 'OSM模型',       emoji: '🎯', description: '目标策略指标 / 层级拆解',            topicCount: 4, mdFile: '../../data_tk_learning/6.2 OSM模型.md' },
      { id: '6.3', title: 'KPI体系设计',   emoji: '📐', description: 'KPI原则 / 指标层级 / 常见陷阱',        topicCount: 4, mdFile: '../../data_tk_learning/6.3 KPI体系设计原则.md' },
      // 第七章：实验思维
      { id: '7.1', title: 'A/B测试思维',   emoji: '🧪', description: '统计基础 / 实验流程 / 常见陷阱',      topicCount: 4, mdFile: '../../data_tk_learning/7.1 A-B测试思维.md' },
    ],
  },
]

export function getStage(subject: 'sql' | 'python' | 'thinking', id: string): Stage | undefined {
  const course = courses.find((c) => c.id === subject)
  return course?.stages.find((s) => s.id === id)
}

export function getCourse(subject: 'sql' | 'python' | 'thinking'): Course | undefined {
  return courses.find((c) => c.id === subject)
}
