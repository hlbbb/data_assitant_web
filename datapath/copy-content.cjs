// DataPath build helper - 拷贝学习资料和运行时到 dist/
// 在 npm run build 之后自动执行
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(__dirname, 'dist');

const dirs = [
  'sql_learning',
  'python_learning',
  'data_tk_learning',
  'data_project',
  'projects',
  'pyodide',
];

const files = [
  'sql-wasm.js',
  'sql-wasm.wasm',
  'sql-wasm-browser.wasm',
];

console.log('[copy-content] Copying learning content to dist/');

for (const d of dirs) {
  const src = path.join(projectRoot, d);
  const dst = path.join(distDir, d);
  if (!fs.existsSync(src)) {
    console.warn(`  [skip] ${d} (not found)`);
    continue;
  }
  fs.cpSync(src, dst, { recursive: true });
  console.log(`  [ok]   ${d}/`);
}

for (const f of files) {
  const src = path.join(projectRoot, f);
  const dst = path.join(distDir, f);
  if (!fs.existsSync(src)) {
    console.warn(`  [skip] ${f} (not found)`);
    continue;
  }
  fs.copyFileSync(src, dst);
  console.log(`  [ok]   ${f}`);
}

// Disable Jekyll for GitHub Pages
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('  [ok]   .nojekyll');

console.log('[copy-content] Done!');
