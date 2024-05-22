import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Upload from '../assets/upload-icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { _protected as restaurantApi } from '../apis/restaurants';
import { storeEditingListing } from '../store/actions/restaurantActions';

function UpdateRestaurant(props) {
    let { id } = useParams();
    const listing = useSelector(state => state.restaurants.SingleListing);
    const dispatch = useDispatch();
    
    const [name, setName] = useState(listing?.name);
    const [location, setLocation] = useState(listing["str_sub"]);
    const [price, setPrice] = useState(listing?.price_range);
    const [city, setCity] = useState(listing?.city);
    const [picture, setPicture] = useState({img:listing?.img_url,file:{mimetype:null,image:null}});
    const [about, setAbout] = useState(listing?.description);
    const [email, setEmail] = useState(listing?.email_addr);
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState(listing?.web_addr);
    const [schema, setSchema] = useState({});
    const[updateImgBtn, showUpdateImgBtn] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [responseStatus, setResponseStatus] = useState("");

    const populateData = ()=>{
        setName(listing.name);
        setLocation(listing["str_sub"]);
        setPrice(listing.price_range);
        setCity(listing.city);
        setPicture(state=>{
            return {
                ...state,
                img: listing.img_url}
        });
        setAbout(listing.description);
        setEmail(listing.email_addr);
        setWebsite(listing.web_addr);
    }

    useEffect(populateData,[listing]);

    useQuery('update_restaurant', async()=>{
        console.log("steff");
        if(listing.name) return;
        console.log("sick")

        try {
            const {data} = await restaurantApi.fetchListing(id);
            console.log("updated restaurants",data);
            dispatch(storeEditingListing({data: data.getListing}));
        } catch (error) {
            console.log("An error occured:", error);
        }
 
    }, {cacheTime:"Infinity"});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try{
            const {data}= await restaurantApi.update(id,schema);
            console.log("Update Response", data);
            data.updateRestaurant && setResponseStatus("Update Successful");
            setIsUpdating(false);
        }catch(error){
            console.log("Update Error:", error);
            setResponseStatus("Update Failed");
            setIsUpdating(false);
        }
    }

    const uploadImg = async(e)=>{
        e.preventDefault();
        setIsUploading(true);
        try {
            const {data} = await restaurantApi.updateImg(id,JSON.stringify(listing.img_id), JSON.stringify(picture.file));
            console.log("Image update result", data);
            setIsUploading(false);
            data.updateImage.img_url && showUpdateImgBtn(false);
        } catch (error) {
            console.log("Error updating image:",error);
            setIsUploading(false);
        }
        
    }

    const getPictureData = (target) => {
        const file = target.files[0];
        file && showUpdateImgBtn(true);
      
        const img = document.getElementById("input-img");
        const reader = new FileReader();
        reader.onload = (e) => {
            setPicture(state=>{
                return {
                    ...state,
                    file:{
                        image: e.target.result, mimetype: file.type
                    }
                }
            });
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    const onInputChange = (state, value)=>{
        if(listing[state] !== value) setSchema(prevState=>({...prevState, [state]: value}));
        if(listing[state] === value && schema[state]) setSchema(prevState=>{
            const copyState = prevState;
            delete copyState[state]
            return copyState;
        });
    }

    return (
        <div>
            <div className="container">
                <form action="" className="mb-3">
                    <div className="form-group row mb-4">
                        <div className='col'>
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-control" value={name || ""} onChange={e =>{onInputChange("name", name); setName(e.target.value.toLowerCase())}} type="text" />
                        </div>
                        <div className="col">
                            <label htmlFor="streetLocation">Street and Suburb</label>
                            <input id="streetLocation" value={location || ""} onChange={e =>{onInputChange("str_sub", location); setLocation(e.target.value.toLowerCase())}} type="text" className="form-control" placeholder="Street name and surburb" />
                        </div>
                        <div className="col">
                            <label htmlFor="cityLocation">City</label>
                            <input id="cityLocation" value={city || ""} onChange={e =>{onInputChange("city", city); setCity(e.target.value.toLowerCase())}} type="text" className="form-control" placeholder="City" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-7">
                            <textarea style={{ marginTop: '.7rem' }} className="form-control" placeholder="Write about you restaurant..." rows="4"
                                value={about || ""} onChange={e =>{onInputChange("description", about); setAbout(e.target.value)}}></textarea>
                        </div>
                        <div style={{ paddingLeft: "0" }} className="col-4 mb-3">
                            <input className="form-control" type="file" id="formImg" accept="image/*"
                                onChange={e => getPictureData(e.target)} style={{ display: 'none' }} />
                            <label htmlFor="formImg">
                                <img id="input-img" style={{ width: "160px", cursor: 'pointer', marginLeft: "2rem" }} src={picture.img ? picture.img : Upload} alt='' />
                            </label>
                            {updateImgBtn && <button className='btn bg-primary ms-5' type="submit" onClick={uploadImg} disabled={isUploading}>Upload</button>}
                        </div>

                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input value={email || ""} onChange={e =>{onInputChange("email_addr",email); setEmail(e.target.value)}} type="email" className="form-control" placeholder="E-Mail" />
                        </div>
                        <div className="col">
                            <input value={phone || ""} onChange={e =>{onInputChange("telephone",phone); setPhone(e.target.value)}} type="tel" className="form-control" placeholder="Contact Number" />
                        </div>
                        <div className="col">
                            <input value={website || ""} onChange={e =>{onInputChange("web_addr",website); setWebsite(e.target.value)}} type="url" className="form-control" placeholder="Website" />
                        </div>

                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <label htmlFor="price">Price Range (max is 5)</label>
                            <input value={price || ""} onChange={e => setPrice(e.target.value)} id="price" className="form-control" type="number" min={1} max={5} />
                        </div>
                        <div className='col mt-4'>
                            <button type='submit' onClick={(e) => handleSubmit(e)} className="btn bg-primary" disabled={isUpdating}>Submit</button>
                        </div>
                    </div>
                </form>
                {responseStatus && <div>
                    {responseStatus === 'Successful' ? <h4 className="text-success">Successfuly Updated!</h4> :
                        <h4 className="text-danger">{responseStatus === 'Incomplete' ? "Failed to Upload Image" : "Failed to Update Restaurant"}</h4>}
                </div>}
            </div>
        </div>
    )
}

export default UpdateRestaurant
