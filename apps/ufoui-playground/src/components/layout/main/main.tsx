import { Outlet } from 'react-router-dom';

import { Navigation } from '../../../navigation';

export const Main = () => {
    return (
        <main className="mt-14 flex w-full grow flex-col overflow-auto">
            <div className="flex min-h-full">
                <Navigation />
                <div className="ml-[180px] max-h-full grow p-5">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};
