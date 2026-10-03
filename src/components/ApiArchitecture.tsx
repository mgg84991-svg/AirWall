import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Server,
  Radio,
  Send,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { SensorTelemetry } from '../types';

interface ApiArchitectureProps {
  isOpen: boolean;
  onClose: () => void;
  onInjectPayload: (telemetry: SensorTelemetry) => void;
}

export const ApiArchitecture: React.FC<ApiArchitectureProps> = ({
  isOpen,
  onClose,
  onInjectPayload,
}) => {
  const [activeTab, setActiveTab] = useState<'rest' | 'mqtt' | 'esp32' | 'tester'>('rest');
  const [copied, setCopied] = useState(false);

  // Live test injector state
  const [testTemp, setTestTemp] = useState<number>(14.2);
  const [testHum, setTestHum] = useState<number>(58);
  const [testPm25, setTestPm25] = useState<number>(24);
  const [testUv, setTestUv] = useState<number>(2);
  const [injectedSuccess, setInjectedSuccess] = useState(false);

  if (!isOpen) return null;

  const jsonSample = `{
  "device_id": "airwall_unit_01",
  "firmware": "2.1.0-esp32s3",
  "timestamp": "${new Date().toISOString()}",
  "sensors": {
    "temperature_celsius": ${testTemp},
    "humidity_percent": ${testHum},
    "pm25_ug_m3": ${testPm25},
    "pm10_ug_m3": 38.0,
    "uv_index": ${testUv},
    "pressure_hpa": 1013.2
  },
  "status": {
    "battery_backup": "ok",
    "wifi_rssi_dbm": -58
  }
}`;

  const esp32Code = `// ESP32-S3 Arduino / ESP-IDF Client for AirWall
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

void sendAirWallTelemetry(float temp, float hum, float pm25) {
  HTTPClient http;
  http.begin("https://your-api-host.com/api/v1/telemetry");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-Device-Token", "SECRET_AIRWALL_KEY");

  StaticJsonDocument<256> doc;
  doc["device_id"] = "airwall_01";
  doc["sensors"]["temperature_celsius"] = temp;
  doc["sensors"]["humidity_percent"] = hum;
  doc["sensors"]["pm25_ug_m3"] = pm25;

  String requestBody;
  serializeJson(doc, requestBody);
  int httpCode = http.POST(requestBody);
  http.end();
}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTestPayload = (e: React.FormEvent) => {
    e.preventDefault();
    onInjectPayload({
      temperature: Number(testTemp),
      feelsLike: Math.round(testTemp - (testHum > 70 ? 2 : 0)),
      humidity: Number(testHum),
      pm25: Number(testPm25),
      uvIndex: Number(testUv),
      pressure: 755,
      timestamp: 'Только что (через API эмулятор)',
      source: 'api',
    });
    setInjectedSuccess(true);
    setTimeout(() => setInjectedSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Архитектура API для подключения реальных сенсоров
              </h3>
              <p className="text-xs text-slate-500">
                REST API · MQTT Брокер · Подключение физических датчиков
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('rest')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'rest'
                ? 'border-teal-600 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            REST JSON Схема
          </button>
          <button
            onClick={() => setActiveTab('esp32')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'esp32'
                ? 'border-teal-600 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            ESP32 / Arduino код
          </button>
          <button
            onClick={() => setActiveTab('mqtt')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'mqtt'
                ? 'border-teal-600 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            MQTT Топики
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tester'
                ? 'border-teal-600 text-teal-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Тест отправки в симулятор
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700">
          {activeTab === 'rest' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>POST /api/v1/telemetry</span>
                <button
                  onClick={() => handleCopy(jsonSample)}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопировано' : 'Копировать JSON'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto">
                {jsonSample}
              </pre>
              <p className="text-xs text-slate-500">
                Формат полностью унифицирован: любой физический микроконтроллер (ESP32, Raspberry Pi Pico W, STM32 с модулем связи) может отправлять данные в формате JSON по защищённому протоколу HTTPS.
              </p>
            </div>
          )}

          {activeTab === 'esp32' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>C++ / Arduino IDE / PlatformIO</span>
                <button
                  onClick={() => handleCopy(esp32Code)}
                  className="flex items-center gap-1 text-teal-700 hover:text-teal-900 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопировано' : 'Копировать C++'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-teal-300 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64">
                {esp32Code}
              </pre>
            </div>
          )}

          {activeTab === 'mqtt' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Для интеграции с экосистемами Home Assistant, OpenHAB и локальными брокерами Mosquitto предусмотрен протокол MQTT:
              </p>
              <div className="p-3 bg-slate-100 rounded-xl space-y-2 font-mono text-xs">
                <div>
                  <span className="text-slate-400">Топик публикации:</span>{' '}
                  <span className="text-teal-700 font-bold">devices/airwall/+/telemetry</span>
                </div>
                <div>
                  <span className="text-slate-400">Топик конфигурации:</span>{' '}
                  <span className="text-indigo-700 font-bold">devices/airwall/+/config</span>
                </div>
                <div>
                  <span className="text-slate-400">QoS:</span> 1 (At least once)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tester' && (
            <form onSubmit={handleSendTestPayload} className="space-y-4">
              <p className="text-xs text-slate-600">
                Отправьте тестовый пакет данных от внешнего датчика. Интерфейс устройства на сайте мгновенно пересчитает рекомендации по одежде и обновит дисплей.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Температура (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={testTemp}
                    onChange={(e) => setTestTemp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Влажность (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={testHum}
                    onChange={(e) => setTestHum(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    PM2.5 (µg/m³)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={testPm25}
                    onChange={(e) => setTestPm25(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    УФ Индекс (0-11)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={testUv}
                    onChange={(e) => setTestUv(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить телеметрию в AirWall</span>
                </button>

                {injectedSuccess && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Пакет успешно отправлен на экран устройства!</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Готовность к физическому оборудованию: 100%</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
