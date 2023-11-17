import React from 'react';
import './componets.css';

const DoubleSwitch = ({LeftTag, RightTag}) => {

    const moveSlider = (direction)=>{
      const slider = document.getElementById('slider-bg')
      if(direction === 'left'){
        slider.style.left = 0;
      }else{
        slider.style.right = 0;
      }
    }

  return (
    <div className='switch-container rounded-pill p-2 border border-primary'>
        <div className="switch-btns">
            <div id='slider-bg' className="switch-slider rounded-pill"></div>
            <button id='reviewer-switch' className="switch-btn transparent-bg" onClick={moveSlider}>{LeftTag}</button>
            <button id='restaurateur-switch' className="switch-btn transparent-bg" onClick={moveSlider}>{RightTag}</button>
        </div>
    </div>
  )
}

export default DoubleSwitch;