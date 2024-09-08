import React, { useContext } from "react";
import { Button, Typography, Box } from "@mui/material";
import { SocketContext } from "../SocketContext";

function Notifications() {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  if (!call.isReceivingCall || callAccepted) {
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={2}
      bgcolor="background.paper"
      borderRadius={1}
      boxShadow={1}
    >
      <Typography variant="h6" component="div" sx={{ mr: 2 }}>
        {call.name || "Someone"} is calling:
      </Typography>
      <Button variant="contained" color="primary" onClick={answerCall}>
        Answer
      </Button>
    </Box>
  );
}

export default Notifications;
