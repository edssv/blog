'use client';

import { ThemeProvider } from 'next-themes';

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider enableSystem attribute='class' defaultTheme='dark'>
      {children}
    </ThemeProvider>
  );
}
