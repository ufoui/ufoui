import { useMemo, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    ElementDensity,
    ElementFont,
    ElementSize,
    ElementTextPlacement,
    Flex,
    H1,
    H2,
    P,
    Rating,
    Section,
    TextColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const RatingPage = () => {
    const [value, setValue] = useState(3.5);
    const [color, setColor] = useState<TextColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [textPlacement, setTextPlacement] = useState<ElementTextPlacement | null>(null);
    const [filled, setFilled] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(null);
    const [readOnly, setReadOnly] = useState<boolean | null>(null);
    const [required, setRequired] = useState<boolean | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            density: density ?? undefined,
            size: size ?? undefined,
            font: font ?? undefined,
            textPlacement: textPlacement ?? undefined,
            filled: filled ?? undefined,
            disabled: disabled ?? undefined,
            readOnly: readOnly ?? undefined,
            required: required ?? undefined,
        }),
        [color, density, size, font, textPlacement, filled, disabled, readOnly, required]
    );

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow>
                <H1>Rating</H1>

                <Section gap={20}>
                    <H2>Default Stars</H2>
                    <Flex alignItems="end" gap={24}>
                        <Rating {...shared} defaultValue={3} description="Enabled" label="Rating" />
                        <Rating {...shared} defaultValue={3} description="Disabled" disabled />
                        <Rating
                            {...shared}
                            defaultValue={3}
                            description="Read only with tooltip"
                            label="Read only"
                            readOnly
                            title="Simple tooltip"
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Hearts</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            defaultValue={3}
                            description="Hearts description"
                            emptyIcon={<MdFavoriteBorder size={24} />}
                            icon={<MdFavorite size={24} />}
                            title="Hearts tooltip"
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Different max</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating {...shared} defaultValue={7} max={10} />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Controlled</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating
                            {...shared}
                            onChange={v => {
                                setValue(v);
                            }}
                            value={value}
                        />
                        <P>Value: {value}</P>
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Filled</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating {...shared} defaultValue={2.5} filled />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Error</H2>
                    <Flex alignItems="center" gap={24}>
                        <Rating {...shared} defaultValue={2.5} error="Some error" label="Error" />
                        <Rating
                            {...shared}
                            defaultValue={2.5}
                            disabled
                            error="Some error"
                            filled
                            label="Disabled Error"
                        />
                    </Flex>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    density={density}
                    disabled={disabled}
                    filled={filled}
                    font={font}
                    inkColor={color}
                    onChange={({
                        inkColor: cl,
                        density: ds,
                        size: sz,
                        font: ft,
                        textPlacement: tp,
                        filled: fl,
                        disabled: dl,
                        readOnly: ro,
                        required: rq,
                    }) => {
                        setColor(cl ?? null);
                        setDensity(ds ?? null);
                        setSize(sz ?? null);
                        setFont(ft ?? null);
                        setTextPlacement(tp ?? null);
                        setFilled(fl ?? null);
                        setDisabled(dl ?? null);
                        setReadOnly(ro ?? null);
                        setRequired(rq ?? null);
                    }}
                    readOnly={readOnly}
                    required={required}
                    size={size}
                    textPlacement={textPlacement}
                />
            </Aside>
        </Article>
    );
};
