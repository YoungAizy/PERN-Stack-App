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
    const query = useQuery();

    useEffect(()=>{
      console.log(parseInt(query.get("page")))
      query.get("page") === '2' && setHeight('100vh');
      setPage(parseInt(query.get("page")))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getPage = ()=>{
      console.log("page",page);
        switch (page) {
            case 1:
                return <NewUserForm onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch} />
            case 2:
                return <VerifyEmail onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch} />
            case 3:
                return <ProfileForm />
            default:
                return <NewUserForm onPageChange={setPage} setBackgroundHeight={setHeight} dispatch={dispatch} />
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