# UFO UI Playground

UFO UI Playground is an internal development application used during the
development of the **UFO UI** component library.

It contains most components of the library at various stages of development
and allows previewing their behavior, interactions and configuration options.

This application is intended as a development and testing tool, not as a
production-ready demo.

---

## Purpose

- Preview UFO UI components in isolation
- Test component behavior and interactions
- Experiment with different props and configuration options
- Serve as a real-world reference for how UFO UI components are used in practice

Not all components are production-ready and some APIs may still change.

---

## Code as reference

The playground source code can be used as a practical reference for composing
and configuring UFO UI components inside a real application.

---

## Project structure

This project is part of an Nx workspace and lives alongside the core library:

- `@ufoui/core` – UFO UI component library
- `ufoui-playground` – development playground application

---

## Running the playground

From the repository root:

```
nx dev ufoui-playground
```

---

## Notes

- This is an internal development tool
- No application logic or real data is included
- UI behavior may change frequently during development
