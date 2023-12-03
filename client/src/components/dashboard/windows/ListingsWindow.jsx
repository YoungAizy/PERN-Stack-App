import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { _protected as restaurantsApi } from '../../../apis/restaurants';
import RestaurantListings from '../RestaurantsList';
import { saveUserListings } from '../../../store/actions/restaurantActions';

function ListingsWindow() {
    const dispatch = useDispatch();
    const userListings = useSelector(state => state.restaurants.MyListings);



    useQuery("reviews", ()=>{
        if(userListings.length > 0) return;

        restaurantsApi.fetchListings("aizy")
        .then(result=>{
          console.log(result.data)
          dispatch(saveUserListings({data:result.data.data}))
        })
        
    })


  return (
    <div>
         <div className='d-flex justify-content-evenly align-items-center mt-2 mb-4'>
            <h2> My Restaurants</h2>
            <button className='btn btn-outline-primary rounded-circle'><i className='fa fa-plus'></i></button>
        </div>
        <RestaurantListings listings={userListings}/>
    </div>
  )
}

export default ListingsWindow