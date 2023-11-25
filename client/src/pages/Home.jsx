import React, { useEffect, useState } from 'react';
import AddRestaurant from '../components/AddRestaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
    const [mobileScreen, setMobileScreen] = useState(false)

    useEffect(() => {
        const screen = window.innerWidth;
        if (screen <= 760) {
            setMobileScreen(true);
        }
    }, []);

    if (mobileScreen) {
        return (
            <div>
                <Header isDashBoard={true} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "65vh" }}>
                    <h4>This Page Is Not Available In Mobile.</h4>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header isDashBoard={true} />
            <h2>My Restaurants</h2>
            <AddRestaurant />
            <RestaurantList myRestaurants={true} />
            <h2>OTHER LISTINGS</h2>
            <RestaurantList />
        </div>
    )
}

export default Home;