import React from 'react';
import "./Pages.css"
import HtmlParser from "react-html-parser";
import {useRecoilValue} from "recoil";
import {ProfileData} from "../../store/atom";
import {Icon} from "semantic-ui-react";

const Work = () => {
    const { work } = useRecoilValue(ProfileData) || []
    return (
        work ? (
            work.map((w) => (
                <div className="py-4 border-bottom" key={w._id}>
                    <h4 className="font-weight-bold">{w.title}</h4>
                    <h5 className="font-weight-bold text-muted">{w.company} - <span
                        className="font-italic font-weight-normal">{w.location}</span></h5>
                    <div className="row">
                        {/*<div className="col-md-3 text-left d-inline-flex">*/}
                        {/*    <Icon name="map marker" color="teal"/>*/}
                        {/*    <h6 className="mt-1">{w.location}</h6>*/}

                        {/*</div>*/}
                        <div className="col d-inline-flex">
                            <Icon name="calendar alternate" color="teal"/>
                            <h6 className="mt-1">{w.start} - {w.end}</h6>
                        </div>
                    </div>
                    <h5 className="mt-4 font-weight-bold text-muted">Description:</h5>
                    {w.desc ? (
                        <p className="p-desc text-left">
                            {HtmlParser(w.desc)}
                        </p>
                    ) : (
                        <p>No work description added.</p>
                    )}
                </div>
            ))
        ) : null
    );
};

export default Work;
