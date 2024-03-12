import { ModeToggle } from '@/components/mode-toggle';
import { SiteBrand } from '@/components/site-brand';
import { SiteFooter } from '@/components/site-footer';
import { siteConfig } from '@/config/site';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <div className='flex items-center space-x-3'>
            <SiteBrand classname='size-10' />
            <span className='hidden font-medium sm:inline-block'>{siteConfig.name}</span>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  );
}
