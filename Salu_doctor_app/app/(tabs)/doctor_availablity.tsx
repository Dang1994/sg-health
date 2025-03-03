import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  FlatList,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AvailabilitySettings() {
  const [availability, setAvailability] = useState([
    { day: 'Monday', available: false, startTime: null, endTime: null },
    { day: 'Tuesday', available: false, startTime: null, endTime: null },
    { day: 'Wednesday', available: false, startTime: null, endTime: null },
    { day: 'Thursday', available: false, startTime: null, endTime: null },
    { day: 'Friday', available: false, startTime: null, endTime: null },
    { day: 'Saturday', available: false, startTime: null, endTime: null },
    { day: 'Sunday', available: false, startTime: null, endTime: null },
  ]);

  const [isTelemedicine, setIsTelemedicine] = useState(true); // Toggle between Telemedicine and In-Clinic
  const [showTimePicker, setShowTimePicker] = useState({ show: false, type: '', dayIndex: -1 }); // Time picker state

  const handleToggleAvailability = (index: number) => {
    setAvailability((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, available: !item.available } : item
      )
    );
  };

  const handleSetTime = (event: any, selectedTime: Date | undefined, type: string, dayIndex: number) => {
    setShowTimePicker({ show: false, type: '', dayIndex: -1 });
    if (selectedTime) {
      setAvailability((prev) =>
        prev.map((item, i) =>
          i === dayIndex
            ? { ...item, [type]: selectedTime }
            : item
        )
      );
    }
  };

  const handleSave = () => {
    Alert.alert('Settings Saved', 'Your availability settings have been updated successfully.');
  };

  const renderDayAvailability = ({ item, index }: any) => (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayText}>{item.day}</Text>
        <Switch
          value={item.available}
          onValueChange={() => handleToggleAvailability(index)}
        />
      </View>
      {item.available && (
        <View style={styles.timePickerContainer}>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker({ show: true, type: 'startTime', dayIndex: index })}
          >
            <Text style={styles.timeText}>
              Start: {item.startTime ? item.startTime.toLocaleTimeString() : 'Set Time'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTimePicker({ show: true, type: 'endTime', dayIndex: index })}
          >
            <Text style={styles.timeText}>
              End: {item.endTime ? item.endTime.toLocaleTimeString() : 'Set Time'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={() => Alert.alert('Back to Previous Page')}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Availability Settings</Text>

      {/* Toggle Between Telemedicine and In-Clinic */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isTelemedicine && styles.activeToggle]}
          onPress={() => setIsTelemedicine(true)}
        >
          <Text style={styles.toggleText}>Telemedicine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isTelemedicine && styles.activeToggle]}
          onPress={() => setIsTelemedicine(false)}
        >
          <Text style={styles.toggleText}>In-Clinic</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly Availability */}
      <FlatList
        data={availability}
        renderItem={renderDayAvailability}
        keyExtractor={(item) => item.day}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>

      {/* Time Picker */}
      {showTimePicker.show && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) =>
            handleSetTime(event, selectedTime, showTimePicker.type, showTimePicker.dayIndex)
          }
        />
      )}
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
  },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#34C759', marginBottom: 16 },
  toggleContainer: { flexDirection: 'row', marginBottom: 16 },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  activeToggle: { backgroundColor: '#34C759', borderColor: '#34C759' },
  toggleText: { color: '#FFF', fontWeight: 'bold' },
  dayContainer: { marginBottom: 16 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayText: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  timePickerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeButton: { padding: 8, borderWidth: 1, borderColor: '#CCC', borderRadius: 8 },
  timeText: { color: '#555' },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
