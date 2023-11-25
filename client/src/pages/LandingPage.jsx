import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import ListedRestaurants from '../components/ListedRestaurants'
import SearchRestaurant from '../components/SearchRestaurant'
import SearchResults from '../components/SearchResults'
import { RestaurantsContext } from '../Context API/Context'
import RestaurantCard from '../components/RestaurantCard'
import databinder from '../apis/databinder';
import {useQuery} from 'react-query';
import { _public } from '../apis/restaurants'

function LandingPage() {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const {topRatedRestaurants, setTopRatedRestaurants} = useContext(RestaurantsContext);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [status, setStatus] = useState();

    useQuery('restaurants', async()=>{
        const result = await _public.all;
        console.log(result)
        setTopRatedRestaurants(result.data.top_rated);
        setRestaurants(result.data.restaurants);
 
    }, )

    const checkSearchState = (value) => {
        setSearch(value)
    }

    return (
        <div style={{ margin: "0", padding: "0", boxSizing: "border-box", position: "relative" }}>
            <Header />
            <SearchRestaurant onSearch={(status) => checkSearchState(status)} setSearchResults={setSearchResults} setRestaurants={setRestaurants} setStatus={setStatus} />
            {topRatedRestaurants && <TopRated restaurants={topRatedRestaurants}/>}
            <h2>Listed on our site</h2>
            {searchResults ? <SearchResults restaurants={restaurants} status={status} /> : <ListedRestaurants onSearch={search} setRestaurants={setRestaurants} restaurants={restaurants} />}
        </div>
    )
}

const TopRated = ({restaurants})=>{
    return(
        <div>
            <h2>Top Rated</h2>
            {restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} key={restaurant.id} />)}
        </div>
    )
}

export default LandingPage
