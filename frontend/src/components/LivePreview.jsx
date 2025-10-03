import React, { useEffect, useState } from 'react'
import axios from 'axios'

// const API_BASE = 'http://localhost:4000/api'
const API_BASE = 'https://idea-board-production.up.railway.app/api'

export default function LivePreview({ pollInterval = 3000 }){
  const [ideas, setIdeas] = useState([])

  const fetch = async () => {
    try{
      const res = await axios.get(`${API_BASE}/ideas`)
      if (Array.isArray(res.data)) setIdeas(res.data.slice(0, 3))
      else if (res.data && Array.isArray(res.data.ideas)) setIdeas(res.data.ideas.slice(0, 3))
    }catch(err){
      // ignore for preview
    }
  }

  useEffect(()=>{
    fetch()
    const t = setInterval(fetch, pollInterval)
    return ()=> clearInterval(t)
  }, [])

  if (!ideas.length) return (
    <div className="h-64 md:h-80 rounded-lg flex items-center justify-center text-slate-400">No ideas yet — be the first!</div>
  )

  return (
    <div className="space-y-3">
      {ideas.map(i=> (
        <div key={i._id} className="p-3 bg-white rounded-lg shadow-sm">
          {i.image && (
            <div className="mb-2">
              <img 
                src={`data:${i.image.contentType};base64,${i.image.data}`}
                alt={i.image.originalName}
                className="w-[150px] h-[75px] object-cover rounded-lg"
              />
            </div>
          )}
          <div className="text-sm text-slate-800">{i.text}</div>
          <div className="text-xs text-slate-400 mt-2">{i.upvotes ?? 0} votes • {new Date(i.createdAt).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  )
}
