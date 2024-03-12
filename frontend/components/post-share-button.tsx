'use client';

import * as React from 'react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { SharePost } from './share-post';

type PostShareButtonProps = ButtonProps & { post: { image: string; title: string } } & {
  children: React.ReactNode;
};

export function PostShareButton({ children, className, post, variant = 'ghost', ...props }: PostShareButtonProps) {
  return (
    <SharePost data={post}>
      <Button className={cn('hover:bg-transparent', className)} variant={variant} {...props}>
        {children}
      </Button>
    </SharePost>
  );
}
