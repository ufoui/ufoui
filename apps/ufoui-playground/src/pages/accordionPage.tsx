import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

import {
    Accordion,
    AccordionItem,
    AccordionVariant,
    Article,
    Aside,
    BorderColor,
    Div,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    Grid,
    H1,
    H2,
    Section,
    SurfaceColor,
    useResponsive,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const AccordionPage = () => {
    const { br } = useResponsive();
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [showIcon, setShowIcon] = useState<boolean | null>(true);
    const [font, setFont] = useState<ElementFont | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            density: density ?? undefined,
            disabled: !!disabled,
            showIcon: !!showIcon,
            font: font ?? undefined,
        }),
        [color, shape, elevation, border, borderColor, density, disabled, showIcon, font]
    );

    const longTitle =
        'This is a very long accordion title used to test layout wrapping, truncation and alignment behavior inside the header element';

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <H1>Accordion</H1>

                {/* ───────────────────────── SINGLE ───────────────────────── */}

                <H2 font="customH2">Single Item Accordion</H2>
                <Grid cols={br({ base: 1, lg: 2, ufo: 3, xxl: 4 })} fullWidth gap={20}>
                    {['text', 'grouped', 'pills', 'segmented'].map(variant => (
                        <Accordion key={variant} type="multiple" {...shared} variant={variant as AccordionVariant}>
                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'a'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'b'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'c'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>
                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'd'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'e'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'f'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>
                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'g'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'h'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>

                            <AccordionItem label={faker.lorem.sentence()} value={variant + 'i'}>
                                <Div>{faker.lorem.paragraph()}</Div>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </Grid>

                {/* <H2>Multiple Items Accordion</H2>*/}
                {/* <Grid cols={4} wFull gap={20}>*/}
                {/*    {['text', 'grouped', 'pills', 'segmented'].map(variant => (*/}
                {/*        <Accordion key={variant} type="multiple" {...shared} variant={variant as AccordionVariant}>*/}
                {/*            <AccordionItem label={faker.lorem.sentence()} value="1">*/}
                {/*                <Div>{faker.lorem.paragraph()}</Div>*/}
                {/*            </AccordionItem>*/}

                {/*            <AccordionItem label={faker.lorem.sentence()} value="2">*/}
                {/*                <Div>{faker.lorem.paragraph()}</Div>*/}
                {/*            </AccordionItem>*/}

                {/*            <AccordionItem label={faker.lorem.sentence()} value="3">*/}
                {/*                <Div>{faker.lorem.paragraph()}</Div>*/}
                {/*            </AccordionItem>*/}
                {/*        </Accordion>*/}
                {/*    ))}*/}
                {/* </Grid>*/}

                {/* <H2>Accordions With Leading Icons & Long Titles</H2>*/}
                {/* <Grid cols={3} wFull gap={20}>*/}
                {/*    <Accordion type="single" {...shared} variant="text">*/}
                {/*        <AccordionItem label={longTitle} leading={<MdInfo />} value="1">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}

                {/*        <AccordionItem label={longTitle} leading={<MdSettings />} value="2">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}
                {/*    </Accordion>*/}

                {/*    <Accordion type="single" {...shared} variant="segmented">*/}
                {/*        <AccordionItem label={longTitle} leading={<MdWarning />} trailing={<MdInfo />} value="1">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}

                {/*        <AccordionItem label={longTitle} leading={<MdInfo />} value="2">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}
                {/*    </Accordion>*/}

                {/*    <Accordion type="single" {...shared} variant="grouped">*/}
                {/*        <AccordionItem label={longTitle} leading={<MdSettings />} value="1">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}

                {/*        <AccordionItem label={longTitle} leading={<MdWarning />} value="2">*/}
                {/*            <Div>{faker.lorem.paragraphs(2)}</Div>*/}
                {/*        </AccordionItem>*/}
                {/*    </Accordion>*/}
                {/* </Grid>*/}
            </Section>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    disabled={disabled}
                    elevation={elevation}
                    font={font}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        font: lf,
                        density: ds,
                        disabled: db,
                        showIcon: si,
                        borderColor: bc,
                    }) => {
                        setColor(sc ?? null);
                        setDensity(ds ?? null);
                        setShape(sp ?? null);
                        setFont(lf ?? null);
                        setDisabled(db ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setShowIcon(si ?? null);
                    }}
                    shape={shape}
                    showIcon={showIcon}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
