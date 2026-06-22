import { useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    H1,
    H2,
    P,
    Radio,
    RadioGroup,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const RadioGroupPage = () => {
    const [font, setFont] = useState<ElementFont | null>(null);
    const [surfaceColor, setSurfaceColor] = useState<SurfaceColor | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [value, setValue] = useState('email');

    const shared = {
        font: font ?? undefined,
        color: surfaceColor ?? undefined,
        border: border ?? undefined,
        borderColor: borderColor ?? undefined,
        shape: shape ?? undefined,
        elevation: elevation ?? undefined,
        disabled: disabled ?? undefined,
        p: 16 as const,
    };

    const control = { density: density ?? undefined };

    return (
        <Article direction="row" fullWidth pb={20}>
            <Content gap={20} grow>
                <H1>RadioGroup</H1>

                <Section alignItems="start" gap={12}>
                    <H2>Basic (uncontrolled)</H2>
                    <RadioGroup {...shared} defaultValue="email" legend="Notifications" name="basic">
                        <Radio {...control} label="Email" value="email" />
                        <Radio {...control} label="SMS" value="sms" />
                        <Radio {...control} label="Push" value="push" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>With description</H2>
                    <RadioGroup
                        {...shared}
                        defaultValue="standard"
                        description="Pick the shipping speed."
                        legend="Delivery"
                        name="delivery">
                        <Radio {...control} label="Standard" value="standard" />
                        <Radio {...control} label="Express" value="express" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Error state</H2>
                    <P>`error` overrides `description`.</P>
                    <RadioGroup
                        {...shared}
                        description="This text is hidden by the error."
                        error="Select a plan to continue."
                        legend="Plan"
                        name="plan">
                        <Radio {...control} label="Free" value="free" />
                        <Radio {...control} label="Pro" value="pro" />
                        <Radio {...control} label="Enterprise" value="enterprise" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Required</H2>
                    <RadioGroup {...shared} legend="Agreement" name="agreement" required>
                        <Radio {...control} label="Accept" value="accept" />
                        <Radio {...control} label="Decline" value="decline" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Disabled group</H2>
                    <P>Disabling the group disables every radio inside it.</P>
                    <RadioGroup {...shared} defaultValue="a" disabled legend="Unavailable" name="disabledGroup">
                        <Radio {...control} label="Option A" value="a" />
                        <Radio {...control} label="Option B" value="b" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Controlled</H2>
                    <P>Selected: {value}</P>
                    <RadioGroup
                        {...shared}
                        legend="Contact method"
                        name="controlled"
                        onChange={setValue}
                        value={value}>
                        <Radio {...control} label="Email" value="email" />
                        <Radio {...control} label="Phone" value="phone" />
                        <Radio {...control} label="Mail" value="mail" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Legend via `label` alias</H2>
                    <RadioGroup {...shared} defaultValue="opt" label="From label prop" name="alias">
                        <Radio {...control} label="Option" value="opt" />
                        <Radio {...control} label="Other" value="other" />
                    </RadioGroup>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Horizontal</H2>
                    <RadioGroup {...shared} defaultValue="1" direction="row" gap={16} legend="Inline" name="inline">
                        <Radio {...control} label="One" value="1" />
                        <Radio {...control} label="Two" value="2" />
                        <Radio {...control} label="Three" value="3" />
                    </RadioGroup>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    disabled={disabled}
                    elevation={elevation}
                    font={font}
                    onChange={({
                        border: bd,
                        borderColor: bdc,
                        density: dn,
                        disabled: db,
                        elevation: el,
                        font: ft,
                        shape: sp,
                        surfaceColor: sc,
                    }) => {
                        setBorder(bd ?? null);
                        setBorderColor(bdc ?? null);
                        setDensity(dn ?? null);
                        setDisabled(db ?? null);
                        setElevation(el ?? null);
                        setFont(ft ?? null);
                        setShape(sp ?? null);
                        setSurfaceColor(sc ?? null);
                    }}
                    shape={shape}
                    surfaceColor={surfaceColor}
                />
            </Aside>
        </Article>
    );
};
