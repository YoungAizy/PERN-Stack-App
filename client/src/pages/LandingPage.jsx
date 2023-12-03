import React, { useState } from 'react'
import Header from '../components/Header'
import ListedRestaurants from '../components/ListedRestaurants'
import SearchRestaurant from '../components/SearchRestaurant'
import SearchResults from '../components/SearchResults'
import RestaurantCard from '../components/RestaurantCard';
import {useSelector, useDispatch} from 'react-redux';
import { saveRestaurants, saveTopRated} from '../store/actions/restaurantActions'
import {useQuery} from 'react-query';
import { _public } from '../apis/restaurants'


function LandingPage() {
    const restaurants = useSelector(state => state.restaurants.All);
    const topRatedRestaurants = useSelector(state => state.restaurants.TopRated);
    const dispatch = useDispatch();


    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [status, setStatus] = useState();
    
   
    useQuery('restaurants', async()=>{
        if(restaurants.length > 0) return;

        const result = await _public.all;
        console.log(result)
        dispatch(saveRestaurants({data:result.data.restaurants}));
        dispatch(saveTopRated({data:result.data.top_rated}));
 
    }, {cacheTime:"Infinity"})

    const checkSearchState = (value) => {
        setSearch(value)
    }

    return (
        <div style={{ margin: "0", padding: "0", boxSizing: "border-box", position: "relative" }}>
            <Header />
            <SearchRestaurant onSearch={(status) => checkSearchState(status)} setSearchResults={setSearchResults} setStatus={setStatus} />
            {topRatedRestaurants && <TopRated restaurants={topRatedRestaurants}/>}
            <h2>Listed on our site</h2>
            {searchResults ? <SearchResults restaurants={restaurants} status={status} /> : <ListedRestaurants onSearch={search}  restaurants={restaurants} />}
        </div>
    )
}

const TopRated = ({restaurants})=>{
    return(
        <div className="container">
            <div className="row">
                <h2>Top Rated</h2>
                {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} />)}
            </div>
        </div>
    )
}

export default LandingPage
