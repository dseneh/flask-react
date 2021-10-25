import React from 'react';
import "./admin.css"
import {Fade} from "react-reveal";

const DashboardCard = (props) => {
    return (
        <Fade town>
            <div className="card-dashboard card p-3" onClick={props.onClick}>
                <h3>{props.title}</h3>
                <p>{props.desc}</p>
            </div>
        </Fade>
    );
};

export default DashboardCard;