import React, { useState } from 'react';
import {
  Compass,
  Box,
  Printer,
  Cpu,
  Gauge,
  CheckCircle2,
  Home,
  Wrench,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { TIMELINE_STEPS } from '../data/mockData';

export const PrototypeTimeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(3); // Default on 3D-печать / электроника

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return Compass;
      case 2:
        return Box;
      case 3:
        return Printer;
      case 4:
        return Cpu;
      case 5:
        return Gauge;
      case 6:
        return CheckCircle2;
      case 7:
        return Home;
      default:
        return Wrench;
    }
  };

  const current = TIMELINE_STEPS.find((s) => s.step === selectedStep) || TIMELINE_STEPS[2];

  return (
    <section id="prototype" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Инженерная хронология
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Прототип: от идеи до физического устройства на стене
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Пошаговый цикл разработки физического продукта: 7 стадий проектирования, прототипирования, пайки и тестирования.
          </p>
        </div>

        {/* Horizontal Engineering Timeline */}
        <div className="relative mb-10 overflow-x-auto pb-4">
          <div className="min-w-[780px]">
            {/* Horizontal Line connecting steps */}
            <div className="relative flex items-center justify-between">
              <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>

              {TIMELINE_STEPS.map((s) => {
                const isSelected = selectedStep === s.step;
                const Icon = getStepIcon(s.step);

                return (
                  <button
                    key={s.step}
                    onClick={() => setSelectedStep(s.step)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-md ring-4 ring-teal-500/20 scale-110'
                          : 'bg-white text-slate-700 border-2 border-slate-200 group-hover:border-teal-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono mt-2 text-slate-400">0{s.step}</span>
                    <span
                      className={`text-xs font-bold mt-0.5 max-w-[90px] text-center leading-tight transition-colors ${
                        isSelected ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Detailed Engineering Dossier */}
        <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md">
                  Стадия {current.step} из 7
                </span>
                <span className="text-xs font-medium text-slate-500">· {current.shortDesc}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">{current.title}</h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {current.fullDesc}
              </p>

              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Используемые инструменты & ПО:
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Box on Right */}
            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Инженерный артефакт
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {current.deliverable}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-medium">
                <span>Статус: Завершено</span>
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
