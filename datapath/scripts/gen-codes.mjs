/**
 * 激活码批量生成脚本
 *
 * 用法：
 *   node scripts/gen-codes.mjs          # 默认生成 10 个
 *   node scripts/gen-codes.mjs 50       # 生成 50 个
 *   node scripts/gen-codes.mjs 20 > codes.txt  # 输出到文件
 */

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SECRET = 7

function charToVal(c) {
  return CHARSET.indexOf(c)
}

function valToChar(v) {
  return CHARSET[((v % CHARSET.length) + CHARSET.length) % CHARSET.length]
}

function computeChecksum(body) {
  let sum = 0
  for (let i = 0; i < body.length; i++) {
    sum += charToVal(body[i]) * (i + SECRET)
  }
  return valToChar(Math.floor(sum / 3)) + valToChar(sum)
}

function generateCode() {
  let body = ''
  for (let i = 0; i < 8; i++) {
    body += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  const check = computeChecksum(body)
  return `DP-${body.slice(0, 4)}-${body.slice(4)}-${check}`
}

function validateCode(code) {
  const match = code.match(/^DP-([A-Z0-9]{4})-([A-Z0-9]{4})-([A-Z0-9]{2})$/)
  if (!match) return false
  const body = match[1] + match[2]
  return computeChecksum(body) === match[3]
}

const count = parseInt(process.argv[2] || '10', 10)

console.log(`# DataPath 激活码 (${count} 个)`)
console.log(`# 生成时间: ${new Date().toISOString()}`)
console.log('---')

const codes = []
for (let i = 0; i < count; i++) {
  const code = generateCode()
  codes.push(code)
  console.log(code)
}

console.log('---')
console.log(`# 验证: ${codes.every(c => validateCode(c)) ? '全部通过' : '失败'}`)

if (process.argv.includes('--sql')) {
  console.log('\n-- SQL INSERT statements:')
  console.log('INSERT INTO activation_codes (code) VALUES')
  console.log(codes.map(c => `  ('${c}')`).join(',\n') + ';')
}
