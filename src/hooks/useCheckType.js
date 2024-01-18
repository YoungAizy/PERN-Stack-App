import { useHistory } from "react-router-dom/cjs/react-router-dom";
import userTypes from "../utils/UserTypes";

const useCheckType = ()=>{
    const history = useHistory();

    function push(userType){
        switch (userType) {
            case userTypes.reviewer:
                //window.location.pathname = "/manage";
                history.push('/home/notifications')
                break;
        
            case userTypes.lister:
                history.push('/dashboard/manage');
                break;
            default:
                history.push("/signin");
                break;
        }
    }

    return push;
}

export default useCheckType;