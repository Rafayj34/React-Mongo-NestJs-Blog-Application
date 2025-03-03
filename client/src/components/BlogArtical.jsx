import React, { useEffect, useState } from 'react'
import markdownit from 'markdown-it'
import Prism from 'prismjs';
import "prismjs/plugins/toolbar/prism-toolbar";
import 'prismjs/plugins/autoloader/prism-autoloader.js';
import "prismjs/plugins/toolbar/prism-toolbar.css";
import 'prismjs/themes/prism-tomorrow.css';
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/download-button/prism-download-button";
import './Markdown.css'
const BlogArtical = ({data}) => { 

  useEffect(()=>{
    
    setTimeout(() => {
      Prism.highlightAll();
    }, 100); 
    
     
    
  },[data])

const md = markdownit()
const result = md.render(data);
  return (
    <article  
    id='blog-article'
    dangerouslySetInnerHTML={{
      __html:result
    }}
    />
  )
}

export default BlogArtical