import React, { forwardRef, useRef, useState } from 'react';

import { BoxBase, BoxBaseProps } from '../base';
import { useUpdateEffect } from '../../hooks';
import { cn } from '../../utils';
import { addMonths } from './calendarUtils';
import { CalendarDays } from './calendarDays';
import { CalendarHeader, CalendarView } from './calendarHeader';
import { CalendarMonths } from './calendarMonths';
import { CalendarYears } from './calendarYears';

/**
 * Props for Calendar component.
 *
 * @category Calendar
 */
export interface CalendarProps extends Omit<BoxBaseProps, 'type' | 'onChange'> {
    /** The currently selected date. */
    value?: Date;
    /** Callback fired when a date is selected. */
    onChange?: (date: Date) => void;
    /** Calendar type. Default: docked */
    type?: 'docked' | 'modal';
}

/**
 * Calendar component following MD3 guidelines.
 *
 * @function
 * @param props Component properties.
 * @category Calendar
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    ({ value, onChange, type, className, ...rest }, ref) => {
        const [viewDate, setViewDate] = useState(value || new Date());
        const [view, setView] = useState<CalendarView>('day');
        const viewRef = useRef<HTMLDivElement>(null);
        const openerRef = useRef<HTMLElement | null>(null);

        useUpdateEffect(() => {
            if (view === 'day') {
                openerRef.current?.focus();
                return;
            }
            openerRef.current = document.activeElement as HTMLElement | null;
            viewRef.current
                ?.querySelector<HTMLElement>('[aria-selected="true"], [aria-current="true"]')
                ?.focus();
        }, [view]);

        const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, -1));
        };

        const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, 1));
        };

        return (
            <BoxBase className={cn('uui-calendar', className, `uui-${type ?? 'docked'}-calendar`)} {...rest}>
                <CalendarHeader
                    onViewChange={setView}
                    onViewDateChange={setViewDate}
                    type={type}
                    view={view}
                    viewDate={viewDate}
                />
                <div
                    className={cn('uui-calendar-view', view !== 'day' && 'uui-calendar-list-view')}
                    onKeyDown={e => {
                        if (e.key === 'Escape' && view !== 'day') {
                            e.stopPropagation();
                            setView('day');
                        }
                    }}
                    ref={viewRef}>
                    {view === 'month' ? (
                        <CalendarMonths
                            onViewDateChange={date => {
                                setViewDate(date);
                                setView('day');
                            }}
                            viewDate={viewDate}
                        />
                    ) : view === 'year' ? (
                        <CalendarYears
                            onViewDateChange={date => {
                                setViewDate(date);
                                setView('day');
                            }}
                            type={type}
                            viewDate={viewDate}
                        />
                    ) : (
                        <CalendarDays onChange={onChange} value={value} viewDate={viewDate} />
                    )}
                </div>
            </BoxBase>
        );
    }
);

Calendar.displayName = 'Calendar';
