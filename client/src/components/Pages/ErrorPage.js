import React from 'react';
import "./Pages.css"
import {Button, Divider, Icon} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import Footer from "./Footer";
import {Fade} from "react-reveal";

const ErrorPage = () => {
    const history = useHistory()

    return (
        <div>
            <Fade>
                <div className="container deactivate-page">
                    <div className="error-text">
                        <Icon name="warning sign" size="massive" style={{fontSize: '2.5em', marginBottom: '7px'}}/>
                        <p>
                            This page received an error.
                            Please <strong ><a href="/" className="text-primary">refresh</a></strong> or try again later.
                        </p>
                        <Divider horizontal>or</Divider>
                        <div className='text-center mt-3 text-muted'>
                            <Button className="ml-2 mt-3" icon="lock" color='red' size="tiny" content="Login"
                                    onClick={() => {
                                        history.push("/login")
                                    }}
                            />
                        </div>
                    </div>
                </div>
            </Fade>
            <Footer/>

        </div>
    );
};

export default ErrorPage;
