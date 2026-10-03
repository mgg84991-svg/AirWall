import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
              <span className="text-lg font-bold text-white tracking-tight">AirWall</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md">
              Инновационное настенное инженерное устройство для мониторинга погоды, микроклимата и чистоты воздуха.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-300">
            <a href="#device" className="hover:text-white transition-colors">
              Экран устройства
            </a>
            <a href="#measurements" className="hover:text-white transition-colors">
              Что измеряет
            </a>
            <a href="#clothing" className="hover:text-white transition-colors">
              Что надеть
            </a>
            <a href="#engineering" className="hover:text-white transition-colors">
              Инженерия
            </a>
            <a href="#printing" className="hover:text-white transition-colors">
              3D-печать
            </a>
            <a href="#prototype" className="hover:text-white transition-colors">
              Прототип
            </a>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            Правовая оговорка: все значения датчиков и графики на данном презентационном сайте являются демонстрационными (Demo). Рекомендации по одежде формируются на основе математических моделей комфорта и являются бытовыми подсказками, а не медицинскими предписаниями.
          </p>
          <div className="shrink-0 font-mono">
            © {new Date().getFullYear()} AirWall Project · Open Engineering
          </div>
        </div>
      </div>
    </footer>
  );
};
