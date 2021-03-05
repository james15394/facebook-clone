import { Tooltip } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      background: "#242526",
      position: "sticky",
      borderBottom: "1px solid rgba(255,255,255,0.09)",
      top: 0,
    },
    header__left: {
      display: "flex",
      alignItems: "center",
      "& .logoBtn": {
        visibility: (openSearch) => openSearch && "hidden",
      },
      "& .header__search": {
        display: "flex",
        alignItems: "center",
        background: "#3A3B3C",
        borderRadius: 30,
        height: "80%",
        padding: theme.spacing(0.7, 2),
        [theme.breakpoints.down("md")]: {
          background: (openSearch) => (openSearch ? "#3A3B3C" : "transparent"),
          padding: 0,
          position: (openSearch) => (!openSearch ? "relative" : "absolute"),
          zIndex: 100,
        },
        "& .arrowBtn": {
          width: 40,
          height: 40,
          "& .MuiSvgIcon-root": {
            color: "#94969B",
            width: 30,
          },
          display: (openSearch) => !openSearch && "none",
        },
        "& .search": {
          // display: "grid",
          placeItems: "center",
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",

          display: (openSearch) => (openSearch ? "none" : "grid"),
          "& .MuiSvgIcon-root": {
            color: "#94969B",
            position: "absolute",
          },
          [theme.breakpoints.down("md")]: {
            background: "rgba(255,255,255,0.05)",
          },
        },
        "& .MuiInputBase-root": {
          paddingLeft: 10,
          [theme.breakpoints.down("md")]: {
            paddingLeft: 20,
          },
          "& input": {
            color: "rgba(255,255,255,0.5)",
            fontSize: 17,
            "&::placeholder": {
              color: "#94969B",
            },
            [theme.breakpoints.down("md")]: {
              display: (openSearch) => !openSearch && "none",
            },
          },
        },
      },
      "& button": {
        "& .MuiSvgIcon-root": {
          width: 40,
          height: 40,
          color: "#087DEA",
        },
      },
    },
    header__middle: {
      display: "flex",
      justifyContent: "center",
      height: "64px",
      flex: 1,
      "& button": {
        borderRadius: 10,
        padding: theme.spacing(1, 4),
        margin: "5px 0",
        "&:hover": { background: "rgba(255,255,255,0.05)" },
        marginRight: "5px",
        "& .MuiSvgIcon-root": {
          width: "1.2em",
          height: "1.2em",
          color: "#acaca0",
        },
        "&:nth-child(1)": {
          marginBottom: 0,
          borderBottom: "solid 5px #087DEA",
          background: "transparent",
          borderRadius: 0,
          "& .MuiSvgIcon-root": {
            color: "#2D88FF",
          },
        },
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(1, 2),
        },
      },
    },
    header__right: {
      display: "flex",
      alignItems: "center",
      height: 64,
      "& .item": { width: 40, margin: "0 10px" },
      "& .header__avatar": {
        display: "flex",
        alignItems: "center",
        marginRight: "5px",
        padding: " 0 10px",
        borderRadius: "30px",
        height: "40px",
        cursor: "pointer",
        "&:hover": { background: "#3a3d43b8" },
        "& .MuiAvatar-root": {
          width: "25px",
          height: "25px",
          marginRight: "5px",
        },
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      },

      "& > .MuiIconButton-root": {
        marginRight: "5px",
        height: "100%",

        "& .MuiIconButton-label": {
          background: "rgba(255,255,255,0.05)",
          padding: 25,
          borderRadius: "50%",
          width: 40,
          height: 40,
          "&:hover": { background: "rgba(255,255,255,0.1) " },
        },
        "& .MuiSvgIcon-root": {
          width: "1.2em",
          height: "1.2em",
          color: "#acaca0",
        },
      },
      "& .popper": {
        "& button": { width: "100%", height: "100%" },
        "& .MuiIconButton-label": {
          background: "rgba(255,255,255,0.05)",
          padding: 25,
          borderRadius: "50%",
          width: 40,
          height: 40,
          "&:hover": { background: "rgba(255,255,255,0.1) " },
        },
        "& .MuiSvgIcon-root": {
          width: "1.2em",
          height: "1.2em",
          color: "#acaca0",
        },
      },
    },
  })
);
export const NewTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    padding: theme.spacing(1, 2),
  },
}))(Tooltip);
