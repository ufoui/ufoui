import { useMemo, useState } from 'react';
import { MdInfo } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Button,
    Content,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogType,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    Flex,
    Grid,
    H1,
    H2,
    MotionAnimation,
    MotionStyle,
    P,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const animations: MotionAnimation[] = [
    'fade',
    'fadeBlur',
    'scale',
    'scaleBlur',
    'popup',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'slideUpBlur',
    'slideDownBlur',
    'slideLeftBlur',
    'slideRightBlur',
    'rotate',
    'rotateUpRight',
    'rotateUpLeft',
    'rollLeft',
    'rollRight',
    'flipX',
    'flipY',
    'bounce',
    'squish',
    'rubber',
    'popElastic',
    'jelly',
];

const dialogTypes: DialogType[] = ['basic', 'fullscreen', 'dockRight', 'dockLeft', 'dockTop', 'dockBottom'];

export const DialogPage = () => {
    const [open, setOpen] = useState(false);
    const [animation, setAnimation] = useState<MotionAnimation | undefined>(undefined);
    const [motionStyle, setMotionStyle] = useState<MotionStyle | undefined>(undefined);
    const [dialogType, setDialogType] = useState<DialogType | undefined>(undefined);

    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            density: density ?? undefined,
            size: size ?? undefined,
            font: font ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
        }),
        [color, density, size, font, shape, elevation, border, borderColor]
    );

    return (
        <Article direction="row" wFull>
            <Content gap={24} grow>
                <H1>Dialog</H1>

                <Section gap={20}>
                    <H2>Open</H2>
                    <Flex gap={12}>
                        <Button
                            filled
                            label="Default Animation"
            
                            onClick={() => {
                                setAnimation(undefined);
                                setMotionStyle(undefined);
                                setDialogType(undefined);
                                setOpen(true);
                            }}
                        />
                    </Flex>
                </Section>

                <Section gap={20}>
                    <H2>Animations</H2>
                    <Flex alignItems="stretch" gap={12} wrap>
                        {animations.map(a => (
                            <Flex color="surfaceVariant" direction="col" gap={6} key={a} p={20} shape="rounded">
                                <Button
                                    color="secondary"
                                    filled
                                    label={`${a} (regular)`}
                                    onClick={() => {
                                        setAnimation(a);
                                        setMotionStyle('regular');
                                        setOpen(true);
                                    }}
                                    wFull
                                />
                                <Button
                                    color="tertiary"
                                    filled
                                    label={`${a} (expressive)`}
                                    onClick={() => {
                                        setAnimation(a);
                                        setMotionStyle('expressive');
                                        setOpen(true);
                                    }}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </Section>

                <Dialog
                    {...shared}
                    animation={animation}
                    modal
                    motionStyle={motionStyle}
                    onClose={() => {
                        setOpen(false);
                    }}
                    open={open}
                    type={dialogType}>
                    <DialogTitle
                        icon={<MdInfo />}
                        label={`${animation ?? 'default'} | ${motionStyle ?? 'default'} | ${dialogType ?? 'default (undefined → basic)'}`}
                    />

                    <DialogContent>
                        <Flex direction="col" gap={8}>
                            {[...Array(5)].map((_, i) => (
                                <P key={i}>Row {i + 1}</P>
                            ))}
                        </Flex>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            label="Close"
                            onClick={() => {
                                setOpen(false);
                            }}
                        />
                    </DialogActions>
                </Dialog>
            </Content>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    elevation={elevation}
                    font={font}
                    onChange={({ surfaceColor, density, size, font, shape, elevation, border, borderColor }) => {
                        setColor(surfaceColor ?? null);
                        setDensity(density ?? null);
                        setSize(size ?? null);
                        setFont(font ?? null);
                        setShape(shape ?? null);
                        setElevation(elevation ?? null);
                        setBorder(border ?? null);
                        setBorderColor(borderColor ?? null);
                    }}
                    shape={shape}
                    size={size}
                    surfaceColor={color}
                />
                <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
                    <>
                        <span>Type:</span>
                        <select
                            onChange={e => {
                                const v = e.target.value;
                                setDialogType(v === '' ? undefined : (v as DialogType));
                            }}
                            value={dialogType ?? ''}>
                            <option value="">Default</option>
                            {dialogTypes.map(t => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
