import { useMemo, useState } from 'react';

import {
  Article,
  Aside,
  Avatar,
  AvatarGroup,
  BorderColor,
  Content,
  ElementBorder,
  ElementElevation,
  ElementShape,
  Flex,
  Grid,
  H1,
  H2,
  P,
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
    <Article direction="row" fullWidth>
      <Content gap={20} grow>
        <H1>Avatar</H1>
        <Section gap={20}>
          <P>Image avatars</P>
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
        </Section>
        <Section gap={20}>
          <P>Initials fallback</P>
          <Flex gap={16} wrap>
            <Avatar {...shared} name="John Smith" />
            <Avatar {...shared} name="Jean Claude Van Damme" />
            <Avatar {...shared} name="Madonna" />
            <Avatar {...shared} name="Łukasz Żółć" />
            <Avatar {...shared} name="Wide Winnie" />
          </Flex>

          <P>Size</P>
          <Flex alignItems="center" gap={16}>
            <Avatar {...shared} name="Extra Small" size="extraSmall" />
            <Avatar {...shared} name="Small" size="small" />
            <Avatar {...shared} name="Medium" size="medium" />
            <Avatar {...shared} name="Large" size="large" />
            <Avatar {...shared} name="Extra Large" size="extraLarge" />
          </Flex>

          <P>Shapes</P>
          <Flex gap={16}>
            <Avatar {...shared} name="Square" shape="square" />
            <Avatar {...shared} name="Smooth" shape="smooth" />
            <Avatar {...shared} name="Rounded" shape="rounded" />
            <Avatar {...shared} name="Round" shape="round" />
          </Flex>

          <P>Custom content</P>
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

          <Section gap={20}>
            <H2>Avatar Groups</H2>
            <Flex gap={16} wrap>
              <AvatarGroup overlap={8}>
                <Avatar
                  name="John Smith"
                  src="https://i.pravatar.cc/100?img=1"
                />
                <Avatar
                  name="Anna Kowalska"
                  src="https://i.pravatar.cc/100?img=2"
                />
                <Avatar name="Jean Claude" />
                <Avatar name="Madonna" />
              </AvatarGroup>

              <AvatarGroup overlap={16}>
                <Avatar name="John Smith" />
                <Avatar name="Anna Kowalska" />
                <Avatar name="Jean Claude" />
                <Avatar name="Madonna" />
              </AvatarGroup>
            </Flex>

            <P>AvatarGroup – Max & Overflow</P>
            <Flex gap={16} wrap>
              <AvatarGroup max={4} overlap={8}>
                <Avatar name="John Smith" />
                <Avatar name="Anna Kowalska" />
                <Avatar name="Jean Claude" />
                <Avatar name="Madonna" />
                <Avatar name="Wide Winnie" />
                <Avatar name="Luke Skywalker" />
              </AvatarGroup>

              <AvatarGroup
                max={3}
                overflow={(count) => (
                  <Avatar color="surfaceVariant">+{count}</Avatar>
                )}
                overlap={8}
              >
                <Avatar name="John Smith" />
                <Avatar name="Anna Kowalska" />
                <Avatar name="Jean Claude" />
                <Avatar name="Madonna" />
                <Avatar name="Wide Winnie" />
              </AvatarGroup>
            </Flex>

            <H2>AvatarGroup – Override props</H2>
            <Flex gap={16} wrap>
              <AvatarGroup
                border={2}
                borderColor="surface"
                overlap={8}
                shape="round"
                size="small"
              >
                <Avatar name="John Smith" shape="square" size="large" />
                <Avatar name="Anna Kowalska" size="extraLarge" />
                <Avatar name="Jean Claude" />
                <Avatar name="Madonna" />
              </AvatarGroup>
            </Flex>
            <H2>AvatarGroup – Edge cases</H2>
            <Flex gap={16} wrap>
              {/* max = 1 */}
              <AvatarGroup max={1} overlap={8}>
                <Avatar name="John Smith" />
                <Avatar name="Anna Kowalska" />
                <Avatar name="Jean Claude" />
              </AvatarGroup>

              {/* overlap = 0 (brak nachodzenia) */}
              <AvatarGroup overlap={0}>
                <Avatar name="John Smith" />
                <Avatar name="Anna Kowalska" />
                <Avatar name="Jean Claude" />
              </AvatarGroup>

              <P>Solo</P>
              <AvatarGroup>
                <Avatar name="Solo User" />
              </AvatarGroup>

              {/* brak max, dużo elementów */}
              <AvatarGroup overlap={6}>
                <Avatar name="User 1" />
                <Avatar name="User 2" />
                <Avatar name="User 3" />
                <Avatar name="User 4" />
                <Avatar name="User 5" />
                <Avatar name="User 6" />
              </AvatarGroup>
            </Flex>
          </Section>
        </Section>
      </Content>

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
