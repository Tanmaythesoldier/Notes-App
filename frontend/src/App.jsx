import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import NotesCard from './page/NotesCard'
import Register from './auth/Register'
import Login from './auth/Login'


const App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/notes" element={<NotesCard/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App