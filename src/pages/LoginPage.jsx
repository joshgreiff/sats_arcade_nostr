// src/pages/LoginPage.jsx
import { useContext } from 'react';
import { PubkeyContext } from '../context/PubKeyContext';
import NostrLogin from '../components/NostrLogin';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { pubkey } = useContext(PubkeyContext);

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sats Arcade</h1>

      {!pubkey && (
        <>
          <p className="mb-4">Login with Nostr to play and earn sats!</p>
          <NostrLogin />
        </>
      )}

      {pubkey && (
        <>
          <p className="mb-2">✅ Logged in as:</p>
          <code className="block break-all text-sm mb-4">{pubkey}</code>
          <Link to="/zapword">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Play ZapWord
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
