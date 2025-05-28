'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHeader } from '@/sanity/lib/queries';
import { Menu, X } from 'lucide-react'; // Or use your own icons

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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = (index: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setActiveDropdown(null), 300);
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
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
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
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {headerData?.menuItems?.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subItems?.length ? (
                  <>
                    <span className="cursor-pointer font-bold text-gray-600 hover:text-gray-900">
                      {item.title}
                    </span>
                    <div
                      className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top z-50 ${activeDropdown === index
                          ? 'opacity-100 scale-100 visible'
                          : 'opacity-0 scale-95 invisible'
                        }`}
                    >
                      <div className="py-1">
                        {item.subItems.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.url}
                            className="block px-4 py-2 font-bold text-sm text-gray-700 hover:bg-gray-100"
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
                    className="text-gray-600 font-bold hover:text-gray-900"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {headerData?.authLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={
                  link.isButton
                    ? 'bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-700'
                    : 'text-gray-600 font-bold hover:text-gray-900'
                }
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 md:hidden space-y-4">
            {headerData?.menuItems?.map((item, index) => (
              <div key={index}>
                {item.subItems?.length ? (
                  <details className="group">
                    <summary className="font-bold text-gray-700 cursor-pointer">
                      {item.title}
                    </summary>
                    <div className="pl-4 mt-2 space-y-1">
                      {item.subItems.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.url}
                          className="block text-sm text-gray-600 hover:text-gray-900"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.url || '#'}
                    className="block font-bold text-gray-700 hover:text-gray-900"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Links (Mobile) */}
            {headerData?.authLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={
                  link.isButton
                    ? 'block w-full text-center bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700'
                    : 'block text-gray-600 font-bold hover:text-gray-900'
                }
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
