import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BoundSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onHandleSubmit = (event) => {
    event.preventDefault();

    let lower_bounds = {};
    let upper_bounds = {};
    // Object.entries(location.state.input).map(([key, value]) => {
    //   lower_bounds[key] = parseFloat(event.target[key + "_lower"].value);
    // });
    Object.entries(location.state.output).map(([key, value]) => {
      lower_bounds[key] = parseFloat(event.target[key + "_lower"].value);
    });

    // Object.entries(location.state.input).map(([key, value]) => {
    //   upper_bounds[key] = parseFloat(event.target[key + "_upper"].value);
    // });
    Object.entries(location.state.output).map(([key, value]) => {
      upper_bounds[key] = parseFloat(event.target[key + "_upper"].value);
    });

    navigate("/DesiredOutputs", {
      state: {
        input: location.state.input,
        output: location.state.output,
        lower_bounds: lower_bounds,
        upper_bounds: upper_bounds,
      },
    });
  };

  return (
    <div className="width-80 bound-container">
      <div>
        <h1 className="main-head">Bound Selection</h1>

        <Form onSubmit={onHandleSubmit}>
          <Table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Feature Type</th>
                <th>Lower Bound</th>
                <th>Upper Bound</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(location.state.output).map(([key, value]) => {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>Output Feature</td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter lower bound"
                        name={key + "_lower"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter Upper bound"
                        name={key + "_upper"}
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

export default BoundSelection;
