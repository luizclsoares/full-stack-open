const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Luiz Lopes",
        username: "luizclsoares",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("luizclsoares");
      await page.getByTestId("password").fill("password");
      await page.getByRole("button", { name: "Submit" }).click();
      await expect(page.getByText("Luiz Lopes logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("luizclsoares");
      await page.getByTestId("password").fill("passwordd");
      await page.getByRole("button", { name: "Submit" }).click();

      await expect(page.getByText("Wrong username or password")).toBeVisible();
      await expect(page.getByText("Luiz Lopes logged in")).not.toBeVisible();
    });
  });
});
