export default {
    add: 'INSERT INTO restaurants(_name, "_str./sub", price_range, description, created_by, _telephone, email_addr,web_addr,_city,tel_ext,img_url) values($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) returning *',
    get: "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.id=$1",
    getAll: "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating from reviews group by restaurant_id ) reviews on restaurants.id=reviews.restaurant_id limit $1;",
    update: "UPDATE restaurants SET name = $1, street=$2, price_range=$3, description=$4, created_by=$5, telephone=$6, email_address=$7,website=$8,city=$9 WHERE id=$10 returning *",
    delete: 'delete from restaurants where id=$1'
}