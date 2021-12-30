import * as React from 'react';
import Box from '@mui/material/Box';
import { ClickAwayListener } from "@mui/material";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import './ColorPoper.css'
import {updateColor, getNotes} from '../../services/dataServices'

export default function ColorPopper({action,noteObj,setNoteObj,v_noteId,talktotakeNoteThree}) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // React.useEffect(() => {
  //     updateColor(colorUpdate).then((response)=>{
  //       console.log("Update color successful")
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }, [action])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const colors = [{cId:0, name:'White', hexValue:'#fff'},
                  {cId:1, name:'Red', hexValue:'#f28b82'},
                  {cId:2, name:'Orange', hexValue:'#fbbc04'},
                  {cId:3, name:'Yellow', hexValue:'#fff475'},
                  {cId:4, name:'Green', hexValue:'#ccff90'},
                  {cId:5, name:'Teel', hexValue:'#a7ffeb'},
                  {cId:6, name:'Blue', hexValue:'#cbf0f8'},
                  {cId:7, name:'Dark blue', hexValue:'#aecbfa'},
                  {cId:8, name:'Purple', hexValue:'#d7aefb'},
                  {cId:9, name:'Pink', hexValue:'#fdcfe8'},
                  {cId:10, name:'Brown', hexValue:'#e6c9a8'},
                  {cId:11, name:'Grey', hexValue:'#e8eaed'}]
  
  React.useEffect(() => {
    
  }, [open])
  const selectColor = (e) => {
    let colorvalue = e.target.id
    colorvalue = colorvalue.replace(/#/g, "%23");
    let colorObj={
      noteId:v_noteId,
      color:colorvalue
    }
    if(action === "create"){
      console.log(action)
      console.log(e.target.id)
      setNoteObj({...noteObj,Color:e.target.id})
    }
    else{
      
      updateColor(colorObj).then((response)=>{
        console.log("Update color successful");
        talktotakeNoteThree(true);
      }).catch((err) => {
        console.log(err);
      })

    }
    
  }
  const colorDivList = colors.map(colorDiv => <div title={colorDiv.name} 
                                          className='poperDivCircle' 
                                          id={colorDiv.hexValue}
                                          style={{backgroundColor:colorDiv.hexValue}} 
                                          key={colorDiv.name}
                                          onClick={selectColor}></div>
                              )
  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick} style={{backgroundColor:'transparent', border:'none'}}>
        <img alt="colorpicker" src="https://img.icons8.com/material-outlined/24/000000/paint-palette.png"/>
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            
            <div className='colors'>
              {colorDivList}
            </div>
            
          </Fade>
        )}
      </Popper>
    </div>
  );
}
