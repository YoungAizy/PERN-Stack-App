const express = require('express');
const app = express();
const {
    Pool
} = require('pg')

const db = new Pool({
    user: "postgres",
    host: "localhost",
    port:5437,
    database: 'test_db',
    password: "restaurant_App"
})

app.use(express.json());


// Creating a New Restaurant
app.post("/api/v1/restaurants/add", async (req, res) => {
    console.log(req.body)
    const data = req.body.data;
    console.log(data)
    try {
        const result = await db
            .query('INSERT INTO restaurants(_name, "_str./sub", price_range, description, created_by, _telephone, email_addr,web_addr,_city,tel_ext,img_url) values($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) returning *',
                [data.name, data.location, parseInt(data.price), data.about, data.user, data.phone, data.email, data.website, data.city,data.ext,'www.imgUrl.com/s3']);
                console.log("moving on...")
        if (req.file) {
            try {
                const imageData = await db.query("INSERT INTO images(pic,pic_name,mimetype,restaurant) values($1,$2,$3,$4)  returning *",
                    [req.file.buffer, req.file.originalname, req.file.mimetype, result.rows[0].id]);

                if (result.rowCount > 0 && imageData.rowCount > 0) {
                    res.json({
                        status: "success",
                        data: result.rows[0]
                    })
                }
            } catch (error) {
                console.log("Some Error", error);
                res.json({
                    status: "failed"
                });
            }
        } else {
            res.json({
                status: "success",
                data: result.rows[0]
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: "error",
            data: error
        });
    }

});

// Query all restaurants from DB and serve them 
app.get('/api/v1/restaurants', async (req, res) => {
    const result = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating from reviews group by restaurant_id ) reviews on restaurants.id=reviews.restaurant_id limit $1;",
        [req.query.limit || null]);
    res.json({
        status: "success",
        results: result.rows.length,
        data: {
            restaurants: result.rows
        },
        user: req.user
    });
});

// Query a single restaurant by ID
app.get("/api/v1/restaurants/:id", async (req, res) => {
    const restaurant = await db
        .query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.id=$1",
            [req.params.id]);
    //const reviews = await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);

    res.json({
        status: "success",
        data: {
            restaurant: restaurant.rows[0],
            //reviews: reviews.rows
        }
    })
});

// Updating a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    const data = JSON.parse(req.body.data);
    try {
        const result = await db
            .query("UPDATE restaurants SET name = $1, street=$2, price_range=$3, description=$4, created_by=$5, telephone=$6, email_address=$7,website=$8,city=$9 WHERE id=$10 returning *",
                [data.name, data.location, data.price, data.about, data.user, data.phone, data.email, data.website, data.city, req.params.id]);

        if (req.file) {
            const imageData = await db.query("INSERT INTO images(pic,pic_name,mimetype,restaurant) values($1,$2,$3,$4)  returning *",
                [req.file.buffer, req.file.originalname, req.file.mimetype, result.rows[0].id]);

            if (result.rowCount > 0 && imageData.rowCount > 0) {
                res.json({
                    status: "success",
                    data: result.rows
                })
            } else if (result.rowCount > 0)
                res.json({
                    status: "Incomplete"
                })
            else
                res.json({
                    status: "Failed"
                })
        } else {
            if (result.rowCount > 0) {
                res.json({
                    status: "success",
                    data: result.rows
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "Failed"
        })
    }

})

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    await db.query('delete from restaurants where id=$1', [req.params.id]);
    res.json({
        status: "Deleted"
    })
})

app.listen(8001, () => console.log(`Server is up and running on ${8001}`));