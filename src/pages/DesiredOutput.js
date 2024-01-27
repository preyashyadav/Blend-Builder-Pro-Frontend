import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DesiredOutputs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onHandleSubmit = (event) => {
    event.preventDefault();

    let desired_outputs = {};
    Object.entries(location.state.input).map(([key, value]) => {
      desired_outputs[key] = [
        parseFloat(event.target[key + "_start"].value),
        parseFloat(event.target[key + "_end"].value),
        parseFloat(event.target[key + "_interval"].value),
      ];
    });

    navigate("/Optimize", {
      state: {
        input: location.state.input,
        output: location.state.output,
        lower_bounds: location.state.lower_bounds,
        upper_bounds: location.state.upper_bounds,
        desired_outputs: desired_outputs,
      },
    });
  };

  return (
    <div className="width-80 bound-container">
      <div>
        <h1 className="main-head">Desired Outputs</h1>
        <Form onSubmit={onHandleSubmit}>
          <Table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Desired Value - Start</th>
                <th>Desired Value - End</th>
                <th>Desired Value - Interval</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(location.state.input).map(([key, value]) => {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter desired value"
                        name={key + "_start"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter desired value"
                        name={key + "_end"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter desired value"
                        name={key + "_interval"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button className="custom-opposite" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default DesiredOutputs;
