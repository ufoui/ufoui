import {
    BorderColor,
    Checkbox,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    ElementTextPlacement,
    Grid,
    SemanticColor,
    SurfaceColor,
    ThemeSemanticColorKeys,
    ThemeSurfaceColorKeys,
} from '@ufoui/core';

type ButtonModifiersProps = {
    border?: ElementBorder | null;
    borderColor?: BorderColor | null;
    color?: SemanticColor | null;
    density?: ElementDensity | null;
    disabled?: boolean | null;
    dockedElevation?: ElementElevation | null;
    elevation?: ElementElevation | null;
    filled?: boolean | null;
    flat?: boolean | null;
    focusColor?: SurfaceColor | null;
    font?: ElementFont | null;
    fullColor?: boolean | null;
    labelFont?: ElementFont | null;
    onChange: (mod: {
        border?: ElementBorder | null;
        borderColor?: BorderColor | null;
        color?: SemanticColor | null;
        density?: ElementDensity | null;
        disabled?: boolean | null;
        dockedElevation?: ElementElevation | null;
        elevation?: ElementElevation | null;
        filled?: boolean | null;
        flat?: boolean | null;
        focusColor?: SurfaceColor | null;
        font?: ElementFont | null;
        fullColor?: boolean | null;
        labelFont?: ElementFont | null;
        readOnly?: boolean | null;
        selectedColor?: SemanticColor | null;
        selectedShape?: ElementShape | null;
        selectedTextColor?: SurfaceColor | null;
        shape?: ElementShape | null;
        size?: ElementSize | null;
        surfaceColor?: SurfaceColor | null;
        textColor?: SurfaceColor | null;
        textPlacement?: ElementTextPlacement | null;
        toggle?: boolean | null;
        uncheckedBorder?: ElementBorder | null;
        uncheckedBorderColor?: BorderColor | null;
        uncheckedColor?: SemanticColor | null;
    }) => void;
    readOnly?: boolean | null;
    selectedColor?: SemanticColor | null;
    selectedShape?: ElementShape | null;
    selectedTextColor?: SurfaceColor | null;
    shape?: ElementShape | null;
    size?: ElementSize | null;
    surfaceColor?: SurfaceColor | null;
    textColor?: SurfaceColor | null;
    textPlacement?: ElementTextPlacement | null;
    toggle?: boolean | null;
    uncheckedBorder?: ElementBorder | null;
    uncheckedBorderColor?: BorderColor | null;
    uncheckedColor?: SemanticColor | null;
};

