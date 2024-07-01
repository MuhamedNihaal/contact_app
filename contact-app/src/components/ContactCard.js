import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = React.memo((props) => {
    const { id, name, email } = props.Contacts; // Ensure props.Contacts is structured correctly

    return (
        <div className="item" key={id}>
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={{ pathname: `/contact/${id}`, state: { contact: props.Contacts } }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i
                className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px" }}
                onClick={() => props.clickHandler(id)}
            ></i>
            <Link to={{ pathname: `/edit/${id}`, state: { contact: props.Contacts } }}>
                <i
                    className="edit alternate outline icon"
                    style={{ color: "blue", marginTop: "7px" }}
                ></i>
            </Link>
        </div>
    );
});


// const ContactCard = React.memo(({ id, name, email }) => {
//     return (
//         <div className="item" key={id}>
//             <img className="ui avatar image" src={user} alt="user" />
//             <div className="content">
//                 <div className="header">{name}</div>
//                 <div>{email}</div>
//             </div>
//             <i className="trash alternate outline icon" style={{ color: "red", marginTop: "7px" }}></i>
//         </div>
//     );
// });


export default ContactCard;
