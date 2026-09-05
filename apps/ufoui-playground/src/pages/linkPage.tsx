import { useMemo, useState } from 'react';
import { MdArrowForward, MdHome, MdOpenInNew } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

import {
    Article,
    Aside,
    BaseColor,
    Content,
    ElementFont,
    H1,
    H2,
    Link,
    P,
    Radio,
    Section,
    Span,
    Stack,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const LinkPage = () => {
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [underline, setUnderline] = useState<'none' | 'hover' | 'always'>('hover');
    const [font, setFont] = useState<ElementFont | null>(null);
    const [color, setColor] = useState<BaseColor | null>(null);

    const underlineOptions = useMemo(
        () => [
            { value: 'none' as const, label: 'none' },
            { value: 'hover' as const, label: 'hover' },
            { value: 'always' as const, label: 'always' },
        ],
        []
    );

    return (
        <Article direction="row" fullWidth>
            <Content alignItems="start" gap={24} grow p={16}>
                <H1>Link</H1>
                <Section fullWidth gap={12}>
                    <H2>Basic</H2>
                    <Link
                        as={RouterLink}
                        color={color ?? undefined}
                        disabled={!!disabled}
                        font={font ?? undefined}
                        to="/components/link"
                        underline={underline}>
                        Basic link (internal)
                    </Link>
                </Section>

                <Section fullWidth gap={12}>
                    <H2>With label + leading/trailing</H2>
                    <Link
                        as={RouterLink}
                        color={color ?? undefined}
                        disabled={!!disabled}
                        font={font ?? undefined}
                        label="Go to home"
                        leading={<MdHome />}
                        to="/"
                        trailing={<MdArrowForward />}
                        underline={underline}
                    />
                </Section>

                <Section fullWidth gap={12}>
                    <H2>Inline in text</H2>
                    <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                        <Link
                            as={RouterLink}
                            color={color ?? undefined}
                            disabled={!!disabled}
                            font={font ?? undefined}
                            to="/components/link"
                            underline={underline}>
                            Link
                        </Link>{' '}
                        sed do eiusmod tempor incididunt ut labore{' '}
                        <Link
                            as={RouterLink}
                            color={color ?? undefined}
                            disabled={!!disabled}
                            font={font ?? undefined}
                            leading={<MdOpenInNew />}
                            to="/components/link"
                            underline={underline}>
                            another link
                        </Link>{' '}
                        et dolore magna aliqua.
                    </P>
                </Section>

                <Section fullWidth gap={12}>
                    <H2>External</H2>
                    <Link
                        color={color ?? undefined}
                        disabled={!!disabled}
                        external
                        font={font ?? undefined}
                        href="https://example.com"
                        label="example.com"
                        leading={<MdOpenInNew />}
                        underline={underline}
                    />
                    <Span style={{ opacity: 0.7 }}>Opens new tab + sets rel=&quot;noopener noreferrer&quot;.</Span>
                </Section>
                <Section fullWidth gap={12} width={240}>
                    <H2>Multiline</H2>
                    <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.{' '}
                        <Link
                            as={RouterLink}
                            color={color ?? undefined}
                            disabled={!!disabled}
                            font={font ?? undefined}
                            leading={<MdOpenInNew />}
                            to="/components/link"
                            trailing={<MdArrowForward />}
                            underline={underline}>
                            This is a really long multiline link that keeps running across several lines of text, so you
                            can see how the underline, the hover state and the focus ring behave once the label wraps
                        </Link>{' '}
                        ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </P>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    baseColor={color}
                    disabled={disabled}
                    font={font}
                    onChange={({ baseColor: bc, disabled: db, font: lf }) => {
                        setColor(bc ?? null);
                        setDisabled(db ?? null);
                        setFont(lf ?? null);
                    }}
                />
                <Stack fullWidth>
                    <P>Underline</P>
                    {underlineOptions.map(opt => (
                        <Radio
                            checked={underline === opt.value}
                            key={opt.value}
                            label={opt.label}
                            onChange={() => {
                                setUnderline(opt.value);
                            }}
                            value={opt.value}
                        />
                    ))}
                </Stack>
            </Aside>
        </Article>
    );
};
