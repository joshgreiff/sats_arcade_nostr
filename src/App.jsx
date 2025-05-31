import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="p-6 bg-gray-900 text-white text-center space-y-4">
  <h1 className="text-4xl font-bold text-blue-500">Tailwind is Working 🎉</h1>
  <p className="text-lg text-yellow-300">Sats Arcade loading…</p>
  <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600">
    Click Me
  </button>
</div>
    </>
  )
}

export default App
