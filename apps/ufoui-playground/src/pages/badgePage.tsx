import { MdAdd } from 'react-icons/md';
import { useMemo, useState } from 'react';

import {
  Article,
  Aside,
  Badge,
  BadgeProps,
  BorderColor,
  Button,
  ElementBorder,
  ElementElevation,
  ElementShape,
  ElementSize,
  Fab,
  Fieldset,
  Flex,
  Grid,
  IconButton,
  Section,
  SemanticColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

type BadgeStyle = BadgeProps & { label?: string };

const badgePosition: BadgeStyle[] = [
  { align: 'topLeft', value: '1' },
  { align: 'topCenter', value: '1' },
  { align: 'topRight', value: '1' },
  { align: 'centerLeft', value: '1' },
  { align: 'center', value: '1' },
  { align: 'centerRight', value: '1' },
  { align: 'bottomLeft', value: '1' },
  { align: 'bottomCenter', value: '1' },
  { align: 'bottomRight', value: '1' },
];

const badgeSizeConst: BadgeStyle[] = [
  { size: 'small', value: '1', label: 'Small' },
  { size: 'medium', value: '1', label: 'Medium' },
  { size: 'large', value: '1', label: 'Large' },
];

const badgeColorConst: BadgeStyle[] = [
  { color: 'primary', value: '1', label: 'Primary' },
  { color: 'secondary', value: '1', label: 'Secondary' },
  { color: 'tertiary', value: '1', label: 'Tertiary' },
];

const badgeVariations: BadgeStyle[] = [
  { value: '1', label: 'None' },
  { border: 1, value: '2', label: 'Outlined' },
  { elevation: 1, value: '3', label: 'Raised' },
  { border: 1, elevation: 1, value: '4', label: 'All' },
  { value: '1222', label: 'None 2' },
  { border: 1, value: '2222', label: 'Outlined 2' },
  { elevation: 1, value: '3222', label: 'Raised 2' },
  { border: 1, elevation: 1, value: '4222', label: 'All 2' },
];

export const BadgePage = () => {
  const [color, setColor] = useState<SemanticColor | null>(null);
  const [size, setSize] = useState<ElementSize | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
  const shared = useMemo(
    () => ({
      size: size ?? undefined,
      shape: shape ?? undefined,
      border: border ?? undefined,
      color: color ?? undefined,
      borderColor: borderColor ?? undefined,
      elevation: elevation ?? undefined,
    }),
    [size, shape, border, color, borderColor, elevation],
  );
  return (
    <Article direction="row" gap={20} grow>
      <Section gap={20}>
        <Fieldset legend="Standalone">
          <Flex className="gap-2">
            <Badge {...shared} value={5} />
            <Flex direction="col" grow>
              <Badge {...shared} size="small" value={5} />
            </Flex>
          </Flex>
        </Fieldset>
        <Fieldset direction="row" gap={8} legend="Badge & Button">
          {badgeVariations.map((s) => (
            <Badge {...shared} key={s.label} {...s}>
              <Button filled icon={<MdAdd />} label={s.label} />
            </Badge>
          ))}
        </Fieldset>
        <Fieldset legend="Badge position">
          <Grid cols={3} gap={8}>
            {badgePosition.map((s) => (
              <Badge {...shared} align={s.align} key={s.align} value={s.value}>
                <Fab filled icon={<MdAdd />} />
              </Badge>
            ))}
          </Grid>
        </Fieldset>

        <Fieldset cols={3} gap={16} legend="Badge Size" type="grid">
          {badgeSizeConst.map((s) => (
            <>
              {s.label}
              <Badge key={`${s.size}1`} size={s.size} value={s.value}>
                <IconButton filled icon={<MdAdd />} />
              </Badge>
              <Badge
                align="bottomRight"
                key={`${s.size}2`}
                size={s.size}
                value={s.value}
              >
                <Button filled icon={<MdAdd />} label="Button" />
              </Badge>
            </>
          ))}
        </Fieldset>

        <Fieldset cols={3} gap={16} legend="Badge color" type="grid">
          {badgeColorConst.map((s) => (
            <>
              {s.label}
              <Badge key={`${s.size}1`} {...s}>
                <IconButton filled icon={<MdAdd />} />
              </Badge>
              <Badge key={`${s.size}2`} {...s}>
                <Button filled icon={<MdAdd />} label="Button" />
              </Badge>
            </>
          ))}
        </Fieldset>
        <Fieldset
          className="grid-cols-4"
          gap={8}
          legend="Badge variations"
          type="grid"
        >
          {badgeVariations.map((s) => (
            <Badge key={`${s.size}2`} {...s}>
              <Button filled icon={<MdAdd />} label={s.label} />
            </Badge>
          ))}
        </Fieldset>
      </Section>
      <Aside>
        <Modifiers
          border={border}
          borderColor={borderColor}
          color={color}
          elevation={elevation}
          onChange={({
            size: sz,
            shape: sp,
            color: cl,
            elevation: el,
            border: bd,
            borderColor: bc,
          }) => {
            setColor(cl ?? null);
            setSize(sz ?? null);
            setShape(sp ?? null);
            setElevation(el ?? null);
            setBorder(bd ?? null);
            setBorderColor(bc ?? null);
          }}
          shape={shape}
          size={size}
        />
      </Aside>
    </Article>
  );
};

//
