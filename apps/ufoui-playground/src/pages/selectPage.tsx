import { useState } from 'react';

import { Article, H2, Item, P, Section, Select } from '@ufoui/core';

export const SelectPage = () => {
    const [fruit, setFruit] = useState<string | undefined>(undefined);
    const [fruits, setFruits] = useState<string[]>([]);

    return (
        <Article direction="row" fullWidth>
            <Section alignItems="start" gap={24} grow p={16}>
                <H2>Select — single</H2>
                <P>Value: {fruit ?? '—'}</P>
                <Select
                    label="Fruit"
                    placeholder="Pick a fruit..."
                    value={fruit}
                    onChange={v => setFruit(v as string | undefined)}>
                    <Item value="apple" label="Apple" />
                    <Item value="banana" label="Banana" description="Yellow fruit" />
                    <Item value="cherry" label="Cherry" />
                    <Item value="date" label="Date" disabled />
                    <Item value="elderberry" label="Elderberry" />
                </Select>

                <H2>Select — multiple</H2>
                <P>Values: {fruits.length ? fruits.join(', ') : '—'}</P>
                <Select
                    label="Fruits"
                    placeholder="Pick fruits..."
                    multiple
                    value={fruits}
                    onChange={v => setFruits(v as string[])}>
                    <Item value="apple" label="Apple" />
                    <Item value="banana" label="Banana" />
                    <Item value="cherry" label="Cherry" />
                    <Item value="date" label="Date" disabled />
                </Select>

                <H2>Select — outlined</H2>
                <Select
                    label="Country"
                    placeholder="Select country..."
                    outlined
                    fullWidth>
                    <Item value="pl" label="Poland" />
                    <Item value="de" label="Germany" />
                    <Item value="fr" label="France" />
                </Select>
            </Section>
        </Article>
    );
};
