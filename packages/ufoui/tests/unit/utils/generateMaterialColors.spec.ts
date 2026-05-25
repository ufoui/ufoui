import { describe, expect, it } from 'vitest';

import { generateMaterialColors } from '../../../src/utils/generateMaterialColors';

declare module '../../../src/types/color' {
    interface CustomColors {
        blue: true;
        red: true;
        brandBlue: true;
        brandBlueYellow: true;
        brandRed: true;
    }
}

const seedColor = '#6750A4';

describe('generateMaterialColors — palette snapshots', () => {
    it('blue — string shorthand', () => {
        const { light, dark } = generateMaterialColors(seedColor, { blue: '#0057FF' });

        expect(light.blue).toBe('#493ef2');
        expect(light.blueContainer).toBe('#e2dfff');
        expect(light.onBlue).toBe('#ffffff');
        expect(light.onBlueContainer).toBe('#0e006a');
        expect(light.blueFixed).toBe('#e2dfff');
        expect(light.blueFixedDim).toBe('#c2c1ff');
        expect(light.onBlueFixed).toBe('#0e006a');
        expect(light.onBlueFixedVariant).toBe('#2e14dc');

        expect(dark.blue).toBe('#c2c1ff');
        expect(dark.blueContainer).toBe('#2e15db');
        expect(dark.onBlue).toBe('#1b00a6');
        expect(dark.onBlueContainer).toBe('#e2dfff');
        expect(dark.blueFixed).toBe('#e2dfff');
        expect(dark.blueFixedDim).toBe('#c2c1ff');
        expect(dark.onBlueFixed).toBe('#151448');
        expect(dark.onBlueFixedVariant).toBe('#414176');
    });

    it('red — string shorthand', () => {
        const { light, dark } = generateMaterialColors(seedColor, { red: '#FF5252' });

        expect(light.red).toBe('#b81250');
        expect(light.redContainer).toBe('#ffd9de');
        expect(light.onRed).toBe('#ffffff');
        expect(light.onRedContainer).toBe('#3f0016');
        expect(light.redFixed).toBe('#ffd9de');
        expect(light.redFixedDim).toBe('#ffb2bf');
        expect(light.onRedFixed).toBe('#3f0016');
        expect(light.onRedFixedVariant).toBe('#90003b');

        expect(dark.red).toBe('#ffb2bf');
        expect(dark.redContainer).toBe('#90003b');
        expect(dark.onRed).toBe('#660028');
        expect(dark.onRedContainer).toBe('#ffd9de');
        expect(dark.redFixed).toBe('#ffd9de');
        expect(dark.redFixedDim).toBe('#ffb2bf');
        expect(dark.onRedFixed).toBe('#380b17');
        expect(dark.onRedFixedVariant).toBe('#6d3641');
    });

    it('brandBlue — main locked light=dark', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
            },
        });

        expect(light.brandBlue).toBe('#0057FF');
        expect(light.brandBlueContainer).toBe('#e2dfff');
        expect(light.onBrandBlue).toBe('#ffffff');
        expect(light.onBrandBlueContainer).toBe('#0e006a');
        expect(light.brandBlueFixed).toBe('#0057FF');
        expect(light.brandBlueFixedDim).toBe('#c2c1ff');
        expect(light.onBrandBlueFixed).toBe('#ffffff');
        expect(light.onBrandBlueFixedVariant).toBe('#2e14dc');

        expect(dark.brandBlue).toBe('#0057FF');
        expect(dark.brandBlueContainer).toBe('#2e15db');
        expect(dark.onBrandBlue).toBe('#ffffff');
        expect(dark.onBrandBlueContainer).toBe('#e2dfff');
        expect(dark.brandBlueFixed).toBe('#0057FF');
        expect(dark.brandBlueFixedDim).toBe('#c2c1ff');
        expect(dark.onBrandBlueFixed).toBe('#ffffff');
        expect(dark.onBrandBlueFixedVariant).toBe('#414176');
    });

    it('brandBlueYellow — main with explicit on color', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlueYellow: {
                main: {
                    light: { color: '#0057FF', on: '#FFD600' },
                    dark: { color: '#0057FF', on: '#FFD600' },
                },
            },
        });

        expect(light.brandBlueYellow).toBe('#0057FF');
        expect(light.brandBlueYellowContainer).toBe('#e2dfff');
        expect(light.onBrandBlueYellow).toBe('#FFD600');
        expect(light.onBrandBlueYellowContainer).toBe('#0e006a');
        expect(light.brandBlueYellowFixed).toBe('#0057FF');
        expect(light.brandBlueYellowFixedDim).toBe('#c2c1ff');

        expect(dark.brandBlueYellow).toBe('#0057FF');
        expect(dark.brandBlueYellowContainer).toBe('#2e15db');
        expect(dark.onBrandBlueYellow).toBe('#FFD600');
        expect(dark.onBrandBlueYellowContainer).toBe('#e2dfff');
        expect(dark.brandBlueYellowFixed).toBe('#0057FF');
        expect(dark.brandBlueYellowFixedDim).toBe('#c2c1ff');
    });

    it('brandRed — main locked light=dark', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandRed: {
                main: { light: '#FF5252', dark: '#FF5252' },
            },
        });

        expect(light.brandRed).toBe('#FF5252');
        expect(light.brandRedContainer).toBe('#ffd9de');
        expect(light.onBrandRed).toBe('#410004');
        expect(light.onBrandRedContainer).toBe('#3f0016');
        expect(light.brandRedFixed).toBe('#FF5252');
        expect(light.brandRedFixedDim).toBe('#ffb2bf');
        expect(light.onBrandRedFixed).toBe('#410004');
        expect(light.onBrandRedFixedVariant).toBe('#90003b');

        expect(dark.brandRed).toBe('#FF5252');
        expect(dark.brandRedContainer).toBe('#90003b');
        expect(dark.onBrandRed).toBe('#410004');
        expect(dark.onBrandRedContainer).toBe('#ffd9de');
        expect(dark.brandRedFixed).toBe('#FF5252');
        expect(dark.brandRedFixedDim).toBe('#ffb2bf');
        expect(dark.onBrandRedFixed).toBe('#410004');
        expect(dark.onBrandRedFixedVariant).toBe('#6d3641');
    });

    it('brandBlue — main light only, dark falls back to light', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlue: {
                main: { light: '#0057FF' },
            },
        });

        expect(light.brandBlue).toBe('#0057FF');
        expect(light.onBrandBlue).toBe('#ffffff');
        expect(dark.brandBlue).toBe('#0057FF');
        expect(dark.onBrandBlue).toBe('#ffffff');

        expect(light.brandBlueFixed).toBe('#0057FF');
        expect(dark.brandBlueFixed).toBe('#0057FF');

        expect(light.brandBlueContainer).toBe('#e2dfff');
        expect(dark.brandBlueContainer).toBe('#2e15db');
    });

    it('brandBlue — fixed light only, dark falls back to light fixed', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
                fixed: { light: '#0000FF' },
            },
        });

        expect(light.brandBlueFixed).toBe('#0000FF');
        expect(light.onBrandBlueFixed).toBe('#ffffff');
        expect(dark.brandBlueFixed).toBe('#0000FF');
        expect(dark.onBrandBlueFixed).toBe('#ffffff');

        expect(light.brandBlueContainer).toBe('#e2dfff');
        expect(dark.brandBlueContainer).toBe('#2e15db');
    });

    it('brandBlueYellow — explicit on only in light, dark uses deriveOn independently', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlueYellow: {
                main: {
                    light: { color: '#0057FF', on: '#FFD600' },
                    dark: '#0057FF',
                },
            },
        });

        expect(light.brandBlueYellow).toBe('#0057FF');
        expect(light.onBrandBlueYellow).toBe('#FFD600');
        expect(dark.brandBlueYellow).toBe('#0057FF');
        expect(dark.onBrandBlueYellow).toBe('#ffffff');

        expect(light.brandBlueYellowContainer).toBe('#e2dfff');
        expect(dark.brandBlueYellowContainer).toBe('#2e15db');
    });

    it('brandBlue — fixed preserve keeps MD3 values', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
                fixed: 'preserve',
            },
        });

        expect(light.brandBlue).toBe('#0057FF');
        expect(light.onBrandBlue).toBe('#ffffff');
        expect(dark.brandBlue).toBe('#0057FF');
        expect(dark.onBrandBlue).toBe('#ffffff');

        expect(light.brandBlueFixed).toBe('#e2dfff');
        expect(light.onBrandBlueFixed).toBe('#0e006a');
        expect(dark.brandBlueFixed).toBe('#e2dfff');
        expect(dark.onBrandBlueFixed).toBe('#151448');
    });

    it('brandBlue — fixed object override', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
                fixed: { light: '#0000FF', dark: '#0000FF' },
            },
        });

        expect(light.brandBlue).toBe('#0057FF');
        expect(light.onBrandBlue).toBe('#ffffff');
        expect(light.brandBlueFixed).toBe('#0000FF');
        expect(light.onBrandBlueFixed).toBe('#ffffff');

        expect(dark.brandBlue).toBe('#0057FF');
        expect(dark.onBrandBlue).toBe('#ffffff');
        expect(dark.brandBlueFixed).toBe('#0000FF');
        expect(dark.onBrandBlueFixed).toBe('#ffffff');
    });

    it('full app palette — all colors combined', () => {
        const { light, dark } = generateMaterialColors(seedColor, {
            blue: '#0057FF',
            red: '#FF5252',
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
            },
            brandBlueYellow: {
                main: {
                    light: { color: '#0057FF', on: '#FFD600' },
                    dark: { color: '#0057FF', on: '#FFD600' },
                },
            },
            brandRed: {
                main: { light: '#FF5252', dark: '#FF5252' },
            },
        });

        // blue — string shorthand, MD3-generated
        expect(light.blue).toBe('#493ef2');
        expect(dark.blue).toBe('#c2c1ff');
        expect(light.onBlue).toBe('#ffffff');
        expect(dark.onBlue).toBe('#1b00a6');

        // red — string shorthand, MD3-generated
        expect(light.red).toBe('#b81250');
        expect(dark.red).toBe('#ffb2bf');
        expect(light.onRed).toBe('#ffffff');
        expect(dark.onRed).toBe('#660028');

        // brandBlue — exact color override, on derived from luminance
        expect(light.brandBlue).toBe('#0057FF');
        expect(dark.brandBlue).toBe('#0057FF');
        expect(light.onBrandBlue).toBe('#ffffff');
        expect(dark.onBrandBlue).toBe('#ffffff');
        expect(light.brandBlueFixed).toBe('#0057FF');
        expect(dark.brandBlueFixed).toBe('#0057FF');

        // brandBlueYellow — exact color override, explicit on
        expect(light.brandBlueYellow).toBe('#0057FF');
        expect(dark.brandBlueYellow).toBe('#0057FF');
        expect(light.onBrandBlueYellow).toBe('#FFD600');
        expect(dark.onBrandBlueYellow).toBe('#FFD600');

        // brandRed — exact color override, on derived from luminance (tone 10 = dark)
        expect(light.brandRed).toBe('#FF5252');
        expect(dark.brandRed).toBe('#FF5252');
        expect(light.onBrandRed).toBe('#410004');
        expect(dark.onBrandRed).toBe('#410004');
        expect(light.brandRedFixed).toBe('#FF5252');
        expect(dark.brandRedFixed).toBe('#FF5252');
    });
});
