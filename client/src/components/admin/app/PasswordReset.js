import React, {useState} from 'react';
import {Button, Form, Modal} from "semantic-ui-react";
import "./app.css"
import axios from "axios";

const PasswordReset = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({password2: '', password: ''})
    const [errors, setErrors] = useState({password: false, password2: false})
    const [text, setText] = useState({err: false, text: "Change password"})


    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }
    const handleSubmit = async () => {
        const token = localStorage.getItem('TKID')
        setErrors({password2: false, password: false})
        if (!data.password || !data.password2) {
            setErrors({password: true, password2: true})

        } else if (data.password !== data.password2) {
            setErrors({password: true, password2: true})
            setText({err: true, text: "Passwords do not match."})
        } else {
            setLoading(true)
            setText({err: false, text: "Please wait..."})
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }
            await axios.put(`${process.env.REACT_APP_API}/api/auth/user/${props.id}/change_password`, data, config)
                .then(() => {
                    setLoading(false)
                    props.handleShowPasswordReset()
                    setText({err: false, text: "Change password"})
                })
                .catch(e => {
                    setLoading(false)
                    setErrors({password: true, password2: true})
                    if (e.response) {
                        console.log(e.response.data)
                        setText({err: true, text: e.response.data.msg})
                    } else {
                        console.log(e)
                        setText({err: true, text: "There was an error."})
                    }
                })
        }
    }

    return (
        <Modal
            closeIcon
            open={props.open}
            onClose={() => {
                props.handleShowPasswordReset()
                setErrors({password2: false, password: false})
                setData({})
                setText({err: false, text: "Change password"})
            }}
        >
            <Modal.Header>Reset Password</Modal.Header>
            <p className={`${text.err && 'text-danger'} font-weight-light text-center status-text pt-5 pb-0`}>{text.text}</p>

            <Modal.Content className='mb-4'>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>
                    <Form.Input
                        icon='lock'
                        name="password"
                        error={errors.password}
                        iconPosition='left'
                        placeholder='Enter password'
                        type='password'
                        size="large"
                        onChange={handleChange}

                    />

                    <Form.Input
                        icon='lock'
                        name="password2"
                        error={errors.password2}
                        iconPosition='left'
                        placeholder='Confirm password'
                        type='password'
                        size="large"
                        onChange={handleChange}

                    />
                    <Button fluid color='blue' size={"large"}>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
};

export default PasswordReset;