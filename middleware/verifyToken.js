const jwt = require("jsonwebtoken");

const validated = (req, res, next) => {
    cookie = req.headers.cookie;
    if (!cookie) {
        return next();
    }
    var token = cookie.split("=")[1];

    if (token) {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        return res.redirect("/dashboard");
    } else {
        next();
    }
};

const dashAuth = (req, res, next) => {
    cookie = req.headers.cookie;
    if (!cookie) {
        return res.redirect("/");
    }
    var token = cookie.split("=")[1];

    if (token) {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        return next();
    } else {
        return res.redirect("/");
    }
};

module.exports = { validated, dashAuth };
