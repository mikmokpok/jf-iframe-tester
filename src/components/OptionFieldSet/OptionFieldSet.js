import TextField from '@mui/material/TextField'
import React from 'react'
import './OptionFieldSet.css'
export default function OptionFieldSet(props) {

  const handleFormChange = (index, event) => {
    let data = [...props.textFieldValue];
    data[index][event.target.name] = event.target.value;
    props.setTextFieldValue(data);
}
  return (
    <div className="textbox-wrapper">
    {props.double ? <>
      <TextField name="key" label="Key" variant="outlined" className="prefill-text-button" size="small" onChange={event => handleFormChange(props.index, event)}/>
      <TextField name="value" label="Value" variant="outlined" className="prefill-text-button" size="small" onChange={event => handleFormChange(props.index, event)}/>
    </>: 
    <TextField label={props.placeholder} variant="outlined" className="prefill-text-button-single" size="small"onChange={(value)=>props.setTextFieldValue({...props.textFieldValue, key:'default', value:value.target.value})}/>
    }
    </div>
  )
}