import { env } from '@/env.mjs';
import type { SiteConfig } from '@/types/types';

export const siteConfig: SiteConfig = {
  name: 'Ноктюрн',
  description: 'Ноктюрн - современный музыкальный сервис, который дарит вам доступ к бесконечному музыкальному миру.',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  links: { vkProfile: 'https://vk.com/sysoeev' },
  creator: 'Эдуард Сысоев'
};
