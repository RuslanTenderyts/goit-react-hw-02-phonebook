import React from "react";
import PropTypes from "prop-types";
import {FormContact, Label} from './ContactForm.styled'



const ContactForm = ({onSubmit, valueName, valueNumber, onChange } ) => (
    <FormContact onSubmit={onSubmit}>
        <Label>
          <p> Name </p> 
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={valueName} 
            onChange={onChange}
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
            value={valueNumber} 
            onChange={onChange}
          />
        </Label>
        
        <button type="submit">Add contact</button>
    </FormContact>
)

export default ContactForm;

PropTypes.ContactForm = {
  onSubmit: PropTypes.func.isRequired, 
  valueName: PropTypes.string.isRequired, 
  valueNumber: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired,
}