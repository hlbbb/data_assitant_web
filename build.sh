#!/bin/bash
# DataPath 构建脚本 - 用于帽子云/GitHub Pages 部署

set -e  # 遇到错误立即退出

echo "开始构建 DataPath 项目..."

# 1. 进入 datapath 目录并构建
#    GitHub Pages 部署需要 base = '/data_assitant_web/'
#    Cloudflare Pages / Vercel 部署需要 base = '/'
#    通过 VITE_BASE_PATH 环境变量控制
cd datapath
npm install
VITE_BASE_PATH="${VITE_BASE_PATH:-/}" npm run build

# 2. 返回根目录
cd ..

# 3. 复制学习资料到 dist 目录
echo "复制学习资料..."
cp -r sql_learning datapath/dist/
cp -r python_learning datapath/dist/
cp -r data_tk_learning datapath/dist/
cp -r data_project datapath/dist/
cp -r projects datapath/dist/
cp -r pyodide datapath/dist/

# 4. 复制 SQL 运行环境
echo "复制 SQL 运行环境..."
cp sql-wasm.js datapath/dist/
cp sql-wasm.wasm datapath/dist/
cp sql-wasm-browser.wasm datapath/dist/

# 5. 禁用 Jekyll (GitHub Pages 必需)
touch datapath/dist/.nojekyll

echo "构建完成！输出目录: datapath/dist"
ls -la datapath/dist/
