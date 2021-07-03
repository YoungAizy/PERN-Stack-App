import React, { useContext, useEffect, useState } from 'react'
import userUrl from '../apis/userUrl';
import { RestaurantsContext } from '../Context API/Context';
import DeleteModal from './DeleteModal';

const ProfileModal = ({ profileShown, setProfileShown}) => {
    const { user,setUser } = useContext(RestaurantsContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [openModal, setOpenModal] = useState(false);

    console.log(user);

    useEffect(() => {
        setName(user && user.name);
        setEmail(user && user.email);
     }, [user]);
    
    if (!profileShown)
        return null;

    const Update = async () => {
        const response = await userUrl.put(`/${user.email}`, {
            name, email: user.email, newEmail: email, password, newPassword, type: "update"
        })
        console.log(response)
        if (response.statusText === "OK") {
            setUser(response.data.user && response.data.user);
            localStorage.setItem("token", JSON.stringify(response.data.accessToken && response.data.accessToken));
        }
  
    }

    const onDelete = async() => {
        await userUrl.delete(`/${user.email}`);
        localStorage.removeItem('token');
        localStorage.removeItem("isAuthenticated");
        window.location.pathname = "/";

    }

    return (
        <React.Fragment>
        <div id="profile" style={{width:"100%",zIndex:'5'}} onClick={()=>setProfileShown(false) }>
              <div onClick={e=>e.stopPropagation()} style={{backgroundColor: "coral"}} className="container mb-4 reg profile-content">
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    {/* <button className="btn close-btn" onClick={props.onClose}>Close</button> */}
                </div>
                <h2>Update Account</h2>
                <form action="" method="post">
                    <div >
                        <div className="form-floating form-margin">    
                            <input value={name} type="text" className="form-control" id="username" placeholder="Username" onChange={e=>setName(e.target.value) }/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating form-margin">    
                            <input value={email} type="email" className="form-control" id="eMail" placeholder="name@example.com" onChange={e=>setEmail(e.target.value) }/>
                            <label htmlFor="eMail">Email</label>
                        </div>
                        <div className="form-floating form-margin">
                            <input type="password" className="form-control" id="old_password" placeholder="Old Password" onChange={e=>setPassword(e.target.value)}/>
                            <label htmlFor="old_password">Old Password</label>
                        </div>
                        <div className="form-floating form-margin">
                            <input type="password" className="form-control" id="new_password" placeholder="New Password" onChange={e=>setNewPassword(e.target.value) }/>
                            <label htmlFor="new_password">New Password</label>
                        </div>
                        <button type="button" className="btn btn-secondary form-margin" onClick={Update}>Update</button>
                        <button type="button" className="btn btn-secondary " onClick={()=>setOpenModal(true)}>Delete Account</button>
                        <button type="button" className="btn btn-secondary form-margin" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem("isAuthenticated");
                            window.location.pathname = "/";
                        }}>Logout</button>
                        <div className="form-margin">

                        </div>
                    </div>
                </form>
            </div>
            </div>
            <DeleteModal openModal={openModal} setOpenModal={setOpenModal} onDelete={onDelete} isRestaurant={false} />
            </React.Fragment>
    )
}

export default ProfileModal
