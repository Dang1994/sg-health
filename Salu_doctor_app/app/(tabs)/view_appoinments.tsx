import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ViewAppointments() {
  const navigation = useNavigation(); // Access navigation for going back

  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'Subrat Kumar Dang',
      date: '2024-11-21',
      time: '10:00 AM',
      contact: '123-456-7890',
      email: 'narendrakheti@gmail.com',
      status: 'Pending',
      reason: 'General Checkup',
    },
    {
      id: '2',
      patientName: 'Chhoti dulhan',
      date: '2024-11-22',
      time: '2:00 PM',
      contact: '987-654-3210',
      email: 'janesmith@example.com',
      status: 'Confirmed',
      reason: 'Follow-up Consultation',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleStartTelemedicine = (id: string) => {
    alert('Starting telemedicine session for appointment ID: ' + id);
  };

  const handleCallPatient = (contact: string) => {
    alert('Calling patient at ' + contact);
  };

  const handleMessagePatient = (email: string) => {
    alert('Messaging patient at ' + email);
  };

  const handleMarkAsCompleted = (id: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'Completed' } : appointment
      )
    );
  };

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: () =>
            setAppointments((prev) => prev.filter((appointment) => appointment.id !== id)),
        },
      ]
    );
  };

  const handleAddAppointment = () => {
    const newAppointment = {
      id: (appointments.length + 1).toString(),
      patientName: 'New Patient',
      date: '2024-12-01',
      time: '11:00 AM',
      contact: '000-000-0000',
      email: 'newpatient@example.com',
      status: 'Pending',
      reason: 'New Consultation',
    };
    setAppointments((prev) => [...prev, newAppointment]);
    alert('New appointment added.');
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAppointment = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text style={styles.details}>
        {item.date} at {item.time}
      </Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.reason}>Reason: {item.reason}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleStartTelemedicine(item.id)}
        >
          <Text style={styles.actionButtonText}>Start Telemedicine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCallPatient(item.contact)}
        >
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleMessagePatient(item.email)}
        >
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => handleCancelAppointment(item.id)}
        >
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Your Appointments</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by patient name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Appointment List */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No appointments found.</Text>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddAppointment}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#34C759', marginBottom: 16 },
  searchBar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  patientName: { fontSize: 18, fontWeight: 'bold', color: '#007AFF', marginBottom: 8 },
  details: { fontSize: 14, color: '#555', marginBottom: 4 },
  status: { fontSize: 14, color: '#34C759', marginBottom: 4 },
  reason: { fontSize: 14, color: '#777', marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#34C759',
    alignItems: 'center',
    margin: 4,
  },
  cancelButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#777', marginTop: 20 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#34C759',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  fabText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
});
