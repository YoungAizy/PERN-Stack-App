import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import databinder from '../apis/databinder';
import AddReview from '../components/addReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../Context API/Context';
import Default from "../assets/default.jpg";


const DetailsHeader = (props) => {
    return (
        <div >
            <header id="detail-header">
                <div className='detail-img'>
                    <img src={props.image ? props.image : Default} alt="" />
                </div>
                <div style={{ paddingLeft: ".6rem", paddingRight: ".6rem" }}>
                    <div>  <h5 className="display-5">
                        {props.restaurant}
                    </h5>
                        <StarRating rating={props.rating} />
                        <span className="text-warning">{props.count ? `(${props.count})` : "(0)"}</span>
                    </div>
                    <div> 214 Dias Lane, Summerstrand<br />Port Elizabeth </div>
                </div>
                <div style={{ boxShadow: "-2px 0 4px gray", display: "flex", alignItems: "center", justifyContent: "center" }}><Link to="/">Home</Link></div>
            </header>
        </div>
    )
}

const DetailsPage = () => {
    const { selected, setSelected } = useContext(RestaurantsContext);
    const { restaurants } = useContext(RestaurantsContext);
    const { id } = useParams();
    const [imgsrc, setImgSrc] = useState();

    const fetchData = async () => {
        const { data } = await databinder.get(`/restaurants/${id}`);

        const type = data.data.restaurant.mimetype;
        const buffer = data.data.restaurant.pic && Buffer.from(data.data.restaurant.pic).toString("base64");
        data.data.restaurant.pic && setImgSrc(`data:${type};base64, ${buffer}`);
        setSelected(data.data);

    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, []);
    return (
        <div>

            {selected && (
                <>
                    <DetailsHeader image={imgsrc && imgsrc} restaurant={selected.restaurant.name} street={selected.restaurant.street} suburb={selected.restaurant.suburb}
                        rating={selected.restaurant.average_rating} count={selected.restaurant.count} />

                    <div id="description">
                        <div style={{ width: "80%" }}>
                            {selected.restaurant.description ? <p>{selected.restaurant.description}</p> : <h3>No Description given</h3>}
                        </div>
                        <div id="contact-details" >
                            <h5>Contact Information</h5>
                            {selected.restaurant.email_address && <p><strong>E-mail: </strong> <a href={`mailto:${selected.restaurant.email_address}`}>{selected.restaurant.email_address}</a></p>}
                            {selected.restaurant.telephone && <p><strong>Telephone: </strong> <a href={`tel:${selected.restaurant.telephone}`}>{selected.restaurant.telephone}</a> </p>}
                            {selected.restaurant.website && <p><strong>Web: </strong><a href={selected.restaurant.website} target="_blank" rel="noopener noreferrer">{selected.restaurant.website}</a> </p>}

                        </div>
                    </div>
                    <div className="mt-3">
                        <div >

                            <Reviews reviews={selected.reviews} />
                        </div>
                        <AddReview id={id} />
                    </div>
                </>)}
        </div>
    )
}

export default DetailsPage;