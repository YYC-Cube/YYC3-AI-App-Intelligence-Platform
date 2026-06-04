/* eslint-disable no-console */
import { devices, expect, test } from '@playwright/test';

// 桌面视图 - Desktop
test.describe('桌面视图 (Desktop)', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('应该在桌面上正确显示完整布局', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const headerBox = await header.boundingBox();
    expect(headerBox?.width).toBeGreaterThan(1000);

    await expect(page.locator('h1')).toBeVisible();
  });

  test('导航标签应该水平排列', async ({ page }) => {
    await page.goto('/');

    const tabsContainer = page.locator('header').locator('div').nth(2);

    const firstTab = tabsContainer.locator('button').first();
    const lastTab = tabsContainer.locator('button').last();

    const firstBox = await firstTab.boundingBox();
    const lastBox = await lastTab.boundingBox();

    if (firstBox && lastBox) {
      expect(Math.abs(firstBox.y - lastBox.y)).toBeLessThan(50);
      expect(lastBox.x).toBeGreaterThan(firstBox.x);
    }
  });
});

// 平板视图 - Tablet
test.describe('平板视图 (Tablet)', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('应该适配平板屏幕尺寸', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();

    await expect(page.locator('h1')).toBeVisible();

    const tabs = page.locator('header button');
    const count = await tabs.count();
    expect(count).toBe(4);
  });

  test('内容不应该水平溢出', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});

// 移动端视图 - Mobile
test.describe('移动端视图 (Mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 }, userAgent: devices['iPhone 12'].userAgent });

  test('应该在移动设备上正确显示', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();

    const onlineStatus = page.locator('text=在线');
    const isZhVisible = await onlineStatus.isVisible().catch(() => false);

    if (!isZhVisible) {
      await expect(page.locator('text=Online')).toBeVisible();
    } else {
      await expect(onlineStatus).toBeVisible();
    }
  });

  test('导航标签应该可以滚动或自适应', async ({ page }) => {
    await page.goto('/');

    const tabs = page.locator('header button');
    const count = await tabs.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      const tab = tabs.nth(i);
      await expect(tab).toBeVisible();
    }
  });

  test('触摸交互应该正常工作', async ({ page }) => {
    await page.goto('/');

    const chatTab = page
      .locator('button:has-text("对话")')
      .or(page.locator('button:has-text("Chat")'));

    await chatTab.tap();

    await expect(chatTab).toHaveClass(/bg-white/, { timeout: 3000 });
  });
});

// 大屏视图 - Large Screen
test.describe('大屏视图 (Large Screen)', () => {
  test.use({ viewport: { width: 2560, height: 1440 } });

  test('应该在4K屏幕上正确渲染', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('header')).toBeVisible();

    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    const mainBox = await mainContent.boundingBox();
    expect(mainBox?.width).toBeGreaterThan(2000);
  });
});

// 字体大小响应式 - Font Size Responsive
test.describe('字体大小响应式', () => {
  test('字体大小应该在不同视口下合理调整', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const titleH1 = page.locator('h1');
    const mobileFontSize = await titleH1.evaluate((el) => window.getComputedStyle(el).fontSize);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();

    const desktopFontSize = await titleH1.evaluate((el) => window.getComputedStyle(el).fontSize);

    console.log(`📱 移动端字体大小: ${mobileFontSize}`);
    console.log(`🖥️ 桌面端字体大小: ${desktopFontSize}`);

    const mobileSize = parseFloat(mobileFontSize);
    const desktopSize = parseFloat(desktopFontSize);

    expect(mobileSize).toBeGreaterThan(16);
    expect(desktopSize).toBeGreaterThan(20);
  });
});
