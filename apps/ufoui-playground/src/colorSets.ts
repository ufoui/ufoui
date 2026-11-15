import { ThemeCustomColors } from '@ufoui/core';

export const colorSets: { seedColor?: string; colors: ThemeCustomColors }[] = [
    {
        colors: {
            blue: '#0057FF',
            red: '#FF5252',
            brandBlue: {
                main: { light: '#0057FF', dark: '#0057FF' },
                fixed: { light: '#0057FF', dark: '#0057FF' },
            },
            brandBlueYellow: {
                main: {
                    light: { color: '#0057FF', on: '#FFD600' },
                    dark: { color: '#0057FF', on: '#FFD600' },
                },
            },
            brandRed: {
                main: { light: '#FF5252', dark: '#FF5252' },
                fixed: { light: '#FF5252', dark: '#FF5252' },
            },
        },
    },
    {
        seedColor: '#2f9e72',
        colors: {
            brand: { main: { light: '#62d4a2', dark: '#62d4a2' } },
            warning: { main: { light: '#8f6a00', dark: '#ffd56a' } },
            action: {
                main: {
                    light: { color: '#2d9d6c', on: '#ffffff' },
                    dark: { color: '#2d9d6c', on: '#ffffff' },
                },
            },
        },
    },
];
