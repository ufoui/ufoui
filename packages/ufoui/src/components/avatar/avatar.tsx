import { forwardRef, ReactNode, useMemo, useState } from 'react';

import { BoxBaseProps } from '../base';
import { cn, ElementSize, getColorNames, getSizeClass } from '../../utils';
import { Grid } from '../layout';
import { IS_AVATAR } from './avatar.guards';

/**
 * Properties for Avatar component.
 *
 * @category Avatar
 */
export interface AvatarProps extends Omit<BoxBaseProps, 'as' | 'elementClass'> {
    /** Size token controlling width and height. */
    size?: ElementSize;

    /** Image source URL. */
    src?: string;

    /** Alternative text for image element. */
    alt?: string;

    /** Full name used for initials and auto color derivation. */
    name?: string;

    /** Custom fallback content rendered when no image and no name are provided. */
    children?: ReactNode;
}

function stringHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function getInitials(name?: string): string {
    const parts = name?.trim().split(/\s+/).filter(Boolean);
    if (!parts?.length) {
        return '';
    }
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
}

/**
 * Avatar identity component displaying image, initials, or custom content.
 *
 * Automatically derives a fallback background color from name when no image
 * and no explicit color are provided, using semantic and extended color pools.
 *
 * @function
 * @param props Component properties.
 *
 * @category Avatar
 */

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ children, className, shape = 'round', size = 'medium', src, alt, name, color, ...rest }, ref) => {
        const [imgError, setImgError] = useState(false);
        const classes = cn('uui-avatar', getSizeClass(size), className);

        const showImage = Boolean(src && !imgError);
        const initials = getInitials(name);

        const derivedColor = useMemo(() => {
            const avatarColors = [...getColorNames('semantic'), ...getColorNames('extended')];
            if (!name || showImage || color) {
                return undefined;
            }
            const index = stringHash(name) % avatarColors.length;
            return avatarColors[index];
        }, [name, showImage, color]);

        let content: ReactNode;

        if (showImage) {
            content = (
                <img
                    alt={alt ?? name ?? ''}
                    draggable={false}
                    onError={() => {
                        setImgError(true);
                    }}
                    src={src}
                />
            );
        } else if (name) {
            content = <span aria-hidden>{initials}</span>;
        } else {
            content = children;
        }

        return (
            <Grid
                aria-label={!showImage ? name : undefined}
                className={classes}
                color={color ?? derivedColor}
                font="labelLarge"
                ref={ref}
                shape={shape}
                {...rest}>
                {content}
            </Grid>
        );
    }
);

/**
 * Marks this component as an Avatar for runtime type guards.
 *
 * Used internally to identify Avatar elements via a shared Symbol.
 * Not part of the public API.
 *
 * @internal
 */
(Avatar as unknown as Record<symbol, true>)[IS_AVATAR] = true;
Avatar.displayName = 'Avatar';
