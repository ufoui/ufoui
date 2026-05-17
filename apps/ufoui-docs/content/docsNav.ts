export interface DocsNavItem {
    title: string;
    href?: string;
    items?: DocsNavItem[];
    status?: 'stable' | 'beta' | 'planned';
}

export const docsNav: DocsNavItem[] = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '/en/docs' },
            { title: 'Installation', href: '/en/docs/getting-started/installation' },
            { title: 'Quick Start', href: '/en/docs/getting-started/quick-start' },
            { title: 'Theming', href: '/en/docs/getting-started/theming' },
        ],
    },
    {
        title: 'Foundations',
        items: [
            { title: 'Colors', href: '/en/docs/foundations/colors' },
            { title: 'Typography', href: '/en/docs/foundations/typography' },
            { title: 'Spacing', href: '/en/docs/foundations/spacing' },
            { title: 'Accessibility', href: '/en/docs/foundations/accessibility' },
        ],
    },
    {
        title: 'Components',
        items: [
            {
                title: 'Actions',
                items: [
                    { title: 'Button', href: '/en/docs/components/actions/button', status: 'stable' },
                    { title: 'Icon Button', href: '/en/docs/components/actions/icon-button', status: 'stable' },
                    { title: 'FAB', href: '/en/docs/components/actions/fab', status: 'stable' },
                    { title: 'Toggle Button', href: '/en/docs/components/actions/toggle-button', status: 'stable' },
                ],
            },
            {
                title: 'Inputs',
                items: [
                    { title: 'Text Field', href: '/en/docs/components/inputs/text-field', status: 'stable' },
                    { title: 'Select', href: '/en/docs/components/inputs/select', status: 'stable' },
                    { title: 'Checkbox', href: '/en/docs/components/inputs/checkbox', status: 'stable' },
                    { title: 'Radio', href: '/en/docs/components/inputs/radio', status: 'stable' },
                    { title: 'Switch', href: '/en/docs/components/inputs/switch', status: 'stable' },
                    { title: 'Slider', href: '/en/docs/components/inputs/slider', status: 'stable' },
                ],
            },
            {
                title: 'Feedback',
                items: [
                    { title: 'Toast', href: '/en/docs/components/feedback/toast', status: 'stable' },
                    { title: 'Spinner', href: '/en/docs/components/feedback/spinner', status: 'stable' },
                    { title: 'Progress', href: '/en/docs/components/feedback/progress', status: 'stable' },
                ],
            },
            {
                title: 'Overlays',
                items: [
                    { title: 'Dialog', href: '/en/docs/components/overlays/dialog', status: 'stable' },
                    { title: 'Tooltip', href: '/en/docs/components/overlays/tooltip', status: 'stable' },
                ],
            },
            {
                title: 'Navigation',
                items: [
                    { title: 'Tabs', href: '/en/docs/components/navigation/tabs', status: 'stable' },
                    { title: 'Breadcrumbs', href: '/en/docs/components/navigation/breadcrumbs', status: 'stable' },
                    { title: 'Menu', href: '/en/docs/components/navigation/menu', status: 'stable' },
                ],
            },
            {
                title: 'Data Display',
                items: [
                    { title: 'Badge', href: '/en/docs/components/data-display/badge', status: 'stable' },
                    { title: 'Avatar', href: '/en/docs/components/data-display/avatar', status: 'stable' },
                    { title: 'Card', href: '/en/docs/components/data-display/card', status: 'stable' },
                    { title: 'List', href: '/en/docs/components/data-display/list', status: 'stable' },
                    { title: 'Rating', href: '/en/docs/components/data-display/rating', status: 'stable' },
                ],
            },
            {
                title: 'Layout',
                items: [
                    { title: 'Grid', href: '/en/docs/components/layout/grid', status: 'stable' },
                    { title: 'Flex', href: '/en/docs/components/layout/flex', status: 'stable' },
                    { title: 'Divider', href: '/en/docs/components/layout/divider', status: 'stable' },
                    { title: 'Toolbar', href: '/en/docs/components/layout/toolbar', status: 'stable' },
                ],
            },
        ],
    },
    {
        title: 'Hooks',
        items: [
            { title: 'Overview', href: '/en/docs/hooks' },
            { title: 'useTheme', href: '/en/docs/hooks/use-theme' },
            { title: 'useResponsive', href: '/en/docs/hooks/use-responsive' },
            { title: 'useAnimate', href: '/en/docs/hooks/use-animate' },
            { title: 'useMotion', href: '/en/docs/hooks/use-motion' },
            { title: 'useClickOutside', href: '/en/docs/hooks/use-click-outside' },
            { title: 'useEscapeHandler', href: '/en/docs/hooks/use-escape-handler' },
            { title: 'useFocusTrap', href: '/en/docs/hooks/use-focus-trap' },
            { title: 'useFocusVisible', href: '/en/docs/hooks/use-focus-visible' },
            { title: 'useResizeObserver', href: '/en/docs/hooks/use-resize-observer' },
            { title: 'useRovingFocus', href: '/en/docs/hooks/use-roving-focus' },
            { title: 'useSelection', href: '/en/docs/hooks/use-selection' },
            { title: 'useSelectionState', href: '/en/docs/hooks/use-selection-state' },
            { title: 'useSliderKeys', href: '/en/docs/hooks/use-slider-keys' },
            { title: 'useUpdateEffect', href: '/en/docs/hooks/use-update-effect' },
        ],
    },
    {
        title: 'Utilities',
        items: [
            { title: 'Overview', href: '/en/docs/utilities' },
            { title: 'Colors', href: '/en/docs/utilities/colors' },
            { title: 'Class Names', href: '/en/docs/utilities/classnames' },
        ],
    },
    {
        title: 'Styling',
        items: [
            { title: 'Overview', href: '/en/docs/styling' },
            { title: 'Tokens', href: '/en/docs/styling/tokens' },
            { title: 'CSS Variables', href: '/en/docs/styling/css-variables' },
            { title: 'Dark Mode', href: '/en/docs/styling/dark-mode' },
            { title: 'Density, Shape, Elevation', href: '/en/docs/styling/density-shape-elevation' },
        ],
    },
    {
        title: 'Patterns',
        items: [
            { title: 'Overview', href: '/en/docs/patterns' },
            { title: 'Forms', href: '/en/docs/patterns/forms' },
            { title: 'Overlays', href: '/en/docs/patterns/overlays' },
            { title: 'Navigation', href: '/en/docs/patterns/navigation' },
            { title: 'Empty States', href: '/en/docs/patterns/empty-states' },
        ],
    },
    {
        title: 'Examples',
        items: [
            { title: 'Overview', href: '/en/docs/examples' },
            { title: 'Settings Panel', href: '/en/docs/examples/settings-panel' },
            { title: 'Form', href: '/en/docs/examples/form' },
            { title: 'Dashboard Toolbar', href: '/en/docs/examples/dashboard-toolbar' },
            { title: 'Dialog Flow', href: '/en/docs/examples/dialog-flow' },
        ],
    },
    {
        title: 'Customization',
        items: [{ title: 'Themes', href: '/en/docs/customization/themes' }],
    },
    {
        title: 'Guides',
        items: [
            { title: 'Overview', href: '/en/docs/guides' },
            { title: 'Server Rendering', href: '/en/docs/guides/server-rendering' },
            { title: 'Versioning', href: '/en/docs/guides/versioning' },
            { title: 'Localization', href: '/en/docs/guides/localization' },
        ],
    },
    {
        title: 'API Reference',
        items: [
            { title: 'Overview', href: '/en/docs/api-reference' },
            { title: 'Components', href: '/en/docs/api-reference/components' },
            { title: 'Hooks', href: '/en/docs/api-reference/hooks' },
            { title: 'Types', href: '/en/docs/api-reference/types' },
            { title: 'Utilities', href: '/en/docs/api-reference/utilities' },
            { title: 'Theme API', href: '/en/docs/api-reference/theme' },
            { title: 'CSS API', href: '/en/docs/api-reference/css' },
        ],
    },
    {
        title: 'Testing',
        items: [
            { title: 'Overview', href: '/en/docs/testing' },
            { title: 'Component Tests', href: '/en/docs/testing/component-tests' },
            { title: 'Accessibility Tests', href: '/en/docs/testing/accessibility-tests' },
            { title: 'Visual Regression', href: '/en/docs/testing/visual-regression' },
        ],
    },
    {
        title: 'Migration',
        items: [{ title: 'Overview', href: '/en/docs/migration' }],
    },
    {
        title: 'Resources',
        items: [{ title: 'Changelog', href: '/en/docs/resources/changelog' }],
    },
];
