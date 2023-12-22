import getAuth from "../middleware/auth.js";
import Blog from "../models/BlogSchema.js";
import express from "express"

const BlogRouter = express.Router();
BlogRouter.use(express.json())
BlogRouter.use(getAuth);


const response = (res, status, result)=>{
    res.status(status).json(result);
}

// route for getting blog posts
BlogRouter.get('/', getAuth, async (req, res)=>{
    await Blog.find().populate("user", "-password").sort("-createdOn")
    .then(result=>{
        response(res, 200, result)
    })
    .catch(err=>{
        response(res, 400, {error: err})
    })
})

BlogRouter.post("/create", getAuth, async (req,res)=>{
   try {
        const {title, content, image} = req.body;
        if(title && content){
            const blog = new Blog({
                title, content, image, user: req.userId
            })
            await blog.save()
            response(res, 200, {msg: "blog created", blog: blog})
        }
   } catch (error) {
        response(res, 400, {error: error})
   }
})


BlogRouter.delete("/delete/:id", getAuth, async (req, res)=>{
    try {

        const blog = await Blog.findOneAndDelete({user: req.userId, _id: req.params.id})
        // const blog = await Blog.findOneAndDelete({ _id: req.body.id})

        if(!blog){
            response(res, 404, {error: "blog not found"})
        }
        response(res, 200, {msg: "blog deleted!"})
        
    } catch (error) {
        response(res, 400, {error: error})
    }
})


// BlogRouter.delete("/delete/:id", getAuth, async (req, res) => {
//     try {
//         const { id } = req.body;

//         if (!id) {
//             return res.status(400).json({ error: "Blog ID is missing in the request body." });
//         }

//         const blog = await Blog.findOneAndDelete({ user: req.userId, _id: params.id });

//         if (!blog) {
//             // Check if the blog exists but user is unauthorized
//             const existingBlog = await Blog.findOne({ _id: id });

//             if (existingBlog) {
//                 return res.status(403).json({ error: "User unauthorized to delete this blog." });
//             }

//             return res.status(404).json({ error: "Blog not found." });
//         }

//         return res.status(200).json({ msg: "Blog deleted successfully!" });
//     } catch (error) {
//         return res.status(500).json({ error: error.message || "Internal server error." });
//     }
// });



BlogRouter.put("/update/:id", getAuth, async (req, res)=>{
    const {title, content, image} = req.body;
    await Blog.findOneAndUpdate({user : req.userId, _id: req.params.id},{
        title, content, image
    })
    .then((res)=>{response(res, 200, {msg:"blog updated", blog: res})})
    .catch((error)=>{response(res, 400, {error:error,msg:"blog not found"})})

})


// BlogRouter.put("/update", getAuth, async (req, res) => {
//     try {
//         const { title, content, image, id } = req.body;

//         if (!req.userId) {
//             return response(res, 401, { error: "Unauthorized: User ID not found" });
//         }

//         const blogToUpdate = await Blog.findOne({ user: req.userId, _id: id });

//         if (!blogToUpdate) {
//             return response(res, 404, { error: "Blog not found" });
//         }

//         const updatedBlog = await Blog.findOneAndUpdate(
//             { user: req.userId, _id: id },
//             { title, content, image },
//             { new: true }
//         );

//         if (!updatedBlog) {
//             return response(res, 500, { error: "Failed to update the blog" });
//         }

//         return response(res, 200, { msg: "Blog updated", blog: updatedBlog });
//     } catch (error) {
//         return response(res, 500, { error: error.message || "Internal server error" });
//     }
// });


BlogRouter.get("/:id", getAuth, async (req, res) =>{
    await Blog.findById(req.params.id).populate("user", "-password")
    .then((result)=>{response(res, 200, result)})
    .catch((err)=>response(res, 400, err))
})



// route to check middleware is properly sending userId
BlogRouter.get("/test-auth", getAuth, (req, res) => {
    return res.status(200).json({ userId: req.userId });
});



export default BlogRouter;