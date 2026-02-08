import { forwardRef, HTMLProps } from 'react';

import {
    ElementAlign,
    ElementShape,
    ElementSize,
    getAlignClass,
    getBorderClass,
    getElevationClass,
    getShapeClass,
} from '../../utils/utils';
import { getBorderColorClass, getSemanticColorClasses, SemanticColor } from '../../utils/color';

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
            outlined,
            raised,
            filled = true,
            value,
            ...props
        }: CardProps,
        ref
    ) => {
        const { bgColor, textOnColor, textColor } = getSemanticColorClasses(color);
        // const borderClasses = getOutlineClasses(border);
        const borderOutline = getBorderColorClass(color);
        const positionClasses = getAlignClass(position);
        const shapeClasses = getShapeClass(shape);
        const wrapperClasses: string[] = ['uui-card-wrapper'];
        // const containerClasses: string[] = ['uui-badge-container', positionClasses];
        const badgeClasses: string[] = ['uui-badge', positionClasses, className, shapeClasses];

        switch (size) {
            case 'small':
                badgeClasses.push('uui-small', 'uui-font-label-small');
                break;
            case 'large':
                badgeClasses.push('uui-medium', 'uui-font-label-medium');
                break;
            default:
                badgeClasses.push('uui-large', 'uui-font-label-small');
        }

        if (filled) {
            badgeClasses.push(bgColor, textOnColor);
        } else {
            badgeClasses.push(textColor);
        }

        if (raised) {
            badgeClasses.push(getElevationClass(1));
        }

        if (outlined) {
            badgeClasses.push(borderOutline, getBorderClass(1));
        }

        return (
            <span className={wrapperClasses.join(' ')} ref={ref} {...props}>
                {children}
            </span>
        );
    }
);

Card.displayName = 'Card';
