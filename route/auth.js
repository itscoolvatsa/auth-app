const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../model/user");
const {
    signupValidation,
    loginValidation,
} = require("../middleware/validation");
const { hashPassword, comparePassword } = require("../services/password");

const router = express.Router();

dotenv.config();

// Creating a post request for SignUp
router.post("/register", signupValidation, async (req, res) => {
    // Checking the user is in database or not
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(400).send(`Email already exists`);
    }

    // Hashing the password
    const hashedPassword = await hashPassword(req.body.password);

    // Creating new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ email: savedUser.email });
    } catch (e) {
        return res.status(400).send(err);
    }
});

// Creating a post request for SignIn
router.post("/login", loginValidation, async (req, res) => {
    // Checking the user is avalable or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send(`Email or Password is wrong`);
    }
    // Validating the password
    const validPassword = await comparePassword(
        user.password,
        req.body.password
    );

    if (!validPassword) {
        return res.status(400).send("Email or Password is wrong");
    }

    // Create an assign a jwt token
    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET
    );
    res.cookie("jwt-token", token);
    res.status(201).send("logged in");
});

router.get("/logout", (req, res) => {
    res.cookie("jwt-token", "");
    res.redirect("/");
});

module.exports = router;
