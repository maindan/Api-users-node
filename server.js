const express = require("express");
const router = require("./routes/router");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended:true }));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("running on port: " + port);
})