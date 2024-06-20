 

import { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill'; 
//import "react-quill/dist/quill.snow.css";

const TextEditor = (props:any) => {
   const[value ] = useState('')
  //  const toolbarOptions = [
  //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   ['blockquote', 'code-block'],
  //   ['link', 'image', 'video', 'formula'],
  
  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  //   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction
  
  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],
  
  //   ['clean']                                         // remove formatting button
  // ];

  useEffect(()=>{
    const e={
        target:{
            name:'WriteTask',
            value:value
        }
    }
    props.onChange(e)
    console.log(value,'value')
  },[value])




  // const modules= {toolbar: toolbarOptions }  

  return (
    <div>
        {/* <ReactQuill   modules={modules} theme='snow'  value={value} onChange={setValue} />  */}
    </div>
  );
};

export default TextEditor;
