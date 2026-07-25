import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

// 开发环境使用 '/', 生产环境使用 '/data_assitant_web/'
const basename = import.meta.env.DEV ? '/' : '/data_assitant_web';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
