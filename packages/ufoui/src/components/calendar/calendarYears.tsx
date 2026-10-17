import React from 'react';

import { List } from '../list/list';
import { ListItem } from '../item/listItem';
import { Button } from '../button/button';

/**
 * Props for {@link CalendarYears}.
 *
 * @category Calendar
 * @internal
 */
export interface CalendarYearsProps {
    /** Year list (`docked`) or year grid (`modal`). */
    type?: 'docked' | 'modal';

    /** Date of the visible month. */
    viewDate: Date;

    /** Callback fired with the first day of the visible month in the selected year. */
    onViewDateChange: (date: Date) => void;
}

/**
 * Calendar year view: the years from 1900 to 2100, the visible one marked.
 *
 * @function
 * @param props Component properties.
 *
 * @category Calendar
 * @internal
 */
export const CalendarYears = ({ type = 'docked', viewDate, onViewDateChange }: CalendarYearsProps) => {
    const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
    const select = (year: number) => {
        onViewDateChange(new Date(year, viewDate.getMonth(), 1));
    };

    return type === 'modal' ? (
        <div className="uui-calendar-years">
            {years.map(year => (
                <Button
                    border={year === new Date().getFullYear() ? 1 : undefined}
                    filled={year === viewDate.getFullYear()}
                    key={year}
                    label={String(year)}
                    onClick={() => {
                        select(year);
                    }}
                />
            ))}
        </div>
    ) : (
        <List
            className="uui-calendar-years"
            height="100%"
            onChange={([year]) => {
                if (year) {
                    select(+year);
                }
            }}
            selection="single"
            selectionMarker="icon"
            selectionScroll="center"
            type="listbox"
            value={String(viewDate.getFullYear())}>
            {years.map(year => (
                <ListItem key={year} label={String(year)} value={String(year)} />
            ))}
        </List>
    );
};

CalendarYears.displayName = 'CalendarYears';
