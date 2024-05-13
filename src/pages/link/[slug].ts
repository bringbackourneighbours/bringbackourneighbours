import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const getFlatLinksEntries = async () => {
  const linkEntries = await getCollection('links');
  return linkEntries.reduce(
    (accumulator, currentValue) => {
      return [...accumulator, ...Object.values(currentValue.data).flat()];
    },
    [] as {
      slug: string;
      title: string;
      url: string;
      type: string;
    }[],
  );
};

export async function getStaticPaths() {
  const entries = await getFlatLinksEntries();
  return entries.map((params) => ({
    params,
  }));
}

export const GET: APIRoute = async ({ params, redirect }) => {
  const entries = await getFlatLinksEntries();

  const target = entries.find((entry) => entry.slug === params.slug);

  if (!target) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return redirect(target.url, 307);
};
