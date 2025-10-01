const express = require("express");
const dotenv = require("dotenv");
const { createClient } = require("supabase/supabase.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path= require("path");
const fs = require("fs");


dotenv.config();
const app = express();
const PORT = 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
}); 

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const {user, error} = await supabase.auth.signUp({ email, password });

    if(error) return res.redirect(`/error.html?msg=${encodeURIComponent(error.message)}`);
    res.redirect("/signup_success.html")
});

app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const {data, error } = await supabase.auth.signInWithPassword({ email, password });

    if(error) return res.redirect(`/error.html?msg=${encodeURIComponent(error.message)}`);
    
})

