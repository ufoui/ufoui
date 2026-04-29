import { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MdBookmarkBorder, MdShare } from 'react-icons/md';

import {
    Article,
    Aside,
    Avatar,
    BorderColor,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
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
// const variants: CardVariant[] = ['outlined'];
const animations: MotionAnimation[] = ['fade', 'scale', 'slideUp', 'slideRight', 'popup'];
const cliparts = [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
];
const avatars = [
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=5',
    'https://i.pravatar.cc/100?img=8',
];

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
    const [open, setOpen] = useState<boolean | undefined>(undefined);
    const [flush, setFlush] = useState(false);
    const [actionsStack, setActionsStack] = useState(false);

    const [animation, setAnimation] = useState<MotionAnimation | undefined>(undefined);
    const [motionStyle, setMotionStyle] = useState<MotionStyle | undefined>(undefined);
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
            flush,
            animation,
            motionStyle,
        }),
        [color, shape, elevation, border, borderColor, font, open, flush, animation, motionStyle]
    );

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <H1>Card</H1>

                <H2 font="customH2">Variants</H2>
                <Grid cols={br({ base: 1, lg: 2, xxl: 3 })} fullWidth gap={20}>
                    {variants.map((variant, idx) => (
                        <Card {...shared} key={variant} variant={variant}>
                            <CardHeader
                                actions={
                                    <>
                                        <Button icon={<MdShare />} label="Share" />
                                        <Button icon={<MdBookmarkBorder />} label="Bookmark" />
                                    </>
                                }
                                actionsAlign={actionsAlign ?? undefined}
                                actionsStack={actionsStack}
                                label={`${variant} card`}
                                leading={<Avatar name={`${variant} avatar`} src={avatars[idx % avatars.length]} />}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                showClose={showClose}
                                titleAlign={titleAlign ?? undefined}
                            />
                            <CardMedia>
                                <img
                                    alt={`${variant} clipart`}
                                    className="block h-[180px] w-full object-cover"
                                    src={cliparts[idx % cliparts.length]}
                                />
                            </CardMedia>
                            {paragraphs[idx % paragraphs.length]}
                            <CardActions
                                actions={
                                    <>
                                        <Button label="Cancel" />
                                        <Button filled label="Save" />
                                    </>
                                }
                                align={actionsAlign ?? undefined}
                                stack={actionsStack}
                            />
                        </Card>
                    ))}
                </Grid>

                <H2 font="customH2">Image First</H2>
                <Grid cols={br({ base: 1, lg: 2, xxl: 3 })} fullWidth gap={20}>
                    {variants.map((variant, idx) => (
                        <Card {...shared} key={`${variant}-image-first`} variant={variant}>
                            <CardMedia>
                                <img
                                    alt={`${variant} clipart`}
                                    className="block h-[180px] w-full object-cover"
                                    src={cliparts[idx % cliparts.length]}
                                />
                            </CardMedia>
                            <CardHeader
                                actions={
                                    <>
                                        <Button icon={<MdShare />} label="Share" />
                                        <Button icon={<MdBookmarkBorder />} label="Bookmark" />
                                    </>
                                }
                                actionsAlign={actionsAlign ?? undefined}
                                actionsStack={actionsStack}
                                label={`${variant} card`}
                                leading={<Avatar name={`${variant} avatar`} src={avatars[idx % avatars.length]} />}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                showClose={showClose}
                                titleAlign={titleAlign ?? undefined}
                            />
                            {paragraphs[idx % paragraphs.length]}
                            <CardActions
                                actions={
                                    <>
                                        <Button label="Cancel" />
                                        <Button filled label="Save" />
                                    </>
                                }
                                align={actionsAlign ?? undefined}
                                stack={actionsStack}
                            />
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

            <Aside w={240}>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    font={font}
                    onChange={({
                        surfaceColor: sc,
                        elevation: el,
                        shape: sp,
                        border: bd,
                        borderColor: bc,
                        font: ft,
                    }) => {
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
                            checked={open ?? true}
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
                    <>
                        <span>Flush:</span>
                        <Checkbox
                            checked={flush}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setFlush(v => !v);
                            }}
                        />
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
