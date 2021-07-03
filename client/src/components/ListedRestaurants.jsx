import React, { useCallback, useEffect } from 'react';
import Default from "../assets/default.jpg"
import databinder from '../apis/databinder';
import { useHistory } from 'react-router-dom';
import { RenderRating } from './RestaurantList';


function ListedRestaurants({ onSearch, restaurants, setRestaurants }) {
    const history = useHistory();
    const restaurantList = useCallback((data) => {
        setRestaurants(data)
    }, [setRestaurants]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await databinder.get('/restaurants');
                restaurantList(result.data.data.restaurants)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [restaurantList])
    if (onSearch) {
        return (<div><h1 className="mt-5" style={{ textAlign: "center" }}>FETCHING RESULTS...</h1></div>)
    }
    return (
        <div className="container">
            <div className='row'>

                {restaurants && restaurants.map(restaurant => {
                    const location = restaurant.street + ", " + restaurant.city;
                    const type = restaurant.mimetype;
                    const buffer = restaurant.pic && Buffer.from(restaurant.pic).toString("base64");
                    const imgSrc = restaurant.pic && (`data:${type};base64, ${buffer}`);
                    return (
                        <div key={restaurant.id} className="card mb-3" style={{ maxWidth: "480px", margin: "1rem" }}>
                            <div className="row g-0" onClick={e => {
                                e.stopPropagation()
                                history.push(`/restaurants/${restaurant.id}`)
                            }}>
                                <div className="col-md-5" style={{ display: 'flex', alignItems: "center", height: '100%' }}>
                                    <img style={{ width: "100%" }} src={imgSrc ? imgSrc : Default} alt="" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="card-title">{restaurant.name}</h4>
                                        <p className="card-text">{location} </p>
                                        <p className="card-text"><RenderRating restaurant={restaurant} /> </p>
                                        <p >Price Range: {"$".repeat(restaurant.price_range)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListedRestaurants
