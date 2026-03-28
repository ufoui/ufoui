import { Header, Nav } from '@ufoui/core';

import LightModeButton from '../lightModeButton';

const AppHeader = () => {
    return (
        <Header alignItems="center" className="fixed z-20" color="surfaceContainer" elevation={1} wf>
            <Nav alignItems="center" className="h-14" justifyContent="right" px={20} wf>
                <LightModeButton />
            </Nav>
        </Header>
    );
};

export default AppHeader;
