import { useState } from 'react';

import { Article, H2, Option, P, Section, Select } from '@ufoui/core';

export const SelectPage = () => {
    const [fruit, setFruit] = useState<string | undefined>(undefined);
    const [fruits, setFruits] = useState<string[]>([]);
    return (
        <Article direction="row" fullWidth>
            <Section alignItems="start" gap={24} grow p={16}>
                <H2>Select - single</H2>
                <P>Value: {fruit ?? '-'}</P>
                <Select
                    label="Fruit"
                    onChange={v => {
                        setFruit(v as string | undefined);
                    }}
                    placeholder="Pick a fruit..."
                    value={fruit}>
                    <Option label="Apple" value="apple" />
                    <Option description="Yellow fruit" label="Banana" value="banana" />
                    <Option label="Cherry" value="cherry" />
                    <Option disabled label="Date" value="date" />
                    <Option label="Elderberry" value="elderberry" />
                </Select>

                <H2>Select - multiple</H2>
                <P>Values: {fruits.length ? fruits.join(', ') : '-'}</P>
                <Select
                    label="Fruits"
                    multiple
                    onChange={v => {
                        setFruits(v as string[]);
                    }}
                    placeholder="Pick fruits..."
                    value={fruits}>
                    <Option label="Apple" value="apple" />
                    <Option label="Banana" value="banana" />
                    <Option label="Cherry" value="cherry" />
                    <Option disabled label="Date" value="date" />
                </Select>

                <H2>Select - outlined</H2>
                <Select fullWidth label="Country" outlined placeholder="Select country...">
                    <Option label="Poland" value="pl" />
                    <Option label="Germany" value="de" />
                    <Option label="France" value="fr" />
                </Select>
            </Section>
        </Article>
    );
};
