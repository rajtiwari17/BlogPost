import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/database.js"
import UserRoutes from "./routes/user.js";
import BlogRouter from "./routes/blog.js";


dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors({
    // origin: "https://BlogPost.app",
    origin: "https://blog-post-client-umber.vercel.app/",
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
// app.use(cors({credentials: true}));

// routes
app.use("/api/user/", UserRoutes);
app.use("/api/blog/", BlogRouter);



app.listen(port, ()=> {
    console.log("app is running at port",port);
})


