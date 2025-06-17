import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Heart, Sunrise, Star, RefreshCw } from 'lucide-react';

const BuddhismPaliApp = () => {
  const [currentContent, setCurrentContent] = useState(null);
  const [contentType, setContentType] = useState('mixed');
  const [streak, setStreak] = useState(1);
  const [lastVisit, setLastVisit] = useState(new Date().toDateString());

  const majjhimaSuttas = [
    { number: 1, vietnamese: "Căn bản pháp môn", pali: "Mūlapariyāya sutta" },
    { number: 2, vietnamese: "Tất cả lậu hoặc", pali: "Sabbāsava sutta" },
    { number: 3, vietnamese: "Pháp tự thừa", pali: "Dhammadāyāda sutta" },
    { number: 4, vietnamese: "Sợ hãi và khiếp đảm", pali: "Bhayabherava sutta" },
    { number: 5, vietnamese: "Không cấu nhiễm", pali: "Anangana sutta" },
    { number: 10, vietnamese: "Niệm xứ", pali: "Satipatthāna sutta" },
    { number: 22, vietnamese: "Ví dụ con rắn", pali: "Alagaddūpama sutta" },
    { number: 26, vietnamese: "Thánh cầu", pali: "Ariyapariyesanā sutta" },
    { number: 35, vietnamese: "Tiểu kinh Saccaka", pali: "Cūlasaccaka sutta" },
    { number: 39, vietnamese: "Đại kinh tại Assapura", pali: "Mahāassapura sutta" },
    { number: 44, vietnamese: "Tiểu kinh phương tiện", pali: "Cūlavedalla sutta" },
    { number: 62, vietnamese: "Đại kinh giáo giới La-hầu-la", pali: "Mahārāhulovāda sutta" },
    { number: 79, vietnamese: "Tiểu kinh Sakuludayi", pali: "Cūlasakuludāyi sutta" },
    { number: 118, vietnamese: "Nhập tức xuất tức niệm", pili: "Ānāpānasati sutta" },
    { number: 141, vietnamese: "Phân biệt chân đế", pali: "Saccavibhanga sutta" }
  ];

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
      title: 'Pali Sentence: Kammaṃ khettaṃ, viññāṇaṃ bījaṃ',
      content: 'Kamma is the field, consciousness is the seed.',
      vietnamese: 'Nghiệp là ruộng, thức là hạt giống.',
      pali: 'Kammaṃ khettaṃ, viññāṇaṃ bījaṃ',
      vocabulary: [
        { word: 'Kammaṃ', meaning: 'action, kamma', pronunciation: '[kăm-măng]', vietnamese: 'nghiệp' },
        { word: 'Khettaṃ', meaning: 'field', pronunciation: '[khét-tăng]', vietnamese: 'ruộng' },
        { word: 'Viññāṇaṃ', meaning: 'consciousness', pronunciation: '[vin-nhā-năng]', vietnamese: 'thức' },
        { word: 'Bījaṃ', meaning: 'seed', pronunciation: '[bi-daŋ]', vietnamese: 'hạt giống' }
      ],
      grammar: 'Each clause is a noun-equation: subject + predicate, both in nominative or accusative depending on context. The verb "is" is implied. This is a metaphorical sentence common in Pāli suttas.',
      reflection: 'How do your actions today plant seeds for future consciousness?'
    },
    {
      type: 'pali',
      title: 'Pali Sentence: Mettā sabbalokakasiṇā',
      content: 'Loving-kindness pervades all worlds.',
      vietnamese: 'Từ bi thấm nhuần khắp mọi thế giới.',
      pali: 'Mettā sabbalokakasiṇā',
      vocabulary: [
        { word: 'Mettā', meaning: 'loving-kindness', pronunciation: '[mét-tā]', vietnamese: 'từ bi' },
        { word: 'Sabba', meaning: 'all', pronunciation: '[săb-ba]', vietnamese: 'tất cả' },
        { word: 'Loka', meaning: 'world', pronunciation: '[lo-ka]', vietnamese: 'thế giới' },
        { word: 'Kasiṇā', meaning: 'pervading', pronunciation: '[ka-si-nā]', vietnamese: 'thấm nhuần' }
      ],
      grammar: 'This is a compound sentence where "sabbalokakasiṇā" is a compound adjective modifying "mettā". The structure follows: noun + compound adjective.',
      reflection: 'How can you extend your loving-kindness beyond your immediate circle today?'
    },
    {
      type: 'pali',
      title: 'Pali Sentence: Sabbe saṅkhārā aniccā',
      content: 'All conditioned things are impermanent.',
      vietnamese: 'Tất cả các hành là vô thường.',
      pali: 'Sabbe saṅkhārā aniccā',
      vocabulary: [
        { word: 'Sabbe', meaning: 'all', pronunciation: '[săb-bê]', vietnamese: 'tất cả' },
        { word: 'Saṅkhārā', meaning: 'conditioned things, formations', pronunciation: '[săng-khā-rā]', vietnamese: 'các hành' },
        { word: 'Aniccā', meaning: 'impermanent', pronunciation: '[a-nít-chā]', vietnamese: 'vô thường' }
      ],
      grammar: 'Subject-predicate structure: "Sabbe saṅkhārā" (all formations) is the subject in nominative plural, "aniccā" is the predicate adjective agreeing in case and number.',
      reflection: 'What attachments can you release by remembering impermanence?'
    },
    {
      type: 'pali',
      title: 'Pali Sentence: Natthi me saraṇaṃ aññaṃ, Buddho me saraṇaṃ varaṃ',
      content: 'I have no other refuge, Buddha is my excellent refuge.',
      vietnamese: 'Con không có nơi nương tựa nào khác, Phật là nơi nương tựa tối thượng của con.',
      pali: 'Natthi me saraṇaṃ aññaṃ, Buddho me saraṇaṃ varaṃ',
      vocabulary: [
        { word: 'Natthi', meaning: 'there is not', pronunciation: '[nát-thi]', vietnamese: 'không có' },
        { word: 'Me', meaning: 'my, to me', pronunciation: '[mê]', vietnamese: 'của con' },
        { word: 'Saraṇaṃ', meaning: 'refuge, shelter', pronunciation: '[sa-ra-nang]', vietnamese: 'nơi nương tựa' },
        { word: 'Aññaṃ', meaning: 'other, another', pronunciation: '[ăn-nhang]', vietnamese: 'khác' },
        { word: 'Buddho', meaning: 'Buddha', pronunciation: '[būt-tho]', vietnamese: 'Phật' },
        { word: 'Varaṃ', meaning: 'excellent, best', pronunciation: '[va-rang]', vietnamese: 'tối thượng' }
      ],
      grammar: 'Two parallel clauses connected by contrast. "Natthi" is an existential negative. "Me" is genitive/dative. The structure emphasizes devotion through negation followed by affirmation.',
      reflection: 'What does taking refuge in the Buddha mean in your daily life?'
    },
    {
      type: 'sutta',
      title: 'Daily Sutta from Kinh Trung Bo',
      suttaNumber: null, // Will be randomly assigned
      suttaVietnamese: '',
      suttaPali: '',
      textLink: '',
      audioLink: '',
      content: 'Today\'s sutta from the Majjhima Nikaya (Middle Length Discourses)',
      reflection: 'How can this sutta guide your practice today?'
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
      pronunciation: '[ka-ru-nā]',
      vietnamese: 'từ bi',
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
      pronunciation: '[săng-gha]',
      vietnamese: 'tăng đoàn',
      reflection: 'How can you cultivate supportive spiritual community?'
    }
  ];

  const getRandomContent = () => {
    let filteredContent = teachingsContent;
    
    if (contentType === 'teaching') {
      filteredContent = teachingsContent.filter(item => item.type === 'teaching');
    } else if (contentType === 'pali') {
      filteredContent = teachingsContent.filter(item => item.type === 'pali');
    } else if (contentType === 'sutta') {
      filteredContent = teachingsContent.filter(item => item.type === 'sutta');
    }
    
    let selectedContent = filteredContent[Math.floor(Math.random() * filteredContent.length)];
    
    // If it's a sutta type, randomly assign a sutta from Majjhima
    if (selectedContent.type === 'sutta') {
      const randomSutta = majjhimaSuttas[Math.floor(Math.random() * majjhimaSuttas.length)];
      selectedContent = {
        ...selectedContent,
        suttaNumber: randomSutta.number,
        suttaVietnamese: randomSutta.vietnamese,
        suttaPali: randomSutta.pali,
        title: `📖 ${randomSutta.number}. ${randomSutta.vietnamese} (${randomSutta.pali})`,
        textLink: `https://suttacentral.net/mn${randomSutta.number}/vi/thich-minh-chau`,
        audioLink: `https://www.youtube.com/results?search_query=kinh+trung+bo+${randomSutta.number}+${encodeURIComponent(randomSutta.vietnamese)}`
      };
    }
    
    return selectedContent;
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
    if (currentContent.type === 'teaching') return <Heart className="h-6 w-6" />;
    if (currentContent.type === 'sutta') return <BookOpen className="h-6 w-6" />;
    return <Star className="h-6 w-6" />;
  };

  const getGradientClass = () => {
    if (!currentContent) return 'from-blue-500 to-purple-600';
    if (currentContent.type === 'teaching') return 'from-amber-500 to-orange-600';
    if (currentContent.type === 'sutta') return 'from-purple-500 to-indigo-600';
    return 'from-emerald-500 to-teal-600';
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
            { key: 'pali', label: 'Pali' },
            { key: 'sutta', label: 'Suttas' }
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
                    {currentContent.type === 'teaching' ? 'Buddhist Teaching' : 
                     currentContent.type === 'sutta' ? 'Daily Sutta' : 'Pali Study'}
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
              
              {currentContent.vietnamese && (
                <p className="text-gray-600 leading-relaxed mb-4 italic">
                  {currentContent.vietnamese}
                </p>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">📜 Pali:</p>
                <p className="font-semibold text-gray-800 text-lg mb-3">{currentContent.pali}</p>
                
                {currentContent.pronunciation && !currentContent.vocabulary && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Pronunciation:</span> {currentContent.pronunciation}
                    {currentContent.vietnamese && <span className="ml-2">• Vietnamese: {currentContent.vietnamese}</span>}
                  </p>
                )}
              </div>

              {currentContent.vocabulary && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-blue-800 mb-3">📖 Vocabulary:</p>
                  <div className="space-y-2">
                    {currentContent.vocabulary.map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-semibold text-gray-800">{item.word}:</span>{' '}
                        <span className="text-gray-700">{item.meaning}</span>
                        <br />
                        <span className="text-xs text-gray-500 ml-2">
                          Phát âm: {item.pronunciation} • Vietnamese: {item.vietnamese}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentContent.grammar && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-green-800 mb-2">🔍 Grammar Explanation:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentContent.grammar}
                  </p>
                </div>
              )}

              {currentContent.type === 'sutta' && (
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-purple-800 mb-3">📚 Study Links:</p>
                  <div className="space-y-2">
                    <a 
                      href={currentContent.textLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-purple-700 hover:text-purple-900 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      🔗 Đọc tại đây (SuttaCentral)
                    </a>
                    <a 
                      href={currentContent.audioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-purple-700 hover:text-purple-900 transition-colors"
                    >
                      <span className="mr-2">🎧</span>
                      YouTube audio
                    </a>
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">💭 Daily Reflection:</p>
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
