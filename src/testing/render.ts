import type { ContainerRenderOptions } from 'astro/container';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-expect-error we are extending this experimental stuff
import type { AstroComponentFactory } from 'astro/runtime/server';
import { screen } from '@testing-library/dom';

export async function render(
  component: AstroComponentFactory,
  options?: ContainerRenderOptions,
) {
  const container = await AstroContainer.create();
  const renderedString = await container.renderToString(component, options);
  document.body.innerHTML = renderedString;
  return screen;
}
