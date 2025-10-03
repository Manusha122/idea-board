import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 py-8 bg-gradient-to-t from-white to-slate-50 text-slate-500">
      <div className="container text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Idea Board</div>
        <div className="flex items-center gap-3">
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}
