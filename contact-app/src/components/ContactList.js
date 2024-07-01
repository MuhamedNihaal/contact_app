import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";



const ContactList = (props) => {
    // console.log(props);
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.Contacts.map((contact) => {
        return (
            <ContactCard key={contact.id} Contacts={contact} clickHandler={deleteContactHandler} />
        )
    })

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }
    return (
        <div className="ui celled list"><br></br>
            <h3>Contact List</h3>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search Contacts"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div><br />
            {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}<br />
            <br /><Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>
        </div>
    );
}



// const ContactList = React.memo(({ Contacts }) => {
//     const renderContactList = Contacts.map((contact) => {
//         return (
//             <ContactCard key={contact.id} Contacts={contact} />
//         )
//     });
//     return (
//         <div className="ui celled list">
//             <h4>Contact List</h4>
//             {renderContactList}
//         </div>
//     );
// });



export default ContactList;