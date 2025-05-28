'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFooter } from '@/sanity/lib/queries';
import { FaFacebook, FaTwitter } from "react-icons/fa";

interface FooterData {
  logo?: {
    asset: {
      url: string;
    };
  }; 
  description?: string;
  columns?: {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
  socialLinks?: {
    platform: string;
    url: string;
    icon: string;
  }[];
  bottomLinks?: {
    label: string;
    url: string;
  }[];
  copyright?: string;
}

const getButtonIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "facebook":
      return <FaFacebook className="w-5 h-5 mr-2" />;
    case "twitter":
      return <FaTwitter className="w-5 h-5 mr-2" />;
    default:
      return null;
  }
};

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await getFooter();
        setFooterData(data);
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      }
    };

    fetchFooter();
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-12">
        {/* Top section: Logo, Description, and Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Description Column */}
          <div className="md:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-4">
              {footerData?.logo?.asset?.url && (
                <Image
                  src={footerData.logo.asset.url}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
               {/* Placeholder for Appline text if logo is missing or beside logo */}
               {!footerData?.logo?.asset?.url && <span className="text-2xl font-bold">Appline</span>}
            </Link>
            <p className="text-gray-600 text-sm">
              {footerData?.description || 'This membership will help you plan and execute a variety of projects.'}
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {footerData?.columns?.map((column, i) => (
            <div key={i} className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2 text-sm">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.url} className="text-gray-600 hover:text-gray-900">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section: Copyright, Social Links, and Bottom Links */}
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">

          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p>{footerData?.copyright || `© ${new Date().getFullYear()} Appline. All rights reserved`}</p>
          </div>

          {/* Social Links */}
          {footerData && footerData.socialLinks && footerData.socialLinks.length > 0 && (
            <div className="flex justify-center md:justify-start gap-4 mb-4 md:mb-0">
              {footerData.socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  aria-label={social.platform}
                >
                  {/* Replace with icons if you use a library like react-icons or FontAwesome */}
                  {getButtonIcon(social.platform)} {/* Placeholder for icon */}
                </Link>
              ))}
            </div>
          )}

          {/* Bottom Links (Privacy, Terms) */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerData?.bottomLinks?.map((link, index) => (
              <Link key={index} href={link.url} className="text-gray-600 hover:text-gray-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}