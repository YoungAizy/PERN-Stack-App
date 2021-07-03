import React from 'react';
import { useHistory } from 'react-router-dom';
import UpdateRestaurant from '../components/UpdateRestaurant';
import { LoginHeader } from '../routes/SignIn';

const UpdatePage = () => {
    const history = useHistory()
    return (
        <div>
            <LoginHeader history={history} LoggedIn={ true}/>
            <h1 style={{ textAlign: "center", margin:"1rem 0 1.4rem" }}>Update Restaurant</h1>
            <UpdateRestaurant />
        </div>
    )
}

export default UpdatePage;