import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { ThemeProvider } from '@ufoui/core';

import { Layout } from './components/layout/layout';
import { CheckboxPage } from './pages/checkboxPage';
import { paths } from './components/layout/main/paths';
import ReactHookFormYupPage from './pages/reactHookFormYupPage';
import { RadioPage } from './pages/radioPage';
import { ButtonPage } from './pages/buttonPage';
import ColorPage from './pages/colorPage';
import { FieldPage } from './pages/fieldPage';
import { FabPage } from './pages/fabPage';
import { MenuPage } from './pages/menuPage';
import { BadgePage } from './pages/badgePage';
import { TooltipPage } from './pages/tooltipPage';
import { IconButtonPage } from './pages/iconButtonPage';
import { ChipPage } from './pages/chipPage';
import DialogPage from './pages/dialogPage';
import { BoxPage } from './pages/boxPage';
import SpinnerPage from './pages/spinnerPage';
import AnimationPage from './pages/animationPage';
import ListPage from './pages/listPage';
import { SwitchPage } from './pages/switchPage';
import { StartPage } from './pages/startPage';
// import { FlexPage } from './pages/flexPage';
// seedColor="#204080"
const App = () => {
  // const test = new NavbarScrollShadow('button');
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route element={<CheckboxPage />} path={paths.checkbox} />
            <Route element={<SwitchPage />} path={paths.switch} />
            <Route element={<RadioPage />} path={paths.radio} />
            <Route element={<ReactHookFormYupPage />} path={paths.start} />
            <Route element={<ButtonPage />} path={paths.button} />
            <Route element={<FieldPage />} path={paths.input} />
            <Route element={<FabPage />} path={paths.fab} />
            <Route element={<IconButtonPage />} path={paths.iconButton} />
            <Route element={<ChipPage />} path={paths.chip} />
            <Route element={<MenuPage />} path={paths.menu} />
            <Route element={<BadgePage />} path={paths.badge} />
            <Route element={<TooltipPage />} path={paths.tooltip} />
            <Route element={<DialogPage />} path={paths.dialog} />
            <Route element={<BoxPage />} path={paths.box} />
            <Route element={<SpinnerPage />} path={paths.spinner} />
            <Route element={<AnimationPage />} path={paths.animation} />
            <Route element={<ListPage />} path={paths.list} />
            <Route element={<ColorPage />} path={paths.color} />
            <Route
              element={<Navigate replace to="." />}
              path={paths.catchAll}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
