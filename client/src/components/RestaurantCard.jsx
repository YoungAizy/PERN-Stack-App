import React from 'react';
import StarRating from './StarRating';
import Default from "../assets/default.jpg";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../store/actions/restaurantActions';

export const RenderRating = ({ total_reviews, avg_rating }) => {
    if (!total_reviews) {
        return (<span className="text-warning"> 0 Reviews</span>)
    }
    return (
        <>
            <StarRating rating={avg_rating} />
            <span className="text-warning ml-1">({total_reviews})</span>
        </>
    )
}

const RestaurantCard = ({restaurant}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const location = restaurant["str/sub"] + ", " + restaurant.city;
    const imgSrc = restaurant.img_url;

    const cardClicked = e =>{
        e.stopPropagation();
        dispatch(setSelected({data:restaurant}));
        history.push(`/restaurant/${restaurant.id}`);
    }

  return (
    <div key={restaurant.id} className="card mb-3" style={{ maxWidth: "480px", margin: "1rem" }}>
                            <div className="row g-0" onClick={e => cardClicked(e)}>
                                <div className="col-md-5" style={{ display: 'flex', alignItems: "center", height: '100%' }}>
                                    <img style={{ width: "100%" }} src={imgSrc ? imgSrc : Default} alt="" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="card-title">{restaurant.name}</h4>
                                        <p className="card-text">{location} </p>
                                        <p className="card-text"><RenderRating total_reviews={restaurant.total_reviews} avg_rating={restaurant.avg_rating} /> </p>
                                        <p >Price Range: {"$".repeat(restaurant.price_range)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
  )
}



export default RestaurantCard