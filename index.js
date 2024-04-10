const express = require("express");
const router = require("./controllers/routes");
const mongoose = require("mongoose");
const cors = require("cors");

const cookie = require("./cookies/cookie");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

//middleware
app.use(express.json()); //to convert the transaction data to js object format between client and server
app.use(cookieParser()); //middleware for cookies
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://*"], // Allow requests from this origin
    credentials: true, // Enable sending cookies from the frontend
  })
);

//connecting to DB and starting the server
const port = 1412;
dbURI = "mongodb://127.0.0.1:27017/studentManagement";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, () =>
      console.log("Server Started successfully at port: ", port)
    )
  )
  .catch((err) => console.log(err));

//calling middleware
app.get("/", requireAuth, (req, res) => res.send("hello"));
// app.get("*", checkUser);
app.get("/home", checkUser, (req, res) => res.send("home page"));

app.use(router);
app.use(cookie);
