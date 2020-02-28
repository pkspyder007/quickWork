const path = require("path");
const cors = require("cors");
const express = require("express");
// const bodyParser=require('body-parser');
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());

const authRoutes = require("./routes/auth");
const gigRoutes = require("./routes/gigs");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
  })
);

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

app.use("/auth", authRoutes);
app.use("/gigs", gigRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quickwork", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log("Successfully connected mongo");
  })
  .catch(err => {
    console.log("could not listen to 3000");
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Successfully connected");
});
