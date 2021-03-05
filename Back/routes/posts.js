import express from "express";
export const router = express.Router();
import mongoose from "mongoose";
import PostMessage from "../models/postMes.js";

export const mongoConnect = (upload) => {
  const url = process.env.ATLAS_URI;
  const connect = mongoose.createConnection(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  let gfs;

  connect.once("open", () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads",
    });
  });

  /*
        POST: Upload a single image/file to Image collection
    */
  router.post("/", upload.single("file"), (req, res) => {
    const { author, message } = req.body;
    const path = req.file ? req.file.filename : null;
    let newPost = new PostMessage({
      path,
      author,
      message,
    });
    newPost
      .save()
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => res.status(500).json(err));
  });

  // Post: Update current post
  router.patch("/update/:id", upload.single("file"), async (req, res) => {
    let updatePost;
    const { message, author } = req.body;
    const filename = req.file ? req.file.filename : null;
    if (filename && message) {
      updatePost = { author, message, path: filename };
    } else if (Boolean(filename) === true && Boolean(message) === false) {
      updatePost = { author, path: filename };
    } else if (Boolean(filename) === false && Boolean(message) === true) {
      updatePost = { author, message };
    }
    const id = req.params.id;
    await PostMessage.findByIdAndUpdate(
      id,
      updatePost,
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  });

  /*
        GET: Delete an image from the collection
    */
  router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await PostMessage.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully." });
    } catch (err) {
      console.log(err);
    }
  });

  /*
        GET: Fetches all the files in the uploads collection
    */
  router.get("/", async (req, res) => {
    try {
      const postMessages = await PostMessage.find();
      gfs.find().toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(200).json({
            success: false,
            message: "No files available",
          });
        }
        files.map((file) => {
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/jpg" ||
            file.contentType === "image/png" ||
            file.contentType === "image/svg"
          ) {
            file.isImage = true;
            file.id = file._id;
          } else {
            file.isImage = false;
          }
        });

        // res.status(200).json(files);
      });
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  /* 
        GET: Fetches a particular image and render on browser
    */
  router.route("/image/:filename").get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }
      if (
        files[0].contentType === "image/jpeg" ||
        files[0].contentType === "image/jpg" ||
        files[0].contentType === "image/png" ||
        files[0].contentType === "image/svg+xml"
      ) {
        // render image to browser
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  });

  return router;
};
