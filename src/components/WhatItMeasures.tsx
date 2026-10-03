import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Activity,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { HISTORICAL_CHART_DATA } from '../data/mockData';

export const WhatItMeasures: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'temp' | 'pm25' | 'humidity'>('temp');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
    {
      id: 'temp',
      title: 'Температура',
      icon: Thermometer,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/60',
      borderColor: 'border-rose-200',
      activeBorder: 'border-rose-500',
      value: '+8.0°C',
      delta: 'Ощущается как +5°C',
      description: 'Точное измерение температуры окружающего воздуха.',
      details: 'Используется высокоточный калиброванный MEMS-сенсор SHT31 с терморазвязкой от нагревательных элементов корпуса.',
    },
    {
      id: 'humidity',
      title: 'Влажность',
      icon: Droplets,
      iconColor: 'text-cyan-500',
      bgColor: 'bg-cyan-50/60',
      borderColor: 'border-cyan-200',
      activeBorder: 'border-cyan-500',
      value: '64%',
      delta: 'Оптимальный диапазон',
      description: 'Помогает оценить реальное ощущение погоды.',
      details: 'При высокой влажности мороз кажется сильнее, а жара переносится тяжелее. Сенсор учитывает эффект точки росы.',
    },
    {
      id: 'pm25',
      title: 'Качество воздуха',
      icon: Wind,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50/60',
      borderColor: 'border-teal-200',
      activeBorder: 'border-teal-500',
      value: '18 µg/m³',
      delta: 'PM2.5 / PM10 (Норма)',
      description: 'Измерение концентрации мелких частиц PM2.5/PM10.',
      details: 'Лазерный оптический датчик взвешенных частиц фиксирует дорожную пыль, микрокапли смога и продукты горения.',
    },
    {
      id: 'uv',
      title: 'Уровень UV',
      icon: Sun,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200',
      activeBorder: 'border-amber-500',
      value: 'Индекс 1',
      delta: 'Низкая солнечная радиация',
      description: 'При наличии соответствующего сенсора устройство может учитывать уровень ультрафиолета.',
      details: 'Позволяет заблаговременно напомнить о солнцезащитных очках, кепке или защитном креме с SPF фактором.',
    },
  ];

  // SVG Chart Dimensions
  const chartHeight = 200;
  const chartWidth = 700;
  const paddingX = 40;
  const paddingY = 30;

  const data = HISTORICAL_CHART_DATA;

  // Compute points based on active metric
  const getValue = (item: (typeof data)[0]) => {
    if (activeMetric === 'temp') return item.temperature;
    if (activeMetric === 'pm25') return item.pm25;
    return item.humidity;
  };

  const values = data.map(getValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const points = data.map((item, index) => {
    const x = paddingX + (index / (data.length - 1)) * (chartWidth - 2 * paddingX);
    const val = getValue(item);
    const y = chartHeight - paddingY - ((val - minVal) / range) * (chartHeight - 2 * paddingY);
    return { x, y, val, time: item.time };
  });

  // Build SVG path
  const linePath = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  // Fill area under path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${
    points[0].x
  } ${chartHeight - paddingY} Z`;

  const getMetricColor = () => {
    if (activeMetric === 'temp') return { stroke: '#E11D48', fill: 'url(#gradient-temp)', accent: 'text-rose-600' };
    if (activeMetric === 'pm25') return { stroke: '#0D9488', fill: 'url(#gradient-pm25)', accent: 'text-teal-600' };
    return { stroke: '#0284C7', fill: 'url(#gradient-hum)', accent: 'text-cyan-600' };
  };

  const metricColors = getMetricColor();

  return (
    <section id="measurements" className="py-16 lg:py-24 bg-[#FBFBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Сенсорный комплекс & Аналитика
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Что измеряет AirWall
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Устройство непрерывно сканирует параметры наружной среды. Высокоточная калибровка и защищённая сенсорная камера гарантируют честные показания без ложных искажений.
          </p>
        </div>

        {/* 4 Interactive Parameter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {cards.map((card) => {
            const Icon = card.icon;
            const isChartSelected =
              (card.id === 'temp' && activeMetric === 'temp') ||
              (card.id === 'pm25' && activeMetric === 'pm25') ||
              (card.id === 'humidity' && activeMetric === 'humidity');

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (card.id === 'temp' || card.id === 'pm25' || card.id === 'humidity') {
                    setActiveMetric(card.id);
                  }
                }}
                className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isChartSelected
                    ? 'border-teal-500 shadow-md ring-2 ring-teal-500/10'
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${card.bgColor}`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {card.delta}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{card.title}</h3>
                  <p className="text-sm font-semibold text-slate-800 mb-2">{card.description}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{card.details}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-900 text-base tabular-nums">
                    {card.value}
                  </span>
                  {card.id !== 'uv' ? (
                    <span
                      className={`text-[11px] font-medium transition-colors ${
                        isChartSelected ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {isChartSelected ? 'График активен' : 'Смотреть график →'}
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-600 font-medium">Опциональный сенсор</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Charts Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>Суточный тренд (24 часа) · Демонстрационный набор данных</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeMetric === 'temp' && 'Динамика температуры (°C)'}
                {activeMetric === 'pm25' && 'Концентрация взвешенных микрочастиц PM2.5 (µg/m³)'}
                {activeMetric === 'humidity' && 'Относительная влажность воздуха (%)'}
              </h3>
            </div>

            {/* Metric Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setActiveMetric('temp')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeMetric === 'temp'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Температура
              </button>
              <button
                onClick={() => setActiveMetric('pm25')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeMetric === 'pm25'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Частицы PM2.5
              </button>
              <button
                onClick={() => setActiveMetric('humidity')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeMetric === 'humidity'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Влажность
              </button>
            </div>
          </div>

          {/* SVG Smooth Graph */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto min-w-[550px] select-none"
            >
              <defs>
                <linearGradient id="gradient-temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradient-pm25" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradient-hum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Grid Lines */}
              {[0, 0.33, 0.66, 1].map((ratio, i) => {
                const y = paddingY + ratio * (chartHeight - 2 * paddingY);
                return (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Shaded Area */}
              <path d={areaPath} fill={metricColors.fill} />

              {/* Main Line */}
              <path
                d={linePath}
                fill="none"
                stroke={metricColors.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Points */}
              {points.map((p, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : 4}
                      fill="white"
                      stroke={metricColors.stroke}
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all"
                    />

                    {/* Time Label on X Axis */}
                    <text
                      x={p.x}
                      y={chartHeight - 8}
                      fontSize="10"
                      textAnchor="middle"
                      fill="#64748B"
                      fontFamily="monospace"
                    >
                      {p.time}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredIndex !== null && (
              <div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono shadow-lg pointer-events-none flex items-center gap-2"
              >
                <span className="text-slate-400">{points[hoveredIndex].time}</span>
                <span className="font-bold text-teal-300">
                  {points[hoveredIndex].val}
                  {activeMetric === 'temp' && '°C'}
                  {activeMetric === 'pm25' && ' µg/m³'}
                  {activeMetric === 'humidity' && '%'}
                </span>
              </div>
            )}
          </div>

          {/* Graph Footnote */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span>
              Показатели усредняются за 15-минутные интервалы на уровне микроконтроллера.
            </span>
            <span className="font-mono text-slate-400">
              Частота замера датчиков: 1 Гц (фильтрация скользящим окном)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
