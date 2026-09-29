import axios from "axios"
import { useState,createContext, useEffect } from "react"

export let NotesContext = createContext()

const ContextApi = (props) => {
   const [allnotes, setAllnotes] = useState([])

   async function datafetch() {

    let response = await axios.get('http://localhost:3000/api/notes/allnotes',{
    withCredentials: true,})

  setAllnotes(response.data);

   }

  console.log(allnotes);

     useEffect(()=>{

      datafetch()

     },[])
   
  return (
    <NotesContext.Provider value={[allnotes, setAllnotes]}>
    {props.children}
    </NotesContext.Provider>
  )
}

export default ContextApi