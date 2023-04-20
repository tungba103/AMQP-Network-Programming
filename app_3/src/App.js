import "./App.css";
import DevicesControl from "./components/DevicesControl";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import * as React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Paper } from "@mui/material";
import Information from "./components/Information";
function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Paper
          sx={{
            // p: 2,
            minWidth: "100%",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <TabContext
            value={value}
            sx={
              {
                // minWidth: '100%'
              }
            }
          >
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab sx={{ fontWeight: "Bold" }} label="Controller" value="1" />
                <Tab
                  sx={{ fontWeight: "Bold" }}
                  label="Information"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DevicesControl />
            </TabPanel>
            <TabPanel value="2">
              <Information />
            </TabPanel>
          </TabContext>
        </Paper>
      </header>
    </div>
  );
}
export default App;
