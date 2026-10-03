import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Radio,
  Cpu,
  Binary,
  Sparkles,
  Tv,
  ArrowRight,
  ArrowDown,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const steps = [
    {
      id: 0,
      name: 'Улица',
      sub: 'Внешняя среда',
      icon: CloudSun,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      time: 't = 0 мс',
      description: 'Непрерывное физическое состояние атмосферы: реальная температура, влажность, взвесь аэрозолей и пыльцы.',
      techNote: 'Воздух поступает в конвекционный заборный канал прибора без предварительного нагрева.',
    },
    {
      id: 1,
      name: 'Датчики',
      sub: 'Замер параметров',
      icon: Radio,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      time: 't = 120 мс',
      description: 'Термогигрометр SHT31 и лазерный счётчик частиц PMS5003 преобразуют физические величины в цифровые сигналы I2C/UART.',
      techNote: 'Многократная выборка 10 раз/сек для отсечения случайных сквозняков.',
    },
    {
      id: 2,
      name: 'Микроконтроллер',
      sub: 'Аппаратный узел',
      icon: Cpu,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      time: 't = 250 мс',
      description: 'Двухъядерный ESP32-S3 считывает буферы, применяет калибровочные поправки и фильтрацию шумов (скользящее среднее).',
      techNote: 'Локальное исполнение без облака: прибор полностью автономен.',
    },
    {
      id: 3,
      name: 'Обработка данных',
      sub: 'Климатическая модель',
      icon: Binary,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      time: 't = 380 мс',
      description: 'Вычисление эффективной температуры (Heat Index / Wind Chill), точки росы и индекса загрязнения AQI PM2.5.',
      techNote: 'Математическая матрица учитывает субъективное ощущение холода при высокой влажности.',
    },
    {
      id: 4,
      name: 'Рекомендация',
      sub: 'Генерация подсказки',
      icon: Sparkles,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      time: 't = 450 мс',
      description: 'Бытовая подсказка по одежде: куртка, обувь, шарф или головной убор, а также предупреждение о смоге.',
      techNote: 'Бытовой ориентир без медицинских утверждений, мгновенно понятный человеку.',
    },
    {
      id: 5,
      name: 'Экран устройства',
      sub: 'Мгновенный показ',
      icon: Tv,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      time: 't = 500 мс',
      description: 'Вывод на IPS-дисплей устройства на стене. Человек смотрит на экран и сразу готов к выходу на улицу.',
      techNote: 'Высокий контраст текста для считывания с дистанции до 3 метров за 1 секунду.',
    },
  ];

  // Auto animation of data pulse
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  return (
    <section className="py-16 lg:py-24 bg-[#FBFBFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Алгоритмический конвейер
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Как это работает: путь данных от улицы к человеку
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            От забора наружного воздуха до готовой рекомендации проходит меньше половины секунды. Вся обработка происходит прямо на микроконтроллере устройства.
          </p>
        </div>

        {/* Step Flow Ribbon (Desktop Horizontal / Mobile Vertical) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Цикл обновления телеметрии (каждые 120 сек)
            </span>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-xs font-medium text-teal-700 hover:text-teal-900 cursor-pointer"
            >
              {autoPlay ? 'Пауза анимации' : 'Включить автопереход'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div key={step.id} className="relative flex flex-col">
                  <button
                    onClick={() => {
                      setAutoPlay(false);
                      setActiveStep(index);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer h-full flex flex-col justify-between ${
                      isActive
                        ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-2 ring-teal-600/10'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl ${step.bgColor}`}>
                          <Icon className={`w-4 h-4 ${step.color}`} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">0{index + 1}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-tight mb-0.5">
                        {step.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">{step.sub}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                      <span className={isActive ? 'text-teal-700 font-bold' : 'text-slate-400'}>
                        {step.time}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                      )}
                    </div>
                  </button>

                  {/* Flow Arrow (Hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Explanation Box */}
          <div className="mt-8 p-5 bg-slate-50 border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  Этап 0{activeStep + 1}: {steps[activeStep].name}
                </span>
                <span className="text-xs text-slate-400">· {steps[activeStep].sub}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {steps[activeStep].description}
              </p>
              <p className="text-xs text-slate-500 italic">{steps[activeStep].techNote}</p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-teal-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Задержка: {steps[activeStep].time}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
