import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { IconButton, useTheme } from '@ufoui/core';

const LightModeButton = () => {
  const { theme, setDarkMode } = useTheme();
  return (
    <IconButton
      icon={theme.darkMode ? <MdLightMode /> : <MdDarkMode />}
      onClick={() => {
        setDarkMode(!theme.darkMode);
      }}
      title={theme.darkMode ? 'Light Mode' : 'Dark Mode'}
    ></IconButton>
  );
};

export default LightModeButton;
