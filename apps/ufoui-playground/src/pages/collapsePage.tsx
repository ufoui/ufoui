import { useMemo, useState } from 'react';
import { fakerEN as faker } from '@faker-js/faker';

import {
    Article,
    Aside,
    BorderColor,
    Button,
    Collapse,
    Div,
    ElementBorder,
    ElementElevation,
    ElementShape,
    Flex,
    H1,
    H2,
    Section,
    Span,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const CollapsePage = () => {
    const text1 = useMemo(() => faker.lorem.paragraphs(5), []);
    const text2 = useMemo(() => faker.lorem.paragraphs(5), []);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(true);
    const paragraphs3 = useMemo(() => faker.lorem.paragraphs(10, '\n').split('\n'), []);
    const [open3, setOpen3] = useState(false);
    const [count3, setCount3] = useState(1);

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
            px: '24px',
            py: '16px',
        }),
        [color, shape, elevation, border, borderColor]
    );

    return (
        <Article direction="row" fullWidth>
            <Section alignItems="start" gap={24} grow p={16}>
                <H1>Collapse</H1>
                <H2>Basic Collapse</H2>

                <Button
                    filled
                    label={open1 ? 'Close' : 'Open'}
                    onClick={() => {
                        setOpen1(v => !v);
                    }}
                />

                <Collapse {...shared} open={open1}>
                    <Span>{text1}</Span>
                </Collapse>

                <H2>SlideDown Animation</H2>

                <Button
                    label={open2 ? 'Close' : 'Open'}
                    onClick={() => {
                        setOpen2(v => !v);
                    }}
                    tonal
                />
                <Div width={1250}>
                    <Collapse {...shared} animation="slideDown" open={open2}>
                        <Span>{text2}</Span>
                    </Collapse>
                </Div>

                <H2>Zero Duration</H2>

                <Flex gap={8}>
                    <Button
                        label={open3 ? 'Close' : 'Open'}
                        onClick={() => {
                            setOpen3(v => !v);
                        }}
                        tonal
                    />
                    <Button
                        label="Add paragraph"
                        onClick={() => {
                            setCount3(v => Math.min(v + 1, paragraphs3.length));
                        }}
                        outlined
                    />
                </Flex>

                <Collapse {...shared} animation={{ animation: 'slideDown', duration: 0 }} direction="col" open={open3}>
                    {paragraphs3.slice(0, count3).map(p => (
                        <Span key={p}>{p}</Span>
                    ))}
                </Collapse>
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
