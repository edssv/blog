import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { env } from '@/env.mjs';
import { getPublicUrl } from '@/lib/get-public-url';
import { serialize } from '@/lib/serialize';
import { absoluteUrl, absoluteUrlImageFromPayload, cn, formatDate } from '@/lib/utils';
import { PostService } from '@/services/post.service';

interface PostPageProps {
  params: {
    slug: number;
  };
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug;

  const post = await PostService.getPost(slug);

  if (!post) {
    return notFound();
  }

  return post;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('heading', post.title);
  ogUrl.searchParams.set('type', 'Blog post');
  ogUrl.searchParams.set('image', absoluteUrlImageFromPayload(post.cover.url!));
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/blog/${post.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()]
    },
    other: {
      'post:published_time': post.createdAt
    }
  };
}

export async function generateStaticParams() {
  const { docs } = await PostService.getPostList(0, 1000);

  return docs.map((post) => ({
    slug: post.id.toString()
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-[-200px] top-14 hidden xl:inline-flex')}
        href={getPublicUrl.home()}
      >
        <Icons.chevronLeft className='mr-2 size-4' />
        See all posts
      </Link>
      <div>
        <time className='block text-sm text-muted-foreground' dateTime={post.createdAt}>
          Опубликовано {formatDate(post.createdAt)}
        </time>
        <h1 className='font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl'>{post.title}</h1>
      </div>
      <Image
        priority
        alt={post.title}
        className='my-8 rounded-md bg-muted transition-colors'
        height={405}
        src={absoluteUrlImageFromPayload(post.cover.url!)}
        width={720}
      />
      {serialize(post.content)}
      <hr className='mt-12' />
      <div className='flex justify-center py-6 lg:py-10'>
        <Link className={cn(buttonVariants({ variant: 'ghost' }))} href={getPublicUrl.home()}>
          <Icons.chevronLeft className='mr-2 size-4' />
          See all posts
        </Link>
      </div>
    </article>
  );
}
