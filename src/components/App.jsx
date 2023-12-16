import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../App.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
export class App extends Component {
  state = {
    contacts: [
      { name: 'Rosie Simpson', id: nanoid() },
      { name: 'Hermione Kline', id: nanoid() },
      { name: 'Eden Clements', id: nanoid() },
    ],
    filter: '',
  };
  formSubmitHandler = data => {
    const existingContact = this.state.contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), ...data };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  handleInputFind = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };
  render() {
    const normilizedFilter = this.state.filter.toLowerCase();

    const searchedContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
    return (
      <div className="container">
        <h1 className="container__title">Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          className="input"
          type="text"
          name={this.state.contacts.name}
          required
        />
        <h2 className="container__title">Contacts</h2>
        <ContactList contacts={searchedContact} />
      </div>
    );
  }
}
