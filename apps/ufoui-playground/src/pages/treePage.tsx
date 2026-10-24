import { useState } from 'react';
import { MdFolder, MdImage, MdInbox, MdPerson, MdSettings, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    Divider,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementShape,
    Flex,
    H1,
    H2,
    ListSelection,
    ListSelectionMarker,
    ListSelectionScroll,
    ListSelectionSlot,
    Section,
    SurfaceColor,
    Tree,
    TreeItem,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const TreePage = () => {
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

    const shared = {
        border: border ?? undefined,
        borderColor: borderColor ?? undefined,
        color: color ?? 'surface',
        density: density ?? undefined,
        disabled: disabled ?? undefined,
        draggable: draggable ?? undefined,
        elevation: elevation ?? undefined,
        fluidMarker: fluidMarker ?? undefined,
        maxWidth: 520,
        selectedColor: selectedColor ?? undefined,
        selectedShape: selectedShape ?? undefined,
        selection: selection ?? undefined,
        selectionMarker: selectionMarker ?? undefined,
        selectionScroll: selectionScroll ?? undefined,
        selectionSlot: selectionSlot ?? undefined,
        shape: shape ?? undefined,
    };

    const items = [
        <TreeItem key="inbox" label="Inbox" leading={<MdInbox />} value="nested-inbox" />,
        <TreeItem key="starred" label="Starred" leading={<MdStar />} value="nested-starred" />,
        <TreeItem key="settings" label="Settings" leading={<MdSettings />} value="nested-settings" />,
        <Divider key="divider" />,
        <TreeItem defaultOpen description="Single level" key="projects" label="Projects" leading={<MdFolder />}>
            <TreeItem label="Alpha" value="nested-alpha" />
            <TreeItem label="Beta" value="nested-beta" />
            <TreeItem label="Gamma" value="nested-gamma" />
        </TreeItem>,
        <TreeItem description="Two levels" key="workspace" label="Workspace" leading={<MdFolder />}>
            <TreeItem label="Overview" value="nested-ws-overview" />
            <TreeItem label="Team" leading={<MdPerson />}>
                <TreeItem label="Anna" value="nested-ws-anna" />
                <TreeItem label="Marek" value="nested-ws-marek" />
            </TreeItem>
        </TreeItem>,
        <TreeItem description="Two levels" key="media" label="Media" leading={<MdFolder />}>
            <TreeItem label="Images" leading={<MdImage />}>
                <TreeItem label="Cover.png" value="nested-media-cover" />
                <TreeItem label="Hero.jpg" value="nested-media-hero" />
            </TreeItem>
            <TreeItem label="Archive" value="nested-media-archive" />
        </TreeItem>,
    ];

    return (
        <Article direction="row" fullWidth>
            <Content direction="col" gap={24} grow p={16}>
                <H1>Tree</H1>
                <Flex gap={24}>
                    <Section alignItems="start" gap={12}>
                        <H2>Baseline</H2>
                        <Tree {...shared}>{items}</Tree>
                    </Section>
                    <Section alignItems="start" gap={12}>
                        <H2>Expressive</H2>
                        <Tree {...shared} variant="expressive">
                            {items}
                        </Tree>
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
