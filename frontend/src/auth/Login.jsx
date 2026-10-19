import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { NotebookPen, Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'

const Login = () => {
  const { register, handleSubmit, reset } = useForm()

  const [userlogin, setUserlogin] = useState("")
  let navigate = useNavigate()

  async function form(e) {
    try {
      let output = await axios.post(
        "http://localhost:3000/api/auth/login",
        e, {
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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl rounded-3xl p-7 sm:p-9 shadow-2xl flex flex-col gap-6 animate-bubble">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 shadow-xl shadow-indigo-500/30 flex items-center justify-center mb-1">
            <div className="w-full h-full bg-slate-950/20 rounded-[14px] flex items-center justify-center">
              <NotebookPen className="w-6 h-6 text-indigo-300" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Welcome Back</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Sign In to Notes App
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
            Enter your credentials to manage your notes and talk to your AI assistant
          </p>
        </div>

        {/* Error Notification */}
        {userlogin && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm animate-bubble">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{userlogin}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(form)} className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full py-3.5 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Login to Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-2 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition ml-1"
          >
            Register Here
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login