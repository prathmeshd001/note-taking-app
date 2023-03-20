import { useSelector } from 'react-redux'
import { NoteData, Tag } from '../App'
import { Reducer } from '../state/features/changeTheme/changeThemeSlice'
import NoteForm from './NoteForm'
import { useNote } from './NoteLayout'

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData)=> void
    onAddTag: (tag: Tag)=> void
    availableTags: Tag[]
}

const EditNote = ({onSubmit, onAddTag, availableTags}: EditNoteProps) => {
    const note = useNote();
    const theme = useSelector((state: Reducer) => state.theme.theme);
    
    return (
        <>
            <h1 className={`mb-4 text-${theme==="dark" && "light"}`}>Edit Note</h1>
            <NoteForm title={note.title} markdown={note.markdown} tags={note.tags} onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
}

export default EditNote