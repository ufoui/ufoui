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
                    className="max-h-[360px] overflow-auto w-72"
                    color={color ?? undefined}
                    onChange={setSelected}
                    type="single"
                    value={selected}
                    variant="listbox">
                    <Item leading={<MdInbox />} label="Inbox" description="12 unread" value="inbox" />
                    <Item leading={<MdStar />} label="Starred" description="Favorites" value="starred" />
                    <Item leading={<MdSettings />} label="Settings" description="System settings" value="settings" />
                    <Item label="Archive" description="Archived items" value="archive" />
                    <Item label="Billing" description="Disabled example" value="billing" disabled />
                    <Item label="Profile" description="User profile" value="profile" />
                </List>

                <h2>Multiple selection</h2>
                <List
                    className="max-h-[360px] overflow-auto w-72"
                    onChange={setSelected}
                    type="multiple"
                    variant="listbox">
                    <Item label="Apple" value="apple" />
                    <Item label="Banana" value="banana" />
                    <Item label="Cherry" value="cherry" />
                    <Item label="Date" value="date" disabled />
                </List>
            </Section>

            <Aside>
                <Modifiers
                    onChange={({ surfaceColor: sc }) => setColor(sc ?? null)}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
