const express = require("express");
var jwt = require("jsonwebtoken");
const app = express();
const secretkey = "NEWCODE";

app.get("/", (req, resp) => {
  // resp.send("Welcome to the home page");
  resp.json({
    message: "A sample API",
  });
});
app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  };
  const token = jwt.sign(
    { user },
    "secretkey",
    { expiresIn: "30h" },
    (err, token) => {
      resp.json(token);
    }
  );
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
      console.log("error occured");
    } else {
      console.log("sucessful profile login");
      res.json({
        message: "profile Accessed",
        authData,
      });
    }
  });
});

//middleware:
function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(typeof bearerHeader != "undefined");

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    console.log(bearer);
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.send({
      result: "Token is invalid",
    });
  }
}

app.listen(4500, () => {
  console.log("Server is running on port 4500");
});
