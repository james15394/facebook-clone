import React, { useState } from "react";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import EventIcon from "@material-ui/icons/Event";
import HistoryIcon from "@material-ui/icons/History";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import StarIcon from "@material-ui/icons/Star";
import PaymentIcon from "@material-ui/icons/Payment";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import WorkIcon from "@material-ui/icons/Work";
import CloudRoundedIcon from "@material-ui/icons/CloudRounded";
import LeftBarItem from "./LeftBarItem";
import Ava from "../../assets/images/ava.jpg";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useStyles = makeStyles((theme) => ({
  leftbar: {
    minWidth: 280,
    padding: theme.spacing(0, 1),
    position: "sticky",
    alignSelf: "flex-start",
    paddingLeft: 20,
    minHeight: "inherit",
    maxHeight: 0,
    overflowY: "auto",
    marginRight: 100,
    top: 64,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "&::-webkit-scrollbar-corner": { background: "transparent" },
    "&:hover": {
      "&::-webkit-scrollbar": {
        width: 10,
        cursor: "pointer",
        height: "100%",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#6B6C6C",
        borderRadius: 10,
      },
    },
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
    },
    "& hr": {
      background: "rgba(255,255,255,0.15)",
    },
  },
  leftbar__top: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  leftbar__bottom: {
    "&:hover": {
      "& p": {
        display: "block",
      },
    },
  },
  shortCut: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    "& h6": {
      color: "rgba(255,255,255,0.5)",
    },
    "& p": {
      display: "none",
      color: "blue",
      cursor: "pointer",
    },
  },
  expandMore: {
    display: (expand) => (expand ? "none" : "block"),
    width: "100%",
  },
  expandItems: {
    display: (expand) => (expand ? "block" : "none"),
    width: "100%",
  },
  expandLess: {
    display: (expand) => (expand ? "block" : "none"),
    width: "100%",
  },
}));
const LeftBar = () => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles(expand);
 const { email } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes.leftbar}>
      <div className={classes.leftbar__top}>
      
        <LeftBarItem avatar={Ava} des={email} x="#3291F6" />
        <LeftBarItem Src={PeopleIcon} des="Friends" x="#3291F6" />
        <LeftBarItem Src={SupervisedUserCircleIcon} des="Group" x="#3291F6" />
        <LeftBarItem Src={StorefrontIcon} des="MarketPlace" x="#3291F6" />
        <LeftBarItem Src={VideoLibraryIcon} des="Watch" x="#E93E5B" />
        <LeftBarItem Src={EventIcon} des="Events" x="#3291F6" />
        <LeftBarItem Src={HistoryIcon} des="Memories" x="#3291F6" />
        <div className={classes.expandMore} onClick={() => setExpand(true)}>
          <LeftBarItem Src={ExpandMoreIcon} des="See more" x="#3291F6" />
        </div>
        <div className={classes.expandItems}>
          <LeftBarItem Src={FeaturedPlayListIcon} des="Ads" x="#3291F6" />
          <LeftBarItem Src={StarIcon} des="Favorites" x="#F4BD40" />
          <LeftBarItem Src={PaymentIcon} des="Facebook pay" x="#1C3255" />
          <LeftBarItem Src={VideogameAssetIcon} des="Games" x="#3291F6" />
          <LeftBarItem Src={WorkIcon} des="Work" x="#E58F3C" />
          <LeftBarItem Src={CloudRoundedIcon} des="Weather" x="#444546" />
        </div>
        <div className={classes.expandLess} onClick={() => setExpand(false)}>
          <LeftBarItem Src={ExpandLessIcon} des="See less" x="#3291F6" />
        </div>
      </div>
      <Divider />
      <div className={classes.leftbar__bottom}>
        <div className={classes.shortCut}>
          <Typography variant="h6">Your shorcuts</Typography>
          <Typography component="p">Edit</Typography>
        </div>
        <LeftBarItem
          Src={CloudRoundedIcon}
          des="Ielts Ms Thi Home"
          x="#3291F6"
        />
      </div>
    </div>
  );
};

export default LeftBar;
