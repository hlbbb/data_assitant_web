import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// SQL 图标 - 数据库
export const SqlDatabaseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="20" rx="24" ry="10" stroke="url(#sql-grad)" strokeWidth="3" fill="none" />
    <path d="M16 20 L16 60 C16 65.5 26.5 72 40 72 C53.5 72 64 65.5 64 60 L64 20" stroke="url(#sql-grad)" strokeWidth="3" fill="none" />
    <ellipse cx="40" cy="36" rx="24" ry="10" stroke="url(#sql-grad)" strokeWidth="3" fill="none" opacity="0.5" />
    <ellipse cx="40" cy="52" rx="24" ry="10" stroke="url(#sql-grad)" strokeWidth="3" fill="none" opacity="0.3" />
  </svg>
);

// SQL 图标 - 查询
export const SqlQueryIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-query-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" stroke="url(#sql-query-grad)" strokeWidth="3" fill="none" />
    <line x1="46" y1="46" x2="64" y2="64" stroke="url(#sql-query-grad)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="32" r="6" stroke="url(#sql-query-grad)" strokeWidth="2" fill="none" opacity="0.4" />
  </svg>
);

// SQL 图标 - 聚合
export const SqlAggregateIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-agg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="56" height="48" rx="4" stroke="url(#sql-agg-grad)" strokeWidth="3" fill="none" />
    <line x1="12" y1="32" x2="68" y2="32" stroke="url(#sql-agg-grad)" strokeWidth="2" />
    <line x1="12" y1="48" x2="68" y2="48" stroke="url(#sql-agg-grad)" strokeWidth="2" />
    <line x1="36" y1="16" x2="36" y2="64" stroke="url(#sql-agg-grad)" strokeWidth="2" />
    <line x1="52" y1="16" x2="52" y2="64" stroke="url(#sql-agg-grad)" strokeWidth="2" opacity="0.5" />
  </svg>
);

// SQL 图标 - 连接
export const SqlJoinIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-join-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <circle cx="26" cy="40" r="16" stroke="url(#sql-join-grad)" strokeWidth="3" fill="none" />
    <circle cx="54" cy="40" r="16" stroke="url(#sql-join-grad)" strokeWidth="3" fill="none" />
    <path d="M34 40 A16 16 0 0 1 46 40" stroke="url(#sql-join-grad)" strokeWidth="3" fill="none" />
  </svg>
);

// SQL 图标 - 子查询
export const SqlSubqueryIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-sub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="56" height="56" rx="4" stroke="url(#sql-sub-grad)" strokeWidth="3" fill="none" />
    <rect x="24" y="24" width="32" height="32" rx="3" stroke="url(#sql-sub-grad)" strokeWidth="2" fill="none" />
    <rect x="34" y="34" width="12" height="12" rx="2" stroke="url(#sql-sub-grad)" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);

// SQL 图标 - 窗口函数
export const SqlWindowIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-win-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="56" height="48" rx="4" stroke="url(#sql-win-grad)" strokeWidth="3" fill="none" />
    <line x1="12" y1="40" x2="68" y2="40" stroke="url(#sql-win-grad)" strokeWidth="2" strokeDasharray="4 4" />
    <rect x="20" y="24" width="12" height="24" stroke="url(#sql-win-grad)" strokeWidth="2" fill="none" />
    <rect x="34" y="24" width="12" height="24" stroke="url(#sql-win-grad)" strokeWidth="2" fill="none" opacity="0.6" />
    <rect x="48" y="24" width="12" height="24" stroke="url(#sql-win-grad)" strokeWidth="2" fill="none" opacity="0.3" />
  </svg>
);

// SQL 图标 - 数据操作
export const SqlCrudIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-crud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="24" rx="20" ry="8" stroke="url(#sql-crud-grad)" strokeWidth="3" fill="none" />
    <path d="M20 24 L20 56 C20 60 28 66 40 66 C52 66 60 60 60 56 L60 24" stroke="url(#sql-crud-grad)" strokeWidth="3" fill="none" />
    <line x1="40" y1="42" x2="40" y2="54" stroke="url(#sql-crud-grad)" strokeWidth="3" strokeLinecap="round" />
    <line x1="34" y1="48" x2="46" y2="48" stroke="url(#sql-crud-grad)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// SQL 图标 - 高级分析
export const SqlAdvancedIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-adv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="28" stroke="url(#sql-adv-grad)" strokeWidth="3" fill="none" />
    <path d="M28 32 L40 48 L52 32" stroke="url(#sql-adv-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="28" r="4" fill="url(#sql-adv-grad)" />
  </svg>
);

