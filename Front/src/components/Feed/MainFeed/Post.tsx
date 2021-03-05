import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { selectPostIds } from "../ContentCreator/postSlice";
import { useStyles } from "./Post.styles";
import PostSingle from "./PostSingle";
import Media from "../../Skeleton/Skeleton";

const Post = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const status = useSelector((state: RootState) => state.post.status);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {status === "loading" ? (
        <div style={{ minHeight: "100vh", marginTop: 20 }}>
          <Media />
          <Media />
          <Media />
          <Media />
        </div>
      ) : (
        orderedPostIds.map((postId) => (
          <PostSingle key={postId} postId={postId} />
        ))
      )}
    </div>
  );
};
export default Post;
