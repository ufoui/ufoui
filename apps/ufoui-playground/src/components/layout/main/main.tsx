import { Outlet } from 'react-router-dom';

import { Navigation } from '../../../navigation';

export const Main = () => {
    return (
        <main className="flex w-full grow flex-col overflow-auto pt-14">
            <div className="flex min-h-full">
                <Navigation />
                <div className="ml-[180px] max-h-full grow p-5">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};
