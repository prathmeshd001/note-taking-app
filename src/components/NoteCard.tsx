import React from "react";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { simplifiedNote } from "./NoteList";
import styles from "../styles/NoteList.module.css"
import { useSelector } from "react-redux";
import { Reducer } from "../state/features/changeTheme/changeThemeSlice";

const NoteCard = ({id, title, tags}: simplifiedNote) => {
  const theme = useSelector((state: Reducer) => state.theme.theme);

  return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${theme==="dark"? styles.cardDark : styles.cardLight} bg-${theme}`} >
    <Card.Body>
      <Stack gap={2} className={`align-items-center justify-content-center h-100 text-${theme ==="dark"? "light":"dark"}`} >
        <span className="fs-5">{title}</span>
        {tags.length>0 && (
          <Stack gap={1}
            direction="horizontal"
            className="justify-content-center flex-wrap"
          >
            {tags.map(tag=>{
              return <Badge className="text-truncate" key={tag.id}>
                {tag.label}
              </Badge>
            })}
          </Stack>
        )}
      </Stack>
    </Card.Body>
  </Card>;
};

export default NoteCard;
