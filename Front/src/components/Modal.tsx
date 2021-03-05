import React from "react";
import Modal from "@material-ui/core/Modal";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import PublicIcon from "@material-ui/icons/Public";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import PersonIcon from "@material-ui/icons/Person";
import RoomIcon from "@material-ui/icons/Room";
import VideocamIcon from "@material-ui/icons/Videocam";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSpring, animated } from "react-spring/web.cjs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Color from "../assets/images/modal/color.png";
import { RootState } from "../store";
import { addNewPost, updatePost } from "./Feed/ContentCreator/postSlice";

const useStyles = makeStyles((theme) => ({
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

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}
export interface Image {
  file: File | null;
  imagePreviewUrl: string | undefined;
}
interface ModalProps {
  create: boolean;
  open: boolean;
  content?: string;
  setContent?: any;
  postId?: string | number;
  setOpen: any;
  files: Image;
  setFiles: any;
  handleClose: () => void;
  message?: string;
}
interface FormData {
  append(name: string, value: string | File | null, fileName?: string): void;
}

declare var FormData: {
  prototype: FormData;
  new (form?: HTMLFormElement): FormData;
};

interface FormData {
  entries(): IterableIterator<[string, string | File]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string | File>;
  [Symbol.iterator](): IterableIterator<string | File>;
}
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const ModalContent = ({
  create,
  open,
  postId,
  content,
  setContent,
  files,
  setFiles,
  handleClose,
}: ModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    if (e.target.files) {
      const file = e.target.files[0];
      reader.onloadend = () => {
        setFiles({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAll = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (content || files) {
        const formData = new FormData();
        formData.append("file", files.file);
        content && formData.append("message", content);
        formData.append("author", email);

        create
          ? await dispatch(addNewPost(formData))
          : await dispatch(updatePost({ postId, formData }));

        setContent("");

        handleClose();
      } else {
        console.log("plz provide file");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      aria-labelledby="title"
      aria-describedby="description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <form onSubmit={handleSubmitAll} encType="multipart/form-data">
          <Card className={classes.paper}>
            <CardContent id="description" className="content">
              <div className="title">
                <Typography variant="h5" component="p" id="title">
                  {create ? "Create Post" : "Update Post"}
                </Typography>
                <IconButton size="small" onClick={handleClose}>
                  <ClearIcon />
                </IconButton>
              </div>
              <Divider />
              <div className="ava">
                <Avatar />
                <div className="name">
                  <Typography variant="subtitle2" component="p">
                    {email}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<PublicIcon />}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Public
                  </Button>
                </div>
              </div>
              <textarea
                cols={30}
                rows={7}
                placeholder={`What's on your mind, ${email}?`}
                name="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text"
              />
              <div className={classes.imageScroll}>
                {files.imagePreviewUrl && (
                  <>
                    <img
                      src={files.imagePreviewUrl}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      alt=""
                    />
                    <Button
                      startIcon={<ClearIcon />}
                      onClick={() =>
                        setFiles({
                          file: "",
                          imagePreviewUrl: "",
                        })
                      }
                    ></Button>
                  </>
                )}
              </div>
              <div className="color">
                <IconButton>
                  <img src={Color} alt="" />
                </IconButton>
                <IconButton>
                  <TagFacesIcon />
                </IconButton>
              </div>

              <div className="options">
                <Typography variant="subtitle2" component="p">
                  Add to your post
                </Typography>
                <div className="button">
                  <input
                    type="file"
                    name="file"
                    id="fileUpdate"
                    onChange={handleImage}
                    style={{ display: "none" }}
                  />
                  <IconButton
                    onClick={() =>
                      document.getElementById("fileUpdate")!.click()
                    }
                  >
                    <PhotoLibraryIcon style={{ color: "#58C472" }} />
                  </IconButton>
                  <IconButton>
                    <PersonIcon style={{ color: "#3085F3" }} />
                  </IconButton>
                  <IconButton>
                    <TagFacesIcon style={{ color: "#F5B728" }} />
                  </IconButton>
                  <IconButton>
                    <RoomIcon style={{ color: "#F66551" }} />
                  </IconButton>
                  <IconButton>
                    <VideocamIcon style={{ color: "#F23E5C" }} />
                  </IconButton>
                  <IconButton>
                    <MoreHorizIcon style={{ color: "rgba(255,255,255,0.4)" }} />
                  </IconButton>
                </div>
              </div>
              <Button
                fullWidth
                className="postBtn"
                type="submit"
                disabled={!files.file && !content}
              >
                {create ? "Post" : "Update"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Fade>
    </Modal>
  );
};

export default ModalContent;
