import { Grid, Paper, Alert, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import * as API from "../api/socketApi";
import "chartjs-plugin-streaming";
import ChartContext from "../context/ChartContext";

function RealtimeChart() {
  const [chartData_1, chartData_2] = useContext(ChartContext);

  const options_1 = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            delay: 5000,
            duration: 50000,
            refresh: 1000,
            onRefresh: (chart) => {
              const data = chartData_1.datasets[0].data;
              chart.data.datasets.forEach((dataset) => {
                dataset.data = data;
              });
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 50,
          },
        },
      ],
    },
    plugins: {
      streaming: {
        frameRate: 30,
      },
    },
  };
  const options_2 = {
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            delay: 5000,
            duration: 50000,
            refresh: 1000,
            onRefresh: (chart) => {
              const data = chartData_2.datasets[0].data;
              chart.data.datasets.forEach((dataset) => {
                dataset.data = data;
              });
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        },
      ],
    },
    plugins: {
      streaming: {
        frameRate: 30,
      },
    },
  };

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
          <Grid item xs={12} md={6}>
            <Line data={chartData_1} options={options_1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Line data={chartData_2} options={options_2} />
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
      ></Paper>
    </div>
  );
}

export default RealtimeChart;
