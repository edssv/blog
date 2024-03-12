'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import { PostPreview } from '@/components/post-preview';
import type { GetPostListResponse } from '@/services/post.service';
import { PostService } from '@/services/post.service';

export function PostList({ initialData }: { initialData: GetPostListResponse }) {
  const [posts, setPosts] = React.useState(initialData.docs);
  const [nextPage, setNextPage] = React.useState(initialData.nextPage);
  const [loading, setLoading] = React.useState(false);

  const lastPostRef = React.useRef<HTMLElement>(null);

  const { entry, ref } = useInView({
    root: lastPostRef.current,
    threshold: 1
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await PostService.getPostList(nextPage, 20);

      setPosts((state) => [...state, ...res.docs]);
      setNextPage(res.nextPage);
      setLoading(false);
    };

    if (entry?.isIntersecting && nextPage !== null) {
      fetchData();
    }
  }, [nextPage, entry]);

  const featuredPost = posts[0];

  return (
    <>
      <PostPreview
        key={featuredPost.id}
        featured
        cover={featuredPost.cover}
        createdAt={featuredPost.createdAt}
        description={featuredPost.description}
        id={featuredPost.id}
        title={featuredPost.title}
      />
      <div className='flex flex-wrap items-center'>
        {posts.slice(1).map((post) => (
          <PostPreview
            key={post.id}
            cover={post.cover}
            createdAt={post.createdAt}
            description={post.description}
            id={post.id}
            title={post.title}
          />
        ))}
      </div>
      {!!posts?.length && !loading && <div ref={ref} />}
      {loading && [...new Array(4)].map(() => <PostPreview.Skeleton />)}
    </>
  );
}
