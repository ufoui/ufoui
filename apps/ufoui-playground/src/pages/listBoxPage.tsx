import { useState } from 'react';
import { MdInbox, MdSettings, MdStar } from 'react-icons/md';

import { Article, Aside, Content, H1, H2, Item, List, P, Section, SurfaceColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListBoxPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [selected, setSelected] = useState<string[]>(['inbox']);

    return (
        <Article direction="row" fullWidth>
            <Content alignItems="start" gap={24} grow p={16}>
                <H1>ListBox</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Single selection</H2>
                    <P>Selected: {selected.join(', ') || '—'}</P>

                    <List
                        color={color ?? undefined}
                        maxHeight={360}
                        onChange={setSelected}
                        overflow="auto"
                        type="single"
                        value={selected}
                        variant="listbox"
                        width={288}>
                        <Item description="12 unread" label="Inbox" leading={<MdInbox />} value="inbox" />
                        <Item description="Favorites" label="Starred" leading={<MdStar />} value="starred" />
                        <Item description="System settings" label="Settings" leading={<MdSettings />} value="settings" />
                        <Item description="Archived items" label="Archive" value="archive" />
                        <Item description="Disabled example" disabled label="Billing" value="billing" />
                        <Item description="User profile" label="Profile" value="profile" />
                    </List>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Multiple selection</H2>
                    <List
                        maxHeight={360}
                        onChange={setSelected}
                        overflow="auto"
                        type="multiple"
                        variant="listbox"
                        width={288}>
                        <Item label="Apple" value="apple" />
                        <Item label="Banana" value="banana" />
                        <Item label="Cherry" value="cherry" />
                        <Item disabled label="Date" value="date" />
                    </List>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    onChange={({ surfaceColor: sc }) => {
                        setColor(sc ?? null);
                    }}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
