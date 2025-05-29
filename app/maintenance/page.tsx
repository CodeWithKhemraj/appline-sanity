'use client';

import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getHeader } from '@/sanity/lib/queries';
import CountdownTimer from './CountdownTimer';
import { useEffect, useState } from 'react';

interface HeaderData {
  logo?: {
    asset: {
      url: string;
    };
  };
}

//  Component name must be capitalized
export default function Page() {
  // Use NEXT_PUBLIC_ prefix for env vars in client components
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  useEffect(() => {
    if (!isMaintenance) {
      redirect('/');
    }
    
    const fetchHeader = async () => {
      try {
        const data = await getHeader();
        setHeaderData(data);
      } catch (error) {
        console.error('Failed to fetch header data:', error);
      }
    };

    fetchHeader();
  }, [isMaintenance]);

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-center items-center lg:gap-14 gap-10 inline-flex">
          {headerData?.logo?.asset?.url && (
            <Image
              src={headerData.logo.asset.url}
              alt="Logo"
              width={170}
              height={44}
              className="h-11 w-auto"
              priority
            />
          )}

          <div className="w-full flex-col justify-center items-center gap-5 flex">
            <div className="w-full flex-col justify-center items-center gap-6 flex">
              <div className="w-full flex-col justify-start items-center gap-2.5 flex">
                <h2 className="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                  Please bear with us! We&apos;re currently under maintenance.
                </h2>
                <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                  It&apos;s going to take some time to fix the error. We&apos;ll be back online in.
                </p>
              </div>

              <CountdownTimer />
            </div>

            <Image 
              src="/maintenance.png" 
              alt="under maintenance image" 
              width={800}
              height={600}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
