import { useState } from 'react';

import { Article, Aside, Content, Div, ElementSize, Flex, Grid, H1, H2, P, Section, Spinner, TextColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const SpinnerPage = () => {
    const [inkColor, setInkColor] = useState<TextColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [stretch, setStretch] = useState<boolean | null>(false);
    const variants = ['ring', 'dots', 'blade', 'bars', 'orbit', 'arc', 'stepBar', 'dualRing'] as const;
    const sizes: ElementSize[] = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Spinners</H1>
                <Section gap={12}>
                    <H2>Modifiers</H2>
                    <Flex gap={12} wrap>
                        {variants.map(variant => (
                            <Grid color="surfaceDim" gap={8} key={variant} p={12}>
                                <Div>{variant}</Div>
                                <Div height={80} width={80}>
                                    <Spinner
                                        color={inkColor ?? undefined}
                                        size={size ?? undefined}
                                        stretch={!!stretch}
                                        variant={variant}
                                    />
                                </Div>
                            </Grid>
                        ))}
                    </Flex>
                </Section>
                <Section gap={12}>
                    <H2>In text</H2>
                    <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Loading{' '}
                        <Spinner color={inkColor ?? undefined} size={size ?? 'extraSmall'} variant="dualRing" /> data from
                        the server. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam.
                    </P>
                </Section>
                <Section gap={12}>
                    <H2>All Sizes</H2>
                    <Grid cols={4} gap={20}>
                        {variants.map(variant => (
                            <Grid color="surfaceDim" gap={12} key={variant} p={12}>
                                <Div>{variant}</Div>
                                <Flex alignItems="center" gap={12} wrap>
                                    {sizes.map(size => (
                                        <Spinner color={inkColor ?? undefined} key={size} size={size} variant={variant} />
                                    ))}
                                </Flex>
                            </Grid>
                        ))}
                    </Grid>
                </Section>
            </Content>
            <Aside>
                <Modifiers
                    inkColor={inkColor}
                    onChange={({ inkColor: c, size: sz, stretch: st }) => {
                        setInkColor(c ?? null);
                        setSize(sz ?? null);
                        setStretch(st ?? null);
                    }}
                    size={size}
                    stretch={stretch}
                />
            </Aside>
        </Article>
    );
};

export default SpinnerPage;
