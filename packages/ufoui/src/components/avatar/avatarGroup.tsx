import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';

import { Avatar, AvatarProps } from './avatar';
import { isAvatar } from './avatar.guards';
import { BoxBaseProps } from '../base';
import {
  BorderColor,
  ElementBorder,
  ElementShape,
  ElementSize,
} from '../../utils';
import { Flex } from '../layout';

/**
 * Props for AvatarGroup component.
 *
 * @category Avatar
 */
export interface AvatarGroupProps extends Omit<BoxBaseProps, 'type'> {
  max?: number;
  overlap?: number;

  size?: ElementSize;
  shape?: ElementShape;

  border?: ElementBorder;
  borderColor?: BorderColor;

  overflow?: (count: number) => ReactNode;

  children: ReactNode;
  className?: string;
}

/**
 * Groups multiple Avatar components with optional overlap,
 * size/shape override and overflow handling.
 *
 * @function
 * @param props Component properties.
 *
 * @category Avatar
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      overlap = 8,
      size,
      shape,
      border,
      borderColor,
      overflow,
      className,
      ...rest
    },
    ref,
  ) => {
    const avatars: ReactElement<AvatarProps>[] =
      Children.toArray(children).filter(isAvatar);
    const total = avatars.length;
    let visible = avatars;
    let hiddenCount = 0;

    if (max !== undefined && total > max) {
      const visibleCount = Math.max(max - 1, 0);
      visible = avatars.slice(0, visibleCount);
      hiddenCount = total - visibleCount;
    }

    const items: ReactNode[] = visible.map((avatar, index) =>
      cloneElement(avatar, {
        key: avatar.key ?? index,
        size: size ?? avatar.props.size,
        shape: shape ?? avatar.props.shape,
        border: border ?? avatar.props.border,
        borderColor: borderColor ?? avatar.props.borderColor,
        style: {
          ...(avatar.props.style ?? {}),
          marginInlineStart: index === 0 ? 0 : -overlap,
          zIndex: index,
          position: 'relative',
        },
      }),
    );

    // 3️⃣ overflow
    if (hiddenCount > 0) {
      const overflowNode = overflow?.(hiddenCount) ?? (
        <Avatar shape={shape} size={size}>
          +{hiddenCount}
        </Avatar>
      );

      items.push(
        cloneElement(overflowNode as ReactElement, {
          key: 'overflow',
          style: {
            marginInlineStart: items.length === 0 ? 0 : -overlap,
            zIndex: items.length,
            position: 'relative',
          },
        }),
      );
    }

    const classes = ['uui-avatar-group', className].filter(Boolean).join(' ');
    return (
      <Flex alignItems="center" ref={ref} {...rest} className={classes}>
        {items}
      </Flex>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
