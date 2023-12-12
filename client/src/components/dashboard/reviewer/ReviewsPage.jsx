import React from 'react'
import Reviews from '../../Reviews'

export default function ReviewsPage() {
  return (
    <div className='mx-auto mb-3'>
      <h2 className='my-3' >My Reviews</h2>
      <Reviews reviews={mockData} />
    </div>
  )
}

const mockData= [
  {
    id: 1,
    rating: 1,
    review_text: "Just another chicken franchise that wants to make you unhealthy by feeding you poison. Might as well inject me with diabetes directly",
    username: "I_am_a_troll",

  },
  {
    id: 2,
    rating: 4,
    review_text: "Good food. I especially loved the chicken nuggets",
    username: "Jessica",

  },
  {
    id: 3,
    rating: 4,
    review_text: "Had a lovely first date with my wife here, when the restaurants had just opened 6 years ago. Took her to dinner for our anniversary, and I must compliment the service and the food is still delicious. Had a good time.",
    username: "Paul",

  },
]