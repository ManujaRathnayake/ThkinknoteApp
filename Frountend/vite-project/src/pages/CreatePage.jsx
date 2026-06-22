import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import api from '../../lib/axios.js'

const CreatePage = () => {
  const [title , setTitle] = useState("")
  const [content , setContent] = useState("")
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error("All field are req")
      return;
    }

    setLoading(true)
      try {
        await api.post( "/notes" , {
          title,
          content
        })

        toast.success("Note created Succesfully")
        navigate("/")
      } catch (error) {
        console.log(error)
        toast.error("Error creating note")
          if(error.response.status === 429){
            toast.error("Slow down! you're creating notes too fast" , {
              duration: 4000,
              icon: "💀"
            })
          }else{
            toast.error("failed to create note!!")
          }
        
      }finally{
        setLoading(false)
      }
    
  }

  return (
    <div className='min-h-screen bg-base-200'>
    
    <div className="container mx-auto px-4 py-8">

      <div className='max-w-2xl mx-auto'>

        <Link to={"/"} className='btn btn-ghost mb-6 '>
          <ArrowLeftIcon className='size-5'/>
          Back to notes
        </Link>


        <div className='card bg-base-100 border border-base-200 shadow-xl rounded-3xl overflow-hidden'>
  
  {/* Header Strip */}
  <div className='bg-gradient-to-r from-neutral to-neutral-focus px-8 py-5 flex items-center gap-3'>
    <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-content-center'>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="text-neutral-content">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    </div>
    <div>
      <h2 className='text-neutral-content font-semibold text-base tracking-tight leading-none'>
        Create new note
      </h2>
      <p className='text-neutral-content/50 text-xs mt-1'>Fill in the details below</p>
    </div>
  </div>

  {/* Body */}
  <div className='card-body px-8 py-7 gap-0'>
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

      {/* Title Field */}
      <div className='flex flex-col gap-2'>
        <label className='text-xs font-semibold tracking-widest uppercase text-base-content/40'>
          Title
        </label>
        <input
          type="text"
          placeholder='Enter a descriptive title...'
          className='w-full h-11 px-4 text-sm rounded-xl border border-base-300 bg-base-50 text-base-content placeholder:text-base-content/25 focus:outline-none focus:ring-2 focus:ring-neutral/20 focus:border-neutral/40 transition-all duration-200'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content Field */}
      <div className='flex flex-col gap-2'>
        <label className='text-xs font-semibold tracking-widest uppercase text-base-content/40'>
          Content
        </label>
        <textarea
          placeholder='Start writing your note...'
          className='w-full h-40 px-4 py-3 text-sm rounded-xl border border-base-300 bg-base-50 text-base-content placeholder:text-base-content/25 focus:outline-none focus:ring-2 focus:ring-neutral/20 focus:border-neutral/40 transition-all duration-200 resize-none leading-relaxed'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p className='text-xs text-base-content/30 text-right'>
          {content.length} characters
        </p>
      </div>

      {/* Divider */}
      <div className='border-t border-base-200' />

      {/* Actions */}
      <div className='flex justify-between items-center'>
        <p className='text-xs text-base-content/30 flex items-center gap-1.5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          All fields are required
        </p>
        <div className='flex gap-2'>
          <button
            type='button'
            className='btn btn-ghost btn-sm rounded-xl text-base-content/40 hover:text-base-content hover:bg-base-200 transition-all text-xs px-4'
            disabled={loading}
          >
            {loading? "Please wait..." : "discard"}
         
          </button>
          <button
            type='submit'
            className='btn btn-neutral btn-sm rounded-xl px-5 gap-2 text-xs shadow-sm hover:shadow-md transition-all duration-200'
            disabled={loading}>
            {loading? "creating..." : "Save note"}
          
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          
          </button>
        </div>
      </div>

    </form>
  </div>
</div>
      </div>
    </div>
    
    </div>
  )
}

export default CreatePage