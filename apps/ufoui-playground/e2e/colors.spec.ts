import { expect, test } from '@playwright/test';

const fixedColors = {
  light: {
    'uui-bg-surface': '#fdf8fd',
    'uui-bg-surfaceDim': '#ddd8dd',
    'uui-bg-surfaceBright': '#fdf8fd',
    'uui-bg-surfaceContainerLowest': '#ffffff',
    'uui-bg-surfaceContainerLow': '#f7f2f7',
    'uui-bg-surfaceContainer': '#f2ecf1',
    'uui-bg-surfaceContainerHigh': '#ece7eb',
    'uui-bg-surfaceContainerHighest': '#e6e1e6',
    'uui-bg-onSurface': '#1c1b1e',
    'uui-bg-onSurfaceVariant': '#49454e',
    'uui-bg-inverseSurface': '#313033',
    'uui-bg-inverseOnSurface': '#f4eff4',
    'uui-bg-outline': '#7a757f',
    'uui-bg-outlineVariant': '#cac4cf',
    'uui-bg-inversePrimary': '#cfbcff',
    'uui-bg-scrim': '#000000',
    'uui-bg-shadow': '#000000',
    'uui-bg-surfaceTint': '#6750a4',
    'uui-bg-background': '#fffbff',
  },
  dark: {
    'uui-bg-surface': '#141316',
    'uui-bg-surfaceDim': '#141316',
    'uui-bg-surfaceBright': '#3a383c',
    'uui-bg-surfaceContainerLowest': '#0f0e11',
    'uui-bg-surfaceContainerLow': '#1c1b1e',
    'uui-bg-surfaceContainer': '#201f22',
    'uui-bg-surfaceContainerHigh': '#2b292d',
    'uui-bg-surfaceContainerHighest': '#363438',
    'uui-bg-onSurface': '#e6e1e6',
    'uui-bg-onSurfaceVariant': '#cac4cf',
    'uui-bg-inverseSurface': '#e6e1e6',
    'uui-bg-inverseOnSurface': '#313033',
    'uui-bg-outline': '#948f99',
    'uui-bg-outlineVariant': '#49454e',
    'uui-bg-inversePrimary': '#6750a4',
    'uui-bg-scrim': '#000000',
    'uui-bg-shadow': '#000000',
    'uui-bg-surfaceTint': '#cfbcff',
    'uui-bg-background': '#1c1b1e',
  },
};

const baseColors = {
  light: {
    'uui-bg-primary': '#6750a4',
    'uui-bg-secondary': '#625b71',
    'uui-bg-tertiary': '#7e5260',
    'uui-bg-error': '#ba1a1a',
    'uui-bg-info': '#0060ab',
    'uui-bg-warning': '#7c5800',
    'uui-bg-success': '#006e2b',
  },
  dark: {
    'uui-bg-primary': '#cfbcff',
    'uui-bg-secondary': '#cbc2db',
    'uui-bg-tertiary': '#efb8c8',
    'uui-bg-error': '#ffb4ab',
    'uui-bg-info': '#a3c9ff',
    'uui-bg-warning': '#f7bd48',
    'uui-bg-success': '#79db86',
  },
};

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g);
  if (!match) {
    return '';
  }
  const [r, g, b] = match.map(Number);
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toLowerCase()
  );
}

test.describe('Color Page', () => {
  test('should render the color overview correctly', async ({ page }) => {
    await page.goto('/colors');
    // Check for section headers
    await expect(page.getByText('Surface Tint').first()).toBeVisible();
  });

  test('should match all fixed colors with MD3', async ({ page }) => {
    await page.goto('/colors');
    for (const mode of ['light', 'dark'] as const) {
      for (const [className, expectedHex] of Object.entries(
        fixedColors[mode],
      )) {
        const selector = `div.${mode} div.${className}`;
        const el = page.locator(selector).first();

        await expect(el, `${mode} → ${className} not found`).toBeVisible();

        const computedRgb = await el.evaluate(
          (el) => getComputedStyle(el).backgroundColor,
        );
        const computedHex = rgbToHex(computedRgb);

        expect(computedHex, `${mode} → ${className}`).toBe(
          expectedHex.toLowerCase(),
        );
      }
    }
  });
});

test.describe('Base colors', () => {
  test('should match all brand and state colors', async ({ page }) => {
    await page.goto('/colors');
    for (const mode of ['light', 'dark'] as const) {
      for (const [className, expectedHex] of Object.entries(baseColors[mode])) {
        const selector = `div.${mode} div.${className}`;
        const el = page.locator(selector).first();

        await expect(el, `${mode} → ${className} not found`).toBeVisible();

        const computedRgb = await el.evaluate(
          (el) => getComputedStyle(el).backgroundColor,
        );
        const computedHex = rgbToHex(computedRgb);

        expect(computedHex, `${mode} → ${className}`).toBe(
          expectedHex.toLowerCase(),
        );
      }
    }
  });
});

const onColors = {
  light: {
    'uui-text-onPrimary': '#ffffff',
    'uui-text-onSecondary': '#ffffff',
    'uui-text-onTertiary': '#ffffff',
    'uui-text-onError': '#ffffff',
    'uui-text-onInfo': '#ffffff',
    'uui-text-onWarning': '#ffffff',
    'uui-text-onSuccess': '#ffffff',
  },
  dark: {
    'uui-text-onPrimary': '#381e72',
    'uui-text-onSecondary': '#332d41',
    'uui-text-onTertiary': '#4a2532',
    'uui-text-onError': '#690005',
    'uui-text-onInfo': '#00315c',
    'uui-text-onWarning': '#412d00',
    'uui-text-onSuccess': '#003913',
  },
};

test.describe('On-colors (text on color backgrounds)', () => {
  test('should match all on* colors', async ({ page }) => {
    await page.goto('/colors');
    for (const mode of ['light', 'dark'] as const) {
      for (const [className, expectedHex] of Object.entries(onColors[mode])) {
        const selector = `div.${mode} .${className}`;
        const el = page.locator(selector).first();

        await expect(el, `${mode} → ${className} not found`).toBeVisible();

        const computedRgb = await el.evaluate(
          (el) => getComputedStyle(el).color,
        );
        const computedHex = rgbToHex(computedRgb);

        expect(computedHex, `${mode} → ${className}`).toBe(
          expectedHex.toLowerCase(),
        );
      }
    }
  });
});
