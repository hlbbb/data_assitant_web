import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  // 从仓库根加载共享 .env 文件（含 VITE_SUPABASE_* 变量）
  envDir: '..',
  // 部署路径说明：
  //   - GitHub Pages (https://hlbbb.github.io/data_assitant_web/) 需要 base = '/data_assitant_web/'
  //   - Vercel / Cloudflare Pages (根域名) 需要 base = '/'
  //   - 通过环境变量 VITE_BASE_PATH 控制；不设则默认为 '/'，与 Vercel/CF 一致
  //   - GitHub Pages 部署时需在构建环境设置 VITE_BASE_PATH=/data_assitant_web/
  base: process.env.VITE_BASE_PATH || '/',
}))