// SQL 图标 - 实战项目
export const SqlProjectIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="sql-proj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
        <stop offset="100%" style={{ stopColor: '#ee5a24' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="28" stroke="url(#sql-proj-grad)" strokeWidth="3" fill="none" />
    <circle cx="40" cy="40" r="18" stroke="url(#sql-proj-grad)" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="8" stroke="url(#sql-proj-grad)" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="3" fill="url(#sql-proj-grad)" />
  </svg>
);

// Python 图标 - 基础
export const PythonBasicIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-basic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <polyline points="28,24 16,40 28,56" stroke="url(#py-basic-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="52,24 64,40 52,56" stroke="url(#py-basic-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="44" y1="18" x2="36" y2="62" stroke="url(#py-basic-grad)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Python 图标 - 控制流
export const PythonFlowIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <path d="M40 12 L40 28 L28 28 L28 52 L40 52 L40 68" stroke="url(#py-flow-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="20" r="4" fill="url(#py-flow-grad)" />
    <circle cx="40" cy="60" r="4" fill="url(#py-flow-grad)" />
    <path d="M52 28 L64 28 L64 52 L52 52" stroke="url(#py-flow-grad)" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);

// Python 图标 - 数据结构
export const PythonDataIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-data-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="20" height="20" rx="3" stroke="url(#py-data-grad)" strokeWidth="2.5" fill="none" />
    <rect x="36" y="12" width="20" height="20" rx="3" stroke="url(#py-data-grad)" strokeWidth="2.5" fill="none" />
    <rect x="12" y="36" width="20" height="20" rx="3" stroke="url(#py-data-grad)" strokeWidth="2.5" fill="none" />
    <rect x="36" y="36" width="20" height="20" rx="3" stroke="url(#py-data-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="56" cy="56" r="12" stroke="url(#py-data-grad)" strokeWidth="2.5" fill="none" />
  </svg>
);

// Python 图标 - 面向对象
export const PythonOopIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-oop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="24" y="12" width="32" height="20" rx="3" stroke="url(#py-oop-grad)" strokeWidth="2.5" fill="none" />
    <rect x="12" y="48" width="24" height="20" rx="3" stroke="url(#py-oop-grad)" strokeWidth="2.5" fill="none" />
    <rect x="44" y="48" width="24" height="20" rx="3" stroke="url(#py-oop-grad)" strokeWidth="2.5" fill="none" />
    <line x1="40" y1="32" x2="24" y2="48" stroke="url(#py-oop-grad)" strokeWidth="2" />
    <line x1="40" y1="32" x2="56" y2="48" stroke="url(#py-oop-grad)" strokeWidth="2" />
  </svg>
);

// Python 图标 - NumPy
export const PythonNumpyIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-numpy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="16" y="16" width="48" height="48" rx="4" stroke="url(#py-numpy-grad)" strokeWidth="3" fill="none" />
    <line x1="16" y1="32" x2="64" y2="32" stroke="url(#py-numpy-grad)" strokeWidth="2" />
    <line x1="16" y1="48" x2="64" y2="48" stroke="url(#py-numpy-grad)" strokeWidth="2" />
    <line x1="32" y1="16" x2="32" y2="64" stroke="url(#py-numpy-grad)" strokeWidth="2" />
    <line x1="48" y1="16" x2="48" y2="64" stroke="url(#py-numpy-grad)" strokeWidth="2" />
  </svg>
);

// Python 图标 - Pandas
export const PythonPandasIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-pandas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="56" height="12" rx="2" stroke="url(#py-pandas-grad)" strokeWidth="2" fill="none" />
    <rect x="12" y="28" width="56" height="24" rx="2" stroke="url(#py-pandas-grad)" strokeWidth="2" fill="none" />
    <rect x="12" y="56" width="56" height="12" rx="2" stroke="url(#py-pandas-grad)" strokeWidth="2" fill="none" />
  </svg>
);

// Python 图标 - 可视化
export const PythonVizIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-viz-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="56" height="56" rx="4" stroke="url(#py-viz-grad)" strokeWidth="3" fill="none" />
    <polyline points="20,52 32,40 44,46 60,24" stroke="url(#py-viz-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="40" r="3" fill="url(#py-viz-grad)" />
    <circle cx="44" cy="46" r="3" fill="url(#py-viz-grad)" />
    <circle cx="60" cy="24" r="3" fill="url(#py-viz-grad)" />
  </svg>
);

