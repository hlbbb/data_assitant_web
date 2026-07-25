import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <div className="page-transition" key={location.key}>
          {children}
        </div>
      </main>
      <footer className="layout__footer">
        <p>DataPath &copy; 2026 &mdash; 数据分析学习站</p>
      </footer>
    </div>
  );
};

export default Layout;

