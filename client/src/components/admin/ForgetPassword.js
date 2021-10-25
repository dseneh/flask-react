import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {isLoggedIn as authenticate, ProfileData} from "../../store/atom";
import {Fade} from "react-reveal";

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [data, setData] = useState({email: '', code: ''})
    const [code, setCode] = useState('')
    const [verify, setVerify] = useState(false)
    const [errors, setErrors] = useState({email: false, code: false})
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState(
        {err: false, text: "Enter the email associated with your account:"})
    const setIsLoggedIn = useSetRecoilState(authenticate)
    const setProfile = useSetRecoilState(ProfileData)

    const history = useHistory()


    const handleSubmitEmail = async () => {
        if (!email) {
            setErrors({email: true})
        } else {
            setLoading(true)
            setText({err: false, text: "Please wait..."})
            await axios.post(`${process.env.REACT_APP_API}/api/auth/recover_password`, {'email': email})
                .then(() => {
                    setLoading(false)
                    setVerify(true)
                    setText({err: false, text: "Enter the verification code that was sent to your email:"})
                })
                .catch(e => {
                    setErrors({email: true})
                    if (e.response) {
                        setText({err: true, text: e.response.data.msg})
                    } else {
                        setText({err: true, text: "Internal server error."})
                    }
                    setLoading(false)
                    setVerify(false)

                    setLoading(false)
                })
        }

    }

    const handleSubmitVerify = async () => {
        if (!code) {
            setErrors({code: true})
        } else {
            setLoading(true)
            setText({err: false, text: "Please wait..."})
            await axios.post(`${process.env.REACT_APP_API}/api/auth/verify_code`, {'code': code})
                .then(response => {
                    localStorage.setItem("TKID", response.data.token)
                    localStorage.setItem("_id", response.data.id)
                    setIsLoggedIn(true)
                    axios.get(`${process.env.REACT_APP_API}/api/profilelist`)
                        .then(res => {
                            setProfile(res.data)
                        })
                    setLoading(false)
                    history.push('/build')
                })
                .catch(e => {
                    console.log(e.response.data)
                    setErrors({code: true})
                    if (e.response) {
                        setText({err: true, text: e.response.data.msg})
                    } else {
                        setText({err: true, text: "Internal server error."})
                    }
                    setLoading(false)
                })
        }
    }

    const VerifyCode = (
        <Fade>
            <Form className='mb-4' onSubmit={handleSubmitVerify} loading={loading}>
                <p className={`${text.err && 'text-danger text-center'}`}>{text.text}</p>
                <Form.Input
                    icon='code'
                    name="code"
                    error={errors.code}
                    iconPosition='left'
                    placeholder='Enter the verification code'
                    size={"large"}
                    value={code}
                    onChange={(e, {value}) => setCode(value)}
                />
                <Button fluid color='blue' size={"large"}>Submit</Button>
            </Form>
        </Fade>
    )


    const EmailForm = (
        <Fade>
            <Form className='mb-4' onSubmit={handleSubmitEmail} loading={loading}>
                <p className={`${text.err && 'text-danger text-center'}`}>{text.text}</p>
                <Form.Input
                    icon='envelope'
                    name="email"
                    type="email"
                    error={errors.email}
                    iconPosition='left'
                    placeholder='Email'
                    size={"large"}
                    value={email}
                    onChange={(e, {value}) => setEmail(value)}
                />
                <Button fluid color='blue' size={"large"}>Submit</Button>
            </Form>
        </Fade>
    )


    return (
        <div>
            {verify ? (
                VerifyCode
            ) : (
                EmailForm
            )}
        </div>
    );
};

export default ForgetPassword;