import type { APIRoute } from 'astro';

// export const prerender = false;
export function getStaticPaths() {
  return [{ params: { slug: 'aaa' } }, { params: { slug: 'bbb' } }];
}

export const GET: APIRoute = ({ params, redirect }) => {
  const { slug } = params;
  const link = `http://www.bbonlink.de/${slug}`; // TODO: just an example

  if (!link) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return redirect(link, 307);
};
