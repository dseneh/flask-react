import React from 'react';
import {Button, Icon} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {useRecoilState} from "recoil";
import {isLoggedIn as logging} from "../../store/atom";

const Footer = () => {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(logging)
    return (
        <div>
            <footer className="footer bg-dark text-center">
                <div className="pt-4">
                    <span>
                    &copy; {new Date().getFullYear()} {' '}
                     •
                    Developed by
                        <a href="https://twitter.com/dseneh" target="_blank" rel="noopener noreferrer"> @dseneh</a>
                    </span>
                    <span className="pl-3 ">
                                {
                                    isLoggedIn ? (
                                        <div className="mt-3 mb-5">
                                            <Button className="mx-1" color='teal' size="tiny"
                                                    onClick={() => history.push("/build")}>
                                                Dashboard
                                            </Button>
                                            <Button className="mx-1" color='red' size="tiny"
                                                    onClick={() => {
                                                        setIsLoggedIn(false)
                                                        localStorage.clear()
                                                    }}>
                                                <Icon name='lock'/> Logout
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button basic color='orange' size="tiny" onClick={() => history.push("/login")}>
                                            <Icon name='lock'/> Login
                                        </Button>
                                    )
                                }
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Footer;