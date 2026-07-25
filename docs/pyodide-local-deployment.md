# Pyodide 本地部署说明

## 为什么本地部署?

将 Pyodide 部署到本地可以:
- ✅ **大幅提升加载速度** - 无需从 CDN 下载
- ✅ **避免网络问题** - 不受 CDN 访问限制
- ✅ **减少卡顿** - 本地加载更快

---

## 部署步骤

### 方法1: 手动下载(推荐)

1. **下载 Pyodide**
   访问: https://github.com/pyodide/pyodide/releases/tag/v0.25.1

   下载 `pyodide-0.25.1.tar.bz2` (约 250MB)

2. **解压到 public 目录**
   ```bash
   cd datapath/public
   tar -xjf pyodide-0.25.1.tar.bz2
   mv pyodide-0.25.1 pyodide
   ```

3. **验证文件结构**
   ```
   datapath/public/pyodide/
   ├── pyodide.js
   ├── pyodide.asm.js
   ├── pyodide.asm.wasm
   ├── python_stdlib.zip
   ├── packages.json
   └── ... (其他文件)
   ```

---

### 方法2: 使用脚本自动下载

创建 `scripts/download-pyodide.sh`:

```bash
#!/bin/bash

# 进入 public 目录
cd datapath/public

# 创建 pyodide 目录
mkdir -p pyodide

# 下载 Pyodide
echo "Downloading Pyodide..."
curl -L https://github.com/pyodide/pyodide/releases/download/v0.25.1/pyodide-0.25.1.tar.bz2 -o pyodide.tar.bz2

# 解压
echo "Extracting..."
tar -xjf pyodide.tar.bz2

# 重命名
mv pyodide-0.25.1/* pyodide/
rm -rf pyodide-0.25.1 pyodide.tar.bz2

echo "Pyodide installed successfully!"
```

运行:
```bash
chmod +x scripts/download-pyodide.sh
./scripts/download-pyodide.sh
```

---

### 方法3: Windows PowerShell

创建 `scripts/download-pyodide.ps1`:

```powershell
# 进入 public 目录
cd datapath\public

# 创建 pyodide 目录
New-Item -ItemType Directory -Force -Path pyodide

# 下载 Pyodide
Write-Host "Downloading Pyodide..."
Invoke-WebRequest -Uri "https://github.com/pyodide/pyodide/releases/download/v0.25.1/pyodide-0.25.1.tar.bz2" -OutFile "pyodide.tar.bz2"

# 解压(需要 7-Zip 或其他解压工具)
Write-Host "Extracting..."
# 如果有 7-Zip:
# & "C:\Program Files\7-Zip\7z.exe" x pyodide.tar.bz2
# & "C:\Program Files\7-Zip\7z.exe" x pyodide.tar
# Move-Item pyodide-0.25.1\* pyodide\
# Remove-Item pyodide-0.25.1, pyodide.tar, pyodide.tar.bz2 -Recurse -Force

Write-Host "Please extract pyodide.tar.bz2 manually to datapath\public\pyodide\"
```

---

## 验证安装

启动开发服务器:
```bash
cd datapath
npm run dev
```

访问: http://localhost:5179/pyodide/pyodide.js

如果能看到 JS 文件内容,说明部署成功!

---

## 文件大小参考

| 文件 | 大小 | 说明 |
|------|------|------|
| pyodide.asm.wasm | ~10MB | 核心运行时 |
| python_stdlib.zip | ~12MB | Python 标准库 |
| pyodide.js | ~1MB | JavaScript 接口 |
| **总计** | **~250MB** | 完整包(含所有库) |

---

## 回退机制

代码已实现自动回退:
- 优先尝试从本地 `/pyodide/` 加载
- 本地加载失败时,自动回退到 CDN
- 用户无感知切换

---

## 注意事项

1. **Git 忽略**: 建议在 `.gitignore` 中添加:
   ```
   datapath/public/pyodide/
   ```

2. **首次加载**: 本地部署后,首次加载速度会显著提升

3. **更新版本**: 如需更新 Pyodide 版本,重新下载新版本即可

---

## 性能对比

| 加载方式 | 首次加载时间 | 后续加载时间 |
|---------|-------------|-------------|
| CDN | 10-20秒 | 1-2秒(缓存) |
| **本地** | **2-5秒** | **<1秒** |

---

## 故障排查

### 问题: 本地加载失败

**检查**:
1. 文件是否正确解压到 `datapath/public/pyodide/`
2. 文件权限是否正确
3. 开发服务器是否重启

### 问题: 仍然从 CDN 加载

**原因**: 本地文件不存在或路径错误

**解决**: 检查文件结构,确保 `pyodide.js` 在正确位置

---

## 进阶优化

### 预加载常用包

可以预先下载常用的包到本地:

```bash
cd datapath/public/pyodide
# 下载 numpy
curl -O https://cdn.jsdelivr.net/pyodide/v0.25.1/full/numpy-1.26.4-py3.11-none-any.whl

# 下载 pandas
curl -O https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pandas-2.2.0-py3.11-none-any.whl
```

这样可以进一步加快包的加载速度!
