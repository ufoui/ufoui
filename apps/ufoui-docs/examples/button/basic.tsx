'use client';

import { Button } from '@ufoui/core';

export function ButtonBasicExample() {
    return <Button filled label="Get started" />;
}

export function ButtonVariantsExample() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button label="Default" />
            <Button outlined label="Outlined" />
            <Button tonal label="Tonal" />
            <Button filled label="Filled" />
        </div>
    );
}
