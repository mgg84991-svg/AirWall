import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Tv,
  Wind,
  Wifi,
  Zap,
  Shield,
  Sliders,
  ChevronRight,
  Maximize2,
  Box,
} from 'lucide-react';
import { ASSETS } from '../assets';
import { EXPLODED_PARTS } from '../data/mockData';
import { ExplodedPart } from '../types';

export const ExplodedEngineering: React.FC = () => {
  const [explosionLevel, setExplosionLevel] = useState<number>(60); // 0 to 100%
  const [activePartId, setActivePartId] = useState<number>(1);

  const activePart = EXPLODED_PARTS.find((p) => p.id === activePartId) || EXPLODED_PARTS[0];

  const getPartIcon = (id: number) => {
    switch (id) {
      case 1:
        return Box;
      case 2:
        return Tv;
      case 3:
        return Cpu;
      case 4:
        return Wind;
      case 5:
        return Wind;
      case 6:
        return Wifi;
      case 7:
        return Zap;
      case 8:
        return Shield;
      default:
        return Layers;
    }
  };

  return (
    <section id="engineering" className="py-16 lg:py-24 bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Разнесённый вид (Exploded View)
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Инженерия: анатомия устройства AirWall
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Каждый элемент спроектирован для надежной работы, бесшумной вентиляции сенсорной зоны и быстрой сборки без клея.
          </p>
        </div>

        {/* Interactive Exploded View Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Exploded Render + Interactive Slider */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Интерактивная 3D-модель слоёв
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                Разнесение: {explosionLevel}%
              </span>
            </div>

            {/* Exploded Render Image with dynamic scale/spacing reaction */}
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/10] flex items-center justify-center group">
              <img
                src={ASSETS.exploded}
                alt="AirWall exploded view разобранная 3D модель устройства"
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: `scale(${1 + (explosionLevel - 50) * 0.0015})`,
                  filter: `contrast(${1 + explosionLevel * 0.0005})`,
                }}
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Overlay Tags for key parts on exploded view */}
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                    CAD REV 4.2 · PETG + PCB
                  </span>
                  <span className="bg-teal-900/80 backdrop-blur-xs text-teal-200 text-[11px] font-mono px-2.5 py-1 rounded-md">
                    8 конструктивных узлов
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>0% (Устройство собрано)</span>
                <span className="text-teal-700 font-semibold">Раздвинуть детали</span>
                <span>100% (Максимальный разнос)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={explosionLevel}
                onChange={(e) => setExplosionLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Active Part Quick Card */}
            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200/80 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-teal-600 text-white shrink-0 mt-0.5">
                {React.createElement(getPartIcon(activePart.id), { className: 'w-5 h-5' })}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-teal-800">
                    Узел #{activePart.id}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{activePart.name}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{activePart.description}</p>
                <div className="pt-1 flex flex-wrap gap-2">
                  {activePart.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 Labeled Engineering Components List */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
              Спецификация компонентов (выберите узел)
            </span>

            <div className="space-y-2">
              {EXPLODED_PARTS.map((part) => {
                const isCurrent = part.id === activePartId;
                const IconComponent = getPartIcon(part.id);

                return (
                  <button
                    key={part.id}
                    onClick={() => setActivePartId(part.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'border-teal-600 bg-white shadow-xs ring-2 ring-teal-600/10'
                        : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isCurrent ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {part.id}
                      </span>
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {part.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{part.material}</p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isCurrent ? 'text-teal-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
