import { Header, Nav } from '@ufoui/core';

import LightModeButton from '../lightModeButton';

const AppHeader = () => {
    return (
        <Header alignItems="center" color="surfaceContainer" elevation={1} fullWidth position="fixed" zIndex={20}>
            <Nav alignItems="center" fullWidth height={56} justifyContent="right" px={20}>
                <LightModeButton />
            </Nav>
        </Header>
    );
};

export default AppHeader;
