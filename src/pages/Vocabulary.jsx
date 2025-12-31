import React from 'react';
import Navbar from '../components/Navbar';
import { useVocabulary } from '../context/VocabularyContext';
import { Trash2, Volume2, BookOpen } from 'lucide-react';

export default function Vocabulary() {
  const { savedWords, removeWord } = useVocabulary();

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Dein Wortschatz</h1>
          <p className="text-slate-500">
            You have saved <span className="font-bold text-blue-600">{savedWords.length}</span> words.
          </p>
        </header>

        {savedWords.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">No words saved yet.</p>
            <p className="text-sm">Go to a unit and click on words to add them here.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedWords.map((item) => (
              <div key={item.word} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start group">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{item.word}</h3>
                  <p className="text-blue-600 font-medium">{item.translation}</p>
                  <p className="text-xs text-slate-400 mt-2">Added: {new Date(item.date).toLocaleDateString()}</p>
                </div>
                
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeWord(item.word)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
