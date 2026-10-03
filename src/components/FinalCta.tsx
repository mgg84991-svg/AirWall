import React, { useState } from 'react';
import { ArrowRight, Download, CheckCircle2, Box, Send, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onExploreEngineering: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onExploreEngineering }) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('maker');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setTimeout(() => {
      // simulate file download prompt
      const dummyContent = 'solid airwall_case_demo\n facet normal 0 0 0\n  outer loop\n   vertex 0 0 0\n   vertex 1 0 0\n   vertex 1 1 0\n  endloop\n endfacet\nendsolid airwall_case_demo';
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AirWall_FrontCase_Demo_v2.stl';
      a.click();
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-teal-400">
              <span>Инженерный проект открытого типа</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Open Hardware</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
              От данных — к простому решению.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
              AirWall объединяет 3D-печать, механику, электронику и программирование в одном физическом устройстве.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreEngineering}
                className="px-6 py-3.5 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Изучить конструкцию</span>
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </button>

              <button
                onClick={() => setDownloadModalOpen(true)}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-400" />
                <span>Скачать 3D-модель (демо STL)</span>
              </button>
            </div>

            {/* Quiet Trust Metrics */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-slate-400 font-mono">
              <div>
                <span className="text-white font-bold block text-sm">Open Hardware</span>
                <span>Чертежи корпуса и схема</span>
              </div>
              <div>
                <span className="text-white font-bold block text-sm">FDM / SLS Ready</span>
                <span>Оптимизировано под печать</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-white font-bold block text-sm">ESP-IDF / Arduino</span>
                <span>Открытый стек прошивки</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Download Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setDownloadModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    CAD-пакет корпуса AirWall
                  </h3>
                  <p className="text-xs text-slate-500">
                    STL / STEP файлы для 3D-печати и лазерной резки
                  </p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Укажите email для получения ссылки на скачивание архива (STL лицевой панели, монтажного кронштейна и STL дефлектора датчиков):
                  </p>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maker@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Для чего планируете использовать:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white"
                    >
                      <option value="maker">Для дома / личный проект DIY</option>
                      <option value="school">Для школы / кружка робототехники</option>
                      <option value="office">Для офиса / мониторинга климата</option>
                      <option value="commercial">Партнёрство и производство</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-teal-400" />
                      <span>Скачать архив моделей (.STL)</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Файл AirWall_FrontCase_Demo_v2.stl сформирован!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Скачивание началось автоматически. Также мы отправили копию документации на {email}.
                  </p>
                  <button
                    onClick={() => {
                      setDownloadModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900"
                  >
                    Вернуться к сайту
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
