import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './templatepreview.css'
const MyComponent = ({Body}) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const TemplateName = useSelector((state)=>state.Template.TemplateName);
  const Templatehtml = useSelector((state)=>state.Template.Templatehtml);
  const navigate = useNavigate();
  return (
    <div className='template-preview'>
      <div className='' dangerouslySetInnerHTML={{__html:Templatehtml}}>
    </div>
    </div>
  );
};
export default MyComponent;