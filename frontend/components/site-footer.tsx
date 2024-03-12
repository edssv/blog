import Image from 'next/image';
import * as React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Image
            alt={`${siteConfig.name}`}
            height={32}
            sizes='20vw'
            src={`${siteConfig.url}/android-chrome-192x192.png`}
            width={32}
          />
          <p className='text-center text-sm leading-loose md:text-left'>© 2024 Eduard Sysoev</p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
