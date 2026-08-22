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
    ElementElevation,
    ElementShape,
    Grid,
    H1,
    H2,
    Item,
    List,
    ListSelection,
    ListSelectionSlot,
    Section,
    Span,
    Status,
    SurfaceColor,
    Switch,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
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
            selection: selection ?? undefined,
            selectionSlot: selectionSlot ?? undefined,
            maxHeight: 500,
            overflow: 'auto' as const,
        }),
        [color, shape, elevation, border, borderColor, selection, selectionSlot]
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

    const videoThumbnail = (
        <Grid
            color="surfaceContainer"
            height={56}
            placeItems="center"
            shape="square"
            style={{ color: 'var(--uui-color-on-surface-variant)' }}
            width={100}>
            <MdImage />
        </Grid>
    );

    const largeVideoThumbnail = (
        <Grid
            color="surfaceContainer"
            height={64}
            placeItems="center"
            shape="square"
            style={{ color: 'var(--uui-color-on-surface-variant)' }}
            width={114}>
            <MdImage />
        </Grid>
    );

    const imageThumbnail = (
        <Grid
            color="surfaceContainer"
            height={56}
            placeItems="center"
            shape="square"
            style={{ color: 'var(--uui-color-on-surface-variant)' }}
            width={56}>
            <MdImage />
        </Grid>
    );

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
                        maxWidth={520}
                        overflow="visible"
                        selection={selection ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}>
                        <Item
                            description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                            label="List item"
                            leading={videoThumbnail}
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
                        <Item label="Image item" leading={imageThumbnail} value="figma-image" />
                        <Item label="Video item" leading={videoThumbnail} value="figma-wide-image" />
                        <Item label="Large Video item" leading={largeVideoThumbnail} value="figma-wide-image" />
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
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        selection: sel,
                        selectionSlot: slot,
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
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
