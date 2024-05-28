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
