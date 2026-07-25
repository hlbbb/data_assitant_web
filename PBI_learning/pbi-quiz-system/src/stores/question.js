import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestionStore = defineStore('question', () => {
  // Power BI 题库数据
  const questions = ref([
    {
      id: 1,
      stem: '在 Power BI Desktop 中，以下哪个视图用于创建和编辑报表？',
      difficulty: 'easy',
      category: 'basic',
      tags: ['基础操作', '报表视图'],
      options: [
        { label: 'A', text: '数据视图', correct: false },
        { label: 'B', text: '模型视图', correct: false },
        { label: 'C', text: '报表视图', correct: true },
        { label: 'D', text: 'Power Query 编辑器', correct: false }
      ],
      explanation: '报表视图是 Power BI Desktop 中用于创建和编辑报表的主要视图。数据视图用于查看数据表，模型视图用于管理数据模型关系，Power Query 编辑器用于数据清洗和转换。'
    },
    {
      id: 2,
      stem: 'DAX 函数 CALCULATE 的主要作用是什么？',
      difficulty: 'medium',
      category: 'dax',
      tags: ['DAX', '计算函数'],
      options: [
        { label: 'A', text: '创建计算列', correct: false },
        { label: 'B', text: '在特定筛选上下文中计算表达式', correct: true },
        { label: 'C', text: '创建度量值', correct: false },
        { label: 'D', text: '连接多个表', correct: false }
      ],
      explanation: 'CALCULATE 是 DAX 中最重要的函数之一，它可以在修改后的筛选上下文中计算表达式。常用于需要改变筛选条件进行计算的场景，如计算特定时间段、特定类别的汇总值。'
    },
    {
      id: 3,
      stem: '在 Power BI 中，以下哪种关系类型表示一个表的每一行可以与另一个表的多行相关？',
      difficulty: 'easy',
      category: 'datamodel',
      tags: ['数据模型', '关系'],
      options: [
        { label: 'A', text: '一对一（1:1）', correct: false },
        { label: 'B', text: '一对多（1:*）', correct: true },
        { label: 'C', text: '多对多（*:*）', correct: false },
        { label: 'D', text: '无关系', correct: false }
      ],
      explanation: '一对多关系是最常见的关系类型，表示一个表的每一行可以与另一个表的多行相关。例如，一个产品类别可以对应多个产品。'
    },
    {
      id: 4,
      stem: 'Power BI 中用于创建动态标题的 DAX 函数是？',
      difficulty: 'medium',
      category: 'dax',
      tags: ['DAX', '动态标题'],
      options: [
        { label: 'A', text: 'CONCATENATE', correct: false },
        { label: 'B', text: 'SELECTEDVALUE', correct: true },
        { label: 'C', text: 'FILTER', correct: false },
        { label: 'D', text: 'SUM', correct: false }
      ],
      explanation: 'SELECTEDVALUE 函数用于获取当前筛选上下文中的单个值，常用于创建动态标题。当切片器选择某个值时，可以用此函数在标题中显示选中的值。'
    },
    {
      id: 5,
      stem: '以下哪个不是 Power BI 支持的数据源？',
      difficulty: 'easy',
      category: 'dataconnect',
      tags: ['数据源', '连接'],
      options: [
        { label: 'A', text: 'Excel 文件', correct: false },
        { label: 'B', text: 'SQL Server 数据库', correct: false },
        { label: 'C', text: 'Oracle 数据库', correct: false },
        { label: 'D', text: 'Microsoft Access 2003 (.mdb)', correct: true }
      ],
      explanation: 'Power BI 支持多种数据源，包括 Excel、SQL Server、Oracle 等。但 Microsoft Access 2003 格式 (.mdb) 不被直接支持，需要先转换为较新版本格式 (.accdb)。'
    },
    {
      id: 6,
      stem: '在 Power Query 中，以下哪个操作用于将多列合并为一列？',
      difficulty: 'medium',
      category: 'powerquery',
      tags: ['Power Query', '数据转换'],
      options: [
        { label: 'A', text: '透视列', correct: false },
        { label: 'B', text: '逆透视列', correct: false },
        { label: 'C', text: '合并列', correct: true },
        { label: 'D', text: '拆分列', correct: false }
      ],
      explanation: '合并列操作可以将多个列的内容合并到一个新列中，可以指定分隔符。透视列用于将行值转为列，逆透视列用于将列转为行，拆分列用于将一列拆分为多列。'
    },
    {
      id: 7,
      stem: 'Power BI 中的 "钻取" 功能主要用于？',
      difficulty: 'hard',
      category: 'visual',
      tags: ['可视化', '交互'],
      options: [
        { label: 'A', text: '在图表中放大查看细节', correct: false },
        { label: 'B', text: '从一个报表页面导航到另一个页面查看详细信息', correct: true },
        { label: 'C', text: '筛选数据', correct: false },
        { label: 'D', text: '导出数据', correct: false }
      ],
      explanation: '钻取（Drill-through）功能允许用户从一个汇总页面点击某个数据点，然后导航到另一个详细页面查看该数据点的详细信息，实现从宏观到微观的数据分析。'
    },
    {
      id: 8,
      stem: 'DAX 中 FILTER 函数的返回值类型是？',
      difficulty: 'medium',
      category: 'dax',
      tags: ['DAX', '筛选函数'],
      options: [
        { label: 'A', text: '标量值', correct: false },
        { label: 'B', text: '表', correct: true },
        { label: 'C', text: '布尔值', correct: false },
        { label: 'D', text: '日期', correct: false }
      ],
      explanation: 'FILTER 函数返回一个表，包含满足筛选条件的行。它是一个表函数，常用于在 CALCULATE 等函数中作为筛选器参数使用。'
    },
    {
      id: 9,
      stem: '在 Power BI 服务中，工作区的主要作用是？',
      difficulty: 'easy',
      category: 'service',
      tags: ['Power BI Service', '协作'],
      options: [
        { label: 'A', text: '存储个人报表', correct: false },
        { label: 'B', text: '团队协作和内容管理', correct: true },
        { label: 'C', text: '数据清洗', correct: false },
        { label: 'D', text: '创建数据模型', correct: false }
      ],
      explanation: '工作区（Workspace）是 Power BI 服务中用于团队协作的核心功能。团队成员可以在工作区中共享报表、仪表板、数据集，并协同编辑和管理内容。'
    },
    {
      id: 10,
      stem: '以下哪个 DAX 时间智能函数用于计算年初至今的总计？',
      difficulty: 'hard',
      category: 'dax',
      tags: ['DAX', '时间智能'],
      options: [
        { label: 'A', text: 'SAMEPERIODLASTYEAR', correct: false },
        { label: 'B', text: 'TOTALYTD', correct: true },
        { label: 'C', text: 'DATEADD', correct: false },
        { label: 'D', text: 'PARALLELPERIOD', correct: false }
      ],
      explanation: 'TOTALYTD 函数用于计算从年初到当前日期的累计值。SAMEPERIODLASTYEAR 返回去年同期，DATEADD 用于日期偏移，PARALLELPERIOD 返回平行期间的日期。'
    },
    {
      id: 11,
      stem: 'Power BI 中 "增量刷新" 的主要优势是？',
      difficulty: 'medium',
      category: 'datarefresh',
      tags: ['数据刷新', '性能'],
      options: [
        { label: 'A', text: '提高数据质量', correct: false },
        { label: 'B', text: '减少刷新时间和资源消耗', correct: true },
        { label: 'C', text: '增加数据安全性', correct: false },
        { label: 'D', text: '支持更多数据源', correct: false }
      ],
      explanation: '增量刷新只刷新新增或修改的数据，而不是全量刷新。这可以显著减少刷新时间、降低资源消耗，特别适合大数据量的场景。'
    },
    {
      id: 12,
      stem: '在 Power BI 中，以下哪个可视化最适合展示部分与整体的关系？',
      difficulty: 'easy',
      category: 'visual',
      tags: ['可视化', '图表选择'],
      options: [
        { label: 'A', text: '折线图', correct: false },
        { label: 'B', text: '散点图', correct: false },
        { label: 'C', text: '饼图或环形图', correct: true },
        { label: 'D', text: '柱状图', correct: false }
      ],
      explanation: '饼图和环形图最适合展示部分与整体的关系，显示各部分占总体的比例。折线图适合趋势分析，散点图适合相关性分析，柱状图适合比较不同类别的数值。'
    },
    {
      id: 13,
      stem: 'DAX 中 ALL 函数的主要作用是？',
      difficulty: 'medium',
      category: 'dax',
      tags: ['DAX', '筛选函数'],
      options: [
        { label: 'A', text: '返回所有表', correct: false },
        { label: 'B', text: '清除筛选上下文', correct: true },
        { label: 'C', text: '计算所有值', correct: false },
        { label: 'D', text: '连接所有表', correct: false }
      ],
      explanation: 'ALL 函数用于清除指定表或列的筛选上下文，返回所有行。常用于计算占比、排名等需要忽略某些筛选条件的场景，如计算各产品占总销售额的比例。'
    },
    {
      id: 14,
      stem: 'Power BI 中的 "书签" 功能可以保存以下哪些状态？',
      difficulty: 'medium',
      category: 'visual',
      tags: ['可视化', '交互'],
      options: [
        { label: 'A', text: '仅筛选器状态', correct: false },
        { label: 'B', text: '筛选器、视觉对象状态和显示状态', correct: true },
        { label: 'C', text: '仅视觉对象位置', correct: false },
        { label: 'D', text: '仅数据状态', correct: false }
      ],
      explanation: '书签可以保存报表的多种状态，包括筛选器状态、视觉对象的显示/隐藏状态、视觉对象的配置等。这使得用户可以快速切换到预设的报表视图。'
    },
    {
      id: 15,
      stem: '在 Power Query 中，"条件列" 功能的作用是？',
      difficulty: 'easy',
      category: 'powerquery',
      tags: ['Power Query', '数据转换'],
      options: [
        { label: 'A', text: '筛选满足条件的行', correct: false },
        { label: 'B', text: '根据条件创建新列', correct: true },
        { label: 'C', text: '删除满足条件的行', correct: false },
        { label: 'D', text: '排序数据', correct: false }
      ],
      explanation: '条件列功能允许用户根据一个或多个条件创建新列，类似于 Excel 中的 IF 函数。可以根据不同的条件返回不同的值，实现数据的分类和标记。'
    },
    {
      id: 16,
      stem: 'Power BI 行级别安全性（RLS）的主要作用是？',
      difficulty: 'hard',
      category: 'security',
      tags: ['安全', '权限'],
      options: [
        { label: 'A', text: '限制用户可以访问的报表页面', correct: false },
        { label: 'B', text: '限制用户可以查看的数据行', correct: true },
        { label: 'C', text: '限制用户可以使用的视觉对象', correct: false },
        { label: 'D', text: '限制用户可以导出的数据量', correct: false }
      ],
      explanation: '行级别安全性（Row-Level Security）允许管理员根据用户的身份或角色限制其可以查看的数据行。例如，不同地区的销售经理只能看到自己地区的销售数据。'
    },
    {
      id: 17,
      stem: '以下哪个不是 Power BI Desktop 的视图？',
      difficulty: 'easy',
      category: 'basic',
      tags: ['基础操作', '界面'],
      options: [
        { label: 'A', text: '报表视图', correct: false },
        { label: 'B', text: '数据视图', correct: false },
        { label: 'C', text: '模型视图', correct: false },
        { label: 'D', text: '公式视图', correct: true }
      ],
      explanation: 'Power BI Desktop 有三个主要视图：报表视图（创建报表）、数据视图（查看数据表）、模型视图（管理关系）。没有"公式视图"这个视图。'
    },
    {
      id: 18,
      stem: 'DAX 中 RELATED 函数的作用是？',
      difficulty: 'medium',
      category: 'dax',
      tags: ['DAX', '关系函数'],
      options: [
        { label: 'A', text: '创建关系', correct: false },
        { label: 'B', text: '从相关表中获取值', correct: true },
        { label: 'C', text: '删除关系', correct: false },
        { label: 'D', text: '计算相关值', correct: false }
      ],
      explanation: 'RELATED 函数用于从相关表中获取值，沿着多对一关系从"多"端访问"一"端的列值。常用于在计算列中引用相关表的字段。'
    },
    {
      id: 19,
      stem: 'Power BI 中的 "问答"（Q&A）功能支持以下哪种查询方式？',
      difficulty: 'easy',
      category: 'service',
      tags: ['Power BI Service', '自然语言'],
      options: [
        { label: 'A', text: 'SQL 查询', correct: false },
        { label: 'B', text: '自然语言查询', correct: true },
        { label: 'C', text: 'DAX 查询', correct: false },
        { label: 'D', text: 'MDX 查询', correct: false }
      ],
      explanation: '问答功能支持使用自然语言进行查询，用户可以用日常语言提问，如"显示销售额最高的前5个产品"，系统会自动生成相应的可视化。'
    },
    {
      id: 20,
      stem: '在 Power BI 中，以下哪个选项可以创建动态的视觉对象标题？',
      difficulty: 'medium',
      category: 'visual',
      tags: ['可视化', '动态标题'],
      options: [
        { label: 'A', text: '直接在标题中输入文本', correct: false },
        { label: 'B', text: '使用字段值作为标题', correct: true },
        { label: 'C', text: '使用条件格式', correct: false },
        { label: 'D', text: '使用主题设置', correct: false }
      ],
      explanation: '在视觉对象的标题设置中，可以选择"字段值"作为标题来源，这样标题会根据切片器等筛选条件动态变化，实现更灵活的报表展示。'
    }
  ])

  // 用户答题记录
  const records = ref([])

  // 统计数据
  const stats = computed(() => {
    const total = records.value.length
    const correct = records.value.filter(r => r.isCorrect).length
    return {
      total,
      correct,
      wrong: total - correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
    }
  })

  // 按难度统计
  const statsByDifficulty = computed(() => {
    const result = { easy: { total: 0, correct: 0 }, medium: { total: 0, correct: 0 }, hard: { total: 0, correct: 0 } }
    records.value.forEach(r => {
      const q = questions.value.find(q => q.id === r.questionId)
      if (q) {
        result[q.difficulty].total++
        if (r.isCorrect) result[q.difficulty].correct++
      }
    })
    return result
  })

  // 按分类统计
  const statsByCategory = computed(() => {
    const result = {}
    records.value.forEach(r => {
      const q = questions.value.find(q => q.id === r.questionId)
      if (q) {
        if (!result[q.category]) result[q.category] = { total: 0, correct: 0 }
        result[q.category].total++
        if (r.isCorrect) result[q.category].correct++
      }
    })
    return result
  })

  // 获取题目列表
  const getQuestionList = (filters = {}) => {
    let list = [...questions.value]

    if (filters.difficulty) {
      list = list.filter(q => q.difficulty === filters.difficulty)
    }

    if (filters.category) {
      list = list.filter(q => q.category === filters.category)
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      list = list.filter(q =>
        q.stem.toLowerCase().includes(keyword) ||
        q.tags.some(t => t.toLowerCase().includes(keyword))
      )
    }

    return list
  }

  // 获取题目详情
  const getQuestionById = (id) => {
    return questions.value.find(q => q.id === parseInt(id))
  }

  // 提交答案
  const submitAnswer = (questionId, chosenOption, isCorrect) => {
    const record = {
      id: Date.now(),
      questionId,
      chosenOption,
      isCorrect,
      timestamp: new Date().toISOString()
    }
    records.value.push(record)

    // 保存到 localStorage
    localStorage.setItem('pbi-quiz-records', JSON.stringify(records.value))

    return record
  }

  // 加载历史记录
  const loadRecords = () => {
    const saved = localStorage.getItem('pbi-quiz-records')
    if (saved) {
      records.value = JSON.parse(saved)
    }
  }

  // 清空记录
  const clearRecords = () => {
    records.value = []
    localStorage.removeItem('pbi-quiz-records')
  }

  return {
    questions,
    records,
    stats,
    statsByDifficulty,
    statsByCategory,
    getQuestionList,
    getQuestionById,
    submitAnswer,
    loadRecords,
    clearRecords
  }
})
