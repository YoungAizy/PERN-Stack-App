import React from 'react';

export default function DashboardNav(){

    return(
        <div className='d-flex justify-content-evenly align-items-center mt-2 mb-4'>
            <h2> My Restaurants</h2>
            <button className='btn btn-outline-primary rounded-circle'><i className='fa fa-plus'></i></button>
        </div>
    )
}