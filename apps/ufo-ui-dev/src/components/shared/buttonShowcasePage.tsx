import React, { Fragment, useMemo, useState } from 'react';
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
    Div,
    Divider,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    Fieldset,
    Flex,
    Grid,
    SemanticColor,
    SurfaceColor,
} from '@ufoui/core';

import tree from '../../assets/tree.jpg';
import { Modifiers } from '../modifiers/modifiers';
import { paths } from '../layout/main/paths';

const buttonStyles = [
    { label: 'Default' },
    { label: 'Text' },
    { label: 'Outlined', outlined: true },
    { label: 'Elevated', elevated: true },
    { label: 'Tonal', tonal: true },
    { label: 'Filled', filled: true },
    { label: 'Outlined Elevated', outlined: true, elevated: true },
    { label: 'Outlined Tonal', outlined: true, tonal: true },
    { label: 'Outlined Filled', outlined: true, filled: true },
    { label: 'Elevated Tonal', elevated: true, tonal: true },
    { label: 'Elevated Filled', elevated: true, filled: true },
    { label: 'Tonal Filled', tonal: true, filled: true },
    // { label: 'Outlined Tonal Raised', tonal: true, raised: true, outlined: true },
    { label: 'Outlined Tonal Filled', tonal: true, filled: true, outlined: true },
    { label: 'All', tonal: true, filled: true, outlined: true, elevated: true },
];

interface Props {
    component: React.ElementType;
    title: string;
}

