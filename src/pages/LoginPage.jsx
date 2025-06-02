// src/pages/LoginPage.jsx
import NostrLogin from '../components/NostrLogin';

export default function LoginPage() {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sats Arcade</h1>
      <p className="mb-4">Login with Nostr to play and earn sats!</p>
      <NostrLogin />
    </div>
  );
}
