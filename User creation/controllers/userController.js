import User from "../models/userModel.js";
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
};
export default createUser