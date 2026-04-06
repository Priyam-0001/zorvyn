import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"
import mongoose from "mongoose";

const port = Number(process.env.PORT);

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

