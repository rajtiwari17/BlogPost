import express from "express"
import User from "../models/UserSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import getAuth from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const UserRoutes = express.Router();
UserRoutes.use(express.json());

UserRoutes.get("/", async (req, res)=>{
    await User.find()
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(400).json({err : err})
    })
})


// SIGN UP ROUTE (REGISTER)
UserRoutes.post("/register", async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        console.log(req.body);
        
        // user have to fill all the required fields
        if(name && email && password){
            // console.log(name, email, password);
            const hashPassword = await bcrypt.hash(password, 10)    // converting pass into hash for security

            // using hashPassword for security
            const user = await User.create({name, email, password: hashPassword})
            res.status(200).json({msg: "user registered succesfully", user: user})
        }else{
            res.status(400).json({msg: "Please fill all the required fields for registering"})
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error})
    }
})


// LOGIN ROUTE (SIGN IN)
// UserRoutes.post("/login", async(req,res)=>{
//     try {
//         const {email, password} = req.body;
//         const existUser = await User.findOne({email})
//         if(!existUser){
//             res.status(404).json({error:"user not found"})
//         }
//         const comparePassword = await bcrypt.compare(password, existUser.password);
//         if(!comparePassword){
//             res.status(400).json({msg:"Wrong Password"})
//         }
//         const token = jwt.sign({id: existUser._id}, process.env.SECRET)

//         res.status(201).json({msg: "user logged in", token:token})

//     } catch (error) {
//         res.status(400).json({error:error})
//     }
// })



UserRoutes.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const existUser = await User.findOne({ email });
  
      if (!existUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const comparePassword = await bcrypt.compare(password, existUser.password);
      if (!comparePassword) {
        return res.status(400).json({ msg: "Wrong Password" });
      }
  
      const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
  
      return res.status(200).json({ msg: "User logged in", token: token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });



UserRoutes.get("/auth", getAuth, (req, res) =>{
    res.status(200).json(req.auth)
})
  


export default UserRoutes;