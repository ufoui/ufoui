import React, { forwardRef, useState } from 'react';

import { BoxBase, BoxBaseProps } from '../base';
import { cn, ControlStyle } from '../../utils';
import { addMonths, formatMonthYear, getMonthDays, getWeekDaysShort, isSameDay } from './calendarUtils';

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

        const handlePrevMonth = (e: React.MouseEvent) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, -1));
        };

        const handleNextMonth = (e: React.MouseEvent) => {
            e.preventDefault();
            setViewDate(addMonths(viewDate, 1));
        };

        const handleDateClick = (date: Date) => {
            onChange?.(date);
        };

        const days = getMonthDays(viewDate, value);
        const weekDays = getWeekDaysShort();

        const style = ControlStyle();
        style.bg('surface');
        style.text.on('surface');

        return (
            <BoxBase
                className={cn('uui-calendar', className)}
                elevation={1}
                padding={4}
                ref={ref}
                style={style.get()}
                width={320}
                {...rest}>
                {/* Header */}
                <BoxBase alignItems="center" col={false} direction="row" gap={2} justifyContent="space-between" mb={2}>
                    <BoxBase font="titleSmall" px={2}>
                        {formatMonthYear(viewDate)}
                    </BoxBase>
                    <BoxBase col={false} direction="row">
                        <button className="uui-calendar-nav-btn" onClick={handlePrevMonth} type="button">
                            &lt;
                        </button>
                        <button className="uui-calendar-nav-btn" onClick={handleNextMonth} type="button">
                            &gt;
                        </button>
                    </BoxBase>
                </BoxBase>

                {/* Grid */}
                <div className="uui-calendar-grid">
                    {/* Weekdays */}
                    {weekDays.map(day => (
                        <div className="uui-calendar-weekday" key={day}>
                            {day}
                        </div>
                    ))}
                    {/* Days */}
                    {days.map((day, index) => {
                        const isSelected = value && isSameDay(day.date, value);
                        return (
                            <button
                                className={cn('uui-calendar-day', {
                                    'uui-calendar-day-outside': !day.isCurrentMonth,
                                    'uui-calendar-day-today': day.isToday,
                                    'uui-calendar-day-selected': isSelected,
                                })}
                                key={index}
                                onClick={() => {
                                    handleDateClick(day.date);
                                }}
                                type="button">
                                <span>{day.date.getDate()}</span>
                            </button>
                        );
                    })}
                </div>
            </BoxBase>
        );
    }
);

Calendar.displayName = 'Calendar';
