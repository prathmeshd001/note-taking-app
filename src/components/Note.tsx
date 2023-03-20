import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Reducer } from "../state/features/changeTheme/changeThemeSlice";
import { useNote } from "./NoteLayout"

type NoteProps = {
    onDelete: (id: string) => void
}

export default function Note({onDelete}: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    const theme = useSelector((state: Reducer) => state.theme.theme);
    
    return (
        <>
            <Row className={`text-${theme ==="dark"? "light":"dark"}`}>
                <Col className="align-items-center mb-4">
                    <Col>
                        <h1>{note.title}</h1>
                        {note.tags.length>0 && (
                <Stack gap={1}
                    direction="horizontal"
                    className="flex-wrap"
                >
                    {note.tags.map(tag=>{
                    return <Badge className="text-truncate" key={tag.id}>
                        {tag.label}
                    </Badge>
                    })}
                </Stack>
                )}
                    </Col>
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='outline-primary'>Edit</Button>
                        </Link>
                        <Button variant='outline-danger'
                            onClick={()=>{
                                onDelete(note.id)
                                navigate("/");
                            }}
                        >Delete</Button>
                        <Link to={`/`}>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>

                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown className={`text-${theme ==="dark"? "light":"dark"}`}>{note.markdown}</ReactMarkdown>
        </>
    )
}
