import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Clock,
  Sparkles,
  Info,
  Sliders,
  RotateCcw,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';
import { SensorTelemetry, WeatherScenario } from '../types';
import { WEATHER_SCENARIOS, DEFAULT_TELEMETRY } from '../data/mockData';

interface DeviceSimulatorProps {
  currentTelemetry: SensorTelemetry;
  onUpdateTelemetry: (newTelemetry: SensorTelemetry) => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  currentTelemetry,
  onUpdateTelemetry,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('autumn-cool');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Custom slider state
  const [customTemp, setCustomTemp] = useState<number>(8);
  const [customHumidity, setCustomHumidity] = useState<number>(64);
  const [customPm25, setCustomPm25] = useState<number>(18);

  const handleSelectScenario = (scenario: WeatherScenario) => {
    setSelectedScenarioId(scenario.id);
    setIsCustomMode(false);
    onUpdateTelemetry({
      temperature: scenario.temperature,
      feelsLike: scenario.feelsLike,
      humidity: scenario.humidity,
      pm25: scenario.pm25,
      uvIndex: scenario.uvIndex,
      pressure: 754,
      timestamp: '2 минуты назад',
      source: 'demo',
    });
  };

  const calculateRecommendation = (temp: number, humidity: number, pm25: number) => {
    let summary = '';
    let items: string[] = [];
    let footwear = '';
    let accessories: string[] = [];

    if (temp <= -5) {
      summary = 'Зимний пуховик + тёплые вещи';
      items = ['тёплый пуховик или парка', 'термобельё', 'утеплённые брюки'];
      accessories.push('шерстяная шапка', 'плотные варежки/перчатки', 'тёплый шарф');
      footwear = 'зимние утеплённые ботинки';
    } else if (temp <= 10) {
      summary = 'Тёплая куртка + лёгкий шарф';
      items = ['тёплая демисезонная куртка', 'длинные брюки / джинсы'];
      accessories.push('лёгкий шарф');
      if (temp < 6) accessories.push('тонкая шапка по желанию');
      footwear = 'закрытая обувь / ботинки';
    } else if (temp <= 18) {
      summary = 'Лёгкая куртка или ветровка';
      items = ['ветровка или джинсовая куртка', 'лонгслив или свитер', 'брюки / джинсы'];
      footwear = 'кроссовки или городские кеды';
    } else {
      summary = 'Лёгкая одежда (футболка + шорты)';
      items = ['футболка или льняная рубашка', 'шорты или лёгкие брюки'];
      accessories.push('солнцезащитные очки');
      footwear = 'сандалии или лёгкие кроссовки';
    }

    if (pm25 > 50) {
      accessories.push('Респираторная маска FFP2 (высокий уровень пыли)');
    }

    if (humidity > 80 && temp > 0) {
      accessories.push('Зонт или водоотталкивающая пропитка');
    }

    return { summary, items, footwear, accessories };
  };

  const handleSliderChange = (temp: number, hum: number, pm: number) => {
    setIsCustomMode(true);
    setCustomTemp(temp);
    setCustomHumidity(hum);
    setCustomPm25(pm);

    // simple wind chill approximation
    const feels = Math.round(temp - (hum > 70 ? 2 : 0) - (temp < 10 ? 3 : 0));

    onUpdateTelemetry({
      temperature: temp,
      feelsLike: feels,
      humidity: hum,
      pm25: pm,
      uvIndex: temp > 20 ? 5 : 1,
      pressure: 754,
      timestamp: 'Только что (симулятор)',
      source: 'demo',
    });
  };

