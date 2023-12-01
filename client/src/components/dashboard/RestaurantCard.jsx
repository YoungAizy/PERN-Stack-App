import React from 'react';
import DefaultImage from '../../assets/default.jpg'


const RestaurantCard = (listing)=>{

    function triggerPopup(e){
        e.preventDefault();
        
    }

    return(
        <div className="col-3">
        <div className="card border border-primary rounded-3" style={{height:360}} onClick={triggerPopup}>
            <div className="" style={{height:'50%'}}>
                 <img style={{ width: "100%" }} src={DefaultImage} alt="molo" />
            </div>
            <div className="">
                <div className="card-body mt-2">
                    <h4 className="card-title">Restaurant Name</h4>       
                    <p className="card-text">Location </p>
                    <p >Price Range: {"$".repeat(3)}</p>
                    {/* <p className="card-text"><RenderRating restaurant={restaurant} /> </p> */}
                </div>
            </div>
        </div>
        </div>
    )
}

export default RestaurantCard;