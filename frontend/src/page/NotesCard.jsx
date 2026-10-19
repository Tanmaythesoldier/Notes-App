import { useContext, useEffect } from "react"
import { NotesContext } from "../component/ContextApi"
import Navbar from "../component/Navbar"
import axios from "axios"
import { Link } from "react-router-dom"
import { StickyNote, Trash2, Plus, Sparkles, FolderOpen } from "lucide-react"

const NotesCard = () => {
  let [allnotes, setAllnotes] = useContext(NotesContext)

  async function deleteNote(id, index) {
    console.log(id, index)
    let res = await axios.delete('http://localhost:3000/api/notes/deletenotes', {
      data: { id: id },
      withCredentials: true
    })
    console.log(res);

    let copynotes = [...allnotes]
    copynotes.splice(index, 1)
    setAllnotes(copynotes)
  }

  useEffect(() => {

  }, [allnotes])

  let notes = allnotes.map((noteItem, index) => {
    return (
      <div
        key={noteItem._id || index}
        className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700/90 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 hover:-translate-y-1.5 group"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight break-words group-hover:text-indigo-200 transition-colors">
              {noteItem.title || "Untitled Note"}
            </h2>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 shrink-0 border border-slate-700/50">
              #{index + 1}
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words line-clamp-8">
            {noteItem.content}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80">
          <button
            onClick={() => { deleteNote(noteItem._id, index) }}
            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            title="Delete this note"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Delete Note</span>
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 flex-1">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Notes Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              All Notes
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              View, organize, and manage your stored notes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium">
              <StickyNote className="w-4 h-4 text-indigo-400" />
              <span>{allnotes.length} Total</span>
            </div>
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create Note</span>
            </Link>
          </div>
        </div>

        {/* Notes Grid */}
        {allnotes.length === 0 ? (
          <div className="w-full py-20 px-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl flex flex-col items-center justify-center text-center gap-4 my-auto">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-slate-400 mb-1">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-200">No notes found</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              You haven't added any notes yet. Create your first note now to see it in your gallery!
            </p>
            <Link
              to="/home"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition shadow-lg shadow-indigo-600/25"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Note</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes}
          </div>
        )}

      </main>
    </div>
  )
}

export default NotesCard