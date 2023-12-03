import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import databinder from '../apis/databinder';
import Upload from '../assets/upload-icon.png'
import { useDispatch } from 'react-redux';

function UpdateRestaurant(props) {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [picture, setPicture] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [responseStatus, setResponseStatus] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await databinder.get(`/restaurants/${id}`);
                setName(data.data.restaurant.name);
                setLocation(data.data.restaurant.street);
                setCity(data.data.restaurant.city);
                setAbout(data.data.restaurant.description);
                setEmail(data.data.restaurant.email_address);
                setPhone(data.data.restaurant.telephone);
                setWebsite(data.data.restaurant.website);
                setPrice(data.data.restaurant.price_range);
                const type = data.data.restaurant.mimetype;
                const buffer = data.data.restaurant.pic && Buffer.from(data.data.restaurant.pic).toString("base64");
                data.data.restaurant.pic && setPicture(`data:${type};base64, ${buffer}`);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('image', picture);
        form.append('data',
            JSON.stringify({ phone, website, name, location, price, about, user:"aizy", email, city }))
        const updateResponse = await databinder.put(`/restaurants/${id}`, form);
        // console.log("Update Response", updateResponse)
        setResponseStatus(updateResponse.data.status);

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
                            <button type='submit' onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
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
