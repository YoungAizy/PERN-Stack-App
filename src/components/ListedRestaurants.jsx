import React from 'react';
import RestaurantCard from './RestaurantCard';


function ListedRestaurants({ onSearch, restaurants }) {

    if (onSearch) {
        return (<div><h1 className="mt-5" style={{ textAlign: "center" }}>FETCHING RESULTS...</h1></div>)
    }
    return (
        <div className="container">
            <div className='row'>
                {restaurants && restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} />)}
            </div>
        </div>
    )
}

export default ListedRestaurants