// Python 图标 - 实战项目
export const PythonProjectIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="py-proj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ecdc4' }} />
        <stop offset="100%" style={{ stopColor: '#26d0ce' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="12" width="56" height="56" rx="4" stroke="url(#py-proj-grad)" strokeWidth="3" fill="none" />
    <line x1="20" y1="56" x2="60" y2="56" stroke="url(#py-proj-grad)" strokeWidth="2" />
    <line x1="20" y1="56" x2="20" y2="24" stroke="url(#py-proj-grad)" strokeWidth="2" />
    <rect x="26" y="44" width="8" height="12" stroke="url(#py-proj-grad)" strokeWidth="2" fill="none" />
    <rect x="38" y="36" width="8" height="20" stroke="url(#py-proj-grad)" strokeWidth="2" fill="none" />
    <rect x="50" y="28" width="8" height="28" stroke="url(#py-proj-grad)" strokeWidth="2" fill="none" />
  </svg>
);

// 思维模型图标 - 结构化思维
export const ThinkingStructureIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-struct-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <rect x="28" y="12" width="24" height="16" rx="3" stroke="url(#think-struct-grad)" strokeWidth="2.5" fill="none" />
    <rect x="12" y="52" width="20" height="16" rx="3" stroke="url(#think-struct-grad)" strokeWidth="2.5" fill="none" />
    <rect x="48" y="52" width="20" height="16" rx="3" stroke="url(#think-struct-grad)" strokeWidth="2.5" fill="none" />
    <line x1="40" y1="28" x2="22" y2="52" stroke="url(#think-struct-grad)" strokeWidth="2" />
    <line x1="40" y1="28" x2="58" y2="52" stroke="url(#think-struct-grad)" strokeWidth="2" />
  </svg>
);

// 思维模型图标 - 漏斗
export const ThinkingFunnelIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-funnel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <path d="M12 16 L68 16 L52 40 L28 40 Z" stroke="url(#think-funnel-grad)" strokeWidth="3" fill="none" />
    <path d="M28 40 L52 40 L44 64 L36 64 Z" stroke="url(#think-funnel-grad)" strokeWidth="3" fill="none" />
  </svg>
);

// 思维模型图标 - 对比
export const ThinkingCompareIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-comp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <rect x="12" y="16" width="24" height="48" rx="3" stroke="url(#think-comp-grad)" strokeWidth="2.5" fill="none" />
    <rect x="44" y="16" width="24" height="48" rx="3" stroke="url(#think-comp-grad)" strokeWidth="2.5" fill="none" />
    <line x1="36" y1="40" x2="44" y2="40" stroke="url(#think-comp-grad)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 思维模型图标 - 分类
export const ThinkingCategoryIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-cat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="24" r="12" stroke="url(#think-cat-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="56" r="12" stroke="url(#think-cat-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="56" cy="56" r="12" stroke="url(#think-cat-grad)" strokeWidth="2.5" fill="none" />
    <line x1="40" y1="36" x2="24" y2="44" stroke="url(#think-cat-grad)" strokeWidth="2" />
    <line x1="40" y1="36" x2="56" y2="44" stroke="url(#think-cat-grad)" strokeWidth="2" />
  </svg>
);

// 思维模型图标 - 分析
export const ThinkingAnalysisIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-anal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <path d="M40 8 C28 8 18 18 18 30 C18 38 22 44 28 48 L28 56 L52 56 L52 48 C58 44 62 38 62 30 C62 18 52 8 40 8 Z" stroke="url(#think-anal-grad)" strokeWidth="3" fill="none" />
    <line x1="28" y1="62" x2="52" y2="62" stroke="url(#think-anal-grad)" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="68" x2="48" y2="68" stroke="url(#think-anal-grad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 思维模型图标 - 网络
export const ThinkingNetworkIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="20" r="10" stroke="url(#think-net-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="20" cy="60" r="10" stroke="url(#think-net-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="60" cy="60" r="10" stroke="url(#think-net-grad)" strokeWidth="2.5" fill="none" />
    <line x1="40" y1="30" x2="20" y2="50" stroke="url(#think-net-grad)" strokeWidth="2" />
    <line x1="40" y1="30" x2="60" y2="50" stroke="url(#think-net-grad)" strokeWidth="2" />
    <line x1="30" y1="60" x2="50" y2="60" stroke="url(#think-net-grad)" strokeWidth="2" opacity="0.5" />
  </svg>
);

// 思维模型图标 - 目标
export const ThinkingTargetIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-target-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="28" stroke="url(#think-target-grad)" strokeWidth="3" fill="none" />
    <circle cx="40" cy="40" r="18" stroke="url(#think-target-grad)" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="8" stroke="url(#think-target-grad)" strokeWidth="2" fill="none" />
    <circle cx="40" cy="40" r="3" fill="url(#think-target-grad)" />
  </svg>
);

// 思维模型图标 - 流程
export const ThinkingFlowIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="think-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
        <stop offset="100%" style={{ stopColor: '#d97706' }} />
      </linearGradient>
    </defs>
    <path d="M40 12 L40 28 L28 28 L28 52 L40 52 L40 68" stroke="url(#think-flow-grad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="20" r="4" fill="url(#think-flow-grad)" />
    <circle cx="40" cy="60" r="4" fill="url(#think-flow-grad)" />
    <path d="M52 28 L64 28 L64 52 L52 52" stroke="url(#think-flow-grad)" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);

// 默认图标
export const DefaultIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="default-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a78bfa' }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="28" stroke="url(#default-grad)" strokeWidth="3" fill="none" />
    <circle cx="40" cy="40" r="4" fill="url(#default-grad)" />
  </svg>
);
