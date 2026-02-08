# UFOUI

UFOUI is a React UI component library implementing Material Design 3.
It focuses on simplicity, low dependency count, and small bundle size.

The library is designed to be used as a single import, without additional required packages beyond React.

## Goals
- Full Material Design 3 implementation
- Minimal bundle size
- No heavy runtime dependencies
- Suitable for both open-source and commercial products

## Status
This project is currently in early development (v0.x).
The API may change.

## Installation
```bash
pnpm add @ufoui/core
```

## Usage

Import the global styles **once** at your application entry point:

```ts
import '@ufoui/core/style.css';
```

Wrap your application with `ThemeProvider` and use components:

```tsx
import { ThemeProvider, Button } from '@ufoui/core';

function App() {
  return (
    <ThemeProvider>
      <Button label="Save" filled />
    </ThemeProvider>
  );
}
```

`ThemeProvider` is responsible for providing theme tokens and color schemes.
All components rely on CSS variables defined in the global stylesheet.

### Theming

You can customize the theme by providing a seed color:

```tsx
<ThemeProvider seedColor="#6750A4">
  <App />
</ThemeProvider>
```

## License
Apache License 2.0

## Trademark
“UFOUI” and the UFOUI logo are trademarks of the UFOUI project.
Use of the name or logo requires permission.
