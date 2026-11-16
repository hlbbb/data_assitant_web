import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const TABS = [
  { label: '全部', path: '/' },
  { label: 'SQL', path: '/sql' },
  { label: 'Python', path: '/python' },
  { label: '思维模型', path: '/thinking' },
  { label: '刷题', path: '/quiz' },
  { label: '实战项目', path: '/projects' },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  // 判断标签是否激活：首页用精确匹配，其他用前缀匹配
  const isTabActive = (tabPath: string) => {
    if (tabPath === '/') {
      // "全部" 只在路径为 "/" 时高亮
      return location.pathname === '/';
    }
    // 其他标签用前缀匹配，但排除首页
    if (location.pathname === '/') return false;
    return location.pathname.startsWith(tabPath);
  };

  return (
    <nav className="navbar">
      <div className="navbar__top">
        <span className="navbar__logo">DataPath</span>
        <span className="navbar__student-mode">学员版 · 全部内容已开放</span>
      </div>
      <div className="navbar__tabs">
        {TABS.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`navbar__tab ${isTabActive(tab.path) ? 'navbar__tab--active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
