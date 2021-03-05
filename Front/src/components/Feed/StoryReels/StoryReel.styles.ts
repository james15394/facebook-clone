import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

interface TitleProps {
  bg: string;
}

export const useStyles = makeStyles((theme) => ({
  reel: {
    display: "flex",
    minHeight: "200px",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "center",
    "& .innerDiv": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      "& .wrapper": {
        height: "100%",
        padding: "0 4px",
      },
      "& .item": {
        height: "100%",
        overflow: "hidden",
        borderRadius: 10,
      },
    },
  },
}));
export const ReelItem = styled.div<TitleProps>`
  height: 100%;
  position: relative;
  min-width: 110px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    &::before {
      transform: scale(1.04);
      transition: transform 0.4s ease-out;
    }
  }
  &::before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background: url(${(props: any) => props.bg});
    background-position: center;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  & h6 {
    color: #fff;
    font-weight: 400;
    position: absolute;
    bottom: 0;
  }
  & img {
    border-radius: 50%;
    border: 4px solid #2d88ff;
  }
`;
