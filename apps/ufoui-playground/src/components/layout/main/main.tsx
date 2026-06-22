import { Outlet } from 'react-router-dom';

import { Div, Flex, Main as UiMain } from '@ufoui/core';

import { Navigation } from '../../../navigation';

export const Main = () => {
    return (
        <UiMain fullWidth grow pt={56} style={{ overflow: 'auto' }}>
            <Flex minHeight="100%">
                <Navigation />
                <Div grow maxHeight="100%" ml={180} p={20}>
                    <Outlet />
                </Div>
            </Flex>
        </UiMain>
    );
};
