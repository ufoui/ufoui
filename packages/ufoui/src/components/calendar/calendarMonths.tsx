import React from 'react';

import { List } from '../list/list';
import { ListItem } from '../item/listItem';

/**
 * Props for {@link CalendarMonths}.
 *
 * @category Calendar
 * @internal
 */
export interface CalendarMonthsProps {
    /** Date of the visible month. */
    viewDate: Date;

    /** Locale used to format month names. */
    locale?: string;

    /** Callback fired with the first day of the selected month. */
    onViewDateChange: (date: Date) => void;
}

/**
 * Calendar month list: the months of the visible year, the current one marked with a check.
 *
 * @function
 * @param props Component properties.
 *
 * @category Calendar
 * @internal
 */
export const CalendarMonths = ({ viewDate, locale, onViewDateChange }: CalendarMonthsProps) => (
    <List
        className="uui-calendar-months"
        height="100%"
        onChange={([month]) => {
            if (month) {
                onViewDateChange(new Date(viewDate.getFullYear(), +month, 1));
            }
        }}
        selection="single"
        selectionMarker="icon"
        selectionScroll="center"
        type="listbox"
        value={String(viewDate.getMonth())}>
        {Array.from({ length: 12 }, (_, month) => (
            <ListItem
                key={month}
                label={new Date(2000, month, 1).toLocaleDateString(locale, { month: 'long' })}
                value={String(month)}
            />
        ))}
    </List>
);

CalendarMonths.displayName = 'CalendarMonths';
