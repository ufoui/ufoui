import { useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Checkbox,
    Content,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    Fieldset,
    H1,
    H2,
    P,
    Section,
    SurfaceColor,
    Switch,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const FieldsetPage = () => {
    const [font, setFont] = useState<ElementFont | null>(null);
    const [surfaceColor, setSurfaceColor] = useState<SurfaceColor | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);

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
                <H1>Fieldset</H1>

                <Section alignItems="start" gap={12}>
                    <H2>Basic</H2>
                    <Fieldset {...shared} legend="Notifications">
                        <Checkbox {...control} defaultChecked label="Email" value="email" />
                        <Checkbox {...control} label="SMS" value="sms" />
                        <Checkbox {...control} label="Push" value="push" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>With description</H2>
                    <Fieldset {...shared} description="Toggle the features you want enabled." legend="Preferences">
                        <Switch {...control} defaultChecked label="Dark mode" />
                        <Switch {...control} label="Auto-save" />
                        <Switch {...control} label="Beta features" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Error state</H2>
                    <P>`error` overrides `description`.</P>
                    <Fieldset
                        {...shared}
                        description="This text is hidden by the error."
                        error="Select at least one option."
                        legend="Consents">
                        <Checkbox {...control} label="Terms of service" value="tos" />
                        <Checkbox {...control} label="Privacy policy" value="privacy" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Required</H2>
                    <Fieldset {...shared} legend="Agreements" required>
                        <Checkbox {...control} label="I accept the terms" value="accept" />
                        <Switch {...control} label="Subscribe to the newsletter" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Disabled group</H2>
                    <P>Disabling the fieldset disables every control inside it.</P>
                    <Fieldset {...shared} disabled legend="Unavailable">
                        <Checkbox {...control} defaultChecked label="Option A" value="a" />
                        <Checkbox {...control} label="Option B" value="b" />
                        <Switch {...control} label="Option C" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Legend via `label` alias</H2>
                    <Fieldset {...shared} label="From label prop">
                        <Checkbox {...control} label="Checkbox" value="opt" />
                        <Switch {...control} label="Switch" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Horizontal - switches</H2>
                    <Fieldset {...shared} direction="row" gap={16} legend="Inline switches">
                        <Switch {...control} defaultChecked label="One" />
                        <Switch {...control} label="Two" />
                        <Switch {...control} label="Three" />
                    </Fieldset>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Horizontal - checkboxes</H2>
                    <Fieldset {...shared} direction="row" gap={16} legend="Inline checkboxes">
                        <Checkbox {...control} defaultChecked label="One" value="1" />
                        <Checkbox {...control} label="Two" value="2" />
                        <Checkbox {...control} label="Three" value="3" />
                    </Fieldset>
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
