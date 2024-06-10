import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; // Assuming you're using bcryptjs for password hashing

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
         
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default createUser;