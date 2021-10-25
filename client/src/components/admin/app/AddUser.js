import React, {useState} from 'react';
import {Button, Form, Modal} from "semantic-ui-react";
import "./app.css"
import axios from "axios";
import {Fade} from "react-reveal";

const AddUser = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({email: '', password: '', is_admin: false})
    const [errors, setErrors] = useState({email: false, password: false})
    const [text, setText] = useState({err: false, text: "Enter the user's details"})

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }
    const handleCheckChange = (e, {name, checked}) => {
        setData({...data, [name]: checked})
    }
    const handleSubmit = async () => {
        setErrors({email: false, password: false})
        if (!data.password || !data.email) {
            setErrors({email: true, password: true})
        } else {
            setLoading(true)
            setText({err: false, text: "Please wait..."})
            await axios.post(`${process.env.REACT_APP_API}/api/auth/users`, data)
                .then(response => {
                    setLoading(false)
                    props.handleUpdateUser(data)
                    props.handleAddUser()
                    setText({err: false, text: "Enter the user's details"})
                })
                .catch(e => {
                    setErrors({...errors, password: true, email: true})
                    if (e.response) {
                        setText({err: true, text: e.response.data.msg})
                        console.log(e.response.data)
                    } else {
                        setText({err: true, text: "Internal server error."})
                    }
                    setLoading(false)
                })
        }

    }


    return (
        <Modal
            closeIcon
            open={props.open}
            onClose={() => {
                props.handleAddUser()
                setErrors({email: false, password: false})
                setData({password: null, email: null})
                setText({err: false, text: "Enter user's details"})
            }}
        >
            <Modal.Header>Create New User</Modal.Header>
            <p className={`${text.err && 'text-danger'} font-weight-light text-center status-text pt-4 pb-0`}>{text.text}</p>
            <Modal.Content className='mb-4'>
                <Fade>
                    <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>
                        <Form.Input
                            icon='envelope'
                            name="email"
                            error={errors.email}
                            iconPosition='left'
                            placeholder='Email address'
                            onChange={handleChange}
                            value={data.email}
                        />

                        <Form.Input
                            icon='lock'
                            name="password"
                            error={errors.password}
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            size="large"
                            onChange={handleChange}
                            value={data.password}

                        />
                        <Form.Checkbox
                            name="is_admin"
                            toggle
                            label="Make this user an admin"
                            onChange={handleCheckChange}
                            defaultChecked={data.is_admin}
                        />
                        <Button fluid color='blue' size={"large"}>Login</Button>
                    </Form>
                </Fade>
            </Modal.Content>
        </Modal>
    );
};

export default AddUser;