import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiColor } from 'react-icons/bi';
import { BsWikipedia } from 'react-icons/bs';
import {
    MdAdd,
    MdCheck,
    MdClose,
    MdFavorite,
    MdFilterList,
    MdOutlineCircle,
    MdPerson,
    MdRemove,
    MdStar,
} from 'react-icons/md';

import {
    Article,
    Aside,
    Avatar,
    BorderColor,
    ButtonBaseProps,
    Chip,
    ChipType,
    Content,
    Div,
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
    Stack,
} from '@ufoui/core';

import tree from '../assets/tree.jpg';
import { Modifiers } from '../components/modifiers/modifiers';
import { paths } from '../paths';

const chipTypes: ChipType[] = ['assist', 'filter', 'input', 'suggestion'];

const chipVariants: { label: string; variant?: ButtonBaseProps['variant'] }[] = [
    { label: 'Default' },
    { label: 'Text', variant: 'text' },
    { label: 'Outlined', variant: 'outlined' },
    { label: 'Elevated', variant: 'elevated' },
    { label: 'Tonal', variant: 'tonal' },
    { label: 'Filled', variant: 'filled' },
];

const ScrollingText = ({ text }: { text: string }) => (
    <Div className="w-20 overflow-hidden">
        <Flex className="animate-marquee w-max">
            <Div className="whitespace-nowrap pr-4">{text}</Div>
            <Div className="whitespace-nowrap pr-4">{text}</Div>
        </Flex>
    </Div>
);

