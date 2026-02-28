import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'

// user register controller
export const userRegisterController = async (req, res) => {
    try {
        const { email, password, name } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const isExists = await userModel.findOne({
            email: email
        })

        if (isExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });



    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({
            success: false,
            message: " Internal Server Error",
        });

    }

}

export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Email or Password is INVALID"
            })
        }

        const isValidPassword = await user.comparePassword(password)

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Email or password is INVALID"
            })
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token",token)

        res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });



    } catch (error) {
        console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}