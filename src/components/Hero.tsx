import React from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Wind, Eye } from 'lucide-react';
import { ASSETS } from '../assets';

interface HeroProps {
  onExploreDevice: () => void;
  onHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDevice, onHowItWorks }) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background subtle architectural grid accents */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
                <span>Инженерная разработка</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>3D-печатный корпус</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>IoT-микроклимат</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] [text-wrap:balance]">
                Что надеть сегодня?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
                  Узнай за секунду.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                AirWall измеряет условия на улице и превращает данные датчиков в понятные рекомендации.
              </p>
            </div>

            {/* Core Idea Highlight Quote */}
            <div className="border-l-2 border-teal-500 pl-4 py-1 bg-teal-50/40 rounded-r-lg">
              <p className="text-sm font-medium text-slate-800 italic">
                «Посмотри на стену — и сразу узнай, что происходит на улице и как к этому подготовиться».
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreDevice}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Посмотреть устройство</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>

              <button
                onClick={onHowItWorks}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-xs transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Как это работает</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Hardware Proof Specs */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold font-mono text-slate-900 tabular-nums">0.12 мм</p>
                <p className="text-xs text-slate-500 mt-0.5">Точность 3D-печати</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-slate-900 tabular-nums">±0.2°C</p>
                <p className="text-xs text-slate-500 mt-0.5">Погрешность сенсора</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-slate-900 tabular-nums">&lt; 1 сек</p>
                <p className="text-xs text-slate-500 mt-0.5">Время до подсказки</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visualization of the Wall-Mounted Device */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Device Image Container with subtle shadow & architectural border */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 group">
                <img
                  src={ASSETS.hero}
                  alt="AirWall 3D-печатное настенное устройство микроклимата"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle technical annotation overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl p-3.5 shadow-md flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <div>
                      <span className="font-semibold text-slate-900 block">Инженерный прототип v2.1</span>
                      <span className="text-slate-500 text-[11px]">PETG матовый корпус · Сенсоры откалиброваны</span>
                    </div>
                  </div>
                  <button
                    onClick={onExploreDevice}
                    className="px-3 py-1.5 font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Интерактивный экран</span>
                  </button>
                </div>
              </div>

              {/* Decorative engineering corner ticks */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-slate-300 pointer-events-none"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-slate-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
