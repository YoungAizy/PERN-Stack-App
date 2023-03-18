import React from 'react';
import RestaurantCard from './RestaurantCard';
import DashboardNav from './DashboardNav';

const Restaurants = (props)=>{

    return(
    <div>
        <DashboardNav/>
        <div  className='row g-0'>
            <div className="col-3">
                <RestaurantCard/>
            </div>
        </div>
    </div>
    )
}

export default Restaurants;