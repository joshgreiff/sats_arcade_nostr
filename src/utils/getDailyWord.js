import wordList from './wordList.json'; // Generated list of valid 5-letter words
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes } from '@noble/hashes/utils';

function getDateSeed() {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function getDailyWord() {
  const seed = getDateSeed();
  const hash = sha256(utf8ToBytes(seed));
  const index = parseInt(Buffer.from(hash).toString('hex').slice(0, 8), 16) % wordList.length;
  return wordList[index];
}