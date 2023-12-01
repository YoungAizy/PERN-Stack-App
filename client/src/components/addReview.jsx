import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import databinder from '../apis/databinder';

const AddReview = ({ id }) => {
    // Gives us acces to our entire current URL
    const location = useLocation(),
        history = useHistory();

    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await databinder.post(`/restaurants/${id}/reviews`, {
            rating, review,
        });
        console.log(response);
        history.push("/");
        history.push(location.pathname);
    }

    return (
        <div className="container mb-2">
            <form className='add-review'>
                <div className="form-row ">
                    <div className="form-group col-4 mb-2">

                        <select value={rating} className="form-select " id="rating" onChange={e => setRating(e.target.value)}>
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group col-6 mb-3">
                    <label htmlFor="review">Review:</label>
                    <textarea value={review} id="review" className="form-control" onChange={e => setReview(e.target.value)}></textarea>
                </div>
                <button onClick={e => handleSubmit(e)} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;
