const express = require("express");
const session = require("express-session");

const { SESSION_SECRET } = process.env;

const user_route = new express.Router();

const bodyParser = require("body-parser");

user_route.use(session({ secret: SESSION_SECRET }));

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.use(express.static("public"));

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

const userController = require("../controller/userController");

const auth = require("../middlewares/auth");

user_route.get("/register", auth.isLogout, userController.registerLoad);
user_route.post("/register", upload.single("image"), userController.register);

user_route.get("/", auth.isLogout, userController.loadLogin);
user_route.post("/", userController.login);
user_route.get("/logout", auth.isLogin, userController.logout);

user_route.get("/dashboard", auth.isLogin, userController.loadDashboard);

user_route.get("*", (res, req) => {
  res.redirect("/");
});

module.exports = user_route;
