import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import axios from "axios";
import {Fade} from "react-reveal";

const AddSkill = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        skills: '', active: true
    })
    // const [errors, setErrors] = useState(false)

    React.useEffect(() => {
        setData(props.data)
    }, []);


    const handleChangeDesc = (e, editor) => {
        const text = editor.getData()
        setData({...data, skills: text})
    }
    const handleMouseChange = (e, {name, checked}) => {
        setData({...data, [name]: checked})
    }
    const handleSubmit = async () => {
        if (!props.data._id || props.data._id === 'undefined') {
            setLoading(true)
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {headers: {'Authorization': `Bearer ${token}`}}
                await axios.post(`${process.env.REACT_APP_API}/api/skills`, data, config)
                    .then(() => {
                        setLoading(false)
                        // props.handleAddSkill(response.data.skills)
                        props.hide()
                    })
                    .catch(e => {
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                        setLoading(false)
                    })
            }
        } else {
            await handleUpdate()
            props.hide()
        }
    }

    const handleUpdate = async () => {
        const id = props.data._id
        setLoading(true)
        const token = localStorage.getItem('TKID')
        if (token) {
            setLoading(true)
            const config = {headers: {'Authorization': `Bearer ${token}`}}
            await axios.put(`${process.env.REACT_APP_API}/api/skills/${id}`, data, config)
                .then(() => {
                    setLoading(false)
                    props.hide()
                })
                .catch(e => {
                    if (e.response) {
                        console.log(e.response.data)
                    } else {
                        console.log(e)
                    }
                    // setErrors(true)
                    setLoading(false)
                })
        }
    }

    return (
        <div className='container p-4 pt-5'>
            <Fade>
                <Form className=' mb-3' loading={loading} onSubmit={handleSubmit} disabled={!props.handleDisabled}>
                    <h6 className="font-weight-bold mb-3">Add your skill sets:</h6>
                    <CKEditor editor={ClassicEditor} onChange={handleChangeDesc} data={props.data.skills}
                              config={{toolbar: ['bold', 'italic', 'numberedList', 'bulletedList'],}}
                              disabled={!props.handleDisabled}
                    />

                    <div className="row mt-4 ">
                        <div className="col">
                            <Form.Checkbox
                                name="active"
                                toggle
                                label="Show on profile"
                                onChange={handleMouseChange}
                                defaultChecked={props.data.active}
                                disabled={!props.handleDisabled}
                            />
                        </div>
                        <div className="col text-right">
                            <Button disabled={!props.handleDisabled} className="" color='blue'
                                    size={"large"}>Save</Button>
                        </div>
                    </div>
                </Form>
            </Fade>
        </div>
    );
};

export default AddSkill;