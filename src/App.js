import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Sunrise, Star, RefreshCw } from 'lucide-react';
import majjhimaSuttas from './majjhimaSuttas.json';

const STORAGE_KEY = 'dailySutta';

const BuddhismPaliApp = () => {
  /* ----------------------- State ----------------------- */
  // 🏷 Default filter is now **pali** (the only combined tab)
  const [currentContent, setCurrentContent] = useState(null);
  const [contentType, setContentType] = useState('pali');
  const [streak, setStreak] = useState(1);
  const [lastVisit, setLastVisit] = useState(new Date().toDateString());

  /* ------------ Static teaching / Pāli cards ----------- */
  const teachingsContent = [
    /* (keep all your teaching & pāli items here) */
    {
      type: 'sutta',
      title: 'Daily Sutta from Kinh Trung Bộ',
      content: "Today's sutta from the Majjhima Nikaya (Middle Length Discourses)",
      reflection: 'How can this sutta guide your practice today?'
    }
  ];

  /* ------------------ Helper functions ----------------- */
  const getDailySutta = () => {
    const today = new Date().toISOString().slice(0, 10);
    const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    let number;
    if (cached.date === today) {
      number = cached.suttaNumber;
    } else {
      number = majjhimaSuttas[Math.floor(Math.random() * majjhimaSuttas.length)].number;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, suttaNumber: number }));
    }
    return majjhimaSuttas.find((s) => s.number === number);
  };

  const buildSuttaCard = ({ number, vietnamese, pali }) => ({
    type: 'sutta',
    suttaNumber: number,
    suttaVietnamese: vietnamese,
    suttaPali: pali,
    title: `📖 ${number}. ${vietnamese} (${pali})`,
    englishLink: `https://suttacentral.net/mn${number}/en/sujato`,
    vietnameseLink: `https://www.budsas.org/uni/u-kinh-trungbo/trung${number}.htm`,
    audioLink: `https://www.youtube.com/results?search_query=kinh+trung+bo+${number}+${encodeURIComponent(vietnamese)}`,
    content: "Today's sutta from the Majjhima Nikaya (Middle Length Discourses)",
    reflection: 'How can this sutta guide your practice today?'
  });

  const getRandomContent = () => {
    // By default “pali” shows *everything* (teachings + pāli quotes + suttas)
    let pool = teachingsContent;
    if (contentType === 'teaching') pool = teachingsContent.filter((c) => c.type === 'teaching');
    else if (contentType === 'sutta') pool = teachingsContent.filter((c) => c.type === 'sutta');

    let card = pool[Math.floor(Math.random() * pool.length)];
    if (card.type === 'sutta') card = buildSuttaCard(getDailySutta());
    return card;
  };

  /* --------------------- Effects ----------------------- */
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      setStreak((s) => s + 1);
      setLastVisit(today);
    }
    if (!currentContent) setCurrentContent(getRandomContent());
  }, [currentContent, lastVisit]);

  /* ---------------- UI helpers ---------------- */
  const iconFor = () => {
    if (!currentContent) return <BookOpen className="h-6 w-6" />;
    if (currentContent.type === 'teaching') return <Heart className="h-6 w-6" />;
    if (currentContent.type === 'sutta') return <BookOpen className="h-6 w-6" />;
    return <Star className="h-6 w-6" />;
  };

  const gradientFor = () => {
    if (!currentContent) return 'from-blue-500 to-purple-600';
    if (currentContent.type === 'teaching') return 'from-amber-500 to-orange-600';
    if (currentContent.type === 'sutta') return 'from-purple-500 to-indigo-600';
    return 'from-emerald-500 to-teal-600';
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center mb-4">
            <Sunrise className="h-8 w-8 text-amber-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Daily Dharma</h1>
          </div>
          <p className="text-gray-600 text-sm">Your daily journey into Buddhism & Pāli</p>
          <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
            <span className="bg-amber-100 px-3 py-1 rounded-full">🔥 {streak} day streak</span>
          </div>
        </div>

        {/* Filter tabs – Mixed removed, unified under "Pāli" */}
        <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: 'pali', label: 'Pāli' }, // single combined tab
            { key: 'teaching', label: 'Teachings' },
            { key: 'sutta', label: 'Suttas' }
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setContentType(opt.key);
                setCurrentContent(null);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                contentType === opt.key ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        {currentContent && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className={`bg-gradient-to-r ${gradientFor()} p-6 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {iconFor()}
                  <span className="ml-2 text-sm font-medium opacity-90">
                    {currentContent.type === 'teaching' ? 'Teaching' : currentContent.type === 'sutta' ? 'Daily Sutta' : 'Pāli Study'}
                  </span>
                </div>
                <button onClick={() => setCurrentContent(getRandomContent())} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-2">{currentContent.title}</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">{currentContent.content}</p>
              {currentContent.vietnamese && <p className="text-gray-600 leading-relaxed mb-4 italic">{currentContent.vietnamese}</p>}

              {currentContent.pali && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">📜 Pāli:</p>
                  <p className="font-semibold text-gray-800 text-lg mb-3">{currentContent.pali}</p>
                </div>
              )}

              {currentContent.type === 'sutta' && (
                <div className="bg-purple-50 rounded-lg p-4 mb-4 text-sm">
                  <p className="font-medium text-purple-800 mb-3">📚 Study Links:</p>
                  <div className="space-y-2">
                    <a href={currentContent.englishLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"><BookOpen className="h-4 w-4 mr-2" /> English (SuttaCentral)</a>
                    <a href={currentContent.vietnameseLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"><BookOpen className="h-4 w-4 mr-2" /> Vietnamese (Budsas)</a>
                    <a href={currentContent.audioLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"><span className="mr-2">🎧</span>YouTube Audio</a>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">💭 Daily Reflection:</p>
                <p className="text-sm text-gray-700 italic">{currentContent.reflection}</p>
              </div>
            </div>
          </div>
        )}

        {/* Refresh */}
        <div className="space-y-3">
          <button onClick={() => setCurrentContent(getRandomContent())} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Get New Content
          </button>
          <p className="text-center text-xs text-gray-500">Come back tomorrow for new wisdom ✨</p>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 pb-6 text-xs text-gray-400">"The mind is everything. What you think you become." – Buddha</p>
      </div>
    </div>
  );
};

export default BuddhismPaliApp;
