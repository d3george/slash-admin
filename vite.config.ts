import path from "node:path";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tsconfigPaths from "vite-tsconfig-paths";

// ... existing imports ...

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const base = env.VITE_APP_BASE_PATH || "/";
	const isProduction = mode === "production";

	return {
		base,
		plugins: [
			react({
				// 添加 React 插件的优化配置
				babel: {
					parserOpts: {
						plugins: ["decorators-legacy", "classProperties"],
					},
				},
			}),
			vanillaExtractPlugin({
				identifiers: ({ debugId }) => `${debugId}`,
			}),
			tsconfigPaths(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]",
			}),
			isProduction &&
				visualizer({
					open: true,
					gzipSize: true,
					brotliSize: true,
					template: "treemap", // 使用树形图更直观
				}),
		].filter(Boolean),

		server: {
			open: true,
			host: true,
			port: 3001,
			proxy: {
				"/api": {
					target: "http://localhost:3000",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					secure: false,
				},
			},
		},

		build: {
			target: "esnext",
			minify: "esbuild",
			sourcemap: !isProduction,
			cssCodeSplit: true,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					manualChunks: {
						"vendor-core": ["react", "react-dom", "react-router"],
						"vendor-ui": ["antd", "@ant-design/icons", "@ant-design/cssinjs", "framer-motion", "styled-components"],
						"vendor-utils": ["axios", "dayjs", "i18next", "zustand", "@iconify/react"],
						"vendor-charts": ["apexcharts", "react-apexcharts"],
					},
				},
			},
		},

		// 优化依赖预构建
		optimizeDeps: {
			include: ["react", "react-dom", "react-router", "antd", "@ant-design/icons", "axios", "dayjs"],
			exclude: ["@iconify/react"], // 排除不需要预构建的依赖
		},

		// esbuild 优化配置
		esbuild: {
			drop: isProduction ? ["console", "debugger"] : [],
			legalComments: "none",
			target: "esnext",
		},
	};
});
