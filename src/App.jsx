import { useState, useEffect } from "react";
import shortid from "shortid";

// Import components
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";
import { ContactForm } from "./components/ContactForm/ContactForm";

// Import pnotify
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

import s from "./App.module.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  // Requests to remote resources

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  // Record into localStorage

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Add contact

  const forSubmitHandler = (text) => {
    // "id" generation
    const contactsNew = {
      id: shortid.generate(),
      ...text,
    };

    const someContact = contacts.some(
      (contact) => contact.name.toLowerCase() === text.name.toLowerCase()
    );

    if (someContact) {
      alert(`${text.name} is already in contacts`);
      return;
    }

    // Add the new contact

    setContacts((prevState) => [contactsNew, ...prevState]);
  };

  // Delete the contact

  const deleteContacts = (contactsId) => {
    setContacts((contacts) =>
      contacts.filter((contact) => contact.id !== contactsId)
    );
  };

  // Filter

  const changeFilter = (event) => {
    return setFilter(event.currentTarget.value);
  };

  // Searching by filter

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const getFilterVisibleContacts = getVisibleContacts();

  return (
    <div className={s.app}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={forSubmitHandler} />
      <h2 className={s.titleContacts}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilterVisibleContacts}
        onDeleteContacts={deleteContacts}
      />
    </div>
  );
}

export default App;
