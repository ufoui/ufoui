import React, { forwardRef, useState } from 'react';

import { BoxBase, BoxBaseProps } from '../base';
import { cn, ControlStyle } from '../../utils';
import { addMonths, formatMonthYear, getMonthDays, getWeekDaysShort, isSameDay } from './calendarUtils';
import { IconButton } from '../iconButton/iconButton';

/**
 * Props for Calendar component.
 *
 * @category Calendar
 */
export interface CalendarProps extends Omit<BoxBaseProps, 'onChange'> {
    /** The currently selected date. */
    value?: Date;
    /** Callback fired when a date is selected. */
    onChange?: (date: Date) => void;
    /** The date that is currently visible in the calendar. */
    viewDate?: Date;
}

/**
 * Calendar component following MD3 guidelines.
 *
 * @function
 * @param props Component properties.
 * @category Calendar
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    ({ value, onChange, viewDate: initialViewDate, className, ...rest }, ref) => {
        const [viewDate, setViewDate] = useState(initialViewDate || value || new Date());

        const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, -1));
        };

        const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, 1));
        };

        const handleDateClick = (date: Date) => {
            onChange?.(date);
        };

        const days = getMonthDays(viewDate, value);
        const weekDays = getWeekDaysShort();

        const style = ControlStyle();
        style.bg('surfaceContainerHigh');
        style.text.on('surface');

        return (
            <BoxBase className={cn('uui-calendar', className)} {...rest} style={style.get()}>
                <div className="uui-calendar-header">
                    <div className="uui-calendar-title">{formatMonthYear(viewDate)}</div>

                    <div className="uui-calendar-nav">
                        <button
                            aria-label="Previous month"
                            className="uui-calendar-nav-btn"
                            onClick={handlePrevMonth}
                            type="button">
                            &lt;
                        </button>

                        <button
                            aria-label="Next month"
                            className="uui-calendar-nav-btn"
                            onClick={handleNextMonth}
                            type="button">
                            &gt;
                        </button>
                    </div>
                </div>

                <div className="uui-calendar-grid">
                    {weekDays.map(day => (
                        <div className="uui-calendar-weekday" key={day}>
                            {day}
                        </div>
                    ))}

                    {days.map((day, index) => {
                        const isSelected = !!value && isSameDay(day.date, value);

                        return (
                            <IconButton
                                className={cn('uui-calendar-day')}
                                disabled={!day.isCurrentMonth}
                                filled={isSelected}
                                key={index}
                                onClick={() => {
                                    handleDateClick(day.date);
                                }}
                                outlined={day.isToday}>
                                <span>{day.date.getDate()}</span>
                            </IconButton>
                        );
                    })}
                </div>
            </BoxBase>
        );
    }
);

Calendar.displayName = 'Calendar';
