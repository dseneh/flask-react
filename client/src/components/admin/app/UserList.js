import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import AddUser from "./AddUser";
import {Button, Icon, Loader, Popup, Segment} from "semantic-ui-react";
import axios from "axios";
import PasswordReset from "./PasswordReset";


const UserList = () => {
    const [showAddForm, setShowForm] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const userId = localStorage.getItem('_id')

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {
                    headers: {'Authorization': `Bearer ${token}`}
                }
                await axios.get(`${process.env.REACT_APP_API}/api/auth/users`, config)
                    .then(res => {
                        setUsers(res.data.users)
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

    const handleShowAddUser = () => {
        setShowForm(!showAddForm)
    }
    const handleShowPasswordReset = () => {
        setChangePassword(!changePassword)
    }
    const handleUpdateUser = (user) => {
        setUsers([...users, user])
    }
    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem('TKID')
        setLoading(true)
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        await axios.delete(`${process.env.REACT_APP_API}/api/auth/user/${id}`, config)
            .then(() => {
                const user = users.filter((user) => user._id !== id)
                setUsers(user)
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
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => setShowForm(true)}
                            >
                                <Icon name='plus'/> New
                            </Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="h5 text-left">{user.email} {user.is_admin &&
                            <Icon name="key" color="grey" size="small"/>}</td>
                            <td className="text-center">
                                <span><Button className="m-1" size="mini" color="blue" icon="pencil"
                                              onClick={() => {
                                                  setChangePassword(true)
                                                  setUser(user)
                                              }}
                                /></span>

                                <span>
                                    <Popup
                                        trigger={
                                            <Button className="m-1" color="red" size="mini" icon="delete"
                                                    disabled={user._id === userId}/>
                                        }
                                        header={<h5 className="mb-3">Are you sure you want to delete this user?</h5>}
                                        content={<Button color='red' content='Yes'
                                                         onClick={() => handleDeleteUser(user._id)}/>}
                                        on='click'
                                        position='top right'
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
            <AddUser
                handleAddUser={handleShowAddUser}
                handleUpdateUser={handleUpdateUser}
                open={showAddForm}
            />
            <PasswordReset
                handleShowPasswordReset={handleShowPasswordReset}
                open={changePassword}
                id={user._id}
            />

        </>
    );
};

export default UserList;