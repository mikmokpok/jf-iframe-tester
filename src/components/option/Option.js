import React, {useState} from 'react'
import './Option.css'
import Button from '@mui/material/Button'
import OptionFieldSet from './../OptionFieldSet/OptionFieldSet'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function Option(props) {

  const [checked, setChecked] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState([{key: '', value: ''}]);

  const handleApply = (option)=>{
    switch(option){
      case 'prefill':
        
        break;
    }
  }
  
  return (
    <li className="option">
            <FormGroup className="input-wrapper">
            <FormControlLabel control={<Checkbox size="small" onClick={()=>{setChecked(!checked);}}/>} label={props.labelText} />
            </FormGroup>
            {checked ? <div className="input-buttons">
            {props.double ? 
            <>
             {textFieldValue.map((x, i) =>
              <OptionFieldSet key={i} index={i} double textFieldValue={textFieldValue} setTextFieldValue={setTextFieldValue}/>
             )}
            <Button variant="contained" id="add-more-button" size="small" onClick={()=>setTextFieldValue([...textFieldValue, {key: '', value: ''}])}>Add more</Button>
            </>
            : props.single ? <OptionFieldSet placeholder={props.placeholder}/> : ''}
            {props.double || props.single ? <Button variant="contained" color="success" size="small" onClick={()=>handleApply(props.option)}>Apply</Button> : ''}
            </div>
            : ''}
    </li>
  )
}
