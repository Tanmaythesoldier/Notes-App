import { useEffect, useState, useContext} from 'react'
import Navbar from '../component/Navbar'
import{ useForm} from 'react-hook-form'
import { NotesContext } from "../component/ContextApi"
import axios from 'axios'
import { toast } from 'react-toastify'
const Home = () => {
  let [allnotes, setAllnotes] = useContext(NotesContext)

  const { register, handleSubmit,reset } = useForm()
  const [notes, setNotes] = useState( [])

useEffect(()=>{

  setNotes(allnotes)
  

},[notes,allnotes])

  async function Notesdata(e){

    try{
  let res = await axios.post('http://localhost:3000/api/notes/addnotes',e,{
    withCredentials: true,
  })

    let copynotes = [...notes]
    copynotes.push(e)
    setNotes(copynotes)
    setAllnotes(copynotes)
    reset()

  toast.success("Notes created")

}catch (error) {
  if (error.response?.status === 401) {
    toast.error("Please login");
  } else {
    toast.error("Something went wrong");
  }
}

  }

  
  async function deleteNote(id,index){

    try{
    let res = await axios.delete("http://localhost:3000/api/notes/deletenotes",{
            data: {
                id: id
            },
            withCredentials: true
        })
        console.log(res);
        
    let copynotes = [...notes]
    copynotes.splice(index,1)
    setAllnotes(copynotes)
    setNotes(copynotes)

    toast.success("Notes Deleted")

    }catch (error) {

  if (error.response?.status === 401) {
    toast.error("Please login");
  } else {
    toast.error("Something went wrong");
  }
  
}
  }

  return (
    <div className="w-screen min-h-screen bg-indigo-300">
      <Navbar/>
      <div className='  w-screen h-100 flex flex-col p-7 gap-5 '>
        <form onSubmit={handleSubmit(Notesdata)} className='shadow-xl/30  flex bg-white w-full h-full flex-col p-5 gap-5 justify-between rounded-2xl'>
          <h1 className="text-[1.5em] ml-1.5">Writes Your <span className='text-red-600 text-[1.3em]'>N</span>otes</h1>
          <input {...register("title")} type="text" placeholder="Note Title" className="text-[1.5em] p-2 rounded-2xl" />
          <textarea {...register("content")} placeholder="Note Content" className="p-2 h-30 text-[1.25em] rounded-2xl" />
          <button type='Submit' className="bg-indigo-300 hover:bg-indigo-500 active:bg-indigo-700 p-2 text-[1.25em] rounded-2xl">Add Notes</button>
        </form>
      </div>
      <hr />

      <div className='flex flex-col p-7 gap-5'>
        <h1 className="text-[1.5em] font-semibold">Your Notes</h1>
        <div className=' w-full flex flex-wrap  gap-4 '>
          {notes.map(function(notes,index){
            return(
            <div key={notes._id } key={index} className="w-120 h-50 bg-white shadow-xl/30 gap-5 justify-between flex flex-col p-5 rounded-2xl ">
                <h1 className="text-[1.25em] font-semibold">{notes.title}</h1>
                <p className="text-[1.1em]">{notes.content}</p>
                <button type="Submit" onClick={()=>{deleteNote(notes._id,index)}} className=" p-1 bg-red-500 rounded-2xl active:bg-red-700 active:scale-90  hover:bg-red-600"> Delete </button>
              </div>
            )
          })}
        </div>
     
      </div>

        </div>

   
  )
}

export default Home