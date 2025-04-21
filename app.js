const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let books = [];

app.get("/", (req, res) => {
    res.render("index", { books });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", (req, res) => {
    const { title, author, rating, date } = req.body;
    books.push({ id: Date.now(), title, author, rating, date });
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.send("Book not found");
    res.render("edit", { book });
});

app.post("/edit/:id", (req, res) => {
    const { title, author, rating, date } = req.body;
    const book = books.find(b => b.id == req.params.id);
    if (book) {
        book.title = title;
        book.author = author;
        book.rating = rating;
        book.date = date;
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Book Tracker running on http://localhost:${PORT}`);
});