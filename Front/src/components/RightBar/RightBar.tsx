import {
  CardContent,
  CardMedia,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Ad from "../../assets/images/right/ad.jpg";

const useStyles = makeStyles((theme) => ({
  rightBar: {
    minWidth: 280,
    position: "sticky",
    top: 64,
    minHeight: "inherit",
    maxHeight: 0,
    padding: "20px 0",
    margin: "0 50px 0 100px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  media: { paddingLeft: 150, backgroundSize: "contain" },
  rightBar__ad: {
    display: "flex",
    height: "100%",
    background: "transparent",
    color: "#fff",
  },
}));
const RightBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.rightBar}>
      <div className="rightBar__top">
        <Typography variant="h6" component="p" style={{ color: "#fff" }}>
          Sponsored
        </Typography>
        <div className={classes.rightBar__ad}>
          <CardMedia image={Ad} className={classes.media}></CardMedia>
          <CardContent>
            <Typography variant="subtitle1">
              Kich Hoat thuong tang cap
            </Typography>
            <Typography variant="subtitle2">vnfbs.com</Typography>
          </CardContent>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default RightBar;
