import { ComponentType, useMemo, useState } from 'react';

import {
    Article,
    Aside,
    BorderColor,
    Content,
    DateField,
    DateTimeField,
    ElementBorder,
    ElementDensity,
    ElementShape,
    EmailField,
    Fieldset,
    H1,
    MonthField,
    NumberField,
    PasswordField,
    PasswordFieldProps,
    PhoneField,
    SemanticColor,
    TextField,
    TextFieldProps,
    TimeField,
    UrlField,
    WeekField,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const fields: {
    name: string;
    Field: ComponentType<TextFieldProps>;
    placeholder?: string;
    extra?: Partial<PasswordFieldProps>;
}[] = [
    { name: 'TextField', Field: TextField, placeholder: 'Placeholder' },
    { name: 'NumberField', Field: NumberField, placeholder: '0' },
    { name: 'EmailField', Field: EmailField, placeholder: 'name@example.com' },
    { name: 'PhoneField', Field: PhoneField, placeholder: '+48 000 000 000' },
    { name: 'PasswordField', Field: PasswordField, placeholder: 'Password', extra: { showReveal: true } },
    { name: 'DateField', Field: DateField },
    { name: 'DateTimeField', Field: DateTimeField },
    { name: 'TimeField', Field: TimeField },
    { name: 'MonthField', Field: MonthField },
    { name: 'WeekField', Field: WeekField },
    { name: 'UrlField', Field: UrlField, placeholder: 'https://example.com' },
];

export const FieldsPage = () => {
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [error, setError] = useState<boolean | null>(false);

    const shared = useMemo(
        () => ({
            shape: shape ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            color: color ?? undefined,
            density: density ?? undefined,
            disabled: disabled ?? undefined,
            error: error ? 'Error, supporting text' : undefined,
        }),
        [shape, border, borderColor, color, density, disabled, error]
    );

    return (
        <Article direction="row" gap={20}>
            <Content gap={20} grow>
                <H1>Fields</H1>
                {fields.map(({ name, Field, placeholder, extra }) => (
                    <Fieldset alignItems="end" direction="row" gap={16} key={name} legend={name} wrap>
                        <Field
                            {...shared}
                            {...extra}
                            description="Filled"
                            filled
                            label={name}
                            name={name}
                            placeholder={placeholder}
                        />
                        <Field
                            {...shared}
                            {...extra}
                            description="Outlined"
                            label={name}
                            name={name}
                            outlined
                            placeholder={placeholder}
                        />
                        <Field
                            {...shared}
                            {...extra}
                            classic
                            description="Classic"
                            label={name}
                            name={name}
                            placeholder={placeholder}
                        />
                    </Fieldset>
                ))}
            </Content>

            <Aside px={20}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    color={color}
                    density={density}
                    disabled={disabled}
                    error={error}
                    onChange={({
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        color: cl,
                        density: ds,
                        disabled: db,
                        error: er,
                    }) => {
                        setShape(sp ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setDisabled(db ?? null);
                        setError(er ?? null);
                    }}
                    shape={shape}
                />
            </Aside>
        </Article>
    );
};
