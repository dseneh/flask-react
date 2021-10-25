import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import axios from "axios";
import {Fade} from "react-reveal";

const AddWork = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        title: '', location: '', company: '', start: '', end: '', desc: '', current: false, active: false
    })
    const [errors, setErrors] = useState({
        title: false, location: false, company: false, start: false, end: false
    })

    React.useEffect(() => {
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
        if (!data.title || !data.location || !data.company || !data.start || !data.end) {
            setErrors({title: true, location: true, company: true, start: true, end: true})
        } else {
            if (!props.data || !props.data._id || props.data._id === 'undefined') {
                setLoading(true)
                const token = localStorage.getItem('TKID')
                if (token) {
                    setLoading(true)
                    const config = {headers: {'Authorization': `Bearer ${token}`}}
                    await axios.post(`${process.env.REACT_APP_API}/api/work`, data, config)
                        .then(response => {
                            setLoading(false)
                            props.handleAddWork(response.data.work)
                            props.hide()
                        })
                        .catch(e => {
                            if (e.response) {
                                console.log(e.response.data)
                            } else {
                                console.log(e)
                            }
                            setErrors({...errors, title: true, location: true, company: true, start: true, end: true})
                            setLoading(false)
                        })
                }

            } else {
                await handleUpdate(props.data._id)
                props.handleUpdateWork(data)
                props.hide()
            }
        }
        props.handleReset()
    }

    const handleUpdate = async (id) => {
        if (data.title === null || !data.location || !data.company || !data.start || !data.end) {
            setErrors({title: true, location: true, company: true, start: true, end: true})
        } else {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {headers: {'Authorization': `Bearer ${token}`}}
                await axios.put(`${process.env.REACT_APP_API}/api/work/${id}`, data, config)
                    .then(response => {
                        setLoading(false)
                        props.handleAddWork(response.data.work)
                        props.hide()
                    })
                    .catch(e => {
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                        setErrors({...errors, title: true, location: true, company: true, start: true, end: true})
                        setLoading(false)
                    })
            }
        }
    }

    return (
        <div className='container p-4 pt-5'>
            <Fade>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit}>
                    <Form.Input
                        name="title"
                        error={errors.title}
                        placeholder='Job Title'
                        onChange={handleChange}
                        label="Job Title"
                        value={data.title}
                    />
                    <Form.Group widths="equal">
                        <Form.Input
                            name="company"
                            label="Company"
                            error={errors.company}
                            placeholder='Company'
                            onChange={handleChange}
                            value={data.company}
                        />
                        <Form.Input
                            name="location"
                            label="Location"
                            error={errors.location}
                            placeholder='City, State'
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
                    <Form.Input
                        name="current"
                        type="number"
                        min={1}
                        max={5}
                        size="mini"
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
                                toggle
                                name="active"
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

export default AddWork;