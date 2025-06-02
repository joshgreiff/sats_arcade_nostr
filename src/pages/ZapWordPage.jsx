// src/pages/ZapWordPage.jsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ZapWordGame from '../components/ZapWordGame';
import { PubkeyContext } from '../context/PubkeyContext';

export default function ZapWordPage() {
  const { pubkey } = useContext(PubkeyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pubkey) navigate('/login');
  }, [pubkey]);

  if (!pubkey) return null;

  return <ZapWordGame pubkey={pubkey} />;
}
