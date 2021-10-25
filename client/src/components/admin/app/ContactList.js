import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {Button, Icon, Loader, Popup, Segment} from "semantic-ui-react";
import axios from "axios";
import AddContact from "./AddContact";


const ContactList = () => {
    const [editForm, setEditForm] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [contact, setContact] = useState({
        type: '', title: '', url: ''
    })


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('TKID')
            if (token) {
                setLoading(true)
                const config = {
                    headers: {'Authorization': `Bearer ${token}`}
                }
                await axios.get(`${process.env.REACT_APP_API}/api/contact`, config)
                    .then(res => {
                        setContacts(res.data.contact)
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


    const handleAddContact = (c) => {
        setContacts([...contacts, c])
    }
    const handleDeleteContact = async (id) => {
        const token = localStorage.getItem('TKID')
        setLoading(true)
        const config = {
            headers: {'Authorization': `Bearer ${token}`}
        }
        await axios.delete(`${process.env.REACT_APP_API}/api/contact/${id}`, config)
            .then(() => {
                const contact = contacts.filter((contact) => contact._id !== id)
                setContacts(contact)
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
    const handleReset = () => {
        setContact({
            type: '', title: '', url: ''
        })
        setIsEdit(false)
    }
    const handleUpdateContact = (data) => {
        const newCon = contacts.map(c => {
            if (c._id === data._id) {
                return data;
            }
            return c;
        })
        setContacts(newCon)
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
                        <AddContact
                            handleAddContact={handleAddContact}
                            hide={() => setEditForm(false)}
                            data={contact}
                            handleUpdateContact={handleUpdateContact}
                            handleReset={handleReset}
                            isEdit={isEdit}
                        />
                    ) : (
                        contacts.map((con, index) => (
                            <tr key={index}>
                                <td className={`${!con.active && 'text-danger'} text-left`}>
                                    <h5 className="font-weight-bold mb-0">{con.title}</h5>
                                    <p className="text-muted m-0">{con.url}</p>
                                </td>
                                <td className="text-center">
                                    <span>
                                        <Button className="m-1" size="mini" color="blue" icon="pencil"
                                                onClick={() => {
                                                    setEditForm(true)
                                                    setContact(con)
                                                    setIsEdit(true)
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
                                                         onClick={() => handleDeleteContact(con._id)}/>}
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

export default ContactList;