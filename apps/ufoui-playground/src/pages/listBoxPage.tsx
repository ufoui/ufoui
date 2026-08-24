import { useState } from 'react';
import { MdInbox, MdSettings, MdStar } from 'react-icons/md';

import { Article, Aside, Content, H1, H2, List, ListItem, P, Section, SurfaceColor } from '@ufoui/core';

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
                        selection="single"
                        value={selected}
                        variant="listbox"
                        width={288}>
                        <ListItem description="12 unread" label="Inbox" leading={<MdInbox />} value="inbox" />
                        <ListItem description="Favorites" label="Starred" leading={<MdStar />} value="starred" />
                        <ListItem description="System settings" label="Settings" leading={<MdSettings />} value="settings" />
                        <ListItem description="Archived items" label="Archive" value="archive" />
                        <ListItem description="Disabled example" disabled label="Billing" value="billing" />
                        <ListItem description="User profile" label="Profile" value="profile" />
                    </List>
                </Section>

                <Section alignItems="start" gap={12}>
                    <H2>Multiple selection</H2>
                    <List
                        maxHeight={360}
                        onChange={setSelected}
                        overflow="auto"
                        selection="multiple"
                        variant="listbox"
                        width={288}>
                        <ListItem label="Apple" value="apple" />
                        <ListItem label="Banana" value="banana" />
                        <ListItem label="Cherry" value="cherry" />
                        <ListItem disabled label="Date" value="date" />
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
