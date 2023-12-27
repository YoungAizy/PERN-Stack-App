export default {
    add: 'INSERT INTO restaurants(name, "str/sub", price_range, description, created_by, telephone, email_addr, web_addr, city, tel_ext, img_url, img_id) values($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning *',
    getOne: "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) as total_reviews, TRUNC(AVG(rating),1)AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.id=$1",
    getPartial: 'SELECT id, description, telephone, email_addr,web_addr,tel_ext FROM restaurants LEFT JOIN (SELECT restaurant_id FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.id=$1',
    getAll: 'SELECT * from (SELECT id, name, "str/sub", city, price_range, img_url from restaurants) as restaurants left join (SELECT restaurant_id, COUNT(*) as total_reviews, TRUNC(AVG(rating),1)as avg_rating FROM reviews GROUP BY restaurant_id ) as reviews on restaurants.id=reviews.restaurant_id limit $1;',
    getListings: 'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*) AS total_reviews, TRUNC(AVG(rating),1)AS avg_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.created_by=$1',
    getListing: 'SELECT name, "str/sub", city, price_range, description, telephone, tel_ext, email_addr, web_addr, img_url from restaurants where id=$1',
    best_rated: 'with t as(SELECT restaurant_id, COUNT(*) as total_reviews,TRUNC(AVG(rating),1)AS avg_rating FROM public.reviews GROUP BY restaurant_id HAVING count(*) >= 10) SELECT * FROM t LEFT JOIN (SELECT id,name, "str/sub",city, price_range, img_url from restaurants) as r on t.restaurant_id=r.id WHERE t.avg_rating>=3;',
    update: 'UPDATE restaurants SET name = $1, "str/sub"=$2, price_range=$3, description=$4, created_by=$5, telephone=$6, email_addr=$7, web_addr=$8, city=$9, tel_ext= $10, img_url=$11 WHERE id=$12 returning *;',
    delete: "DELETE from restaurants where id=$1",

    //LIKES
    newLike: " UPDATE restaurants SET likes = likes + 1 where id = $1 returning likes;",
    removeLike: "UPDATE restaurants SET likes = likes-1 where id = $1 returning likes;"
}

export const REVIEWS_QUERIES = {
    add: "INSERT INTO reviews (reviewer_username,rating,review_text,restaurant_id) values($1, $2, $3, $4) returning *;",
    getReviews: "SELECT * FROM reviews WHERE restaurant_id=$1",
    getUserReviews: 'SELECT * FROM reviews where username = $1',
    getListingsReviews: "SELECT * FROM reviews WHERE restaurant_id = ANY($1) order by restaurant_id;",
    newLike: "UPDATE reviews SET likes = likes+1 WHERE id = $1 returning likes;",
    unLike: "UPDATE reviews SET likes = likes - 1 WHERE id = $1 returning likes;",
    disLike: "UPDATE reviews SET dislikes = dislikes+1 WHERE id = $1 returning dislikes;",
    remove_disLike: "UPDATE reviews SET dislikes = dislikes-1 WHERE id = $1 returning dislikes;",
}