# Shirou Music 拾柔音乐
基于 HTML5 + CSS3 + 原生 JavaScript 开发的静态音乐网页课程设计，模拟主流音乐平台完整交互逻辑，无需后端即可本地运行。

## 📖 项目介绍
拾柔音乐是一套纯前端音乐播放网站，包含首页、排行榜、搜索、个人中心、登录五大页面。
使用 HTML5 Audio API 实现全局播放器，通过 LocalStorage 本地存储收藏、登录状态、搜索历史，支持电脑、平板、手机多端响应式适配。

## ⚙️ 技术栈
- HTML5 语义化标签
- CSS3 Flex / Grid 布局、媒体查询、毛玻璃、动画过渡
- JavaScript ES6+ 原生交互
- HTML5 Audio 音频播放接口
- LocalStorage 本地持久化存储
- Font Awesome 图标库
- Git & GitHub 版本管理

## 📁 项目目录
shirou-music/
## 📁 项目目录
- index.html：网站首页
- login.html：登录页面
- rank.html：音乐排行榜
- search.html：歌曲搜索页
- profile.html：个人中心
- style.css：全局公共样式
- script.js：全局通用脚本
- login-style.css、login-script.js：登录页样式与交互
- rank-style.css、rank-script.js：排行榜样式与交互
- search-style.css、search-script.js：搜索页样式与交互
- profile-style.css、profile-script.js：个人中心样式与交互
- 图片/：封面、界面图片素材文件夹
- 音乐/：OGG格式背景音乐资源文件夹
- README.md：项目说明文档

## 🎮 核心功能
1. **全局底部播放器**
跨页面通用，支持播放/暂停、上一曲、下一曲、进度拖拽、音量调节。
2. **首页模块**
自动轮播横幅、热门歌单、专辑推荐、图片懒加载优化加载速度。
3. **排行榜模块**
多榜单分类切换、歌曲列表展示、一键播放全榜单、歌曲收藏、操作弹窗提示。
4. **搜索模块**
关键词检索，区分歌曲/歌手/专辑分类展示，自动保存搜索历史。
5. **登录模块**
表单校验、密码显示/隐藏切换、记住用户名，登录状态本地保存。
6. **个人中心**
查看我的收藏、播放历史，读取 LocalStorage 持久化数据。
7. **响应式布局**
适配 PC、平板、手机，移动端导航自动折叠，界面自适应缩放。

## 🚀 本地运行教程
1. 克隆仓库到本地
```bash
git clone https://github.com/Sherry-rou/shirou-music.git
使用 VS Code 打开项目文件夹，安装 Live Server 插件
右键 index.html → Open with Live Server 即可预览网页
说明：仓库已精简素材控制文件体积，完整高清图片、音频素材保存在本地，可使用本地完整项目文件夹。
```
## ✨ 项目亮点
1. 纯原生 HTML/CSS/JavaScript 开发，未引入 Vue/React 等第三方框架，轻量化实现完整音乐网站，适配前端课程设计作业需求；
2. 封装全局 Audio 音频播放模块，首页、排行榜、搜索等多页面共用播放器逻辑，提升代码复用性；
3. 基于 LocalStorage 实现本地持久化存储，用户登录状态、歌曲收藏、搜索历史刷新页面不丢失；
4. 完善交互体验：全局操作弹窗通知、元素 hover 过渡动画、表单焦点高亮、页面入场渐变动画；
5. 采用媒体查询完成全响应式布局，一套代码兼容电脑、平板、手机多终端屏幕；
6. 全程使用 Git 管理版本迭代，完整代码托管至 GitHub，项目目录分层清晰、文件结构规范。

## 📝 项目用途
Web 前端课程设计、HTML/CSS/JavaScript 综合实训大作业、静态网页学习参考源码
plaintext


