import React, {useState} from 'react';
import {Button, Form, Icon, Modal, Segment} from "semantic-ui-react";
import "./app.css"
import axios from "axios";

const SendEmail = (props) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({email: '', name: '', body: ''})
    const [errors, setErrors] = useState({email: false, name: false, body: false})

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }

    const successMsg = (
        <Segment className="text-center mt-3">
            <Icon name="check circle" color="green" style={{fontSize: "3rem"}} size="large" />
            <div className="py-4">
            <h5>Your message has been sent!</h5>
            <p>I will get back to you the soonest.</p>
            <Button color='red' size={"large"} onClick={() => {
                props.handleSendEmail()
                setSuccess(false)
                setData({})
            }}>Close</Button>
            </div>
        </Segment>
    )

    const handleSubmit = async () => {
        setErrors({email: false, name: false, body: false})
        if (!data.name || !data.email || !data.body) {
            setErrors({email: true, name: true, body: true})
        } else {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            const config = {headers: {'Authorization': `Bearer ${token}`}}
            await axios.post(`${process.env.REACT_APP_API}/api/send_email`, data)
                .then(() => {
                    setLoading(false)
                    setSuccess(true)
                    // props.handleSendEmail()
                })
                .catch(e => {
                    setSuccess(false)
                    setErrors({...errors, name: true, email: true, body: true})
                    setLoading(false)
                      if (e.response) {
                            console.log(e.response.data)
                        }else {
                        console.log(e)
                        }
                })
        }
    }


    return (
        <Modal
            closeIcon
            open={props.open}
            onClose={() => {
                props.handleSendEmail()
                setSuccess(false)
                setErrors({email: false, name: false, body: false})
                setData({name: '', email: '', body: ''})
            }}
        >
            <Modal.Header>{success ? 'Thank you!' : 'Get My Resume'}</Modal.Header>
            {/*<p className='font-weight-light text-center status-text pt-4 pb-0'>Please tell me about you</p>*/}
            <Modal.Content className='mb-4'>
                    {!success ? (
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>

                    <Form.Input
                        lable='Your Name'
                        name="name"
                        error={errors.name}
                        placeholder='Your full name'
                        onChange={handleChange}
                        value={data.name}
                    />
                    <Form.Input
                        lable='Your Email'
                        name="email"
                        error={errors.email}
                        placeholder='Email address'
                        onChange={handleChange}
                        value={data.email}
                    />

                    <Form.TextArea
                        lable='Your message'
                        name="body"
                        error={errors.body}
                        placeholder='Enter your message'
                        onChange={handleChange}
                        value={data.body}
                    />
                    <Button fluid color='blue' size={"large"}>Submit</Button>
                </Form>
                    ) : (
                        successMsg
                    )}
            </Modal.Content>
        </Modal>
    );
};

export default SendEmail;