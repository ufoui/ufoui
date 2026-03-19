import React, { ElementType, forwardRef, Fragment, ReactNode, useMemo, useState } from 'react';

import { BoxBase, BoxBaseProps } from '../base';
import { ElementDensity, ElementFont, SurfaceColor } from '../../utils';
import { MotionAnimation, MotionStyle } from '../../types';
import { Collapse } from '../collapse/collapse';
import { Button } from '../button/button';

/**
 * Breadcrumb item.
 *
 * @function
 * @param props - Item props.
 */
export interface BreadcrumbItem {
    label: ReactNode;
    href?: string;
    icon?: ReactNode;
    current?: boolean;
    disabled?: boolean;
}

/**
 * Props for Breadcrumbs component.
 *
 * @category Navigation
 */
export interface BreadcrumbsProps extends BoxBaseProps {
    items?: BreadcrumbItem[];
    children?: ReactNode;

    separator?: ReactNode;

    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;

    renderItem?: (item: BreadcrumbItem, index: number) => ReactNode;
    renderSeparator?: (index: number) => ReactNode;
    renderCollapse?: (items: BreadcrumbItem[]) => ReactNode;

    component?: ElementType;
    itemComponent?: ElementType;

    density?: ElementDensity;
    font?: ElementFont;
    color?: SurfaceColor;

    animation?: MotionAnimation;
    motionStyle?: MotionStyle;
    duration?: number;
}

/**
 * Breadcrumbs navigation component.
 *
 * @function
 * @param props - Component props.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
    (
        {
            items,
            children,
            separator = '/',
            maxItems,
            itemsBeforeCollapse = 1,
            itemsAfterCollapse = 1,
            renderItem,
            renderSeparator,
            renderCollapse,
            component = 'nav',
            itemComponent = 'a',
            animation = 'fade',
            motionStyle = 'regular',
            duration = 200,
            ...rest
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);

        const { visible, hidden } = useMemo(() => {
            if (!items || !maxItems || items.length <= maxItems) {
                return { visible: items ?? [], hidden: [] };
            }

            const start = items.slice(0, itemsBeforeCollapse);
            const end = items.slice(items.length - itemsAfterCollapse);
            const hiddenItems = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse);

            return {
                visible: [...start, { label: '__collapse__' } as BreadcrumbItem, ...end],
                hidden: hiddenItems,
            };
        }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

        const renderDefaultItem = (item: BreadcrumbItem, index: number) => {
            const isCurrent = item.current || index === visible.length - 1;

            return (
                <BoxBase
                    aria-current={isCurrent ? 'page' : undefined}
                    component={itemComponent}
                    disabled={item.disabled}
                    // href={item.href}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        opacity: item.disabled ? 0.5 : undefined,
                        pointerEvents: item.disabled ? 'none' : undefined,
                    }}>
                    {item.icon}
                    {item.label}
                </BoxBase>
            );
        };

        const renderDefaultCollapse = () => (
            <Button
                onClick={() => {
                    setOpen(v => !v);
                }}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    paddingInline: 4,
                    opacity: 0.7,
                    cursor: 'pointer',
                }}
                type="button">
                …
            </Button>
        );

        return (
            <BoxBase
                aria-label="breadcrumb"
                component={component}
                ref={ref}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 4,
                }}
                {...rest}>
                {children
                    ? children
                    : visible.map((item, index) => {
                          const isCollapse = item.label === '__collapse__';

                          return (
                              <Fragment key={index}>
                                  {isCollapse
                                      ? renderCollapse
                                          ? renderCollapse(hidden)
                                          : renderDefaultCollapse()
                                      : renderItem
                                        ? renderItem(item, index)
                                        : renderDefaultItem(item, index)}

                                  {index < visible.length - 1 &&
                                      (renderSeparator ? (
                                          renderSeparator(index)
                                      ) : (
                                          <span
                                              style={{
                                                  opacity: 0.5,
                                                  paddingInline: 4,
                                              }}>
                                              {separator}
                                          </span>
                                      ))}
                              </Fragment>
                          );
                      })}

                <Collapse animation={animation} duration={duration} motionStyle={motionStyle} open={open}>
                    <BoxBase
                        style={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid',
                            padding: 4,
                        }}>
                        {hidden.map((item, i) => (
                            <div></div>
                            // <BoxBase
                            //     component={itemComponent}
                            //     href={item.href}
                            //     key={i}
                            //     style={{
                            //         padding: '4px 8px',
                            //         cursor: 'pointer',
                            //     }}>
                            //     {item.label}
                            // </BoxBase>
                        ))}
                    </BoxBase>
                </Collapse>
            </BoxBase>
        );
    }
);

Breadcrumbs.displayName = 'Breadcrumbs';
