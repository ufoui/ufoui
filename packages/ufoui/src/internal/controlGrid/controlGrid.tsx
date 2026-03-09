import { forwardRef, ReactNode } from 'react';

import { cn, ElementTextPlacement } from '../../utils';
/**
 * Props for the ControlGrid component.
 *
 * Layout container for form control, label and description.
 *
 * @category Slot
 */
export interface ControlGridProps {
    /** Main control element such as checkbox, switch or slider. */
    control?: ReactNode;

    /** Label displayed next to the control. */
    label?: ReactNode;

    /** Supporting text such as description or error message. */
    description?: ReactNode;

    /** Placement of label relative to the control. */
    textPlacement: ElementTextPlacement;

    /** Additional root class name. */
    className?: string;

    /** Spans description across all grid columns. */
    spanDesc?: boolean;
}

/**
 * Layout helper that arranges control, label and description.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const ControlGrid = forwardRef<HTMLDivElement, ControlGridProps>(
    ({ control, label, description, className, textPlacement, spanDesc }, ref) => {
        const columns = label && (textPlacement === 'start' || textPlacement === 'end') ? textPlacement : 'col';

        return (
            <div
                className={cn(className, `uui-control-grid uui-control-grid-${columns}`, spanDesc && 'uui-spanned')}
                ref={ref}>
                {(textPlacement === 'start' || textPlacement === 'top') && label}
                {control}
                {(textPlacement === 'end' || textPlacement === 'bottom') && label}
                {description}
            </div>
        );
    }
);

ControlGrid.displayName = 'ControlGrid';
