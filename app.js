const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set("view engine", "ejs");
app.set('layout', 'layout'); // 👈 Tells express-ejs-layouts to use views/layout.ejs

app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // ✅ This enables form POST body parsing

let posts = []; // Temporary in-memory storage

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, content });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === req.params.id);
  post.title = title;
  post.content = content;
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
