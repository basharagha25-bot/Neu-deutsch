import React, { createContext, useContext, useState, useEffect } from 'react';

const VocabularyContext = createContext();

export function useVocabulary() {
  return useContext(VocabularyContext);
}

export function VocabularyProvider({ children }) {
  const [savedWords, setSavedWords] = useState(() => {
    const saved = localStorage.getItem('neu-a2-vocab');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('neu-a2-vocab', JSON.stringify(savedWords));
  }, [savedWords]);

  const addWord = (word, translation) => {
    setSavedWords(prev => {
      if (prev.some(w => w.word === word)) return prev; // No duplicates
      return [...prev, { word, translation, date: new Date().toISOString() }];
    });
  };

  const removeWord = (word) => {
    setSavedWords(prev => prev.filter(w => w.word !== word));
  };

  const isSaved = (word) => {
    return savedWords.some(w => w.word === word);
  };

  return (
    <VocabularyContext.Provider value={{ savedWords, addWord, removeWord, isSaved }}>
      {children}
    </VocabularyContext.Provider>
  );
}
