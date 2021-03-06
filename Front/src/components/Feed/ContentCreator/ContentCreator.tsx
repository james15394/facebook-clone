import { Avatar, Box, Button, Divider, IconButton } from "@material-ui/core";
import React from "react";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStyles } from "./ContentCreator.styles";
import Ava from "../../../assets/images/ava.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ModalContent, { Image } from "../../Modal";

interface FormData {
  append(name: string, value: Blob | string | null, fileName?: string): void;
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

const ContentCreator = () => {
  const { email } = useSelector((state: RootState) => state.user);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [files, setFiles] = React.useState<Image>({
    file: null,
    imagePreviewUrl: "",
  });

  const handleOpen = () => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleOpen();

    const reader = new FileReader();
    if (e.target.files) {
      const file = e.target.files[0];

      if (/\.(jpe?g|png|gif)$/i.test(file?.name)) {
        reader.onloadend = () => {
          setFiles({
            file: file,
            imagePreviewUrl: reader.result as string,
          });
        };
        reader.onerror = function () {
          console.log(reader.error);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Box className={classes.content}>
      <div className={classes.content__top}>
        <IconButton>
          <Avatar src={Ava} />
        </IconButton>
        <Box className="content" onClick={handleOpen}>
          {`What's on your mind, ${email}?`}
        </Box>
        <ModalContent
          create={true}
          content={content}
          setContent={setContent}
          open={open}
          setOpen={setOpen}
          files={files}
          setFiles={setFiles}
          handleClose={handleClose}
        />
      </div>
      <Divider />
      <div className={classes.content__bottom}>
        <Button startIcon={<VideoCallIcon />}>Live video</Button>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <Button
          startIcon={<PhotoLibraryIcon />}
          onClick={() =>
            //@ts-expect-error
            document.getElementById("file").click()
          }
        >
          Photo/ Video
        </Button>
        <Button startIcon={<InsertEmoticonIcon />}>Feeling/ Activities</Button>
      </div>
    </Box>
  );
};

export default ContentCreator;
