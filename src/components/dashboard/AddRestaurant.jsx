import React, { useState } from 'react';
import UploadNotification from '../UploadNotification'
import { useDispatch } from 'react-redux';
import { _protected as restaurantApi } from '../../apis/restaurants';
import { restaurantSchema } from '../../utils/requestObjects';
import { addToUserListings} from '../../store/actions/restaurantActions';

const AddRestaurant = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("Price Range");
    const [about, setAbout] = useState("");
    const [picture, setPicture] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [website, setWebsite] = useState("");
    const [city, setCity] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = document.getElementById('popup-notification');
        const form = new FormData()
        if (name && location && city && price) {
            setInvalid(false);
            form.append('image', picture);
            form.append('data',
                JSON.stringify(restaurantSchema(name, location, price, about, "aizy", null, null, null, null, city)));

            const {data}=  await restaurantApi.post(form);
            console.log("BACK",data);

            
            if (data.data) {
            dispatch(addToUserListings({data: data.data}))
            setAbout("");
            setPhone("");
            setName("")
            setLocation("")
            setPrice("Price Range");
            setWebsite("")
            setCity("")
            setEmail("")
                if (data.successful)
                    setIsSuccessful(true);
                else
                    setIsSuccessful(false);
                    notification.classList.add("show-notification");

                // After 3 seconds, remove the show class from DIV
                setTimeout(() => notification.classList.remove("show-notification"), 3000);
            }
        } else
            setInvalid(true)
    }

    const getPictureData = (target) => {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setPicture(file);
        reader.readAsDataURL(file);
    }

    return (
        <React.Fragment>
            <div className="container mb-4">
                <div className="add-form">
                    <form action="" style={{ margin: ".6rem" }} >
                        <div className="row mb-3">
                            <div className="col">
                                <input value={name} onChange={e => setName(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="Name" maxLength="80" />
                                {!name && <div className="text-danger">
                                    Required!
                            </div>}
                            </div>
                            <div className="col">
                                <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Street name and surburb" maxLength="100" />
                                {!location && <div className="text-danger">
                                    Required!
                            </div>}
                            </div>
                            <div className="col">
                                <input value={city} onChange={e => setCity(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="City" />
                                {!city && <div className="text-danger">
                                    Required!
                            </div>}
                            </div>
                            <div className="col-2">
                                <select value={price} className="form-select my-1" onChange={e => setPrice(parseInt(e.target.value))} >
                                    <option disabled >Price Range</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                {price === "Price Range" ? <div className="text-danger">
                                    Required!
                            </div> : <></>}
                            </div>

                        </div>
                        <div className="row mb-2">
                            <div className="col-7">
                                <textarea className="form-control" placeholder="Write about you restaurant..." rows="2"
                                    value={about} onChange={e => setAbout(e.target.value)}></textarea>
                            </div>
                            <div style={{ paddingLeft: "0" }} className="col-4 mb-3">
                                <label htmlFor="formFile">Choose a shop image</label>
                                <input className="form-control" type="file" id="formFile" accept="image/*"
                                    onChange={e => getPictureData(e.target)} />
                            </div>

                        </div>
                        <div className="row">
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
                        <div style={{ height: "fit-content" }} className="d-grid gap-2 col-3 mx-auto mt-4">
                            
                            <button id='add-btn' className="btn bg-primary" style={{ color:"white" }} type="submit" onClick={handleSubmit} >
                                Add
                            </button>
                        </div>
                    </form>
                    {invalid && <div >
                        <h4 >Fill all required fields!</h4>
                    </div>}
                </div>
            </div>
            <UploadNotification isSuccessful={isSuccessful} />
        </React.Fragment>
    )
}

export default AddRestaurant;