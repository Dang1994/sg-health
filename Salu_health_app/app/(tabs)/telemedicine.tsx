import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

// Dummy Data for Doctors
const doctors = [
  {
    id: '1',
    name: 'Dr. Swati Ratha',
    specialty: 'Cardiologist',
    language: 'Odia, English',
    rating: 4.8,
    fee: 500,
    availability: 'Available Now',
    emergency: true,
  },
  {
    id: '2',
    name: 'Dr. Rahul Purohit',
    specialty: 'General Physician',
    language: 'Sambalpuri, Odia',
    rating: 4.5,
    fee: 300,
    availability: '10:00 AM - 3:00 PM',
    emergency: false,
  },
  {
    id: '3',
    name: 'Dr. Shankar Rampuria',
    specialty: 'Dermatologist',
    language: 'Emergency Doctor',
    rating: 4.9,
    fee: 400,
    availability: '1:00 PM - 5:00 PM',
    emergency: true,
  },
];

export default function Telemedicine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(query.toLowerCase()) ||
      doctor.language.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleBookAppointment = (doctor: any) => {
    Alert.alert('Book Appointment', `Booking appointment with ${doctor.name}`);
    // Navigate to a booking screen or open a booking modal
  };

  const handleEmergencyContact = (doctor: any) => {
    Alert.alert(
      'Emergency Contact',
      `Connecting you to ${doctor.name} for an emergency session.`
    );
    // Trigger emergency call or video session
  };

  const renderDoctor = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.details}>Specialty: {item.specialty}</Text>
      <Text style={styles.details}>Language: {item.language}</Text>
      <Text style={styles.details}>Rating: ⭐ {item.rating}</Text>
      <Text style={styles.details}>Consultation Fee: ₹{item.fee}</Text>
      <Text style={styles.details}>Availability: {item.availability}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.bookButton]}
          onPress={() => handleBookAppointment(item)}
        >
          <Text style={styles.actionButtonText}>Book Appointment</Text>
        </TouchableOpacity>
        {item.emergency && (
          <TouchableOpacity
            style={[styles.actionButton, styles.emergencyButton]}
            onPress={() => handleEmergencyContact(item)}
          >
            <Text style={styles.actionButtonText}>Emergency</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Telemedicine</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name, specialty, or language"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No doctors found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Light greenish background for a fresh look
    padding: 16,
  },
  header: {
    fontSize: 28, // Slightly larger for emphasis
    fontWeight: 'bold',
    color: '#2E7D32', // A darker green for better contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#A5D6A7', // Matches the theme
    borderRadius: 12, // Softer rounded corners
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0288D1', // Blue to signify clickable or interactive elements
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  bookButton: {
    backgroundColor: '#388E3C', // A darker green for distinction
  },
  emergencyButton: {
    backgroundColor: '#D32F2F', // A deep red for urgency
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16, // Slightly larger for readability
    fontWeight: '600', // Semi-bold for better emphasis
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#757575', // Neutral gray for empty state
    marginTop: 30,
    fontStyle: 'italic',
  },
});
