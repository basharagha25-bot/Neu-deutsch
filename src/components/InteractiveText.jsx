import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Plus, X, Check, Globe } from 'lucide-react';
import { useVocabulary } from '../context/VocabularyContext';

export default function InteractiveText({ content, contentArabic }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Simple tokenizer: splits by spaces but preserves punctuation for display
  const words = content.split(/(\s+)/);

  const handleWordClick = (word, e) => {
    // Strip punctuation for lookup
    const cleanWord = word.replace(/[.,!?;:()"]/g, '').trim();
    if (!cleanWord) return;

    const rect = e.target.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top });
    setSelectedWord(cleanWord);
  };

  const [showArabic, setShowArabic] = useState(false);

  // Split by newlines first to preserve paragraph structure
  const lines = content.split('\n');

  return (
    <div className="space-y-4">
      <div className="text-lg leading-relaxed text-slate-800 space-y-4">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex}>
            {line.split(/(\s+)/).map((segment, index) => {
               // Basic check if it's a word or whitespace
               const isWord = /\S/.test(segment);
               return isWord ? (
                 <span
                   key={index}
                   onClick={(e) => handleWordClick(segment, e)}
                   className="cursor-pointer hover:bg-yellow-200 hover:text-yellow-900 rounded px-0.5 transition-colors duration-200"
                 >
                   {segment}
                 </span>
               ) : (
                 <span key={index}>{segment}</span>
               );
            })}
          </div>
        ))}
      </div>
      
      {contentArabic && (
        <div className="mt-4">
          <button 
            onClick={() => setShowArabic(!showArabic)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-2"
          >
            <Globe size={16} />
            {showArabic ? 'إخفاء الترجمة العربية' : 'عرض الترجمة العربية'}
          </button>
          
          {showArabic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-right"
              dir="rtl"
            >
              <p className="text-lg text-emerald-900 leading-relaxed font-arabic">
                {contentArabic}
              </p>
            </motion.div>
          )}
        </div>
      )}
      
      <AnimatePresence>
        {selectedWord && (
          <TranslationModal 
            word={selectedWord} 
            position={position} 
            onClose={() => setSelectedWord(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TranslationModal({ word, position, onClose }) {
  const { addWord, isSaved } = useVocabulary();
  
  // Comprehensive German-Arabic A2 Dictionary
  const translations = {
    // Basic Pronouns & Articles
    "ich": "أنا",
    "Ich": "أنا",
    "du": "أنت",
    "er": "هو",
    "sie": "هي / هم",
    "Sie": "حضرتك",
    "es": "هو/هي (للجماد)",
    "wir": "نحن",
    "ihr": "أنتم",
    "mein": "ملكي",
    "Mein": "ملكي",
    "meine": "ملكي",
    "Meine": "ملكي",
    "dein": "ملكك",
    "sein": "ملكه",
    "der": "ال (مذكر)",
    "die": "ال (مؤنث)",
    "das": "ال (محايد)",
    "ein": "واحد",
    "eine": "واحدة",
    
    // Common Verbs
    "ist": "يكون",
    "bin": "أكون",
    "sind": "يكونون",
    "habe": "أملك",
    "hat": "يملك",
    "haben": "يملكون",
    "komme": "آتي",
    "kommt": "يأتي",
    "kommen": "يأتون",
    "lebe": "أعيش",
    "lebt": "يعيش",
    "leben": "يعيشون",
    "wohne": "أسكن",
    "wohnt": "يسكن",
    "wohnen": "يسكنون",
    "arbeite": "أعمل",
    "arbeitet": "يعمل",
    "arbeiten": "يعملون",
    "mache": "أفعل",
    "macht": "يفعل",
    "machen": "يفعلون",
    "gehe": "أذهب",
    "geht": "يذهب",
    "gehen": "يذهبون",
    "Gehen": "يذهبون",
    "spiele": "ألعب",
    "spielt": "يلعب",
    "spielen": "يلعبون",
    "spreche": "أتحدث",
    "spricht": "يتحدث",
    "sprechen": "يتحدثون",
    "lerne": "أتعلم",
    "lernt": "يتعلم",
    "lernen": "يتعلمون",
    "treffe": "أقابل",
    "trifft": "يقابل",
    "treffen": "يقابلون",
    "kochen": "يطبخون",
    "lesen": "يقرأون",
    "liegen": "يستلقون",
    "finde": "أجد",
    "findet": "يجد",
    "finden": "يجدون",
    "möchte": "أريد",
    "möchten": "يريدون",
    "kann": "يستطيع",
    "können": "يستطيعون",
    "muss": "يجب",
    "müssen": "يجب عليهم",
    "will": "يريد",
    "wollen": "يريدون",
    "wollt": "تريدون",
    "Wollt": "تريدون",
    
    // Family
    "Familie": "عائلة",
    "Eltern": "والدان",
    "Mutter": "أم",
    "Vater": "أب",
    "Bruder": "أخ",
    "Schwester": "أخت",
    "Tochter": "ابنة",
    "Sohn": "ابن",
    "Kind": "طفل",
    "Kinder": "أطفال",
    "Frau": "امرأة / زوجة",
    "Mann": "رجل / زوج",
    "Freund": "صديق",
    "Freundin": "صديقة",
    "Freunde": "أصدقاء",
    "Freundinnen": "صديقات",
    
    // Work & Education
    "Beruf": "مهنة",
    "Arbeit": "عمل",
    "arbeiten": "يعملون",
    "Schule": "مدرسة",
    "Uni": "جامعة",
    "Ausbildung": "تدريب مهني",
    "studiere": "أدرس",
    "studieren": "يدرسون",
    "Kollegen": "زملاء",
    "Bankkauffrau": "موظفة بنك",
    
    // Living & Housing
    "Wohnung": "شقة",
    "Haus": "منزل",
    "Apartment": "شقة",
    "Zimmer": "غرفة",
    "Küche": "مطبخ",
    "Bad": "حمام",
    "Stadt": "مدينة",
    "Stadtzentrum": "مركز المدينة",
    "Land": "ريف / بلد",
    "renoviert": "رممنا",
    
    // Languages
    "Sprache": "لغة",
    "Sprachen": "لغات",
    "Deutsch": "ألماني",
    "Englisch": "إنجليزي",
    "Französisch": "فرنسي",
    "Italienisch": "إيطالي",
    "Muttersprachen": "لغات أم",
    "fließend": "بطلاقة",
    
    // Time
    "Jahr": "سنة",
    "Jahre": "سنوات",
    "Jahren": "سنوات",
    "Monat": "شهر",
    "Woche": "أسبوع",
    "Tag": "يوم",
    "Wochenende": "عطلة نهاية الأسبوع",
    "heute": "اليوم",
    "morgen": "غداً",
    "gestern": "أمس",
    "jetzt": "الآن",
    "schon": "بالفعل",
    "noch": "لا يزال",
    "bald": "قريباً",
    
    // Adjectives
    "schön": "جميل",
    "groß": "كبير",
    "klein": "صغير",
    "gut": "جيد",
    "nett": "لطيف",
    "toll": "رائع",
    "super": "ممتاز",
    "laut": "صاخب",
    "stressig": "مجهد",
    "süß": "لطيف/حلو",
    "total": "تماماً",
    "gern": "بسرور",
    
    // Common Words
    "und": "و",
    "oder": "أو",
    "aber": "لكن",
    "auch": "أيضاً",
    "nicht": "ليس",
    "keine": "لا يوجد",
    "kein": "لا يوجد",
    "vielleicht": "ربما",
    "immer": "دائماً",
    "manchmal": "أحياناً",
    "oft": "غالباً",
    "sehr": "جداً",
    "nur": "فقط",
    "bisschen": "قليلاً",
    "zusammen": "معاً",
    "allein": "وحيداً",
    
    // Questions
    "was": "ماذا",
    "Was": "ماذا",
    "wer": "من",
    "wo": "أين",
    "wann": "متى",
    "wie": "كيف",
    "warum": "لماذا",
    "weil": "لأن",
    
    // Activities & Hobbies
    "Sport": "رياضة",
    "Basketball": "كرة السلة",
    "reite": "أركب الخيل",
    "Pferd": "حصان",
    "Buch": "كتاب",
    "Sofa": "أريكة",
    "Restaurant": "مطعم",
    
    // Countries
    "Deutschland": "ألمانيا",
    "Österreich": "النمسا",
    "Italien": "إيطاليا",
    "Spanien": "إسبانيا",
    "Basel": "بازل",
    "Zürich": "زيورخ",
    
    // Perfekt Verbs
    "gemacht": "فعلت",
    "gelernt": "تعلمت",
    "beendet": "أنهيت",
    "geschrieben": "كتبت",
    "bekommen": "حصلت",
    "geflogen": "سافرت بالطائرة",
    "gemietet": "استأجرت",
    "gefahren": "سافرت",
    "besucht": "زرت",
    "geheiratet": "تزوجت",
    "organisiert": "نظمت",
    "umgezogen": "انتقلت",
    "angefangen": "بدأت",
    "gefunden": "وجدت",
    "gefallen": "أعجبني",
    "kennengelernt": "تعرفت على",
    "teilgenommen": "شاركت",
    
    // Invitation & Response
    "Einladung": "دعوة",
    "kommen": "يأتون",
    "später": "لاحقاً",
    "Überstunden": "ساعات إضافية",
    "leider": "للأسف",
    "Danke": "شكراً",
    "bitte": "من فضلك",
    
    // Food & Cooking
    "Essen": "طعام",
    "Backen": "خبز",
    "backen": "يخبز",
    "Plätzchen": "بسكويت",
    "Mehl": "دقيق",
    "Zucker": "سكر",
    "Butter": "زبدة",
    "Eier": "بيض",
    "Tassen": "أكواب",
    "Schüssel": "وعاء",
    "Ofen": "فرن",
    
    // Senses
    "sehen": "يرى",
    "hören": "يسمع",
    "riechen": "يشم",
    "fühlen": "يحس",
    "schmecken": "يتذوق",
    "Sinne": "حواس",
    
    // Misc Unit 1
    "Rentner": "متقاعد",
    "geschieden": "مطلق",
    "verheiratet": "متزوج",
    "ledig": "أعزب",
    "geboren": "ولد",
    "Spaß": "متعة",
    "Leben": "حياة",
    "Freizeit": "وقت فراغ",
    
    // Suggestions & Responses
    "Vorschlagen": "اقتراح",
    "Zusagen": "موافقة",
    "Absagen": "اعتذار",
    "Idee": "فكرة",
    "gute": "جيدة",
    "Einverstanden": "موافق",
    "Zeit": "وقت",
    "Lust": "رغبة",
    "Hast": "هل لديك"
  };

  const translation = translations[word] || "Translation unavailable";
  const saved = isSaved(word);

  const handleSave = () => {
    addWord(word, translation);
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{ 
          position: 'fixed', 
          left: position.x, 
          top: position.y - 150, 
        }}
        className="z-50 bg-white rounded-xl shadow-xl p-4 w-64 border border-slate-100"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{word}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-lg text-blue-600 font-medium">{translation}</p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors">
            <Volume2 size={16} /> Listen
          </button>
          
          {saved ? (
             <button disabled className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-600 py-2 rounded-lg text-sm font-medium border border-green-100">
               <Check size={16} /> Saved
             </button>
          ) : (
             <button 
               onClick={handleSave}
               className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
             >
               <Plus size={16} /> Save
             </button>
          )}
        </div>
        
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-slate-100"></div>
      </motion.div>
    </>
  );
}
