import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MdInfo } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    Button,
    Card,
    CardActions,
    CardVariant,
    Checkbox,
    DialogIconSlot,
    ElementBorder,
    ElementElevation,
    ElementFont,
    ElementShape,
    Grid,
    H1,
    H2,
    MotionAnimation,
    MotionStyle,
    Section,
    SurfaceColor,
    useResponsive,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const variants: CardVariant[] = ['elevated', 'filled', 'outlined'];
const animations: MotionAnimation[] = ['fade', 'scale', 'slideUp', 'slideRight', 'popup'];

type CardActionsPlacement = 'top' | 'subtitle' | 'bottom' | 'inline';
type CardActionsAlign = 'start' | 'center' | 'end';
type CardTitleAlign = 'start' | 'center' | 'end';

export const CardPage = () => {
    const { br } = useResponsive();

    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);

    const [showIcon, setShowIcon] = useState(true);
    const [showClose, setShowClose] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [open, setOpen] = useState(true);
    const [actionsStack, setActionsStack] = useState(false);

    const [animation, setAnimation] = useState<MotionAnimation | undefined>(undefined);
    const [motionStyle, setMotionStyle] = useState<MotionStyle | undefined>(undefined);
    const [actionsPlacement, setActionsPlacement] = useState<CardActionsPlacement | null>(null);
    const [actionsAlign, setActionsAlign] = useState<CardActionsAlign | null>(null);
    const [titleAlign, setTitleAlign] = useState<CardTitleAlign | null>(null);
    const [iconSlot, setIconSlot] = useState<DialogIconSlot | null>(null);

    const paragraphs = useMemo(() => Array.from({ length: 2 }, () => faker.lorem.sentences(2)), []);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            font: font ?? undefined,
            open,
            animation,
            motionStyle,
            actionsPlacement: actionsPlacement ?? undefined,
            actionsAlign: actionsAlign ?? undefined,
            actionsStack,
            titleAlign: titleAlign ?? undefined,
            iconSlot: iconSlot ?? undefined,
            showIcon,
            showClose,
            showBack,
        }),
        [
            color,
            shape,
            elevation,
            border,
            borderColor,
            font,
            open,
            animation,
            motionStyle,
            actionsPlacement,
            actionsAlign,
            actionsStack,
            titleAlign,
            iconSlot,
            showIcon,
            showClose,
            showBack,
        ]
    );

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <H1>Card</H1>

                <H2 font="customH2">Variants</H2>
                <Grid cols={br({ base: 1, lg: 2, xxl: 3 })} fullWidth gap={20}>
                    {variants.map((variant, idx) => (
                        <Card
                            {...shared}
                            icon={<MdInfo />}
                            key={variant}
                            label={`${variant} card`}
                            onBack={() => {
                                setShowBack(false);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            titleFont="titleLarge"
                            variant={variant}>
                            <CardActions
                                align={actionsAlign ?? undefined}
                                placement={actionsPlacement ?? undefined}
                                stack={actionsStack}>
                                <Button label="Cancel" />
                                <Button filled label="Save" />
                            </CardActions>
                            {paragraphs[idx % paragraphs.length]}
                        </Card>
                    ))}
                </Grid>

                <H2 font="customH2">Animation Quick Test</H2>
                <Grid cols={br({ base: 1, lg: 2, xxl: 3 })} fullWidth gap={12}>
                    {animations.map(a => (
                        <Button
                            key={a}
                            label={a}
                            onClick={() => {
                                setAnimation(a);
                                setOpen(false);
                                setTimeout(() => {
                                    setOpen(true);
                                }, 40);
                            }}
                        />
                    ))}
                    <Button
                        label="No animation"
                        onClick={() => {
                            setAnimation(undefined);
                        }}
                    />
                    <Button
                        label="Regular motion"
                        onClick={() => {
                            setMotionStyle('regular');
                        }}
                    />
                    <Button
                        label="Expressive motion"
                        onClick={() => {
                            setMotionStyle('expressive');
                        }}
                    />
                </Grid>
            </Section>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    font={font}
                    onChange={({ surfaceColor: sc, elevation: el, shape: sp, border: bd, borderColor: bc, font: ft }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                        setFont(ft ?? null);
                    }}
                    shape={shape}
                    surfaceColor={color}
                />

                <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
                    <>
                        <span>Actions placement:</span>
                        <select
                            onChange={e => {
                                setActionsPlacement(
                                    e.target.value === '' ? null : (e.target.value as CardActionsPlacement)
                                );
                            }}
                            value={actionsPlacement ?? ''}>
                            <option value="">Default</option>
                            <option value="top">top</option>
                            <option value="subtitle">subtitle</option>
                            <option value="bottom">bottom</option>
                            <option value="inline">inline</option>
                        </select>
                    </>
                    <>
                        <span>Actions align:</span>
                        <select
                            onChange={e => {
                                setActionsAlign(e.target.value === '' ? null : (e.target.value as CardActionsAlign));
                            }}
                            value={actionsAlign ?? ''}>
                            <option value="">Default</option>
                            <option value="start">start</option>
                            <option value="center">center</option>
                            <option value="end">end</option>
                        </select>
                    </>
                    <>
                        <span>Title align:</span>
                        <select
                            onChange={e => {
                                setTitleAlign(e.target.value === '' ? null : (e.target.value as CardTitleAlign));
                            }}
                            value={titleAlign ?? ''}>
                            <option value="">Default</option>
                            <option value="start">start</option>
                            <option value="center">center</option>
                            <option value="end">end</option>
                        </select>
                    </>
                    <>
                        <span>Icon slot:</span>
                        <select
                            onChange={e => {
                                setIconSlot(e.target.value === '' ? null : (e.target.value as DialogIconSlot));
                            }}
                            value={iconSlot ?? ''}>
                            <option value="">Default</option>
                            <option value="leading">leading</option>
                            <option value="top">top</option>
                            <option value="contentLeft">contentLeft</option>
                            <option value="contentRight">contentRight</option>
                        </select>
                    </>
                    <>
                        <span>Open:</span>
                        <Checkbox
                            checked={open}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setOpen(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>Show icon:</span>
                        <Checkbox
                            checked={showIcon}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setShowIcon(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>Show close:</span>
                        <Checkbox
                            checked={showClose}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setShowClose(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>Show back:</span>
                        <Checkbox
                            checked={showBack}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setShowBack(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>Actions stack:</span>
                        <Checkbox
                            checked={actionsStack}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setActionsStack(v => !v);
                            }}
                        />
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
