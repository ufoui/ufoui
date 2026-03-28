import { useMemo, useState } from 'react';
import { MdFolder, MdHome } from 'react-icons/md';

import { Article, Aside, BreadcrumbItem, Breadcrumbs, Div, H1, H2, Section, SurfaceColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const BreadcrumbsPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);

    const basicItems = useMemo<BreadcrumbItem[]>(
        () => [
            { label: 'Home', href: '/', icon: <MdHome /> },
            { label: 'Projects', href: '/projects' },
            { label: 'UFoui', href: '/projects/ufoui', icon: <MdFolder /> },
            { label: 'Components', href: '/projects/ufoui/components' },
            { label: 'Breadcrumbs', current: true },
        ],
        []
    );

    const collapsedItems = useMemo<BreadcrumbItem[]>(
        () => [
            { label: 'Home', href: '/' },
            { label: 'Level 1', href: '/l1' },
            { label: 'Level 2', href: '/l2' },
            { label: 'Level 3', href: '/l3' },
            { label: 'Level 4', href: '/l4' },
            { label: 'Level 5', href: '/l5' },
            { label: 'Current', current: true },
        ],
        []
    );

    const disabledItems = useMemo<BreadcrumbItem[]>(
        () => [
            { label: 'Home', href: '/' },
            { label: 'Disabled', href: '/disabled', disabled: true },
            { label: 'Current', current: true },
        ],
        []
    );

    const sharedColor = color ?? undefined;

    const basicItemsWithDisabled = basicItems.map(item => ({
        ...item,
        disabled: !!disabled || item.disabled,
    }));

    const collapsedItemsWithDisabled = collapsedItems.map(item => ({
        ...item,
        disabled: !!disabled || item.disabled,
    }));

    const disabledItemsWithDisabled = disabledItems.map(item => ({
        ...item,
        disabled: !!disabled || item.disabled,
    }));

    return (
        <Article direction="row" wf>
            <Section className="items-start gap-6 p-4" grow>
                <H1>Breadcrumbs</H1>

                <Div className="flex w-full flex-col gap-3">
                    <H2>Basic</H2>
                    <Breadcrumbs color={sharedColor} items={basicItemsWithDisabled} />
                </Div>

                <Div className="flex w-full flex-col gap-3">
                    <H2>Custom separator</H2>
                    <Breadcrumbs color={sharedColor} items={basicItemsWithDisabled} separator="›" />
                </Div>

                <Div className="flex w-full flex-col gap-3">
                    <H2>Collapse</H2>
                    <Breadcrumbs
                        color={sharedColor}
                        items={collapsedItemsWithDisabled}
                        itemsAfterCollapse={1}
                        itemsBeforeCollapse={1}
                        maxItems={4}
                    />
                </Div>

                <Div className="flex w-full flex-col gap-3">
                    <H2>Disabled item</H2>
                    <Breadcrumbs color={sharedColor} items={disabledItemsWithDisabled} />
                </Div>
            </Section>

            <Aside>
                <Modifiers
                    disabled={disabled}
                    onChange={({ surfaceColor: sc, disabled: db }) => {
                        setColor(sc ?? null);
                        setDisabled(db ?? null);
                    }}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
