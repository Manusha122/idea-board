import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IdeaCard from '../components/IdeaCard'

// During local development it's convenient to default to a localhost backend.
// In production (docker) VITE_API_BASE_URL is set to the docker service URL.
// const API_BASE = 'http://localhost:4000/api'
const API_BASE = 'https://idea-board-production.up.railway.app/api'


export default function IdeaBoard(){
  const [ideas, setIdeas] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastCreatedId, setLastCreatedId] = useState(null)

  const fetchIdeas = async () => {
    try {
      const res = await axios.get(`${API_BASE}/ideas`)
      // Defensive: ensure the backend returned an array. If not, log and reset to []
      if (Array.isArray(res.data)) {
        setIdeas(res.data)
      } else {
        console.warn('Unexpected ideas response:', res.data)
        // try to recover: if the API returned a payload containing `ideas` field use it
        if (res.data && Array.isArray(res.data.ideas)) setIdeas(res.data.ideas)
        else setIdeas([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=>{ fetchIdeas() }, [])

  const [selectedImage, setSelectedImage] = useState(null)

  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('text', text.trim())
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      const res = await axios.post(`${API_BASE}/ideas`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 5000 // 5 second timeout
      })
      setText('')
      setSelectedImage(null)
      if (res.data && res.data._id) setLastCreatedId(res.data._id)
      await fetchIdeas()
    } catch(err) {
      console.error(err)
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please make sure the backend is running and try again.')
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err.response?.data?.error || 'An error occurred. Please try again.')
      }
    }
    setLoading(false)
  }

  const upvote = async (id) => {
    try{
      await axios.post(`${API_BASE}/ideas/${id}/upvote`)
      await fetchIdeas()
    }catch(err){ console.error(err) }
  }

  const remove = async (id) => {
    try{
      await axios.delete(`${API_BASE}/ideas/${id}`)
      await fetchIdeas()
    }catch(err){ console.error(err) }
  }

  const update = async (id, text) => {
    try{
      await axios.put(`${API_BASE}/ideas/${id}`, { text })
      await fetchIdeas()
    }catch(err){ console.error(err) }
  }

  return (
    <div className="min-h-screen py-8 bg-slate-50">
      <div className="container">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Idea Board</h1>
            <p className="text-sm text-slate-500">Share short ideas, upvote what you like.</p>
          </div>
          <a href="/" className="text-sm text-slate-600">Back to Home</a>
        </header>

        <div className="mb-6 sticky top-4 z-10">
          <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 p-3 bg-slate-50 rounded-t border-t border-x">
                  <button
                    type="button"
                    onClick={() => setText(text => `**${text}**`)}
                    className="px-3 py-1.5 hover:bg-slate-200 rounded text-slate-700 hover:text-slate-900 transition-colors"
                    title="Bold"
                  >
                    <span className="font-bold text-lg">B</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setText(text => `*${text}*`)}
                    className="px-3 py-1.5 hover:bg-slate-200 rounded text-slate-700 hover:text-slate-900 transition-colors"
                    title="Italic"
                  >
                    <span className="italic text-lg">I</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setText(text => `_${text}_`)}
                    className="px-3 py-1.5 hover:bg-slate-200 rounded text-slate-700 hover:text-slate-900 transition-colors"
                    title="Underline"
                  >
                    <span className="underline text-lg">U</span>
                  </button>
                  <div className="h-6 w-px bg-slate-300 mx-1"></div>
                  <div className="text-sm text-slate-500 flex items-center">
                    Format selected text
                  </div>
                </div>
                <textarea 
                  value={text} 
                  onChange={e=>setText(e.target.value)} 
                  maxLength={280} 
                  placeholder="Share an idea (280 chars max)" 
                  className="flex-1 p-4 rounded-b border resize-none h-100 text-lg leading-relaxed"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-slate-600">Add image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={e => setSelectedImage(e.target.files?.[0])}
                    />
                  </label>
                  {selectedImage && (
                    <span className="text-sm text-slate-500">{selectedImage.name}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    {error && <div className="text-sm text-red-600 mb-1">{error}</div>}
                    <div className="text-sm text-slate-500">{text.length}/280</div>
                  </div>
                  <button 
                    disabled={loading} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Posting...' : 'Post Idea'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map(i => (
            <IdeaCard key={i._id} idea={i} onUpvote={()=>upvote(i._id)} onDelete={remove} onUpdate={update} highlight={i._id === lastCreatedId} />
          ))}
        </div>
      </div>
    </div>
  )
}
