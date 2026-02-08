import { useMemo, useState } from 'react';

import {
  Article,
  Aside,
  BorderColor,
  Div,
  Divider,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Flex,
  Grid,
  Section,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const BoxPage = () => {
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
      px: 8,
      py: '1rem',
      gap: 8,
    }),
    [color, shape, elevation, border, borderColor],
  );

  return (
    <Article direction="row" fullWidth>
      <Section className="items-start gap-4 p-4" color="surface" grow>
        <h2>Basic Flex</h2>
        <Flex {...shared}>
          <Flex>Simple Flex Line 1</Flex>
          <Flex>Simple Flex Line 2</Flex>
        </Flex>
        <Flex {...shared}>
          <Flex color="primary">
            <Flex>Primary Flex 1 in the Flex Line 1</Flex>
            <Flex>Primary Flex 1 in the Flex Line 2</Flex>
          </Flex>
          <Flex>
            <Flex>Default Flex 2 in the Flex Line 1</Flex>
            <Flex>Default Flex 2 in the Flex Line 2</Flex>
          </Flex>
        </Flex>
        <h2>Flex Grow Example</h2>
        <Flex {...shared} fullWidth>
          <Flex color="primary" grow>
            <div>Growing Flex 1</div>
          </Flex>
          <Flex>
            <div>Simple Flex 2</div>
          </Flex>
        </Flex>
        <h2>Full Width Flex Example</h2>
        <Flex {...shared} fullWidth>
          <Flex color="primary" fullWidth>
            <div>Full Width Flex 1</div>
          </Flex>
          <Flex>
            <div>Simple Flex 2</div>
          </Flex>
        </Flex>
        <h2>Inline Flex Example</h2>
        <Flex {...shared}>
          <div>
            <span>Before Flex</span>
            <Flex color="primary" inline>
              Inline Flex Box
            </Flex>
            <span>After Flex</span>
          </div>
          <div>
            <span>Before Flex</span>
            <Flex color="primary">Simple Flex Box</Flex>
            <span>After Flex</span>
          </div>
        </Flex>

        <h2>Flex Direction Example</h2>
        <Flex {...shared} inline>
          <Flex>
            <div>Row 1</div>
            <div>Row 2</div>
            <div>Row 3</div>
            <div>Row 4</div>
          </Flex>
          <Flex direction="col">
            <div>Col 1</div>
            <div>Col 2</div>
            <div>Col 3</div>
            <div>Col 4</div>
          </Flex>
        </Flex>

        <h2>Grid Example</h2>
        <Grid {...shared}>
          <div>Grid Line 1</div>
          <div>Grid Line 2</div>
          <div>Grid Line 3</div>
          <div>Grid Line 4</div>
        </Grid>
        <h2 className="mt-6">Article</h2>
        <Article {...shared}>
          <div>Simple Article Line 1</div>
          <div>Simple Article Line 2</div>
        </Article>
        <h2 className="mt-6">Dividers</h2>
        <Div fullWidth>
          <div>Horizontal in block</div>
          <Divider border={4} inset="middle" />
          <div>Line 2</div>
        </Div>
        <Div fullWidth>
          <span>Vertical in block</span>
          <Divider
            border={4}
            className=""
            height="24px"
            inset="middle"
            vertical
          />
          <span>Text after</span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </span>
        </Div>
        <Divider />
        <Flex fullWidth wrap>
          <div>Horizontal in flex row wrap</div>
          <Divider border={4} inset="middle" />
          <div>Line 2</div>
        </Flex>
        <Flex fullWidth>
          <div>Horizontal in in flex row</div>
          <Divider border={4} inset="middle" />
          <div>Line 2</div>
        </Flex>
        <Flex alignItems="center" fullWidth>
          <div>Vertical in in flex row</div>
          <Divider border={4} inset="middle" insetSize={2} vertical />
          <div>Line 2</div>
        </Flex>
        <Divider />
        <Flex direction="col" fullWidth>
          <div>Horizontal in flex col</div>
          <Divider border={4} inset="middle" />
          <div>Line 2</div>
        </Flex>
        <Flex direction="col" fullWidth>
          <div>Vertical in in flex col</div>
          <Divider border={4} height="20px" inset="middle" vertical />
          <div>Line 2</div>
        </Flex>
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
