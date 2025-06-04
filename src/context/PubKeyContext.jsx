import { createContext, useState, useEffect } from 'react';

export const PubkeyContext = createContext();

export function PubkeyProvider({ children }) {
  const [pubkey, setPubkey] = useState(undefined); // ✅ key change here

  useEffect(() => {
    const stored = localStorage.getItem('nostr_pubkey');
    if (stored) {
      setPubkey(stored);
    } else {
      setPubkey(null);
    }
  }, []);

  return (
    <PubkeyContext.Provider value={{ pubkey, setPubkey }}>
      {children}
    </PubkeyContext.Provider>
  );
}
