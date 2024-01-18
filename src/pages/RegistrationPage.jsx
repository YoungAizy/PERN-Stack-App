import React, {useEffect, useReducer, useState}from 'react';
import AuthRoutesHeader from '../components/AuthRoutesHeader';
import RegistrationProgress from '../components/registration/RegistrationProgress';
import NewUserForm from '../components/registration/NewUserForm';
import ProfileForm from '../components/registration/ProfileForm';
import VerifyEmail from '../components/registration/VerifyEmail';
import useQuery from '../hooks/useQuery';

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
    const query = useQuery().get("page");

    useEffect(()=>{
      console.log(parseInt(query))
      if(query === page) return;
      query === '2' && setHeight('100vh');
      setPage(parseInt(query))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query])

    const getPage = ()=>{
      console.log("page",page);
        switch (page) {
            case 1:
              return <NewUserForm setBackgroundHeight={setHeight} dispatch={dispatch} />
            case 2:
              return <VerifyEmail setBackgroundHeight={setHeight} dispatch={dispatch} />
            case 3:
              return <ProfileForm />
            default:
                return <NewUserForm setBackgroundHeight={setHeight} dispatch={dispatch} />
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