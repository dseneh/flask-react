import React from 'react';
import "./Pages.css"
import {Button, Divider, Icon} from "semantic-ui-react";
import {useRecoilValue} from "recoil";
import {ProfileData} from "../../store/atom";
import {Fade} from "react-reveal";

const DeactivatePage = () => {
    const profile = useRecoilValue(ProfileData);
    return (
        <Fade>
            <div className="container deactivate-page text-center">
                <div className="deactivate-text">
                    <strong>Sorry!</strong> My account is temporarily unavailable. Please try again later.
                </div>
                {profile.profile.email && (
                    <>
                        <Divider horizontal>Please</Divider>
                            <a className="text-primary" href={`mailto:${profile.profile.email}`}>
                        <Button className="mt-3" icon="envelope" default
                        ><Icon name="envelope"/>
                                Email Me
                        </Button>
                            </a>
                    </>
                )}
            </div>
        </Fade>
    );
};

export default DeactivatePage;