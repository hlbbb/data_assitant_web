import './HeroCard.css';

const HeroCard: React.FC = () => {
  return (
    <div className="hero-card fade-in">
      <div className="hero-card__bg">
        <div className="hero-card__content">
          <h1 className="hero-card__title">DataPath 数据学习平台</h1>
          <p className="hero-card__subtitle">
            从 SQL 到 Python，从基础到实战，系统化学习数据分析
          </p>

          {/* 统计卡片 - 玻璃态 */}
          <div className="hero-card__stats">
            <div className="stat-card" style={{ '--gradient': 'linear-gradient(90deg, #ff6b6b, #ee5a24)' } as React.CSSProperties}>
              <span className="stat-card__number">8+</span>
              <span className="stat-card__label">SQL 模块</span>
            </div>

            <div className="stat-card" style={{ '--gradient': 'linear-gradient(90deg, #4ecdc4, #26d0ce)' } as React.CSSProperties}>
              <span className="stat-card__number">18+</span>
              <span className="stat-card__label">Python 模块</span>
            </div>

            <div className="stat-card" style={{ '--gradient': 'linear-gradient(90deg, #f59e0b, #d97706)' } as React.CSSProperties}>
              <span className="stat-card__number">24+</span>
              <span className="stat-card__label">思维模型</span>
            </div>

            <div className="stat-card" style={{ '--gradient': 'linear-gradient(90deg, #a78bfa, #8b5cf6)' } as React.CSSProperties}>
              <span className="stat-card__number">100+</span>
              <span className="stat-card__label">实战案例</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
