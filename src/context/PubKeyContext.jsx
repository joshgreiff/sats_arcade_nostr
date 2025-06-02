// src/context/PubkeyContext.jsx
import { createContext, useState, useEffect } from 'react';

export const PubkeyContext = createContext();

export function PubkeyProvider({ children }) {
  const [pubkey, setPubkey] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('nostr_pubkey');
    if (stored) setPubkey(stored);
  }, []);

  return (
    <PubkeyContext.Provider value={{ pubkey, setPubkey }}>
      {children}
    </PubkeyContext.Provider>
  );
}
