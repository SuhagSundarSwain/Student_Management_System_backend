const express = require("express");
const router = require("./controllers/routes");
const mongoose = require("mongoose");
const cors = require("cors");

const cookie = require("./cookies/cookie");
const cookieParser = require("cookie-parser");
const {
  authenticated,
  checkLoggedInStatus,
} = require("./middleware/authMiddleware");
const dotenv = require("dotenv");

dotenv.config();
//set up server
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
const port = process.env.PORT || 1412;
const dbURI =
  process.env.MDB_CONNECT_STRING ||
  "mongodb://127.0.0.1:27017/studentManagement";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, () =>
      console.log("Server Started successfully at port: ", port)
    )
  )
  .catch((err) => console.error(err, "\nCan not find Database"));

//calling middleware
app.get("/", authenticated, (req, res) => res.send("hello"));
// app.get("*", checkUser);
app.post(
  "/loggedin",
  checkLoggedInStatus /*, (req, res) => res.send("home page")*/
);

app.use(router);
app.use(cookie);
