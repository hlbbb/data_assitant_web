import {
  SqlDatabaseIcon,
  SqlAggregateIcon,
  SqlJoinIcon,
  SqlSubqueryIcon,
  SqlWindowIcon,
  SqlCrudIcon,
  SqlAdvancedIcon,
  SqlProjectIcon,
  PythonBasicIcon,
  PythonFlowIcon,
  PythonDataIcon,
  PythonOopIcon,
  PythonNumpyIcon,
  PythonPandasIcon,
  PythonVizIcon,
  PythonProjectIcon,
  ThinkingStructureIcon,
  ThinkingFunnelIcon,
  ThinkingCompareIcon,
  ThinkingCategoryIcon,
  ThinkingAnalysisIcon,
  ThinkingNetworkIcon,
  ThinkingTargetIcon,
  ThinkingFlowIcon,
  DefaultIcon,
} from '../components/Icons';

interface IconMap {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>;
}

// SQL 图标映射
const sqlIconMap: IconMap = {
  '1': SqlDatabaseIcon,     // 基础入门
  '2': SqlAggregateIcon,    // 聚合与分组
  '3': SqlJoinIcon,         // 多表连接
  '4': SqlSubqueryIcon,     // 子查询与CTE
  '5': SqlWindowIcon,       // 窗口函数
  '6': SqlCrudIcon,         // 数据操作与建表
  '7': SqlAdvancedIcon,     // 高级分析技巧
  '8': SqlProjectIcon,      // 实战项目
};

// Python 图标映射
const pythonIconMap: IconMap = {
  '1': PythonBasicIcon,     // 环境搭建与基础语法
  '2': PythonFlowIcon,      // 控制流与函数
  '3': PythonDataIcon,      // 数据结构与文件操作
  '4': PythonOopIcon,       // 面向对象与模块化
  '5': PythonNumpyIcon,     // NumPy 数值计算
  '6': PythonPandasIcon,    // Pandas 数据处理(上)
  '7': PythonPandasIcon,    // Pandas 数据处理(下)
  '8': PythonVizIcon,       // 数据可视化
  '9': ThinkingAnalysisIcon,// 数据分析方法论
  '10': PythonProjectIcon,  // 实战项目
  '11': DefaultIcon,        // 统计基础
  '12': DefaultIcon,        // 机器学习入门
};

// 思维模型图标映射
const thinkingIconMap: IconMap = {
  '1.1': ThinkingStructureIcon,  // 结构化思维
  '1.2': ThinkingFunnelIcon,     // 漏斗思维
  '1.3': ThinkingCompareIcon,    // 对比思维
  '1.4': ThinkingCategoryIcon,   // 分类思维
  '2.1': ThinkingAnalysisIcon,   // 描述性分析
  '2.2': ThinkingAnalysisIcon,   // 诊断性分析
  '2.3': ThinkingTargetIcon,     // 预测性分析
  '2.4': ThinkingTargetIcon,     // 处方性分析
  '3.1': ThinkingCategoryIcon,   // RFM模型
  '3.2': ThinkingFunnelIcon,     // AARRR模型
  '3.3': ThinkingFlowIcon,       // 用户生命周期
  '3.4': ThinkingTargetIcon,     // 留存分析
  '3.5': ThinkingCategoryIcon,   // KANO模型
  '3.6': ThinkingCompareIcon,    // 波士顿矩阵
  '3.7': ThinkingTargetIcon,     // 安索夫矩阵
  '4.1': ThinkingNetworkIcon,    // 归因类型
  '4.2': ThinkingNetworkIcon,    // 归因分析流程
  '5.1': ThinkingCategoryIcon,   // 用户画像
  '5.2': ThinkingTargetIcon,     // 同期群分析
  '5.3': ThinkingCompareIcon,    // 分群对比分析
  '6.1': ThinkingTargetIcon,     // 北极星指标
  '6.2': ThinkingTargetIcon,     // OSM模型
  '6.3': ThinkingFunnelIcon,     // AARRR指标体系
  '6.4': ThinkingTargetIcon,     // KPI体系设计
  '7.1': ThinkingAnalysisIcon,   // A/B测试思维
  '8.1': PythonVizIcon,          // 数据可视化
  '9.1': ThinkingNetworkIcon,    // 场景与模型组合
  '10.1': ThinkingStructureIcon, // 方法论框架
  '11.1': ThinkingNetworkIcon,   // 因果推断
  '11.2': ThinkingNetworkIcon,   // 网络分析
  '11.3': ThinkingAnalysisIcon,  // 文本分析
  '12.1': ThinkingAnalysisIcon,  // 避坑指南
};

// 主题图标映射
const themeIconMap: IconMap = {
  'sql': SqlDatabaseIcon,
  'python': PythonBasicIcon,
  'thinking': ThinkingAnalysisIcon,
};

/**
 * 根据 subject 和 stageId 获取对应的图标组件
 */
export function getIcon(subject: string, stageId?: string): React.ComponentType<{ size?: number; className?: string }> {
  if (!stageId) {
    return themeIconMap[subject] || DefaultIcon;
  }

  const iconMaps: { [subject: string]: IconMap } = {
    'sql': sqlIconMap,
    'python': pythonIconMap,
    'thinking': thinkingIconMap,
  };

  const iconMap = iconMaps[subject];
  if (!iconMap) {
    return DefaultIcon;
  }

  return iconMap[stageId] || DefaultIcon;
}