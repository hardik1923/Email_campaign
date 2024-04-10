import { useNavigate } from 'react-router-dom';
import { Kitesurfing } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { settemplatedetails} from '../features/counter/Template';
import { ListItem, ListContent, Button, Image, List } from "semantic-ui-react";
import './Choosetemplate.css';
function Choosetemplate() {
    
    const email = useSelector((state)=>state.User.email);
    const TemplateName = useSelector((state)=>state.Template.TemplateName);
    const diapatch = useDispatch();
    const navigate = useNavigate();
    const [alltemplates, setalltemplates] = useState([])
    console.log(TemplateName);

    useEffect(() => {
       const getalltemplates= async()=>{
        const response= await fetch(`http://localhost:3000/usertemplates/getalltemplates/${email}`);
           if(response.status===201){
            const data = await response.json();
            console.log(data.templates);
            setalltemplates(data.templates);
           }
        }
        getalltemplates();
    }, [])

    const handletemplatepreview = (name,html) => {
        diapatch(settemplatedetails({
            name: name,
            html:html,
        }));
        console.log(TemplateName);
        navigate('/templatepreview')

      };
      const handleselecttemplate = (name,html) => {
        diapatch(settemplatedetails({
            name: name,
            html:html,
        }));
        console.log(TemplateName);
        navigate('/campaign')
        // do something with the selected template
      };

  return (
    <div className='all-templates'>
        {alltemplates?.map( (template,index) => (
            <List divided verticalAlign="middle">
            <ListItem>
              <ListContent floated="right">
                <Button onClick={()=>handletemplatepreview(template.name,template.html)}>Preview</Button>
                <Button onClick={()=>handleselecttemplate(template.name,template.html)}>Choose and Next</Button>
              </ListContent>
              <ListContent>{`${index+1}.   ${template.name}`}</ListContent>
            </ListItem>
          </List>
        ))}
    </div>
  )
}

export default Choosetemplate