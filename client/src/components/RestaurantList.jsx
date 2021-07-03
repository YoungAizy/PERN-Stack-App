import React, { useContext, useEffect, useState } from 'react';
import { useHistory }  from 'react-router-dom';
import databinder from '../apis/databinder';
import { RestaurantsContext } from '../Context API/Context';
import StarRating from './StarRating';
import DeleteModal from './DeleteModal';
import axios from 'axios'

export const RenderRating = ({restaurant}) => {
        if(!restaurant.count) {
            return (<span className="text-warning"> 0 Reviews</span>)
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating} />
            <span className="text-warning ml-1">({restaurant.count})</span>
        </>
        )
    }

const RestaurantList = (props) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const { restaurants, setRestaurants, setUser, user,myrestaurants, setMyRestaurants } = useContext(RestaurantsContext);
    const [content, setContent] =useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [toDelete, setToDelete] = useState();
    const [toDeleteId, setToDeleteId] = useState()
    let history = useHistory();
    console.log(user)
    useEffect(() => {
        const fetchData = async()=>{
            try {
                console.log(token)
                if (props.myRestaurants) {
                    if (myrestaurants.length>0) {
                        console.log("myrestaunts if")
                        setContent(myrestaurants);
                    } else {
                        console.log("getting myrestaurants")
                        const { data } = await axios.get(`http://localhost:3001/api/v1/myrestaurants`, {
                            headers: {
                                authorization: token
                            }});
                        console.log(data);
                        setMyRestaurants(data.data);
                        setUser({ name: data.user.name, email: data.user.email });
                        setContent(data.data)
                    }
                } else if (restaurants.length>0) {
                    console.log('else if entered')
                    setContent(restaurants)
                }
                else {
                    console.log("else entered")
                    let result = await databinder.get('/');
                    console.log(result.data);
                    setRestaurants(result.data.data.restaurants);
                    setContent(result.data.data.restaurants)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        // eslint-disable-next-line
    },[setRestaurants, myrestaurants])

    const handleDelete = async (id) => {
        console.log('handle delete entered', id)
        setOpenModal(false);
        await databinder.delete(`/${id}`);
        setMyRestaurants(content.filter(x => x.id !== id))
    }

    const showDeleteModal = (e,id,name) => {
        e.stopPropagation();
        console.log("showDelete", id)
        setToDeleteId(id);
        setToDelete(name)
        setOpenModal(true);
        
    }

    const handleUpate = (e,id) => {
        e.stopPropagation();  
        history.push(`/restaurants/${id}/update`)
    }

    if (props.myRestaurants && content.length===0) {
        return (
            
        <div>
            <h5 style={{textAlign:"center"}}>
            YOU HAVEN'T LISTED ANY RESTAURANTS. ADD A NEW ONE NOW.
            </h5>
            </div>
        )
    }
    return (
        <React.Fragment>
        <div className="list-group container">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        {props.myRestaurants ? <><th scope="col">Edit</th><th scope="col">Delete</th></> :
                            <th scope="col">Posted by</th>}
                    </tr>
                </thead>
                <tbody>
                    {content && content.map(x => {
                        const location = x.street + ", " + x.city;
                        return (
                        
                        <tr style={{cursor: "pointer"}} onClick={()=>history.push(`/restaurants/${x.id}`)} key={x.id}>
                            <td>{ x.name}</td>
                            <td>{ location}</td>
                            <td>{ "$".repeat(x.price_range)}</td>
                                <td><RenderRating restaurant={x}/></td>
                        {!props.myRestaurants ? <td>{x.created_by}</td>: <><td><button onClick={(e)=> handleUpate(e,x.id)} className="btn btn-warning">Update</button></td>
                                    <td><button onClick={(e) => showDeleteModal(e,x.id,x.name)} className="btn btn-danger">Delete</button></td></>}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            </div>
            <DeleteModal openModal={openModal} setOpenModal={setOpenModal} onDelete={handleDelete} isRestaurant={true} id={toDeleteId } restaurant={toDelete }/>
            
        </React.Fragment>
    )
}

export default RestaurantList;