export interface ProjectStep {
  title: string
  mdFile: string
}

export interface ProjectChart {
  src: string
  caption: string
}

export interface DataProject {
  id: string
  title: string
  emoji: string
  description: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  charts: ProjectChart[]
  reportMd: string
  guideMd: string
  codeFile: string
  // 封面图片路径
  coverImage?: string
  // 封面HTML报告路径 (deprecated, use coverImage)
  coverHtml?: string
}

// 免费的实战项目ID（只有rfm_analysis免费）
export const FREE_PROJECT_IDS = ['rfm_analysis']
export const LOCKED_PROJECT_IDS = ['aarrr_analysis', 'ltv_cac_analysis']

// 获取带 base path 的资源路径
const getAssetPath = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const dataProjects: DataProject[] = [
  {
    id: 'rfm_analysis',
    title: 'RFM 用户价值分层分析',
    emoji: '👥',
    description: '基于 RFM 模型将 2000 名电商用户划分为 8 个价值层级，识别核心用户与流失风险，制定差异化运营策略。',
    tags: ['RFM', '用户分层', '电商'],
    difficulty: 'beginner',
    charts: [
      { src: getAssetPath('/projects/rfm_analysis/01_rfm_distribution.png'), caption: 'RFM 维度分布' },
      { src: getAssetPath('/projects/rfm_analysis/02_segment_pie.png'), caption: '用户分层占比' },
      { src: getAssetPath('/projects/rfm_analysis/03_segment_bar.png'), caption: '各层级用户数' },
      { src: getAssetPath('/projects/rfm_analysis/04_rfm_scatter.png'), caption: 'RFM 散点分布' },
      { src: getAssetPath('/projects/rfm_analysis/05_funnel.png'), caption: '转化漏斗' },
      { src: getAssetPath('/projects/rfm_analysis/06_monthly_trend.png'), caption: '月度趋势' },
      { src: getAssetPath('/projects/rfm_analysis/07_rfm_heatmap.png'), caption: 'RFM 热力图' },
      { src: getAssetPath('/projects/rfm_analysis/08_pareto.png'), caption: '帕累托分析' },
    ],
    reportMd: '../../../data_project/rfm_analysis/RFM分析报告.md',
    guideMd: '../../../data_project/rfm_analysis/rfm项目深度剖析（上）.md',
    codeFile: 'rfm_analysis.py',
    coverImage: getAssetPath('/projects/rfm_analysis/cover.png'),
  },
  {
    id: 'aarrr_analysis',
    title: 'AARRR 用户增长分析',
    emoji: '🏴\u200d☠️',
    description: '用 AARRR 海盗指标模型拆解 5000 名用户的增长漏斗，从获客到传播全链路诊断，定位增长瓶颈。',
    tags: ['AARRR', '增长黑客', '漏斗分析'],
    difficulty: 'intermediate',
    charts: [
      { src: getAssetPath('/projects/aarrr_analysis/01_aarrr_funnel.png'), caption: 'AARRR 转化漏斗' },
      { src: getAssetPath('/projects/aarrr_analysis/02_channel_pie.png'), caption: '渠道分布' },
      { src: getAssetPath('/projects/aarrr_analysis/03_channel_compare.png'), caption: '渠道对比' },
      { src: getAssetPath('/projects/aarrr_analysis/04_monthly_acquisition.png'), caption: '月度获客趋势' },
      { src: getAssetPath('/projects/aarrr_analysis/05_activation_rate.png'), caption: '激活率' },
      { src: getAssetPath('/projects/aarrr_analysis/06_retention_curve.png'), caption: '留存曲线' },
      { src: getAssetPath('/projects/aarrr_analysis/07_monthly_revenue.png'), caption: '月度收入' },
      { src: getAssetPath('/projects/aarrr_analysis/08_revenue_breakdown.png'), caption: '收入构成' },
      { src: getAssetPath('/projects/aarrr_analysis/09_retention_heatmap.png'), caption: '留存热力图' },
      { src: getAssetPath('/projects/aarrr_analysis/10_k_factor_referral.png'), caption: 'K因子传播' },
    ],
    reportMd: '../../../data_project/aarrr_analysis/AARRR分析报告.md',
    guideMd: '../../../data_project/aarrr_analysis/aarrr项目深度剖析（上）.md',
    codeFile: 'aarrr_analysis.py',
    coverImage: getAssetPath('/projects/aarrr_analysis/cover.png'),
  },
  {
    id: 'ltv_cac_analysis',
    title: 'LTV / CAC 商业模式分析',
    emoji: '💰',
    description: '计算 3000 名用户的生命周期价值与获客成本，通过同期群分析评估商业模式健康度，LTV/CAC 比值优化。',
    tags: ['LTV', 'CAC', '同期群', '商业模型'],
    difficulty: 'intermediate',
    charts: [
      { src: getAssetPath('/projects/ltv_cac_analysis/01_ltv_cac_ratio.png'), caption: 'LTV/CAC 比值' },
      { src: getAssetPath('/projects/ltv_cac_analysis/02_ltv_cac_scatter.png'), caption: 'LTV-CAC 散点' },
      { src: getAssetPath('/projects/ltv_cac_analysis/03_cohort_retention.png'), caption: '同期群留存' },
      { src: getAssetPath('/projects/ltv_cac_analysis/04_cohort_revenue.png'), caption: '同期群收入' },
      { src: getAssetPath('/projects/ltv_cac_analysis/05_monthly_revenue.png'), caption: '月度收入' },
      { src: getAssetPath('/projects/ltv_cac_analysis/06_ltv_distribution.png'), caption: 'LTV 分布' },
      { src: getAssetPath('/projects/ltv_cac_analysis/07_channel_efficiency.png'), caption: '渠道效率' },
      { src: getAssetPath('/projects/ltv_cac_analysis/08_payback_period.png'), caption: '回本周期' },
      { src: getAssetPath('/projects/ltv_cac_analysis/09_user_value_distribution.png'), caption: '用户价值分布' },
      { src: getAssetPath('/projects/ltv_cac_analysis/10_city_tier_analysis.png'), caption: '城市线级分析' },
    ],
    reportMd: '../../../data_project/ltv_cac_analysis/LTV_CAC分析报告.md',
    guideMd: '../../../data_project/ltv_cac_analysis/ltv_cac项目深度剖析（上）.md',
    codeFile: 'ltv_cac_analysis.py',
    coverImage: getAssetPath('/projects/ltv_cac_analysis/cover.png'),
  },
]

export const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
}

export const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: '#43a047',
  intermediate: '#f57c00',
  advanced: '#e53935',
}