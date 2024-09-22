import axios from "../axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Note() {
    const username = localStorage.getItem("username");
  const [state, setState] = useState([]); // List of notes
  const [note, setNote] = useState({ title: "", content: "" }); // New or updated note
  const [editingId, setEditingId] = useState(null); // Track if we're updating a note
  const navigate = useNavigate();
  // Fetch all notes when component mounts
  useEffect(() => {
    axios
      .get("all")
      .then((response) => {
        console.log(response.data);
        setState(response.data);
      })
      .catch((err) => {
        console.log(err.message); // Log error message
      });
  }, []);

  // Add new note or update existing note
  const addOrUpdateNote = () => {
    if (editingId) {
      // If editing, update the existing note
      axios
        .put(`update/${editingId}/`, note) // Use 'put' to update the note
        .then((response) => {
          console.log("note updated", response.data);
          // Update the state to reflect the updated note
          setState(
            state.map((obj) =>
              obj.id === editingId ? response.data : obj
            )
          );
          setNote({ title: "", content: "" }); // Clear input fields
          setEditingId(null); // Reset editing mode
        })
        .catch((err) => {
          console.log(err.message); // Log error message
        });
    } else {
      // If not editing, create a new note
      axios
        .post("create/", note)
        .then((response) => {
          console.log("note added", response.data);
          setState([...state, response.data]); // Add new note to state
          setNote({ title: "", content: "" }); // Clear input fields
        })
        .catch((err) => {
          console.log(err.message); // Log error message
        });
    }
  };

  // Delete note
  const deleteNote = (id) => {
    axios
      .delete(`item/${id}/delete/`)
      .then(() => {
        console.log("note deleted", id);
        setState(state.filter((obj) => obj.id !== id)); // Remove deleted note from state
      })
      .catch((err) => {
        console.log(err.message); // Log error message
      });
  };

  // Start editing a note
  const editNote = (id) => {
    const noteToEdit = state.find((obj) => obj.id === id);
    setNote({ title: noteToEdit.title, content: noteToEdit.content }); // Set note values to the selected note
    setEditingId(id); // Track the note being edited
  };
  const handleLogout = () => {
    // Clear any stored authentication tokens or user info
    localStorage.removeItem("authToken"); // Adjust as necessary for your app

    // Redirect to the login page
    navigate("/");
  };
  return (
    <div>
        <h1>{username}</h1>
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        type="text"
        name="note"
        placeholder="Title"
      />
      <input
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        type="text"
        name="content"
        placeholder="Content"
      />
      <button onClick={addOrUpdateNote}>
        {editingId ? "Update Note" : "Add Note"}
      </button>
      {state.map((obj) => {
        return (
          <div key={obj.id} style={{ display: "flex", margin: "10px 0" }}>
            {obj.id}, {obj.title}, {obj.content}
            <button onClick={() => editNote(obj.id)}>Edit</button>
            <button onClick={() => deleteNote(obj.id)}>Delete</button>
          </div>
        );
      })}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Note;
