const { Router } = require("express");

const cookie = Router();

cookie.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true"); //one of way to set cookie but down I am using cookie parser package
  res.cookie("newUser", false);
  res.cookie("this-is-only-in-secure-connection", true, {
    httpOnly: true,
    secure: true,
    path:"*"
  });
  res.cookie("isStudent", true, {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  res.send("you got the cookies");
});

cookie.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

module.exports = cookie;
