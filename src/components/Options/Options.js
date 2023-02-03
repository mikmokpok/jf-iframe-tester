import React, { useState } from "react";
import "./Options.css";
import Preview from "../Preview/Preview";
import Option from "../Option/Option.js";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Options(props) {
  const [alert, setAlert] = useState({
    on: false,
    message: "",
    type: "success",
  });

  const [modal, setModal] = useState(false);
  const [scriptConflict, setScriptConflict] = useState(false);

  const showAlert = (alertConfig) => {
    setAlert(alertConfig);
    setTimeout(() => {
      setAlert({ ...alert, on: false, message: "" });
    }, 3000);
  };

  const copyCode = () => {
    if (props.code.length > 0) {
      navigator.clipboard.writeText(props.code);
      showAlert({ on: true, message: "Copied to clipboard!", type: "success" });
    } else {
      showAlert({ on: true, message: "Nothing to copy!", type: "error" });
    }
  };

  const showPreview = () => {
    setModal(true);
  };

  return (
    <div className="options-panel">
      {modal ? <Preview setModal={setModal}></Preview> : ""}
      <Tooltip
        disableFocusListener={!props.disabled}
        disableHoverListener={!props.disabled}
        placement="top"
        title={<h2>No Jotform iframe code found!</h2>}
      >
        <div className="options-module">
          <h3>Options:</h3>
          <ul className="option-list">
            <h4>Code modifiers:</h4>
            <Option
              double
              labelText="Prefill parameters"
              option="prefill"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              single
              labelText="Fix cut-off"
              placeholder="Offset"
              option="cutoff"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              fieldless
              labelText="Fix TY Page height"
              option="typage"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              fieldless
              labelText="Disable auto-scroll"
              option="autoscroll"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              fieldless
              labelText="Add scrolling attribute"
              option="scrolling"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              single
              labelText="Change fallback height"
              placeholder="Height"
              option="fallback"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <Option
              fieldless
              labelText="Add Sandbox attribute"
              option="sandbox"
              code={props.code}
              setCode={props.setCode}
              disabled={props.disabled}
            />
            <h4>Preview modifiers:</h4>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  disabled={props.disabled}
                  onClick={() => {
                    setScriptConflict(!scriptConflict);
                  }}
                />
              }
              label="Simulate script conflict"
            />
          </ul>
          <div className="button-wrapper">
            <form
              class="preview-form"
              action={"./preview/preview.php"}
              method="post"
              target="preview-iframe"
            >
              <input type="text" name="iframe-content" value={props.code} />
              <input
                type="checkbox"
                name="script-conflict"
                checked={scriptConflict}
              />
              <Button
                type="submit"
                onClick={() => showPreview()}
                variant="contained"
                color="success"
                size="medium"
                disabled={props.disabled}
              >
                Preview
              </Button>
            </form>
            <Button
              variant="contained"
              color="success"
              size="medium"
              onClick={() => copyCode()}
              disabled={props.disabled}
            >
              Copy code
            </Button>
          </div>
        </div>
      </Tooltip>
      <Slide in={alert.on}>
        <Alert
          onClose={() => {
            showAlert({ ...alert, on: false, message: "" });
          }}
          severity={alert.type}
          style={{
            position: "fixed",
            zIndex: 999,
            left: 0,
            top: 0,
            width: "100%",
          }}
        >
          {alert.message}
        </Alert>
      </Slide>
    </div>
  );
}
