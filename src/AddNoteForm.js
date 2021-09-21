import React from "react";
import { useNotesStore } from "./NotesContext";

const AddNoteForm = () => {
  const [noteText, setNoteText] = React.useState("");
  const notesStore = useNotesStore();

  return (
    <>
      <input value={noteText} onChange={(e) => setNoteText(e.target.value)} />
      <button onClick={() => notesStore.addNote(noteText)}>Add Note</button>
    </>
  );
};

export default AddNoteForm;