  // Determine air quality label & badge
  const getAirQualityInfo = (pm: number) => {
    if (pm <= 20) {
      return { label: 'Чистый воздух', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    }
    if (pm <= 35) {
      return { label: 'Умеренное', color: 'text-teal-400', bg: 'bg-teal-500/20' };
    }
    if (pm <= 55) {
      return { label: 'Повышенное', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    }
    return { label: 'Загрязнённый', color: 'text-rose-400', bg: 'bg-rose-500/20' };
  };

  const activeRec = isCustomMode
    ? calculateRecommendation(customTemp, customHumidity, customPm25)
    : WEATHER_SCENARIOS.find((s) => s.id === selectedScenarioId)?.recommendation ||
      WEATHER_SCENARIOS[0].recommendation;

  const aqi = getAirQualityInfo(currentTelemetry.pm25);

  return (
    <section id="device" className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Физический интерфейс & Реалистичный экран
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Экран устройства AirWall
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Полноцветный дисплей передаёт главную информацию без лишнего шума. Смените погодный сценарий ниже, чтобы увидеть реакцию устройства в реальном времени.
          </p>
        </div>

        {/* Demo Mode Explicit Disclaimer Banner */}
        <div className="mb-10 max-w-2xl mx-auto bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold block mb-0.5">Демонстрационный режим (Demo Mode)</span>
            Все значения на экране и графиках являются демонстрационными и смоделированы для иллюстрации работы алгоритмов. Они не являются медицинскими рекомендациями.
          </div>
        </div>

        {/* Main Grid: Device Enclosure Render on Left + Scenario Switcher on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Realistic 3D-Printed Wall-Mounted Device */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Wall Shadow & Backing */}
              <div className="absolute inset-0 bg-slate-900/10 rounded-3xl blur-xl transform translate-y-6 scale-95 -z-10"></div>

              {/* 3D-Printed Device Housing */}
              <div className="relative bg-[#2D3139] border-4 border-[#1E2229] rounded-[2.5rem] p-6 shadow-2xl text-white transition-all duration-300">
                {/* 3D-Print subtle layer line texture overlay */}
                <div className="absolute inset-0 rounded-[2.3rem] opacity-5 pointer-events-none bg-[repeating-linear-gradient(0deg,#fff,#fff_1px,transparent_1px,transparent_3px)]"></div>

                {/* Top: Ventilation Grille (Precision Engineered Slots) */}
                <div className="mb-5 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1.5" title="Вентиляционная решётка датчиков">
                    <span className="w-6 h-1 rounded-full bg-[#1E2229]"></span>
                    <span className="w-8 h-1 rounded-full bg-[#1E2229]"></span>
                    <span className="w-6 h-1 rounded-full bg-[#1E2229]"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      AirWall Core
                    </span>
                  </div>
                </div>

                {/* Glass Bezel & IPS Color Screen */}
                <div className="relative bg-black rounded-2xl p-5 border border-slate-700/80 shadow-inner overflow-hidden">
                  {/* Subtle Screen Glare Reflex */}
                  <div className="absolute top-0 right-0 w-48 h-32 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none rounded-tr-2xl"></div>

                  {/* Top Status Bar of Screen */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-teal-400 font-mono text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                      <span>Сенсоры: ONLINE</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{currentTelemetry.timestamp}</span>
                    </div>
                  </div>

                  {/* Primary Temperature Block */}
                  <div className="py-4 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                          {currentTelemetry.temperature > 0
                            ? `+${currentTelemetry.temperature}`
                            : currentTelemetry.temperature}
                          °C
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Ощущается как{' '}
                        <span className="text-slate-200 font-semibold">
                          {currentTelemetry.feelsLike > 0
                            ? `+${currentTelemetry.feelsLike}`
                            : currentTelemetry.feelsLike}
                          °C
                        </span>
                      </p>
                    </div>

                    {/* Air Quality Meter */}
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                        Качество воздуха
                      </p>
                      <p className="text-lg font-bold font-mono text-white tabular-nums">
                        PM2.5 — {currentTelemetry.pm25}{' '}
                        <span className="text-xs font-normal text-slate-400">µg/m³</span>
                      </p>
                      <span
                        className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md mt-0.5 ${aqi.bg} ${aqi.color}`}
                      >
                        {aqi.label}
                      </span>
                    </div>
                  </div>

                  {/* Secondary Metrics Bar */}
                  <div className="grid grid-cols-2 gap-3 py-2.5 px-3 bg-slate-900/80 rounded-xl border border-slate-800/80 my-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">Влажность</span>
                        <span className="text-sm font-bold font-mono text-white tabular-nums">
                          {currentTelemetry.humidity}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">УФ-индекс</span>
                        <span className="text-sm font-bold font-mono text-white tabular-nums">
                          UV {currentTelemetry.uvIndex ?? 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card on Device Screen */}
                  <div className="mt-3 p-3.5 bg-gradient-to-r from-teal-950/60 to-slate-900 rounded-xl border border-teal-500/30">
                    <div className="flex items-center justify-between text-[11px] font-medium text-teal-300 mb-1">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        Рекомендация:
                      </span>
                      <span className="text-[10px] text-slate-400">На выходе</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-snug">
                      «{activeRec.summary}»
                    </p>
                    {activeRec.accessories && activeRec.accessories.length > 0 && (
                      <p className="text-[11px] text-teal-200/90 mt-1">
                        + {activeRec.accessories.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Screen Bottom Micro-Label */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>ДЕМО-РЕЖИМ</span>
                    <span>SHT31 + PMS5003</span>
                  </div>
                </div>

                {/* Bottom of Device Enclosure: Wall Mount Latch Notch & USB Slot */}
                <div className="mt-4 flex items-center justify-between px-3 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full border border-slate-600 bg-slate-800"></span>
                    <span>Магнитный замок QuickRelease</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 font-mono">
                    <span>USB-C 5V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Weather Scenario Switcher & Custom Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Интерактивное тестирование условий
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Переключайте готовые погодные сценарии или двигайте ползунки, чтобы проверить логику рекомендаций и отображение на дисплее.
              </p>
            </div>

            {/* Presets List */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Готовые погодные сценарии
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WEATHER_SCENARIOS.map((scenario) => {
                  const isSelected = selectedScenarioId === scenario.id && !isCustomMode;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectScenario(scenario)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? 'text-teal-900' : 'text-slate-900'
                          }`}
                        >
                          {scenario.label}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1 line-clamp-1">
                        {scenario.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Sliders Drawer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <Sliders className="w-4 h-4 text-teal-600" />
                  <span>Ручная симуляция датчиков</span>
                </div>
                {isCustomMode && (
                  <button
                    onClick={() => handleSelectScenario(WEATHER_SCENARIOS[0])}
                    className="text-[11px] text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Сброс на +8°C</span>
                  </button>
                )}
              </div>

              {/* Temp Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Температура:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {customTemp > 0 ? `+${customTemp}` : customTemp}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="35"
                  step="1"
                  value={customTemp}
                  onChange={(e) =>
                    handleSliderChange(Number(e.target.value), customHumidity, customPm25)
                  }
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Humidity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Влажность:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {customHumidity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="1"
                  value={customHumidity}
                  onChange={(e) =>
                    handleSliderChange(customTemp, Number(e.target.value), customPm25)
                  }
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>

              {/* PM2.5 Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Качество воздуха PM2.5:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {customPm25} µg/m³
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="1"
                  value={customPm25}
                  onChange={(e) =>
                    handleSliderChange(customTemp, customHumidity, Number(e.target.value))
                  }
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
