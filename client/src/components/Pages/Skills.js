import React from 'react';
import {useRecoilValue} from "recoil";
import {ProfileData} from "../../store/atom";
import HtmlParser from "react-html-parser";

const Skills = () => {
    const data = useRecoilValue(ProfileData) || {}
    return (
        <div className="pb-4">
            <div>
                <p className="text-left">
                    {HtmlParser(data.skillsSet.skills)}
                </p>
            </div>
        </div>
    );
};

export default Skills;