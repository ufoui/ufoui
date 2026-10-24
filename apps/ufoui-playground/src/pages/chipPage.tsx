import { useMemo, useState } from 'react';
import { MdCheck, MdClose, MdFavorite, MdFilterList, MdPerson, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    ButtonBaseProps,
    Chip,
    ChipType,
    Content,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    Flex,
    H1,
    H2,
    Section,
    SemanticColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const chipTypes: ChipType[] = ['assist', 'filter', 'input', 'suggestion'];

export const ChipPage = () => {
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [spread, setSpread] = useState<ButtonBaseProps['spread'] | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            size: size ?? undefined,
            shape: shape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            spread: spread ?? undefined,
        }),
        [color, size, shape, border, borderColor, elevation, density, font, spread]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Chip</H1>

                <Section gap={12}>
                    <H2>Types</H2>
                    <Flex gap={8} wrap>
                        {chipTypes.map(t => (
                            <Chip key={t} {...shared} label={t.charAt(0).toUpperCase() + t.slice(1)} type={t} />
                        ))}
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Variants</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} label="Default" />
                        <Chip {...shared} label="Text" variant="text" />
                        <Chip {...shared} label="Outlined" outlined />
                        <Chip {...shared} label="Tonal" tonal />
                        <Chip {...shared} filled label="Filled" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Leading icon</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} icon={<MdStar />} label="Assist" type="assist" />
                        <Chip {...shared} icon={<MdFilterList />} label="Filter" type="filter" />
                        <Chip {...shared} icon={<MdPerson />} label="Person" trailing={<MdClose />} type="input" />
                        <Chip {...shared} icon={<MdFavorite />} label="Suggestion" type="suggestion" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Selectable (filter)</H2>
                    <Flex gap={8} wrap>
                        {['Recent', 'Favorites', 'Shared', 'Archived'].map(l => (
                            <Chip key={l} {...shared} label={l} selectedIcon={<MdCheck />} toggle type="filter" />
                        ))}
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Sizes</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Chip color={color ?? undefined} icon={<MdStar />} label="extraSmall" size="extraSmall" />
                        <Chip color={color ?? undefined} icon={<MdStar />} label="small" size="small" />
                        <Chip color={color ?? undefined} icon={<MdStar />} label="medium" size="medium" />
                        <Chip color={color ?? undefined} icon={<MdStar />} label="large" size="large" />
                        <Chip color={color ?? undefined} icon={<MdStar />} label="extraLarge" size="extraLarge" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Disabled</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} disabled label="Default" />
                        <Chip {...shared} disabled filled label="Filled" />
                        <Chip {...shared} disabled icon={<MdStar />} label="With icon" />
                    </Flex>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    color={color}
                    density={density}
                    elevation={elevation}
                    font={font}
                    onChange={({
                        color: cl,
                        size: sz,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        elevation: el,
                        density: ds,
                        font: ft,
                        spread: spr,
                    }) => {
                        setColor(cl ?? null);
                        setSize(sz ?? null);
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setElevation(el ?? null);
                        setDensity(ds ?? null);
                        setFont(ft ?? null);
                        setSpread(spr ?? null);
                    }}
                    shape={shape}
                    size={size}
                    spread={spread}
                />
            </Aside>
        </Article>
    );
};
