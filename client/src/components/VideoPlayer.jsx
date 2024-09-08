import React, { useContext } from "react";
import { Typography, Paper, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

import { SocketContext } from "../SocketContext";

const Video = styled("video")(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxWidth: "550px",
  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  border: "2px solid black",
  margin: "10px",
  position: "relative",
  overflow: "hidden",
}));

const NameOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "5px",
  textAlign: "center",
}));

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <GridContainer container>
      {/* Our own video */}

      {stream && (
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <NameOverlay>
              <Typography variant="h6">{name || "Your Name"}</Typography>
            </NameOverlay>
            <Video playsInline muted ref={myVideo} autoPlay />
          </StyledPaper>
        </Grid>
      )}

      {/* Attendee's video */}

      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <NameOverlay>
              <Typography variant="h6">
                {call.name || "Attendee Name"}
              </Typography>
            </NameOverlay>
            <Video playsInline ref={userVideo} autoPlay />
          </StyledPaper>
        </Grid>
      )}
    </GridContainer>
  );
}

export default VideoPlayer;
