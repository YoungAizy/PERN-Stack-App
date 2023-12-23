/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const ReviewsList = ({reviewer, reviews}) => {
    
  return (
    <>
        <div className="container mt-4 ">
            <table className='table table-hover table-dark rounded-4 overflow-hidden'>
                <thead>
                    <tr className="bg-primary">
                        <th>day</th>
                        <th>restaurant</th>
                        <th>review</th>
                        <th>rating</th>
                        <th>popularity</th>
                        {reviewer ? <><th scope="col">visit page</th><th scope="col-1">X</th></> :
                                <th scope="col">Posted by</th>}
                    </tr>
                </thead>
                <tbody>
                    {reviews && reviews.map( review => (
                        <tr key={review.id}>
                            <td>{review.review_time}</td>
                            <td>{review.restaurant_name}</td>
                            <td>{review.review_text}</td>
                            <td>{review.rating}</td>
                            <td>{review.likes - review.dislikes}</td>
                            {reviewer ? <><td><a href='#'><i className="fas fa-external-link-alt"></i></a></td>
                            <td><span style={{color:"crimson"}}><i style={{ borderRadius:"100%", backgroundColor:"white"}} className="fas fa-times-circle"></i></span></td></> :
                                <td>Posted by</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default ReviewsList