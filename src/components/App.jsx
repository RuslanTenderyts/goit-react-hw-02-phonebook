import { Component } from "react";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList.js";
import Filter from "./Filter/Filter"
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./Layout";



export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  handleFilterChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
 
  isNameInContacts = (name) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const contactsName = contacts.map(contact => contact.name.toLowerCase());
    
    return contactsName.includes(normalizedName)
  }

  handlerSubmitForm = (contact) => {

    if(this.isNameInContacts(contact.name)) {
      return alert(`${contact.name} is already in contacts`)
    }

    this.setState(prevState => ({
        contacts: [ contact, ...prevState.contacts ],
      })
    );
  }
  
  getVisibleContacts = () => {
    const {filter, contacts} = this.state
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  

  render() {
    const {filter} = this.state;
    const visibleContacts = this.getVisibleContacts();


    return (
  
      <Layout> 
        <h1> PhoneBook </h1>
        <ContactForm 
            onSubmit={this.handlerSubmitForm} />
        <h2> Contacts </h2>
        <Filter 
          value={filter} 
          onChange={this.handleFilterChange} />
        <ContactList 
          contacts = {visibleContacts} 
          onDeleteContact = {this.onDeleteContact} />

        <GlobalStyle />
      </Layout>
    );
  };
};
