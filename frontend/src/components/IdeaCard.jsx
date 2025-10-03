import React, { useState } from 'react'

// Function to format text with markdown-like syntax
const formatText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<u>$1</u>')
    .replace(/\n/g, '<br>')
}

export default function IdeaCard({ idea, onUpvote, onDelete, onUpdate, highlight }){
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(idea.text)
  const [bouncing, setBouncing] = useState(false)

  const save = async () => {
    if (!value.trim()) return
    await onUpdate(idea._id, value.trim())
    setEditing(false)
  }

  return (
    <article className={`p-4 bg-white rounded-2xl shadow hover:shadow-md transition-shadow flex flex-col justify-between h-full card-enter ${highlight? 'new-item' : ''}`}>
      <div className="mb-4">
        {idea.image && (
          <div className="mb-3">
            <img 
              src={`data:${idea.image.contentType};base64,${idea.image.data}`}
              alt={idea.image.originalName}
              className="w-[150px] h-[75px] object-cover rounded-lg"
            />
          </div>
        )}
        <div className="text-slate-800 break-words whitespace-pre-wrap">
          {editing ? (
            <textarea className="w-full p-2 border rounded" value={value} onChange={e=>setValue(e.target.value)} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: formatText(idea.text) }} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <div>{new Date(idea.createdAt).toLocaleString()}</div>
        <div className="flex items-center gap-2">
          <button onClick={async ()=>{ setBouncing(true); try{ await onUpvote() }catch(e){}; setTimeout(()=>setBouncing(false), 450) }} className={`inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-lg hover:bg-amber-200 ${bouncing? 'upvote-bounce' : ''}`}> 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 11h4v6h6v-6h4L10 3 3 11z"/></svg>
            <span className="font-medium">{idea.upvotes ?? 0}</span>
          </button>

          {editing ? (
            <>
              <button onClick={save} className="px-3 py-1 bg-green-100 text-green-800 rounded">Save</button>
              <button onClick={()=>{ setEditing(false); setValue(idea.text) }} className="px-3 py-1 bg-slate-100 text-slate-700 rounded">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={()=>setEditing(true)} className="px-3 py-1 bg-blue-50 text-blue-700 rounded">Edit</button>
              <button onClick={()=>onDelete(idea._id)} className="px-3 py-1 bg-red-50 text-red-700 rounded">Delete</button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
