import { useState } from 'react';

import { generateMaterialColors, IconButton, useTheme } from '@ufoui/core';

import { colorSets } from '../../colorSets';

const ColorSetButtons = () => {
    const { setTheme } = useTheme();
    const [active, setActive] = useState(0);
    return colorSets.map(({ seedColor, colors }, i) => (
        <IconButton
            aria-label={`Color set ${i + 1}`}
            key={i}
            onClick={() => {
                setActive(i);
                setTheme(prev => ({ ...prev, schemes: generateMaterialColors(seedColor, colors) }));
            }}
            selected={active === i}>
            {i + 1}
        </IconButton>
    ));
};

export default ColorSetButtons;
