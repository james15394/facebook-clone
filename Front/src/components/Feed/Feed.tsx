import { makeStyles } from "@material-ui/core";
import React from "react";
import ContentCreator from "./ContentCreator/ContentCreator";
import Post from "./MainFeed/Post";
import Room from "./Room/Room";
import StoryReel from "./StoryReels/StoryReel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    width: 590,
    paddingTop: 20,
    [theme.breakpoints.down("md")]: {
      marginLeft: 100,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 100,
    },
  },
}));
const Feed = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.feed}>
        <StoryReel />
        <ContentCreator />
        <Room />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
