// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import WordleGame from './components/ZapWordGame.jsx';
import NostrLogin from './components/NostrLogin.jsx';

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to="/" className="text-blue-600 underline">Home</Link>
        <Link to="/ZapWord" className="text-blue-600 underline">Play ZapWord</Link>
      </nav>

      <Routes>
        <Route path="/" element={<NostrLogin />} />
        <Route path="/ZapWord" element={<WordleGame />} />
      </Routes>
    </div>
  );
}

export default App;
