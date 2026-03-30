import { Flex } from '@ufoui/core';

import AppHeader from './header/appHeader';
import { Main } from './main/main';

export const Layout = () => {
    return (
        <Flex className="h-screen w-screen" direction="col" font="bodyMedium">
            <AppHeader />
            <Main />
        </Flex>
    );
};
