import React from 'react';
import {
  Zap,
  Cpu,
  Wrench,
  Palette,
  CheckCircle2,
  Printer,
  Scale,
  Clock,
  Layers,
} from 'lucide-react';
import { ASSETS } from '../assets';

export const Why3DPrinting: React.FC = () => {
  const advantages = [
    {
      title: 'Быстрое прототипирование',
      desc: 'Новый корпус можно разработать и напечатать без дорогостоящего производства пресс-форм.',
      icon: Zap,
      benefit: 'Итерация за 4 часа вместо 6 недель',
    },
    {
      title: 'Модульность',
      desc: 'Конструкцию можно адаптировать под разные сенсоры.',
      icon: Cpu,
      benefit: 'Сменные слоты под BME680, SPS30 или UV',
    },
    {
      title: 'Ремонтопригодность',
      desc: 'Компоненты можно заменить без полной замены устройства.',
      icon: Wrench,
      benefit: 'Разборка за 30 секунд без повреждения защёлок',
    },
    {
      title: 'Индивидуальный дизайн',
      desc: 'Корпус можно адаптировать под разные помещения.',
      icon: Palette,
      benefit: 'Выбор текстуры и оттенка под интерьер',
    },
  ];

  return (
    <section id="printing" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explanations and 4 Advantages */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
                Аддитивное производство
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
                Почему 3D-печать — идеальная основа для AirWall
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Традиционное литьё под давлением сковывает развитие продукта. 3D-печать позволяет непрерывно совершенствовать аэродинамику датчиков и выпускать обновления «по воздуху» в виде обновленных моделей.
              </p>
            </div>

            {/* 4 Cards Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantages.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-[#FBFBFC] hover:border-teal-500/50 hover:bg-white hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-teal-100/70 text-teal-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    <p className="text-[11px] font-semibold text-teal-700 pt-1 border-t border-slate-200/60">
                      {item.benefit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual of 3D Printing in Action + Print Specs Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src={ASSETS.printing}
                alt="Процесс 3D-печати корпуса AirWall на точном принтере"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span>CoreXY 3D Print Studio</span>
                </div>
                <span className="text-slate-400">PETG Matte Black</span>
              </div>
            </div>

            {/* Print Parameters Card */}
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-500">Толщина слоя</p>
                <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">0.16 мм</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Заполнение</p>
                <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">25% Gyroid</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Время печати</p>
                <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">4.2 ч</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Вес детали</p>
                <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">86 г</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
