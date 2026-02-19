import { useMemo, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Article,
  Aside,
  BorderColor,
  Div,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Section,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const AccordionPage = () => {
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
        <h2>Single Accordion</h2>

        <Accordion type="single" {...shared}>
          <AccordionItem title="First Item" value="a">
            <Div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Div>
          </AccordionItem>

          <AccordionItem title="Second Item" value="b">
            <Div>Sed non risus. Suspendisse lectus tortor.</Div>
          </AccordionItem>

          <AccordionItem title="Third Item" value="c">
            <Div>Cras elementum ultrices diam. Maecenas ligula massa.</Div>
          </AccordionItem>
        </Accordion>

        <h2 className="mt-6">Multiple Accordion</h2>

        <Accordion type="multiple" {...shared}>
          <div>Not supposed to be here.</div>
          <AccordionItem title="Panel One" value="1">
            <Div>Multiple mode allows more than one panel open.</Div>
          </AccordionItem>

          <AccordionItem title="Panel Two" value="2">
            <Div>Panels can expand independently.</Div>
          </AccordionItem>
        </Accordion>
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
