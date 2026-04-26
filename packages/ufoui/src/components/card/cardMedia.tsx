import { ReactNode } from 'react';

import { cn } from '../../utils';

export interface CardMediaProps {
    children?: ReactNode;
    className?: string;
}

export const CardMedia = ({ children, className }: CardMediaProps) => {
    return <div className={cn('uui-card-media', className)}>{children}</div>;
};

CardMedia.displayName = 'CardMedia';
