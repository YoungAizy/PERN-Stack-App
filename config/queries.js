export default {
    add: 'INSERT INTO restaurants(name, "str/sub", price_range, description, created_by, telephone, email_addr,web_addr,city,tel_ext,img_url) values($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) returning *',
    getOne: "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.id=$1",
    getAll: "SELECT * from restaurants left join (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating FROM reviews GROUP BY restaurant_id ) reviews on restaurants.id=reviews.restaurant_id limit $1;",
    update: 'UPDATE restaurants SET _name = $1, "_str./sub"=$2, price_range=$3, description=$4, created_by=$5, _telephone=$6, email_addr=$7, web_addr=$8, _city=$9, tel_ext= $10, img_url=$11 WHERE id=$12 returning *;',
    delete: "DELETE from restaurants where id=$1",

    //LIKES
    newLike: " UPDATE restaurants SET likes = likes + 1 where id = $1 returning likes;",
    removeLike: "UPDATE restaurants SET likes = likes-1 where id = $1 returning likes;"
}

export const REVIEWS_QUERIES = {
    add: "INSERT INTO reviews (username,rating,review_text,restaurant_id) values($1, $2, $3, $4) returning *;",
    getReviews: "SELECT * FROM reviews WHERE restaurant_id=$1",
    newLike: "UPDATE reviews SET likes = likes+1 WHERE id = $1 returning likes;",
    unLike: "UPDATE reviews SET likes = likes - 1 WHERE id = $1 returning likes;",
    disLike: "UPDATE reviews SET dislikes = dislikes+1 WHERE id = $1 returning dislikes;",
    remove_disLike: "UPDATE reviews SET dislikes = dislikes-1 WHERE id = $1 returning dislikes;",
    delete:"DELETE FROM reviews WHERE id = $1"
}