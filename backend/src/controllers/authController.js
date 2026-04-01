import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({error: "This email is already in use. Maybe login??"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            email, 
            passowrd: hashedPassword, 
            name
        });

        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            });
        } else {
            res.status(400).json({error: "Invalid user data."})
        }
    } catch (error) {
        console.error("Error in register controller: ", error);
        res.status(500).json({error: "Server error."})
    }


};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Password or email is incorrect. Or register."});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in login: ", error.message);
        res.status(500).json({error: "Internal server error."})
    }

};