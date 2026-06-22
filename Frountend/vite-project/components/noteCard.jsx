import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'


export const Notecard = ({note , setNotes}) => {

    const handleDelete = async (e,id) =>{
        e.preventDefault(); //get rid of the navigation function to the new page

        if(!window.confirm("Are you sure you sure to delete this note?? ")) return;
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter((note) => note._id !== id));// get rid of the deleted one
            toast.success("Note deleted Succesfully")
        } catch (error) {
            console.log(error)
            toast.error("error deleting the note.please try again later")
        }
    }
  return (
    <Link to={`/note/${note._id}`}
    
    className='card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-primary cursor-pointer'>
    
    <div className="card-body">

        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>
            {formatDate(new Date(note.createdAt))}
            </span>

            <div className="flex items-center gap-1">
                <PenSquareIcon className='size-4 text-base-content/70' />
                <button className='btn btn-ghost btn-xs text-error' onClick={(e)=> handleDelete(e , note._id)}>
                    <Trash2Icon className='size-4 text-base-content/70' />
                </button>

            </div>
        </div>
    </div>
    
    noteCard</Link>
    
  )
}

 
export default Notecard