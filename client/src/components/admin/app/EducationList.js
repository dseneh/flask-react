import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Button, Icon, Loader, Popup, Segment} from "semantic-ui-react";
import axios from "axios";
import AddEducation from "./AddEducation";


const EducationList = () => {
    const [editForm, setEditForm] = useState(false)
    const [educations, setEducations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [education, setEducation] = useState({
        type: '', institution: '', study: '', start: '', end: '', desc: '', current: false, active: false
    })


    useEffect( () => {
        const fetchData = async () => {
            const token = localStorage.getItem('TKID')
        if (token) {
            setLoading(true)
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }
            await axios.get(`${process.env.REACT_APP_API}/api/education`, config)
                .then(res => {
                    setEducations(res.data.education)
                    setLoading(false)
                })
                .catch(e => {
                    setLoading(false)
                    setError(true)
                      if (e.response) {
                            console.log(e.response.data)
                        }else {
                        console.log(e)
                        }
                })
        }
        setLoading(false)
        }
        fetchData()
    }, []);


    const handleAddEducation = (ed) => {
        setEducations([...educations, ed])
    }
    const handleDeleteEducation = async (id) => {
        const token = localStorage.getItem('TKID')
        setLoading(true)
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        await axios.delete(`${process.env.REACT_APP_API}/api/education/${id}`, config)
            .then(() => {
                const education = educations.filter((ed) => ed._id !== id)
                setEducations(education)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                setError(true)
                console.log(e)
            })
    }
    const handleReset = () => {
        setEducation({
            type: '', institution: '', study: '', start: '', end: '', desc: '', current: false, active: false
        })
    }
    const handleUpdateEducation = (data) => {
        const newEdu = educations.map(ed => {
            if (ed._id === data._id) {
                return data;
            }
            return ed;
        })
        setEducations(newEdu)
    }

    if (error) {
        return (
            <div style={{fontSize: '1.6rem'}}>
                <Icon name="warning sign" size="large" color="red"/>
                <p>Oops! There was an error loading data.</p>
            </div>
        )
    }

    return (
        <>
            {loading ? (
                <Segment style={{minHeight: 300}}>
                    <Loader size='large' active={loading}>Loading</Loader>
                </Segment>
            ) : (
                <Table bordered hover responsive className="bg-white">
                    <thead>
                    <tr>
                        <th colSpan="5">
                            {editForm ? (
                                <Button
                                    floated='right'
                                    color='red'
                                    size='small'
                                    content='Cancel'
                                    onClick={() => {
                                        setEditForm(false)
                                        handleReset()
                                    }}
                                />
                            ) : (

                                <Button
                                    floated='right'
                                    icon='plus'
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    content='New'
                                    onClick={() => {
                                        setEditForm(true)
                                    }}
                                />
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {editForm ? (
                        <AddEducation
                            handleAddEducation={handleAddEducation}
                            hide={() => setEditForm(false)}
                            data={education}
                            handleUpdateEducation={handleUpdateEducation}
                            handleReset={handleReset}
                        />
                    ) : (
                        educations.map((ed, index) => (
                            <tr key={index}>
                                <td className=" text-left">
                                    <h5 className={`${!ed.active && 'text-danger'} font-weight-bold mb-0 text-capitalize`}>{ed.type}: {ed.study}</h5>
                                    <p className="text-muted m-0">
                                        {ed.institution}
                                    </p>
                                </td>
                                <td className="text-center">
                                    <span>
                                        <Button className="m-1" size="mini" color="blue" icon="pencil"
                                                  onClick={() => {
                                                      setEditForm(true)
                                                      setEducation(ed)
                                                  }}
                                    />
                                    </span>
                                    <span>
                                    <Popup
                                        trigger={
                                            <Button className="m-1" color="red" size="mini" icon="delete"/>
                                        }
                                        header={<h5 className="mb-3">Are you sure you want to delete this item?</h5>}
                                        content={<Button color='red' content='Yes'
                                                         onClick={() => handleDeleteEducation(ed._id)}/>}
                                        on='click'
                                        position='top right'
                                    />
                                </span>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default EducationList;