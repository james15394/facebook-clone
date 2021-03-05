import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  imageScroll: {
    position: "relative",
    overflow: "auto",
    overflowX: "hidden",
    maxHeight: 200,
    width: "100%",
    "&:hover": {
      "&::-webkit-scrollbar": {
        width: 10,
        cursor: "pointer",
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
      marginLeft: 8,
      background: "transparent",
      borderRadius: 10,
    },
    "& button": {
      position: "absolute",
      top: 0,
      right: -20,
      zIndex: 100,
      color: "#fff",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    padding: theme.spacing(1, 2),
    background: "#242526",
    borderRadius: 5,
    marginTop: theme.spacing(3),
    "& hr": {
      background: "#525559",
    },
  },
  content__top: {
    display: "flex",
    alignItems: "center",
    "& .content": {
      flex: 1,
      background: "rgba(255,255,255,0.1)",
      padding: theme.spacing(1),
      borderRadius: 30,
      cursor: "pointer",
      color: "rgba(255,255,255,0.3)",
      fontSize: 18,
      letterSpacing: 1.2,
      fontWeight: 500,
      paddingLeft: 10,
      height: 40,
    },
    "& button": { "&:nth-child(3)": { display: "none" } },
    "& > .MuiIconButton-root": {
      padding: "12px 12px 12px 0",
    },
  },
  content__bottom: {
    marginTop: 10,
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    "& button": {
      color: "#B8BBBF",
      textTransform: "capitalize",
      width: "100%",
      "&:hover": {
        background: "rgba(255,255,255,0.1)",
        borderRadius: 10,
      },
      "&:nth-child(1)": {
        "& .MuiSvgIcon-root": {
          color: "red",
        },
      },
      "&:nth-child(2)": {
        "& .MuiSvgIcon-root": {
          color: "yellow",
        },
      },
      "&:nth-child(3)": {
        "& .MuiSvgIcon-root": {
          color: "green",
        },
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 500,
    backgroundColor: "#242526",
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    "& hr": {
      background: "rgba(255,255,255,0.2)",
      width: "100%",
      height: 0.5,
    },
    "& .content": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .title": {
        position: "relative",
        width: "100%",
        textAlign: "center",
        color: "#fff",
        fontWeight: 800,
        letterSpacing: 1.25,
        paddingBottom: 10,
        "& button": {
          position: "absolute",
          right: 0,
          top: 0,
          color: "rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
        },
      },
    },
    "& .ava": {
      maxHeight: 40,
      marginTop: 20,
      display: "flex",
      color: "rgba(255,255,255,0.4)",
      justifyContent: "space-between",
      width: "100%",
      "& .name": {
        flex: 1,
        paddingLeft: 10,
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "flex-start",
        "& button": {
          color: "rgba(255,255,255,0.8)",
          textTransform: "capitalize",
          background: "rgba(255,255,255,0.2)",
          borderRadius: 10,
        },
        "& .MuiTypography-subtitle2": {
          color: "#fff",
          letterSpacing: 1.5,
          height: 20,
        },
        "& .MuiButton-textSizeSmall": {
          padding: "1px 5px",
          height: 20,
        },
      },
    },
    "& .color": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      "& img": {
        width: 30,
        height: 30,
      },
      "& .MuiIconButton-root": {
        padding: 0,
      },
      "& .MuiSvgIcon-root": {
        color: "rgba(255,255,255,0.3)",
      },
    },
    "& .options": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: theme.spacing(1),
      margin: "20px 0",
      borderRadius: 8,
      color: "#fff",
      width: "100%",
      "& p": { cursor: "pointer" },
      "& .button": {
        display: "flex",
        "& .MuiIconButton-root": {
          padding: 6,
          marginLeft: 5,
          "&:hover": {
            background: "rgba(255,255,255,0.1)",
          },
        },
      },
    },
    "& textarea": {
      width: "100%",
      background: "transparent",
      resize: "none",
      border: "none",
      outline: "none",
      paddingTop: 20,
      color: "rgba(255,255,255,0.7)",
      fontSize: 20,
      "&::placeholder": {
        fontSize: 20,
        fontFamily: "inherit",
        color: "rgba(255,255,255,0.7)",
      },
    },
    "& .postBtn": {
      "&:disabled": {
        color: "rgba(255,255,255,0.5)",
        background: "#4F5051",
      },
      background: "#2D88FF",
      borderRadius: 8,
      textTransform: "capitalize",
      color: "rgba(255,255,255,0.97)",
    },
  },
}));
