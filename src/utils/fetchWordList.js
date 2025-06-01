// src/utils/fetchWordList.js
export async function fetchFiveLetterWords() {
  const res = await fetch('https://api.datamuse.com/words?sp=?????&max=1000');
  const data = await res.json();
  return data.map((item) => item.word.toLowerCase());
}
