import  { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
    const [forma, setforma] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setforma((prev) =>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("Submit Data Signup", forma);
        try {
          const response = await axios.post("http://localhost:8080/register",forma)
          console.log(response);
          localStorage.setItem("token", response.data.Authtoken);
        } catch (error) {
          console.log(error.message);
        }
    } 
  return (
    <div>
       <div className="col-6 offset-3">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input type="text" class="form-control" id="name" name="name" onChange={handleChange} value={forma.name} />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input type="email" class="form-control" id="email" name="email" onChange={handleChange} value={forma.email} />
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
            value={forma.password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default SignUp
