import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Button, Icon, Loader, Segment} from "semantic-ui-react";
import axios from "axios";
import AddProfile from "./AddProfile";


const Profile = () => {
    const [editForm, setEditForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [profile, setProfile] = useState({
        first_name: '', last_name: '', email: '', linkedin: '',
        image: '', about: '', last_modified: {}
    })

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                await axios.get(`${process.env.REACT_APP_API}/api/profile`)
                    .then(res => {
                        setProfile(res.data.profile)
                        setLoading(false)
                    })
                    .catch(e => {
                        setLoading(false)
                        setError(true)
                        if (e.response) {
                            console.log(e.response.data)
                        } else {
                            console.log(e)
                        }
                    })
            }
            setLoading(false)
        }
        fetchData()
    }, []);

    const handleUpdate = profile => {
        setProfile(profile)
    }
    const handleReset = () => {
        setProfile({
            first_name: '', last_name: '', email: '', linkedin: '',
            image: '', about: '', last_modified: ''
        })
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
                                        // handleReset()
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
                    <tbody>
                    <AddProfile
                        handleDisabled={editForm}
                        hide={() => setEditForm(false)}
                        data={profile}
                        handleReset={handleReset}
                        handleUpdate={handleUpdate}
                    />
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default Profile;