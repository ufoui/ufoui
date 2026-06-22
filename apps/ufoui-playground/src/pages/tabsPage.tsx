import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    Div,
    ElementBorder,
    ElementElevation,
    ElementShape,
    H1,
    H2,
    Section,
    SurfaceColor,
    Tab,
    Tabs,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const TabsPage = () => {
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
            px: 16,
            py: 16,
            gap: 8,
        }),
        [color, shape, elevation, border, borderColor]
    );

    return (
        <Article direction="row" fullWidth>
            <Content alignItems="start" gap={24} grow p={16}>
                <H1>Tabs</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Basic Tabs</H2>

                    <Tabs defaultValue="a" {...shared}>
                        <Tab label="First Tab" value="a">
                            <Div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Div>
                        </Tab>

                        <Tab label="Second Tab" value="b">
                            <Div>Sed non risus. Suspendisse lectus tortor.</Div>
                        </Tab>
                        <Tab label="Third Tab" value="c">
                            <Div>Not supposed to be here.</Div>
                            <Div>Cras elementum ultrices diam. Maecenas ligula massa.</Div>
                        </Tab>
                    </Tabs>
                </Section>
            </Content>

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
