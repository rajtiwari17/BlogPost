import React,{useContext, useState} from 'react';
import {Card, CardContent, Typography, TextField, Button} from "@mui/material";
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../App';


const Login = () => {

  const [user, setUser] = useState({ email:"", password:""})
  const navigator = useNavigate()
  const {setRefresh} = useContext(AuthContext)

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]:value})
  }


const handleSubmit = async () => {
    console.log(user); 
    // const res =  await fetch("http://localhost:7000/api/user/login", {
    const res =  await fetch("https://blog-post-client-umber.vercel.app/api/user/login", {
    
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
      localStorage.setItem("token", data.token)
      setRefresh(true)
      navigator("/")
    }else{
      console.log(data);
    }
}


  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch("http://localhost:7000/api/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });
  
  //     if (!res.ok) {
  //       throw new Error('Registration failed'); // Throw an error if the response is not OK
  //     }
  
  //     const contentType = res.headers.get('content-type');
  //     if (contentType && contentType.includes('application/json')) {
  //       const data = await res.json(); // Parse response data if it's JSON
  //       console.log(data); // Log the response data
  //       localStorage.setItem("token",data.token);
  //       navigator("/");

  //     } else {
  //       console.log("Response is not in JSON format");
  //       // Handle the response accordingly if it's not JSON (might be different content-type)
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle other types of errors (network, etc.)
  //   }
  // };

  

  return (
    <Card sx={{p:4, py:5, maxWidth:"550px", margin: " 50px auto", display:"flex", flexDirection:"column", gap:3, borderRadius:"15px"}} elevation={10}>
      <CardContent sx={{m:0}} >
        <Typography gutterBottom variant="h4" component="div"  sx={{m:0, textAlign:"center"}}>
          Login Here!
        </Typography>
      </CardContent>
      <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        type={"email"}
        name={"email"}
        onChange={handleChange}
        value={user.email}
      />
      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        type={"password"}
        name={"password"}
        onChange={handleChange}
        value={user.password}
      />
      <Button variant="contained" onClick={handleSubmit} >Login</Button>
    </Card>
  )
}

export default Login;