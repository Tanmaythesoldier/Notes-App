import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { register, handleSubmit,reset } = useForm()

  const [userlogin, setUserlogin] = useState("")
  let navigate = useNavigate()

async function form(e) {
    try {
        let output = await axios.post(
            "http://localhost:3000/api/auth/login",
            e,{
    withCredentials: true,
  }
        );
        reset();
        navigate("/home")

    } catch (error) {

        if (error.response?.status === 401) {
            setUserlogin("Invalid email or password");
        } else {
            setUserlogin("Something went wrong");
        }
    }
   
    
}

  return (
    <div className='flex justify-center items-center h-screen bg-indigo-900 w-screen ' >
        <div className='bg-white p-10 rounded-lg shadow-lg w-100 gap-5 flex flex-col'>
          <h1 className='text-red-500'>{userlogin}</h1>
            <form onSubmit={handleSubmit(form)} className='flex flex-col space-y-4 gap-5'>
                <input {...register("email")} className="p-5 rounded-2xl" type="email" placeholder="email" />
                <input {...register("password")} className="p-5 rounded-2xl" type="password" placeholder="Password" />
                <button  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Login</button>
            </form>
            <h1>If you don't have an account ? <Link to="/register" className='text-indigo-600 hover:text-indigo-300'>Register</Link> Here</h1>
        </div>
    </div>
  )
}

export default Login