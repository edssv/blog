import type { Icons } from '@/components/icons';

type SocialShareConfig = {
  items: { title: string; icon: keyof typeof Icons }[];
};

export const socialShareConfig: SocialShareConfig = {
  items: [
    {
      title: 'VK',
      icon: 'vk'
    },
    {
      title: 'OK',
      icon: 'ok'
    },
    {
      title: 'Telegram',
      icon: 'telegram'
    }
  ]
};
