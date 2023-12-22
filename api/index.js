import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/database.js"
import UserRoutes from "./routes/user.js";
import BlogRouter from "./routes/blog.js";


dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({credentials: true}));

// routes
app.use("/api/user/", UserRoutes);
app.use("/api/blog/", BlogRouter);



app.listen(port, ()=> {
    console.log("app is running at port",port);
})




// app.get("/",(req,res)=>{
//     res.json({msg: "This is home route"});
// })

// app.post("/",(req,res)=>{
//     console.log(req.body);
//     res.json(req.body)
// })