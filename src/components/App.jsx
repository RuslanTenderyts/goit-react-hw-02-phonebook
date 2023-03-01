import { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList.js";
import Filter from "./Filter/Filter"
import GlobalStyle from "./GlobalStyle";
import { Layout } from "./Layout";



export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
 
  isNameInContacts = () => {
    const {name, contacts} = this.state;
    const normalizedName = name.toLowerCase();
    const contactsName = contacts.map(contact => contact.name.toLowerCase());
    
    return contactsName.includes(normalizedName)
  }

  handleSubmit = evt => {
    evt.preventDefault();

    const {name, number} = this.state;

    const newContact = {
      id: nanoid(4), 
      name: name,
      number: number,
    }

    if(this.isNameInContacts()) {
      return alert(`${name} is already in contacts`)
    }

    this.setState(prevState => ({
        contacts: [ newContact, ...prevState.contacts ],
      })
    );
    
    this.reset();
  }

  reset = () => {
    this.setState({ 
      name: '',
      number: ''
    });
  };

  getVisibleContacts = () => {
    const {filter, contacts} = this.state
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
      console.log('delete element')
  }

  

  render() {

    const visibleContacts = this.getVisibleContacts();

    return (
  
      <Layout> 
        <h1> PhoneBook </h1>
        <ContactForm 
            onSubmit={this.handleSubmit}
            valueName={this.state.name}
            valueNumber={this.state.number}
            onChange={this.handleChange} />
        <h2> Contacts </h2>
        <Filter 
          value={this.state.filter} 
          onChange={this.handleChange} />
        <ContactList 
          contacts = {visibleContacts} 
          onDeleteContact = {this.onDeleteContact} />

        <GlobalStyle />
      </Layout>
    );
  };
};
