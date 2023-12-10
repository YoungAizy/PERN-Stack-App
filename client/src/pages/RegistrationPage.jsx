import React, {useReducer, useState}from 'react';
import AuthRoutesHeader from '../components/AuthRoutesHeader';
import RegistrationProgress from '../components/registration/RegistrationProgress';
import NewUserForm from '../components/registration/NewUserForm';
import ProfileForm from '../components/registration/ProfileForm';
import VerifyEmail from '../components/registration/VerifyEmail';

const stepState = 
    {
      step1:{
        class: "is-active",
        titleClass: ""
      },
      step2:{
        class: "",
        titleClass: ""
      },
      step3:{
        class: "",
        titleClass: ""
      }
    }

  const reducer = (state,action)=>{
    switch (action.type) {
        case "Active":
            return {...state, [action.step]:{...state[action.step], class: 'is-active'}}
        case "Done":
            return {...state, [action.step]:{...state[action.step], titleClass: 'active'}}
        default:
            return state;
    }
  }

function RegistrationPage() {
    const [height,setHeight] = useState("fit-content");
    const [page,setPage] = useState(1);
    const [state, dispatch] = useReducer(reducer, stepState);
    const  [email, setEmail] = useState() ;

    const getPage = ()=>{
        switch (page) {
            case 1:
                return <NewUserForm onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch} signupEmail={setEmail}/>
            case 2:
                return <VerifyEmail onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch} email={email}/>
            case 3:
                return <ProfileForm onPageChange={setPage} dispatch={dispatch}/>
            default:
                return <NewUserForm onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch}/>
        }
    }

    return (
        <AuthRoutesHeader Heading="Create a new account" authOption="Sign-In" height={height}>
            <RegistrationProgress state={state}/>
            {getPage()}
            
        </AuthRoutesHeader>
    )
}

export default RegistrationPage;