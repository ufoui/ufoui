import { ReactNode } from 'react';

import { ElementFont, getFontClass } from '@ufoui/utils';

import { SurfaceColor } from '../../utils/color';

export interface DialogTitleProps {
  icon?: ReactNode;
  label?: string;
  children?: ReactNode;
  className?: string;
  font?: ElementFont;
  color?: SurfaceColor;
  textColor?: SurfaceColor;
}

export const DialogTitle = ({
  icon,
  label,
  children,
  className,
  font = 'headlineSmall',
}: DialogTitleProps) => {
  const content = label ?? children ?? null;
  const wrapperClasses = ['uui-dialog-title', className];
  wrapperClasses.push(getFontClass(font));
  const wrapperClass = wrapperClasses.filter(Boolean).join(' ');

  return content ? (
    <div className={wrapperClass}>
      {icon && <div className="uui-icon">{icon}</div>}
      {content && <div className="uui-content">{content}</div>}
    </div>
  ) : null;
};

DialogTitle.displayName = 'DialogTitle';
