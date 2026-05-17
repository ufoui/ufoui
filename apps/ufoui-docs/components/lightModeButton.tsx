'use client';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { IconButton, useTheme } from '@ufoui/core';

export function LightModeButton() {
    const { theme, setDarkMode } = useTheme();

    return (
        <IconButton
            aria-label={theme.darkMode ? 'Light Mode' : 'Dark Mode'}
            icon={theme.darkMode ? <MdLightMode /> : <MdDarkMode />}
            onClick={() => {
                setDarkMode(!theme.darkMode);
            }}
        />
    );
}
