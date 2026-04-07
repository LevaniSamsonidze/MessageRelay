const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const appRouter = require("./route/Route");
const bodyParser = require("body-parser");
const { ErrorHandler } = require("./utils/ErorrHendler");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/", appRouter);
app.use(ErrorHandler);


mongoose.connect(process.env.DATA_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started on port", process.env.PORT);
        });
    })
    .catch(err => console.error(err));