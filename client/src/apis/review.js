import databinder from './databinder';

export default {
    post: databinder.post('/reviews/add'),
    like(id){ databinder.patch(`/reviews/like/${id}`)},
    dislike(id){ databinder.patch(`/reviews/dislike/${id}`)},
    get(id){ databinder.get(`/reviews?createdby=${id}`)},
    delete(id){databinder.delete(`/reviews/delete/${id}`)}
}