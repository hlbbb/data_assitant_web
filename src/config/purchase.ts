/**
 * 小红书店铺链接配置
 *
 * 使用方法:
 * 1. 在小红书创建商品后,复制商品链接
 * 2. 替换下方的 XHS_SHOP_LINK 值
 * 3. 重启开发服务器
 */

// 小红书店铺/商品链接
// 示例: 'https://www.xiaohongshu.com/goods/XXXXX'
// 或者店铺主页: 'https://www.xiaohongshu.com/user/profile/YOUR_SHOP_ID'
export const XHS_SHOP_LINK = 'https://xhslink.com/m/1QRvsXLyyF2';

// 激活码格式说明
export const ACTIVATION_CODE_FORMAT = 'DP-XXXXXXXX';
export const ACTIVATION_CODE_REGEX = /^DP-[A-Z0-9]{12}$/;

// 价格配置
export const PRICING = {
  currentPrice: 29.9,
  originalPrice: 99,
  currency: '¥',
  validity: '终身有效'
};

// 包含内容
export const INCLUDED_CONTENT = {
  sql: {
    title: 'SQL 高级模块',
    stages: [
      'SQL 子查询与CTE',
      'SQL 窗口函数',
      'SQL 数据操作与建表',
      'SQL 高级分析技巧',
      'SQL 实战项目'
    ]
  },
  python: {
    title: 'Python 进阶模块',
    stages: [
      'Python 数据分析核心库',
      'Python 数据分析实战',
      'Python 统计与机器学习',
      'Python 进阶主题'
    ]
  },
  thinking: {
    title: '思维模型',
    stages: 10
  },
  features: [
    '在线 SQL 练习环境',
    '在线 Python 练习环境',
    '全部刷题功能',
    '持续更新内容'
  ]
};
