import { useState } from 'react';

import { Article, Item, Section, Select } from '@ufoui/core';

export const SelectPage = () => {
    const [fruit, setFruit] = useState<string | undefined>(undefined);
    const [fruits, setFruits] = useState<string[]>([]);

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <h2>Select — single</h2>
                <p>Value: {fruit ?? '—'}</p>
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

                <h2>Select — multiple</h2>
                <p>Values: {fruits.length ? fruits.join(', ') : '—'}</p>
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

                <h2>Select — outlined</h2>
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
