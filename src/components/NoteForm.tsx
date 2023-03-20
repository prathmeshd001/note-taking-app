import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from '../App'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { Reducer } from '../state/features/changeTheme/changeThemeSlice'
import {customStyles} from "./NoteList"

type NoteFormProps = {
    onSubmit: (data: NoteData)=> void
    onAddTag: (tag: Tag)=> void
    availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({title="", markdown="", tags=[], onSubmit, onAddTag, availableTags}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate= useNavigate();
    const theme = useSelector((state: Reducer) => state.theme.theme);


    function handleSubmit(e: FormEvent){
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate("..");
    }

    return (
        <Form onSubmit={handleSubmit} className={`text-${theme==="dark" && "light"}`}>
            <Stack gap={4}>
                <Row>
                    <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required placeholder='Note title' ref={titleRef} defaultValue={title} className={`bg-${theme} text-${theme ==="dark"? "light":"dark"}`}/>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect isMulti
                            value={selectedTags.map(tag=>{return {label: tag.label, value: tag.id}})}
                            options={availableTags.map(tag=>{
                                return {label: tag.label, value: tag.id}
                            })}
                            onChange={tags =>{
                                setSelectedTags(tags.map(tag=>{return {label: tag.label, id: tag.value}}))
                            }}
                            onCreateOption={label =>{
                                const newTag = {id: uuidv4(), label}
                                onAddTag(newTag);
                                setSelectedTags(prev=> [...prev, newTag]);
                            }}
                            styles={customStyles(theme)}
                        />
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required placeholder='Note body' as="textarea" rows={15} ref={markdownRef} defaultValue={markdown} className={`bg-${theme} text-${theme ==="dark"? "light":"dark"}`} />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="justify-content-end">
                    <Button type='submit' variant='outline-success'>Save</Button>
                    <Link to="..">
                    <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm