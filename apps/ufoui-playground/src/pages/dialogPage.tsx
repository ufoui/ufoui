import { useState } from 'react';
import { MdInfo } from 'react-icons/md';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogType,
  H1,
  Section,
} from '@ufoui/core';
import { MotionAnimation, MotionStyle } from '@ufoui/types';

const animations: MotionAnimation[] = [
  'fade',
  'fadeBlur',
  'scale',
  'scaleBlur',
  'popup',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'slideUpBlur',
  'slideDownBlur',
  'slideLeftBlur',
  'slideRightBlur',
  'rotate',
  'rotateUpRight',
  'rotateUpLeft',
  'rollLeft',
  'rollRight',
  'flipX',
  'flipY',
  'bounce',
  'squish',
  'rubber',
  'popElastic',
  'jelly',
];

const dialogTypes: DialogType[] = [
  'basic',
  'fullscreen',
  'dockRight',
  'dockLeft',
  'dockTop',
  'dockBottom',
];
const shapes = ['auto', 'square', 'smooth', 'rounded', 'round'] as const;
type ShapeOption = (typeof shapes)[number];

export default function DialogPage() {
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState<MotionAnimation>('fade');
  const [motionStyle, setMotionStyle] = useState<MotionStyle>('regular');
  const [dialogType, setDialogType] =
    useState<(typeof dialogTypes)[number]>('basic');
  const [shape, setShape] = useState<ShapeOption>('auto');

  return (
    <div style={{ padding: 40 }}>
      <H1 className="mb-4 text-xl font-bold">Dialog Test Page</H1>
      <Section className="items-center gap-5" direction="row">
        {/* TYPE SELECTOR */}
        <div className="">
          <label className="mr-4 font-semibold">Dialog type:</label>
          <select
            className="rounded border px-2 py-1"
            onChange={(e) => {
              setDialogType(e.target.value as DialogType);
            }}
            value={dialogType}
          >
            {dialogTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* SHAPE SELECTOR */}
        <div className="">
          <label className="mr-4 font-semibold">Shape:</label>
          <select
            className="rounded border px-2 py-1"
            onChange={(e) => {
              setShape(e.target.value as ShapeOption);
            }}
            value={shape}
          >
            {shapes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            filled
            onClick={() => {
              setMotionStyle('regular');
              setOpen(true);
            }}
          >
            Open dialog
          </Button>
        </div>
      </Section>
      {/* BUTTON GRID */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {animations.map((a) => (
          <div className="flex flex-col gap-2" key={a}>
            <Button
              filled
              label={a + ' (regular)'}
              onClick={() => {
                setAnimation(a);
                setMotionStyle('regular');
                setOpen(true);
              }}
            />

            <Button
              label={a + ' (expressive)'}
              onClick={() => {
                setAnimation(a);
                setMotionStyle('expressive');
                setOpen(true);
              }}
              tonal
            />
          </div>
        ))}
      </div>

      {/* DIALOG */}
      <Dialog
        animation={animation}
        border={1}
        borderColor="outline"
        color="surfaceContainerHigh"
        motionStyle={motionStyle}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        shape={shape === 'auto' ? undefined : shape}
        type={dialogType}
      >
        <DialogTitle
          icon={<MdInfo />}
          label={`${animation} | ${motionStyle} | ${dialogType}`}
        />

        <DialogContent>
          {[...Array(10)].map((_, i) => (
            <div key={i}>Row {i + 1}</div>
          ))}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
