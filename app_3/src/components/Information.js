import { Grid, Paper, Alert, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useCallback, useEffect } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

import * as API from "../api/socketApi";
import { es } from "date-fns/locale";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Information() {
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    API.subscribe((result) => {
      // console.log(result);

      setData((prev) => {
        if (prev.length > 7) {
          return [...prev.slice(prev.length - 7, prev.length), result];
        } else {
          return [...prev, result];
        }
      });
    });
  }, []);
  useEffect(() => {
    setChartTempData({
      labels: data.map((item) => item.time),
      datasets: [
        {
          label: "Temperature",
          data: data.map((item) => item.temperature),
          backgroundColor: [
            //   "rgba(75,192,192,1)",
            "#ecf0f1",
            //   "#50AF95",
            //   "#f3ba2f",
            //   "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const [chartTempData, setChartTempData] = React.useState({
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Temperature",
        data: data.map((item) => item.temperature),
        backgroundColor: [
          //   "rgba(75,192,192,1)",
          "#ecf0f1",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [chartHumdData, setChartHumdData] = React.useState({
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "Humidity",
        data: data.map((item) => item.humidity),
        backgroundColor: [
          //   "rgba(75,192,192,1)",
          "#ecf0f1",
          //   "#50AF95",
          //   "#f3ba2f",
          //   "#2a71d0",
        ],
        borderColor: "#0047AB",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
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
          DHT11 Sensor Data
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <Line data={chartTempData} />
            </Item>
          </Grid>
          <Grid item xs={12} md={12}>
            <Item>
              <Line data={chartHumdData} />
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={"5px"}>
          <Grid item xs={6} md={6}>
            <Item>
              Temperature:{" "}
              {data[data.length - 1] ? data[data.length - 1].temperature : "-"}{" "}
              °C
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              Humidity:{" "}
              {data[data.length - 1] ? data[data.length - 1].humidity : "-"} %
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
          CALENDER
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Item>
                <CalendarPicker
                  date={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </Item>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
