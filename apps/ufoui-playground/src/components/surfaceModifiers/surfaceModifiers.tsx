import {
  ElementBorderWidth,
  ElementElevation,
  ElementShape,
  ElementSize,
  SemanticColor,
  ThemeSchemeKeys,
} from '@ufoui/core';

type ButtonModifiersProps = {
  size?: ElementSize;
  shape?: ElementShape;
  border?: ElementBorderWidth;
  color?: SemanticColor;
  elevation?: ElementElevation;
  onChange: (mod: {
    size?: ElementSize;
    shape?: ElementShape;
    border?: ElementBorderWidth;
    color?: SemanticColor;
    elevation?: ElementElevation;
  }) => void;
};

export const SurfaceModifiers = ({
  size,
  shape,
  border,
  color,
  elevation,
  onChange,
}: ButtonModifiersProps) => {
  const allCollors = ThemeSchemeKeys;
  return (
    <div className="grid grid-cols-2 gap-2">
      <label>Size:</label>
      <select
        onChange={(e) => {
          onChange({
            size:
              e.target.value === ''
                ? undefined
                : (e.target.value as ElementSize),
            shape,
            border,
            color,
            elevation,
          });
        }}
        value={size ?? ''}
      >
        <option value="">Default</option>
        <option value="extra-small">Extra Small</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="extra-large">Extra Large</option>
      </select>

      <label>Color:</label>
      <select
        onChange={(e) => {
          onChange({
            size,
            shape,
            border,
            elevation,
            color:
              e.target.value === ''
                ? undefined
                : (e.target.value as SemanticColor),
          });
        }}
        value={color ?? ''}
      >
        <option value="">Default</option>
        {allCollors.map((color) => {
          return (
            <option key={color} value={color}>
              {color}
            </option>
          );
        })}
      </select>

      <label>Shape:</label>
      <select
        onChange={(e) => {
          onChange({
            size,
            border,
            color,
            elevation,
            shape:
              e.target.value === ''
                ? undefined
                : (e.target.value as ElementShape),
          });
        }}
        value={shape ?? ''}
      >
        <option value="">Default</option>
        <option value="round">Round</option>
        <option value="rounded">Rounded</option>
        <option value="rect">Rect</option>
      </select>

      <label>Border width:</label>
      <select
        onChange={(e) => {
          onChange({
            size,
            shape,
            color,
            elevation,
            border:
              e.target.value === ''
                ? undefined
                : (+e.target.value as ElementBorderWidth),
          });
        }}
        value={border ?? ''}
      >
        <option value="">Default</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label>Elevation:</label>
      <select
        onChange={(e) => {
          onChange({
            size,
            shape,
            border,
            color,
            elevation:
              e.target.value === ''
                ? undefined
                : (+e.target.value as ElementElevation),
          });
        }}
        value={elevation ?? ''}
      >
        <option value="">Default</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
};
