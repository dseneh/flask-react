import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Button, Icon, Loader, Popup, Segment} from "semantic-ui-react";
import axios from "axios";
import AddWork from "./AddWork";
import {Fade} from "react-reveal";


const WorkList = () => {
    const [editForm, setEditForm] = useState(false)
    const [works, setWorks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [work, setWork] = useState({


    })


    useEffect( () => {
        const fetchData = async () => {

        const token = localStorage.getItem('TKID')
        if (token) {
            setLoading(true)
            const config = {
                headers: {'Authorization': `Bearer ${token}`}
            }
            await axios.get(`${process.env.REACT_APP_API}/api/work`, config)
                .then(res => {
                    setWorks(res.data.work)
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


    const handleAddWork = (w) => {
        setWorks([...works, w])
    }
    const handleDeleteWork = async (id) => {
        const token = localStorage.getItem('TKID')
        setLoading(true)
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        await axios.delete(`${process.env.REACT_APP_API}/api/work/${id}`, config)
            .then(() => {
                const work = works.filter((work) => work._id !== id)
                setWorks(work)
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
    const handleReset = () => {
        setWork({})
    }
    const handleUpdateWork = (data) => {
        const newWork = works.map(w => {
            if (w._id === data._id) {
                return data;
            }
            return w;
        })
        setWorks(newWork)
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
                                        setWork({})
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
                        <AddWork
                            handleAddWork={handleAddWork}
                            hide={() => setEditForm(false)}
                            data={work}
                            handleUpdateWork={handleUpdateWork}
                            handleReset={handleReset}
                        />
                    ) : (
                        works.map((work, index) => (
                            <tr key={index}>
                                <td className={`${!work.active && 'text-danger'} text-left`}>
                                    <div className="row">
                                        <div className="col">
                                              <h5 className="font-weight-bold mb-0">{work.title}</h5>
                                    <p className="text-muted m-0">
                                        {work.location}
                                    </p>
                                        </div>
                                        <div className="col-3">
                                            <Button disabled={work.order >= works.length} className="m-1" size="mini" color="blue" icon="arrow up"
                                                  onClick={() => {
                                                      // setEditForm(true)
                                                      // setWork(work)
                                                  }}
                                    />
                                     <Button disabled={work.order === 1} className="m-1" size="mini" color="blue" icon="arrow down"
                                                  onClick={() => {
                                                      // setEditForm(true)
                                                      // setWork(work)
                                                  }}
                                    />
                                        </div>
                                    </div>


                                </td>
                                <td className="text-center">
                                    <span><Button className="m-1" size="mini" color="blue" icon="pencil"
                                                  onClick={() => {
                                                      setEditForm(true)
                                                      setWork(work)
                                                  }}
                                    /></span>
                                    <span>
                                    <Popup
                                        trigger={
                                            <Button className="m-1" color="red" size="mini" icon="delete"


                                            />
                                        }
                                        header={<h5 className="mb-3">Are you sure you want to delete this item?</h5>}
                                        content={<Button color='red' content='Yes'
                                                         onClick={() => handleDeleteWork(work._id)}/>}
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

export default WorkList;