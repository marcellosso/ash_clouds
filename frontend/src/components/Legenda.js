import React from 'react';

import './Styles.css';

export default function Legenda() {
    return (
        <div className="legendaContainer">
            <div className="gridRow legenda">
                <div className="gridCol legenda">
                    <i className="fas fa-sun"></i>
                    <p>Céu Aberto</p>
                </div>
                <div className="gridCol legenda">
                    <i className="fas fa-cloud"></i>
                    <p>Nuvem</p>
                </div>
                <div className="gridCol legenda" style={{ marginRight: 0 }}>
                    <i className="fas fa-plane"></i>
                    <p>Aeroporto</p>
                </div>
            </div>
        </div>
    )
}