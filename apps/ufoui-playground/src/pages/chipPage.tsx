import { useMemo, useState } from 'react';
import { MdCheck, MdClose, MdFavorite, MdFilterList, MdPerson, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Chip,
    ChipType,
    Content,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementShape,
    ElementSize,
    Flex,
    H1,
    H2,
    SemanticColor,
    Section,
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

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            size: size ?? undefined,
            shape: shape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
        }),
        [color, size, shape, border, borderColor, elevation, density]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Chip</H1>

                <Section gap={12}>
                    <H2>Types</H2>
                    <Flex gap={8} wrap>
                        {chipTypes.map(t => (
                            <Chip key={t} {...shared} chipType={t} label={t.charAt(0).toUpperCase() + t.slice(1)} />
                        ))}
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Variants</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} label="Default" />
                        <Chip {...shared} label="Outlined" outlined />
                        <Chip {...shared} label="Tonal" tonal />
                        <Chip {...shared} label="Filled" filled />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>With leading icon</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} chipType="assist" icon={<MdStar />} label="Assist" />
                        <Chip {...shared} chipType="filter" icon={<MdFilterList />} label="Filter" />
                        <Chip {...shared} chipType="input" icon={<MdPerson />} label="Person" trailing={<MdClose />} />
                        <Chip {...shared} chipType="suggestion" icon={<MdFavorite />} label="Suggestion" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Selectable (filter)</H2>
                    <Flex gap={8} wrap>
                        {['Recent', 'Favorites', 'Shared', 'Archived'].map(l => (
                            <Chip key={l} {...shared} chipType="filter" label={l} selectedIcon={<MdCheck />} toggle />
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
                    onChange={({
                        color: cl,
                        size: sz,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        elevation: el,
                        density: ds,
                    }) => {
                        setColor(cl ?? null);
                        setSize(sz ?? null);
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setElevation(el ?? null);
                        setDensity(ds ?? null);
                    }}
                    shape={shape}
                    size={size}
                />
            </Aside>
        </Article>
    );
};
