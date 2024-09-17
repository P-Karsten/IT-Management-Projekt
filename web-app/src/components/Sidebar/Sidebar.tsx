import React from "react";
import './sidebar.css';
import RevokeToken from "../../pages/Test";
import { useNavigate } from 'react-router-dom';

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHandHoldingDollar, faHouse, faUpload, faVideo } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {


    //BUGGT
    const navigate = useNavigate();

    //Sidebar selection
    const sidebarItems = document.querySelectorAll('.sidebar .item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(xItem => {
                xItem.classList.remove('active');
            });
            item.classList.add('active');
        })
    })

    const itemUpload = document.querySelector('.upload');
    itemUpload?.addEventListener('click', () => {
        navigate('/Upload');
    });

    const itemDashboard = document.querySelector('.dashboard');
    itemDashboard?.addEventListener('click', () => {
        navigate('/Home');
    });

  return (
    <div className="left-sidebar">
        <div className="logo">
            <FontAwesomeIcon className="main-icon" icon={faVideo} />
            <a href="/">VideoStream</a>
        </div>
        <div className="sidebar">
            <div className="item active dashboard">
                <FontAwesomeIcon className="icon" icon={faHouse} />
                <h3>Dashboard</h3>
            </div>
            <div className="item upload">
                <FontAwesomeIcon className="icon" icon={faUpload} />
                <h3>Upload</h3>
            </div>
            <div className="item">
                <FontAwesomeIcon className="icon" icon={faHandHoldingDollar} />
                <h3>Get Premium</h3>
            </div>
        </div>
        <RevokeToken onClick={() => navigate('/RevokeToken')} />
    </div>
  );
};

export default Sidebar;