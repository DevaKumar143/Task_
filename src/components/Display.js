import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Display = () => {
  const [forms, setforms] = useState([]);
  const Navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/allnote")
      .then((res) => {
        console.log("dfgfdhfd", res.data.AllNote);
        setforms(res.data.AllNote);
      })

      .catch((err) => console.error(err));
  }, []);

  const deleteNote = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token Found");
      return;
    }
    console.log("Hello World");
    axios
      .delete(`http://localhost:8080/delete/${id}`, {
        headers: {
          "auth-token": token,
        },
      })
      .then(() => {
        setforms(forms.filter((note) => note._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    Navigate(`/edit/${id}`);
  };

  return (
    <div>
      <ul>
        {forms.map((note) => (
          <li key={note._id}>
            <p>{note.name}</p>
            <p>{note.description}</p>
            <p>{note.Create}</p>
            <p>{new Date(note.Create).toLocaleDateString("en-IN")}</p>
            {note.image && <img src={note.image} alt="note" width="200" />}

            <button onClick={() => deleteNote(note._id)}>Delete</button>
            <button onClick={() => handleEdit(note._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
