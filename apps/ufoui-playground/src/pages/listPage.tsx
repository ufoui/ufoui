import { useMemo, useState } from 'react';
import { MdFolder, MdInbox, MdPerson, MdSettings, MdStar, MdStarBorder } from 'react-icons/md';

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
    Flex,
    H1,
    H2,
    List,
    ListItem,
    ListSelection,
    ListSelectionMarker,
    ListSelectionScroll,
    ListSelectionSlot,
    Rating,
    Section,
    Span,
    Status,
    SurfaceColor,
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
    const [selectionMarker, setSelectionMarker] = useState<ListSelectionMarker | null>(null);
    const [selectionScroll, setSelectionScroll] = useState<ListSelectionScroll | null>(null);
    const [selectionSlot, setSelectionSlot] = useState<ListSelectionSlot | null>(null);
    const [draggable, setDraggable] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(null);
    const [fixedLeading, setFixedLeading] = useState<boolean | null>(null);

    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<string[]>(['item-20']);
    const [order, setOrder] = useState(() => Array.from({ length: 50 }, (_, i) => i));
    const [variousOrder, setVariousOrder] = useState(() => [
        'figma-media-switch',
        'figma-supporting',
        'figma-icon-supporting',
        'figma-icon',
        'figma-rating',
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
            disabled: disabled ?? undefined,
            selection: selection ?? undefined,
            selectionMarker: selectionMarker ?? undefined,
            selectionScroll: selectionScroll ?? undefined,
            selectionSlot: selectionSlot ?? undefined,
            draggable: draggable ?? undefined,
            fixedLeading: fixedLeading ?? undefined,
            maxHeight: 500,
            overflow: 'auto' as const,
        }),
        [
            color,
            shape,
            elevation,
            border,
            borderColor,
            density,
            disabled,
            selection,
            selectionMarker,
            selectionScroll,
            selectionSlot,
            draggable,
            fixedLeading,
        ]
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
                        <Status color="error" label="New" />
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

    const variousItems = variousOrder.flatMap((value, index) => {
        const item =
            value === 'figma-media-switch' ? (
                <ListItem
                    description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                    key={value}
                    label="List item"
                    leading={videoThumbnail}
                    media="video"
                    value={value}
                />
            ) : value === 'figma-supporting' ? (
                <ListItem
                    description="Supporting line text lorem ipsum dolor sit amet, consectetur."
                    key={value}
                    label="List item"
                    trailing={
                        <Span>
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
                        <Span>
                            100+
                        </Span>
                    }
                    value={value}
                />
            ) : value === 'figma-icon' ? (
                <ListItem key={value} label="List item" leading={<MdPerson />} value={value} />
            ) : value === 'figma-rating' ? (
                <ListItem key={value} label="List item" trailing={<Rating defaultValue={4} readOnly size="extraSmall" />} value={value} />
            ) : value === 'figma-avatar' ? (
                <ListItem key={value} label="List item" leading={<Avatar name="Anna" />} value={value} />
            ) : value === 'figma-checkbox' ? (
                <ListItem key={value} label="List item" value={value} />
            ) : value === 'figma-radio' ? (
                <ListItem key={value} label="List item" trailing={<MdSettings />} value={value} />
            ) : value === 'figma-image' ? (
                <ListItem key={value} label="Image item" leading={imageThumbnail} media="image" value={value} />
            ) : value === 'figma-wide-image' ? (
                <ListItem key={value} label="Video item" leading={videoThumbnail} media="video" value={value} />
            ) : value === 'figma-wide-image-2' ? (
                <ListItem
                    key={value}
                    label="Large Video item"
                    leading={largeVideoThumbnail}
                    media="video"
                    value={value}
                />
            ) : value === 'figma-text' ? (
                <ListItem key={value} label="List item" value={value} />
            ) : value === 'figma-text-divider-1' ? (
                <ListItem
                    description="Supporting line text"
                    key={value}
                    label="List item"
                    overline="Overline"
                    value={value}
                />
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
            <Content direction="col" gap={24} grow p={16}>
                <H1>List</H1>
                <Flex gap={24}>
                    <Section alignItems="start" gap={12}>
                        <H2>Baseline</H2>
                        <List {...shared}>
                            {Array.from({ length: 50 }, (_, i) => (
                                <ListItem
                                    key={i}
                                    label={`Item ${i + 1}`}
                                    leading={<MdInbox />}
                                    value={`baseline-${i}`}
                                />
                            ))}
                        </List>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Expressive</H2>
                        <List {...shared} variant="expressive">
                            {Array.from({ length: 50 }, (_, i) => (
                                <ListItem
                                    key={i}
                                    label={`Item ${i + 1}`}
                                    leading={<MdInbox />}
                                    value={`expressive-${i}`}
                                />
                            ))}
                        </List>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Baseline various items</H2>
                        <List
                            border={border ?? undefined}
                            borderColor={borderColor ?? undefined}
                            color={color ?? 'surface'}
                            density={density ?? undefined}
                            disabled={disabled ?? undefined}
                            draggable={draggable ?? undefined}
                            elevation={elevation ?? undefined}
                            fixedLeading={fixedLeading ?? undefined}
                            maxWidth={520}
                            onOrderChange={({ from, to }) => {
                                setVariousOrder(prev => {
                                    const next = [...prev];
                                    const [item] = next.splice(from, 1);
                                    next.splice(to, 0, item);
                                    return next;
                                });
                            }}
                            overflow="visible"
                            selection={selection ?? undefined}
                            selectionMarker={selectionMarker ?? undefined}
                            selectionScroll={selectionScroll ?? undefined}
                            selectionSlot={selectionSlot ?? undefined}
                            shape={shape ?? undefined}>
                            {variousItems}
                            <Div height={8} />
                        </List>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Expressive various items</H2>
                        <List
                            border={border ?? undefined}
                            borderColor={borderColor ?? undefined}
                            color={color ?? 'surface'}
                            density={density ?? undefined}
                            disabled={disabled ?? undefined}
                            draggable={draggable ?? undefined}
                            elevation={elevation ?? undefined}
                            fixedLeading={fixedLeading ?? undefined}
                            maxWidth={520}
                            onOrderChange={({ from, to }) => {
                                setVariousOrder(prev => {
                                    const next = [...prev];
                                    const [item] = next.splice(from, 1);
                                    next.splice(to, 0, item);
                                    return next;
                                });
                            }}
                            overflow="visible"
                            selection={selection ?? undefined}
                            selectionMarker={selectionMarker ?? undefined}
                            selectionScroll={selectionScroll ?? undefined}
                            selectionSlot={selectionSlot ?? undefined}
                            shape={shape ?? undefined}
                            variant="expressive">
                            {variousItems}
                            <Div height={8} />
                        </List>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Custom selection</H2>
                        <List
                            key={selectionScroll ?? ''}
                            onChange={setSelected}
                            value={selected}
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
                </Flex>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    disabled={disabled}
                    draggable={draggable}
                    elevation={elevation}
                    fixedLeading={fixedLeading}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        density: dn,
                        disabled: dis,
                        selection: sel,
                        selectionMarker: marker,
                        selectionScroll: scroll,
                        selectionSlot: slot,
                        draggable: drag,
                        fixedLeading: fixed,
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(dn ?? null);
                        setDisabled(dis ?? null);
                        setSelection(sel ?? null);
                        setSelectionMarker(marker ?? null);
                        setSelectionScroll(scroll ?? null);
                        setSelectionSlot(slot ?? null);
                        setDraggable(drag ?? null);
                        setFixedLeading(fixed ?? null);
                    }}
                    selection={selection}
                    selectionMarker={selectionMarker}
                    selectionScroll={selectionScroll}
                    selectionSlot={selectionSlot}
                    shape={shape}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
