const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const appRouter = require("./route/route");
const { ErrorHandler } = require("./utils/ErorrHendler");


const app = express();

app.use(express.json());
app.use(cors());
app.use("/", appRouter);
app.use(ErrorHandler)

mongoose.connect(process.env.DATA_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started on port", process.env.PORT);
        });
    })
    .catch(err => console.error(err));