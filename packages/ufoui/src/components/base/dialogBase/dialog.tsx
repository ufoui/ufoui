import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  BorderColor,
  ElementElevation,
  ElementOutline,
  ElementShape,
  ElementSize,
  getBorderClass,
  getBorderColor,
  getBorderColorClass,
  getElevationClass,
  getShapeClass,
  getSizeClass,
  getSurfaceColorClasses,
  SurfaceColor,
} from '../../../utils';
import { MotionAnimation, motionClassMap, MotionStyle } from '../../../types';
import { useEscapeHandler } from '../../../hooks';

export type DialogType =
  | 'basic'
  | 'fullscreen'
  | 'dockRight'
  | 'dockLeft'
  | 'dockTop'
  | 'dockBottom';

export type DialogAnimation = 'auto' | 'none' | MotionAnimation;

const defaultAnimation: Record<DialogType, MotionAnimation> = {
  basic: 'scale',
  fullscreen: 'fade',
  dockBottom: 'slideUp',
  dockTop: 'slideDown',
  dockRight: 'slideRight',
  dockLeft: 'slideLeft',
};

const resolveAnimation = (
  animation: DialogAnimation,
  type: DialogType,
): MotionAnimation | 'none' => {
  return animation === 'auto' ? defaultAnimation[type] : animation;
};

export interface DialogProps {
  open: boolean;
  onClose?: () => void;

  type?: DialogType;

  color?: SurfaceColor;
  elevation?: ElementElevation;
  size?: ElementSize;
  shape?: ElementShape;
  border?: ElementOutline;
  borderColor?: BorderColor;

  animation?: DialogAnimation;
  duration?: number;

  disableBackdropClose?: boolean;
  disableEscapeKey?: boolean;

  children?: ReactNode;
  className?: string;

  motionStyle?: MotionStyle;

  modal?: boolean;
  title?: string;
  actions?: ReactNode[];
  icon?: ReactNode;
  // scrollBehavior?: DialogScroll;
  showCloseButton?: boolean;
  showHandle?: boolean;
  autoFocus?: boolean;
}

const portalTarget =
  typeof document !== 'undefined'
    ? (document.getElementById('dialog-root') ?? document.body)
    : null;

export const Dialog = ({
  open,
  onClose,
  type = 'basic',
  color = 'surfaceContainerHigh',
  elevation = 3,
  shape = 'rounded',
  border = 0,
  borderColor,
  size = 'small',
  animation = 'auto',
  duration = 250,
  disableBackdropClose,
  disableEscapeKey,
  children,
  className,
  motionStyle = 'regular',
  modal = false,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [opening, setOpening] = useState<boolean | undefined>();
  const [animating, setAnimating] = useState(false);
  const [reverse, setReverse] = useState<'normal' | 'reverse'>('normal');
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Utility: get focusable elements inside dialog
  const getFocusable = () => {
    if (!dialogRef.current) {
      return [];
    }
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        el.getAttribute('aria-hidden') !== 'true',
    );
  };

  // open/close state + animation enter/exit timing
  useEffect(() => {
    if (open) {
      setVisible(true);
      setReverse('normal');
      setAnimating(true);
      setOpening(true);
    } else {
      setReverse('reverse');
      setAnimating(false);
      setOpening(false);
      const id = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [open, duration]);

  // trigger exit animation when reverse flips
  useEffect(() => {
    if (reverse === 'reverse') {
      setAnimating(true);
    }
  }, [reverse]);

  // trigger enter animation
  useEffect(() => {
    if (opening === true) {
      setBackdropVisible(true);
    } else if (opening === false) {
      setBackdropVisible(false);
    }
  }, [opening]);

  useEscapeHandler(!disableEscapeKey && visible, () => onClose?.());

  // click outside the dialog to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (disableBackdropClose) {
      return;
    }
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // lock page scroll while dialog is visible
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [visible]);

  // focus trap + autofocus + restoring original focus after closing
  useEffect(() => {
    if (!visible || !modal) {
      return;
    }

    const focusables = getFocusable();
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const target: HTMLElement | null =
      focusables.length > 0 ? focusables[0] : dialogRef.current;

    if (target) {
      target.focus();
    }

    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }

      // eslint-disable-next-line prefer-destructuring
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onTrap);

    return () => {
      document.removeEventListener('keydown', onTrap);
      previouslyFocused.current?.focus();
    };
  }, [modal, visible]);

  // hide portal if not visible
  if (!visible || !portalTarget) {
    return null;
  }

  const shapeClass = getShapeClass(shape);
  const borderClass = getBorderClass(border);
  const borderColorClass = getBorderColorClass(getBorderColor(borderColor));
  const elevationClass = getElevationClass(elevation);
  const { bgColor, textOnColor } = getSurfaceColorClasses(color);

  const resolved = resolveAnimation(animation, type);

  const animationClass = resolved === 'none' ? '' : motionClassMap[resolved];
  const motionStyleClass =
    motionStyle === 'expressive' ? 'uui-motion-expressive' : '';

  const wrapperStyle = {
    '--uui-duration': String(duration * 0.65) + 'ms',
  } as React.CSSProperties;

  const controlStyle = {
    '--uui-reverse': reverse,
    '--uui-duration':
      reverse === 'reverse'
        ? String(duration * 0.67) + 'ms'
        : String(duration) + 'ms',
  } as React.CSSProperties;

  const wrapperClasses = ['uui-dialog-backdrop', backdropVisible && 'uui-open']
    .filter(Boolean)
    .join(' ');
  const dialogClasses = [
    'uui-db',
    `uui-dialog-${type}`,
    shapeClass,
    borderClass,
    getSizeClass(size),
    borderColorClass,
    elevationClass,
    bgColor,
    textOnColor,
    animating && animationClass,
    motionStyleClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={wrapperClasses}
      onClick={handleBackdropClick}
      style={wrapperStyle}
    >
      <div className={dialogClasses} ref={dialogRef} style={controlStyle}>
        {children}
      </div>
    </div>,
    portalTarget,
  );
};

Dialog.displayName = 'Dialog';
