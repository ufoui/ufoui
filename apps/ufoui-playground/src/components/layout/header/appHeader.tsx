import { Header, Nav } from '@ufoui/core';

import LightModeButton from '../lightModeButton';

const AppHeader = () => {
  return (
    <Header
      alignItems="center"
      className="fixed z-20"
      color="surfaceContainer"
      elevation={1}
      fullWidth
    >
      <Nav
        alignItems="center"
        className="h-14"
        fullWidth
        justifyContent="right"
        px={20}
      >
        <LightModeButton />
      </Nav>
    </Header>
  );
};

export default AppHeader;
