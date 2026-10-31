import { RefObject, useMemo, useRef, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Button,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementShape,
    Flex,
    MenuVariant,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import TestMenu from '../components/shared/testMenu';
import { Modifiers } from '../components/modifiers/modifiers';

export function MenuPage() {
    const [open, setOpen] = useState(false);
    const [menuType, setMenuType] = useState<MenuVariant>('modern');
    const [anchorRef, setAnchorRef] = useState<RefObject<HTMLButtonElement>>();
    const classicAnchorRef = useRef<HTMLButtonElement>(null);
    const standardAnchorRef = useRef<HTMLButtonElement>(null);
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [dockedElevation, setDockedElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            density: density ?? undefined,
            dockedElevation: dockedElevation ?? undefined,
        }),
        [color, shape, elevation, border, borderColor, density, dockedElevation]
    );
    return (
        <Article direction="row">
            <Section gap={20} grow>
                <Flex gap={8}>
                    <Button
                        onClick={() => {
                            setMenuType('modern');
                            setAnchorRef(standardAnchorRef);
                            setOpen(o => !o);
                        }}
                        ref={standardAnchorRef}>
                        Open Modern Menu
                    </Button>
                    <Button
                        onClick={() => {
                            setMenuType('classic');
                            setAnchorRef(classicAnchorRef);
                            setOpen(o => !o);
                        }}
                        ref={classicAnchorRef}>
                        Open Classic Menu
                    </Button>
                </Flex>
                <TestMenu anchorRef={anchorRef} menuType={menuType} open={open} setOpen={setOpen} {...shared} />
                <TestMenu docked menuType="modern" orientation="horizontal" open {...shared} />
                <TestMenu docked menuType="classic" orientation="horizontal" open {...shared} />
                <Flex alignItems="start" gap={20}>
                    <TestMenu docked menuType="modern" orientation="vertical" open {...shared} />
                    <TestMenu docked menuType="classic" orientation="vertical" open {...shared} />
                </Flex>
            </Section>
            <Aside p={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    dockedElevation={dockedElevation}
                    elevation={elevation}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        density: ds,
                        dockedElevation: de,
                    }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(ds ?? null);
                        setDockedElevation(de ?? null);
                    }}
                    shape={shape}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
}
