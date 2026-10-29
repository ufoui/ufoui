import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    Div,
    Divider,
    ElementBorder,
    ElementElevation,
    ElementInset,
    ElementOrientation,
    ElementShape,
    Flex,
    Grid,
    H1,
    H2,
    Section,
    Stack,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const DividerPage = () => {
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [lineColor, setLineColor] = useState<BorderColor | null>(null);
    const [inset, setInset] = useState<ElementInset | null>(null);
    const [orientation, setOrientation] = useState<ElementOrientation | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const insets = [undefined, 'start', 'end', 'both'] as const;
    const borders: ElementBorder[] = [1, 2, 3, 4];

    const shared = useMemo(
        () => ({
            border: border ?? undefined,
            color: lineColor ?? undefined,
            elevation: elevation ?? undefined,
            shape: shape ?? undefined,
        }),
        [border, lineColor, elevation, shape]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow px={24} py={24}>
                <H1>Divider</H1>

                <Section gap={12}>
                    <H2>Modifiers</H2>
                    <Flex alignItems="center" color="surfaceContainer" gap={12} height={120} p={12}>
                        <Div>Before</Div>
                        <Divider {...shared} inset={inset ?? undefined} orientation={orientation ?? undefined} />
                        <Div>After</Div>
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Block parent</H2>
                    <Div color="surfaceContainer" p={12}>
                        <Div>First block</Div>
                        <Divider {...shared} />
                        <Div>Second block</Div>
                        <Divider {...shared} orientation="vertical" />
                        <Div>Vertical without height</Div>
                        <Divider {...shared} height="24px" orientation="vertical" />
                        <Div>Vertical with height</Div>
                    </Div>
                </Section>

                <Section gap={12}>
                    <H2>Inline in text</H2>
                    <Div color="surfaceContainer" p={12}>
                        Home
                        <Divider {...shared} mx={8} orientation="vertical" />
                        Library
                        <Divider {...shared} mx={8} orientation="vertical" />
                        Settings
                    </Div>
                </Section>

                <Section gap={12}>
                    <H2>Flex column</H2>
                    <Flex gap={16}>
                        <Stack color="surfaceContainer" grow p={12}>
                            <Div>Auto height</Div>
                            <Divider {...shared} />
                            <Div>Item 2</Div>
                            <Divider {...shared} />
                            <Div>Item 3</Div>
                        </Stack>
                        <Stack color="surfaceContainer" grow height={200} p={12}>
                            <Div>Fixed height 200</Div>
                            <Divider {...shared} />
                            <Div>Item 2</Div>
                            <Divider {...shared} />
                            <Div>Item 3</Div>
                        </Stack>
                        <Stack alignItems="center" color="surfaceContainer" grow p={12}>
                            <Div>alignItems center</Div>
                            <Divider {...shared} />
                            <Div>Item 2</Div>
                            <Divider {...shared} />
                            <Div>Item 3</Div>
                        </Stack>
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Flex row</H2>
                    <Flex alignItems="center" color="surfaceContainer" gap={8} height={48} px={12}>
                        <Div>Item 1</Div>
                        <Divider {...shared} orientation="vertical" />
                        <Div>Item 2</Div>
                        <Divider {...shared} height="24px" orientation="vertical" />
                        <Div>Item 3 (height 24px)</Div>
                    </Flex>
                    <Flex alignItems="center" color="surfaceContainer" gap={8} px={12}>
                        <Divider {...shared} />
                        <Div>Horizontal line as filler</Div>
                        <Divider {...shared} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Grid</H2>
                    <Grid color="surfaceContainer" cols="1fr auto 1fr" gap={12} height={80} p={12}>
                        <Div>Left cell</Div>
                        <Divider {...shared} orientation="vertical" />
                        <Div>Right cell</Div>
                    </Grid>
                    <Grid color="surfaceContainer" cols={1} gap={12} p={12}>
                        <Div>Top cell</Div>
                        <Divider {...shared} />
                        <Div>Bottom cell</Div>
                    </Grid>
                </Section>

                <Section gap={12}>
                    <H2>Inset</H2>
                    <Stack color="surfaceContainer" gap={12} py={12}>
                        {insets.map(inset => (
                            <Stack gap={4} key={inset ?? 'none'}>
                                <Div px={16}>{inset ?? 'none'}</Div>
                                <Divider {...shared} inset={inset} />
                            </Stack>
                        ))}
                    </Stack>
                    <Flex color="surfaceContainer" gap={8} height={120} px={12}>
                        {insets.map(inset => (
                            <Flex alignItems="center" gap={8} key={inset ?? 'none'}>
                                <Div>{inset ?? 'none'}</Div>
                                <Divider {...shared} inset={inset} orientation="vertical" />
                            </Flex>
                        ))}
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Thickness</H2>
                    <Stack color="surfaceContainer" gap={12} p={12}>
                        {borders.map(b => (
                            <Stack gap={4} key={b}>
                                <Div>border {b}</Div>
                                <Divider {...shared} border={b} />
                            </Stack>
                        ))}
                    </Stack>
                </Section>
            </Content>
            <Aside px={20}>
                <Modifiers
                    border={border}
                    elevation={elevation}
                    inset={inset}
                    lineColor={lineColor}
                    onChange={({ border: bd, lineColor: lc, elevation: el, shape: sp, inset: is, orientation: or }) => {
                        setBorder(bd ?? null);
                        setLineColor(lc ?? null);
                        setElevation(el ?? null);
                        setShape(sp ?? null);
                        setInset(is ?? null);
                        setOrientation(or ?? null);
                    }}
                    orientation={orientation}
                    shape={shape}
                />
            </Aside>
        </Article>
    );
};
