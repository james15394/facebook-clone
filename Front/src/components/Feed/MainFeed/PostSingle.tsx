import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GifIcon from "@material-ui/icons/Gif";
import LabelIcon from "@material-ui/icons/Label";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import Popup from "../../Popup";
import { selectPostById, deletePost } from "../ContentCreator/postSlice";
import { useStyles } from "./Post.styles";
import ModalContent, { Image } from "../../Modal";

const PostSingle = ({
  postId,
}: {
  postId: string | number;
  key: string | number;
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showCmt, setShowCmt] = useState(false);
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  const { email } = useSelector((state: RootState) => state.user);
  const isAuthor = post?.author === email;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(post?.message!);
  const [files, setFiles] = useState<Image>({
    file: null,
    imagePreviewUrl: "",
  });

  const handleOpen = () => {
    setFiles({
      file: null,
      imagePreviewUrl: "http://localhost:9890/image/" + post?.path,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFiles({
      file: null,
      imagePreviewUrl: "",
    });
    setContent("");
  };

  const handleDeletePost = async (id: string | number) => {
    await dispatch(deletePost(id));
  };

  return (
    <>
      {post && (
        <Card className={classes.post}>
          <CardHeader
            avatar={<Avatar>R</Avatar>}
            action={
              <Popup
                PopUp={
                  isAuthor ? (
                    <Box
                      boxShadow={3}
                      style={{
                        background: "#2B2D2D",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                      }}
                    >
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeletePost(post._id)}
                        style={{
                          width: 360,
                          display: "flex",
                          justifyContent: "flex-start",
                          color: "#e4e6eb",
                          textTransform: "capitalize",
                        }}
                      >
                        Move To Trash
                      </Button>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={handleOpen}
                        style={{
                          width: 360,
                          display: "flex",
                          justifyContent: "flex-start",
                          color: "#e4e6eb",
                          textTransform: "capitalize",
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      boxShadow={3}
                      style={{
                        background: "#2B2D2D",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                      }}
                    >
                      <Button
                        startIcon={<DeleteIcon />}
                        style={{
                          width: 360,
                          display: "flex",
                          justifyContent: "flex-start",
                          color: "#e4e6eb",
                          textTransform: "capitalize",
                        }}
                      >
                        Turn on notification
                      </Button>
                    </Box>
                  )
                }
                DisplayIcon={<MoreHorizIcon />}
              />
            }
            title={post.author}
            subheader={moment(post.createdAt).fromNow()}
          />
          <ModalContent
            create={false}
            postId={postId}
            open={open}
            setOpen={setOpen}
            files={files}
            setFiles={setFiles}
            handleClose={handleClose}
            message={post.message}
            content={content}
            setContent={setContent}
          />
          <div className={classes.content}>
            <Typography variant="subtitle2">{post.message}</Typography>
          </div>
          {post.path && (
            <CardMedia
              src={"http://localhost:9890/image/" + post.path}
              title="human"
              component="img"
              className={classes.media}
            />
          )}

          <CardContent>
            <div className={classes.option}>
              <div className="left">
                <IconButton>
                  <ThumbUpAltIcon style={{ color: "#1098F6" }} />
                </IconButton>
                <IconButton>
                  <FavoriteIcon style={{ color: "#FAC24E" }} />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon style={{ color: "#FB5B78" }} />
                </IconButton>
              </div>
              <div className="right">
                <Typography>10 Comment</Typography>
                <Typography>10 Shares</Typography>
              </div>
            </div>
            <Divider />
            <CardActions className={classes.actions}>
              <Button startIcon={<ThumbUpAltIcon />}>Like</Button>
              <Button
                startIcon={<ChatBubbleOutlineIcon />}
                onClick={() => setShowCmt(!showCmt)}
              >
                Comment
              </Button>
              <Button startIcon={<ScreenShareIcon />}>Shares</Button>
            </CardActions>
            <Collapse in={showCmt} timeout="auto" unmountOnExit>
              <div className={classes.comment}>
                <Avatar />
                <div className="input">
                  <InputBase placeholder="Write a comment" />
                  <div className="icons">
                    <IconButton size="small">
                      <GifIcon />
                    </IconButton>
                    <IconButton size="small">
                      <LabelIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <EmojiEmotionsIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Collapse>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PostSingle;
