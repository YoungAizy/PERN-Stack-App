import React, { useState } from 'react'


export default function SearchRestaurant({ onSearch, setRestaurants, setSearchResults, setStatus }) {
    const [name, setName] = useState("");
    const [filter, setFilter] = useState("price_range");
    const [order, setOrder] = useState("ASC");
    const axios = require('axios')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchResults(false)
        onSearch(true);
        const { data } = await axios.get(`/${name}?order_by=${filter}&order=${order}`);
        if (data) {
            if (data.status === "success") {
                setRestaurants(data.result);
            } else
                setStatus(data.status);
            setSearchResults(true)
            onSearch(false);
        }
    }

    return (
        <div style={{ marginTop: ".5rem" }} className="container mb-4">
            <form action="">
                <div className="row mobi-search">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Restaurant name or location" />
                    </div>
                    <div className="col-2">
                        <select value={filter} onChange={e => setFilter(e.target.value)} className="form-select" >
                            <option disabled >FILTER BY</option>
                            <option value="price_range">Price</option>
                            <option value="average_rating">Rating</option>

                        </select>
                    </div>
                    <div className="col-2">
                        <select value={order} onChange={e => setOrder(e.target.value)} className="form-select" >
                            <option disabled >ORDER BY</option>
                            <option value="asc">LOW-HIG</option>
                            <option value="desc">HIGH-LOW</option>

                        </select>
                    </div>
                    <div className="col">
                        <button type="submit" onClick={handleSubmit} className="btn btn-success">
                            Search
                    </button>

                    </div>
                </div>
            </form>
        </div>
    )
}
