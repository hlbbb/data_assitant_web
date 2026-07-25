# 面包多支付 + 一键解锁：后台配置方案

> 最后更新：2026-05-20

---

## 整体流程

```
用户点击"解锁" → 跳转面包多商品页 → 微信/支付宝扫码付款
→ 面包多自动发货（展示一键解锁链接）
→ 用户点击链接 → 跳回 DataPath → 自动解锁 → 显示"解锁成功"
```

用户全程操作：扫码 + 点链接，两步完成。

---

## 一、面包多平台配置

### 1.1 注册与认证

1. 访问 [mianbaoduo.com](https://mianbaoduo.com) 注册账号
2. 进入卖家后台 → 实名认证（上传身份证）
3. 等待审核（通常 1-2 小时）

### 1.2 创建商品

进入卖家后台 → 创建商品，按以下配置：

| 配置项 | 填写内容 |
|-------|---------|
| 商品名称 | DataPath 全站课程 — 终身解锁 |
| 商品描述 | 一次购买，终身访问所有 SQL + Python 课程。包含 9 个付费阶段 + 在线练习环境 + 持续更新 |
| 商品类型 | **虚拟商品** |
| 价格 | ¥49（原价 ¥99，显示划线价） |
| 发货方式 | **卡密自动发货** |
| 封面图 | 建议 750x400px，用网站首页截图或品牌图 |

### 1.3 导入卡密

发货方式选择"卡密"后，需要批量导入。卡密内容格式：

```
https://你的域名/unlock?token=xxxxxxxx
```

**每个卡密是一条独立的解锁链接，一个用户用一个。**

### 1.4 获取商品链接

商品创建完成后，面包多会给你一个商品购买链接，类似：

```
https://mianbaoduo.com/o/xxxxxx
```

把这个链接记下来，后面要填到 DataPath 前端代码里。

### 1.5 配置通知（可选）

卖家后台 → 通知设置 → 填写邮箱，每笔订单你会收到邮件通知。

---

## 二、Supabase 数据库配置

### 2.1 修改 activation_codes 表

在 Supabase SQL Editor 中执行：

```sql
-- 给现有表增加 unlock_token 字段
ALTER TABLE activation_codes
  ADD COLUMN IF NOT EXISTS unlock_token TEXT UNIQUE;

-- 增加索引
CREATE INDEX IF NOT EXISTS idx_activation_codes_token
  ON activation_codes(unlock_token);
```

### 2.2 完整的 activation_codes 表结构

执行完 ALTER 后，表结构如下：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `code` | TEXT UNIQUE | 激活码 `DP-XXXX-XXXX-XX` |
| `unlock_token` | TEXT UNIQUE | 一键解锁 token |
| `user_id` | UUID | 绑定用户（NULL = 未使用） |
| `created_at` | TIMESTAMPTZ | 创建时间 |
| `activated_at` | TIMESTAMPTZ | 激活时间 |
| `created_by` | TEXT | 生成来源（`batch-YYYYMMDD`） |

### 2.3 RLS 策略

现有策略无需改动：

```sql
-- 已有：任何人可查看激活码（用于验证）
CREATE POLICY "Anyone can read activation codes"
  ON activation_codes FOR SELECT USING (true);

-- 注意：写入（UPDATE user_id）通过前端 anon key 完成
-- 现有的 SELECT USING(true) 允许读取 unlock_token
```

**安全性说明：** `unlock_token` 是一次性、不可预测的随机字符串，暴露在 URL 中是安全的（类似密码重置链接）。使用后立即绑定 `user_id`，不可重复使用。

---

## 三、批量生成激活码

### 3.1 在线生成工具

打开浏览器控制台（F12），粘贴以下脚本：

```javascript
// ========== 配置 ==========
const COUNT = 100                    // 生成数量
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const SECRET = 7

function charToVal(c) { return CHARSET.indexOf(c) }
function valToChar(v) {
  return CHARSET[((v % CHARSET.length) + CHARSET.length) % CHARSET.length]
}
function computeChecksum(body) {
  let sum = 0
  for (let i = 0; i < body.length; i++) sum += charToVal(body[i]) * (i + SECRET)
  return valToChar(Math.floor(sum / 3)) + valToChar(sum)
}
function generateToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 24; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}
function generateOne() {
  let body = ''
  for (let i = 0; i < 8; i++) body += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  const check = computeChecksum(body)
  const code = `DP-${body.slice(0, 4)}-${body.slice(4)}-${check}`
  const token = generateToken()
  return { code, token }
}

// 生成并输出
const results = []
for (let i = 0; i < COUNT; i++) results.push(generateOne())

// 输出面包多卡密格式（解锁链接）
const DOMAIN = 'https://你的域名'  // ← 改成你的实际域名
const links = results.map(r => `${DOMAIN}/unlock?token=${r.token}`)
console.log('===== 面包多卡密（复制下面内容）=====')
console.log(links.join('\n'))

// 输出 SQL 插入语句（用于导入 Supabase）
const BATCH = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const sql = results.map(r =>
  `INSERT INTO activation_codes (code, unlock_token, created_by) VALUES ('${r.code}', '${r.token}', 'batch-${BATCH}');`
).join('\n')
console.log('\n===== SQL 语句（复制到 Supabase SQL Editor）=====')
console.log(sql)
```

### 3.2 操作步骤

1. 打开浏览器 F12 控制台
2. 粘贴上面脚本，修改 `DOMAIN` 为你的实际域名
3. 回车执行
4. 复制"面包多卡密"部分 → 粘贴到面包多卡密导入
5. 复制"SQL 语句"部分 → 粘贴到 Supabase SQL Editor 执行

### 3.3 面包多导入卡密

卖家后台 → 你的商品 → 卡密管理 → 批量导入：

```
https://你的域名/unlock?token=a3k8d2j1n5m9x7b4p0w6y3
https://你的域名/unlock?token=b7f2h9k4m1n8p3q6r0t5w2x9
https://你的域名/unlock?token=c1d4g7j0l3n6p9r2t5w8y1a4
...
```

每行一条，一个订单消耗一条。剩余量会在后台显示，快用完时补。

---

## 四、前端改动

### 4.1 新增 /unlock 页面

用户点击面包多发来的链接后，跳转到这个页面，自动完成激活。

**核心逻辑：**

```
/unlock?token=xxxxxxxx
  1. 页面加载 → 读取 URL 中的 token
  2. 调 Supabase 查 activation_codes 表 → 找到 unlock_token = xxxxxx 的记录
  3. 检查 user_id 是否为 NULL（未被使用）
  4. 如果已登录 → 直接绑定 user_id + 写入 user_access → 显示"解锁成功"
  5. 如果未登录 → 弹出登录框 → 登录后继续第 4 步
  6. 如果 token 无效/已使用 → 显示"链接无效或已使用"
```

**页面状态：**

| 状态 | 显示内容 |
|------|---------|
| 激活中 | 加载动画 |
| 未登录 | 弹出登录框 + 提示"登录后即可解锁" |
| 成功 | 绿色勾 + "解锁成功！" + 跳转首页 |
| 已使用 | "此链接已被使用" + 引导去首页 |
| 无效 | "链接无效" + 联系客服提示 |

### 4.2 修改 PurchasePage

把"获取激活码"按钮改为跳转面包多商品页：

```diff
- <button onClick={() => setShowChannels(!showChannels)}>获取激活码</button>
+ <a href="https://mianbaoduo.com/o/你的商品ID" target="_blank">
+   立即购买（¥49）
+ </a>
```

保留激活码输入框，作为备用方式（用户手动输码也能用）。

### 4.3 PaywallOverlay 改动

锁屏弹窗的"立即解锁"按钮改为跳转面包多：

```diff
- <button onClick={onPurchase}>立即解锁</button>
+ <a href="https://mianbaoduo.com/o/你的商品ID" target="_blank">立即解锁</a>
```

---

## 五、配置清单

按顺序完成以下配置：

### 面包多平台

- [ ] 注册面包多账号
- [ ] 完成实名认证
- [ ] 创建商品（名称、价格、描述）
- [ ] 发货方式选"卡密自动发货"
- [ ] 批量生成 100 个激活码 + token
- [ ] SQL 导入 Supabase `activation_codes` 表
- [ ] 卡密链接导入面包多
- [ ] 记录商品购买链接

### Supabase

- [ ] 执行 ALTER 语句（加 `unlock_token` 字段）
- [ ] 执行批量 INSERT 语句（导入激活码）

### 前端代码

- [ ] 新增 `/unlock` 路由和页面
- [ ] PurchasePage 按钮改为面包多链接
- [ ] PaywallOverlay 按钮改为面包多链接
- [ ] 测试：手动输入激活码（备用方式仍可用）

### 测试

- [ ] 用一个测试 token 访问 `/unlock?token=xxx` → 验证解锁流程
- [ ] 未登录状态点击解锁链接 → 弹出登录 → 登录后自动激活
- [ ] 已登录状态点击解锁链接 → 直接激活
- [ ] 重复点击同一链接 → 显示"已使用"
- [ ] 手动输入激活码 → 验证备用方式

---

## 六、补充激活码

当卡密快用完时，重复"三、批量生成激活码"步骤即可：

1. 生成新一批码
2. SQL 导入 Supabase
3. 卡密链接导入面包多

建议设置提醒：面包多卡密剩余 < 10 时补货。

---

## 七、退款处理

如果用户申请退款：

1. 面包多后台操作退款
2. Supabase SQL Editor 执行：

```sql
-- 解除用户绑定，使激活码失效
UPDATE activation_codes
SET user_id = NULL, activated_at = NULL
WHERE user_id = '用户的UUID';

-- 锁定用户访问
UPDATE user_access
SET unlocked = false
WHERE user_id = '用户的UUID';
```

3. 同时清除用户本地 localStorage（用户下次访问时会从云端同步锁定状态）
