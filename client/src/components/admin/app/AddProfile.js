import React, {useState} from 'react';
import {Button, Form, Popup} from "semantic-ui-react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {ProfileData} from "../../../store/atom";
import {useRecoilValue} from "recoil";
import axios from "axios";
import Deactivate from "./Deactivate";
import {Fade} from "react-reveal";

const AddProfile = (props) => {
    const [loading, setLoading] = useState(false)
    const [deactivate, setDeactivate] = useState(false)
    const profile = useRecoilValue(ProfileData);
    const [data, setData] = useState({
        first_name: '', last_name: '', email: '', linkedin: '',
        image: '', about: ''
    })
    const [errors, setErrors] = useState({first_name: false, last_name: false})

    React.useEffect(() => {
        setData(props.data)
    }, []);

    const handleDeactivate = () => {
        setDeactivate(!deactivate)
    }

    const handleChangeDesc = (e, editor) => {
        const text = editor.getData()
        setData({...data, about: text})
    }


    const handleSubmit = async () => {
        console.log(new Date(data.last_modified.$date).toUTCString())
        if (!data.first_name || !data.last_name) {
            setErrors({first_name: true, last_name: true})

        } else {
            if (!data._id || data._id === 'undefined') {
                setLoading(true)
                const token = localStorage.getItem('TKID')
                if (token) {
                    setLoading(true)
                    const config = {headers: {'Authorization': `Bearer ${token}`}}
                    await axios.post(`${process.env.REACT_APP_API}/api/profile`, data, config)
                        .then(response => {
                            props.handleUpdate(response.data.profile)
                            setLoading(false)
                            props.hide()
                        })
                        .catch(e => {
                            if (e.response) {
                                console.log(e.response.data)
                            } else {
                                console.log(e)
                            }
                            setErrors(true)
                            setLoading(false)
                        })
                }
            } else {
                await handleUpdate()
                props.hide()
            }
        }
        // props.handleReset()
    }

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }

    const handleUpdate = async () => {
        const id = props.data._id
        if (!data.first_name || !data.last_name) {
            setErrors({first_name: true, last_name: true})
        } else {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {headers: {'Authorization': `Bearer ${token}`}}
                await axios.put(`${process.env.REACT_APP_API}/api/profile/${id}`, data, config)
                    .then(response => {
                        props.handleUpdate(response.data.profile)
                        setLoading(false)
                        props.hide()
                    })
                    .catch(e => {
                        setErrors(true)
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                        setLoading(false)
                    })
            }
        }
    }

    const about = props.data.about
    return (
        <div className='container p-4 pt-5'>
            <Fade>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit} disabled={!props.handleDisabled}>
                    <Form.Group widths="equal">
                        <Form.Input
                            name="first_name"
                            error={errors.first_name}
                            placeholder='First Name'
                            onChange={handleChange}
                            label="First Name"
                            value={data.first_name}
                            readOnly={!props.handleDisabled}
                        />
                        <Form.Input widths={4}
                                    name="last_name"
                                    error={errors.last_name}
                                    placeholder='Last name'
                                    onChange={handleChange}
                                    label="Last Name"
                                    value={data.last_name}
                                    readOnly={!props.handleDisabled}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            name="email"
                            label="Email Address"
                            placeholder='Email address'
                            onChange={handleChange}
                            value={data.email}
                            readOnly={!props.handleDisabled}
                        />
                        <Form.Input
                            name="phone"
                            label="Phone Number"
                            placeholder='Phone number'
                            onChange={handleChange}
                            value={data.phone}
                            readOnly={!props.handleDisabled}
                        />
                    </Form.Group>
                    <Form.Input
                        label='Occupation'
                        name="occupation"
                        placeholder='Occupation'
                        onChange={handleChange}
                        value={data.occupation}
                        readOnly={!props.handleDisabled}
                    />
                    <Form.Input
                        label='LinkedIn Profile'
                        name="linkedin"
                        placeholder='Your LinkedIn Profile'
                        onChange={handleChange}
                        value={data.linkedin}
                        readOnly={!props.handleDisabled}
                    />
                    <Form.Input
                        label='Your Photo Link'
                        name="image"
                        value={data.image}
                        placeholder='Your profile image'
                        onChange={handleChange}
                        readOnly={!props.handleDisabled}
                    />

                    <h6 className="font-weight-bold mb-3">Summary about yourself:</h6>
                    <CKEditor editor={ClassicEditor} onChange={handleChangeDesc} data={props.data.about}
                              config={{toolbar: ['bold', 'italic', 'numberedList', 'bulletedList'],}}
                              disabled={!props.handleDisabled}
                    />
                    <div className=" mt-4 ">
                        <div className="row">
                            <div className="col">

                            </div>
                            <div className="col">
                                <div className=" text-right">
                                    <Button disabled={!props.handleDisabled} className="" color='blue'
                                            size={"large"}>Save</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Form>
            <div className="border-bottom mb-3">
                <h4>Your Account</h4>
            </div>
            <div className=" row">
                <div className="col">
                    {profile.profile.active ? (
                        // <Popup content={
                        //     <div className="text-danger">You can temporarily deactivate your account and reactivate
                        //         anytime</div>
                        // } trigger={
                        //     <div className=" text-left">
                                <Button className="" color='red' size={"large"}
                                        onClick={handleDeactivate}>Deactivate</Button>
                            // </div>
                        // }
                        // />
                    ) : (
                        <div className=" text-left">
                            <Button className="" color='green' size={"large"}
                                    onClick={handleDeactivate}>Activate</Button>
                        </div>
                    )}
                </div>
                <div className="col text-right">
                    <p>Account status:
                        {profile.profile.active ? (
                            <strong className="text-success"> ACTIVE</strong>
                        ) : (
                            <strong className="text-danger"> DISABLED</strong>
                        )}
                    </p>
                </div>
            </div>

            <Deactivate
                handleDeactivate={handleDeactivate}
                open={deactivate}
            />
            </Fade>
        </div>
    );
};

export default AddProfile;