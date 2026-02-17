import React, { forwardRef, ReactNode, useRef, useState } from 'react';

import {
  BorderColor,
  ControlStyle,
  createRipple,
  ElementAlign,
  ElementDensity,
  ElementElevation,
  ElementFocusEffect,
  ElementFont,
  ElementHoverEffect,
  ElementOutline,
  ElementPressedEffect,
  ElementSelectedEffect,
  ElementShape,
  ElementSize,
  ElementTouchEffect,
  getBorderClass,
  getBorderColor,
  getDensityClass,
  getElevationClass,
  getFontClass,
  getShapeClass,
  getSizeClass,
  mergeRefs,
  SemanticColor,
  SurfaceColor,
  uniqueID,
} from '../../../utils';
import { InlineTooltipManager } from '../../../internal/inlineTooltip/inlineTooltipManager';
import { Spinner } from '../../spinner/spinner';

/**
 * Props for the ButtonBase component.
 *
 * @category Base components
 */
export interface ButtonBaseProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'color' | 'size'
  > {
  /** Outline thickness when outlined. Default: 1 */
  border?: ElementOutline;

  /** Border color when outlined. */
  borderColor?: BorderColor;

  /** Custom content. Overrides label, icons, and layout. */
  children?: ReactNode;

  /** Semantic color theme. Default: primary */
  color?: SemanticColor;

  /** Initial selected state for uncontrolled toggle buttons. */
  defaultSelected?: boolean;

  /** Visual density of the button. */
  density?: ElementDensity;

  /** Disables the button. */
  disabled?: boolean;

  /** Required root class name. */
  elementClass: string;

  /** Enables elevated style. */
  elevated?: boolean;

  /** Explicit elevation level. */
  elevation?: ElementElevation;

  /** Icon rendered at the end of the button. */
  endIcon?: React.ReactElement;

  /** Enables filled style. */
  filled?: boolean;

  /** Disables elevation and elevation effects. */
  flat?: boolean;

  /** Focus visual effects. */
  focusEffects?: ElementFocusEffect[];

  /** Font token for label and content. */
  font?: ElementFont;

  /** Expands button to full width. */
  fullWidth?: boolean;

  /** Hover visual effects. */
  hoverEffects?: ElementHoverEffect[];

  /** Icon rendered at the start of the button. */
  icon?: React.ReactElement;

  /** DOM id. Auto-generated if not provided. */
  id?: string;

  /** Text label for the button. */
  label?: string;

  /** Custom leading content. */
  leading?: ReactNode;

  /** Imperative link trigger element. */
  link?: React.ReactElement;

  /** Shows loading spinner and disables interaction. */
  loading?: boolean;

  /** DOM name attribute. */
  name?: string;

  /** Blur event handler. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;

  /** Change event handler (toggle buttons). */
  onChange?: React.ChangeEventHandler<HTMLButtonElement>;

  /** Click event handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** Change handler for file upload input. */
  onUploadChange?: React.ChangeEventHandler<HTMLInputElement>;

  /** Enables outlined style. */
  outlined?: boolean;

  /** Pressed visual effects. */
  pressedEffects?: ElementPressedEffect[];

  /** Controlled selected state for toggle buttons. */
  selected?: boolean;

  /** Semantic color override when selected. */
  selectedColor?: SemanticColor;

  /** Visual effects applied when selected. */
  selectedEffects?: ElementSelectedEffect[];

  /** Icon displayed when selected. */
  selectedIcon?: React.ReactElement;

  /** Shape override when selected. */
  selectedShape?: ElementShape;

  /** Text color override when selected. */
  selectedTextColor?: SurfaceColor;

  /** Shape of the button. */
  shape?: ElementShape;

  /** Predefined button size. Default: medium */
  size?: ElementSize;

  /** Text color override. */
  textColor?: SurfaceColor;

  /** Tooltip text and accessibility label fallback. */
  title?: string;

  /** Enables toggle button behavior. */
  toggle?: boolean;

  /** Enables tonal style. */
  tonal?: boolean;

  /** Tooltip alignment relative to the button. */
  tooltipAlign?: ElementAlign;

  /** Touch and click visual effects. */
  touchEffects?: ElementTouchEffect[];

  /** Custom trailing content. */
  trailing?: ReactNode;

  /** Native button type. Default: button */
  type?: 'submit' | 'reset' | 'button';

  /** Enables file upload trigger behavior. */
  upload?: boolean;

  /** Accepted MIME types for file upload. */
  uploadAccept?: string;

  /** Enables multi-file upload. */
  uploadMultiple?: boolean;
}

