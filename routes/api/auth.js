const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// const auth = require('../../middleware/auth');

//Article Model
const User = require("../../models/user");

// @route POST api/auth
// @desc Login user with email password
// @access Public
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) throw Error('User does not exist');
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');
    
        const token = jwt.sign({ id: user._id, email:user.email, name:user.name }, config.get('jwtSecret'));
        if (!token) throw Error('Couldnt sign the token');
    
        res.header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// @route GET api/auth
// @desc get the user
// @access Public
router.get("/user", (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
