import React, { useMemo, useState } from 'react';
import { MdCake, MdDoNotDisturb, MdOutlineFavorite as MdFavorite } from 'react-icons/md';

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
    ElementSize,
    ElementTextPlacement,
    Fieldset,
    Flex,
    Section,
    SemanticColor,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';
import tree from '../assets/tree.jpg';

export const CheckboxPage = () => {
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
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [filled, setFilled] = useState<boolean | null>(true);
    const [focusColor, setFocusColor] = useState<SurfaceColor | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [textColor, setTextColor] = useState<SurfaceColor | null>(null);
    const [textPlacement, setTextPlacement] = useState<ElementTextPlacement | null>(null);
    const [uncheckedColor, setUncheckedColor] = useState<SemanticColor | null>(null);
    const [readOnly, setReadOnly] = useState<boolean | null>(false);
    const shared = useMemo(
        () => ({
            size: size ?? undefined,
            shape: shape ?? undefined,
            border: border ?? undefined,
            uncheckedBorder: uncheckedBorder ?? undefined,
            color: color ?? undefined,
            readOnly: !!readOnly,
            borderColor: borderColor ?? undefined,
            uncheckedBorderColor: uncheckedBorderColor ?? undefined,
            uncheckedColor: uncheckedColor ?? undefined,
            focusColor: focusColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            filled: !!filled,
            font: font ?? undefined,
            textColor: textColor ?? undefined,
            textPlacement: textPlacement ?? undefined,
        }),
        [
            uncheckedBorderColor,
            uncheckedBorder,
            uncheckedColor,
            textPlacement,
            textColor,
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
        <Article row>
            <Content gap={20} grow px={20}>
                <Section shape="rounded">
                    <Fieldset disabled={disabled ?? undefined} gap={16} legend="States" row>
                        <Checkbox defaultChecked {...shared} label="Checked" />
                        <Checkbox {...shared} label="Unchecked" />
                        <Checkbox {...shared} indeterminate label="Indeterminate" />
                        <Checkbox disabled {...shared} checked label="Disabled checked" />
                        <Checkbox disabled {...shared} label="Disabled" />
                    </Fieldset>
                </Section>
                <Section>
                    <Fieldset disabled={disabled ?? undefined} gap={16} label="Color" row>
                        <Checkbox {...shared} defaultChecked label="Primary"></Checkbox>
                        <Checkbox {...shared} color="secondary" defaultChecked label="Secondary" />
                        <Checkbox {...shared} color="tertiary" defaultChecked label="Tertiary" />
                        <Checkbox {...shared} color="info" defaultChecked label="Info" />
                        <Checkbox {...shared} color="success" defaultChecked label="Success" />
                        <Checkbox {...shared} color="warning" defaultChecked label="Warning" />
                        <Checkbox {...shared} color="error" defaultChecked label="Error" />
                    </Fieldset>
                </Section>
                <Section>
                    <Fieldset disabled={disabled ?? undefined} gap={16} legend="Shape" row>
                        <Checkbox {...shared} defaultChecked label="Square" shape="square" />
                        <Checkbox {...shared} label="Smooth" shape="smooth" />
                        <Checkbox {...shared} label="Rounded" shape="rounded" />
                        <Checkbox {...shared} label="Round" shape="round" />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset alignItems="center" disabled={disabled ?? undefined} gap={16} legend="Size" row>
                        <Checkbox {...shared} defaultChecked label="ExtraSmall" size="extraSmall" />
                        <Checkbox {...shared} defaultChecked label="Small" size="small" />
                        <Checkbox {...shared} defaultChecked label="Medium" size="medium" />
                        <Checkbox {...shared} defaultChecked label="Large" size="large" />
                        <Checkbox {...shared} defaultChecked label="ExtraLarge" size="extraLarge" />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset disabled={disabled ?? undefined} label="Indeterminate">
                        <Checkbox
                            {...shared}
                            checked={option1 && option2}
                            indeterminate={!(option1 && option2) && (option1 || option2)}
                            label="Parent"
                            onChange={handleIntermediateChange}
                        />
                        <Flex col pl={24}>
                            <Checkbox {...shared} checked={option1} label="Option 1" onChange={handleChangeOption1} />
                            <Checkbox {...shared} checked={option2} label="Option 2" onChange={handleChangeOption2} />
                        </Flex>
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset disabled={disabled ?? undefined} gapX={16} label="Custom icons" row wrap>
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            error="Error"
                            icon={<MdFavorite />}
                            label="2 Icons"
                            uncheckedIcon={<MdDoNotDisturb />}
                        />
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            icon={<MdFavorite />}
                            label="2 Icons"
                            uncheckedIcon={<MdCake />}
                        />
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            icon={<MdFavorite />}
                            label="Same Icons"
                            uncheckedIcon={<MdFavorite />}
                        />
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            icon={<MdFavorite />}
                            label="1 icon"></Checkbox>
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            filled={false}
                            icon={<MdFavorite />}
                            label="1 icon/-Filled"
                        />
                        <Checkbox
                            {...shared}
                            defaultChecked
                            density="dense"
                            label="Unchecked Only"
                            uncheckedIcon={<MdFavorite />}
                        />
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset alignItems="center" disabled={disabled ?? undefined} gap={20} legend="Custom" py={16} row>
                        <Checkbox
                            {...shared}
                            checked={checked1}
                            label="Image"
                            onChange={() => {
                                setChecked1(v => !v);
                            }}>
                            {checked1 ? (
                                <img
                                    alt=""
                                    className="rotate-0 transition-all duration-200"
                                    height={64}
                                    src={tree}
                                    width={64}
                                />
                            ) : (
                                <img
                                    alt=""
                                    className="rotate-90 transition-all duration-200"
                                    height={64}
                                    src={tree}
                                    width={64}
                                />
                            )}
                        </Checkbox>
                        <Checkbox
                            {...shared}
                            checked={checked2}
                            onChange={() => {
                                setChecked2(v => !v);
                            }}
                            title="Text">
                            {checked2 ? (
                                <span className="px-2 font-bold">Checked</span>
                            ) : (
                                <span className="px-2">Unchecked</span>
                            )}
                        </Checkbox>
                    </Fieldset>
                </Section>

                <Section>
                    <Fieldset
                        description="Global fieldset error message."
                        disabled={disabled ?? undefined}
                        legend="Controlled">
                        <Checkbox
                            {...shared}
                            checked={checked3}
                            label="Controlled checkbox"
                            onChange={() => {
                                setChecked3(v => !v);
                            }}></Checkbox>
                    </Fieldset>
                </Section>

                <Section alignItems="start">
                    <Fieldset
                        cols={3}
                        disabled={disabled ?? undefined}
                        gapX={20}
                        legend="Error / Description / Required / Density"
                        required
                        type="grid">
                        <Checkbox {...shared} defaultChecked error="Error message" label="Error" required></Checkbox>
                        <Checkbox {...shared} description="Description text." label="Decription" required></Checkbox>
                        <Checkbox {...shared} description="Deensity test." label="Element" required></Checkbox>
                        <Checkbox {...shared} description="Deensity test." label="Element" required></Checkbox>
                        <Checkbox {...shared} description="Deensity test." label="Element" required></Checkbox>
                        <Checkbox {...shared} description="Deensity test." label="Element" required></Checkbox>
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
                        focusColor: fc,
                        readOnly: ro,
                        font: lf,
                        disabled: db,
                        textColor: tc,
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
                        setTextColor(tc ?? null);
                        setTextPlacement(tp ?? null);
                        setUncheckedColor(uc ?? null);
                        setUncheckedBorder(ub ?? null);
                        setUncheckedBorderColor(ud ?? null);
                        setReadOnly(ro ?? null);
                    }}
                    readOnly={readOnly}
                    shape={shape}
                    size={size}
                    textColor={textColor}
                    textPlacement={textPlacement}
                    uncheckedBorder={uncheckedBorder}
                    uncheckedBorderColor={uncheckedBorderColor}
                    uncheckedColor={uncheckedColor}
                />
            </Aside>
        </Article>
    );
};
