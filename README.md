# UFO UI

UFO UI is a React UI component library implementing Material Design 3.
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

## Live preview

UFO UI Playground (preview):  
https://ufoui.kgnet.eu


## Installation
```bash
pnpm add @ufoui/core
```

## Usage

Import the global styles **once**, in a single controlled place at your
application entry point (e.g. `main.tsx`, or `app/layout.tsx` / `pages/_app.tsx`
in Next.js). The simplest path is the full stylesheet — reset plus components:

```ts
import '@ufoui/core/index.css';
```

For full control over the cascade, import the layers separately and keep your
own CSS **last**, so your overrides win at equal specificity:

```ts
import '@ufoui/core/reset.css';   // global reset / base
import '@ufoui/core/styles.css';  // components + utilities (no reset)
import './app.css';               // your overrides — last
```

If your app already ships its own reset, skip ours and import only the components:

```ts
import '@ufoui/core/styles.css';
import './app.css';
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

`ThemeProvider` is responsible only for the **dynamic** layer — theme tokens,
color schemes, and font registry generated at runtime. The **static** CSS
(reset, components, utilities) is the explicit import above, so your app stays
in control of the cascade order.

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
“UFOUI” (UFO UI) and the UFOUI logo are trademarks of the UFOUI project.
Use of the name or logo requires permission.
