import { useEffect, useMemo, useRef, useState } from 'react';

import { Article, Aside, Div, ElementSize, H1, H2, Progress, Section, SemanticColor, SurfaceColor } from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

export const ProgressPage = () => {
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [trackColor, setTrackColor] = useState<SurfaceColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);

    const [value, setValue] = useState(0);
    const holdTicks = useRef(0);
    const direction = useRef<'up' | 'down'>('up');

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => {
                if (direction.current === 'up') {
                    if (prev >= 100) {
                        if (holdTicks.current < 20) {
                            holdTicks.current += 1;
                            return 100;
                        }
                        holdTicks.current = 0;
                        direction.current = 'down';
                        return 99;
                    }
                    return prev + 1;
                }

                if (prev <= 0) {
                    if (holdTicks.current < 20) {
                        holdTicks.current += 1;
                        return 0;
                    }
                    holdTicks.current = 0;
                    direction.current = 'up';
                    return 1;
                }

                return prev - 1;
            });
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            trackColor: trackColor ?? undefined,
            size: size ?? undefined,
        }),
        [color, trackColor, size]
    );

    return (
        <Article direction="row" fullWidth>
            <Section gap={24} grow p={16}>
                <H1>Progress</H1>
                <H2>Linear – Determinate</H2>
                <Progress value={value} {...shared} />

                <H2>Linear – Indeterminate</H2>
                <Progress {...shared} />

                <H2>Circular – Determinate</H2>
                <Div className="flex items-center gap-4">
                    <Progress value={value} variant="circular" {...shared} />
                </Div>

                <H2>Circular – Indeterminate</H2>
                <Div className="flex items-center gap-4">
                    <Progress variant="circular" {...shared} />
                </Div>
            </Section>

            <Aside width={240}>
                <Modifiers
                    color={color}
                    onChange={({ color: c, surfaceColor: sc, size: s }) => {
                        setColor(c ?? null);
                        setTrackColor(sc ?? null);
                        setSize(s ?? null);
                    }}
                    size={size}
                    surfaceColor={trackColor}
                />
            </Aside>
        </Article>
    );
};
