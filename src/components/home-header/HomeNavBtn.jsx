import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveDashboardPage } from '../../store/actions/reviewerDashboardActions';

const HomeNavBtn = ({history})=>{
    const dispatch = useDispatch()

    const homeClick= ()=>{
        dispatch(setActiveDashboardPage(""))
        history.push('/')
    }

    return(
        <nav className="signin bg-primary"><button onClick={homeClick } ><i className="fas fa-home me-1"></i> Home</button></nav> 
    )
}

export default HomeNavBtn