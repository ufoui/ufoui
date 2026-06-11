import { useState } from 'react';
import { MdInbox, MdSettings, MdStar } from 'react-icons/md';

import { Article, Aside, Item, List, Section, SurfaceColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListBoxPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [selected, setSelected] = useState<string[]>(['inbox']);

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <h2>ListBox Demo</h2>
                <p>Selected: {selected.join(', ') || '—'}</p>

                <List
                    className="max-h-[360px] w-72 overflow-auto"
                    color={color ?? undefined}
                    onChange={setSelected}
                    type="single"
                    value={selected}
                    variant="listbox">
                    <Item description="12 unread" label="Inbox" leading={<MdInbox />} value="inbox" />
                    <Item description="Favorites" label="Starred" leading={<MdStar />} value="starred" />
                    <Item description="System settings" label="Settings" leading={<MdSettings />} value="settings" />
                    <Item description="Archived items" label="Archive" value="archive" />
                    <Item description="Disabled example" disabled label="Billing" value="billing" />
                    <Item description="User profile" label="Profile" value="profile" />
                </List>

                <h2>Multiple selection</h2>
                <List
                    className="max-h-[360px] w-72 overflow-auto"
                    onChange={setSelected}
                    type="multiple"
                    variant="listbox">
                    <Item label="Apple" value="apple" />
                    <Item label="Banana" value="banana" />
                    <Item label="Cherry" value="cherry" />
                    <Item disabled label="Date" value="date" />
                </List>
            </Section>

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
