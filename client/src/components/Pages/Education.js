import React from 'react';
import "./Pages.css"
import {useRecoilValue} from "recoil";
import {ProfileData} from "../../store/atom";
import HtmlParser from "react-html-parser";
import {Icon} from "semantic-ui-react";

const Education = () => {
    const { education } = useRecoilValue(ProfileData) || []
    return (
        education ? (
        education.map((ed) => (
                <div className="py-4 border-bottom" key={ed._id}>
                    <h4 className="font-weight-bold text-capitalize">{ed.type}: {ed.study}</h4>
                    <h5 className="font-weight-bold text-muted">{ed.institution} - <span className="font-italic font-weight-normal">{ed.location}</span> </h5>
                    <div className="row">
                        {/*<div className="col-md-3 text-left d-inline-flex">*/}
                        {/*    <Icon name="map marker" color="teal"/>*/}
                        {/*    <h6 className="mt-1">{ed.location}</h6>*/}

                        {/*</div>*/}
                        <div className="col-12 d-inline-flex">
                            <Icon name="calendar alternate" color="teal"/>
                            <h6 className="mt-1">{ed.start} - {ed.end}</h6>
                        </div>
                    </div>
                    {ed.desc && (
                        <>
                            {/*<h5 className="mt-4 font-weight-bold text-muted">Description:</h5>*/}
                            <p className="pt-2 p-desc text-left">
                                {HtmlParser(ed.desc)}
                            </p>
                        </>
                    )}
                </div>
        ))
        ) : null
    );
};

export default Education;