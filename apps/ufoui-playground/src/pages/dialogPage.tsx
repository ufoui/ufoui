import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MdInfo } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Button,
    Checkbox,
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
    Radio,
    RadioGroup,
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
    const [openNested, setOpenNested] = useState(false);
    const [openNested2, setOpenNested2] = useState(false);
    const [animation, setAnimation] = useState<MotionAnimation | undefined>(undefined);
    const [motionStyle, setMotionStyle] = useState<MotionStyle | undefined>(undefined);
    const [dialogType, setDialogType] = useState<DialogType | undefined>(undefined);
    const [modal, setModal] = useState(true);
    const [fullWidth, setFullWidth] = useState(false);
    const [fullHeight, setFullHeight] = useState(false);

    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [fit, setFit] = useState(false);
    const [detached, setDetached] = useState(false);
    const [docked, setDocked] = useState(false);
    const [anchored, setAnchored] = useState(false);
    const [flush, setFlush] = useState(false);

    const paragraphs = useMemo(() => Array.from({ length: 7 }, () => faker.lorem.sentence()), []);
    const nestedParagraphs = useMemo(() => Array.from({ length: 3 }, () => faker.lorem.paragraph()), []);

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
        <Article direction="row" wf>
            <Content gap={24} grow position="relative">
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
                                    wf
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
                    anchored={anchored}
                    animation={animation}
                    detached={detached}
                    closeOnBackdrop={!disabled}
                    closeOnEsc={!disabled}
                    docked={docked}
                    fit={fit}
                    flush={flush}
                    hf={fullHeight}
                    modal={modal}
                    motionStyle={motionStyle}
                    onClose={() => {
                        setOpen(false);
                    }}
                    open={open}
                    type={dialogType}
                    wf={fullWidth}>
                    <DialogTitle
                        icon={<MdInfo />}
                        label={`${animation ?? 'default'} | ${motionStyle ?? 'default'} | ${dialogType ?? 'basic'}`}
                    />

                    <DialogContent>
                        <Flex direction="col" gap={8}>
                            {paragraphs.map((text, i) => (
                                <P key={i}>{text}</P>
                            ))}
                        </Flex>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            disabled={!!disabled}
                            label="Open nested dialog"
                            onClick={() => setOpenNested(true)}
                        />
                        <Button
                            disabled={!!disabled}
                            label="Close"
                            onClick={() => {
                                setOpen(false);
                            }}
                        />
                    </DialogActions>

                    <Dialog modal onClose={() => setOpenNested(false)} open={openNested}>
                        <DialogTitle label="Nested dialog" />
                        <DialogContent>
                            <Flex direction="col" gap={8}>
                                <P>This is a nested dialog stacked on top of the main one.</P>
                                {nestedParagraphs.map((text, i) => (
                                    <P key={i}>{text}</P>
                                ))}
                            </Flex>
                        </DialogContent>
                        <DialogActions>
                            <Button label="Open one more" onClick={() => setOpenNested2(true)} />
                            <Button label="Close" onClick={() => setOpenNested(false)} />
                        </DialogActions>

                        <Dialog modal onClose={() => setOpenNested2(false)} open={openNested2}>
                            <DialogTitle label="Nested dialog 2" />
                            <DialogContent>
                                <P>Third level — deepest dialog in the stack.</P>
                            </DialogContent>
                            <DialogActions>
                                <Button label="Close" onClick={() => setOpenNested2(false)} />
                            </DialogActions>
                        </Dialog>
                    </Dialog>
                </Dialog>
            </Content>

            <Aside>
                <Modifiers
                    anchored={anchored}
                    border={border}
                    borderColor={borderColor}
                    density={density}
                    detached={detached}
                    disabled={disabled}
                    docked={docked}
                    elevation={elevation}
                    fit={fit}
                    flush={flush}
                    font={font}
                    onChange={({
                        surfaceColor,
                        density,
                        size,
                        font,
                        shape,
                        elevation,
                        border,
                        borderColor,
                        disabled,
                        fit: nextFit,
                        detached: nextDetached,
                        docked: nextDocked,
                        anchored: nextAnchored,
                        flush: nextFlush,
                    }) => {
                        setColor(surfaceColor ?? null);
                        setDensity(density ?? null);
                        setSize(size ?? null);
                        setFont(font ?? null);
                        setShape(shape ?? null);
                        setElevation(elevation ?? null);
                        setBorder(border ?? null);
                        setBorderColor(borderColor ?? null);
                        setDisabled(disabled ?? null);
                        if (nextFit !== undefined) {
                            setFit(!!nextFit);
                        }
                        if (nextDetached !== undefined) {
                            setDetached(!!nextDetached);
                        }
                        if (nextDocked !== undefined) {
                            setDocked(!!nextDocked);
                        }
                        if (nextAnchored !== undefined) {
                            setAnchored(!!nextAnchored);
                        }
                        if (nextFlush !== undefined) {
                            setFlush(!!nextFlush);
                        }
                    }}
                    shape={shape}
                    size={size}
                    surfaceColor={color}
                />
                <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
                    <>
                        <span>Type:</span>
                        <RadioGroup
                            name="dialogType"
                            onChange={v => {
                                setDialogType(v === '' ? undefined : (v as DialogType));
                            }}
                            value={dialogType ?? ''}>
                            <Radio label="Default" value="" />
                            {dialogTypes.map(t => (
                                <Radio key={t} label={t} value={t} />
                            ))}
                        </RadioGroup>
                    </>
                    <>
                        <span>Modal:</span>
                        <Checkbox
                            checked={modal}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setModal(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>FullWidth:</span>
                        <Checkbox
                            checked={fullWidth}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setFullWidth(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>FullHeight:</span>
                        <Checkbox
                            checked={fullHeight}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setFullHeight(v => !v);
                            }}
                        />
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
