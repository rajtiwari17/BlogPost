import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostCard from "./PostCard";

const DisplayPost = () => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      // const res = await fetch("http://localhost:7000/api/blog/", {
      const res = await fetch("https://blog-post-client-umber.vercel.app/api/blog/", {
        method: "GET",
        headers:{
          token: localStorage.getItem("token")
        }
      })
      const data = await res.json()
      if(res.ok){
        setPosts(data)
      }else{
        console.log(data);
      }
    }
    fetchData()
  },[posts])

  // const posts = [
  //   {
  //       id:1,
  //     title: "This is title 1",
  //     content: "This is the content of the first blog post",
  //     image: "http://www.pixelstalk.net/wp-content/uploads/2016/07/Kakashi-Wallpaper.jpg",
  //     user: "Kakashi",
  //     timestamp: "2 days ago"
  //   },
  //   {
  //       id:2,
  //     title: "This is title 2",
  //     content: "This is the content of the second blog post",
  //     image: "http://images6.fanpop.com/image/photos/36300000/Kakashi-image-kakashi-36320413-1848-2560.jpg",
  //     user: "Jiraya",
  //     timestamp: "1 days ago"
  //   }
  // ];

  return (
    <Box
      sx={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: 3,
        py:4
      }}
    >
      {posts && posts.map((post, index) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default DisplayPost;





