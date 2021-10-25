import React from 'react';
import "./Pages.css"
import {Icon} from "semantic-ui-react";
import {ProfileData} from "../../store/atom";
import {useRecoilValue} from "recoil";
import HtmlParser from "react-html-parser";

const Profile = () => {
    const data = useRecoilValue(ProfileData) || {}
    return (
        <div className="container profile-container">
            {data.profile && (
                <>
                    <div className="row pb-3">
                        {(data.profile && data.profile.image) && (
                            <div className="col-4 text-right">
                                <img className="profile-img" src={`${data.profile.image}`}/>
                            </div>
                        )}
                        <div className="col">
                            <div className="title display-4 text-muted text-left pt-3 text-uppercase">
                                {data.profile.first_name}<span
                                className="font-weight-bold "> {data.profile.last_name}</span>
                            </div>
                            <h4 className="font-weight-bold text-left pt-2">{data.profile.occupation}</h4>
                            <div className="text-left">
                                <div>
                                    <Icon name="phone" style={{transform: 'rotate(90deg)'}}/> {data.profile.phone} {' '}
                                </div>
                                <Icon name="envelope"/> {data.profile.email}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="about-text pb-5">
                        {data.profile.about && (
                            <>
                                <div className="title display-4 pt-3 pb-3">
                                    Summary
                                </div>
                                {HtmlParser(data.profile.about)}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;