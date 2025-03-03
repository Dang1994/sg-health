import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString();

      // Add user message to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'You', message, timestamp },
      ]);
      setMessage('');
      setIsBotTyping(true);
      setIsLoading(true);

      try {
        const response = await fetch(
          'http://192.168.178.30:5005/webhooks/rest/webhook',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          }
        );

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        setIsBotTyping(false);
        setIsLoading(false);

        if (data.length > 0 && data[0].text) {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              sender: 'Salu',
              message: data[0].text,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } else {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              sender: 'Salu',
              message: 'No response from server.',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              sender: 'Error',
              message: `Could not reach server: ${error.message}`,
              timestamp,
            },
          ]);
        } else {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'Error', message: 'An unknown error occurred', timestamp },
          ]);
        }
        setIsBotTyping(false);
        setIsLoading(false);
      }
    }
  };

  const handleFileAttachment = () => {
    // Logic for handling file attachment (e.g., opening file picker)
    alert('File attachment feature is not yet implemented.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat with Salu</Text>
      </View>

      {/* Chat History */}
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View
            key={index}
            style={
              chat.sender === 'You'
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            <Ionicons
              name={
                chat.sender === 'You'
                  ? 'person-circle-outline'
                  : 'chatbubble-outline'
              }
              size={24}
              color={chat.sender === 'You' ? '#007AFF' : '#34C759'}
            />
            <View style={styles.messageWrapper}>
              <Text
                style={
                  chat.sender === 'You' ? styles.userMessage : styles.botMessage
                }
              >
                {chat.message}
              </Text>
              <Text style={styles.timestamp}>{chat.timestamp}</Text>
            </View>
          </View>
        ))}
        {isBotTyping && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#34C759" />
            <Text style={styles.typingText}>Salu is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleFileAttachment}>
          <MaterialIcons name="attach-file" size={24} color="#888888" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          editable={!isLoading}
        />
        {message.trim() ? (
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#34C759',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  userMessageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  messageWrapper: {
    maxWidth: '80%',
    marginLeft: 8,
    marginRight: 8,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    textAlign: 'left',
  },
  botMessage: {
    backgroundColor: '#34C759',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    textAlign: 'left',
  },
  timestamp: {
    fontSize: 10,
    color: '#888888',
    marginTop: 4,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  typingText: {
    fontStyle: 'italic',
    color: '#888888',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 25,
    padding: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: '#F9F9F9',
  },
  sendButton: {
    backgroundColor: '#34C759',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
