import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {isLoggedIn, ProfileData} from "../../store/atom";
import {useRecoilState, useRecoilValue} from "recoil";
import "./admin.css"
import DashboardCard from "./DashboardCard";
import {Button, Icon, Loader} from "semantic-ui-react";
import {Helmet} from "react-helmet";

const UserList = lazy(() => import("./app/UserList"));
const WorkList = lazy(() => import("./app/WorkList"));
const ContactList = lazy(() => import("./app/ContactList"))
const SkillList = lazy(() => import("./app/SkillList"))
const Profile = lazy(() => import("./app/Profile"))
const EducationList = lazy(() => import("./app/EducationList"))

const Dashboard = () => {
    <Helmet>
        <title>MyProfile | Dashboard</title>
    </Helmet>
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn)
    const [component, setComponent] = useState('Dashboard')
    const profile = useRecoilValue(ProfileData);

    useEffect(() => {
        const token = localStorage.getItem('TKID')
        if (token) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    });

    if (!loggedIn) {
        return <Redirect to="/"/>
    }

    const DashBoard = () => {
        return (
            <>
                <DashboardCard
                    title="My Profile"
                    onClick={() => setComponent('Profile')}
                    desc="Edit information about profile"
                />
                <DashboardCard
                    title="Work" onClick={() => setComponent('Work')}
                    desc="List of your jobs"
                />
                <DashboardCard
                    title="Education" onClick={() => setComponent('Education')}
                    desc="List of your schools, training, etc."
                />
                <DashboardCard
                    title="Skills" onClick={() => setComponent('Skills')}
                    desc="List of all your skills"
                />
                <DashboardCard
                    title="Contact" onClick={() => setComponent('Contact')}
                    desc="List of all your contacts"
                />
                <DashboardCard
                    title="Users" onClick={() => setComponent('Users')}
                    desc="List of all users"
                />
            </>)

    }
    const StateComponent = (props) => {
        let Output;
        switch (props.type) {
            case 'Dashboard':
                Output = (<DashBoard {...props}/>);
                break;
            case 'Users':
                Output = (<UserList {...props} />)
                break;
            case 'Work':
                Output = (<WorkList {...props} />)
                break;
            case 'Education':
                Output = (<EducationList {...props} />)
                break;
            case 'Contact':
                Output = (<ContactList {...props} />)
                break;
            case 'Skills':
                Output = (<SkillList {...props} />)
                break;
            case 'Profile':
                Output = (<Profile {...props} />)
                break;
            default:
                Output = (null);
                break;
        }
        return Output;
    }
    return (
        <div className="dashboard-content container pt-4">
            <div className="pb-3 text-right">
                {/*<Button icon="eye" color="black" content="View Page" size="mini"*/}
                {/*        onClick={() => {*/}
                {/*            const win = window.open("/", '_blank')*/}
                {/*            win.focus()*/}
                {/*        }}*/}
                {/*/>*/}
                <a className="font-weight-normal mr-3 text-primary" href="/" target="_blank">
                    View Page {' '}
                    <Icon name="external alternate" />
                </a>
                <Button icon="lock" content="Logout" color="red" size="mini"
                        onClick={() => {
                            setLoggedIn(false)
                            localStorage.removeItem('TKID')
                            localStorage.removeItem('_id')
                        }}
                />
            </div>
            <div className="card bg-transparent border-0 ">
                <div className={`card-header bg-white ${profile.profile.active ? 'border-success' : 'border-danger'}`}>
                    <div className="row">
                        <div className="col-xs-3">
                            {component !== 'Dashboard' && (
                                <Button icon inverted color="blue"
                                        onClick={() => setComponent('Dashboard')}
                                        className="float-left mt-2 mx-3"
                                >
                                    <Icon name='arrow circle left'/>
                                    Back

                                </Button>
                            )}
                        </div>
                        <div className="col">
                            <div className="col">
                                <h2 className='py-2 text-left'>{component}</h2>
                            </div>
                        </div>
                        {!profile.profile.active && (
                            <div className="col text-right pt-2 text-danger">
                                <p>Account is :
                                    <strong> disabled!</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-body dashboard-body">
                    <Suspense fallback={
                        // <Loader active/>
                        <div className="text-left spinner-grow" style={{width: '3rem', height: '3rem'}} >
                            <span className="sr-only">Loading...</span>
                        </div>
                        }>
                        {/*<Fade top>*/}
                        <StateComponent type={component}/>

                        {/*</Fade>*/}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;