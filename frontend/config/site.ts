import { env } from '@/env.mjs';
import type { SiteConfig } from '@/types/types';

export const siteConfig: SiteConfig = {
  name: 'село Бронница',
  description:
    'Самые свежие новости и события села - у нас на портале! Будь в курсе всех событий в нашем уютном поселении. Информация о жизни сельского района, культурных мероприятиях и интересных событиях. Подписывайся и не упускай важные новости!',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: { vkProfile: 'https://vk.com/sysoeev' },
  creator: 'Эдуард Сысоев'
};
