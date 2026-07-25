import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SqlOverviewPage from './pages/SqlOverviewPage';
import PythonOverviewPage from './pages/PythonOverviewPage';
import ThinkingOverviewPage from './pages/ThinkingOverviewPage';
import ProgressPage from './pages/ProgressPage';
import DetailPage from './pages/DetailPage';
import PurchasePage from './pages/PurchasePage';
import QuizHomePage from './pages/quiz/QuizHomePage';
import SqlQuizPage from './pages/quiz/SqlQuizPage';
import SqlPracticePage from './pages/quiz/SqlPracticePage';
import SqlAssessmentPage from './pages/quiz/SqlAssessmentPage';
import PythonQuizPage from './pages/quiz/PythonQuizPage';
import PythonPracticePage from './pages/quiz/PythonPracticePage';
import PythonAssessmentPage from './pages/quiz/PythonAssessmentPage';
import WrongBookPage from './pages/quiz/WrongBookPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';

const App: React.FC = () => {
  // 不预加载，用户进入 Python 练习区时才加载

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sql" element={<SqlOverviewPage />} />
          <Route path="/python" element={<PythonOverviewPage />} />
          <Route path="/thinking" element={<ThinkingOverviewPage />} />
          <Route path="/thinking/:id" element={<DetailPage type="thinking" />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/sql/:id" element={<DetailPage type="sql" />} />
          <Route path="/python/:id" element={<DetailPage type="python" />} />
          <Route path="/quiz" element={<QuizHomePage />} />
          <Route path="/quiz/sql" element={<SqlQuizPage />} />
          <Route path="/quiz/sql/practice" element={<SqlPracticePage />} />
          <Route path="/quiz/sql/assessment" element={<SqlAssessmentPage />} />
          <Route path="/quiz/python" element={<PythonQuizPage />} />
          <Route path="/quiz/python/practice" element={<PythonPracticePage />} />
          <Route path="/quiz/python/assessment" element={<PythonAssessmentPage />} />
          <Route path="/quiz/wrong" element={<WrongBookPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
