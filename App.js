import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ContactItem from './Contacts/ContactItem';
import ContactModal from './Contacts/ContactModal';
import ContactDetailsPopup from './Contacts/ContactDetailsPopup';
import { getContacts, addContact, deleteContact } from './Contacts/ContactService';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const contactsData = getContacts();
    setContacts(contactsData);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = (contactId) => {
    deleteContact(contactId);
    loadContacts();
  };

  const handleAddContact = () => {
    if (newContactName && newContactNumber) {
      addContact(newContactName, newContactNumber);
      loadContacts();
      setModalVisible(false);
      setNewContactName('');
      setNewContactNumber('');
    }
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <ContactItem
        contact={item}
        onPress={() => handleContactPress(item)}
        onDelete={() => handleDeleteContact(item.id)}
      />
    </TouchableOpacity>
  );

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <Button title="Add Contact" onPress={() => setModalVisible(true)} />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contactsList}
      />
      {selectedContact && (
        <ContactDetailsPopup contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
      <ContactModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onAddContact={handleAddContact}
        onCancel={() => {
          setModalVisible(false);
          setNewContactName('');
          setNewContactNumber('');
        }}
        contactName={newContactName}
        setContactName={setNewContactName}
        contactNumber={newContactNumber}
        setContactNumber={setNewContactNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  contactsList: {
    flexGrow: 1,
  },
});

export default App;
