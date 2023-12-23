import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { _protected as restaurantsApi } from '../../../apis/restaurants';
import RestaurantListings from '../RestaurantListings';
import { saveUserListings } from '../../../store/actions/restaurantActions';
import AddRestaurant from '../../AddRestaurant';

function ListingsWindow() {
    const dispatch = useDispatch();
    const userListings = useSelector(state => state.restaurants.MyListings);

    const [showAddRestaurant, setShowAddRestaurant] = useState(false);



    useQuery("listings", ()=>{
        if(userListings.length > 0) return;
        console.log("fetching listings...")

        restaurantsApi.fetchListings("aizy")
        .then(({data})=>{
          console.log("ListingsFetch results:",data)
          dispatch(saveUserListings({data:data.data}))
        })
        
    })


  return (
    <div>
         <div className='d-flex justify-content-evenly align-items-center mt-2 mb-4'>
            <h2> My Restaurants</h2>
            <button className='btn btn-outline-primary rounded-circle' onClick={()=> setShowAddRestaurant(!showAddRestaurant)} ><i className='fa fa-plus'></i></button>
        </div>
        {showAddRestaurant && <AddRestaurant />}
        <RestaurantListings listings={userListings}/>
    </div>
  )
}

export default ListingsWindow