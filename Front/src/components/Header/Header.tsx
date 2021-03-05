import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Zoom,
} from "@material-ui/core";
import React, { useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import StorefrontIcon from "@material-ui/icons/Storefront";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { NewTooltip, useStyles } from "./Header.styles";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import Popup from "../Popup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const [openSearch, setOpenSearch] = useState(false);
  const classes = useStyles(openSearch);
  const history = useHistory();
  const logOut = () => {
    console.log("out");
    auth.signOut();
    history.push("/signUp");
  };

  return (
    <AppBar className={classes.header}>
      <Toolbar>
        <div className={classes.header__left}>
          <IconButton className="logoBtn">
            <FacebookIcon />
          </IconButton>
          <div className="header__search">
            <IconButton
              className="arrowBtn"
              onClick={() => setOpenSearch(false)}
            >
              <ArrowBackIcon />
            </IconButton>
            <div className="search">
              <SearchIcon onClick={() => setOpenSearch(true)} />
            </div>
            <InputBase placeholder="Search Facebook" />
          </div>
        </div>
        <div className={classes.header__middle}>
          <NewTooltip TransitionComponent={Zoom} title="Home">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Friends">
            <IconButton>
              <PeopleIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Watch">
            <IconButton>
              <VideoLibraryIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Marketplace">
            <IconButton>
              <StorefrontIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Groups">
            <IconButton>
              <SupervisedUserCircleIcon />
            </IconButton>
          </NewTooltip>
        </div>
        <div className={classes.header__right}>
          <div className="header__avatar ">
            <Avatar />
            <p>{email}</p>
          </div>
          <NewTooltip TransitionComponent={Zoom} title="Create">
            <IconButton className="item">
              <AddCircleOutlineIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Messenger">
            <IconButton className="item">
              <MessageIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Notifications">
            <IconButton className="item">
              <NotificationsIcon />
            </IconButton>
          </NewTooltip>
          <NewTooltip TransitionComponent={Zoom} title="Account">
            <div className="item popper">
              <Popup
                PopUp={
                  <Box
                    boxShadow={3}
                    style={{
                      background: "#2B2D2D",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                    }}
                  >
                    <Button
                      startIcon={<ExitToAppIcon />}
                      onClick={logOut}
                      style={{
                        width: 360,
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "#e4e6eb",
                        textTransform: "capitalize",
                      }}
                    >
                      Log out
                    </Button>
                  </Box>
                }
                DisplayIcon={<ArrowDropDownCircleIcon />}
              />
            </div>
          </NewTooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
