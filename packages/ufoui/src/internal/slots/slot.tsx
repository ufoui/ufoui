import { ReactNode } from 'react';

/**
 * Props for the Slot component.
 *
 * @category Slot
 */
interface SlotProps {
    /** Element rendered before the content. */
    start?: ReactNode;

    /** Element rendered after the content. */
    end?: ReactNode;

    /** Main slot content. */
    content: ReactNode;

    /** Root class name. */
    className?: string;
}

/**
 * Layout helper that renders start, content, and end regions.
 *
 * @remarks
 * Components using this helper must define `--uui-slot-size` in their CSS.
 * `--uui-slot-gap` is optional and falls back to `8px`.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const Slot = ({ start, end, content, className }: SlotProps) => {
    return (start ?? end ?? content) ? (
        <div className={`uui-slot ${className}`}>
            {start}
            {content}
            {end}
        </div>
    ) : null;
};

/**
 * Slot wrapper for leading content.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const Leading = (props: SlotProps) => <Slot {...props} className="uui-leading" />;

/**
 * Slot wrapper for trailing content.
 *
 * @function
 * @param props Component properties.
 *
 * @category Slot
 */
export const Trailing = (props: SlotProps) => <Slot {...props} className="uui-trailing" />;
