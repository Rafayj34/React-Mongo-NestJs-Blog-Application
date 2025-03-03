import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function Editor({value,setFieldValue}) {
  // const [value, setValue] = React.useState("**Hello world!!!**");
  
  return (
    <div className="container">
      <MDEditor 
        height={350} 
        value={value}
        onChange={(val)=>setFieldValue('content',val)}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>
  );
}