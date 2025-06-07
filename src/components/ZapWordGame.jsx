// src/components/ZapWordGame.jsx
import { useState, useEffect, useRef } from 'react';
import { getDailyWord } from '../utils/getDailyWord';
import { submitZapwordScore } from '../utils/nostr';
import wordList from '../utils/wordList.json';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const validWords = wordList.map(w => w.trim().toLowerCase());

export default function ZapWordGame({ pubkey }) {
  const TODAY = new Date().toDateString();
  const STORAGE_KEY = `zapwordState:${pubkey}:${TODAY}`;
  const [targetWord, setTargetWord] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState('loading'); // 'loading', 'playing', 'won', 'lost'
  const inputRef = useRef(null);

  useEffect(() => {
    async function loadWord() {
      const word = await getDailyWord();
      setTargetWord(word.toLowerCase());

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setGuesses(data.guesses || []);
          setCurrentGuess(data.currentGuess || '');
          setStatus(data.status || 'playing');
        } catch (e) {
          console.warn('Failed to load saved game state', e);
          setStatus('playing');
        }
      } else {
        setStatus('playing');
      }
    }
    loadWord();
  }, []);

  useEffect(() => {
    if (status !== 'loading' && targetWord) {
      const data = {
        guesses,
        currentGuess,
        status,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [guesses, currentGuess, status, targetWord]);

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
        submitZapwordScore({ word: targetWord, tries: guesses.length + 1 });
      } else if (newGuesses.length === MAX_GUESSES) {
        setStatus('lost');
      }
    } else if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + e.key.toLowerCase());
    }
  };

  const renderLetter = (letter, index) => {
    const correct = targetWord[index] === letter;
    const present = !correct && targetWord.includes(letter);
    const classes = correct
      ? 'bg-[#F7931A]'
      : present
      ? 'bg-[#FFDD57]'
      : 'bg-[#1A1A1A]';
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
    <div
      className="p-4 max-w-md mx-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <h2 className="text-xl font-bold text-center mb-4">Play Today's ZapWord</h2>

      {guesses.map((guess, i) => (
        <div key={i} className="flex justify-center">
          {guess.split('').map((l, j) => renderLetter(l, j))}
        </div>
      ))}

      {status === 'playing' && (
        <>
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
          <input
            ref={inputRef}
            type="text"
            autoFocus
            onKeyDown={handleKeyPress}
            value=""
            style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
          />
        </>
      )}

      {status === 'won' && <p className="text-green-600 text-center mt-4">🎉 You won!</p>}
      {status === 'lost' && (
        <p className="text-red-600 text-center mt-4">
          The word was: {targetWord.toUpperCase()}
        </p>
      )}

      <div className="mt-6 max-w-md mx-auto">
        <h3 className="text-center font-semibold mb-2">Color Key</h3>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#F7931A]"></div>
            <span className="text-sm">Correct letter & position</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#FFDD57] border border-gray-400"></div>
            <span className="text-sm">Correct letter, wrong position</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#1A1A1A] border border-gray-400"></div>
            <span className="text-sm">Letter not in word</span>
          </div>
        </div>
      </div>
    </div>
  );
}
