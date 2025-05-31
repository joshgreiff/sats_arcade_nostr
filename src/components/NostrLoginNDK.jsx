import { useEffect, useState } from "react";
import NDK, { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { generatePrivateKey, getPublicKey } from "nostr-tools/crypto";

const RELAYS = ["wss://relay.damus.io", "wss://nos.lol"];

export default function NostrLoginNDK() {
  const [ndk, setNdk] = useState(null);
  const [pubkey, setPubkey] = useState(null);

  useEffect(() => {
    const init = async () => {
      let sk = localStorage.getItem("nostrPrivKey");
      if (!sk) {
        sk = generatePrivateKey();
        localStorage.setItem("nostrPrivKey", sk);
      }

      const signer = new NDKPrivateKeySigner(sk);
      const instance = new NDK({ signer });
      RELAYS.forEach(url => instance.addExplicitRelay(url));
      await instance.connect();

      const pk = await signer.getPublicKey();
      setPubkey(pk);
      setNdk(instance);
    };

    init();
  }, []);

  const resetKeys = () => {
    localStorage.removeItem("nostrPrivKey");
    location.reload();
  };

  return (
    <div className="text-center space-y-4 mt-10">
      <h2 className="text-xl font-bold">🧠 Nostr Login (NDK)</h2>
      {pubkey ? (
        <>
          <p className="text-sm break-all text-gray-300">
            <strong>Pubkey:</strong> {pubkey}
          </p>
          <button
            onClick={resetKeys}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </>
      ) : (
        <p className="text-yellow-300">Connecting to relays...</p>
      )}
    </div>
  );
}
