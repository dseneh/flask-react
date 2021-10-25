import React from 'react';
import "./Pages.css"
import {Icon} from "semantic-ui-react";
import {useRecoilValue} from "recoil";
import {ProfileData} from "../../store/atom";

const Contact = () => {
    const {contact} = useRecoilValue(ProfileData) || []
    return (
        contact ? (
        contact.map((con) => (
        <div className="pb-3 text-left" key={con._id}>
            <div className="d-inline-flex contact">
                <Icon name={con.type} />
                <a href={`${con.url}`} target="_blank">
                <p className="url">{con.title}</p>
                </a>
            </div>

        </div>
        ))
        ) : null
    );
};

export default Contact;