import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          borderRadius: 2,
          margin: "30px 100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", sm: "600px" },
          border: "2px solid black",
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <Typography variant="h2" align="center" color="black">
            Video Chat App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Video Player*/}
      <VideoPlayer />

      {/* Options ---> Notifications */}
      <Options>
        <Notifications />
      </Options>
    </Box>
  );
}

export default App;
