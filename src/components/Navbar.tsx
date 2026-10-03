import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenApiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApiModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Устройство', href: '#device' },
    { label: 'Что измеряет', href: '#measurements' },
    { label: 'Что надеть', href: '#clothing' },
    { label: 'Инженерия', href: '#engineering' },
    { label: '3D-печать', href: '#printing' },
    { label: 'Прототип', href: '#prototype' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFC]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-teal-500/20 group-hover:scale-110 transition-transform"></span>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
            AirWall
          </span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative hover:text-slate-900 transition-colors py-1 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenApiModal}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Cpu className="w-3.5 h-3.5 text-teal-600" />
            <span>Open API / Датчики</span>
          </button>
          <a
            href="#device"
            onClick={(e) => handleScrollTo(e, '#device')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Интерактивный экран
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Открыть меню"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApiModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              Архитектура API и датчиков
            </button>
            <a
              href="#device"
              onClick={(e) => handleScrollTo(e, '#device')}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Посмотреть экран устройства
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
