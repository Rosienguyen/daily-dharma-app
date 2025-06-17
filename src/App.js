import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Heart, Sunrise, Star, RefreshCw } from 'lucide-react';
// 👇 Full Majjhima‑Nikāya metadata (1‑152) lives in an external JSON so the UI stays lean.
//    Create a file `majjhimaSuttas.json` alongside this component with the structure:
//    [ { "number": 1, "vietnamese": "Căn bản pháp môn", "pali": "Mūlapariyāya" }, ... ]
import majjhimaSuttas from './majjhimaSuttas.json';

const LOCAL_STORAGE_DAILY_KEY = 'dailySutta';

const BuddhismPaliApp = () => {
  /* --------------------------------------------------
   * State
   * ------------------------------------------------*/
  const [currentContent, setCurrentContent] = useState(null);
  const [contentType, setContentType] = useState('mixed'); // Mixed now also covers all Pāli items
  const [streak, setStreak] = useState(1);
  const [lastVisit, setLastVisit] = useState(new Date().toDateString());

  /* --------------------------------------------------
   * Static teaching / Pāli snippets
   * ------------------------------------------------*/
  const teachingsContent = [
    /* … unchanged teaching & Pāli array from original code … */
    // (Truncated here for brevity ‑ copy the existing content array)
    {
      type: 'sutta',
      title: 'Daily Sutta from Kinh Trung Bộ',
      content: "Today's sutta from the Majjhima Nikaya (Middle Length Discourses)",
      reflection: 'How can this sutta guide your practice today?'
    },
    /* … the rest of your teaching/pāli entries … */
  ];

  /* --------------------------------------------------
   * Helpers
   * ------------------------------------------------*/
  /** Return the Majjhima sutta of the day (persistent within 24h) */
  const getDailySutta = () => {
    const todayKey = new Date().toISOString().slice(0, 10); // YYYY‑MM‑DD
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DAILY_KEY) || '{}');

    let chosenNumber;
    if (stored.date === todayKey && stored.suttaNumber) {
      chosenNumber = stored.suttaNumber;
    } else {
      chosenNumber = majjhimaSuttas[Math.floor(Math.random() * majjhimaSuttas.length)].number;
      localStorage.setItem(
        LOCAL_STORAGE_DAILY_KEY,
        JSON.stringify({ date: todayKey, suttaNumber: chosenNumber })
      );
    }

    return majjhimaSuttas.find((s) => s.number === chosenNumber);
  };

  /** Build a study‑card object for the given sutta metadata */
  const buildSuttaContent = (sutta) => {
    const { number, vietnamese, pali } = sutta;

    return {
      type: 'sutta',
      suttaNumber: number,
      suttaVietnamese: vietnamese,
      suttaPali: pali,
      title: `📖 ${number}. ${vietnamese} (${pali})`,
      // 📖 English translation on SuttaCentral (Bhikkhu Sujato)
      englishLink: `https://suttacentral.net/mn${number}/en/sujato`,
      // 📖 Vietnamese translation on Budsas
      vietnameseLink: `https://www.budsas.org/uni/u-kinh-trungbo/trung${number}.htm`,
      // 🎧 Typical audio search on YouTube
      audioLink: `https://www.youtube.com/results?search_query=kinh+trung+bo+${number}+${encodeURIComponent(
        vietnamese
      )}`,
      content: "Today's sutta from the Majjhima Nikaya (Middle Length Discourses)",
      reflection: 'How can this sutta guide your practice today?'
    };
  };

  /** Pick a random card according to the active filter */
  const getRandomContent = () => {
    let pool = teachingsContent;

    if (contentType === 'teaching') pool = teachingsContent.filter((i) => i.type === 'teaching');
    else if (contentType === 'sutta') pool = teachingsContent.filter((i) => i.type === 'sutta');
    // 🔔 No dedicated Pāli tab any more – it is folded into “mixed”.

    let selected = pool[Math.floor(Math.random() * pool.length)];

    // Replace placeholder with the real daily sutta
    if (selected.type === 'sutta') {
      selected = buildSuttaContent(getDailySutta());
    }

    return selected;
  };

  /* --------------------------------------------------
   * Effects
   * ------------------------------------------------*/
  // Daily streak handling + initial content
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      setStreak((prev) => prev + 1);
      setLastVisit(today);
    }

    if (!currentContent) setCurrentContent(getRandomContent());
  }, [currentContent, lastVisit]);

  /* --------------------------------------------------
   * UI helpers (icons, gradients)
   * ------------------------------------------------*/
  const getContentIcon = () => {
    if (!currentContent) return <BookOpen className="h-6 w-6" />;
    if (currentContent.type === 'teaching') return <Heart className="h-6 w-6" />;
    if (currentContent.type === 'sutta') return <BookOpen className="h-6 w-6" />;
    return <Star className="h-6 w-6" />; // Pāli inside mixed
  };

  const getGradientClass = () => {
    if (!currentContent) return 'from-blue-500 to-purple-600';
    if (currentContent.type === 'teaching') return 'from-amber-500 to-orange-600';
    if (currentContent.type === 'sutta') return 'from-purple-500 to-indigo-600';
    return 'from-emerald-500 to-teal-600';
  };

  /* --------------------------------------------------
   * Render
   * ------------------------------------------------*/
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

        {/* Content‑type switcher – Pāli tab removed */}
        <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: 'mixed', label: 'Mixed' },
            { key: 'teaching', label: 'Teachings' },
            { key: 'sutta', label: 'Suttas' }
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => {
                setContentType(option.key);
                setCurrentContent(null);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                contentType === option.key ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Main card */}
        {currentContent && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className={`bg-gradient-to-r ${getGradientClass()} p-6 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {getContentIcon()}
                  <span className="ml-2 text-sm font-medium opacity-90">
                    {currentContent.type === 'teaching' ? 'Buddhist Teaching' : currentContent.type === 'sutta' ? 'Daily Sutta' : 'Pāli Study'}
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

              {/* Pāli block */}
              {currentContent.pali && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">📜 Pāli:</p>
                  <p className="font-semibold text-gray-800 text-lg mb-3">{currentContent.pali}</p>
                </div>
              )}

              {/* Vocabulary / Grammar remain as‑is (not shown here for brevity) */}

              {/* Study links for Sutta */}
              {currentContent.type === 'sutta' && (
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-purple-800 mb-3">📚 Study Links:</p>
                  <div className="space-y-2 text-sm">
                    <a href={currentContent.englishLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
                      <BookOpen className="h-4 w-4 mr-2" /> English translation (SuttaCentral)
                    </a>
                    <a href={currentContent.vietnameseLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
                      <BookOpen className="h-4 w-4 mr-2" /> Vietnamese translation (Budsas)
                    </a>
                    <a href={currentContent.audioLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
                      <span className="mr-2">🎧</span> YouTube audio search
                    </a>
                  </div>
                </div>
              )}

              {/* Reflection */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">💭 Daily Reflection:</p>
                <p className="text-sm text-gray-700 italic">{currentContent.reflection}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="space-y-3">
          <button onClick={() => setCurrentContent(getRandomContent())} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
            <RefreshCw className="h-4 w-4 mr-2" /> Get New Content
          </button>
          <div className="text-center">
            <p className="text-xs text-gray-500">Come back tomorrow for new wisdom ✨</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-6">
          <p className="text-xs text-gray-400">"The mind is everything. What you think you become." – Buddha</p>
        </div>
      </div>
    </div>
  );
};

export default BuddhismPaliApp;
