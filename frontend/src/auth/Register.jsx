import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Register = () => {
  const [userexist, setuserexist] = useState("")
  let navigate = useNavigate()
  let {register,handleSubmit,reset} = useForm()
  async function registerdata(e){
    let res = await axios.post('http://localhost:3000/api/auth/register',e,{
    withCredentials: true,
  })
    if(res.status === 201){
      navigate("/")
    }else if(res.status === 200){
      setuserexist("This name is alrady exist")
    }
    reset()
  }
  return (
    <div className=" flex flex-col w-screen h-screen bg-indigo-900 justify-center items-center ">
      <div className="w-100 max-h-120 bg-white p-5 rounded-2xl flex flex-col gap-2" >
        <h1 className="text-red-700 mb-1.5">{userexist}</h1>
        <form onSubmit={handleSubmit(registerdata)} className="flex flex-col gap-8">
          <input {...register("username")} className="rounded-2xl p-3" type="text" placeholder="Full Name" />
          <input {...register("email")} className="rounded-2xl p-3" type="email" placeholder="Email" />
          <input {...register("password")} className="rounded-2xl p-3" type="password" placeholder="password" />
          <button className="bg-indigo-500 p-3 rounded-2xl" >Register</button>
          
        </form>
        <h1>If you have already Account? <Link className="text-indigo-500 hover:text-indigo-400" to="/">Login</Link></h1>
      </div>
    </div>
  )
}

export default Register