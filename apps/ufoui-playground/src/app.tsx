import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeProvider } from '@ufoui/core';

import { Layout } from './components/layout/layout';
import { paths } from './paths';
import { appRoutes } from './routes';

// Example
declare module '@ufoui/core' {
    interface CustomColors {
        myBlue: true;
    }
    interface CustomBreakpoints {
        ufo: true;
    }
    interface CustomFonts {
        customH2: true;
    }
}

const App = () => {
    return (
        <ThemeProvider
            breakpoints={{ ufo: '1300px' }}
            colors={{ myBlue: '#0000ff' }}
            fonts={{ customH2: 'uui-font-headline-medium' }}>
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
