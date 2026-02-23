import { useMemo, useState } from 'react';

import {
  Article,
  Aside,
  Avatar,
  BorderColor,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Flex,
  Grid,
  H1,
  H2,
  Section,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const AvatarPage = () => {
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
    }),
    [color, shape, elevation, border, borderColor],
  );

  return (
    <>
      <H1>Avatar</H1>

      <Article direction="row" fullWidth>
        <Section className="items-start gap-6 p-4" grow>
          <H2>Image avatars</H2>
          <Flex gap={16} wrap>
            <Avatar
              {...shared}
              name="John Smith"
              src="https://i.pravatar.cc/100?img=1"
            />
            <Avatar
              {...shared}
              name="Anna Kowalska"
              src="https://i.pravatar.cc/100?img=2"
            />
            <Avatar {...shared} name="Broken Image" src="/not-found.jpg" />
          </Flex>

          <H2>Initials fallback</H2>
          <Flex gap={16} wrap>
            <Avatar {...shared} name="John Smith" />
            <Avatar {...shared} name="Jean Claude Van Damme" />
            <Avatar {...shared} name="Madonna" />
            <Avatar {...shared} name="Łukasz Żółć" />
            <Avatar {...shared} name="Wide Winnie" />
          </Flex>

          <H2>Size</H2>
          <Flex alignItems="center" gap={16}>
            <Avatar {...shared} name="Extra Small" size="extraSmall" />
            <Avatar {...shared} name="Small" size="small" />
            <Avatar {...shared} name="Medium" size="medium" />
            <Avatar {...shared} name="Large" size="large" />
            <Avatar {...shared} name="Extr Large" size="extraLarge" />
          </Flex>

          <H2>Shapes</H2>
          <Flex gap={16}>
            <Avatar {...shared} name="Square" shape="square" />
            <Avatar {...shared} name="Smooth" shape="smooth" />
            <Avatar {...shared} name="Rounded" shape="rounded" />
            <Avatar {...shared} name="Round" shape="round" />
          </Flex>

          <H2>Custom content</H2>
          <Flex gap={16}>
            <Avatar {...shared}>
              <Grid
                color="inverseSurface"
                fullHeight
                fullWidth
                placeItems="center"
              >
                👽
              </Grid>
            </Avatar>
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
    </>
  );
};
