import type { Media, Post as PayloadPost } from 'payload-types';

import { env } from '@/env.mjs';
import type { PageInfo } from '@/lib/interfaces';

type Post = PayloadPost & { cover: Media };

export interface GetPostListResponse extends PageInfo {
  docs: Post[];
}

export const PostService = {
  async getPostList(page: number, pageSize: number) {
    const res = await fetch(`${env.NEXT_PUBLIC_PAYLOAD_API_URL}/posts?page=${page}&limit=${pageSize}`, {
      next: { revalidate: 1 }
    });
    return res.json() as Promise<GetPostListResponse>;
  },
  async getPost(id: number) {
    const res = await fetch(`${env.NEXT_PUBLIC_PAYLOAD_API_URL}/posts/${id}`, {
      cache: 'no-cache'
    });
    return res.json() as Promise<Post>;
  }
};
