import { useEffect, useMemo, useState } from 'react';

import {
  Article,
  Aside,
  BorderColor,
  Div,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Progress,
  Section,
  SemanticColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ProgressPage = () => {
  const [color, setColor] = useState<SemanticColor | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const shared = useMemo(
    () => ({
      color: color ?? undefined,
      shape: shape ?? undefined,
      elevation: elevation ?? undefined,
      border: border ?? undefined,
      borderColor: borderColor ?? undefined,
    }),
    [color, shape, elevation, border, borderColor],
  );

  return (
    <Article direction="row" fullWidth>
      <Section className="items-start gap-6 p-4" grow>
        <h2>Linear – Determinate</h2>
        <Progress value={value} {...shared} />

        <h2 className="mt-6">Linear – Indeterminate</h2>
        <Progress {...shared} />

        <h2 className="mt-6">Circular – Determinate</h2>
        <Div className="flex gap-4 items-center">
          <Progress value={value} variant="circular" {...shared} />
        </Div>

        <h2 className="mt-6">Circular – Indeterminate</h2>
        <Div className="flex gap-4 items-center">
          <Progress variant="circular" {...shared} />
        </Div>
      </Section>

      <Aside>
        <Modifiers
          border={border}
          borderColor={borderColor}
          color={color}
          elevation={elevation}
          onChange={({
            color: c,
            elevation: el,
            shape: sp,
            border: bd,
            borderColor: bc,
          }) => {
            setColor(c ?? null);
            setShape(sp ?? null);
            setElevation(el ?? null);
            setBorder(bd ?? null);
            setBorderColor(bc ?? null);
          }}
          shape={shape}
        />
      </Aside>
    </Article>
  );
};
