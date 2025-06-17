import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Heart, Sunrise, Star, RefreshCw } from 'lucide-react';

const BuddhismPaliApp = () => {
  const [currentContent, setCurrentContent] = useState(null);
  const [contentType, setContentType] = useState('mixed');
  const [streak, setStreak] = useState(1);
  const [lastVisit, setLastVisit] = useState(new Date().toDateString());

  const teachingsContent = [
    {
      type: 'teaching',
      title: 'The Four Noble Truths',
      content: 'Life contains suffering (dukkha), suffering arises from attachment (samudaya), suffering can cease (nirodha), and there is a path to end suffering (magga).',
      pali: 'Cattāri Ariyasaccāni',
      reflection: 'How might understanding impermanence help reduce your attachments today?'
    },
    {
      type: 'teaching',
      title: 'Loving-Kindness',
      content: 'May all beings be happy, may all beings be healthy, may all beings be at peace, may all beings be free from suffering.',
      pali: 'Mettā',
      reflection: 'Can you extend this loving-kindness to someone you find difficult?'
    },
    {
      type: 'teaching',
      title: 'Mindfulness',
      content: 'The present moment is the only time over which we have dominion. Awareness of breath, body, feelings, and mind brings us home to ourselves.',
      pali: 'Sati',
      reflection: 'What can you notice about your breath right now?'
    },
    {
      type: 'pali',
      title: 'Pali Word: Dukkha',
      content: 'Suffering, dissatisfaction, stress. Not just pain, but the unsatisfactory nature of conditioned existence.',
      pali: 'dukkha',
      pronunciation: 'dook-kah',
      reflection: 'Where do you notice dukkha in your daily experience?'
    },
    {
      type: 'pali',
      title: 'Pali Word: Anicca',
      content: 'Impermanence. Everything that arises must pass away. This is the nature of all conditioned phenomena.',
      pali: 'anicca',
      pronunciation: 'ah-nee-chah',
      reflection: 'What in your life right now exemplifies anicca?'
    },
    {
      type: 'teaching',
      title: 'Right Speech',
      content: 'Speak truthfully, avoid harsh words, gossip, and idle chatter. Words have the power to heal or harm.',
      pali: 'Sammā-vācā',
      reflection: 'How can you practice more mindful speech today?'
    },
    {
      type: 'pali',
      title: 'Pali Word: Karuṇā',
      content: 'Compassion. The trembling of the heart in response to suffering, coupled with the commitment to help.',
      pali: 'karuṇā',
      pronunciation: 'kah-roo-nah',
      reflection: 'How can you cultivate compassion for yourself today?'
    },
    {
      type: 'teaching',
      title: 'The Middle Way',
      content: 'Avoid extremes of indulgence and severe asceticism. Find the balanced path between luxury and deprivation.',
      pali: 'Majjhimā Paṭipadā',
      reflection: 'Where in your life might you find more balance?'
    },
    {
      type: 'teaching',
      title: 'Noble Eightfold Path',
      content: 'Right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration. The complete path to liberation.',
      pali: 'Ariya Aṭṭhaṅgika Magga',
      reflection: 'Which aspect of the path calls for your attention today?'
    },
    {
      type: 'pali',
      title: 'Pali Word: Saṅgha',
      content: 'Community of practitioners. The third jewel of Buddhism, representing spiritual friendship and mutual support.',
      pali: 'saṅgha',
      pronunciation: 'sang-hah',
      reflection: 'How can you cultivate supportive spiritual community?'
    }
  ];

  const getRandomContent = () => {
    const filteredContent = contentType === 'mixed' 
      ? teachingsContent 
      : teachingsContent.filter(item => item.type === contentType);
    
    return filteredContent[Math.floor(Math.random() * filteredContent.length)];
  };

  const refreshContent = () => {
    setCurrentContent(getRandomContent());
  };

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      setStreak(prev => prev + 1);
      setLastVisit(today);
    }
    
    if (!currentContent) {
      setCurrentContent(getRandomContent());
    }
  }, [currentContent, lastVisit]);

  const getContentIcon = () => {
    if (!currentContent) return <BookOpen className="h-6 w-6" />;
    return currentContent.type === 'teaching' ? <Heart className="h-6 w-6" /> : <Star className="h-6 w-6" />;
  };

  const getGradientClass = () => {
    if (!currentContent) return 'from-blue-500 to-purple-600';
    return currentContent.type === 'teaching' 
      ? 'from-amber-500 to-orange-600' 
      : 'from-emerald-500 to-teal-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center mb-4">
            <Sunrise className="h-8 w-8 text-amber-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Daily Dharma</h1>
          </div>
          <p className="text-gray-600 text-sm">Your daily journey into Buddhism & Pali</p>
          <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
            <span className="bg-amber-100 px-3 py-1 rounded-full">
              🔥 {streak} day streak
            </span>
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: 'mixed', label: 'Mixed' },
            { key: 'teaching', label: 'Teachings' },
            { key: 'pali', label: 'Pali' }
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => {
                setContentType(option.key);
                setCurrentContent(null);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                contentType === option.key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        {currentContent && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className={`bg-gradient-to-r ${getGradientClass()} p-6 text-white`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {getContentIcon()}
                  <span className="ml-2 text-sm font-medium opacity-90">
                    {currentContent.type === 'teaching' ? 'Buddhist Teaching' : 'Pali Study'}
                  </span>
                </div>
                <button
                  onClick={refreshContent}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-2">{currentContent.title}</h2>
              {currentContent.pronunciation && (
                <p className="text-sm opacity-90 italic">
                  Pronunciation: {currentContent.pronunciation}
                </p>
              )}
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentContent.content}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Pali term:</p>
                <p className="font-semibold text-gray-800 text-lg">{currentContent.pali}</p>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">Daily Reflection:</p>
                <p className="text-sm text-gray-700 italic">
                  {currentContent.reflection}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={refreshContent}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Get New Content
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Come back tomorrow for new wisdom ✨
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-6">
          <p className="text-xs text-gray-400">
            "The mind is everything. What you think you become." - Buddha
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuddhismPaliApp;
