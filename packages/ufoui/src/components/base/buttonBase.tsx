import React, { forwardRef, ReactNode, useRef, useState } from 'react';

import {
    BorderColor,
    cn,
    ControlStyle,
    createRipple,
    ElementDensity,
    ElementEffects,
    ElementElevation,
    ElementFont,
    ElementOutline,
    ElementPlacement,
    ElementShape,
    ElementSize,
    getBorderClass,
    getBorderColor,
    getDensityClass,
    getEffects,
    getElevationClass,
    getFontClass,
    getShapeClass,
    getSizeClass,
    mergeRefs,
    SemanticColor,
    useUniqueId,
} from '../../utils';
import { InlineTooltipManager } from '../../internal';
import { Spinner } from '../spinner/spinner';

/** Visual variant of the button. */
export type ButtonVariant = 'text' | 'outlined' | 'elevated' | 'tonal' | 'filled';

/**
 * Props for the ButtonBase component.
 *
 * @category Base components
 */
export interface ButtonBaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
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

    /** Interaction visual effects, or `'none'` to disable them all. */
    effects?: ElementEffects;

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

    /** Font token for label and content. */
    font?: ElementFont;

    /** Expands button to full width. */
    fullWidth?: boolean;

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

    /** Controlled selected state for toggle buttons. */
    selected?: boolean;

    /** Semantic color override when selected. */
    selectedColor?: SemanticColor;

    /** Icon displayed when selected. */
    selectedIcon?: React.ReactElement;

    /** Shape override when selected. */
    selectedShape?: ElementShape;

    /** Shape of the button. */
    shape?: ElementShape;

    /** Predefined button size. Default: medium */
    size?: ElementSize;

    /** Tooltip text and accessibility label fallback. */
    title?: string;

    /** Enables toggle button behavior. */
    toggle?: boolean;

    /** Enables tonal style. */
    tonal?: boolean;

    /** Tooltip alignment relative to the button. */
    tooltipAlign?: ElementPlacement;

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

    /** Visual button variant. Takes precedence over boolean variant shortcuts. Default: text */
    variant?: ButtonVariant;
}

