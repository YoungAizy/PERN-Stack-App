import { useHistory } from "react-router-dom/cjs/react-router-dom";

const useCheckType = ()=>{
    const history = useHistory();

    function push(userType){
        switch (userType) {
            case "reviewer":
                //window.location.pathname = "/manage";
                history.push('/home/notifications')
                break;
        
            case "restaurateur":
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