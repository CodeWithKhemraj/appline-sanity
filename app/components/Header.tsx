'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHeader } from '@/sanity/lib/queries';

interface MenuItem {
  title: string;
  url: string;
  subItems?: { title: string; url: string }[];
}

interface AuthLink {
  title: string;
  url: string;
  isButton: boolean;
}

interface HeaderData {
  logo?: {
    asset: {
      url: string;
    };
  };
  menuItems?: MenuItem[];
  authLinks?: AuthLink[];
}

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setTimeoutId(id);
  };

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const data = await getHeader();
        setHeaderData(data);
      } catch (error) {
        console.error('Failed to fetch header data:', error);
      }
    };

    fetchHeader();
  }, []);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {headerData?.logo?.asset?.url && (
              <Image
                src={headerData.logo.asset.url}
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            )}
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {headerData?.menuItems?.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subItems?.length ? (
                  <>
                    <span className="cursor-pointer text-gray-600 hover:text-gray-900">
                      {item.title}
                    </span>
                    <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top z-50 ${activeDropdown === index ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                      <div className="py-1 bg-white rounded-md">
                        {item.subItems.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.url}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.url || '#'}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Links */}
            {headerData?.authLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={
                  link.isButton
                    ? 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}