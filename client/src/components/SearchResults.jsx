import React from 'react'
import { useHistory } from 'react-router-dom';
import Default from "../assets/default.jpg"
import { RenderRating } from './RestaurantList';

const SearchResults = ({ restaurants, status }) => {
    const history = useHistory();

    if (status) {
        if (status === "empty") {
            return (
                <div className="container mt-5"><h2 style={{ textAlign: "center" }}>NO ITEMS MATCH YOUR SEARCH</h2></div>
            )
        } else if (status === "error") {
            return (
                <div className="container mt-5"><h2 style={{ textAlign: "center" }}>A SERVER ERROR OCCURED!</h2></div>
            )
        }
    }

    return (
        <div className="container">
            {restaurants && restaurants.map(restaurant => {
                const location = restaurant.street + ", " + restaurant.city;
                const type = restaurant.mimetype;
                const buffer = restaurant.pic && Buffer.from(restaurant.pic).toString("base64");
                const imgSrc = restaurant.pic && (`data:${type};base64, ${buffer}`);
                return (
                    <div className="card mb-3" style={{ maxWidth: "480px" }}>
                        <div className="row g-0" onClick={e => {
                            e.stopPropagation()
                            history.push(`/restaurants/${restaurant.id}`)
                        }}>
                            <div className="col-md-5" style={{ display: 'flex', alignItems: "center" }}>
                                <img style={{ width: "100%" }} src={imgSrc ? imgSrc : Default} alt="" />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <h4 className="card-title">{restaurant.name}</h4>
                                    <p className="card-text">{location} </p>
                                    <p className="card-text"><RenderRating restaurant={restaurant} /></p>
                                    <p>Price Range: {"$".repeat(restaurant.price_range)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults
