import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, Route } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Toggle Menu Visibility
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  // Handle Login
  const handleLogin = (): void => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // Simulate login with loading spinner
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/ChatScreen'); // Replace with actual logic
    }, 2000);
  };

  // Handle Navigation for Menu Options
  const handleMenuOption = (route: Route): void => {
    setMenuVisible(false);
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Header */}
      <Text style={styles.header}>Smart Assistant for Life and Uttam Health</Text>
      <Text style={styles.subHeader}>Your Health, Your Assistant</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Remember Me */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
        <Text style={styles.checkboxText}>Remember Me</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Additional Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.optionText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.optionText}>Create an Account</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Text */}
      <Text style={styles.footerText}>Explore me</Text>

      {/* Top-Right Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalMenu}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuOption('/telemedicine')}
            >
              <Text style={styles.modalText}>Aarogya Samvad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuOption('/HealthUpdates')}
            >
              <Text style={styles.modalText}>
                Health Updates & Government Messages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuOption('/explore')}
            >
              <Text style={styles.modalText}>Explore Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleMenuOption('/explore')}
            >
              <Text style={styles.modalText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={toggleMenu}>
              <Text style={[styles.modalText, styles.closeMenuText]}>
                Close Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '100%',
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionText: {
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: '#777',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 50,
  },
  menuIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMenu: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#007AFF',
  },
  closeMenuText: {
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#34C759',
  },
  checkboxText: {
    fontSize: 14,
    color: '#777',
  },
});
