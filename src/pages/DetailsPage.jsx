import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedData } from '../store/actions/restaurantActions';
import { saveSelectedRestaurantReviews } from '../store/actions/reviewsActions';
import Default from "../assets/default.jpg";
import { _public } from '../apis/restaurants';
import { useQuery } from 'react-query';


const DetailsHeader = ({restaurant, street, city, image, rating, count}) => {
    return (
        <div >
            <header id='details-header' className='d-flex justify-content-between'>
                <div className='detail-img col-2 rounded'>
                    <img src={ image ? image : Default} alt="" />
                </div>
                <div className='col-8' style={{ paddingLeft: ".6rem", paddingRight: ".6rem" }}>
                    <div>  
                        <h5 className="display-5">
                            {restaurant}
                        </h5>
                        <StarRating rating={rating} />
                        <span className="text-warning">{count ? `(${count})` : "(0)"}</span>
                    </div>
                    <div className='mt-2'> {street}<br />{city}</div>
                </div>
                <div className='col-1' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to="/">
                        <i className="fas fa-home fa-lg" style={{color:'coral',fontSize:'xx-large'}}></i>
                    </Link>
                </div>
            </header>
        </div>
    )
}

const DetailsPage = () => {
    const { id } = useParams();
    const dispatch =useDispatch()
    const selected = useSelector(state => state.restaurants.Selected);
    const reviews = useSelector(state => state.reviews.reviews);
    const [imgsrc, setImgSrc] = useState();
    console.log("selected reviews", reviews)
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const fetchData = async () => {
        let data;
        if(selected.name){
            console.log("K", selected);
            ({ data } = await _public.singlePartial(id))
        }else{
            console.log("HPJ");
            ({ data } = await _public.singleAll(id))
        }
        console.log("Returned data:", data)
        dispatch(addSelectedData({data:data.restaurant}));
        dispatch(saveSelectedRestaurantReviews({data:data.reviews}));
        setImgSrc(data.restaurant.img_url);

    }
    useQuery('restaurant_page',fetchData);

    return (
        <div>

            {selected && (
                <>
                    <DetailsHeader image={imgsrc && imgsrc} restaurant={selected.name} street={selected["str/sub"]} city={selected.city}
                        rating={selected.avg_rating} count={selected.total_reviews} />
                    <div className="d-flex">

                    <div className="col-2"></div>
                    <div className='col-7'>
                        <div className=' mt-4 p-3 form-margin col-11' id="description">
                            <div style={{ width: "80%", paddingRight:".7rem" }}>
                                {selected.description ? <p>{selected.description}</p> : <h3>No Description given</h3>}
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <div >
                                <Reviews reviews={reviews} />
                            </div>
                            <h2 className='text-center mb-5 mt-4'>Add Review</h2>
                            {isAuthenticated ? <AddReview id={id} />: <Link to="/signin">Sign-in to add reviews</Link>}
                        </div>
                    </div>
                        <div className='my-4 col-3 pe-3'>
                            <div id="contact-details">
                            <h5>Contact Information</h5>
                            <hr/>
                            <p><strong>Address: </strong> </p>
                            <p><strong>E-mail: </strong>{selected.email_addr ? <a href={`mailto:${selected.email_addr}`}>{selected.email_addr}</a>: " Not Supplied" }</p>
                            <p><strong>Telephone: </strong>{selected.telephone ? <a href={`tel:${selected.telephone}`}>{selected.telephone}</a>: " Not Supplied" }</p>
                            <p><strong>Web: </strong>{ <a href={selected.web_addr} target="_blank" rel="noopener noreferrer">{selected.web_addr}</a> } </p>
                            </div>
                        </div>
                    </div>
                </>)}
        </div>
    )
}

export default DetailsPage;