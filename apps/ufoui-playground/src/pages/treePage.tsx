import { useState } from 'react';
import { MdFolder, MdImage, MdInbox, MdPerson, MdSettings, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    Divider,
    ElementDensity,
    H1,
    H2,
    ListSelection,
    ListSelectionMarker,
    ListSelectionScroll,
    ListSelectionSlot,
    Section,
    Tree,
    TreeItem,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const TreePage = () => {
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [selection, setSelection] = useState<ListSelection | null>(null);
    const [selectionMarker, setSelectionMarker] = useState<ListSelectionMarker | null>(null);
    const [selectionScroll, setSelectionScroll] = useState<ListSelectionScroll | null>(null);
    const [selectionSlot, setSelectionSlot] = useState<ListSelectionSlot | null>(null);
    const [draggable, setDraggable] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(null);
    const [fluidMarker, setFluidMarker] = useState<boolean | null>(null);

    return (
        <Article direction="row" fullWidth>
            <Content direction="row" gap={24} grow p={16}>
                <H1>Tree</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Nested groups</H2>
                    <Tree
                        color="surface"
                        density={density ?? undefined}
                        disabled={disabled ?? undefined}
                        draggable={draggable ?? undefined}
                        fluidMarker={fluidMarker ?? undefined}
                        maxWidth={520}
                        selection={selection ?? undefined}
                        selectionMarker={selectionMarker ?? undefined}
                        selectionScroll={selectionScroll ?? undefined}
                        selectionSlot={selectionSlot ?? undefined}>
                        <TreeItem label="Inbox" leading={<MdInbox />} value="nested-inbox" />
                        <TreeItem label="Starred" leading={<MdStar />} value="nested-starred" />
                        <TreeItem label="Settings" leading={<MdSettings />} value="nested-settings" />
                        <Divider />
                        <TreeItem defaultOpen description="Single level" label="Projects" leading={<MdFolder />}>
                            <TreeItem label="Alpha" value="nested-alpha" />
                            <TreeItem label="Beta" value="nested-beta" />
                            <TreeItem label="Gamma" value="nested-gamma" />
                        </TreeItem>
                        <TreeItem description="Two levels" label="Workspace" leading={<MdFolder />}>
                            <TreeItem label="Overview" value="nested-ws-overview" />
                            <TreeItem label="Team" leading={<MdPerson />}>
                                <TreeItem label="Anna" value="nested-ws-anna" />
                                <TreeItem label="Marek" value="nested-ws-marek" />
                            </TreeItem>
                        </TreeItem>
                        <TreeItem description="Two levels" label="Media" leading={<MdFolder />}>
                            <TreeItem label="Images" leading={<MdImage />}>
                                <TreeItem label="Cover.png" value="nested-media-cover" />
                                <TreeItem label="Hero.jpg" value="nested-media-hero" />
                            </TreeItem>
                            <TreeItem label="Archive" value="nested-media-archive" />
                        </TreeItem>
                    </Tree>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    density={density}
                    disabled={disabled}
                    draggable={draggable}
                    fluidMarker={fluidMarker}
                    onChange={({
                        density: dn,
                        disabled: dis,
                        selection: sel,
                        selectionMarker: marker,
                        selectionScroll: scroll,
                        selectionSlot: slot,
                        draggable: drag,
                        fluidMarker: fluid,
                    }) => {
                        setDensity(dn ?? null);
                        setDisabled(dis ?? null);
                        setSelection(sel ?? null);
                        setSelectionMarker(marker ?? null);
                        setSelectionScroll(scroll ?? null);
                        setSelectionSlot(slot ?? null);
                        setDraggable(drag ?? null);
                        setFluidMarker(fluid ?? null);
                    }}
                    selection={selection}
                    selectionMarker={selectionMarker}
                    selectionScroll={selectionScroll}
                    selectionSlot={selectionSlot}
                />
            </Aside>
        </Article>
    );
};
