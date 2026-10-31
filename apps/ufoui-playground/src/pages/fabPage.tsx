import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUpload } from 'react-icons/fa';
import { MdAdd, MdHome, MdRemove } from 'react-icons/md';
import { BiColor, BiHome } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi2';
import { BsHouse, BsWikipedia } from 'react-icons/bs';
import { RiHomeLine } from 'react-icons/ri';
import { TbHome } from 'react-icons/tb';
import { IoHome } from 'react-icons/io5';
import { PiHouse } from 'react-icons/pi';

import {
    Aside,
    BorderColor,
    ButtonBaseProps,
    Div,
    Divider,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    Fab,
    Fieldset,
    Flex,
    Grid,
    H1,
    SemanticColor,
} from '@ufoui/core';

import tree from '../assets/tree.jpg';
import { Modifiers } from '../components/modifiers/modifiers';
import { paths } from '../paths';

const buttonStyles = [
    { label: 'Default' },
    { label: 'Text' },
    { label: 'Outlined', outlined: true },
    { label: 'Elevated', elevated: true },
    { label: 'Tonal', tonal: true },
    { label: 'Filled', filled: true },
];

const ScrollingText = ({ text }: { text: string }) => (
    <Div className="w-20 overflow-hidden">
        <Flex className="animate-marquee w-max">
            <Div className="whitespace-nowrap pr-4">{text}</Div>
            <Div className="whitespace-nowrap pr-4">{text}</Div>
        </Flex>
    </Div>
);

