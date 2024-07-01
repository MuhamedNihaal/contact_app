import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = ({ contacts, updateContactHandler }) => {
    const { id } = useParams(); // Extract ID from URL params
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // console.log('ID from URL:', id);
        // console.log('All Contacts:', contacts);
        const contact = contacts.find(contact => contact.id === id);
        // console.log('Found Contact:', contact);
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
        }
    }, [id, contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '' || email.trim() === '') {
            alert('All Fields are Mandatory');
            return;
        }
        
        try {
            await updateContactHandler({ id, name, email });
            navigate('/'); // Navigate back to home page after successful update
        } catch (error) {
            console.error('Error updating contact:', error);
            // Handle error, e.g., show error message to user
        }
    };

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>E-mail</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
};

export default EditContact;
