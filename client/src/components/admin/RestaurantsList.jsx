import React from 'react';
import RestaurantCard from './RestaurantCard';

const Restaurants = (props)=>{

    return(
    <div className='row g-0'>
        <div className="col-3">
            <RestaurantCard/>
        </div>
    </div>
    )
}

export default Restaurants;