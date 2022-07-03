import { useState } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from '../hooks/useLocalStorage';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';


function App() {
  const [contacts, setContacts] = useLocalStorage('contactList', []);
  const [filter, setFilter] = useState('');
  
  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(filterNormalize);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const formSubmit = ({ name, number }) => {
    const isContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (isContact) {
      alert(`${name} is already in contact`);
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };

  const contactDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

 
    return (
      <div className="container">
        <h1>Phone Book</h1>
        <ContactForm onSubmit={formSubmit} />

        <h2>Contacts</h2>
        <Filter
          title="Find contact by name"
          onChange={handleFilterChange}
          value={filter}
        />
        <ContactList
          filteredContacts={filteredContacts(filter)}
          onDelete={contactDelete}
        />
      </div>
    );
  }

export { App };