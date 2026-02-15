import { useMemo, useState } from 'react';

import {
  Article,
  Aside,
  BorderColor,
  Button,
  Collapse,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Section,
  Span,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const CollapsePage = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  const [color, setColor] = useState<SurfaceColor | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

  const shared = useMemo(
    () => ({
      color: color ?? undefined,
      shape: shape ?? undefined,
      elevation: elevation ?? undefined,
      border: border ?? undefined,
      borderColor: borderColor ?? undefined,
      px: 16,
      py: 16,
      gap: 8,
    }),
    [color, shape, elevation, border, borderColor],
  );

  return (
    <Article direction="row" fullWidth>
      <Section className="items-start gap-6 p-4" grow>
        <h2>Basic Collapse</h2>

        <Button
          filled
          label={open1 ? 'Close' : 'Open'}
          onClick={() => {
            setOpen1((v) => !v);
          }}
        />

        <Collapse {...shared} color="primary" elevation={2} mt={8} open={open1}>
          <Span color="error">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </Span>
        </Collapse>

        <h2 className="mt-6">Different Animation</h2>

        <Button
          label={open2 ? 'Close' : 'Open'}
          onClick={() => {
            setOpen2((v) => !v);
          }}
          tonal
        />

        <Collapse
          {...shared}
          animation="scale"
          color="error"
          motionStyle="expressive"
          mt={8}
          open={open2}
        >
          <Span color="info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </Span>
        </Collapse>
      </Section>

      <Aside>
        <Modifiers
          border={border}
          borderColor={borderColor}
          elevation={elevation}
          onChange={({
            surfaceColor: sc,
            elevation: el,
            shape: sp,
            border: bd,
            borderColor: bc,
          }) => {
            setColor(sc ?? null);
            setShape(sp ?? null);
            setElevation(el ?? null);
            setBorder(bd ?? null);
            setBorderColor(bc ?? null);
          }}
          shape={shape}
          surfaceColor={color}
        />
      </Aside>
    </Article>
  );
};
