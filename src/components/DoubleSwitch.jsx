import React from 'react';
import '../styling/doubleSwitch.css';

const DoubleSwitch = ({LeftTag, RightTag, leftClick, rightClick}) => {

    const moveSlider = (direction)=>{
      const slider = document.getElementById('slider-bg')
      if(direction === 'left'){
        slider.style.left = '0';
        leftClick(true);
      }else{
        slider.style.left = '120px';
        rightClick(false)
      }
    }

  return (
    <div className='switch-container'>
        <div className="switch-btns rounded-pill">
            <div id='slider-bg' className="rounded-pill"></div>
            <button id='reviewer-switch' type='button' className="switch-btn" onClick={()=>moveSlider("left")}>{LeftTag}</button>
            <button id='restaurateur-switch' type='button' className="switch-btn" onClick={()=>moveSlider("right")}>{RightTag}</button>
        </div>
    </div>
  )
}

export default DoubleSwitch;