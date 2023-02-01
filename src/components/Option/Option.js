import React, {useState, useEffect} from 'react'
import './Option.css'
import Button from '@mui/material/Button'
import OptionFieldSet from '../OptionFieldSet/OptionFieldSet'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import {getPrefillBuilder, insertText} from './helpers.js';

export default function Option(props) {

  const [checked, setChecked] = useState();
  const [textFieldValue, setTextFieldValue] = useState([{key: '', value: ''}]);

  useEffect(() => {
    if(checked==='unchecked'){
      handleUnchecked(props.option);
    }
  }, [checked]);
  

  const handleApply = (option)=>{
    let codeOutput;
    switch(option){
      case 'prefill':
        codeOutput = insertText(props.code, 'iframeParams.push("isIframeEmbed=1");', 'ifr.src = src + "?"', `\n${getPrefillBuilder(textFieldValue)}`);
        break;
      case 'cutoff':
        codeOutput = insertText(props.code, 'iframe.style.height = ', 'args[1] + "px";', `${textFieldValue.value} + +`);
        break;
    }
     props.setCode(codeOutput);
  }
  
  const handleUnchecked = (option)=>{
    let codeOutput;
    switch(option){
      case 'prefill':
        codeOutput = insertText(props.code, 'iframeParams.push("isIframeEmbed=1");', 'ifr.src = src + "?"', '\n');
        setTextFieldValue([{key:'', value:''}])
        break;
      case 'cutoff':
        console.log(textFieldValue.value);
        codeOutput = insertText(props.code, 'iframe.style.height = ', 'args[1] + "px";', '');
        break;
    }
    props.setCode(codeOutput);
  }

  return (
    <li className="option">
            <FormGroup className="input-wrapper">
            <FormControlLabel control={<Checkbox size="small" onClick={()=>{checked==='checked' ? setChecked('unchecked') : setChecked('checked')}}/>} label={props.labelText} />
            </FormGroup>
            {checked==='checked' ? <div className="input-buttons">
            {props.double ? 
            <>
             {textFieldValue.map((x, i) =>
              <OptionFieldSet key={i} index={i} double textFieldValue={textFieldValue} setTextFieldValue={setTextFieldValue}/>
             )}
            <Button variant="contained" id="add-more-button" size="small" onClick={()=>setTextFieldValue([...textFieldValue, {key: '', value: ''}])}>Add more</Button>
            </>
            : props.single ? <OptionFieldSet placeholder={props.placeholder} textFieldValue={textFieldValue} setTextFieldValue={setTextFieldValue}/> : ''}
            {props.double || props.single ? <Button variant="contained" color="success" size="small" onClick={()=>handleApply(props.option)}>Apply</Button> : ''}
            </div>
            : ''}
    </li>
  )
}
