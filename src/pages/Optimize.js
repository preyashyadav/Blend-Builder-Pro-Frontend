import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Table from "react-bootstrap/Table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Optimize = () => {
  const location = useLocation();

  const [x, setX] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const [F, setF] = useState([]);
  const [r2_score, setR2_score] = useState([]);

  const [graphData, setGraphData] = useState();
  const [graphDataMade, setGraphDataMade] = useState(false);

  // const baseURL = "https://flask-production-ab40.up.railway.app/";
  // const baseURL = "http://127.0.0.1:5000/";
  const baseURL = "https://blend-builder-pro-backend.onrender.com/";

  useEffect(() => {
    const data = {
      path: "./data/preprocessed.csv",
      input_features: location.state.input,
      output_features: location.state.output,
      lower_bounds: location.state.lower_bounds,
      upper_bounds: location.state.upper_bounds,
      sample_input: location.state.desired_outputs,
    };
    console.log(data);
    axios
      .post(baseURL + "optimize_problem", data)
      .then((response) => {
        console.log(response.data);
        setX(response.data["x"]);
        setF(response.data["F"]);
        setR2_score(response.data["r2_scores"]);
        setDataReceived(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setGraphDataMade(false);
    const labels = Array.from(Array(F.length).keys());
    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: F,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    setGraphData(data);
    setGraphDataMade(true);
  }, [F]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "F Value",
      },
    },
  };

  return (
    <div className="width-80 optimize-container">
      <div>
        <h1 className="main-head">Optimization results</h1>

        <h3 className="sub-head">X values: </h3>

        <Table className="custom-table">
          <thead>
            <tr>
              <th>Input Feature</th>
              <th>Estimated Value</th>
            </tr>
          </thead>
          <tbody>
            {dataReceived &&
              x.map((value, index) => {
                return (
                  <tr>
                    <td>{Object.keys(location.state.output)[index]}</td>
                    <td>{value}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <h3>R2 Scores: </h3>
        <Table custom-table>
          <thead>
            <tr>
              <th>Output Value</th>
              <th>R2 Score of relation</th>
            </tr>
          </thead>
          <tbody>
            {dataReceived &&
              Object.keys(r2_score).map((key) => {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>{r2_score[key]}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <h3>F Score:</h3>
        {/* {dataReceived &&
        F.map((value) => {
          return <p>{value}</p>;
        })} */}
        {graphDataMade && <Line options={options} data={graphData} />}
      </div>
    </div>
  );
};

export default Optimize;
