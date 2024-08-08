import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import axios from "axios";

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Rank = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let scores = [];
    let scoreFrequency = [];

    axios
      .get("/scores")
      .then((res) => {
        for (const dataObj of res.data) {
          scores.push(dataObj.score);
          scoreFrequency.push(dataObj.frequency);
        }
        setChartData({
          labels: scores,
          datasets: [
            {
              label: "Score Frequency",
              data: scoreFrequency,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <ChartContainer>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Score Distribution", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </ChartContainer>
  );
};

export default Rank;
