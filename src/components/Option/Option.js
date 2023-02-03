import React, { useState, useEffect } from "react";
import "./Option.css";
import Button from "@mui/material/Button";
import OptionFieldSet from "../OptionFieldSet/OptionFieldSet";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { handleApply, handleUnchecked } from "./helpers.js";

export default function Option(props) {
  
  const [checked, setChecked] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState([
    { key: "", value: "" },
  ]);

  useEffect(() => {
    if (checked === "unchecked") {
      handleUnchecked(
        props.option,
        props.code,
        textFieldValue,
        setTextFieldValue,
        props.setCode
      );
    }
    if (checked === "checked" && props.fieldless) {
      handleApply(
        props.option,
        props.code,
        textFieldValue,
        setTextFieldValue,
        props.setCode
      );
    }
  }, [checked]);

  return (
    <li className="option">
      <FormGroup className="input-wrapper">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              disabled={props.disabled}
              onClick={(e) => {
                checked === "checked"
                  ? setChecked("unchecked")
                  : setChecked("checked");
              }}
            />
          }
          label={props.labelText}
        />
      </FormGroup>
      {checked === "checked" ? (
        <div className="input-buttons">
          {props.double ? (
            <>
              {textFieldValue.map((x, i) => (
                <OptionFieldSet
                  key={i}
                  index={i}
                  double
                  textFieldValue={textFieldValue}
                  setTextFieldValue={setTextFieldValue}
                />
              ))}
              <Button
                variant="contained"
                id="add-more-button"
                size="small"
                onClick={() =>
                  setTextFieldValue([...textFieldValue, { key: "", value: "" }])
                }
              >
                Add more
              </Button>
            </>
          ) : props.single ? (
            <OptionFieldSet
              placeholder={props.placeholder}
              textFieldValue={textFieldValue}
              setTextFieldValue={setTextFieldValue}
            />
          ) : (
            ""
          )}
          {props.double || props.single ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={textFieldValue.value || textFieldValue[0].value ? false : true}
              onClick={() =>
                handleApply(
                  props.option,
                  props.code,
                  textFieldValue,
                  setTextFieldValue,
                  props.setCode
                )
              }
            >
              Apply
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </li>
  );
}
