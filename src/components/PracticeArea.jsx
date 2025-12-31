import React, { useState } from 'react';
import { Mic, PenTool, CheckCircle } from 'lucide-react';

export default function PracticeArea() {
  const [activeTab, setActiveTab] = useState('speaking');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-8">
      <div className="flex gap-4 mb-6 border-b border-slate-100 pb-2">
        <TabButton 
          active={activeTab === 'speaking'} 
          onClick={() => setActiveTab('speaking')} 
          icon={<Mic size={18} />} 
          label="Speaking" 
        />
        <TabButton 
          active={activeTab === 'writing'} 
          onClick={() => setActiveTab('writing')} 
          icon={<PenTool size={18} />} 
          label="Writing" 
        />
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'speaking' ? <SpeakingPractice /> : <WritingPractice />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
        active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function SpeakingPractice() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <h3 className="text-lg font-semibold mb-2">Read aloud:</h3>
      <p className="text-2xl text-slate-800 mb-8 font-serif">"Ich möchte einen Kaffee, bitte."</p>
      
      <button 
        onClick={() => setIsRecording(!isRecording)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
          isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Mic size={32} />
      </button>
      <p className="mt-4 text-sm text-slate-400">
        {isRecording ? "Listening..." : "Click to record"}
      </p>
    </div>
  );
}

function WritingPractice() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Task: Describe your apartment</h3>
      <p className="text-sm text-slate-500 mb-4">Write 2-3 sentences about your home. Use words like "groß", "klein", "hell".</p>
      
      {!submitted ? (
        <>
          <textarea 
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none mb-4"
            placeholder="Meine Wohnung ist..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="bg-green-50 text-green-700 p-6 rounded-xl flex items-center gap-4">
          <CheckCircle size={32} />
          <div>
            <h4 className="font-bold">Great job!</h4>
            <p>Your text has been saved. Keep it up!</p>
          </div>
          <button 
            onClick={() => { setSubmitted(false); setText(''); }} 
            className="ml-auto text-sm underline"
          >
            New Task
          </button>
        </div>
      )}
    </div>
  );
}
