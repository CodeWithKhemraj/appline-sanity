'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  return (
    <>
      {!isStudio && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isStudio && <Footer />}
    </>
  );
} 