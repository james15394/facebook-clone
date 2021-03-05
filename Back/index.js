import express from "express";
import path from "path";
import methodOverride from "method-override";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

import mongoose from "mongoose";
import { mongoConnect } from "./routes/posts.js";

const url = process.env.ATLAS_URI;
const connect = mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => {
    (err) => console.log(err);
  });

/* 
    GridFs Configuration
*/

// create storage engine
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.use("/", mongoConnect(upload));

const port = 9890;

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
