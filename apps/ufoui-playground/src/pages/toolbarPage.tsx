import { useMemo, useState } from 'react';
import { MdDelete, MdMoreVert, MdSearch } from 'react-icons/md';

import {
  Article,
  Aside,
  BorderColor,
  Content,
  Div,
  Divider,
  ElementBorder,
  ElementDensity,
  ElementElevation,
  ElementFont,
  ElementShape,
  IconButton,
  Section,
  SurfaceColor,
  TextField,
  Toolbar,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ToolbarPage = () => {
  const [surfaceColor, setSurfaceColor] = useState<SurfaceColor | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
  const [density, setDensity] = useState<ElementDensity | null>(null);
  const [textColor, setTextColor] = useState<SurfaceColor | null>(null);
  const [font, setFont] = useState<ElementFont | null>(null);
  const [disabled, setDisabled] = useState<boolean | null>(false);

  const shared = useMemo(
    () => ({
      surfaceColor: surfaceColor ?? undefined,
      shape: shape ?? undefined,
      elevation: elevation ?? undefined,
      border: border ?? undefined,
      borderColor: borderColor ?? undefined,
      density: density ?? undefined,
      textColor: textColor ?? undefined,
      font: font ?? undefined,
      disabled: disabled ?? undefined,
    }),
    [
      surfaceColor,
      shape,
      elevation,
      border,
      borderColor,
      density,
      textColor,
      font,
      disabled,
    ],
  );

  return (
    <Article direction="row" fullWidth>
      <Content gap={24} grow px={24} py={24}>
        <Section gap={12}>
          <h2>Docked</h2>
          <Toolbar {...shared} variant="docked">
            <IconButton icon={<MdSearch />} />
            <Div grow>Toolbar content</Div>
            <IconButton icon={<MdDelete />} />
            <IconButton icon={<MdMoreVert />} />
          </Toolbar>
        </Section>

        <Section gap={12}>
          <h2>Floating</h2>
          <Toolbar {...shared} elevation={elevation ?? 3} variant="floating">
            <IconButton icon={<MdSearch />} />
            <Divider inset="middle" insetSize={8} vertical />
            <TextField />
            <IconButton icon={<MdDelete />} />
            <IconButton icon={<MdMoreVert />} />
          </Toolbar>
        </Section>

        <Section gap={12}>
          <h2>Dense</h2>
          <Toolbar {...shared} density="dense">
            <IconButton icon={<MdSearch />} />
            <IconButton icon={<MdDelete />} />
            <IconButton icon={<MdMoreVert />} />
          </Toolbar>
        </Section>

        <Section gap={12}>
          <h2>Disabled</h2>
          <Toolbar {...shared} disabled>
            <IconButton icon={<MdSearch />} />
            <Div grow>Disabled toolbar</Div>
            <IconButton icon={<MdMoreVert />} />
          </Toolbar>
        </Section>
      </Content>

      <Section gap={12}>
        <h2>Vertical Docked </h2>
        <Toolbar {...shared} orientation="vertical" variant="docked">
          <IconButton icon={<MdSearch />} />
          <Div grow>Toolbar content</Div>
          <IconButton icon={<MdDelete />} />
          <IconButton icon={<MdMoreVert />} />
        </Toolbar>
      </Section>

      <Section gap={12}>
        <h2>Vertical Floating</h2>
        <Toolbar
          {...shared}
          elevation={elevation ?? 3}
          orientation="vertical"
          variant="floating"
        >
          <IconButton icon={<MdSearch />} />
          <Divider vertical={false} />
          <IconButton icon={<MdDelete />} />
          <IconButton icon={<MdMoreVert />} />
        </Toolbar>
      </Section>

      <Section gap={12}>
        <h2>Vertical Dense</h2>
        <Toolbar {...shared} density="dense" orientation="vertical">
          <IconButton icon={<MdSearch />} />
          <IconButton icon={<MdDelete />} />
          <IconButton icon={<MdMoreVert />} />
        </Toolbar>
      </Section>

      <Aside px={20}>
        <Modifiers
          border={border}
          borderColor={borderColor}
          density={density}
          disabled={disabled}
          elevation={elevation}
          font={font}
          onChange={({
            surfaceColor: sc,
            shape: sp,
            elevation: el,
            border: bd,
            borderColor: bc,
            density: ds,
            textColor: tc,
            font: ft,
            disabled: db,
          }) => {
            setSurfaceColor(sc ?? null);
            setShape(sp ?? null);
            setElevation(el ?? null);
            setBorder(bd ?? null);
            setBorderColor(bc ?? null);
            setDensity(ds ?? null);
            setTextColor(tc ?? null);
            setFont(ft ?? null);
            setDisabled(db ?? null);
          }}
          shape={shape}
          surfaceColor={surfaceColor}
          textColor={textColor}
        />
      </Aside>
    </Article>
  );
};
