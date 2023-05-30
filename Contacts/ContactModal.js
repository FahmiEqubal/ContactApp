import React from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';

const ContactModal = ({
  visible,
  onRequestClose,
  onAddContact,
  onCancel,
  contactName,
  setContactName,
  contactNumber,
  setContactNumber,
}) => {

  const handleNameChange = (text) => {
    // Remove non-letter characters using regex
    const formattedText = text.replace(/[^a-zA-Z]/g, '');
    setContactName(formattedText);
  };

  const handleNumberChange = (text) => {
    // Remove non-digit characters using regex
    const formattedText = text.replace(/[^0-9]/g, '');
    setContactNumber(formattedText);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add Contact</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Name"
          onChangeText={handleNameChange}
          value={contactName}
          maxLength={20}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Number"
          onChangeText={handleNumberChange}
          value={contactNumber}
          keyboardType="numeric"
          maxLength={10}
        />
        <Button title="Add" onPress={onAddContact} disabled={!contactName || !contactNumber} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
  },
});

export default ContactModal;
