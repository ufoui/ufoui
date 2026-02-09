import { Article } from '@ufoui/core';

export const StartPage = () => {
  return (
    <Article className="uui-font-body-large max-w-[640px]" gap={16}>
      <h1 className="uui-font-display-medium">UFO UI Playground</h1>

      <p>
        This app is used during development of the UFO UI library. It includes
        most components at various stages of development. You can preview them,
        inspect their behavior and interactions, and for many components
        experiment with different props and settings.
      </p>

      <h2 className="uui-font-title-large">Code as reference</h2>

      <p>
        The application source code can also serve as a real-world reference for
        how UFO UI components are composed and configured in practice.
      </p>

      <p className="uui-font-body-small">
        Not all components are production-ready and some APIs may still change.
      </p>

      <p className="uui-font-body-small">
        Use the navigation on the left to explore available components.
      </p>
    </Article>
  );
};
