import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Div,
    Divider,
    ElementBorder,
    ElementElevation,
    ElementShape,
    Flex,
    Grid,
    H2,
    Section,
    Span,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const BoxPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            px: 8,
            py: '1rem',
            gap: 8,
        }),
        [color, shape, elevation, border, borderColor]
    );

    return (
        <Article direction="row" fullWidth>
            <Section alignItems="start" color="surface" gap={16} grow p={16}>
                <H2>Basic Flex</H2>
                <Flex {...shared}>
                    <Flex>Simple Flex Line 1</Flex>
                    <Flex>Simple Flex Line 2</Flex>
                </Flex>
                <Flex {...shared}>
                    <Flex color="primary">
                        <Flex>Primary Flex 1 in the Flex Line 1</Flex>
                        <Flex>Primary Flex 1 in the Flex Line 2</Flex>
                    </Flex>
                    <Flex>
                        <Flex>Default Flex 2 in the Flex Line 1</Flex>
                        <Flex>Default Flex 2 in the Flex Line 2</Flex>
                    </Flex>
                </Flex>
                <H2>Flex Grow Example</H2>
                <Flex {...shared} fullWidth>
                    <Flex color="primary" grow>
                        <Div>Growing Flex 1</Div>
                    </Flex>
                    <Flex>
                        <Div>Simple Flex 2</Div>
                    </Flex>
                </Flex>
                <H2>Full Width Flex Example</H2>
                <Flex {...shared} fullWidth>
                    <Flex color="primary" fullWidth>
                        <Div>Full Width Flex 1</Div>
                    </Flex>
                    <Flex>
                        <Div>Simple Flex 2</Div>
                    </Flex>
                </Flex>
                <H2>Inline Flex Example</H2>
                <Flex {...shared}>
                    <Div>
                        <Span>Before Flex</Span>
                        <Flex color="primary" inline>
                            Inline Flex Box
                        </Flex>
                        <Span>After Flex</Span>
                    </Div>
                    <Div>
                        <Span>Before Flex</Span>
                        <Flex color="primary">Simple Flex Box</Flex>
                        <Span>After Flex</Span>
                    </Div>
                </Flex>

                <H2>Flex Direction Example</H2>
                <Flex {...shared} inline>
                    <Flex>
                        <Div>Row 1</Div>
                        <Div>Row 2</Div>
                        <Div>Row 3</Div>
                        <Div>Row 4</Div>
                    </Flex>
                    <Flex direction="col">
                        <Div>Col 1</Div>
                        <Div>Col 2</Div>
                        <Div>Col 3</Div>
                        <Div>Col 4</Div>
                    </Flex>
                </Flex>

                <H2>Grid Example</H2>
                <Grid {...shared}>
                    <Div>Grid Line 1</Div>
                    <Div>Grid Line 2</Div>
                    <Div>Grid Line 3</Div>
                    <Div>Grid Line 4</Div>
                </Grid>
                <H2 mt={24}>Article</H2>
                <Article {...shared}>
                    <Div>Simple Article Line 1</Div>
                    <Div>Simple Article Line 2</Div>
                </Article>
                <H2 mt={24}>Dividers</H2>
                <Div fullWidth>
                    <Div>Horizontal in block</Div>
                    <Divider border={4} inset="middle" />
                    <Div>Line 2</Div>
                </Div>
                <Div fullWidth>
                    <Span>Vertical in block</Span>
                    <Divider border={4} height="24px" inset="middle" vertical />
                    <Span>Text after</Span>
                    <Span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                        tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                        Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                    </Span>
                </Div>
                <Divider />
                <Flex fullWidth wrap>
                    <Div>Horizontal in flex row wrap</Div>
                    <Divider border={4} inset="middle" />
                    <Div>Line 2</Div>
                </Flex>
                <Flex fullWidth>
                    <Div>Horizontal in in flex row</Div>
                    <Divider border={4} inset="middle" />
                    <Div>Line 2</Div>
                </Flex>
                <Flex alignItems="center" fullWidth>
                    <Div>Vertical in in flex row</Div>
                    <Divider border={4} inset="middle" insetSize={2} vertical />
                    <Div>Line 2</Div>
                </Flex>
                <Divider />
                <Flex direction="col" fullWidth>
                    <Div>Horizontal in flex col</Div>
                    <Divider border={4} inset="middle" />
                    <Div>Line 2</Div>
                </Flex>
                <Flex direction="col" fullWidth>
                    <Div>Vertical in in flex col</Div>
                    <Divider border={4} height="20px" inset="middle" vertical />
                    <Div>Line 2</Div>
                </Flex>
            </Section>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    onChange={({ surfaceColor: sc, elevation: el, shape: sp, border: bd, borderColor: bc }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                    }}
                    shape={shape}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
