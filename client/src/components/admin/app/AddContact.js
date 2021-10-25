import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import axios from "axios";
import {Fade} from "react-reveal";

const AddContact = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        type: '', title: '', url: '', active: false
    })
    const [errors, setErrors] = useState({type: false, title: false, url: false})

    const contactOptions = [
        {key: 'd', text: "Email", value: 'envelope'},
        {key: 'p', text: "Phone", value: 'phone square'},
        {key: 'l', text: "LinkedIn", value: 'linkedin'},
        {key: 't', text: "Twitter", value: 'twitter'},
        {key: 'f', text: 'Facebook', value: 'facebook'},
        {key: 'i', text: 'Instagram', value: 'instagram'},
        {key: 'w', text: 'WhatsApp', value: 'whatsapp'},
        {key: 'tk', text: "TikTok", value: 'globe'},
        {key: 'o', text: "Other", value: 'globe'},
    ]

    React.useEffect(() => {
        setData(props.data)
    }, []);

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }

    const handleMouseChange = (e, {name, checked}) => {
        setData({...data, [name]: checked})
    }

    const handleSubmit = async () => {
        if (!data.title || !data.type || !data.url) {
            setErrors({type: true, title: true, url: true})
        } else {
            if (!props.isEdit) {
                setLoading(true)
                const token = localStorage.getItem('TKID')
                if (token) {
                    setLoading(true)
                    const config = {headers: {'Authorization': `Bearer ${token}`}}
                    await axios.post(`${process.env.REACT_APP_API}/api/contact`, data, config)
                        .then(response => {
                            setLoading(false)
                            props.handleAddContact(response.data.contact)
                            props.hide()
                        })
                        .catch(e => {
                            if (e.response) {
                                console.log(e.response.data)
                            } else {
                                console.log(e)
                            }
                            setErrors({...errors, type: true, title: true, url: true})
                            setLoading(false)
                        })
                }
            } else {
                await handleUpdate(props.data._id)
                props.handleUpdateContact(data)
                props.hide()
            }
        }
        props.handleReset()
    }

    const handleUpdate = async (id) => {
        if (data.title === null || !data.type || !data.url) {
            setErrors({title: true, type: true, url: true})
        } else {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {headers: {'Authorization': `Bearer ${token}`}}
                await axios.put(`${process.env.REACT_APP_API}/api/contact/${id}`, data, config)
                    .then(response => {
                        setLoading(false)
                        props.handleAddContact(response.data.contact)
                        props.hide()
                    })
                    .catch(e => {
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                        setErrors({...errors, title: true, type: true, url: true})
                        setLoading(false)
                    })
            }
        }
    }

    return (
        <div className='container p-4 pt-5' style={{minHeight: 400}}>
            <Fade>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>
                    <Form.Select
                        name="type"
                        error={errors.type}
                        options={contactOptions}
                        placeholder='Select contact type'
                        onChange={handleChange}
                        label="Contact Type"
                        value={data.type}
                        search
                    />
                    <Form.Group widths="equal">
                        <Form.Input
                            name="title"
                            label="Title"
                            error={errors.title}
                            placeholder='Title'
                            onChange={handleChange}
                            value={data.title}
                        />
                        <Form.Input
                            name="url"
                            label="URL"
                            error={errors.url}
                            placeholder='Enter url'
                            onChange={handleChange}
                            value={data.url}
                        />
                    </Form.Group>

                    <div className="row mt-4 ">
                        <div className="col">
                            <Form.Checkbox
                                name="active"
                                toggle
                                label="Show on profile"
                                onChange={handleMouseChange}
                                defaultChecked={props.data.active}
                            />
                        </div>
                        <div className="col text-right">
                            <Button className="" color='blue' size={"large"}>Save</Button>
                        </div>
                    </div>
                </Form>
            </Fade>
        </div>
    );
};

export default AddContact;