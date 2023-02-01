import React, {useState, useEffect, useRef} from "react";
import AceEditor from "react-ace";
import "./Tweaker.css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Options from "../Options/Options";

export default function Tweaker() {
  const aceEditor = useRef();
  const [code, setCode] = useState('');

  useEffect(() => {
    aceEditor.current.editor.setValue(code);
  }, [code])
  
  const onChange = (newValue) => {
    setCode(newValue);
  }

  return (
    <div className="tweaker-wrapper">
      <p className="tweaker-header">Paste your iframe code:</p>

      <div className="tweaker-fieldset">
        <AceEditor
          mode="html"
          ref={aceEditor}
          theme="github"
          onChange={onChange}
          name="tweaker-box"
          width="700px"
          height="1000px"
          className="tweaker-box"
          fontSize={14}
        />
        <Options code={code} setCode={setCode}></Options>
      </div>
    </div>
  );
}
