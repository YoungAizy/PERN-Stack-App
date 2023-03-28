require('dotenv').config();
const express = require('express');
const app = express();
const multer = require('multer');
//const stream = require('stream');
const db = require("./db");
const middleware = require('./checkCredentials');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

var storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

app.use(cors())
app.use(helmet())
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    // serve static content 
    app.use(express.static(path.join(__dirname, "client/build")))
}


// ****** AUTHENTICATION ROUTES ********

app.post('/api/v1/auth/signup', middleware.middleware, async (req, res) => {
    if (req.body.pass) {
        const encryptedPassword = await bcrypt.hash(req.body.password, 8);
        const email = escape(req.body.email).toLowerCase();
        const name = req.body.name;
        db.query("INSERT INTO users(name, password, email) values($1, $2, $3) returning *",
                [name, encryptedPassword, email])
            .then(result => {
                if (result.rowCount > 0) {
                    const user = {
                        name: name,
                        email: email
                    };
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    res.json({
                        accessToken: accessToken,
                        user: user
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.send("Could not register user. Error uploading info")
            });
    }
});
//UPDATE USER DETAILS
app.put("/api/v1/auth/:email", middleware.middleware, async (req, res) => {
    try {
        if (req.body.newPassword) {
            if (bcrypt.compareSync(req.body.password, req.hashedPassword)) {
                const encryptedPassword = await bcrypt.hash(req.body.newPassword, 8);
                const result = await db.query(
                    "UPDATE users SET name = $1, email= $2, password=$3 where email= $4 returning *",
                    [req.body.name, escape(req.body.newEmail).toLowerCase(), encryptedPassword, escape(req.params.email).toLowerCase()]);
                if (result.rowCount > 0) {
                    const user = {
                        name: req.body.name,
                        email: req.body.newEmail
                    };
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    res.json({
                        accessToken: accessToken,
                        user: user,
                        data: result.rows[0]
                    });
                }
            }
        } else {
            const response = await db.query(
                "UPDATE users SET name = $1, email= $2 where email=$3 returning *",
                [req.body.name, escape(req.body.newEmail).toLowerCase(), escape(req.params.email).toLowerCase()]);
            if (response.rowCount > 0) {
                const user = {
                    name: req.body.name,
                    email: req.body.newEmail
                };
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.json({
                    accessToken: accessToken,
                    user: user,
                    data: response.rows[0]
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
})
//DELETE A USER
app.delete("/api/v1/auth/:email", (req, res) => {
    db.query("DELETE FROM users WHERE email=$1", [escape(req.params.email).toLocaleLowerCase()]).
    then(response => {
            console.log(response);
            res.send("Deleted!")
        })
        .catch(err => console.log(err));
})

// ****** MIDDLEWARE TO CHECK AUTH TOKEN *****

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token != null) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) res.sendStatus(403)
            req.user = user;
            console.log(user)
        })
    }
    next()
}

app.post("/api/v1/auth/login", middleware.middleware, (req, res) => {
    try {
        if (bcrypt.compareSync(req.body.password, req.hashedPassword)) {
            const user = {
                name: req.name,
                email: req.body.email
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            res.json({
                accessToken: accessToken,
                user: req.user
            });
        } else
            res.send("Password Authentication Failed")
    } catch (error) {
        console.log(error);
        res.send("Login Failed");
    }
})

app.get('/dashboard', function(req,res) {
		res.sendFile(path.join(__dirname, 'client/build', '/index.html'));
});
app.get('/signin', function(req,res) {
		res.sendFile(path.join(__dirname, 'client/build', '/index.html'));
});

app.get('/restaurants/:id', function(req,res) {
		res.sendFile(path.join(__dirname, 'client/build', '/index.html'));
});
app.get('/restaurants/:id/update', function(req,res) {
		res.sendFile(path.join(__dirname, 'client/build', '/index.html'));
});

// Query all restaurants from DB and serve them 
app.get('/api/v1/restaurants', authenticateToken, async (req, res) => {
    const result = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating from reviews group by restaurant_id ) reviews on restaurants.id=reviews.restaurant_id left join (select restaurant,mimetype,pic from images) images on restaurants.id=images.restaurant limit $1;",
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
        .query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id=reviews.restaurant_id LEFT JOIN images ON restaurants.id=images.restaurant WHERE restaurants.id=$1",
            [req.params.id]);
    const reviews = await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);

    res.json({
        status: "success",
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        }
    })
});

app.get("/api/v1/myrestaurants", authenticateToken, async (req, res) => {
    try {
        const restaurant = await db
            .query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1)AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id=reviews.restaurant_id WHERE restaurants.created_by=$1",
                [req.user.name]);

        res.json({
            status: "success",
            data: restaurant.rows,
            user: req.user
        })
    } catch (error) {
        console.log(error)
    }
});

app.get("/:look", async (req, res) => {
    console.log(req.query)
    const query = req.query.order_by+" "+req.query.order;
    try {
        const name = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating from reviews group by restaurant_id ) reviews on restaurants.id=reviews.restaurant_id LEFT JOIN images ON restaurants.id=images.restaurant where restaurants.name LIKE $1 ORDER BY $2 ;",
            [`%${escape(req.params.look).toLowerCase()}%`, query]);

        if (name.rowCount > 0) {
            res.json({
                status: "success",
                result: name.rows
            });
        } else if (name.rowCount == 0) {
            res.json({
                status: "empty"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: "error"
        })
    }
})

// Creating a New Restaurant
app.post("/api/v1/restaurants", upload.single('image'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    console.log(data)
    try {
        const result = await db
            .query("INSERT INTO restaurants(name, street, price_range, description, created_by, telephone, email_address,website,city) values($1, $2, $3,$4,$5,$6,$7,$8,$9) returning *",
                [data.name, data.location, parseInt(data.price), data.about, data.user, data.phone, data.email, data.website, data.city]);
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
        res.json({
            status: "error"
        });
    }

});

// Updating a Restaurant
app.put("/api/v1/restaurants/:id", upload.single('image'), async (req, res) => {
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

// Creating a review
app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
    const result = await db.query("INSERT INTO reviews(name, rating, review, restaurant_id) values($1, $2, $3,$4) returning *",
        [req.body.name, req.body.rating, req.body.review, req.params.id]);

    res.json({
        status: "success",
        data: result.rows
    })
})

const port = process.env.PORT || 8040;

app.listen(port, () => console.log(`Server is up and running on ${port}`));