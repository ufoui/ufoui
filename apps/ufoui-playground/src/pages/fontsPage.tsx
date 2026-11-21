import { useLayoutEffect, useRef, useState } from 'react';

import { Article, Aside, Content, Div, ElementFont, Flex, getFontNames, H1, Span, Stack, TextField } from '@ufoui/core';

const FontSample = ({ font, sample }: { font: ElementFont; sample: string }) => {
    const ref = useRef<HTMLElement>(null);
    const [spec, setSpec] = useState('');

    useLayoutEffect(() => {
        if (!ref.current) return;
        const { fontSize, lineHeight, fontWeight, letterSpacing } = getComputedStyle(ref.current);
        setSpec(`size ${fontSize} · line ${lineHeight} · weight ${fontWeight} · tracking ${letterSpacing}`);
    }, [font]);

    return (
        <Flex alignItems="baseline" color="surfaceContainer" gap={16} p={12}>
            <Div font="labelMedium" width={140}>
                {font}
            </Div>
            <Stack gap={4}>
                <Span font={font} ref={ref}>
                    {sample}
                </Span>
                <Span color="onSurfaceVariant" font="bodySmall">
                    {spec}
                </Span>
            </Stack>
        </Flex>
    );
};

export const FontsPage = () => {
    const [sample, setSample] = useState('The quick brown fox jumps over the lazy dog');

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow px={24} py={24}>
                <H1>Fonts</H1>
                <Stack gap={12}>
                    {getFontNames().map(font => (
                        <FontSample font={font} key={font} sample={sample} />
                    ))}
                </Stack>
            </Content>
            <Aside px={20}>
                <TextField
                    label="Sample text"
                    onChange={e => {
                        setSample(e.target.value);
                    }}
                    value={sample}
                />
            </Aside>
        </Article>
    );
};
