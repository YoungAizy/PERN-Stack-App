import React, {useState} from 'react';
import DefaultImage from '../../assets/default.jpg';
import {usePopper} from 'react-popper';

const RestaurantCard = (listing)=>{

    function triggerPopup(e){
        e.preventDefault();
        
    }

    return(
        <div className="col-3 d-flex flex-column position-relative">
            <div className="card border border-primary rounded-3" style={{height:360}} onClick={triggerPopup}>
                <div className="" style={{borderRadius:"8px 8px 0 0"}}>
                    <img style={{ width: "100%",borderRadius:"8px 8px 0 0" }} src={DefaultImage} alt="molo" />
                </div>
                <div className="">
                    <div className="card-body">
                        <h4 className="card-title" >Restaurant Name</h4>       
                        <p className="card-text">Location </p>
                        <p >Price Range: {"$".repeat(3)}</p>
                        {/* <p className="card-text"><RenderRating restaurant={restaurant} /> </p> */}
                    </div>
                </div>
            </div>
            <Tooltip />
        </div>
    )
}

const Tooltip = ()=>{
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [showTooltip,setShowTooltip] = useState(true)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {placemenet:"right" });

    const toggleTooltip = ()=>{
        
        if (showTooltip) {
            popperElement.setAttribute("data-show", true);
        } else {
            popperElement.removeAttribute('data-show');
        }
        setShowTooltip(!showTooltip);
    }

    return(
        <>
            <button ref={setReferenceElement} type='button' onClick={toggleTooltip}
                className="btn position-absolute z-1 top-0 end-0 me-2" 
                style={{padding:"6px 8px", backgroundColor:"coral"}}>
                    <i class="fas fa-ellipsis-h"></i>
            </button>
            <div ref={setPopperElement} className='d-flex flex-column p-2 hidden' style={styles.popper} {...attributes.popper}>
                <button type='button' className='btn rounded-circle text-bg-primary' ><i class="fas fa-pen"></i></button>
                <button type='button' className='btn rounded-circle mt-2' style={{backgroundColor:"red", color:"ghostwhite"}}><i style={{ borderRadius:"100%"}} className="fas fa-times fa-lg"></i></button>
            </div>
        </>
    )
}
export default RestaurantCard;