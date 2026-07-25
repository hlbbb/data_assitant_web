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
            className={`navbar__tab ${
              (tab.path === '/' ? location.pathname === '/' : location.pathname.startsWith(tab.path))
                ? 'navbar__tab--active'
                : ''
            }`}
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
