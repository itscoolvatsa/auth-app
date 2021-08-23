const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const exphbr = require("express-handlebars");

const app = express();
dotenv.config();

// Route Import
const authRoute = require("./route/auth");
const templateRoute = require("./route/template");

// Connect to the user database database
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log("connected to the database");
    }
);

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Handlebars configuration
app.engine(".hbs", exphbr({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Middleware
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use(templateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("running on port 3000");
});
