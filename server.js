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
