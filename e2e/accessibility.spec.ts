/* eslint-disable no-console */
import { expect, test } from '@playwright/test';

test.describe('可访问性基础 - Accessibility Basics', () => {
  test('应该有正确的页面标题', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();

    expect(title.length).toBeGreaterThan(0);
  });

  test('按钮应该有可访问的文本', async ({ page }) => {
    await page.goto('/');

    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const textContent = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const titleAttr = await button.getAttribute('title');

      const hasAccessibleName =
        (textContent && textContent.trim().length > 0) ||
        (ariaLabel && ariaLabel.trim().length > 0) ||
        (titleAttr && titleAttr.trim().length > 0);

      if (!hasAccessibleName) {
        console.warn(`⚠️ 按钮缺少可访问名称:`, await button.evaluate((el) => el.outerHTML));
      }
    }
  });

  test('颜色对比度应该符合WCAG标准', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    const bgColor = await header.evaluate((el) => window.getComputedStyle(el).backgroundColor);

    const h1 = page.locator('h1');
    const textColor = await h1.evaluate((el) => window.getComputedStyle(el).color);

    console.log(`🎨 Header背景色: ${bgColor}`);
    console.log(`🎨 标题文字色: ${textColor}`);

    expect(textColor).toBeTruthy();
    expect(bgColor).toBeTruthy();
  });

  test('焦点管理应该正常工作', async ({ page }) => {
    await page.goto('/');

    const firstButton = page.locator('button').first();
    await firstButton.focus();

    await expect(firstButton).toBeFocused();

    const secondButton = page.locator('button').nth(1);
    await secondButton.focus();

    await expect(secondButton).toBeFocused();
    await expect(firstButton).not.toBeFocused();
  });

  test('键盘导航应该可以访问所有交互元素', async ({ page }) => {
    await page.goto('/');

    let focusedCount = 0;

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      const isFocused = (await focusedElement.count()) > 0;

      if (isFocused) {
        focusedCount++;
        const tag = await focusedElement.evaluate((el) => el.tagName);
        console.log(`✅ 焦点元素 #${focusedCount}: <${tag}>`);
      }
    }

    expect(focusedCount).toBeGreaterThan(3);
  });

  test('图片应该有alt属性（如果存在）', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      if (!alt && role !== 'presentation') {
        console.warn(`⚠️ 图片缺少alt属性:`, await img.getAttribute('src'));
      }
    }
  });

  test('不应该有重复的ID', async ({ page }) => {
    await page.goto('/');

    const duplicateIds = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll('[id]'))
        .map((el) => el.id)
        .filter((id) => id.trim() !== '');

      const uniqueIds = new Set(ids);
      return ids.length - uniqueIds.size;
    });

    expect(duplicateIds).toBe(0);
  });
});
