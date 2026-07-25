import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

// 使用环境变量或 vite.config.ts 中的 base 配置
// Cloudflare Pages: 根路径 '/'
// GitHub Pages: '/data_assitant_web/'
const basename = import.meta.env.VITE_BASE_PATH || (import.meta.env.DEV ? '/' : '/');

// GitHub Pages SPA fallback: 从 sessionStorage 恢复真实路径
// 404.html 会把路径存储到 sessionStorage.redirect
(function() {
  const redirect = sessionStorage.redirect;
  if (redirect) {
    // Remove the stored path
    delete sessionStorage.redirect;
    // Navigate to the correct route
    window.history.replaceState(null, '', redirect);
    // React Router will handle the rest after the app loads
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);