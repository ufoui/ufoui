import { useMemo, useState } from 'react';
import { MdInbox, MdSettings, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementShape,
    Flex,
    H1,
    H2,
    List,
    ListSelection,
    ListSelectionMarker,
    ListSelectionScroll,
    ListSelectionSlot,
    Option,
    P,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListBoxPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [selectedColor, setSelectedColor] = useState<SurfaceColor | null>(null);
    const [selectedShape, setSelectedShape] = useState<ElementShape | null>(null);
    const [selection, setSelection] = useState<ListSelection | null>(null);
    const [selectionMarker, setSelectionMarker] = useState<ListSelectionMarker | null>(null);
    const [selectionScroll, setSelectionScroll] = useState<ListSelectionScroll | null>(null);
    const [selectionSlot, setSelectionSlot] = useState<ListSelectionSlot | null>(null);
    const [draggable, setDraggable] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(null);
    const [fluidMarker, setFluidMarker] = useState<boolean | null>(null);

    const [selected, setSelected] = useState<string[]>(['inbox']);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            density: density ?? undefined,
            disabled: disabled ?? undefined,
            selectedColor: selectedColor ?? undefined,
            selectedShape: selectedShape ?? undefined,
            selectionMarker: selectionMarker ?? undefined,
            selectionScroll: selectionScroll ?? undefined,
            selectionSlot: selectionSlot ?? undefined,
            draggable: draggable ?? undefined,
            fluidMarker: fluidMarker ?? undefined,
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
            selectedColor,
            selectedShape,
            selectionMarker,
            selectionScroll,
            selectionSlot,
            draggable,
            fluidMarker,
        ]
    );

    const options = [
        <Option description="12 unread" key="inbox" label="Inbox" leading={<MdInbox />} value="inbox" />,
        <Option description="Favorites" key="starred" label="Starred" leading={<MdStar />} value="starred" />,
        <Option
            description="System settings"
            key="settings"
            label="Settings"
            leading={<MdSettings />}
            value="settings"
        />,
        <Option description="Archived items" key="archive" label="Archive" value="archive" />,
        <Option description="Disabled example" disabled key="billing" label="Billing" value="billing" />,
        <Option description="User profile" key="profile" label="Profile" value="profile" />,
    ];

    return (
        <Article direction="row" fullWidth>
            <Content direction="col" gap={24} grow p={16}>
                <H1>ListBox</H1>
                <P>Selected: {selected.join(', ') || '-'}</P>
                <Flex gap={24}>
                    <Section alignItems="start" gap={12}>
                        <H2>Baseline</H2>
                        <List
                            {...shared}
                            onChange={setSelected}
                            selection={selection ?? 'single'}
                            type="listbox"
                            value={selected}
                            width={288}>
                            {options}
                        </List>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Expressive</H2>
                        <List
                            {...shared}
                            onChange={setSelected}
                            selection={selection ?? 'single'}
                            type="listbox"
                            value={selected}
                            variant="expressive"
                            width={288}>
                            {options}
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
                    fluidMarker={fluidMarker}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        density: dn,
                        disabled: dis,
                        selectedShape: selShape,
                        selectedSurfaceColor: selColor,
                        selection: sel,
                        selectionMarker: marker,
                        selectionScroll: scroll,
                        selectionSlot: slot,
                        draggable: drag,
                        fluidMarker: fluid,
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(dn ?? null);
                        setDisabled(dis ?? null);
                        setSelectedColor(selColor ?? null);
                        setSelectedShape(selShape ?? null);
                        setSelection(sel ?? null);
                        setSelectionMarker(marker ?? null);
                        setSelectionScroll(scroll ?? null);
                        setSelectionSlot(slot ?? null);
                        setDraggable(drag ?? null);
                        setFluidMarker(fluid ?? null);
                    }}
                    selectedShape={selectedShape}
                    selectedSurfaceColor={selectedColor}
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
