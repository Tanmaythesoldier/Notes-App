import {useContext, useEffect} from "react"
import { NotesContext } from "../component/ContextApi"
import Navbar from "../component/Navbar"
import axios from "axios"
const NotesCard = () => {
  let [allnotes, setAllnotes] = useContext(NotesContext)

  async function deleteNote(id,index){
    let res = await axios.delete('http://localhost:3000/api/notes/deletenotes',{data:{id:id},
      withCredentials:true
    })
    console.log(res);
    
    let copynotes = [...allnotes]
    copynotes.splice(index,1)
    setAllnotes(copynotes)   
  }
  
  useEffect(()=>{

  },[allnotes])

  let notes = allnotes.map((notes,index)=>{

    return(
            <div key={notes._id} key={index} className="w-80 h-80 bg-white p-5 flex flex-col  gap-3 rounded-2xl justify-between ">
          <div className="flex flex-col gap-5">
          <h1 className="text-[1.5em] underline wrap-break-word">{notes.title}</h1>
          <p className="text-[1.2em]">{notes.content}</p>
          </div>
          <div className="">
          <button onClick={()=>{deleteNote(notes._id,index)}} className="w-full bg-indigo-300 hover:bg-red-400 active:bg-red-700 active:scale-95 rounded-2xl p-1">Delete</button>
          </div>
        </div>
    )
  })

  return (
    <div className="w-full h-full bg-indigo-300 ">
      <Navbar />
      <div className="w-screen h-screen p-5 flex flex-wrap gap-16 ">
        {notes}
      </div>
    </div>
  )
}

export default NotesCard