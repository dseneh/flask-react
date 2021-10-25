import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Button, Icon, Loader, Segment} from "semantic-ui-react";
import axios from "axios";
import AddSkill from "./AddSkill";


const SkillList = () => {
    const [editForm, setEditForm] = useState(false)
    const [skills, setSkills] = useState({active: true})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect( () => {
        const fetchData = async () => {
            const token = localStorage.getItem('TKID')
        if (token) {
            setLoading(true)
            await axios.get(`${process.env.REACT_APP_API}/api/skills`)
                .then(res => {
                    setSkills(res.data.skills)
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


    const handleReset = () => {
        setSkills({})
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
                                        // setSkill({})
                                    }}
                                />
                            ) : (

                                <Button
                                    floated='right'
                                    icon='pencil'
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    content='Edit'
                                    onClick={() => {
                                        setEditForm(true)
                                    }}
                                />
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody >
                        <AddSkill
                            handleDisabled={editForm}
                            hide={() => setEditForm(false)}
                            data={skills}
                            // handleUpdateSkill={handleUpdateSkill}
                            handleReset={handleReset}
                        />
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default SkillList;