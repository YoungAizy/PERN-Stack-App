import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();
export const ContextProvider = props => {
    // useState is a hook to bind/store the restaurants list
    const [restaurants, setRestaurants] = useState([]);
    const [myrestaurants, setMyRestaurants] = useState([])
    const [selected, setSelected] = useState(null);
    const [user, setUser] = useState(null);

    const addRestaurant = (newEntry)=> setMyRestaurants([...myrestaurants, newEntry])

    return (
        // Context.Provider will wrap the App component and pass the value down to the App component and its children
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurant, selected, setSelected, user, setUser, myrestaurants, setMyRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}