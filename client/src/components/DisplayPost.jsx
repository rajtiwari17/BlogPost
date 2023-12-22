import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostCard from "./PostCard";

const DisplayPost = () => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await fetch("http://localhost:7000/api/blog/", {
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








// import React from "react";
// import PostCard from "./PostCard";
// import {Box} from "@mui/material"

// const DisplayPost = () => {

//   const post = [
//     {
//       title:"This is title 1",
//       content: "This is the content of the first blog post",
//       image: //"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F3%2FArt-PNG-Free-Image.png&f=1&nofb=1&ipt=5855cc39117187b4282d7209f48d86a46c423439cfb79799ebca54d95e6867cb&ipo=images",
//         "http://www.pixelstalk.net/wp-content/uploads/2016/07/Kakashi-Wallpaper.jpg",
//       user:"Kakashi",
//       timestamp:"2 days ago"
//     },
//     {
//         title:"This is title 2",
//         content:"This is the content of the second blog post",
//         image:
//           "http://images6.fanpop.com/image/photos/36300000/Kakashi-image-kakashi-36320413-1848-2560.jpg" ,
//         user:"Jiraya",
//         timestamp: "1 days ago"
//       }
//   ];

//   return (
// //     <Box
// //       sx={{
// //         maxWidth: "500px",
// //         display: "flex",
// //         flexdirection: "column",
// //         margin: "auto",
// //         gap: 3,
// //       }}
// //     >
// //         {post && post.map(post=>{
// //             <PostCard props={post} />
// //         })}


// // {/* 
// //         {post && post.map((post, index) => (
// //             <PostCard key={index} post={post} />
// //         ))} */}


// //         {/* {post && post.map((singlePost, id) => (
// //             <PostCard key={id} post={singlePost} />
// //         ))}

// //         {post && post.map((singlePost, index) => (
// //             <div key={index} id={`outlined-basic-${index}`}>
// //                 <PostCard key={index} post={singlePost} />
// //             </div>
// //         ))} */}


// //     </Box>

//     <Box sx={{maxWidth:"500px", display:"flex", flexDirection:"column"}}> 
//         <h1>HEllo this is blogs</h1>

//         {post.map((singlePost, index) => (
//         <PostCard
//           key={index}
//           title={singlePost.title}
//           content={singlePost.content}
//           image={singlePost.image}
//           user={singlePost.user}
//           timestamp={singlePost.timestamp}
//         />
//       ))}

//     </Box>



//   );
// };

// export default DisplayPost;

