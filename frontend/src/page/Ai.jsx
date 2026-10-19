import Navbar from "../component/Navbar"
import ChatBox from "../component/ChatBox"

const Ai = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <ChatBox />
      </main>
    </div>
  )
}

export default Ai