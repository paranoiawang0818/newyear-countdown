# Vercel 部署快速指南

## 🚀 3 分钟完成部署

### 第一步：访问 Vercel
打开浏览器，访问：https://vercel.com

### 第二步：登录 GitHub
1. 点击右上角 "Login"
2. 选择 "Continue with GitHub"
3. 授权 Vercel 访问你的 GitHub

### 第三步：导入项目
1. 登录后点击 "Add New..." → "Project"
2. 在列表中找到 `newyear-countdown` 仓库
3. 点击 "Import"

### 第四步：配置项目（重要！）

**Framework Preset**: 会自动检测为 `Vite`

**Root Directory**:
- 点击输入框
- 选择或输入 `frontend`

**Environment Variables**:
- 点击 "Add New"
- Name: `VITE_API_URL`
- Value: `https://newyear-countdown-okq6.onrender.com/api`
- 点击 "Add"

### 第五步：部署
- 点击底部蓝色的 "Deploy" 按钮
- 等待 1-2 分钟

### 第六步：获取网址
部署完成后，你会看到类似这样的网址：
```
https://newyear-countdown-xxxxx.vercel.app
```

**这就是可以分享给小伙伴的网址！** 🎉

---

## ⚠️ 常见问题

### Q: 找不到仓库？
A: 确保代码已经推送到 GitHub：https://github.com/paranoiawang0818/newyear-countdown

### Q: 部署失败？
A: 检查 Root Directory 是否设置为 `frontend`

### Q: 注册/登录失败？
A: 检查环境变量 `VITE_API_URL` 是否正确填写

---

## ✅ 部署成功后

你的网站就可以通过 Vercel 的 URL 访问了！

把这个 URL 分享给你的小伙伴，他们就能：
- 查看倒计时
- 注册账号
- 提交心愿
- 查看心愿墙

**所有数据都保存在云端，实时同步！**
