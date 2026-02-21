import React, { forwardRef, ReactNode } from 'react';

import {
  ControlStyle,
  ElementElevation,
  ElementShape,
  SurfaceColor,
} from '../../utils';
import { BoxBase, BoxBaseProps } from '../base';
import { ToastStatus } from '../../utils/toasts/toast';

/**
 * Props for Toast component.
 *
 * @category Toast
 */
export interface ToastProps extends Omit<BoxBaseProps, 'children'> {
  /** Primary heading text. */
  title?: string;

  /** Secondary supporting text. */
  description?: string;

  /** Surface color token overriding default background and text. */
  color?: SurfaceColor;

  /** Leading visual element. */
  icon?: ReactNode;

  /** Action element rendered below content. */
  action?: ReactNode;

  /** Full content override replacing internal layout. */
  content?: ReactNode;

  /** Elevation token. Default: 3 */
  elevation?: ElementElevation;

  /** Status variant applied as CSS modifier class. */
  status?: ToastStatus;

  /** Shape token. Default: smooth */
  shape?: ElementShape;
}

/**
 * Toast overlay container.
 *
 * @function
 * @param props Component props.
 *
 * @category Toast
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      color,
      icon,
      action,
      content,
      elevation = 3,
      shape = 'smooth',
      status,
      className,
      ...rest
    },
    ref,
  ) => {
    const style = ControlStyle();
    style.bg(color);
    style.text.on(color);
    const statusClass = status !== undefined ? `uui-toast-${status}` : '';
    return (
      <BoxBase
        className={['uui-toast', className, statusClass]
          .filter(Boolean)
          .join(' ')}
        elevation={elevation}
        font="bodyMedium"
        ref={ref}
        shape={shape}
        style={style.get()}
        {...rest}
      >
        {content ?? (
          <>
            {icon && <div className="uui-icon">{icon}</div>}
            <div className="uui-toast-content">
              {title && <div className="uui-toast-title">{title}</div>}
              {description && (
                <div className="uui-toast-description">{description}</div>
              )}
              {action}
            </div>
          </>
        )}
      </BoxBase>
    );
  },
);

Toast.displayName = 'Toast';
