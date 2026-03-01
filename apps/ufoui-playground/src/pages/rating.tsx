import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder, MdStar, MdStarBorder } from 'react-icons/md';

import { Article, Aside, Content, Flex, H1, H2, P, Rating, Section, SurfaceColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const RatingPage = () => {
    const [value, setValue] = useState(3.5);
    const [color, setColor] = useState<SurfaceColor | null>(null);

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow>
                <H1>Rating</H1>

                <Section gap={20}>
                    <H2>Material Stars</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating emptyIcon={<MdStarBorder size={24} />} icon={<MdStar size={24} />} value={3.5} />
                        <Rating emptyIcon={<MdStarBorder size={28} />} icon={<MdStar size={28} />} value={4.2} />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Hearts</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            color={color ?? undefined}
                            emptyIcon={<MdFavoriteBorder size={24} />}
                            icon={<MdFavorite size={24} />}
                            value={2.5}
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Different max</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            emptyIcon={<MdStarBorder size={20} />}
                            icon={<MdStar size={20} />}
                            max={10}
                            value={7.3}
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Interactive (click demo)</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            color={color ?? undefined}
                            emptyIcon={<MdStarBorder size={24} />}
                            icon={<MdStar size={24} />}
                            onClick={() => {
                                setValue(v => (v >= 5 ? 0 : v + 0.5));
                            }}
                            value={value}
                        />
                        <P>Value: {value}</P>
                    </Flex>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    onChange={({ surfaceColor }) => {
                        setColor(surfaceColor ?? null);
                    }}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
