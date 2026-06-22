import { Stack } from '@ufoui/core';

import AppHeader from './header/appHeader';
import { Main } from './main/main';

export const Layout = () => {
    return (
        <Stack font="bodyMedium" height="100vh" width="100vw">
            <AppHeader />
            <Main />
        </Stack>
    );
};
