import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(){
  return (
    <nav className="bg-transparent backdrop-blur-md py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">IB</div>
          <div className="text-lg font-semibold text-slate-900">Idea Board</div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-slate-700 hover:text-slate-900">Home</Link>
          <Link to="/app" className="text-sm text-slate-700 hover:text-slate-900">Board</Link>
          <Link to="/app" className="hidden md:inline-flex items-center text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded">Create</Link>
        </div>
      </div>
    </nav>
  )
}
