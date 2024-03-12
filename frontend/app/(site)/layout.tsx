import { SiteBrand } from '@/components/site-brand';
import { SiteFooter } from '@/components/site-footer';

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
            <p>Село Бронница</p>
          </div>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  );
}
