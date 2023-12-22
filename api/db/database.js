import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected to the database"))
.catch(()=>console.log(err,"occured"))