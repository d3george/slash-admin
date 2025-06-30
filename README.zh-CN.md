<div align="center"> 
<br> 
<br>
<img src="./src/assets/icons/ic-logo.svg" height="140" />
<h3> Slash Admin </h3>
  <p>
    <p style="font-size: 14px">
      Slash Admin 是一款现代化的后台管理模板，基于 React 19、Vite、shadcn/ui 和 TypeScript 构建。它旨在帮助开发人员快速搭建功能强大的后台管理系统。
    </p>
    <br />
    <br />
    <a href="https://admin.slashspaces.com/">Preview</a>
    ·
    <a href="https://discord.gg/fXemAXVNDa">Discord</a>
    ·
    <a href="https://docs-admin.slashspaces.com/">Document</a>
    <br />
    <br />
    <a href="https://trendshift.io/repositories/6387" target="_blank"><img src="https://trendshift.io/api/badge/repositories/6387" alt="d3george%2Fslash-admin | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</div>

**中文** | [English](./README.md)

## 赞助 
<div style="display: flex; gap: 50px"> 
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/weixin.jpg" >
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/buymeacoffee.png" />
</div>


## 预览
+ https://admin.slashspaces.com/

|![login.png](https://d3george.github.io/github-static/slash-admin/login.png)|![login_dark.png](https://d3george.github.io/github-static/slash-admin/login_dark.png)
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
|![analysis.png](https://d3george.github.io/github-static/slash-admin/analysis.png)|![workbench.png](https://d3george.github.io/github-static/slash-admin/workbench.png)
| | 
|![analysis.png](https://d3george.github.io/github-static/slash-admin/mobile.png)|![workbench.png](https://d3george.github.io/github-static/slash-admin/mobile_dark.png)
## 特性

- 使用 React 19 hooks 进行构建。
- 基于 Vite 进行快速开发和热模块替换。
- 集成 shadcn/ui，提供丰富的 UI 组件和设计模式。
- 使用 TypeScript 编写，提供类型安全性和更好的开发体验。
- 响应式设计，适应各种屏幕尺寸和设备。
- 灵活的路由配置，支持多级嵌套路由。
- 集成权限管理，根据用户角色控制页面访问权限。
- 集成国际化支持，轻松切换多语言。
- 集成常见的后台管理功能，如用户管理、角色管理、权限管理等。
- 可定制的主题和样式，以满足您的品牌需求。
- 基于 MSW 和 Faker.js 的Mock方案
- 使用 Zustand 进行状态管理
- 使用 React-Query 进行数据获取

## 快速开始

### 获取项目代码

```bash
git clone https://github.com/d3george/slash-admin.git
```

### 安装依赖

在项目根目录下运行以下命令安装项目依赖：

```bash
pnpm install
```

### 启动开发服务器

运行以下命令以启动开发服务器：

```bash
pnpm dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看您的应用程序。

### 构建生产版本

运行以下命令以构建生产版本：

```bash
pnpm build
```

## Git贡献提交规范

- `feat` 新功能
- `fix` 修复bug
- `docs` 文档注释
- `style` 代码格式(不影响代码运行的变动)
- `refactor` 重构
- `perf` 性能优化
- `revert` 回滚commit
- `test` 测试相关
- `chore` 构建过程或辅助工具的变动
- `ci` 修改CI配置、脚本
- `types` 类型定义文件修改
- `wip` 开发中
