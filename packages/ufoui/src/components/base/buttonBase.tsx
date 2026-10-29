import React, { ElementType, forwardRef, ReactNode, useRef, useState } from 'react';

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
    getDensityClass,
    getEffects,
    getElevationClass,
    getFontClass,
    getShapeClass,
    getSizeClass,
    getWrapperStyle,
    mergeRefs,
    PolymorphicComponent,
    PolymorphicProps,
    SemanticColor,
    useUniqueId,
    WrapperProps,
} from '../../utils';
import { InlineTooltipManager, Leading, Trailing } from '../../internal';
import { Spinner } from '../spinner/spinner';

/**
 * Visual variant of the button.
 *
 * @category Base components
 */
export type ButtonVariant = 'text' | 'outlined' | 'elevated' | 'tonal' | 'filled';

/**
 * Element rendered by a button: native button, anchor, or router component.
 *
 * @category Base components
 */
export type ButtonElement = 'button' | 'a' | Exclude<ElementType, string>;

/**
 * Own props of the ButtonBase component, without the props of the rendered element.
 *
 * @category Base components
 */
export interface ButtonBaseOwnProps extends WrapperProps {
    /** Avatar rendered at the start of the button, before `icon`. */
    avatar?: React.ReactElement;

    /** Border width of the control. Default: 1 for outlined */
    border?: ElementOutline;

    /** Border color override. Default: outlineVariant */
    borderColor?: BorderColor;

    /** Text block content, used when `content` is not set. */
    children?: ReactNode;

    /** Semantic color theme. Default: primary */
    color?: SemanticColor;

    /** Text block content, rendered between the leading and trailing slots. */
    content?: ReactNode;

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

    /** Disables elevation changes on hover and press. */
    flat?: boolean;

    /** Font token for label and content. Overrides the font derived from `size`. */
    font?: ElementFont;

    /** Expands button to full width. */
    fullWidth?: boolean;

    /** Icon rendered at the start of the button, after `avatar`. */
    icon?: React.ReactElement;

    /** DOM id. Auto-generated if not provided. */
    id?: string;

    /** Text label for the button. Used as `aria-label` when `content` or `children` is set. */
    label?: string;

    /** Leading slot content, rendered after `icon`. Replaced by the spinner while loading. */
    leading?: ReactNode;

    /** Shows loading spinner in place of the leading content. */
    loading?: boolean;

    /** DOM name attribute. */
    name?: string;

    /** Called with the new selected state of a toggle button. */
    onChange?: (selected: boolean) => void;

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

    /** Replaces `icon` while a toggle button is selected. */
    selectedIcon?: React.ReactElement;

    /** Shape override when selected. Default: rounded */
    selectedShape?: ElementShape;

    /** Shape of the button. Default: round */
    shape?: ElementShape;

    /** Wraps the content tightly, ignoring `size` tokens. May end up larger than the token size. */
    shrink?: boolean;

    /** Predefined button size. Also sets the default font. Default: small */
    size?: ElementSize;

    /** Horizontal spacing around the leading and trailing slots. Default: default */
    spread?: 'narrow' | 'default' | 'wide';

    /** Tooltip text and accessibility label fallback. */
    title?: string;

    /** Enables toggle button behavior. */
    toggle?: boolean;

    /** Enables tonal style. */
    tonal?: boolean;

    /** Tooltip alignment relative to the button. */
    tooltipAlign?: ElementPlacement;

    /** Trailing slot content, rendered before `endIcon`. */
    trailing?: ReactNode;

