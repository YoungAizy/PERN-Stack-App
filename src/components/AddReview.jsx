import React, { useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import reviewsApi from '../apis/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../store/actions/reviewsActions';
// import Button from './styled/Button';

const AddReview = ({ id }) => {
    const username = useSelector(state => state.profile.profile?.username);
    const dispatch = useDispatch();
    // Gives us acces to our entire current URL
    // const location = useLocation(),
    //     history = useHistory();

    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data }= await reviewsApi.post({username, rating,review, restaurant_id: id});
            console.log(data);
            dispatch(addReview({data: data.data[0]}));
            // history.push(location.pathname);
            
        } catch (error) {
            console.log("Add Review Error:", error);
        }

    }

    return (
        <div className="container mb-2 mt-2">
            <form className='add-review'>
                <div className="form-row ">
                    <div className="form-goup col-2 mb-2">
                       
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
                    <textarea value={review} id="review" rows={4} className="form-control" onChange={e => setReview(e.target.value)}></textarea>
                </div>
                {/* <Button text={"Submit"} btnType={"button"} onBtnClick={handleSubmit} /> */}
                <button onClick={handleSubmit} className="btn bg-primary text-white">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;
