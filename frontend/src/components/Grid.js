import React from 'react';

import './Styles.css';

export default function Grid() {

    

    return (
        
        <div>
            <div className="gridRow">
                <div className="gridCol">
                    <i className="fas fa-cloud"></i>
                </div>
                <div className="gridCol">
                    
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-plane"></i>
                </div>
            </div>
            <div className="gridRow">
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-cloud"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-plane"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-cloud"></i>
                </div>
            </div>
            <div className="gridRow">
                <div className="gridCol">
                    <i className="fas fa-plane"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-plane"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
                <div className="gridCol">
                    <i className="fas fa-sun"></i>
                </div>
            </div>
        </div>
    )
}