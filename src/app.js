//database
require("./config/db");
const userRoutes  = require("./routes")
const express = require("express")
const cors= require("cors");
const app = express();



app.use(cors());
app.use(express.json());
app.use("/api/vi",userRoutes);

module.exports =app;