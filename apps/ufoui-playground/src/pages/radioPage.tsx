import React, { useMemo, useState } from 'react';
import {
  MdCake,
  MdDoNotDisturb,
  MdOutlineFavorite as MdFavorite,
  MdFavoriteBorder,
} from 'react-icons/md';

import {
  Article,
  Aside,
  BorderColor,
  Content,
  Divider,
  ElementBorder,
  ElementDensity,
  ElementElevation,
  ElementFont,
  ElementShape,
  ElementSize,
  ElementTextPlacement,
  Fieldset,
  Radio,
  RadioGroup,
  Section,
  SemanticColor,
  SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';
import tree from '../assets/tree.jpg';

export const RadioPage = () => {
  const [size, setSize] = useState<ElementSize | null>(null);
  const [shape, setShape] = useState<ElementShape | null>(null);
  const [border, setBorder] = useState<ElementBorder | null>(null);
  const [uncheckedBorder, setUncheckedBorder] = useState<ElementBorder | null>(
    null,
  );
  const [borderColor, setBorderColor] = useState<BorderColor | null>(null);
  const [uncheckedBorderColor, setUncheckedBorderColor] =
    useState<BorderColor | null>(null);
  const [color, setColor] = useState<SemanticColor | null>(null);
  const [readOnly, setReadOnly] = useState<boolean | null>(false);
  const [elevation, setElevation] = useState<ElementElevation | null>(null);
  const [density, setDensity] = useState<ElementDensity | null>(null);
  const [filled, setFilled] = useState<boolean | null>(false);
  const [value, setValue] = useState('option1');
  const [value2, setValue2] = useState('option1');
  const [customValue, setCustomValue] = useState('image');
  const [focusColor, setFocusColor] = useState<SurfaceColor | null>(null);
  const [disabled, setDisabled] = useState<boolean | null>(false);
  const [font, setFont] = useState<ElementFont | null>(null);
  const [textColor, setTextColor] = useState<SurfaceColor | null>(null);
  const [textPlacement, setTextPlacement] =
    useState<ElementTextPlacement | null>(null);
  const [uncheckedColor, setUncheckedColor] = useState<SemanticColor | null>(
    null,
  );
  const shared = useMemo(
    () => ({
      size: size ?? undefined,
      shape: shape ?? undefined,
      border: border ?? undefined,
      uncheckedBorder: uncheckedBorder ?? undefined,
      color: color ?? undefined,
      borderColor: borderColor ?? undefined,
      uncheckedBorderColor: uncheckedBorderColor ?? undefined,
      focusColor: focusColor ?? undefined,
      elevation: elevation ?? undefined,
      density: density ?? undefined,
      filled: !!filled,
      font: font ?? undefined,
      textColor: textColor ?? undefined,
      readOnly: !!readOnly,
      textPlacement: textPlacement ?? undefined,
      uncheckedColor: uncheckedColor ?? undefined,
    }),
    [
      uncheckedBorderColor,
      uncheckedBorder,
      uncheckedColor,
      size,
      shape,
      border,
      color,
      borderColor,
      focusColor,
      elevation,
      density,
      filled,
      font,
      textColor,
      textPlacement,
      readOnly,
    ],
  );

  return (
    <Article row>
      <Content gap={20} grow px={20}>
        <Section shape="rounded">
          <RadioGroup
            defaultValue="checked"
            disabled={disabled ?? undefined}
            gap={16}
            legend="States"
            name="states"
            row
          >
            <Radio defaultChecked {...shared} label="Checked" value="checked" />
            <Radio {...shared} label="Unchecked" value="unchecked" />
            <Radio disabled {...shared} label="Disabled" value="disabled1" />
            <Divider variant="strong" vertical />
            <Radio
              disabled
              {...shared}
              checked
              label="Disabled checked"
              value="disabled2"
            />
          </RadioGroup>
        </Section>
        <Section>
          <RadioGroup
            defaultValue="primary"
            disabled={disabled ?? undefined}
            gap={16}
            label="Color"
            name="color"
            row
          >
            <Radio {...shared} defaultChecked label="Primary" value="primary" />
            <Radio
              {...shared}
              color="secondary"
              defaultChecked
              label="Secondary"
              value="secondary"
            />
            <Radio
              {...shared}
              color="tertiary"
              defaultChecked
              label="Tertiary"
              value="tertiary"
            />
            <Radio
              {...shared}
              color="info"
              defaultChecked
              label="Info"
              value="info"
            />
            <Radio
              {...shared}
              color="success"
              defaultChecked
              label="Success"
              value="success"
            />
            <Radio
              {...shared}
              color="warning"
              defaultChecked
              label="Warning"
              value="warning"
            />
            <Radio
              {...shared}
              color="error"
              defaultChecked
              label="Error"
              value="error"
            />
          </RadioGroup>
        </Section>
        <Section>
          <RadioGroup
            disabled={disabled ?? undefined}
            gap={16}
            legend="Shape"
            name="shape"
            row
          >
            <Radio
              {...shared}
              defaultChecked
              label="Square"
              shape="square"
              value="square"
            />
            <Radio {...shared} label="Smooth" shape="smooth" value="smooth" />
            <Radio
              {...shared}
              label="Rounded"
              shape="rounded"
              value="rounded"
            />
            <Radio {...shared} label="Round" shape="round" value="round" />
          </RadioGroup>
        </Section>

        <Section>
          <RadioGroup
            alignItems="center"
            defaultValue="extraSmall"
            disabled={disabled ?? undefined}
            gap={16}
            legend="Size"
            name="size"
            row
          >
            <Radio
              {...shared}
              defaultChecked
              label="ExtraSmall"
              size="extraSmall"
              value="extraSmall"
            />
            <Radio
              {...shared}
              defaultChecked
              label="Small"
              size="small"
              value="small"
            />
            <Radio
              {...shared}
              defaultChecked
              label="Medium"
              size="medium"
              value="medium"
            />
            <Radio
              {...shared}
              defaultChecked
              label="Large"
              size="large"
              value="large"
            />
            <Radio
              {...shared}
              defaultChecked
              label="ExtraLarge"
              size="extraLarge"
              value="extraLarge"
            />
          </RadioGroup>
        </Section>

        <Section>
          <RadioGroup
            disabled={disabled ?? undefined}
            gap={16}
            label="Custom icons"
            name="icons"
            row
            wrap
          >
            <Radio
              {...shared}
              icon={<MdFavorite offset={4} />}
              label="2 Icons"
              uncheckedIcon={<MdDoNotDisturb offset={4} />}
              value="1"
            />
            <Radio
              {...shared}
              border={0}
              icon={<MdFavorite />}
              label="2 Icons/-Border"
              uncheckedIcon={<MdCake />}
              value="2"
            />
            <Radio
              {...shared}
              filled={false}
              icon={<MdFavorite />}
              label="2 Icons/-Filled"
              uncheckedIcon={<MdFavoriteBorder />}
              value="3"
            />
            <Radio
              {...shared}
              border={0}
              filled={false}
              icon={<MdFavorite />}
              label="2 Icons/-Filled/-Border"
              uncheckedIcon={<MdFavoriteBorder />}
              value="4"
            />
            <Radio
              {...shared}
              defaultChecked
              icon={<MdFavorite />}
              label="1 icon"
              value="5"
            />
            <Radio
              {...shared}
              filled={false}
              icon={<MdFavorite />}
              label="1 icon/-Filled"
              value="6"
            />
            <Radio
              {...shared}
              label="Unchecked Only"
              uncheckedIcon={<MdFavorite />}
              value="7"
            />
          </RadioGroup>
        </Section>

        <Section>
          <RadioGroup
            alignItems="center"
            defaultValue={value}
            disabled={disabled ?? undefined}
            gap={20}
            legend="Custom"
            name="custom"
            py={16}
            row
          >
            <Radio
              {...shared}
              label="Image"
              name="custom"
              onChange={(e) => {
                setCustomValue(e.currentTarget.value);
              }}
              value="image"
            >
              {customValue === 'image' ? (
                <img
                  alt=""
                  className="rotate-0 transition-all duration-200"
                  height={64}
                  src={tree}
                  width={64}
                />
              ) : (
                <img
                  alt=""
                  className="rotate-90 transition-all duration-200"
                  height={64}
                  src={tree}
                  width={64}
                />
              )}
            </Radio>
            <Radio
              {...shared}
              label="Text"
              name="custom"
              onChange={(e) => {
                setCustomValue(e.currentTarget.value);
              }}
              value="text"
            >
              {customValue === 'text' ? (
                <span className="px-2 font-bold">Checked</span>
              ) : (
                <span className="px-2">Unchecked</span>
              )}
            </Radio>
          </RadioGroup>
        </Section>

        <Section>
          <Fieldset
            className="flex w-full"
            disabled={disabled ?? undefined}
            legend="Controlled"
          >
            <Radio
              {...shared}
              checked={value === 'option1'}
              label="Option 1"
              onChange={() => {
                setValue('option1');
              }}
            />
            <Radio
              {...shared}
              checked={value === 'option2'}
              label="Option 2"
              onChange={() => {
                setValue('option2');
              }}
            />
          </Fieldset>
        </Section>

        <Section>
          <RadioGroup
            className="flex w-full"
            description="Controlled by RadioGroup component."
            disabled={disabled ?? undefined}
            legend="Controlled by RadioGroup"
            name="rgControl"
            onChange={(v) => {
              setValue2(v);
            }}
            required
            value={value2}
          >
            <Radio {...shared} label="Option 1" value="option1" />
            <Radio {...shared} label="Option 2" value="option2" />
          </RadioGroup>
        </Section>

        <Section>
          <RadioGroup
            className="flex w-full"
            disabled={disabled ?? undefined}
            legend="Error State"
            name="errors"
          >
            <Radio
              {...shared}
              error="Error message"
              label="Error"
              value="error"
            />
            <Radio
              {...shared}
              description="A descrption."
              label="Description"
              value="desc"
            />
          </RadioGroup>
        </Section>
      </Content>
      <Aside>
        <Modifiers
          border={border}
          borderColor={borderColor}
          color={color}
          density={density}
          disabled={disabled}
          elevation={elevation}
          filled={filled}
          focusColor={focusColor}
          font={font}
          onChange={({
            size: sz,
            shape: sp,
            border: bd,
            borderColor: bc,
            color: cl,
            elevation: el,
            density: ds,
            filled: fl,
            readOnly: ro,
            focusColor: fc,
            font: lf,
            disabled: db,
            textColor: tc,
            textPlacement: tp,
            uncheckedColor: uc,
            uncheckedBorder: ub,
            uncheckedBorderColor: ud,
          }) => {
            setSize(sz ?? null);
            setShape(sp ?? null);
            setBorder(bd ?? null);
            setColor(cl ?? null);
            setBorderColor(bc ?? null);
            setElevation(el ?? null);
            setDensity(ds ?? null);
            setFilled(fl ?? null);
            setFocusColor(fc ?? null);
            setFont(lf ?? null);
            setDisabled(db ?? null);
            setTextColor(tc ?? null);
            setTextPlacement(tp ?? null);
            setUncheckedColor(uc ?? null);
            setUncheckedBorder(ub ?? null);
            setUncheckedBorderColor(ud ?? null);
            setReadOnly(ro ?? null);
          }}
          readOnly={readOnly}
          shape={shape}
          size={size}
          textColor={textColor}
          textPlacement={textPlacement}
          uncheckedBorder={uncheckedBorder}
          uncheckedBorderColor={uncheckedBorderColor}
          uncheckedColor={uncheckedColor}
        />
      </Aside>
    </Article>
  );
};
