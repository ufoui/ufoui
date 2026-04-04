import { useMemo, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    ElementDensity,
    ElementFont,
    ElementSize,
    ElementTextPlacement,
    Flex,
    H1,
    H2,
    P,
    Rating,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const RatingPage = () => {
    const [value, setValue] = useState(3.5);
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [textPlacement, setTextPlacement] = useState<ElementTextPlacement | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            density: density ?? undefined,
            size: size ?? undefined,
            font: font ?? undefined,
            textPlacement: textPlacement ?? undefined,
        }),
        [color, density, size, font, textPlacement]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow>
                <H1>Rating</H1>

                <Section gap={20}>
                    <H2>Default Stars</H2>
                    <Flex alignItems="end" gap={24}>
                        <Rating {...shared} defaultValue={3} description="Enabled" label="Rating" />
                        <Rating {...shared} defaultValue={3} description="Disabled" disabled />
                        <Rating
                            {...shared}
                            defaultValue={3}
                            description="Read only with tooltip"
                            label="Read only"
                            readOnly
                            title="Simple tooltip"
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Hearts</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            defaultValue={3}
                            emptyIcon={<MdFavoriteBorder size={24} />}
                            icon={<MdFavorite size={24} />}
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Different max</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating {...shared} defaultValue={7} max={10} />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Controlled</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            onChange={v => {
                                setValue(v);
                            }}
                            value={value}
                        />
                        <P>Value: {value}</P>
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Filled</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating defaultValue={2.5} filled {...shared} />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Error</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating defaultValue={2.5} error="Some error" label="Error" {...shared} />
                        <Rating
                            defaultValue={2.5}
                            disabled
                            error="Some error"
                            filled
                            label="Disabled Error"
                            {...shared}
                        />
                    </Flex>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    density={density}
                    font={font}
                    onChange={({ surfaceColor: cl, density: ds, size: sz, font: ft, textPlacement: tp }) => {
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setSize(sz ?? null);
                        setFont(ft ?? null);
                        setTextPlacement(tp ?? null);
                    }}
                    size={size}
                    surfaceColor={color}
                    textPlacement={textPlacement}
                />
            </Aside>
        </Article>
    );
};
