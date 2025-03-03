import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'password123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {/* Display login form or dashboard based on login status */}
      {!isLoggedIn ? (
        <>
          {/* Logo and App Information */}
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
          <Text style={styles.appName}>Doctor Telemedicine App</Text>
          <Text style={styles.description}>
            Connect with doctors seamlessly for telemedicine consultations and efficient healthcare solutions.
          </Text>

          {/* Login Form */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Contact Us */}
          <TouchableOpacity onPress={() => alert('Contact Us feature coming soon!')}>
            <Text style={styles.contactText}>Contact Us</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Dashboard */}
          <Text style={styles.welcomeText}>Welcome, Dr. {email || 'Doctor'}</Text>
          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/view_appoinments')}>
            <Text style={styles.featureButtonText}>View Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/view_appoinments')}>
            <Text style={styles.featureButtonText}>Profile Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton} onPress={() => router.push('/explore')}>
            <Text style={styles.featureButtonText}>Availability Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 16 },
  logo: { width: 150, height: 150, marginBottom: 16 },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#34C759', marginBottom: 8 },
  description: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 24 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  contactText: { marginTop: 16, color: '#007AFF', fontSize: 14, textDecorationLine: 'underline' },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#34C759', marginBottom: 16 },
  featureButton: {
    width: '80%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureButtonText: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  logoutButton: {
    width: '80%',
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
