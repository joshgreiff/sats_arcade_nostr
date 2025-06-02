import wordList from './wordList.json';
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes } from '@noble/hashes/utils';

function getDateSeed() {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to convert Uint8Array to hex string
function toHex(uint8arr) {
  return [...uint8arr].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function getDailyWord() {
  const seed = getDateSeed();
  const hash = sha256(utf8ToBytes(seed));
  const hex = toHex(hash);
  const index = parseInt(hex.slice(0, 8), 16) % wordList.length;
  return wordList[index];
}
