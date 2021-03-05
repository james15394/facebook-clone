import { Avatar, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  leftBarItem: {
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
    padding: theme.spacing(1, 0),
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    "&:hover": {
      background: "rgba(255,255,255,0.1)",
    },
  },

  des: {
    marginLeft: 10,
    color: "#fff",
  },
}));
type Props = {
  style: { color: string };
};
interface LeftBarItemProps {
  Src?: React.FC<Props>;
  des: string;
  avatar?: string ;
  x: string;
}
const LeftBarItem: React.FC<LeftBarItemProps> = ({ Src, des, avatar, x }) => {
  const classes = useStyles();
  return (
    <div className={classes.leftBarItem}>
      {avatar && <Avatar src={avatar} />}
      {Src && <Src style={{ color: x }} />}
      <Typography variant="subtitle2" component="p" className={classes.des}>
        {des}
      </Typography>
    </div>
  );
};

export default LeftBarItem;
