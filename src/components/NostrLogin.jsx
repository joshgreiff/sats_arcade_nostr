import { useState, useEffect } from 'react';
import NDK, { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';

const STORAGE_KEY = 'nostr_privkey';

export default function NostrLogin({ onLogin, setPubkey: setGlobalPubkey }) {
  const [pubkey, setPubkey] = useState(null);
  const [existingKey, setExistingKey] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) loginWithPrivkey(saved);
  }, []);

  const generateKey = () => {
    const privkey = bytesToHex(randomBytes(32));
    localStorage.setItem(STORAGE_KEY, privkey);
    loginWithPrivkey(privkey);
  };

  const loginWithPrivkey = async (privkey) => {
    try {
      const signer = new NDKPrivateKeySigner(privkey);
      const ndk = new NDK({ signer });
      await signer.blockUntilReady();
      const pubkey = signer.pubkey;
      const user = await ndk.getUser({ hexpubkey: pubkey });
      const pub = user.pubkey;

      localStorage.setItem('nostr_pubkey', pub);
      setPubkey(pubkey);
      if (setGlobalPubkey) setGlobalPubkey(pub); // this is the context setter
      if (onLogin) onLogin({ ndk, signer, user, privkey });
    } catch (err) {
      console.error('Login failed:', err);
      alert('Failed to log in. Make sure your private key is valid.');
    }
  };

  const logout = () => {
    localStorage.removeItem('nostr_pubkey');
    localStorage.removeItem('nostr_privkey');
    if (setGlobalPubkey) setGlobalPubkey(null);
    window.location.href = '/';
  };

  return (
    <div className="p-4 text-center">
      {pubkey ? (
        <>
          <p className="mb-2">✅ Logged in as:</p>
          <code className="block break-all text-sm mb-4">{pubkey}</code>
        </>
      ) : (
        <div className="space-y-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={generateKey}>
            Generate Nostr Key & Login
          </button>

          <div>
            <input
              type="text"
              placeholder="Paste existing private key"
              value={existingKey}
              onChange={(e) => setExistingKey(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            />
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => {
                localStorage.setItem(STORAGE_KEY, existingKey);
                loginWithPrivkey(existingKey);
              }}
            >
              Login with Key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
