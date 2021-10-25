import React, {useState} from 'react';
import {Button, Form, Icon, Modal, Segment} from "semantic-ui-react";
import "./app.css"
import axios from "axios";
import {useRecoilState} from "recoil";
import {ProfileData} from "../../../store/atom";


const Deactivate = (props) => {
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useRecoilState(ProfileData);
    const [success, setSuccess] = useState(false)


    const successMsg = (
        <Segment className="text-center mt-3">
            <Icon name="check circle" color="green" style={{fontSize: "3rem"}} size="large"/>
            <div className="py-4">
                {!profile.profile.active ? (
                    <h5>Your account has been deactivated!</h5>
                ) : (
                    <h5>Your account is now active!</h5>
                )}
                <Button color='red' size={"large"} onClick={props.handleSendEmail}>Close</Button>
            </div>
        </Segment>
    )

    const handleSubmit = async () => {
        const token = localStorage.getItem('TKID')
        if (token) {
            setLoading(true)
            const config = {headers: {'Authorization': `Bearer ${token}`}}
            await axios.put(`${process.env.REACT_APP_API}/api/profile/toggle_status`, config)
                .then(() => {
                    axios.get(`${process.env.REACT_APP_API}/api/profilelist`)
                        .then(res => {
                            setProfile(res.data)
                            setLoading(false)
                            setSuccess(true)
                            // props.handleDeactivate()
                        })
                })
                .catch(e => {
                    console.log(e)
                    setSuccess(false)
                    setLoading(false)
                })
        }
    }

    return (
        <Modal
            closeIcon
            open={props.open}
            onClose={() => {
                props.handleDeactivate()
                setSuccess(false)
            }}
        >
            <Modal.Header>{profile.profile.active ? 'Deactivate' : 'Activate'} Your Account</Modal.Header>
            <Modal.Content className='mb-2'>
                {!success ? (
                    <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>
                        {!profile.profile.active ? (
                            <div>
                                <p>
                                    You can re-activate your profile.
                                    This means that your profile will now be visible to anyone trying to view your page.
                                </p>
                                <div>
                                    <Button className="mt-5" fluid color='green' size="large"
                                    >Activate</Button>
                                    <Button className="mt-2" fluid color='default' size={"large"}
                                            onClick={props.handleDeactivate}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    You can temporarily deactivate your profile.
                                    This means that your profile will NOT be visible to anyone trying to view your page.
                                </p>
                                <div>
                                    <Button className="mt-5" fluid color='red' size={"large"}
                                    >Deactivate</Button>
                                    <Button className="mt-2" fluid color='default' size={"large"}
                                            onClick={props.handleDeactivate}>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </Form>
                ) : (
                    successMsg
                )}
            </Modal.Content>
        </Modal>
    );
};

export default Deactivate;