// src/utils/getDailyWord.js
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes } from '@noble/hashes/utils';
import { fetchFiveLetterWords } from './fetchWordList';

function getDateSeed() {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getDailyWord() {
  const wordList = await fetchFiveLetterWords();
  const seed = getDateSeed();
  const hash = sha256(utf8ToBytes(seed));
  const hex = Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
  const index = parseInt(hex.slice(0, 8), 16) % wordList.length;
  return wordList[index];
}

export default getDailyWord;
