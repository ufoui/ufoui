import { ReactNode } from 'react';

import { cn, ElementTextPlacement } from '../../utils';

/**
 * Props for the ControlGrid component.
 *
 * Provides slots for control layout elements.
 *
 * @category Slot
 */
export interface ControlGridProps {
    /** Main control element such as checkbox, switch or slider. */
    control?: ReactNode;

    /** Label displayed next to the control. */
    label?: ReactNode;

    /** Supporting text such as description or error message displayed under the label. */
    description?: ReactNode;

    /** Placement of label relative to the control. */
    textPlacement: ElementTextPlacement;

    className?: string;
}

/**
 * Layout helper that arranges control, label and description.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const ControlGrid = ({ control, label, description, className, textPlacement }: ControlGridProps) => {
    const columns = label && (textPlacement === 'start' || textPlacement === 'end') ? textPlacement : 'col';
    return (
        <div className={cn(className, `uui-control-grid uui-control-grid-${columns}`)}>
            {(textPlacement === 'start' || textPlacement === 'top') && label}
            {control}
            {(textPlacement === 'end' || textPlacement === 'bottom') && label}
            {description}
        </div>
    );
};
