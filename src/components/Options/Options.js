import React from 'react'
import './Options.css'
import Option from '../Option/Option.js'

export default function Options(props) {
  return (
<div className="options-panel">
    <div className="options-module">
      <h3>Options:</h3>
      <ul className="option-list">
            <h4>Code modifiers:</h4>
            <Option double labelText="Prefill parameters" option="prefill" code={props.code} setCode={props.setCode}/>
            <Option single labelText="Fix cut-off" placeholder="Offset" option="cutoff" code={props.code} setCode={props.setCode}/>
            <Option single labelText="Fix TY Page height" placeholder="Height" option="typage" code={props.code} setCode={props.setCode}/>
            <Option labelText="Disable auto-scroll" option="autoscroll" code={props.code} setCode={props.setCode}/>
            <Option labelText="Add scrolling attribute" option="scrolling" code={props.code} setCode={props.setCode}/>
            <Option single labelText="Change fallback height" option="fallback" code={props.code} setCode={props.setCode}/>
            <Option labelText="Add Sandbox attribute" option="sandbox" code={props.code} setCode={props.setCode}/>
            <h4>Preview modifiers:</h4>
            <Option labelText="Simulate script conflict" option="conflict" />
            </ul>
    </div>
</div>
  )
}