import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AddReview from '../components/addReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedData } from '../store/actions/restaurantActions';
import { saveSelectedRestaurantReviews } from '../store/actions/reviewsActions';
import Default from "../assets/default.jpg";
import { _public } from '../apis/restaurants';


const DetailsHeader = (props) => {
    return (
        <div >
            <header id='details-header' className='d-flex justify-content-between'>
                <div className='detail-img col-2 rounded'>
                    <img src={props.image ? props.image : Default} alt="" />
                </div>
                <div className='col-8' style={{ paddingLeft: ".6rem", paddingRight: ".6rem" }}>
                    <div>  
                        <h5 className="display-5">
                            {props.restaurant}
                        </h5>
                        <StarRating rating={props.rating} />
                        <span className="text-warning">{props.count ? `(${props.count})` : "(0)"}</span>
                    </div>
                    <div> {props.street}<br />{props.suburb}</div>
                </div>
                <div className='col-1' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to="/">
                        <i class="fas fa-home fa-lg" style={{color:'white',fontSize:'xx-large'}}></i>
                    </Link>
                </div>
            </header>
        </div>
    )
}

const DetailsPage = () => {
    const { id } = useParams();
    console.log(id)
    const dispatch =useDispatch()
    const selected = useSelector(state => state.restaurants.Selected);
    const reviews = useSelector(state => state.reviews.reviews);
    const [imgsrc, setImgSrc] = useState();
    console.log("selected reviews", reviews)

    const fetchData = async () => {
        const { data } = await _public.singlePartial(id);
        console.log(data)
        dispatch(addSelectedData({data:data.restaurant}))
        dispatch(saveSelectedRestaurantReviews({data:data.reviews}))
        // const type = data.data.restaurant.mimetype;
        // const buffer = data.data.restaurant.pic && Buffer.from(data.data.restaurant.pic).toString("base64");
        // data.data.restaurant.pic && setImgSrc(`data:${type};base64, ${buffer}`);

    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, []);

    return (
        <div>

            {selected && (
                <>
                    <DetailsHeader image={imgsrc && imgsrc} restaurant={selected._name} street={selected["_str/sub"]} suburb={selected._city}
                        rating={selected.avg_rating} count={selected.total_reviews} />
                    <div className="d-flex">

                    <div className="col-2"></div>
                    <div className='col-7'>
                        <div className=' mt-4 p-3 form-margin col-11' id="description">
                            <div style={{ width: "80%", paddingRight:".7rem" }}>
                                {selected.description ? <p>{selected.description}</p> : <h3>No Description given</h3>}
                            </div>
                        </div>
                        <div className="mt-3 mb-4">
                            <div >
                                <Reviews reviews={reviews} />
                            </div>
                            <h2 className='text-center mb-5 mt-4'>Add Review</h2>
                            <AddReview id={id} />
                        </div>
                    </div>
                        <div className='my-4 col-3 pe-3'>
                            <div id="contact-details">
                            <h5>Contact Information</h5>
                            <hr/>
                            <p><strong>Address: </strong> </p>
                            {selected.email_address && <p><strong>E-mail: </strong> <a href={`mailto:${selected.email_address}`}>{selected.email_address}</a></p>}
                            {selected._telephone && <p><strong>Telephone: </strong> <a href={`tel:${selected._telephone}`}>{selected._telephone}</a> </p>}
                            {selected.website && <p><strong>Web: </strong><a href={selected.website} target="_blank" rel="noopener noreferrer">{selected.website}</a> </p>}
                            </div>
                        </div>
                    </div>
                </>)}
        </div>
    )
}

export default DetailsPage;