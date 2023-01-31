import React, {useState} from "react";
import AceEditor from "react-ace";
import "./Tweaker.css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Options from "./../options/Options";

export default function Tweaker() {
  const [code, setCode] = useState('');

  const onChange = (newValue) => {
    setCode(newValue)
  }

  return (
    <div className="tweaker-wrapper">
      <p className="tweaker-header">Paste your iframe code:</p>

      <div className="tweaker-fieldset">
        <AceEditor
          mode="html"
          theme="github"
          onChange={onChange}
          name="tweaker-box"
          width="700px"
          height="1000px"
          className="tweaker-box"
          fontSize={14}
        />
        <Options code={code}></Options>
      </div>
    </div>
  );
}
