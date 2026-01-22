import React, { useState } from "react";
import axios from 'axios'

const Login = () => {
  const [formd, setformd] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Data", formd);
    try {
      const response = await axios.post("http://localhost:8080/login", formd);
      console.log( response.data.Authtoken)
      localStorage.setItem( "token" ,response.data.Authtoken);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="col-6 offset-3">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input type="email" class="form-control" id="email" name="email" onChange={handleChange} value={formd.email} />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={formd.password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
