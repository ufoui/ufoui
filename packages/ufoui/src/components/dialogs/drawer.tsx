import { forwardRef } from 'react';

import { DialogBase, DialogBaseProps } from '../base/dialogBase';

/**
 * Props for {@link Drawer}.
 * Extends {@link DialogBaseProps}.
 *
 * @category Drawer
 */
export type DrawerProps = Omit<DialogBaseProps, 'elementClass' | 'type'>;

/**
 * Drawer component used to display side content that slides in from the edge of the screen.
 *
 * Use for navigation panels, filters, or contextual content.
 *
 * @category Drawer
 * @function
 * @param props - All drawer props inherited from {@link DialogBase}.
 *
 * @example
 * <Drawer open onClose={() => setOpen(false)}>
 *   Content
 * </Drawer>
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (props: DrawerProps, ref) => {
    return (
      <DialogBase
        ref={ref}
        {...props}
        elementClass="uui-drawer"
        type="dockRight"
      />
    );
  },
);

Drawer.displayName = 'Drawer';
