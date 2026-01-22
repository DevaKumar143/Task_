import { useState } from "react";
import axios from "axios";


const Create = () => {
  const [formc, setformc] = useState({
    name: "",
    description: "",
    location: "",
    gender: "",
    image: "",
    date: "",
  });

  const handlChange = (e) => {
    const { name, value } = e.target;
    setformc((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data", formc);
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("No token found");
    }
    try {
      const response = await axios.post("http://localhost:8080/create", formc, {
        headers: {
          "auth-token": token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="col-6 offset-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handlChange}
            value={formc.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="description"
            className="form-control"
            id="description"
            name="description"
            onChange={handlChange}
            value={formc.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            onChange={handlChange}
            value={formc.location}
          />
        </div>
        <div className="mb-3">
          <select
            name="gender"
            id="gender"
            className="form-label"
            value={formc.gender}
            onChange={handlChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            onChange={handlChange}
            value={formc.image}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            onChange={handlChange}
            value={formc.date}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
