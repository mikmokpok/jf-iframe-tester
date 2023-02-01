import React, { useState, useEffect } from "react";
import "./Option.css";
import Button from "@mui/material/Button";
import OptionFieldSet from "../OptionFieldSet/OptionFieldSet";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getPrefillBuilder, insertText } from "./helpers.js";

export default function Option(props) {
  const [checked, setChecked] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState([
    { key: "", value: "" },
  ]);
  const [conflict, setConflict] = useState(false);


  useEffect(() => {
    if (checked === "unchecked") {
      handleUnchecked(props.option);
    }
    if (checked === "checked" && props.fieldless) {
      handleApply(props.option);
    }
  }, [checked]);

  const handleApply = (option) => {
    let codeOutput;
    switch (option) {
      case "prefill":
        codeOutput = insertText(
          props.code,
          'iframeParams.push("isIframeEmbed=1");',
          'ifr.src = src + "?"',
          `\n${getPrefillBuilder(textFieldValue)}`
        );
        break;
      case "cutoff":
        codeOutput = insertText(
          props.code,
          "iframe.style.height = ",
          'args[1] + "px";',
          `${textFieldValue.value} + +`
        );
        break;
      case "typage":
        codeOutput = insertText(
          props.code,
          'var ifr = document.getElementById("JotFormIFrame-',
          "if (ifr) {",
          `\n
          let c=0;
          ifr.onload = (e=>{
           if(c==0){
                c++;
           }else{
              ifr.style.height="529px";
              ifr.scrollTo(0,0);
          }
          }); \n`,
          18
        );
        break;
      case "autoscroll":
        codeOutput = props.code.replace(
          'onload="window.parent.scrollTo(0,0)"',
          'onload=""'
        );
        break;
      case "scrolling":
        codeOutput = props.code.replace('scrolling="no"', 'scrolling="yes"');
        break;
      case "fallback":
        codeOutput = insertText(
          props.code,
          "height:",
          "px;",
          textFieldValue.value
        );
        break;
      case "sandbox":
        codeOutput = insertText(
          props.code,
          "scrolling=",
          ">",
          `sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" \n`,
          6
        );
        break;
      case "conflict":
        setConflict(true);
        break;
    }
    props.setCode(codeOutput);
  };

  const handleUnchecked = (option) => {
    let codeOutput;
    switch (option) {
      case "prefill":
        codeOutput = insertText(
          props.code,
          'iframeParams.push("isIframeEmbed=1");',
          'ifr.src = src + "?"',
          "\n"
        );
        setTextFieldValue([{ key: "", value: "" }]);
        break;
      case "cutoff":
        codeOutput = insertText(
          props.code,
          "iframe.style.height = ",
          'args[1] + "px";',
          ""
        );
        break;
      case "typage":
        codeOutput = insertText(props.code, "let c=0;", "if (ifr)", "\n", -9);
        break;
      case "autoscroll":
        codeOutput = props.code.replace(
          'onload=""',
          'onload="window.parent.scrollTo(0,0)"'
        );
        break;
      case "scrolling":
        codeOutput = props.code.replace('scrolling="yes"', 'scrolling="no"');
        break;
      case "fallback":
        codeOutput = insertText(props.code, "height:", "px;", "539");
        break;
      case "sandbox":
        codeOutput = props.code.replace(
          'sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"',
          ""
        );
        break;
      case "conflict":
        setConflict(false);
        break;
    }
    props.setCode(codeOutput);
  };

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
              onClick={() => handleApply(props.option)}
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
