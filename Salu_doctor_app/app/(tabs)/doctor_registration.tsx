import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  // Form state with all necessary fields
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialization: '',
    subSpecializations: '',
    registrationNumber: '',
    qualifications: '',
    experienceYears: '',
    languages: '',
    consultationFees: '',
    emergencyFees: '',
    paymentOptions: '',
    bio: '',
    timeSlots: '',
    emergencyStatus: '',
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log('Form Data:', formData);
    alert('Registration Submitted Successfully!');
    router.push('/doctor_login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Doctor Registration</Text>

      {/* 1. Personal Information */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('personal')}>
          <Text style={styles.sectionHeader}>1. Personal Information</Text>
        </TouchableOpacity>
        {expandedSection === 'personal' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Profile Picture URL"
              value={formData.profilePicture}
              onChangeText={(text) => handleInputChange('profilePicture', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={(text) => handleInputChange('gender', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChangeText={(text) => handleInputChange('dateOfBirth', text)}
            />
          </View>
        )}
      </View>

      {/* 2. Contact Information */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('contact')}>
          <Text style={styles.sectionHeader}>2. Contact Information</Text>
        </TouchableOpacity>
        {expandedSection === 'contact' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => handleInputChange('state', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              value={formData.zipCode}
              onChangeText={(text) => handleInputChange('zipCode', text)}
            />
          </View>
        )}
      </View>

      {/* 3. Professional Information */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('professional')}>
          <Text style={styles.sectionHeader}>3. Professional Information</Text>
        </TouchableOpacity>
        {expandedSection === 'professional' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              value={formData.specialization}
              onChangeText={(text) => handleInputChange('specialization', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Subspecializations"
              value={formData.subSpecializations}
              onChangeText={(text) => handleInputChange('subSpecializations', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Medical Registration Number"
              value={formData.registrationNumber}
              onChangeText={(text) => handleInputChange('registrationNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Qualifications"
              value={formData.qualifications}
              onChangeText={(text) => handleInputChange('qualifications', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              value={formData.experienceYears}
              onChangeText={(text) => handleInputChange('experienceYears', text)}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>

      {/* 4. Availability Information */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('availability')}>
          <Text style={styles.sectionHeader}>4. Availability Information</Text>
        </TouchableOpacity>
        {expandedSection === 'availability' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Preferred Time Slots"
              value={formData.timeSlots}
              onChangeText={(text) => handleInputChange('timeSlots', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Status (Yes/No)"
              value={formData.emergencyStatus}
              onChangeText={(text) => handleInputChange('emergencyStatus', text)}
            />
          </View>
        )}
      </View>

      {/* 5. Language Preferences */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('language')}>
          <Text style={styles.sectionHeader}>5. Language Preferences</Text>
        </TouchableOpacity>
        {expandedSection === 'language' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Languages Spoken (comma-separated)"
              value={formData.languages}
              onChangeText={(text) => handleInputChange('languages', text)}
            />
          </View>
        )}
      </View>

      {/* 6. Payment Information */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('payment')}>
          <Text style={styles.sectionHeader}>6. Payment Information</Text>
        </TouchableOpacity>
        {expandedSection === 'payment' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Consultation Fees"
              value={formData.consultationFees}
              onChangeText={(text) => handleInputChange('consultationFees', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Fees"
              value={formData.emergencyFees}
              onChangeText={(text) => handleInputChange('emergencyFees', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Payment Options (e.g., Cash, Online)"
              value={formData.paymentOptions}
              onChangeText={(text) => handleInputChange('paymentOptions', text)}
            />
          </View>
        )}
      </View>

      {/* 7. Bio */}
      <View>
        <TouchableOpacity onPress={() => toggleSection('bio')}>
          <Text style={styles.sectionHeader}>7. Bio</Text>
        </TouchableOpacity>
        {expandedSection === 'bio' && (
          <View style={styles.sectionContent}>
            <TextInput
              style={styles.input}
              placeholder="Short Bio"
              value={formData.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
            />
          </View>
        )}
      </View>

      <Button title="Submit" onPress={handleRegister} color="#34C759" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: '#007AFF' },
  sectionContent: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 10, marginVertical: 5, borderRadius: 8 },
});
