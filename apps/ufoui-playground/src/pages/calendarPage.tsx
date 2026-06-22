import React, { useState } from 'react';

import { Article, Aside, Calendar, Content, Flex, H1, H2, P, Section } from '@ufoui/core';

export const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <Article direction="row" fullWidth>
            <Content gap={24} grow px={24} py={24}>
                <H1>Calendar</H1>

                <Section gap={16}>
                    <H2>Standard Calendar</H2>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </Section>

                <Section gap={16}>
                    <H2>Variants</H2>

                    <Flex gap={16} wrap>
                        <Calendar border={1} />
                        <Calendar color="secondaryContainer" elevation={1} shape="square" />
                    </Flex>
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
