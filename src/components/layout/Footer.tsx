'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useTheme } from '@/context';

const Footer = () => {
  const { t } = useTheme();
  const quickLinks = [
    { label: t('home'), href: '/' },
    { label: t('aboutUs'), href: '#about' },
    { label: t('services'), href: '#services' },
  ];

  return (
    <footer className="bg-[#001529] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-35 h-10 transition-transform duration-300 group-hover:scale-105">
                            <Image
                              src="/Images/logo/footer.png"
                              alt="Ultra Wash Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Your clothes deserve the best—trust Ultra Wash for professional care, eco-friendly solutions, and a spotless finish.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#0F7BA0]"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#0F7BA0]"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#0F7BA0]"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#0F7BA0]"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-5">{t('quickLink')}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#0F7BA0] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
         

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-base mb-5">{t('contactInfo')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">📞</span>
                <span className="text-gray-400">+1(229)555863</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">✉️</span>
                <span className="text-gray-400">info.ultrwash@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">📍</span>
                <span className="text-gray-400">Times Square in NYC</span>
              </li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-base mb-5">{t('downloadApp')}</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-2.5 bg-white/5 rounded-lg px-4 py-2.5 transition-all duration-300 hover:bg-[#0F7BA0] group"
              >
                <FaGooglePlay className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-[8px] text-gray-500 group-hover:text-white/70 uppercase transition-colors">{t('getItOn')}</p>
                  <p className="font-semibold text-white text-sm">{t('googlePlay')}</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 bg-white/5 rounded-lg px-4 py-2.5 transition-all duration-300 hover:bg-[#0F7BA0] group"
              >
                <FaApple className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                <div>
                  <p className="text-[8px] text-gray-500 group-hover:text-white/70 uppercase transition-colors">{t('downloadOn')}</p>
                  <p className="font-semibold text-white text-sm">{t('appStore')}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Ultra Wash. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
