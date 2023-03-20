import { useMemo, useState } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Tag } from '../App'
import { Reducer } from '../state/features/changeTheme/changeThemeSlice'
import NoteCard from './NoteCard'

export type simplifiedNote ={
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: simplifiedNote[]
    onUpdateTag: (id:string, label: string)=> void
    onDeleteTag: (id: string)=>void
}

type EditTagsModalProps={
    availableTags: Tag[]
    handleClose: ()=>void
    show: boolean
    onUpdateTag: (id:string, label: string)=> void
    onDeleteTag: (id: string)=>void
}

export const customStyles = (theme: string)=>{
  return {
  control: (base: any) => ({
    ...base,
    color: `${theme==="dark"? "white": "black"}`,
    background: `${theme ==="dark" &&"#212529"}`,
  }),
  menuList: (base:any) => ({
    ...base,
    color: `${theme==="dark"? "white": "black"}`,
    background: `${theme ==="dark" &&"#212529"}`,
  }),
  option:(provided: any) => ({
    ...provided,
    color: `${theme==="dark"? "white": "black"}`,
    background: `${theme ==="dark" &&"#212529"}`,
    '&:hover': {
      background: `${theme==="dark"&& "black"}`
    },
  }),
  input: (provided: any)=>({
    ...provided,
    color: `${theme==="dark"? "white": "black"}`,
  }),
  multiValueRemove: (provided: any)=>({
    ...provided,
    color: `${"black"}`,
  }),
}};

const NoteList = ({availableTags, notes, onDeleteTag, onUpdateTag}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>("");

    const filteredNotes = useMemo(()=>{
      return notes.filter(note =>{
        return (title ==="" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length ===0 || selectedTags.every(tag=> note.tags.some((noteTag: Tag)=> noteTag.id === tag.id)))
      });
    },[title, selectedTags, notes]);

    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const theme = useSelector((state: Reducer) => state.theme.theme);


  return (
    <>
    <Row className={`align-items-center mb-4 text-${theme ==="dark"? "light":"dark"}`}>
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
            <Stack
                gap={2} 
                direction="horizontal"
            >
                <Link to="/new">
                <Button variant='outline-success'>Create</Button>
                </Link>
                <Button variant='outline-secondary'
                onClick={()=> setEditTagsModalIsOpen(true)}
                >Edit Tags</Button>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className={`mb-4`}>
            <Col className={`text-${theme ==="dark"? "light":"dark"}`}>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e=> setTitle(e.target.value)} className={`bg-${theme} text-${theme ==="dark"? "light":"dark"}`}/>
                </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
              <Form.Label className={`text-${theme ==="dark"? "light":"dark"}`}>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                styles={customStyles(theme)}
                isMulti
              />
            </Form.Group>
            </Col>
        </Row>
    </Form>
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
      {filteredNotes.map(note=>{
        return <Col key={note.id}>
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        </Col>
      })}
    </Row>
    <EditTagsModal 
      onUpdateTag={onUpdateTag}
      onDeleteTag={onDeleteTag}
      show={editTagsModalIsOpen}
      handleClose={() => setEditTagsModalIsOpen(false)}
      availableTags={availableTags}
    />
    </>
  )
}

export default NoteList

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps){
  const theme = useSelector((state: Reducer) => state.theme.theme);

  return <Modal show={show} onHide={handleClose} className={`text-${theme ==="dark"? "light":"dark"}`} >
    <Modal.Header closeButton className={`bg-${theme}`}><Modal.Title>Edit Tags</Modal.Title></Modal.Header>
    <Modal.Body className={`bg-${theme}`}>
      <Form>
          <Stack gap={2}>
            {availableTags.map(tag=>{
              return <Row key={tag.id}>
                <Col>
                  <Form.Control 
                    type="text"
                    value={tag.label}
                    onChange={(e)=> onUpdateTag(tag.id, e.target.value)}
                    className={`bg-${theme} text-${theme ==="dark"? "light":"dark"}`}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger" onClick={()=> onDeleteTag(tag.id)}>x</Button>
                </Col>
              </Row>
            })}
          </Stack>
      </Form>
    </Modal.Body>
  </Modal>
}