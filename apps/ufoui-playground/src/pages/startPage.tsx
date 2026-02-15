import { Article, H1, H2, P } from '@ufoui/core';

export const StartPage = () => {
  return (
    <Article className="max-w-[640px]" font="bodyLarge" gap={16}>
      <H1>UFO UI Playground</H1>

      <P>
        This app is used during development of the UFO UI library. It includes
        most components at various stages of development. You can preview them,
        inspect their behavior and interactions, and for many components
        experiment with different props and settings.
      </P>

      <H2>Code as reference</H2>

      <P>
        The application source code can also serve as a real-world reference for
        how UFO UI components are composed and configured in practice.
      </P>

      <P font="bodySmall">
        Not all components are production-ready and some APIs may still change.
      </P>

      <P font="bodySmall">
        Use the navigation on the left to explore available components.
      </P>
    </Article>
  );
};
