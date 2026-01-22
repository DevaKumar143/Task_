import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: "",
    description: "",
    image: "",
    location: " ",
    Create: " ",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found");
      return;
    }
    axios
      .get(`http://localhost:8080/show/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data.note);
        setFormData(res.data.note[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/update/${id}`, formData, {
        headers: { "auth-token": token },
      })
      .then(() => {
        alert("Note Updated");
        navigate("/show");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Edit Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /> <br />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br /> <br />
         {formData.image && <img src={formData.image} alt="image" width="200" />}
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <br /> <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
