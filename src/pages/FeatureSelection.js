import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

function Distinct(value, index, array) {
  return array.indexOf(value) === index;
}

const FeatureSelection = () => {
  const navigate = useNavigate();

  const [inputChecked, setInputChecked] = useState({});
  const [outputChecked, setOutputChecked] = useState({});
  const [columns, setColumns] = useState([]);
  const [mapping, setMapping] = useState({});

  const baseURL = "https://blend-builder-pro-backend.onrender.com/";
  // const baseURL = "http://127.0.0.1:5000/";

  const output_mapping = {
    "Natural Rubber RSS": "Polymer",
    "Natural Rubber TSR 10 60 CV": "Polymer",
    "Polybutadiene (NR) - Cisamer 1220": "Polymer",
    "Polybutadiene High Cys": "Polymer",
    SBR: "Polymer",
    Peptizer: "Process aid",
    N660: "Black Filler",
    N550: "Black Filler",
    N339: "Black Filler",
    N330: "Black Filler",
    N326: "Black Filler",
    N220: "Black Filler",
    N234: "Black Filler",
    N115: "Black Filler",
    N121: "Black Filler",
    Silica: "White Filler",
    "MR material": "Nano Filler",
    "Non Reinforcing Filler": "Non R Filler",
    Silane: "Surface Modifier",
    "Cabot Endure D63": "Black Filler",
    "MWCNT from MRO Gen II": "Nano Filler",
    Pasticiser: "Plasticiser",
    "Aromatic Oil": "Plasticiser",
    "Naftenic Oil": "Plasticiser",
    "Paraffinic Process Oil": "Plasticiser",
    "Pine Tar": "Plasticiser",
    "C5 Aliphatic Hydrocarbon": "Plasticiser",
    "Process aid": "Process aid",
    ZnO: "Catalizer",
    "Stearic Acid": "Catalizer",
    "6 ppd": "Antidegradant",
    TMQ: "Antidegradant",
    "Micro cristaline wax": "Antidegradant",
    TBBS: "Accelerators",
    MBS: "Accelerators",
    CBS: "Accelerators",
    DCBS: "Accelerators",
    MBTS: "Accelerators",
    MBT: "Accelerators",
    DPG: "Accelerators",
    TBzTD: "Accelerators",
    TMTD: "Accelerators",
    Sulfur: "Curing Agent",
    "Perkalink 900": "Anti reversion Agent",
    PVI: "Retarder",
    "Sum Curing System": "Others",
    "A/S Ratio": "Others",
    "Rubbers Sum": "Others",
  };

  useEffect(() => {
    const data = { path: "./data/dataset.csv" };
    axios
      .post(baseURL + "get_columns", data)
      .then((response) => {
        console.log(typeof response.data);
        setColumns(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const request_body = { type: "output" };
    axios
      .post(baseURL + "get_mapping", request_body)
      .then((response) => {
        setMapping(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const input_features = Object.filter(
      inputChecked,
      (value) => value === true
    );
    const output_features = Object.filter(
      outputChecked,
      (value) => value === true
    );

    let data = {
      path: "./data/dataset.csv",
      input_features: Object.keys(input_features),
      output_features: Object.keys(output_features),
    };

    axios
      .post(baseURL + "data_cleaning", data)
      .then((response) => {
        console.log("Data Cleaned");
        navigate("/BoundSelection", {
          state: { input: input_features, output: output_features },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectAllButton = (material) => {
    columns.forEach((column) => {
      if (mapping[column] === material) {
        let updatedValue = { [column]: true };
        setOutputChecked((outputChecked) => ({
          ...outputChecked,
          ...updatedValue,
        }));
      }
    });
  };

  const unSelectAllButton = (material) => {
    columns.forEach((column) => {
      if (mapping[column] === material) {
        let updatedValue = { [column]: false };
        setOutputChecked((outputChecked) => ({
          ...outputChecked,
          ...updatedValue,
        }));
      }
    });
  };

  const selectAllButtonInput = () => {
    columns.map((column, index) => {
      if (!mapping[column]) {
        let updatedValue = { [column]: true };
        setInputChecked((inputChecked) => ({
          ...inputChecked,
          ...updatedValue,
        }));
      }
    });
  };

  const unSelectAllButtonInput = () => {
    columns.map((column, index) => {
      if (!mapping[column]) {
        let updatedValue = { [column]: false };
        setInputChecked((inputChecked) => ({
          ...inputChecked,
          ...updatedValue,
        }));
      }
    });
  };

  return (
    <div className="width-80 feature-container">
      <h1 className="main-head">Feature Selection</h1>
      <h3 className="sub-head">Input Features: </h3>
      <Button className="custom-primary" onClick={selectAllButtonInput}>
        Select All
      </Button>
      <Button className="custom-opposite" onClick={unSelectAllButtonInput}>
        Unselect All
      </Button>
      <br />
      <br />
      {columns.length > 0 &&
        columns.map((column, index) =>
          !Object.keys(mapping).includes(column) ? (
            <ToggleButton
              className="mb-2 toggle-custom custom-toggle-button"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={inputChecked[column]}
              value={column}
              key={index}
              onClick={(e) =>
                setInputChecked({
                  ...inputChecked,
                  [column]: !inputChecked[column],
                })
              }
            >
              {column}
            </ToggleButton>
          ) : (
            <div></div>
          )
        )}
      <br />
      <h3 className="sub-head">Output Features: </h3>
      <br />
      {columns.length > 0 &&
        Object.values(mapping)
          .filter(Distinct)
          .map((material, index) => {
            return (
              <div key={index}>
                <h5 className="sub-sub-head">{material}</h5>
                <Button
                  className="custom-primary"
                  onClick={() => selectAllButton(material)}
                >
                  Select All
                </Button>
                <Button
                  className="custom-opposite"
                  onClick={() => unSelectAllButton(material)}
                >
                  Unselect All
                </Button>
                {columns.map((column, index) =>
                  mapping[column] === material ? (
                    <ToggleButton
                      className="mb-2 toggle-custom"
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-success"
                      checked={outputChecked[column]}
                      value={column}
                      key={index}
                      onClick={() =>
                        setOutputChecked({
                          ...outputChecked,
                          [column]: !outputChecked[column],
                        })
                      }
                    >
                      {column}
                    </ToggleButton>
                  ) : (
                    <div key={index}></div>
                  )
                )}
              </div>
            );
          })}
      <br />
      <Button className="custom-opposite" onClick={onSubmitHandler}>
        Submit
      </Button>
    </div>
  );
};

export default FeatureSelection;
