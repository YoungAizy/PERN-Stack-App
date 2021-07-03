import React from 'react'

const DeleteModal = ({ openModal, setOpenModal,onDelete, isRestaurant, id, restaurant }) => {
    
    if (!openModal) return null;

    const closeModal = () => {
        setOpenModal(false)
    }
    const Delete = (e) => {
         e.preventDefault(); 
         console.log("modal", id)
        isRestaurant ? onDelete(id) : onDelete();
    }
    return (
        <div className='modal'>
            <form className='modal-content'>
                <div className='modal-container'>
                    <h2>Delete {isRestaurant? "Restaurant":"Account"}</h2>
                    <hr/>
                    <p style={{textAlign:"center"}}>Are you sure you want to delete {isRestaurant ? restaurant:'your account'}?</p>
                    <div className='btns-wrapper'>
                        <button className='cancelbtn' onClick={closeModal}>Cancel</button>
                        <button className='deletebtn' onClick={e => Delete(e)}>Delete</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default DeleteModal
