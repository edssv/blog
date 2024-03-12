import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import SiteLogo from '@/assets/images/site-logo.png';
import { siteConfig } from '@/config/site';
import { getPublicUrl } from '@/lib/get-public-url';

export function SiteBrand({ classname }: { classname: string }) {
  return (
    <div className='flex items-center'>
      <Link className='flex w-full justify-center' href={getPublicUrl.home()}>
        <Image alt={siteConfig.name} className={classname} height={32} sizes='15vw' src={SiteLogo.src} width={32} />
      </Link>
    </div>
  );
}
