import { Outlet } from 'react-router-dom';

import { Navigation } from './navigation';

export const Main = () => {
    return (
        <main className="mt-14 flex w-full grow flex-col overflow-auto">
            <div className="flex h-full">
                <Navigation />
                <div className="mt-5 max-h-full grow">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};
