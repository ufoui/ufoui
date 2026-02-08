import { MdAdd } from 'react-icons/md';
import { useState } from 'react';

import {
    Button,
    ButtonProps,
    ElementBorderWidth,
    ElementElevation,
    ElementShape,
    ElementSize,
    Flex,
    SemanticColor,
} from '@ufoui/core';

import { SurfaceModifiers } from '../components/surfaceModifiers/surfaceModifiers';

type ButtonStyles = ButtonProps;

const flexStyles = [
    {
        label: 'Default',
        tonal: false,
        filled: false,
        outlined: false,
        raised: false,
        elevated: false,
        title: 'Default button',
    },
    { label: 'Text' },
    { label: 'Outlined', outlined: true },
    { label: 'Raised', raised: true },
    { label: 'Elevated', elevated: true },
    { label: 'Tonal', tonal: true },
    { label: 'Filled', filled: true },

    { label: 'Outlined Raised', outlined: true, raised: true },
    { label: 'Outlined Elevated', outlined: true, elevated: true },
    { label: 'Outlined Tonal', outlined: true, tonal: true },
    { label: 'Outlined Filled', outlined: true, filled: true },

    { label: 'Raised Elevated', raised: true, elevated: true },
    { label: 'Raised Tonal', raised: true, tonal: true },
    { label: 'Raised Filled', raised: true, filled: true },

    { label: 'Elevated Tonal', elevated: true, tonal: true },
    { label: 'Elevated Filled', elevated: true, filled: true },

    { label: 'Tonal Filled', tonal: true, filled: true },

    { label: 'Outlined Tonal Raised', tonal: true, raised: true, outlined: true },
    { label: 'Outlined Tonal Filled', tonal: true, filled: true, outlined: true },
    { label: 'All', tonal: true, filled: true, outlined: true, raised: true, elevated: true },
];

export const FlexPage = () => {
    const [size, setSize] = useState<ElementSize>();
    const [shape, setShape] = useState<ElementShape>();
    const [border, setBorder] = useState<ElementBorderWidth>();
    const [color, setColor] = useState<SemanticColor>();
    const [elevation, setElevation] = useState<ElementElevation>();

    const shared: {
        size?: ElementSize;
        shape?: ElementShape;
        border?: ElementBorderWidth;
        color?: SemanticColor;
        elevation?: ElementElevation;
    } = {
        size,
        shape,
        border: border,
        color,
        elevation,
    };

    return (
        <div className="flex">
            <div className="grid grid-cols-[max-content_1fr] items-center gap-x-5 gap-y-5">
                {flexStyles.map(s => (
                    <>
                        <div>{s.label}</div>
                        <div className="flex items-center gap-4">
                            <Flex {...s} {...shared}>
                                Flex content
                            </Flex>
                        </div>
                    </>
                ))}

                <hr className="col-span-2 w-full" />
                <div>Size</div>
                <div className="flex items-center gap-4">
                    <Button
                        color="primary"
                        filled
                        icon={<MdAdd />}
                        label="Label"
                        outlined
                        raised
                        {...shared}
                        size="small"
                    />
                    <Button
                        color="primary"
                        filled
                        icon={<MdAdd />}
                        label="Label"
                        outlined
                        raised
                        {...shared}
                        size="medium"
                    />
                    <Button
                        color="primary"
                        filled
                        icon={<MdAdd />}
                        label="Label"
                        outlined
                        raised
                        {...shared}
                        size="large"
                    />
                </div>
            </div>
            <div className="flex flex-col py-2">
                <SurfaceModifiers
                    border={border}
                    color={color}
                    elevation={elevation}
                    onChange={({ size, shape, border, color, elevation }) => {
                        setSize(size);
                        setShape(shape);
                        setBorder(border);
                        setColor(color);
                        setElevation(elevation);
                    }}
                    shape={shape}
                    size={size}
                />
            </div>
        </div>
    );
};
