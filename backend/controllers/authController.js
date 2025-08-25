import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

//REGISTER CONTROLLER
export const register=async(req,res)=>{
    try{
        const {email,username,password}=req.body

        if(!email || !username || !password){
            return res.status(400).json({ message: "All fields are required." })
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists."})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        newUser.save()
        return res.status(201).json({message:"User registered successfully."})
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

//LOGIN CONTROLLER
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const passMatch=await bcrypt.compare(password,user.password)
        if(!passMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({message:"Login successfull."},token)

    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

//LOGGING OUT CONTROLLER
export const logOut=async(req,res)=>{
    res.clearCookie("token"),
    res.status(200).json({message:"Logout  successfull."})
}

//FETCH CURRENT USER CONTROLLER
export const fetchCurrentUser=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")
        if (!user){
            return res.status(404).json({ message: "User not found" })
        }

        res.json(user)
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

export const fetchMe=async(req, res) => {
  try {
    const token = req.cookies?.token; // cookie-parser must be used
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};



export const verifyUser=(req, res) => {
  try {
    const token = req.cookies.token; // your cookie name
    if (!token) return res.json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return res.json({ success: true, user: decoded });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    return res.json({ success: false });
  }
};


