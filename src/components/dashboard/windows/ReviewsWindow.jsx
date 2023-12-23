import React from 'react'
import ReviewsList from '../ReviewsList'
import { useDispatch, useSelector } from 'react-redux';
import { saveUserReviews } from '../../../store/actions/reviewsActions';
import { useQuery } from 'react-query';
import reviewsApi from '../../../apis/reviews';

function ReviewsWindow() {
    const dispatch = useDispatch();
    const myReviews = useSelector(state => state.reviews.myReviews);

    useQuery("reviews", ()=>{
        if(myReviews.length > 0) return;

        reviewsApi.getReviews("Aizy")
        .then(result=>{
          console.log(result.data);
          dispatch(saveUserReviews({data:result.data.data}))
        })
        
    })

  return (
    <div>
        <h2>My Reviews</h2>
        <ReviewsList reviewer={"Aizy"} reviews={myReviews} />
        
    </div>
  )
}

export default ReviewsWindow