export const ChipPage = () => {
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [selectedColor, setSelectedColor] = useState<SemanticColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [selectedShape, setSelectedShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [spread, setSpread] = useState<ButtonBaseProps['spread'] | null>(null);
    const [shrink, setShrink] = useState<boolean | null>(false);
    const [toggle, setToggle] = useState<boolean | null>(false);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            selectedColor: selectedColor ?? undefined,
            size: size ?? undefined,
            shape: shape ?? undefined,
            selectedShape: selectedShape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            spread: spread ?? undefined,
            shrink: !!shrink,
            toggle: !!toggle,
        }),
        [
            color,
            selectedColor,
            size,
            shape,
            selectedShape,
            border,
            borderColor,
            elevation,
            density,
            font,
            spread,
            shrink,
            toggle,
        ]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Chip</H1>

                <Section gap={12}>
                    <H2>Types and variants</H2>
                    {chipTypes.map(t => (
                        <Stack gap={4} key={t}>
                            <Div>{t.charAt(0).toUpperCase() + t.slice(1)}</Div>
                            <Flex gap={8} wrap>
                                {chipVariants.map(v => (
                                    <Chip key={v.label} {...shared} label={v.label} type={t} variant={v.variant} />
                                ))}
                            </Flex>
                        </Stack>
                    ))}
                </Section>

                <Section gap={12}>
                    <H2>Shapes</H2>
                    <Flex gap={8} wrap>
                        <Chip {...shared} label="Square" shape="square" />
                        <Chip {...shared} label="Smooth" shape="smooth" />
                        <Chip {...shared} label="Rounded" shape="rounded" />
                        <Chip {...shared} label="Round" shape="round" />
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
                    <H2>Both icons</H2>
                    <Flex gap={8} wrap>
                        <Chip
                            {...shared}
                            icon={<MdStar />}
                            label="Assist"
                            trailing={<MdOutlineCircle />}
                            type="assist"
                        />
                        <Chip
                            {...shared}
                            icon={<MdFilterList />}
                            label="Filter"
                            trailing={<MdOutlineCircle />}
                            type="filter"
                        />
                        <Chip
                            {...shared}
                            icon={<MdPerson />}
                            label="Person"
                            trailing={<MdOutlineCircle />}
                            type="input"
                        />
                        <Chip
                            {...shared}
                            icon={<MdFavorite />}
                            label="Suggestion"
                            trailing={<MdOutlineCircle />}
                            type="suggestion"
                        />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Avatar</H2>
                    <Flex gap={8} wrap>
                        <Chip
                            {...shared}
                            avatar={<Avatar name="Anna Nowak" size="extraSmall" />}
                            label="Assist"
                            type="assist"
                        />
                        <Chip
                            {...shared}
                            avatar={<Avatar name="Jan Kowalski" size="extraSmall" />}
                            label="Filter"
                            type="filter"
                        />
                        <Chip
                            {...shared}
                            avatar={<Avatar name="Ewa Nowak" size="extraSmall" />}
                            label="Input"
                            type="input"
                        />
                        <Chip
                            {...shared}
                            avatar={<Avatar name="Piotr Lis" size="extraSmall" />}
                            label="Suggestion"
                            type="suggestion"
                        />
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

                <Section gap={12}>
                    <H2>Loading</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Chip {...shared} icon={<MdStar />} label="Spinner" loading />
                        <Chip {...shared} disabled label="Spinner" leading={<MdStar />} loading />
                        <Chip {...shared} content="Content" label="Spinner" loading />
                        <Chip {...shared} label="Spinner" loading>
                            Children
                        </Chip>
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Links</H2>
                    <Flex gap={8} wrap>
                        <Chip
                            {...shared}
                            as="a"
                            filled
                            href="https://www.wikipedia.org"
                            icon={<BsWikipedia />}
                            label="Wikipedia"
                            rel="noreferrer"
                            target="_blank"
                        />
                        <Chip {...shared} as={Link} filled icon={<BiColor />} label="Color page" to={paths.color} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Content</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Chip
                            {...shared}
                            content={<ScrollingText text="Custom Slot Demo" />}
                            filled
                            label="Custom Slot Demo"
                        />
                        <Chip
                            {...shared}
                            content={<ScrollingText text="Custom Slot Demo" />}
                            icon={<MdAdd />}
                            label="Slots"
                            tonal
                            trailing={<MdRemove />}
                        />
                        <Chip {...shared} content="😊" icon={<MdAdd />} label="Add" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Custom</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Chip {...shared} filled label="Image 1">
                            <img alt="" height={64} src={tree} width={64} />
                        </Chip>
                        <Chip {...shared} filled label="Image 1" leading={<MdAdd />} trailing={<MdRemove />}>
                            <img alt="" height={64} src={tree} width={64} />
                        </Chip>
                        <Chip {...shared} disabled filled label="Image 1 disabled">
                            <img alt="" height={64} src={tree} width={64} />
                        </Chip>
                        <Chip {...shared} filled label="Image 2" shrink>
                            <img alt="" height={80} src={tree} width={80} />
                        </Chip>
                        <Chip {...shared} filled label="Image 2" leading={<MdAdd />} shrink trailing={<MdRemove />}>
                            <img alt="" height={80} src={tree} width={80} />
                        </Chip>
                        <Chip {...shared} label="Image 2">
                            <span className="px-1"> SPAN </span>
                        </Chip>
                        <Chip {...shared} filled label="Image 2">
                            <span className="px-1">FILLED SPAN</span>
                        </Chip>
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
                        selectedColor: sc,
                        size: sz,
                        shape: sp,
                        selectedShape: ss,
                        border: bd,
                        borderColor: bc,
                        elevation: el,
                        density: ds,
                        font: ft,
                        spread: spr,
                        shrink: sh,
                        toggle: tg,
                    }) => {
                        setColor(cl ?? null);
                        setSelectedColor(sc ?? null);
                        setSize(sz ?? null);
                        setShape(sp ?? null);
                        setSelectedShape(ss ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setElevation(el ?? null);
                        setDensity(ds ?? null);
                        setFont(ft ?? null);
                        setSpread(spr ?? null);
                        setShrink(sh ?? null);
                        setToggle(tg ?? null);
                    }}
                    selectedColor={selectedColor}
                    selectedShape={selectedShape}
                    shape={shape}
                    shrink={shrink}
                    size={size}
                    spread={spread}
                    toggle={toggle}
                />
            </Aside>
        </Article>
    );
};
