import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantListings = ({listings})=>{

    return(
    <div>

        <div className='row m-2'>
      
            {listings && listings.map(listing=> <RestaurantCard key={listing.id} listing={listing}/>)}
 
        </div>
    </div>
    )
}

export default RestaurantListings;