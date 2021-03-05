import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    message: String,
    author: { type: String, required: true },
    tags: [String],
    file: {},
    likeCount: {
      type: Number,
      default: 0,
    },
    path: {
      type: String,
    },
    imageBase64: {
      data: Buffer,
      contentType: String,
    },
  },

  { timestamps: true }
);

postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set("toJSON", {
  virtuals: true,
});
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
