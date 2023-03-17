import { useMemo, useState } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Tag } from '../App'
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

const NoteList = ({availableTags, notes, onDeleteTag, onUpdateTag}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>("");

    const filteredNotes = useMemo(()=>{
      return notes.filter(note =>{
        return (title ==="" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length ===0 || selectedTags.every(tag=> note.tags.some((noteTag: Tag)=> noteTag.id === tag.id)))
      });
    },[title, selectedTags, notes]);

    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  return (
    <>
    <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
            <Stack
                gap={2} 
                direction="horizontal"
            >
                <Link to="/new">
                <Button variant='outline-primary'>Create</Button>
                </Link>
                <Button variant='outline-secondary'
                onClick={()=> setEditTagsModalIsOpen(true)}
                >Edit Tags</Button>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className='mb-4'>
            <Col>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e=> setTitle(e.target.value)} />
                </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
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
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton><Modal.Title>Edit Tags</Modal.Title></Modal.Header>
    <Modal.Body>
      <Form>
          <Stack gap={2}>
            {availableTags.map(tag=>{
              return <Row key={tag.id}>
                <Col>
                  <Form.Control 
                    type="text"
                    value={tag.label}
                    onChange={(e)=> onUpdateTag(tag.id, e.target.value)}
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