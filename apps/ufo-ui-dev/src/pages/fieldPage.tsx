import { MdOutlineCancel, MdSearch } from 'react-icons/md';
import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    ElementBorder,
    ElementDensity,
    ElementFont,
    ElementShape,
    Fieldset,
    IconButton,
    SemanticColor,
    SurfaceColor,
    TextField,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const FieldPage = () => {
    // const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [labelFont, setLabelFont] = useState<ElementFont | null>(null);
    const [textColor, setTextColor] = useState<SurfaceColor | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);

    const shared = useMemo(
        () => ({
            // size: size ?? undefined,
            shape: shape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            color: color ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            labelFont: labelFont ?? undefined,
            textColor: textColor ?? undefined,
            disabled: disabled ?? undefined,
            autocomplete: true,
        }),
        [labelFont, shape, border, borderColor, color, density, font, textColor, disabled]
    );

    return (
        <Article className="gap-5" row>
            <div className="flex grow flex-col gap-5">
                <Fieldset gap={16} legend="Default" row wrap>
                    <TextField {...shared} error="Error, label only" label="Label only" name="email" />
                    <TextField
                        {...shared}
                        endIcon={<IconButton icon={<MdOutlineCancel />} />}
                        error="Error, label and placeholderm example of very long supporting text "
                        icon={<MdSearch />}
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                    <TextField
                        {...shared}
                        endIcon={<MdOutlineCancel />}
                        error="Error, label and placeholder"
                        icon={<MdSearch />}
                        name="email"
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        error="Error, placeholder only"
                        name="email"
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        disabled
                        error="Disabled, error, label and placeholder"
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                </Fieldset>

                <Fieldset gap={16} legend="Filled" row wrap>
                    <TextField {...shared} description="Label only" filled label="Label only" name="email" />
                    <TextField
                        {...shared}
                        description="Label and placeholder"
                        endIcon={<MdOutlineCancel />}
                        filled
                        icon={<MdSearch />}
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                    <TextField
                        {...shared}
                        description="Placeholder only"
                        endIcon={<MdOutlineCancel />}
                        filled
                        icon={<MdSearch />}
                        name="email"
                        placeholder="Placeholder only"
                    />
                    <TextField {...shared} description="Placeholder only" filled placeholder="Placeholder only" />
                    <TextField
                        {...shared}
                        description="Disabled, label and placeholder"
                        disabled
                        filled
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                </Fieldset>

                <Fieldset gap={16} legend="Outlined" row wrap>
                    <TextField {...shared} description="Label only" label="Label only" name="email" outlined />
                    <TextField
                        {...shared}
                        description="Label and placeholder"
                        endIcon={<MdOutlineCancel />}
                        icon={<MdSearch />}
                        label="Label"
                        name="email"
                        outlined
                        placeholder="Placeholder"
                    />
                    <TextField
                        {...shared}
                        description="Placeholder only"
                        endIcon={<MdOutlineCancel />}
                        icon={<MdSearch />}
                        name="email"
                        outlined
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        description="Placeholder only"
                        name="email"
                        outlined
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        description="Disabled, label and placeholder"
                        disabled
                        label="Label"
                        name="email"
                        outlined
                        placeholder="Placeholder"
                    />
                </Fieldset>

                <Fieldset gap={16} legend="Classic" row wrap>
                    <TextField {...shared} classic description="Label only" label="Label only" name="email" />
                    <TextField
                        {...shared}
                        classic
                        description="Label and placeholder"
                        endIcon={<MdOutlineCancel />}
                        icon={<MdSearch />}
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                    <TextField
                        {...shared}
                        classic
                        description="Placeholder only"
                        endIcon={<MdOutlineCancel />}
                        icon={<MdSearch />}
                        name="email"
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        classic
                        description="Placeholder only"
                        name="email"
                        placeholder="Placeholder only"
                    />
                    <TextField
                        {...shared}
                        classic
                        description="Disabled, label and placeholder"
                        disabled
                        label="Label"
                        name="email"
                        placeholder="Placeholder"
                    />
                </Fieldset>
            </div>

            <Aside px={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    color={color}
                    density={density}
                    disabled={disabled}
                    font={font}
                    labelFont={labelFont}
                    onChange={({
                        size: sz,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        color: cl,
                        density: ds,
                        font: ft,
                        labelFont: lf,
                        disabled: db,
                        textColor: tc,
                    }) => {
                        // setSize(sz ?? null);
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setFont(ft ?? null);
                        setLabelFont(lf ?? null);
                        setDisabled(db ?? null);
                        setTextColor(tc ?? null);
                    }}
                    shape={shape}
                    // size={size}
                    textColor={textColor}
                />
            </Aside>
        </Article>
    );
};
