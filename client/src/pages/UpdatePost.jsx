import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  SpeedDial,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const [blog, setBlog] = useState({ title: "", content: "", image: "" });
  const [initialBlog, setInitialBlog] = useState({
    title: "",
    content: "",
    image: "",
  }); // State to store initial fetched blog data
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await fetch(`https://blog-post-client-umber.vercel.app/api/blog/${id}`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBlog(data);
        setInitialBlog(data); // Store initial fetched blog data
      } else {
        console.log(data);
      }
    };
    fetchSingleBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(blog);
    // const res = await fetch(`http://localhost:7000/api/blog/update/${id}`, {
    const res = await fetch(`https://blog-post-client-umber.vercel.app/api/blog/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(blog),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Blog updated!");
    } else {
      console.log(data);
    }
    navigator("/");
  };

  return (
    <Card
      sx={{
        p: 4,
        py: 5,
        maxWidth: "610px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        borderRadius: "15px",
      }}
      elevation={12}
    >
      <CardContent sx={{ m: 0 }}>
        <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
          Update Blog!
        </Typography>
      </CardContent>
      <TextField
        id="outlined-basic"
        label="title"
        name="title"
        value={blog.title}
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Image-URL"
        name="image"
        value={blog.image}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        id="outlined-basic"
        label="content"
        variant="outlined"
        name="content"
        value={blog.content}
        rows={4}
        multiline
        onChange={handleChange}
      />
      <Box sx={{ textAlign: "center" }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          onClick={handleSubmit}
          icon={<Add />}
        />
      </Box>
    </Card>
  );
};

export default UpdatePost;


