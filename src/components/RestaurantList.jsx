import React, {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import RenderRating from './RestaurantCard';
import DeleteModal from './DeleteModal';


const RestaurantList = (props) => {
    // const token = JSON.parse(localStorage.getItem("token"))


    const [content, setContent] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [toDelete, setToDelete] = useState();
    const [toDeleteId, setToDeleteId] = useState()
    let history = useHistory();


  

    const handleDelete = async (id) => {
        // console.log('handle delete entered', id)
        setOpenModal(false);
        // setMyRestaurants(content.filter(x => x.id !== id))
    }

    const showDeleteModal = (e, id, name) => {
        e.stopPropagation();
        // console.log("showDelete", id)
        setToDeleteId(id);
        setToDelete(name)
        setOpenModal(true);

    }

    const handleUpate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    if (content.length < 1) {
        return (

            <div>
                <h5 style={{ textAlign: "center" }}>
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

                                <tr style={{ cursor: "pointer" }} onClick={() => history.push(`/restaurants/${x.id}`)} key={x.id}>
                                    <td>{x.name}</td>
                                    <td>{location}</td>
                                    <td>{"$".repeat(x.price_range)}</td>
                                    <td><RenderRating total_reviews={x.total_reviews} avg_rating={x.avg_rating} /></td>
                                    {!props.myRestaurants ? <td>{x.created_by}</td> : <><td><button onClick={(e) => handleUpate(e, x.id)} className="btn btn-warning">Update</button></td>
                                        <td><button onClick={(e) => showDeleteModal(e, x.id, x.name)} className="btn btn-danger">Delete</button></td></>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <DeleteModal openModal={openModal} setOpenModal={setOpenModal} onDelete={handleDelete} isRestaurant={true} id={toDeleteId} restaurant={toDelete} />

        </React.Fragment>
    )
}

export default RestaurantList;