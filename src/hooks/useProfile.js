import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../store/actions/userActions";
import { saveProfileDetails } from "../store/actions/profileActions";
import profileApi from "../apis/profile";


const useProfile = ()=>{
    const User = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const setSessionVars = (fullName, username)=>{
        !User.fullName && sessionStorage.setItem("name",fullName);
        !sessionStorage.getItem("username") && sessionStorage.setItem("username", username);
    }

     async function checkProfile(){
        console.log("fetching...")
        if(User.email) return;
            //we want to fetch profile details from server
            try {
                const {data} = await profileApi.fetch();
                console.log("Fetch Profile results", data);
                setSessionVars(data.user.firstname+" "+data.surname, data.profile.username);
                dispatch(saveProfileDetails({data:data.profile}));
                dispatch(saveUser({data:data.user}));
            } catch (error) {
                console.log("Fetch Error:",error.message);
            }
    }

    const check = useQuery("fetchProfile", checkProfile, {cacheTime:"Infinity"});
    return check;
}
export default useProfile;