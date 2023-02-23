const express = require("express");
const bodyParser = require("body-parser");
const Date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workitems = [];
app.set('view engine', "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    let day = Date.getDay();
    res.render('list', { listTitle: day, newitem: items });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;
    if (req.body.list === "Work") {
        workitems.push(item);
        res.redirect('/work');
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newitem: workitems });
})
app.get("/about", function (req, res) {
    res.render("about");
})
app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
})
app.listen(3000, function () {
    console.log("server starting");
});