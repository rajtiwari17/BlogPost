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




BlogRouter.put("/update/:id", getAuth, async (req, res)=>{
    const {title, content, image} = req.body;
    await Blog.findOneAndUpdate({user : req.userId, _id: req.params.id},{
        title, content, image
    })
    .then((res)=>{response(res, 200, {msg:"blog updated", blog: res})})
    .catch((error)=>{response(res, 400, {error:error,msg:"blog not found"})})

})



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

// `${windows.location.origin}`