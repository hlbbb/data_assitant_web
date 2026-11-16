import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { courses } from '../data/courses';
import { getIcon } from '../utils/iconMap';
import './ThinkingOverviewPage.css';

const THINKING_STAGES = courses.find((c) => c.id === 'thinking')!.stages;

const ThinkingOverviewPage: React.FC = () => {
  const progress = useProgress();
  const completed = THINKING_STAGES.filter(
    (s) => progress.getStageStatus('thinking', s.id).status === 'completed'
  ).length;
  const percent = Math.round((completed / THINKING_STAGES.length) * 100);

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
    <div className="thinking-overview">
      <div className="thinking-overview__breadcrumb fade-in">
        <Link to="/">首页</Link>
        <span className="thinking-overview__breadcrumb-sep">/</span>
        <span>思维模型</span>
      </div>

      <div className="thinking-overview__progress fade-in">
        <h2 className="thinking-overview__title">思维模型学习路线</h2>
        <ProgressBar percent={percent} label="总进度" />
      </div>

      <div className="thinking-overview__list">
        {THINKING_STAGES.map((stage, idx) => {
          const sp = progress.getStageStatus('thinking', stage.id);
          const IconComponent = getIcon('thinking', stage.id);
          return (
            <Link
              key={stage.id}
              to={`/thinking/${stage.id}`}
              className={`thinking-overview__card fade-in thinking-overview__card--${sp.status}`}
            >
              <span className="thinking-overview__card-num">{idx + 1}</span>
              <span className="thinking-overview__card-icon">
                <IconComponent size={24} />
              </span>
              <div className="thinking-overview__card-info">
                <h3 className="thinking-overview__card-title">{stage.title}</h3>
                <span className="thinking-overview__card-points">
                  {stage.topicCount} 个知识点
                </span>
              </div>
              <span className={`thinking-overview__card-badge thinking-overview__card-badge--${sp.status}`}>
                {sp.status === 'completed' ? '✓' : sp.status === 'in_progress' ? '···' : ''}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ThinkingOverviewPage;