    /** Native button type. Ignored when `as` renders other than `button`. Default: button */
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
 * Props for the ButtonBase component.
 *
 * @typeParam T - Element type rendered by the button. Default: `button`.
 *
 * @category Base components
 */
export type ButtonBaseProps<T extends ButtonElement = 'button'> = PolymorphicProps<T, ButtonBaseOwnProps>;

/**
 * Low-level base component for all button variants.
 *
 * Supports Material Design 3 styles, toggle behavior, loading state,
 * file upload trigger, icons, and semantic colors.
 *
 * @remarks
 * `as` renders the button as an anchor or a router component, and `type` is then not applied.
 * When `disabled`, a native `button` is rendered instead of the `as` element, without `href`;
 * other props of the `as` element are still passed to it.
 *
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
 * <ButtonBase elementClass="uui-button" label="Save" filled icon={<SaveIcon />} />
 *
 * @example
 * <ButtonBase elementClass="uui-button" upload label="Upload" onUploadChange={handleUpload} />
 *
 * @example
 * <ButtonBase elementClass="uui-button" as={RouterLink} to="/settings" label="Settings" />
 *
 * @category Base components
 */

export const ButtonBase = forwardRef<HTMLButtonElement, Omit<ButtonBaseProps, 'as'> & { as?: ButtonElement }>(
    (props, ref) => {
        const {
            as,
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
            avatar,
            icon,
            selectedIcon,
            leading,
            endIcon,
            trailing,
            content,
            onChange,
            onClick,
            elementClass,
            font,
            upload,
            uploadAccept,
            uploadMultiple,
            onUploadChange,
            id,
            name,
            loading,
            fullWidth = false,
            shrink = false,
            selected,
            defaultSelected,
            toggle = false,
            tooltipAlign = 'auto',
            density,
            spread,
            style,
            'aria-label': ariaLabel,
            ...other
        } = props;
        const { wrapperStyle, otherProps } = getWrapperStyle(other);
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
        const finalIcon = toggle && isSelected && selectedIcon ? selectedIcon : icon;

        const uploadInputRef = useRef<HTMLInputElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const Component = disabled ? 'button' : (as ?? 'button');

        const isButton = Component === 'button';
        const generatedId = useUniqueId('button');
        const elemId = id ?? generatedId;
        const finalVariant =
            variant ?? (filled ? 'filled' : tonal ? 'tonal' : elevated ? 'elevated' : outlined ? 'outlined' : 'text');

        const wrapperClasses = cn(
            elementClass,
            className,
            'uui-bb',
            getDensityClass(density),
            fullWidth && 'uui-w-full'
        );

        const resolvedBorder = border ?? (finalVariant === 'outlined' ? 1 : undefined);
        const shapeClass =
            toggle && isSelected && finalEffects.selected?.includes('morph')
                ? getShapeClass(selectedShape)
                : getShapeClass(shape);

        let resolvedElevation = elevation;
        if (elevation === undefined) {
            if (finalVariant === 'filled' || finalVariant === 'tonal') {
                if (!flat) {
                    resolvedElevation = elevated ? 1 : 0;
                }
            } else if (finalVariant === 'elevated') {
                resolvedElevation = 1;
            }
        }

        const controlClasses = cn(
            'uui-btn-control',
            toggle && finalEffects.selected?.includes('color') && 'uui-toggle',
            `uui-${finalVariant}`,
            finalEffects.focus?.includes('ring') && 'uui-focus-ring',
            finalEffects.focus?.includes('overlay') && 'uui-focus-overlay',
            finalEffects.hover?.includes('overlay') && 'uui-hover-overlay',
            finalEffects.pressed?.includes('overlay') && 'uui-pressed-overlay',
            finalEffects.selected?.includes('overlay') && 'uui-selected-overlay',
            loading && 'uui-loading',
            fullWidth && 'uui-w-full',
            shrink && 'uui-shrink',
            getSizeClass(size),
            (avatar || finalIcon || leading || loading) && 'uui-has-leading',
            avatar && 'uui-has-avatar',
            (trailing || endIcon) && 'uui-has-trailing',
            isSelected && 'uui-selected',
            getBorderClass(resolvedBorder),
            shapeClass,
            finalEffects.hover?.includes('elevate') && !flat && 'uui-hover-elevate',
            finalEffects.pressed?.includes('elevate') && !flat && 'uui-pressed-elevate',
            getElevationClass(resolvedElevation),
            spread && `uui-spread-${spread}`
        );

        const controlStyle = ControlStyle(style);
        if (resolvedBorder !== undefined) {
            controlStyle.border(borderColor ?? 'outlineVariant');
        }

        const stateClasses = cn('uui-state', shapeClass);
        const stateStyle = ControlStyle();

        const finalLeading = loading ? <Spinner stretch /> : leading;
        const leadingContent = (
            <Leading
                content={finalLeading}
                start={
                    !loading &&
                    (avatar || finalIcon) && (
                        <>
                            {avatar}
                            {finalIcon}
                        </>
                    )
                }
            />
        );
        const trailingContent = <Trailing content={trailing} end={endIcon} />;
        const finalContent = content ?? children ?? label;
        const finalLabel = finalContent && <span className="uui-btn-label">{finalContent}</span>;

        const contentSlot = (
            <span className={cn('uui-btn-content', font && getFontClass(font))}>
                {leadingContent}
                {finalLabel}
                {trailingContent}
            </span>
        );

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
            if (toggle) {
                const newValue = !isSelected;
                if (!isControlled) {
                    setInternalSelected(newValue);
                }
                onChange?.(newValue);
            }

            if (upload && uploadInputRef.current) {
                uploadInputRef.current.click();
            }
            if (onClick) {
                onClick(event);
            }
            if (finalEffects.touch?.includes('ripple')) {
                createRipple(event.currentTarget, event);
            }
        };

        const inlineTooltip = title ? <div id={`${elemId}-tip`}>{title}</div> : null;
        // eslint-disable-next-line eqeqeq
        const finalAriaLabel = ariaLabel ?? ((content ?? children) != null ? label : label ? undefined : title);

        return (
            <div className={wrapperClasses} style={wrapperStyle}>
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
                <Component
                    aria-busy={loading}
                    aria-describedby={title ? `${elemId}-tip` : undefined}
                    aria-haspopup={upload ? 'dialog' : undefined}
                    aria-label={finalAriaLabel}
                    aria-pressed={toggle ? isSelected : undefined}
                    className={controlClasses}
                    disabled={isButton ? disabled : undefined}
                    id={elemId}
                    name={name}
                    onClick={handleClick}
                    ref={mergeRefs(ref, buttonRef)}
                    style={controlStyle.get()}
                    type={isButton ? type : undefined}
                    {...otherProps}
                    {...(disabled && { href: undefined })}>
                    <span className={stateClasses} style={stateStyle.get()} />
                    {contentSlot}
                </Component>
                {inlineTooltip && (
                    <InlineTooltipManager align={tooltipAlign} tooltip={inlineTooltip} triggerRef={buttonRef} />
                )}
            </div>
        );
    }
) as PolymorphicComponent<ButtonBaseOwnProps, 'button', ButtonElement>;

ButtonBase.displayName = 'ButtonBase';
