import { useMemo, useState } from 'react';
import {
  MdFolder,
  MdInbox,
  MdSettings,
  MdStar,
  MdStarBorder,
} from 'react-icons/md';

import {
  Article,
  Aside,
  BorderColor,
  ElementBorder,
  ElementElevation,
  ElementShape,
  List,
  ListItem,
  Section,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListPage = () => {
  const [color, setColor] = useState<SurfaceColor | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const shared = useMemo(
    () => ({
      color: color ?? undefined,
      shape: shape ?? undefined,
      elevation: elevation ?? undefined,
      border: border ?? undefined,
      borderColor: borderColor ?? undefined,
      className: 'max-h-[500px] overflow-auto',
    }),
    [color, shape, elevation, border, borderColor],
  );

  const items = Array.from({ length: 50 }, (_, i) => {
    const value = `item-${i}`;

    if (i < 10) {
      return (
        <ListItem
          checked={!!checked[value]}
          checkedIcon={<MdStar />}
          description="Toggle favorite"
          icon={<MdInbox />}
          key={value}
          label={`Starred ${i + 1}`}
          onChange={() => {
            setChecked((prev) => ({
              ...prev,
              [value]: !prev[value],
            }));
          }}
          type="checkbox"
          uncheckedIcon={<MdStarBorder />}
          value={value}
        />
      );
    }

    if (i < 20) {
      return (
        <ListItem
          description="Exclusive selection"
          icon={<MdFolder />}
          key={value}
          label={`Folder ${i - 9}`}
          type="radio"
          value={value}
        />
      );
    }

    return (
      <ListItem
        badge={i % 5 === 0 ? 'New' : undefined}
        description="Selectable item"
        icon={<MdSettings />}
        key={value}
        label={`Option ${i - 19}`}
        shortcut={i % 7 === 0 ? '⌘K' : undefined}
        type="option"
        value={value}
      />
    );
  });

  return (
    <Article direction="row" fullWidth>
      <Section className="items-start gap-6 p-4" grow>
        <h2>List Demo (Icons + Checkbox + Radio)</h2>

        <List defaultValue="item-20" type="single" {...shared}>
          {items}
        </List>
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
