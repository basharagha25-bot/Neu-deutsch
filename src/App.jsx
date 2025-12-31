import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UnitView from './pages/UnitView'
import Vocabulary from './pages/Vocabulary'
import Conversations from './pages/Conversations'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unit/:unitId" element={<UnitView />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        Neu A2
      </h1>
      <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
        Reading-first German learning for Arabic speakers. 
        <br />
        Tap any word to translate instantly.
      </p>
      <a 
        href="/dashboard"
        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1"
      >
        Start Learning Now
      </a>
    </div>
  )
}

export default App
