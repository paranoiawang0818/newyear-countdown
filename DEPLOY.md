# 新年倒计时网站 - 部署指南

## 快速部署（让小伙伴访问）

### 第一步：代码推送到 GitHub

```bash
git push -u origin main
```

如果网络不通，可以：
- 检查网络连接
- 使用 VPN
- 或稍后重试

### 第二步：部署后端到 Railway

1. 访问：https://railway.app
2. 点击 "Login with GitHub"
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择 `newyear-countdown` 仓库
5. 在 "Root Directory" 输入：`backend`
6. 环境变量（在 Variables 标签）：
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_6LzYcQxM8ndu@ep-broad-snow-aiq42gu6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=newyear2026-secret-key-please-change-me
   JWT_EXPIRES_IN=7d
   PORT=5000
   FRONTEND_URL=*
   ```
7. 点击 "Deploy"

**部署完成后，Railway 会给你一个 URL，例如：**
```
https://newyear-countdown-backend.up.railway.app
```

### 第三步：部署前端到 Vercel

1. 访问：https://vercel.com
2. 点击 "Login with GitHub"
3. 点击 "Add New" → "Project"
4. 选择 `newyear-countdown` 仓库
5. 配置：
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `VITE_API_URL`: 你的 Railway 后端 URL + `/api`
     - 例如：`VITE_API_URL=https://newyear-countdown-backend.up.railway.app/api`
6. 点击 "Deploy"

**部署完成后，Vercel 会给你一个 URL，例如：**
```
https://newyear-countdown.vercel.app
```

### 完成！

把 Vercel 的 URL 分享给小伙伴，他们就可以访问了！

---

## 本地运行（测试用）

```bash
# 启动后端
cd backend
npm run dev

# 启动前端（新终端）
cd frontend
npm run dev
```

访问：http://localhost:5173

---

## 环境变量说明

### 后端 (.env)
- `DATABASE_URL`: Neon 数据库连接字符串
- `JWT_SECRET`: JWT 密钥（随意设置）
- `JWT_EXPIRES_IN`: Token 过期时间
- `PORT`: 服务器端口（默认 5000）
- `FRONTEND_URL`: 前端地址（生产环境用 *）

### 前端 (.env)
- `VITE_API_URL`: 后端 API 地址

---

## 当前配置

- **数据库**: Neon (https://neon.tech)
- **数据库连接**: 已配置 ✅
- **所有心愿**: 默认公开 ✅
- **管理员功能**: 保留但不需要 ✅
