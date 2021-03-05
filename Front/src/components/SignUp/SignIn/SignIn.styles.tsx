import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      "& h6": {
        fontWeight: 800,
        fontSize: "2rem",
      },
      "& form": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <div>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiBackdrop-root": {
      background: "rgba(255,255,255,0.8)",
    },
    "& .MuiDialog-paperWidthSm": {
      width: 432,
    },
    "& form": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .birth": {
      width: "100%",
      "& .PrivateNotchedOutline-root-3": {
        background: "transparent",
      },
    },
    "& .gender": {
      width: "100%",
      "& .MuiFormGroup-root": {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
    },
    "& .policy": {
      fontSize: 11,
    },
    "& .signIn": {
      background: "#42B72A",
      color: "#fff",
      padding: theme.spacing(0.7, 8),
      textTransform: "capitalize",
      fontSize: 17,
    },
    // "& .PrivateNotchedOutline-root-3": {
    //   background: "#F5F6F7",
    // },
  },
}));
