# 🎆 新年倒计时网站

一个精美的跨年倒计时网站，包含心愿墙功能和用户管理系统。

## 功能特性

- ⏰ **实时倒计时**: 精确到秒的倒计时，目标日期 2026-02-17
- 🎉 **新年祝福**: 倒计时结束后显示精美的新年祝福动画
- 👤 **用户系统**: 注册、登录、JWT 认证
- 💭 **心愿墙**: 用户可提交心愿，管理员审核后公开
- 🔐 **权限管理**: 普通用户和管理员权限
- 📱 **响应式设计**: 完美支持移动端和桌面端
- 🎨 **精美 UI**: Tailwind CSS + 渐变背景 + 动画效果

## 技术栈

### 后端
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT 认证
- bcryptjs 密码加密

### 前端
- React 18
- Vite
- React Router 6
- Axios
- Tailwind CSS

## 项目结构

```
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── routes/         # API 路由
│   │   └── server.js       # 入口文件
│   ├── prisma/
│   │   └── schema.prisma   # 数据库模型
│   └── package.json
│
└── frontend/               # 前端应用
    ├── src/
    │   ├── components/     # React 组件
    │   ├── pages/          # 页面组件
    │   ├── services/       # API 调用
    │   ├── contexts/       # Context API
    │   └── App.jsx
    └── package.json
```

## 快速开始

### 前置要求

- Node.js >= 18
- PostgreSQL 数据库
- npm 或 yarn

### 后端设置

1. 进入后端目录：
```bash
cd backend
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
创建 `.env` 文件：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/newyear_countdown?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

4. 初始化数据库：
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. 启动开发服务器：
```bash
npm run dev
```

### 前端设置

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
创建 `.env` 文件：
```env
VITE_API_URL=http://localhost:5000/api
```

4. 启动开发服务器：
```bash
npm run dev
```

5. 访问 `http://localhost:5173`

## API 接口

### 认证接口

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 心愿接口

- `POST /api/wishes` - 创建心愿（需登录）
- `GET /api/wishes/public` - 获取公开心愿列表
- `GET /api/wishes/mine` - 获取我的心愿（需登录）
- `GET /api/wishes/all` - 获取所有心愿（管理员）
- `PATCH /api/wishes/:id/visibility` - 更新心愿可见性（管理员）
- `DELETE /api/wishes/:id` - 删除心愿（需登录）

## 数据库模型

### User 表
- `id`: 主键
- `username`: 用户名（唯一）
- `password`: 加密密码
- `isAdmin`: 是否管理员
- `createdAt`: 创建时间

### Wish 表
- `id`: 主键
- `content`: 心愿内容
- `isVisible`: 是否公开
- `userId`: 用户 ID（外键）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 创建管理员账号

注册后，需要在数据库中手动将用户设置为管理员：

```sql
UPDATE "User" SET "isAdmin" = true WHERE "username" = 'your_username';
```

或使用 Prisma Studio：
```bash
npx prisma studio
```

## 部署

### 后端部署 (Railway)

1. 推送代码到 GitHub
2. 在 Railway 创建新项目
3. 配置 PostgreSQL 数据库
4. 设置环境变量
5. 运行 `npx prisma migrate deploy`
6. 部署完成

### 前端部署 (Vercel)

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量 `VITE_API_URL`
4. 部署完成

## 安全特性

- 密码使用 bcrypt 加密（salt rounds: 10）
- JWT token 认证
- SQL 注入防护（Prisma ORM）
- XSS 防护（React 自动转义）
- CORS 配置
- 密码长度验证
- 心愿内容长度限制

## 开发说明

- 倒计时目标日期可在 `CountdownTimer.jsx` 中修改
- 数据库模型修改后需运行 `npx prisma migrate dev`
- 管理员权限可手动在数据库中设置

## License

MIT