/**
 * Low-level base component for all button variants.
 *
 * Supports Material Design 3 styles, toggle behavior, loading state,
 * file upload trigger, icons, and semantic colors.
 *
 * @remarks
 * Supported effects:
 * - `hover`, `pressed` - `'overlay'`, `'elevate'`
 * - `touch` - `'ripple'`
 * - `selected` - `'morph'`, `'color'`, `'overlay'`
 * - `focus` - `'ring'`, `'overlay'`
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

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>((props: ButtonBaseProps, ref) => {
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
        effects,
        children,
        variant,
        outlined = false,
        filled = false,
        tonal = false,
        elevated = false,
        flat = false,
        elevation,
        disabled,
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
    const finalEffects = getEffects(effects, {
        hover: ['overlay', 'elevate'],
        pressed: ['overlay', 'elevate'],
        touch: ['ripple'],
        selected: ['morph', 'color'],
        focus: ['ring', 'overlay'],
    });

    const isControlled = selected !== undefined;
    const [internalSelected, setInternalSelected] = useState(defaultSelected ?? false);
    const isSelected = isControlled ? selected : internalSelected;

    const uploadInputRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const generatedId = useUniqueId('button');
    const elemId = id || name || generatedId;
    const finalVariant =
        variant ?? (filled ? 'filled' : tonal ? 'tonal' : elevated ? 'elevated' : outlined ? 'outlined' : 'text');
    const linkContent = link ? React.cloneElement(link, { ref: linkRef, style: { display: 'none' } }) : null;

    const wrapperClasses = cn(elementClass, className, 'uui-bb', getDensityClass(density), fullWidth && 'uui-w-full');

    const resolvedBorder = border ?? (finalVariant === 'outlined' ? 1 : undefined);
    const shapeClass =
        toggle && isSelected && finalEffects.selected?.includes('morph')
            ? getShapeClass(selectedShape)
            : getShapeClass(shape);

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
        ...(finalEffects.hover?.includes('elevate') && !flat ? ['uui-hover-elevate'] : []),
        ...(finalEffects.pressed?.includes('elevate') && !flat ? ['uui-pressed-elevate'] : []),
    ];

    const controlClasses: string[] = [
        'uui-btn-control',
        getFontClass(font),
        ...(toggle && finalEffects.selected?.includes('color') ? ['uui-toggle'] : []),
        ...[`uui-${finalVariant}`],
        ...(finalEffects.focus?.includes('ring') ? ['uui-focus-ring'] : []),
        ...(finalEffects.focus?.includes('overlay') ? ['uui-focus-overlay'] : []),
        ...(finalEffects.hover?.includes('overlay') ? ['uui-hover-overlay'] : []),
        ...(finalEffects.pressed?.includes('overlay') ? ['uui-pressed-overlay'] : []),
        ...(finalEffects.selected?.includes('overlay') ? ['uui-selected-overlay'] : []),
        ...(loading ? ['uui-loading'] : []),
        ...(fullWidth ? ['uui-w-full'] : []),
        ...(!children ? [getSizeClass(size)] : []),
        ...(isSelected ? ['uui-selected'] : []),
        getBorderClass(resolvedBorder),
    ];
    controlClasses.push(shapeClass);
    controlClasses.push(...elevationClasses, getElevationClass(resolvedElevation));

    const controlStyle = ControlStyle(style);
    if (resolvedBorder !== undefined) {
        controlStyle.border(getBorderColor(borderColor));
    }

    const stateClasses: string[] = ['uui-state'];
    const stateStyle = ControlStyle();

    stateClasses.push(shapeClass);

    const iconClass = 'uui-icon';

    const staticLeadingIcon = toggle && isSelected ? (selectedIcon ?? leading ?? icon) : (leading ?? icon);
    const leadingIcon = loading ? (
        <div className={iconClass}>
            <Spinner />
        </div>
    ) : (
        staticLeadingIcon && <div className={iconClass}>{staticLeadingIcon}</div>
    );

    const trailingIcon = (trailing ?? endIcon) && <div className={iconClass}>{trailing ?? endIcon}</div>;

    let content;
    if (children) {
        const contentClass = cn('uui-btn-content uui-overflow-hidden', shapeClass, getFontClass(font));
        content = <div className={contentClass}>{children}</div>;
    } else {
        content = (
            <div className="uui-btn-content">
                {leadingIcon}
                {label && <span className={'uui-label ' + getFontClass(font)}>{label}</span>}
                {trailingIcon}
            </div>
        );
    }

    // Base appearance (non-toggle OR toggle without color effect)
    const setStandardColor = () => {
        if (finalVariant === 'filled') {
            controlStyle.bg(color);
            stateStyle.bg.on(color);
            controlStyle.text.on(color);
        } else if (finalVariant === 'text' || finalVariant === 'elevated') {
            controlStyle.text(color);
            stateStyle.bg(color);
        }
    };

    // Toggle appearance – unselected state
    const setUnselectedColor = () => {
        if (color) {
            controlStyle.bg(color);
            stateStyle.bg.on(color);
            controlStyle.text.on(color);
        }
    };

    // Toggle appearance – selected state
    const setSelectedColor = () => {
        if (color || selectedColor) {
            const altColor = finalVariant !== 'tonal' && finalVariant !== 'outlined' ? color : undefined;
            const finalColor = selectedColor ?? altColor;
            controlStyle.bg(finalColor);
            stateStyle.bg.on(finalColor);
            controlStyle.text.on(finalColor);
        }
    };

    if (toggle && finalEffects.selected?.includes('color')) {
        if (isSelected) {
            setSelectedColor();
        } else {
            setUnselectedColor();
        }
    } else if (color) {
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
        if (finalEffects.touch?.includes('ripple')) {
            createRipple(event.currentTarget, event);
        }
    };

    const inlineTooltip = title ? <div id={`${elemId}-tip`}>{title}</div> : null;

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
                className={cn(controlClasses)}
                disabled={disabled}
                id={elemId}
                name={name || undefined}
                onClick={handleClick}
                ref={mergeRefs(ref, buttonRef)}
                style={controlStyle.get()}
                type={type}
                {...other}>
                <div className={stateClasses.join(' ')} style={stateStyle.get()} />
                {content}
            </button>
            {linkContent}
            {inlineTooltip && (
                <InlineTooltipManager align={tooltipAlign} tooltip={inlineTooltip} triggerRef={buttonRef} />
            )}
        </div>
    );
});

ButtonBase.displayName = 'ButtonBase';
