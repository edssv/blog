import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

import { Icons } from '@/components/icons';
import { PostShareButton } from '@/components/post-share-button';
import { buttonVariants } from '@/components/ui/button';
import { env } from '@/env.mjs';
import { getPublicUrl } from '@/lib/get-public-url';
import { absoluteUrl, absoluteUrlImageFromPayload, cn, formatDate } from '@/lib/utils';
import { PostService } from '@/services/post.service';

import { BlogPageContent } from './components/blog-page-content';

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
  ogUrl.searchParams.set('image', post.cover.url!);
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(getPublicUrl.blog(post.id)),
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
    <article className='container relative max-w-3xl p-6 sm:px-8 lg:py-10'>
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-[-200px] top-14 hidden xl:inline-flex')}
        href={getPublicUrl.home()}
      >
        <Icons.chevronLeft className='mr-2 size-4' />
        Все статьи
      </Link>
      <div>
        <time className='block text-sm text-muted-foreground' dateTime={post.createdAt}>
          Опубликовано {formatDate(post.createdAt)}
        </time>
        <h1 className='mt-2 inline-block text-4xl leading-tight lg:text-5xl'>
          <Balancer>{post.title}</Balancer>
        </h1>
        <p className='my-4 text-lg'>
          <Balancer>{post.description}</Balancer>
        </p>
        <PostShareButton
          post={{ image: absoluteUrlImageFromPayload(post.cover.url!), title: post.title }}
          size='sm'
          variant='outline'
        >
          <Icons.share /> <span className='ml-2'>Поделиться</span>
        </PostShareButton>
      </div>
      <div className='lg:-mx-10 xl:-mx-12'>
        <Image
          priority
          alt={post.title}
          className='my-8 w-full rounded-3xl bg-muted transition-colors'
          height={405}
          src={absoluteUrlImageFromPayload(post.cover.url!)}
          width={720}
        />
      </div>
      <BlogPageContent postContent={post.content} />
      <hr className='mb-3 mt-12' />
      <div className='mb-6 flex justify-between'>
        <Link className={cn(buttonVariants({ variant: 'ghost' }))} href={getPublicUrl.home()}>
          <Icons.chevronLeft className='mr-2 size-4' />
          Все статьи
        </Link>
        <PostShareButton
          post={{ image: absoluteUrlImageFromPayload(post.cover.url!), title: post.title }}
          size='sm'
          variant='outline'
        >
          <Icons.share /> <span className='ml-2'>Поделиться</span>
        </PostShareButton>
      </div>
    </article>
  );
}
