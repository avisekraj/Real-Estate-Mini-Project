const express = require("express");
const path = require("path");
const app = express();
const html = require("html");
require("../db/conn");
const Register = require("../models/user");
const Home = require("../models/client");
const Massage = require("../models/feedback");


// middleware static 

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));


app.set("view engine", "html")


//
app.get("/", (req, res) => {
    res.render('/index.html');
});
app.get("/index1", (req, res) => {
    res.render('/index1');
});

app.get("/p1", (req, res) => {
    res.render('/p1');
});
app.get("/p2", (req, res) => {
    res.render('/p2');
});
// create a new user in our database
app.post("/login", async(req, res) => {
        try {
            const registernewusers = new Register({
                username: req.body.uname,
                email: req.body.email,
                password: req.body.password
            })
            const registered = await registernewusers.save();
            res.redirect("index1.html");

        } catch (error) {
            res.status(400).send(error);
        }
    })
    // Login wala
app.post("/page", async(req, res) => {
    try {
        const username = req.body.name;
        const password = req.body.pword;
        const usernam = await Register.findOne({ username: username });
        if (usernam.password === password) {
            res.redirect("index1.html");
        } else {
            res.send("Password wrong")
        }
    } catch (error) {
        res.status(400).send("invalid username")
    }
});
app.post("/client", async(req, res) => {
    try {
        const homee = new Home({
            number: req.body.n,
            city: req.body.c,
            price1: req.body.min,
            price2: req.body.max,
            status: req.body.prop_stats,
            type: req.body.typ,
            bhk: req.body.bhk,
            ana: req.body.aminities,
            bed: req.body.bedrooms,
            bath: req.body.bathrooms
        })
        const getting = await homee.save();
        res.redirect("p1.html");

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/feedback", async(req, res) => {
    try {
        const sendmsg = new Massage({
            name: req.body.user,
            number: req.body.no,
            email: req.body.mail,
            subject: req.body.sub,
            massage: req.body.get
        })
        const getting = await sendmsg.save();
        res.redirect("p2.html");
    } catch (error) {
        res.status(400).send("your error", error);
    }
});
app.listen(port, () => {
    console.log(`server is running at port no: ${port}`)
});