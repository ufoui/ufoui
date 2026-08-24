import {
    BaseColor,
    BorderColor,
    Checkbox,
    ElementBorder,
    ElementDensity,
    ElementElevation,
    ElementFont,
    ElementShape,
    ElementSize,
    ElementTextPlacement,
    getColorNames,
    Grid,
    ListSelection,
    ListSelectionSlot,
    SemanticColor,
    SurfaceColor,
} from '@ufoui/core';

type ButtonModifiersProps = {
    baseColor?: BaseColor | null;
    border?: ElementBorder | null;
    borderColor?: BorderColor | null;
    color?: SemanticColor | null;
    density?: ElementDensity | null;
    disabled?: boolean | null;
    detached?: boolean | null;
    docked?: boolean | null;
    draggable?: boolean | null;
    anchored?: boolean | null;
    dockedElevation?: ElementElevation | null;
    elevation?: ElementElevation | null;
    error?: boolean | null;
    fit?: boolean | null;
    flush?: boolean | null;
    filled?: boolean | null;
    flat?: boolean | null;
    showIcon?: boolean | null;
    showErrorIcon?: boolean | null;
    showClear?: boolean | null;
    focusColor?: SurfaceColor | null;
    font?: ElementFont | null;
    fullColor?: boolean | null;
    fullWidth?: boolean | null;
    labelFont?: ElementFont | null;
    onChange: (mod: {
        baseColor?: BaseColor | null;
        border?: ElementBorder | null;
        borderColor?: BorderColor | null;
        color?: SemanticColor | null;
        density?: ElementDensity | null;
        disabled?: boolean | null;
        docked?: boolean | null;
        draggable?: boolean | null;
        anchored?: boolean | null;
        dockedElevation?: ElementElevation | null;
        detached?: boolean | null;
        elevation?: ElementElevation | null;
        error?: boolean | null;
        filled?: boolean | null;
        fit?: boolean | null;
        flush?: boolean | null;
        flat?: boolean | null;
        showIcon?: boolean | null;
        showErrorIcon?: boolean | null;
        showClear?: boolean | null;
        focusColor?: SurfaceColor | null;
        font?: ElementFont | null;
        fullColor?: boolean | null;
        fullWidth?: boolean | null;
        labelFont?: ElementFont | null;
        readOnly?: boolean | null;
        selectedColor?: SemanticColor | null;
        selectedShape?: ElementShape | null;
        selection?: ListSelection | null;
        selectionSlot?: ListSelectionSlot | null;
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
    selection?: ListSelection | null;
    selectionSlot?: ListSelectionSlot | null;
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
        baseColor,
        size,
        shape,
        border,
        uncheckedBorder,
        uncheckedBorderColor,
        color,
        uncheckedColor,
        selectedColor,
        selectedShape,
        selection,
        selectionSlot,
        draggable,
        borderColor,
        textColor,
        elevation,
        filled,
        flat,
        toggle,
        surfaceColor,
        density,
        detached,
        disabled,
        error,
        fullColor,
        fullWidth,
        dockedElevation,
        fit,
        flush,
        labelFont,
        readOnly,
        font,
        focusColor,
        textPlacement,
        showIcon,
        showErrorIcon,
        showClear,
        docked,
        anchored,
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
                        {getColorNames('semantic').map(c => (
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
                        {getColorNames('semantic').map(c => (
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
                        {getColorNames('semantic').map(c => (
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
                        {getColorNames('base').map(c => (
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
                        {getColorNames('surface').map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {baseColor !== undefined && (
                <>
                    <span>Color (base):</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                baseColor: e.target.value === '' ? undefined : (e.target.value as BaseColor),
                            });
                        }}
                        value={baseColor ?? ''}>
                        <option value="">Default</option>
                        {getColorNames('base').map(c => (
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
                        {getColorNames('border').map(c => (
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
                        {getColorNames('border').map(c => (
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
                        {getColorNames('base').map(c => (
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
                    />
                </>
            )}
            {error !== undefined && (
                <>
                    <label htmlFor="mod_error">Error:</label>
                    <Checkbox
                        checked={!!error}
                        density="dense"
                        id="mod_error"
                        onChange={e => {
                            onChange({
                                ...props,
                                error: e.target.checked,
                            });
                        }}
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
                    />
                </>
            )}
            {showIcon !== undefined && (
                <>
                    <label htmlFor="mod_showIcon">Show Icon:</label>
                    <Checkbox
                        checked={!!showIcon}
                        density="dense"
                        id="mod_showIcon"
                        onChange={e => {
                            onChange({
                                ...props,
                                showIcon: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {showErrorIcon !== undefined && (
                <>
                    <label htmlFor="mod_showErrorIcon">Show Error Icon:</label>
                    <Checkbox
                        checked={!!showErrorIcon}
                        density="dense"
                        id="mod_showErrorIcon"
                        onChange={e => {
                            onChange({
                                ...props,
                                showErrorIcon: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {showClear !== undefined && (
                <>
                    <label htmlFor="mod_showClear">Show Clear Button:</label>
                    <Checkbox
                        checked={!!showClear}
                        density="dense"
                        id="mod_showClear"
                        onChange={e => {
                            onChange({
                                ...props,
                                showClear: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {fullWidth !== undefined && (
                <>
                    <label htmlFor="mod_fullWidth">Full Width:</label>
                    <Checkbox
                        checked={!!fullWidth}
                        density="dense"
                        id="mod_fullWidth"
                        onChange={e => {
                            onChange({
                                ...props,
                                fullWidth: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {fit !== undefined && (
                <>
                    <label htmlFor="mod_dialog_fit">Fit:</label>
                    <Checkbox
                        checked={!!fit}
                        density="dense"
                        id="mod_dialog_fit"
                        onChange={e => {
                            onChange({
                                ...props,
                                fit: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {detached !== undefined && (
                <>
                    <label htmlFor="mod_dialog_detached">Detached:</label>
                    <Checkbox
                        checked={!!detached}
                        density="dense"
                        id="mod_dialog_detached"
                        onChange={e => {
                            onChange({
                                ...props,
                                detached: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {docked !== undefined && (
                <>
                    <label htmlFor="mod_dialog_docked">Docked:</label>
                    <Checkbox
                        checked={!!docked}
                        density="dense"
                        id="mod_dialog_docked"
                        onChange={e => {
                            onChange({
                                ...props,
                                docked: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {anchored !== undefined && (
                <>
                    <label htmlFor="mod_dialog_anchored">Anchored:</label>
                    <Checkbox
                        checked={!!anchored}
                        density="dense"
                        id="mod_dialog_anchored"
                        onChange={e => {
                            onChange({
                                ...props,
                                anchored: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {flush !== undefined && (
                <>
                    <label htmlFor="mod_dialog_flush">Flush:</label>
                    <Checkbox
                        checked={!!flush}
                        density="dense"
                        id="mod_dialog_flush"
                        onChange={e => {
                            onChange({
                                ...props,
                                flush: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
            {selection !== undefined && (
                <>
                    <span>Selection:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                selection: e.target.value === '' ? undefined : (e.target.value as ListSelection),
                            });
                        }}
                        value={selection ?? ''}>
                        <option value="">Default</option>
                        <option value="none">None</option>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </>
            )}
            {selectionSlot !== undefined && (
                <>
                    <span>Selection slot:</span>
                    <select
                        onChange={e => {
                            onChange({
                                ...props,
                                selectionSlot:
                                    e.target.value === '' ? undefined : (e.target.value as ListSelectionSlot),
                            });
                        }}
                        value={selectionSlot ?? ''}>
                        <option value="">Default</option>
                        <option value="none">None</option>
                        <option value="leading">Leading</option>
                        <option value="trailing">Trailing</option>
                    </select>
                </>
            )}
            {draggable !== undefined && (
                <>
                    <label htmlFor="mod_draggable">Draggable:</label>
                    <Checkbox
                        checked={!!draggable}
                        density="dense"
                        id="mod_draggable"
                        onChange={e => {
                            onChange({
                                ...props,
                                draggable: e.target.checked,
                            });
                        }}
                    />
                </>
            )}
        </Grid>
    );
};
