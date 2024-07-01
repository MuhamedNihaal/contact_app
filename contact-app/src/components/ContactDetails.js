import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactDetails = ({ Contacts }) => {
    const { id } = useParams();
    // Check if Contacts is not null or undefined
    if (!Contacts) {
        return <div>Loading...</div>;
    }
    // Find the contact with the matching ID
    const contact = Contacts.find(contact => contact.id === id);

    if (!contact) {
        return <div>Contact not found</div>;
    }

    const { name, email } = contact;

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to={'/'}>
                    <button
                        className="ui button blue center">
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetails;
