const express = require("express");

const { validated, dashAuth } = require("../middleware/verifyToken");
// Declaring express router
const router = express.Router();

// @desc  Login/Landing page
// @route Get /

router.get("/", validated, (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

// @desc  Login/Landing page
// @route Get /

router.get("/signup", validated, (req, res) => {
    res.render("signup", {
        layout: "signup",
    });
});

// @desc  Dashboard
// @route Get /

router.get("/dashboard", dashAuth, (req, res) => {
    res.render("dashboard", { name: req.user.email });
});

router.get("*", (req, res) => {
    res.redirect("/dashboard");
});

module.exports = router;