export const Modifiers = ({ onChange, ...props }: ButtonModifiersProps) => {
    const {
        size,
        shape,
        border,
        uncheckedBorder,
        uncheckedBorderColor,
        color,
        uncheckedColor,
        selectedTextColor,
        selectedColor,
        selectedShape,
        borderColor,
        textColor,
        elevation,
        filled,
        flat,
        toggle,
        surfaceColor,
        density,
        disabled,
        fullColor,
        dockedElevation,
        labelFont,
        readOnly,
        font,
        focusColor,
        textPlacement,
    } = props;

    const fontList = [
        'displayLarge',
        'displayMedium',
        'displaySmall',
        'headlineLarge',
        'headlineMedium',
        'headlineSmall',
        'titleLarge',
        'titleMedium',
        'titleSmall',
        'labelLarge',
        'labelMedium',
        'labelSmall',
        'bodyLarge',
        'bodyMedium',
        'bodySmall',
        'caption',
        'overline',
    ];

    return (
        <Grid alignItems="center" cols={2} gapX={16} gapY={4}>
            {size !== undefined && (
                <>
                    <span>Size:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                size: e.target.value === '' ? undefined : (e.target.value as ElementSize),
                            });
                        }}
                        value={size ?? ''}>
                        <option value="">Default</option>
                        <option value="extraSmall">Extra Small</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="extraLarge">Extra Large</option>
                    </select>
                </>
            )}

            {color !== undefined && (
                <>
                    <span>Color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                color: e.target.value === '' ? undefined : (e.target.value as SemanticColor),
                            });
                        }}
                        value={color ?? ''}>
                        <option value="">Default</option>
                        {ThemeSemanticColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {uncheckedColor !== undefined && (
                <>
                    <span>Unchecked color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                uncheckedColor: e.target.value === '' ? undefined : (e.target.value as SemanticColor),
                            });
                        }}
                        value={uncheckedColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSemanticColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {selectedColor !== undefined && (
                <>
                    <span>Selected Color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                selectedColor: e.target.value === '' ? undefined : (e.target.value as SemanticColor),
                            });
                        }}
                        value={selectedColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSemanticColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {textColor !== undefined && (
                <>
                    <span>Text Color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                textColor: e.target.value === '' ? undefined : (e.target.value as SurfaceColor),
                            });
                        }}
                        value={textColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {selectedTextColor !== undefined && (
                <>
                    <span>Selected text color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                selectedTextColor: e.target.value === '' ? undefined : (e.target.value as SurfaceColor),
                            });
                        }}
                        value={selectedTextColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {surfaceColor !== undefined && (
                <>
                    <span>Color (surface):</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                surfaceColor: e.target.value === '' ? undefined : (e.target.value as SurfaceColor),
                            });
                        }}
                        value={surfaceColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {shape !== undefined && (
                <>
                    <span>Shape:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                shape: e.target.value === '' ? undefined : (e.target.value as ElementShape),
                            });
                        }}
                        value={shape ?? ''}>
                        <option value="">Default</option>
                        <option value="round">Round</option>
                        <option value="rounded">Rounded</option>
                        <option value="smooth">Smooth</option>
                        <option value="square">Square</option>
                    </select>
                </>
            )}

            {selectedShape !== undefined && (
                <>
                    <span>Selected shape:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                selectedShape: e.target.value === '' ? undefined : (e.target.value as ElementShape),
                            });
                        }}
                        value={selectedShape ?? ''}>
                        <option value="">Default</option>
                        <option value="round">Round</option>
                        <option value="rounded">Rounded</option>
                        <option value="smooth">Smooth</option>
                        <option value="square">Square</option>
                    </select>
                </>
            )}

            {border !== undefined && (
                <>
                    <span>Border width:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                border: e.target.value === '' ? undefined : (+e.target.value as ElementBorder),
                            });
                        }}
                        value={border ?? ''}>
                        <option value="">Default</option>
                        {[0, 1, 2, 3, 4].map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {uncheckedBorder !== undefined && (
                <>
                    <span>Unchecked border width:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                uncheckedBorder: e.target.value === '' ? undefined : (+e.target.value as ElementBorder),
                            });
                        }}
                        value={uncheckedBorder ?? ''}>
                        <option value="">Default</option>
                        {[0, 1, 2, 3, 4].map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {borderColor !== undefined && (
                <>
                    <span>Border color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                borderColor: e.target.value === '' ? undefined : (e.target.value as BorderColor),
                            });
                        }}
                        value={borderColor ?? ''}>
                        <option value="">Default</option>
                        {/* <optgroup span="Surface Colors">*/}
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                        {/* </optgroup>*/}
                    </select>
                </>
            )}
            {uncheckedBorderColor !== undefined && (
                <>
                    <span>Unchecked border color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                uncheckedBorderColor:
                                    e.target.value === '' ? undefined : (e.target.value as BorderColor),
                            });
                        }}
                        value={uncheckedBorderColor ?? ''}>
                        <option value="">Default</option>
                        {/* <optgroup span="Surface Colors">*/}
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                        {/* </optgroup>*/}
                    </select>
                </>
            )}
            {elevation !== undefined && (
                <>
                    <span>Elevation:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                elevation: e.target.value === '' ? undefined : (+e.target.value as ElementElevation),
                            });
                        }}
                        value={elevation ?? ''}>
                        <option value="">Default</option>
                        {[0, 1, 2, 3, 4, 5].map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {dockedElevation !== undefined && (
                <>
                    <span>Docked elevation:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                dockedElevation: e.target.value === '' ? null : (+e.target.value as ElementElevation),
                            });
                        }}
                        value={dockedElevation ?? ''}>
                        <option value="">Default</option>
                        {[0, 1, 2, 3, 4, 5].map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {density !== undefined && (
                <>
                    <span>Density:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                density: e.target.value === '' ? undefined : (e.target.value as ElementDensity),
                            });
                        }}
                        value={density ?? ''}>
                        <option value="">Default</option>
                        <option value="comfortable">Comfortable</option>
                        <option value="compact">Compact</option>
                        <option value="dense">Dense</option>
                    </select>
                </>
            )}
            {labelFont !== undefined && (
                <>
                    <span>Label font:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                labelFont: e.target.value === '' ? null : (e.target.value as ElementFont),
                            });
                        }}
                        value={labelFont ?? ''}>
                        <option value="">Default</option>
                        {fontList.map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {font !== undefined && (
                <>
                    <span>Font:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                font: e.target.value === '' ? null : (e.target.value as ElementFont),
                            });
                        }}
                        value={font ?? ''}>
                        <option value="">Default</option>
                        {fontList.map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {focusColor !== undefined && (
                <>
                    <span>Focus color:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                focusColor: e.target.value === '' ? undefined : (e.target.value as SurfaceColor),
                            });
                        }}
                        value={focusColor ?? ''}>
                        <option value="">Default</option>
                        {ThemeSurfaceColorKeys.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {textPlacement !== undefined && (
                <>
                    <span>Text placement:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                textPlacement:
                                    e.target.value === '' ? undefined : (e.target.value as ElementTextPlacement),
                            });
                        }}
                        value={textPlacement ?? ''}>
                        <option value="">Default</option>
                        <option value="start">Start</option>
                        <option value="end">End</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </>
            )}
            {flat !== undefined && (
                <>
                    <label htmlFor="mod_flat">Flat:</label>
                    <Checkbox
                        checked={!!flat}
                        density="dense"
                        id="mod_flat"
                        onChange={e => {
                            onChange({
                                ...props,
                                flat: e.target.checked,
                            });
                        }}
                        title="Flat"
                    />
                </>
            )}

            {toggle !== undefined && (
                <>
                    <label htmlFor="mod_toggle">Toggle:</label>
                    <Checkbox
                        checked={!!toggle}
                        density="dense"
                        id="mod_toggle"
                        onChange={e => {
                            onChange({
                                ...props,
                                toggle: e.target.checked,
                            });
                        }}
                        title="Toggle"
                    />
                </>
            )}
            {filled !== undefined && (
                <>
                    <label htmlFor="mod_filled">Filled:</label>
                    <Checkbox
                        checked={!!filled}
                        density="dense"
                        id="mod_filled"
                        onChange={e => {
                            onChange({
                                ...props,
                                filled: e.target.checked,
                            });
                        }}
                        title="Filled"
                    />
                </>
            )}
            {fullColor !== undefined && (
                <>
                    <label htmlFor="mod_fullColor">Full color:</label>
                    <Checkbox
                        checked={!!fullColor}
                        density="dense"
                        id="mod_fullColor"
                        onChange={e => {
                            onChange({
                                ...props,
                                fullColor: e.target.checked,
                            });
                        }}
                        title="Disabled"
                    />
                </>
            )}
            {disabled !== undefined && (
                <>
                    <label htmlFor="mod_disabled">Disabled:</label>
                    <Checkbox
                        checked={!!disabled}
                        density="dense"
                        id="mod_disabled"
                        onChange={e => {
                            onChange({
                                ...props,
                                disabled: e.target.checked,
                            });
                        }}
                        title="Disabled"
                    />
                </>
            )}
            {readOnly !== undefined && (
                <>
                    <label htmlFor="mod_readOnly">ReadOnly:</label>
                    <Checkbox
                        checked={!!readOnly}
                        density="dense"
                        id="mod_readOnly"
                        onChange={e => {
                            onChange({
                                ...props,
                                readOnly: e.target.checked,
                            });
                        }}
                        title="ReadOnly"
                    />
                </>
            )}
        </Grid>
    );
};
