import React, { useState } from 'react'
import { useParams } from 'react-router'
import Upload from '../assets/upload-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { _protected as restaurantApi } from '../apis/restaurants';
import { restaurantSchema } from '../utils/requestObjects';
import { storeEditingListing } from '../store/actions/restaurantActions';

function UpdateRestaurant(props) {
    let { id } = useParams();
    const listing = useSelector(state => state.restaurants.SingleListing);
    const dispatch = useDispatch();
    
    const [name, setName] = useState(listing.name);
    const [location, setLocation] = useState(listing["str/sub"]);
    const [price, setPrice] = useState(listing.price_range);
    const [city, setCity] = useState(listing.city);
    const [picture, setPicture] = useState("");
    const [about, setAbout] = useState(listing.description);
    const [email, setEmail] = useState(listing.email_addr);
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState(listing.web_addr);
    const [responseStatus, setResponseStatus] = useState("");

    useQuery('update_restaurant', async()=>{
        if(listing.name) return;

        try {
            const {data} = await restaurantApi.fetchListing(id);
            console.log("updated restaurants",data);
            dispatch(storeEditingListing({data}));
        } catch (error) {
            console.log("An error occured:", error);
        }
 
    }, {cacheTime:"Infinity"});
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const schema = restaurantSchema(name, location, price, about, "aizy", null, null, null, null, city);
        const {data}= await restaurantApi.update(id,schema);
        console.log("Update Response", data);
        dispatch(storeEditingListing({data:data.data}));
        setResponseStatus(data.status);
    }

    const getPictureData = (target) => {
        const file = target.files[0];
        setPicture(file);
        const img = document.getElementById("input-img");
        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <div className="container">
                <form action="" className="mb-3">
                    <div className="form-group row mb-4">
                        <div className='col'>
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-control" value={name} onChange={e => setName(e.target.value.toLowerCase())} type="text" />
                        </div>
                        <div className="col">
                            <label htmlFor="streetLocation">Street and Suburb</label>
                            <input id="streetLocation" value={location} onChange={e => setLocation(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="Street name and surburb" />
                        </div>
                        <div className="col">
                            <label htmlFor="cityLocation">City</label>
                            <input id="cityLocation" value={city} onChange={e => setCity(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="City" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-7">
                            <textarea style={{ marginTop: '.7rem' }} className="form-control" placeholder="Write about you restaurant..." rows="4"
                                value={about || ""} onChange={e => setAbout(e.target.value)}></textarea>
                        </div>
                        <div style={{ paddingLeft: "0" }} className="col-4 mb-3">
                            <input className="form-control" type="file" id="formImg" accept="image/*"
                                onChange={e => getPictureData(e.target)} style={{ display: 'none' }} />
                            <label htmlFor="formImg"><img id="input-img" style={{ width: "180px", cursor: 'pointer', marginLeft: "2rem" }} src={picture ? picture : Upload} alt='' /></label>
                        </div>

                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input value={email || ""} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="E-Mail" />
                        </div>
                        <div className="col">
                            <input value={phone || ""} onChange={e => setPhone(e.target.value)} type="tel" className="form-control" placeholder="Contact Number" />
                        </div>
                        <div className="col">
                            <input value={website || ""} onChange={e => setWebsite(e.target.value)} type="url" className="form-control" placeholder="Website" />
                        </div>

                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label htmlFor="price">Price Range (max is 5)</label>
                            <input value={price} onChange={e => setPrice(e.target.value)} id="price" className="form-control" type="number" />
                        </div>
                        <div className='col mt-4'>
                            <button type='submit' onClick={(e) => handleSubmit(e)} className="btn bg-primary">Submit</button>
                        </div>
                    </div>
                </form>
                {responseStatus && <div>
                    {responseStatus === 'success' ? <h4 className="text-success">Successfuly Updated!</h4> :
                        <h4 className="text-danger">{responseStatus === 'Incomplete' ? "Failed to Upload Image" : "Failed to Update Restaurant"}</h4>}
                </div>}
            </div>
        </div>
    )
}

export default UpdateRestaurant
