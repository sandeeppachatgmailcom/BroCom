import * as React from 'react';
import Box from '@mui/material/Box';  
import FormControl from '@mui/material/FormControl'; 

export default function MuiBasicSelect(props:{name:string,value:any,onChange:any,items:any}) {
  
  const [options,setOptions] = React.useState<any>()  
  

   
  React.useEffect(()=>{
    setOptions(props.items)
    console.log(props.items,'props.items,')
  },[props.items])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <label id="demo-simple-select-label">{props.name}</label>
        <select id="demo-simple-select"
          value={props.value}
          // label={props.name}
          name={props.name}
          onChange={  props.onChange }
        >
          {options?.map((item:any)=>(
            <option selected={props.value==item.id?true:false} value={item?.id }>{item?.name}</option>
          ))}
          
           
        </select>
      </FormControl>
    </Box>
  );
}