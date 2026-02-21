import { ReactNode } from 'react';

export interface DialogContentProps {
  children?: ReactNode;
  className?: string;
}

export const DialogContent = ({ children, className }: DialogContentProps) => {
  const wrapperClasses = ['uui-dialog-content', className]
    .filter(Boolean)
    .join(' ');
  return children ? (
    <div className={wrapperClasses}>
      <div className="uui-content">{children}</div>
    </div>
  ) : null;
};

DialogContent.displayName = 'DialogContent';
