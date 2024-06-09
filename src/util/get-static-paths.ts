import { type CollectionEntry, getCollection } from 'astro:content';

interface StandaloneContentProps<T extends 'kits' | 'flyers'> {
  params: {
    lang: string;
    identifier: string;
  };
  props: {
    entry: CollectionEntry<T>;
  };
}

async function getStaticPaths<T extends 'kits' | 'flyers'>(
  collection: T,
): Promise<StandaloneContentProps<T>[]> {
  const flyerEntries = await getCollection(collection);
  return flyerEntries.map((entry: CollectionEntry<T>) => {
    return {
      params: {
        lang: entry.data.lang,
        identifier: entry.data.identifier,
        seo: entry.data.seo,
      },
      props: { entry },
    };
  });
}

export async function getStaticPathsForFlyers() {
  return getStaticPaths('flyers');
}

export async function getStaticPathsForKits() {
  return getStaticPaths('kits');
}