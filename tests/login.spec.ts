import { expect, test } from "@playwright/test";

test("shows the login page", async ({ page }) => {
	await page.goto("/auth/login");

	await expect(page).toHaveTitle(/Slash Admin/i);
	await expect(page.getByRole("heading", { name: /Login to your account/i })).toBeVisible();
	await expect(page.getByLabel(/Username/i)).toBeVisible();
	await expect(page.getByLabel(/Password/i)).toBeVisible();
});

test("can login with valid credentials", async ({ page }) => {
	await page.goto("/auth/login");

	await page.getByLabel(/Username/i).fill("admin");
	await page.getByLabel(/Password/i).fill("demo1234");
	await page.getByRole("button", { name: /^Sign in$/i }).click();

	await expect(page).toHaveURL("/workbench");
	await expect(page.getByRole("heading", { name: /Explore Redesigned Slash Admin/i })).toBeVisible();
});

test("shows error message with invalid credentials", async ({ page }) => {
	await page.goto("/auth/login");

	await page.getByLabel(/Username/i).fill("a123");
	await page.getByLabel(/Password/i).fill("123");
	await page.getByRole("button", { name: /^Sign in$/i }).click();

	await expect(page.getByText(/Incorrect username or password\./i)).toBeVisible();
});
