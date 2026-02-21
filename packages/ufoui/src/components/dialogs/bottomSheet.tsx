import { forwardRef } from 'react';

import { DialogBase, DialogBaseProps } from '../base/dialogBase';

/**
 * Props for {@link BottomSheet}.
 * Extends {@link DialogBaseProps}.
 *
 * @category BottomSheet
 */
export type BottomSheetProps = Omit<DialogBaseProps, 'elementClass' | 'type'>;

/**
 * Bottom sheet component used to display supplementary content anchored to the bottom of the screen.
 *
 * Use for actions, filters, or contextual mobile interactions.
 *
 * @category BottomSheet
 * @function
 * @param props - All bottom sheet props inherited from {@link DialogBase}.
 *
 * @example
 * <BottomSheet open onClose={() => setOpen(false)}>
 *   Content
 * </BottomSheet>
 */
export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (props: BottomSheetProps, ref) => {
    return (
      <DialogBase
        ref={ref}
        {...props}
        elementClass="uui-bottom-sheet"
        type="dockBottom"
      />
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
