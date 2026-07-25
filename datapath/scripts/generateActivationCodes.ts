/**
 * 激活码生成脚本
 *
 * 使用方法:
 * 1. 确保 .env 中配置了 SUPABASE_URL 和 SUPABASE_SERVICE_KEY
 * 2. 运行: npx tsx scripts/generateActivationCodes.ts
 */

import { createClient } from '@supabase/supabase-js'
import { customAlphabet } from 'nanoid'

// 从环境变量读取
const SUPABASE_URL = process.env.VITE_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ 请在 .env 中配置 SUPABASE_URL 和 SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// 只用数字和大写字母,避免混淆字符(0/O, 1/I/L)
const nanoid = customAlphabet('23456789ABCDEFGHJKMNPQRSTUVWXYZ', 12)

interface ActivationCode {
  code: string
  batch: string
  expires_at: string
  used: boolean
}

async function generateCodes(count: number, batchName: string = 'batch-1') {
  console.log(`\n🚀 开始生成 ${count} 个激活码...\n`)

  const codes: ActivationCode[] = []

  for (let i = 0; i < count; i++) {
    codes.push({
      code: `DP-${nanoid()}`, // DP-7K9M2P4Q1R3T
      batch: batchName,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1年有效期
      used: false
    })
  }

  // 插入数据库
  const { error } = await supabase
    .from('activation_codes')
    .insert(codes)

  if (error) {
    console.error('❌ 生成失败:', error)
    return
  }

  // 输出到控制台,方便复制
  console.log('✅ 激活码已生成并保存到数据库!\n')
  console.log('📋 激活码列表 (可直接复制发送给用户):')
  console.log('='.repeat(60))

  codes.forEach((c, i) => {
    console.log(`\n【${i + 1}】`)
    console.log(`激活码: ${c.code}`)
    console.log(`激活链接: https://your-domain.com/activate?code=${c.code}`)
  })

  console.log('\n' + '='.repeat(60))
  console.log(`\n📊 统计信息:`)
  console.log(`  - 总数: ${count}`)
  console.log(`  - 批次: ${batchName}`)
  console.log(`  - 有效期: 1年`)
  console.log(`  - 前缀: DP-`)
  console.log(`\n💡 提示: 可以将上面的激活码复制到 Excel 或文本文件中保存\n`)
}

// 生成50个激活码
generateCodes(50, 'batch-2024-05-22')
