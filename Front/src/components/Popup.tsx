import {
  Fade,
  IconButton,
  makeStyles,
  Popper,
  PopperPlacementType,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, { ReactNode, useState } from "react";

interface props {
  DisplayIcon: ReactNode;
  PopUp: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "50%",
    width: "100%",
  },
}));

const Popup = ({ PopUp, DisplayIcon }: props) => {
  const classes = useStyles();
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        disablePortal={false}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              {PopUp}
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>
      <IconButton onClick={handleClick("bottom-end")}>{DisplayIcon}</IconButton>
    </div>
  );
};

export default Popup;
