import React, { useState } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Dropdown from "react-bootstrap/Dropdown";

const DataExplore = () => {
  const [file, setFile] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [destinationPath, setDestinationPath] = useState("");
  const [features, setFeatures] = useState({});
  const [show, setShow] = useState(false);
  // const baseURL = "https://flask-production-ab40.up.railway.app/";
  // const baseURL = "http://127.0.0.1:5000/";
  const baseURL = "https://blend-builder-pro-backend.onrender.com/";

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = baseURL + "/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        setDestinationPath(response.data);
        getFeatures(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFeatures(path) {
    const data = { path: path };
    axios
      .post(baseURL + "/get_columns_df", data)
      .then((response) => {
        setFeatures(response.data);
        setFileUploaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onHandleSubmit = (event) => {
    event.preventDefault();

    let mapping = {};
    console.log(features);
    console.log(event.target);
    features.map((feature) => {
      mapping[feature] = [
        event.target[feature + "_type"].value,
        event.target[feature + "_category"].value,
      ];
    });

    axios
      .post(baseURL + "/save_mapping", mapping)
      .then((response) => {
        console.log(response.data);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => setShow(false);

  return (
    <div className="width-80 data-explore-container">
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mapping Saved</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            The mapping was saved successfully. Please go to analytics page to
            proceed further.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 className="main-head">Data Explore</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <h3 className="sub-head">File Upload</h3>
          <input
            class="form-control form-control-lg"
            type="file"
            onChange={handleChange}
            style={{ margin: "1rem 0rem" }}
          />
          <button type="submit" class="custom-primary">
            Upload
          </button>
        </form>

        <br />
        <br />

        {fileUploaded && (
          <div>
            <h4>
              While filling the input feature list mark the unwanted or extra or
              text input field with '-' and useful and numeric fields with '+'
              in the subcategory. In the output feature enter the subcategory in
              the space provided for each.
            </h4>
            <Form onSubmit={onHandleSubmit}>
              <Table className="custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Input/Output</th>
                    <th>Sub category</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr>
                      <td>{feature}</td>
                      <td>
                        <Form.Select
                          aria-label="Default select example"
                          name={feature + "_type"}
                        >
                          <option>Feature type</option>
                          <option value="input">Input Feature</option>
                          <option value="output">Output Feature</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="Enter desired value"
                          name={feature + "_category"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="custom-opposite" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExplore;
