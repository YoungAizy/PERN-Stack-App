import React, {useState} from 'react';
import DefaultImage from '../../assets/default.jpg';
import {usePopper} from 'react-popper';
import DeleteModal from '../DeleteModal';
import { _protected as restaurantsApi } from '../../apis/restaurants';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteUserListing, storeEditingListing } from '../../store/actions/restaurantActions';

const RestaurantCard = ({listing})=>{
    const [openModal, setOpenModal] = useState(false);
    const [toDelete, setToDelete] = useState("KFC");
    
    const history = useHistory()

    const dispatch = useDispatch()

    function triggerPopup(e){
        e.preventDefault();
        
    }

    const updateListing = ()=> {
        dispatch(storeEditingListing({data:listing}));
        history.push(`/listing/${listing.id}/update`);
    }

    const showModal = ()=>{
        setToDelete(listing.name);
        setOpenModal(true);
    }

    const handleDelete = async ()=>{
        try {
            const result = await restaurantsApi.delete(listing.id);
            console.log("deleted",result);
            setOpenModal(false);
            dispatch(deleteUserListing({id: listing.id}));   
        } catch (error) {
            console.log("DELETE ERROR:", error);
        }
    }

    return(
        <>
            <div className="col-3 mb-4 d-flex flex-column position-relative">
                <div className="card border border-primary rounded-3" style={{height:360}} onClick={triggerPopup}>
                    <div className="" style={{borderRadius:"8px 8px 0 0", height: "50%"}}>
                        <img style={{ width: "100%",borderRadius:"8px 8px 0 0", height:"100%", objectFit: "cover" }} src={listing.img_url || DefaultImage} alt="molo" />
                    </div>
                    <div className="">
                        <div className="card-body">
                            <h4 className="card-title" >{listing.name}</h4>       
                            <p className="card-text"> {listing["str/sub"]} </p>
                            <p >Price Range: {"$".repeat(listing.price_range)}</p>
                            {/* <p className="card-text"><RenderRating restaurant={restaurant} /> </p> */}
                        </div>
                    </div>
                </div>
                <Tooltip onDelete={showModal} onUpdate={updateListing} />
            </div>
            <DeleteModal openModal={openModal} setOpenModal={setOpenModal} onDelete={handleDelete} isRestaurant={true} restaurant={toDelete} />

        </>
    )
}

const Tooltip = ({onUpdate, onDelete})=>{
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [showTooltip,setShowTooltip] = useState(true)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {placemenet:"right" });

    const toggleTooltip = (e)=>{
        e.stopPropagation();
        
        if (showTooltip) {
            popperElement.setAttribute("data-show", true);
        } else {
            popperElement.removeAttribute('data-show');
        }
        setShowTooltip(!showTooltip);
    }

    return(
        <>
            <button ref={setReferenceElement} type='button' onClick={toggleTooltip}
                className="btn position-absolute z-1 top-0 end-0 me-2" 
                style={{padding:"6px 8px", backgroundColor:"coral"}}>
                    <i className="fas fa-ellipsis-h"></i>
            </button>
            <div ref={setPopperElement} className='d-flex flex-column p-2 hidden' style={styles.popper} {...attributes.popper}>
                <button type='button' className='btn rounded-circle text-bg-primary' onClick={onUpdate} ><i className="fas fa-pen"></i></button>
                <button type='button' className='btn rounded-circle mt-2' onClick={onDelete} style={{backgroundColor:"red", color:"ghostwhite"}}><i style={{ borderRadius:"100%"}} className="fas fa-times fa-lg"></i></button>
            </div>
        </>
    )
}
export default RestaurantCard;