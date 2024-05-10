<div align="center"> 
<br> 
<br>
<img src="./src/assets/images/logo.png" height="140" />
<h1> Slash Admin </h1>
<p style="font-size: 14px">
  Slash Admin is a modern admin dashboard template built with React 18, Vite, Ant Design, and TypeScript. It is designed to help developers quickly create powerful admin management systems.
</p>
</div>

**English** | [中文](./README.zh-CN.md)

##  Sponsor
<div style="display: flex; gap: 50px"> 
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/weixin.jpg" >
  <img style="width:300px" src="https://d3george.github.io/github-static/pay/buymeacoffee.png" />
</div>

## Preview
+ https://admin.slashspaces.com/

|![login.png](https://d3george.github.io/github-static/slash-admin/login.jpeg)|![login_dark.png](https://d3george.github.io/github-static/slash-admin/login_dark.jpeg)
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
|![analysis.png](https://d3george.github.io/github-static/slash-admin/analysis.png)|![workbench.png](https://d3george.github.io/github-static/slash-admin/workbench.png)

## Features

- Built using React 18 hooks.
- Powered by Vite for rapid development and hot module replacement.
- Integrates Ant Design, providing a rich set of UI components and design patterns.
- Written in TypeScript, offering type safety and an improved development experience.
- Responsive design, adapting to various screen sizes and devices.
- Flexible routing configuration, supporting nested routes.
- Integrated access control based on user roles.
- Supports internationalization for easy language switching.
- Includes common admin features like user management, role management, and permission management.
- Customizable themes and styles to meet your branding needs.
- Mocking solution based on MSW and Faker.js.
- State management using Zustand.
- Data fetching using React-Query.

## Document
[Document](https://docs-admin.slashspaces.com/)

## Quick Start

### Get the Project Code

```bash
git clone https://github.com/d3george/slash-admin.git
```

### Install Dependencies

In the project's root directory, run the following command to install project dependencies:

```bash
pnpm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
pnpm dev
```

Visit [http://localhost:3001](http://localhost:3001) to view your application.

### Build for Production

Run the following command to build the production version:

```bash
pnpm build
```

## Docker deployment


### Build image and Run container
#### build image
Enter the project root directory in the terminal and execute the following command to build the Docker image:
```
docker build -t your-image-name .
```
Make sure to replace `your-image-name` with your own image name 

#### run container
Run your application in the Docker container using the following command:
```
docker run -p 3001:80 your-image-name
```
This will run your application on port `80`(exposed in `Dockerfile`) of the container and map it to port `3001` on your host.

Now you can access http://localhost:3001 to view the deployed applications.

### use docker-compose.yaml
Enter the project root directory in the terminal and execute the following command to start Docker Compose:
```
docker-compose up -d
```
Docker Compose will build an image based on the configuration defined by 'docker-compose. yaml' and run the container in the background.

After the container runs successfully, it can also be accessed through http://localhost:3001 To view the deployed applications.


## Git Contribution submission specification

reference[.commitlint.config.js](./commitlint.config.js)

- `feat` new features
- `fix`  fix the
- `docs` documentation or comments
- `style` code format (changes that do not affect code execution)
- `refactor` refactor
- `perf` performance optimization
- `revert` revert commit
- `test` test related
- `chore` changes in the construction process or auxiliary tools
- `ci` modify CI configuration and scripts
- `types` type definition file changes
- `wip` in development

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

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
