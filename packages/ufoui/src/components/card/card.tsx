import { forwardRef, HTMLProps } from 'react';

import { ElementAlign, ElementShape, ElementSize } from '../../utils/utils';
import { SemanticColor } from '../../utils/color';

export interface CardProps extends Omit<HTMLProps<HTMLSpanElement>, 'ref' | 'size'> {
    value: string | number;
    color?: SemanticColor;
    position?: ElementAlign;
    size?: ElementSize;
    shape?: ElementShape;
    raised?: boolean;
    elevated?: boolean;
    outlined?: boolean;
    filled?: boolean;
}

export const Card = forwardRef<HTMLSpanElement, CardProps>(
    (
        {
            children,
            className = '',
            color = 'error',
            position = 'topRight',
            shape = 'round',
            size = 'medium',
            value,
            ...props
        }: CardProps,
        ref
    ) => {
        const wrapperClasses: string[] = ['uui-card-wrapper'];
        // const containerClasses: string[] = ['uui-badge-container', positionClasses];

        return (
            <span className={wrapperClasses.join(' ')} ref={ref} {...props}>
                {children}
            </span>
        );
    }
);

Card.displayName = 'Card';
