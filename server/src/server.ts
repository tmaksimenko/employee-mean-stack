import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("ATLAS_URI environmental variable has not been set");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        const port = 3000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((error) => console.error(error));
