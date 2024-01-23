//database
require("./config/db");
const Routes  = require("./routes")
const express = require("express")
const cors= require("cors");
const app = express();



app.use(cors());
app.use(express.json());
app.use("/api/vi",Routes);

module.exports =app;