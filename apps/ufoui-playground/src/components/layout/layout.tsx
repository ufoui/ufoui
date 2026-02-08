import { Flex, getFontClass } from '@ufoui/core';

import AppHeader from './header/appHeader';
import Footer from './footer/footer';
import { Main } from './main/main';

export const Layout = () => {
  return (
    <Flex
      className={'h-screen w-screen ' + getFontClass('bodyMedium')}
      direction="col"
    >
      <AppHeader />
      <Main />
      <Footer />
    </Flex>
  );
};
