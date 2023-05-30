let contacts = [
    { id: 1, name: 'Equbal', number: '9060540010' },
    { id: 2, name: 'Fahmi', number: '9661567100' },
    
  ];
  
  export const getContacts = () => {
    return contacts;
  };
  
  export const addContact = (name, number) => {
    const newContact = {
      id: Date.now(),
      name,
      number,
    };
    contacts.push(newContact);
  };
  
  export const deleteContact = (contactId) => {
    contacts = contacts.filter((contact) => contact.id !== contactId);
  };
  