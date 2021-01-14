import React from 'react';
import '../style/HomePage.css';
import userImage2 from '../images/user-avatar.png';

function AMHome() {
    return (
        <>
            <div className='centered'>
                <h1>Welcome Academic Member</h1>
                <p>This is where all your actions reside. Please navigate to the sidebar by clicking on the menu-bars icon at the top left to start.</p>
            </div>
            <div className="card">
                <img src={userImage2} alt="User" />
                <div className="card-body">
                    <h4 className="card-title">John Doe</h4>
                    <p className="card-text">Some example text.</p>
                </div>
            </div>
        </>
    )
}

export default AMHome