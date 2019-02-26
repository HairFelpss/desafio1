const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const port = 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));

const checkAge = (req, res, next) => {
  const { age } = req.query;

  if (!age) {
    return res.redirect("/");
  }

  return next();
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/major", checkAge, (req, res) => {
  const { age } = req.query;

  return res.render("major", { age });
});

app.get("/minor", checkAge, (req, res) => {
  const { age } = req.query;

  return res.render("minor", { age });
});

app.post("/check", (req, res) => {
  const { age } = req.body;

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`);
  } else {
    return res.redirect(`/minor?age=${age}`);
  }
});

app.listen(port, () => {
  console.log("app listen on port", port);
});
