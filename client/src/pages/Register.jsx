import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Register = () => {

  const [user, setUser] = useState({name:"", email:"", password:""})
  const navigator = useNavigate()

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]:value})
  }


// const handleSubmit = async () => {
//     console.log(user); 
//     const res = fetch("http://localhost:7000/api/user/register", {
//       method: "POST",
//       headers:{
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(user)
//     })
//     const data = await res.json()
//     if(res.ok){
//       navigator("/login")
//     }else{
//       console.log(data);
//     }
// }


const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:7000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error('Registration failed'); // Throw an error if the response is not OK
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json(); // Parse response data if it's JSON
      console.log(data); // Log the response data
      
      navigator("/login");
    } else {
      console.log("Response is not in JSON format");
      // Handle the response accordingly if it's not JSON (might be different content-type)
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle other types of errors (network, etc.)
  }
};




 

  return (
    <Card
      sx={{
        p: 4,
        py: 5,
        maxWidth: "550px",
        margin: " 50px auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: "15px",
      }}
      elevation={10}
    >
      <CardContent sx={{ m: 0 }}>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ m: 0, textAlign: "center" }}
        >
          Register Here!
        </Typography>
      </CardContent>
      <TextField
        id="outlined-basic-name"
        label="name"
        variant="outlined"
        type={"text"}
        name={"name"}
        onChange={handleChange}
        value={user.name}
      />
      <TextField
        id="outlined-basic-email"
        label="email"
        variant="outlined"
        type={"email"}
        name={"email"}
        onChange={handleChange}
        value={user.email}
      />
      <TextField
        id="outlined-basic-password"
        label="password"
        variant="outlined"
        type={"password"}
        name={"password"}
        onChange={handleChange}
        value={user.password}
      />
      <Button variant="contained" onClick={handleSubmit} > Register</Button>
    </Card>
  );
};

export default Register;
