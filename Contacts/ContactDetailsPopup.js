import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ContactDetailsPopup = ({ contact, onClose }) => {
  return (
    <Modal visible={!!contact} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.number}>{contact?.number}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  number: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactDetailsPopup;
