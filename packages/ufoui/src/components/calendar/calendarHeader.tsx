import React, { ReactNode } from 'react';

import { ArrowDropDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../../assets';
import { Button } from '../button/button';
import { IconButton } from '../iconButton/iconButton';

export type CalendarView = 'day' | 'month' | 'year';

/**
 * Props for {@link CalendarHeader}.
 *
 * @category Calendar
 * @internal
 */
export interface CalendarHeaderProps {
    /** Separate month and year selectors (`docked`) or a single month-year selector (`modal`). */
    type?: 'docked' | 'modal';

    /** Date of the visible month. */
    viewDate: Date;

    /** Currently open view. */
    view?: CalendarView;

    /** Locale used to format month and year. */
    locale?: string;

    /** Callback fired with the first day of the newly visible month. */
    onViewDateChange: (date: Date) => void;

    /** Callback fired when a selector opens or closes the month or year view. */
    onViewChange?: (view: CalendarView) => void;

    /** Accessible labels of the navigation buttons. */
    prevMonthLabel?: string;
    nextMonthLabel?: string;
    prevYearLabel?: string;
    nextYearLabel?: string;
}

/**
 * Calendar navigation row: month and year selectors with previous/next buttons.
 *
 * @function
 * @param props Component properties.
 *
 * @category Calendar
 * @internal
 */
export const CalendarHeader = ({
    type = 'docked',
    viewDate,
    view = 'day',
    locale,
    onViewDateChange,
    onViewChange,
    prevMonthLabel,
    nextMonthLabel,
    prevYearLabel,
    nextYearLabel,
}: CalendarHeaderProps) => {
    const nav = (months: number, prevLabel?: string, nextLabel?: string, selector?: ReactNode) => (
        <div className="uui-calendar-nav">
            <IconButton
                icon={ChevronLeftIcon}
                label={prevLabel}
                onClick={() => {
                    onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - months, 1));
                }}
            />
            {selector}
            <IconButton
                icon={ChevronRightIcon}
                label={nextLabel}
                onClick={() => {
                    onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + months, 1));
                }}
            />
        </div>
    );

    const selector = (target: CalendarView, options: Intl.DateTimeFormatOptions) => (
        <Button
            aria-expanded={view === target}
            endIcon={ArrowDropDownIcon}
            label={viewDate.toLocaleDateString(locale, options)}
            onClick={() => {
                onViewChange?.(view === target ? 'day' : target);
            }}
            spread="narrow"
        />
    );

    return (
        <div className="uui-calendar-header">
            {type === 'modal' ? (
                <>
                    {selector('year', { month: 'long', year: 'numeric' })}
                    {nav(1, prevMonthLabel, nextMonthLabel)}
                </>
            ) : (
                <>
                    {nav(1, prevMonthLabel, nextMonthLabel, selector('month', { month: 'short' }))}
                    {nav(12, prevYearLabel, nextYearLabel, selector('year', { year: 'numeric' }))}
                </>
            )}
        </div>
    );
};

CalendarHeader.displayName = 'CalendarHeader';
