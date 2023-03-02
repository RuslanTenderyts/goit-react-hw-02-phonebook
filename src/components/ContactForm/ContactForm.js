import React, {Component} from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import {FormContact, Label} from './ContactForm.styled'

export class ContactForm extends Component { 
  state = {
    name: '',
    number: '',
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const {name, number} = this.state;

    const newContact = {
      id: nanoid(4), 
      name: name,
      number: number,
    }
  
    this.props.onSubmit(newContact)
    this.reset();
    
  }

  reset = () => {
    this.setState({ 
      name: '',
      number: ''
    });
  };

  render() {

    

    return (
    <FormContact onSubmit={this.handleSubmit}>
        <Label>
          <p> Name </p> 
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name} 
            onChange={this.handleChange}
          />
        </Label>
          
        <Label>
          <p> Number </p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number} 
            onChange={this.handleChange}
          />
        </Label>
        
        <button type="submit">Add contact</button>
    </FormContact>
    )
  }
}

export default ContactForm;

PropTypes.ContactForm = {
  onSubmit: PropTypes.func.isRequired, 
  valueName: PropTypes.string.isRequired, 
  valueNumber: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired,
}