import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { MessageCircle, ChevronDown, ChevronUp, Users, Volume2 } from 'lucide-react';

// Conversation data from Level 11 & 12 A2 - Helping a Friend Bake
const conversationsData = [
  {
    id: 1,
    title: "Helping a Friend Bake",
    titleArabic: "مساعدة صديق في الخبز",
    titleGerman: "Einen Freund beim Backen helfen",
    topic: "Kochen & Backen",
    level: "A2",
    duration: "~10 min",
    dialogues: [
      { speaker: "Maria", german: "Hallo, John!", arabic: "مرحبًا يا جون!" },
      { speaker: "Maria", german: "Bist du heute bereit zu backen?", arabic: "هل أنت مستعد للخبز اليوم؟" },
      { speaker: "John", german: "Hallo, Maria!", arabic: "مرحبًا يا ماريا!" },
      { speaker: "John", german: "Ja, ich bin bereit.", arabic: "نعم، أنا مستعد." },
      { speaker: "John", german: "Was backen wir?", arabic: "ماذا سنخبز؟" },
      { speaker: "Maria", german: "Wir backen Plätzchen.", arabic: "سنخبز بسكويت." },
      { speaker: "Maria", german: "Magst du Plätzchen?", arabic: "هل تحب البسكويت؟" },
      { speaker: "John", german: "Ja, ich liebe Plätzchen!", arabic: "نعم، أنا أحب البسكويت!" },
      { speaker: "John", german: "Was brauchen wir?", arabic: "ماذا نحتاج؟" },
      { speaker: "Maria", german: "Wir brauchen etwas Mehl, Zucker, Butter und Eier.", arabic: "نحتاج إلى بعض الطحين، السكر، الزبدة، والبيض." },
      { speaker: "John", german: "Wie viel Mehl brauchen wir?", arabic: "كم كمية الطحين التي نحتاجها؟" },
      { speaker: "Maria", german: "Wir brauchen zwei Tassen Mehl.", arabic: "نحتاج إلى كوبين من الطحين." },
      { speaker: "John", german: "Zwei Tassen? Okay. Ich kann es abmessen.", arabic: "كوبان؟ حسنًا. يمكنني قياسه." },
      { speaker: "Maria", german: "Großartig! Ich hole den Zucker.", arabic: "رائع! سأحضر السكر." },
      { speaker: "Maria", german: "Wir brauchen eine Tasse Zucker.", arabic: "نحتاج إلى كوب واحد من السكر." },
      { speaker: "John", german: "Eine Tasse Zucker. Wo ist der Zucker?", arabic: "كوب واحد من السكر. أين السكر؟" },
      { speaker: "Maria", german: "Der Zucker ist in der Speisekammer.", arabic: "السكر في خزانة المؤن." },
      { speaker: "John", german: "Ich sehe ihn. Ich hole ihn raus.", arabic: "أراه. سأُخرجه." },
      { speaker: "Maria", german: "Gut! Jetzt brauchen wir Butter.", arabic: "جيد! الآن نحتاج إلى الزبدة." },
      { speaker: "Maria", german: "Wie viel Butter brauchen wir?", arabic: "كم كمية الزبدة التي نحتاجها؟" },
      { speaker: "John", german: "Wir brauchen einen Block Butter.", arabic: "نحتاج إلى قطعة واحدة من الزبدة." },
      { speaker: "Maria", german: "Einen Block? Okay, ich hole die Butter.", arabic: "قطعة واحدة؟ حسنًا، سأحضر الزبدة." },
      { speaker: "John", german: "Verwenden wir auch Eier?", arabic: "هل سنستخدم البيض أيضًا؟" },
      { speaker: "Maria", german: "Ja, wir brauchen zwei Eier.", arabic: "نعم، نحتاج إلى بيضتين." },
      { speaker: "John", german: "Ich kann die Eier aus dem Kühlschrank holen.", arabic: "يمكنني إحضار البيض من الثلاجة." },
      { speaker: "Maria", german: "Perfekt! Jetzt haben wir alles.", arabic: "ممتاز! الآن لدينا كل شيء." },
      { speaker: "John", german: "Was machen wir zuerst?", arabic: "ماذا نفعل أولًا؟" },
      { speaker: "Maria", german: "Zuerst müssen wir Butter und Zucker vermischen.", arabic: "أولًا يجب أن نمزج الزبدة مع السكر." },
      { speaker: "John", german: "Müssen wir eine Schüssel benutzen?", arabic: "هل نحتاج إلى استخدام وعاء؟" },
      { speaker: "Maria", german: "Ja, wir brauchen eine große Schüssel.", arabic: "نعم، نحتاج إلى وعاء كبير." },
      { speaker: "John", german: "Ich habe eine Schüssel. Was kommt als Nächstes?", arabic: "لدي وعاء. ما الخطوة التالية؟" },
      { speaker: "Maria", german: "Als Nächstes fügen wir die Eier hinzu.", arabic: "الخطوة التالية هي إضافة البيض." },
      { speaker: "John", german: "Okay, ich werde die Eier in die Schüssel schlagen.", arabic: "حسنًا، سأكسر البيض في الوعاء." },
      { speaker: "Maria", german: "Sei vorsichtig! Lass keine Schale in die Schüssel.", arabic: "كن حذرًا! لا تدع قشر البيض يقع في الوعاء." },
      { speaker: "John", german: "Ich werde mein Bestes geben.", arabic: "سأبذل قصارى جهدي." },
      { speaker: "Maria", german: "Zwei Eier!", arabic: "بيضتان!" },
      { speaker: "John", german: "Die Eier sind jetzt in der Schüssel.", arabic: "البيض الآن في الوعاء." },
      { speaker: "Maria", german: "Gut gemacht! Jetzt mische alles gut zusammen.", arabic: "عمل رائع! الآن امزج كل شيء جيدًا." },
      { speaker: "John", german: "Ich mische. Es sieht schön aus!", arabic: "أنا أمزج. يبدو جميلًا!" },
      { speaker: "Maria", german: "Ja, das tut es! Jetzt können wir das Mehl hinzufügen.", arabic: "نعم، كذلك! الآن يمكننا إضافة الطحين." },
      { speaker: "John", german: "Fügen wir das Mehl langsam hinzu?", arabic: "هل نضيف الطحين ببطء؟" },
      { speaker: "Maria", german: "Ja, füge es langsam hinzu.", arabic: "نعم، أضفه ببطء." },
      { speaker: "John", german: "Okay. Ich werde es nach und nach hinzufügen.", arabic: "حسنًا. سأضيفه تدريجيًا." },
      { speaker: "Maria", german: "Perfekt! Jetzt gut vermischen.", arabic: "ممتاز! الآن امزج جيدًا." },
      { speaker: "John", german: "Ich vermische. Das macht Spaß!", arabic: "أنا أمزج. هذا ممتع!" },
      { speaker: "Maria", german: "Ich freue mich, dass du Spaß hast!", arabic: "يسعدني أنك تستمتع!" },
      { speaker: "John", german: "Was kommt nach dem Mischen?", arabic: "ماذا يأتي بعد الخلط؟" },
      { speaker: "Maria", german: "Nach dem Mischen müssen wir die Plätzchen formen.", arabic: "بعد الخلط، يجب أن نشكّل البسكويت." },
      { speaker: "John", german: "Formen? Wie formen wir sie?", arabic: "نشكّل؟ كيف نشكّلها؟" },
      { speaker: "Maria", german: "Wir nehmen kleine Stücke Teig und rollen sie zu Kugeln.", arabic: "نأخذ قطعًا صغيرة من العجين ونلفّها على شكل كرات." },
      { speaker: "John", german: "Okay, das kann ich machen.", arabic: "حسنًا، يمكنني فعل ذلك." },
      { speaker: "Maria", german: "Großartig! Lass uns zusammen welche machen.", arabic: "رائع! دعنا نصنع بعضها معًا." },
      { speaker: "John", german: "Sieh mal, meine Plätzchenformen sind rund!", arabic: "انظري، أشكال البسكويت الخاصة بي دائرية!" },
      { speaker: "Maria", german: "Sie sehen wirklich gut aus, John!", arabic: "تبدو جيدة جدًا يا جون!" },
      { speaker: "John", german: "Danke, Maria! Wie viele Plätzchen können wir machen?", arabic: "شكرًا يا ماريا! كم عدد البسكويت الذي يمكننا صنعه؟" },
      { speaker: "Maria", german: "Wir können etwa zwanzig Plätzchen machen.", arabic: "يمكننا صنع حوالي عشرين قطعة بسكويت." },
      { speaker: "John", german: "Wow, das sind viele Plätzchen!", arabic: "واو، هذا كثير من البسكويت!" },
      { speaker: "Maria", german: "Ja, das sind sie! Jetzt legen wir sie auf das Backblech.", arabic: "نعم، فعلًا! الآن نضعها على صينية الخَبز." },
      { speaker: "John", german: "Brauchen wir etwas Platz zwischen ihnen?", arabic: "هل نحتاج إلى ترك مسافة بينها؟" },
      { speaker: "Maria", german: "Ja, lass etwas Platz.", arabic: "نعم، اترك بعض المسافة." },
      { speaker: "John", german: "Ich lasse Platz.", arabic: "سأترك مسافة." },
      { speaker: "Maria", german: "Perfekt! Jetzt ist es Zeit, sie zu backen.", arabic: "ممتاز! الآن حان وقت خبزها." },
      { speaker: "John", german: "Welche Temperatur brauchen wir für den Ofen?", arabic: "ما درجة الحرارة التي نحتاجها للفرن؟" },
      { speaker: "Maria", german: "Wir müssen ihn auf 180 Grad einstellen.", arabic: "يجب ضبطه على 180 درجة." },
      { speaker: "John", german: "Okay, ich stelle den Ofen ein.", arabic: "حسنًا، سأضبط الفرن." },
      { speaker: "Maria", german: "Jetzt legen wir das Blech in den Ofen.", arabic: "الآن نضع الصينية في الفرن." },
      { speaker: "John", german: "Wow, das ist aufregend! Wie lange backen wir sie?", arabic: "واو، هذا مُثير! كم من الوقت نخبزها؟" },
      { speaker: "Maria", german: "Wir backen sie etwa zehn Minuten.", arabic: "نخبزها لمدة حوالي عشر دقائق." },
      { speaker: "John", german: "Okay! Jetzt warten wir.", arabic: "حسنًا! الآن ننتظر." },
      { speaker: "Maria", german: "Ja, lass uns aufräumen, während wir warten.", arabic: "نعم، دعنا ننظف أثناء الانتظار." },
      { speaker: "John", german: "Gute Idee! Aufräumen ist wichtig.", arabic: "فكرة جيدة! التنظيف مهم." },
      { speaker: "Maria", german: "Ja, das ist es! Danke, dass du mir heute hilfst!", arabic: "نعم، هذا صحيح! شكرًا لمساعدتك لي اليوم!" },
      { speaker: "John", german: "Danke, dass du mich eingeladen hast, Maria!", arabic: "شكرًا لدعوتك لي يا ماريا!" },
      { speaker: "Maria", german: "Ich freue mich, mit dir zu backen!", arabic: "يسعدني أن أخبز معك!" },
      { speaker: "John", german: "Ich auch! Ich kann es kaum erwarten, die Plätzchen zu essen!", arabic: "وأنا أيضًا! لا أستطيع الانتظار لأكل البسكويت!" },
    ]
  }
];

