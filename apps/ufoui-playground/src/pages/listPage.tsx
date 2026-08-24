import { useMemo, useState } from 'react';
import { MdArrowRight, MdFolder, MdImage, MdInbox, MdPerson, MdSettings, MdStar, MdStarBorder } from 'react-icons/md';

import {
    Article,
    Aside,
    Avatar,
    BorderColor,
    Content,
    Div,
    Divider,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementShape,
    H1,
    H2,
    ItemGroup,
    List,
    ListItem,
    ListSelection,
    ListSelectionSlot,
    Section,
    Span,
    Status,
    SurfaceColor,
    Switch,
} from '@ufoui/core';

import cat from '../assets/cat.mp4';
import dog from '../assets/dog.mp4';
import tree from '../assets/tree.jpg';
import { Modifiers } from '../components/modifiers/modifiers';

export const ListPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [selection, setSelection] = useState<ListSelection | null>(null);
    const [selectionSlot, setSelectionSlot] = useState<ListSelectionSlot | null>(null);
    const [draggable, setDraggable] = useState<boolean | null>(null);

    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [order, setOrder] = useState(() => Array.from({ length: 50 }, (_, i) => i));
    const [variousOrder, setVariousOrder] = useState(() => [
        'figma-media-switch',
        'figma-supporting',
        'figma-icon-supporting',
        'figma-icon',
        'figma-avatar',
        'figma-checkbox',
        'figma-radio',
        'figma-image',
        'figma-wide-image',
        'figma-wide-image-2',
        'figma-text',
        'figma-text-divider-1',
        'figma-text-divider-2',
    ]);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            density: density ?? undefined,
            selection: selection ?? undefined,
            selectionSlot: selectionSlot ?? undefined,
            draggable: draggable ?? undefined,
            maxHeight: 500,
            overflow: 'auto' as const,
        }),
        [color, shape, elevation, border, borderColor, density, selection, selectionSlot, draggable]
    );

    const items = order.map(i => {
        const value = `item-${i}`;

        if (i < 10) {
            return (
                <ListItem
                    description="Toggle favorite"
                    key={value}
                    label={`Starred ${i + 1}`}
                    leading={<MdInbox />}
                    onClick={() => {
                        setChecked(prev => ({
                            ...prev,
                            [value]: !prev[value],
                        }));
                    }}
                    trailing={checked[value] ? <MdStar /> : <MdStarBorder />}
                    value={value}
                />
            );
        }

        if (i < 20) {
            return (
                <ListItem
                    description="No selection"
                    key={value}
                    label={`Folder ${i - 9}`}
                    leading={<MdFolder />}
                    value={value}
                />
            );
        }

        return (
            <ListItem
                description="Selectable item"
                key={value}
                label={`Option ${i - 19}`}
                leading={<MdSettings />}
                trailing={
                    i % 5 === 0 ? (
                        <Status color="error" label="New" variant="filled" />
                    ) : i % 7 === 0 ? (
                        <Span color="onSurfaceVariant">⌘K</Span>
                    ) : undefined
                }
                value={value}
            />
        );
    });

    const videoThumbnail = <video autoPlay height={56} loop muted playsInline src={cat} width={100} />;

    const largeVideoThumbnail = <video autoPlay height={64} loop muted playsInline src={dog} width={114} />;

    const imageThumbnail = <img alt="" height={56} src={tree} width={56} />;

    const staticSwitch = <Switch aria-label="Enabled" readOnly tabIndex={-1} />;

    const variousItems = variousOrder.flatMap((value, index) => {
        const item =
            value === 'figma-media-switch' ? (
                <ListItem
                    description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                    key={value}
                    label="List item"
                    leading={videoThumbnail}
                    media="video"
                    trailing={staticSwitch}
                    value={value}
                />
            ) : value === 'figma-supporting' ? (
                <ListItem
                    description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                    key={value}
                    label="List item"
                    trailing={
                        <Span color="onSurfaceVariant" font="labelLarge">
                            100+
                        </Span>
                    }
                    value={value}
                />
            ) : value === 'figma-icon-supporting' ? (
                <ListItem
                    description="Supporting line text"
                    key={value}
                    label="List item"
                    leading={<MdPerson />}
                    trailing={
                        <Span color="onSurfaceVariant" font="labelLarge">
                            100+
                        </Span>
                    }
                    value={value}
                />
            ) : value === 'figma-icon' ? (
                <ListItem key={value} label="List item" leading={<MdPerson />} value={value} />
            ) : value === 'figma-avatar' ? (
                <ListItem key={value} label="List item" leading={<Avatar name="Anna" />} trailing={staticSwitch} value={value} />
            ) : value === 'figma-checkbox' ? (
                <ListItem key={value} label="List item" value={value} />
            ) : value === 'figma-radio' ? (
                <ListItem key={value} label="List item" trailing={<MdArrowRight />} value={value} />
            ) : value === 'figma-image' ? (
                <ListItem key={value} label="Image item" leading={imageThumbnail} media="image" value={value} />
            ) : value === 'figma-wide-image' ? (
                <ListItem key={value} label="Video item" leading={videoThumbnail} media="video" value={value} />
            ) : value === 'figma-wide-image-2' ? (
                <ListItem key={value} label="Large Video item" leading={largeVideoThumbnail} media="video" value={value} />
            ) : value === 'figma-text' ? (
                <ListItem key={value} label="List item" value={value} />
            ) : value === 'figma-text-divider-1' ? (
                <ListItem description="Supporting line text" key={value} label="List item" overline="Overline" value={value} />
            ) : (
                <ListItem key={value} label="List item" overline="Overline" value={value} />
            );

        if (index === 1) {
            return [item, <Divider key="various-divider-top" />];
        }
        if (index === variousOrder.length - 3) {
            return [item, <Divider key="various-divider-bottom" />];
        }

        return [item];
    });

    return (
        <Article direction="row" fullWidth>
            <Content direction="row" gap={24} grow p={16}>
                <H1>List</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Simple List</H2>
                    <List
                        defaultValue="item-20"
                        {...shared}
                        onOrderChange={({ from, to }) => {
                            setOrder(prev => {
                                const next = [...prev];
                                const [item] = next.splice(from, 1);
                                next.splice(to, 0, item);
                                return next;
                            });
                        }}>
                        {items}
                    </List>
                </Section>
                <Section alignItems="start" gap={12}>
                    <H2>Various items</H2>
                    <List
                        color="surface"
                        density={density ?? undefined}
                        draggable={draggable ?? undefined}
                        maxWidth={520}
                        overflow="visible"
                        selection={selection ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}
                        onOrderChange={({ from, to }) => {
                            setVariousOrder(prev => {
                                const next = [...prev];
                                const [item] = next.splice(from, 1);
                                next.splice(to, 0, item);
                                return next;
                            });
                        }}>
                        {variousItems}
                        <Div height={8} />
                    </List>
                </Section>
                <Section alignItems="start" gap={12}>
                    <H2>Nested groups</H2>
                    <List
                        color="surface"
                        density={density ?? undefined}
                        draggable={draggable ?? undefined}
                        maxWidth={520}
                        selection={selection ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}>
                        <ListItem label="Inbox" leading={<MdInbox />} value="nested-inbox" />
                        <ListItem label="Starred" leading={<MdStar />} value="nested-starred" />
                        <ListItem label="Settings" leading={<MdSettings />} value="nested-settings" />
                        <Divider />
                        <ItemGroup defaultOpen description="Single level" label="Projects" leading={<MdFolder />}>
                            <ListItem label="Alpha" value="nested-alpha" />
                            <ListItem label="Beta" value="nested-beta" />
                            <ListItem label="Gamma" value="nested-gamma" />
                        </ItemGroup>
                        <ItemGroup description="Two levels" label="Workspace" leading={<MdFolder />}>
                            <ListItem label="Overview" value="nested-ws-overview" />
                            <ItemGroup label="Team" leading={<MdPerson />}>
                                <ListItem label="Anna" value="nested-ws-anna" />
                                <ListItem label="Marek" value="nested-ws-marek" />
                            </ItemGroup>
                        </ItemGroup>
                        <ItemGroup description="Two levels" label="Media" leading={<MdFolder />}>
                            <ItemGroup label="Images" leading={<MdImage />}>
                                <ListItem label="Cover.png" value="nested-media-cover" />
                                <ListItem label="Hero.jpg" value="nested-media-hero" />
                            </ItemGroup>
                            <ListItem label="Archive" value="nested-media-archive" />
                        </ItemGroup>
                    </List>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    draggable={draggable}
                    elevation={elevation}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        density: dn,
                        selection: sel,
                        selectionSlot: slot,
                        draggable: drag,
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(dn ?? null);
                        setSelection(sel ?? null);
                        setSelectionSlot(slot ?? null);
                        setDraggable(drag ?? null);
                    }}
                    selection={selection}
                    selectionSlot={selectionSlot}
                    shape={shape}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
