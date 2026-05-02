import { useState } from 'react';

import { Article, Aside, BaseColor, Content, Div, ElementSize, Flex, Grid, H1, H2, Spinner } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const SpinnerPage = () => {
    const [baseColor, setBaseColor] = useState<BaseColor | null>(null);
    const variants = ['ring', 'dots', 'blade', 'bars', 'orbit', 'arc', 'stepBar', 'dualRing'] as const;
    const sizes: ElementSize[] = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Spinners</H1>
                <H2>All Sizes</H2>
                <Grid cols={4} gap={20}>
                    {variants.map(variant => (
                        <Grid color="surfaceDim" gap={12} key={variant} p={12}>
                            <Div>{variant}</Div>
                            <Flex alignItems="center" gap={12} wrap>
                                {sizes.map(size => (
                                    <Spinner color={baseColor ?? undefined} key={size} size={size} variant={variant} />
                                ))}
                            </Flex>
                        </Grid>
                    ))}
                </Grid>
            </Content>
            <Aside>
                <Modifiers
                    baseColor={baseColor}
                    onChange={({ baseColor: c }) => {
                        setBaseColor(c ?? null);
                    }}
                />
            </Aside>
        </Article>
    );
};

export default SpinnerPage;