export default function Conversations() {
  const [expandedId, setExpandedId] = useState(1);
  const [showArabic, setShowArabic] = useState(true);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
      <SEO 
        title="Conversations - Neu A2" 
        description="Practice German conversations with Arabic translations. Level 11 & 12 A2 dialogue training." 
      />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Gespräche
              </h1>
              <p className="text-slate-500 text-sm">Conversations • المحادثات</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Immerse yourself in real German dialogues. Each conversation features 
            <span className="font-semibold text-blue-600"> German text</span> with 
            <span className="font-semibold text-emerald-600 font-arabic"> Arabic translations</span>.
          </p>
          
          {/* Toggle for Arabic */}
          <button 
            onClick={() => setShowArabic(!showArabic)}
            className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showArabic 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {showArabic ? '✓ Arabic Translations ON' : 'Arabic Translations OFF'}
          </button>
        </header>

        <div className="space-y-6">
          {conversationsData.map((conversation) => (
            <ConversationCard 
              key={conversation.id} 
              conversation={conversation} 
              isExpanded={expandedId === conversation.id}
              onToggle={() => toggleExpand(conversation.id)}
              showArabic={showArabic}
            />
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 glass-panel rounded-2xl p-6 border-l-4 border-emerald-500">
          <h3 className="font-bold text-lg mb-2 text-slate-800">💡 Lerntipp / نصيحة للتعلم</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Read each dialogue out loud to practice pronunciation. Focus on common phrases and try to understand the grammar patterns. 
            <span className="font-arabic block mt-2 text-right" dir="rtl">
              اقرأ كل حوار بصوت عالٍ لتتمرن على النطق. ركز على العبارات الشائعة وحاول فهم أنماط القواعد.
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

function ConversationCard({ conversation, isExpanded, onToggle, showArabic }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <button 
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Users className="text-white" size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                {conversation.level}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                {conversation.topic}
              </span>
              <span className="text-xs text-slate-400">{conversation.duration}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">{conversation.titleGerman}</h2>
            <p className="text-sm text-slate-500 font-arabic" dir="rtl">{conversation.titleArabic}</p>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isExpanded ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'
        }`}>
          <ChevronDown size={24} />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="border-t border-slate-100 pt-6">
            {/* Dialogue Container */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {conversation.dialogues.map((dialogue, index) => (
                <DialogueLine 
                  key={index} 
                  dialogue={dialogue} 
                  showArabic={showArabic}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DialogueLine({ dialogue, showArabic, isEven }) {
  const isMaria = dialogue.speaker === "Maria";
  
  return (
    <div className={`flex ${isMaria ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] ${isMaria ? 'mr-auto' : 'ml-auto'}`}>
        {/* Speaker name */}
        <div className={`text-xs font-bold mb-1 ${
          isMaria ? 'text-blue-600' : 'text-emerald-600'
        }`}>
          {dialogue.speaker}
        </div>
        
        {/* Message bubble */}
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isMaria 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tl-sm' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-tr-sm'
        }`}>
          <p className="font-medium leading-relaxed">{dialogue.german}</p>
          
          {showArabic && (
            <p className="mt-2 pt-2 border-t border-white/20 text-sm opacity-90 font-arabic" dir="rtl">
              {dialogue.arabic}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