export const FabPage = () => {
    const [size, setSize] = useState<ElementSize | null>(null);
    const [spread, setSpread] = useState<ButtonBaseProps['spread'] | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [selectedShape, setSelectedShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [selectedColor, setSelectedColor] = useState<SemanticColor | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [flat, setFlat] = useState<boolean | null>(false);
    const [shrink, setShrink] = useState<boolean | null>(false);    const [toggle, setToggle] = useState<boolean | null>(false);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [collapsed, setCollapsed] = useState<boolean | null>(false);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);

    const shared = useMemo(
        () => ({
            size: size ?? undefined,
            spread: spread ?? undefined,
            shape: shape ?? undefined,
            selectedShape: selectedShape ?? undefined,
            border: border ?? undefined,
            color: color ?? undefined,
            selectedColor: selectedColor ?? undefined,
            borderColor: borderColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            flat: !!flat,
            shrink: !!shrink,
            toggle: !!toggle,
            collapsed: !!collapsed,
            ...(disabled ? { disabled: true } : {}),
        }),
        [
            size,
            spread,
            shape,
            selectedShape,
            border,
            color,
            selectedColor,
            borderColor,
            elevation,
            density,
            font,
            flat,
            shrink,
            toggle,
            collapsed,
            disabled,
        ]
    );

    return (
        <>
            <H1>Fab</H1>
            <Flex grow>
                <Grid border={1} className="grid-cols-[max-content_1fr] items-center p-2" gapX={20} gapY={16} grow>
                    {buttonStyles.map(s => (
                        <Fragment key={s.label}>
                            <Div>{s.label}</Div>
                            <Flex alignItems="center" gap={16}>
                                <Fab
                                    {...s}
                                    icon={<MdAdd />}
                                    label="Label"
                                    selectedIcon={<MdRemove />}
                                    {...shared}
                                    title="Tooltip"
                                />
                                <Fab {...s} disabled icon={<MdAdd />} label="Label" {...shared} />
                                <Fab {...{ ...s, label: 'Label' }} {...shared} />
                                <Fab {...{ ...s, label: 'Label' }} disabled {...shared} />
                                <Fab {...{ ...s, label: '' }} aria-label="Label" icon={<MdAdd />} {...shared} />
                                <Fab
                                    {...{ ...s, label: '' }}
                                    aria-label="Label"
                                    disabled
                                    icon={<MdAdd />}
                                    {...shared}
                                />
                            </Flex>
                        </Fragment>
                    ))}

                    <Divider className="col-span-2" />
                    <Div>Size</Div>
                    <Flex alignItems="center" gap={16}>
                        <Fab filled icon={<MdAdd />} label="Extra Small" {...shared} size="extraSmall" />
                        <Fab filled icon={<MdAdd />} label="Small" {...shared} size="small" />
                        <Fab filled icon={<MdAdd />} label="Medium" {...shared} size="medium" />
                        <Fab filled icon={<MdAdd />} label="Large" {...shared} size="large" />
                        <Fab filled icon={<MdAdd />} label="Extra Large" {...shared} size="extraLarge" />
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Upload</Div>
                    <Flex>
                        <Fab color="primary" filled icon={<FaUpload />} label="Upload" shape="round" upload></Fab>
                    </Flex>
                    <Divider className="col-span-2" />
                    <Div>Custom icons & colors</Div>
                    <Flex gap={16} wrap>
                        {[
                            { icon: <FaHome />, color: 'primary' },
                            { icon: <MdHome />, color: 'secondary' },
                            { icon: <BiHome />, color: 'tertiary' },
                            { icon: <HiHome />, color: 'warning' },
                            { icon: <BsHouse />, color: 'info' },
                            { icon: <RiHomeLine />, color: 'error' },
                            { icon: <TbHome />, color: 'success' },
                            { icon: <IoHome />, color: 'black' },
                            { icon: <PiHouse />, color: 'white' },
                        ].map(b => (
                            <Fab
                                {...shared}
                                aria-label={b.color}
                                color={b.color as SemanticColor}
                                filled
                                icon={b.icon}
                                key={b.color}
                                shape="round"
                            />
                        ))}
                    </Flex>
                    <Divider className="col-span-2" />
                    <Div>Spinning buttons</Div>
                    <Flex gap={16}>
                        <Fab {...shared} filled icon={<FaHome />} label="Spinner" loading />
                        <Fab {...shared} disabled label="Spinner" leading={<MdHome />} loading></Fab>
                        <Fab {...shared} content="Content" filled label="Spinner" loading />
                        <Fab {...shared} filled label="Spinner" loading>
                            Children
                        </Fab>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Full & limited width</Div>
                    <Flex gap={16}>
                        <div className="w-[400px] bg-black">
                            <Fab color="primary" filled fullWidth icon={<FaHome />} label="Full width"></Fab>
                        </div>
                        <div className="w-[100px] bg-black">
                            <Fab color="primary" filled fullWidth icon={<FaHome />} label="Full width"></Fab>
                        </div>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>End icon</Div>
                    <Flex gap={16}>
                        <Fab endIcon={<FaHome />} filled label="End icon" title="End icon only" {...shared}></Fab>
                        <Fab endIcon={<BsHouse />} filled icon={<FaHome />} label="2 icons" {...shared}></Fab>
                        <Fab
                            endIcon={
                                <>
                                    <BsHouse />
                                    <BsHouse />
                                </>
                            }
                            filled
                            icon={<FaHome />}
                            label="3 icons"
                            {...shared}></Fab>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Links</Div>
                    <Flex gap={16}>
                        <Fab
                            as="a"
                            filled
                            href="https://www.wikipedia.org"
                            icon={<BsWikipedia />}
                            label="Wikipedia"
                            rel="noreferrer"
                            target="_blank"
                            {...shared}
                        />
                        <Fab as={Link} filled icon={<BiColor />} label="Color page" to={paths.color} {...shared} />
                        <Fab
                            aria-label="Wikipedia"
                            as="a"
                            filled
                            href="https://www.wikipedia.org"
                            icon={<BsWikipedia />}
                            rel="noreferrer"
                            target="_blank"
                            {...shared}
                        />
                        <Fab aria-label="Color page" as={Link} filled icon={<BiColor />} to={paths.color} {...shared} />
                    </Flex>
                    <Divider className="col-span-2" />
                    <Div>Content</Div>
                    <Flex alignItems="center" direction="row" gap={16}>
                        <Fab
                            {...shared}
                            content={<ScrollingText text="Custom Slot Demo" />}
                            filled
                            label="Custom Slot Demo"
                        />
                        <Fab
                            {...shared}
                            content={<ScrollingText text="Custom Slot Demo" />}
                            icon={<MdAdd />}
                            label="Slots"
                            tonal
                            trailing={<MdRemove />}
                        />
                        <Fab {...shared} content="" icon={<MdAdd />} label="Add" />
                        <Fab {...shared} content="Create" icon={<MdAdd />} />
                        <Fab {...shared} icon={<MdAdd />}>
                            Create
                        </Fab>
                    </Flex>
                    <Divider className="col-span-2" />
                    <Div>Custom</Div>
                    <Flex alignItems="center" direction="row" gap={16} wrap>
                        <Fab {...shared} filled label="Image 1">
                            <img alt="" height={64} src={tree} width={64} />
                        </Fab>
                        <Fab {...shared} filled label="Image 1" leading={<MdAdd />} trailing={<MdRemove />}>
                            <img alt="" height={64} src={tree} width={64} />
                        </Fab>
                        <Fab {...shared} disabled filled label="Image 1 disabled">
                            <img alt="" height={64} src={tree} width={64} />
                        </Fab>
                        <Fab {...shared} filled label="Image 2" shrink>
                            <img alt="" height={80} src={tree} width={80} />
                        </Fab>
                        <Fab {...shared} filled label="Image 2" leading={<MdAdd />} shrink trailing={<MdRemove />}>
                            <img alt="" height={80} src={tree} width={80} />
                        </Fab>
                        <Fab {...shared} label="Image 2">
                            <span className="px-1"> SPAN </span>
                        </Fab>
                        <Fab {...shared} filled label="Image 2">
                            <span className="px-1">FILLED SPAN</span>
                        </Fab>
                    </Flex>
                    <Divider className="col-span-2" />
                    <div>Disabled fieldset</div>
                    <Fieldset alignItems="center" direction="row" disabled gap={8} label="Fieldset">
                        <Fab filled icon={<MdAdd />} label="F1" {...shared} />
                        <Fab filled icon={<MdAdd />} label="F2" {...shared} />
                        <Fab
                            filled
                            icon={<MdAdd />}
                            label="F3"
                            {...shared}
                            onClick={() => {
                                alert('F3');
                            }}
                        />
                    </Fieldset>
                </Grid>

                <Aside p={8}>
                    <Modifiers
                        border={border}
                        borderColor={borderColor}
                        collapsed={collapsed}
                        color={color}
                        density={density}
                        disabled={disabled}
                        elevation={elevation}
                        flat={flat}
                        font={font}
                        onChange={({
                            size: sz,
                            spread: spr,
                            shape: sp,
                            border: bd,
                            borderColor: bc,
                            collapsed: co,
                            color: cl,
                            elevation: el,
                            density: ds,
                            disabled: db,
                            flat: fl,                            shrink: sh,
                            toggle: tg,
                            font: lf,
                            selectedShape: ss,
                            selectedColor: sc,
                        }) => {
                            setSize(sz ?? null);
                            setSpread(spr ?? null);
                            setShape(sp ?? null);
                            setBorder(bd ?? null);
                            setColor(cl ?? null);
                            setBorderColor(bc ?? null);
                            setElevation(el ?? null);
                            setFlat(fl ?? null);
                            setShrink(sh ?? null);                            setDensity(ds ?? null);
                            setDisabled(db ?? null);
                            setFont(lf ?? null);
                            setToggle(tg ?? null);
                            setCollapsed(co ?? null);
                            setSelectedShape(ss ?? null);
                            setSelectedColor(sc ?? null);
                        }}
                        selectedColor={selectedColor}
                        selectedShape={selectedShape}
                        shape={shape}
                        shrink={shrink}
                        size={size}
                        spread={spread}
                        toggle={toggle}
                    />
                </Aside>
            </Flex>
        </>
    );
};
