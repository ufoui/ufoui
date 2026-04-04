import { ReactNode } from 'react';

import { cn } from '../../utils';

/**
 * Props for the {@link Icon} wrapper.
 *
 * @category Internal components
 */
export interface IconProps {
    /** Icon graphic or element rendered inside the wrapper. */
    icon: ReactNode;

    /** Additional class names merged with the base `uui-icon` token. */
    className?: string;
}

/**
 * Renders icon content with the shared `uui-icon` layout class.
 *
 *
 * @function
 * @param props Component properties.
 *
 * @category Internal components
 */
export const Icon = ({ icon, className }: IconProps) => {
    return <div className={cn('uui-icon', className)}>{icon}</div>;
};

Icon.displayName = 'Icon';
