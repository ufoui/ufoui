import { useMemo, useState } from 'react';
import { MdFavorite, MdFavoriteBorder, MdStar, MdStarBorder } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    ElementDensity,
    ElementSize,
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

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            density: density ?? undefined,
            size: size ?? undefined,
        }),
        [color, density, size]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow>
                <H1>Rating</H1>

                <Section gap={20}>
                    <H2>Default Stars</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            defaultValue={3}
                            emptyIcon={<MdStarBorder size={24} />}
                            icon={<MdStar size={24} />}
                        />
                        <Rating
                            {...shared}
                            defaultValue={3}
                            disabled
                            emptyIcon={<MdStarBorder size={28} />}
                            icon={<MdStar size={28} />}
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
                        <Rating
                            {...shared}
                            defaultValue={7}
                            emptyIcon={<MdStarBorder size={20} />}
                            icon={<MdStar size={20} />}
                            max={10}
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Controlled</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            emptyIcon={<MdStarBorder size={24} />}
                            icon={<MdStar size={24} />}
                            onChange={v => {
                                setValue(v);
                            }}
                            value={value}
                        />
                        <P>Value: {value}</P>
                    </Flex>

                    <Section gap={20}>
                        <H2>Filled</H2>
                        <Flex alignItems="center" gap={24}>
                            <Rating defaultValue={2.5} filled {...shared} icon={<MdStar size={24} />} />
                        </Flex>
                    </Section>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    density={density}
                    onChange={({ surfaceColor: cl, density: ds, size: sz }) => {
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setSize(sz ?? null);
                    }}
                    size={size}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
