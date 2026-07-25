import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
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
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

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
        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <span className="navbar__user-email">{user.email}</span>
              <button className="navbar__logout-btn" onClick={signOut}>退出</button>
            </div>
          ) : (
            <button className="navbar__login-btn" onClick={() => setShowAuth(true)}>登录</button>
          )}
        </div>
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
      <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
    </nav>
  );
};

export default Navbar;
