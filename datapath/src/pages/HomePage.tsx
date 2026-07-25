import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroCard from '../components/HeroCard';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';
import { dataProjects, DIFFICULTY_LABEL, DIFFICULTY_COLOR, FREE_PROJECT_IDS } from '../data/dataProjects';
import { isUnlocked } from '../utils/access';
import { SqlDatabaseIcon, PythonBasicIcon, ThinkingAnalysisIcon, PythonProjectIcon } from '../components/Icons';
import './HomePage.css';

/* 从 courses.ts 派生唯一数据源 */
const sqlCourse = courses.find(c => c.id === 'sql')!;
const pythonCourse = courses.find(c => c.id === 'python')!;
const thinkingCourse = courses.find(c => c.id === 'thinking')!;

const HomePage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <div className="home" ref={mainRef}>
      <HeroCard />

      {/* SQL 板块 */}
      <section className="home__section fade-in">
        <h2 className="home__section-title">
          <span className="home__section-badge home__section-badge--sql">
            <SqlDatabaseIcon size={24} />
          </span>
          SQL 数据库查询
          <span className="home__section-subtitle">MySQL 语境</span>
        </h2>
        <div className="home__masonry home__masonry--sql">
          {sqlCourse.stages.slice(0, 5).map((stage, index) => (
            <CourseCard
              key={`/sql/${stage.id}`}
              title={stage.title}
              description={stage.description}
              color="sql"
              tag="sql"
              topicCount={stage.topicCount}
              to={`/sql/${stage.id}`}
              stageId={stage.id}
              featured={index === 0}
            />
          ))}
        </div>
        <div className="home__section-more">
          <Link to="/sql" className="home__section-more-link">更多&gt;&gt;&gt;</Link>
        </div>
      </section>

      {/* Python 板块 */}
      <section className="home__section fade-in">
        <h2 className="home__section-title">
          <span className="home__section-badge home__section-badge--python">
            <PythonBasicIcon size={24} />
          </span>
          Python 编程
        </h2>
        <div className="home__masonry home__masonry--python">
          {pythonCourse.stages.slice(0, 5).map((stage, index) => (
            <CourseCard
              key={`/python/${stage.id}`}
              title={stage.title}
              description={stage.description}
              color="python"
              tag="python"
              topicCount={stage.topicCount}
              to={`/python/${stage.id}`}
              stageId={stage.id}
              featured={index === 0}
            />
          ))}
        </div>
        <div className="home__section-more">
          <Link to="/python" className="home__section-more-link">更多&gt;&gt;&gt;</Link>
        </div>
      </section>

      {/* 思维模型板块 */}
      <section className="home__section fade-in">
        <h2 className="home__section-title">
          <span className="home__section-badge home__section-badge--thinking">
            <ThinkingAnalysisIcon size={24} />
          </span>
          数据分析思维模型
        </h2>
        <div className="home__masonry home__masonry--thinking">
          {thinkingCourse.stages.slice(0, 5).map((stage, index) => (
            <CourseCard
              key={`/thinking/${stage.id}`}
              title={stage.title}
              description={stage.description}
              color="thinking"
              tag="thinking"
              topicCount={stage.topicCount}
              to={`/thinking/${stage.id}`}
              stageId={stage.id}
              featured={index === 0}
            />
          ))}
        </div>
        <div className="home__section-more">
          <Link to="/thinking" className="home__section-more-link">更多&gt;&gt;&gt;</Link>
        </div>
      </section>

      {/* 实战项目板块 */}
      <section className="home__section fade-in">
        <h2 className="home__section-title">
          <span className="home__section-badge home__section-badge--project">
            <PythonProjectIcon size={24} />
          </span>
          真实项目演练
        </h2>
        <div className="home__projects-grid">
          {dataProjects.slice(0, 4).map((project) => {
            const isFree = FREE_PROJECT_IDS.includes(project.id);
            const unlocked = isUnlocked() || isFree;

            const handleProjectClick = (e: React.MouseEvent) => {
              if (!isFree && !unlocked) {
                e.preventDefault();
                navigate('/purchase');
              }
            };

            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="home-project-card"
                onClick={handleProjectClick}
              >
                <div className="home-project-card__cover">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="home-project-card__cover-img"
                      loading="lazy"
                    />
                  ) : project.coverHtml ? (
                    <iframe
                      src={project.coverHtml}
                      className="home-project-card__iframe"
                      title={project.title}
                      loading="lazy"
                    />
                  ) : (
                    <img src={project.charts[0]?.src} alt={project.title} loading="lazy" />
                  )}
                  <span
                    className="home-project-card__diff"
                    style={{ background: DIFFICULTY_COLOR[project.difficulty] }}
                  >
                    {DIFFICULTY_LABEL[project.difficulty]}
                  </span>
                  {!unlocked && <span className="home-project-card__lock">🔒</span>}
                </div>
                <div className="home-project-card__body">
                  <h3 className="home-project-card__title">{project.title}</h3>
                  <p className="home-project-card__desc">{project.description}</p>
                  <div className="home-project-card__tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="home-project-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="home__section-more">
          <Link to="/projects" className="home__section-more-link">更多&gt;&gt;&gt;</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
