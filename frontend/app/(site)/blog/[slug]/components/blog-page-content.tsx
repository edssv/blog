'use client';

import { serialize } from '@/lib/serialize';

export function BlogPageContent({
  postContent
}: {
  postContent:
    | {
        [k: string]: unknown;
      }[]
    | null
    | undefined;
}) {
  return <div>{serialize(postContent)}</div>;
}
