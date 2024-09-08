import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";

import { SocketContext } from "../SocketContext";

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#202124",
  color: "white",
}));

const VideoArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Video = styled("video")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: "#3c4043",
  borderRadius: "8px",
  overflow: "hidden",
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1),
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Controls = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    if (stream) {
      // Set initial state based on the actual track state
      setIsAudioMuted(!stream.getAudioTracks()[0].enabled);
      setIsVideoEnabled(stream.getVideoTracks()[0].enabled);
    }
  }, [stream]);

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  return (
    <MainContainer>
      <VideoArea>
        <VideoContainer>
          {stream && (
            <>
              <Video playsInline muted ref={myVideo} autoPlay />
              <VideoOverlay>
                <Typography variant="body2">{name || "You"}</Typography>
              </VideoOverlay>
            </>
          )}
        </VideoContainer>
        <VideoContainer>
          {callAccepted && !callEnded ? (
            <>
              <Video playsInline ref={userVideo} autoPlay />
              <VideoOverlay>
                <Typography variant="body2">{call.name || "Participant"}</Typography>
              </VideoOverlay>
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">Waiting for participant...</Typography>
            </Box>
          )}
        </VideoContainer>
      </VideoArea>
      <Controls>
        <IconButton onClick={toggleAudio} color="inherit">
          {isAudioMuted ? <MicOff /> : <Mic />}
        </IconButton>
        <IconButton onClick={toggleVideo} color="inherit">
          {isVideoEnabled ? <Videocam /> : <VideocamOff />}
        </IconButton>
      </Controls>
    </MainContainer>
  );
}

export default VideoPlayer;