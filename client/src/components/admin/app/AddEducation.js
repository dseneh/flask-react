import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import axios from "axios";
import {Fade} from "react-reveal";

const AddEducation = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        type: '', institution: '', location: '', study: '', start: '', end: '', desc: '', current: false, active: false
    })
    const [errors, setErrors] = useState({type: false, institution: false, study: false, start: false})

    const degreeOptions = [
        {key: 'c', text: 'Certificate', value: 'certificate'},
        {key: 'dp', text: 'Diploma', value: 'diploma'},
        {key: 't', text: 'Training', value: 'training'},
        {key: 'a', text: "Associate's Degree", value: 'associate'},
        {key: 'b', text: "Bachelor's Degree", value: 'bachelor'},
        {key: 'm', text: "Master's Degree", value: 'master'},
        {key: 'd', text: "Doctoral Degree", value: 'doctoral'},
    ]

    React.useEffect(async () => {
        setData(props.data)

    }, []);

    const handleChange = (e, {name, value}) => {
        setErrors({...errors, [name]: false})
        setData({...data, [name]: value})
    }

    const handleChangeDesc = (e, editor) => {
        const text = editor.getData()
        setData({...data, desc: text})
    }

    const handleMouseChange = (e, {name, checked}) => {
        setData({...data, [name]: checked})
    }
    const handleCheckClick = () => {
        !data.current ? data.end = 'Present' : data.end = ''
    }

    const handleSubmit = async () => {
        if (!data.type || !data.study || !data.institution || !data.location || !data.start) {
            setErrors({type: true, institution: true, location: true, study: true, start: true})
        } else {
            if (!props.data._id || props.data._id === 'undefined') {
                setLoading(true)
                const token = localStorage.getItem('TKID')
                if (token) {
                    setLoading(true)
                    const config = {headers: {'Authorization': `Bearer ${token}`}}
                    await axios.post(`${process.env.REACT_APP_API}/api/education`, data, config)
                        .then(res => {
                            setLoading(false)
                            props.handleAddEducation(res.data.education)
                            props.hide()
                        })
                        .catch(e => {
                            if (e.response) {
                                console.log(e.response.data)
                            } else {
                                console.log(e)
                            }
                            setErrors({
                                ...errors,
                                title: true,
                                institution: true,
                                location: true,
                                company: true,
                                start: true
                            })
                            setLoading(false)
                        })
                }

            } else {
                await handleUpdate()
                props.handleUpdateEducation(data)
                props.hide()
            }
        }
        // props.hide()
        props.handleReset()
    }

    const handleUpdate = async () => {
        const id = props.data._id
        if (!data.type || !data.study || !data.institution || !data.location || !data.start) {
            setErrors({type: true, institution: true, location: true, study: true, start: true})
        } else {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {headers: {'Authorization': `Bearer ${token}`}}
                await axios.put(`${process.env.REACT_APP_API}/api/education/${id}`, data, config)
                    .then((response) => {
                        setLoading(false)
                        props.handleAddEducation(response.data.education)
                        props.hide()
                    })
                    .catch(e => {
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                        setErrors({...errors, type: true, location: true, institution: true, study: true, start: true})
                        setLoading(false)
                    })
            }
        }
    }

    return (
        <div className='container p-4 pt-5'>
            <Fade>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>

                    <Form.Select
                        name="type"
                        options={degreeOptions}
                        error={errors.type}
                        placeholder='Type'
                        onChange={handleChange}
                        label="Type"
                        value={data.type}
                    />
                    <Form.Group widths="equal">
                        <Form.Input
                            name="study"
                            label="Field of Study"
                            error={errors.study}
                            placeholder='Field of Study'
                            onChange={handleChange}
                            value={data.study}
                        />
                        <Form.Input
                            name="institution"
                            label="Institution"
                            error={errors.institution}
                            placeholder='Institution name'
                            onChange={handleChange}
                            value={data.institution}
                        />
                        <Form.Input
                            name="location"
                            label="Location"
                            error={errors.location}
                            placeholder='Location'
                            onChange={handleChange}
                            value={data.location}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            label='Start Date'
                            name="start"
                            error={errors.start}
                            placeholder='Month/Year'
                            onChange={handleChange}
                            value={data.start}
                        />
                        <Form.Input
                            label='End Date'
                            name="end"
                            error={errors.end}
                            value={data.end}
                            disabled={data.current}
                            placeholder='Month/Year'
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Checkbox
                        name="current"
                        toggle
                        label="Up to current"
                        onChange={handleMouseChange}
                        defaultChecked={props.data.current}
                        onClick={handleCheckClick}
                    />

                    <CKEditor editor={ClassicEditor} onChange={handleChangeDesc} data={props.data.desc}
                              config={{toolbar: ['bold', 'italic', 'numberedList', 'bulletedList'],}}
                    />

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

export default AddEducation;