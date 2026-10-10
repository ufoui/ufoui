import React from 'react';

import { cn } from '../../utils';
import { getMonthDays, getWeekDaysShort } from './calendarUtils';
import { IconButton } from '../iconButton/iconButton';

/**
 * Props for {@link CalendarDays}.
 *
 * @category Calendar
 * @internal
 */
export interface CalendarDaysProps {
    /** Date of the visible month. */
    viewDate: Date;

    /** The currently selected date. */
    value?: Date;

    /** Callback fired when a date is selected. */
    onChange?: (date: Date) => void;
}

/**
 * Calendar day grid: weekday names and the days of the visible month.
 *
 * @function
 * @param props Component properties.
 *
 * @category Calendar
 * @internal
 */
export const CalendarDays = ({ viewDate, value, onChange }: CalendarDaysProps) => (
    <div className="uui-calendar-grid">
        {getWeekDaysShort().map(day => (
            <div className="uui-calendar-weekday" key={day}>
                {day}
            </div>
        ))}

        {getMonthDays(viewDate, value).map(({ date, isCurrentMonth, isSelected, isToday }) => (
            <IconButton
                border={isToday ? 1 : undefined}
                borderColor={isToday ? 'primary' : undefined}
                className={cn(
                    'uui-calendar-day',
                    isSelected && 'uui-calendar-active-day',
                    isToday && 'uui-calendar-today'
                )}
                content={date.getDate()}
                disabled={!isCurrentMonth}
                filled={isSelected}
                key={date.getTime()}
                onClick={() => {
                    onChange?.(date);
                }}
            />
        ))}
    </div>
);

CalendarDays.displayName = 'CalendarDays';
