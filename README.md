# 302-AI-Tool

## 项目简介

`302-AI-Tool` 是一个基于 Next.js 的 Web 项目，使用302.AI的 `302-Dev-Kit` 模板搭建的生产级AI工具应用集合。

## 功能特性

- **组件化开发**: 项目结构清晰，组件划分明确，包括公共组件、表单组件、全局组件和基础组件。
- **状态管理**: 使用 Zustand 进行状态管理。
- **国际化支持**: 内置多语言支持（中文、英文、日文）。
- **丰富的工具函数**: 包含 API 请求、鉴权、事件派发等工具函数。
- **代码规范**: 使用 ESLint 和 Prettier 进行代码检查和格式化。

## 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/302ai/302-AI-Tool
   ```

2. 安装依赖：

   ```bash
   cd 302-AI-Tool
   npm install
   ```

## 脚本命令

- `npm run build`：构建生产环境。
- `npm run dev`：启动开发环境。
- `npm run lint`：运行 ESLint 进行代码检查。
- `npm run start`：启动生产环境。
- `npm run clean`：清理生成的构建文件。
- `npm run check`：检查代码格式。
- `npm run format`：格式化代码。

## 开发指南

### 启动开发环境

```bash
npm run dev
```

### 构建生产环境

```bash
npm run build
```

## 代码风格和规范

使用 ESLint 进行代码检查，Prettier 进行代码格式化。请在提交代码前确保代码通过检查和格式化。

```bash
npm run lint
npm run format
```

## 国际化

项目支持多种语言，当前支持中文、英文和日文。语言文件存储在 `src/locales` 目录下。

## License

此项目使用 MIT 许可证。
