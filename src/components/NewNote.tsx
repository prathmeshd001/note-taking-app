import { useSelector } from 'react-redux'
import { NoteData, Tag } from '../App'
import { Reducer } from '../state/features/changeTheme/changeThemeSlice'
import NoteForm from './NoteForm'

type newNoteProps = {
  onSubmit: (data: NoteData)=> void
  onAddTag: (tag: Tag)=> void
  availableTags: Tag[]
}

const NewNote = ({onSubmit, onAddTag, availableTags}: newNoteProps) => {
  const theme = useSelector((state: Reducer) => state.theme.theme);

  
  return (
    <>
        <h1 className={`mb-4 text-${theme==="dark" && "light"}`}>New Note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}

export default NewNote