import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, ExternalLink, AlertCircle } from 'lucide-react';

const DailyDharmaApp = () => {
  const [activeTab, setActiveTab] = useState('pali');
  const [dailyPali, setDailyPali] = useState(null);
  const [dailySutra, setDailySutra] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [paliData, setPaliData] = useState([]);
  const [sutraData, setSutraData] = useState({ suttaNames: {}, audioMapping: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from files or use built-in fallback data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Enhanced fallback data - will be used if files aren't found
        const fallbackPaliData = [
          {
            id: 1,
            pali: "Sabbe saṅkhārā aniccā",
            english: "All conditioned things are impermanent.",
            vietnamese: "Tất cả các hành là vô thường.",
            vocabulary: [
              { word: "Sabbe", meaning: "all", pronunciation: "[săb-bê]", vietnamese: "tất cả" },
              { word: "Saṅkhārā", meaning: "conditioned things, formations", pronunciation: "[săng-khā-rā]", vietnamese: "các hành" },
              { word: "Aniccā", meaning: "impermanent", pronunciation: "[a-nít-chā]", vietnamese: "vô thường" }
            ],
            grammar: "Subject-predicate structure: \"Sabbe saṅkhārā\" (all formations) is the subject in nominative plural, \"aniccā\" is the predicate adjective agreeing in case and number.",
            reflection: "What attachments can you release by remembering impermanence?",
            reference: "Mahāparinibbāna Sutta"
          },
          {
            id: 2,
            pali: "Sabbadānaṃ dhammadānaṃ jināti",
            english: "The gift of Dhamma excels all gifts.",
            vietnamese: "Món quà Pháp vượt trội tất cả các món quà.",
            vocabulary: [
              { word: "Sabba", meaning: "all", pronunciation: "[săb-ba]", vietnamese: "tất cả" },
              { word: "Dānaṃ", meaning: "gift, donation", pronunciation: "[dā-naṃ]", vietnamese: "món quà" },
              { word: "Dhamma", meaning: "Dhamma, teaching", pronunciation: "[dhăm-ma]", vietnamese: "Pháp" },
              { word: "Jināti", meaning: "conquers, excels", pronunciation: "[jì-nā-ti]", vietnamese: "vượt trội" }
            ],
            grammar: "Comparative structure: \"dhammadānaṃ\" (gift of Dhamma) is the subject, \"jināti\" is the verb, \"sabbadānaṃ\" is the object being compared.",
            reflection: "How can you share the gift of wisdom with others today?",
            reference: "Dhammapada 354"
          },
          {
            id: 3,
            pali: "Attā hi attano nātho",
            english: "You are your own refuge.",
            vietnamese: "Bạn là nơi nương tựa của chính mình.",
            vocabulary: [
              { word: "Attā", meaning: "self", pronunciation: "[ăt-tā]", vietnamese: "bản thân" },
              { word: "Hi", meaning: "indeed, truly", pronunciation: "[hi]", vietnamese: "thật sự" },
              { word: "Attano", meaning: "of oneself", pronunciation: "[ăt-ta-no]", vietnamese: "của mình" },
              { word: "Nātho", meaning: "refuge, protector", pronunciation: "[nā-tho]", vietnamese: "nơi nương tựa" }
            ],
            grammar: "Emphatic statement: \"attā\" (self) is the subject, \"nātho\" (refuge) is the predicate, \"hi\" adds emphasis, \"attano\" shows possession.",
            reflection: "How can you cultivate inner strength and self-reliance in your practice?",
            reference: "Dhammapada 160"
          },
          {
            id: 4,
            pali: "Mettāya pharaṇaṃ loke",
            english: "Pervading the world with loving-kindness.",
            vietnamese: "Tràn ngập thế giới bằng lòng từ bi.",
            vocabulary: [
              { word: "Mettāya", meaning: "with loving-kindness", pronunciation: "[mét-tā-ya]", vietnamese: "với lòng từ bi" },
              { word: "Pharaṇaṃ", meaning: "pervading, spreading", pronunciation: "[pha-ra-naṃ]", vietnamese: "tràn ngập" },
              { word: "Loke", meaning: "in the world", pronunciation: "[lo-ke]", vietnamese: "trong thế giới" }
            ],
            grammar: "Instrumental construction: \"mettāya\" uses instrumental case showing the means or method, \"pharaṇaṃ\" is a gerund indicating the action of pervading.",
            reflection: "How can you extend loving-kindness to difficult people in your life?",
            reference: "Metta Sutta"
          }
        ];

        const fallbackSutraData = {
          suttaNames: {
            1: "Mūlapariyāya Sutta (The Root of All Things)",
            2: "Sabbāsava Sutta (All the Taints)",
            3: "Dhammadāyāda Sutta (Heirs of the Dhamma)",
            4: "Bhayabherava Sutta (Fear and Dread)",
            5: "Anaṅgaṇa Sutta (Without Blemishes)",
            6: "Ākaṅkheyya Sutta (If a Bhikkhu Should Wish)",
            7: "Vatthūpama Sutta (The Simile of the Cloth)",
            8: "Sallekha Sutta (Effacement)",
            9: "Sammādiṭṭhi Sutta (Right View)",
            10: "Satipaṭṭhāna Sutta (The Foundations of Mindfulness)",
            42: "Verañjaka Sutta (The Brahmins of Verañja)",
            115: "Bahudhātuka Sutta (Many Kinds of Elements)"
          },
          audioMapping: {
            42: { videoId: "xlXqRg05Op0", index: 48 },
            115: { videoId: "rl75WHS5IrI", index: 123 }
          }
        };

        // Try to load Pali data from file
        try {
          let paliResponse;
          if (window.fs && window.fs.readFile) {
            paliResponse = await window.fs.readFile('pali-data.json', { encoding: 'utf8' });
          } else {
            paliResponse = await fetch('/pali-data.json').then(res => res.text());
          }
          const paliJson = JSON.parse(paliResponse);
          setPaliData(paliJson);
          console.log('✅ Successfully loaded pali-data.json');
        } catch (paliError) {
          console.log('📝 Using built-in Pali data (pali-data.json not found)');
          setPaliData(fallbackPaliData);
        }

        // Try to load Sutra data from file
        try {
          let sutraResponse;
          if (window.fs && window.fs.readFile) {
            sutraResponse = await window.fs.readFile('sutra-data.json', { encoding: 'utf8' });
          } else {
            sutraResponse = await fetch('/sutra-data.json').then(res => res.text());
          }
          const sutraJson = JSON.parse(sutraResponse);
          setSutraData(sutraJson);
          console.log('✅ Successfully loaded sutra-data.json');
        } catch (sutraError) {
          console.log('📝 Using built-in Sutra data (sutra-data.json not found)');
          setSutraData(fallbackSutraData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error in loadData:', err);
        setError('Unexpected error occurred');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Set daily content once data is loaded
  useEffect(() => {
    if (paliData.length > 0 && Object.keys(sutraData.suttaNames).length > 0) {
      // Get today's date
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      setCurrentDate(dateString);

      // Generate daily content based on date to ensure consistency
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      
      // Select daily Pali (pseudo-random based on date)
      const paliIndex = seed % paliData.length;
      setDailyPali(paliData[paliIndex]);

      // Select daily Sutra (1-152)
      const sutraNumber = (seed % 152) + 1;
      setDailySutra(generateSuttaData(sutraNumber));
    }
  }, [paliData, sutraData]);

  const generateSuttaData = (number) => {
    const suttaName = sutraData.suttaNames[number] || `Sutta ${number}`;
    const audioData = sutraData.audioMapping[number];
    
    // Generate audio link if we have the mapping, otherwise show playlist link
    let audioLink;
    if (audioData) {
      audioLink = `https://www.youtube.com/watch?v=${audioData.videoId}&list=PL8DgjWmX16apWGx0MsW2gWFfyhJz_whyR&index=${audioData.index}`;
    } else {
      // Fallback to playlist page if we don't have the specific video ID
      audioLink = `https://www.youtube.com/playlist?list=PL8DgjWmX16apWGx0MsW2gWFfyhJz_whyR`;
    }
    
    return {
      number: number,
      name: suttaName,
      vietnameseLink: `https://www.budsas.org/uni/u-kinh-trungbo/trung${number}.htm`,
      englishLink: `https://suttacentral.net/mn${number}/en/sujato?lang=en&layout=plain&reference=none&notes=asterisk&highlight=false&script=latin`,
      audioLink: audioLink,
      audioTitle: `K Trung Bộ – Kinh Số ${number} – ${suttaName.split('(')[0].trim()} giọng miền Bắc`,
      hasAudio: !!audioData
    };
  };

  const TabButton = ({ tabKey, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tabKey)}
      className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-amber-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      <span className="ml-2 text-gray-600">Loading content...</span>
    </div>
  );

  const ErrorMessage = () => (
    <div className="p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-600 mb-2">Content Loading Error</p>
      <p className="text-sm text-gray-600">
        Make sure you have uploaded the pali-data.json and sutra-data.json files.
      </p>
    </div>
  );

  const PaliTab = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;

    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BookOpen className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Pali Study</h2>
          <p className="text-sm text-gray-600">{currentDate}</p>
          <p className="text-xs text-gray-500">({paliData.length} entries • Built-in content ready)</p>
        </div>
        
        {dailyPali && (
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Pali Sentence: {dailyPali.pali}</h3>
                <p className="text-gray-800 mb-1">{dailyPali.english}</p>
                <p className="text-gray-700 italic">{dailyPali.vietnamese}</p>
              </div>
              
              <div>
                <h4 className="text-base font-bold text-gray-800 mb-2">📜 Pali:</h4>
                <p className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                  {dailyPali.pali}
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">📖 Vocabulary:</h4>
                <div className="space-y-2">
                  {dailyPali.vocabulary.map((vocab, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-bold">{vocab.word}:</span> {vocab.meaning} 
                      <span className="text-gray-600"> Phát âm: {vocab.pronunciation} • Vietnamese: {vocab.vietnamese}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-800 mb-2">🔍 Grammar Explanation:</h4>
                <p className="text-sm text-gray-700">{dailyPali.grammar}</p>
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-800 mb-2">💭 Daily Reflection:</h4>
                <p className="text-sm text-gray-700 italic">{dailyPali.reflection}</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reference:</span> {dailyPali.reference}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SutraTab = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;

    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Sutra</h2>
          <p className="text-sm text-gray-600">{currentDate}</p>
          <p className="text-xs text-gray-500">({Object.keys(sutraData.suttaNames).length} named suttas • Built-in content ready)</p>
        </div>
        
        {dailySutra && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📖 {dailySutra.number}. {dailySutra.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">🔗 Đọc tại đây:</span>
                    <a 
                      href={dailySutra.vietnameseLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Vietnamese Text
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">🔗 Read here:</span>
                    <a 
                      href={dailySutra.englishLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      English Text
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Volume2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">🎧 YouTube audio:</span>
                    <a 
                      href={dailySutra.audioLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      {dailySutra.hasAudio ? 
                        `[${dailySutra.audioTitle}]` : 
                        `[View Playlist - ${dailySutra.audioTitle}]`
                      }
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="text-base font-bold text-gray-800 mb-2">💭 Daily Reflection:</h4>
                <p className="text-sm text-gray-700 italic">How can this sutta guide your practice today?</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <span className="font-medium">From:</span> Majjhima Nikaya ({dailySutra.number} of 152)
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white shadow-lg min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">Daily Dharma</h1>
          <p className="text-amber-100 text-sm mt-1">Daily wisdom from Buddhist teachings</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <TabButton
            tabKey="pali"
            label="Pali"
            isActive={activeTab === 'pali'}
            onClick={setActiveTab}
          />
          <TabButton
            tabKey="sutra"
            label="Sutra"
            isActive={activeTab === 'sutra'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'pali' ? <PaliTab /> : <SutraTab />}
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-sm text-gray-500 border-t">
          <p>🙏 May all beings be happy and peaceful</p>
        </div>
      </div>
    </div>
  );
};

export default DailyDharmaApp;
