/* eslint-disable @typescript-eslint/no-use-before-define */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import {
  SmartDrawerContent,
  SmartDrawerDescription,
  SmartDrawerTitle,
  SmartDrawerHeader,
  SmartDrawer,
  SmartDrawerTrigger
} from '@/components/smart-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { socialShareConfig } from '@/config/share';
import { env } from '@/env.mjs';

interface SharePostProps {
  data: {
    title: string;
    image: string;
  };
  children: React.ReactNode;
}

export function SharePost({ children, data }: SharePostProps) {
  return (
    <SmartDrawer>
      <SmartDrawerTrigger asChild>{children}</SmartDrawerTrigger>
      <SmartDrawerContent>
        <SmartDrawerHeader className='text-left'>
          <SmartDrawerTitle>Поделиться</SmartDrawerTitle>
          <SmartDrawerDescription>Скопировать ссылку или поделиться в социальных сетях.</SmartDrawerDescription>
        </SmartDrawerHeader>
        <ShareDialogBody data={data} />
      </SmartDrawerContent>
    </SmartDrawer>
  );
}

const ShareDialogBody = ({ data }: { data: SharePostProps['data'] }) => {
  const pathname = usePathname();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const url = `${env.NEXT_PUBLIC_APP_URL}${pathname}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className='grid gap-4 p-4 lg:pb-0'>
      <div className='flex gap-4 lg:grid lg:grid-cols-3'>
        {socialShareConfig.items.map(({ icon, title }) => {
          const Icon = Icons[icon || 'share'];

          return (
            <Link
              key={title}
              className='flex size-12 flex-col items-center justify-center rounded-md border-2 bg-popover p-2 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground lg:size-auto lg:justify-between lg:p-4'
              target='_blank'
              href={
                {
                  vk: `https://vk.com/share.php?url=${url}&title=${data.title}&image=${data.image}`,
                  ok: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.title=${data.title}&st.shareUrl=${url}`,
                  telegram: `https://t.me/share/url?url=${url}&text=${data.title}`
                }[title.toLocaleLowerCase()] || '/'
              }
            >
              <Icon className='size-5 lg:mb-3 lg:size-6' />
              <span className='hidden lg:inline-block'>{title}</span>
            </Link>
          );
        })}
      </div>
      <Separator className='my-2 lg:my-4' />
      <div className='flex lg:space-x-2'>
        <Input readOnly className='hidden lg:block' value={url} />
        <Button
          className='shrink-0'
          variant='secondary'
          onClick={() => {
            copyToClipboard();
            setHasCopied(true);
          }}
        >
          {hasCopied ? <Icons.check className='size-4' /> : <Icons.copy className='size-4' />}
          <span className='ml-2 lg:hidden'>Копировать ссылку</span>
        </Button>
      </div>
    </div>
  );
};
