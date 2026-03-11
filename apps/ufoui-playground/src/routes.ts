import { ComponentType } from 'react';
import { IconType } from 'react-icons';
import {
    LuAppWindow,
    LuBadgeCheck,
    LuBell,
    LuBox,
    LuChevronDown,
    LuCircleDot,
    LuCirclePlus,
    LuHouse,
    LuLayers,
    LuList,
    LuListCollapse,
    LuLoader,
    LuMenu,
    LuMessageSquare,
    LuPalette,
    LuRectangleHorizontal,
    LuSparkles,
    LuSquareCheck,
    LuSquareCode,
    LuStar,
    LuTag,
    LuTextCursor,
    LuToggleLeft,
    LuTrendingUp,
    LuUser,
    LuWrench,
} from 'react-icons/lu';

import { paths } from './paths';
import { StartPage } from './pages/startPage';
import { CheckboxPage } from './pages/checkboxPage';
import { SwitchPage } from './pages/switchPage';
import { RadioPage } from './pages/radioPage';
import { ButtonPage } from './pages/buttonPage';
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
import { ListPage } from './pages/listPage';
import { CollapsePage } from './pages/collapsePage';
import { AccordionPage } from './pages/accordionPage';
import { TabsPage } from './pages/tabsPage';
import { ToolbarPage } from './pages/toolbarPage';
import { ProgressPage } from './pages/progressPage';
import { ToastPage } from './pages/toastPage';
import { AvatarPage } from './pages/avatarPage';
import { RatingPage } from './pages/rating';
import { CalendarPage } from './pages/calendarPage';
import ColorPage from './pages/colorPage';

export interface AppRoute {
    label: string;
    path: string;
    component: ComponentType;
    icon?: IconType;
    showInNav?: boolean;
}

export const appRoutes: AppRoute[] = [
    { label: 'Home', path: paths.start, component: StartPage, icon: LuHouse, showInNav: true },

    { label: 'Accordion', path: paths.accordion, component: AccordionPage, icon: LuListCollapse, showInNav: true },
    { label: 'Tabs', path: paths.tabs, component: TabsPage, icon: LuAppWindow, showInNav: true },
    { label: 'Collapse', path: paths.collapse, component: CollapsePage, icon: LuChevronDown, showInNav: true },

    { label: 'Button', path: paths.button, component: ButtonPage, icon: LuRectangleHorizontal, showInNav: true },
    { label: 'Icon Button', path: paths.iconButton, component: IconButtonPage, icon: LuSquareCode, showInNav: true },
    { label: 'Fab', path: paths.fab, component: FabPage, icon: LuCirclePlus, showInNav: true },
    { label: 'Chip', path: paths.chip, component: ChipPage, icon: LuTag, showInNav: true },

    { label: 'Checkbox', path: paths.checkbox, component: CheckboxPage, icon: LuSquareCheck, showInNav: true },
    { label: 'Radio', path: paths.radio, component: RadioPage, icon: LuCircleDot, showInNav: true },
    { label: 'Switch', path: paths.switch, component: SwitchPage, icon: LuToggleLeft, showInNav: true },

    { label: 'TextField', path: paths.textField, component: FieldPage, icon: LuTextCursor, showInNav: true },

    { label: 'Menu', path: paths.menu, component: MenuPage, icon: LuMenu, showInNav: true },
    { label: 'List', path: paths.list, component: ListPage, icon: LuList, showInNav: true },
    { label: 'Toolbar', path: paths.toolbar, component: ToolbarPage, icon: LuWrench, showInNav: true },

    { label: 'Badge', path: paths.badge, component: BadgePage, icon: LuBadgeCheck, showInNav: true },
    { label: 'Tooltip', path: paths.tooltip, component: TooltipPage, icon: LuMessageSquare, showInNav: true },
    { label: 'Dialog', path: paths.dialog, component: DialogPage, icon: LuLayers, showInNav: true },

    { label: 'Box', path: paths.box, component: BoxPage, icon: LuBox, showInNav: true },
    { label: 'Spinner', path: paths.spinner, component: SpinnerPage, icon: LuLoader, showInNav: true },
    { label: 'Animation', path: paths.animation, component: AnimationPage, icon: LuSparkles, showInNav: true },

    { label: 'Progress', path: paths.progress, component: ProgressPage, icon: LuTrendingUp, showInNav: true },
    { label: 'Toast', path: paths.toast, component: ToastPage, icon: LuBell, showInNav: true },

    { label: 'Avatar', path: paths.avatar, component: AvatarPage, icon: LuUser, showInNav: true },
    { label: 'Rating', path: paths.rating, component: RatingPage, icon: LuStar, showInNav: true },
    { label: 'Calendar', path: paths.calendar, component: CalendarPage, icon: LuSquareCode, showInNav: true },

    { label: 'Color', path: paths.color, component: ColorPage, icon: LuPalette, showInNav: true },
];
