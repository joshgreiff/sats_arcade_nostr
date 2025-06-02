import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ZapWordPage from './pages/ZapWordPage';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/zapword" element={<ZapWordPage />} />
        <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
