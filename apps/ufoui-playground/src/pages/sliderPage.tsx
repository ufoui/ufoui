import { useMemo, useState } from 'react';

import {
    Article,
    Aside,
    Checkbox,
    Content,
    ElementDensity,
    ElementSize,
    ElementTextPlacement,
    Fieldset,
    Grid,
    H2,
    Section,
    SemanticColor,
    Slider,
    SurfaceColor,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const VH = '160px'; // default vertical height
const VHD = '220px'; // discrete vertical height (room for stops)
const VG = 40; // gap between vertical sliders (wider to avoid label overlap)

export const SliderPage = () => {
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [trackColor, setTrackColor] = useState<SurfaceColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [density, setDensity] = useState<ElementDensity | null>(null);
    const [disabled, setDisabled] = useState<boolean | null>(false);
    const [readOnly, setReadOnly] = useState<boolean | null>(false);
    const [textPlacement, setTextPlacement] = useState<ElementTextPlacement | null>(null);

    const [showValue, setShowValue] = useState<false | true | 'always'>(false);
    const [stops, setStops] = useState(false);
    const [required, setRequired] = useState(false);

    const [controlled, setControlled] = useState(40);
    const [controlledRange, setControlledRange] = useState<[number, number]>([25, 75]);

    const shared = useMemo(
        () => ({
            color: color ?? undefined,
            trackColor: trackColor ?? undefined,
            size: size ?? undefined,
            density: density ?? undefined,
            disabled: disabled ?? undefined,
            readOnly: readOnly ?? undefined,
            textPlacement: textPlacement ?? undefined,
            showValue: showValue || undefined,
            stops: stops || undefined,
            required: required || undefined,
        }),
        [color, trackColor, size, density, disabled, readOnly, textPlacement, showValue, stops, required]
    );

    return (
        <Article direction="row">
            <Content gap={20} grow px={20}>
                {/* ── States ──────────────────────────────────────────── */}
                <Section shape="rounded">
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider {...shared} defaultValue={60} label="Default" />
                            <Slider {...shared} defaultValue={0} label="At minimum" />
                            <Slider {...shared} defaultValue={100} label="At maximum" />
                            <Slider {...shared} defaultValue={40} disabled label="Disabled" />
                            <Slider {...shared} defaultValue={40} label="Read-only" readOnly />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="Default"
                                orientation="vertical"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={0}
                                label="Min"
                                orientation="vertical"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={100}
                                label="Max"
                                orientation="vertical"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={40}
                                disabled
                                label="Disabled"
                                orientation="vertical"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={40}
                                label="Read-only"
                                orientation="vertical"
                                readOnly
                                style={{ height: VH }}
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Value label ──────────────────────────────────────── */}
                <Section>
                    <H2>Value label</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider {...shared} defaultValue={55} label="Hover / focus" showValue />
                            <Slider {...shared} defaultValue={30} label="Always" showValue="always" />
                            <Slider {...shared} defaultValue={70} label="Hidden" />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                defaultValue={55}
                                label="Hover"
                                orientation="vertical"
                                showValue
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={30}
                                label="Always"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={70}
                                label="Hidden"
                                orientation="vertical"
                                style={{ height: VH }}
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Types ────────────────────────────────────────────── */}
                <Section>
                    <H2>Types</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider {...shared} defaultValue={60} label="Standard" showValue="always" />
                            <Slider
                                {...shared}
                                defaultValue={30}
                                label="Centered"
                                max={100}
                                min={-100}
                                showValue="always"
                                type="centered"
                            />
                            <Slider {...shared} defaultValue={[20, 70]} label="Range" showValue="always" type="range" />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="Standard"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={30}
                                label="Centered"
                                max={100}
                                min={-100}
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                                type="centered"
                            />
                            <Slider
                                {...shared}
                                defaultValue={[20, 70]}
                                label="Range"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                                type="range"
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Discrete ─────────────────────────────────────────── */}
                <Section>
                    <H2>Discrete</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider {...shared} defaultValue={40} label="Step 10" showValue step={10} stops />
                            <Slider
                                {...shared}
                                defaultValue={0}
                                label="Centered step 10"
                                max={100}
                                min={-100}
                                showValue
                                step={10}
                                stops
                                type="centered"
                            />
                            <Slider
                                {...shared}
                                defaultValue={[0, 50]}
                                label="Range step 10"
                                showValue="always"
                                step={10}
                                stops
                                type="range"
                            />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                defaultValue={40}
                                label="Step 10"
                                orientation="vertical"
                                showValue
                                step={10}
                                stops
                                style={{ height: VHD }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={0}
                                label="Centered"
                                max={100}
                                min={-100}
                                orientation="vertical"
                                showValue
                                step={10}
                                stops
                                style={{ height: VHD }}
                                type="centered"
                            />
                            <Slider
                                {...shared}
                                defaultValue={[0, 50]}
                                label="Range"
                                orientation="vertical"
                                showValue="always"
                                step={10}
                                stops
                                style={{ height: VHD }}
                                type="range"
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Sizes ────────────────────────────────────────────── */}
                <Section>
                    <H2>Sizes</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="Extra Small"
                                showValue="always"
                                size="extraSmall"
                            />
                            <Slider {...shared} defaultValue={60} label="Small" showValue="always" size="small" />
                            <Slider {...shared} defaultValue={60} label="Medium" showValue="always" size="medium" />
                            <Slider {...shared} defaultValue={60} label="Large" showValue="always" size="large" />
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="Extra Large"
                                showValue="always"
                                size="extraLarge"
                            />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="XS"
                                orientation="vertical"
                                showValue="always"
                                size="extraSmall"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="S"
                                orientation="vertical"
                                showValue="always"
                                size="small"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="M"
                                orientation="vertical"
                                showValue="always"
                                size="medium"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="L"
                                orientation="vertical"
                                showValue="always"
                                size="large"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                defaultValue={60}
                                label="XL"
                                orientation="vertical"
                                showValue="always"
                                size="extraLarge"
                                style={{ height: VH }}
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Colors ───────────────────────────────────────────── */}
                <Section>
                    <H2>Colors</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Horizontal">
                            <Slider {...shared} color="primary" defaultValue={60} label="Primary" showValue="always" />
                            <Slider
                                {...shared}
                                color="secondary"
                                defaultValue={45}
                                label="Secondary"
                                showValue="always"
                            />
                            <Slider
                                {...shared}
                                color="tertiary"
                                defaultValue={70}
                                label="Tertiary"
                                showValue="always"
                            />
                            <Slider {...shared} color="success" defaultValue={80} label="Success" showValue="always" />
                            <Slider {...shared} color="warning" defaultValue={50} label="Warning" showValue="always" />
                            <Slider {...shared} color="error" defaultValue={35} label="Error" showValue="always" />
                        </Fieldset>
                        <Fieldset direction="row" disabled={disabled ?? undefined} gap={VG} legend="Vertical">
                            <Slider
                                {...shared}
                                color="primary"
                                defaultValue={60}
                                label="Primary"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                color="secondary"
                                defaultValue={45}
                                label="Secondary"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                color="tertiary"
                                defaultValue={70}
                                label="Tertiary"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                color="success"
                                defaultValue={80}
                                label="Success"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                color="warning"
                                defaultValue={50}
                                label="Warning"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                            <Slider
                                {...shared}
                                color="error"
                                defaultValue={35}
                                label="Error"
                                orientation="vertical"
                                showValue="always"
                                style={{ height: VH }}
                            />
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Controlled ───────────────────────────────────────── */}
                <Section>
                    <H2>Controlled</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Single">
                            <Slider
                                {...shared}
                                label="Controlled slider"
                                onChange={v => {
                                    if (typeof v === 'number') {
                                        setControlled(v);
                                    }
                                }}
                                showValue="always"
                                value={controlled}
                            />
                            <p className="text-sm text-gray-500">Value: {controlled}</p>
                        </Fieldset>
                        <Fieldset disabled={disabled ?? undefined} gap={24} legend="Range">
                            <Slider
                                {...shared}
                                formatValue={v => `$${v}`}
                                label="Controlled range"
                                onChange={v => {
                                    if (Array.isArray(v)) {
                                        setControlledRange(v as [number, number]);
                                    }
                                }}
                                showValue="always"
                                type="range"
                                value={controlledRange}
                            />
                            <p className="text-sm text-gray-500">
                                Range: {controlledRange[0]} – {controlledRange[1]}
                            </p>
                        </Fieldset>
                    </Grid>
                </Section>

                {/* ── Label placement & Error ───────────────────────────── */}
                <Section>
                    <H2>Label placement</H2>
                    <Grid cols={2} fullWidth gap={20}>
                        <Fieldset gap={24} legend="textPlacement">
                            <Slider {...shared} defaultValue={40} label="Top (default)" showValue textPlacement="top" />
                            <Slider {...shared} defaultValue={40} label="Bottom" showValue textPlacement="bottom" />
                            <Slider {...shared} defaultValue={40} label="Start" showValue textPlacement="start" />
                            <Slider {...shared} defaultValue={40} label="End" showValue textPlacement="end" />
                        </Fieldset>
                        <Fieldset gap={24} legend="Error / Description">
                            <Slider
                                {...shared}
                                defaultValue={40}
                                description="Supporting text below the slider."
                                label="With description"
                            />
                            <Slider
                                {...shared}
                                defaultValue={40}
                                error="Value out of range."
                                label="With error"
                                required
                            />
                        </Fieldset>
                    </Grid>
                </Section>
            </Content>

            <Aside px={20}>
                <Modifiers
                    color={color}
                    density={density}
                    disabled={disabled}
                    onChange={({
                        color: c,
                        surfaceColor: sc,
                        size: s,
                        density: d,
                        disabled: db,
                        readOnly: ro,
                        textPlacement: tp,
                    }) => {
                        setColor(c ?? null);
                        setTrackColor(sc ?? null);
                        setSize(s ?? null);
                        setDensity(d ?? null);
                        setDisabled(db ?? null);
                        setReadOnly(ro ?? null);
                        setTextPlacement(tp ?? null);
                    }}
                    readOnly={readOnly}
                    size={size}
                    surfaceColor={trackColor}
                    textPlacement={textPlacement}
                />
                <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
                    <>
                        <span>ShowValue:</span>
                        <select
                            onChange={e => {
                                const v = e.target.value;
                                setShowValue(v === 'always' ? 'always' : v === 'hover');
                            }}
                            value={showValue === 'always' ? 'always' : showValue ? 'hover' : ''}>
                            <option value="">Off</option>
                            <option value="hover">Hover</option>
                            <option value="always">Always</option>
                        </select>
                    </>
                    <>
                        <span>Stops:</span>
                        <Checkbox
                            checked={stops}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setStops(v => !v);
                            }}
                        />
                    </>
                    <>
                        <span>Required:</span>
                        <Checkbox
                            checked={required}
                            density="dense"
                            label=" "
                            onChange={() => {
                                setRequired(v => !v);
                            }}
                        />
                    </>
                </Grid>
            </Aside>
        </Article>
    );
};
