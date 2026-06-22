import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'


export const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">

        <div className="mx-auto max-w-7xl px-4 py-4 ">
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-primary font-mono tracking-tighter'>
                    Thinknote
                </h1>

                <div className="flex items-center space-x-4">
                    <Link to={"/create"} className="btn btn-primary btn-sm">
                    <PlusIcon className="size-5" />
                    <span>New note</span>
                    </Link>
                </div>
            </div>

        </div>
    </header>
  )
}


export default Navbar