export const ButtonShowcasePage = ({ component: Component, title }: Props) => {
    const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [selectedShape, setSelectedShape] = useState<ElementShape | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [selectedColor, setSelectedColor] = useState<SemanticColor | null>(null);
    const [textColor, setTextColor] = useState<SurfaceColor | null>(null);
    const [selectedTextColor, setSelectedTextColor] = useState<SurfaceColor | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [flat, setFlat] = useState<boolean | null>(false);
    const [toggle, setToggle] = useState<boolean | null>(false);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [font, setFont] = useState<ElementFont | null>(null);

    const shared = useMemo(
        () => ({
            size: size ?? undefined,
            shape: shape ?? undefined,
            selectedShape: selectedShape ?? undefined,
            border: border ?? undefined,
            color: color ?? undefined,
            selectedColor: selectedColor ?? undefined,
            textColor: textColor ?? undefined,
            selectedTextColor: selectedTextColor ?? undefined,
            borderColor: borderColor ?? undefined,
            elevation: elevation ?? undefined,
            density: density ?? undefined,
            font: font ?? undefined,
            flat: !!flat,
            toggle: !!toggle,
        }),
        [
            size,
            shape,
            selectedShape,
            border,
            color,
            selectedColor,
            textColor,
            selectedTextColor,
            borderColor,
            elevation,
            density,
            font,
            flat,
            toggle,
        ]
    );

    return (
        <>
            <h1>{title}</h1>
            <Flex grow>
                <Grid border={1} className="grid-cols-[max-content_1fr] items-center p-2" gapX={20} grow>
                    {buttonStyles.map(s => (
                        <Fragment key={s.label}>
                            <Div>{s.label}</Div>
                            <Flex alignItems="center" gap={16}>
                                <Component
                                    {...s}
                                    icon={<MdAdd />}
                                    label="Label"
                                    selectedIcon={<MdRemove />}
                                    {...shared}
                                    title="Tooltip"
                                />
                                <Component {...s} disabled icon={<MdAdd />} label="Label" {...shared} />
                                <Component {...{ ...s, label: 'Label' }} {...shared} />
                                <Component {...{ ...s, label: 'Label' }} disabled {...shared} />
                                <Component {...{ ...s, label: '' }} aria-label="Label" icon={<MdAdd />} {...shared} />
                                <Component
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
                        <Component filled icon={<MdAdd />} label="Extra Small" {...shared} size="extraSmall" />
                        <Component filled icon={<MdAdd />} label="Small" {...shared} size="small" />
                        <Component filled icon={<MdAdd />} label="Medium" {...shared} size="medium" />
                        <Component filled icon={<MdAdd />} label="Large" {...shared} size="large" />
                        <Component filled icon={<MdAdd />} label="Extra Large" {...shared} size="extraLarge" />
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Upload</Div>
                    <Flex>
                        <Component
                            color="primary"
                            filled
                            icon={<FaUpload />}
                            label="Upload"
                            shape="round"
                            upload></Component>
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
                            <Component
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
                        <Component {...shared} filled icon={<FaHome />} label="Spinner" loading />
                        <Component {...shared} disabled label="Spinner" leading={<MdHome />} loading></Component>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Full & limited width</Div>
                    <Flex gap={16}>
                        <div className="w-[400px] bg-black">
                            <Component
                                color="primary"
                                filled
                                fullWidth
                                icon={<FaHome />}
                                label="Full width"></Component>
                        </div>
                        <div className="w-[100px] bg-black">
                            <Component
                                color="primary"
                                filled
                                fullWidth
                                icon={<FaHome />}
                                label="Full width"></Component>
                        </div>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>End icon</Div>
                    <Flex gap={16}>
                        <Component
                            color="primary"
                            endIcon={<FaHome />}
                            filled
                            label="End icon"
                            title="End icon only"></Component>
                        <Component
                            color="primary"
                            endIcon={<BsHouse />}
                            filled
                            icon={<FaHome />}
                            label="2 icons"></Component>
                        <Component
                            color="primary"
                            endIcon={
                                <>
                                    <BsHouse />
                                    <BsHouse />
                                </>
                            }
                            filled
                            icon={<FaHome />}
                            label="3 icons"></Component>
                    </Flex>

                    <Divider className="col-span-2" />
                    <Div>Links</Div>
                    <Flex gap={16}>
                        <Component
                            color="primary"
                            filled
                            icon={<BsWikipedia />}
                            label="Wikipedia"
                            link={<a href="https://www.wikipedia.org" rel="noreferrer" target="_blank" />}
                        />
                        <Component
                            color="primary"
                            filled
                            icon={<BiColor />}
                            label="Color page"
                            link={<Link to={paths.color} />}
                        />
                    </Flex>
                    <Divider className="col-span-2" />
                    <Div>Custom</Div>
                    <Flex alignItems="center" direction="row" gap={16}>
                        <Component {...shared} filled label="Image 1">
                            <img alt="" height={64} src={tree} width={64} />
                        </Component>
                        <Component {...shared} disabled filled label="Image 1 disabled">
                            <img alt="" height={64} src={tree} width={64} />
                        </Component>
                        <Component {...shared} filled label="Image 2">
                            <img alt="" height={80} src={tree} width={80} />
                        </Component>
                        <Component {...shared} label="Image 2">
                            <span className="px-1"> SPAN </span>
                        </Component>
                        <Component {...shared} filled label="Image 2">
                            <span className="px-1">FILLED SPAN</span>
                        </Component>
                    </Flex>
                    <Divider className="col-span-2" />
                    <div>Disabled fieldset</div>
                    <Fieldset alignItems="center" direction="row" disabled gap={8} legend="Fieldset">
                        <Component filled icon={<MdAdd />} label="F1" {...shared} />
                        <Component filled icon={<MdAdd />} label="F2" {...shared} />
                        <Component
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
                        color={color}
                        density={density}
                        elevation={elevation}
                        flat={flat}
                        font={font}
                        onChange={({
                            size: sz,
                            shape: sp,
                            border: bd,
                            borderColor: bc,
                            color: cl,
                            textColor: tc,
                            elevation: el,
                            density: ds,
                            flat: fl,
                            toggle: tg,
                            font: lf,
                            selectedTextColor: stc,
                            selectedShape: ss,
                            selectedColor: sc,
                        }) => {
                            setSize(sz ?? null);
                            setShape(sp ?? null);
                            setBorder(bd ?? null);
                            setColor(cl ?? null);
                            setTextColor(tc ?? null);
                            setBorderColor(bc ?? null);
                            setElevation(el ?? null);
                            setFlat(fl ?? null);
                            setDensity(ds ?? null);
                            setFont(lf ?? null);
                            setToggle(tg ?? null);
                            setSelectedShape(ss ?? null);
                            setSelectedTextColor(stc ?? null);
                            setSelectedColor(sc ?? null);
                        }}
                        selectedColor={selectedColor}
                        selectedShape={selectedShape}
                        selectedTextColor={selectedTextColor}
                        shape={shape}
                        size={size}
                        textColor={textColor}
                        toggle={toggle}
                    />
                </Aside>
            </Flex>
        </>
    );
};
