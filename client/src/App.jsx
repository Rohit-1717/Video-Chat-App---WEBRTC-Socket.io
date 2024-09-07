import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import { makeStyles } from "@mui/material";

function App() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: "30px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
      border: "2px solid black",
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    image: {
      marginLeft: "15px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  }));

  return (
    <>
      <AppBar position="static" color="primary">
        <Typography>
          <h1>Video Chat App</h1>
        </Typography>
      </AppBar>

      {/* Video Player*/}
      <VideoPlayer />

      {/* Options ---> Notifications */}
      <Options>
        <Notifications />
      </Options>
    </>
  );
}

export default App;
