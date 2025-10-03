import React from 'react'
import { Link } from 'react-router-dom'
import LivePreview from '../components/LivePreview'

const features = [
  {title: 'Share ideas quickly', desc: 'Post short ideas anonymously in seconds.'},
  {title: 'Upvote the best', desc: 'Community-driven feedback highlights what matters.'},
  {title: 'Lightweight & private', desc: 'No accounts, no friction — just ideas.'},
]

function Feature({title, desc, icon}){
  return (
    <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md flex gap-4 items-start">
      <div className="flex-none w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  )
}

export default function Landing(){
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="blob blob--1" aria-hidden></div>
      <div className="blob blob--2" aria-hidden></div>
      <div className="blob blob--3" aria-hidden></div>

      <header className="relative">
        <div className="bg-gradient-to-br from-indigo-600 via-pink-500 to-orange-400 text-white py-28">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight headline-animate">Make your ideas shine</h1>
            <p className="mt-4 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">Capture quick thoughts, let the community upvote, and surface the best ideas effortlessly.</p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link to="/app" className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-transform cta-pulse">Open Idea Board</Link>
              <a className="inline-flex items-center gap-2 text-white/90 px-4 py-2 rounded-full bg-white/10">Learn more</a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Turn small sparks into better ideas</h2>
            <p className="mt-4 text-slate-600 max-w-xl">Idea Board is a lightweight, anonymous place to capture thoughts and let the community surface the best ones with simple upvotes.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map((f, idx) => (
                <div key={idx} className="feature-anim" style={{animationDelay: `${idx*80}ms`}}>
                  <Feature title={f.title} desc={f.desc} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>} />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/app" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-indigo-700">Try the live board</Link>
              <span className="ml-4 text-sm text-slate-500">.</span>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-2xl bg-gradient-to-br from-white to-indigo-50 p-6 shadow-lg">
              <LivePreview />
            </div>
          </div>
        </div>
      </main>

      {/* <footer className="py-8 text-center text-sm text-slate-500">
        <div className="container">© {new Date().getFullYear()} Idea Board — Simple idea sharing.</div>
      </footer> */}
    </div>
  )
}