/**
 * Low-level base component for all button variants.
 *
 * Supports Material Design 3 styles, toggle behavior, loading state,
 * file upload trigger, icons, and semantic colors.
 *
 * @param props - Component properties.
 * @function
 *
 * @example
 * <ButtonBase label="Save" filled icon={<SaveIcon />} />
 *
 * @example
 * <ButtonBase upload label="Upload" onUploadChange={handleUpload} />
 *
 * @category Base components
 */

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props: ButtonBaseProps, ref) => {
    const {
      color,
      selectedColor,
      className,
      label,
      title,
      type = 'button',
      size = 'small',
      border,
      borderColor,
      hoverEffects = ['overlay', 'elevate'],
      pressedEffects = ['overlay', 'elevate'],
      touchEffects = ['ripple'],
      selectedEffects = ['morph', 'color'],
      focusEffects = ['ring', 'overlay'],
      children,
      outlined = false,
      filled = false,
      tonal = false,
      elevated = false,
      flat = false,
      elevation,
      disabled,
      textColor,
      selectedTextColor,
      shape = 'round',
      selectedShape = 'rounded',
      icon,
      selectedIcon,
      leading,
      endIcon,
      trailing,
      onClick,
      elementClass,
      font = 'labelLarge',
      upload,
      uploadAccept,
      uploadMultiple,
      onUploadChange,
      id = '',
      name = '',
      loading,
      fullWidth = false,
      link,
      selected,
      defaultSelected,
      toggle = false,
      tooltipAlign = 'auto',
      density,
      style,
      'aria-label': ariaLabel,
      ...other
    } = props;
    const isControlled = selected !== undefined;
    const [internalSelected, setInternalSelected] = useState(
      defaultSelected ?? false,
    );
    const isSelected = isControlled ? selected : internalSelected;

    const uploadInputRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const internalIdRef = useRef(uniqueID('button'));
    const elemId = id || name || internalIdRef.current;
    const linkContent = link
      ? React.cloneElement(link, { ref: linkRef, style: { display: 'none' } })
      : null;

    const wrapperClasses = [
      elementClass,
      className,
      'uui-wrapper uui-bb',
      getDensityClass(density),
      ...(fullWidth ? ['uui-full'] : []),
    ]
      .filter(Boolean)
      .join(' ');

    const controlClasses: string[] = [
      'uui-btn-control',
      getFontClass(font),
      ...(filled ? ['uui-filled'] : []),
      ...(elevated ? ['uui-elevated'] : []),
      ...(tonal ? ['uui-tonal'] : []),
      ...(outlined ? ['uui-outlined'] : []),
      ...(focusEffects.includes('ring') ? ['uui-focus-ring'] : []),
      ...(focusEffects.includes('overlay') ? ['uui-focus-overlay'] : []),
      ...(hoverEffects.includes('overlay') ? ['uui-hover-overlay'] : []),
      ...(pressedEffects.includes('overlay') ? ['uui-pressed-overlay'] : []),
      ...(selectedEffects.includes('overlay') ? ['uui-selected-overlay'] : []),
      ...(loading ? ['uui-loading'] : []),
      ...(fullWidth ? ['uui-full'] : []),
      ...(!children ? [getSizeClass(size)] : []),
      ...(isSelected ? ['uui-selected'] : []),
    ];
    const stateClasses: string[] = ['uui-state'];

    const shapeClass =
      toggle && isSelected && selectedEffects.includes('morph')
        ? getShapeClass(selectedShape)
        : getShapeClass(shape);

    controlClasses.push(shapeClass);
    stateClasses.push(shapeClass);

    const iconClass = 'uui-icon';

    const staticLeadingIcon =
      toggle && isSelected
        ? (selectedIcon ?? leading ?? icon)
        : (leading ?? icon);
    const leadingIcon = loading ? (
      <div className={iconClass}>
        <Spinner />
      </div>
    ) : (
      staticLeadingIcon && <div className={iconClass}>{staticLeadingIcon}</div>
    );

    const trailingIcon = (trailing ?? endIcon) && (
      <div className={iconClass}>{trailing ?? endIcon}</div>
    );

    let content;
    if (children) {
      const contentClass = [
        'uui-btn-content uui-overflow-hidden',
        shapeClass,
        getFontClass(font),
      ]
        .filter(Boolean)
        .join(' ');
      content = <div className={contentClass}>{children}</div>;
    } else {
      content = (
        <div className="uui-btn-content">
          {leadingIcon}
          {label && (
            <span className={'uui-label ' + getFontClass(font)}>{label}</span>
          )}
          {trailingIcon}
        </div>
      );
    }

    const controlStyle = ControlStyle(style);
    const stateStyle = ControlStyle();

    if (outlined || border !== undefined) {
      controlStyle.border(getBorderColor(borderColor));
      const resolvedBorder = border ?? (outlined ? 1 : 0);
      const borderClass = getBorderClass(resolvedBorder);
      controlClasses.push(borderClass);
    }

    let resolvedElevation = elevation;
    if (elevation === undefined) {
      if (tonal || filled) {
        if (!flat) {
          resolvedElevation = elevated ? 1 : 0;
        }
      } else if (elevated) {
        resolvedElevation = 1;
      }
    }
    const elevationClasses = [
      ...(hoverEffects.includes('elevate') && !flat
        ? ['uui-hover-elevate']
        : []),
      ...(pressedEffects.includes('elevate') && !flat
        ? ['uui-pressed-elevate']
        : []),
    ];
    controlClasses.push(
      ...elevationClasses,
      getElevationClass(resolvedElevation),
    );

    // Base appearance (non-toggle OR toggle without color effect)
    const setStandardColor = () => {
      if (filled) {
        controlStyle.bg(color ?? 'primary');
        stateStyle.bg.on(color ?? 'primary');
        if (textColor) {
          controlStyle.text(textColor);
        } else {
          controlStyle.text.on(color ?? 'primary');
        }
      } else if (tonal) {
        controlStyle.bg.container('secondary');
        stateStyle.bg.onContainer('secondary');
        if (textColor) {
          controlStyle.text(textColor);
        } else {
          controlStyle.text.onContainer('secondary');
        }
      } else if (elevated) {
        controlStyle.bg('surfaceContainerLow');
        controlStyle.text(textColor ?? color ?? 'primary');
        stateStyle.bg(color ?? 'primary');
      } else if (outlined && !textColor) {
        controlStyle.text.on('surfaceVariant');
        stateStyle.bg.on('surfaceVariant');
      } else {
        controlStyle.text(textColor ?? color ?? 'primary');
        stateStyle.bg(textColor ?? color ?? 'primary');
      }
    };

    // Toggle appearance – unselected state
    const setUnselectedColor = () => {
      if (color) {
        controlStyle.bg(color);
        stateStyle.bg.on(color);
        controlStyle.text.on(color);
      } else if (filled) {
        controlStyle.bg('surfaceContainer');
        stateStyle.bg.on('surfaceContainer');
        controlStyle.text.on('surfaceVariant');
      } else if (elevated) {
        controlStyle.bg('surfaceContainerLow');
        stateStyle.bg.on('surfaceContainerLow');
        controlStyle.text('primary');
      } else if (tonal) {
        controlStyle.bg.container('secondary');
        stateStyle.bg('secondary');
        controlStyle.text.onContainer('secondary');
      } else if (outlined && !textColor) {
        controlStyle.text.on('surfaceVariant');
        stateStyle.bg.on('surfaceVariant');
      } else {
        controlStyle.text(textColor ?? color ?? 'primary');
        stateStyle.bg(textColor ?? color ?? 'primary');
      }
      if (textColor) {
        controlStyle.text(textColor);
      }
    };

    // Toggle appearance – selected state
    const setSelectedColor = () => {
      const finalColor = selectedColor ?? color ?? 'primary';
      if (tonal && !selectedColor) {
        controlStyle.bg('secondary');
        stateStyle.bg.on('secondary');
        if (selectedTextColor) {
          controlStyle.text(selectedTextColor);
        } else {
          controlStyle.text.on('secondary');
        }
      } else if (outlined && !selectedColor) {
        controlStyle.bg('inverseSurface');
        stateStyle.bg.on('inverseSurface');
        if (selectedTextColor) {
          controlStyle.text(selectedTextColor);
        } else {
          controlStyle.text.on('inverseSurface');
        }
      } else {
        controlStyle.bg(finalColor);
        stateStyle.bg.on(finalColor);
        if (selectedTextColor) {
          controlStyle.text(selectedTextColor);
        } else {
          controlStyle.text.on(finalColor);
        }
      }
    };

    if (toggle && selectedEffects.includes('color')) {
      if (isSelected) {
        setSelectedColor();
      } else {
        setUnselectedColor();
      }
    } else {
      setStandardColor();
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      if (toggle) {
        const newValue = !isSelected;
        if (!isControlled) {
          setInternalSelected(newValue);
        }
        props.onChange?.({
          ...event,
          target: {
            ...event.target,
            name,
            value: newValue,
          },
        } as unknown as React.ChangeEvent<HTMLButtonElement>);
      }

      if (linkRef.current) {
        linkRef.current.click();
        return;
      }
      if (upload && uploadInputRef.current) {
        uploadInputRef.current.click();
        return;
      }
      if (onClick) {
        onClick(event);
      }
      if (touchEffects.includes('ripple')) {
        createRipple(event.currentTarget, event);
      }
    };

    const inlineTooltip = title ? (
      <div id={`${elemId}-tip`}>{title}</div>
    ) : null;

    let resolvedAriaLabel;
    if (label && children) {
      resolvedAriaLabel = label;
    }
    if (!label && !children) {
      resolvedAriaLabel = title;
    }
    const finalAriaLabel = ariaLabel ?? resolvedAriaLabel;

    return (
      <div className={wrapperClasses}>
        {upload && (
          <input
            accept={uploadAccept}
            aria-labelledby={elemId}
            multiple={uploadMultiple}
            onChange={onUploadChange}
            ref={uploadInputRef}
            style={{ display: 'none' }}
            type="file"
          />
        )}
        <button
          aria-busy={loading}
          aria-describedby={title ? `${elemId}-tip` : undefined}
          aria-haspopup={upload ? 'dialog' : undefined}
          aria-label={finalAriaLabel}
          aria-pressed={toggle ? isSelected : undefined}
          className={controlClasses.join(' ')}
          disabled={disabled}
          id={elemId}
          name={name || undefined}
          onClick={handleClick}
          ref={mergeRefs(ref, buttonRef)}
          style={controlStyle.get()}
          type={type}
          {...other}
        >
          <div className={stateClasses.join(' ')} style={stateStyle.get()} />
          {content}
        </button>
        {linkContent}
        {inlineTooltip && (
          <InlineTooltipManager
            align={tooltipAlign}
            tooltip={inlineTooltip}
            triggerRef={buttonRef}
          />
        )}
      </div>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';
