import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from 'astro/container';
import type { ComponentProps } from 'astro/types';
import { screen } from '@testing-library/dom';
type AstroComponentFactory = Parameters<AstroContainer['renderToString']>[0];

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<
  ContainerRenderOptions,
  'props'
> & {
  // see:
  // @ts-expect-error ComponentProps expects a type that extends a function of arity 1, but
  // AstroComponentFactory is a function of arity 3. Either this is an internal mix up in Astro,
  // or I'm missing something.
  props?: Partial<ComponentProps<T>>;
};

/**
 * Clean up the DOM before each test to avoid test interference
 */
export const cleanupDom = () => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';

};

/**
 * Render an Astro component for testing purposes
 *
 * @param Component The Astro component to render
 * @param options   The options to pass to the renderer
 * @returns         testing-library's screen with the rendered Element in the body
 */
export async function render<T extends AstroComponentFactory>(
  Component: T,
  options?: ComponentContainerRenderOptions<T>,
) {
  const container = await AstroContainer.create();
  document.body.innerHTML = await container.renderToString(Component, options);
  return screen;
}

/**
 * Render an Astro component for testing purposes
 *
 * @param Component The Astro component to render
 * @param options   The options to pass to the renderer
 * @returns         The rendered component's HTML as strin
 */
export async function renderToString<T extends AstroComponentFactory>(
  Component: T,
  options?: ComponentContainerRenderOptions<T>,
): Promise<string> {
  const container = await AstroContainer.create();
  return await container.renderToString(Component, options);
}

