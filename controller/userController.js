const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const SALT_ROUNDS = 12;
        const { name, email, password,
            //  role 
            } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already registered' });


        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ name, email, password:passwordHash, 
            // role  
        });

        await user.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                // role: user.role,
            }
        })
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({ message: "Wrong Password"});

        const token = jwt.sign(
            {id: user.id, role: user.role}, 
            process.env.JWT_Secret, 
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        return res.json({
            message: "Login success",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } 
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
module.exports = { registerUser, login }