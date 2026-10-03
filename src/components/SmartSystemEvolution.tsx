import React from 'react';
import {
  Layers,
  Sparkles,
  Network,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { EVOLUTION_VERSIONS } from '../data/mockData';

export const SmartSystemEvolution: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Эволюция аппаратной платформы
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Умная система: масштабируемая архитектура AirWall
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Модульный 3D-печатный корпус и гибкая микроконтроллерная шина I2C позволяют расширять функционал устройства без изменения общей компоновки.
          </p>
        </div>

        {/* Versions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVOLUTION_VERSIONS.map((item, index) => {
            const isCurrent = item.status === 'current';
            const isFuture = item.status === 'future';

            return (
              <div
                key={index}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'border-teal-500 bg-teal-50/30 shadow-md ring-2 ring-teal-500/10'
                    : 'border-slate-200/90 bg-[#FBFBFC] hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Version header badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {item.version}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        item.status === 'implemented'
                          ? 'bg-slate-100 text-slate-700'
                          : isCurrent
                          ? 'bg-teal-600 text-white'
                          : item.status === 'in_development'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-indigo-100 text-indigo-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.name}</h3>

                  {/* Sensors list */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Сенсоры:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {item.sensors.map((s, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Возможности:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {item.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-slate-400">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Статус</span>
                  <span className="font-semibold text-slate-800">
                    {item.status === 'implemented' && 'Пройдено'}
                    {item.status === 'current' && 'Актуальный образец'}
                    {item.status === 'in_development' && 'R&D этап'}
                    {item.status === 'future' && 'В концепции'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mesh & City Network Note */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs">
              <Network className="w-4 h-4" />
              <span>Глобальная концепция: AirWall Mesh Network</span>
            </div>
            <p className="text-base font-semibold text-white">
              Единая сеть сотен настенных станций формирует сверхточную карту экологии района
            </p>
            <p className="text-xs text-slate-300 max-w-2xl">
              Данные с устройств в домах и школах синхронизируются, помогая обнаружить локальные выбросы пыли или микроклиматические аномалии.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-slate-400 border border-slate-700 rounded-lg px-3 py-2">
            P2P Mesh + MQTT
          </div>
        </div>
      </div>
    </section>
  );
};
