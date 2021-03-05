import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: { flex: 1, width: "100%" },
  post: {
    marginTop: theme.spacing(3),
    background: "#242526",
    minWidth: "100%",
    marginBottom: 30,
    "& .MuiTypography-root": { color: "#E4E6E4" },
    "& .MuiSvgIcon-root": { color: "#E4E6E4" },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0,
      paddingTop: 0,
    },
    "& hr": {
      background: "#534949",
    },
    "& .MuiCardHeader-action": {
      "& button": {
        "&:hover": {
          background: "rgba(255,255,255,0.09)",
        },
      },
    },
  },
  media: {
    objectFit: "cover",
    zIndex: 100,
    maxHeight: 500,
    width: "100%",
  },
  content: {
    padding: "10px",
    position: "relative",
    color: "#E4E6E4",
    "&::before": {
      position: "absolute",
      content: '""',
      top: -10,
      bottom: -5,
      left: -5,
      right: -5,
      border: "1px solid #534949",
      borderRadius: 10,
      zIndex: -1,
    },
  },
  option: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
    "& .left": {
      "& .MuiButtonBase-root:nth-child(2)": {
        position: "absolute",
        left: 15,
      },
      "& .MuiButtonBase-root:nth-child(3)": {
        position: "absolute",
        left: 30,
        // zIndex: -1,
      },
    },
    "& .right": {
      display: "flex",
      "& .MuiTypography-root:nth-child(1)": {
        marginRight: 10,
      },
    },
  },
  actions: {
    justifyContent: "space-evenly",
    padding: "8px 0",
    "& button": {
      width: "100%",
      "&:hover": {
        background: "rgba(255,255,255,0.08)",
      },
    },

    "& .MuiButton-label": {
      color: "#a99e9e",
      textTransform: "capitalize",
    },
    "& .MuiButton-startIcon": {
      color: "#a99e9e",
    },
  },
  comment: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderTop: "1px solid #534949",

    "& .input": {
      display: "flex",
      flex: 1,
      marginLeft: 10,
      background: "rgba(255,255,255,0.09)",
      borderRadius: 30,
      padding: "0 10px",
      height: 40,
      "& .MuiInputBase-root": {
        flex: 1,
        color: "rgba(255,255,255,0.5)",
      },
      "& .icons": {
        display: "flex",
      },
    },
  },
}));
