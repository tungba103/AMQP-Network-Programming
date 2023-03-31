import {
  Grid,
  Paper,
  Alert,
  Typography,
  FormControlLabel,
  Skeleton,
  Button,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import React from "react";
import { useEffect } from "react";
import { led } from "../controller/action";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DevicesControl() {
  const [led26Status, setLed26Status] = React.useState(false);

  const [led27Status, setLed27Status] = React.useState(false);

  const [videoStreamActive, setVideoStreamActive] = React.useState(false);

  const [cameraButtonName, setCameraButtonName] =
    React.useState("Start Camera");

  useEffect(() => {
    if (videoStreamActive) {
      setCameraButtonName("Stop Camera");
    } else {
      setCameraButtonName("Start Camera");
    }
  }, [cameraButtonName, videoStreamActive]);

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Alert
        style={{ marginBottom: "10px", fontWeight: "bold" }}
        severity="info"
      >
        It's beta, don't expect too much!
      </Alert>
      <Paper
        sx={{
          p: 1,
          marginBottom: "10px",
          maxWidth: "100%",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 1000 }}
          color="text.first"
          gutterBottom
        >
          LED CONTROLLER
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>
              <FormControlLabel
                control={<Android12Switch />}
                checked={led26Status}
                onChange={() => led(26, led26Status, setLed26Status)}
                label="Led 26"
              />
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <FormControlLabel
                control={<Android12Switch />}
                checked={led27Status}
                onChange={() => led(27, led27Status, setLed27Status)}
                label="Led 27"
              />
            </Item>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        sx={{
          p: 1,
          marginBottom: "10px",
          maxWidth: "100%",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 1000 }}
          color="text.first"
          gutterBottom
        >
          ESP32 CAMERA STREAM
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              {videoStreamActive ? (
                <img
                  src="http://192.168.43.244"
                  alt="video-stream"
                  style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: "grey.900", margin: "0 auto" }}
                  style={{
                    width: "230px",
                    height: "230px",
                    borderRadius: "5px",
                  }}
                />
              )}
            </Item>
          </Grid>

          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              onClick={() => setVideoStreamActive(!videoStreamActive)}
            >
              {cameraButtonName}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
