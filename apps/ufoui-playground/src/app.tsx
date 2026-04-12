import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeProvider } from '@ufoui/core';

import { Layout } from './components/layout/layout';
import { paths } from './paths';
import { appRoutes } from './routes';

const App = () => {
    return (
        <ThemeProvider colors={{ myBlue: '#0000ff' }}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        {appRoutes.map(route => {
                            const Component = route.component;
                            return <Route element={<Component />} key={route.path} path={route.path} />;
                        })}

                        <Route element={<Navigate replace to={paths.start} />} path={paths.catchAll} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
