import { cn, ElementFont, getFontClass } from '../../utils';

export interface CardTitleProps {
    label?: string;
    className?: string;
    font?: ElementFont;
    align?: 'start' | 'center' | 'end';
}

export const CardTitle = ({
    label,

    className,

    align = 'start',
    font = 'titleMedium',
}: CardTitleProps) => {
    return label ? (
        <div className={cn('uui-card-title', className, getFontClass(font))}>
            {label && <div className={`uui-title uui-title-${align}`}>{label}</div>}
        </div>
    ) : null;
};

CardTitle.displayName = 'CardTitle';
