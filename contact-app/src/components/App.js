import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header';
import api from '../api/contacts';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // console.log("App Component Mounted");


  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrieve Contacts
  const retrievedContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    console.log(response);
    // const newContact = { ...contact, id: uuidv4() };
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (updatedContact) => {
    const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);

    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    )
  };


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {

        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      })
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // // console.log("useEffect triggered");
    // try {
    //   const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   // console.log("Retrieved contacts from localStorage:", retrievedContacts);
    //   if (retrievedContacts) {
    //     setContacts(retrievedContacts);
    //   }
    // } catch (error) {
    //   console.error('Error retrieving contacts from localStorage:', error);
    // }

    const getAllContacts = async () => {
      const allContacts = await retrievedContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, [setContacts]);



  useEffect(() => {
    // console.log("Contacts before storing:", contacts);
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // console.log("Contacts after storing:", contacts);
  }, [contacts]);


  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/add'
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route
            path="/edit/:id"
            element={<EditContact contacts={contacts} updateContactHandler={updateContactHandler} />}
          />

          <Route
            path='/'
            element={
              <ContactList
                Contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />

          <Route
            path='/contact/:id'
            element={<ContactDetails Contacts={contacts} />}
          />

        </Routes>

        {/* <AddContact addContactHandler={addContactHandler} /> */}
        {/* <ContactList Contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
