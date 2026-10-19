import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  NotebookPen, 
  Home as HomeIcon, 
  StickyNote, 
  Bot, 
  UserPlus, 
  LogIn, 
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  let navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function logout() {
    let logout = await axios.post('http://localhost:3000/api/auth/logout', {}, {
      withCredentials: true,
    })
    console.log(logout)
    navigate("/")
  }

  const navLinks = [
    { to: "/home", label: "Home", icon: HomeIcon },
    { to: "/notes", label: "Notes", icon: StickyNote },
    { to: "/Ai", label: "AI ChatBox", icon: Bot, badge: "AI" },
    { to: "/register", label: "Register", icon: UserPlus },
    { to: "/", label: "Login", icon: LogIn },
  ]

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.toLowerCase() === path.toLowerCase()) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <Link 
            to="/home" 
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center text-white group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950/20 backdrop-blur-xs rounded-[10px] flex items-center justify-center">
                <NotebookPen className="w-5 h-5 text-indigo-300 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Notes
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> App
                </span>
              </div>
              <span className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase font-medium">Smart Workspace</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60 shadow-inner">
            {navLinks.map((item) => {
              const active = isActive(item.to)
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs shadow-indigo-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-gradient-to-r from-indigo-500 to-cyan-500 text-white leading-tight">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action: Logout Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/30 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-rose-500/10"
              title="Sign out of your account"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Logout</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl flex flex-col gap-2 rounded-b-2xl animate-bubble">
            {navLinks.map((item) => {
              const active = isActive(item.to)
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                logout()
              }}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 active:scale-95 transition"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar