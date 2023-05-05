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
import * as API from "./api/socketApi";
import ChartContext from "./context/ChartContext";

function App() {
  const [value, setValue] = React.useState("1");

  const [chartData_1, setChartData_1] = React.useState({
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        fill: false,
        data: [],
        tension: 0,
      },
    ],
  });

  const [chartData_2, setChartData_2] = React.useState({
    datasets: [
      {
        label: "Humidity",
        backgroundColor: "rgba(250, 128, 114, 0.5)",
        borderColor: "rgb(250, 128, 114)",
        fill: false,
        data: [],
        cubicInterpolationMode: "monotone",
      },
    ],
  });

  React.useEffect(() => {
    API.subscribe((result) => {
      setChartData_1((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [
              ...prevState.datasets[0].data,
              {
                x: Date.now(),
                y: result.temperature,
              },
            ],
          },
        ],
      }));
      setChartData_2((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [
              ...prevState.datasets[0].data,
              {
                x: Date.now(),
                y: result.temperature,
              },
            ],
          },
        ],
      }));
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ChartContext.Provider value={[chartData_1, chartData_2]}>
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
                  <Tab
                    sx={{ fontWeight: "Bold" }}
                    label="Controller"
                    value="1"
                  />
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
    </ChartContext.Provider>
  );
}
export default App;
