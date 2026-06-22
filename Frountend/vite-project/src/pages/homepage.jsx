import React from 'react'
import Navbar from '../../components/navbar.jsx'
import RateLimitedUI from '../../components/RateLimitedUI.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Notecard from '../../components/noteCard.jsx'
import api from '../../lib/axios.js'
import NotesNotFound from '../../components/NotesNotFound.jsx'


const Homepage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes , setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/notes');
                console.log(response.data);
                setNotes(response.data);
                setIsRateLimited(false);

            } catch (error) {
                
                
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                }else {
                    toast.error('An unexpected error occurred');
                }
                
                }finally {
                    setLoading(false);
            }
        };

        fetchNotes();
    }, []);

  return (
    <div className='min-h-screen'>
        <Navbar />
        {isRateLimited && <RateLimitedUI />}


        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

            {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) =>(
                        <Notecard key= {note._id} note={note} setNotes={setNotes} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default Homepage;