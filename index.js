const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const app = express();
const flash = require("connect-flash");

const port = 5000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// express-session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/seo-settings", require("./routes/seoSettingsRoute"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/profile", require("./routes/profileRouter"));
app.use("/api/header-menu", require("./routes/headerMenuRouter"));
app.use("/api/footer-menu", require("./routes/footerMenuRouter"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception: ", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection: ", error);
});

module.exports = app;
