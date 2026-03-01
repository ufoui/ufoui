import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import { Menu, MenuItem, Nav } from '@ufoui/core';

import { appRoutes } from './routes';

export const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Nav className="w-[180px] pb-[100px] pt-5" color="surfaceContainer" direction="col" fullHeight position="fixed">
            <Menu className="h-full w-full [&>div.uui-menu-scroll]:max-h-full" docked elevation={0} open shape="square">
                {appRoutes
                    .filter(route => route.showInNav)
                    .map(route => {
                        const Icon = route.icon;

                        return (
                            <MenuItem
                                className="w-[170px] px-2"
                                icon={Icon ? <Icon /> : undefined}
                                key={route.path}
                                label={route.label}
                                onClick={() => navigate(route.path)}
                                selected={route.path === location.pathname}
                            />
                        );
                    })}
            </Menu>
        </Nav>
    );
};
