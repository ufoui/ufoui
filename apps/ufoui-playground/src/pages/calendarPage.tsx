import React, { useState } from 'react';

import { BoxBase, Calendar, Typography } from '@ufoui/core';

export const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <BoxBase col gap={6} padding={6}>
            <Typography variant="displaySmall">Calendar</Typography>

            <BoxBase gap={4} row>
                <BoxBase col gap={2}>
                    <Typography variant="titleMedium">Standard Calendar</Typography>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </BoxBase>

                <BoxBase col gap={2}>
                    <Typography variant="titleMedium">Selected Info</Typography>
                    <BoxBase elevation={1} padding={4} shape="medium" style={{ minWidth: 200 }}>
                        <Typography variant="bodyLarge">Selected: {selectedDate.toLocaleDateString()}</Typography>
                    </BoxBase>
                </BoxBase>
            </BoxBase>

            <BoxBase col gap={2}>
                <Typography variant="titleMedium">Variants</Typography>
                <BoxBase gap={4} row>
                    <Calendar border={1} borderColor="outlineVariant" elevation={0} />

                    <Calendar color="secondaryContainer" elevation={3} />
                </BoxBase>
            </BoxBase>
        </BoxBase>
    );
};

export default CalendarPage;
