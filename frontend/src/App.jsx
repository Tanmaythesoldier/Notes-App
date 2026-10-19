import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import NotesCard from './page/NotesCard'
import Register from './auth/Register'
import Login from './auth/Login'
import Ai from './page/Ai'


const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<NotesCard />} />
        <Route path="/Ai" element={<Ai />} />
      </Routes>
    </div>
  )
}

export default App