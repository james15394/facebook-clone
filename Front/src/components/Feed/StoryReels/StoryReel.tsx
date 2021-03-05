import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { data } from "./data";
import { ReelItem, useStyles } from "./StoryReel.styles";

const StoryReel = () => {
  const classes = useStyles();
  return (
    <div className={classes.reel}>
      <div className="innerDiv">
        {data.map(({ ava, bg }) => (
          <div className="wrapper">
            <div className="item">
              {
                <ReelItem bg={bg}>
                  <Avatar src={ava} />
                  <Typography variant="subtitle1">Alice</Typography>
                </ReelItem>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryReel;
