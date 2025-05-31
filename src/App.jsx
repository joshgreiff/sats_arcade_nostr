import NostrLogin from './components/NostrLogin';

function App() {
  const handleLogin = ({ ndk, user, privkey }) => {
    console.log('Logged in as', user.pubkey);
    // You can now use NDK instance
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <NostrLogin onLogin={handleLogin} />
    </div>
  );
}

export default App;
