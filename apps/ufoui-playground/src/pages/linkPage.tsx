import { useMemo, useState } from 'react';
import { MdArrowForward, MdHome, MdOpenInNew } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    Div,
    ElementFont,
    H1,
    H2,
    Link,
    P,
    Radio,
    Section,
    Span,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const LinkPage = () => {
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [underline, setUnderline] = useState<'none' | 'hover' | 'always'>('hover');
    const [font, setFont] = useState<ElementFont | null>(null);
    const [color, setColor] = useState<SurfaceColor | null>(null);

    const underlineOptions = useMemo(
        () => [
            { value: 'none' as const, label: 'none' },
            { value: 'hover' as const, label: 'hover' },
            { value: 'always' as const, label: 'always' },
        ],
        []
    );

    return (
        <Article direction="row" wf>
            <Content className="items-start gap-6 p-4" grow>
                <H1>Link</H1>
                <Section className="flex w-full flex-col gap-3">
                    <H2>Basic</H2>
                    <Link
                        color={color ?? undefined}
                        disabled={!!disabled}
                        font={font ?? undefined}
                        href="/components/link"
                        underline={underline}>
                        Basic link (internal)
                    </Link>
                </Section>

                <Section className="flex w-full flex-col gap-3">
                    <H2>With label + leading/trailing</H2>
                    <Link
                        color={color ?? undefined}
                        disabled={!!disabled}
                        font={font ?? undefined}
                        href="/components/link"
                        label="Go to home"
                        leading={<MdHome />}
                        trailing={<MdArrowForward />}
                        underline={underline}
                    />
                </Section>

                <Section className="flex w-full flex-col gap-3">
                    <H2>Inline in text</H2>
                    <P>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                        <Link
                            color={color ?? undefined}
                            disabled={!!disabled}
                            font={font ?? undefined}
                            href="/components/link"
                            underline={underline}>
                            Link
                        </Link>{' '}
                        sed do eiusmod tempor incididunt ut labore{' '}
                        <Link
                            color={color ?? undefined}
                            disabled={!!disabled}
                            font={font ?? undefined}
                            href="/components/link"
                            leading={<MdOpenInNew />}
                            underline={underline}>
                            another link
                        </Link>{' '}
                        et dolore magna aliqua.
                    </P>
                </Section>

                <Section className="flex w-full flex-col gap-3">
                    <H2>External</H2>
                    <Link
                        color={color ?? undefined}
                        disabled={!!disabled}
                        font={font ?? undefined}
                        href="https://example.com"
                        isExternal
                        label="example.com"
                        leading={<MdOpenInNew />}
                        underline={underline}
                    />
                    <Span className="opacity-70">Opens new tab + sets rel=&quot;noopener noreferrer&quot;.</Span>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    disabled={disabled}
                    font={font}
                    onChange={({ surfaceColor: sc, disabled: db, font: lf }) => {
                        setColor(sc ?? null);
                        setDisabled(db ?? null);
                        setFont(lf ?? null);
                    }}
                    surfaceColor={color}
                />
                <Div className="flex w-full flex-wrap gap-3">
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
                </Div>
            </Aside>
        </Article>
    );
};
