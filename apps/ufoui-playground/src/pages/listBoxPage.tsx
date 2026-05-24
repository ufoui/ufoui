import { useMemo, useState } from 'react';
import { MdInbox, MdSettings, MdStar } from 'react-icons/md';

import {
    Article,
    Aside,
    BorderColor,
    ElementBorder,
    ElementElevation,
    ElementShape,
    ListBox,
    ListItem,
    Section,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ListBoxPage = () => {
    const [color, setColor] = useState<SurfaceColor | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);
    const [elevation, setElevation] = useState<ElementElevation | null>(null);
    const [border, setBorder] = useState<ElementBorder | null>(null);
    const [borderColor, setBorderColor] = useState<BorderColor | null>(null);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            shape: shape ?? undefined,
            elevation: elevation ?? undefined,
            border: border ?? undefined,
            borderColor: borderColor ?? undefined,
            className: 'max-h-[360px] overflow-auto',
        }),
        [color, shape, elevation, border, borderColor]
    );

    return (
        <Article direction="row" fullWidth>
            <Section className="items-start gap-6 p-4" grow>
                <h2>ListBox Demo</h2>

                <ListBox defaultValue="inbox" type="single" {...shared}>
                    <ListItem description="12 unread" icon={<MdInbox />} label="Inbox" type="option" value="inbox" />
                    <ListItem description="Favorites" icon={<MdStar />} label="Starred" type="option" value="starred" />
                    <ListItem description="System settings" icon={<MdSettings />} label="Settings" type="option" value="settings" />
                    <ListItem description="Archived items" label="Archive" type="option" value="archive" />
                    <ListItem description="Disabled example" disabled label="Billing" type="option" value="billing" />
                    <ListItem description="User profile" label="Profile" type="option" value="profile" />
                </ListBox>
            </Section>

            <Aside>
                <Modifiers
                    border={border}
                    borderColor={borderColor}
                    elevation={elevation}
                    onChange={({ surfaceColor: sc, elevation: el, shape: sp, border: bd, borderColor: bc }) => {
                        setColor(sc ?? null);
                        setShape(sp ?? null);
                        setElevation(el ?? null);
                        setBorder(bd ?? null);
                        setBorderColor(bc ?? null);
                    }}
                    shape={shape}
                    surfaceColor={color}
                />
            </Aside>
        </Article>
    );
};
