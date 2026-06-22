import React, { useMemo, useState } from 'react';
import { MdCake, MdCheck, MdClose, MdDoNotDisturb, MdOutlineFavorite as MdFavorite } from 'react-icons/md';

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
    ElementSize,
    ElementTextPlacement,
    Fieldset,
    H1,
    Section,
    SemanticColor,
    Span,
    Stack,
    SurfaceColor,
    Switch,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';
import tree from '../assets/tree.jpg';

export const SwitchPage = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(true);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [uncheckedBorder, setUncheckedBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [uncheckedBorderColor, setUncheckedBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [uncheckedColor, setUncheckedColor] = useState<SemanticColor | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [filled, setFilled] = useState<boolean | null>(true);
    const [readOnly, setReadOnly] = useState<boolean | null>(false);
    const [focusColor, setFocusColor] = useState<SurfaceColor | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [textPlacement, setTextPlacement] = useState<ElementTextPlacement | null>(null);
    const shared = useMemo(
        () => ({
            size: size ?? undefined,
            shape: shape ?? undefined,
            border: border ?? undefined,
            uncheckedBorder: uncheckedBorder ?? undefined,
            color: color ?? undefined,
            uncheckedColor: uncheckedColor ?? undefined,
            borderColor: borderColor ?? undefined,
            uncheckedBorderColor: uncheckedBorderColor ?? undefined,
            focusColor: focusColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            filled: !!filled,
            readOnly: !!readOnly,
            font: font ?? undefined,
            textPlacement: textPlacement ?? undefined,
        }),
        [
            uncheckedBorderColor,
            uncheckedBorder,
            uncheckedColor,
            textPlacement,
            font,
            size,
            shape,
            border,
            color,
            borderColor,
            focusColor,
            elevation,
            density,
            filled,
            readOnly,
        ]
    );

    const handleIntermediateChange = () => {
        if (option1 && option2) {
            setOption1(false);
            setOption2(false);
        } else {
            setOption1(true);
            setOption2(true);
        }
    };

    const handleChangeOption1 = () => {
        setOption1(v => !v);
    };

    const handleChangeOption2 = () => {
        setOption2(v => !v);
    };

    return (
        <Article direction="row">
            <Content gap={20} grow px={20}>
                <H1>Switch</H1>
                <Section shape="rounded">
                    <Fieldset direction="row" disabled={disabled ?? undefined} gap={16} legend="States">
                        <Switch defaultChecked {...shared} label="Checked" />
                        <Switch {...shared} label="Unchecked" />
                        <Switch disabled {...shared} checked label="Disabled checked" />
                        <Switch disabled {...shared} label="Disabled" />
                    </Fieldset>
                </Section>
                <Section>
                    <Fieldset direction="row" disabled={disabled ?? undefined} gap={16} label="Color">
                        <Switch {...shared} defaultChecked label="Primary"></Switch>
                        <Switch {...shared} color="secondary" defaultChecked label="Secondary" />
                        <Switch {...shared} color="tertiary" defaultChecked label="Tertiary" />
                        <Switch {...shared} color="info" defaultChecked label="Info" />
                        <Switch {...shared} color="success" defaultChecked label="Success" />
                        <Switch {...shared} color="warning" defaultChecked label="Warning" />
                        <Switch {...shared} color="error" defaultChecked label="Error" />
                    </Fieldset>
                </Section>
                <Section>
                    <Fieldset direction="row" disabled={disabled ?? undefined} gap={16} legend="Shape">
                        <Switch {...shared} defaultChecked label="Square" shape="square" />
                        <Switch {...shared} label="Smooth" shape="smooth" />
                        <Switch {...shared} label="Rounded" shape="rounded" />
                        <Switch {...shared} label="Round" shape="round" />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset
                        alignItems="center"
                        direction="row"
                        disabled={disabled ?? undefined}
                        gap={16}
                        legend="Size">
                        <Switch {...shared} defaultChecked label="ExtraSmall" size="extraSmall" />
                        <Switch {...shared} defaultChecked label="Small" size="small" />
                        <Switch {...shared} defaultChecked label="Medium" size="medium" />
                        <Switch {...shared} defaultChecked label="Large" size="large" />
                        <Switch {...shared} defaultChecked label="ExtraLarge" size="extraLarge" />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset
                        alignItems="center"
                        direction="row"
                        disabled={disabled ?? undefined}
                        gap={16}
                        legend="Size & Icons">
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdCheck />}
                            label="ExtraSmall"
                            size="extraSmall"
                            uncheckedIcon={<MdClose />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdCheck />}
                            label="Small"
                            size="small"
                            uncheckedIcon={<MdClose />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdCheck />}
                            label="Medium"
                            size="medium"
                            uncheckedIcon={<MdClose />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdCheck />}
                            label="Large"
                            size="large"
                            uncheckedIcon={<MdClose />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdCheck />}
                            label="ExtraLarge"
                            size="extraLarge"
                            uncheckedIcon={<MdClose />}
                        />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset description="Make a choice." disabled={disabled ?? undefined} label="Controlled group">
                        <Switch
                            {...shared}
                            checked={option1 && option2}
                            label="Parent"
                            onChange={handleIntermediateChange}
                        />
                        <Stack pl={24}>
                            <Switch {...shared} checked={option1} label="Option 1" onChange={handleChangeOption1} />
                            <Switch {...shared} checked={option2} label="Option 2" onChange={handleChangeOption2} />
                        </Stack>
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset direction="row" disabled={disabled ?? undefined} gapX={16} label="Custom icons" wrap>
                        <Switch
                            {...shared}
                            defaultChecked
                            error="Error"
                            icon={<MdFavorite />}
                            label="2 Icons"
                            uncheckedIcon={<MdDoNotDisturb />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdFavorite />}
                            label="2 Icons"
                            uncheckedIcon={<MdCake />}
                        />
                        <Switch
                            {...shared}
                            defaultChecked
                            icon={<MdFavorite />}
                            label="Same Icons"
                            uncheckedIcon={<MdFavorite />}
                        />
                        <Switch {...shared} defaultChecked icon={<MdFavorite />} label="1 icon"></Switch>
                        <Switch {...shared} defaultChecked icon={<MdFavorite />} label="1 icon/-Filled" />
                        <Switch {...shared} defaultChecked label="Unchecked Only" uncheckedIcon={<MdFavorite />} />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset
                        alignItems="center"
                        direction="row"
                        disabled={disabled ?? undefined}
                        gap={20}
                        legend="Custom"
                        py={16}>
                        <Switch
                            {...shared}
                            checked={checked1}
                            label="Image"
                            onChange={() => {
                                setChecked1(v => !v);
                            }}>
                            {/* TODO[html]: brak komponentu Image w bibliotece — surowy <img> */}
                            {checked1 ? (
                                <img alt="" height={64} src={tree} style={{ transition: 'all 200ms' }} width={64} />
                            ) : (
                                <img
                                    alt=""
                                    height={64}
                                    src={tree}
                                    style={{ transform: 'rotate(90deg)', transition: 'all 200ms' }}
                                    width={64}
                                />
                            )}
                        </Switch>
                        <Switch
                            {...shared}
                            checked={checked2}
                            onChange={() => {
                                setChecked2(v => !v);
                            }}
                            title="Text">
                            {checked2 ? (
                                <Span style={{ fontWeight: 'bold', paddingInline: 8 }}>Checked</Span>
                            ) : (
                                <Span style={{ paddingInline: 8 }}>Unchecked</Span>
                            )}
                        </Switch>
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset
                        description="Global fieldset error message."
                        direction="row"
                        disabled={disabled ?? undefined}
                        legend="Controlled">
                        <Switch
                            {...shared}
                            checked={checked3}
                            label="Controlled Switch"
                            onChange={() => {
                                setChecked3(v => !v);
                            }}></Switch>
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset disabled={disabled ?? undefined} legend="Error / Description / Required" required>
                        <Switch {...shared} defaultChecked error="Error message" label="Error" required></Switch>
                        <Switch {...shared} description="Description text." label="Decription" required></Switch>
                    </Fieldset>
                </Section>
            </Content>
            <Aside px={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    color={color}
                    density={density}
                    disabled={disabled}
                    elevation={elevation}
                    filled={filled}
                    focusColor={focusColor}
                    font={font}
                    onChange={({
                        size: sz,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        color: cl,
                        elevation: el,
                        density: ds,
                        filled: fl,
                        readOnly: ro,
                        focusColor: fc,
                        font: lf,
                        disabled: db,
                        textPlacement: tp,
                        uncheckedColor: uc,
                        uncheckedBorder: ub,
                        uncheckedBorderColor: ud,
                    }) => {
                        setSize(sz ?? null);
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setColor(cl ?? null);
                        setBorderColor(bc ?? null);
                        setElevation(el ?? null);
                        setDensity(ds ?? null);
                        setFilled(fl ?? null);
                        setFocusColor(fc ?? null);
                        setFont(lf ?? null);
                        setDisabled(db ?? null);
                        setTextPlacement(tp ?? null);
                        setUncheckedColor(uc ?? null);
                        setUncheckedBorder(ub ?? null);
                        setUncheckedBorderColor(ud ?? null);
                        setReadOnly(ro ?? null);
                    }}
                    readOnly={readOnly}
                    shape={shape}
                    size={size}
                    textPlacement={textPlacement}
                    uncheckedBorder={uncheckedBorder}
                    uncheckedBorderColor={uncheckedBorderColor}
                    uncheckedColor={uncheckedColor}
                />
            </Aside>
        </Article>
    );
};
