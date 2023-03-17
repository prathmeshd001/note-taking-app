import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import NewNote from "./components/NewNote"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { v4 as uuidv4 } from 'uuid';
import NoteList from "./components/NoteList"
import NoteLayout from "./components/NoteLayout"
import Note from "./components/Note"
import EditNote from "./components/EditNote"

export type Tag={
  id: string
  label: string
}

export type Note={
  id: string
} & NoteData


export type NoteData={
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote={
  id: string
} & RawNoteData


export type RawNoteData={
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note)=>{
      return {...note, tags: tags.filter(tag=> note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}:NoteData) {
    setNotes((previousNotes: RawNote[])=>{
      return [...previousNotes, {...data, id: uuidv4(), tagIds: tags.map(tag=>tag.id)}]
    })
  }

  function onUpdateNote(id: string, {tags, ...data}:NoteData) {
    setNotes((previousNotes: RawNote[])=>{
      return previousNotes.map(note =>{
        if(note.id === id){
          return {...note, ...data, tagIds: tags.map(tag=> tag.id)}
        }else{
          return note;
        }
      })
    })
  }

  function onDeleteNote(id:string) {
    setNotes((previousNotes: RawNote[])=>{
      return previousNotes.filter(note => note.id !== id);
    })
  }

  function onAddTag(tag: Tag){
    setTags((prev: Tag[])=> [...prev, tag]);
  }

  function onUpdateTag(id: string, label: string){
    setTags((prev: Tag[])=> prev.map(tag=> {
      if(tag.id=== id){
        return {...tag, label: label}
      }else{
        return tag;
      }
    }));
  }

  function onDeleteTag(id: string){
    setTags((prev: Tag[])=> prev.filter((tag)=> tag.id !== id));
  }

  return (
    <Container className="my-4">
      <Routes>
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />} />
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags} />} />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />} >
      <Route index element={<Note onDelete={onDeleteNote}/>} />
      <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={onAddTag} availableTags={tags} />} />
      </Route>
      <Route path="*" element={ <Navigate to="/" />} />
    </Routes>
    </Container>
    
  )
}

export default App
