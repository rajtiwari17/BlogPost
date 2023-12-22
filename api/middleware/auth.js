
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getAuth = async (req, res, next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            res.status(401).json({error: 'Unauthorised'})
        }

        const verifyToken = jwt.verify(token, process.env.SECRET);
        // console.log(verifyToken.id);

        const auth = await User.findById(verifyToken.id);

        req.userId = verifyToken.id
        req.auth = auth

        // console.log("Extracted user ID:", req.userId);

        next();
        
    } catch (error) {
        res.status(401).json({error: 'Unauthorised'})
    }

}


export default getAuth;










// import User from "../models/UserSchema.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();


// const getAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.token;

//         // console.log(token);

//         if (!token) {
//             return res.status(401).json({ error: 'Unauthorized: Token missing' });
//         }

//         const verifyToken = jwt.verify(token, process.env.SECRET);
//         // console.log(verifyToken);

//         const auth = await User.findById(verifyToken.id);

//         if (!auth) {
//             return res.status(401).json({ error: 'Unauthorized: User not found' });
//         }

//         req.userId = verifyToken.id
//         req.auth = auth
//         next();
        
//     } catch (error) {
//         console.error("Authentication error:", error);
//         return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
// };

// export default getAuth;
