import React, { useState } from 'react';
import {
  Shirt,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const ClothingAdvisor: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(2); // Default is +8°C tier

  const tiers = [
    {
      id: 0,
      range: '+25°C и выше',
      tag: '+25°C',
      title: 'Лёгкая одежда',
      items: ['футболка или льняная рубашка', 'шорты или лёгкие хлопковые брюки', 'сандалии / открытая обувь'],
      extras: ['головной убор от солнца', 'SPF защита'],
      accent: 'from-amber-500/10 to-orange-500/10 border-amber-300',
      tagBg: 'bg-amber-100 text-amber-900',
      reason: 'При высоких температурах приоритет отдаётся терморегуляции и защите от ультрафиолета.',
    },
    {
      id: 1,
      range: '+15°C ... +20°C',
      tag: '+15°C',
      title: 'Лёгкая куртка',
      items: ['ветровка или джинсовая куртка', 'лонгслив / свитшот', 'брюки / джинсы'],
      extras: ['городские кроссовки'],
      accent: 'from-emerald-500/10 to-teal-500/10 border-emerald-300',
      tagBg: 'bg-emerald-100 text-emerald-900',
      reason: 'Комфортный межсезонный диапазон. Защита от свежего ветра при сохранении лёгкости.',
    },
    {
      id: 2,
      range: '+5°C ... +10°C',
      tag: '+5°C / +8°C',
      title: 'Тёплая куртка',
      items: ['тёплая демисезонная куртка', 'длинные брюки / плотные джинсы', 'закрытая обувь'],
      extras: ['лёгкий шарф', 'тонкая шапка по желанию'],
      accent: 'from-teal-500/10 to-cyan-500/10 border-teal-400',
      tagBg: 'bg-teal-100 text-teal-900',
      reason: 'Осенне-весенний холод с повышенной влажностью. Требуется защита шеи и ветрозащитный слой.',
    },
    {
      id: 3,
      range: 'Ниже 0°C (до −15°C)',
      tag: '−10°C',
      title: 'Зимняя одежда',
      items: ['зимний пуховик или парка', 'термобельё', 'утеплённые брюки'],
      extras: ['шерстяная шапка', 'тёплые перчатки или варежки', 'зимняя обувь с протектором'],
      accent: 'from-blue-500/10 to-indigo-500/10 border-blue-300',
      tagBg: 'bg-blue-100 text-blue-900',
      reason: 'Отрицательные температуры требуют многослойности для сохранения тепла тела.',
    },
  ];

  return (
    <section id="clothing" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Алгоритм гардероба
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Что надеть: от цифр сенсоров к ясному решению
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Вместо абстрактных графиков пользователь сразу видит конкретный совет для выхода из дома.
          </p>
        </div>

        {/* Big Showcase Example Requested by Brief */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden mb-12">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Big Temperature and Status */}
            <div className="md:col-span-5 space-y-3 border-b md:border-b-0 md:border-r border-slate-700/80 pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-teal-400">
                Пример автоматической рекомендации
              </span>
              <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
                Сегодня +8°C
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Влажность: 64% · Ветер умеренный · PM2.5: 18
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Автоматический расчёт завершён</span>
              </div>
            </div>

            {/* Right side: Clear Clothing Items List */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Рекомендуем:</h3>
              </div>

              <ul className="space-y-2.5 text-base sm:text-lg font-medium text-slate-100">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                  <span>тёплую куртку</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                  <span>длинные брюки</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                  <span>закрытую обувь</span>
                </li>
              </ul>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                <span>Дополнительно: лёгкий шарф по желанию</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Explicit Explanation Note as required */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <p className="text-sm sm:text-base text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 leading-relaxed font-medium">
            «Рекомендация формируется на основе температуры, влажности и других доступных погодных параметров. Это бытовая подсказка, а не медицинская рекомендация.»
          </p>
        </div>

        {/* Examples Matrix as Requested by Brief */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Матрица погодных диапазонов и одежды
            </h3>
            <span className="text-xs text-slate-500">Нажмите на карточку для просмотра состава</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => {
              const isSelected = activeTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/40 shadow-sm ring-2 ring-teal-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {tier.tag}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${tier.tagBg}`}>
                        {tier.range}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">{tier.title}</h4>

                    <ul className="text-xs text-slate-600 space-y-1.5 mb-3">
                      {tier.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">·</span>
                          <span className="capitalize">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    {tier.reason}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
