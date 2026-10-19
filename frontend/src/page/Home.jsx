import { useEffect, useState, useContext } from 'react'
import Navbar from '../component/Navbar'
import { useForm } from 'react-hook-form'
import { NotesContext } from "../component/ContextApi"
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  FileText, 
  PenLine, 
  StickyNote, 
  Calendar,
  Layers
} from 'lucide-react'

const Home = () => {
  let [allnotes, setAllnotes] = useContext(NotesContext)

  const { register, handleSubmit, reset } = useForm()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(allnotes)
  }, [notes, allnotes])

  async function Notesdata(e) {
    try {
      let res = await axios.post('http://localhost:3000/api/notes/addnotes', e, {
        withCredentials: true,
      })
      let copynotes = [...notes]
      copynotes.push(res.data.note)
      setNotes(copynotes)
      setAllnotes(copynotes)
      reset()

      toast.success("Notes created")
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  async function deleteNote(id, index) {
    console.log(id, index)
    try {
      let res = await axios.delete("http://localhost:3000/api/notes/deletenotes", {
        data: {
          id: id
        },
        withCredentials: true
      })

      let copynotes = [...notes]
      copynotes.splice(index, 1)
      setAllnotes(copynotes)
      setNotes(copynotes)

      toast.success("Notes Deleted")
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10 flex-1">
        
        {/* Workspace Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Create & Manage Notes
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Capture your ideas, todos, and thoughts in one streamlined space
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium shadow-sm">
              <StickyNote className="w-4 h-4 text-indigo-400" />
              <span>{notes.length} {notes.length === 1 ? "Note" : "Notes"}</span>
            </div>
          </div>
        </div>

        {/* Note Creation Form Card */}
        <div className="w-full">
          <form
            onSubmit={handleSubmit(Notesdata)}
            className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 relative overflow-hidden transition-all duration-200 hover:border-slate-700/80"
          >
            {/* Top subtle highlight line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <PenLine className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Write Your <span className="text-indigo-400">N</span>otes
                </h2>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">Press Add Notes to save</span>
            </div>

            <div className="flex flex-col gap-3.5">
              <input
                {...register("title")}
                type="text"
                placeholder="Note Title (e.g. Project brainstorm, Meeting summary...)"
                className="w-full px-4 py-3 sm:py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-base sm:text-lg font-semibold text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />
              <textarea
                {...register("content")}
                placeholder="Write your note content here..."
                rows="4"
                className="w-full px-4 py-3 sm:py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-sm sm:text-base text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition resize-y min-h-[120px]"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Notes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notes Grid Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Your Notes
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Showing {notes.length} {notes.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {/* Notes Cards Container */}
          {notes.length === 0 ? (
            <div className="w-full py-16 px-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-slate-400 mb-1">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">No notes created yet</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                Get started by filling in the title and content in the box above to store your first note!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {notes.map((noteItem, index) => {
                return (
                  <div
                    key={noteItem._id || index}
                    className="bg-slate-900/75 border border-slate-800/90 hover:border-slate-700/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-indigo-500/5 group"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight break-words group-hover:text-indigo-200 transition-colors">
                          {noteItem.title || "Untitled Note"}
                        </h3>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 shrink-0 border border-slate-700/50">
                          #{index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words line-clamp-6">
                        {noteItem.content}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/70 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => deleteNote(noteItem._id, index)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 active:scale-90 transition-all cursor-pointer"
                        title="Delete this note"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default Home