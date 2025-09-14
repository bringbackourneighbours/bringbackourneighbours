import type { ContainerRenderOptions } from 'astro/container';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-expect-error we are extending this experimental stuff
import type { AstroComponentFactory } from 'astro/runtime/server';
import type { ComponentProps } from 'astro/types';
import { screen } from '@testing-library/dom';

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<
  ContainerRenderOptions,
  'props'
> & {
  props?: Partial<ComponentProps<T>>;
};

export async function render<T extends AstroComponentFactory>(
  component: T,
  options?: ComponentContainerRenderOptions<T>,
) {
  const container = await AstroContainer.create();
  document.body.innerHTML = await container.renderToString(component, options);
  return screen;
}
