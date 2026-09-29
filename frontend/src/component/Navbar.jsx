import axios from 'axios'
import{Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  let navigate = useNavigate()

  async function logout() {

    let logout = await axios.post('http://localhost:3000/api/auth/logout',{},{
    withCredentials: true,
  })
  
    console.log(logout);
    navigate("/")
  }

  return (
    <div className="bg-indigo-900 text-white p-4 flex justify-between items-center">
      <div className="text-[20px] font-bold">
        <h1>Notes App</h1>
      </div>

      <div className="flex items-center space-x-4 text-[18px] ">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/notes" className="hover:underline">Notes</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/" className="hover:underline">Login</Link>
        <button className='bg-red-500 p-2 rounded-2xl text-[1em] w-30 active:scale-90' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar