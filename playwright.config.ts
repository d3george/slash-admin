import process from "node:process";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "list",
	use: {
		baseURL: "http://127.0.0.1:3001",
		trace: "on-first-retry",
	},
	webServer: {
		command: "pnpm dev --host 127.0.0.1 --port 3001",
		url: "http://127.0.0.1:3001",
		reuseExistingServer: !process.env.CI,
		timeout: 120000,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
