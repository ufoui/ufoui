import React, { useState } from 'react';

import { Article, Aside, Calendar, Content, H1, H2, P, Section } from '@ufoui/core';

export const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow px={24} py={24}>
                <H1>Calendar</H1>

                <Section gap={16}>
                    <H2>Docked</H2>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </Section>

                <Section gap={16}>
                    <H2>Modal</H2>
                    <Calendar onChange={setSelectedDate} value={selectedDate} type="modal" />
                </Section>
            </Content>

            <Aside px={20}>
                <Section gap={12}>
                    <H2>Selected date</H2>
                    <P>{selectedDate.toLocaleDateString()}</P>
                </Section>
            </Aside>
        </Article>
    );
};

export default CalendarPage;
