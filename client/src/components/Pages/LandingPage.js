import React from 'react';
import Work from "./Work";
import Education from "./Education";
import Profile from "./Profile";
import Skills from "./Skills";
import Contact from "./Contact";
import "./Pages.css"
import {Button, Icon, Loader} from "semantic-ui-react";
import {loader, loadError, ProfileData} from "../../store/atom";
import {useRecoilValue} from "recoil"
import {Helmet} from "react-helmet";
import DeactivatePage from "./DeactivatePage";
import SendEmail from "../admin/app/SendEmail";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import {Fade} from "react-reveal";

const LandingPage = () => {
    <Helmet>
        <title>MyProfile</title>
    </Helmet>


    const data = useRecoilValue(ProfileData)
    const error = useRecoilValue(loadError)
    const isLoading = useRecoilValue(loader)
    const [sendEmail, setSendEmail] = React.useState(false)


    const handleSendEmail = () => {
        setSendEmail(!sendEmail)
    }

    if (error) {
        return <ErrorPage/>
        // return <Redirect to="/login" />
    }
    return (
        <div className="mb-5">
            {isLoading ? (
                <div style={{minHeight: 300}}>
                    <Loader active size="massive">Loading...</Loader>
                </div>
            ) : (
                <>
                    <div className="page-sections">
                        {(data.profile && !data.profile.active) ? (
                            <Fade>
                                <DeactivatePage/>
                            </Fade>
                        ) : (
                            <>
                                <section className="pageSection bg-light" id="about">
                                    <Fade>
                                        <Profile/>
                                    </Fade>
                                </section>
                                <section className="pageSection " id="experience">
                                    <div className="container pt-5 ">
                                        <div className="section-title display-4 mb-1 text-left">Work Experience</div>
                                        {/*<Work/>*/}
                                        {data.work_count >= 1 ? (
                                                <Work/>
                                        ) : (
                                            <h4 className="my-4 text-muted">
                                                No work added yet.
                                            </h4>
                                        )}
                                        <hr className="m-0 border-secondary"/>
                                    </div>
                                </section>
                                <section className="pageSection" id="education">
                                    <div className="container pt-5">
                                        <div className="section-title display-4 mb-1 text-left">Education</div>
                                        {data.education_count >= 1 ? (
                                            <Fade>
                                                <Education/>
                                            </Fade>
                                        ) : (
                                            <h4 className="mb-4 text-muted">
                                                No education added yet.
                                            </h4>
                                        )}
                                    </div>
                                </section>

                                <section className="pageSection bg-white" id="skills">
                                    <div className="container pt-5 ">
                                        <div className="section-title display-4 mb-5 text-left">Skills</div>
                                        {data.skillsSet ? (
                                            <Fade>
                                                <Skills/>
                                            </Fade>
                                        ) : (
                                            <h4 className="mb-4 text-muted">
                                                No skill set added.
                                            </h4>
                                        )}
                                    </div>
                                </section>
                                <section className="pageSection pb-5" id="contact">
                                    <div className="container pt-5">
                                        <div className="section-title display-4 mb-5 text-left text-light">Contact Me
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                {data.contact_count >= 1 ? (
                                                    <Fade>
                                                        <Contact/>
                                                    </Fade>
                                                ) : (
                                                    <h4 className="mb-3 text-muted">
                                                        No contact added yet.
                                                    </h4>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="pt-4">
                                                    <Button basic color='yellow' size="massive"
                                                            onClick={handleSendEmail}
                                                    >
                                                        <Icon name='download'/> Get My Resume
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                    <Footer/>
                </>
            )}
            <SendEmail open={sendEmail} handleSendEmail={handleSendEmail}/>
        </div>
    );
};

export default LandingPage;
