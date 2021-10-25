import React, {useState} from 'react';
import {Button, Form, Icon} from "semantic-ui-react";
import "./admin.css"
import {Redirect, useHistory} from "react-router-dom";
import {isLoggedIn as authenticate, ProfileData} from "../../store/atom"
import {useRecoilState, useSetRecoilState} from "recoil";
import ForgetPassword from "./ForgetPassword";
import axios from "axios";
import {Helmet} from "react-helmet";
import {Fade} from "react-reveal";

const Login = () => {
    <Helmet>
        <title>MyProfile | Login</title>
    </Helmet>

    const errorDisplay = (e) => {
        setIsLoggedIn(false)
        setLoading(false)
        setErrors({...errors, email: true, password: true})
        if (e.response) {
            console.error(e.response)
            setText({err: true, text: e.response.data.msg})
        } else {
            console.error(e)
            setText({err: true, text: "Internal server error."})
        }
        setLoading(false)

    }

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(authenticate)
    const setProfile = useSetRecoilState(ProfileData)
    const [resetPassword, setResetPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({email: '', password: ''})

    const [errors, setErrors] = useState({email: false, password: false})
    const [text, setText] = useState({err: false, text: "Enter your email and password:"})

    const history = useHistory()
    React.useEffect(() => {
        setLoading(false)
    }, []);

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }
    const handleSubmit = async () => {
        if (!data.email || !data.password) {
            setErrors({email: true, password: true})
        } else {
            setLoading(true)
            setText({err: false, text: "Please wait..."})
            await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, data)
                .then(response => {
                    setProfile(response.data.data)
                    localStorage.setItem("TKID", response.data.token)
                    localStorage.setItem("_id", response.data.userId)
                    setIsLoggedIn(true)
                    setLoading(false)
                    history.push('/build')
                    // const token = response.data.token
                    // if (token) {
                    //     const config = {headers: {'Authorization': `Bearer ${token}`}}
                    //     axios.get(`${process.env.REACT_APP_API}/api/profile_init`, config)
                    //         .then(res => {
                    //             if (res.data.profile) {
                    //                 setProfile(res.data.profile)
                    //                 localStorage.setItem("TKID", response.data.token)
                    //                 localStorage.setItem("_id", response.data.id)
                    //                 setIsLoggedIn(true)
                    //                 setLoading(false)
                    //                 history.push('/build')
                    //             } else {
                    //                 setIsLoggedIn(false)
                    //                 setLoading(false)
                    //                 setErrors({...errors, email: true, password: true})
                    //                 setText({err: true, text: "NO PROFILE error."})
                    //             }
                    //         })
                    //         .catch(e => {
                    //             errorDisplay(e)
                    //         })
                    // }else {
                    //
                    // }
                })
                .catch(e => {
                    errorDisplay(e)

                })
        }

    }

    if (isLoggedIn) {
        return <Redirect to="/build"/>
    }
    const login = (
        <>
            <Fade>
                <p className={`${text.err && 'text-danger'} status-text py-3`}>{text.text}</p>
                <Form className=' mb-4' loading={loading} onSubmit={handleSubmit}>
                    <Form.Input
                        icon='envelope'
                        name="email"
                        error={errors.email}
                        iconPosition='left'
                        placeholder='Email'
                        size={"large"}
                        onChange={handleChange}
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
                    />
                    <Button fluid color='blue' size={"large"}>Login</Button>
                </Form>
            </Fade>
        </>
    )
    const reset = (
        <>

            <ForgetPassword/>

        </>
    )
    return (
        <div className="login-main container ">
            <div className="card border-white shadow">
                <div className="card-header bg-transparent">
                    <h2 className='py-3'>{resetPassword ? "Password Reset" : "Login"}</h2>
                </div>
                <div className="card-body">
                    {resetPassword ? reset : login}
                </div>
                <div className="password-text card-footer bg-transparent">
                    <div className="row">

                        <div className="col">
                            {resetPassword &&
                            <>
                                <Icon name={"arrow circle left"}/>
                                <a className='footer-action my-5 text-capitalize'
                                   onClick={() => setResetPassword(false)}>
                                    Back to login
                                </a>
                            </>
                            }
                        </div>
                        <div className="col">
                            {!resetPassword &&
                            <a className='footer-action align-right my-5 '
                               onClick={() => setResetPassword(true)}>
                                Forgot Password
                            </a>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Button primary content='Back to Profile Page' size="large" fluid
                        onClick={() => history.push("/")}
                />
            </div>
        </div>
    );
};

export default Login;