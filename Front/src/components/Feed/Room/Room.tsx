import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { data } from "./data";

const useStyles = makeStyles((theme) => ({
  room: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 72,
    minWidth: "100%",
    background: "#242526",
    borderRadius: 10,
    marginTop: theme.spacing(3),
    paddingLeft: 10,
    "& button": {
      "&:hover": {
        background: "rgba(255,255,255,0.08)",
      },
    },
    "& .MuiButton-text": {
      border: "2px solid #404082",
      borderRadius: 30,
      color: "#087DEA",
      textTransform: "capitalize",
      "& .MuiSvgIcon-root": {
        color: "violet",
      },
    },
  },
  room__slide: {
    flex: 1,
    maxWidth: 300,
    "& .slick-slide": {
      width: "40px !important",
      height: 40,
      marginRight: 20,
    },
    "& .slick-prev": {
      left: 5,
      zIndex: 10,
    },
    "& .slick-next": {
      right: 5,
    },
  },
  room__ava: {
    width: 40,
    height: 40,
  },
}));

const Room = () => {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    adaptiveHeight: true,
  };
  return (
    <div className={classes.room}>
      <Button startIcon={<VideoCallIcon />}>Create Room</Button>
      <Slider {...settings} className={classes.room__slide}>
        {data.map(({ ava }) => (
          <div className={classes.room__ava}>
            <Avatar src={ava} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Room;
