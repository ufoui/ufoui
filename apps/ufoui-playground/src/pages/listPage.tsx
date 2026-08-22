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
    Item,
    ItemGroup,
    List,
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

    const [checked, setChecked] = useState<Record<string, boolean>>({});

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
            maxHeight: 500,
            overflow: 'auto' as const,
        }),
        [color, shape, elevation, border, borderColor, density, selection, selectionSlot]
    );

    const items = Array.from({ length: 50 }, (_, i) => {
        const value = `item-${i}`;

        if (i < 10) {
            return (
                <Item
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
                <Item
                    description="No selection"
                    key={value}
                    label={`Folder ${i - 9}`}
                    leading={<MdFolder />}
                    value={value}
                />
            );
        }

        return (
            <Item
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

    return (
        <Article direction="row" fullWidth>
            <Content direction="row" gap={24} grow p={16}>
                <H1>List</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Simple List</H2>
                    <List defaultValue="item-20" {...shared}>
                        {items}
                    </List>
                </Section>
                <Section alignItems="start" gap={12}>
                    <H2>Various items</H2>
                    <List
                        color="surface"
                        density={density ?? undefined}
                        maxWidth={520}
                        overflow="visible"
                        selection={selection ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}>
                        <Item
                            description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                            label="List item"
                            leading={videoThumbnail}
                            media="video"
                            trailing={staticSwitch}
                            value="figma-media-switch"
                        />
                        <Item
                            description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                            label="List item"
                            trailing={
                                <Span color="onSurfaceVariant" font="labelLarge">
                                    100+
                                </Span>
                            }
                            value="figma-supporting"
                        />
                        <Divider />
                        <Item
                            description="Supporting line text"
                            label="List item"
                            leading={<MdPerson />}
                            trailing={
                                <Span color="onSurfaceVariant" font="labelLarge">
                                    100+
                                </Span>
                            }
                            value="figma-icon-supporting"
                        />
                        <Item label="List item" leading={<MdPerson />} value="figma-icon" />
                        <Item
                            label="List item"
                            leading={<Avatar name="Anna" />}
                            trailing={staticSwitch}
                            value="figma-avatar"
                        />
                        <Item label="List item" value="figma-checkbox" />
                        <Item label="List item" trailing={<MdArrowRight />} value="figma-radio" />
                        <Item label="Image item" leading={imageThumbnail} media="image" value="figma-image" />
                        <Item label="Video item" leading={videoThumbnail} media="video" value="figma-wide-image" />
                        <Item
                            label="Large Video item"
                            leading={largeVideoThumbnail}
                            media="video"
                            value="figma-wide-image"
                        />
                        <Item label="List item" value="figma-text" />
                        <Divider />
                        <Item
                            description="Supporting line text"
                            label="List item"
                            overline="Overline"
                            value="figma-text-divider-1"
                        />
                        <Item label="List item" overline="Overline" value="figma-text-divider-2" />
                        <Div height={8} />
                    </List>
                </Section>
                <Section alignItems="start" gap={12}>
                    <H2>Nested groups</H2>
                    <List
                        color="surface"
                        density={density ?? undefined}
                        maxWidth={520}
                        selection={selection ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}>
                        <Item label="Inbox" leading={<MdInbox />} value="nested-inbox" />
                        <Item label="Starred" leading={<MdStar />} value="nested-starred" />
                        <Item label="Settings" leading={<MdSettings />} value="nested-settings" />
                        <Divider />
                        <ItemGroup defaultOpen description="Single level" label="Projects" leading={<MdFolder />}>
                            <Item label="Alpha" value="nested-alpha" />
                            <Item label="Beta" value="nested-beta" />
                            <Item label="Gamma" value="nested-gamma" />
                        </ItemGroup>
                        <ItemGroup description="Two levels" label="Workspace" leading={<MdFolder />}>
                            <Item label="Overview" value="nested-ws-overview" />
                            <ItemGroup label="Team" leading={<MdPerson />}>
                                <Item label="Anna" value="nested-ws-anna" />
                                <Item label="Marek" value="nested-ws-marek" />
                            </ItemGroup>
                        </ItemGroup>
                        <ItemGroup description="Two levels" label="Media" leading={<MdFolder />}>
                            <ItemGroup label="Images" leading={<MdImage />}>
                                <Item label="Cover.png" value="nested-media-cover" />
                                <Item label="Hero.jpg" value="nested-media-hero" />
                            </ItemGroup>
                            <Item label="Archive" value="nested-media-archive" />
                        </ItemGroup>
                    </List>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
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
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(dn ?? null);
                        setSelection(sel ?? null);
                        setSelectionSlot(slot ?? null);
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
