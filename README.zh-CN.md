<div align="center"> 
<br> 
<br>
<img src="./src/assets/images/logo.png" height="140" />
<h1> Slash Admin </h1>
<span style="font-size: 14px">
  Slash Admin 是一款现代化的后台管理模板，基于 React 18、Vite、Ant Design 和 TypeScript 构建。它旨在帮助开发人员快速搭建功能强大的后台管理系统。
</span>

</div>

**中文** | [English](./README.md)

## 赞助 
<div style="display: flex; gap: 50px"> 
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/weixin.jpg" >
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/buymeacoffee.png" />
</div>


## 预览
+ https://admin.slashspaces.com/

|![login.png](https://d3george.github.io/github-static/slash-admin/login.jpeg)|![login_dark.png](https://d3george.github.io/github-static/slash-admin/login_dark.jpeg)
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
|![analysis.png](https://d3george.github.io/github-static/slash-admin/analysis.png)|![workbench.png](https://d3george.github.io/github-static/slash-admin/workbench.png)
## 特性

- 使用 React 18 hooks 进行构建。
- 基于 Vite 进行快速开发和热模块替换。
- 集成 Ant Design，提供丰富的 UI 组件和设计模式。
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

## 文档
[文档地址](https://docs-admin.slashspaces.com/)

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

构建后的文件将位于 `dist` 目录中。

## 容器化部署

### 构建镜像并运行容器
#### 构建镜像
在终端中进入项目根目录，并执行以下命令来构建 Docker 镜像:
```
docker build -t your-image-name .
```
确保将 `your-image-name` 替换为你自己的镜像名称

#### 运行容器
使用以下命令在 Docker 容器中运行你的应用：
```
docker run -p 3001:80 your-image-name
```
这将在容器的端口 `80` (暴露在`Dockerfile`中) 上运行你的应用，并将其映射到你主机的端口 `3001` 上。

现在，你可以通过访问 http://localhost:3001 来查看部署的应用。


### 使用docker-compose.yaml
在终端中进入项目根目录，并执行以下命令来启动 Docker Compose：
```
docker-compose up -d
```
Docker Compose 根据`docker-compose.yaml`定义的配置构建镜像并在后台运行容器.

容器运行成功后，同样可以通过访问 http://localhost:3001来查看部署的应用。

参考[.commitlint.config.js](./commitlint.config.js)

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

## 参与献者 ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

感谢这些出色的贡献者 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.slashspaces.com/"><img src="https://avatars.githubusercontent.com/u/143698843?v=4?s=72" width="72px;" alt="kevin"/><br /><sub><b>kevin</b></sub></a><br /><a href="#design-d3george" title="Design">🎨</a> <a href="#tool-d3george" title="Tools">🔧</a> <a href="https://github.com/d3george/slash-admin/commits?author=d3george" title="Code">💻</a> <a href="https://github.com/d3george/slash-admin/issues?q=author%3Ad3george" title="Bug reports">🐛</a> <a href="https://github.com/d3george/slash-admin/commits?author=d3george" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ydiego"><img src="https://avatars.githubusercontent.com/u/13268002?v=4?s=72" width="72px;" alt="YDiego"/><br /><sub><b>YDiego</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=ydiego" title="Code">💻</a> <a href="https://github.com/d3george/slash-admin/issues?q=author%3Aydiego" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fuxiaochen.com/"><img src="https://avatars.githubusercontent.com/u/65325004?v=4?s=72" width="72px;" alt="付小晨"/><br /><sub><b>付小晨</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=aifuxi" title="Code">💻</a> <a href="https://github.com/d3george/slash-admin/issues?q=author%3Aaifuxi" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xinmans"><img src="https://avatars.githubusercontent.com/u/2713008?v=4?s=72" width="72px;" alt="xinmans"/><br /><sub><b>xinmans</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=xinmans" title="Code">💻</a> <a href="#tool-xinmans" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stitchLau"><img src="https://avatars.githubusercontent.com/u/52861440?v=4?s=72" width="72px;" alt="stitch"/><br /><sub><b>stitch</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=stitchLau" title="Code">💻</a> <a href="https://github.com/d3george/slash-admin/issues?q=author%3AstitchLau" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ntscshen"><img src="https://avatars.githubusercontent.com/u/21041458?v=4?s=72" width="72px;" alt="ntscshen"/><br /><sub><b>ntscshen</b></sub></a><br /><a href="#tool-ntscshen" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/298977887"><img src="https://avatars.githubusercontent.com/u/127030474?v=4?s=72" width="72px;" alt="298977887"/><br /><sub><b>298977887</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=298977887" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.yuque.com/eternallycyf"><img src="https://avatars.githubusercontent.com/u/63464198?v=4?s=72" width="72px;" alt="eternallycyf"/><br /><sub><b>eternallycyf</b></sub></a><br /><a href="#tool-eternallycyf" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hugepizza"><img src="https://avatars.githubusercontent.com/u/23519941?v=4?s=72" width="72px;" alt="lei"/><br /><sub><b>lei</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/issues?q=author%3Ahugepizza" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fliu2476"><img src="https://avatars.githubusercontent.com/u/19582252?v=4?s=72" width="72px;" alt="fliu2476"/><br /><sub><b>fliu2476</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/issues?q=author%3Afliu2476" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chenyuxi2002"><img src="https://avatars.githubusercontent.com/u/59554586?v=4?s=72" width="72px;" alt="tzcat8"/><br /><sub><b>tzcat8</b></sub></a><br /><a href="https://github.com/d3george/slash-admin/commits?author=chenyuxi2002" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
