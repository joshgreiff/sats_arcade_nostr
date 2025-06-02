// src/components/WordleGame.jsx
import { useState, useEffect } from 'react';
import { getDailyWord } from '../utils/getDailyWord';
import wordList from '../utils/wordList.json';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const validWords = wordList.map(w => w.trim().toLowerCase());

export default function WordleGame({ pubkey }) {
  const [targetWord, setTargetWord] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState('loading'); // 'loading', 'playing', 'won', 'lost'

  useEffect(() => {
    async function loadWord() {
      const word = await getDailyWord();
      setTargetWord(word.toLowerCase());
      setStatus('playing');
    }
    loadWord();
  }, []);

  const handleKeyPress = (e) => {
    if (status !== 'playing') return;

    if (e.key === 'Enter') {
      if (!validWords.includes(currentGuess.toLowerCase())) {
        alert('Not a valid word!');
        return;
      }
      if (currentGuess.length !== WORD_LENGTH) return;
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        setStatus('won');
      } else if (newGuesses.length === MAX_GUESSES) {
        setStatus('lost');
      }
    } else if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + e.key.toLowerCase());
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  const renderLetter = (letter, index) => {
    const correct = targetWord[index] === letter;
    const present = !correct && targetWord.includes(letter);
    const classes = correct
      ? 'bg-green-500'
      : present
      ? 'bg-yellow-500'
      : 'bg-gray-500';
    return (
      <div
        key={index}
        className={`w-12 h-12 m-1 flex items-center justify-center text-white font-bold text-xl ${classes}`}
      >
        {letter.toUpperCase()}
      </div>
    );
  };

  if (status === 'loading') {
    return <p className="text-center mt-4">Loading word...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Play Today's ZapWord</h2>
      {guesses.map((guess, i) => (
        <div key={i} className="flex justify-center">
          {guess.split('').map((l, j) => renderLetter(l, j))}
        </div>
      ))}
      {status === 'playing' && (
        <div className="flex justify-center mt-4">
          {[...Array(WORD_LENGTH)].map((_, i) => (
            <div
              key={i}
              className="w-12 h-12 m-1 border border-gray-400 flex items-center justify-center text-xl"
            >
              {currentGuess[i]?.toUpperCase() || ''}
            </div>
          ))}
        </div>
      )}
      {status === 'won' && <p className="text-green-600 text-center mt-4">🎉 You won!</p>}
      {status === 'lost' && (
        <p className="text-red-600 text-center mt-4">
          The word was: {targetWord.toUpperCase()}
        </p>
      )}
    </div>
  );
}
