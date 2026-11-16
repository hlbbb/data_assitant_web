import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { courses } from '../data/courses';
import { getIcon } from '../utils/iconMap';
import './SqlOverviewPage.css';

const SQL_STAGES = courses[0].stages;

const SqlOverviewPage: React.FC = () => {
  const progress = useProgress();
  const completed = SQL_STAGES.filter(
    (s) => progress.getStageStatus('sql', s.id).status === 'completed'
  ).length;
  const percent = Math.round((completed / SQL_STAGES.length) * 100);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sql-overview">
      {/* 面包屑 */}
      <div className="sql-overview__breadcrumb fade-in">
        <Link to="/">首页</Link>
        <span className="sql-overview__breadcrumb-sep">/</span>
        <span>SQL</span>
      </div>

      {/* 总进度 */}
      <div className="sql-overview__progress fade-in">
        <h2 className="sql-overview__title">SQL 学习路线</h2>
        <ProgressBar percent={percent} label="总进度" />
      </div>

      {/* 阶段列表 */}
      <div className="sql-overview__list">
        {SQL_STAGES.map((stage, idx) => {
          const sp = progress.getStageStatus('sql', stage.id);
          const IconComponent = getIcon('sql', stage.id);
          return (
            <Link
              key={stage.id}
              to={`/sql/${stage.id}`}
              className={`sql-overview__card fade-in sql-overview__card--${sp.status}`}
            >
              <span className="sql-overview__card-num">{idx + 1}</span>
              <span className="sql-overview__card-icon">
                <IconComponent size={24} />
              </span>
              <div className="sql-overview__card-info">
                <h3 className="sql-overview__card-title">{stage.title}</h3>
                <span className="sql-overview__card-points">
                  {stage.topicCount} 个知识点
                </span>
              </div>
              <span className={`sql-overview__card-badge sql-overview__card-badge--${sp.status}`}>
                {sp.status === 'completed' ? '✓' : sp.status === 'in_progress' ? '···' : ''}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SqlOverviewPage;
