# 构建阶段 - DataPath 项目专用
FROM node:20-alpine AS builder

WORKDIR /build

# 复制项目文件
COPY datapath/package*.json ./
COPY datapath/ ./

# 安装依赖并构建
RUN npm ci && npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /build/dist /usr/share/nginx/html

# 复制所有学习资源
COPY sql_learning/ /usr/share/nginx/html/sql_learning/
COPY python_learning/ /usr/share/nginx/html/python_learning/
COPY data_tk_learning/ /usr/share/nginx/html/data_tk_learning/
COPY data_project/ /usr/share/nginx/html/data_project/
COPY projects/ /usr/share/nginx/html/projects/
COPY pyodide/ /usr/share/nginx/html/pyodide/
COPY sql-wasm.js /usr/share/nginx/html/
COPY sql-wasm.wasm /usr/share/nginx/html/
COPY sql-wasm-browser.wasm /usr/share/nginx/html/

# 配置 nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Build refresh: 1780553926
