const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "photography_db",
});
// Serve static files (like CSS)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/gallery", (req, res) => {
  res.render("gallery.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/signUp", (req, res) => {
  res.render("signUp.ejs");
});
app.post("/signUp", express.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  connection.query(
    `INSERT INTO customers( full_name, national_id, email, password) 
        VALUES('${req.body.full_name}','${req.body.national_id}','${req.body.email}','${req.body.password}')`,
    (error) => {
      if (error) {
        res.json(error);
      } else {
        res.send("Sign up successfull!!!");
      }
    }
  );
});
app.get("/signIn", (req, res) => {
  res.render("signIn.ejs");
});
app.listen(7000, () => console.log("App started and running port 7000"));
