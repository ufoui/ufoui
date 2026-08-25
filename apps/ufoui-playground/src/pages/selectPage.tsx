import { MdFlag, MdSearch, MdTune } from 'react-icons/md';
import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    ElementBorder,
    ElementDensity,
    ElementFont,
    ElementShape,
    Fieldset,
    H1,
    IconButton,
    Option,
    P,
    Select,
    SemanticColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const SelectPage = () => {
    const [fruit, setFruit] = useState<string | undefined>(undefined);
    const [fruits, setFruits] = useState<string[]>([]);

    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [labelFont, setLabelFont] = useState<ElementFont | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [error, setError] = useState<boolean | null>(false);
    const [showErrorIcon, setShowErrorIcon] = useState<boolean | null>(false);
    const [fullWidth, setFullWidth] = useState<boolean | null>(false);

    const shared = useMemo(
        () => ({
            shape: shape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            color: color ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            labelFont: labelFont ?? undefined,
            disabled: disabled ?? undefined,
            error: error ? 'Error, supporting text' : undefined,
            showErrorIcon: showErrorIcon ?? undefined,
            fullWidth: fullWidth ?? undefined,
        }),
        [shape, border, borderColor, color, density, font, labelFont, disabled, error, showErrorIcon, fullWidth]
    );

    return (
        <Article direction="row" gap={20}>
            <Content color="surfaceContainerHigh" gap={20} grow minWidth={0}>
                <H1>Select</H1>
                <P>
                    Value: {fruit ?? '-'} | Values: {fruits.length ? fruits.join(', ') : '-'}
                </P>

                <Fieldset direction="row" gap={16} legend="Default" wrap>
                    <Select
                        {...shared}
                        description="Single selection"
                        label="Fruit"
                        name="fruit"
                        onChange={v => {
                            setFruit(v as string | undefined);
                        }}
                        placeholder="Pick a fruit..."
                        value={fruit}>
                        <Option label="Apple" value="apple" />
                        <Option description="Yellow fruit" label="Banana" value="banana" />
                        <Option label="Cherry" value="cherry" />
                        <Option disabled label="Date" value="date" />
                        <Option label="Elderberry" value="elderberry" />
                    </Select>
                    <Select
                        {...shared}
                        description="Multiple selection, example of very long supporting text"
                        label="Fruits"
                        multiple
                        name="fruits"
                        onChange={v => {
                            setFruits(v as string[]);
                        }}
                        placeholder="Pick fruits..."
                        value={fruits}>
                        <Option label="Apple" value="apple" />
                        <Option label="Banana" value="banana" />
                        <Option label="Cherry" value="cherry" />
                        <Option disabled label="Date" value="date" />
                    </Select>
                    <Select {...shared} description="Placeholder only" name="country" placeholder="Placeholder only">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        defaultValue="pl"
                        description="Disabled, label and value"
                        disabled
                        label="Country"
                        name="country">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                    </Select>
                </Fieldset>

                <Fieldset alignItems="end" direction="row" gap={16} legend="Slots" wrap>
                    <Select
                        {...shared}
                        description="Leading: one icon"
                        icon={<MdFlag />}
                        label="One icon"
                        name="country"
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Leading: icon + icon button"
                        label="Mixed leading"
                        leading={
                            <>
                                <MdSearch />
                                <IconButton icon={<MdTune />} />
                            </>
                        }
                        name="country"
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Custom expand icon"
                        expandIcon={<MdTune />}
                        label="Expand icon"
                        name="country"
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                </Fieldset>

                <Fieldset direction="row" gap={16} legend="Filled" wrap>
                    <Select {...shared} description="Label only" filled label="Label only" name="country">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Label and placeholder"
                        filled
                        icon={<MdFlag />}
                        label="Label"
                        name="country"
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Placeholder only"
                        filled
                        name="country"
                        placeholder="Placeholder only">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                </Fieldset>

                <Fieldset direction="row" gap={16} legend="Outlined" wrap>
                    <Select {...shared} description="Label only" label="Label only" name="country" outlined>
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Label and placeholder"
                        icon={<MdFlag />}
                        label="Label"
                        name="country"
                        outlined
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        description="Placeholder only"
                        name="country"
                        outlined
                        placeholder="Placeholder only">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                </Fieldset>

                <Fieldset alignItems="end" direction="row" gap={16} legend="Classic" wrap>
                    <Select {...shared} classic description="Label only" label="Label only" name="country">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        classic
                        description="Label and placeholder"
                        icon={<MdFlag />}
                        label="Label"
                        name="country"
                        placeholder="Placeholder">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                    <Select
                        {...shared}
                        classic
                        description="Placeholder only"
                        name="country"
                        placeholder="Placeholder only">
                        <Option label="Poland" value="pl" />
                        <Option label="Germany" value="de" />
                        <Option label="France" value="fr" />
                    </Select>
                </Fieldset>
            </Content>

            <Aside px={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    color={color}
                    density={density}
                    disabled={disabled}
                    error={error}
                    font={font}
                    fullWidth={fullWidth}
                    labelFont={labelFont}
                    onChange={({
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        color: cl,
                        density: ds,
                        font: ft,
                        fullWidth: fw,
                        labelFont: lf,
                        disabled: db,
                        error: er,
                        showErrorIcon: sei,
                    }) => {
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setFont(ft ?? null);
                        setFullWidth(fw ?? null);
                        setLabelFont(lf ?? null);
                        setDisabled(db ?? null);
                        setError(er ?? null);
                        setShowErrorIcon(sei ?? null);
                    }}
                    shape={shape}
                    showErrorIcon={showErrorIcon}
                />
            </Aside>
        </Article>
    );
};
