import { useDispatch } from "react-redux";
import profileApi from "../apis/profile";
import useCheckType from "./useCheckType";
import { saveProfileDetails } from "../store/actions/profileActions";
import { saveUser } from "../store/actions/userActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function useFetch(){
    const dispatch = useDispatch();
    const checkUserType = useCheckType();

    const history = useHistory();

    const profile = async(setFetchingProfile, storeUser,  close)=>{
        setFetchingProfile(true);

        try {
            const {data,status} = await profileApi.fetch();
            console.log("DATA", data);
            if(data === "Profile does not exist"){
                setFetchingProfile(false);
                close && close();
                console.log("rerouting...")
                history.push({pathname:'/registration', search: "?page=3"});
                return;
            }
            if(status === 200 && data.profile.user_type){
                console.log("hello", data.profile.user_type)
                dispatch(saveProfileDetails({data:data.profile}));
                dispatch(saveUser({data:data.user}))
                // const tokens ={accessToken: data.accessTokens.AccessToken, refreshToken: data.accessTokens.RefreshToken}
                // dispatch(saveTokens({data: tokens}))
                storeUser(data.profile.img_url,data.profile.username);
                localStorage.setItem("user_type", data.profile.user_type);
                checkUserType(data.profile.user_type);
            }else{
                alert("Unable to process request. Error occured on server");
                setFetchingProfile(false);
            }
        } catch (error) {
            console.log("Something went wrong.", error);
            setFetchingProfile(false);
            alert(error.message);
        }
    }

    return profile;
}