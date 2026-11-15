import { useMemo, useState } from 'react';
import {
    MdContentCopy,
    MdDelete,
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdMoreVert,
    MdSearch,
} from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    Div,
    Divider,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    Flex,
    H2,
    IconButton,
    Section,
    SurfaceColor,
    TextField,
    Toolbar,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const buttonSizes: ElementSize[] = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

export const ToolbarPage = () => {
    const [size, setSize] = useState<ElementSize | null>(null);
    const [surfaceColor, setSurfaceColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [keepChildColors, setKeepChildColors] = useState<boolean | null>(false);

    const shared = useMemo(
        () => ({
            color: surfaceColor ?? undefined,
            size: size ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            disabled: disabled ?? undefined,
            keepChildColors: keepChildColors ?? undefined,
        }),
        [surfaceColor, size, shape, elevation, border, borderColor, density, font, disabled, keepChildColors]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow px={24} py={24}>
                <Section gap={12}>
                    <H2>Button size</H2>
                    {buttonSizes.map(s => (
                        <Toolbar key={s} {...shared}>
                            <IconButton icon={<MdFormatBold />} size={s} toggle />
                            <IconButton icon={<MdFormatItalic />} size={s} toggle />
                            <IconButton icon={<MdFormatUnderlined />} size={s} toggle />
                            <IconButton icon={<MdContentCopy />} size={s} />
                            <IconButton icon={<MdDelete />} size={s} />
                            <IconButton icon={<MdMoreVert />} size={s} />
                        </Toolbar>
                    ))}
                </Section>

                <Section gap={12}>
                    <H2>Button size (floating)</H2>
                    {buttonSizes.map(s => (
                        <Toolbar key={s} {...shared} variant="floating">
                            <IconButton icon={<MdFormatBold />} size={s} toggle />
                            <IconButton icon={<MdFormatItalic />} size={s} toggle />
                            <IconButton icon={<MdFormatUnderlined />} size={s} toggle />
                            <IconButton icon={<MdContentCopy />} size={s} />
                            <IconButton icon={<MdDelete />} size={s} />
                            <IconButton icon={<MdMoreVert />} size={s} />
                        </Toolbar>
                    ))}
                </Section>

                <Section gap={12}>
                    <H2>Docked</H2>
                    <Toolbar {...shared} variant="docked">
                        <IconButton icon={<MdSearch />} />
                        <Div grow>Toolbar content</Div>
                        <IconButton icon={<MdDelete />} />
                        <IconButton icon={<MdMoreVert />} />
                    </Toolbar>
                </Section>

                <Section gap={12}>
                    <H2>Floating</H2>
                    <Toolbar {...shared} elevation={elevation ?? 3} variant="floating">
                        <IconButton icon={<MdSearch />} />
                        <Divider inset="both" offset={8} orientation="vertical" />
                        <TextField />
                        <IconButton icon={<MdDelete />} />
                        <IconButton icon={<MdMoreVert />} />
                    </Toolbar>
                </Section>

                <Section gap={12}>
                    <H2>Dense</H2>
                    <Toolbar {...shared} density="dense">
                        <IconButton icon={<MdSearch />} />
                        <IconButton icon={<MdDelete />} />
                        <IconButton icon={<MdMoreVert />} />
                    </Toolbar>
                </Section>

                <Section gap={12}>
                    <H2>Disabled</H2>
                    <Toolbar {...shared} disabled>
                        <IconButton icon={<MdSearch />} />
                        <Div grow>Disabled toolbar</Div>
                        <IconButton icon={<MdMoreVert />} />
                    </Toolbar>
                </Section>
                <Flex gap={16}>
                    <Section gap={12}>
                        <H2>Vertical Docked </H2>
                        <Toolbar {...shared} orientation="vertical" variant="docked">
                            <IconButton icon={<MdSearch />} />
                            <Div grow>Toolbar content</Div>
                            <IconButton icon={<MdDelete />} />
                            <IconButton icon={<MdMoreVert />} />
                        </Toolbar>
                    </Section>

                    <Section gap={12}>
                        <H2>Vertical Floating</H2>
                        <Toolbar {...shared} elevation={elevation ?? 3} orientation="vertical" variant="floating">
                            <IconButton icon={<MdSearch />} />
                            <Divider />
                            <IconButton icon={<MdDelete />} />
                            <IconButton icon={<MdMoreVert />} />
                        </Toolbar>
                    </Section>

                    <Section gap={12}>
                        <H2>Vertical Dense</H2>
                        <Toolbar {...shared} density="dense" orientation="vertical">
                            <IconButton icon={<MdSearch />} />
                            <IconButton icon={<MdDelete />} />
                            <IconButton icon={<MdMoreVert />} />
                        </Toolbar>
                    </Section>
                </Flex>
            </Content>
            <Aside px={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    disabled={disabled}
                    elevation={elevation}
                    font={font}
                    keepChildColors={keepChildColors}
                    onChange={({
                        surfaceColor: sc,
                        size: sz,
                        shape: sp,
                        elevation: el,
                        border: bd,
                        borderColor: bc,
                        density: ds,
                        font: ft,
                        disabled: db,
                        keepChildColors: kc,
                    }) => {
                        setSurfaceColor(sc ?? null);
                        setSize(sz ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setDensity(ds ?? null);
                        setFont(ft ?? null);
                        setDisabled(db ?? null);
                        setKeepChildColors(kc ?? null);
                    }}
                    shape={shape}
                    size={size}
                    surfaceColor={surfaceColor}
                />
            </Aside>
        </Article>
    );
};
