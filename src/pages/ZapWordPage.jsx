// src/pages/ZapWordPage.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ZapWordGame from '../components/ZapWordGame';
import { PubkeyContext } from '../context/PubkeyContext';
import { Link } from 'react-router-dom';

export default function ZapWordPage() {
  const { pubkey } = useContext(PubkeyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pubkey) navigate('/login');
  }, [pubkey]);

  if (!pubkey) return null;

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
