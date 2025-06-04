// src/pages/ZapWordPage.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ZapWordGame from '../components/ZapWordGame';
import { PubkeyContext } from '../context/PubKeyContext';
import { Link } from 'react-router-dom';

export default function ZapWordPage() {
  const { pubkey } = useContext(PubkeyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (pubkey === null) {
      console.log('Redirecting because pubkey is null');
      navigate('/login');
    }
  }, [pubkey, navigate]);

  if (pubkey === undefined) {
  return <p className="text-center mt-4">Loading ZapWord...</p>;
  }

  if (pubkey === null) {
    return null; // let useEffect navigate
  }

  return (<>
  <Link to="/">
    <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm">
        ← Home
    </button>

    </Link>
  <ZapWordGame pubkey={pubkey} />
  </>
  );
}
