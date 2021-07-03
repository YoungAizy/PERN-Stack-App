import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import ListedRestaurants from '../components/ListedRestaurants'
import SearchRestaurant from '../components/SearchRestaurant'
import SearchResults from '../components/SearchResults'
import { RestaurantsContext } from '../Context API/Context'

function LandingPage() {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [status, setStatus] = useState();

    const checkSearchState = (value) => {
        setSearch(value)
    }

    return (
        <div style={{ margin: "0", padding: "0", boxSizing: "border-box", position: "relative" }}>
            <Header />
            <SearchRestaurant onSearch={(status) => checkSearchState(status)} setSearchResults={setSearchResults} setRestaurants={setRestaurants} setStatus={setStatus} />
            <h2>Listed on our site</h2>
            {searchResults ? <SearchResults restaurants={restaurants} status={status} /> : <ListedRestaurants onSearch={search} setRestaurants={setRestaurants} restaurants={restaurants} />}
            {/* <form action="" encType="multipart/form-data">
                <label htmlFor="">Select a Pic</label>
                <input type="file" name="" id="" accept="image/*" onChange={ e=>sendFile(e.target)}/>
                <input type="button" value="Request" onClick={getFiles} />
                <img src="" alt="Placeholder" id="image"/>
            </form> */}
        </div>
    )
}

export default LandingPage
