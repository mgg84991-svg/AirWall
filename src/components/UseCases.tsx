import React from 'react';
import { Home, School, Building2, Factory, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../assets';

export const UseCases: React.FC = () => {
  const cases = [
    {
      icon: Home,
      title: 'Дом & Квартира',
      subtitle: 'Прихожая у входной двери',
      desc: 'Быстро узнать условия на улице перед выходом. Не нужно искать смартфон или смотреть прогноз в приложениях — бросил взгляд на стену и надел подходящую куртку.',
      benefit: 'Экономия 5 минут с утра для каждого члена семьи',
      accent: 'text-teal-600 bg-teal-50',
    },
    {
      icon: School,
      title: 'Школа & Детский сад',
      subtitle: 'Вестибюль и классы',
      desc: 'Мониторинг условий внутри и снаружи здания. Учителя и воспитатели точно знают, пора ли надевать шапки детям на прогулку и безопасен ли индекс PM2.5.',
      benefit: 'Безопасность прогулок и контроль чистоты воздуха',
      accent: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Building2,
      title: 'Офис & Коворкинг',
      subtitle: 'Входные зоны и холлы',
      desc: 'Информация о микроклимате и качестве воздуха. Помогает сотрудникам ориентироваться перед обеденным выходом и регулировать проветривание в помещениях.',
      benefit: 'Забота о самочувствии и продуктивности команды',
      accent: 'text-cyan-600 bg-cyan-50',
    },
    {
      icon: Factory,
      title: 'Предприятия & Склады',
      subtitle: 'Проходные и цеховые переходы',
      desc: 'Установка нескольких станций для мониторинга окружающей среды. Контроль запылённости воздуха на территории и условий труда персонала.',
      benefit: 'Соответствие экологическим стандартам',
      accent: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FBFBFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Сценарии применения
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Для кого создан AirWall
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Компактный настенный форм-фактор гармонично вписывается как в уютную прихожую квартиры, так и в общественные пространства.
          </p>
        </div>

        {/* 2-Column Layout: Lifestyle Photo on Left + 4 Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo Render */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={ASSETS.interior}
                alt="AirWall в интерьере квартиры у выхода"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
              <span>Типовая установка на уровне глаз (160 см)</span>
              <span className="font-mono text-teal-700">Магнитный замок</span>
            </div>
          </div>

          {/* 4 Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cases.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item.benefit}</span>
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
