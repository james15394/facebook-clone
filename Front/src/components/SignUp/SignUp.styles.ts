import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  signUp: {
    display: "grid",
    placeItems: "center",
    background: "#F0F2F5",
    minHeight: "100vh",

    "& .container": {
      width: "70%",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: 400,
      },
    },
    "& .left": {
      width: "100%",
      pointerEvents: "none",
      "& h6": { color: "#1877F2", fontSize: "4em", fontWeight: 1000 },
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        marginBottom: 10,
      },
    },
    "& .right": {
      padding: theme.spacing(2),
      minWidth: 400,
      "& form": {
        display: "flex",
        justifyContent: "center",
        alignItems: " center",
        flexDirection: "column",
        "& hr": {
          width: "100%",
          margin: theme.spacing(2, 0),
        },
        "& .submitBtn": {
          background: "#1877F2",
          color: "#fff",
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: "capitalize",
          fontSize: "1.2rem",
          margin: theme.spacing(2, 0),
        },
        "& .toSignIn": {
          background: "#36A420",
          color: "#fff",
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: "capitalize",
          fontSize: "1.2rem",
        },
      },
    },
  },
}));
