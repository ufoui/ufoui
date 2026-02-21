import { forwardRef } from 'react';

import { DialogBase, DialogBaseProps } from '../base/dialogBase';

/**
 * Props for {@link Dialog}.
 * Extends {@link DialogBaseProps}.
 *
 * @category Dialog
 */
export type DialogProps = Omit<DialogBaseProps, 'elementClass'>;

/**
 * Dialog component used to display modal or non-modal content above the app layer.
 *
 * @category Dialog
 * @function
 * @param props - All dialog props inherited from {@link DialogBase}.
 *
 * @example
 * <Dialog open onClose={() => setOpen(false)}>
 *   Content
 * </Dialog>
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (props: DialogProps, ref) => {
    return <DialogBase ref={ref} {...props} elementClass="uui-dialog" />;
  },
);

Dialog.displayName = 'Dialog';
